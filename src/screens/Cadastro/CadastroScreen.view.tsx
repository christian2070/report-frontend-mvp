import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router';
import { Controller } from 'react-hook-form';

import { AuthLayout } from '@/components/AuthLayout/AuthLayout';
import { Button } from '@/components/ui/Button';
import { FloatingField } from '@/components/ui/FloatingField';
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
        title="Criar conta"
        subtitle="Crie sua conta de cidadão para reportar problemas"
        impact="Um clique. Um problema. Uma cidade melhor."
        footer={
          <>
            Já tem conta?{' '}
            <Link
              to="/login"
              className="font-medium text-blue-600 hover:underline"
            >
              Fazer login
            </Link>
          </>
        }
      >
        <form className="space-y-4" onSubmit={onSubmit} noValidate>
          <FloatingField
            label="Digite seu nome"
            autoComplete="name"
            error={errors.nome?.message}
            {...register('nome')}
          />

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
                label="Crie uma senha"
                autoComplete="new-password"
                showStrength
                error={errors.senha?.message}
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                name={field.name}
                ref={field.ref}
              />
            )}
          />

          <FloatingField
            label="Digite seu bairro ou cidade"
            autoComplete="address-level2"
            error={errors.bairro?.message}
            {...register('bairro')}
          />

          <Button type="submit" className="w-full" size="lg" loading={isSubmitting}>
            Criar conta
          </Button>
        </form>
      </AuthLayout>
    </div>
  );
}
