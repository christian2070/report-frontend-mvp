interface EmptyStateProps {
  title: string;
  description?: string;
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
      <rect x="20" y="28" width="80" height="64" rx="12" stroke="#000" strokeWidth="2" />
      <path d="M20 48h80" stroke="#000" strokeWidth="2" />
      <circle cx="36" cy="38" r="3" fill="#000" />
      <circle cx="48" cy="38" r="3" fill="#000" />
      <circle cx="60" cy="38" r="3" fill="#000" />
      <path
        d="M44 72c4-6 10-10 16-10s12 4 16 10"
        stroke="#000"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path d="M60 18v10M52 22l8-8 8 8" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
      <EmptyIllustration />
      <h3 className="mt-6 text-title text-gray-900">{title}</h3>
      {description ? (
        <p className="mt-2 max-w-sm text-sm text-gray-600">{description}</p>
      ) : null}
    </div>
  );
}
