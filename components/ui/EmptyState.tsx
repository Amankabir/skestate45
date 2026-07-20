import { AlertCircle, Inbox, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  title?: string;
  description?: string;
  className?: string;
  action?: React.ReactNode;
}

export function EmptyState({
  title = "Nothing to show",
  description = "Try adjusting your filters or check back later.",
  className,
  action,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-2xl border border-dashed border-soft-gray bg-warm-white px-6 py-16 text-center",
        className,
      )}
      role="status"
    >
      <Inbox className="mb-4 h-10 w-10 text-gold" aria-hidden />
      <h3 className="font-display text-2xl text-navy">{title}</h3>
      <p className="mt-2 max-w-md text-sm text-text-muted">{description}</p>
      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  );
}

interface ErrorStateProps {
  title?: string;
  message: string;
  onRetry?: () => void;
  className?: string;
}

export function ErrorState({
  title = "Something went wrong",
  message,
  onRetry,
  className,
}: ErrorStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-2xl border border-red-200/60 bg-pearl px-6 py-16 text-center",
        className,
      )}
      role="alert"
    >
      <AlertCircle className="mb-4 h-10 w-10 text-red-600" aria-hidden />
      <h3 className="font-display text-2xl text-navy">{title}</h3>
      <p className="mt-2 max-w-md text-sm text-text-muted">{message}</p>
      {onRetry ? (
        <button
          type="button"
          onClick={onRetry}
          className="font-ui mt-6 inline-flex items-center gap-2 rounded-full bg-navy px-5 py-2.5 text-xs uppercase tracking-[0.14em] text-pearl transition hover:bg-navy-deep"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          Retry
        </button>
      ) : null}
    </div>
  );
}
