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
  return function (object: any, currentProperty: string) {
    registerDecorator({
      name: 'notEqualsToField',
      target: object.constructor,
      propertyName: currentProperty,
      constraints: [otherProperty],
      options: validationOptions || {
        message: `Properties ${otherProperty} and ${currentProperty} must not be equal.`,
      },
      validator: {
        validate(value: any, args: ValidationArguments) {
          // args.object - class on which decorator was applied
          // otherPropertyName - otherProperty
          const [otherPropertyName] = args.constraints;
          const otherValue = (args.object as any)[otherPropertyName];
          return value !== otherValue;
          // you can return a Promise<boolean> here as well, if you want to make async validation
        },
      },
    });
  };
}
