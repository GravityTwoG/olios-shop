export type DomainExceptionConstructor<T> = new (...args: T[]) => void;

export const assertTruthy = <T>(
  test: unknown,
  constructor: DomainExceptionConstructor<T>,
  ...args: T[]
) => {
  if (!test) {
    throw new constructor(...args);
  }
};

export const assertFalsy = <T>(
  test: unknown,
  constructor: DomainExceptionConstructor<T>,
  ...args: T[]
) => {
  if (test) {
    throw new constructor(...args);
  }
};
