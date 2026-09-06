import http from '@/config/http';
import type { DashboardResumo } from '@/types/dashboard.types';

export const dashboardService = {
  getResumo() {
    return http.get<DashboardResumo>('/dashboard/resumo').then((res) => res.data);
  },
};
