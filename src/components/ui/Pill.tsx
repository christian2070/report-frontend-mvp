import { motion, useReducedMotion } from 'framer-motion';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface PillProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
  layoutId?: string;
  children: ReactNode;
}

export function Pill({
  active = false,
  layoutId,
  className = '',
  children,
  ...props
}: PillProps) {
  const reduceMotion = useReducedMotion();

  return (
    <button
      type="button"
      className={`relative inline-flex min-h-9 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-pill px-4 text-sm font-medium transition-colors duration-200 active:scale-[0.97] ${
        active
          ? `text-white ${layoutId ? 'bg-blue-50' : 'bg-blue-600'}`
          : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
      } ${className}`}
      aria-pressed={active}
      {...props}
    >
      {active && layoutId ? (
        <motion.span
          layoutId={reduceMotion ? undefined : layoutId}
          aria-hidden
          className="absolute inset-0 rounded-pill bg-blue-600"
          transition={{ type: 'spring', stiffness: 420, damping: 36 }}
        />
      ) : null}
      <span className="relative inline-flex items-center gap-1.5">{children}</span>
    </button>
  );
}
