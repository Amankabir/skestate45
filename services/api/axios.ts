import http from "node:http";
import https from "node:https";
import axios, { type AxiosInstance, type CreateAxiosDefaults } from "axios";
import axiosRetry from "axios-retry";
import { API_BASE_URL, API_TIMEOUT_MS } from "./endpoints";
import {
  attachRequestInterceptor,
  attachResponseInterceptor,
} from "./interceptors";

const isServer = typeof window === "undefined";

/** Prefer IPv4 on the server — some hosts have broken/unreachable AAAA paths from Vercel. */
const serverAgents = isServer
  ? {
      httpAgent: new http.Agent({ family: 4, keepAlive: true }),
      httpsAgent: new https.Agent({ family: 4, keepAlive: true }),
    }
  : {};

function createBaseConfig(): CreateAxiosDefaults {
  return {
    baseURL: API_BASE_URL,
    timeout: API_TIMEOUT_MS,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    ...serverAgents,
  };
}

function applyRetry(client: AxiosInstance): void {
  axiosRetry(client, {
    retries: 2,
    retryDelay: axiosRetry.exponentialDelay,
    retryCondition: (error) => {
      const status = error.response?.status;
      if (status === 429 || (status !== undefined && status >= 500)) {
        return true;
      }
      return axiosRetry.isNetworkOrIdempotentRequestError(error);
    },
  });
}

function createClient(): AxiosInstance {
  const client = axios.create(createBaseConfig());
  attachRequestInterceptor(client);
  attachResponseInterceptor(client);
  applyRetry(client);
  return client;
}

/** Shared axios instance for browser + Node (RSC / route handlers) */
export const apiClient: AxiosInstance = createClient();

export function createApiClient(
  overrides?: CreateAxiosDefaults,
): AxiosInstance {
  const client = axios.create({
    ...createBaseConfig(),
    ...overrides,
    headers: {
      ...createBaseConfig().headers,
      ...overrides?.headers,
    },
  });
  attachRequestInterceptor(client);
  attachResponseInterceptor(client);
  applyRetry(client);
  return client;
}

export default apiClient;
