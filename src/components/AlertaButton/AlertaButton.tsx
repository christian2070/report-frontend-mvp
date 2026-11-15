import { AlertTriangle } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

interface AlertaButtonProps {
  jaAlertado: boolean;
  totalAlertas?: number;
  disabled?: boolean;
  onClick?: () => void;
  showCount?: boolean;
}

export function AlertaButton({
  jaAlertado,
  totalAlertas,
  disabled = false,
  onClick,
  showCount = false,
}: AlertaButtonProps) {
  const reduceMotion = useReducedMotion();

  return (
    <button
      type="button"
      aria-label={jaAlertado ? 'Remover confirmação' : 'Confirmar problema'}
      aria-pressed={jaAlertado}
      disabled={disabled}
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        onClick?.();
      }}
      className={`group relative inline-flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-sm font-medium transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50 ${
        jaAlertado
          ? 'bg-orange-100 text-orange-700 hover:bg-orange-200'
          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
      }`}
    >
      {!jaAlertado && !reduceMotion ? (
        <span
          aria-hidden
          className="absolute inset-0 animate-pulse-ring rounded-full border border-orange-300/60"
        />
      ) : null}

      <AlertTriangle
        className={`relative h-4 w-4 transition-all ${
          jaAlertado ? 'fill-orange-500 text-orange-500' : ''
        }`}
      />

      {showCount && typeof totalAlertas === 'number' ? (
        <span className="relative inline-flex min-w-[1.25rem] justify-center overflow-hidden text-xs font-semibold tabular-nums">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={totalAlertas}
              initial={reduceMotion ? false : { y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={reduceMotion ? undefined : { y: -10, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="block"
            >
              {totalAlertas}
            </motion.span>
          </AnimatePresence>
        </span>
      ) : null}
    </button>
  );
}
