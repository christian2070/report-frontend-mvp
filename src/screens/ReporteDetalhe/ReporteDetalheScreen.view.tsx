import { MapPin } from 'lucide-react';

import { StatusTimeline } from '@/components/StatusTimeline/StatusTimeline';
import { AlertBox } from '@/components/ui/AlertBox';
import { CategoriaBadge, StatusBadge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { DetalheSkeleton } from '@/components/ui/Skeleton';
import { EmptyState } from '@/components/ui/EmptyState';
import { Modal } from '@/components/ui/Modal';
import { PageTransition } from '@/components/ui/PageTransition';
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
  confirmStatusOpen: boolean;
  onOpenStatusConfirm: () => void;
  onCloseStatusConfirm: () => void;
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
  confirmStatusOpen,
  onOpenStatusConfirm,
  onCloseStatusConfirm,
  onToggleAlerta,
  onUpdateStatus,
}: ReporteDetalheScreenViewProps) {
  if (isLoading) {
    return <DetalheSkeleton />;
  }

  if (!reporte) {
    return (
      <EmptyState
        title="Reporte não encontrado"
        description="O registro pode ter sido removido ou o link está incorreto."
      />
    );
  }

  const showCidadaoAction = isCidadao && !isAuthor && !isResolved;
  const confirmLabel = nextStatusActionLabel
    ? `${nextStatusActionLabel}?`
    : 'Confirmar alteração?';

  return (
    <PageTransition className="mx-auto max-w-3xl space-y-6 pb-24 md:pb-6">
      <div className="-mx-4 overflow-hidden sm:mx-0 sm:rounded-card">
        <img
          src={buildAssetUrl(reporte.foto)}
          alt={reporte.descricao}
          className="aspect-[16/10] w-full object-cover sm:rounded-card"
        />
      </div>

      <div className="space-y-6 rounded-card border border-gray-200 bg-white p-5 sm:p-6">
        <div className="flex flex-wrap items-center gap-2">
          <CategoriaBadge categoria={reporte.categoria} />
          <StatusBadge status={reporte.status} />
        </div>

        <div>
          <h1 className="text-display text-[28px] sm:text-[32px]">Detalhe</h1>
          <p className="mt-3 text-body text-gray-900">{reporte.descricao}</p>
        </div>

        <div className="flex items-start gap-2 text-sm text-gray-600">
          <MapPin className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
          <span>{reporte.localizacao}</span>
        </div>

        <div className="grid gap-3 border-y border-gray-100 py-4 text-sm sm:grid-cols-2">
          <p>
            <span className="text-caption block">Autor</span>
            <span className="font-medium text-gray-900">{reporte.autor.nome}</span>
          </p>
          <p>
            <span className="text-caption block">Criado em</span>
            <span className="font-medium text-gray-900">
              {formatDate(reporte.createdAt)}
            </span>
          </p>
          <p>
            <span className="text-caption block">Confirmações</span>
            <span className="font-medium text-gray-900">{reporte.totalAlertas}</span>
          </p>
        </div>

        <div>
          <h2 className="mb-4 text-title">Status</h2>
          <StatusTimeline status={reporte.status} />
        </div>

        {isCidadao ? (
          <div className="space-y-3 border-t border-gray-100 pt-4">
            {isAuthor ? (
              <AlertBox>Você não pode confirmar seu próprio reporte.</AlertBox>
            ) : isResolved ? (
              <AlertBox>Reporte já resolvido.</AlertBox>
            ) : (
              <div className="hidden md:block">
                <Button
                  variant={reporte.jaAlertado ? 'secondary' : 'primary'}
                  size="lg"
                  className="w-full sm:w-auto"
                  loading={isUpdatingAlerta}
                  onClick={onToggleAlerta}
                >
                  {reporte.jaAlertado
                    ? 'Remover confirmação'
                    : 'Confirmar problema'}
                </Button>
              </div>
            )}
          </div>
        ) : null}

        {isPrefeitura && nextStatusActionLabel ? (
          <div className="border-t border-gray-100 pt-4">
            <Button
              size="lg"
              loading={isUpdatingStatus}
              onClick={onOpenStatusConfirm}
            >
              {nextStatusActionLabel}
            </Button>
          </div>
        ) : null}
      </div>

      {showCidadaoAction ? (
        <div className="fixed inset-x-0 bottom-[var(--bottom-nav-height)] z-40 border-t border-gray-200 bg-white/95 p-4 backdrop-blur-md md:hidden">
          <Button
            variant={reporte.jaAlertado ? 'secondary' : 'primary'}
            size="lg"
            className="w-full"
            loading={isUpdatingAlerta}
            onClick={onToggleAlerta}
          >
            {reporte.jaAlertado ? 'Remover confirmação' : 'Confirmar problema'}
          </Button>
        </div>
      ) : null}

      <Modal
        open={confirmStatusOpen}
        title={confirmLabel}
        description="Esta ação avança o status do reporte em um passo. Confirme para continuar."
        confirmLabel="Confirmar"
        loading={isUpdatingStatus}
        onConfirm={onUpdateStatus}
        onClose={onCloseStatusConfirm}
      />
    </PageTransition>
  );
}
