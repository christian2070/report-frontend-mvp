interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className = '' }: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={`animate-pulse rounded-control bg-gray-200 ${className}`}
    />
  );
}

export function ReporteCardSkeleton({ className = '' }: SkeletonProps) {
  return (
    <div className={`min-w-0 rounded-[20px] bg-white p-2.5 shadow-sm ${className}`}>
      <Skeleton className="aspect-[16/10] w-full rounded-card sm:aspect-[4/3]" />
      <div className="space-y-3 px-2.5 pb-2.5 pt-3 sm:space-y-3.5 sm:pt-4">
        <div className="flex justify-between">
          <Skeleton className="h-5 w-28 rounded-pill" />
          <Skeleton className="h-5 w-16 rounded-pill" />
        </div>
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
        <div className="flex items-center justify-between pt-1">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-9 w-16 rounded-pill" />
        </div>
      </div>
    </div>
  );
}

export function DetalheSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="aspect-[16/10] w-full rounded-card" />
      <div className="space-y-4 rounded-card border border-gray-200 bg-white p-6">
        <div className="flex gap-2">
          <Skeleton className="h-6 w-24 rounded-pill" />
          <Skeleton className="h-6 w-24 rounded-pill" />
        </div>
        <Skeleton className="h-7 w-48" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-2/3" />
      </div>
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-28 rounded-card" />
        ))}
      </div>
      <Skeleton className="h-64 rounded-card" />
    </div>
  );
}
