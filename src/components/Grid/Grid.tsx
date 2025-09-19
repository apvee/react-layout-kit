import { Box } from '@/components/Box';
import { resolveResponsiveValue } from '@/core/responsive';
import { getBreakpoints } from '@/core/styling';
import { useElementWidth } from '@/hooks/useElementWidth';
import useMergedRef from '@react-hook/merged-ref';
import * as React from 'react';
import type { GridProps, GridColProps } from './Grid.types';

/**
 * A component that creates a CSS Grid layout with comprehensive grid control.
 * Perfect for creating responsive layouts with configurable columns and gutters.
 * 
 * Uses CSS Grid with display: grid and configurable grid-template-columns.
 * All styles are applied via Box component props - no inline styles are used.
 * 
 * **Grid Properties:**
 * - `columns`: Controls the number of columns in the grid (default: 12)
 * - `gutter`: Controls gap between grid items (default: "1rem")
 * - `align`: Controls align-items (cross-axis alignment)
 * - `justify`: Controls justify-content (main-axis alignment)
 * - `grow`: When true, columns in last row expand to fill space
 * - `overflow`: Controls overflow behavior of the grid container
 * 
 * **Responsive Behavior:**
 * - All grid properties support responsive values for different layouts at different breakpoints
 * - Container width measurement is used for responsive prop resolution
 * 
 * @example
 * ```tsx
 * // Basic grid with default 12 columns
 * <Grid>
 *   <Grid.Col span={4}>Column 1</Grid.Col>
 *   <Grid.Col span={4}>Column 2</Grid.Col>
 *   <Grid.Col span={4}>Column 3</Grid.Col>
 * </Grid>
 * 
 * // Custom column layout with gutter
 * <Grid columns={6} gutter="2rem">
 *   <Grid.Col span={2}>Sidebar</Grid.Col>
 *   <Grid.Col span={4}>Main content</Grid.Col>
 * </Grid>
 * 
 * // Responsive grid layout
 * <Grid 
 *   columns={{ xs: 1, md: 2, lg: 3 }}
 *   gutter={{ xs: "0.5rem", md: "1rem", lg: "1.5rem" }}
 *   align="start"
 *   justify="center"
 * >
 *   <Grid.Col span={{ xs: 1, md: 1, lg: 1 }}>Item 1</Grid.Col>
 *   <Grid.Col span={{ xs: 1, md: 1, lg: 1 }}>Item 2</Grid.Col>
 *   <Grid.Col span={{ xs: 1, md: 2, lg: 1 }}>Item 3</Grid.Col>
 * </Grid>
 * 
 * // Grid with growing columns
 * <Grid grow>
 *   <Grid.Col span={3}>Fixed width</Grid.Col>
 *   <Grid.Col span={3}>Fixed width</Grid.Col>
 *   <Grid.Col span={3}>This will grow to fill remaining space</Grid.Col>
 * </Grid>
 * ```
 */
const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  function Grid(props, forwardedRef) {
    const {
      align = "stretch",
      breakpoints,
      columns = 12,
      grow = false,
      gutter = "1rem",
      justify = "flex-start",
      overflow = "visible",
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
    const resolvedAlign = React.useMemo(() => {
      return resolveResponsiveValue(align, currentWidth, activeBreakpoints) ?? "stretch";
    }, [align, currentWidth, activeBreakpoints]);

    const resolvedColumns = React.useMemo(() => {
      return resolveResponsiveValue(columns, currentWidth, activeBreakpoints) ?? 12;
    }, [columns, currentWidth, activeBreakpoints]);

    const resolvedGrow = React.useMemo(() => {
      return resolveResponsiveValue(grow, currentWidth, activeBreakpoints) ?? false;
    }, [grow, currentWidth, activeBreakpoints]);

    const resolvedGutter = React.useMemo(() => {
      return resolveResponsiveValue(gutter, currentWidth, activeBreakpoints) ?? "1rem";
    }, [gutter, currentWidth, activeBreakpoints]);

    const resolvedJustify = React.useMemo(() => {
      return resolveResponsiveValue(justify, currentWidth, activeBreakpoints) ?? "flex-start";
    }, [justify, currentWidth, activeBreakpoints]);

    const resolvedOverflow = React.useMemo(() => {
      return resolveResponsiveValue(overflow, currentWidth, activeBreakpoints) ?? "visible";
    }, [overflow, currentWidth, activeBreakpoints]);

    // Generate grid template columns based on number of columns
    const gridTemplateColumns = React.useMemo(() => {
      return `repeat(${resolvedColumns}, 1fr)`;
    }, [resolvedColumns]);

    return (
      <Box
        {...boxProps}
        ref={mergedRef}
        containerWidth={currentWidth}
        $display="grid"
        $gridTemplateColumns={gridTemplateColumns}
        $gap={resolvedGutter}
        $alignItems={resolvedAlign}
        $justifyContent={resolvedJustify}
        $overflow={resolvedOverflow}
      >
        {children}
      </Box>
    );
  }
);

Grid.displayName = 'Grid';

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
const GridCol = React.forwardRef<HTMLDivElement, GridColProps>(
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

// Attach GridCol to Grid as a sub-component
(Grid as any).Col = GridCol;

// Type the Grid component with its sub-component
type GridWithCol = typeof Grid & {
  Col: typeof GridCol;
};

// Cast Grid to include the Col component for external usage
const GridWithCol = Grid as GridWithCol;

// Export the enhanced Grid component
export { GridWithCol as Grid };