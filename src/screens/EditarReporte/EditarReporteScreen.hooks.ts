import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate, useParams } from 'react-router';
import { useAuth } from '@/contexts/AuthContext';
import { useLayout } from '@/hooks/useLayout';
import { useLoadingAction } from '@/hooks/useLoadingAction';
import { reportesService } from '@/services/reportes.service';
import type { Reporte } from '@/types/reporte.types';
import { buildAssetUrl } from '@/utils/buildAssetUrl';
import { canEditReporte } from '@/utils/reportePermissions';
import { formatErrorMessage } from '@/utils/normalizeHttpError';
import {
  editarReporteSchema,
  type EditarReporteFormValues,
} from './EditarReporteScreen.schema';

export function useEditarReporteScreen() {
  const { id = '' } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const navigationState: unknown = location.state;
  const hasPreviousPage =
    typeof navigationState === 'object' &&
    navigationState !== null &&
    'returnTo' in navigationState &&
    typeof navigationState.returnTo === 'string';
  const { usuario } = useAuth();
  const { notify } = useLayout();
  const { execute } = useLoadingAction();
  const [reporte, setReporte] = useState<Reporte | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [submitError, setSubmitError] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const pending = useRef(false);
  const form = useForm<EditarReporteFormValues>({
    resolver: yupResolver(editarReporteSchema),
    defaultValues: { descricao: '', localizacao: '' },
  });
  const { reset } = form;

  useEffect(() => {
    let active = true;
    setIsLoading(true);
    setLoadError('');
    setReporte(null);
    void reportesService
      .getById(id)
      .then((data) => {
        if (!active) return;
        setReporte(data);
        reset({
          descricao: data.descricao,
          categoria: data.categoria,
          localizacao: data.localizacao,
        });
      })
      .catch(() => {
        if (active)
          setLoadError(
            'Não foi possível carregar o reporte. Ele pode ter sido removido ou estar indisponível.',
          );
      })
      .finally(() => {
        if (active) setIsLoading(false);
      });
    return () => {
      active = false;
    };
  }, [id, reset]);

  const photo = form.watch('foto');
  useEffect(() => {
    if (!photo) {
      setPreview(null);
      return;
    }
    const url = URL.createObjectURL(photo);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [photo]);

  const canEdit = reporte ? canEditReporte(usuario, reporte) : false;
  const navigateBack = () => {
    if (hasPreviousPage) navigate(-1);
    else navigate('/feed', { replace: true });
  };
  const onPhotoChange = (file: File | null) => {
    if (pending.current) return;
    form.setValue('foto', file ?? undefined, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };
  const onSubmit = form.handleSubmit(async (values) => {
    if (pending.current || !canEdit) return;
    pending.current = true;
    setSubmitError('');
    await execute({
      setLoading: setIsSaving,
      action: async () => {
        await reportesService.update(id, values);
        notify('success', 'Sucesso', 'Reporte atualizado com sucesso');
        navigateBack();
      },
      onError: (err) =>
        setSubmitError(
          formatErrorMessage(
            err.response?.data?.message,
            'Não foi possível salvar o reporte. Tente novamente.',
          ),
        ),
    });
    pending.current = false;
  });

  return {
    form,
    reporte,
    isLoading,
    loadError,
    submitError,
    canEdit,
    isSaving,
    previewUrl: photo ? preview : reporte ? buildAssetUrl(reporte.foto) : null,
    photoName: photo?.name ?? 'Foto atual do reporte',
    hasNewPhoto: Boolean(photo),
    onPhotoChange,
    onSubmit,
    onCancel: () => {
      if (pending.current) return;
      navigateBack();
    },
  };
}
