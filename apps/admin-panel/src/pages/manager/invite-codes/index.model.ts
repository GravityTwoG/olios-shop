import {
  combine,
  createEffect,
  createEvent,
  createStore,
  sample,
} from 'effector';
import { debounce, reset } from 'patronum';

import { IInviteCode } from '@olios-shop/admin/types/IInviteCode';

import { ApiError } from '@olios-shop/admin/shared/api';
import * as inviteCodesApi from '@olios-shop/admin/shared/api/invite-codes';
import { ListDTO } from '@olios-shop/admin/shared/api/lib/types';

const PAGE_SIZE = 12;

// Effects
const fetchInviteCodesFx = createEffect<
  { pageSize: number; pageNumber: number; searchQuery: string },
  ListDTO<IInviteCode> & { pageNumber: number },
  ApiError
>(async ({ pageSize, pageNumber, searchQuery }) => {
  const data = await inviteCodesApi.fetchInviteCodes({
    take: pageSize,
    skip: pageSize * pageNumber,
    searchQuery: searchQuery,
  });

  return { ...data, pageNumber };
});

// Events
export const pageMounted = createEvent('Page mounted');
export const loadPage = createEvent<number>('Load another page');
export const searchQueryChanged = createEvent<string>('Search query changed');
const searchTriggered = debounce({ source: searchQueryChanged, timeout: 500 });

// Stores
export const $inviteCodes = createStore<IInviteCode[]>([]);
export const $inviteCodesCount = createStore(0);
export const $isPending = createStore(false);
export const $pageSize = createStore(PAGE_SIZE);
export const $pageNumber = createStore(0);
export const $searchQuery = createStore('');
export const $error = createStore('');

$searchQuery.on(searchQueryChanged, (_, newQuery) => newQuery);

reset({
  clock: pageMounted,
  target: [$inviteCodes, $inviteCodesCount, $isPending, $pageSize, $pageNumber],
});

sample({
  clock: pageMounted,
  source: combine({
    pageSize: $pageSize,
    pageNumber: 0,
    searchQuery: $searchQuery,
  }),
  target: fetchInviteCodesFx,
});

sample({
  clock: loadPage,
  source: { pageSize: $pageSize, searchQuery: $searchQuery },
  fn: ({ pageSize, searchQuery }, pageNumber) => ({
    pageSize,
    pageNumber,
    searchQuery,
  }),
  target: fetchInviteCodesFx,
});

sample({
  clock: searchTriggered,
  source: {
    pageSize: $pageSize,
    pageNumber: $pageNumber,
    searchQuery: $searchQuery,
  },
  target: fetchInviteCodesFx,
});

$isPending.on(fetchInviteCodesFx, () => true);

$inviteCodes.on(fetchInviteCodesFx.doneData, (_, { list }) => {
  return list;
});
$inviteCodesCount.on(fetchInviteCodesFx.doneData, (_, { count }) => {
  return count;
});
$pageNumber.on(fetchInviteCodesFx.doneData, (_, { pageNumber }) => pageNumber);

$error.on(fetchInviteCodesFx.failData, (_, error) => {
  return error.message;
});

$isPending.on(fetchInviteCodesFx.finally, () => false);

//
const deleteInviteCodeFx = createEffect((id: string) => {
  return inviteCodesApi.deleteInviteCode({ id });
});

export const deleteInviteCode = createEvent<string>('Delete Invite code');

export const $isDeleting = createStore(false);

sample({ clock: deleteInviteCode, target: deleteInviteCodeFx });

$isDeleting.on(deleteInviteCodeFx, () => true);
$isDeleting.on(deleteInviteCodeFx.finally, () => false);

sample({
  clock: deleteInviteCodeFx.done,
  source: {
    pageSize: $pageSize,
    pageNumber: $pageNumber,
    searchQuery: $searchQuery,
  },
  target: fetchInviteCodesFx,
});
