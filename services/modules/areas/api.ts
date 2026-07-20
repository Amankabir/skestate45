import { apiClient } from "@/services/api";
import { ENDPOINTS } from "@/services/api/endpoints";
import type { ApiItemResponse, ApiListResponse } from "@/services/modules/common/types";
import type { AreaDto } from "./types";

export async function fetchAreasApi(): Promise<AreaDto[]> {
  const { data } = await apiClient.get<ApiListResponse<AreaDto>>(
    ENDPOINTS.areas.list,
  );
  return data.data;
}

export async function fetchAreaByIdApi(id: string): Promise<AreaDto> {
  const { data } = await apiClient.get<ApiItemResponse<AreaDto>>(
    ENDPOINTS.areas.byId(id),
  );
  return data.data;
}
