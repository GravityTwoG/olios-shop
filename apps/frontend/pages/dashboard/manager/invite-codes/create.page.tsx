import { useEffect, useId } from 'react';
import { useRouter } from 'next/router';

import { useForm, Controller } from 'react-hook-form';

import { IEmployeeRole } from '@/src/types/IUser';
import { paths } from '@/src/paths';

import { SessionUserRole } from '@/src/shared/session';

import { useUnit } from 'effector-react';
import {
  $error,
  $isPending,
  formSubmitted,
  inviteCodeCreated,
} from './create.model';

import { PrivatePage } from '@/src/features/Auth';

import Head from 'next/head';
import { H1 } from '@/src/ui/atoms/Typography';
import { CTAButton } from '@/src/ui/atoms/CTAButton';
import { Container } from '@/src/ui/atoms/Container';
import { Form, FormError } from '@/src/ui/molecules/Form';
import { Field, InputField } from '@/src/ui/molecules/Field';
import { RoleSelect } from '@/src/shared/components/RoleSelect';

const CreateInviteCodePage = () => {
  const [isPending, error] = useUnit([$isPending, $error]);

  const [formSubmittedEvent] = useUnit([formSubmitted]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      patronymic: '',
      role: IEmployeeRole.CONTENT_MANAGER,
      birthDate: '1980-01-01',
    },
  });

  const onSubmit = handleSubmit((data) => {
    formSubmittedEvent(data);
  });

  const router = useRouter();
  useEffect(() => {
    return inviteCodeCreated.watch(() => {
      reset();
      router.push(paths.inviteCodes({}));
    });
  }, [router, reset]);

  const rolesId = useId();

  return (
    <Container className="py-8">
      <Head>
        <title>Olios Shop | Create Invite Code</title>
      </Head>
      <H1>Create Invite Code</H1>

      <Form onSubmit={onSubmit}>
        <InputField
          label="First Name"
          placeholder="First Name"
          {...register('firstName', { required: 'First Name is required!' })}
        />
        <FormError>{errors.firstName?.message}</FormError>

        <InputField
          label="Last Name"
          placeholder="Last Name"
          {...register('lastName', { required: 'Last Name is required!' })}
        />
        <FormError>{errors.lastName?.message}</FormError>

        <InputField
          label="Patronymic"
          placeholder="Patronymic"
          {...register('patronymic', { required: 'Patronymic is required!' })}
        />
        <FormError>{errors.patronymic?.message}</FormError>

        <Field label="Role" htmlFor={rolesId}>
          <Controller
            name="role"
            control={control}
            render={({ field: { onChange, value } }) => (
              <RoleSelect
                role={value}
                onChange={(r) => onChange(r)}
                id={rolesId}
              />
            )}
          />
        </Field>
        <FormError>{errors.role?.message}</FormError>

        <InputField
          label="Birth Date"
          placeholder="Birth Date"
          type="date"
          {...register('birthDate', { required: 'Birth Date is required!' })}
        />
        <FormError>{errors.birthDate?.message}</FormError>

        <FormError>{error}</FormError>

        <CTAButton type="submit" isLoading={isPending}>
          Create
        </CTAButton>
      </Form>
    </Container>
  );
};

export default PrivatePage(CreateInviteCodePage, [SessionUserRole.MANAGER]);
