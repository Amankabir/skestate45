"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Loader2, X } from "lucide-react";
import { getUserFacingMessage } from "@/services/api";
import { submitEnquiry } from "@/services/modules/enquiry";
import { SITE_URL } from "@/services/api/endpoints";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100),
  phone: z
    .string()
    .trim()
    .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number"),
  email: z
    .string()
    .trim()
    .email("Enter a valid email")
    .optional()
    .or(z.literal("")),
  requirement: z.string().trim().max(2000).optional().or(z.literal("")),
});

type FormValues = z.infer<typeof formSchema>;

interface EnquiryFormProps {
  propertyId?: string;
  pageUrl?: string;
  className?: string;
  title?: string;
  subtitle?: string;
}

export function EnquiryForm({
  propertyId,
  pageUrl,
  className,
  title = "Enquire now",
  subtitle = "Share your requirement and our team will respond shortly.",
}: EnquiryFormProps) {
  const [serverError, setServerError] = useState<string | null>(null);
  const [showThanks, setShowThanks] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      requirement: "",
    },
  });

  useEffect(() => {
    if (!showThanks) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowThanks(false);
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [showThanks]);

  const onSubmit = handleSubmit(async (values) => {
    setServerError(null);
    try {
      const resolvedUrl =
        pageUrl ||
        (typeof window !== "undefined" ? window.location.href : SITE_URL);
      const referrer =
        typeof document !== "undefined"
          ? document.referrer || undefined
          : undefined;

      await submitEnquiry({
        name: values.name,
        phone: values.phone,
        email: values.email || undefined,
        requirement: values.requirement || undefined,
        propertyId,
        pageUrl: resolvedUrl,
        referrer,
      });

      reset();
      setShowThanks(true);
    } catch (error) {
      setServerError(getUserFacingMessage(error));
    }
  });

  return (
    <>
      <div
        className={cn(
          "rounded-2xl border border-soft-gray bg-pearl p-6 shadow-[var(--shadow-soft)] md:p-8",
          className,
        )}
      >
        <h3 className="font-display text-2xl text-navy">{title}</h3>
        <p className="mt-2 text-sm text-text-muted">{subtitle}</p>

        <form onSubmit={onSubmit} className="mt-6 space-y-4" noValidate>
          <Field label="Full name" error={errors.name?.message}>
            <input
              {...register("name")}
              autoComplete="name"
              className="field-input"
              placeholder="Your name"
            />
          </Field>

          <Field label="Mobile" error={errors.phone?.message}>
            <input
              {...register("phone")}
              inputMode="numeric"
              autoComplete="tel"
              className="field-input"
              placeholder="10-digit mobile"
            />
          </Field>

          <Field label="Email (optional)" error={errors.email?.message}>
            <input
              {...register("email")}
              type="email"
              autoComplete="email"
              className="field-input"
              placeholder="you@company.com"
            />
          </Field>

          <Field
            label="Requirement (optional)"
            error={errors.requirement?.message}
          >
            <textarea
              {...register("requirement")}
              rows={4}
              className="field-input resize-y"
              placeholder="Budget, preferred area, move-in timeline…"
            />
          </Field>

          {serverError ? (
            <p className="text-sm text-red-600" role="alert">
              {serverError}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={isSubmitting}
            className="font-ui inline-flex w-full items-center justify-center gap-2 rounded-full bg-navy px-6 py-3 text-xs uppercase tracking-[0.16em] text-pearl transition hover:bg-navy-deep disabled:opacity-60"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Sending…
              </>
            ) : (
              "Submit enquiry"
            )}
          </button>
        </form>
      </div>

      <AnimatePresence>
        {showThanks ? (
          <motion.div
            className="fixed inset-0 z-[90] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="enquiry-thanks-title"
          >
            <button
              type="button"
              className="absolute inset-0 bg-navy-deep/55 backdrop-blur-sm"
              aria-label="Close thank you dialog"
              onClick={() => setShowThanks(false)}
            />

            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-md rounded-3xl border border-soft-gray bg-pearl p-7 text-center shadow-[var(--shadow-lift)] md:p-9"
            >
              <button
                type="button"
                onClick={() => setShowThanks(false)}
                className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-soft-gray text-navy-muted transition hover:border-gold hover:text-gold"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>

              <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald/15 text-emerald">
                <CheckCircle2 className="h-8 w-8" strokeWidth={1.5} />
              </span>

              <h2
                id="enquiry-thanks-title"
                className="font-display mt-5 text-2xl text-navy md:text-3xl"
              >
                Thank you!
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-text-muted md:text-base">
                Your enquiry has been submitted successfully. Our team will
                contact you shortly.
              </p>

              <button
                type="button"
                onClick={() => setShowThanks(false)}
                className="font-ui mt-7 inline-flex w-full items-center justify-center rounded-full bg-navy px-6 py-3 text-xs uppercase tracking-[0.14em] text-pearl transition hover:bg-navy-deep"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="font-ui mb-1.5 block text-[0.65rem] uppercase tracking-[0.16em] text-navy-muted">
        {label}
      </span>
      {children}
      {error ? (
        <span className="mt-1 block text-xs text-red-600">{error}</span>
      ) : null}
    </label>
  );
}
