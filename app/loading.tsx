import { LoadingSkeleton } from "@/components/ui/LoadingSkeleton";

export default function Loading() {
  return (
    <main className="container-luxury py-28">
      <LoadingSkeleton variant="hero" />
      <LoadingSkeleton className="mt-10" count={6} />
    </main>
  );
}
