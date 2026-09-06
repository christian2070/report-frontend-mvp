import type { TextareaHTMLAttributes } from 'react';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  hasError?: boolean;
}

export function Textarea({
  hasError = false,
  className = '',
  ...props
}: TextareaProps) {
  return (
    <textarea
      className={`w-full rounded-lg border px-3 py-2 text-sm outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-100 ${
        hasError ? 'border-red-500' : 'border-gray-300'
      } ${className}`}
      {...props}
    />
  );
}
