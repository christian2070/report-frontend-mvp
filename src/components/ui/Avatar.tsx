interface AvatarProps {
  name: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeClasses = {
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-12 w-12 text-base',
};

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return 'U';
  const first = parts[0][0] ?? '';
  const last = parts.length > 1 ? parts[parts.length - 1][0] ?? '' : '';
  return (first + last).toLocaleUpperCase('pt-BR') || 'U';
}

export function Avatar({ name, size = 'md', className = '' }: AvatarProps) {
  return (
    <span
      role="img"
      aria-label={name || 'Usuário'}
      title={name || 'Usuário'}
      className={`inline-flex shrink-0 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-700 ${sizeClasses[size]} ${className}`}
    >
      {getInitials(name)}
    </span>
  );
}
