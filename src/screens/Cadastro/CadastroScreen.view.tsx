import { Link } from 'react-router';

import { Button } from '@/components/ui/Button';
import { FormField } from '@/components/ui/FormField';
import { Input } from '@/components/ui/Input';
import { PasswordInput } from '@/components/ui/PasswordInput';
import type { useCadastroScreen } from '@/screens/Cadastro/CadastroScreen.hooks';

interface CadastroScreenViewProps {
  form: ReturnType<typeof useCadastroScreen>['form'];
  isSubmitting: boolean;
  onSubmit: () => void;
}

export function CadastroScreenView({
  form,
  isSubmitting,
  onSubmit,
}: CadastroScreenViewProps) {
  const {
    register,
    formState: { errors },
  } = form;

  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-4 py-10">
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-semibold text-gray-900">Cadastro</h1>
        <p className="mt-1 text-sm text-gray-500">
          Crie sua conta de cidadão para reportar problemas
        </p>

        <form className="mt-6 space-y-4" onSubmit={onSubmit}>
          <FormField label="Nome" error={errors.nome?.message}>
            <Input
              placeholder="Digite seu nome"
              hasError={Boolean(errors.nome)}
              {...register('nome')}
            />
          </FormField>

          <FormField label="E-mail" error={errors.email?.message}>
            <Input
              type="email"
              placeholder="Digite seu e-mail"
              hasError={Boolean(errors.email)}
              {...register('email')}
            />
          </FormField>

          <FormField label="Senha" error={errors.senha?.message}>
            <PasswordInput
              placeholder="Crie uma senha"
              hasError={Boolean(errors.senha)}
              {...register('senha')}
            />
          </FormField>

          <FormField label="Bairro / cidade (opcional)" error={errors.bairro?.message}>
            <Input
              placeholder="Digite seu bairro ou cidade"
              hasError={Boolean(errors.bairro)}
              {...register('bairro')}
            />
          </FormField>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? 'Criando conta...' : 'Criar conta'}
          </Button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Já tem conta?{' '}
          <Link to="/login" className="font-medium text-blue-600 hover:underline">
            Fazer login
          </Link>
        </p>
      </div>
    </div>
  );
}
