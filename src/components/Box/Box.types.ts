import type { DollarCssProps, IShortStyleBoxProps } from '@/types';
import * as React from 'react';

/**
 * Base interface for common Box properties.
 * Extends all standard HTMLDiv attributes including className and style.
 */
export interface BaseBoxProps extends React.HTMLAttributes<HTMLDivElement>, IShortStyleBoxProps {
  /**
   * When true, the Box will render as its child element, merging props and refs.
   * Uses Radix UI Slot for robust prop merging.
   */
  asChild?: boolean;

  /**
   * Fixed container width to use for responsive calculations instead of measuring.
   * When provided, disables automatic width measurement.
   */
  containerWidth?: number;

  /**
   * Whether to apply basic style reset (box-sizing: border-box).
   * @default false
   */
  styleReset?: boolean;
}

/**
 * Props for the Box component.
 */
export type BoxProps = BaseBoxProps & DollarCssProps;