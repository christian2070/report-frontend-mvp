import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

import { useLayout } from '@/hooks/useLayout';
import { useLoadingAction } from '@/hooks/useLoadingAction';
import { reportesService } from '@/services/reportes.service';
import {
  novoReporteSchema,
  type NovoReporteFormValues,
} from '@/screens/NovoReporte/NovoReporteScreen.schema';
export type NovoReporteStep = 0 | 1 | 2 | 3;

export function useNovoReporteScreen() {
  const navigate = useNavigate();
  const { notify } = useLayout();
  const { execute } = useLoadingAction();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [step, setStep] = useState<NovoReporteStep>(0);
  const [showSuccess, setShowSuccess] = useState(false);

  const form = useForm<NovoReporteFormValues>({
    resolver: yupResolver(novoReporteSchema),
    mode: 'onChange',
    defaultValues: {
      descricao: '',
      localizacao: '',
    },
  });

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const handlePhotoChange = (file: File | null) => {
    if (!file) {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
      form.resetField('foto');
      return;
    }

    if (previewUrl) URL.revokeObjectURL(previewUrl);
    form.setValue('foto', file, { shouldValidate: true });
    setPreviewUrl(URL.createObjectURL(file));
  };

  const values = form.watch();
  const fotoOk = values.foto instanceof File;
  const categoriaOk = Boolean(values.categoria);
  const detalhesOk =
    Boolean(values.descricao?.trim()) && Boolean(values.localizacao?.trim());

  const canGoNext =
    (step === 0 && fotoOk) ||
    (step === 1 && categoriaOk) ||
    (step === 2 && detalhesOk) ||
    step === 3;

  const goNext = async () => {
    if (step === 0) {
      const valid = await form.trigger('foto');
      if (!valid) return;
      setStep(1);
      return;
    }

    if (step === 1) {
      const valid = await form.trigger('categoria');
      if (!valid) return;
      setStep(2);
      return;
    }

    if (step === 2) {
      const valid = await form.trigger(['descricao', 'localizacao']);
      if (!valid) return;
      setStep(3);
    }
  };

  const goBack = () => {
    setStep((current) => (current > 0 ? ((current - 1) as NovoReporteStep) : current));
  };

  const handleSubmit = form.handleSubmit(async (submitValues) => {
    await execute({
      setLoading: setIsSubmitting,
      action: async () => {
        await reportesService.create(submitValues);
        setShowSuccess(true);
        notify('success', 'Sucesso', 'Reporte enviado com sucesso');
        window.setTimeout(() => {
          navigate('/feed');
        }, 1200);
      },
    });
  });

  return {
    form,
    previewUrl,
    isSubmitting,
    step,
    showSuccess,
    canGoNext,
    fotoOk,
    categoriaOk,
    detalhesOk,
    handlePhotoChange,
    goNext,
    goBack,
    handleSubmit,
    setStep,
  };
}
