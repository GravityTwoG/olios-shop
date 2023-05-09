import { axiosInstance } from './instance';

const BASE_ROUTE = '/auth';

export type ILoginCredentials = {
  email: string;
  password: string;
};

export type IRegisterCredentials = {
  email: string;
  password: string;
};

export async function login(credentials: ILoginCredentials) {
  const res = await axiosInstance.post(`${BASE_ROUTE}/login`, {
    ...credentials,
  });

  return res.data;
}

export async function register(credentials: IRegisterCredentials) {
  const res = await axiosInstance.post(`${BASE_ROUTE}/register-customer`, {
    ...credentials,
  });

  return res.data;
}

export async function check() {
  const res = await axiosInstance.get(`${BASE_ROUTE}/me`);

  return res.data;
}

export async function logout() {
  const res = await axiosInstance.post(`${BASE_ROUTE}/logout`);

  return res.data;
}