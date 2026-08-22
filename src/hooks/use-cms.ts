/**
 * React Query hooks for the Google Sheets CMS.
 *
 * Resilience model:
 *  - Settings / Pricing / Gallery fall back to built-in defaults while
 *    loading or on error, so those sections never break or flash.
 *  - Games / Events expose the raw query so pages can show loading,
 *    error and empty states.
 */

import { useQuery } from "@tanstack/react-query";

import {
  DEFAULT_SETTINGS,
  DEFAULT_SERVICES,
  fetchEvents,
  fetchGallery,
  fetchGames,
  fetchServices,
  fetchSettings,
  type CafeEvent,
  type GalleryPhoto,
  type Game,
  type Service,
  type SiteSettings,
} from "@/lib/content";
import { sortEventsDesc } from "@/lib/content";

const STALE_TIME_MS = 2 * 60 * 1000; // sheets update within a couple of minutes

const baseOptions = {
  staleTime: STALE_TIME_MS,
  retry: 1,
  refetchOnWindowFocus: false,
} as const;

export function useSettingsQuery() {
  return useQuery({
    queryKey: ["cms", "settings"],
    queryFn: ({ signal }) => fetchSettings(signal),
    ...baseOptions,
  });
}

/** Merged settings — always returns a complete object (defaults + sheet overrides). */
export function useSettings(): SiteSettings {
  return useSettingsQuery().data ?? DEFAULT_SETTINGS;
}

export function usePricing(): Service[] {
  const query = useQuery({
    queryKey: ["cms", "pricing"],
    queryFn: ({ signal }) => fetchServices(signal),
    ...baseOptions,
  });
  const data = query.data;
  return data && data.length > 0 ? data : DEFAULT_SERVICES;
}

export function useGamesQuery() {
  return useQuery({
    queryKey: ["cms", "games"],
    queryFn: ({ signal }) => fetchGames(signal),
    ...baseOptions,
  });
}

/** Games sorted newest-sheet-order first; [] until loaded. */
export function useGames(): Game[] {
  return useGamesQuery().data ?? [];
}

export function useEventsQuery() {
  return useQuery({
    queryKey: ["cms", "events"],
    queryFn: ({ signal }) => fetchEvents(signal),
    ...baseOptions,
  });
}

/** Events sorted newest first; [] until loaded. */
export function useEvents(): CafeEvent[] {
  const data = useEventsQuery().data;
  return data ? sortEventsDesc(data) : [];
}

export function useGallery(): GalleryPhoto[] {
  return useGalleryQuery().data ?? [];
}

export function useGalleryQuery() {
  return useQuery({
    queryKey: ["cms", "gallery"],
    queryFn: ({ signal }) => fetchGallery(signal),
    ...baseOptions,
  });
}