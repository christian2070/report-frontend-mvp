import http from '@/config/http';
import type { AlertaResponse } from '@/types/alerta.types';

export const alertasService = {
  create(reporteId: string) {
    return http
      .post<AlertaResponse>(`/reportes/${reporteId}/alertas`)
      .then((res) => res.data);
  },

  remove(reporteId: string) {
    return http
      .delete<AlertaResponse>(`/reportes/${reporteId}/alertas`)
      .then((res) => res.data);
  },
};
