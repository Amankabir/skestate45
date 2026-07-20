import { fetchPropertyTypeByIdApi, fetchPropertyTypesApi } from "./api";
import { mapPropertyType, mapPropertyTypes } from "./mapper";
import type { PropertyTypeEntity } from "./types";

export async function getPropertyTypes(): Promise<PropertyTypeEntity[]> {
  const raw = await fetchPropertyTypesApi();
  return mapPropertyTypes(raw);
}

/** Future Ready */
export async function getPropertyTypeById(
  id: string,
): Promise<PropertyTypeEntity> {
  const raw = await fetchPropertyTypeByIdApi(id);
  return mapPropertyType(raw);
}
