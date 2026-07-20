import { apiClient } from "@/services/api";
import { ENDPOINTS } from "@/services/api/endpoints";
import type { ApiItemResponse, ApiListResponse } from "@/services/modules/common/types";
import type { AmenityDto } from "./types";

export async function fetchAmenitiesApi(): Promise<AmenityDto[]> {
  const { data } = await apiClient.get<ApiListResponse<AmenityDto>>(
    ENDPOINTS.amenities.list,
  );
  return data.data;
}

/** Future Ready — amenity detail pages / deep links */
export async function fetchAmenityByIdApi(id: string): Promise<AmenityDto> {
  const { data } = await apiClient.get<ApiItemResponse<AmenityDto>>(
    ENDPOINTS.amenities.byId(id),
  );
  return data.data;
}
