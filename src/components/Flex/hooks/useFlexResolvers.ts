import { getBreakpoints } from '@/core/styling';
import { useElementWidth } from '@/hooks/useElementWidth';
import type { Breakpoints } from '@/types';
import * as React from 'react';

/**
 * Configuration options for the useFlexResolvers hook.
 */
export interface UseFlexResolversOptions {
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
 * Return type for the useFlexResolvers hook.
 */
export interface FlexResolvers {
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
 * Custom hook that provides common resolution logic for Flex components.
 * 
 * This hook encapsulates:
 * - Container width measurement or usage of provided width
 * - Breakpoints configuration retrieval
 * - Utilities for resolving responsive values
 * 
 * Used by both Flex and Flex.Item to maintain consistent
 * responsive behavior and reduce code duplication.
 * 
 * @param options - Configuration options for the hook
 * @returns Object containing current width and breakpoints configuration
 * 
 * @example
 * ```tsx
 * const elementRef = React.useRef<HTMLDivElement>(null);
 * const { currentWidth, activeBreakpoints } = useFlexResolvers({
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
export const useFlexResolvers = (
  options: UseFlexResolversOptions
): FlexResolvers => {
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
