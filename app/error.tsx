"use client";

import { useEffect } from "react";
import { ErrorState } from "@/components/ui/EmptyState";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main id="main-content" className="container-luxury py-28">
      <ErrorState
        title="Something went wrong"
        message={error.message || "An unexpected error occurred."}
        onRetry={reset}
      />
    </main>
  );
}
