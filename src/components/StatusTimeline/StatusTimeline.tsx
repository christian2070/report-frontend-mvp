import { Check } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';

import { StatusReporte } from '@/types/enums';
import { statusLabels } from '@/utils/labels';

const steps = [
  StatusReporte.ABERTO,
  StatusReporte.EM_ANDAMENTO,
  StatusReporte.RESOLVIDO,
];

interface StatusTimelineProps {
  status: StatusReporte;
}

export function StatusTimeline({ status }: StatusTimelineProps) {
  const reduceMotion = useReducedMotion();
  const currentIndex = steps.indexOf(status);

  return (
    <ol className="space-y-0" aria-label="Linha do tempo do status">
      {steps.map((step, index) => {
        const isDone = index < currentIndex;
        const isCurrent = index === currentIndex;
        const isLast = index === steps.length - 1;

        return (
          <li key={step} className="relative flex gap-4 pb-6 last:pb-0">
            {!isLast ? (
              <span
                aria-hidden
                className={`absolute left-[11px] top-6 h-[calc(100%-8px)] w-0.5 ${
                  isDone || isCurrent ? 'bg-black' : 'bg-gray-200'
                }`}
              />
            ) : null}

            <motion.span
              layout={!reduceMotion}
              className={`relative z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 ${
                isDone
                  ? 'border-black bg-black text-white'
                  : isCurrent
                    ? 'border-black bg-white'
                    : 'border-gray-200 bg-white'
              }`}
            >
              {isDone || (isCurrent && step === StatusReporte.RESOLVIDO) ? (
                <Check className="h-3.5 w-3.5" aria-hidden />
              ) : isCurrent ? (
                <span className="h-2 w-2 rounded-full bg-black" aria-hidden />
              ) : null}
            </motion.span>

            <div className="pt-0.5">
              <p
                className={`text-sm font-semibold ${
                  isCurrent || isDone ? 'text-gray-900' : 'text-gray-400'
                }`}
              >
                {statusLabels[step]}
              </p>
              {isCurrent ? (
                <p className="text-caption">Etapa atual</p>
              ) : null}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
