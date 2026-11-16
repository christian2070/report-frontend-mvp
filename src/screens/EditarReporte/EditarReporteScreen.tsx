import { useEditarReporteScreen } from './EditarReporteScreen.hooks';
import { EditarReporteScreenView } from './EditarReporteScreen.view';

export function EditarReporteScreen() {
  return <EditarReporteScreenView {...useEditarReporteScreen()} />;
}
