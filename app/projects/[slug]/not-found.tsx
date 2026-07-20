import Link from "next/link";

export default function ProjectNotFound() {
  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center px-6 pt-28 text-center">
      <p className="font-ui text-xs uppercase tracking-[0.28em] text-gold">
        404
      </p>
      <h1 className="font-display mt-4 text-4xl text-navy md:text-5xl">
        Project not found
      </h1>
      <p className="mt-4 max-w-md text-text-muted">
        This project page isn&apos;t available yet. Browse our launches or speak
        with an advisor.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/projects" className="btn-primary rounded-full">
          Browse Projects
        </Link>
        <Link href="/contact" className="btn-gold rounded-full">
          Talk to Concierge
        </Link>
      </div>
    </main>
  );
}
