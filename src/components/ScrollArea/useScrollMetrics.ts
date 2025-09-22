import { useCallback, useEffect, useRef, useState } from 'react';
import type { ScrollMetrics, ThumbMetrics, DragState } from './ScrollArea.types';

/**
 * Minimum thumb size in pixels for accessibility (44px minimum touch target).
 */
const MIN_THUMB_SIZE = 44;

/**
 * Custom hook for managing scroll area metrics, thumb calculations, and interactions.
 * 
 * @param viewportRef - Ref to the viewport element
 * @param trackSize - Current track size in pixels (responsive)
 * @param disabled - Whether scroll measurement is disabled
 * @returns Scroll metrics, thumb metrics, and event handlers
 */
export function useScrollMetrics(
  viewportRef: React.RefObject<HTMLElement>,
  trackSize: number,
  disabled: boolean = false
) {
  const [scrollMetrics, setScrollMetrics] = useState<ScrollMetrics>({
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
  });

  const [dragState, setDragState] = useState<DragState>({
    isDragging: false,
    dragAxis: null,
    startPointerPos: 0,
    startScrollPos: 0,
  });

  // RAF throttling for scroll events
  const rafIdRef = useRef<number>();
  const resizeObserverRef = useRef<ResizeObserver>();

  /**
   * Calculate thumb metrics based on current scroll state.
   */
  const calculateThumbMetrics = useCallback((metrics: ScrollMetrics): ThumbMetrics => {
    const {
      viewportWidth,
      viewportHeight,
      contentWidth,
      contentHeight,
      scrollLeft,
      scrollTop,
    } = metrics;

    // Calculate track sizes (excluding the track thickness)
    const trackSizeX = viewportWidth - trackSize;
    const trackSizeY = viewportHeight - trackSize;

    // Calculate scroll ranges
    const scrollRangeX = Math.max(0, contentWidth - viewportWidth);
    const scrollRangeY = Math.max(0, contentHeight - viewportHeight);

    // Calculate thumb sizes
    const thumbSizeX = scrollRangeX > 0 
      ? Math.max(MIN_THUMB_SIZE, (viewportWidth / contentWidth) * trackSizeX)
      : trackSizeX;
    
    const thumbSizeY = scrollRangeY > 0
      ? Math.max(MIN_THUMB_SIZE, (viewportHeight / contentHeight) * trackSizeY)
      : trackSizeY;

    // Calculate thumb positions
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
  }, [trackSize]);

  /**
   * Update scroll metrics from viewport element.
   */
  const updateScrollMetrics = useCallback(() => {
    if (disabled || !viewportRef.current) {
      return;
    }

    const viewport = viewportRef.current;
    const firstChild = viewport.firstElementChild as HTMLElement;

    if (!firstChild) {
      return;
    }

    const viewportRect = viewport.getBoundingClientRect();
    const contentRect = firstChild.getBoundingClientRect();

    const newMetrics: ScrollMetrics = {
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
    };

    setScrollMetrics(newMetrics);
  }, [disabled, viewportRef]);

  /**
   * Throttled scroll handler using RAF.
   */
  const handleScroll = useCallback(() => {
    if (rafIdRef.current) {
      cancelAnimationFrame(rafIdRef.current);
    }

    rafIdRef.current = requestAnimationFrame(updateScrollMetrics);
  }, [updateScrollMetrics]);

  /**
   * Handle thumb drag for horizontal scrollbar.
   */
  const handleThumbDragX = useCallback((deltaX: number, thumbMetrics: ThumbMetrics) => {
    if (!viewportRef.current) return;

    const viewport = viewportRef.current;
    const { trackSizeX, thumbSizeX } = thumbMetrics;
    const scrollRange = viewport.scrollWidth - viewport.clientWidth;
    
    if (scrollRange <= 0) return;

    const trackRange = trackSizeX - thumbSizeX;
    const scrollDelta = trackRange > 0 ? (deltaX / trackRange) * scrollRange : 0;
    
    viewport.scrollLeft = Math.max(0, Math.min(scrollRange, dragState.startScrollPos + scrollDelta));
  }, [viewportRef, dragState.startScrollPos]);

  /**
   * Handle thumb drag for vertical scrollbar.
   */
  const handleThumbDragY = useCallback((deltaY: number, thumbMetrics: ThumbMetrics) => {
    if (!viewportRef.current) return;

    const viewport = viewportRef.current;
    const { trackSizeY, thumbSizeY } = thumbMetrics;
    const scrollRange = viewport.scrollHeight - viewport.clientHeight;
    
    if (scrollRange <= 0) return;

    const trackRange = trackSizeY - thumbSizeY;
    const scrollDelta = trackRange > 0 ? (deltaY / trackRange) * scrollRange : 0;
    
    viewport.scrollTop = Math.max(0, Math.min(scrollRange, dragState.startScrollPos + scrollDelta));
  }, [viewportRef, dragState.startScrollPos]);

  /**
   * Start thumb drag interaction.
   */
  const startDrag = useCallback((axis: 'x' | 'y', pointerPos: number) => {
    if (!viewportRef.current) return;

    const viewport = viewportRef.current;
    const startScrollPos = axis === 'x' ? viewport.scrollLeft : viewport.scrollTop;

    setDragState({
      isDragging: true,
      dragAxis: axis,
      startPointerPos: pointerPos,
      startScrollPos,
    });
  }, [viewportRef]);

  /**
   * Update drag interaction.
   */
  const updateDrag = useCallback((pointerPos: number, thumbMetrics: ThumbMetrics) => {
    if (!dragState.isDragging || !dragState.dragAxis) return;

    const delta = pointerPos - dragState.startPointerPos;

    if (dragState.dragAxis === 'x') {
      handleThumbDragX(delta, thumbMetrics);
    } else {
      handleThumbDragY(delta, thumbMetrics);
    }
  }, [dragState, handleThumbDragX, handleThumbDragY]);

  /**
   * End drag interaction.
   */
  const endDrag = useCallback(() => {
    setDragState({
      isDragging: false,
      dragAxis: null,
      startPointerPos: 0,
      startScrollPos: 0,
    });
  }, []);

  /**
   * Set up ResizeObserver for viewport and content changes.
   */
  useEffect(() => {
    if (disabled || !viewportRef.current) {
      return;
    }

    const viewport = viewportRef.current;
    
    resizeObserverRef.current = new ResizeObserver(() => {
      handleScroll();
    });

    // Observe viewport
    resizeObserverRef.current.observe(viewport);

    // Observe first child (content)
    const firstChild = viewport.firstElementChild;
    if (firstChild) {
      resizeObserverRef.current.observe(firstChild);
    }

    return () => {
      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect();
      }
    };
  }, [disabled, viewportRef, handleScroll]);

  /**
   * Set up scroll event listener.
   */
  useEffect(() => {
    if (disabled || !viewportRef.current) {
      return;
    }

    const viewport = viewportRef.current;
    viewport.addEventListener('scroll', handleScroll, { passive: true });

    // Initial metrics calculation
    updateScrollMetrics();

    return () => {
      viewport.removeEventListener('scroll', handleScroll);
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [disabled, viewportRef, handleScroll, updateScrollMetrics]);

  // Calculate current thumb metrics
  const thumbMetrics = calculateThumbMetrics(scrollMetrics);

  return {
    scrollMetrics,
    thumbMetrics,
    dragState,
    startDrag,
    updateDrag,
    endDrag,
  };
}