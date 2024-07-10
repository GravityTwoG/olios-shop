import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

export function NotEqualsToField(
  otherProperty: string,
  validationOptions?: ValidationOptions,
) {
  // propertyName - property on which decorator was applied
  return function (object: object, currentProperty: string) {
    registerDecorator({
      name: 'notEqualsToField',
      target: object.constructor,
      propertyName: currentProperty,
      constraints: [otherProperty],
      options: validationOptions ?? {
        message: `Properties ${otherProperty} and ${currentProperty} must not be equal.`,
      },
      validator: {
        validate(
          value: unknown,
          args: ValidationArguments & {
            object: Record<string, unknown>;
          },
        ) {
          // args.object - class on which decorator was applied
          // otherPropertyName - otherProperty
          const [otherPropertyName] = args.constraints as string[];
          const otherValue = args.object[otherPropertyName];
          return value !== otherValue;
          // you can return a Promise<boolean> here as well, if you want to make async validation
        },
      },
    });
  };
}
