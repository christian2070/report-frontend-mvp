import { useEffect, useState } from 'react';

import { useAuth } from '@/contexts/AuthContext';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import { useLayout } from '@/hooks/useLayout';
import { useLoadingAction } from '@/hooks/useLoadingAction';
import { alertasService } from '@/services/alertas.service';
import { reportesService } from '@/services/reportes.service';
import { CategoriaReporte, OrdenacaoFeed } from '@/types/enums';
import type { Reporte } from '@/types/reporte.types';

const PAGE_LIMIT = 10;

export type FeedTab = 'ativos' | 'resolvidos';

interface UseFeedScreenOptions {
  tab: FeedTab;
}

async function fetchReportesPage(
  tab: FeedTab,
  page: number,
  categoria: CategoriaReporte | '',
  bairro: string,
  ordenacao: OrdenacaoFeed,
) {
  const params = {
    page,
    limit: PAGE_LIMIT,
    ...(categoria ? { categoria } : {}),
    ...(bairro ? { bairro } : {}),
    ...(tab === 'ativos' ? { ordenacao } : {}),
  };

  if (tab === 'resolvidos') {
    return reportesService.listResolvidos(params);
  }

  return reportesService.list(params);
}

export function useFeedScreen({ tab }: UseFeedScreenOptions) {
  const { isCidadao } = useAuth();
  const { notify } = useLayout();
  const { execute } = useLoadingAction();

  const [reportes, setReportes] = useState<Reporte[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [categoria, setCategoria] = useState<CategoriaReporte | ''>('');
  const [bairro, setBairro] = useState('');
  const [ordenacao, setOrdenacao] = useState<OrdenacaoFeed>(OrdenacaoFeed.ALERTAS);

  const hasMore = page < totalPages;

  const loadPage = async (nextPage: number, replace: boolean) => {
    await execute({
      setLoading: setIsLoading,
      action: async () => {
        const response = await fetchReportesPage(
          tab,
          nextPage,
          categoria,
          bairro,
          ordenacao,
        );

        const items = response.data ?? [];

        setPage(response.page ?? nextPage);
        setTotalPages(response.totalPages ?? 1);
        setReportes((current) =>
          replace ? items : [...(current ?? []), ...items],
        );
      },
    });
  };

  const reloadFeed = async () => {
    setReportes([]);
    setPage(1);
    setTotalPages(1);
    await loadPage(1, true);
  };

  useEffect(() => {
    void reloadFeed();
  }, [tab, categoria, bairro, ordenacao]);

  const handleLoadMore = () => {
    if (isLoading || !hasMore) {
      return;
    }

    void loadPage(page + 1, false);
  };

  const { sentinelRef } = useInfiniteScroll({
    enabled: hasMore && !isLoading,
    onLoadMore: handleLoadMore,
  });

  const handleToggleAlerta = async (reporte: Reporte) => {
    if (!isCidadao) {
      return;
    }

    await execute({
      showErrorMessage: false,
      action: async () => {
        const response = reporte.jaAlertado
          ? await alertasService.remove(reporte.id)
          : await alertasService.create(reporte.id);

        setReportes((current) =>
          current.map((item) =>
            item.id === reporte.id
              ? {
                  ...item,
                  jaAlertado: !reporte.jaAlertado,
                  totalAlertas: response.totalAlertas,
                }
              : item,
          ),
        );
      },
      onError: async (error) => {
        const status = error.response?.status;

        if (status === 409) {
          notify('error', 'Erro', 'Você já confirmou este problema');
          return;
        }

        if (status === 403) {
          notify('error', 'Erro', 'Você não pode alertar seu próprio reporte');
          return;
        }

        notify(
          'error',
          'Erro',
          error.response?.data?.message || 'Ocorreu um erro inesperado',
        );
      },
    });
  };

  return {
    tab,
    reportes,
    isLoading,
    hasMore,
    sentinelRef,
    categoria,
    bairro,
    ordenacao,
    isCidadao,
    onCategoriaChange: setCategoria,
    onBairroChange: setBairro,
    onOrdenacaoChange: setOrdenacao,
    onToggleAlerta: handleToggleAlerta,
  };
}
