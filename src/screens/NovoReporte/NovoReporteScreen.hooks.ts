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
import { CategoriaReporte } from '@/types/enums';

export function useNovoReporteScreen() {
  const navigate = useNavigate();
  const { notify } = useLayout();
  const { execute } = useLoadingAction();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const form = useForm<NovoReporteFormValues>({
    resolver: yupResolver(novoReporteSchema),
    defaultValues: {
      descricao: '',
      categoria: CategoriaReporte.OUTROS,
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
      setPreviewUrl(null);
      form.resetField('foto');
      return;
    }

    form.setValue('foto', file, { shouldValidate: true });
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleSubmit = form.handleSubmit(async (values) => {
    await execute({
      setLoading: setIsSubmitting,
      action: async () => {
        await reportesService.create(values);
        notify('success', 'Sucesso', 'Reporte enviado com sucesso');
        navigate('/feed');
      },
    });
  });

  return {
    form,
    previewUrl,
    isSubmitting,
    handlePhotoChange,
    handleSubmit,
  };
}
