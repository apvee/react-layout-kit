/**
 * @fileoverview Main entry point for @apvee/react-layout-kit
 * 
 * This file exports all the public API components, utilities, and types
 * for the React Layout Kit library. The exports are organized into
 * sections for better maintainability and developer experience.
 */

// ============================================================================
// CORE LAYOUT COMPONENTS
// ============================================================================

/**
 * Core layout components for building flexible, responsive UIs.
 * These components form the foundation of the layout system.
 */
export { Box } from '@/components/Box';
export { Flex } from '@/components/Flex';
export { Grid } from '@/components/Grid';
export { Stack } from '@/components/Stack';
export { SimpleGrid } from '@/components/SimpleGrid';
export { AreaGrid } from '@/components/AreaGrid';

/**
 * Component composition primitives.
 */
export { Slot, Slottable, useSlot } from '@/core/components';

/**
 * Specialized layout components for common use cases.
 */
export { Container } from '@/components/Container';
export { Center } from '@/components/Center';
export { AspectRatio } from '@/components/AspectRatio';
export { Group } from '@/components/Group';
export { Space } from '@/components/Space';
export { ScrollArea } from '@/components/ScrollArea';

// ============================================================================
// COMPONENT TYPES
// ============================================================================

/**
 * TypeScript interfaces for all layout components.
 * These types enable type-safe usage and IDE autocompletion.
 */
export type { BoxProps, BaseBoxProps } from '@/components/Box';
export type { FlexProps, FlexItemProps } from '@/components/Flex';
export type { GridProps, GridColProps } from '@/components/Grid';
export type { StackProps } from '@/components/Stack';
export type { SimpleGridProps } from '@/components/SimpleGrid';
export type { AreaGridProps, AreaGridItemProps } from '@/components/AreaGrid';
export type { ContainerProps } from '@/components/Container';
export type { CenterProps } from '@/components/Center';
export type { AspectRatioProps } from '@/components/AspectRatio';
export type { GroupProps } from '@/components/Group';
export type { SpaceProps } from '@/components/Space';
export type {
  ScrollAreaProps,
  ScrollAreaSize,
  ScrollAreaRadius,
  ScrollAreaScrollbars,
  ScrollAreaType,
  ScrollAreaDirection,
} from '@/components/ScrollArea';

/**
 * Component composition types.
 */
export type { SlotProps, SlottableProps, SlotComponentType, SlottableComponentType } from '@/core/components';

// ============================================================================
// CONFIGURATION & THEMING
// ============================================================================

/**
 * Configuration functions for customizing the global behavior
 * of the layout system, including breakpoints and spacing scales.
 */
export { configureBox, resetBoxConfig, getBreakpoints, getSpacing } from '@/core/configuration';
export type { BoxConfig } from '@/types';

// ============================================================================
// BUILDING BLOCKS FOR CUSTOM COMPONENTS
// ============================================================================

/**
 * Responsive system utilities for creating custom components
 * that integrate seamlessly with the layout system.
 */
export { resolveResponsiveValue } from '@/core/responsive';
export type { ResponsiveValue } from '@/types';

/**
 * Spacing resolution utility for converting spacing scale keys to CSS values.
 */
export { resolveSpacing } from '@/core/styling';
export type { BreakpointDefs, BreakpointKey, Breakpoints, SpacingDefs, SpacingKey, Spacing } from '@/types';

/**
 * Layout measurement hooks for creating responsive custom components.
 */
export { useElementWidth } from '@/hooks/useElementWidth';
export { useContainerWidth } from '@/hooks/useContainerWidth';

/**
 * React utilities for robust component composition.
 */
export { default as useMergedRef } from '@react-hook/merged-ref';

/**
 * Styling utilities for creating CSS classes and managing styles.
 */
export { createStyles, mergeClasses } from '@/core/styling';

/**
 * Advanced types for extending the layout system.
 * These are primarily for library authors and advanced use cases.
 */
export type { IShortStyleBoxProps } from '@/types';