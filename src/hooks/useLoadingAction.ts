import type { AxiosError } from 'axios';

import { useHttpErrorHandler } from '@/hooks/useHttpErrorHandler';
import { useLayout } from '@/hooks/useLayout';
import type { ApiError } from '@/types/api.types';

interface LoadingActionOptions {
  action: () => Promise<void>;
  onError?: (error: AxiosError<ApiError>) => Promise<void> | void;
  onFinally?: () => Promise<void> | void;
  setLoading?: (state: boolean) => void;
  showErrorMessage?: boolean;
}

export function useLoadingAction() {
  const { setLoading: setGlobalLoading } = useLayout();
  const { handleError } = useHttpErrorHandler();

  const execute = async (options: Readonly<LoadingActionOptions>) => {
    const {
      action,
      onError,
      onFinally,
      setLoading: setLocalLoading,
      showErrorMessage = true,
    } = options;

    const updateLoading = (state: boolean) => {
      if (setLocalLoading) {
        setLocalLoading(state);
        return;
      }

      setGlobalLoading(state);
    };

    try {
      updateLoading(true);
      await action();
    } catch (err) {
      await handleError(err, { onError, showErrorMessage });
    } finally {
      await onFinally?.();
      updateLoading(false);
    }
  };

  return { execute };
}
