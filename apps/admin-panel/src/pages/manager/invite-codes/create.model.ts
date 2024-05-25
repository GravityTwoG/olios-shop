import { createEffect, createEvent, createStore, sample } from 'effector';

import * as patronymicsApi from '@olios-shop/admin/shared/api/invite-codes';
import { ApiError } from '@olios-shop/admin/shared/api';

// Effects
const createInviteCodeFx = createEffect<
  patronymicsApi.CreateInviteCodeDTO,
  void,
  ApiError
>(async (dto) => {
  await patronymicsApi.createInviteCode(dto);
});

// Events
export const formSubmitted =
  createEvent<patronymicsApi.CreateInviteCodeDTO>('Form submitted');
export const inviteCodeCreated = createEvent('Invite code created');

// Stores
export const $error = createStore('');
export const $isPending = createStore(false);

sample({
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
