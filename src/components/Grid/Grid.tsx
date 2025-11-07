import { Box } from '@/components/Box';
import { resolveResponsiveValue } from '@/core/responsive';
import { resolveSpacing } from '@/core/styling';
import useMergedRef from '@react-hook/merged-ref';
import * as React from 'react';
import type { GridProps } from './Grid.types';
import { GridCol } from './GridCol';
import { useGridResolvers } from './hooks/useGridResolvers';

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
 * @param props - Component props including layout, styling, and responsive options
 * @returns A React element with applied layout styles
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

    // Get resolution utilities
    const { currentWidth, activeBreakpoints } = useGridResolvers({
      elementRef,
      containerWidth
    });

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
      const rawValue = resolveResponsiveValue(gutter, currentWidth, activeBreakpoints) ?? "1rem";
      // Resolve spacing scale values (xs, sm, md, etc.) to actual CSS values
      // If it's already a CSS string (like "1rem" or "20px"), resolveSpacing will pass it through
      return typeof rawValue === 'string' || typeof rawValue === 'number' 
        ? resolveSpacing(rawValue as any)
        : rawValue;
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

// Type the Grid component with its sub-component properly
interface GridComponent extends React.ForwardRefExoticComponent<GridProps & React.RefAttributes<HTMLDivElement>> {
  Col: typeof GridCol;
}

// Attach GridCol to Grid as a sub-component with proper typing
const GridWithCol = Grid as GridComponent;
GridWithCol.Col = GridCol;

// Export the enhanced Grid component with proper typing
export { GridWithCol as Grid };