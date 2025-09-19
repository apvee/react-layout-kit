import type { BaseBoxProps } from '@/components/Box';
import type { ResponsiveValue } from '@/types';

/**
 * Props for the AspectRatio component.
 * 
 * Extends BaseBoxProps to inherit all Box styling capabilities while adding
 * aspect ratio-specific properties for maintaining consistent proportions.
 */
export interface AspectRatioProps extends BaseBoxProps {
  /**
   * Aspect ratio as width/height (e.g., 16/9, 4/3).
   * Supports responsive values using breakpoint objects.
   * 
   * Controls the proportional relationship between width and height.
   * The component will maintain this ratio regardless of container size changes.
   * 
   * @default 1
   * 
   * @example
   * ```tsx
   * // Square aspect ratio (1:1)
   * <AspectRatio ratio={1}>
   *   <img src="profile.jpg" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
   * </AspectRatio>
   * 
   * // Widescreen video aspect ratio (16:9)
   * <AspectRatio ratio={16 / 9}>
   *   <video style={{ width: '100%', height: '100%' }} />
   * </AspectRatio>
   * 
   * // Classic photo aspect ratio (4:3)
   * <AspectRatio ratio={4 / 3}>
   *   <img src="landscape.jpg" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
   * </AspectRatio>
   * 
   * // Responsive aspect ratio
   * <AspectRatio ratio={{ xs: 1, md: 16 / 9, lg: 21 / 9 }}>
   *   <iframe src="https://example.com" style={{ width: '100%', height: '100%' }} />
   * </AspectRatio>
   * 
   * // Portrait aspect ratio
   * <AspectRatio ratio={3 / 4}>
   *   <img src="portrait.jpg" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
   * </AspectRatio>
   * ```
   */
  ratio?: ResponsiveValue<number>;
}