import { cn } from "@/lib/utils";
import { formatRent } from "@/lib/format";

interface PriceBadgeProps {
  rent: number | null | undefined;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function PriceBadge({ rent, className, size = "md" }: PriceBadgeProps) {
  return (
    <span
      className={cn(
        "font-display text-navy",
        size === "sm" && "text-base",
        size === "md" && "text-lg md:text-xl",
        size === "lg" && "text-2xl md:text-3xl",
        className,
      )}
    >
      {formatRent(rent)}
    </span>
  );
}
