import { Link } from 'react-router';

import { Button } from '@/components/ui/Button';
import { FormField } from '@/components/ui/FormField';
import { Input } from '@/components/ui/Input';
import { PasswordInput } from '@/components/ui/PasswordInput';
import type { useLoginScreen } from '@/screens/Login/LoginScreen.hooks';

interface LoginScreenViewProps {
  form: ReturnType<typeof useLoginScreen>['form'];
  isSubmitting: boolean;
  onSubmit: () => void;
}

export function LoginScreenView({
  form,
  isSubmitting,
  onSubmit,
}: LoginScreenViewProps) {
  const {
    register,
    formState: { errors },
  } = form;

  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-4 py-10">
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-semibold text-gray-900">Login</h1>
        <p className="mt-1 text-sm text-gray-500">
          Entre para acessar o sistema de reportes
        </p>

        <form className="mt-6 space-y-4" onSubmit={onSubmit}>
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
              placeholder="Digite sua senha"
              hasError={Boolean(errors.senha)}
              {...register('senha')}
            />
          </FormField>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? 'Entrando...' : 'Entrar'}
          </Button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Não tem conta?{' '}
          <Link to="/cadastro" className="font-medium text-blue-600 hover:underline">
            Criar conta
          </Link>
        </p>
      </div>
    </div>
  );
}
