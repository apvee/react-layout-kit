import type { ResponsiveValue } from '@/types';
import type * as React from 'react';

/**
 * Supported scroll area sizes that determine track and thumb thickness.
 */
export type ScrollAreaSize = 'small' | 'medium' | 'large';

/**
 * Border radius options for scrollbars and thumbs.
 */
export type ScrollAreaRadius = 'none' | 'small' | 'medium' | 'large' | 'full';

/**
 * Which scrollbars to display when content overflows.
 */
export type ScrollAreaScrollbars = 'vertical' | 'horizontal' | 'both';

/**
 * Scrollbar visibility behavior.
 */
export type ScrollAreaType = 'hover' | 'always' | 'scroll';

/**
 * Text direction for RTL support.
 */
export type ScrollAreaDirection = 'ltr' | 'rtl';

/**
 * Size token mapping for scrollbar dimensions.
 */
export const SIZE_TOKENS = {
  small: 4,
  medium: 8,
  large: 12,
} as const;

/**
 * Radius token mapping for border radius values.
 */
export const RADIUS_TOKENS = {
  none: 0,
  small: 4,
  medium: 8,
  large: 12,
  full: 9999,
} as const;

/**
 * Default color tokens for scrollbar elements.
 */
export const DEFAULT_COLORS = {
  track: 'rgba(0, 0, 0, 0.05)',
  thumb: 'rgba(0, 0, 0, 0.3)',
  thumbHover: 'rgba(0, 0, 0, 0.5)',
  thumbActive: 'rgba(0, 0, 0, 0.7)',
} as const;

/**
 * Scroll area component properties.
 */
export interface ScrollAreaProps {
  /**
   * When true, renders as a child component (composition pattern).
   * @default false
   */
  asChild?: boolean;

  /**
   * Size of the scrollbars (track and thumb thickness).
   * Supports responsive values.
   * @default "small"
   */
  size?: ResponsiveValue<ScrollAreaSize>;

  /**
   * Border radius for scrollbars and thumbs.
   * @default "small"
   */
  radius?: ScrollAreaRadius;

  /**
   * Which scrollbars to show when content overflows.
   * @default "both"
   */
  scrollbars?: ScrollAreaScrollbars;

  /**
   * Scrollbar visibility behavior:
   * - "hover": Show on hover, focus, or scroll; hide after delay
   * - "always": Always visible when content overflows
   * - "scroll": Show while scrolling; hide after delay
   * @default "hover"
   */
  type?: ScrollAreaType;

  /**
   * Delay in milliseconds before hiding scrollbars (for "hover" and "scroll" types).
   * @default 600
   */
  scrollHideDelay?: number;

  /**
   * Text direction for RTL support.
   * @default "ltr"
   */
  dir?: ScrollAreaDirection;

  /**
   * Custom track background color.
   * @default "rgba(0, 0, 0, 0.05)"
   */
  trackColor?: string;

  /**
   * Custom thumb color.
   * @default "rgba(0, 0, 0, 0.3)"
   */
  thumbColor?: string;

  /**
   * Custom thumb hover color.
   * @default "rgba(0, 0, 0, 0.5)"
   */
  thumbHoverColor?: string;

  /**
   * Custom thumb active/pressed color.
   * @default "rgba(0, 0, 0, 0.7)"
   */
  thumbActiveColor?: string;

  /**
   * Additional CSS class name.
   */
  className?: string;

  /**
   * Inline styles for the scroll area container.
   */
  style?: React.CSSProperties;

  /**
   * Content to be scrolled.
   */
  children: React.ReactNode;
}

/**
 * Internal scroll metrics used by the useScrollMetrics hook.
 */
export interface ScrollMetrics {
  /** Whether content overflows horizontally */
  hasOverflowX: boolean;
  /** Whether content overflows vertically */
  hasOverflowY: boolean;
  /** Current horizontal scroll position */
  scrollLeft: number;
  /** Current vertical scroll position */
  scrollTop: number;
  /** Maximum horizontal scroll value */
  scrollWidth: number;
  /** Maximum vertical scroll value */
  scrollHeight: number;
  /** Viewport width */
  viewportWidth: number;
  /** Viewport height */
  viewportHeight: number;
  /** Content width */
  contentWidth: number;
  /** Content height */
  contentHeight: number;
}

/**
 * Calculated thumb dimensions and positions.
 */
export interface ThumbMetrics {
  /** Horizontal thumb size in pixels */
  thumbSizeX: number;
  /** Vertical thumb size in pixels */
  thumbSizeY: number;
  /** Horizontal thumb offset in pixels */
  thumbOffsetX: number;
  /** Vertical thumb offset in pixels */
  thumbOffsetY: number;
  /** Horizontal track size in pixels */
  trackSizeX: number;
  /** Vertical track size in pixels */
  trackSizeY: number;
}

/**
 * Visibility state for scrollbars.
 */
export interface VisibilityState {
  /** Whether horizontal scrollbar is visible */
  visibleX: boolean;
  /** Whether vertical scrollbar is visible */
  visibleY: boolean;
}

/**
 * Drag state for thumb interactions.
 */
export interface DragState {
  /** Whether currently dragging */
  isDragging: boolean;
  /** Which thumb is being dragged */
  dragAxis: 'x' | 'y' | null;
  /** Initial pointer position when drag started */
  startPointerPos: number;
  /** Initial scroll position when drag started */
  startScrollPos: number;
}