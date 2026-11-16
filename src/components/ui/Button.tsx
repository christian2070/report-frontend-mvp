import type { ButtonHTMLAttributes, ReactNode } from 'react';

import { Spinner } from '@/components/ui/Spinner';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'tertiary' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  children: ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
  danger:
    'bg-red-600 text-white hover:bg-red-700 active:scale-[0.97] disabled:bg-red-300 disabled:text-white',
  primary:
    'bg-blue-600 text-white hover:bg-blue-700 active:scale-[0.97] disabled:bg-blue-300 disabled:text-white',
  secondary:
    'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 active:scale-[0.97] disabled:bg-gray-100 disabled:text-gray-400',
  ghost:
    'bg-transparent text-gray-700 hover:bg-gray-100 active:scale-[0.97] disabled:text-gray-400',
  tertiary:
    'bg-transparent px-0 text-blue-600 underline decoration-transparent underline-offset-4 hover:decoration-blue-600 disabled:text-gray-400',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'min-h-9 rounded-pill px-3 text-xs',
  md: 'min-h-11 rounded-pill px-5 text-sm',
  lg: 'min-h-12 rounded-pill px-6 text-base',
};

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled,
  className = '',
  children,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <button
      className={`inline-flex items-center justify-center gap-2 font-semibold transition-all duration-200 ease-smooth disabled:cursor-not-allowed ${variantClasses[variant]} ${variant === 'tertiary' ? 'min-h-0 rounded-none' : sizeClasses[size]} ${className}`}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      {...props}
    >
      {loading ? (
        <Spinner size="sm" className="border-current border-r-transparent" />
      ) : null}
      {children}
    </button>
  );
}
