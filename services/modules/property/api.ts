import { apiClient } from "@/services/api";
import { ENDPOINTS } from "@/services/api/endpoints";
import type { ApiItemResponse, ApiListResponse } from "@/services/modules/common/types";
import type { PropertyDto, PropertyListFilters } from "./types";

function buildParams(
  filters?: PropertyListFilters,
): Record<string, string | number> | undefined {
  if (!filters) return undefined;

  const params: Record<string, string | number> = {};

  if (filters.status !== undefined) {
    params.status = Array.isArray(filters.status)
      ? filters.status.join(",")
      : filters.status;
  }
  if (filters.areaId) params.areaId = filters.areaId;
  if (filters.propertyTypeId) params.propertyTypeId = filters.propertyTypeId;
  if (filters.amenityIds) {
    params.amenityIds = Array.isArray(filters.amenityIds)
      ? filters.amenityIds.join(",")
      : filters.amenityIds;
  }

  const rentMin = filters.rent1Min ?? filters.budgetMin;
  const rentMax = filters.rent1Max ?? filters.budgetMax;
  if (rentMin !== undefined) params.rent1Min = rentMin;
  if (rentMax !== undefined) params.rent1Max = rentMax;

  if (filters.leaseTenureMin !== undefined) {
    params.leaseTenureMin = filters.leaseTenureMin;
  }
  if (filters.leaseTenureMax !== undefined) {
    params.leaseTenureMax = filters.leaseTenureMax;
  }
  if (filters.sqFeetMin !== undefined) params.sqFeetMin = filters.sqFeetMin;
  if (filters.sqFeetMax !== undefined) params.sqFeetMax = filters.sqFeetMax;

  return Object.keys(params).length ? params : undefined;
}

export async function fetchPropertiesApi(
  filters?: PropertyListFilters,
): Promise<PropertyDto[]> {
  const { data } = await apiClient.get<ApiListResponse<PropertyDto>>(
    ENDPOINTS.properties.list,
    { params: buildParams(filters) },
  );
  return data.data;
}

export async function fetchPropertyByIdApi(id: string): Promise<PropertyDto> {
  const { data } = await apiClient.get<ApiItemResponse<PropertyDto>>(
    ENDPOINTS.properties.byId(id),
  );
  return data.data;
}
