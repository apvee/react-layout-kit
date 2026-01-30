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
 * Internal version counter for global config changes.
 * Incremented whenever configureBox/resetBoxConfig updates breakpoints or spacing.
 *
 * @internal
 */
let boxConfigVersion = 0;

/**
 * Internal subscribers to config changes.
 *
 * @internal
 */
const boxConfigListeners = new Set<() => void>();

/**
 * Returns the current internal config version.
 *
 * @internal
 */
export function getBoxConfigVersion(): number {
  return boxConfigVersion;
}

/**
 * Subscribe to global Box configuration changes.
 *
 * @param listener - Callback invoked whenever global Box configuration is updated.
 * @returns Unsubscribe function.
 *
 * @internal
 */
export function subscribeBoxConfig(listener: () => void): () => void {
  boxConfigListeners.add(listener);
  return () => {
    boxConfigListeners.delete(listener);
  };
}

function notifyBoxConfigChanged(): void {
  boxConfigVersion += 1;
  for (const listener of boxConfigListeners) {
    listener();
  }
}

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
 *     lg: 1024,
 *     xl: 1280,
 *     xxl: 1440,
 *     xxxl: 2560
 *   },
 *   spacing: {
 *     none: 0,
 *     xxs: 2,
 *     xs: 4,
 *     sm: 8,
 *     md: 12,
 *     lg: 16,
 *     xl: 20,
 *     xxl: 24,
 *     xxxl: 32
 *   }
 * });
 * ```
 */
export function configureBox(config: BoxConfig): void {
  let changed = false;

  if (config.breakpoints) {
    globalBreakpoints = { ...globalBreakpoints, ...config.breakpoints };
    changed = true;
  }

  if (config.spacing) {
    globalSpacing = { ...globalSpacing, ...config.spacing };
    changed = true;
  }

  if (changed) {
    notifyBoxConfigChanged();
  }
}

/**
 * Resets both breakpoints and spacing to their default values.
 */
export function resetBoxConfig(): void {
  globalBreakpoints = { ...DEFAULT_BREAKPOINTS };
  globalSpacing = { ...DEFAULT_SPACING };

  notifyBoxConfigChanged();
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
