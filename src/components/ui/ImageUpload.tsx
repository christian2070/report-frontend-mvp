import { ImagePlus, Trash2 } from 'lucide-react';
import { forwardRef, useId } from 'react';

import { Button } from '@/components/ui/Button';
import { FormField } from '@/components/ui/FormField';

interface ImageUploadProps {
  previewUrl: string | null;
  fileName: string;
  removable?: boolean;
  disabled?: boolean;
  error?: string;
  name?: string;
  onBlur?: () => void;
  onChange: (file: File | null) => void;
}

export const ImageUpload = forwardRef<HTMLInputElement, ImageUploadProps>(
  function ImageUpload(
    {
      previewUrl,
      fileName,
      removable = false,
      disabled = false,
      error,
      name,
      onBlur,
      onChange,
    },
    ref,
  ) {
    const inputId = useId();
    const hintId = useId();

    return (
      <div className="space-y-4">
        <FormField label="Foto do reporte" htmlFor={inputId} error={error}>
          <input
            ref={ref}
            id={inputId}
            name={name}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="peer sr-only"
            disabled={disabled}
            aria-describedby={hintId}
            aria-invalid={Boolean(error)}
            onBlur={onBlur}
            onChange={(event) => {
              const file = event.target.files?.[0];
              event.target.value = '';
              if (file && !disabled) onChange(file);
            }}
          />
          <label
            htmlFor={inputId}
            onDragOver={(event) => event.preventDefault()}
            onDrop={(event) => {
              event.preventDefault();
              const file = event.dataTransfer.files?.[0];
              if (file && !disabled) onChange(file);
            }}
            className={`flex min-h-48 flex-col items-center justify-center gap-3 rounded-card border-2 border-dashed px-4 py-8 text-center transition-colors peer-focus-visible:border-blue-500 peer-focus-visible:ring-2 peer-focus-visible:ring-blue-100 ${
              disabled
                ? 'cursor-not-allowed bg-gray-50 opacity-60'
                : 'cursor-pointer hover:border-blue-400 hover:bg-blue-50'
            } ${error ? 'border-red-400' : 'border-gray-300'}`}
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
              <ImagePlus className="h-6 w-6" aria-hidden />
            </span>
            <span className="text-sm font-semibold text-blue-600">
              {previewUrl ? 'Trocar foto' : 'Arraste ou selecione uma foto'}
            </span>
            <span className="text-caption">JPG, PNG ou WebP · Até 5 MB</span>
          </label>
        </FormField>

        {previewUrl ? (
          <div className="overflow-hidden rounded-card border border-gray-200">
            <img
              src={previewUrl}
              alt="Prévia da foto do reporte"
              className="max-h-80 w-full bg-gray-50 object-contain"
            />
            <div className="flex items-center justify-between gap-3 border-t border-gray-200 p-3">
              <p className="min-w-0 truncate text-sm text-gray-600">
                {fileName}
              </p>
              {removable ? (
                <Button
                  type="button"
                  variant="danger"
                  size="sm"
                  disabled={disabled}
                  onClick={() => onChange(null)}
                  aria-label="Remover nova foto e restaurar foto salva"
                >
                  <Trash2 className="h-4 w-4" aria-hidden />
                  Remover
                </Button>
              ) : null}
            </div>
          </div>
        ) : null}
        <p id={hintId} className="text-xs text-gray-500">
          {removable
            ? 'Ao remover a nova seleção, a foto salva será restaurada.'
            : 'A substituição é opcional. Se não escolher outra foto, a imagem atual será mantida.'}
        </p>
      </div>
    );
  },
);
