export interface EnquiryRequest {
  name: string;
  phone: string;
  pageUrl: string;
  email?: string;
  requirement?: string;
  propertyId?: string;
  referrer?: string;
}

export interface EnquiryDto {
  id: string;
}

export interface EnquiryResult {
  id: string;
  message: string;
}
