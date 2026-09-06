import { useEffect, useState } from 'react';

import { useRequestHandler } from '@/hooks/useRequestHandler';
import { dashboardService } from '@/services/dashboard.service';
import type { DashboardResumo } from '@/types/dashboard.types';

async function fetchDashboardResumo() {
  return dashboardService.getResumo();
}

export function useDashboardScreen() {
  const { performRequestWithHandlers } = useRequestHandler();
  const [resumo, setResumo] = useState<DashboardResumo | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const loadResumo = async () => {
    await performRequestWithHandlers({
      setCustomLoader: setIsLoading,
      onRequest: async () => {
        const data = await fetchDashboardResumo();
        setResumo(data);
      },
    });
  };

  useEffect(() => {
    void loadResumo();
  }, []);

  return {
    resumo,
    isLoading,
  };
}
