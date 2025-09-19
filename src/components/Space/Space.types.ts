import type { ResponsiveValue, SpacingValue } from '@/types';

/**
 * Props for the Space component.
 */
export interface SpaceProps {
  /**
   * Horizontal spacing. Can be a spacing scale key or any valid CSS value.
   * Numbers are converted to rem.
   * Supports responsive values using breakpoint objects.
   */
  w?: ResponsiveValue<SpacingValue>;

  /**
   * Vertical spacing. Can be a spacing scale key or any valid CSS value.
   * Numbers are converted to rem.
   * Supports responsive values using breakpoint objects.
   */
  h?: ResponsiveValue<SpacingValue>;

  /**
   * Optional container width for responsive prop resolution.
   * If not provided, the component will measure its container width.
   */
  containerWidth?: number;
}