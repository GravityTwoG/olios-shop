import axios, { AxiosError } from 'axios';
import { ApiError } from './ApiError';

let baseUrl: string = 'http://localhost:5000';

if (process.env.NODE_ENV === 'production') {
  baseUrl = '/api/v1';
}

export const axiosInstance = axios.create({
  baseURL: baseUrl,
  timeout: 5000,
  withCredentials: true,
});

axiosInstance.interceptors.response.use(undefined, (err: AxiosError) => {
  if (err.response && err.response.data && (err.response.data as any).message) {
    const data: any = err.response.data;

    return Promise.reject(
      new ApiError(err.name, data.message, data.statusCode),
    );
  }
  return Promise.reject(
    new ApiError(err.name, err.message, Number(err.status)),
  );
});
