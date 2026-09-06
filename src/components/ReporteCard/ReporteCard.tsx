import { MapPin } from 'lucide-react';
import type { ReactNode } from 'react';
import { Link } from 'react-router';

import { CategoriaBadge } from '@/components/CategoriaBadge/CategoriaBadge';
import { StatusBadge } from '@/components/StatusBadge/StatusBadge';
import type { Reporte } from '@/types/reporte.types';
import { StatusReporte } from '@/types/enums';
import { buildAssetUrl } from '@/utils/buildAssetUrl';

interface ReporteCardProps {
  reporte: Reporte;
  actionSlot?: ReactNode;
  showResolvedBadge?: boolean;
}

export function ReporteCard({
  reporte,
  actionSlot,
  showResolvedBadge = false,
}: ReporteCardProps) {
  return (
    <article className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <Link to={`/reportes/${reporte.id}`}>
        <img
          src={buildAssetUrl(reporte.foto)}
          alt={reporte.descricao}
          className="aspect-[4/3] w-full object-cover"
        />
      </Link>

      <div className="space-y-3 p-4">
        <div className="flex items-start justify-between gap-2">
          <CategoriaBadge categoria={reporte.categoria} />
          {showResolvedBadge || reporte.status === StatusReporte.RESOLVIDO ? (
            <StatusBadge status={StatusReporte.RESOLVIDO} />
          ) : (
            actionSlot
          )}
        </div>

        <Link to={`/reportes/${reporte.id}`} className="block space-y-2">
          <p className="line-clamp-2 text-sm text-gray-800">{reporte.descricao}</p>
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <MapPin className="h-3.5 w-3.5" />
            <span>{reporte.localizacao}</span>
          </div>
        </Link>

        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>{reporte.autor.nome}</span>
          <span>{reporte.totalAlertas} alertas</span>
        </div>
      </div>
    </article>
  );
}
