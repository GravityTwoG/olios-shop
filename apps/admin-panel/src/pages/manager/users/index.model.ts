import { createEvent, createStore, sample } from 'effector';
import { debounce, or, reset } from 'patronum';

import { IUser } from '@olios-shop/admin/types/IUser';

import { ApiError } from '@olios-shop/admin/shared/api';
import * as usersApi from '@olios-shop/admin/shared/api/users';
import { ListDTO } from '@olios-shop/admin/shared/api/lib/types';
import { toast } from '@olios-shop/admin/shared/toasts';
import { createAPIEffect } from '@olios-shop/admin/shared/effector';

const PAGE_SIZE = 12;

// Effects
const fetchUsersFx = createAPIEffect<
  { pageSize: number; pageNumber: number; searchQuery: string },
  ListDTO<IUser> & { pageNumber: number },
  ApiError
>(async ({ pageSize, pageNumber, searchQuery }) => {
  const data = await usersApi.fetchUsers({
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
export const $users = createStore<IUser[]>([]);
export const $usersCount = createStore(0);
export const $isPending = fetchUsersFx.$isPending;
export const $pageSize = createStore(PAGE_SIZE);
export const $pageNumber = createStore(0);
export const $searchQuery = createStore('');

$searchQuery.on(searchQueryChanged, (_, newQuery) => newQuery);

reset({
  clock: pageMounted,
  target: [$users, $usersCount, $isPending, $pageSize, $pageNumber],
});

sample({
  clock: [pageMounted, searchTriggered],
  source: {
    pageSize: $pageSize,
    pageNumber: $pageNumber,
    searchQuery: $searchQuery,
  },
  target: fetchUsersFx.call,
});

sample({
  clock: loadPage,
  source: { pageSize: $pageSize, searchQuery: $searchQuery },
  fn: ({ pageSize, searchQuery }, pageNumber) => ({
    pageSize,
    pageNumber,
    searchQuery,
  }),
  target: fetchUsersFx.call,
});

$users.on(fetchUsersFx.call.doneData, (_, { list }) => {
  return list;
});
$usersCount.on(fetchUsersFx.call.doneData, (_, { count }) => {
  return count;
});
$pageNumber.on(fetchUsersFx.call.doneData, (_, { pageNumber }) => pageNumber);

fetchUsersFx.call.failData.watch((error) => toast.error(error.message));

//
// Block/Unblock users
// Effects
const blockUserFx = createAPIEffect((userId: string) => {
  return usersApi.blockOrUnblockUser({ userId, isActive: false });
});

const unblockUserFx = createAPIEffect((userId: string) => {
  return usersApi.blockOrUnblockUser({ userId, isActive: true });
});

// Events
export const blockUser = createEvent<string>('Block user');
export const unblockUser = createEvent<string>('Unblock user');

// Stores
export const $isBlockingOrUnblocking = or(
  blockUserFx.$isPending,
  unblockUserFx.$isPending,
);

sample({ clock: blockUser, target: blockUserFx.call });
sample({ clock: unblockUser, target: unblockUserFx.call });

sample({
  clock: [blockUserFx.call.done, unblockUserFx.call.done],
  source: {
    pageSize: $pageSize,
    pageNumber: $pageNumber,
    searchQuery: $searchQuery,
  },
  target: fetchUsersFx.call,
});
