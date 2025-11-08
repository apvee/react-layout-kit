import type { IShortStyleBoxProps } from '@/types';
import { isShortProp } from '@/types/short-props';
import { generateCombinedClassName } from '@/core/styling';
import { mergeClasses } from '@/core/styling';
import { useElementWidth } from '@/hooks/useElementWidth';
import { Slot } from '@/core/components';
import useMergedRef from '@react-hook/merged-ref';
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
 * <Box m="m" p="l" w="100%">
 *   Content with spacing scale
 * </Box>
 * 
 * // Responsive values
 * <Box 
 *   $display={{ xs: "block", md: "flex" }}
 *   p={{ xs: "s", md: "m", lg: "l" }}
 * >
 *   Responsive layout
 * </Box>
 * 
 * // Polymorphic with asChild
 * <Box asChild $padding="m">
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

    // Separate dollar props, short props, and regular HTML props with memoization
    const { dollarProps, shortProps, htmlProps } = React.useMemo(() => {
      const dollarProps: Record<string, any> = {};
      const shortProps: Record<string, any> = {};
      const htmlProps: Record<string, any> = {};

      // Use Object.entries for better performance
      for (const [key, value] of Object.entries(rest)) {
        if (key.startsWith('$')) {
          dollarProps[key] = value;
        } else if (isShortProp(key)) {
          shortProps[key] = value;
        } else {
          htmlProps[key] = value;
        }
      }

      return { dollarProps, shortProps, htmlProps };
    }, [rest]);

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
    }, [dollarProps, shortProps, currentWidth, styleReset]);

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