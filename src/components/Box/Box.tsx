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
 * 
 * Features:
 * - All CSS properties available as $-prefixed props (e.g., $display, $padding)
 * - Responsive values using breakpoint objects
 * - Automatic container width measurement or manual specification
 * - asChild prop for composition patterns
 * - TypeScript support with full CSS property typing
 * 
 * @example
 * ```tsx
 * // Basic usage
 * <Box $display="flex" $gap={8} $padding={16}>
 *   Content
 * </Box>
 * 
 * // Responsive values
 * <Box $padding={{ xs: 8, md: 16, lg: 24 }} $fontSize={{ sm: 14, lg: 16 }}>
 *   Responsive content
 * </Box>
 * 
 * // As child (composition)
 * <Box asChild $borderRadius={8} $backgroundColor="blue">
 *   <button onClick={handleClick}>Styled Button</button>
 * </Box>
 * 
 * // With fixed container width
 * <Box containerWidth={500} $padding={{ xs: 8, md: 16 }}>
 *   Fixed width container
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