import { useCadastroScreen } from '@/screens/Cadastro/CadastroScreen.hooks';
import { CadastroScreenView } from '@/screens/Cadastro/CadastroScreen.view';

export function CadastroScreen() {
  const { form, isSubmitting, handleSubmit } = useCadastroScreen();

  return (
    <CadastroScreenView
      form={form}
      isSubmitting={isSubmitting}
      onSubmit={handleSubmit}
    />
  );
}
