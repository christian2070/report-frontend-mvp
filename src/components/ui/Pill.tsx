import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface PillProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
  children: ReactNode;
}

export function Pill({
  active = false,
  className = '',
  children,
  ...props
}: PillProps) {
  return (
    <button
      type="button"
      className={`inline-flex shrink-0 items-center gap-1.5 rounded-pill border px-3.5 py-2 text-sm font-medium transition-all duration-200 active:scale-[0.97] ${
        active
          ? 'border-black bg-black text-white'
          : 'border-gray-200 bg-white text-gray-900 hover:border-gray-400'
      } ${className}`}
      aria-pressed={active}
      {...props}
    >
      {children}
    </button>
  );
}
