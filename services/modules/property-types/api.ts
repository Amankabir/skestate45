import { apiClient } from "@/services/api";
import { ENDPOINTS } from "@/services/api/endpoints";
import type { ApiItemResponse, ApiListResponse } from "@/services/modules/common/types";
import type { PropertyTypeDto } from "./types";

export async function fetchPropertyTypesApi(): Promise<PropertyTypeDto[]> {
  const { data } = await apiClient.get<ApiListResponse<PropertyTypeDto>>(
    ENDPOINTS.propertyTypes.list,
  );
  return data.data;
}

/** Future Ready — property type landing pages */
export async function fetchPropertyTypeByIdApi(
  id: string,
): Promise<PropertyTypeDto> {
  const { data } = await apiClient.get<ApiItemResponse<PropertyTypeDto>>(
    ENDPOINTS.propertyTypes.byId(id),
  );
  return data.data;
}
