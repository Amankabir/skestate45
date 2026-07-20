import type { Property, PropertyDto } from "./types";

const AVAILABLE = "available";

export function mapProperty(dto: PropertyDto): Property {
  const photos = Array.isArray(dto.photos) ? dto.photos.filter(Boolean) : [];

  return {
    id: dto.id,
    name: dto.name,
    areaId: dto.area?.id ?? "",
    areaName: dto.area?.name ?? "",
    propertyTypeId: dto.propertyType?.id ?? "",
    propertyTypeName: dto.propertyType?.name ?? "",
    amenities: (dto.amenities ?? []).map((a) => ({
      id: a.id,
      name: a.name,
      value: a.value ?? null,
    })),
    description: dto.description ?? "",
    photos,
    primaryPhoto: photos[0] ?? null,
    address: dto.address ?? "",
    rent: typeof dto.rent1 === "number" ? dto.rent1 : null,
    sqFeet: typeof dto.sqFeet === "number" ? dto.sqFeet : null,
    leaseTenureMonths:
      typeof dto.leaseTenure === "number" ? dto.leaseTenure : null,
    securityDeposit:
      typeof dto.securityDepositAmount === "number"
        ? dto.securityDepositAmount
        : null,
    termsConditions: dto.termsConditions ?? null,
    status: dto.status,
    isAvailable: dto.status === AVAILABLE,
    href: `/properties/${dto.id}`,
    createdAt: dto.createdAt,
    updatedAt: dto.updatedAt,
  };
}

export function mapProperties(dtos: PropertyDto[]): Property[] {
  return dtos.map(mapProperty);
}
