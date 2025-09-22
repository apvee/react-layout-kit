import { useCallback, useEffect, useRef, useState } from 'react';
import type { ScrollAreaType, VisibilityState, ScrollMetrics } from './ScrollArea.types';

/**
 * Custom hook for managing scrollbar visibility based on interaction type.
 * 
 * @param type - Visibility behavior type
 * @param scrollHideDelay - Delay before hiding scrollbars
 * @param scrollMetrics - Current scroll metrics
 * @returns Visibility state and event handlers
 */
export function useScrollbarVisibility(
  type: ScrollAreaType,
  scrollHideDelay: number,
  scrollMetrics: ScrollMetrics
) {
  const [visibilityState, setVisibilityState] = useState<VisibilityState>(() => ({
    visibleX: type === 'always',
    visibleY: type === 'always',
  }));

  // Timers for hiding scrollbars
  const hideTimerXRef = useRef<number>();
  const hideTimerYRef = useRef<number>();

  /**
   * Clear all hide timers.
   */
  const clearHideTimers = useCallback(() => {
    if (hideTimerXRef.current) {
      clearTimeout(hideTimerXRef.current);
      hideTimerXRef.current = undefined;
    }
    if (hideTimerYRef.current) {
      clearTimeout(hideTimerYRef.current);
      hideTimerYRef.current = undefined;
    }
  }, []);

  /**
   * Show scrollbars immediately.
   */
  const showScrollbars = useCallback(() => {
    clearHideTimers();
    
    if (type !== 'always') {
      setVisibilityState(prev => ({
        visibleX: prev.visibleX || scrollMetrics.hasOverflowX,
        visibleY: prev.visibleY || scrollMetrics.hasOverflowY,
      }));
    }
  }, [type, scrollMetrics.hasOverflowX, scrollMetrics.hasOverflowY, clearHideTimers]);

  /**
   * Schedule hiding scrollbars after delay.
   */
  const scheduleHide = useCallback(() => {
    if (type === 'always') {
      return;
    }

    clearHideTimers();

    if (scrollMetrics.hasOverflowX) {
      hideTimerXRef.current = window.setTimeout(() => {
        setVisibilityState(prev => ({ ...prev, visibleX: false }));
      }, scrollHideDelay);
    }

    if (scrollMetrics.hasOverflowY) {
      hideTimerYRef.current = window.setTimeout(() => {
        setVisibilityState(prev => ({ ...prev, visibleY: false }));
      }, scrollHideDelay);
    }
  }, [type, scrollHideDelay, scrollMetrics.hasOverflowX, scrollMetrics.hasOverflowY, clearHideTimers]);

  /**
   * Handle mouse enter event.
   */
  const handleMouseEnter = useCallback(() => {
    if (type === 'hover' || type === 'scroll') {
      showScrollbars();
    }
  }, [type, showScrollbars]);

  /**
   * Handle mouse leave event.
   */
  const handleMouseLeave = useCallback(() => {
    if (type === 'hover') {
      scheduleHide();
    }
  }, [type, scheduleHide]);

  /**
   * Handle focus events.
   */
  const handleFocus = useCallback(() => {
    if (type === 'hover' || type === 'scroll') {
      showScrollbars();
    }
  }, [type, showScrollbars]);

  /**
   * Handle blur events.
   */
  const handleBlur = useCallback(() => {
    if (type === 'hover') {
      scheduleHide();
    }
  }, [type, scheduleHide]);

  /**
   * Handle scroll events.
   */
  const handleScroll = useCallback(() => {
    if (type === 'scroll' || type === 'hover') {
      showScrollbars();
      scheduleHide();
    }
  }, [type, showScrollbars, scheduleHide]);

  /**
   * Update visibility when overflow changes.
   */
  useEffect(() => {
    if (type === 'always') {
      setVisibilityState({
        visibleX: scrollMetrics.hasOverflowX,
        visibleY: scrollMetrics.hasOverflowY,
      });
    }
  }, [type, scrollMetrics.hasOverflowX, scrollMetrics.hasOverflowY]);

  /**
   * Cleanup timers on unmount.
   */
  useEffect(() => {
    return clearHideTimers;
  }, [clearHideTimers]);

  return {
    visibilityState,
    handlers: {
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
      onFocus: handleFocus,
      onBlur: handleBlur,
      onScroll: handleScroll,
    },
  };
}