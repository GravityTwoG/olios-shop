import React, { ReactNode, useState } from 'react';
import { clsx } from 'clsx';

import classes from './form.module.scss';

import {
  Control,
  Controller,
  DefaultValues,
  Message,
  Path,
  UseFormRegister,
  useForm,
} from 'react-hook-form';
import { Button } from '@olios-shop/ui/atoms/Button';
import { CTAButton } from '@olios-shop/ui/atoms/CTAButton';
import { Input } from '@olios-shop/ui/atoms/Input';
import { ErrorText } from '@olios-shop/ui/atoms/ErrorText';
import { AsyncCombobox } from '@olios-shop/ui/atoms/Combobox';
import { H2 } from '@olios-shop/ui/atoms/Typography';
import { Field as FormField } from '../Field';
import { MultipleImagesInput } from '../MultipleImagesInput';
import { TextArea } from '../../atoms/TextArea';
import { ImageInput } from '../../atoms/ImageInput';

export type ComboboxOption = {
  label: string;
  value: string;
};

export type SimpleField = {
  type: 'text' | 'textarea' | 'email' | 'date' | 'password';
  placeholder?: string;
  defaultValue?: string;
  label?: string;
  required?: boolean | string;
};

export type NumberField = {
  type: 'number';
  placeholder?: string;
  defaultValue?: string;
  label?: string;
  required?: boolean | string;
  step?: string;
  min?: {
    value: number;
    message: string;
  };
};

export type ComboBoxField = {
  type: 'combobox';
  placeholder?: string;
  defaultValue?: ComboboxOption;
  label?: string;
  loadOptions: (inputValue: string) => Promise<ComboboxOption[]>;
  required?: boolean | string;
};

export type ImageField = {
  type: 'image';
  label?: string;
  required?: boolean | string;
  validate?: (value: { preview: string; raw: Blob }) => boolean | string;
};

export type ImagesField = {
  type: 'images';
  label?: string;
  required?: boolean | string;
  validate?: (value: { preview: string; raw: Blob }[]) => boolean | string;
};

export type FormConfig = {
  [key: string]:
    | SimpleField
    | NumberField
    | ComboBoxField
    | ImageField
    | ImagesField;
};

export type FormData<C = FormConfig> = {
  [key in keyof C]: C[key] extends ComboBoxField
    ? ComboboxOption
    : C[key] extends ImagesField
      ? { preview: string; raw: Blob }[]
      : C[key] extends ImageField
        ? { preview: string; raw: Blob }
        : string;
};

export type FormProps<C = FormConfig> = {
  title?: string;
  config: C;
  defaultValues?: FormData<C>;
  onSubmit: (formData: FormData<C>) => Promise<Message | null>;
  submitText?: ReactNode;
  actions?: React.ReactNode;
  className?: string;
  submitButtonVariant?: 'CTA' | 'primary';
  isPending?: boolean;
  error?: string;
};

export function Form<C extends FormConfig>(props: FormProps<C>) {
  const [formData, setFormData] = useState<FormData<C>>(() =>
    props.defaultValues
      ? props.defaultValues
      : extractDefaultValues(props.config),
  );

  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    getFieldState,
    setError,
    control,
  } = useForm<FormData<C>>({
    defaultValues: formData as DefaultValues<FormData<C>>,
  });

  const onSubmit = handleSubmit(async (fields) => {
    try {
      setIsLoading(true);
      const error = await props.onSubmit(fields);

      if (error != null) {
        setError('root', { message: error });
        return;
      }

      setFormData(extractDefaultValues(props.config));
      reset();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  });

  const root = getFieldState('root' as Path<FormData<C>>);

  return (
    <form onSubmit={onSubmit} className={clsx(classes.Form, props.className)}>
      {props.title && <H2>{props.title}</H2>}
      {Object.keys(props.config).map((field) => (
        <Field
          key={field}
          config={props.config}
          fieldName={field}
          register={register}
          control={control}
          error={
            (errors[field] ? errors[field]?.message : undefined) as Message
          }
        />
      ))}
      {root.error && (
        <ErrorText className={classes.FormError}>
          {root.error.message}
        </ErrorText>
      )}
      {props.error && (
        <ErrorText className={classes.FormError}>{props.error}</ErrorText>
      )}

      <div className={classes.FormActions}>
        {props.submitButtonVariant === 'CTA' ? (
          <CTAButton
            type="submit"
            className={classes.SubmitButton}
            isLoading={isLoading || props.isPending}
          >
            {props.submitText || 'Submit'}
          </CTAButton>
        ) : (
          <Button
            type="submit"
            className={classes.SubmitButton}
            isLoading={isLoading || props.isPending}
          >
            {props.submitText || 'Submit'}
          </Button>
        )}
        {props.actions}
      </div>
    </form>
  );
}

function extractDefaultValues<C extends FormConfig>(config: C) {
  const fieldNames = Object.keys(config);

  return fieldNames.reduce((acc, field) => {
    const fieldConfig = config[field];
    if (fieldConfig.type === 'combobox') {
      return {
        ...acc,
        [field]: fieldConfig.defaultValue || {
          label: '-',
          value: '',
        },
      };
    }
    if (fieldConfig.type === 'images' || fieldConfig.type === 'image') {
      return {
        ...acc,
        [field]: [],
      };
    }

    return {
      ...acc,
      [field]: fieldConfig.defaultValue || '',
    };
  }, {}) as FormData<C>;
}

type FieldProps<C extends FormConfig> = {
  config: C;
  fieldName: string;
  register: UseFormRegister<FormData<C>>;
  error: Message;
  control: Control<FormData<C>>;
};

function Field<C extends FormConfig>(props: FieldProps<C>) {
  const { config, fieldName } = props;

  const field = config[fieldName];

  if (field.type === 'combobox') {
    return (
      <FormField
        label={field.label || ''}
        key={fieldName}
        className={classes.Field}
      >
        <Controller
          control={props.control}
          name={fieldName as Path<FormData<C>>}
          render={({ field: selectField }) => (
            <AsyncCombobox
              name={selectField.name}
              option={selectField.value as ComboboxOption}
              onBlur={selectField.onBlur}
              onChange={(value) => selectField.onChange(value)}
              loadOptions={field.loadOptions}
            />
          )}
        />
        <ErrorText className={classes.FieldError}>{props.error}</ErrorText>
      </FormField>
    );
  }

  if (field.type === 'images') {
    return (
      <FormField
        label={field.label || ''}
        key={fieldName}
        className={classes.Field}
      >
        <Controller
          control={props.control}
          name={fieldName as Path<FormData<C>>}
          rules={{
            // @ts-expect-error invalid type infered
            validate: field.validate || (() => true),
          }}
          render={({ field: imagesField }) => (
            <MultipleImagesInput
              // @ts-expect-error invalid type infered
              images={imagesField.value}
              onChange={(newImages) => imagesField.onChange(newImages)}
            />
          )}
        />
        <ErrorText className={classes.FieldError}>{props.error}</ErrorText>
      </FormField>
    );
  }

  if (field.type === 'image') {
    return (
      <FormField
        label={field.label || ''}
        key={fieldName}
        className={classes.Field}
      >
        <Controller
          control={props.control}
          name={fieldName as Path<FormData<C>>}
          rules={{
            // @ts-expect-error invalid type infered
            validate: field.validate || (() => true),
          }}
          render={({ field: imageField }) => (
            <ImageInput
              preview={
                (imageField.value as { preview: string; raw: Blob }).preview
              }
              onChange={(newImage) => imageField.onChange(newImage)}
            />
          )}
        />
        <ErrorText className={classes.FieldError}>{props.error}</ErrorText>
      </FormField>
    );
  }

  if (field.type === 'textarea') {
    return (
      <FormField
        label={field.label || ''}
        key={fieldName}
        className={classes.Field}
      >
        <TextArea
          id={fieldName}
          placeholder={field.placeholder}
          {...props.register(fieldName as Path<FormData<C>>, {
            required: field.required,
          })}
        />
        <ErrorText className={classes.FieldError}>{props.error}</ErrorText>
      </FormField>
    );
  }

  if (!field.label) {
    return (
      <div key={fieldName} className={classes.Field}>
        <Input
          type={field.type}
          id={fieldName}
          placeholder={field.placeholder}
          {...props.register(fieldName as Path<FormData<C>>, {
            required: field.required,
          })}
        />
        <ErrorText className={classes.FieldError}>{props.error}</ErrorText>
      </div>
    );
  }

  return (
    <FormField label={field.label} className={classes.Field}>
      <Input
        type={field.type}
        id={fieldName}
        placeholder={field.placeholder}
        {...props.register(fieldName as Path<FormData<C>>, {
          required: field.required,
        })}
        step={field.type === 'number' ? field.step : undefined}
      />
      <ErrorText className={classes.FieldError}>{props.error}</ErrorText>
    </FormField>
  );
}
