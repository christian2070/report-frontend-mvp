import axios, { type AxiosError, type AxiosInstance } from 'axios';

import { TOKEN_STORAGE_KEY } from '@/constants/storageKeys';
import type { ApiError } from '@/types/api.types';

const http: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

http.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_STORAGE_KEY);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

http.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiError>) => {
    const token = localStorage.getItem(TOKEN_STORAGE_KEY);

    if (error.response?.status === 401 && token) {
      localStorage.removeItem(TOKEN_STORAGE_KEY);
      window.dispatchEvent(new CustomEvent('auth:logout'));
    }

    return Promise.reject(error);
  },
);

export default http;
