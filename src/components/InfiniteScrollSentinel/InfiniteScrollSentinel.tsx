import { ReporteCardSkeleton } from '@/components/ui/Skeleton';

interface InfiniteScrollSentinelProps {
  sentinelRef: React.RefObject<HTMLDivElement | null>;
  isLoading: boolean;
  hasMore: boolean;
}

export function InfiniteScrollSentinel({
  sentinelRef,
  isLoading,
  hasMore,
}: InfiniteScrollSentinelProps) {
  if (!hasMore && !isLoading) {
    return null;
  }

  return (
    <div ref={sentinelRef} className="space-y-4 py-2">
      {isLoading ? (
        <div className="grid gap-4 sm:grid-cols-2">
          <ReporteCardSkeleton />
          <ReporteCardSkeleton />
        </div>
      ) : (
        <div className="h-8" aria-hidden />
      )}
    </div>
  );
}
