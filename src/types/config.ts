/**
 * Configuration type definitions for Box component system.
 */

import type { Breakpoints } from './breakpoints';
import type { Spacing } from './spacing';

/**
 * Complete configuration object for Box component system.
 */
export interface BoxConfig {
  /**
   * Breakpoint configuration for responsive behavior.
   */
  breakpoints?: Partial<Breakpoints>;

  /**
   * Spacing scale configuration for consistent spacing values.
   */
  spacing?: Partial<Spacing>;
}