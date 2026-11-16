import { Link } from 'react-router';

type LogoVariant = 'full' | 'mark' | 'inverted';
type LogoSize = 'sm' | 'md' | 'lg' | 'xl';

interface LogoProps {
  variant?: LogoVariant;
  size?: LogoSize;
  to?: string | null;
  className?: string;
  'aria-label'?: string;
}

const sizeMap: Record<LogoSize, { mark: number; text: string }> = {
  sm: { mark: 20, text: 'text-sm' },
  md: { mark: 28, text: 'text-base' },
  lg: { mark: 36, text: 'text-xl' },
  xl: { mark: 56, text: 'text-3xl' },
};

function Mark({
  size,
  inverted,
}: {
  size: number;
  inverted: boolean;
}) {
  const fill = inverted ? '#fff' : '#000';
  const inner = inverted ? '#000' : '#fff';

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect width="32" height="32" rx="8" fill={fill} />
      <path
        d="M16 5.5c-4.14 0-7.5 3.2-7.5 7.14 0 5.1 6.1 12.36 6.95 13.34a.75.75 0 0 0 1.1 0c.85-.98 6.95-8.24 6.95-13.34C23.5 8.7 20.14 5.5 16 5.5Z"
        fill={inner}
      />
      <circle cx="16" cy="12.5" r="2.1" fill={fill} />
      <rect x="15.25" y="9.2" width="1.5" height="1.6" rx="0.4" fill={fill} />
    </svg>
  );
}

export function Logo({
  variant = 'full',
  size = 'md',
  to = '/feed',
  className = '',
  'aria-label': ariaLabel = 'REPORT — ir para o feed',
}: LogoProps) {
  const dims = sizeMap[size];
  const inverted = variant === 'inverted';
  const showText = variant !== 'mark';

  const content = (
    <span
      className={`inline-flex items-center gap-2 ${className}`}
    >
      <Mark size={dims.mark} inverted={inverted} />
      {showText ? (
        <span
          className={`font-extrabold uppercase tracking-[0.14em] ${dims.text} ${
            inverted ? 'text-white' : 'text-black'
          }`}
        >
          REPORT
        </span>
      ) : null}
    </span>
  );

  if (to === null) {
    return (
      <span aria-label={ariaLabel} role="img">
        {content}
      </span>
    );
  }

  return (
    <Link to={to} aria-label={ariaLabel} className="inline-flex shrink-0">
      {content}
    </Link>
  );
}
