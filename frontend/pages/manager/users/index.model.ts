import {
  combine,
  createEffect,
  createEvent,
  createStore,
  sample,
} from 'effector';
import { reset } from 'patronum';

import { IUser } from '@/src/types/IUser';

import { ApiError } from '@/src/shared/api';
import * as usersApi from '@/src/shared/api/users';
import { ListOutputDTO } from '@/src/shared/api/lib/types';

const PAGE_SIZE = 12;

export const fetchUsersFx = createEffect<
  { pageSize: number; pageNumber: number },
  ListOutputDTO<IUser> & { pageNumber: number },
  ApiError
>(async ({ pageSize, pageNumber }) => {
  const data = await usersApi.fetchUsers({
    take: pageSize,
    skip: pageSize * pageNumber,
  });

  return { ...data, pageNumber };
});

export const pageMounted = createEvent('Page mounted');
export const loadPage = createEvent<number>('Load another page');

export const $users = createStore<IUser[]>([]);
export const $usersCount = createStore(0);
export const $isPending = createStore(false);
export const $pageSize = createStore(PAGE_SIZE);
export const $pageNumber = createStore(0);
export const $error = createStore('');

reset({
  clock: pageMounted,
  target: [$users, $usersCount, $isPending, $pageSize, $pageNumber],
});

sample({
  clock: pageMounted,
  source: combine({ pageSize: $pageSize, pageNumber: 0 }),
  target: fetchUsersFx,
});

sample({
  clock: loadPage,
  source: $pageSize,
  fn: (pageSize, pageNumber) => ({ pageSize, pageNumber }),
  target: fetchUsersFx,
});

$isPending.on(fetchUsersFx, () => true);

$users.on(fetchUsersFx.doneData, (_, { list }) => {
  return list;
});
$usersCount.on(fetchUsersFx.doneData, (_, { count }) => {
  console.log(0);
  return count;
});
$pageNumber.on(fetchUsersFx.doneData, (_, { pageNumber }) => pageNumber);

$error.on(fetchUsersFx.failData, (_, error) => {
  return error.message;
});

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
  clock: [blockUserFx.done, unblockUserFx.done],
  source: { pageSize: $pageSize, pageNumber: $pageNumber },
  target: fetchUsersFx,
});
