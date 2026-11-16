import { motion, useReducedMotion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';

interface SegmentedOption<T extends string> {
  value: T;
  label: string;
  icon?: LucideIcon;
}

interface SegmentedControlProps<T extends string> {
  value: T;
  options: SegmentedOption<T>[];
  onChange: (value: T) => void;
  layoutId: string;
  'aria-label': string;
  className?: string;
}

export function SegmentedControl<T extends string>({
  value,
  options,
  onChange,
  layoutId,
  className = '',
  'aria-label': ariaLabel,
}: SegmentedControlProps<T>) {
  const reduceMotion = useReducedMotion();

  return (
    <div
      role="radiogroup"
      aria-label={ariaLabel}
      className={`relative inline-flex rounded-pill bg-gray-100/90 p-1 ${className}`}
    >
      {options.map((option) => {
        const isActive = option.value === value;
        const Icon = option.icon;

        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={isActive}
            onClick={() => onChange(option.value)}
            className={`relative inline-flex min-h-9 flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-pill px-3.5 text-sm font-semibold transition-colors duration-200 focus-visible:ring-offset-gray-100 sm:px-4 ${
              isActive ? 'text-gray-900' : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            {isActive ? (
              <motion.span
                layoutId={reduceMotion ? undefined : layoutId}
                aria-hidden
                className="absolute inset-0 rounded-pill bg-white shadow-sm"
                transition={{ type: 'spring', stiffness: 420, damping: 34 }}
              />
            ) : null}
            {Icon ? (
              <Icon
                aria-hidden
                className={`relative h-4 w-4 ${isActive ? 'text-blue-600' : ''}`}
              />
            ) : null}
            <span className="relative">{option.label}</span>
          </button>
        );
      })}
    </div>
  );
}
