import { axiosInstance } from './instance';

export type ILoginCredentials = {
  email: string;
  password: string;
};

export type IRegisterCredentials = {
  email: string;
  password: string;
};

export async function login(credentials: ILoginCredentials) {
  const res = await axiosInstance.post('/auth/login', {
    ...credentials,
  });

  return res.data;
}

export async function register(credentials: IRegisterCredentials) {
  const res = await axiosInstance.post('/auth/register', {
    ...credentials,
  });

  return res.data;
}

export async function check() {
  const res = await axiosInstance.get('/auth/register');

  return res.data;
}

export async function logout() {
  const res = await axiosInstance.post('/auth/logout');

  return res.data;
}
