import { cn } from "@/lib/utils";

interface LoadingSkeletonProps {
  className?: string;
  count?: number;
  variant?: "card" | "line" | "hero" | "filter";
}

function SkeletonBlock({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-xl bg-soft-gray/70",
        className,
      )}
      aria-hidden
    />
  );
}

export function LoadingSkeleton({
  className,
  count = 6,
  variant = "card",
}: LoadingSkeletonProps) {
  if (variant === "line") {
    return (
      <div className={cn("space-y-3", className)} aria-busy="true" aria-label="Loading">
        {Array.from({ length: count }).map((_, i) => (
          <SkeletonBlock key={i} className="h-4 w-full" />
        ))}
      </div>
    );
  }

  if (variant === "hero") {
    return (
      <div className={cn("space-y-4", className)} aria-busy="true" aria-label="Loading">
        <SkeletonBlock className="h-[60vh] w-full rounded-none" />
      </div>
    );
  }

  if (variant === "filter") {
    return (
      <div className={cn("space-y-4 rounded-2xl border border-soft-gray p-5", className)} aria-busy>
        <SkeletonBlock className="h-8 w-1/2" />
        <SkeletonBlock className="h-12 w-full rounded-full" />
        <SkeletonBlock className="h-24 w-full" />
        <SkeletonBlock className="h-24 w-full" />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "grid gap-6 sm:grid-cols-2 xl:grid-cols-3",
        className,
      )}
      aria-busy="true"
      aria-label="Loading properties"
    >
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="overflow-hidden rounded-2xl bg-pearl shadow-[var(--shadow-soft)]">
          <SkeletonBlock className="aspect-[4/3] w-full rounded-none" />
          <div className="space-y-3 p-5">
            <SkeletonBlock className="h-3 w-1/3" />
            <SkeletonBlock className="h-6 w-3/4" />
            <SkeletonBlock className="h-4 w-1/2" />
            <SkeletonBlock className="h-10 w-full rounded-full" />
          </div>
        </div>
      ))}
    </div>
  );
}
