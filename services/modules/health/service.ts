import { getHealth } from "./api";
import { mapHealth } from "./mapper";
import type { HealthStatus } from "./types";

export async function fetchHealthStatus(): Promise<HealthStatus> {
  const raw = await getHealth();
  return mapHealth(raw);
}
