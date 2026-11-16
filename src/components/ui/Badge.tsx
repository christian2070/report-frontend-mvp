import type { ReactNode } from 'react';

import { CategoriaReporte, StatusReporte } from '@/types/enums';
import { categoriaLabels, statusLabels } from '@/utils/labels';

interface BadgeProps {
  children: ReactNode;
  className?: string;
}

export function Badge({ children, className = '' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${className}`}
    >
      {children}
    </span>
  );
}

interface StatusBadgeProps {
  status: StatusReporte;
  className?: string;
}

const statusClasses: Record<StatusReporte, string> = {
  [StatusReporte.ABERTO]: 'bg-amber-50 text-amber-800',
  [StatusReporte.EM_ANDAMENTO]: 'bg-blue-50 text-blue-800',
  [StatusReporte.RESOLVIDO]: 'bg-emerald-50 text-emerald-800',
};

export function StatusBadge({ status, className = '' }: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-0.5 text-[11px] font-medium tracking-wide ${statusClasses[status]} ${className}`}
    >
      {statusLabels[status]}
    </span>
  );
}

interface CategoriaBadgeProps {
  categoria: CategoriaReporte;
  className?: string;
  onPhoto?: boolean;
}

const categoriaClasses: Record<CategoriaReporte, string> = {
  [CategoriaReporte.ILUMINACAO]: 'bg-amber-50 text-amber-800',
  [CategoriaReporte.BURACO_PAVIMENTACAO]: 'bg-orange-50 text-orange-800',
  [CategoriaReporte.LIXO]: 'bg-lime-50 text-lime-800',
  [CategoriaReporte.SINALIZACAO]: 'bg-violet-50 text-violet-800',
  [CategoriaReporte.OUTROS]: 'bg-gray-100 text-gray-700',
};

export function CategoriaBadge({
  categoria,
  className = '',
  onPhoto = false,
}: CategoriaBadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-medium tracking-wide ${
        onPhoto
          ? 'bg-black/70 text-white backdrop-blur-sm'
          : categoriaClasses[categoria]
      } ${className}`}
    >
      {categoriaLabels[categoria]}
    </span>
  );
}
