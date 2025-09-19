import { Box } from '@/components/Box';
import { resolveResponsiveValue } from '@/core/responsive';
import { getBreakpoints } from '@/core/styling';
import { useElementWidth } from '@/hooks/useElementWidth';
import useMergedRef from '@react-hook/merged-ref';
import * as React from 'react';
import type { CenterProps } from './Center.types';

/**
 * A component that centers content both vertically and horizontally using flexbox.
 * Perfect for centering single elements, text, or any content that needs to be positioned
 * in the exact center of its container.
 * 
 * Uses CSS flexbox with align-items: center and justify-content: center.
 * All styles are applied via Box component props - no inline styles are used.
 * 
 * **Display Modes:**
 * - Default: Uses `display: flex` for block-level centering
 * - Inline: Uses `display: inline-flex` when `inline` prop is true
 * 
 * **Responsive Behavior:**
 * - The `inline` prop supports responsive values for different display modes at different breakpoints
 * - Container width measurement is used for responsive prop resolution
 * 
 * @example
 * ```tsx
 * // Basic centering
 * <Center>
 *   <button>Centered Button</button>
 * </Center>
 * 
 * // Inline centering
 * <Center inline>
 *   <span>Inline centered text</span>
 * </Center>
 * 
 * // Responsive inline behavior
 * <Center inline={{ xs: true, md: false }}>
 *   <div>Inline on mobile, block on desktop</div>
 * </Center>
 * 
 */
export const Center = React.forwardRef<HTMLDivElement, CenterProps>(
  function Center(props, forwardedRef) {
    const {
      inline = false,
      containerWidth,
      children,
      ...boxProps
    } = props;

    // Element ref for width measurement
    const elementRef = React.useRef<HTMLDivElement>(null);

    // Merge refs using the useMergedRef hook
    const mergedRef = useMergedRef(forwardedRef, elementRef);

    // Get container width - use prop value or measure element
    const measuredWidth = useElementWidth(elementRef, {
      disabled: containerWidth !== undefined
    });
    const currentWidth = containerWidth ?? measuredWidth;

    // Get breakpoints configuration
    const activeBreakpoints = React.useMemo(() => {
      return getBreakpoints();
    }, []);

    // Resolve the responsive inline value based on current container width
    const resolvedInline = React.useMemo(() => {
      return resolveResponsiveValue(inline, currentWidth, activeBreakpoints) ?? false;
    }, [inline, currentWidth, activeBreakpoints]);

    // Determine display value
    const displayValue = resolvedInline ? 'inline-flex' : 'flex';

    return (
      <Box
        {...boxProps}
        ref={mergedRef}
        containerWidth={currentWidth}
        $display={displayValue}
        $alignItems="center"
        $justifyContent="center"
      >
        {children}
      </Box>
    );
  }
);

Center.displayName = 'Center';