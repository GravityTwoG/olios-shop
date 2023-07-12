import { createEvent, createStore } from 'effector';

export const createField = <T>(name: string, defaultValue: T) => {
  const $field = createStore(defaultValue, { name });
  const fieldChanged = createEvent<T>(`${name} changed`);

  $field.on(fieldChanged, (_, newValue) => newValue);

  return [$field, fieldChanged];
};
