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
  [StatusReporte.ABERTO]: 'bg-yellow-100 text-yellow-800',
  [StatusReporte.EM_ANDAMENTO]: 'bg-blue-100 text-blue-800',
  [StatusReporte.RESOLVIDO]: 'bg-green-100 text-green-800',
};

export function StatusBadge({ status, className = '' }: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${statusClasses[status]} ${className}`}
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
  [CategoriaReporte.ILUMINACAO]: 'bg-amber-100 text-amber-800',
  [CategoriaReporte.BURACO_PAVIMENTACAO]: 'bg-orange-100 text-orange-800',
  [CategoriaReporte.LIXO]: 'bg-lime-100 text-lime-800',
  [CategoriaReporte.SINALIZACAO]: 'bg-purple-100 text-purple-800',
  [CategoriaReporte.OUTROS]: 'bg-gray-100 text-gray-800',
};

export function CategoriaBadge({
  categoria,
  className = '',
  onPhoto = false,
}: CategoriaBadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${
        onPhoto
          ? 'bg-black/70 text-white backdrop-blur-sm'
          : categoriaClasses[categoria]
      } ${className}`}
    >
      {categoriaLabels[categoria]}
    </span>
  );
}
