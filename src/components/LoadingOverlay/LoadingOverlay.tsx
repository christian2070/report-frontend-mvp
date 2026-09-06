import { useLayout } from '@/hooks/useLayout';
import { Spinner } from '@/components/ui/Spinner';

export function LoadingOverlay() {
  const { loading } = useLayout();

  if (!loading) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20">
      <div className="rounded-xl bg-white p-4 shadow-lg">
        <Spinner size="lg" />
      </div>
    </div>
  );
}
