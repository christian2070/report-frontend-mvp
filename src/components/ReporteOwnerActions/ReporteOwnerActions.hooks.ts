import { useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { useLoadingAction } from '@/hooks/useLoadingAction';
import { useLayout } from '@/hooks/useLayout';
import { reportesService } from '@/services/reportes.service';
import { formatErrorMessage } from '@/utils/normalizeHttpError';

export function useReporteOwnerActions(
  id: string,
  onDeleted?: (id: string) => void,
) {
  const navigate = useNavigate();
  const { notify } = useLayout();
  const { execute } = useLoadingAction();
  const [open, setOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState('');
  const pending = useRef(false);

  const confirm = async () => {
    if (pending.current || !open) return;
    pending.current = true;
    setError('');
    await execute({
      setLoading: setIsDeleting,
      action: async () => {
        await reportesService.remove(id);
        setOpen(false);
        notify('success', 'Sucesso', 'Reporte excluído com sucesso');
        if (onDeleted) onDeleted(id);
        else navigate('/feed', { replace: true });
      },
      onError: (err) =>
        setError(
          formatErrorMessage(
            err.response?.data?.message,
            'Não foi possível excluir o reporte. Tente novamente.',
          ),
        ),
    });
    pending.current = false;
  };

  return {
    open,
    isDeleting,
    error,
    confirm,
    show: () => {
      setError('');
      setOpen(true);
    },
    close: () => {
      if (!pending.current) setOpen(false);
    },
  };
}
