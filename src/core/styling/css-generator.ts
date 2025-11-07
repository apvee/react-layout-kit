import { css, cx } from "@emotion/css";

/**
 * Merges multiple class names into a single string, filtering out undefined/null values.
 * 
 * This is a re-export of Emotion's `cx` function for convenience. Use this when you need
 * to conditionally combine CSS class names or merge classes from multiple sources.
 * 
 * @param classNames - Variable number of class name strings or falsy values
 * @returns Single merged class name string with falsy values filtered out
 * 
 * @example
 * ```tsx
 * import { mergeClasses } from '@apvee/react-layout-kit';
 * 
 * // Merge static classes
 * const className = mergeClasses('base-class', 'modifier-class');
 * 
 * // Conditional classes
 * const buttonClass = mergeClasses(
 *   'button',
 *   isActive && 'button-active',
 *   isDisabled && 'button-disabled'
 * );
 * 
 * // Merge with component props
 * <Box className={mergeClasses(localStyles, props.className)} />
 * ```
 */
export { cx as mergeClasses };

/**
 * Creates CSS classes from style objects using Emotion's css function.
 * 
 * This is a re-export of Emotion's `css` function. Use this for creating dynamic styles
 * or when you need CSS-in-JS styling outside of Box component's dollar props.
 * 
 * **Note:** For most use cases, prefer using Box component's dollar props ($display, $padding, etc.)
 * or short props (m, p, w, h) instead of manually creating styles.
 * 
 * @param styles - CSS style object or template literal
 * @returns Generated CSS class name
 * 
 * @example
 * ```tsx
 * import { createStyles } from '@apvee/react-layout-kit';
 * 
 * // Basic usage
 * const buttonStyles = createStyles({
 *   padding: '12px 24px',
 *   backgroundColor: '#007bff',
 *   color: 'white',
 *   borderRadius: '4px',
 *   '&:hover': {
 *     backgroundColor: '#0056b3'
 *   }
 * });
 * 
 * // Use with Box component
 * <Box className={buttonStyles}>Custom Button</Box>
 * 
 * // Prefer dollar props when possible
 * <Box $padding="12px 24px" $background="#007bff" $color="white">
 *   Better approach
 * </Box>
 * ```
 */
export { css as createStyles };