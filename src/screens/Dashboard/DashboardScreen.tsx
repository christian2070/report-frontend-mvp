import { useDashboardScreen } from '@/screens/Dashboard/DashboardScreen.hooks';
import { DashboardScreenView } from '@/screens/Dashboard/DashboardScreen.view';

export function DashboardScreen() {
  const screen = useDashboardScreen();

  return <DashboardScreenView {...screen} />;
}
