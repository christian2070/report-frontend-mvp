import type { CategoriaReporte, StatusReporte } from '@/types/enums';

export interface DashboardResumo {
  totalReportes: number;
  porStatus: Record<StatusReporte, number>;
  porCategoria: Record<CategoriaReporte, number>;
}
