import { forwardRef, type InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  function Input({ hasError = false, className = '', ...props }, ref) {
    return (
      <input
        ref={ref}
        className={`w-full rounded-control border bg-white px-4 py-3 text-sm text-gray-900 outline-none transition-colors placeholder:text-gray-400 hover:border-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400 ${
          hasError ? 'border-red-500' : 'border-gray-300'
        } ${className}`}
        {...props}
      />
    );
  },
);
