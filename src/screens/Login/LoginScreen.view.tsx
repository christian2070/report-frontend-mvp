import { Link } from 'react-router';
import { Controller } from 'react-hook-form';

import { AuthLayout } from '@/components/AuthLayout/AuthLayout';
import { Button } from '@/components/ui/Button';
import { FloatingField } from '@/components/ui/FloatingField';
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
    control,
    formState: { errors },
  } = form;

  return (
    <AuthLayout
      title="Entrar"
      subtitle="Acesse sua conta para acompanhar e reportar problemas."
      footer={
        <>
          Não tem conta?{' '}
          <Link
            to="/cadastro"
            className="font-semibold text-black underline decoration-transparent underline-offset-4 transition-colors hover:decoration-black"
          >
            Criar conta
          </Link>
        </>
      }
    >
      <form className="space-y-4" onSubmit={onSubmit} noValidate>
        <FloatingField
          label="E-mail"
          type="email"
          autoComplete="email"
          error={errors.email?.message}
          {...register('email')}
        />

        <Controller
          name="senha"
          control={control}
          render={({ field }) => (
            <PasswordInput
              label="Senha"
              autoComplete="current-password"
              error={errors.senha?.message}
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              name={field.name}
              ref={field.ref}
            />
          )}
        />

        <Button type="submit" className="w-full" size="lg" loading={isSubmitting}>
          Entrar
        </Button>
      </form>
    </AuthLayout>
  );
}
