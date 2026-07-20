export type HttpStatusCode =
  | 400
  | 401
  | 403
  | 404
  | 422
  | 429
  | 500
  | 502
  | 503
  | 504;

export type ApiErrorCode =
  | "BAD_REQUEST"
  | "UNAUTHORIZED"
  | "FORBIDDEN"
  | "NOT_FOUND"
  | "VALIDATION_ERROR"
  | "RATE_LIMITED"
  | "SERVER_ERROR"
  | "TIMEOUT"
  | "NETWORK"
  | "OFFLINE"
  | "UNKNOWN";

export interface ApiErrorBody {
  message?: string;
  error?: string;
  errors?: Record<string, string[] | string>;
  statusCode?: number;
}

export class ApiError extends Error {
  readonly code: ApiErrorCode;
  readonly status?: number;
  readonly details?: ApiErrorBody;
  readonly isApiError = true as const;

  constructor(
    message: string,
    code: ApiErrorCode,
    status?: number,
    details?: ApiErrorBody,
  ) {
    super(message);
    this.name = "ApiError";
    this.code = code;
    this.status = status;
    this.details = details;
  }
}

export function mapStatusToCode(status?: number): ApiErrorCode {
  switch (status) {
    case 400:
      return "BAD_REQUEST";
    case 401:
      return "UNAUTHORIZED";
    case 403:
      return "FORBIDDEN";
    case 404:
      return "NOT_FOUND";
    case 422:
      return "VALIDATION_ERROR";
    case 429:
      return "RATE_LIMITED";
    case 500:
    case 502:
    case 503:
    case 504:
      return "SERVER_ERROR";
    default:
      return "UNKNOWN";
  }
}

const USER_MESSAGES: Record<ApiErrorCode, string> = {
  BAD_REQUEST: "The request could not be processed. Please check your input.",
  UNAUTHORIZED: "You need to sign in to continue.",
  FORBIDDEN: "You do not have permission to perform this action.",
  NOT_FOUND: "We could not find what you were looking for.",
  VALIDATION_ERROR: "Please correct the highlighted fields and try again.",
  RATE_LIMITED: "Too many requests. Please wait a moment and try again.",
  SERVER_ERROR: "Something went wrong on our side. Please try again shortly.",
  TIMEOUT: "The request timed out. Please check your connection and retry.",
  NETWORK: "Unable to reach the server. Please check your internet connection.",
  OFFLINE: "You appear to be offline. Reconnect and try again.",
  UNKNOWN: "An unexpected error occurred. Please try again.",
};

export function getUserFacingMessage(error: unknown): string {
  if (error instanceof ApiError) {
    if (error.details?.message && error.code !== "SERVER_ERROR") {
      return error.details.message;
    }
    return USER_MESSAGES[error.code];
  }
  if (error instanceof Error && error.message) {
    return error.message;
  }
  return USER_MESSAGES.UNKNOWN;
}

export function toApiError(error: unknown): ApiError {
  if (error instanceof ApiError) return error;
  if (typeof error === "object" && error !== null && "isAxiosError" in error) {
    const ax = error as {
      code?: string;
      message?: string;
      response?: { status?: number; data?: ApiErrorBody };
      request?: unknown;
    };

    if (ax.code === "ECONNABORTED") {
      return new ApiError(USER_MESSAGES.TIMEOUT, "TIMEOUT");
    }

    // Only trust navigator in the browser. In Node (SSR / `next build`),
    // `navigator` exists but `onLine` is `undefined`, and `!undefined` is true —
    // which incorrectly labels every network failure as OFFLINE.
    if (
      typeof window !== "undefined" &&
      typeof navigator !== "undefined" &&
      navigator.onLine === false
    ) {
      return new ApiError(USER_MESSAGES.OFFLINE, "OFFLINE");
    }

    if (!ax.response) {
      return new ApiError(USER_MESSAGES.NETWORK, "NETWORK");
    }

    const status = ax.response.status;
    const code = mapStatusToCode(status);
    const body = ax.response.data;
    const message =
      body?.message || body?.error || USER_MESSAGES[code] || USER_MESSAGES.UNKNOWN;

    return new ApiError(message, code, status, body);
  }

  return new ApiError(USER_MESSAGES.UNKNOWN, "UNKNOWN");
}
