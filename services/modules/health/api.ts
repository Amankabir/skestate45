import { apiClient } from "@/services/api";
import { ENDPOINTS } from "@/services/api/endpoints";

export interface HealthStatus {
  status: string;
  timestamp: string;
}

/** Future Ready — uptime / status badge */
export async function getHealth(): Promise<HealthStatus> {
  const { data } = await apiClient.get<HealthStatus>(ENDPOINTS.health);
  return data;
}
