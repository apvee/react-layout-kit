import type { ResponsiveValue, SpacingKey } from '@/types';

/**
 * Props for the Space component.
 */
export interface SpaceProps {
  /**
   * Horizontal spacing. Can be a spacing scale key or a raw number.
   * Numbers are converted to px.
   * Supports responsive values using breakpoint objects.
   */
  w?: ResponsiveValue<SpacingKey | number>;

  /**
   * Vertical spacing. Can be a spacing scale key or a raw number.
   * Numbers are converted to px.
   * Supports responsive values using breakpoint objects.
   */
  h?: ResponsiveValue<SpacingKey | number>;

  /**
   * Optional container width for responsive prop resolution.
   * If not provided, the component will measure its container width.
   */
  containerWidth?: number;
}