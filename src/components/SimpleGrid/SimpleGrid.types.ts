import type { BaseBoxProps } from '@/components/Box';
import type { ResponsiveValue, SpacingKey } from '@/types';

/**
 * Props for the SimpleGrid component.
 */
export type SimpleGridProps = BaseBoxProps & {
  /**
   * Number of columns in the grid.
   * Supports responsive values using breakpoint objects.
   * @default 1
   */
  cols?: ResponsiveValue<number>;

  /**
   * Spacing between columns. Can be a spacing scale key or a raw number.
   * Supports responsive values using breakpoint objects.
   * When undefined, no spacing will be applied.
   */
  spacing?: ResponsiveValue<SpacingKey | number>;

  /**
   * Spacing between rows. Can be a spacing scale key or a raw number.
   * If not provided, uses the same value as spacing.
   * Supports responsive values using breakpoint objects.
   * When both spacing and verticalSpacing are undefined, no spacing will be applied.
   */
  verticalSpacing?: ResponsiveValue<SpacingKey | number>;
}