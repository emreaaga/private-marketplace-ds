import { Skeleton } from "@/shared/ui/atoms/skeleton";

export function TableSkeleton({ rows = 10, columns = 6 }: { rows?: number; columns?: number }) {
  return (
    <div className="overflow-hidden rounded-md border">
      <div className="bg-muted/40 grid border-b px-3 py-2" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
        {Array.from({ length: columns }).map((_, i) => (
          <Skeleton key={i} className="h-2.5 w-20" />
        ))}
      </div>

      <div className="divide-y">
        {Array.from({ length: rows }).map((_, rowIdx) => (
          <div
            key={rowIdx}
            className="grid items-center px-3 py-2"
            style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
          >
            {Array.from({ length: columns }).map((_, colIdx) => (
              <Skeleton key={colIdx} className="h-3 w-full" />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
