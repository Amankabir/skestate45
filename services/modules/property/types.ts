export type PropertyStatus =
  | "available"
  | "leased out by others"
  | "leased out by us"
  | "not contactable"
  | "not interested"
  | string;

export interface PropertyRefDto {
  id: string;
  name: string;
}

export interface PropertyAmenityDto {
  id: string;
  name: string;
  value: string | number | null;
}

export interface PropertyDto {
  id: string;
  name: string;
  area: PropertyRefDto;
  propertyType: PropertyRefDto;
  amenities: PropertyAmenityDto[];
  description: string;
  photos: string[];
  address: string;
  rent1?: number;
  sqFeet?: number;
  leaseTenure?: number;
  securityDepositAmount?: number;
  termsConditions?: string;
  status: PropertyStatus;
  createdAt: string;
  updatedAt: string;
}

export interface PropertyAmenity {
  id: string;
  name: string;
  value: string | number | null;
}

export interface Property {
  id: string;
  name: string;
  areaId: string;
  areaName: string;
  propertyTypeId: string;
  propertyTypeName: string;
  amenities: PropertyAmenity[];
  description: string;
  photos: string[];
  primaryPhoto: string | null;
  address: string;
  rent: number | null;
  sqFeet: number | null;
  leaseTenureMonths: number | null;
  securityDeposit: number | null;
  termsConditions: string | null;
  status: PropertyStatus;
  isAvailable: boolean;
  href: string;
  createdAt: string;
  updatedAt: string;
}

export interface PropertyListFilters {
  status?: string | string[];
  areaId?: string;
  propertyTypeId?: string;
  amenityIds?: string | string[];
  rent1Min?: number;
  rent1Max?: number;
  /** Alias accepted by API */
  budgetMin?: number;
  budgetMax?: number;
  leaseTenureMin?: number;
  leaseTenureMax?: number;
  sqFeetMin?: number;
  sqFeetMax?: number;
}

export type PropertySortKey =
  | "name-asc"
  | "name-desc"
  | "rent-asc"
  | "rent-desc"
  | "sqft-asc"
  | "sqft-desc"
  | "newest";

export interface PropertySearchParams extends PropertyListFilters {
  q?: string;
  sort?: PropertySortKey;
  page?: number;
  pageSize?: number;
}
