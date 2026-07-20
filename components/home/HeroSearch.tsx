"use client";

import { FormEvent, useMemo, useState } from "react";
import { MapPin, Search, Building2, IndianRupee } from "lucide-react";
import { motion } from "framer-motion";
import type { Area } from "@/services/modules/areas";
import type { PropertyTypeEntity } from "@/services/modules/property-types";

const BUDGETS: { label: string; min?: number; max?: number }[] = [
  { label: "Any budget" },
  { label: "Under ₹50k", max: 50_000 },
  { label: "₹50k–₹1L", min: 50_000, max: 100_000 },
  { label: "₹1L–₹2L", min: 100_000, max: 200_000 },
  { label: "₹2L–₹5L", min: 200_000, max: 500_000 },
  { label: "₹5L+", min: 500_000 },
];

interface HeroSearchProps {
  areas: Area[];
  propertyTypes: PropertyTypeEntity[];
}

export function HeroSearch({ areas, propertyTypes }: HeroSearchProps) {
  const [areaId, setAreaId] = useState("");
  const [typeId, setTypeId] = useState("");
  const [budgetLabel, setBudgetLabel] = useState(BUDGETS[0]!.label);

  const budget = useMemo(
    () => BUDGETS.find((b) => b.label === budgetLabel) ?? BUDGETS[0]!,
    [budgetLabel],
  );

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (areaId) params.set("areaId", areaId);
    if (typeId) params.set("propertyTypeId", typeId);
    if (budget.min != null) params.set("rent1Min", String(budget.min));
    if (budget.max != null) params.set("rent1Max", String(budget.max));
    window.location.href = `/properties?${params.toString()}`;
  };

  return (
    <motion.form
      onSubmit={onSubmit}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.45, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="w-full overflow-hidden rounded-2xl border border-pearl/20 bg-pearl/95 p-2 shadow-[0_28px_80px_rgba(10,26,47,0.4)] backdrop-blur-md md:rounded-[1.75rem] md:p-2.5"
      role="search"
      aria-label="Search commercial properties"
    >
      <div className="grid gap-2 md:grid-cols-[1.35fr_1.1fr_1fr_auto]">
        <label className="group flex flex-col gap-1 rounded-xl bg-warm-white px-4 py-3 transition hover:bg-mist md:rounded-2xl">
          <span className="font-ui flex items-center gap-1.5 text-[0.62rem] uppercase tracking-[0.16em] text-navy-muted">
            <MapPin className="h-3.5 w-3.5 text-gold" aria-hidden />
            Area
          </span>
          <select
            value={areaId}
            onChange={(e) => setAreaId(e.target.value)}
            className="font-ui w-full appearance-none bg-transparent text-sm font-medium text-navy outline-none"
          >
            <option value="">All Delhi NCR areas</option>
            {areas.map((a) => (
              <option key={a.id} value={a.id}>
                {a.name}
              </option>
            ))}
          </select>
        </label>

        <label className="group flex flex-col gap-1 rounded-xl bg-warm-white px-4 py-3 transition hover:bg-mist md:rounded-2xl">
          <span className="font-ui flex items-center gap-1.5 text-[0.62rem] uppercase tracking-[0.16em] text-navy-muted">
            <Building2 className="h-3.5 w-3.5 text-gold" aria-hidden />
            Type
          </span>
          <select
            value={typeId}
            onChange={(e) => setTypeId(e.target.value)}
            className="font-ui w-full appearance-none bg-transparent text-sm font-medium text-navy outline-none"
          >
            <option value="">Any property type</option>
            {propertyTypes.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>
        </label>

        <label className="group flex flex-col gap-1 rounded-xl bg-warm-white px-4 py-3 transition hover:bg-mist md:rounded-2xl">
          <span className="font-ui flex items-center gap-1.5 text-[0.62rem] uppercase tracking-[0.16em] text-navy-muted">
            <IndianRupee className="h-3.5 w-3.5 text-gold" aria-hidden />
            Budget
          </span>
          <select
            value={budgetLabel}
            onChange={(e) => setBudgetLabel(e.target.value)}
            className="font-ui w-full appearance-none bg-transparent text-sm font-medium text-navy outline-none"
          >
            {BUDGETS.map((b) => (
              <option key={b.label} value={b.label}>
                {b.label}
              </option>
            ))}
          </select>
        </label>

        <button
          type="submit"
          className="btn-primary inline-flex items-center justify-center gap-2 rounded-xl px-7 py-4 text-sm md:rounded-2xl md:min-w-[7.5rem]"
        >
          <Search className="h-4 w-4" />
          <span>Search</span>
        </button>
      </div>
    </motion.form>
  );
}
