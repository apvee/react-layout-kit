import { Box } from '@/components/Box';
import { resolveResponsiveValue } from '@/core/responsive';
import useMergedRef from '@react-hook/merged-ref';
import * as React from 'react';
import type { AreaGridItemProps } from './AreaGrid.types';
import { useAreaGridContext } from './AreaGridContext';
import { useAreaGridResolvers } from './hooks/useAreaGridResolvers';

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
export const AreaGridItem = React.forwardRef<HTMLDivElement, AreaGridItemProps>(
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
    const currentAreas = useAreaGridContext();

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
