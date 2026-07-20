"use client";

import { useCallback, useEffect, useState, useTransition } from "react";
import { getUserFacingMessage } from "@/services/api";
import { getAreas, type Area } from "@/services/modules/areas";
import { getAmenities, type Amenity } from "@/services/modules/amenities";
import {
  getPropertyTypes,
  type PropertyTypeEntity,
} from "@/services/modules/property-types";
import {
  getPropertyById,
  searchProperties,
  type Property,
  type PropertySearchParams,
} from "@/services/modules/property";
import type { PaginatedResult } from "@/services/modules/common/types";
import { submitEnquiry, type EnquiryRequest } from "@/services/modules/enquiry";

interface AsyncState<T> {
  data: T | null;
  error: string | null;
  loading: boolean;
  reload: () => void;
}

function useAsyncResource<T>(
  loader: () => Promise<T>,
  deps: unknown[] = [],
): AsyncState<T> {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    loader()
      .then((result) => {
        if (!cancelled) setData(result);
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setData(null);
          setError(getUserFacingMessage(err));
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tick, ...deps]);

  const reload = useCallback(() => setTick((t) => t + 1), []);

  return { data, error, loading, reload };
}

export function useAreas(): AsyncState<Area[]> {
  return useAsyncResource(getAreas, []);
}

export function useAmenities(): AsyncState<Amenity[]> {
  return useAsyncResource(getAmenities, []);
}

export function usePropertyTypes(): AsyncState<PropertyTypeEntity[]> {
  return useAsyncResource(getPropertyTypes, []);
}

export function useProperty(id: string | undefined): AsyncState<Property> {
  return useAsyncResource(() => {
    if (!id) return Promise.reject(new Error("Property id is required"));
    return getPropertyById(id);
  }, [id]);
}

export function useProperties(
  params: PropertySearchParams,
): AsyncState<PaginatedResult<Property>> & { isPending: boolean } {
  const [data, setData] = useState<PaginatedResult<Property> | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isPending, startTransition] = useTransition();
  const [tick, setTick] = useState(0);
  const key = JSON.stringify(params);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    startTransition(() => {
      searchProperties(params)
        .then((result) => {
          if (!cancelled) setData(result);
        })
        .catch((err: unknown) => {
          if (!cancelled) {
            setData(null);
            setError(getUserFacingMessage(err));
          }
        })
        .finally(() => {
          if (!cancelled) setLoading(false);
        });
    });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, tick]);

  const reload = useCallback(() => setTick((t) => t + 1), []);

  return { data, error, loading, reload, isPending };
}

export function useSearch(initial?: PropertySearchParams) {
  const [params, setParams] = useState<PropertySearchParams>(
    initial ?? {
      status: "available",
      page: 1,
      pageSize: 12,
      sort: "name-asc",
    },
  );

  const result = useProperties(params);

  return {
    params,
    setParams,
    ...result,
  };
}

export function useEnquiry() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const send = useCallback(async (payload: EnquiryRequest) => {
    setLoading(true);
    setError(null);
    try {
      return await submitEnquiry(payload);
    } catch (err) {
      const message = getUserFacingMessage(err);
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { send, loading, error };
}
