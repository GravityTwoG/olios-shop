import { combine, createEvent, createStore, sample } from 'effector';
import { debounce, reset } from 'patronum';

import { IInviteCode } from '@olios-shop/admin/types/IInviteCode';

import * as inviteCodesApi from '@olios-shop/admin/shared/api/invite-codes';
import { createAPIEffect } from '@olios-shop/admin/shared/effector';

const PAGE_SIZE = 12;

type Query = {
  pageSize: number;
  pageNumber: number;
  searchQuery: string;
};

// Effects
const fetchInviteCodesFx = createAPIEffect(
  async ({ pageSize, pageNumber, searchQuery }: Query) => {
    const data = await inviteCodesApi.fetchInviteCodes({
      take: pageSize,
      skip: pageSize * pageNumber,
      searchQuery: searchQuery,
    });

    return { ...data, pageNumber };
  },
  (err) => err.message,
);

// Events
export const pageMounted = createEvent('Page mounted');
export const loadPage = createEvent<number>('Load another page');
export const searchQueryChanged = createEvent<string>('Search query changed');
const searchTriggered = debounce({ source: searchQueryChanged, timeout: 500 });

// Stores
export const $inviteCodes = createStore<IInviteCode[]>([]);
export const $inviteCodesCount = createStore(0);
export const $isPending = fetchInviteCodesFx.$isPending;
export const $pageSize = createStore(PAGE_SIZE);
export const $pageNumber = createStore(0);
export const $searchQuery = createStore('');
export const $error = fetchInviteCodesFx.$error;

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
  target: fetchInviteCodesFx.call,
});

sample({
  clock: loadPage,
  source: { pageSize: $pageSize, searchQuery: $searchQuery },
  fn: ({ pageSize, searchQuery }, pageNumber) => ({
    pageSize,
    pageNumber,
    searchQuery,
  }),
  target: fetchInviteCodesFx.call,
});

sample({
  clock: searchTriggered,
  source: {
    pageSize: $pageSize,
    pageNumber: $pageNumber,
    searchQuery: $searchQuery,
  },
  target: fetchInviteCodesFx.call,
});

$inviteCodes.on(fetchInviteCodesFx.call.doneData, (_, { list }) => {
  return list;
});
$inviteCodesCount.on(fetchInviteCodesFx.call.doneData, (_, { count }) => {
  return count;
});
$pageNumber.on(
  fetchInviteCodesFx.call.doneData,
  (_, { pageNumber }) => pageNumber,
);

//
const deleteInviteCodeFx = createAPIEffect((id: string) => {
  return inviteCodesApi.deleteInviteCode({ id });
});

export const deleteInviteCode = createEvent<string>('Delete Invite code');

export const $isDeleting = deleteInviteCodeFx.$isPending;

sample({ clock: deleteInviteCode, target: deleteInviteCodeFx.call });

sample({
  clock: deleteInviteCodeFx.call.done,
  source: {
    pageSize: $pageSize,
    pageNumber: $pageNumber,
    searchQuery: $searchQuery,
  },
  target: fetchInviteCodesFx.call,
});
