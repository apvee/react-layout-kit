import { Box } from '@/components/Box';
import { resolveResponsiveValue } from '@/core/responsive';
import { getBreakpoints } from '@/core/styling';
import { useElementWidth } from '@/hooks/useElementWidth';
import useMergedRef from '@react-hook/merged-ref';
import * as React from 'react';
import type { AspectRatioProps } from './AspectRatio.types';

/**
 * A component that maintains a constant aspect ratio between width and height.
 * Useful for displaying images, videos, maps, or other media with consistent proportions.
 * 
 * Uses the CSS padding-bottom technique to maintain aspect ratio responsively.
 * All styles are applied via Box component props - no inline styles are used.
 * 
 * **Aspect Ratio Technique:**
 * - Uses padding-bottom percentage to create intrinsic aspect ratio
 * - Creates invisible placeholder element that maintains proportions
 * - Content is positioned absolutely to fill the ratio container
 * - Responsive-friendly and works with any container size
 * 
 * **Responsive Behavior:**
 * - Responsive `ratio` values work only when `containerWidth` is provided
 * - Without `containerWidth`, the first valid key from a responsive object is used as fallback
 * - For full responsive functionality, always provide `containerWidth` or use container queries
 * 
 * @example
 * ```tsx
 * // Basic 16:9 aspect ratio for video content
 * <AspectRatio ratio={16 / 9}>
 *   <img src="video-thumbnail.jpg" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
 * </AspectRatio>
 * 
 * // Square aspect ratio (1:1) for profile images
 * <AspectRatio ratio={1}>
 *   <img src="profile.jpg" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
 * </AspectRatio>
 * 
 * // Classic photo aspect ratio (4:3)
 * <AspectRatio ratio={4 / 3}>
 *   <img src="landscape.jpg" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
 * </AspectRatio>
 * 
 * // Responsive aspect ratio (requires containerWidth for proper responsive behavior)
 * <AspectRatio ratio={{ xs: 1, md: 16 / 9 }} containerWidth={400}>
 *   <video style={{ width: '100%', height: '100%' }} controls />
 * </AspectRatio>
 * 
 * // Without containerWidth, falls back to first valid key (xs: 1 in this case)
 * <AspectRatio ratio={{ xs: 1, md: 4 / 3 }}>
 *   <iframe 
 *     src="https://example.com" 
 *     style={{ width: '100%', height: '100%', border: 'none' }} 
 *   />
 * </AspectRatio>
 * 
 * // Custom width with aspect ratio
 * <AspectRatio ratio={21 / 9} w="500px">
 *   <div style={{ 
 *     width: '100%', 
 *     height: '100%', 
 *     background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4)',
 *     display: 'flex',
 *     alignItems: 'center',
 *     justifyContent: 'center',
 *     color: 'white',
 *     fontSize: '1.5rem'
 *   }}>
 *     Ultrawide Banner
 *   </div>
 * </AspectRatio>
 * ```
 */
export const AspectRatio = React.forwardRef<HTMLDivElement, AspectRatioProps>(
  function AspectRatio(props, forwardedRef) {
    const {
      ratio = 1,
      containerWidth,
      children,
      w,
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

    // Resolve the responsive ratio value based on current container width
    const resolvedRatio = React.useMemo(() => {
      // If containerWidth is provided, use full responsive resolution
      if (containerWidth !== undefined) {
        return resolveResponsiveValue(ratio, currentWidth, activeBreakpoints) ?? 1;
      }
      
      // If no containerWidth is provided and ratio is a responsive object,
      // fall back to the first valid key to avoid circular dependency
      if (typeof ratio === 'object' && ratio !== null) {
        const firstValidValue = Object.values(ratio).find(value => value !== undefined);
        return firstValidValue ?? 1;
      }
      
      // For non-responsive values, use as-is
      return (ratio as number) ?? 1;
    }, [ratio, currentWidth, activeBreakpoints, containerWidth]);

    // Calculate padding-bottom percentage for aspect ratio
    const paddingBottom = React.useMemo(() => {
      return `${(1 / resolvedRatio) * 100}%`;
    }, [resolvedRatio]);

    // Use user-provided width or default to 100%
    const width = w ?? "100%";

    return (
      <Box
        {...boxProps}
        ref={mergedRef}
        containerWidth={currentWidth}
        w={width}
        $position="relative"
      >
        {/* Invisible element to maintain aspect ratio using padding-bottom technique */}
        <Box
          $display="block"
          $width="100%"
          $height={0}
          $paddingBottom={paddingBottom}
        />
        
        {/* Content container positioned absolutely to fill the aspect ratio container */}
        <Box
          $position="absolute"
          $top={0}
          $left={0}
          $right={0}
          $bottom={0}
          $width="100%"
          $height="100%"
        >
          {children}
        </Box>
      </Box>
    );
  }
);

AspectRatio.displayName = 'AspectRatio';