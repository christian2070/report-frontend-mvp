import { NavLink } from 'react-router';

import { AlertaButton } from '@/components/AlertaButton/AlertaButton';
import { FeedFilters } from '@/components/FeedFilters/FeedFilters';
import { InfiniteScrollSentinel } from '@/components/InfiniteScrollSentinel/InfiniteScrollSentinel';
import { ReporteCard } from '@/components/ReporteCard/ReporteCard';
import { Spinner } from '@/components/ui/Spinner';
import type { useFeedScreen, FeedTab } from '@/screens/Feed/FeedScreen.hooks';
import type { Reporte } from '@/types/reporte.types';

interface FeedScreenViewProps {
  tab: FeedTab;
  reportes: Reporte[];
  isLoading: boolean;
  hasMore: boolean;
  sentinelRef: ReturnType<typeof useFeedScreen>['sentinelRef'];
  categoria: ReturnType<typeof useFeedScreen>['categoria'];
  bairro: string;
  ordenacao: ReturnType<typeof useFeedScreen>['ordenacao'];
  isCidadao: boolean;
  onCategoriaChange: ReturnType<typeof useFeedScreen>['onCategoriaChange'];
  onBairroChange: (value: string) => void;
  onOrdenacaoChange: ReturnType<typeof useFeedScreen>['onOrdenacaoChange'];
  onToggleAlerta: (reporte: Reporte) => void;
}

const tabClass = ({ isActive }: { isActive: boolean }) =>
  `rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
    isActive ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'
  }`;

export function FeedScreenView({
  tab,
  reportes,
  isLoading,
  hasMore,
  sentinelRef,
  categoria,
  bairro,
  ordenacao,
  isCidadao,
  onCategoriaChange,
  onBairroChange,
  onOrdenacaoChange,
  onToggleAlerta,
}: FeedScreenViewProps) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Reportes recentes</h1>
        <p className="mt-1 text-sm text-gray-500">
          Acompanhe os problemas reportados na cidade
        </p>
      </div>

      <div className="flex gap-2">
        <NavLink to="/feed" end className={tabClass}>
          Ativos
        </NavLink>
        <NavLink to="/feed/resolvidos" className={tabClass}>
          Resolvidos
        </NavLink>
      </div>

      <FeedFilters
        categoria={categoria}
        bairro={bairro}
        ordenacao={ordenacao}
        showOrdenacao={tab === 'ativos'}
        onCategoriaChange={onCategoriaChange}
        onBairroChange={onBairroChange}
        onOrdenacaoChange={onOrdenacaoChange}
      />

      {isLoading && reportes.length === 0 ? (
        <div className="flex justify-center py-16">
          <Spinner size="lg" />
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {reportes.map((reporte) => (
            <ReporteCard
              key={reporte.id}
              reporte={reporte}
              showResolvedBadge={tab === 'resolvidos'}
              actionSlot={
                tab === 'ativos' && isCidadao ? (
                  <AlertaButton
                    jaAlertado={reporte.jaAlertado}
                    onClick={() => onToggleAlerta(reporte)}
                  />
                ) : undefined
              }
            />
          ))}
        </div>
      )}

      {!isLoading && reportes.length === 0 ? (
        <p className="py-10 text-center text-sm text-gray-500">
          Nenhum reporte encontrado
        </p>
      ) : null}

      <InfiniteScrollSentinel
        sentinelRef={sentinelRef}
        isLoading={isLoading}
        hasMore={hasMore}
      />
    </div>
  );
}
