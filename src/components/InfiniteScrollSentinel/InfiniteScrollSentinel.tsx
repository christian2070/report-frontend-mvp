import { Spinner } from '@/components/ui/Spinner';

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
    <div ref={sentinelRef} className="flex justify-center py-6">
      {isLoading ? <Spinner /> : null}
    </div>
  );
}
