import { MapPin } from 'lucide-react';

import { Button } from '@/components/ui/Button';
import { CategoriaBadge } from '@/components/CategoriaBadge/CategoriaBadge';
import { Spinner } from '@/components/ui/Spinner';
import { StatusBadge } from '@/components/StatusBadge/StatusBadge';
import type { useReporteDetalheScreen } from '@/screens/ReporteDetalhe/ReporteDetalheScreen.hooks';
import { buildAssetUrl } from '@/utils/buildAssetUrl';

interface ReporteDetalheScreenViewProps {
  reporte: ReturnType<typeof useReporteDetalheScreen>['reporte'];
  isLoading: boolean;
  isCidadao: boolean;
  isPrefeitura: boolean;
  isAuthor: boolean;
  isResolved: boolean;
  isUpdatingAlerta: boolean;
  isUpdatingStatus: boolean;
  nextStatusActionLabel: string | null;
  onToggleAlerta: () => void;
  onUpdateStatus: () => void;
}

function formatDate(value: string) {
  return new Date(value).toLocaleString('pt-BR');
}

export function ReporteDetalheScreenView({
  reporte,
  isLoading,
  isCidadao,
  isPrefeitura,
  isAuthor,
  isResolved,
  isUpdatingAlerta,
  isUpdatingStatus,
  nextStatusActionLabel,
  onToggleAlerta,
  onUpdateStatus,
}: ReporteDetalheScreenViewProps) {
  if (isLoading) {
    return (
      <div className="flex justify-center py-16">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!reporte) {
    return (
      <p className="py-10 text-center text-sm text-gray-500">
        Reporte não encontrado
      </p>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <img
        src={buildAssetUrl(reporte.foto)}
        alt={reporte.descricao}
        className="aspect-[4/3] w-full rounded-xl object-cover"
      />

      <div className="space-y-4 rounded-xl border border-gray-200 bg-white p-6">
        <div className="flex flex-wrap items-center gap-2">
          <CategoriaBadge categoria={reporte.categoria} />
          <StatusBadge status={reporte.status} />
        </div>

        <div>
          <h1 className="text-xl font-semibold text-gray-900">Detalhe do reporte</h1>
          <p className="mt-3 text-gray-700">{reporte.descricao}</p>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-600">
          <MapPin className="h-4 w-4" />
          <span>{reporte.localizacao}</span>
        </div>

        <div className="grid gap-2 text-sm text-gray-600 sm:grid-cols-2">
          <p>
            <span className="font-medium text-gray-800">Autor:</span> {reporte.autor.nome}
          </p>
          <p>
            <span className="font-medium text-gray-800">Criado em:</span>{' '}
            {formatDate(reporte.createdAt)}
          </p>
          <p>
            <span className="font-medium text-gray-800">Alertas:</span> {reporte.totalAlertas}
          </p>
        </div>

        {isCidadao ? (
          <div className="border-t border-gray-100 pt-4">
            {isAuthor ? (
              <p className="text-sm text-gray-500">
                Você não pode confirmar seu próprio reporte.
              </p>
            ) : isResolved ? (
              <p className="text-sm text-gray-500">Reporte já resolvido.</p>
            ) : (
              <Button
                variant={reporte.jaAlertado ? 'secondary' : 'primary'}
                disabled={isUpdatingAlerta}
                onClick={onToggleAlerta}
              >
                {isUpdatingAlerta
                  ? 'Atualizando...'
                  : reporte.jaAlertado
                    ? 'Remover confirmação'
                    : 'Confirmar problema'}
              </Button>
            )}
          </div>
        ) : null}

        {isPrefeitura && nextStatusActionLabel ? (
          <div className="border-t border-gray-100 pt-4">
            <Button disabled={isUpdatingStatus} onClick={onUpdateStatus}>
              {isUpdatingStatus ? 'Atualizando...' : nextStatusActionLabel}
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
