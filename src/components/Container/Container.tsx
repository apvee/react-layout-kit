import { Box } from '@/components/Box';
import { resolveResponsiveValue } from '@/core/responsive';
import { getBreakpoints } from '@/core/styling';
import { useElementWidth } from '@/hooks/useElementWidth';
import useMergedRef from '@react-hook/merged-ref';
import * as React from 'react';
import type { ContainerProps } from './Container.types';

/**
 * A component that centers content horizontally and controls maximum width.
 * Perfect for creating consistent page layouts with controlled content width.
 * 
 * Uses CSS max-width and auto margins for horizontal centering.
 * All styles are applied via Box component props - no inline styles are used.
 * 
 * **Size Behavior:**
 * - Controls the maximum width of the container
 * - Content is automatically centered horizontally
 * - Can be overridden by the `fluid` prop
 * 
 * **Fluid Behavior:**
 * - When true, ignores `size` and uses 100% width
 * - Useful for full-width layouts or responsive design
 * 
 * **Responsive Behavior:**
 * - Responsive `size` and `fluid` values work only when `containerWidth` is provided
 * - Without `containerWidth`, the first valid key from a responsive object is used as fallback
 * - For full responsive functionality, always provide `containerWidth` or use container queries
 * 
 * @param props - Component props including layout, styling, and responsive options
 * @returns A React element with applied layout styles
 * 
 * @example
 * ```tsx
 * // Basic container with default max-width
 * <Container>
 *   <h1>Page Title</h1>
 *   <p>Content goes here...</p>
 * </Container>
 * 
 * // Custom size container
 * <Container size={800}>
 *   <div>Narrower content area</div>
 * </Container>
 * 
 * // Fluid container (full width)
 * <Container fluid>
 *   <div>Full width content</div>
 * </Container>
 * 
 * // Responsive behavior (requires containerWidth for proper responsive behavior)
 * <Container 
 *   size={{ xs: 320, md: 768, lg: 1200 }}
 *   fluid={{ xs: true, md: false }}
 *   containerWidth={800}
 * >
 *   <div>Responsive container</div>
 * </Container>
 * 
 * // Without containerWidth, falls back to first valid key (xs values in this case)
 * <Container 
 *   size={{ xs: 320, md: 768, lg: 1200 }}
 *   fluid={{ xs: true, md: false }}
 * >
 *   <div>Uses xs:320 and xs:true as fallback</div>
 * </Container>
 * ```
 */
export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  function Container(props, forwardedRef) {
    const {
      size = 1200,
      fluid = false,
      containerWidth,
      children,
      ...boxProps
    } = props;

    // Element ref for width measurement
    const elementRef = React.useRef<HTMLDivElement>(null);

    // Use useMergedRef for proper ref management
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

    // Resolve responsive values based on current container width
    const resolvedSize = React.useMemo(() => {
      // If containerWidth is provided, use full responsive resolution
      if (containerWidth !== undefined) {
        return resolveResponsiveValue(size, currentWidth, activeBreakpoints) ?? 1200;
      }
      
      // If no containerWidth is provided and size is a responsive object,
      // fall back to the first valid key to avoid circular dependency
      if (typeof size === 'object' && size !== null) {
        const firstValidValue = Object.values(size).find(value => value !== undefined);
        return firstValidValue ?? 1200;
      }
      
      // For non-responsive values, use as-is
      return (size as number) ?? 1200;
    }, [size, currentWidth, activeBreakpoints, containerWidth]);

    const resolvedFluid = React.useMemo(() => {
      // If containerWidth is provided, use full responsive resolution
      if (containerWidth !== undefined) {
        return resolveResponsiveValue(fluid, currentWidth, activeBreakpoints) ?? false;
      }
      
      // If no containerWidth is provided and fluid is a responsive object,
      // fall back to the first valid key to avoid circular dependency
      if (typeof fluid === 'object' && fluid !== null) {
        const firstValidValue = Object.values(fluid).find(value => value !== undefined);
        return firstValidValue ?? false;
      }
      
      // For non-responsive values, use as-is
      return (fluid as boolean) ?? false;
    }, [fluid, currentWidth, activeBreakpoints, containerWidth]);

    // Calculate final width and styling based on resolved values
    const containerStyles = React.useMemo(() => {
      const isFluid = resolvedFluid;

      return {
        width: isFluid ? '100%' : '100%',
        maxWidth: isFluid ? 'none' : `${resolvedSize}px`,
        marginLeft: 'auto',
        marginRight: 'auto',
        // Apply default padding for better readability
        paddingLeft: '1rem',
        paddingRight: '1rem',
        // Ensure padding is included in the total width calculation
        boxSizing: 'border-box' as const,
      };
    }, [resolvedFluid, resolvedSize]);

    return (
      <Box
        {...boxProps}
        ref={mergedRef}
        containerWidth={currentWidth}
        $width={containerStyles.width}
        $maxWidth={containerStyles.maxWidth}
        $marginLeft={containerStyles.marginLeft}
        $marginRight={containerStyles.marginRight}
        $paddingLeft={containerStyles.paddingLeft}
        $paddingRight={containerStyles.paddingRight}
        $boxSizing={containerStyles.boxSizing}
      >
        {children}
      </Box>
    );
  }
);

Container.displayName = 'Container';