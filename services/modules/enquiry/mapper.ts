import type { EnquiryDto, EnquiryResult } from "./types";
import type { ApiMessageResponse } from "@/services/modules/common/types";

export function mapEnquiryResponse(
  response: ApiMessageResponse<EnquiryDto>,
): EnquiryResult {
  return {
    id: response.data.id,
    message: response.message,
  };
}
