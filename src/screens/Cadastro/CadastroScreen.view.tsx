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
    <AuthLayout
      title="Criar conta"
      subtitle="Cadastre-se como cidadão e comece a reportar problemas da sua rua."
      impact="Um clique. Um problema. Uma cidade melhor."
      footer={
        <>
          Já tem conta?{' '}
          <Link
            to="/login"
            className="font-semibold text-black underline decoration-transparent underline-offset-4 transition-colors hover:decoration-black"
          >
            Fazer login
          </Link>
        </>
      }
    >
      <form className="space-y-4" onSubmit={onSubmit} noValidate>
        <FloatingField
          label="Nome"
          autoComplete="name"
          error={errors.nome?.message}
          {...register('nome')}
        />

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
          label="Bairro / cidade (opcional)"
          autoComplete="address-level2"
          error={errors.bairro?.message}
          {...register('bairro')}
        />

        <Button type="submit" className="w-full" size="lg" loading={isSubmitting}>
          Criar conta
        </Button>
      </form>
    </AuthLayout>
  );
}
