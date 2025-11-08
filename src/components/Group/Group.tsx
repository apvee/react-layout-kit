import { Box } from '@/components/Box';
import { resolveResponsiveValue } from '@/core/responsive';
import { getBreakpoints, resolveSpacing } from '@/core/styling';
import { useElementWidth } from '@/hooks/useElementWidth';
import useMergedRef from '@react-hook/merged-ref';
import * as React from 'react';
import type { GroupProps } from './Group.types';

/**
 * A component that composes elements and components in a horizontal flex container.
 * Perfect for creating button groups, toolbar layouts, and other horizontal compositions.
 * 
 * Uses CSS flexbox with flex-direction: row and configurable properties.
 * All styles are applied via Box component props - no inline styles are used.
 * 
 * **Group Properties:**
 * - `align`: Controls align-items (cross-axis alignment, default: "center")
 * - `gap`: Controls gap between items (spacing scale key or CSS value, optional)
 * - `grow`: Whether children should flex-grow (default: false)
 * - `justify`: Controls justify-content (main-axis alignment, default: "flex-start")
 * - `preventGrowOverflow`: Prevents children from overflowing by setting max-width (default: true)
 * - `wrap`: Controls flex-wrap behavior (default: "wrap")
 * 
 * **Responsive Behavior:**
 * - All properties support responsive values for different layouts at different breakpoints
 * - Container width measurement is used for responsive prop resolution
 * - Gap values can use predefined scale keys ('xs', 's', 'm', 'l', 'xl', 'xxl') or custom CSS values
 * 
 * @param props - Component props including layout, styling, and responsive options
 * @returns A React element with applied layout styles
 * 
 * @example
 * ```tsx
 * // Basic horizontal group
 * <Group>
 *   <button>Button 1</button>
 *   <button>Button 2</button>
 *   <button>Button 3</button>
 * </Group>
 * 
 * // With custom gap and alignment
 * <Group gap="l" align="stretch" justify="space-between">
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 *   <div>Item 3</div>
 * </Group>
 * 
 * // Growing children
 * <Group grow>
 *   <button>Equal width</button>
 *   <button>Equal width</button>
 *   <button>Equal width</button>
 * </Group>
 * 
 * // Responsive behavior
 * <Group 
 *   gap={{ xs: "s", md: "m", lg: "l" }}
 *   align={{ xs: "stretch", md: "center" }}
 *   justify={{ xs: "center", md: "flex-start" }}
 *   wrap={{ xs: "wrap", md: "nowrap" }}
 * >
 *   <button>Responsive Item 1</button>
 *   <button>Responsive Item 2</button>
 *   <button>Responsive Item 3</button>
 * </Group>
 * 
 * // Custom gap values
 * <Group gap="2rem" preventGrowOverflow={false}>
 *   <span>Custom spacing</span>
 *   <span>No overflow prevention</span>
 * </Group>
 * ```
 */
export const Group = React.forwardRef<HTMLDivElement, GroupProps>(
  function Group(props, forwardedRef) {
    const {
      align = "center",
      gap,
      grow = false,
      justify = "flex-start",
      preventGrowOverflow = true,
      wrap = "wrap",
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

    // Count children for preventGrowOverflow calculation
    const childrenCount = React.useMemo(() => {
      return React.Children.count(children);
    }, [children]);

    // Resolve responsive values based on current container width
    const resolvedAlign = React.useMemo(() => {
      return resolveResponsiveValue(align, currentWidth, activeBreakpoints) ?? "center";
    }, [align, currentWidth, activeBreakpoints]);

    const resolvedGap = React.useMemo(() => {
      if (gap === undefined) return undefined;
      
      const gapValue = resolveResponsiveValue(gap, currentWidth, activeBreakpoints);
      if (gapValue === undefined) return undefined;
      
      const resolvedSpacingValue = resolveSpacing(gapValue);
      // Convert number to rem if it's a number
      if (typeof resolvedSpacingValue === 'number') {
        return `${resolvedSpacingValue / 16}rem`;
      }
      return resolvedSpacingValue;
    }, [gap, currentWidth, activeBreakpoints]);

    const resolvedGrow = React.useMemo(() => {
      return resolveResponsiveValue(grow, currentWidth, activeBreakpoints) ?? false;
    }, [grow, currentWidth, activeBreakpoints]);

    const resolvedJustify = React.useMemo(() => {
      return resolveResponsiveValue(justify, currentWidth, activeBreakpoints) ?? "flex-start";
    }, [justify, currentWidth, activeBreakpoints]);

    const resolvedPreventGrowOverflow = React.useMemo(() => {
      return resolveResponsiveValue(preventGrowOverflow, currentWidth, activeBreakpoints) ?? true;
    }, [preventGrowOverflow, currentWidth, activeBreakpoints]);

    const resolvedWrap = React.useMemo(() => {
      return resolveResponsiveValue(wrap, currentWidth, activeBreakpoints) ?? "wrap";
    }, [wrap, currentWidth, activeBreakpoints]);

    // Create enhanced children with grow and preventGrowOverflow logic
    const enhancedChildren = React.useMemo(() => {
      if (!resolvedGrow && !resolvedPreventGrowOverflow) {
        return children;
      }

      return React.Children.map(children, (child, index) => {
        if (!React.isValidElement(child)) {
          return child;
        }

        const childStyles: React.CSSProperties = {};

        // Apply flex-grow if grow is true
        if (resolvedGrow) {
          childStyles.flexGrow = 1;
        }

        // Apply max-width if preventGrowOverflow is true
        if (resolvedPreventGrowOverflow && childrenCount > 0) {
          childStyles.maxWidth = `${100 / childrenCount}%`;
        }

        // If no styles to apply, return the child as-is
        if (Object.keys(childStyles).length === 0) {
          return child;
        }

        // Clone the child with additional styles
        const existingStyle = (child.props as any).style || {};
        return React.cloneElement(child, {
          ...(child.props as Record<string, any>),
          style: {
            ...existingStyle,
            ...childStyles,
          },
        } as any);
      });
    }, [children, resolvedGrow, resolvedPreventGrowOverflow, childrenCount]);

    return (
      <Box
        {...boxProps}
        ref={mergedRef}
        containerWidth={currentWidth}
        $display="flex"
        $flexDirection="row"
        $alignItems={resolvedAlign}
        $justifyContent={resolvedJustify}
        $flexWrap={resolvedWrap}
        $gap={resolvedGap}
      >
        {enhancedChildren}
      </Box>
    );
  }
);

Group.displayName = 'Group';