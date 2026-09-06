import type { AxiosError } from 'axios';

import type { ApiError } from '@/types/api.types';

export interface NormalizedHttpError {
  status?: number;
  message: string;
  response?: {
    data?: ApiError;
  };
}

export function normalizeHttpError(error: AxiosError<ApiError>): NormalizedHttpError {
  return {
    status: error.response?.status,
    message: error.message,
    response: error.response
      ? { data: error.response.data }
      : undefined,
  };
}

export function formatErrorMessage(
  apiMessage: string | undefined,
  fallback: string,
): string {
  return apiMessage?.trim() || fallback;
}

export function getHttpErrorStatus(error: AxiosError<ApiError>): number | undefined {
  return error.response?.status;
}
