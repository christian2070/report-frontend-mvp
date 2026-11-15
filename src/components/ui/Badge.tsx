import { Check } from 'lucide-react';
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
      className={`inline-flex items-center gap-1 rounded-pill border border-gray-200 bg-white/95 px-2.5 py-1 text-xs font-semibold text-gray-900 backdrop-blur-sm ${className}`}
    >
      {children}
    </span>
  );
}

interface StatusBadgeProps {
  status: StatusReporte;
  className?: string;
}

export function StatusBadge({ status, className = '' }: StatusBadgeProps) {
  const label = statusLabels[status];

  if (status === StatusReporte.ABERTO) {
    return (
      <span
        className={`inline-flex items-center gap-1.5 rounded-pill border-2 border-black bg-white px-2.5 py-1 text-xs font-semibold text-black ${className}`}
      >
        <span className="h-2 w-2 rounded-full border border-black" aria-hidden />
        {label}
      </span>
    );
  }

  if (status === StatusReporte.EM_ANDAMENTO) {
    return (
      <span
        className={`inline-flex items-center gap-1.5 rounded-pill border-2 border-black bg-[repeating-linear-gradient(135deg,#000_0_4px,#fff_4px_8px)] px-2.5 py-1 text-xs font-semibold text-black ${className}`}
      >
        <span className="rounded-pill bg-white/90 px-1.5 py-0.5">{label}</span>
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-pill border-2 border-black bg-black px-2.5 py-1 text-xs font-semibold text-white ${className}`}
    >
      <Check className="h-3.5 w-3.5" aria-hidden />
      {label}
    </span>
  );
}

interface CategoriaBadgeProps {
  categoria: CategoriaReporte;
  className?: string;
  onPhoto?: boolean;
}

export function CategoriaBadge({
  categoria,
  className = '',
  onPhoto = false,
}: CategoriaBadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-pill px-2.5 py-1 text-xs font-semibold ${
        onPhoto
          ? 'bg-black/80 text-white backdrop-blur-sm'
          : 'border border-gray-200 bg-gray-100 text-gray-900'
      } ${className}`}
    >
      {categoriaLabels[categoria]}
    </span>
  );
}
