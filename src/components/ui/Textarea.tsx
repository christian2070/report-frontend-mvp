import { forwardRef, type TextareaHTMLAttributes } from 'react';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  hasError?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea({ hasError = false, className = '', ...props }, ref) {
    return (
      <textarea
        ref={ref}
        className={`w-full resize-y rounded-control border bg-white px-4 py-3 text-sm text-gray-900 outline-none transition-colors placeholder:text-gray-400 hover:border-gray-400 focus:border-black focus:ring-2 focus:ring-black/10 disabled:cursor-not-allowed disabled:bg-gray-100 ${
          hasError ? 'border-black' : 'border-gray-200'
        } ${className}`}
        {...props}
      />
    );
  },
);
