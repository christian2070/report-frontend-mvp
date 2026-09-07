import type { AxiosError } from 'axios';

import { useLayout } from '@/hooks/useLayout';
import type { ApiError } from '@/types/api.types';
import {
  formatErrorMessage,
  normalizeHttpError,
} from '@/utils/normalizeHttpError';

interface HandleHttpErrorOptions {
  onError?: (error: AxiosError<ApiError>) => Promise<void> | void;
  showErrorMessage?: boolean;
}

export function useHttpErrorHandler() {
  const { notify } = useLayout();

  const handleError = async (
    err: unknown,
    options: Readonly<HandleHttpErrorOptions> = {},
  ) => {
    const { onError, showErrorMessage = true } = options;
    const error = err as AxiosError<ApiError>;
    const normalizedError = normalizeHttpError(error);

    await onError?.(error);

    if (showErrorMessage) {
      notify(
        'error',
        'Erro',
        formatErrorMessage(
          normalizedError.response?.data?.message,
          normalizedError.message || 'Ocorreu um erro inesperado',
        ),
      );
    }
  };

  return { handleError };
}
