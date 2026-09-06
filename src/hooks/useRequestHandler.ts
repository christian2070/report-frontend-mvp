import type { AxiosError } from 'axios';

import { useLayout } from '@/hooks/useLayout';
import type { ApiError } from '@/types/api.types';
import {
  formatErrorMessage,
  normalizeHttpError,
} from '@/utils/normalizeHttpError';

interface PerformRequestWithHandlersOptions {
  onRequest?: (throwMessage: (message?: string) => void) => Promise<void>;
  onError?: (error: AxiosError<ApiError>) => Promise<void> | void;
  onFinish?: () => Promise<void> | void;
  setCustomLoader?: (state: boolean) => void;
  showErrorMessage?: boolean;
}

const voidFn = async () => {};

function setLoader(
  state: boolean,
  setLoading: (value: boolean) => void,
  setCustomLoader?: (state: boolean) => void,
) {
  if (setCustomLoader) {
    setCustomLoader(state);
    return;
  }

  setLoading(state);
}

export function useRequestHandler() {
  const { setLoading, notify } = useLayout();

  const performRequestWithHandlers = async (
    handlers: Readonly<PerformRequestWithHandlersOptions>,
  ) => {
    const {
      onError = voidFn,
      onFinish = voidFn,
      onRequest = voidFn,
      showErrorMessage = true,
      setCustomLoader,
    } = handlers;

    try {
      setLoader(true, setLoading, setCustomLoader);
      await onRequest((message) => {
        if (message) {
          notify('success', 'Sucesso', message);
        }
      });
    } catch (err) {
      const error = err as AxiosError<ApiError>;
      const normalizedError = normalizeHttpError(error);

      await onError(error);

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
    } finally {
      await onFinish();
      setLoader(false, setLoading, setCustomLoader);
    }
  };

  return { performRequestWithHandlers };
}
