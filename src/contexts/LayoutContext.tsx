import {
  createContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { toast } from 'sonner';

export type NotifyType = 'error' | 'success' | 'warning' | 'info';

export interface LayoutContextValue {
  loading: boolean;
  setLoading: (state: boolean) => void;
  notify: (type: NotifyType, title: string, subtitle?: string) => void;
}

export const LayoutContext = createContext<LayoutContextValue | null>(null);

interface LayoutProviderProps {
  children: ReactNode;
}

export function LayoutProvider({ children }: LayoutProviderProps) {
  const [loading, setLoading] = useState(false);

  const notify = (type: NotifyType, title: string, subtitle?: string) => {
    toast[type](title, {
      description: subtitle,
      duration: 2500,
    });
  };

  const value = useMemo(
    () => ({
      loading,
      setLoading,
      notify,
    }),
    [loading],
  );

  return (
    <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>
  );
}
