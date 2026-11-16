import { Check, ChevronDown } from 'lucide-react';
import { forwardRef, useEffect, useId, useRef, useState } from 'react';

import type { CategoriaReporte } from '@/types/enums';
import { categoriaIcons } from '@/utils/categoriaIcons';
import { categoriaOptions } from '@/utils/labels';

interface CategoriaSelectProps {
  id: string;
  name: string;
  value: CategoriaReporte;
  onChange: (value: CategoriaReporte) => void;
  onBlur: () => void;
  disabled?: boolean;
  hasError?: boolean;
}

export const CategoriaSelect = forwardRef<HTMLButtonElement, CategoriaSelectProps>(
  function CategoriaSelect({ id, name, value, onChange, onBlur, disabled, hasError }, ref) {
    const listId = useId();
    const rootRef = useRef<HTMLDivElement>(null);
    const [open, setOpen] = useState(false);
    const selectedIndex = categoriaOptions.findIndex((option) => option.value === value);
    const [activeIndex, setActiveIndex] = useState(0);
    const selected = categoriaOptions[selectedIndex];
    const SelectedIcon = selected ? categoriaIcons[selected.value] : null;

    useEffect(() => {
      if (!open) return;
      const closeOutside = (event: PointerEvent) => {
        if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
      };
      document.addEventListener('pointerdown', closeOutside);
      return () => document.removeEventListener('pointerdown', closeOutside);
    }, [open]);

    const selectOption = (index: number) => {
      onChange(categoriaOptions[index].value);
      setOpen(false);
    };

    return (
      <div
        ref={rootRef}
        className="relative min-w-0"
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) {
            setOpen(false);
            onBlur();
          }
        }}
      >
        <button
          ref={ref}
          id={id}
          name={name}
          type="button"
          role="combobox"
          aria-expanded={open}
          aria-controls={listId}
          aria-haspopup="listbox"
          aria-activedescendant={open ? `${listId}-${activeIndex}` : undefined}
          aria-invalid={hasError || undefined}
          disabled={disabled}
          onClick={() => {
            setActiveIndex(Math.max(selectedIndex, 0));
            setOpen(!open);
          }}
          onKeyDown={(event) => {
            if (event.key === 'Escape') {
              if (open) event.stopPropagation();
              setOpen(false);
              return;
            }
            if (event.key === 'Tab') {
              setOpen(false);
              return;
            }
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault();
              if (open) selectOption(activeIndex);
              else {
                setActiveIndex(Math.max(selectedIndex, 0));
                setOpen(true);
              }
              return;
            }
            if (['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) {
              event.preventDefault();
              const current = open ? activeIndex : Math.max(selectedIndex, 0);
              const next = event.key === 'Home' ? 0
                : event.key === 'End' ? categoriaOptions.length - 1
                : !open ? current
                : (current + (event.key === 'ArrowDown' ? 1 : -1) + categoriaOptions.length) % categoriaOptions.length;
              setActiveIndex(next);
              setOpen(true);
              requestAnimationFrame(() => {
                rootRef.current?.querySelector(`[id="${listId}-${next}"]`)?.scrollIntoView({ block: 'nearest' });
              });
              return;
            }
            if (event.key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey) {
              const match = categoriaOptions.findIndex((option) =>
                option.label.toLocaleLowerCase('pt-BR').startsWith(event.key.toLocaleLowerCase('pt-BR')),
              );
              if (match !== -1) {
                event.preventDefault();
                setActiveIndex(match);
                setOpen(true);
              }
            }
          }}
          className={`flex min-h-12 w-full items-center gap-3 rounded-control border bg-white px-3.5 py-2.5 text-left text-sm text-gray-900 shadow-sm transition-colors focus-visible:ring-4 focus-visible:ring-blue-100 focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400 ${
            hasError ? 'border-red-500' : open ? 'border-blue-500' : 'border-gray-200 hover:border-blue-300'
          }`}
        >
          {SelectedIcon ? (
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
              <SelectedIcon className="h-4 w-4" aria-hidden />
            </span>
          ) : null}
          <span className="min-w-0 flex-1 break-words font-medium">{selected?.label ?? 'Selecione uma categoria'}</span>
          <ChevronDown aria-hidden className={`h-4 w-4 shrink-0 text-gray-400 transition-transform motion-reduce:transition-none ${open ? 'rotate-180' : ''}`} />
        </button>

        {open && !disabled ? (
          <ul
            id={listId}
            role="listbox"
            aria-label="Categoria"
            className="absolute inset-x-0 top-full z-30 mt-2 max-h-64 space-y-1 overflow-y-auto overscroll-contain rounded-2xl border border-gray-100 bg-white p-1.5 shadow-lift"
          >
            {categoriaOptions.map((option, index) => {
              const Icon = categoriaIcons[option.value];
              const isSelected = option.value === value;
              return (
                <li
                  key={option.value}
                  id={`${listId}-${index}`}
                  role="option"
                  aria-selected={isSelected}
                  onPointerMove={() => setActiveIndex(index)}
                  onPointerDown={(event) => event.preventDefault()}
                  onClick={() => selectOption(index)}
                  className={`flex min-h-12 cursor-pointer items-center gap-3 rounded-xl px-3 py-2 text-sm transition-colors ${
                    activeIndex === index ? 'bg-blue-50 text-blue-700' : isSelected ? 'bg-blue-50/50 text-blue-700' : 'text-gray-600'
                  }`}
                >
                  <Icon className="h-4 w-4 shrink-0" aria-hidden />
                  <span className={`min-w-0 flex-1 break-words ${isSelected ? 'font-semibold' : 'font-medium'}`}>{option.label}</span>
                  {isSelected ? <Check className="h-4 w-4 shrink-0 text-blue-600" aria-hidden /> : null}
                </li>
              );
            })}
          </ul>
        ) : null}
      </div>
    );
  },
);
