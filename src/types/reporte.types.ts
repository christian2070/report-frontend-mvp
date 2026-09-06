import type {
  CategoriaReporte,
  OrdenacaoFeed,
  StatusReporte,
} from '@/types/enums';
import type { PaginatedQuery } from '@/types/api.types';

export interface ReporteAutor {
  id: string;
  nome: string;
}

export interface Reporte {
  id: string;
  foto: string;
  descricao: string;
  categoria: CategoriaReporte;
  localizacao: string;
  status: StatusReporte;
  totalAlertas: number;
  jaAlertado: boolean;
  autor: ReporteAutor;
  createdAt: string;
  updatedAt?: string;
}

export interface ReporteListResponse {
  data: Reporte[];
  page: number;
  totalPages: number;
  totalItems: number;
}

export interface ReporteListQuery extends PaginatedQuery {
  ordenacao?: OrdenacaoFeed;
  categoria?: CategoriaReporte;
  bairro?: string;
  status?: StatusReporte;
}

export interface CreateReporteResponse {
  id: string;
  foto: string;
  descricao: string;
  categoria: CategoriaReporte;
  localizacao: string;
  status: StatusReporte;
  autorId: string;
  totalAlertas: number;
  createdAt: string;
}

export interface StatusUpdateRequest {
  status: StatusReporte;
}

export interface StatusUpdateResponse {
  id: string;
  status: StatusReporte;
  updatedAt: string;
}

export interface CreateReporteFormData {
  foto: File;
  descricao: string;
  categoria: CategoriaReporte;
  localizacao: string;
}
