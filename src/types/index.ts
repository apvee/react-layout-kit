/**
 * @fileoverview Type definitions barrel export for @apvee/react-layout-kit
 * 
 * This file re-exports all type definitions in a structured way,
 * maintaining the same public API while improving internal organization.
 */

// Core responsive type
export type { ResponsiveValue } from './responsive';

// Breakpoint system
export type {
  BreakpointDefs,
  BreakpointKey,
  Breakpoints
} from './breakpoints';

// Spacing system
export type {
  SpacingDefs,
  SpacingKey,
  SpacingValue,
  Spacing
} from './spacing';

// Configuration
export type { BoxConfig } from './config';

// CSS Props
export type { DollarCssProps } from './css-props';

// Short Props
export type {
  IShortStyleBoxProps,
  ShortPropKey
} from './short-props';

export {
  SHORT_PROP_TO_CSS_MAPPING,
  SPACING_SHORT_PROPS,
  CSS_SHORT_PROPS,
  isShortProp,
  isSpacingShortProp,
  isCssShortProp
} from './short-props';