import type { IShortStyleBoxProps } from '@/types';
import { isShortProp } from '@/types/short-props';
import { generateCombinedClassName, mergeClasses } from '@/core/styling';
import { useBoxConfigVersion } from '@/core/hooks/useBoxConfigVersion';
import { useElementWidth } from '@/hooks/useElementWidth';
import { Slot } from '@/core/components';
import { useMergedRef } from '@/hooks/useMergedRef';
import * as React from 'react';
import type { BoxProps } from './Box.types';

/**
 * A flexible layout component with responsive CSS-in-JS styling capabilities.
 * The foundational component that all other layout components are built upon.
 * 
 * **Features:**
 * - Type-safe CSS-in-JS styling with dollar props ($display, $margin, etc.)
 * - Short-hand styling props (m, p, w, h, etc.)
 * - Responsive values for breakpoint-based layouts
 * - Polymorphic rendering with `asChild` pattern
 * 
 * @param props - Component props including layout, styling, and responsive options
 * @returns A React element with applied layout styles
 * 
 * @example
 * ```tsx
 * // Basic usage with dollar props
 * <Box $display="flex" $padding="16px" $margin="8px">
 *   Content
 * </Box>
 * 
 * // Using short-hand props
 * <Box m="md" p="lg" w="100%">
 *   Content with spacing scale
 * </Box>
 * 
 * // Responsive values
 * <Box 
 *   $display={{ xs: "block", md: "flex" }}
 *   p={{ xs: "sm", md: "md", lg: "lg" }}
 * >
 *   Responsive layout
 * </Box>
 * 
 * // Polymorphic with asChild
 * <Box asChild p="md">
 *   <button>Renders as button with Box styles</button>
 * </Box>
 * ```
 */
export const Box = React.forwardRef<HTMLDivElement, BoxProps>(
  function Box(props, forwardedRef) {
    const {
      asChild = false,
      containerWidth,
      styleReset = false,
      className,
      children,
      ...rest
    } = props;

    // Rerender when global configuration changes so spacing/breakpoints updates are reflected.
    const boxConfigVersion = useBoxConfigVersion();

    // Separate dollar props, short props, and regular HTML props.
    // Note: `rest` is recreated on every render (destructuring), so memoizing this work is ineffective.
    const dollarProps: Record<string, any> = {};
    const shortProps: Record<string, any> = {};
    const htmlProps: Record<string, any> = {};

    for (const [key, value] of Object.entries(rest)) {
      if (key.startsWith('$')) {
        dollarProps[key] = value;
      } else if (isShortProp(key)) {
        shortProps[key] = value;
      } else {
        htmlProps[key] = value;
      }
    }

    // Element ref for width measurement
    const elementRef = React.useRef<HTMLDivElement>(null);

    // Merge refs using the useMergedRef hook
    const mergedRef = useMergedRef(forwardedRef, elementRef);

    // Get container width - use prop value or measure element
    const measuredWidth = useElementWidth(elementRef, {
      disabled: containerWidth !== undefined
    });
    const currentWidth = containerWidth ?? measuredWidth;

    // Generate CSS class name from both dollar props and short props
    const generatedClassName = React.useMemo(() => {
      return generateCombinedClassName(
        dollarProps,
        shortProps as IShortStyleBoxProps,
        currentWidth,
        styleReset
      );
    }, [dollarProps, shortProps, currentWidth, styleReset, boxConfigVersion]);

    // Merge class names
    const finalClassName = mergeClasses(generatedClassName, className);

    // Component to render
    const Component = asChild ? Slot : 'div';

    return (
      <Component
        {...htmlProps}
        ref={mergedRef}
        className={finalClassName}
      >
        {children}
      </Component>
    );
  }
);

Box.displayName = 'Box';