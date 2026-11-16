import { useNovoReporteScreen } from '@/screens/NovoReporte/NovoReporteScreen.hooks';
import { NovoReporteScreenView } from '@/screens/NovoReporte/NovoReporteScreen.view';

export function NovoReporteScreen() {
  const screen = useNovoReporteScreen();

  return (
    <NovoReporteScreenView
      form={screen.form}
      previewUrl={screen.previewUrl}
      isSubmitting={screen.isSubmitting}
      step={screen.step}
      showSuccess={screen.showSuccess}
      canGoNext={screen.canGoNext}
      onPhotoChange={screen.handlePhotoChange}
      onNext={screen.goNext}
      onBack={screen.goBack}
      onSubmit={screen.handleSubmit}
    />
  );
}
