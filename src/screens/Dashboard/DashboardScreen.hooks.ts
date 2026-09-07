import { useEffect, useState } from 'react';

import { useLoadingAction } from '@/hooks/useLoadingAction';
import { dashboardService } from '@/services/dashboard.service';
import type { DashboardResumo } from '@/types/dashboard.types';

async function fetchDashboardResumo() {
  return dashboardService.getResumo();
}

export function useDashboardScreen() {
  const { execute } = useLoadingAction();
  const [resumo, setResumo] = useState<DashboardResumo | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const loadResumo = async () => {
    await execute({
      setLoading: setIsLoading,
      action: async () => {
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
