import { Box } from '@/components/Box';
import { resolveResponsiveValue } from '@/core/responsive';
import { resolveSpacing } from '@/core/styling';
import useMergedRef from '@react-hook/merged-ref';
import * as React from 'react';
import type { FlexProps } from './Flex.types';
import { FlexItem } from './FlexItem';
import { useFlexResolvers } from './hooks/useFlexResolvers';

/**
 * A component that creates a flex container with comprehensive flexbox control.
 * Perfect for composing elements with flexible layouts and responsive behavior.
 * 
 * Uses CSS flexbox properties with full responsive support.
 * All styles are applied via Box component props - no inline styles are used.
 * 
 * **Flexbox Properties:**
 * - `align`: Controls align-items (cross-axis alignment)
 * - `justify`: Controls justify-content (main-axis alignment)
 * - `direction`: Controls flex-direction (row, column, etc.)
 * - `wrap`: Controls flex-wrap (nowrap, wrap, wrap-reverse)
 * - `gap`: Controls gap between all flex items
 * - `rowGap`: Controls gap between rows
 * - `columnGap`: Controls gap between columns
 * 
 * **Responsive Behavior:**
 * - All flex properties support responsive values for different layouts at different breakpoints
 * - Container width measurement is used for responsive prop resolution
 * 
 * @example
 * ```tsx
 * // Basic flex container
 * <Flex>
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 *   <div>Item 3</div>
 * </Flex>
 * 
 * // Centered flex container
 * <Flex align="center" justify="center">
 *   <button>Centered Button</button>
 * </Flex>
 * 
 * // Column layout with gaps
 * <Flex direction="column" gap={'xs'}>
 *   <div>Stack Item 1</div>
 *   <div>Stack Item 2</div>
 *   <div>Stack Item 3</div>
 * </Flex>
 * 
 * // Responsive flex layout
 * <Flex 
 *   direction={{ xs: "column", md: "row" }}
 *   align={{ xs: "stretch", md: "center" }}
 *   justify={{ xs: "flex-start", md: "space-between" }}
 *   gap={{ xs: 8, md: 16 }}
 * >
 *   <div>Responsive Item 1</div>
 *   <div>Responsive Item 2</div>
 * </Flex>
 * 
 * // Advanced gap control
 * <Flex direction="column" rowGap={16} columnGap={8}>
 *   <div>Item with custom gaps</div>
 *   <div>Item with custom gaps</div>
 * </Flex>
 * ```
 */
const Flex = React.forwardRef<HTMLDivElement, FlexProps>(
  function Flex(props, forwardedRef) {
    const {
      align,
      columnGap,
      direction,
      gap,
      justify,
      rowGap,
      wrap,
      containerWidth,
      children,
      ...boxProps
    } = props;

    // Element ref for width measurement
    const elementRef = React.useRef<HTMLDivElement>(null);

    // Use useMergedRef for proper ref management
    const mergedRef = useMergedRef(forwardedRef, elementRef);

    // Get resolution utilities
    const { currentWidth, activeBreakpoints } = useFlexResolvers({
      elementRef,
      containerWidth
    });

    // Resolve responsive values based on current container width
    const resolvedAlign = React.useMemo(() => {
      return align ? resolveResponsiveValue(align, currentWidth, activeBreakpoints) : undefined;
    }, [align, currentWidth, activeBreakpoints]);

    const resolvedColumnGap = React.useMemo(() => {
      if (!columnGap) return undefined;
      const responsiveValue = resolveResponsiveValue(columnGap, currentWidth, activeBreakpoints);
      return responsiveValue ? resolveSpacing(responsiveValue) : undefined;
    }, [columnGap, currentWidth, activeBreakpoints]);

    const resolvedDirection = React.useMemo(() => {
      return direction ? resolveResponsiveValue(direction, currentWidth, activeBreakpoints) : undefined;
    }, [direction, currentWidth, activeBreakpoints]);

    const resolvedGap = React.useMemo(() => {
      if (!gap) return undefined;
      const responsiveValue = resolveResponsiveValue(gap, currentWidth, activeBreakpoints);
      return responsiveValue ? resolveSpacing(responsiveValue) : undefined;
    }, [gap, currentWidth, activeBreakpoints]);

    const resolvedJustify = React.useMemo(() => {
      return justify ? resolveResponsiveValue(justify, currentWidth, activeBreakpoints) : undefined;
    }, [justify, currentWidth, activeBreakpoints]);

    const resolvedRowGap = React.useMemo(() => {
      if (!rowGap) return undefined;
      const responsiveValue = resolveResponsiveValue(rowGap, currentWidth, activeBreakpoints);
      return responsiveValue ? resolveSpacing(responsiveValue) : undefined;
    }, [rowGap, currentWidth, activeBreakpoints]);

    const resolvedWrap = React.useMemo(() => {
      return wrap ? resolveResponsiveValue(wrap, currentWidth, activeBreakpoints) : undefined;
    }, [wrap, currentWidth, activeBreakpoints]);

    return (
      <Box
        {...boxProps}
        ref={mergedRef}
        containerWidth={currentWidth}
        $display="flex"
        $alignItems={resolvedAlign}
        $columnGap={resolvedColumnGap}
        $flexDirection={resolvedDirection}
        $gap={resolvedGap}
        $justifyContent={resolvedJustify}
        $rowGap={resolvedRowGap}
        $flexWrap={resolvedWrap}
      >
        {children}
      </Box>
    );
  }
);

Flex.displayName = 'Flex';

// Type the Flex component with its sub-component properly
interface FlexComponent extends React.ForwardRefExoticComponent<FlexProps & React.RefAttributes<HTMLDivElement>> {
  Item: typeof FlexItem;
}

// Attach FlexItem to Flex as a sub-component with proper typing
const FlexWithItem = Flex as FlexComponent;
FlexWithItem.Item = FlexItem;

// Export the enhanced Flex component with proper typing
export { FlexWithItem as Flex };