import { css, cx } from "@emotion/css";

/**
 * Merges multiple class names, filtering out undefined/null values.
 * Re-export of emotion's cx function for convenience.
 */
export { cx as mergeClasses };

/**
 * Creates CSS classes from style objects.
 * Re-export of emotion's css function.
 */
export { css as createStyles };