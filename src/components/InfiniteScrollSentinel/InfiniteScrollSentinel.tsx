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
    <div ref={sentinelRef} className="py-2">
      {isLoading ? (
        <div className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          <ReporteCardSkeleton />
          <ReporteCardSkeleton className="hidden sm:block" />
          <ReporteCardSkeleton className="hidden lg:block" />
        </div>
      ) : (
        <div className="h-8" aria-hidden />
      )}
    </div>
  );
}
