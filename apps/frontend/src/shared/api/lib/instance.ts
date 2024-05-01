import axios, { AxiosError } from 'axios';
import { ApiError } from './ApiError';
import { API_BASE_URL } from '../../../config';

export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
  withCredentials: true,
});

axiosInstance.interceptors.response.use(undefined, (err: AxiosError) => {
  if (
    err.response &&
    err.response.data &&
    (err.response.data as { message: string }).message
  ) {
    const data = err.response.data as { message: string; statusCode: number };

    return Promise.reject(
      new ApiError(err.name, data.message, data.statusCode),
    );
  }
  return Promise.reject(
    new ApiError(err.name, err.message, Number(err.status)),
  );
});
