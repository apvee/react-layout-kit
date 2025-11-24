/**
 * Short-style props interface and utilities for the Box component.
 */

import * as CSS from 'csstype';
import type { ResponsiveValue } from './responsive';
import type { SpacingKey } from './spacing';

/**
 * Short-style props interface for the Box component.
 * Provides convenient shorthand properties for common CSS styling.
 * All props support responsive values using breakpoint objects.
 */
export interface IShortStyleBoxProps {
  // Margin spacing props (use spacing scale)
  /** Margin (all sides) */
  m?: ResponsiveValue<SpacingKey | number>;
  /** Margin top */
  mt?: ResponsiveValue<SpacingKey | number>;
  /** Margin bottom */
  mb?: ResponsiveValue<SpacingKey | number>;
  /** Margin left */
  ml?: ResponsiveValue<SpacingKey | number>;
  /** Margin right */
  mr?: ResponsiveValue<SpacingKey | number>;
  /** Margin inline start (logical property) */
  ms?: ResponsiveValue<SpacingKey | number>;
  /** Margin inline end (logical property) */
  me?: ResponsiveValue<SpacingKey | number>;
  /** Margin inline (left + right) */
  mx?: ResponsiveValue<SpacingKey | number>;
  /** Margin block (top + bottom) */
  my?: ResponsiveValue<SpacingKey | number>;

  // Padding spacing props (use spacing scale)
  /** Padding (all sides) */
  p?: ResponsiveValue<SpacingKey | number>;
  /** Padding top */
  pt?: ResponsiveValue<SpacingKey | number>;
  /** Padding bottom */
  pb?: ResponsiveValue<SpacingKey | number>;
  /** Padding left */
  pl?: ResponsiveValue<SpacingKey | number>;
  /** Padding right */
  pr?: ResponsiveValue<SpacingKey | number>;
  /** Padding inline start (logical property) */
  ps?: ResponsiveValue<SpacingKey | number>;
  /** Padding inline end (logical property) */
  pe?: ResponsiveValue<SpacingKey | number>;
  /** Padding inline (left + right) */
  px?: ResponsiveValue<SpacingKey | number>;
  /** Padding block (top + bottom) */
  py?: ResponsiveValue<SpacingKey | number>;

  // Size spacing props (use CSS types for width/height)
  /** Width */
  w?: ResponsiveValue<CSS.Property.Width>;
  /** Min width */
  miw?: ResponsiveValue<CSS.Property.MinWidth>;
  /** Max width */
  maw?: ResponsiveValue<CSS.Property.MaxWidth>;
  /** Height */
  h?: ResponsiveValue<CSS.Property.Height>;
  /** Min height */
  mih?: ResponsiveValue<CSS.Property.MinHeight>;
  /** Max height */
  mah?: ResponsiveValue<CSS.Property.MaxHeight>;

  // Position CSS props (use native CSS types)
  /** Top position */
  top?: ResponsiveValue<CSS.Property.Top>;
  /** Left position */
  left?: ResponsiveValue<CSS.Property.Left>;
  /** Bottom position */
  bottom?: ResponsiveValue<CSS.Property.Bottom>;
  /** Right position */
  right?: ResponsiveValue<CSS.Property.Right>;
}

/**
 * Mapping from short prop names to their corresponding CSS property names.
 * 
 * @internal
 */
export const SHORT_PROP_TO_CSS_MAPPING = {
  // Margin props
  m: 'margin',
  mt: 'marginTop',
  mb: 'marginBottom',
  ml: 'marginLeft',
  mr: 'marginRight',
  ms: 'marginInlineStart',
  me: 'marginInlineEnd',
  mx: 'marginInline',
  my: 'marginBlock',

  // Padding props
  p: 'padding',
  pt: 'paddingTop',
  pb: 'paddingBottom',
  pl: 'paddingLeft',
  pr: 'paddingRight',
  ps: 'paddingInlineStart',
  pe: 'paddingInlineEnd',
  px: 'paddingInline',
  py: 'paddingBlock',

  // Size props
  w: 'width',
  miw: 'minWidth',
  maw: 'maxWidth',
  h: 'height',
  mih: 'minHeight',
  mah: 'maxHeight',

  // Position props
  top: 'top',
  left: 'left',
  bottom: 'bottom',
  right: 'right',
} as const;

/**
 * Type representing all valid short prop keys.
 */
export type ShortPropKey = keyof IShortStyleBoxProps;

/**
 * Set of short props that use the spacing scale for value resolution.
 * 
 * @internal
 */
export const SPACING_SHORT_PROPS = new Set<ShortPropKey>([
  'm', 'mt', 'mb', 'ml', 'mr', 'ms', 'me', 'mx', 'my',
  'p', 'pt', 'pb', 'pl', 'pr', 'ps', 'pe', 'px', 'py'
]);

/**
 * Set of short props that use native CSS values (no spacing scale resolution).
 * 
 * @internal
 */
export const CSS_SHORT_PROPS = new Set<ShortPropKey>([
  'top', 'left', 'bottom', 'right', 'w', 'miw', 'maw', 'h', 'mih', 'mah'
]);

/**
 * Type guard to check if a prop key is a short prop.
 * 
 * @internal
 */
export function isShortProp(key: string): key is ShortPropKey {
  return key in SHORT_PROP_TO_CSS_MAPPING;
}

/**
 * Type guard to check if a short prop uses the spacing scale.
 * 
 * @internal
 */
export function isSpacingShortProp(key: ShortPropKey): boolean {
  return SPACING_SHORT_PROPS.has(key);
}

/**
 * Type guard to check if a short prop uses native CSS values.
 * 
 * @internal
 */
export function isCssShortProp(key: ShortPropKey): boolean {
  return CSS_SHORT_PROPS.has(key);
}