interface PasswordStrengthProps {
  value: string;
}

function getStrength(value: string) {
  let score = 0;
  if (value.length >= 6) score += 1;
  if (value.length >= 10) score += 1;
  if (/[A-Z]/.test(value) && /[a-z]/.test(value)) score += 1;
  if (/\d/.test(value)) score += 1;
  if (/[^A-Za-z0-9]/.test(value)) score += 1;
  return Math.min(score, 4);
}

const labels = ['Fraca', 'Fraca', 'Média', 'Boa', 'Forte'];

export function PasswordStrength({ value }: PasswordStrengthProps) {
  if (!value) return null;

  const score = getStrength(value);

  return (
    <div className="space-y-1.5 pt-1" aria-live="polite">
      <div className="grid grid-cols-4 gap-1.5">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className={`h-1 rounded-pill transition-colors duration-200 ${
              index < score ? 'bg-black' : 'bg-gray-200'
            }`}
          />
        ))}
      </div>
      <p className="text-caption">Força da senha: {labels[score]}</p>
    </div>
  );
}
