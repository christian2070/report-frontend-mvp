import { Eye, EyeOff } from 'lucide-react';
import { forwardRef, useState, type ComponentProps } from 'react';

import { FloatingField } from '@/components/ui/FloatingField';
import { IconButton } from '@/components/ui/IconButton';
import { PasswordStrength } from '@/components/ui/PasswordStrength';

type PasswordInputProps = Omit<ComponentProps<typeof FloatingField>, 'trailing' | 'type' | 'hint'> & {
  showStrength?: boolean;
};

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  function PasswordInput(
    {
      className = '',
      disabled,
      value,
      onChange,
      showStrength = false,
      ...props
    },
    ref,
  ) {
    const [isVisible, setIsVisible] = useState(false);
    const label = isVisible ? 'Ocultar senha' : 'Mostrar senha';
    const passwordValue = typeof value === 'string' ? value : '';

    return (
      <FloatingField
        {...props}
        ref={ref}
        type={isVisible ? 'text' : 'password'}
        className={className}
        disabled={disabled}
        value={value}
        onChange={onChange}
        hint={showStrength ? <PasswordStrength value={passwordValue} /> : undefined}
        trailing={
          <IconButton
            aria-label={label}
            title={label}
            disabled={disabled}
            onClick={() => setIsVisible((visible) => !visible)}
            className="h-9 w-9 text-gray-600"
          >
            {isVisible ? (
              <EyeOff size={18} aria-hidden="true" />
            ) : (
              <Eye size={18} aria-hidden="true" />
            )}
          </IconButton>
        }
      />
    );
  },
);
