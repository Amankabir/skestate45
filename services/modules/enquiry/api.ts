import { apiClient } from "@/services/api";
import { ENDPOINTS } from "@/services/api/endpoints";
import type { ApiMessageResponse } from "@/services/modules/common/types";
import type { EnquiryDto, EnquiryRequest } from "./types";

export async function submitEnquiryApi(
  payload: EnquiryRequest,
): Promise<ApiMessageResponse<EnquiryDto>> {
  const { data } = await apiClient.post<ApiMessageResponse<EnquiryDto>>(
    ENDPOINTS.enquiries.create,
    payload,
  );
  return data;
}
