import * as CSS from 'csstype';
import type { ResponsiveValue, SpacingKey } from '@/types';
import type { BaseBoxProps } from '@/components/Box';

/**
 * Props for the Stack component.
 */
export type StackProps = BaseBoxProps & {
  /**
   * align-items CSS property.
   * Supports responsive values using breakpoint objects.
   * @default "stretch"
   */
  align?: ResponsiveValue<CSS.Property.AlignItems>;

  /**
   * gap CSS property. Can be a spacing scale key or a raw number.
   * Numbers are converted to px.
   * Supports responsive values using breakpoint objects.
   * When undefined, no gap will be applied.
   */
  gap?: ResponsiveValue<SpacingKey | number>;

  /**
   * justify-content CSS property.
   * Supports responsive values using breakpoint objects.
   * @default "flex-start"
   */
  justify?: ResponsiveValue<CSS.Property.JustifyContent>;
}