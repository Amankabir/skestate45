"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Calendar, Phone, MessageCircle } from "lucide-react";
import { SITE } from "@/constants/site";

interface Props {
  title: string;
  slug: string;
  priceLabel: string;
}

export function PropertyDetailStickyCTA({ title, slug, priceLabel }: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed inset-x-0 bottom-0 z-50 border-t border-navy/10 bg-pearl/95 px-3 py-3 shadow-[0_-12px_40px_rgba(15,39,68,0.12)] backdrop-blur-xl md:px-6"
          role="region"
          aria-label="Quick actions"
        >
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-3">
            <div className="hidden min-w-0 sm:block">
              <p className="font-display truncate text-base text-navy">{title}</p>
              <p className="font-ui text-[0.65rem] uppercase tracking-[0.14em] text-text-muted">
                {priceLabel}
              </p>
            </div>
            <div className="flex w-full flex-wrap items-center justify-end gap-2 sm:w-auto">
              <a
                href={`/contact?property=${slug}&intent=visit`}
                className="btn-gold inline-flex flex-1 items-center justify-center gap-1.5 rounded-full px-4 py-2.5 text-[0.7rem] sm:flex-none"
              >
                <Calendar className="h-3.5 w-3.5" />
                Site Visit
              </a>
              <a
                href={SITE.phoneHref}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-navy/15 text-navy"
                aria-label="Call"
              >
                <Phone className="h-4 w-4" />
              </a>
              <a
                href={SITE.whatsapp}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-navy/15 text-navy"
                aria-label="WhatsApp"
              >
                <MessageCircle className="h-4 w-4" />
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
