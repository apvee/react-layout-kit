import type { BaseBoxProps } from '@/components/Box';
import type { ResponsiveValue, SpacingValue } from '@/types';
import * as CSS from 'csstype';

/**
 * Props for the Group component.
 */
export type GroupProps = BaseBoxProps & {
  /**
   * align-items CSS property.
   * Supports responsive values using breakpoint objects.
   * @default "center"
   */
  align?: ResponsiveValue<CSS.Property.AlignItems>;

  /**
   * gap CSS property. Can be a spacing scale key or any valid CSS value.
   * Numbers are converted to rem.
   * Supports responsive values using breakpoint objects.
   * @default "m"
   */
  gap?: ResponsiveValue<SpacingValue>;

  /**
   * Whether each child element should have flex-grow: 1 style.
   * Supports responsive values using breakpoint objects.
   * @default false
   */
  grow?: ResponsiveValue<boolean>;

  /**
   * justify-content CSS property.
   * Supports responsive values using breakpoint objects.
   * @default "flex-start"
   */
  justify?: ResponsiveValue<CSS.Property.JustifyContent>;

  /**
   * Whether children should take only dedicated amount of space.
   * When true, max-width style is set based on the number of children.
   * Supports responsive values using breakpoint objects.
   * @default true
   */
  preventGrowOverflow?: ResponsiveValue<boolean>;

  /**
   * flex-wrap CSS property.
   * Supports responsive values using breakpoint objects.
   * @default "wrap"
   */
  wrap?: ResponsiveValue<CSS.Property.FlexWrap>;
}