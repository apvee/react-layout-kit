import { Breakpoints, Spacing } from "@/types";

/**
 * Default breakpoint configuration.
 * 
 * @internal
 */
export const DEFAULT_BREAKPOINTS: Breakpoints = {
  xs: 0,
  sm: 479,
  md: 639,
  lg: 1023,
  xl: 1365,
  xxl: 1919,
  xxxl: 1920
};

/**
 * Default spacing scale configuration.
 * 
 * @internal
 */
export const DEFAULT_SPACING: Spacing = {
  none: 0,
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32
};