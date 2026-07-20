import type { HealthStatus } from "./types";

export function mapHealth(raw: HealthStatus): HealthStatus {
  return {
    status: raw.status,
    timestamp: raw.timestamp,
  };
}
