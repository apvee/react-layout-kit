import { getBreakpoints } from '@/core/styling';
import { useBoxConfigVersion } from '@/core/hooks/useBoxConfigVersion';
import { useElementWidth } from '@/hooks/useElementWidth';
import type { Breakpoints } from '@/types';
import * as React from 'react';

/**
 * Configuration options for the useResponsiveResolvers hook.
 */
export interface UseResponsiveResolversOptions {
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
 * Return type for the useResponsiveResolvers hook.
 */
export interface ResponsiveResolvers {
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
 * Consolidated hook that provides common resolution logic for responsive components.
 * 
 * This hook encapsulates:
 * - Container width measurement or usage of provided width
 * - Breakpoints configuration retrieval
 * - Common utilities for resolving responsive values
 * 
 * Used across all layout components (Flex, Grid, AreaGrid, Stack, Group, SimpleGrid, etc.)
 * to maintain consistent responsive behavior and eliminate code duplication.
 * 
 * @param options - Configuration options for the hook
 * @returns Object containing current width and breakpoints configuration
 * 
 * @example
 * ```tsx
 * const elementRef = React.useRef<HTMLDivElement>(null);
 * const { currentWidth, activeBreakpoints } = useResponsiveResolvers({
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
export const useResponsiveResolvers = (
  options: UseResponsiveResolversOptions
): ResponsiveResolvers => {
  const { elementRef, containerWidth } = options;

  // Rerender when global configuration changes so components can pick up new breakpoints.
  const boxConfigVersion = useBoxConfigVersion();

  // Get container width - use prop value or measure element
  const measuredWidth = useElementWidth(elementRef, {
    disabled: containerWidth !== undefined
  });
  const currentWidth = containerWidth ?? measuredWidth;

  // Get breakpoints configuration
  const activeBreakpoints = React.useMemo(() => {
    return getBreakpoints();
  }, [boxConfigVersion]);

  return {
    currentWidth,
    activeBreakpoints
  };
};
