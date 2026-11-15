import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router';

import { AnimatedCount } from '@/components/ui/AnimatedCount';
import { DashboardSkeleton } from '@/components/ui/Skeleton';
import { PageTransition } from '@/components/ui/PageTransition';
import type { useDashboardScreen } from '@/screens/Dashboard/DashboardScreen.hooks';
import { StatusReporte } from '@/types/enums';
import { categoriaLabels, statusLabels } from '@/utils/labels';

interface DashboardScreenViewProps {
  resumo: ReturnType<typeof useDashboardScreen>['resumo'];
  isLoading: boolean;
}

export function DashboardScreenView({ resumo, isLoading }: DashboardScreenViewProps) {
  if (isLoading) {
    return <DashboardSkeleton />;
  }

  if (!resumo) {
    return null;
  }

  const maxCategoria = Math.max(...Object.values(resumo.porCategoria), 1);
  const metrics = [
    { key: 'total', label: 'Total', value: resumo.totalReportes },
    {
      key: StatusReporte.ABERTO,
      label: statusLabels[StatusReporte.ABERTO],
      value: resumo.porStatus[StatusReporte.ABERTO] ?? 0,
    },
    {
      key: StatusReporte.EM_ANDAMENTO,
      label: statusLabels[StatusReporte.EM_ANDAMENTO],
      value: resumo.porStatus[StatusReporte.EM_ANDAMENTO] ?? 0,
    },
    {
      key: StatusReporte.RESOLVIDO,
      label: statusLabels[StatusReporte.RESOLVIDO],
      value: resumo.porStatus[StatusReporte.RESOLVIDO] ?? 0,
    },
  ];

  return (
    <PageTransition className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-display">Dashboard</h1>
          <p className="mt-2 text-sm text-gray-600">
            Visão geral histórica dos reportes da cidade
          </p>
        </div>

        <Link
          to="/feed"
          className="inline-flex items-center gap-2 text-sm font-semibold text-black underline decoration-transparent underline-offset-4 transition-colors hover:decoration-black"
        >
          Ver reportes em aberto
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => (
          <div
            key={metric.key}
            className="rounded-card border border-gray-200 bg-white p-5 shadow-soft"
          >
            <p className="text-caption">{metric.label}</p>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900">
              <AnimatedCount value={metric.value} />
            </p>
          </div>
        ))}
      </div>

      <div>
        <h2 className="mb-4 text-title">Por categoria</h2>
        <div className="space-y-4 rounded-card border border-gray-200 bg-white p-5 sm:p-6">
          {Object.entries(resumo.porCategoria).map(([categoria, total]) => (
            <div key={categoria}>
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="font-medium text-gray-900">
                  {categoriaLabels[categoria as keyof typeof categoriaLabels]}
                </span>
                <span className="tabular-nums text-gray-600">{total}</span>
              </div>
              <div className="h-2.5 overflow-hidden rounded-pill bg-gray-100">
                <div
                  className="h-full origin-left rounded-pill bg-black animate-bar-grow"
                  style={{ width: `${(total / maxCategoria) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageTransition>
  );
}
