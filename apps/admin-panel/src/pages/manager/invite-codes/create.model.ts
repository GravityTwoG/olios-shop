import { createEvent, sample } from 'effector';

import * as inviteCodesAPI from '@olios-shop/admin/shared/api/invite-codes';
import { createAPIEffect } from '@olios-shop/admin/shared/effector';

// Effects
const createInviteCodeFx = createAPIEffect(
  async (dto: inviteCodesAPI.CreateInviteCodeDTO) => {
    await inviteCodesAPI.createInviteCode(dto);
  },
  (err) => err.message,
);

// Events
export const formSubmitted =
  createEvent<inviteCodesAPI.CreateInviteCodeDTO>('Form submitted');
export const inviteCodeCreated = createEvent('Invite code created');

// Stores
export const $error = createInviteCodeFx.$error;
export const $isPending = createInviteCodeFx.$isPending;

sample({
  clock: formSubmitted,
  target: createInviteCodeFx.call,
});

sample({
  clock: createInviteCodeFx.call.done,
  target: inviteCodeCreated,
});
