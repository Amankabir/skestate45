import type {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { IS_DEV } from "./endpoints";
import { ApiError, toApiError } from "./errors";

/** Reserved for future refresh-token flow */
export type TokenProvider = () => string | null | Promise<string | null>;

let accessTokenProvider: TokenProvider | null = null;

export function setAccessTokenProvider(provider: TokenProvider | null): void {
  accessTokenProvider = provider;
}

export type UnauthorizedHandler = () => void | Promise<void>;

let onUnauthorized: UnauthorizedHandler | null = null;

export function setUnauthorizedHandler(handler: UnauthorizedHandler | null): void {
  onUnauthorized = handler;
}

function logDev(direction: "→" | "←" | "✖", payload: unknown): void {
  if (!IS_DEV) return;
  console.debug(`[api ${direction}]`, payload);
}

export function attachRequestInterceptor(client: AxiosInstance): void {
  client.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
      config.headers.set("Accept", "application/json");

      if (accessTokenProvider) {
        const token = await accessTokenProvider();
        if (token) {
          config.headers.set("Authorization", `Bearer ${token}`);
        }
      }

      logDev("→", {
        method: config.method,
        url: config.url,
        params: config.params,
      });

      return config;
    },
    (error: AxiosError) => Promise.reject(toApiError(error)),
  );
}

export function attachResponseInterceptor(client: AxiosInstance): void {
  client.interceptors.response.use(
    (response: AxiosResponse) => {
      logDev("←", {
        status: response.status,
        url: response.config.url,
      });
      return response;
    },
    async (error: AxiosError) => {
      const apiError = toApiError(error);
      logDev("✖", {
        status: apiError.status,
        code: apiError.code,
        message: apiError.message,
        url: error.config?.url,
      });

      if (apiError.status === 401 && onUnauthorized) {
        await onUnauthorized();
      }

      if (apiError.status === 403) {
        // Central hook point for forbidden UX (toast / redirect)
      }

      if (apiError.status && apiError.status >= 500) {
        // Central hook point for server-error telemetry
      }

      return Promise.reject(apiError);
    },
  );
}

export function isApiError(error: unknown): error is ApiError {
  return error instanceof ApiError;
}
