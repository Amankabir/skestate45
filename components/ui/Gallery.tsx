"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Home,
  Expand,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface GalleryProps {
  images: string[];
  alt: string;
  className?: string;
}

export function Gallery({ images, alt, className }: GalleryProps) {
  const photos = images.filter(Boolean);
  const hasPhotos = photos.length > 0;
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  const prev = useCallback(() => {
    if (!hasPhotos) return;
    setActive((i) => (i - 1 + photos.length) % photos.length);
  }, [hasPhotos, photos.length]);

  const next = useCallback(() => {
    if (!hasPhotos) return;
    setActive((i) => (i + 1) % photos.length);
  }, [hasPhotos, photos.length]);

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(false);
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, prev, next]);

  if (!hasPhotos) {
    return (
      <div
        className={cn(
          "relative flex aspect-[16/10] w-full flex-col items-center justify-center overflow-hidden rounded-3xl",
          className,
        )}
        style={{
          background:
            "linear-gradient(160deg, #eef2f6 0%, #dfe6ee 45%, #cfd8e3 100%)",
        }}
      >
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(circle at 25% 30%, rgba(184,151,90,0.28), transparent 50%), radial-gradient(circle at 80% 70%, rgba(15,39,68,0.1), transparent 45%)",
          }}
          aria-hidden
        />
        <span className="relative flex h-16 w-16 items-center justify-center rounded-full border border-navy/10 bg-pearl text-navy/50 shadow-sm">
          <Home className="h-7 w-7" strokeWidth={1.5} aria-hidden />
        </span>
        <p className="font-ui relative mt-4 text-[0.65rem] uppercase tracking-[0.18em] text-navy-muted">
          Photos coming soon
        </p>
        <p className="relative mt-2 max-w-xs text-center text-sm text-text-muted">
          Enquire to schedule a private viewing of this space.
        </p>
      </div>
    );
  }

  return (
    <div className={cn("space-y-3", className)}>
      <div className="group relative overflow-hidden rounded-3xl">
        <button
          type="button"
          onClick={() => setLightbox(true)}
          className="relative aspect-[16/10] w-full overflow-hidden bg-mist"
        >
          <Image
            src={photos[active]!}
            alt={`${alt} — photo ${active + 1}`}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 70vw"
            className="object-cover transition duration-700 group-hover:scale-[1.02]"
          />
          <span className="absolute bottom-4 right-4 inline-flex items-center gap-1.5 rounded-full bg-navy/80 px-3 py-1.5 text-[0.65rem] uppercase tracking-[0.12em] text-pearl backdrop-blur-sm">
            <Expand className="h-3.5 w-3.5" />
            View
          </span>
        </button>

        {photos.length > 1 ? (
          <>
            <button
              type="button"
              onClick={prev}
              className="absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-pearl/90 text-navy opacity-0 shadow transition group-hover:opacity-100"
              aria-label="Previous photo"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={next}
              className="absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-pearl/90 text-navy opacity-0 shadow transition group-hover:opacity-100"
              aria-label="Next photo"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        ) : null}
      </div>

      {photos.length > 1 ? (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {photos.map((src, i) => (
            <button
              key={`${src}-${i}`}
              type="button"
              onClick={() => setActive(i)}
              className={cn(
                "relative h-16 w-24 shrink-0 overflow-hidden rounded-xl border-2 transition sm:h-20 sm:w-28",
                i === active
                  ? "border-gold"
                  : "border-transparent opacity-80 hover:opacity-100",
              )}
              aria-label={`Show photo ${i + 1}`}
            >
              <Image src={src} alt="" fill sizes="112px" className="object-cover" />
            </button>
          ))}
        </div>
      ) : null}

      {lightbox ? (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-navy/95 p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Image lightbox"
        >
          <button
            type="button"
            onClick={() => setLightbox(false)}
            className="absolute right-4 top-4 rounded-full bg-pearl/10 p-2 text-pearl"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
          {photos.length > 1 ? (
            <>
              <button
                type="button"
                onClick={prev}
                className="absolute left-4 rounded-full bg-pearl/10 p-2 text-pearl"
                aria-label="Previous"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                type="button"
                onClick={next}
                className="absolute right-4 rounded-full bg-pearl/10 p-2 text-pearl md:right-16"
                aria-label="Next"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </>
          ) : null}
          <div className="relative h-[80vh] w-full max-w-5xl">
            <Image
              src={photos[active]!}
              alt={`${alt} — photo ${active + 1}`}
              fill
              sizes="100vw"
              className="object-contain"
            />
          </div>
          <p className="font-ui absolute bottom-6 text-xs text-pearl/60">
            {active + 1} / {photos.length}
          </p>
        </div>
      ) : null}
    </div>
  );
}
