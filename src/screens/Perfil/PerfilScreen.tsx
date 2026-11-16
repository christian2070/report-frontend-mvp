import { usePerfilScreen } from './PerfilScreen.hooks';
import { PerfilScreenView } from './PerfilScreen.view';

export function PerfilScreen() {
  return <PerfilScreenView {...usePerfilScreen()} />;
}
