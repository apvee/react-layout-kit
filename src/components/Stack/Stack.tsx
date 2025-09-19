import * as React from 'react';
import { getBreakpoints, resolveSpacing } from '@/core/styling';
import { resolveResponsiveValue } from '@/core/responsive';
import { useElementWidth } from '@/hooks/useElementWidth';
import { Box } from '@/components/Box';
import useMergedRef from '@react-hook/merged-ref';
import type { StackProps } from './Stack.types';

/**
 * A component that composes elements and components in a vertical flex container.
 * Perfect for creating vertical layouts like forms, card stacks, and content sections.
 * 
 * Uses CSS flexbox with flex-direction: column and configurable properties.
 * All styles are applied via Box component props - no inline styles are used.
 * 
 * **Stack Properties:**
 * - `align`: Controls align-items (cross-axis alignment, default: "stretch")
 * - `gap`: Controls gap between items (default: "m" = 16px)
 * - `justify`: Controls justify-content (main-axis alignment, default: "flex-start")
 * 
 * **Responsive Behavior:**
 * - All properties support responsive values for different layouts at different breakpoints
 * - Container width measurement is used for responsive prop resolution
 * - Gap values can use predefined scale keys ('xs', 's', 'm', 'l', 'xl', 'xxl') or custom CSS values
 * 
 * @example
 * ```tsx
 * // Basic vertical stack
 * <Stack>
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 *   <div>Item 3</div>
 * </Stack>
 * 
 * // With custom gap and alignment
 * <Stack gap="l" align="center" justify="center">
 *   <button>Centered Button</button>
 *   <p>Centered Text</p>
 *   <img src="image.jpg" alt="Centered Image" />
 * </Stack>
 * 
 * // Form layout
 * <Stack gap="m" align="stretch">
 *   <input type="text" placeholder="Name" />
 *   <input type="email" placeholder="Email" />
 *   <textarea placeholder="Message" />
 *   <button>Submit</button>
 * </Stack>
 * 
 * // Responsive behavior
 * <Stack 
 *   gap={{ xs: "s", md: "m", lg: "l" }}
 *   align={{ xs: "center", md: "stretch" }}
 *   justify={{ xs: "center", md: "flex-start" }}
 * >
 *   <div>Responsive Item 1</div>
 *   <div>Responsive Item 2</div>
 *   <div>Responsive Item 3</div>
 * </Stack>
 * 
 * // Card stack
 * <Stack gap="xl" align="center">
 *   <div className="card">Card 1</div>
 *   <div className="card">Card 2</div>
 *   <div className="card">Card 3</div>
 * </Stack>
 * 
 * // Custom gap values
 * <Stack gap="2rem" justify="space-between" style={{ height: '400px' }}>
 *   <header>Header Content</header>
 *   <main>Main Content</main>
 *   <footer>Footer Content</footer>
 * </Stack>
 * ```
 */
export const Stack = React.forwardRef<HTMLDivElement, StackProps>(
  function Stack(props, forwardedRef) {
    const {
      align = "stretch",
      gap = "m",
      justify = "flex-start",
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

    const resolvedGap = React.useMemo(() => {
      const gapValue = resolveResponsiveValue(gap, currentWidth, activeBreakpoints) ?? "m";
      const resolvedSpacingValue = resolveSpacing(gapValue);
      // Convert number to rem if it's a number
      if (typeof resolvedSpacingValue === 'number') {
        return `${resolvedSpacingValue / 16}rem`;
      }
      return resolvedSpacingValue;
    }, [gap, currentWidth, activeBreakpoints]);

    const resolvedJustify = React.useMemo(() => {
      return resolveResponsiveValue(justify, currentWidth, activeBreakpoints) ?? "flex-start";
    }, [justify, currentWidth, activeBreakpoints]);

    return (
      <Box
        {...boxProps}
        ref={mergedRef}
        containerWidth={currentWidth}
        $display="flex"
        $flexDirection="column"
        $alignItems={resolvedAlign}
        $justifyContent={resolvedJustify}
        $gap={resolvedGap}
      >
        {children}
      </Box>
    );
  }
);

Stack.displayName = 'Stack';