import { X } from 'lucide-react';
import {
  AnimatePresence,
  motion,
  useDragControls,
  useReducedMotion,
} from 'framer-motion';
import { useEffect, useRef, type ReactNode } from 'react';
import { createPortal } from 'react-dom';

import { IconButton } from '@/components/ui/IconButton';

interface BottomSheetProps {
  open: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
  footer?: ReactNode;
}

export function BottomSheet({ open, title, onClose, children, footer }: BottomSheetProps) {
  const reduceMotion = useReducedMotion();
  const dragControls = useDragControls();
  const dialogRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onCloseRef.current();
    };

    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';

    // Foca o dialog só ao abrir — nunca em re-renders seguintes
    const frame = window.requestAnimationFrame(() => {
      const active = document.activeElement;
      if (active instanceof HTMLElement && dialogRef.current?.contains(active)) {
        return;
      }
      dialogRef.current?.focus();
    });

    return () => {
      window.cancelAnimationFrame(frame);
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [open]);

  // Mantém o sheet acima do teclado virtual (iOS/Android)
  useEffect(() => {
    if (!open) return;

    const dialog = dialogRef.current;
    const viewport = window.visualViewport;
    if (!dialog || !viewport) return;

    const syncWithKeyboard = () => {
      const keyboardOffset = Math.max(
        0,
        window.innerHeight - viewport.height - viewport.offsetTop,
      );
      const availableHeight = Math.max(240, viewport.height - 12);

      dialog.style.maxHeight = `${availableHeight}px`;
      dialog.style.bottom = `${keyboardOffset}px`;
    };

    syncWithKeyboard();
    viewport.addEventListener('resize', syncWithKeyboard);
    viewport.addEventListener('scroll', syncWithKeyboard);

    return () => {
      viewport.removeEventListener('resize', syncWithKeyboard);
      viewport.removeEventListener('scroll', syncWithKeyboard);
      dialog.style.maxHeight = '';
      dialog.style.bottom = '';
    };
  }, [open]);

  return createPortal(
    <AnimatePresence>
      {open ? (
        <div
          key="bottom-sheet"
          className="fixed inset-0 z-[70] flex items-end justify-center md:hidden"
        >
          <motion.button
            type="button"
            aria-label="Fechar filtros"
            className="absolute inset-0 bg-gray-900/40 backdrop-blur-[2px]"
            onClick={() => onCloseRef.current()}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="sheet-title"
            tabIndex={-1}
            initial={reduceMotion ? { opacity: 0 } : { y: '100%' }}
            animate={reduceMotion ? { opacity: 1 } : { y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { y: '100%' }}
            transition={
              reduceMotion
                ? { duration: 0.15 }
                : { type: 'spring', stiffness: 380, damping: 38 }
            }
            drag={reduceMotion ? false : 'y'}
            dragControls={dragControls}
            dragListener={false}
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.6 }}
            onDragEnd={(_, info) => {
              if (info.offset.y > 120 || info.velocity.y > 600) onCloseRef.current();
            }}
            className="relative z-10 flex max-h-[85vh] w-full flex-col rounded-t-[28px] bg-white shadow-lift outline-none safe-bottom focus-visible:ring-0 focus-visible:ring-offset-0"
            style={{ position: 'fixed', left: 0, right: 0, bottom: 0 }}
          >
            <div
              className="flex shrink-0 cursor-grab touch-none justify-center pb-1 pt-3 active:cursor-grabbing"
              onPointerDown={(event) => dragControls.start(event)}
            >
              <span aria-hidden className="h-1.5 w-10 rounded-full bg-gray-200" />
            </div>

            <div className="flex shrink-0 items-center justify-between px-5 pb-2">
              <h2 id="sheet-title" className="text-title">
                {title}
              </h2>
              <IconButton
                aria-label="Fechar"
                onClick={() => onCloseRef.current()}
                className="-mr-2"
              >
                <X className="h-5 w-5" />
              </IconButton>
            </div>

            <div
              ref={bodyRef}
              className="flex-1 overflow-y-auto overscroll-contain px-5 pb-4"
            >
              {children}
            </div>

            {footer ? <div className="shrink-0 px-5 pb-5 pt-3">{footer}</div> : null}
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}
