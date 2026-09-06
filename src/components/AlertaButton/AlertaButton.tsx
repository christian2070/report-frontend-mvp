import { AlertTriangle } from 'lucide-react';

interface AlertaButtonProps {
  jaAlertado: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

export function AlertaButton({
  jaAlertado,
  disabled = false,
  onClick,
}: AlertaButtonProps) {
  return (
    <button
      type="button"
      aria-label={jaAlertado ? 'Remover confirmação' : 'Confirmar problema'}
      disabled={disabled}
      onClick={onClick}
      className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-sm transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${
        jaAlertado
          ? 'bg-orange-100 text-orange-700 hover:bg-orange-200'
          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
      }`}
    >
      <AlertTriangle
        className={`h-4 w-4 ${jaAlertado ? 'fill-orange-500 text-orange-500' : ''}`}
      />
    </button>
  );
}
