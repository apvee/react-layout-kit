import * as React from 'react';
import { useElementWidth } from './useElementWidth';

/**
 * Public hook for measuring container width. SSR-safe wrapper around useElementWidth.
 * 
 * @param elementRef - Ref to the element to measure
 * @param options - Configuration options
 * @param options.disabled - Whether to disable width measurement
 * @param options.debounceMs - Debounce delay in milliseconds (default: 16ms for 60fps)
 * @returns Current width of the element in pixels, or 0 if not available
 * 
 * @example
 * ```tsx
 * function ResponsiveCard() {
 *   const ref = React.useRef<HTMLDivElement>(null);
 *   const width = useContainerWidth(ref, { debounceMs: 32 }); // 30fps
 *   
 *   return (
 *     <Box
 *       ref={ref}
 *       $padding={{ xs: 8, md: 16 }}
 *       containerWidth={width}
 *     >
 *       Container width: {width}px
 *     </Box>
 *   );
 * }
 * ```
 */
export function useContainerWidth<T extends Element>(
  elementRef: React.RefObject<T>,
  options: { disabled?: boolean; debounceMs?: number } = {}
): number {
  return useElementWidth(elementRef, options);
}
