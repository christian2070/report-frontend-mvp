import { useId } from "react";
import { LockKeyhole } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { FloatingField } from "@/components/ui/FloatingField";
import { Modal } from "@/components/ui/Modal";
import { PageTransition } from "@/components/ui/PageTransition";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { DetalheSkeleton } from "@/components/ui/Skeleton";
import type { usePerfilScreen } from "./PerfilScreen.hooks";

export function PerfilScreenView({
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
  onCancel,
  onOpenPasswordModal,
  onClosePasswordModal,
}: ReturnType<typeof usePerfilScreen>) {
  const passwordFormId = useId();
  if (isLoading) return <DetalheSkeleton />;
  if (loadError)
    return <EmptyState title="Perfil indisponível" description={loadError} />;
  const errors = form.formState.errors;
  const passwordErrors = passwordForm.formState.errors;
  const busy =
    isSaving ||
    isChangingPassword ||
    form.formState.isSubmitting ||
    passwordForm.formState.isSubmitting;

  return (
    <PageTransition className="mx-auto max-w-2xl space-y-6">
      <header>
        <h1 className="text-display">Editar perfil</h1>
        <p className="mt-2 text-sm text-gray-500">
          Gerencie seus dados e a segurança da sua conta.
        </p>
      </header>
      <form
        onSubmit={onSubmit}
        noValidate
        aria-busy={isSaving}
        className="rounded-card border border-gray-200 bg-white p-5 sm:p-6"
      >
        <fieldset disabled={busy} className="min-w-0 space-y-5">
          <legend className="mb-2 text-title">Dados pessoais</legend>
          <FloatingField
            label="Nome"
            autoComplete="name"
            maxLength={255}
            {...form.register("nome")}
            error={errors.nome?.message}
          />
          <FloatingField
            label="E-mail"
            type="email"
            autoComplete="email"
            maxLength={255}
            {...form.register("email")}
            error={errors.email?.message}
          />
          {isCidadao ? (
            <FloatingField
              label="Bairro (opcional)"
              maxLength={255}
              {...form.register("bairro")}
              error={errors.bairro?.message}
            />
          ) : null}
          {profileError ? (
            <p role="alert" className="text-sm text-red-600">
              {profileError}
            </p>
          ) : null}
          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <Button type="button" variant="secondary" onClick={onCancel}>
              Cancelar
            </Button>
            <Button type="submit" loading={isSaving}>
              Salvar alterações
            </Button>
          </div>
        </fieldset>
      </form>
      <section
        className="space-y-4 rounded-card border border-gray-200 bg-white p-5 sm:p-6"
        aria-labelledby="perfil-seguranca"
      >
        <div>
          <h2 id="perfil-seguranca" className="text-title">
            Segurança da conta
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Atualize sua senha para manter sua conta protegida.
          </p>
        </div>
        <Button
          type="button"
          variant="secondary"
          onClick={onOpenPasswordModal}
          disabled={busy}
        >
          <LockKeyhole className="h-4 w-4" aria-hidden />
          Alterar senha
        </Button>
      </section>
      <Modal
        open={isPasswordModalOpen}
        title="Alterar senha"
        description="Informe sua senha atual. A nova senha deve ter pelo menos 6 caracteres."
        confirmLabel="Alterar senha"
        confirmForm={passwordFormId}
        loading={isChangingPassword || passwordForm.formState.isSubmitting}
        onClose={onClosePasswordModal}
      >
        <form
          id={passwordFormId}
          onSubmit={onChangePassword}
          noValidate
          aria-busy={isChangingPassword}
        >
          <fieldset disabled={busy} className="min-w-0 space-y-5">
            <PasswordInput
              label="Senha atual"
              autoComplete="current-password"
              {...passwordForm.register("senhaAtual")}
              error={passwordErrors.senhaAtual?.message}
            />
            <PasswordInput
              label="Nova senha"
              autoComplete="new-password"
              {...passwordForm.register("novaSenha")}
              error={passwordErrors.novaSenha?.message}
            />
            <PasswordInput
              label="Confirmar nova senha"
              autoComplete="new-password"
              {...passwordForm.register("confirmarNovaSenha")}
              error={passwordErrors.confirmarNovaSenha?.message}
            />
            {passwordError ? (
              <p role="alert" className="text-sm text-red-600">
                {passwordError}
              </p>
            ) : null}
          </fieldset>
        </form>
      </Modal>
    </PageTransition>
  );
}
