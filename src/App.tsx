import { AuthProvider } from '@/contexts/AuthContext';
import { LayoutProvider } from '@/contexts/LayoutContext';
import { AppRouter } from '@/routes/AppRouter';
import { AppToaster } from '@/components/Toaster/Toaster';
import { LoadingOverlay } from '@/components/LoadingOverlay/LoadingOverlay';

function App() {
  return (
    <LayoutProvider>
      <AuthProvider>
        <AppRouter />
        <AppToaster />
        <LoadingOverlay />
      </AuthProvider>
    </LayoutProvider>
  );
}

export default App;
