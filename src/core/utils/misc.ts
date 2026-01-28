/**
 * Simple debounce utility for performance optimization.
 * Delays function execution until after the specified delay has passed since the last call.
 * 
 * @param func - Function to debounce
 * @param delay - Delay in milliseconds
 * @returns Debounced function
 * 
 * @internal
 * 
 * @example
 * ```ts
 * const debouncedCallback = debounce((value) => setValue(value), 16);
 * ```
 */
export function debounce<Args extends unknown[]>(
  func: (...args: Args) => void,
  delay: number
): (...args: Args) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return (...args: Args) => {
    // Clear previous timeout
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }

    // Set new timeout
    timeoutId = setTimeout(() => {
      timeoutId = null;
      func(...args);
    }, delay);
  };
}