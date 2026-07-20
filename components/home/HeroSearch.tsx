"use client";

import { FormEvent, useState } from "react";
import { MapPin, Search, Home, IndianRupee } from "lucide-react";
import { motion } from "framer-motion";

const TYPES = ["Any Type", "Villa", "Penthouse", "Apartment", "Plot"];
const BUDGETS = ["Any Budget", "₹2–5 Cr", "₹5–10 Cr", "₹10–25 Cr", "₹25 Cr+"];

export function HeroSearch() {
  const [location, setLocation] = useState("");
  const [type, setType] = useState(TYPES[0]);
  const [budget, setBudget] = useState(BUDGETS[0]);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (location) params.set("q", location);
    if (type !== TYPES[0]) params.set("type", type.toLowerCase());
    if (budget !== BUDGETS[0]) params.set("budget", budget);
    window.location.href = `/properties?${params.toString()}`;
  };

  return (
    <motion.form
      onSubmit={onSubmit}
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="glass w-full max-w-4xl rounded-2xl p-2 shadow-[0_24px_80px_rgba(10,26,47,0.35)] md:rounded-full md:p-2"
      role="search"
      aria-label="Search luxury properties"
    >
      <div className="grid gap-2 md:grid-cols-[1.4fr_1fr_1fr_auto]">
        <label className="flex items-center gap-3 rounded-xl bg-pearl/50 px-4 py-3 md:rounded-full">
          <MapPin className="h-4 w-4 shrink-0 text-gold" aria-hidden />
          <span className="sr-only">Location</span>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="City, locality or project"
            className="font-ui w-full bg-transparent text-sm text-navy outline-none placeholder:text-text-muted"
          />
        </label>

        <label className="flex items-center gap-3 rounded-xl bg-pearl/50 px-4 py-3 md:rounded-full">
          <Home className="h-4 w-4 shrink-0 text-gold" aria-hidden />
          <span className="sr-only">Property type</span>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="font-ui w-full appearance-none bg-transparent text-sm text-navy outline-none"
          >
            {TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </label>

        <label className="flex items-center gap-3 rounded-xl bg-pearl/50 px-4 py-3 md:rounded-full">
          <IndianRupee className="h-4 w-4 shrink-0 text-gold" aria-hidden />
          <span className="sr-only">Budget</span>
          <select
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            className="font-ui w-full appearance-none bg-transparent text-sm text-navy outline-none"
          >
            {BUDGETS.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </label>

        <button
          type="submit"
          className="btn-primary inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 md:rounded-full"
        >
          <Search className="h-4 w-4" />
          <span>Search</span>
        </button>
      </div>
    </motion.form>
  );
}
