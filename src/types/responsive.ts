/**
 * Core responsive value type definition.
 */

import type { BreakpointKey } from './breakpoints';

/**
 * A responsive value can be either a single value or an object mapping breakpoints to values.
 */
export type ResponsiveValue<T> = T | Partial<Record<BreakpointKey, T>>;