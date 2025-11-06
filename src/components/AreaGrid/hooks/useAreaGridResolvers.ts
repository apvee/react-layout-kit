import { resolveResponsiveValue } from '@/core/responsive';
import { getBreakpoints } from '@/core/styling';
import { useElementWidth } from '@/hooks/useElementWidth';
import type { Breakpoints } from '@/types';
import * as React from 'react';

/**
 * Configuration options for the useAreaGridResolvers hook.
 */
export interface UseAreaGridResolversOptions {
  /**
   * Reference to the DOM element for width measurement.
   */
  elementRef: React.RefObject<HTMLDivElement>;
  
  /**
   * Optional container width override.
   * If provided, element width measurement will be disabled.
   */
  containerWidth?: number | undefined;
}

/**
 * Return type for the useAreaGridResolvers hook.
 */
export interface AreaGridResolvers {
  /**
   * The current container width (measured or provided).
   */
  currentWidth: number;
  
  /**
   * Active breakpoints configuration.
   */
  activeBreakpoints: Breakpoints;
}

/**
 * Custom hook that provides common resolution logic for AreaGrid components.
 * 
 * This hook encapsulates:
 * - Container width measurement or usage of provided width
 * - Breakpoints configuration retrieval
 * - Utilities for resolving responsive values
 * 
 * Used by both AreaGrid and AreaGrid.Item to maintain consistent
 * responsive behavior and reduce code duplication.
 * 
 * @param options - Configuration options for the hook
 * @returns Object containing current width and breakpoints configuration
 * 
 * @example
 * ```tsx
 * const elementRef = React.useRef<HTMLDivElement>(null);
 * const { currentWidth, activeBreakpoints } = useAreaGridResolvers({
 *   elementRef,
 *   containerWidth: props.containerWidth
 * });
 * 
 * const resolvedValue = React.useMemo(() => {
 *   return resolveResponsiveValue(propValue, currentWidth, activeBreakpoints);
 * }, [propValue, currentWidth, activeBreakpoints]);
 * ```
 * 
 * @internal This is an internal implementation detail and should not be used directly.
 */
export const useAreaGridResolvers = (
  options: UseAreaGridResolversOptions
): AreaGridResolvers => {
  const { elementRef, containerWidth } = options;

  // Get container width - use prop value or measure element
  const measuredWidth = useElementWidth(elementRef, {
    disabled: containerWidth !== undefined
  });
  const currentWidth = containerWidth ?? measuredWidth;

  // Get breakpoints configuration
  const activeBreakpoints = React.useMemo(() => {
    return getBreakpoints();
  }, []);

  return {
    currentWidth,
    activeBreakpoints
  };
};
