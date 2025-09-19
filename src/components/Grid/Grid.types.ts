import type { BaseBoxProps } from '@/components/Box';
import type { ResponsiveValue } from '@/types';
import * as CSS from 'csstype';

/**
 * Props for the Grid component.
 */
export type GridProps = BaseBoxProps & {
  /**
   * align-items CSS property for grid container.
   * Supports responsive values using breakpoint objects.
   * @default "stretch"
   */
  align?: ResponsiveValue<CSS.Property.AlignItems>;

  /**
   * Breakpoints values, only used with type="container".
   * This is currently a placeholder for future container query support.
   */
  breakpoints?: ResponsiveValue<Record<string, string>>;

  /**
   * Number of columns in each row.
   * Supports responsive values using breakpoint objects.
   * @default 12
   */
  columns?: ResponsiveValue<number>;

  /**
   * If set, columns in the last row expand to fill all available space.
   * Supports responsive values using breakpoint objects.
   * @default false
   */
  grow?: ResponsiveValue<boolean>;

  /**
   * Gutter between columns - any valid CSS value.
   * Supports responsive values using breakpoint objects.
   * @default "1rem"
   */
  gutter?: ResponsiveValue<string | number>;

  /**
   * justify-content CSS property for grid container.
   * Supports responsive values using breakpoint objects.
   * @default "flex-start"
   */
  justify?: ResponsiveValue<CSS.Property.JustifyContent>;

  /**
   * overflow CSS property on the root element.
   * Supports responsive values using breakpoint objects.
   * @default "visible"
   */
  overflow?: ResponsiveValue<CSS.Property.Overflow>;
}

/**
 * Props for the Grid.Col component.
 */
export type GridColProps = BaseBoxProps & {
  /**
   * Column offset on the left side – number of columns that are left empty before this column.
   * Supports responsive values using breakpoint objects.
   */
  offset?: ResponsiveValue<number>;

  /**
   * Column order, can be used to reorder columns at different viewport sizes.
   * Supports responsive values using breakpoint objects.
   */
  order?: ResponsiveValue<CSS.Property.Order>;

  /**
   * Column span - number of columns this element should span.
   * Supports responsive values using breakpoint objects.
   * @default 12
   */
  span?: ResponsiveValue<number>;
}