import { Box } from '@/components/Box';
import { resolveResponsiveValue } from '@/core/responsive';
import { getBreakpoints, resolveSpacing } from '@/core/styling';
import { useElementWidth } from '@/hooks/useElementWidth';
import useMergedRef from '@react-hook/merged-ref';
import * as React from 'react';
import type { FlexProps, FlexItemProps } from './Flex.types';

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

/**
 * A component that provides flex item properties for children of a Flex container.
 * Perfect for controlling individual flex item behavior with responsive support.
 * 
 * Uses CSS flex item properties with full responsive support.
 * All styles are applied via Box component props - no inline styles are used.
 * 
 * **Flex Item Properties:**
 * - `flex`: Controls flex shorthand (grow, shrink, basis)
 * - `grow`: Controls flex-grow (ability to grow)
 * - `shrink`: Controls flex-shrink (ability to shrink)
 * - `basis`: Controls flex-basis (initial main size)
 * - `alignSelf`: Controls align-self (individual cross-axis alignment)
 * - `order`: Controls order (visual order of flex items)
 * 
 * **Responsive Behavior:**
 * - All flex item properties support responsive values for different layouts at different breakpoints
 * - Container width measurement is used for responsive prop resolution
 * 
 * @example
 * ```tsx
 * // Basic flex items
 * <Flex>
 *   <Flex.Item flex={1}>Grows to fill space</Flex.Item>
 *   <Flex.Item shrink={0}>Fixed width</Flex.Item>
 * </Flex>
 * 
 * // With asChild for semantic HTML
 * <Flex>
 *   <Flex.Item asChild flex={1}>
 *     <main>Main content</main>
 *   </Flex.Item>
 *   <Flex.Item asChild shrink={0}>
 *     <aside>Sidebar</aside>
 *   </Flex.Item>
 * </Flex>
 * 
 * // Responsive flex items
 * <Flex>
 *   <Flex.Item 
 *     flex={{ xs: 1, md: 2 }}
 *     alignSelf={{ xs: "stretch", md: "center" }}
 *     order={{ xs: 2, md: 1 }}
 *   >
 *     Responsive item
 *   </Flex.Item>
 * </Flex>
 * 
 * // Advanced flex control
 * <Flex>
 *   <Flex.Item grow={2} shrink={1} basis="200px">
 *     Custom flex behavior
 *   </Flex.Item>
 * </Flex>
 * ```
 */
const FlexItem = React.forwardRef<HTMLDivElement, FlexItemProps>(
  function FlexItem(props, forwardedRef) {
    const {
      flex,
      grow,
      shrink,
      basis,
      alignSelf,
      order,
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
    const resolvedFlex = React.useMemo(() => {
      return flex ? resolveResponsiveValue(flex, currentWidth, activeBreakpoints) : undefined;
    }, [flex, currentWidth, activeBreakpoints]);

    const resolvedGrow = React.useMemo(() => {
      return grow ? resolveResponsiveValue(grow, currentWidth, activeBreakpoints) : undefined;
    }, [grow, currentWidth, activeBreakpoints]);

    const resolvedShrink = React.useMemo(() => {
      return shrink ? resolveResponsiveValue(shrink, currentWidth, activeBreakpoints) : undefined;
    }, [shrink, currentWidth, activeBreakpoints]);

    const resolvedBasis = React.useMemo(() => {
      return basis ? resolveResponsiveValue(basis, currentWidth, activeBreakpoints) : undefined;
    }, [basis, currentWidth, activeBreakpoints]);

    const resolvedAlignSelf = React.useMemo(() => {
      return alignSelf ? resolveResponsiveValue(alignSelf, currentWidth, activeBreakpoints) : undefined;
    }, [alignSelf, currentWidth, activeBreakpoints]);

    const resolvedOrder = React.useMemo(() => {
      return order ? resolveResponsiveValue(order, currentWidth, activeBreakpoints) : undefined;
    }, [order, currentWidth, activeBreakpoints]);

    return (
      <Box
        {...boxProps}
        ref={mergedRef}
        containerWidth={currentWidth}
        $flex={resolvedFlex}
        $flexGrow={resolvedGrow}
        $flexShrink={resolvedShrink}
        $flexBasis={resolvedBasis}
        $alignSelf={resolvedAlignSelf}
        $order={resolvedOrder}
      >
        {children}
      </Box>
    );
  }
);

FlexItem.displayName = 'Flex.Item';

// Attach FlexItem to FlexContainer as a sub-component
(Flex as any).Item = FlexItem;

// Type the Flex component with its sub-component
type FlexWithItem = typeof Flex & {
  Item: typeof FlexItem;
};

// Cast FlexContainer to include the Item component for external usage
const FlexWithItem = Flex as FlexWithItem;

// Export the enhanced Flex component
export { FlexWithItem as Flex };