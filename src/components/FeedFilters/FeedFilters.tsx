import { SlidersHorizontal } from 'lucide-react';
import { useState } from 'react';

import { BottomSheet } from '@/components/ui/BottomSheet';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Pill } from '@/components/ui/Pill';
import { Select } from '@/components/ui/Select';
import { CategoriaReporte, OrdenacaoFeed } from '@/types/enums';
import { categoriaIcons } from '@/utils/categoriaIcons';
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

function FiltersBody({
  categoria,
  bairro,
  ordenacao,
  showOrdenacao,
  onCategoriaChange,
  onBairroChange,
  onOrdenacaoChange,
}: FeedFiltersProps) {
  return (
    <div className="space-y-4">
      <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 scrollbar-none">
        <Pill active={categoria === ''} onClick={() => onCategoriaChange('')}>
          Todas
        </Pill>
        {categoriaOptions.map((option) => {
          const Icon = categoriaIcons[option.value];
          return (
            <Pill
              key={option.value}
              active={categoria === option.value}
              onClick={() => onCategoriaChange(option.value)}
            >
              <Icon className="h-3.5 w-3.5" aria-hidden />
              {option.label}
            </Pill>
          );
        })}
      </div>

      <div className={`grid gap-3 ${showOrdenacao ? 'sm:grid-cols-2' : ''}`}>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-900">
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
            <label className="mb-1.5 block text-sm font-medium text-gray-900">
              Ordenação
            </label>
            <Select
              value={ordenacao}
              onChange={(event) =>
                onOrdenacaoChange(event.target.value as OrdenacaoFeed)
              }
            >
              <option value={OrdenacaoFeed.ALERTAS}>Mais confirmados</option>
              <option value={OrdenacaoFeed.RECENTES}>Mais recentes</option>
            </Select>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export function FeedFilters(props: FeedFiltersProps) {
  const [sheetOpen, setSheetOpen] = useState(false);
  const activeFilters =
    Number(Boolean(props.categoria)) +
    Number(Boolean(props.bairro.trim())) +
    Number(props.showOrdenacao && props.ordenacao !== OrdenacaoFeed.ALERTAS);

  return (
    <>
      {/* Desktop / tablet */}
      <div className="hidden md:block">
        <FiltersBody {...props} />
      </div>

      {/* Mobile trigger */}
      <div className="md:hidden">
        <div className="-mx-1 mb-3 flex gap-2 overflow-x-auto px-1 pb-1">
          <Pill
            active={props.categoria === ''}
            onClick={() => props.onCategoriaChange('')}
          >
            Todas
          </Pill>
          {categoriaOptions.map((option) => {
            const Icon = categoriaIcons[option.value];
            return (
              <Pill
                key={option.value}
                active={props.categoria === option.value}
                onClick={() => props.onCategoriaChange(option.value)}
              >
                <Icon className="h-3.5 w-3.5" aria-hidden />
                {option.label.split(' ')[0]}
              </Pill>
            );
          })}
        </div>

        <Button
          variant="secondary"
          size="sm"
          className="w-full"
          onClick={() => setSheetOpen(true)}
        >
          <SlidersHorizontal className="h-4 w-4" aria-hidden />
          Filtros
          {activeFilters > 0 ? (
            <span className="ml-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-black px-1.5 text-[10px] text-white">
              {activeFilters}
            </span>
          ) : null}
        </Button>

        <BottomSheet
          open={sheetOpen}
          title="Filtros"
          onClose={() => setSheetOpen(false)}
        >
          <FiltersBody {...props} />
          <Button className="mt-6 w-full" onClick={() => setSheetOpen(false)}>
            Aplicar
          </Button>
        </BottomSheet>
      </div>
    </>
  );
}
