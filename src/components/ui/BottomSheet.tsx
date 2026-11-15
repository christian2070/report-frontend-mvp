import { X } from 'lucide-react';
import { useEffect, type ReactNode } from 'react';
import { createPortal } from 'react-dom';

import { IconButton } from '@/components/ui/IconButton';

interface BottomSheetProps {
  open: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
}

export function BottomSheet({ open, title, onClose, children }: BottomSheetProps) {
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-[70] flex items-end justify-center md:hidden">
      <button
        type="button"
        aria-label="Fechar filtros"
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="sheet-title"
        className="relative z-10 max-h-[85vh] w-full overflow-y-auto rounded-t-card border border-gray-200 bg-white p-5 shadow-lift safe-bottom"
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 id="sheet-title" className="text-title">
            {title}
          </h2>
          <IconButton aria-label="Fechar" onClick={onClose}>
            <X className="h-5 w-5" />
          </IconButton>
        </div>
        {children}
      </div>
    </div>,
    document.body,
  );
}
