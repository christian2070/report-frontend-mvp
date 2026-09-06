import { CategoriaReporte } from '@/types/enums';
import { categoriaLabels } from '@/utils/labels';

interface CategoriaBadgeProps {
  categoria: CategoriaReporte;
}

const categoriaClasses: Record<CategoriaReporte, string> = {
  [CategoriaReporte.ILUMINACAO]: 'bg-amber-100 text-amber-800',
  [CategoriaReporte.BURACO_PAVIMENTACAO]: 'bg-orange-100 text-orange-800',
  [CategoriaReporte.LIXO]: 'bg-lime-100 text-lime-800',
  [CategoriaReporte.SINALIZACAO]: 'bg-purple-100 text-purple-800',
  [CategoriaReporte.OUTROS]: 'bg-gray-100 text-gray-800',
};

export function CategoriaBadge({ categoria }: CategoriaBadgeProps) {
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${categoriaClasses[categoria]}`}
    >
      {categoriaLabels[categoria]}
    </span>
  );
}
