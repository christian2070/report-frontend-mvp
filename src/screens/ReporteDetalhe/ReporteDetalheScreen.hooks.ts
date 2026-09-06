import type { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import { useAuth } from '@/contexts/AuthContext';
import { useLayout } from '@/hooks/useLayout';
import { useRequestHandler } from '@/hooks/useRequestHandler';
import { alertasService } from '@/services/alertas.service';
import { reportesService } from '@/services/reportes.service';
import type { ApiError } from '@/types/api.types';
import { StatusReporte } from '@/types/enums';
import type { Reporte } from '@/types/reporte.types';
import { getNextStatus, getNextStatusActionLabel } from '@/utils/labels';
import { getHttpErrorStatus } from '@/utils/normalizeHttpError';

async function fetchReporteById(id: string) {
  return reportesService.getById(id);
}

export function useReporteDetalheScreen() {
  const { id = '' } = useParams();
  const { usuario, isCidadao, isPrefeitura } = useAuth();
  const { notify } = useLayout();
  const { performRequestWithHandlers } = useRequestHandler();

  const [reporte, setReporte] = useState<Reporte | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdatingAlerta, setIsUpdatingAlerta] = useState(false);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);

  const loadReporte = async () => {
    if (!id) {
      return;
    }

    await performRequestWithHandlers({
      setCustomLoader: setIsLoading,
      onRequest: async () => {
        const data = await fetchReporteById(id);
        setReporte(data);
      },
    });
  };

  useEffect(() => {
    void loadReporte();
  }, [id]);

  const isAuthor = Boolean(usuario && reporte && usuario.id === reporte.autor.id);
  const isResolved = reporte?.status === StatusReporte.RESOLVIDO;
  const nextStatus = reporte ? getNextStatus(reporte.status) : null;
  const nextStatusActionLabel = reporte
    ? getNextStatusActionLabel(reporte.status)
    : null;

  const handleToggleAlerta = async () => {
    if (!reporte || !isCidadao || isAuthor || isResolved) {
      return;
    }

    await performRequestWithHandlers({
      setCustomLoader: setIsUpdatingAlerta,
      showErrorMessage: false,
      onRequest: async () => {
        const response = reporte.jaAlertado
          ? await alertasService.remove(reporte.id)
          : await alertasService.create(reporte.id);

        setReporte((current) =>
          current
            ? {
                ...current,
                jaAlertado: !current.jaAlertado,
                totalAlertas: response.totalAlertas,
              }
            : current,
        );
      },
      onError: async (error: AxiosError<ApiError>) => {
        const status = getHttpErrorStatus(error);

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

  const handleUpdateStatus = async () => {
    if (!reporte || !isPrefeitura || !nextStatus) {
      return;
    }

    await performRequestWithHandlers({
      setCustomLoader: setIsUpdatingStatus,
      onRequest: async () => {
        const response = await reportesService.updateStatus(reporte.id, {
          status: nextStatus,
        });

        setReporte((current) =>
          current
            ? {
                ...current,
                status: response.status,
                updatedAt: response.updatedAt,
              }
            : current,
        );

        notify('success', 'Sucesso', 'Status atualizado com sucesso');
      },
    });
  };

  return {
    reporte,
    isLoading,
    isCidadao,
    isPrefeitura,
    isAuthor,
    isResolved,
    isUpdatingAlerta,
    isUpdatingStatus,
    nextStatusActionLabel,
    onToggleAlerta: handleToggleAlerta,
    onUpdateStatus: handleUpdateStatus,
  };
}
