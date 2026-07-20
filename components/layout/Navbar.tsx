"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Phone, X, ChevronDown } from "lucide-react";
import { NAV_ITEMS } from "@/constants/navigation";
import { SITE } from "@/constants/site";
import { useScrolled } from "@/hooks/useScrolled";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { cn } from "@/lib/utils";

export function Navbar() {
  const scrolled = useScrolled(50);
  const [open, setOpen] = useState(false);
  const [mega, setMega] = useState<string | null>(null);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled || open
          ? "bg-pearl/80 shadow-[0_10px_40px_rgba(15,39,68,0.06)] backdrop-blur-xl"
          : "bg-transparent"
      )}
    >
      <div className="container-luxury flex h-[4.5rem] items-center justify-between md:h-20">
        <Link
          href="/"
          className="group relative z-50 flex flex-col"
          aria-label={`${SITE.name} home`}
        >
          <span
            className={cn(
              "font-display text-2xl tracking-tight transition-colors md:text-[1.7rem]",
              scrolled || open ? "text-navy" : "text-pearl"
            )}
          >
            SK<span className="text-gold"> Estate</span>
          </span>
          <span
            className={cn(
              "font-ui text-[0.6rem] uppercase tracking-[0.32em] transition-colors",
              scrolled || open ? "text-navy-muted" : "text-pearl/70"
            )}
          >
            Luxury Residences
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {NAV_ITEMS.map((item) => (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => setMega(item.children ? item.label : null)}
              onMouseLeave={() => setMega(null)}
            >
              <Link
                href={item.href}
                className={cn(
                  "font-ui inline-flex items-center gap-1 px-3.5 py-2 text-[0.8rem] font-medium uppercase tracking-[0.14em] transition-colors",
                  scrolled ? "text-navy/80 hover:text-navy" : "text-pearl/85 hover:text-pearl"
                )}
              >
                {item.label}
                {item.children && <ChevronDown className="h-3.5 w-3.5 opacity-70" />}
              </Link>

              <AnimatePresence>
                {item.children && mega === item.label && (
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute left-1/2 top-full w-[28rem] -translate-x-1/2 pt-3"
                  >
                    <div className="glass overflow-hidden rounded-2xl p-3">
                      <div className="grid gap-1">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="group/item rounded-xl px-4 py-3 transition-colors hover:bg-mist/80"
                          >
                            <span className="font-ui block text-sm font-medium text-navy group-hover/item:text-gold">
                              {child.label}
                            </span>
                            {child.description && (
                              <span className="mt-0.5 block text-xs text-text-muted">
                                {child.description}
                              </span>
                            )}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={SITE.phoneHref}
            className={cn(
              "font-ui inline-flex items-center gap-2 text-sm transition-colors",
              scrolled ? "text-navy-muted hover:text-navy" : "text-pearl/80 hover:text-pearl"
            )}
          >
            <Phone className="h-4 w-4" />
            <span className="hidden xl:inline">{SITE.phone}</span>
          </a>
          <MagneticButton as="a" href="/contact" className="btn-gold rounded-full px-5 py-2.5 text-xs">
            Book a Visit
          </MagneticButton>
        </div>

        <button
          type="button"
          className={cn(
            "relative z-50 flex h-11 w-11 items-center justify-center rounded-full border lg:hidden",
            scrolled || open
              ? "border-soft-gray text-navy"
              : "border-pearl/30 text-pearl"
          )}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "circle(0% at calc(100% - 2.5rem) 2.5rem)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 2.5rem) 2.5rem)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 2.5rem) 2.5rem)" }}
            transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 bg-ivory lg:hidden"
          >
            <div className="flex h-full flex-col px-6 pb-10 pt-28">
              <nav className="flex flex-1 flex-col gap-2" aria-label="Mobile">
                {NAV_ITEMS.map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 + i * 0.06 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="font-display block border-b border-soft-gray/80 py-4 text-3xl text-navy"
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>
              <div className="space-y-3">
                <a href={SITE.phoneHref} className="font-ui block text-sm text-navy-muted">
                  {SITE.phone}
                </a>
                <Link
                  href="/contact"
                  onClick={() => setOpen(false)}
                  className="btn-primary w-full rounded-full"
                >
                  Book a Visit
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
