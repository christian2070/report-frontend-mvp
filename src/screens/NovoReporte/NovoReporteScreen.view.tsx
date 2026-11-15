import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Check, ImagePlus, Trash2 } from 'lucide-react';
import { useId } from 'react';
import { Controller } from 'react-hook-form';

import { Button } from '@/components/ui/Button';
import { FormField } from '@/components/ui/FormField';
import { Input } from '@/components/ui/Input';
import { PageTransition } from '@/components/ui/PageTransition';
import { Textarea } from '@/components/ui/Textarea';
import type { useNovoReporteScreen } from '@/screens/NovoReporte/NovoReporteScreen.hooks';
import { categoriaIcons } from '@/utils/categoriaIcons';
import { categoriaLabels, categoriaOptions } from '@/utils/labels';

interface NovoReporteScreenViewProps {
  form: ReturnType<typeof useNovoReporteScreen>['form'];
  previewUrl: string | null;
  isSubmitting: boolean;
  step: ReturnType<typeof useNovoReporteScreen>['step'];
  showSuccess: boolean;
  canGoNext: boolean;
  onPhotoChange: (file: File | null) => void;
  onNext: () => void;
  onBack: () => void;
  onSubmit: () => void;
}

const steps = ['Foto', 'Categoria', 'Detalhes', 'Revisão'];

export function NovoReporteScreenView({
  form,
  previewUrl,
  isSubmitting,
  step,
  showSuccess,
  canGoNext,
  onPhotoChange,
  onNext,
  onBack,
  onSubmit,
}: NovoReporteScreenViewProps) {
  const {
    register,
    control,
    watch,
    formState: { errors },
  } = form;
  const photoInputId = useId();
  const reduceMotion = useReducedMotion();
  const values = watch();
  const progress = ((step + 1) / steps.length) * 100;

  if (showSuccess) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center text-center">
        <motion.div
          initial={reduceMotion ? false : { scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="flex h-20 w-20 items-center justify-center rounded-full bg-black text-white"
        >
          <Check className="h-10 w-10" strokeWidth={2.5} />
        </motion.div>
        <h2 className="mt-6 text-title">Reporte enviado</h2>
        <p className="mt-2 text-sm text-gray-600">Redirecionando para o feed…</p>
      </div>
    );
  }

  return (
    <PageTransition className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="text-display">Novo reporte</h1>
        <p className="mt-2 text-sm text-gray-600">
          Fluxo guiado em {steps.length} etapas
        </p>
      </div>

      <div>
        <div className="mb-2 flex items-center justify-between text-caption">
          <span>
            Etapa {step + 1} de {steps.length} — {steps[step]}
          </span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-pill bg-gray-200">
          <motion.div
            className="h-full origin-left rounded-pill bg-black"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
      </div>

      <form
        className="space-y-6 rounded-card border border-gray-200 bg-white p-5 sm:p-6"
        onSubmit={(event) => {
          event.preventDefault();
          if (step < 3) onNext();
          else onSubmit();
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={reduceMotion ? false : { opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, x: -16 }}
            transition={{ duration: 0.25 }}
          >
            {step === 0 ? (
              <div className="space-y-4">
                <FormField
                  label="Foto do problema"
                  error={errors.foto?.message as string | undefined}
                >
                  <Controller
                    name="foto"
                    control={control}
                    render={({ field }) => (
                      <input
                        ref={field.ref}
                        name={field.name}
                        onBlur={field.onBlur}
                        id={photoInputId}
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        className="peer sr-only"
                        disabled={isSubmitting}
                        aria-label="Anexar foto do reporte"
                        onChange={(event) => {
                          const file = event.target.files?.[0] ?? null;
                          event.target.value = '';
                          onPhotoChange(file);
                        }}
                      />
                    )}
                  />

                  <label
                    htmlFor={photoInputId}
                    onDragOver={(event) => event.preventDefault()}
                    onDrop={(event) => {
                      event.preventDefault();
                      const file = event.dataTransfer.files?.[0] ?? null;
                      if (file) onPhotoChange(file);
                    }}
                    className={`flex min-h-48 cursor-pointer flex-col items-center justify-center gap-3 rounded-card border-2 border-dashed px-4 py-8 text-center transition-colors hover:border-black hover:bg-gray-50 peer-focus-visible:border-black ${
                      errors.foto ? 'border-black' : 'border-gray-200'
                    }`}
                  >
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                      <ImagePlus className="h-6 w-6" aria-hidden />
                    </span>
                    <span className="text-sm font-semibold">
                      {previewUrl ? 'Trocar foto' : 'Arraste ou selecione uma foto'}
                    </span>
                    <span className="text-caption">JPG, PNG ou WebP</span>
                  </label>
                </FormField>

                <AnimatePresence>
                  {previewUrl ? (
                    <motion.div
                      initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={reduceMotion ? undefined : { opacity: 0, scale: 0.96 }}
                      className="overflow-hidden rounded-card border border-gray-200"
                    >
                      <img
                        src={previewUrl}
                        alt="Prévia da foto anexada"
                        className="max-h-80 w-full object-contain bg-gray-50"
                      />
                      <div className="flex items-center justify-between gap-3 border-t border-gray-200 p-3">
                        <p className="truncate text-sm text-gray-600">
                          {values.foto?.name || 'Foto anexada'}
                        </p>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          aria-label="Remover foto"
                          onClick={() => onPhotoChange(null)}
                        >
                          <Trash2 className="h-4 w-4" />
                          Remover
                        </Button>
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            ) : null}

            {step === 1 ? (
              <div className="space-y-3">
                <p className="text-sm font-medium text-gray-900">Escolha a categoria</p>
                {errors.categoria ? (
                  <p className="text-xs text-gray-900" role="alert">
                    {errors.categoria.message}
                  </p>
                ) : null}
                <Controller
                  name="categoria"
                  control={control}
                  render={({ field }) => (
                    <div className="grid gap-3 sm:grid-cols-2">
                      {categoriaOptions.map((option) => {
                        const Icon = categoriaIcons[option.value];
                        const active = field.value === option.value;
                        return (
                          <button
                            key={option.value}
                            type="button"
                            onClick={() =>
                              field.onChange(option.value)
                            }
                            className={`flex min-h-24 flex-col items-start gap-3 rounded-card border p-4 text-left transition-all active:scale-[0.98] ${
                              active
                                ? 'border-black bg-black text-white'
                                : 'border-gray-200 bg-white hover:border-gray-400'
                            }`}
                          >
                            <Icon className="h-6 w-6" aria-hidden />
                            <span className="text-sm font-semibold">{option.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                />
              </div>
            ) : null}

            {step === 2 ? (
              <div className="space-y-4">
                <FormField label="Descrição" error={errors.descricao?.message}>
                  <Textarea
                    rows={4}
                    hasError={Boolean(errors.descricao)}
                    {...register('descricao')}
                    placeholder="Descreva o problema com clareza"
                  />
                </FormField>
                <FormField label="Localização" error={errors.localizacao?.message}>
                  <Input
                    hasError={Boolean(errors.localizacao)}
                    {...register('localizacao')}
                    placeholder="Ex.: Rua das Flores, próximo ao nº 120"
                  />
                </FormField>
              </div>
            ) : null}

            {step === 3 ? (
              <div className="space-y-4">
                <p className="text-sm font-medium text-gray-900">Revise antes de enviar</p>
                {previewUrl ? (
                  <img
                    src={previewUrl}
                    alt="Prévia do reporte"
                    className="aspect-[16/10] w-full rounded-card object-cover"
                  />
                ) : null}
                <dl className="space-y-3 text-sm">
                  <div>
                    <dt className="text-caption">Categoria</dt>
                    <dd className="font-medium">
                      {values.categoria ? categoriaLabels[values.categoria] : '—'}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-caption">Descrição</dt>
                    <dd className="font-medium">{values.descricao || '—'}</dd>
                  </div>
                  <div>
                    <dt className="text-caption">Localização</dt>
                    <dd className="font-medium">{values.localizacao || '—'}</dd>
                  </div>
                </dl>
              </div>
            ) : null}
          </motion.div>
        </AnimatePresence>

        <div className="flex items-center justify-between gap-3 border-t border-gray-100 pt-4">
          <Button
            type="button"
            variant="ghost"
            onClick={onBack}
            disabled={step === 0 || isSubmitting}
          >
            Voltar
          </Button>

          {step < 3 ? (
            <Button type="button" onClick={onNext} disabled={!canGoNext}>
              Continuar
            </Button>
          ) : (
            <Button type="submit" loading={isSubmitting} disabled={!form.formState.isValid}>
              Enviar reporte
            </Button>
          )}
        </div>
      </form>
    </PageTransition>
  );
}
