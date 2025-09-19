import { Box } from '@/components/Box';
import { resolveResponsiveValue } from '@/core/responsive';
import { getBreakpoints, resolveSpacing } from '@/core/styling';
import { useElementWidth } from '@/hooks/useElementWidth';
import useMergedRef from '@react-hook/merged-ref';
import * as React from 'react';
import type { AreaGridProps, AreaGridItemProps } from './AreaGrid.types';

// Context for sharing defined areas between AreaGrid and AreaGrid.Item
const AreaGridContext = React.createContext<string | undefined>(undefined);

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

/**
 * A component that positions itself in a named grid area within an AreaGrid container.
 * Perfect for semantic layout items like header, sidebar, main content, footer.
 * 
 * Uses CSS Grid item properties with full responsive support.
 * All styles are applied via Box component props - no inline styles are used.
 * 
 * **AreaGrid Item Properties:**
 * - `area`: Assigns this item to a named grid area
 * - `justifySelf`: Controls horizontal alignment of this item within its area
 * - `alignSelf`: Controls vertical alignment of this item within its area
 * 
 * **Responsive Behavior:**
 * - All grid item properties support responsive values for different layouts at different breakpoints
 * - Container width measurement is used for responsive prop resolution
 * - Can move between different named areas at different screen sizes
 * 
 * @example
 * ```tsx
 * // Basic area assignment
 * <AreaGrid areas='"header main footer"' rows="auto 1fr auto">
 *   <AreaGrid.Item area="header">Header Content</AreaGrid.Item>
 *   <AreaGrid.Item area="main">Main Content</AreaGrid.Item>
 *   <AreaGrid.Item area="footer">Footer Content</AreaGrid.Item>
 * </AreaGrid>
 * 
 * // With custom alignment
 * <AreaGrid areas='"left center right"' columns="1fr 1fr 1fr">
 *   <AreaGrid.Item area="left" justifySelf="start">Left Aligned</AreaGrid.Item>
 *   <AreaGrid.Item area="center" justifySelf="center">Centered</AreaGrid.Item>
 *   <AreaGrid.Item area="right" justifySelf="end">Right Aligned</AreaGrid.Item>
 * </AreaGrid>
 * 
 * // Responsive area assignment
 * <AreaGrid 
 *   areas={{ xs: '"header" "main" "aside"', md: '"header header" "main aside"' }}
 *   rows={{ xs: "auto auto auto", md: "auto 1fr" }}
 *   columns={{ xs: "1fr", md: "1fr 300px" }}
 * >
 *   <AreaGrid.Item area="header">Header</AreaGrid.Item>
 *   <AreaGrid.Item area="main">Main Content</AreaGrid.Item>
 *   <AreaGrid.Item area={{ xs: "aside", md: "aside" }} alignSelf="start">
 *     Sidebar Content
 *   </AreaGrid.Item>
 * </AreaGrid>
 * ```
 */
const AreaGridItem = React.forwardRef<HTMLDivElement, AreaGridItemProps>(
  function AreaGridItem(props, forwardedRef) {
    const {
      area,
      justifySelf,
      alignSelf,
      containerWidth,
      children,
      ...boxProps
    } = props;

    // Get current grid areas from context
    const currentAreas = React.useContext(AreaGridContext);

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

    // Resolve responsive values based on current container width
    const resolvedArea = React.useMemo(() => {
      return resolveResponsiveValue(area, currentWidth, activeBreakpoints);
    }, [area, currentWidth, activeBreakpoints]);

    const resolvedJustifySelf = React.useMemo(() => {
      return resolveResponsiveValue(justifySelf, currentWidth, activeBreakpoints);
    }, [justifySelf, currentWidth, activeBreakpoints]);

    const resolvedAlignSelf = React.useMemo(() => {
      return resolveResponsiveValue(alignSelf, currentWidth, activeBreakpoints);
    }, [alignSelf, currentWidth, activeBreakpoints]);

    // Check if the resolved area exists in the current grid areas
    // If no area is defined or the area doesn't exist in current layout, don't render
    const shouldRender = React.useMemo(() => {
      if (!resolvedArea || !currentAreas) {
        return false;
      }
      // Check if the area name exists in the grid-template-areas string
      return currentAreas.includes(resolvedArea);
    }, [resolvedArea, currentAreas]);

    // Don't render if area is not defined in current layout
    if (!shouldRender) {
      return null;
    }

    return (
      <Box
        {...boxProps}
        ref={mergedRef}
        containerWidth={currentWidth}
        $gridArea={resolvedArea}
        $justifySelf={resolvedJustifySelf}
        $alignSelf={resolvedAlignSelf}
      >
        {children}
      </Box>
    );
  }
);

AreaGridItem.displayName = 'AreaGrid.Item';

// Attach AreaGridItem to AreaGrid as a sub-component
(AreaGrid as any).Item = AreaGridItem;

// Type the AreaGrid component with its sub-component
type AreaGridWithItem = typeof AreaGrid & {
  Item: typeof AreaGridItem;
};

// Cast AreaGrid to include the Item component for external usage
const AreaGridWithItem = AreaGrid as AreaGridWithItem;

// Export the enhanced AreaGrid component
export { AreaGridWithItem as AreaGrid };