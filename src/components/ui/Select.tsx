import { ChevronDown } from 'lucide-react';
import { forwardRef, type SelectHTMLAttributes } from 'react';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  hasError?: boolean;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  function Select({ hasError = false, className = '', children, ...props }, ref) {
    return (
      <div className="relative">
        <select
          ref={ref}
          className={`peer w-full appearance-none rounded-control border bg-white py-3 pl-4 pr-10 text-sm text-gray-900 outline-none transition-colors hover:border-gray-400 focus:border-black focus:ring-2 focus:ring-black/10 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400 ${
            hasError ? 'border-black' : 'border-gray-200'
          } ${className}`}
          {...props}
        >
          {children}
        </select>
        <ChevronDown
          aria-hidden="true"
          className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-600"
        />
      </div>
    );
  },
);
