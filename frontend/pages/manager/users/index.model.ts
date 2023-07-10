import { createEffect, createEvent, createStore, sample } from 'effector';
import { debounce, reset } from 'patronum';

import { IUser } from '@/src/types/IUser';

import { ApiError } from '@/src/shared/api';
import * as usersApi from '@/src/shared/api/users';
import { ListDTO } from '@/src/shared/api/lib/types';
import { toast } from '@/src/shared/toasts';

const PAGE_SIZE = 12;

export const fetchUsersFx = createEffect<
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

export const pageMounted = createEvent('Page mounted');
export const loadPage = createEvent<number>('Load another page');
export const searchQueryChanged = createEvent<string>('Search query changed');
const searchTriggered = debounce({ source: searchQueryChanged, timeout: 500 });

export const $users = createStore<IUser[]>([]);
export const $usersCount = createStore(0);
export const $isPending = createStore(false);
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
  target: fetchUsersFx,
});

sample({
  clock: loadPage,
  source: { pageSize: $pageSize, searchQuery: $searchQuery },
  fn: ({ pageSize, searchQuery }, pageNumber) => ({
    pageSize,
    pageNumber,
    searchQuery,
  }),
  target: fetchUsersFx,
});

$isPending.on(fetchUsersFx, () => true);

$users.on(fetchUsersFx.doneData, (_, { list }) => {
  return list;
});
$usersCount.on(fetchUsersFx.doneData, (_, { count }) => {
  return count;
});
$pageNumber.on(fetchUsersFx.doneData, (_, { pageNumber }) => pageNumber);

fetchUsersFx.failData.watch((error) => toast.error(error.message));

$isPending.on(fetchUsersFx.finally, () => false);

//
const blockUserFx = createEffect((userId: string) => {
  return usersApi.blockOrUnblockUser({ userId, isActive: false });
});

const unblockUserFx = createEffect((userId: string) => {
  return usersApi.blockOrUnblockUser({ userId, isActive: true });
});

export const blockUser = createEvent<string>('Block user');
export const unblockUser = createEvent<string>('Unblock user');

export const $isBlockingOrUnblocking = createStore(false);

sample({ clock: blockUser, target: blockUserFx });
sample({ clock: unblockUser, target: unblockUserFx });

$isBlockingOrUnblocking.on(blockUserFx, () => true);
$isBlockingOrUnblocking.on(unblockUserFx, () => true);

$isBlockingOrUnblocking.on(blockUserFx.finally, () => false);
$isBlockingOrUnblocking.on(unblockUserFx.finally, () => false);

sample({
  source: {
    pageSize: $pageSize,
    pageNumber: $pageNumber,
    searchQuery: $searchQuery,
  },
  clock: [blockUserFx.done, unblockUserFx.done],
  target: fetchUsersFx,
});
