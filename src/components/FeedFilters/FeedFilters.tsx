import {
  Check,
  Clock,
  Flame,
  LayoutGrid,
  Search,
  SlidersHorizontal,
  X,
  type LucideIcon,
} from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState, type ReactNode } from 'react';

import { BottomSheet } from '@/components/ui/BottomSheet';
import { Button } from '@/components/ui/Button';
import { Pill } from '@/components/ui/Pill';
import { SegmentedControl } from '@/components/ui/SegmentedControl';
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

const ordenacaoOptions: { value: OrdenacaoFeed; label: string; icon: LucideIcon }[] = [
  { value: OrdenacaoFeed.ALERTAS, label: 'Mais confirmados', icon: Flame },
  { value: OrdenacaoFeed.RECENTES, label: 'Mais recentes', icon: Clock },
];

const chipsScrollClass =
  'flex min-w-0 flex-1 gap-2 overflow-x-auto scroll-smooth py-0.5 pr-8 scrollbar-none [mask-image:linear-gradient(to_right,black_calc(100%_-_32px),transparent)]';

export function ClearFiltersLink({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-sm text-sm font-medium text-blue-700 underline decoration-blue-700/35 underline-offset-4 transition-colors hover:text-blue-800 hover:decoration-blue-800"
    >
      Limpar filtros
    </button>
  );
}

function ActiveFiltersSummary({ count, onClear }: { count: number; onClear: () => void }) {
  const reduceMotion = useReducedMotion();

  return (
    <AnimatePresence initial={false}>
      {count > 0 ? (
        <motion.div
          key="active-filters"
          initial={{ opacity: 0, x: reduceMotion ? 0 : 8 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: reduceMotion ? 0 : 8 }}
          transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="flex shrink-0 items-center gap-3"
        >
          <span className="text-sm text-gray-500" aria-live="polite">
            {count} {count === 1 ? 'filtro ativo' : 'filtros ativos'}
          </span>
          <ClearFiltersLink onClick={onClear} />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function BairroSearch({
  value,
  onChange,
  className = '',
}: {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}) {
  // Estado local evita perder o foco a cada tecla enquanto o feed recarrega
  const [draft, setDraft] = useState(value);

  useEffect(() => {
    setDraft(value);
  }, [value]);

  useEffect(() => {
    if (draft === value) return;

    const timer = window.setTimeout(() => {
      onChange(draft);
    }, 350);

    return () => window.clearTimeout(timer);
  }, [draft, value, onChange]);

  const clear = () => {
    setDraft('');
    onChange('');
  };

  return (
    <form
      className={`relative ${className}`}
      onSubmit={(event) => {
        event.preventDefault();
        onChange(draft);
        (event.currentTarget.querySelector('input') as HTMLInputElement | null)?.blur();
      }}
    >
      <Search
        aria-hidden
        className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
      />
      <input
        type="search"
        value={draft}
        enterKeyHint="search"
        inputMode="text"
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="words"
        spellCheck={false}
        aria-label="Filtrar por bairro"
        placeholder="Buscar por bairro"
        onChange={(event) => setDraft(event.target.value)}
        className="h-11 w-full rounded-pill border border-gray-200 bg-white pl-10 pr-10 text-base text-gray-900 transition-colors placeholder:text-gray-400 hover:border-gray-300 focus:border-blue-500 focus-visible:ring-4 focus-visible:ring-blue-100 focus-visible:ring-offset-0 md:h-10 md:text-sm [&::-webkit-search-cancel-button]:hidden [&::-webkit-search-decoration]:hidden"
      />
      <div className="absolute inset-y-0 right-1.5 flex items-center">
        <AnimatePresence>
          {draft ? (
            <motion.button
              type="button"
              aria-label="Limpar bairro"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.15 }}
              onClick={clear}
              className="inline-flex h-7 w-7 items-center justify-center rounded-full text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900"
            >
              <X className="h-4 w-4" aria-hidden />
            </motion.button>
          ) : null}
        </AnimatePresence>
      </div>
    </form>
  );
}

function CategoriaChips({
  categoria,
  onCategoriaChange,
  layoutId,
  shortLabels = false,
}: Pick<FeedFiltersProps, 'categoria' | 'onCategoriaChange'> & {
  layoutId: string;
  shortLabels?: boolean;
}) {
  return (
    <>
      <Pill
        active={categoria === ''}
        layoutId={layoutId}
        onClick={() => onCategoriaChange('')}
      >
        Todas
      </Pill>
      {categoriaOptions.map((option) => {
        const Icon = categoriaIcons[option.value];
        return (
          <Pill
            key={option.value}
            active={categoria === option.value}
            layoutId={layoutId}
            onClick={() => onCategoriaChange(option.value)}
          >
            <Icon className="h-4 w-4" aria-hidden />
            {shortLabels ? option.label.split(' ')[0] : option.label}
          </Pill>
        );
      })}
    </>
  );
}

function SheetSection({
  title,
  radio = true,
  children,
}: {
  title: string;
  radio?: boolean;
  children: ReactNode;
}) {
  return (
    <section className="space-y-1">
      <h3 className="px-3 pb-1.5 text-xs font-semibold uppercase tracking-wider text-gray-500">
        {title}
      </h3>
      <div
        role={radio ? 'radiogroup' : undefined}
        aria-label={radio ? title : undefined}
        className="space-y-0.5"
      >
        {children}
      </div>
    </section>
  );
}

function SheetOption({
  label,
  icon: Icon,
  selected,
  onClick,
}: {
  label: string;
  icon: LucideIcon;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={onClick}
      className={`flex min-h-12 w-full items-center gap-3 rounded-2xl px-3 text-left text-sm font-medium transition-colors duration-200 ${
        selected ? 'bg-blue-50 text-blue-700' : 'text-gray-900 hover:bg-gray-50'
      }`}
    >
      <Icon
        aria-hidden
        className={`h-5 w-5 shrink-0 ${selected ? 'text-blue-600' : 'text-gray-400'}`}
      />
      <span className="flex-1">{label}</span>
      <AnimatePresence initial={false}>
        {selected ? (
          <motion.span
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.15 }}
            className="inline-flex"
          >
            <Check className="h-5 w-5 text-blue-600" aria-hidden />
          </motion.span>
        ) : null}
      </AnimatePresence>
    </button>
  );
}

export function FeedFilters(props: FeedFiltersProps) {
  const {
    categoria,
    bairro,
    ordenacao,
    showOrdenacao,
    onCategoriaChange,
    onBairroChange,
    onOrdenacaoChange,
  } = props;
  const [sheetOpen, setSheetOpen] = useState(false);
  const activeFilters =
    Number(Boolean(categoria)) +
    Number(Boolean(bairro.trim())) +
    Number(showOrdenacao && ordenacao !== OrdenacaoFeed.ALERTAS);

  const clearFilters = () => {
    onCategoriaChange('');
    onBairroChange('');
    if (showOrdenacao) onOrdenacaoChange(OrdenacaoFeed.ALERTAS);
  };

  return (
    <>
      {/* Desktop / tablet — barra horizontal fina */}
      <div className="hidden space-y-3.5 md:block">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
          {showOrdenacao ? (
            <SegmentedControl
              aria-label="Ordenação"
              layoutId="feed-ordenacao"
              value={ordenacao}
              options={ordenacaoOptions}
              onChange={onOrdenacaoChange}
            />
          ) : null}

          <div className="ml-auto flex min-w-0 flex-1 items-center justify-end gap-4">
            <ActiveFiltersSummary count={activeFilters} onClear={clearFilters} />
            <BairroSearch
              value={bairro}
              onChange={onBairroChange}
              className="w-full max-w-[240px]"
            />
          </div>
        </div>

        <div
          role="group"
          aria-label="Filtrar por categoria"
          className={`-ml-1 pl-1 ${chipsScrollClass}`}
        >
          <CategoriaChips
            categoria={categoria}
            onCategoriaChange={onCategoriaChange}
            layoutId="feed-categoria-desktop"
          />
        </div>
      </div>

      {/* Mobile */}
      <div className="space-y-3 md:hidden">
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => setSheetOpen(true)}
            aria-haspopup="dialog"
            className="inline-flex min-h-9 shrink-0 items-center gap-1.5 rounded-pill bg-white px-3.5 text-sm font-semibold text-gray-900 shadow-sm transition-transform active:scale-[0.97]"
          >
            <SlidersHorizontal className="h-4 w-4 text-gray-500" aria-hidden />
            Filtros
            {activeFilters > 0 ? (
              <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-blue-600 px-1.5 text-[11px] font-semibold text-white">
                {activeFilters}
              </span>
            ) : null}
          </button>

          <div
            role="group"
            aria-label="Filtrar por categoria"
            className={`-mr-4 pl-0.5 ${chipsScrollClass}`}
          >
            <CategoriaChips
              categoria={categoria}
              onCategoriaChange={onCategoriaChange}
              layoutId="feed-categoria-mobile"
              shortLabels
            />
          </div>
        </div>

        <ActiveFiltersSummary count={activeFilters} onClear={clearFilters} />

        <BottomSheet
          open={sheetOpen}
          title="Filtros"
          onClose={() => setSheetOpen(false)}
          footer={
            <div className="flex items-center gap-4">
              {activeFilters > 0 ? <ClearFiltersLink onClick={clearFilters} /> : null}
              <Button className="flex-1" onClick={() => setSheetOpen(false)}>
                Aplicar
              </Button>
            </div>
          }
        >
          <div className="space-y-7 pt-1">
            <SheetSection title="Bairro" radio={false}>
              <div className="px-1 pt-1">
                <BairroSearch value={bairro} onChange={onBairroChange} />
              </div>
            </SheetSection>

            {showOrdenacao ? (
              <SheetSection title="Ordenar por">
                {ordenacaoOptions.map((option) => (
                  <SheetOption
                    key={option.value}
                    label={option.label}
                    icon={option.icon}
                    selected={ordenacao === option.value}
                    onClick={() => onOrdenacaoChange(option.value)}
                  />
                ))}
              </SheetSection>
            ) : null}

            <SheetSection title="Categoria">
              <SheetOption
                label="Todas"
                icon={LayoutGrid}
                selected={categoria === ''}
                onClick={() => onCategoriaChange('')}
              />
              {categoriaOptions.map((option) => (
                <SheetOption
                  key={option.value}
                  label={option.label}
                  icon={categoriaIcons[option.value]}
                  selected={categoria === option.value}
                  onClick={() => onCategoriaChange(option.value)}
                />
              ))}
            </SheetSection>
          </div>
        </BottomSheet>
      </div>
    </>
  );
}
