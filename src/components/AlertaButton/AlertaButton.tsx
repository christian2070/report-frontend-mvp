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
  const actionLabel = jaAlertado ? 'Remover confirmação' : 'Confirmar problema';
  const hasCount = showCount && typeof totalAlertas === 'number';

  return (
    <motion.button
      type="button"
      aria-label={hasCount ? `${actionLabel} (${totalAlertas} confirmações)` : actionLabel}
      aria-pressed={jaAlertado}
      disabled={disabled}
      whileTap={reduceMotion || disabled ? undefined : { scale: 0.94 }}
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        onClick?.();
      }}
      className={`relative z-10 inline-flex min-h-9 shrink-0 items-center gap-1.5 rounded-pill px-3 text-sm font-semibold transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50 focus-visible:ring-offset-white ${
        jaAlertado
          ? 'bg-blue-600 text-white hover:bg-blue-700'
          : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
      }`}
    >
      <motion.span
        key={String(jaAlertado)}
        initial={reduceMotion ? false : { scale: 0.6, rotate: -12 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 500, damping: 18 }}
        className="inline-flex"
      >
        <AlertTriangle
          aria-hidden
          className={`h-4 w-4 ${jaAlertado ? 'fill-white/25' : ''}`}
        />
      </motion.span>

      {hasCount ? (
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
    </motion.button>
  );
}
