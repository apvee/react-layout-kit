import { Breakpoints, Spacing, BoxConfig } from '@/types';
import { DEFAULT_BREAKPOINTS, DEFAULT_SPACING } from './defaults';

/**
 * Global module state for breakpoint configuration.
 * 
 * @internal
 */
export let globalBreakpoints: Breakpoints = { ...DEFAULT_BREAKPOINTS };

/**
 * Global module state for spacing scale configuration.
 * 
 * @internal
 */
export let globalSpacing: Spacing = { ...DEFAULT_SPACING };

/**
 * Configures global settings for the Box component system.
 * 
 * @param config - Configuration object
 * @param config.breakpoints - Partial breakpoints object to merge with defaults
 * @param config.spacing - Partial spacing scale object to merge with defaults
 * 
 * @example
 * ```ts
 * import { configureBox } from '@apvee/react-layout-kit';
 * 
 * configureBox({
 *   breakpoints: {
 *     xs: 0,
 *     sm: 480,
 *     md: 768,
 *     tablet: 900,
 *     lg: 1024,
 *     xl: 1280,
 *     '2xl': 1440
 *   },
 *   spacing: {
 *     0: 0,
 *     1: 4,
 *     2: 8,
 *     xs: '0.25rem',
 *     s: '0.5rem',
 *     m: '1rem',
 *     l: '2rem',
 *     xl: '4rem'
 *   }
 * });
 * ```
 */
export function configureBox(config: BoxConfig): void {
  if (config.breakpoints) {
    globalBreakpoints = { ...globalBreakpoints, ...config.breakpoints };
  }

  if (config.spacing) {
    globalSpacing = { ...globalSpacing, ...config.spacing };
  }
}

/**
 * Resets both breakpoints and spacing to their default values.
 */
export function resetBoxConfig(): void {
  globalBreakpoints = { ...DEFAULT_BREAKPOINTS };
  globalSpacing = { ...DEFAULT_SPACING };
}

/**
 * Gets the current breakpoints configuration.
 * 
 * @returns Current breakpoints object
 * 
 * @example
 * ```ts
 * import { getBreakpoints } from '@apvee/react-layout-kit';
 * 
 * const breakpoints = getBreakpoints();
 * console.log(breakpoints.md); // 768
 * ```
 */
export function getBreakpoints(): Breakpoints {
  return { ...globalBreakpoints };
}

/**
 * Gets the current spacing scale configuration.
 * 
 * @returns Current spacing object
 * 
 * @example
 * ```ts
 * import { getSpacing } from '@apvee/react-layout-kit';
 * 
 * const spacing = getSpacing();
 * console.log(spacing.md); // 16
 * ```
 */
export function getSpacing(): Spacing {
  return { ...globalSpacing };
}
