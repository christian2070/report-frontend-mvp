import { StatusReporte } from '@/types/enums';
import { statusLabels } from '@/utils/labels';

interface StatusBadgeProps {
  status: StatusReporte;
}

const statusClasses: Record<StatusReporte, string> = {
  [StatusReporte.ABERTO]: 'bg-yellow-100 text-yellow-800',
  [StatusReporte.EM_ANDAMENTO]: 'bg-blue-100 text-blue-800',
  [StatusReporte.RESOLVIDO]: 'bg-green-100 text-green-800',
};

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${statusClasses[status]}`}
    >
      {statusLabels[status]}
    </span>
  );
}
