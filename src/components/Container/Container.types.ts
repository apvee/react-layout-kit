import type { BaseBoxProps } from '@/components/Box';
import type { ResponsiveValue } from '@/types';

/**
 * Props for the Container component.
 * 
 * Extends BaseBoxProps to inherit all Box styling capabilities while adding
 * container-specific properties for layout control and responsive behavior.
 */
export type ContainerProps = BaseBoxProps & {
  /**
   * Maximum width of the container in pixels.
   * Supports responsive values using breakpoint objects.
   * 
   * Controls the maximum width constraint of the container content.
   * The container will automatically center content horizontally using auto margins.
   * 
   * @default 1200
   * 
   * @example
   * ```tsx
   * // Fixed width container
   * <Container size={800}>Content</Container>
   * 
   * // Responsive width container
   * <Container size={{ xs: 320, md: 768, lg: 1200 }}>Content</Container>
   * ```
   */
  size?: ResponsiveValue<number>;

  /**
   * If true, the container uses full width (100%) ignoring the size prop.
   * Supports responsive values using breakpoint objects.
   * 
   * When fluid is true, the container expands to fill its parent container
   * completely, making it useful for full-width layouts or responsive design patterns.
   * 
   * @default false
   * 
   * @example
   * ```tsx
   * // Full-width container
   * <Container fluid>Content spans full width</Container>
   * 
   * // Responsive fluid behavior
   * <Container fluid={{ xs: true, md: false }}>
   *   Content is fluid on mobile, constrained on desktop
   * </Container>
   * ```
   */
  fluid?: ResponsiveValue<boolean>;
}