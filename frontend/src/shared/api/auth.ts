import { createEffect } from 'effector';
import { axiosInstance } from './lib/instance';
import { IUser, UserSchema } from '@/src/types/IUser';

const BASE_ROUTE = '/auth';

export type ILoginCredentials = {
  email: string;
  password: string;
};

export type IRegisterCredentials = {
  email: string;
  password: string;
};

export const loginFx = createEffect<ILoginCredentials, IUser>(
  async (credentials): Promise<IUser> => {
    const res = await axiosInstance.post(`${BASE_ROUTE}/login`, {
      ...credentials,
    });

    return UserSchema.parse(res.data);
  },
);

export const registerFx = createEffect<IRegisterCredentials, IUser>(
  async (credentials): Promise<IUser> => {
    const res = await axiosInstance.post(`${BASE_ROUTE}/register-customer`, {
      ...credentials,
    });

    return UserSchema.parse(res.data);
  },
);

export const fetchSessionFx = createEffect<void, IUser>(
  async (): Promise<IUser> => {
    const res = await axiosInstance.get(`${BASE_ROUTE}/me`);

    return UserSchema.parse(res.data);
  },
);

export const logoutFx = createEffect<void, void>(async (): Promise<void> => {
  await axiosInstance.post(`${BASE_ROUTE}/logout`);
});
