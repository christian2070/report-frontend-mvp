import { Pencil, Trash2 } from "lucide-react";
import { Link, useLocation } from "react-router";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { useReporteOwnerActions } from "./ReporteOwnerActions.hooks";
import type { Reporte } from "@/types/reporte.types";
import { canDeleteReporte, canEditReporte } from "@/utils/reportePermissions";

interface Props {
  reporte: Reporte;
  onDeleted?: (id: string) => void;
}

export function ReporteOwnerActions({ reporte, onDeleted }: Props) {
  const { usuario } = useAuth();
  const location = useLocation();
  const actions = useReporteOwnerActions(reporte.id, onDeleted);
  if (!canDeleteReporte(usuario, reporte)) return null;

  return (
    <div className="relative z-10 flex flex-wrap gap-2 border-t border-gray-100 pt-3">
      {canEditReporte(usuario, reporte) ? (
        <Link
          to={`/reportes/${reporte.id}/editar`}
          state={{
            returnTo: `${location.pathname}${location.search}${location.hash}`,
          }}
          className="inline-flex min-h-9 items-center gap-1.5 rounded-pill border border-gray-300 bg-white px-3 text-xs font-semibold text-gray-700 transition-colors hover:bg-gray-50"
        >
          <Pencil className="h-3.5 w-3.5" aria-hidden />
          Editar
        </Link>
      ) : null}
      <Button
        size="sm"
        variant="danger"
        onClick={actions.show}
        disabled={actions.isDeleting}
      >
        <Trash2 className="h-3.5 w-3.5" aria-hidden />
        Excluir
      </Button>
      <Modal
        open={actions.open}
        title="Excluir reporte?"
        description="A exclusão é permanente. A foto e todas as confirmações deste reporte também serão removidas."
        confirmLabel="Excluir reporte"
        destructive
        loading={actions.isDeleting}
        onConfirm={() => {
          void actions.confirm();
        }}
        onClose={actions.close}
      >
        {actions.error ? (
          <p role="alert" className="mt-3 text-sm text-red-600">
            {actions.error}
          </p>
        ) : null}
      </Modal>
    </div>
  );
}
