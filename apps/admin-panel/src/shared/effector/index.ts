import { createEffect, createEvent, createStore } from 'effector';
import { ApiError } from '../api';

export const createField = <T>(name: string, defaultValue: T) => {
  const $field = createStore(defaultValue, { name });
  const fieldChanged = createEvent<T>(`${name} changed`);

  $field.on(fieldChanged, (_, newValue) => newValue);

  return [$field, fieldChanged] as const;
};

export type Func<Err, ErrReturn> = (error: Err) => ErrReturn;

export const createAPIEffect = <
  Input,
  Return,
  Err extends ApiError = ApiError,
  ErrR = Err,
>(
  effect: (data: Input) => Promise<Return>,
  mapError?: (error: Err) => ErrR,
) => {
  const call = createEffect<Input, Return, Err>(effect);
  const $isPending = createStore(false);
  const $error = createStore<ErrR | null>(null);

  $isPending.on(call, () => true);
  $isPending.on(call.finally, () => false);

  if (mapError === undefined) {
    $error.on(call.failData, (_, error) => error as unknown as ErrR);
  } else {
    $error.on(call.failData, (_, error) => mapError(error));
  }

  return {
    call: call,
    $isPending,
    $error,
  } as const;
};
