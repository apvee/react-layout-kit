import * as React from 'react';
import { useEffect, useState, useRef, useMemo } from 'react';
import { debounce } from '@/core/utils';

/**
 * Hook that measures element width using ResizeObserver.
 * SSR-safe with optional disable functionality and debounced updates for performance.
 * 
 * This is the core implementation hook. For a more semantic alias, see useContainerWidth.
 * Both hooks provide identical functionality - choose based on your naming preference.
 * 
 * @param elementRef - Ref to the element to measure
 * @param options - Configuration options
 * @param options.disabled - Whether to disable width measurement
 * @param options.debounceMs - Debounce delay in milliseconds (default: 16ms for 60fps)
 * @returns Current width of the element in pixels, or 0 if not measurable
 * 
 * @example
 * ```tsx
 * function ResponsiveCard() {
 *   const ref = React.useRef<HTMLDivElement>(null);
 *   const width = useElementWidth(ref, { debounceMs: 32 });
 *   
 *   return (
 *     <div ref={ref}>
 *       Element width: {width}px
 *     </div>
 *   );
 * }
 * ```
 */
export function useElementWidth<T extends Element>(
  elementRef: React.RefObject<T>,
  options: { disabled?: boolean; debounceMs?: number } = {}
): number {
  const { disabled = false, debounceMs = 16 } = options;
  const [width, setWidth] = useState<number>(0);
  const observerRef = useRef<ResizeObserver | null>(null);

  // Create debounced setWidth function
  const debouncedSetWidth = useMemo(
    () => debounce((newWidth: number) => {
      setWidth(Math.floor(newWidth));
    }, debounceMs),
    [debounceMs]
  );

  useEffect(() => {
    if (disabled || typeof window === 'undefined' || !window.ResizeObserver) {
      return;
    }

    const element = elementRef.current;
    if (!element) {
      return;
    }

    // Create ResizeObserver instance with debounced callback
    observerRef.current = new ResizeObserver((entries) => {
      for (const entry of entries) {
        // Use borderBoxSize if available, fallback to contentRect
        const newWidth = entry.borderBoxSize?.[0]?.inlineSize ?? entry.contentRect.width;
        debouncedSetWidth(newWidth);
      }
    });

    // Start observing
    observerRef.current.observe(element);

    // Get initial size (not debounced for immediate feedback)
    const rect = element.getBoundingClientRect();
    setWidth(Math.floor(rect.width));

    // Cleanup function
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    };
  }, [elementRef, disabled, debouncedSetWidth]);

  // Reset width when disabled
  useEffect(() => {
    if (disabled) {
      setWidth(0);
    }
  }, [disabled]);

  return width;
}
