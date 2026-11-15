import type { ButtonHTMLAttributes, ReactNode } from 'react';

import { Spinner } from '@/components/ui/Spinner';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'tertiary';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  children: ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-black text-white hover:bg-gray-900 active:scale-[0.97] disabled:bg-gray-200 disabled:text-gray-400',
  secondary:
    'border border-black bg-white text-black hover:bg-black hover:text-white active:scale-[0.97] disabled:border-gray-200 disabled:text-gray-400 disabled:hover:bg-white',
  ghost:
    'bg-transparent text-gray-900 hover:bg-gray-100 active:scale-[0.97] disabled:text-gray-400',
  tertiary:
    'bg-transparent px-0 text-black underline decoration-transparent underline-offset-4 hover:decoration-black disabled:text-gray-400',
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
      {loading ? <Spinner size="sm" className="border-current border-r-transparent" /> : null}
      {children}
    </button>
  );
}
