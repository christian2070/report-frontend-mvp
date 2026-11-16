import { CheckCircle2, Inbox, SearchX } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

import { AlertaButton } from '@/components/AlertaButton/AlertaButton';
import {
  ClearFiltersLink,
  FeedFilters,
} from '@/components/FeedFilters/FeedFilters';
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
  onDeleted: (id: string) => void;
}

const gridClass = 'grid min-w-0 grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3';

const listMotion = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -6 },
};

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
  onDeleted,
}: FeedScreenViewProps) {
  const reduceMotion = useReducedMotion();
  const hasSearchFilters = Boolean(categoria) || Boolean(bairro.trim());
  const isInitialLoading = isLoading && reportes.length === 0;
  const listKey = `${tab}-${categoria || 'all'}-${bairro.trim()}-${ordenacao}`;

  const emptyState = hasSearchFilters
    ? {
        icon: SearchX,
        title: 'Nenhum resultado',
        description: 'Nenhum reporte corresponde aos filtros selecionados.',
      }
    : tab === 'resolvidos'
      ? {
          icon: CheckCircle2,
          title: 'Nenhum reporte resolvido ainda',
          description:
            'Os problemas resolvidos pela prefeitura aparecerão aqui.',
        }
      : {
          icon: Inbox,
          title: 'Nenhum reporte por aqui',
          description: 'Volte mais tarde para acompanhar novos registros.',
        };

  return (
    <PageTransition className="space-y-7 sm:space-y-9">
      <header className="relative overflow-hidden rounded-[28px] bg-gradient-to-b from-blue-50 to-white px-5 py-7 sm:px-8 sm:py-8">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-blue-100/50 blur-3xl"
        />
        <div className="relative flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <h1 className="text-display text-gray-900">Reportes</h1>
            <p className="mt-2 text-sm text-gray-500 sm:text-base">
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
        </div>
      </header>

      <FeedFilters
        categoria={categoria}
        bairro={bairro}
        ordenacao={ordenacao}
        showOrdenacao={tab === 'ativos'}
        onCategoriaChange={onCategoriaChange}
        onBairroChange={onBairroChange}
        onOrdenacaoChange={onOrdenacaoChange}
      />

      <AnimatePresence mode="wait" initial={false}>
        {isInitialLoading ? (
          <motion.div
            key="loading"
            className={gridClass}
            aria-busy="true"
            aria-label="Carregando reportes"
            {...(reduceMotion
              ? {}
              : {
                  initial: listMotion.initial,
                  animate: listMotion.animate,
                  exit: listMotion.exit,
                  transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] },
                })}
          >
            {Array.from({ length: 6 }).map((_, index) => (
              <ReporteCardSkeleton
                key={index}
                className={
                  index >= 4
                    ? 'hidden lg:block'
                    : index >= 2
                      ? 'hidden sm:block'
                      : ''
                }
              />
            ))}
          </motion.div>
        ) : reportes.length === 0 ? (
          <motion.div
            key="empty"
            {...(reduceMotion
              ? {}
              : {
                  initial: listMotion.initial,
                  animate: listMotion.animate,
                  exit: listMotion.exit,
                  transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] },
                })}
          >
            <EmptyState
              icon={emptyState.icon}
              title={emptyState.title}
              description={emptyState.description}
              action={
                hasSearchFilters ? (
                  <ClearFiltersLink
                    onClick={() => {
                      onCategoriaChange('');
                      onBairroChange('');
                    }}
                  />
                ) : undefined
              }
            />
          </motion.div>
        ) : (
          <motion.div
            key={listKey}
            className={gridClass}
            {...(reduceMotion
              ? {}
              : {
                  initial: listMotion.initial,
                  animate: listMotion.animate,
                  exit: listMotion.exit,
                  transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] },
                })}
          >
            {reportes.map((reporte, index) => (
              <ReporteCard
                key={reporte.id}
                reporte={reporte}
                onDeleted={onDeleted}
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
          </motion.div>
        )}
      </AnimatePresence>

      <InfiniteScrollSentinel
        sentinelRef={sentinelRef}
        isLoading={isLoading && reportes.length > 0}
        hasMore={hasMore}
      />
    </PageTransition>
  );
}
