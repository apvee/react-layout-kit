import type { BaseBoxProps } from '@/components/Box';
import type { ResponsiveValue } from '@/types';

/**
 * Props for the Center component.
 */
export type CenterProps = BaseBoxProps & {
  /**
   * If set, inline-flex is used instead of flex.
   * Supports responsive values using breakpoint objects.
   * @default false
   */
  inline?: ResponsiveValue<boolean>;
}