import { BreakpointKey, Breakpoints, ResponsiveValue } from "@/types";

/**
 * Resolves a responsive value based on current container width and breakpoints.
 * 
 * @param value - The responsive value to resolve
 * @param width - Current container width in pixels
 * @param breakpoints - Breakpoint configuration
 * @returns Resolved value for the current width
 * 
 * @example
 * ```ts
 * const value = { xs: 8, md: 16, lg: 24 };
 * const resolved = resolveResponsiveValue(value, 800, breakpoints); // Returns 16
 * ```
 */
export function resolveResponsiveValue<T>(
  value: ResponsiveValue<T> | undefined,
  width: number,
  breakpoints: Breakpoints
): T | undefined {
  if (value === undefined) {
    return undefined;
  }

  // If it's not an object or is null, return as-is
  if (typeof value !== 'object' || value === null) {
    return value as T;
  }

  // Get all breakpoints that have values, sorted by min-width ascending
  const entries = Object.entries(value as Record<BreakpointKey, T>)
    .filter(([, val]) => val !== undefined)
    .map(([key, val]) => ({
      key: key as BreakpointKey,
      value: val,
      minWidth: breakpoints[key as BreakpointKey] || 0,
    }))
    .sort((a, b) => a.minWidth - b.minWidth);

  // Find the last breakpoint that matches (mobile-first approach)
  let resolvedValue: T | undefined;
  for (const entry of entries) {
    if (width >= entry.minWidth) {
      resolvedValue = entry.value;
    }
  }

  return resolvedValue;
}