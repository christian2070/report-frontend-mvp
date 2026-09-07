import { yupResolver } from '@hookform/resolvers/yup';
import type { AxiosError } from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

import { useLayout } from '@/hooks/useLayout';
import { useLoadingAction } from '@/hooks/useLoadingAction';
import { authService } from '@/services/auth.service';
import {
  cadastroSchema,
  type CadastroFormValues,
} from '@/screens/Cadastro/CadastroScreen.schema';
import type { ApiError } from '@/types/api.types';
import { getHttpErrorStatus } from '@/utils/normalizeHttpError';

export function useCadastroScreen() {
  const navigate = useNavigate();
  const { notify } = useLayout();
  const { execute } = useLoadingAction();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<CadastroFormValues>({
    resolver: yupResolver(cadastroSchema),
    defaultValues: {
      nome: '',
      email: '',
      senha: '',
      bairro: '',
    },
  });

  const handleSubmit = form.handleSubmit(async (values) => {
    await execute({
      setLoading: setIsSubmitting,
      showErrorMessage: false,
      action: async () => {
        await authService.register({
          nome: values.nome,
          email: values.email,
          senha: values.senha,
          bairro: values.bairro || undefined,
        });

        navigate('/login', {
          state: { message: 'Conta criada com sucesso' },
        });
      },
      onError: async (error: AxiosError<ApiError>) => {
        const status = getHttpErrorStatus(error);

        if (status === 409) {
          notify('error', 'Erro', 'E-mail já cadastrado');
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
