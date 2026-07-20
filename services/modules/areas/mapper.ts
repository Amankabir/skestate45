import type { Area, AreaDto } from "./types";

export function mapArea(dto: AreaDto): Area {
  return {
    id: dto.id,
    name: dto.name,
    createdAt: dto.createdAt,
    updatedAt: dto.updatedAt,
  };
}

export function mapAreas(dtos: AreaDto[]): Area[] {
  return dtos.map(mapArea);
}
