import { Box } from '@/components/Box';
import { resolveResponsiveValue } from '@/core/responsive';
import { getBreakpoints, resolveSpacing } from '@/core/styling';
import { useElementWidth } from '@/hooks/useElementWidth';
import useMergedRef from '@react-hook/merged-ref';
import * as React from 'react';
import type { SimpleGridProps } from './SimpleGrid.types';

/**
 * A responsive grid component where each item takes equal amount of space.
 * Perfect for creating responsive layouts with consistent item sizing.
 * 
 * Uses CSS Grid with repeat(auto-fit, minmax(0, 1fr)) for equal-width items
 * or repeat(cols, 1fr) when columns are specified.
 * All styles are applied via Box component props - no inline styles are used.
 * 
 * **Grid Properties:**
 * - `cols`: Number of columns (default: 1)
 * - `spacing`: Gap between columns (default: "m" = 16px)
 * - `verticalSpacing`: Gap between rows (default: same as spacing)
 * 
 * **Responsive Behavior:**
 * - All properties support responsive values for different layouts at different breakpoints
 * - Container width measurement is used for responsive prop resolution
 * - Spacing values can use predefined scale keys ('xs', 's', 'm', 'l', 'xl', 'xxl') or custom CSS values
 * 
 * @example
 * ```tsx
 * // Basic SimpleGrid with 3 columns
 * <SimpleGrid cols={3}>
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 *   <div>Item 3</div>
 *   <div>Item 4</div>
 * </SimpleGrid>
 * 
 * // Custom spacing
 * <SimpleGrid cols={2} spacing="xl" verticalSpacing="s">
 *   <div>Large horizontal gap, small vertical gap</div>
 *   <div>Large horizontal gap, small vertical gap</div>
 * </SimpleGrid>
 * 
 * // Responsive layout
 * <SimpleGrid 
 *   cols={{ xs: 1, sm: 2, md: 3, lg: 4 }}
 *   spacing={{ xs: "s", md: "m", lg: "l" }}
 * >
 *   <div>Responsive Item 1</div>
 *   <div>Responsive Item 2</div>
 *   <div>Responsive Item 3</div>
 *   <div>Responsive Item 4</div>
 * </SimpleGrid>
 * 
 * // Custom CSS spacing values
 * <SimpleGrid cols={3} spacing="2rem" verticalSpacing="1rem">
 *   <div>Custom spacing values</div>
 *   <div>Custom spacing values</div>
 *   <div>Custom spacing values</div>
 * </SimpleGrid>
 * ```
 */
export const SimpleGrid = React.forwardRef<HTMLDivElement, SimpleGridProps>(
  function SimpleGrid(props, forwardedRef) {
    const {
      cols = 1,
      spacing = "m",
      verticalSpacing,
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
    const resolvedCols = React.useMemo(() => {
      return resolveResponsiveValue(cols, currentWidth, activeBreakpoints) ?? 1;
    }, [cols, currentWidth, activeBreakpoints]);

    const resolvedSpacing = React.useMemo(() => {
      const spacingValue = resolveResponsiveValue(spacing, currentWidth, activeBreakpoints) ?? "m";
      return resolveSpacing(spacingValue);
    }, [spacing, currentWidth, activeBreakpoints]);

    const resolvedVerticalSpacing = React.useMemo(() => {
      // Use verticalSpacing if provided, otherwise fall back to spacing value
      const verticalSpacingValue = verticalSpacing 
        ? resolveResponsiveValue(verticalSpacing, currentWidth, activeBreakpoints)
        : resolveResponsiveValue(spacing, currentWidth, activeBreakpoints);
      const finalVerticalSpacing = verticalSpacingValue ?? "m";
      return resolveSpacing(finalVerticalSpacing);
    }, [verticalSpacing, spacing, currentWidth, activeBreakpoints]);

    // Generate grid template columns based on number of columns
    const gridTemplateColumns = React.useMemo(() => {
      return `repeat(${resolvedCols}, 1fr)`;
    }, [resolvedCols]);

    // Calculate gap values - support both single value and row/column values
    const columnGap = React.useMemo(() => {
      // Convert number to px if needed
      const spacing = resolvedSpacing;
      return typeof spacing === 'number' ? `${spacing}px` : spacing;
    }, [resolvedSpacing]);

    const rowGap = React.useMemo(() => {
      // Convert number to px if needed
      const spacing = resolvedVerticalSpacing;
      return typeof spacing === 'number' ? `${spacing}px` : spacing;
    }, [resolvedVerticalSpacing]);

    return (
      <Box
        {...boxProps}
        ref={mergedRef}
        containerWidth={currentWidth}
        $display="grid"
        $gridTemplateColumns={gridTemplateColumns}
        $columnGap={columnGap}
        $rowGap={rowGap}
      >
        {children}
      </Box>
    );
  }
);

SimpleGrid.displayName = 'SimpleGrid';