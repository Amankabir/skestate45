import type { Amenity, AmenityDto } from "./types";

export function mapAmenity(dto: AmenityDto): Amenity {
  return {
    id: dto.id,
    name: dto.name,
    createdAt: dto.createdAt,
    updatedAt: dto.updatedAt,
  };
}

export function mapAmenities(dtos: AmenityDto[]): Amenity[] {
  return dtos.map(mapAmenity);
}
