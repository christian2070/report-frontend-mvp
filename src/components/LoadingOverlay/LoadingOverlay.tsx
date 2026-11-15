import { useLayout } from '@/hooks/useLayout';
import { Spinner } from '@/components/ui/Spinner';

export function LoadingOverlay() {
  const { loading } = useLayout();

  if (!loading) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/30 backdrop-blur-[1px]">
      <div className="rounded-card border border-gray-200 bg-white p-5 shadow-lift">
        <Spinner size="lg" />
      </div>
    </div>
  );
}
