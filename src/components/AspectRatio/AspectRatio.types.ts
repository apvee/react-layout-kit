import type { BaseBoxProps } from '@/components/Box';
import type { ResponsiveValue } from '@/types';

/**
 * Props for the AspectRatio component.
 * 
 * Extends BaseBoxProps to inherit all Box styling capabilities while adding
 * aspect ratio-specific properties for maintaining consistent proportions.
 * 
 * **Important:** Only accepts a single React element as children. Multiple children,
 * strings, numbers, or fragments are not supported and will cause runtime/TypeScript errors.
 */
export interface AspectRatioProps extends Omit<BaseBoxProps, 'children'> {
  /**
   * Single child element that will fill the aspect ratio container.
   * The child will automatically receive width: '100%' and height: '100%' styles.
   * 
   * Must be a valid React element - strings, numbers, or fragments are not allowed.
   * For multiple children, wrap them in a single container element.
   * 
   * @example
   * ```tsx
   * // ✅ Correct - single element
   * <AspectRatio ratio={16/9}>
   *   <img src="..." />
   * </AspectRatio>
   * 
   * // ✅ Correct - multiple children wrapped
   * <AspectRatio ratio={16/9}>
   *   <div>
   *     <img src="..." />
   *     <div>Overlay</div>
   *   </div>
   * </AspectRatio>
   * 
   * // ❌ Incorrect - multiple children
   * <AspectRatio ratio={16/9}>
   *   <img src="..." />
   *   <div>Overlay</div>
   * </AspectRatio>
   * 
   * // ❌ Incorrect - string child
   * <AspectRatio ratio={16/9}>
   *   Text content
   * </AspectRatio>
   * ```
   */
  children: React.ReactElement;
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
   *   <img src="profile.jpg" style={{ objectFit: 'cover' }} />
   * </AspectRatio>
   * 
   * // Widescreen video aspect ratio (16:9)
   * <AspectRatio ratio={16 / 9}>
   *   <video controls />
   * </AspectRatio>
   * 
   * // Classic photo aspect ratio (4:3)
   * <AspectRatio ratio={4 / 3}>
   *   <img src="landscape.jpg" style={{ objectFit: 'cover' }} />
   * </AspectRatio>
   * 
   * // Responsive aspect ratio
   * <AspectRatio ratio={{ xs: 1, md: 16 / 9, lg: 21 / 9 }}>
   *   <iframe src="https://example.com" style={{ border: 'none' }} />
   * </AspectRatio>
   * 
   * // Portrait aspect ratio
   * <AspectRatio ratio={3 / 4}>
   *   <img src="portrait.jpg" style={{ objectFit: 'cover' }} />
   * </AspectRatio>
   * ```
   */
  ratio?: ResponsiveValue<number>;
}