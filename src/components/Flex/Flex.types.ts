import type { BaseBoxProps } from '@/components/Box';
import type { ResponsiveValue, SpacingKey } from '@/types';
import * as CSS from 'csstype';

/**
 * Props for the Flex component.
 */
export type FlexProps = BaseBoxProps & {
  /**
   * align-items CSS property.
   * Supports responsive values using breakpoint objects.
   */
  align?: ResponsiveValue<CSS.Property.AlignItems>;

  /**
   * column-gap CSS property.
   * Supports responsive values using breakpoint objects.
   */
  columnGap?: ResponsiveValue<SpacingKey | number>;

  /**
   * flex-direction CSS property.
   * Supports responsive values using breakpoint objects.
   */
  direction?: ResponsiveValue<CSS.Property.FlexDirection>;

  /**
   * gap CSS property.
   * Supports responsive values using breakpoint objects.
   */
  gap?: ResponsiveValue<SpacingKey | number>;

  /**
   * justify-content CSS property.
   * Supports responsive values using breakpoint objects.
   */
  justify?: ResponsiveValue<CSS.Property.JustifyContent>;

  /**
   * row-gap CSS property.
   * Supports responsive values using breakpoint objects.
   */
  rowGap?: ResponsiveValue<SpacingKey | number>;

  /**
   * flex-wrap CSS property.
   * Supports responsive values using breakpoint objects.
   */
  wrap?: ResponsiveValue<CSS.Property.FlexWrap>;
}

/**
 * Props for the Flex.Item component.
 */
export type FlexItemProps = BaseBoxProps & {
  /**
   * flex CSS property (shorthand for flex-grow, flex-shrink, and flex-basis).
   * Supports responsive values using breakpoint objects.
   */
  flex?: ResponsiveValue<CSS.Property.Flex>;

  /**
   * flex-grow CSS property.
   * Supports responsive values using breakpoint objects.
   */
  grow?: ResponsiveValue<CSS.Property.FlexGrow>;

  /**
   * flex-shrink CSS property.
   * Supports responsive values using breakpoint objects.
   */
  shrink?: ResponsiveValue<CSS.Property.FlexShrink>;

  /**
   * flex-basis CSS property.
   * Supports responsive values using breakpoint objects.
   */
  basis?: ResponsiveValue<CSS.Property.FlexBasis<string | number>>;

  /**
   * align-self CSS property.
   * Supports responsive values using breakpoint objects.
   */
  alignSelf?: ResponsiveValue<CSS.Property.AlignSelf>;

  /**
   * order CSS property.
   * Supports responsive values using breakpoint objects.
   */
  order?: ResponsiveValue<CSS.Property.Order>;
}