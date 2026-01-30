import { resolveResponsiveValue } from '@/core/responsive';
import { useResponsiveResolvers } from '@/core/hooks';
import { resolveSpacing } from '@/core/styling';
import { useMergedRef } from '@/hooks/useMergedRef';
import * as React from 'react';
import type { SpaceProps } from './Space.types';
import { Box } from '../Box';

/**
 * A component that adds horizontal or vertical spacing using the theme's spacing scale.
 * This is useful for creating consistent spacing between elements without using margins.
 * 
 * Unlike other components, Space does not extend Box and only provides spacing functionality.
 * It renders as a simple div with width and/or height set to create the desired spacing.
 * 
 * **Space Properties:**
 * - `w`: Horizontal spacing (width)
 * - `h`: Vertical spacing (height)
 * 
 * **Responsive Behavior:**
 * - Both properties support responsive values for different spacing at different breakpoints
 * - Container width measurement is used for responsive prop resolution
 * - Spacing values can use predefined scale keys ('none', 'xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl', 'xxxl') or custom CSS values
 * 
 * @param props - Component props including layout, styling, and responsive options
 * @returns A React element with applied layout styles
 * 
 * @example
 * ```tsx
 * // Horizontal spacing
 * <div style={{ display: 'flex' }}>
 *   <div>Left Content</div>
 *   <Space w="lg" />
 *   <div>Right Content</div>
 * </div>
 * 
 * // Vertical spacing
 * <div>
 *   <div>Top Content</div>
 *   <Space h="md" />
 *   <div>Bottom Content</div>
 * </div>
 * 
 * // Both horizontal and vertical spacing
 * <Space w="xl" h="md" />
 * 
 * // Responsive spacing
 * <Space 
 *   w={{ xs: "sm", md: "md", lg: "lg" }}
 *   h={{ xs: "md", md: "lg" }}
 * />
 * 
 * // Custom spacing values
 * <Space w="3rem" h="2px" />
 * 
 * // In a flex layout for consistent spacing
 * <div style={{ display: 'flex', alignItems: 'center' }}>
 *   <button>Action 1</button>
 *   <Space w="md" />
 *   <button>Action 2</button>
 *   <Space w="md" />
 *   <button>Action 3</button>
 * </div>
 * 
 * // In a vertical layout
 * <div>
 *   <h2>Section Title</h2>
 *   <Space h="lg" />
 *   <p>Section content...</p>
 *   <Space h="xl" />
 *   <h2>Next Section</h2>
 * </div>
 * ```
 */
export const Space = React.forwardRef<HTMLDivElement, SpaceProps>(
  function Space(props, forwardedRef) {
    const {
      w,
      h,
      containerWidth,
    } = props;

    // Element ref for width measurement
    const elementRef = React.useRef<HTMLDivElement>(null);

    // Use useMergedRef for proper ref management
    const mergedRef = useMergedRef(forwardedRef, elementRef);

    // Get resolution utilities
    const { currentWidth, activeBreakpoints } = useResponsiveResolvers({
      elementRef,
      containerWidth
    });

    // Resolve responsive spacing values
    const resolvedWidth = React.useMemo(() => {
      if (w === undefined) return undefined;

      const widthValue = resolveResponsiveValue(w, currentWidth, activeBreakpoints);
      if (widthValue === undefined) return undefined;

      return resolveSpacing(widthValue);
    }, [w, currentWidth, activeBreakpoints]);

    const resolvedHeight = React.useMemo(() => {
      if (h === undefined) return undefined;

      const heightValue = resolveResponsiveValue(h, currentWidth, activeBreakpoints);
      if (heightValue === undefined) return undefined;

      return resolveSpacing(heightValue);
    }, [h, currentWidth, activeBreakpoints]);

    // Only render if at least one dimension is specified
    if (resolvedWidth === undefined && resolvedHeight === undefined) {
      return null;
    }

    return (
      <Box
        ref={mergedRef}
        $width={resolvedWidth || undefined}
        $height={resolvedHeight || undefined}
        $flexShrink={0} // Prevent the spacer from shrinking in flex containers
      />
    );
  }
);

Space.displayName = 'Space';