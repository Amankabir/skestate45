import Link from "next/link";

export default function NotFound() {
  return (
    <main
      id="main-content"
      className="flex min-h-[70svh] items-center justify-center bg-ivory px-6 pt-28"
    >
      <div className="max-w-lg text-center">
        <p className="font-ui text-xs uppercase tracking-[0.28em] text-gold">
          404
        </p>
        <h1 className="font-display mt-4 text-4xl text-navy md:text-5xl">
          Page not found
        </h1>
        <p className="mt-4 text-text-muted">
          The page you requested does not exist or the listing is no longer
          available.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="font-ui rounded-full bg-navy px-5 py-2.5 text-xs uppercase tracking-[0.14em] text-pearl"
          >
            Home
          </Link>
          <Link
            href="/properties"
            className="font-ui rounded-full border border-navy/20 px-5 py-2.5 text-xs uppercase tracking-[0.14em] text-navy"
          >
            Properties
          </Link>
          <Link
            href="/contact"
            className="font-ui rounded-full border border-navy/20 px-5 py-2.5 text-xs uppercase tracking-[0.14em] text-navy"
          >
            Contact
          </Link>
        </div>
      </div>
    </main>
  );
}
