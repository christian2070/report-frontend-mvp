import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { CategoriaReporte, OrdenacaoFeed } from '@/types/enums';
import { categoriaOptions } from '@/utils/labels';

interface FeedFiltersProps {
  categoria: CategoriaReporte | '';
  bairro: string;
  ordenacao: OrdenacaoFeed;
  showOrdenacao: boolean;
  onCategoriaChange: (value: CategoriaReporte | '') => void;
  onBairroChange: (value: string) => void;
  onOrdenacaoChange: (value: OrdenacaoFeed) => void;
}

export function FeedFilters({
  categoria,
  bairro,
  ordenacao,
  showOrdenacao,
  onCategoriaChange,
  onBairroChange,
  onOrdenacaoChange,
}: FeedFiltersProps) {
  return (
    <div className="grid gap-3 md:grid-cols-3">
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Categoria
        </label>
        <Select
          value={categoria}
          onChange={(event) =>
            onCategoriaChange(event.target.value as CategoriaReporte | '')
          }
        >
          <option value="">Todas</option>
          {categoriaOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Bairro
        </label>
        <Input
          value={bairro}
          placeholder="Filtrar por bairro"
          onChange={(event) => onBairroChange(event.target.value)}
        />
      </div>

      {showOrdenacao ? (
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Ordenação
          </label>
          <Select
            value={ordenacao}
            onChange={(event) =>
              onOrdenacaoChange(event.target.value as OrdenacaoFeed)
            }
          >
            <option value={OrdenacaoFeed.ALERTAS}>Mais alertados</option>
            <option value={OrdenacaoFeed.RECENTES}>Mais recentes</option>
          </Select>
        </div>
      ) : null}
    </div>
  );
}
