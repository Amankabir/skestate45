import { fetchAmenityByIdApi, fetchAmenitiesApi } from "./api";
import { mapAmenity, mapAmenities } from "./mapper";
import type { Amenity } from "./types";

export async function getAmenities(): Promise<Amenity[]> {
  const raw = await fetchAmenitiesApi();
  return mapAmenities(raw);
}

/** Future Ready */
export async function getAmenityById(id: string): Promise<Amenity> {
  const raw = await fetchAmenityByIdApi(id);
  return mapAmenity(raw);
}
