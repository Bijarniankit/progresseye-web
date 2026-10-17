/**
 * ProgressEye Web Client — Storage Keys Registry
 *
 * Centralized constants for all browser storage keys (sessionStorage / localStorage).
 *
 * NOTE for Phase 8 Privacy & Cookie Notice:
 * - `STORAGE_KEYS.HERO_ROTATION_PLAYED` is strictly functional and privacy-safe:
 *   it records in sessionStorage that the decorative hero artwork completed its
 *   3-cycle (9-transition) rotation limit during the active browser session, preventing
 *   unnecessary CPU/battery consumption on repeat visits within the same session.
 *   No personally identifiable information (PII) or cross-site tracking data is stored.
 */
export const STORAGE_KEYS = {
  HERO_ROTATION_PLAYED: "pe_hero_played",
} as const;

export type StorageKey = (typeof STORAGE_KEYS)[keyof typeof STORAGE_KEYS];
