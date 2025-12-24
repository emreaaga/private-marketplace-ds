"use client";

export function ListSkeleton({ rows = 6 }: { rows?: number }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="bg-muted h-20 animate-pulse rounded-md" />
      ))}
    </div>
  );
}
