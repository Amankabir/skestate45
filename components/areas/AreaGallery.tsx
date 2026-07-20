"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn, ClipReveal } from "@/animations/Reveal";
import type { GalleryImage } from "@/types";
import { cn } from "@/lib/utils";

interface AreaGalleryProps {
  areaName: string;
  images: GalleryImage[];
}

export function AreaGallery({ areaName, images }: AreaGalleryProps) {
  const [active, setActive] = useState<number | null>(null);

  const close = useCallback(() => setActive(null), []);
  const prev = useCallback(
    () =>
      setActive((i) =>
        i === null ? null : (i - 1 + images.length) % images.length
      ),
    [images.length]
  );
  const next = useCallback(
    () => setActive((i) => (i === null ? null : (i + 1) % images.length)),
    [images.length]
  );

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [active, close, prev, next]);

  return (
    <section
      className="section-pad bg-warm-white"
      aria-labelledby="gallery-heading"
    >
      <div className="container-luxury">
        <SectionHeading
          eyebrow="Gallery"
          title={`${areaName} in frames`}
          description="Architecture, avenues, and the quiet luxury of planned living."
        />

        <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
          {images.map((img, i) => (
            <FadeIn
              key={img.id}
              delay={i * 0.06}
              className={cn(i === 0 && "md:col-span-2 md:row-span-2")}
            >
              <button
                type="button"
                onClick={() => setActive(i)}
                className="group relative block w-full overflow-hidden rounded-2xl text-left"
                aria-label={`View ${img.caption}`}
              >
                <ClipReveal
                  className={cn(
                    "relative",
                    i === 0 ? "aspect-[16/11] md:aspect-auto md:h-full md:min-h-[420px]" : "aspect-[4/3]"
                  )}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes={i === 0 ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 50vw, 33vw"}
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-navy-deep/0 transition-colors duration-400 group-hover:bg-navy-deep/35" />
                  <span className="font-ui absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-navy-deep/80 to-transparent p-4 text-xs uppercase tracking-[0.16em] text-pearl transition-transform duration-400 group-hover:translate-y-0">
                    {img.caption}
                  </span>
                </ClipReveal>
              </button>
            </FadeIn>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-navy-deep/92 p-4 backdrop-blur-md"
            role="dialog"
            aria-modal="true"
            aria-label="Image lightbox"
            onClick={close}
          >
            <button
              type="button"
              onClick={close}
              className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-pearl/10 text-pearl"
              aria-label="Close lightbox"
            >
              <X className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              className="absolute left-4 flex h-11 w-11 items-center justify-center rounded-full bg-pearl/10 text-pearl md:left-8"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              className="absolute right-4 flex h-11 w-11 items-center justify-center rounded-full bg-pearl/10 text-pearl md:right-8"
              aria-label="Next image"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            <motion.div
              key={active}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35 }}
              className="relative aspect-[16/10] w-full max-w-5xl overflow-hidden rounded-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={images[active].src}
                alt={images[active].alt}
                fill
                sizes="90vw"
                className="object-cover"
                priority
              />
              <p className="font-ui absolute bottom-4 left-4 rounded-full bg-navy-deep/70 px-4 py-1.5 text-xs uppercase tracking-[0.14em] text-pearl backdrop-blur-sm">
                {images[active].caption}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
