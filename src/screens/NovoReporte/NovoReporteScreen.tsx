import { useNovoReporteScreen } from '@/screens/NovoReporte/NovoReporteScreen.hooks';
import { NovoReporteScreenView } from '@/screens/NovoReporte/NovoReporteScreen.view';

export function NovoReporteScreen() {
  const screen = useNovoReporteScreen();

  return (
    <NovoReporteScreenView
      form={screen.form}
      previewUrl={screen.previewUrl}
      isSubmitting={screen.isSubmitting}
      onPhotoChange={screen.handlePhotoChange}
      onSubmit={screen.handleSubmit}
    />
  );
}
