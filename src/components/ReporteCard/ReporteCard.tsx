import { AlertTriangle, ImageOff, MapPin } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { useState, type ReactNode } from 'react';
import { Link } from 'react-router';

import { CategoriaBadge, StatusBadge } from '@/components/ui/Badge';
import type { Reporte } from '@/types/reporte.types';
import { StatusReporte } from '@/types/enums';
import { buildAssetUrl } from '@/utils/buildAssetUrl';
import { ReporteOwnerActions } from '@/components/ReporteOwnerActions/ReporteOwnerActions';

interface ReporteCardProps {
  reporte: Reporte;
  actionSlot?: ReactNode;
  showResolvedBadge?: boolean;
  index?: number;
  onDeleted?: (id: string) => void;
}

export function ReporteCard({
  reporte,
  actionSlot,
  showResolvedBadge = false,
  index = 0,
  onDeleted,
}: ReporteCardProps) {
  const reduceMotion = useReducedMotion();
  const [imageState, setImageState] = useState<'loading' | 'loaded' | 'error'>(
    'loading',
  );
  const status = showResolvedBadge ? StatusReporte.RESOLVIDO : reporte.status;

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: Math.min(index * 0.04, 0.28),
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={reduceMotion ? undefined : { y: -2 }}
      className="group relative flex flex-col rounded-[20px] bg-white p-2.5 shadow-sm transition-shadow duration-300 hover:shadow-soft has-[a:focus-visible]:ring-2 has-[a:focus-visible]:ring-blue-500 has-[a:focus-visible]:ring-offset-2 has-[a:focus-visible]:ring-offset-gray-50"
    >
      <div className="relative overflow-hidden rounded-card bg-gray-100">
        <img
          src={buildAssetUrl(reporte.foto)}
          alt={reporte.descricao}
          loading="lazy"
          decoding="async"
          onLoad={() => setImageState('loaded')}
          onError={() => setImageState('error')}
          className={`aspect-[4/3] w-full object-cover transition-[transform,opacity] duration-500 ease-smooth group-hover:scale-[1.025] ${
            imageState === 'loaded' ? 'opacity-100' : 'opacity-0'
          }`}
        />
        {imageState === 'loading' ? (
          <div
            aria-hidden
            className="absolute inset-0 animate-pulse bg-gray-200"
          />
        ) : null}
        {imageState === 'error' ? (
          <div className="absolute inset-0 flex items-center justify-center text-gray-400">
            <ImageOff className="h-6 w-6" aria-hidden />
          </div>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col gap-3.5 px-2.5 pb-2.5 pt-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <CategoriaBadge categoria={reporte.categoria} />
          <StatusBadge status={status} />
        </div>

        <Link
          to={`/reportes/${reporte.id}`}
          className="block outline-none after:absolute after:inset-0 after:rounded-[20px] focus-visible:ring-0 focus-visible:ring-offset-0"
        >
          <p className="line-clamp-2 text-[15px] font-semibold leading-snug tracking-tight text-gray-900">
            {reporte.descricao}
          </p>
        </Link>

        <div className="mt-auto flex min-h-9 items-center justify-between gap-3 pt-0.5">
          <div className="flex min-w-0 items-center gap-1.5 text-sm text-gray-500">
            <MapPin className="h-4 w-4 shrink-0 text-gray-400" aria-hidden />
            <span className="truncate">{reporte.localizacao}</span>
          </div>

          {actionSlot ?? (
            <span
              className="inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-gray-500 tabular-nums"
              aria-label={`${reporte.totalAlertas} confirmações`}
            >
              <AlertTriangle className="h-4 w-4 text-gray-400" aria-hidden />
              {reporte.totalAlertas}
            </span>
          )}
        </div>
        <ReporteOwnerActions reporte={reporte} onDeleted={onDeleted} />
      </div>
    </motion.article>
  );
}
