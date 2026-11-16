import http from '@/config/http';
import type {
  CreateReporteFormData,
  CreateReporteResponse,
  Reporte,
  ReporteListQuery,
  ReporteListResponse,
  StatusUpdateRequest,
  StatusUpdateResponse,
  UpdateReporteFormData,
} from '@/types/reporte.types';

function buildReporteFormData(
  data: CreateReporteFormData | UpdateReporteFormData,
): FormData {
  const formData = new FormData();
  if (data.foto) formData.append('foto', data.foto);
  formData.append('descricao', data.descricao);
  formData.append('categoria', data.categoria);
  formData.append('localizacao', data.localizacao);
  return formData;
}

export const reportesService = {
  list(params: ReporteListQuery) {
    return http
      .get<ReporteListResponse>('/reportes', { params })
      .then((res) => res.data);
  },

  listResolvidos(params: ReporteListQuery) {
    return http
      .get<ReporteListResponse>('/reportes/resolvidos', { params })
      .then((res) => res.data);
  },

  getById(id: string) {
    return http.get<Reporte>(`/reportes/${id}`).then((res) => res.data);
  },

  create(data: CreateReporteFormData) {
    return http
      .post<CreateReporteResponse>('/reportes', buildReporteFormData(data), {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then((res) => res.data);
  },

  updateStatus(id: string, data: StatusUpdateRequest) {
    return http
      .patch<StatusUpdateResponse>(`/reportes/${id}/status`, data)
      .then((res) => res.data);
  },

  update(id: string, data: UpdateReporteFormData) {
    return http
      .patch<Reporte>(`/reportes/${id}`, buildReporteFormData(data))
      .then((res) => res.data);
  },

  remove(id: string) {
    return http.delete<void>(`/reportes/${id}`).then((res) => res.data);
  },
};
