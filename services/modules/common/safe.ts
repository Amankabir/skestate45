import { getUserFacingMessage } from "@/services/api";

/**
 * Soft-fail wrapper for list fetches used during RSC / SSG.
 * Upstream outages must not crash `next build` on Vercel.
 */
export async function safeList<T>(
  label: string,
  loader: () => Promise<T[]>,
): Promise<T[]> {
  try {
    return await loader();
  } catch (error) {
    console.error(`[${label}]`, getUserFacingMessage(error));
    return [];
  }
}
