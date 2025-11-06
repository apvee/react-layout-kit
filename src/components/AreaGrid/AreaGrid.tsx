import { Box } from '@/components/Box';
import { resolveResponsiveValue } from '@/core/responsive';
import { resolveSpacing } from '@/core/styling';
import useMergedRef from '@react-hook/merged-ref';
import * as React from 'react';
import type { AreaGridProps, AreaGridItemProps } from './AreaGrid.types';
import { AreaGridContext } from './AreaGridContext';
import { AreaGridItem } from './AreaGridItem';
import { useAreaGridResolvers } from './hooks/useAreaGridResolvers';

/**
 * A component that creates CSS Grid layouts using named grid areas.
 * Perfect for creating semantic layouts with named regions like header, sidebar, main, footer.
 * 
 * Uses CSS Grid with display: grid and grid-template-areas for named area layouts.
 * All styles are applied via Box component props - no inline styles are used.
 * 
 * **AreaGrid Properties:**
 * - `areas`: Defines named grid areas using grid-template-areas
 * - `rows`: Controls grid-template-rows (row sizes)
 * - `columns`: Controls grid-template-columns (column sizes)
 * - `gap`: Controls gap between grid items (default: 0)
 * - `justifyItems`: Controls horizontal alignment of items in their areas (default: "stretch")
 * - `alignItems`: Controls vertical alignment of items in their areas (default: "stretch")
 * - `justifyContent`: Controls horizontal distribution of the grid (default: "stretch")
 * - `alignContent`: Controls vertical distribution of the grid (default: "stretch")
 * 
 * **Responsive Behavior:**
 * - All grid properties support responsive values for different layouts at different breakpoints
 * - Container width measurement is used for responsive prop resolution
 * - Can completely restructure layout at different screen sizes using responsive areas
 * 
 * @example
 * ```tsx
 * // Basic page layout
 * <AreaGrid
 *   areas='"header header header" "sidebar main main" "footer footer footer"'
 *   rows="auto 1fr auto"
 *   columns="200px 1fr 1fr"
 *   gap="m"
 * >
 *   <AreaGrid.Item area="header">Header Content</AreaGrid.Item>
 *   <AreaGrid.Item area="sidebar">Sidebar Content</AreaGrid.Item>
 *   <AreaGrid.Item area="main">Main Content</AreaGrid.Item>
 *   <AreaGrid.Item area="footer">Footer Content</AreaGrid.Item>
 * </AreaGrid>
 * 
 * // Responsive layout
 * <AreaGrid
 *   areas={{
 *     xs: '"header" "main" "sidebar" "footer"',
 *     md: '"header header" "sidebar main" "footer footer"'
 *   }}
 *   rows={{ xs: "auto auto auto auto", md: "auto 1fr auto" }}
 *   columns={{ xs: "1fr", md: "200px 1fr" }}
 *   gap={{ xs: "s", md: "m" }}
 * >
 *   <AreaGrid.Item area="header">Header</AreaGrid.Item>
 *   <AreaGrid.Item area="sidebar">Sidebar</AreaGrid.Item>
 *   <AreaGrid.Item area="main">Main</AreaGrid.Item>
 *   <AreaGrid.Item area="footer">Footer</AreaGrid.Item>
 * </AreaGrid>
 * 
 * // Custom alignment
 * <AreaGrid
 *   areas='"left center right"'
 *   columns="1fr 200px 1fr"
 *   justifyItems="center"
 *   alignItems="center"
 *   gap={16}
 * >
 *   <AreaGrid.Item area="left">Left Content</AreaGrid.Item>
 *   <AreaGrid.Item area="center" justifySelf="stretch">Centered Content</AreaGrid.Item>
 *   <AreaGrid.Item area="right">Right Content</AreaGrid.Item>
 * </AreaGrid>
 * ```
 */
const AreaGrid = React.forwardRef<HTMLDivElement, AreaGridProps>(
  function AreaGrid(props, forwardedRef) {
    const {
      areas,
      rows,
      columns,
      gap = 0,
      justifyItems = "stretch",
      alignItems = "stretch",
      justifyContent = "stretch",
      alignContent = "stretch",
      containerWidth,
      children,
      ...boxProps
    } = props;

    // Element ref for width measurement
    const elementRef = React.useRef<HTMLDivElement>(null);

    // Merge refs using the useMergedRef hook
    const mergedRef = useMergedRef(forwardedRef, elementRef);

    // Get resolution utilities
    const { currentWidth, activeBreakpoints } = useAreaGridResolvers({
      elementRef,
      containerWidth
    });

    // Resolve responsive values based on current container width
    const resolvedAreas = React.useMemo(() => {
      const areasValue = resolveResponsiveValue(areas, currentWidth, activeBreakpoints);
      return areasValue;
    }, [areas, currentWidth, activeBreakpoints]);

    const resolvedRows = React.useMemo(() => {
      return resolveResponsiveValue(rows, currentWidth, activeBreakpoints);
    }, [rows, currentWidth, activeBreakpoints]);

    const resolvedColumns = React.useMemo(() => {
      return resolveResponsiveValue(columns, currentWidth, activeBreakpoints);
    }, [columns, currentWidth, activeBreakpoints]);

    const resolvedGap = React.useMemo(() => {
      const responsiveGap = resolveResponsiveValue(gap, currentWidth, activeBreakpoints) ?? 0;
      return resolveSpacing(responsiveGap);
    }, [gap, currentWidth, activeBreakpoints]);

    const resolvedJustifyItems = React.useMemo(() => {
      return resolveResponsiveValue(justifyItems, currentWidth, activeBreakpoints) ?? "stretch";
    }, [justifyItems, currentWidth, activeBreakpoints]);

    const resolvedAlignItems = React.useMemo(() => {
      return resolveResponsiveValue(alignItems, currentWidth, activeBreakpoints) ?? "stretch";
    }, [alignItems, currentWidth, activeBreakpoints]);

    const resolvedJustifyContent = React.useMemo(() => {
      return resolveResponsiveValue(justifyContent, currentWidth, activeBreakpoints) ?? "stretch";
    }, [justifyContent, currentWidth, activeBreakpoints]);

    const resolvedAlignContent = React.useMemo(() => {
      return resolveResponsiveValue(alignContent, currentWidth, activeBreakpoints) ?? "stretch";
    }, [alignContent, currentWidth, activeBreakpoints]);

    return (
      <AreaGridContext.Provider value={resolvedAreas}>
        <Box
          {...boxProps}
          ref={mergedRef}
          containerWidth={currentWidth}
          $display="grid"
          $gridTemplateAreas={resolvedAreas}
          $gridTemplateRows={resolvedRows}
          $gridTemplateColumns={resolvedColumns}
          $gap={resolvedGap}
          $justifyItems={resolvedJustifyItems}
          $alignItems={resolvedAlignItems}
          $justifyContent={resolvedJustifyContent}
          $alignContent={resolvedAlignContent}
        >
          {children}
        </Box>
      </AreaGridContext.Provider>
    );
  }
);

AreaGrid.displayName = 'AreaGrid';

// Type the AreaGrid component with its sub-component properly
interface AreaGridComponent extends React.ForwardRefExoticComponent<AreaGridProps & React.RefAttributes<HTMLDivElement>> {
  Item: typeof AreaGridItem;
}

// Attach AreaGridItem to AreaGrid as a sub-component with proper typing
const AreaGridWithItem = AreaGrid as AreaGridComponent;
AreaGridWithItem.Item = AreaGridItem;

// Export the enhanced AreaGrid component with proper typing
export { AreaGridWithItem as AreaGrid };