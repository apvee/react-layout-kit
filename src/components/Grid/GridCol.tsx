import { Box } from '@/components/Box';
import { resolveResponsiveValue } from '@/core/responsive';
import useMergedRef from '@react-hook/merged-ref';
import * as React from 'react';
import type { GridColProps } from './Grid.types';
import { useGridResolvers } from './hooks/useGridResolvers';

/**
 * A component that provides grid column properties for children of a Grid container.
 * Perfect for controlling individual grid item behavior with responsive support.
 * 
 * Uses CSS Grid item properties with full responsive support.
 * All styles are applied via Box component props - no inline styles are used.
 * 
 * **Grid Column Properties:**
 * - `span`: Controls how many columns this item spans (default: 12)
 * - `offset`: Controls how many columns to skip before this item
 * - `order`: Controls visual order of grid items
 * 
 * **Responsive Behavior:**
 * - All grid column properties support responsive values for different layouts at different breakpoints
 * - Container width measurement is used for responsive prop resolution
 * 
 * @example
 * ```tsx
 * // Basic grid columns
 * <Grid>
 *   <Grid.Col span={6}>Half width</Grid.Col>
 *   <Grid.Col span={6}>Half width</Grid.Col>
 * </Grid>
 * 
 * // With offset and order
 * <Grid>
 *   <Grid.Col span={4} offset={2} order={2}>Second item (visually)</Grid.Col>
 *   <Grid.Col span={4} order={1}>First item (visually)</Grid.Col>
 * </Grid>
 * 
 * // Responsive grid columns
 * <Grid>
 *   <Grid.Col 
 *     span={{ xs: 12, md: 6, lg: 4 }}
 *     offset={{ xs: 0, md: 0, lg: 2 }}
 *     order={{ xs: 1, md: 2 }}
 *   >
 *     Responsive column
 *   </Grid.Col>
 * </Grid>
 * ```
 */
export const GridCol = React.forwardRef<HTMLDivElement, GridColProps>(
  function GridCol(props, forwardedRef) {
    const {
      offset,
      order,
      span = 12,
      containerWidth,
      children,
      ...boxProps
    } = props;

    // Element ref for width measurement
    const elementRef = React.useRef<HTMLDivElement>(null);

    // Use useMergedRef for proper ref management
    const mergedRef = useMergedRef(forwardedRef, elementRef);

    // Get resolution utilities
    const { currentWidth, activeBreakpoints } = useGridResolvers({
      elementRef,
      containerWidth
    });

    // Resolve responsive values based on current container width
    const resolvedOffset = React.useMemo(() => {
      return resolveResponsiveValue(offset, currentWidth, activeBreakpoints);
    }, [offset, currentWidth, activeBreakpoints]);

    const resolvedOrder = React.useMemo(() => {
      return resolveResponsiveValue(order, currentWidth, activeBreakpoints);
    }, [order, currentWidth, activeBreakpoints]);

    const resolvedSpan = React.useMemo(() => {
      return resolveResponsiveValue(span, currentWidth, activeBreakpoints) ?? 12;
    }, [span, currentWidth, activeBreakpoints]);

    // Calculate grid column start and end based on span and offset
    const gridColumnStart = React.useMemo(() => {
      if (resolvedOffset !== undefined) {
        return resolvedOffset + 1;
      }
      return undefined;
    }, [resolvedOffset]);

    const gridColumnEnd = React.useMemo(() => {
      if (gridColumnStart !== undefined) {
        return gridColumnStart + resolvedSpan;
      }
      return `span ${resolvedSpan}`;
    }, [gridColumnStart, resolvedSpan]);

    return (
      <Box
        {...boxProps}
        ref={mergedRef}
        containerWidth={currentWidth}
        $gridColumnStart={gridColumnStart}
        $gridColumnEnd={gridColumnEnd}
        $order={resolvedOrder}
      >
        {children}
      </Box>
    );
  }
);

GridCol.displayName = 'Grid.Col';
