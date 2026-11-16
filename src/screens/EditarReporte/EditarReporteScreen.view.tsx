import { useId } from 'react';
import { Controller } from 'react-hook-form';
import { Button } from '@/components/ui/Button';
import { EmptyState } from '@/components/ui/EmptyState';
import { FormField } from '@/components/ui/FormField';
import { Input } from '@/components/ui/Input';
import { ImageUpload } from '@/components/ui/ImageUpload';
import { PageTransition } from '@/components/ui/PageTransition';
import { Select } from '@/components/ui/Select';
import { DetalheSkeleton } from '@/components/ui/Skeleton';
import { Textarea } from '@/components/ui/Textarea';
import { categoriaOptions } from '@/utils/labels';
import type { useEditarReporteScreen } from './EditarReporteScreen.hooks';

export function EditarReporteScreenView({
  form,
  reporte,
  isLoading,
  loadError,
  submitError,
  canEdit,
  isSaving,
  previewUrl,
  photoName,
  hasNewPhoto,
  onPhotoChange,
  onSubmit,
  onCancel,
}: ReturnType<typeof useEditarReporteScreen>) {
  const descriptionCounterId = useId();

  if (isLoading) return <DetalheSkeleton />;
  if (!reporte)
    return <EmptyState title="Reporte indisponível" description={loadError} />;
  if (!canEdit)
    return (
      <EmptyState
        title="Edição não permitida"
        description="Apenas o cidadão autor pode editar um reporte que ainda não foi resolvido."
      />
    );
  const {
    register,
    control,
    formState: { errors, isSubmitting },
  } = form;
  const busy = isSubmitting || isSaving;

  return (
    <PageTransition className="mx-auto max-w-2xl space-y-6">
      <header>
        <h1 className="text-display">Editar reporte</h1>
        <p className="mt-2 text-sm text-gray-500">
          Atualize as informações do seu reporte.
        </p>
      </header>
      <form
        onSubmit={onSubmit}
        noValidate
        className="rounded-card border border-gray-200 bg-white p-5 sm:p-6"
        aria-busy={busy}
      >
        <fieldset disabled={busy} className="min-w-0 space-y-5">
          <Controller
            name="foto"
            control={control}
            render={({ field }) => (
              <ImageUpload
                ref={field.ref}
                name={field.name}
                onBlur={field.onBlur}
                previewUrl={previewUrl}
                fileName={photoName}
                removable={hasNewPhoto}
                disabled={busy}
                error={errors.foto?.message}
                onChange={onPhotoChange}
              />
            )}
          />
          <FormField
            label="Categoria"
            htmlFor="editar-categoria"
            error={errors.categoria?.message}
          >
            <Select
              id="editar-categoria"
              {...register('categoria')}
              hasError={Boolean(errors.categoria)}
              aria-invalid={Boolean(errors.categoria)}
            >
              {categoriaOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
          </FormField>
          <FormField
            label="Descrição"
            htmlFor="editar-descricao"
            error={errors.descricao?.message}
          >
            <Textarea
              id="editar-descricao"
              {...register('descricao')}
              maxLength={300}
              aria-describedby={descriptionCounterId}
              className="h-32 !resize-none overflow-y-auto"
              hasError={Boolean(errors.descricao)}
              aria-invalid={Boolean(errors.descricao)}
            />
            <p
              id={descriptionCounterId}
              className="mt-1 text-right text-xs text-gray-500"
            >
              {form.watch('descricao')?.length ?? 0}/300
            </p>
          </FormField>
          <FormField
            label="Localização"
            htmlFor="editar-localizacao"
            error={errors.localizacao?.message}
          >
            <Input
              id="editar-localizacao"
              {...register('localizacao')}
              maxLength={500}
              hasError={Boolean(errors.localizacao)}
              aria-invalid={Boolean(errors.localizacao)}
            />
          </FormField>
          {submitError ? (
            <p role="alert" className="text-sm text-red-600">
              {submitError}
            </p>
          ) : null}
          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <Button type="button" variant="secondary" onClick={onCancel}>
              Cancelar
            </Button>
            <Button type="submit" loading={busy}>
              Salvar alterações
            </Button>
          </div>
        </fieldset>
      </form>
    </PageTransition>
  );
}
