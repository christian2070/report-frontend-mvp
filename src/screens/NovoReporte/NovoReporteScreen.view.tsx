import { Button } from '@/components/ui/Button';
import { FormField } from '@/components/ui/FormField';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Textarea } from '@/components/ui/Textarea';
import type { useNovoReporteScreen } from '@/screens/NovoReporte/NovoReporteScreen.hooks';
import { categoriaOptions } from '@/utils/labels';

interface NovoReporteScreenViewProps {
  form: ReturnType<typeof useNovoReporteScreen>['form'];
  previewUrl: string | null;
  isSubmitting: boolean;
  onPhotoChange: (file: File | null) => void;
  onSubmit: () => void;
}

export function NovoReporteScreenView({
  form,
  previewUrl,
  isSubmitting,
  onPhotoChange,
  onSubmit,
}: NovoReporteScreenViewProps) {
  const {
    register,
    formState: { errors },
  } = form;

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Novo reporte</h1>
        <p className="mt-1 text-sm text-gray-500">
          Envie uma foto e descreva o problema encontrado
        </p>
      </div>

      <form className="space-y-4 rounded-xl border border-gray-200 bg-white p-6" onSubmit={onSubmit}>
        <FormField label="Foto" error={errors.foto?.message as string | undefined}>
          <Input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            hasError={Boolean(errors.foto)}
            onChange={(event) => onPhotoChange(event.target.files?.[0] ?? null)}
          />
          {previewUrl ? (
            <img
              src={previewUrl}
              alt="Preview da foto"
              className="mt-3 aspect-[4/3] w-full rounded-lg object-cover"
            />
          ) : null}
        </FormField>

        <FormField label="Descrição" error={errors.descricao?.message}>
          <Textarea
            rows={4}
            hasError={Boolean(errors.descricao)}
            {...register('descricao')}
          />
        </FormField>

        <FormField label="Categoria" error={errors.categoria?.message}>
          <Select hasError={Boolean(errors.categoria)} {...register('categoria')}>
            {categoriaOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </FormField>

        <FormField label="Localização" error={errors.localizacao?.message}>
          <Input hasError={Boolean(errors.localizacao)} {...register('localizacao')} />
        </FormField>

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Enviando...' : 'Enviar reporte'}
        </Button>
      </form>
    </div>
  );
}
