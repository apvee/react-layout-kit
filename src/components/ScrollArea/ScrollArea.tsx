import { Box } from '@/components/Box';
import { Slot } from '@/core/components';
import { resolveResponsiveValue } from '@/core/responsive';
import { getBreakpoints } from '@/core/styling';
import { mergeClasses, createStyles } from '@/core/styling';
import { useElementWidth } from '@/hooks/useElementWidth';
import useMergedRef from '@react-hook/merged-ref';
import * as React from 'react';
import type {
  ScrollAreaProps,
  ScrollAreaSize,
} from './ScrollArea.types';
import {
  SIZE_TOKENS,
  RADIUS_TOKENS,
  DEFAULT_COLORS,
} from './ScrollArea.types';
import { useScrollMetrics } from './useScrollMetrics';
import { useScrollbarVisibility } from './useScrollbarVisibility';
import { useThumbDrag } from './useThumbDrag';

/**
 * A flexible scroll area component that provides custom scrollbars with native scrolling behavior.
 * 
 * Features:
 * - Native scroll performance with custom overlay scrollbars
 * - Responsive size support for different screen sizes
 * - Multiple visibility modes (hover, always, scroll)
 * - RTL support for international applications
 * - Customizable colors and styling
 * - Accessible drag interactions with minimum touch targets
 * 
 * @example
 * ```tsx
 * // Basic usage
 * <ScrollArea>
 *   <div style={{ height: 200, width: 300 }}>
 *     Long content that will scroll...
 *   </div>
 * </ScrollArea>
 * 
 * // Responsive size
 * <ScrollArea size={{ sm: "small", lg: "medium" }}>
 *   Content
 * </ScrollArea>
 * 
 * // Custom colors
 * <ScrollArea 
 *   thumbColor="blue" 
 *   thumbHoverColor="darkblue"
 *   type="always"
 * >
 *   Content
 * </ScrollArea>
 * 
 * // As child (composition)
 * <ScrollArea asChild>
 *   <section className="my-scrollable-section">
 *     Content
 *   </section>
 * </ScrollArea>
 * ```
 */
export const ScrollArea = React.forwardRef<HTMLDivElement, ScrollAreaProps>(
  function ScrollArea(props, forwardedRef) {
    const {
      asChild = false,
      size = 'small',
      radius = 'small',
      scrollbars = 'both',
      type = 'hover',
      scrollHideDelay = 600,
      dir = 'ltr',
      trackColor = DEFAULT_COLORS.track,
      thumbColor = DEFAULT_COLORS.thumb,
      thumbHoverColor = DEFAULT_COLORS.thumbHover,
      thumbActiveColor = DEFAULT_COLORS.thumbActive,
      className,
      style,
      children,
      ...restProps
    } = props;

    // Refs for elements
    const containerRef = React.useRef<HTMLDivElement>(null);
    const viewportRef = React.useRef<HTMLDivElement>(null);
    const verticalThumbRef = React.useRef<HTMLDivElement>(null);
    const horizontalThumbRef = React.useRef<HTMLDivElement>(null);

    // Merge refs
    const mergedRef = useMergedRef(forwardedRef, containerRef);

    // Container width for responsive size resolution
    const containerWidth = useElementWidth(containerRef);
    const breakpoints = getBreakpoints();
    const resolvedSize = resolveResponsiveValue(size, containerWidth, breakpoints) as ScrollAreaSize;
    const trackSize = SIZE_TOKENS[resolvedSize];
    const borderRadius = RADIUS_TOKENS[radius];

    // Get scroll metrics
    const {
      scrollMetrics,
      thumbMetrics,
      dragState,
      startDrag,
      updateDrag,
      endDrag,
    } = useScrollMetrics(viewportRef, trackSize);

    // Visibility management
    const {
      visibilityState,
      handlers: visibilityHandlers,
    } = useScrollbarVisibility(type, scrollHideDelay, scrollMetrics);

    // Thumb drag handlers
    const verticalThumbProps = useThumbDrag(
      verticalThumbRef,
      'vertical',
      dragState,
      startDrag,
      updateDrag,
      endDrag,
      thumbMetrics,
      dir
    );

    const horizontalThumbProps = useThumbDrag(
      horizontalThumbRef,
      'horizontal',
      dragState,
      startDrag,
      updateDrag,
      endDrag,
      thumbMetrics,
      dir
    );

    // Determine which scrollbars should be shown based on overflow and settings
    const shouldShowX = React.useMemo(() => {
      if (scrollbars === 'vertical') return false;
      return scrollMetrics.hasOverflowX && visibilityState.visibleX;
    }, [scrollbars, scrollMetrics.hasOverflowX, visibilityState.visibleX]);

    const shouldShowY = React.useMemo(() => {
      if (scrollbars === 'horizontal') return false;
      return scrollMetrics.hasOverflowY && visibilityState.visibleY;
    }, [scrollbars, scrollMetrics.hasOverflowY, visibilityState.visibleY]);

    // Container styles
    const containerStyles = createStyles({
      position: 'relative',
      overflow: 'hidden',
      // Ensure proper stacking context
      isolation: 'isolate',
    });

    // Viewport styles  
    const viewportStyles = createStyles({
      width: '100%',
      height: '100%',
      overflow: 'auto',
      // Hide native scrollbars
      scrollbarWidth: 'none',
      msOverflowStyle: 'none',
      '&::-webkit-scrollbar': {
        display: 'none',
      },
    });

    // Scrollbar track styles
    const getScrollbarStyles = (orientation: 'horizontal' | 'vertical', visible: boolean) => {
      const isHorizontal = orientation === 'horizontal';
      const isRTL = dir === 'rtl';
      
      return createStyles({
        position: 'absolute',
        display: 'flex',
        userSelect: 'none',
        touchAction: 'none',
        backgroundColor: trackColor,
        transition: 'opacity 160ms ease-out',
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? 'auto' : 'none',
        
        // Dimensions and positioning
        ...(isHorizontal ? {
          left: 0,
          bottom: 0,
          right: shouldShowY ? trackSize : 0,
          height: trackSize,
          flexDirection: 'column' as const,
        } : {
          top: 0,
          bottom: shouldShowX ? trackSize : 0,
          width: trackSize,
          flexDirection: 'row' as const,
          // RTL positioning for vertical scrollbar
          ...(isRTL ? { left: 0 } : { right: 0 }),
        }),
        
        // Border radius
        borderRadius: borderRadius,
      });
    };

    // Thumb styles
    const getThumbStyles = (orientation: 'horizontal' | 'vertical') => {
      const isHorizontal = orientation === 'horizontal';
      const thumbSize = isHorizontal ? thumbMetrics.thumbSizeX : thumbMetrics.thumbSizeY;
      const thumbOffset = isHorizontal ? thumbMetrics.thumbOffsetX : thumbMetrics.thumbOffsetY;
      const isRTL = dir === 'rtl';
      const isDraggingThis = dragState.isDragging && 
        dragState.dragAxis === (isHorizontal ? 'x' : 'y');
      
      return createStyles({
        position: 'relative',
        backgroundColor: isDraggingThis ? thumbActiveColor : thumbColor,
        borderRadius: borderRadius,
        transition: dragState.isDragging ? 'none' : 'background-color 160ms ease-out',
        
        // Minimum size for accessibility
        minWidth: isHorizontal ? 44 : trackSize,
        minHeight: isHorizontal ? trackSize : 44,
        
        // Actual size and position
        ...(isHorizontal ? {
          width: thumbSize,
          height: '100%',
          transform: `translateX(${isRTL ? -thumbOffset : thumbOffset}px)`,
        } : {
          width: '100%',
          height: thumbSize,
          transform: `translateY(${thumbOffset}px)`,
        }),
        
        // Hover states (only when not dragging)
        ...(!dragState.isDragging && {
          '&:hover': {
            backgroundColor: thumbHoverColor,
          },
          '&:active': {
            backgroundColor: thumbActiveColor,
          },
        }),
      });
    };

    // Corner styles
    const cornerStyles = createStyles({
      position: 'absolute',
      bottom: 0,
      width: trackSize,
      height: trackSize,
      backgroundColor: trackColor,
      ...(dir === 'rtl' ? { left: 0 } : { right: 0 }),
    });

    // Component to render
    const Component = asChild ? Slot : 'div';

    return (
      <Component
        {...restProps}
        ref={mergedRef}
        className={mergeClasses(containerStyles, className)}
        style={style}
        dir={dir}
        {...visibilityHandlers}
      >
        {/* Viewport */}
        <Box
          ref={viewportRef}
          className={viewportStyles}
          onScroll={visibilityHandlers.onScroll}
        >
          {children}
        </Box>

        {/* Vertical Scrollbar */}
        {(scrollbars === 'both' || scrollbars === 'vertical') && (
          <div
            className={getScrollbarStyles('vertical', shouldShowY)}
            data-orientation="vertical"
            data-state={shouldShowY ? 'visible' : 'hidden'}
          >
            <div
              ref={verticalThumbRef}
              className={getThumbStyles('vertical')}
              aria-hidden="true"
              {...verticalThumbProps}
            />
          </div>
        )}

        {/* Horizontal Scrollbar */}
        {(scrollbars === 'both' || scrollbars === 'horizontal') && (
          <div
            className={getScrollbarStyles('horizontal', shouldShowX)}
            data-orientation="horizontal"
            data-state={shouldShowX ? 'visible' : 'hidden'}
          >
            <div
              ref={horizontalThumbRef}
              className={getThumbStyles('horizontal')}
              aria-hidden="true"
              {...horizontalThumbProps}
            />
          </div>
        )}

        {/* Corner */}
        {shouldShowX && shouldShowY && (
          <div
            className={cornerStyles}
            aria-hidden="true"
          />
        )}
      </Component>
    );
  }
);

ScrollArea.displayName = 'ScrollArea';