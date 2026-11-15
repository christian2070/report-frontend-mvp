import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: LucideIcon;
  action?: ReactNode;
}

function EmptyIllustration() {
  return (
    <svg
      width="120"
      height="120"
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="mx-auto"
    >
      <rect x="20" y="28" width="80" height="64" rx="12" stroke="#9CA3AF" strokeWidth="2" />
      <path d="M20 48h80" stroke="#9CA3AF" strokeWidth="2" />
      <circle cx="36" cy="38" r="3" fill="#9CA3AF" />
      <circle cx="48" cy="38" r="3" fill="#9CA3AF" />
      <circle cx="60" cy="38" r="3" fill="#9CA3AF" />
      <path
        d="M44 72c4-6 10-10 16-10s12 4 16 10"
        stroke="#9CA3AF"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M60 18v10M52 22l8-8 8 8"
        stroke="#9CA3AF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function EmptyState({ title, description, icon: Icon, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-20 text-center">
      {Icon ? (
        <Icon className="h-8 w-8 text-blue-600" strokeWidth={1.75} aria-hidden />
      ) : (
        <EmptyIllustration />
      )}
      <h3 className={`text-title text-gray-900 ${Icon ? 'mt-4' : 'mt-6'}`}>{title}</h3>
      {description ? (
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-gray-500">{description}</p>
      ) : null}
      {action ? <div className="mt-5">{action}</div> : null}
    </div>
  );
}
