import type { ReactNode } from 'react';

interface FormFieldProps {
  label: string;
  error?: string;
  children: ReactNode;
  htmlFor?: string;
}

export function FormField({ label, error, children, htmlFor }: FormFieldProps) {
  return (
    <div className="space-y-1.5">
      <label
        htmlFor={htmlFor}
        className="block text-sm font-medium text-gray-900"
      >
        {label}
      </label>
      {children}
      {error ? (
        <p className="flex items-start gap-1.5 text-xs text-gray-900" role="alert">
          <span className="mt-0.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-black" aria-hidden />
          {error}
        </p>
      ) : null}
    </div>
  );
}
