import { useLoginScreen } from '@/screens/Login/LoginScreen.hooks';
import { LoginScreenView } from '@/screens/Login/LoginScreen.view';

export function LoginScreen() {
  const { form, isSubmitting, handleSubmit } = useLoginScreen();

  return (
    <LoginScreenView
      form={form}
      isSubmitting={isSubmitting}
      onSubmit={handleSubmit}
    />
  );
}
