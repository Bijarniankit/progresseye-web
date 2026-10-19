/**
 * Lightweight recursive merge helper to fall back to default English messages
 * when localized keys (e.g. hi.json) are missing, with zero external dependencies.
 */
export function deepMerge<T extends Record<string, unknown>>(
  target: T,
  source?: Record<string, unknown>,
): T {
  if (!source) return target;
  const output = { ...target };
  for (const key of Object.keys(source)) {
    const sVal = source[key];
    const tVal = (target as Record<string, unknown>)[key];
    if (
      sVal &&
      typeof sVal === "object" &&
      !Array.isArray(sVal) &&
      tVal &&
      typeof tVal === "object" &&
      !Array.isArray(tVal)
    ) {
      (output as Record<string, unknown>)[key] = deepMerge(
        tVal as Record<string, unknown>,
        sVal as Record<string, unknown>,
      );
    } else if (sVal !== undefined) {
      (output as Record<string, unknown>)[key] = sVal;
    }
  }
  return output;
}
