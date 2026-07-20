import { formatPrice } from "@/lib/utils";

export function formatRent(rent: number | null | undefined): string {
  if (rent == null) return "Price on request";
  return `${formatPrice(rent)}/mo`;
}

export function formatSqFeet(sqFeet: number | null | undefined): string {
  if (sqFeet == null) return "—";
  return `${sqFeet.toLocaleString("en-IN")} sq.ft`;
}

export function formatStatus(status: string): string {
  if (!status) return "";
  return status.charAt(0).toUpperCase() + status.slice(1);
}

export const PROPERTY_PLACEHOLDER = "/property-placeholder.svg";
