import type { BaseBoxProps } from '@/components/Box';
import type { ResponsiveValue, SpacingKey } from '@/types';
import * as React from 'react';
import * as CSS from 'csstype';

/**
 * Props for the AreaGrid component.
 * 
 * Extends BaseBoxProps to inherit all Box styling capabilities while adding
 * CSS Grid area-specific properties for named grid layout management.
 */
export type AreaGridProps = BaseBoxProps & {
  /**
   * Child elements - typically AreaGrid.Item components.
   */
  children?: React.ReactNode;

  /**
   * grid-template-areas CSS property. Defines named grid areas.
   * Each row should be defined as a quoted string within the overall string.
   * Supports responsive values using breakpoint objects.
   * 
   * Uses CSS Grid Template Areas for semantic layout definition.
   * Each area name can be referenced by AreaGrid.Item components.
   * 
   * @example
   * ```tsx
   * // Single row layout
   * <AreaGrid areas='"header main aside"'>
   * 
   * // Multi-row layout
   * <AreaGrid areas='"header header header" "sidebar main main" "footer footer footer"'>
   * 
   * // Responsive layout
   * <AreaGrid areas={{
   *   xs: '"header" "main" "aside" "footer"',
   *   md: '"header header" "main aside" "footer footer"'
   * }}>
   * ```
   */
  areas?: ResponsiveValue<string>;

  /**
   * grid-template-rows CSS property. Defines the size of grid rows.
   * Supports responsive values using breakpoint objects.
   * 
   * Controls the height of each row in the grid template.
   * Works together with `areas` to define the complete grid structure.
   * 
   * @example
   * ```tsx
   * // Fixed heights
   * <AreaGrid rows="100px 1fr 50px">
   * 
   * // Auto-sizing with flexible content
   * <AreaGrid rows="auto 1fr auto">
   * 
   * // Responsive row sizing
   * <AreaGrid rows={{ xs: "auto auto auto auto", md: "auto 1fr auto" }}>
   * ```
   */
  rows?: ResponsiveValue<string>;

  /**
   * grid-template-columns CSS property. Defines the size of grid columns.
   * Supports responsive values using breakpoint objects.
   * 
   * Controls the width of each column in the grid template.
   * Works together with `areas` to define the complete grid structure.
   * 
   * @example
   * ```tsx
   * // Fixed widths
   * <AreaGrid columns="200px 1fr 300px">
   * 
   * // Equal fractions
   * <AreaGrid columns="repeat(3, 1fr)">
   * 
   * // Responsive column sizing
   * <AreaGrid columns={{ xs: "1fr", md: "200px 1fr 300px" }}>
   * ```
   */
  columns?: ResponsiveValue<string>;

  /**
   * gap CSS property. Space between grid items.
   * Supports responsive values using breakpoint objects.
   * 
   * Controls both row-gap and column-gap uniformly.
   * Can use spacing scale values or raw numbers (converted to px).
   * 
   * @default 0
   * 
   * @example
   * ```tsx
   * // Using spacing scale
   * <AreaGrid gap="md">
   * 
   * // Raw number (converted to px)
   * <AreaGrid gap={24}>
   * 
   * // Responsive gap
   * <AreaGrid gap={{ xs: "sm", md: "md", lg: "lg" }}>
   * ```
   */
  gap?: ResponsiveValue<SpacingKey | number>;

  /**
   * justify-items CSS property. Horizontal alignment of items within their grid areas.
   * Supports responsive values using breakpoint objects.
   * 
   * Controls the default horizontal alignment for all grid items.
   * Individual items can override this with `justifySelf`.
   * 
   * @default "stretch"
   * 
   * @example
   * ```tsx
   * // Center all items horizontally
   * <AreaGrid justifyItems="center">
   * 
   * // Responsive alignment
   * <AreaGrid justifyItems={{ xs: "stretch", md: "center" }}>
   * ```
   */
  justifyItems?: ResponsiveValue<CSS.Property.JustifyItems>;

  /**
   * align-items CSS property. Vertical alignment of items within their grid areas.
   * Supports responsive values using breakpoint objects.
   * 
   * Controls the default vertical alignment for all grid items.
   * Individual items can override this with `alignSelf`.
   * 
   * @default "stretch"
   * 
   * @example
   * ```tsx
   * // Center all items vertically
   * <AreaGrid alignItems="center">
   * 
   * // Responsive alignment
   * <AreaGrid alignItems={{ xs: "stretch", md: "start" }}>
   * ```
   */
  alignItems?: ResponsiveValue<CSS.Property.AlignItems>;

  /**
   * justify-content CSS property. Horizontal distribution of the grid within its container.
   * Supports responsive values using breakpoint objects.
   * 
   * Controls how the entire grid is distributed horizontally within its container
   * when the grid is smaller than the container.
   * 
   * @default "stretch"
   * 
   * @example
   * ```tsx
   * // Center the entire grid
   * <AreaGrid justifyContent="center">
   * 
   * // Responsive distribution
   * <AreaGrid justifyContent={{ xs: "stretch", md: "center" }}>
   * ```
   */
  justifyContent?: ResponsiveValue<CSS.Property.JustifyContent>;

  /**
   * align-content CSS property. Vertical distribution of the grid within its container.
   * Supports responsive values using breakpoint objects.
   * 
   * Controls how the entire grid is distributed vertically within its container
   * when the grid is smaller than the container.
   * 
   * @default "stretch"
   * 
   * @example
   * ```tsx
   * // Center the entire grid vertically
   * <AreaGrid alignContent="center">
   * 
   * // Responsive distribution
   * <AreaGrid alignContent={{ xs: "start", md: "center" }}>
   * ```
   */
  alignContent?: ResponsiveValue<CSS.Property.AlignContent>;
}

/**
 * Props for the AreaGrid.Item component.
 * 
 * Extends BaseBoxProps to inherit all Box styling capabilities while adding
 * CSS Grid item-specific properties for area assignment and alignment.
 */
export type AreaGridItemProps = BaseBoxProps & {
  /**
   * Child elements to render within this grid item.
   */
  children?: React.ReactNode;

  /**
   * grid-area CSS property. Assigns the item to a named grid area.
   * Supports responsive values using breakpoint objects.
   * 
   * Must match an area name defined in the parent AreaGrid's `areas` property.
   * If the area doesn't exist in the current layout, the item won't render.
   * 
   * @example
   * ```tsx
   * // Static area assignment
   * <AreaGrid.Item area="header">Header Content</AreaGrid.Item>
   * 
   * // Responsive area assignment
   * <AreaGrid.Item area={{ xs: "main", md: "sidebar" }}>
   *   Content that moves between areas
   * </AreaGrid.Item>
   * ```
   */
  area?: ResponsiveValue<string>;

  /**
   * justify-self CSS property. Horizontal alignment of this item within its grid area.
   * Overrides the container's justify-items for this specific item.
   * Supports responsive values using breakpoint objects.
   * 
   * Controls how this individual item is aligned horizontally within its assigned area.
   * 
   * @example
   * ```tsx
   * // Center this item horizontally
   * <AreaGrid.Item area="header" justifySelf="center">Content</AreaGrid.Item>
   * 
   * // Responsive alignment
   * <AreaGrid.Item area="main" justifySelf={{ xs: "stretch", md: "center" }}>
   *   Content
   * </AreaGrid.Item>
   * ```
   */
  justifySelf?: ResponsiveValue<CSS.Property.JustifySelf>;

  /**
   * align-self CSS property. Vertical alignment of this item within its grid area.
   * Overrides the container's align-items for this specific item.
   * Supports responsive values using breakpoint objects.
   * 
   * Controls how this individual item is aligned vertically within its assigned area.
   * 
   * @example
   * ```tsx
   * // Center this item vertically
   * <AreaGrid.Item area="sidebar" alignSelf="center">Content</AreaGrid.Item>
   * 
   * // Responsive alignment
   * <AreaGrid.Item area="footer" alignSelf={{ xs: "stretch", md: "end" }}>
   *   Content
   * </AreaGrid.Item>
   * ```
   */
  alignSelf?: ResponsiveValue<CSS.Property.AlignSelf>;
}