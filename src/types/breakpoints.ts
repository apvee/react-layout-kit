/**
 * Breakpoint system type definitions for responsive design.
 */

/**
 * Breakpoint definitions that can be augmented by library consumers.
 * 
 * @example
 * ```ts
 * // Augment breakpoints in your app
 * declare module '@apvee/react-layout-kit' {
 *   interface BreakpointDefs {
 *     tablet: number;
 *     '2xl': number;
 *   }
 * }
 * ```
 */
export interface BreakpointDefs {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  xxl: number;
}

/**
 * Type representing all possible breakpoint keys.
 */
export type BreakpointKey = keyof BreakpointDefs;

/**
 * Mapping of breakpoint keys to their minimum width values.
 */
export type Breakpoints = Record<BreakpointKey, number>;