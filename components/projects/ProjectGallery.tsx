"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Play,
  View,
  Maximize2,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn, ClipReveal } from "@/animations/Reveal";
import type { ProjectGalleryItem } from "@/types";
import { cn } from "@/lib/utils";

interface ProjectGalleryProps {
  projectName: string;
  items: ProjectGalleryItem[];
  videoUrl: string;
}

export function ProjectGallery({
  projectName,
  items,
  videoUrl,
}: ProjectGalleryProps) {
  const [active, setActive] = useState<number | null>(null);
  const [showVideo, setShowVideo] = useState(false);

  const close = useCallback(() => {
    setActive(null);
    setShowVideo(false);
  }, []);

  const prev = useCallback(
    () =>
      setActive((i) =>
        i === null ? null : (i - 1 + items.length) % items.length
      ),
    [items.length]
  );
  const next = useCallback(
    () => setActive((i) => (i === null ? null : (i + 1) % items.length)),
    [items.length]
  );

  useEffect(() => {
    if (active === null && !showVideo) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (active !== null && e.key === "ArrowLeft") prev();
      if (active !== null && e.key === "ArrowRight") next();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [active, showVideo, close, prev, next]);

  return (
    <section
      id="gallery"
      className="section-pad bg-warm-white"
      aria-labelledby="project-gallery-heading"
    >
      <div className="container-luxury">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Gallery"
            title={`${projectName} in detail`}
            description="Residences, spaces, and the atmosphere of arrival — explore every frame."
          />
          <FadeIn delay={0.15}>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setShowVideo(true)}
                className="font-ui inline-flex items-center gap-2 rounded-full border border-navy/15 px-4 py-2.5 text-xs uppercase tracking-[0.14em] text-navy transition hover:border-gold hover:text-gold"
              >
                <Play className="h-3.5 w-3.5" /> Video Tour
              </button>
              <button
                type="button"
                onClick={() =>
                  setActive(items.findIndex((i) => i.type === "360") || 0)
                }
                className="font-ui inline-flex items-center gap-2 rounded-full border border-navy/15 px-4 py-2.5 text-xs uppercase tracking-[0.14em] text-navy transition hover:border-gold hover:text-gold"
              >
                <View className="h-3.5 w-3.5" /> 360° View
              </button>
            </div>
          </FadeIn>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {items.slice(0, 8).map((item, i) => (
            <FadeIn
              key={item.id}
              delay={i * 0.05}
              className={cn(i === 0 && "col-span-2 row-span-2")}
            >
              <button
                type="button"
                onClick={() =>
                  item.type === "video" ? setShowVideo(true) : setActive(i)
                }
                className="group relative block w-full overflow-hidden rounded-2xl text-left"
                aria-label={`View ${item.caption}`}
              >
                <ClipReveal
                  className={cn(
                    "relative",
                    i === 0
                      ? "aspect-[16/11] md:aspect-auto md:h-full md:min-h-[420px]"
                      : "aspect-[4/3]"
                  )}
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes={
                      i === 0
                        ? "(max-width: 768px) 100vw, 50vw"
                        : "(max-width: 768px) 50vw, 25vw"
                    }
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-navy-deep/0 transition group-hover:bg-navy-deep/30" />
                  {(item.type === "video" || item.type === "360") && (
                    <span className="absolute left-3 top-3 rounded-full bg-navy/80 px-2.5 py-1 font-ui text-[0.6rem] uppercase tracking-[0.14em] text-pearl">
                      {item.type === "video" ? "Video" : "360°"}
                    </span>
                  )}
                  <span className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-pearl/90 text-navy opacity-0 transition group-hover:opacity-100">
                    <Maximize2 className="h-4 w-4" />
                  </span>
                </ClipReveal>
              </button>
            </FadeIn>
          ))}
        </div>

        <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
          {items.map((item, i) => (
            <button
              key={`thumb-${item.id}`}
              type="button"
              onClick={() => setActive(i)}
              className="relative h-16 w-24 shrink-0 overflow-hidden rounded-lg border-2 border-transparent transition hover:border-gold"
              aria-label={`Thumbnail ${item.caption}`}
            >
              <Image
                src={item.src}
                alt=""
                fill
                sizes="96px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-navy-deep/94 p-4 backdrop-blur-md"
            role="dialog"
            aria-modal="true"
            aria-label="Gallery lightbox"
            onClick={close}
          >
            <button
              type="button"
              onClick={close}
              className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-pearl/10 text-pearl"
              aria-label="Close"
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
              aria-label="Previous"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-pearl/10 text-pearl md:right-8"
              aria-label="Next"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
            <motion.div
              key={active}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative aspect-[16/10] w-full max-w-5xl overflow-hidden rounded-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={items[active].src}
                alt={items[active].alt}
                fill
                sizes="90vw"
                className="object-cover"
                priority
              />
              <p className="font-ui absolute bottom-4 left-4 rounded-full bg-navy-deep/70 px-4 py-1.5 text-xs uppercase tracking-[0.14em] text-pearl">
                {items[active].caption}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-navy-deep/94 p-4"
            role="dialog"
            aria-modal="true"
            aria-label="Video tour"
          >
            <button
              type="button"
              onClick={close}
              className="absolute right-6 top-6 flex h-11 w-11 items-center justify-center rounded-full bg-pearl/10 text-pearl"
              aria-label="Close video"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="aspect-video w-full max-w-5xl overflow-hidden rounded-2xl">
              <iframe
                title={`${projectName} video tour`}
                src={videoUrl}
                className="h-full w-full"
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
