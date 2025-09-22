/**
 * Spacing system type definitions for consistent spacing values.
 */

/**
 * Spacing scale definitions that can be augmented by library consumers.
 * 
 * @example
 * ```ts
 * // Augment spacing scale in your app
 * declare module '@apvee/react-layout-kit' {
 *   interface SpacingDefs {
 *     xxs: string;
 *     xxl: string;
 *   }
 * }
 * ```
 */
export interface SpacingDefs {
  none: string | number;
  xs: string | number;
  sm: string | number;
  md: string | number;
  lg: string | number;
  xl: string | number;
  xxl: string | number;
  xxxl: string | number;
}

/**
 * Type representing all possible spacing scale keys.
 */
export type SpacingKey = keyof SpacingDefs;

/**
 * Type representing all possible spacing values.
 * Can be a spacing scale key, a number (converted to px), or a CSS string value.
 */
export type SpacingValue = SpacingKey | number;

/**
 * Mapping of spacing keys to their corresponding values.
 * Values can be numbers (converted to px) or strings (used as-is).
 */
export type Spacing = Record<SpacingKey, string | number>;