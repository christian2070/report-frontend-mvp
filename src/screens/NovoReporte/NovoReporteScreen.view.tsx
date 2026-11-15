import { ImagePlus, Trash2 } from "lucide-react";
import { useId } from "react";
import { Controller } from "react-hook-form";

import { Button } from "@/components/ui/Button";
import { FormField } from "@/components/ui/FormField";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import type { useNovoReporteScreen } from "@/screens/NovoReporte/NovoReporteScreen.hooks";
import { categoriaOptions } from "@/utils/labels";

interface NovoReporteScreenViewProps {
  form: ReturnType<typeof useNovoReporteScreen>["form"];
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
  const photoInputId = useId();
  const photoErrorId = `${photoInputId}-error`;
  const photoHintId = `${photoInputId}-hint`;
  const photo = form.watch("foto");

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Novo reporte</h1>
        <p className="mt-1 text-sm text-gray-500">
          Envie uma foto e descreva o problema encontrado
        </p>
      </div>

      <form
        className="space-y-4 rounded-xl border border-gray-200 bg-white p-6"
        onSubmit={onSubmit}
      >
        <FormField
          label="Foto"
          error={errors.foto?.message as string | undefined}
        >
          <div>
            <Controller
              name="foto"
              control={form.control}
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
                  aria-invalid={Boolean(errors.foto)}
                  aria-describedby={`${photoHintId}${errors.foto ? ` ${photoErrorId}` : ""}`}
                  onChange={(event) => {
                    const file = event.target.files?.[0];
                    event.target.value = "";
                    if (file) onPhotoChange(file);
                  }}
                />
              )}
            />
            <label
              htmlFor={photoInputId}
              className={`flex cursor-pointer flex-col items-center gap-2 rounded-xl border-2 border-dashed bg-gray-50 px-4 py-6 text-center transition-colors hover:border-blue-400 hover:bg-blue-50 peer-focus-visible:border-blue-500 peer-focus-visible:ring-2 peer-focus-visible:ring-blue-100 peer-disabled:cursor-not-allowed peer-disabled:opacity-50 ${errors.foto ? "border-red-400" : "border-gray-300"}`}
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                <ImagePlus className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="text-sm font-semibold text-blue-600">
                {previewUrl ? "Trocar foto" : "Selecionar foto"}
              </span>
              <span id={photoHintId} className="text-xs text-gray-500">
                JPG, PNG ou WebP • Uma foto por reporte
              </span>
            </label>
          </div>
          {previewUrl ? (
            <div className="!mt-3 overflow-hidden rounded-xl border border-gray-200 bg-gray-50">
              <img
                src={previewUrl}
                alt="Prévia da foto anexada ao reporte"
                className="max-h-80 w-full object-contain"
              />
              <div className="flex items-center gap-3 border-t border-gray-200 bg-white p-3">
                <p
                  className="min-w-0 flex-1 truncate text-sm text-gray-700"
                  title={photo?.name}
                >
                  {photo?.name || "Foto anexada"}
                </p>
                <button
                  type="button"
                  onClick={() => onPhotoChange(null)}
                  disabled={isSubmitting}
                  aria-label="Remover foto anexada"
                  title="Remover foto"
                  className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-red-600 transition-colors hover:bg-red-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-300 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Trash2 className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>
          ) : null}
          {errors.foto ? (
            <span id={photoErrorId} className="sr-only">
              {errors.foto.message as string}
            </span>
          ) : null}
        </FormField>

        <FormField label="Descrição" error={errors.descricao?.message}>
          <Textarea
            rows={4}
            hasError={Boolean(errors.descricao)}
            {...register("descricao")}
            placeholder="Descreva o problema. Ex.: buraco na via dificultando a passagem de veículos."
          />
        </FormField>

        <FormField label="Categoria" error={errors.categoria?.message}>
          <Select
            hasError={Boolean(errors.categoria)}
            {...register("categoria")}
          >
            {categoriaOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </FormField>

        <FormField label="Localização" error={errors.localizacao?.message}>
          <Input
            hasError={Boolean(errors.localizacao)}
            {...register("localizacao")}
            placeholder="Ex.: Rua das Flores, próximo ao nº 120, bairro Centro"
          />
        </FormField>

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Enviando..." : "Enviar reporte"}
        </Button>
      </form>
    </div>
  );
}
