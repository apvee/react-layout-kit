import { useCallback, useEffect, useRef } from 'react';
import type { ThumbMetrics, DragState } from './ScrollArea.types';

/**
 * Custom hook for managing thumb drag interactions with pointer events.
 * 
 * @param thumbRef - Ref to the thumb element
 * @param orientation - Whether this is for horizontal or vertical scrolling
 * @param dragState - Current drag state
 * @param startDrag - Function to start drag interaction
 * @param updateDrag - Function to update drag position
 * @param endDrag - Function to end drag interaction
 * @param thumbMetrics - Current thumb metrics
 * @param dir - Text direction for RTL support
 * @returns Event handlers for the thumb element
 */
export function useThumbDrag(
  thumbRef: React.RefObject<HTMLElement>,
  orientation: 'horizontal' | 'vertical',
  dragState: DragState,
  startDrag: (axis: 'x' | 'y', pointerPos: number) => void,
  updateDrag: (pointerPos: number, thumbMetrics: ThumbMetrics) => void,
  endDrag: () => void,
  thumbMetrics: ThumbMetrics,
  dir: 'ltr' | 'rtl'
) {
  const isHorizontal = orientation === 'horizontal';
  const axis = isHorizontal ? 'x' : 'y';
  
  // Track if this thumb is being dragged
  const isThisDragging = dragState.isDragging && dragState.dragAxis === axis;

  /**
   * Handle pointer down event to start dragging.
   */
  const handlePointerDown = useCallback((event: React.PointerEvent) => {
    // Only handle left mouse button or touch
    if (event.button !== 0) return;

    event.preventDefault();
    event.stopPropagation();

    const thumb = thumbRef.current;
    if (!thumb) return;

    // Capture pointer for smooth dragging
    thumb.setPointerCapture(event.pointerId);

    // Prevent text selection during drag
    document.body.style.userSelect = 'none';
    document.body.style.webkitUserSelect = 'none';

    // Get initial pointer position
    const pointerPos = isHorizontal 
      ? (dir === 'rtl' ? -event.clientX : event.clientX)
      : event.clientY;

    startDrag(axis, pointerPos);
  }, [thumbRef, isHorizontal, dir, axis, startDrag]);

  /**
   * Handle pointer move event during dragging.
   */
  const handlePointerMove = useCallback((event: React.PointerEvent) => {
    if (!isThisDragging) return;

    event.preventDefault();

    // Get current pointer position
    const pointerPos = isHorizontal 
      ? (dir === 'rtl' ? -event.clientX : event.clientX)
      : event.clientY;

    updateDrag(pointerPos, thumbMetrics);
  }, [isThisDragging, isHorizontal, dir, updateDrag, thumbMetrics]);

  /**
   * Handle pointer up event to end dragging.
   */
  const handlePointerUp = useCallback((event: React.PointerEvent) => {
    if (!isThisDragging) return;

    event.preventDefault();

    const thumb = thumbRef.current;
    if (thumb) {
      thumb.releasePointerCapture(event.pointerId);
    }

    // Restore text selection
    document.body.style.userSelect = '';
    document.body.style.webkitUserSelect = '';

    endDrag();
  }, [isThisDragging, thumbRef, endDrag]);

  /**
   * Handle lost pointer capture (e.g., user drags outside window).
   */
  const handleLostPointerCapture = useCallback((event: React.PointerEvent) => {
    if (!isThisDragging) return;

    // Restore text selection
    document.body.style.userSelect = '';
    document.body.style.webkitUserSelect = '';

    endDrag();
  }, [isThisDragging, endDrag]);

  /**
   * Cleanup on unmount or when dragging ends.
   */
  useEffect(() => {
    return () => {
      // Ensure text selection is restored if component unmounts during drag
      document.body.style.userSelect = '';
      document.body.style.webkitUserSelect = '';
    };
  }, []);

  return {
    onPointerDown: handlePointerDown,
    onPointerMove: handlePointerMove,
    onPointerUp: handlePointerUp,
    onLostPointerCapture: handleLostPointerCapture,
    // Additional props for drag state
    'data-dragging': isThisDragging ? 'true' : 'false',
    style: {
      cursor: isThisDragging ? (isHorizontal ? 'ew-resize' : 'ns-resize') : 'pointer',
      touchAction: 'none',
    },
  };
}