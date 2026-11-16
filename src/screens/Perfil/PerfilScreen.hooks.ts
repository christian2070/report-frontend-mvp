import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { useAuth } from '@/contexts/AuthContext';
import { useLayout } from '@/hooks/useLayout';
import { useLoadingAction } from '@/hooks/useLoadingAction';
import { authService } from '@/services/auth.service';
import { formatErrorMessage } from '@/utils/normalizeHttpError';
import {
  perfilSchema,
  senhaSchema,
  type PerfilFormValues,
  type SenhaFormValues,
} from './PerfilScreen.schema';

const emptyPasswords = {
  senhaAtual: '',
  novaSenha: '',
  confirmarNovaSenha: '',
};

export function usePerfilScreen() {
  const { setUsuario, isCidadao, isPrefeitura } = useAuth();
  const { notify } = useLayout();
  const { execute } = useLoadingAction();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [profileError, setProfileError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const pending = useRef(false);
  const form = useForm<PerfilFormValues>({
    resolver: yupResolver(perfilSchema),
    defaultValues: { nome: '', email: '', bairro: '' },
  });
  const passwordForm = useForm<SenhaFormValues>({
    resolver: yupResolver(senhaSchema),
    defaultValues: emptyPasswords,
  });
  const { reset } = form;

  useEffect(() => {
    let active = true;
    void authService
      .me()
      .then((current) => {
        if (!active) return;
        setUsuario(current);
        reset({
          nome: current.nome,
          email: current.email,
          bairro: current.bairro ?? '',
        });
      })
      .catch(() => {
        if (active)
          setLoadError(
            'Não foi possível carregar seu perfil. Tente abrir a página novamente.',
          );
      })
      .finally(() => {
        if (active) setIsLoading(false);
      });
    return () => {
      active = false;
    };
  }, [reset, setUsuario]);

  const onSubmit = form.handleSubmit(async ({ nome, email, bairro }) => {
    if (pending.current) return;
    pending.current = true;
    setProfileError('');
    await execute({
      setLoading: setIsSaving,
      action: async () => {
        const updated = await authService.updateMe({
          nome,
          email,
          ...(isCidadao ? { bairro } : {}),
        });
        setUsuario(updated);
        reset({
          nome: updated.nome,
          email: updated.email,
          bairro: updated.bairro ?? '',
        });
        notify('success', 'Sucesso', 'Perfil atualizado com sucesso');
      },
      onError: (err) =>
        setProfileError(
          formatErrorMessage(
            err.response?.data?.message,
            'Não foi possível atualizar o perfil. Tente novamente.',
          ),
        ),
    });
    pending.current = false;
  });

  const onChangePassword = passwordForm.handleSubmit(async (values) => {
    if (pending.current) return;
    pending.current = true;
    setPasswordError('');
    await execute({
      setLoading: setIsChangingPassword,
      action: async () => {
        await authService.changePassword(values);
        passwordForm.reset(emptyPasswords);
        setIsPasswordModalOpen(false);
        notify('success', 'Sucesso', 'Senha alterada com sucesso');
      },
      onError: (err) =>
        setPasswordError(
          formatErrorMessage(
            err.response?.data?.message,
            'Não foi possível alterar a senha. Tente novamente.',
          ),
        ),
    });
    pending.current = false;
  });

  return {
    form,
    passwordForm,
    isCidadao,
    isLoading,
    loadError,
    profileError,
    passwordError,
    isSaving,
    isChangingPassword,
    isPasswordModalOpen,
    onSubmit,
    onChangePassword,
    onOpenPasswordModal: () => {
      if (pending.current) return;
      passwordForm.reset(emptyPasswords);
      setPasswordError('');
      setIsPasswordModalOpen(true);
    },
    onClosePasswordModal: () => {
      if (pending.current || passwordForm.formState.isSubmitting) return;
      setIsPasswordModalOpen(false);
      passwordForm.reset(emptyPasswords);
      setPasswordError('');
    },
    onCancel: () => {
      if (!pending.current) navigate(isPrefeitura ? '/dashboard' : '/feed');
    },
  };
}
