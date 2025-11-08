import { Box } from '@/components/Box';
import { resolveResponsiveValue } from '@/core/responsive';
import useMergedRef from '@react-hook/merged-ref';
import * as React from 'react';
import type { FlexItemProps } from './Flex.types';
import { useFlexResolvers } from './hooks/useFlexResolvers';

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
export const FlexItem = React.forwardRef<HTMLDivElement, FlexItemProps>(
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

    // Get resolution utilities
    const { currentWidth, activeBreakpoints } = useFlexResolvers({
      elementRef,
      containerWidth
    });

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
