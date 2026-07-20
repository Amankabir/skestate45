import type { PropertyTypeDto, PropertyTypeEntity } from "./types";

export function mapPropertyType(dto: PropertyTypeDto): PropertyTypeEntity {
  return {
    id: dto.id,
    name: dto.name,
    createdAt: dto.createdAt,
    updatedAt: dto.updatedAt,
  };
}

export function mapPropertyTypes(
  dtos: PropertyTypeDto[],
): PropertyTypeEntity[] {
  return dtos.map(mapPropertyType);
}
