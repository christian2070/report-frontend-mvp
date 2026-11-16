import { yupResolver } from '@hookform/resolvers/yup';
import type { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router';

import { useAuth } from '@/contexts/AuthContext';
import { useLayout } from '@/hooks/useLayout';
import { useLoadingAction } from '@/hooks/useLoadingAction';
import { authService } from '@/services/auth.service';
import {
  loginSchema,
  type LoginFormValues,
} from '@/screens/Login/LoginScreen.schema';
import type { ApiError } from '@/types/api.types';
import { TipoUsuario } from '@/types/enums';
import { getHttpErrorStatus } from '@/utils/normalizeHttpError';

export function useLoginScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, setUsuario } = useAuth();
  const { notify } = useLayout();
  const { execute } = useLoadingAction();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: yupResolver(loginSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      senha: '',
    },
  });

  useEffect(() => {
    const state = location.state as { message?: string } | null;

    if (state?.message) {
      notify('success', 'Sucesso', state.message);
      navigate(location.pathname, { replace: true, state: null });
    }
  }, [location, navigate, notify]);

  const handleSubmit = form.handleSubmit(async (values) => {
    await execute({
      setLoading: setIsSubmitting,
      showErrorMessage: false,
      action: async () => {
        const response = await authService.login(values);
        login(response.token, response.usuario);

        const fullUser = await authService.me();
        setUsuario(fullUser);

        if (response.usuario.tipo === TipoUsuario.PREFEITURA) {
          navigate('/dashboard');
          return;
        }

        navigate('/feed');
      },
      onError: async (error: AxiosError<ApiError>) => {
        const status = getHttpErrorStatus(error);

        if (status === 401) {
          notify('error', 'Erro', 'E-mail ou senha inválidos');
          return;
        }

        notify(
          'error',
          'Erro',
          error.response?.data?.message || 'Ocorreu um erro inesperado',
        );
      },
    });
  });

  return {
    form,
    isSubmitting,
    handleSubmit,
  };
}
