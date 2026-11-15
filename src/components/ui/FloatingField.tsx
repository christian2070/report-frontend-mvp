import { forwardRef, useId, type InputHTMLAttributes, type ReactNode } from 'react';

interface FloatingFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  hasError?: boolean;
  trailing?: ReactNode;
  hint?: ReactNode;
}

export const FloatingField = forwardRef<HTMLInputElement, FloatingFieldProps>(
  function FloatingField(
    {
      label,
      error,
      hasError = Boolean(error),
      trailing,
      hint,
      id,
      className = '',
      ...props
    },
    ref,
  ) {
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const errorId = `${inputId}-error`;

    return (
      <div className="space-y-1.5">
        <div className="relative">
          <input
            ref={ref}
            id={inputId}
            placeholder=" "
            aria-invalid={hasError || undefined}
            aria-describedby={error ? errorId : undefined}
            className={`peer w-full rounded-control border bg-white px-4 pb-2.5 pt-6 text-sm text-gray-900 outline-none transition-colors hover:border-gray-400 focus:border-black focus:ring-2 focus:ring-black/10 disabled:cursor-not-allowed disabled:bg-gray-100 ${
              trailing ? 'pr-12' : ''
            } ${hasError ? 'border-black' : 'border-gray-200'} ${className}`}
            {...props}
          />
          <label
            htmlFor={inputId}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-gray-400 transition-all duration-200 peer-focus:top-3 peer-focus:translate-y-0 peer-focus:text-xs peer-focus:font-medium peer-focus:text-gray-600 peer-[:not(:placeholder-shown)]:top-3 peer-[:not(:placeholder-shown)]:translate-y-0 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:font-medium peer-[:not(:placeholder-shown)]:text-gray-600"
          >
            {label}
          </label>
          {trailing ? (
            <div className="absolute inset-y-0 right-0 flex items-center pr-2">
              {trailing}
            </div>
          ) : null}
        </div>
        {hint}
        {error ? (
          <p id={errorId} className="flex items-start gap-1.5 text-xs text-gray-900" role="alert">
            <span className="mt-0.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-black" aria-hidden />
            {error}
          </p>
        ) : null}
      </div>
    );
  },
);
