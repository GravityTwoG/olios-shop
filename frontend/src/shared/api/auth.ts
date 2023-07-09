import { createEffect } from 'effector';
import { axiosInstance } from './lib/instance';
import { IUser, UserSchema } from '@/src/types/IUser';
import { ApiError } from './lib/ApiError';

const BASE_ROUTE = '/auth';

export type ILoginCredentials = {
  email: string;
  password: string;
};

export type IRegisterCredentials = {
  email: string;
  password: string;
};

export type IRegisterEmployeeCredentials = {
  email: string;
  password: string;
  inviteCode: string;
};

export const loginFx = createEffect<ILoginCredentials, IUser, ApiError>(
  async (credentials): Promise<IUser> => {
    const res = await axiosInstance.post(`${BASE_ROUTE}/login`, {
      ...credentials,
    });

    return UserSchema.parse(res.data);
  },
);

export const registerFx = createEffect<IRegisterCredentials, IUser, ApiError>(
  async (credentials): Promise<IUser> => {
    const res = await axiosInstance.post(`${BASE_ROUTE}/register-customer`, {
      ...credentials,
    });

    return UserSchema.parse(res.data);
  },
);

export const registerEmployeeFx = createEffect<
  IRegisterEmployeeCredentials,
  IUser,
  ApiError
>(async (credentials): Promise<IUser> => {
  const res = await axiosInstance.post(`${BASE_ROUTE}/register-employee`, {
    ...credentials,
  });

  return UserSchema.parse(res.data);
});

export const fetchSessionFx = createEffect<void, IUser, ApiError>(
  async (): Promise<IUser> => {
    const res = await axiosInstance.get(`${BASE_ROUTE}/me`);

    return UserSchema.parse(res.data);
  },
);

export const logoutFx = createEffect<void, void, ApiError>(
  async (): Promise<void> => {
    await axiosInstance.post(`${BASE_ROUTE}/logout`);
  },
);
