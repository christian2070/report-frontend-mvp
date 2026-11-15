import { MapPin } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';
import { Link } from 'react-router';

import { CategoriaBadge, StatusBadge } from '@/components/ui/Badge';
import type { Reporte } from '@/types/reporte.types';
import { StatusReporte } from '@/types/enums';
import { buildAssetUrl } from '@/utils/buildAssetUrl';

interface ReporteCardProps {
  reporte: Reporte;
  actionSlot?: ReactNode;
  showResolvedBadge?: boolean;
  index?: number;
}

export function ReporteCard({
  reporte,
  actionSlot,
  showResolvedBadge = false,
  index = 0,
}: ReporteCardProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.05, 0.35), ease: [0.22, 1, 0.36, 1] }}
      className="group overflow-hidden rounded-card border border-gray-200 bg-white shadow-soft transition-shadow duration-300 hover:shadow-lift"
    >
      <Link to={`/reportes/${reporte.id}`} className="relative block overflow-hidden">
        <img
          src={buildAssetUrl(reporte.foto)}
          alt={reporte.descricao}
          className="aspect-[4/3] w-full object-cover transition-transform duration-300 ease-smooth group-hover:scale-[1.03]"
        />
        <div className="absolute left-3 top-3">
          <CategoriaBadge categoria={reporte.categoria} onPhoto />
        </div>
      </Link>

      <div className="space-y-3 p-4">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-1.5 text-caption">
            <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden />
            <span className="line-clamp-1">{reporte.localizacao}</span>
          </div>
          {showResolvedBadge || reporte.status === StatusReporte.RESOLVIDO ? (
            <StatusBadge status={StatusReporte.RESOLVIDO} />
          ) : null}
        </div>

        <Link to={`/reportes/${reporte.id}`} className="block">
          <p className="line-clamp-2 text-sm font-medium leading-relaxed text-gray-900">
            {reporte.descricao}
          </p>
        </Link>

        <div className="flex items-center justify-between gap-3 border-t border-gray-100 pt-3">
          <div className="min-w-0">
            <p className="truncate text-xs font-medium text-gray-900">{reporte.autor.nome}</p>
            <p className="text-caption">{reporte.totalAlertas} confirmações</p>
          </div>
          {actionSlot}
        </div>
      </div>
    </motion.article>
  );
}
