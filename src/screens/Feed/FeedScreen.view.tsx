import { AlertaButton } from '@/components/AlertaButton/AlertaButton';
import { FeedFilters } from '@/components/FeedFilters/FeedFilters';
import { InfiniteScrollSentinel } from '@/components/InfiniteScrollSentinel/InfiniteScrollSentinel';
import { ReporteCard } from '@/components/ReporteCard/ReporteCard';
import { EmptyState } from '@/components/ui/EmptyState';
import { PageTransition } from '@/components/ui/PageTransition';
import { ReporteCardSkeleton } from '@/components/ui/Skeleton';
import { Tabs } from '@/components/ui/Tabs';
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

export function FeedScreenView({
  tab,
  reportes = [],
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
    <PageTransition className="space-y-6">
      <div>
        <h1 className="text-display">Reportes</h1>
        <p className="mt-2 text-sm text-gray-600">
          Acompanhe os problemas reportados na cidade
        </p>
      </div>

      <Tabs
        layoutId="feed-tabs"
        items={[
          { to: '/feed', label: 'Ativos', end: true },
          { to: '/feed/resolvidos', label: 'Resolvidos' },
        ]}
      />

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
        <div className="grid gap-4 sm:grid-cols-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <ReporteCardSkeleton key={index} />
          ))}
        </div>
      ) : reportes.length === 0 ? (
        <EmptyState
          title="Nenhum reporte encontrado"
          description="Tente ajustar os filtros ou volte mais tarde para ver novos registros."
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {reportes.map((reporte, index) => (
            <ReporteCard
              key={reporte.id}
              reporte={reporte}
              index={index}
              showResolvedBadge={tab === 'resolvidos'}
              actionSlot={
                tab === 'ativos' && isCidadao ? (
                  <AlertaButton
                    jaAlertado={reporte.jaAlertado}
                    totalAlertas={reporte.totalAlertas}
                    showCount
                    onClick={() => onToggleAlerta(reporte)}
                  />
                ) : undefined
              }
            />
          ))}
        </div>
      )}

      <InfiniteScrollSentinel
        sentinelRef={sentinelRef}
        isLoading={isLoading && reportes.length > 0}
        hasMore={hasMore}
      />
    </PageTransition>
  );
}
