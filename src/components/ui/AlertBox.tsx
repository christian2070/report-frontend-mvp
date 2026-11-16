import { Info } from 'lucide-react';
import type { ReactNode } from 'react';

interface AlertBoxProps {
  children: ReactNode;
  className?: string;
}

export function AlertBox({ children, className = '' }: AlertBoxProps) {
  return (
    <div
      role="status"
      className={`flex items-start gap-3 rounded-control border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-gray-900 ${className}`}
    >
      <Info className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
      <div>{children}</div>
    </div>
  );
}
