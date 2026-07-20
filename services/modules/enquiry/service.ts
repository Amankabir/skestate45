import { z } from "zod";
import { submitEnquiryApi } from "./api";
import { mapEnquiryResponse } from "./mapper";
import type { EnquiryRequest, EnquiryResult } from "./types";

export const enquirySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name")
    .max(100, "Name is too long"),
  phone: z
    .string()
    .trim()
    .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number"),
  email: z
    .string()
    .trim()
    .email("Enter a valid email")
    .optional()
    .or(z.literal("")),
  requirement: z.string().trim().max(2000).optional().or(z.literal("")),
  propertyId: z.string().optional(),
  pageUrl: z.string().url("pageUrl is required"),
  referrer: z.string().optional(),
});

export type EnquiryFormValues = z.infer<typeof enquirySchema>;

export async function submitEnquiry(
  payload: EnquiryRequest,
): Promise<EnquiryResult> {
  const parsed = enquirySchema.parse({
    ...payload,
    email: payload.email || undefined,
    requirement: payload.requirement || undefined,
  });

  const body: EnquiryRequest = {
    name: parsed.name,
    phone: parsed.phone,
    pageUrl: parsed.pageUrl,
  };

  if (parsed.email) body.email = parsed.email;
  if (parsed.requirement) body.requirement = parsed.requirement;
  if (parsed.propertyId) body.propertyId = parsed.propertyId;
  if (parsed.referrer) body.referrer = parsed.referrer;

  const response = await submitEnquiryApi(body);
  return mapEnquiryResponse(response);
}
