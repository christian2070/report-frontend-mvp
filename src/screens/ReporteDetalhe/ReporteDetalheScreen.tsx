import { useReporteDetalheScreen } from '@/screens/ReporteDetalhe/ReporteDetalheScreen.hooks';
import { ReporteDetalheScreenView } from '@/screens/ReporteDetalhe/ReporteDetalheScreen.view';

export function ReporteDetalheScreen() {
  const screen = useReporteDetalheScreen();

  return <ReporteDetalheScreenView {...screen} />;
}
