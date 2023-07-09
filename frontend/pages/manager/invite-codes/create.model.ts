import { createEffect, createEvent, createStore, sample } from 'effector';

import * as patronymicsApi from '@/src/shared/api/invite-codes';
import { ApiError } from '@/src/shared/api';
import { IEmployeeRole } from '@/src/types/IUser';

const createInviteCodeFx = createEffect<
  patronymicsApi.CreateInviteCodeDTO,
  void,
  ApiError
>(async (dto) => {
  await patronymicsApi.createInviteCode(dto);
});

export const $firstName = createStore('');
export const $lastName = createStore('');
export const $patronymic = createStore('');
export const $role = createStore<IEmployeeRole>(IEmployeeRole.CONTENT_MANAGER);
export const $birthDate = createStore('');
export const $error = createStore('');
export const $isPending = createStore(false);

export const firstNameChanged = createEvent<string>('First name changed');
export const lastNameChanged = createEvent<string>('Last name changed');
export const patronymicChanged = createEvent<string>('Patronymic changed');
export const roleChanged = createEvent<IEmployeeRole>('Role changed');
export const birthDateChanged = createEvent<string>('Birth Date changed');
export const formSubmitted = createEvent('Form submitted');
export const inviteCodeCreated = createEvent('Invite code created');

$firstName.on(firstNameChanged, (_, value) => value);
$lastName.on(lastNameChanged, (_, value) => value);
$patronymic.on(patronymicChanged, (_, value) => value);
$role.on(roleChanged, (_, value) => value);
$birthDate.on(birthDateChanged, (_, value) => value);

sample({
  source: {
    firstName: $firstName,
    lastName: $lastName,
    patronymic: $patronymic,
    role: $role,
    birthDate: $birthDate,
  },
  clock: formSubmitted,
  target: createInviteCodeFx,
});

$error.on(createInviteCodeFx, () => '');

$isPending.on(createInviteCodeFx, () => true);

$isPending.on(createInviteCodeFx.finally, () => false);

$error.on(createInviteCodeFx.failData, (_, err) => err.message);

sample({
  clock: createInviteCodeFx.done,
  target: inviteCodeCreated,
});
