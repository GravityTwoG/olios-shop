import { IUser } from '@/src/types/IUser';
import { axiosInstance } from './lib';

import { UserResponseSchema } from './users';

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

export const register = async (
  credentials: IRegisterCredentials,
): Promise<IUser> => {
  const res = await axiosInstance.post(`${BASE_ROUTE}/register-customer`, {
    ...credentials,
  });

  return UserResponseSchema.parse(res.data).data;
};

export const registerEmployee = async (
  credentials: IRegisterEmployeeCredentials,
): Promise<IUser> => {
  const res = await axiosInstance.post(`${BASE_ROUTE}/register-employee`, {
    ...credentials,
  });

  return UserResponseSchema.parse(res.data).data;
};

export const login = async (credentials: ILoginCredentials): Promise<IUser> => {
  const res = await axiosInstance.post(`${BASE_ROUTE}/login`, {
    ...credentials,
  });

  return UserResponseSchema.parse(res.data).data;
};

export const fetchSession = async (): Promise<IUser> => {
  const res = await axiosInstance.get(`${BASE_ROUTE}/me`);

  return UserResponseSchema.parse(res.data).data;
};

export const logout = async (): Promise<void> => {
  await axiosInstance.post(`${BASE_ROUTE}/logout`);
};
