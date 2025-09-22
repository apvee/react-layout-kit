import { useCallback, useEffect, useRef, useState } from 'react';
import type { ScrollAreaType, ScrollMetrics, ThumbMetrics, VisibilityState } from './ScrollArea.types';

/**
 * Minimum thumb size in pixels for accessibility (44px minimum touch target).
 */
const MIN_THUMB_SIZE = 44;

/**
 * Unified hook for managing all ScrollArea functionality.
 * Consolidates scroll metrics, visibility management, and drag interactions.
 */
export function useScrollArea(
  viewportRef: React.RefObject<HTMLElement>,
  trackSize: number,
  type: ScrollAreaType,
  scrollHideDelay: number,
  disabled: boolean = false
) {
  // Combined state for all scroll area functionality
  const [state, setState] = useState({
    // Scroll metrics
    hasOverflowX: false,
    hasOverflowY: false,
    scrollLeft: 0,
    scrollTop: 0,
    scrollWidth: 0,
    scrollHeight: 0,
    viewportWidth: 0,
    viewportHeight: 0,
    contentWidth: 0,
    contentHeight: 0,
    
    // Visibility state
    visibleX: type === 'always',
    visibleY: type === 'always',
    
    // Drag state
    isDragging: false,
    dragAxis: null as 'x' | 'y' | null,
    startPointerPos: 0,
    startScrollPos: 0,
  });

  // Refs for optimization
  const rafIdRef = useRef<number>();
  const resizeObserverRef = useRef<ResizeObserver>();
  const hideTimerRef = useRef<number>();

  /**
   * Calculate thumb metrics from current state.
   */
  const getThumbMetrics = useCallback((): ThumbMetrics => {
    const {
      viewportWidth,
      viewportHeight,
      contentWidth,
      contentHeight,
      scrollLeft,
      scrollTop,
    } = state;

    const trackSizeX = viewportWidth - trackSize;
    const trackSizeY = viewportHeight - trackSize;
    const scrollRangeX = Math.max(0, contentWidth - viewportWidth);
    const scrollRangeY = Math.max(0, contentHeight - viewportHeight);

    const thumbSizeX = scrollRangeX > 0 
      ? Math.max(MIN_THUMB_SIZE, (viewportWidth / contentWidth) * trackSizeX)
      : trackSizeX;
    
    const thumbSizeY = scrollRangeY > 0
      ? Math.max(MIN_THUMB_SIZE, (viewportHeight / contentHeight) * trackSizeY)
      : trackSizeY;

    const thumbOffsetX = scrollRangeX > 0
      ? (scrollLeft / scrollRangeX) * (trackSizeX - thumbSizeX)
      : 0;
    
    const thumbOffsetY = scrollRangeY > 0
      ? (scrollTop / scrollRangeY) * (trackSizeY - thumbSizeY)
      : 0;

    return {
      thumbSizeX,
      thumbSizeY,
      thumbOffsetX,
      thumbOffsetY,
      trackSizeX,
      trackSizeY,
    };
  }, [state, trackSize]);

  /**
   * Update scroll metrics from viewport element.
   */
  const updateMetrics = useCallback(() => {
    if (disabled || !viewportRef.current) return;

    const viewport = viewportRef.current;
    const firstChild = viewport.firstElementChild as HTMLElement;
    if (!firstChild) return;

    setState(prev => ({
      ...prev,
      hasOverflowX: viewport.scrollWidth > viewport.clientWidth,
      hasOverflowY: viewport.scrollHeight > viewport.clientHeight,
      scrollLeft: viewport.scrollLeft,
      scrollTop: viewport.scrollTop,
      scrollWidth: viewport.scrollWidth - viewport.clientWidth,
      scrollHeight: viewport.scrollHeight - viewport.clientHeight,
      viewportWidth: viewport.clientWidth,
      viewportHeight: viewport.clientHeight,
      contentWidth: viewport.scrollWidth,
      contentHeight: viewport.scrollHeight,
    }));
  }, [disabled, viewportRef]);

  /**
   * Show scrollbars and clear hide timer.
   */
  const showScrollbars = useCallback(() => {
    if (hideTimerRef.current) {
      clearTimeout(hideTimerRef.current);
      hideTimerRef.current = undefined;
    }
    
    if (type !== 'always') {
      setState(prev => ({
        ...prev,
        visibleX: prev.hasOverflowX,
        visibleY: prev.hasOverflowY,
      }));
    }
  }, [type]);

  /**
   * Schedule hiding scrollbars after delay.
   */
  const scheduleHide = useCallback(() => {
    if (type === 'always') return;
    
    if (hideTimerRef.current) {
      clearTimeout(hideTimerRef.current);
    }
    
    hideTimerRef.current = window.setTimeout(() => {
      setState(prev => ({
        ...prev,
        visibleX: false,
        visibleY: false,
      }));
    }, scrollHideDelay);
  }, [type, scrollHideDelay]);

  /**
   * Handle scroll events with RAF throttling.
   */
  const handleScroll = useCallback(() => {
    if (rafIdRef.current) {
      cancelAnimationFrame(rafIdRef.current);
    }
    
    rafIdRef.current = requestAnimationFrame(() => {
      updateMetrics();
      
      if (type === 'scroll' || type === 'hover') {
        showScrollbars();
        scheduleHide();
      }
    });
  }, [updateMetrics, type, showScrollbars, scheduleHide]);

  /**
   * Unified interaction handlers.
   */
  const handleInteraction = useCallback((action: 'show' | 'hide') => {
    if (action === 'show') {
      showScrollbars();
    } else if (type === 'hover') {
      scheduleHide();
    }
  }, [showScrollbars, scheduleHide, type]);

  /**
   * Start thumb drag.
   */
  const startDrag = useCallback((axis: 'x' | 'y', pointerPos: number) => {
    if (!viewportRef.current) return;

    const viewport = viewportRef.current;
    const startScrollPos = axis === 'x' ? viewport.scrollLeft : viewport.scrollTop;

    setState(prev => ({
      ...prev,
      isDragging: true,
      dragAxis: axis,
      startPointerPos: pointerPos,
      startScrollPos,
    }));

    // Prevent text selection
    document.body.style.userSelect = 'none';
    document.body.style.webkitUserSelect = 'none';
  }, [viewportRef]);

  /**
   * Update drag position.
   */
  const updateDrag = useCallback((pointerPos: number) => {
    if (!state.isDragging || !state.dragAxis || !viewportRef.current) return;

    const viewport = viewportRef.current;
    const delta = pointerPos - state.startPointerPos;
    const thumbMetrics = getThumbMetrics();

    if (state.dragAxis === 'x') {
      const { trackSizeX, thumbSizeX } = thumbMetrics;
      const scrollRange = viewport.scrollWidth - viewport.clientWidth;
      const trackRange = trackSizeX - thumbSizeX;
      const scrollDelta = trackRange > 0 ? (delta / trackRange) * scrollRange : 0;
      viewport.scrollLeft = Math.max(0, Math.min(scrollRange, state.startScrollPos + scrollDelta));
    } else {
      const { trackSizeY, thumbSizeY } = thumbMetrics;
      const scrollRange = viewport.scrollHeight - viewport.clientHeight;
      const trackRange = trackSizeY - thumbSizeY;
      const scrollDelta = trackRange > 0 ? (delta / trackRange) * scrollRange : 0;
      viewport.scrollTop = Math.max(0, Math.min(scrollRange, state.startScrollPos + scrollDelta));
    }
  }, [state.isDragging, state.dragAxis, state.startPointerPos, state.startScrollPos, viewportRef, getThumbMetrics]);

  /**
   * End drag interaction.
   */
  const endDrag = useCallback(() => {
    setState(prev => ({
      ...prev,
      isDragging: false,
      dragAxis: null,
      startPointerPos: 0,
      startScrollPos: 0,
    }));

    // Restore text selection
    document.body.style.userSelect = '';
    document.body.style.webkitUserSelect = '';
  }, []);

  /**
   * Get event handlers for thumbs.
   */
  const getThumbHandlers = useCallback((orientation: 'horizontal' | 'vertical', dir: 'ltr' | 'rtl' = 'ltr') => {
    const isHorizontal = orientation === 'horizontal';
    const axis = isHorizontal ? 'x' : 'y';
    const isThisDragging = state.isDragging && state.dragAxis === axis;

    return {
      onPointerDown: (event: React.PointerEvent) => {
        if (event.button !== 0) return;
        event.preventDefault();
        event.stopPropagation();

        const thumb = event.currentTarget as HTMLElement;
        thumb.setPointerCapture(event.pointerId);

        const pointerPos = isHorizontal 
          ? (dir === 'rtl' ? -event.clientX : event.clientX)
          : event.clientY;

        startDrag(axis, pointerPos);
      },
      
      onPointerMove: (event: React.PointerEvent) => {
        if (!isThisDragging) return;
        event.preventDefault();

        const pointerPos = isHorizontal 
          ? (dir === 'rtl' ? -event.clientX : event.clientX)
          : event.clientY;

        updateDrag(pointerPos);
      },
      
      onPointerUp: (event: React.PointerEvent) => {
        if (!isThisDragging) return;
        event.preventDefault();
        
        const thumb = event.currentTarget as HTMLElement;
        thumb.releasePointerCapture(event.pointerId);
        endDrag();
      },
      
      onLostPointerCapture: () => {
        if (isThisDragging) endDrag();
      },
      
      style: {
        cursor: isThisDragging ? (isHorizontal ? 'ew-resize' : 'ns-resize') : 'pointer',
        touchAction: 'none' as const,
      },
      
      'data-dragging': isThisDragging ? 'true' : 'false',
    };
  }, [state.isDragging, state.dragAxis, startDrag, updateDrag, endDrag]);

  /**
   * Setup ResizeObserver and scroll listener.
   */
  useEffect(() => {
    if (disabled || !viewportRef.current) return;

    const viewport = viewportRef.current;
    
    // Setup ResizeObserver
    resizeObserverRef.current = new ResizeObserver(handleScroll);
    resizeObserverRef.current.observe(viewport);
    
    const firstChild = viewport.firstElementChild;
    if (firstChild) {
      resizeObserverRef.current.observe(firstChild);
    }

    // Setup scroll listener
    viewport.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial update
    updateMetrics();

    return () => {
      viewport.removeEventListener('scroll', handleScroll);
      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect();
      }
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
      if (hideTimerRef.current) {
        clearTimeout(hideTimerRef.current);
      }
    };
  }, [disabled, viewportRef, handleScroll, updateMetrics]);

  /**
   * Update visibility when type or overflow changes.
   */
  useEffect(() => {
    if (type === 'always') {
      setState(prev => ({
        ...prev,
        visibleX: prev.hasOverflowX,
        visibleY: prev.hasOverflowY,
      }));
    }
  }, [type, state.hasOverflowX, state.hasOverflowY]);

  /**
   * Cleanup on unmount.
   */
  useEffect(() => {
    return () => {
      document.body.style.userSelect = '';
      document.body.style.webkitUserSelect = '';
    };
  }, []);

  return {
    // Scroll metrics
    scrollMetrics: {
      hasOverflowX: state.hasOverflowX,
      hasOverflowY: state.hasOverflowY,
      scrollLeft: state.scrollLeft,
      scrollTop: state.scrollTop,
      scrollWidth: state.scrollWidth,
      scrollHeight: state.scrollHeight,
      viewportWidth: state.viewportWidth,
      viewportHeight: state.viewportHeight,
      contentWidth: state.contentWidth,
      contentHeight: state.contentHeight,
    } as ScrollMetrics,
    
    // Thumb metrics
    thumbMetrics: getThumbMetrics(),
    
    // Visibility state
    visibilityState: {
      visibleX: state.visibleX,
      visibleY: state.visibleY,
    } as VisibilityState,
    
    // Drag state
    isDragging: state.isDragging,
    
    // Event handlers
    containerHandlers: {
      onMouseEnter: () => handleInteraction('show'),
      onMouseLeave: () => handleInteraction('hide'),
      onFocus: () => handleInteraction('show'),
      onBlur: () => handleInteraction('hide'),
    },
    
    viewportHandlers: {
      onScroll: handleScroll,
    },
    
    getThumbHandlers,
  };
}