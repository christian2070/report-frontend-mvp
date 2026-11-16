import { ArrowLeft } from 'lucide-react';
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
    <div className="relative">
      <Link
        to="/feed"
        className="absolute left-4 top-4 z-10 inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-blue-600 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
      >
        <ArrowLeft size={18} aria-hidden="true" />
        Voltar para o feed
      </Link>

      <AuthLayout
        title="Entrar"
        subtitle="Entre para acessar o sistema de reportes"
        footer={
          <>
            Não tem conta?{' '}
            <Link
              to="/cadastro"
              className="font-medium text-blue-600 hover:underline"
            >
              Criar conta
            </Link>
          </>
        }
      >
        <form className="space-y-4" onSubmit={onSubmit} noValidate>
          <FloatingField
            label="Digite seu e-mail"
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
                label="Digite sua senha"
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
    </div>
  );
}
