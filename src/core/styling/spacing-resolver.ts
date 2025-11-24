import { globalBreakpoints, globalSpacing, getBreakpoints, getSpacing } from '@/core/configuration';
import { resolveResponsiveValue } from '@/core/responsive';
import type { 
    IShortStyleBoxProps,
    DollarCssProps,
    Breakpoints, 
    Spacing, 
    SpacingKey 
} from '@/types';
import {
    SHORT_PROP_TO_CSS_MAPPING,
    isShortProp,
    isSpacingShortProp
} from '@/types/short-props';
import { css, cx } from '@emotion/css';

/**
 * Basic style reset for box-sizing.
 */
const STYLE_RESET = css({
    boxSizing: 'border-box',
});

/**
 * Processes short-style props and converts them to CSS properties.
 * Applies spacing scale resolution for spacing props and responsive value resolution.
 * 
 * @param shortProps - Short-style props object
 * @param width - Current container width for responsive resolution
 * @returns Resolved CSS styles object
 * 
 * @internal
 * 
 * @example
 * ```ts
 * const styles = processShortProps({
 *   m: 'm',
 *   p: { xs: 's', md: 'l' },
 *   top: '10px'
 * }, 800);
 * ```
 */
export function processShortProps(
    shortProps: IShortStyleBoxProps,
    width: number
): Record<string, any> {
    const breakpoints = getBreakpoints();
    const resolvedStyles: Record<string, any> = {};

    // Process all short props
    for (const [shortProp, value] of Object.entries(shortProps)) {
        if (value === undefined || !isShortProp(shortProp)) {
            continue;
        }

        // Get the corresponding CSS property name
        const cssProperty = SHORT_PROP_TO_CSS_MAPPING[shortProp];

        // Resolve responsive value first
        const resolvedValue = resolveResponsiveValue(value, width, breakpoints);

        if (resolvedValue !== undefined) {
            // Apply spacing resolution for spacing props
            if (isSpacingShortProp(shortProp)) {
                resolvedStyles[cssProperty] = resolveSpacing(resolvedValue);
            } else {
                // CSS props use value as-is
                resolvedStyles[cssProperty] = resolvedValue;
            }
        }
    }

    return resolvedStyles;
}

/**
 * Generates CSS class names from both dollar-prefixed props and short-style props.
 * Dollar props take precedence over short props when both define the same CSS property.
 * 
 * @param dollarProps - Props object containing $-prefixed CSS properties
 * @param shortProps - Props object containing short-style properties
 * @param width - Current container width for responsive resolution
 * @param styleReset - Whether to include basic style reset
 * @returns Generated CSS class name
 * 
 * @internal
 * 
 * @example
 * ```ts
 * const className = generateCombinedClassName(
 *   { $display: 'flex', $margin: 16 },
 *   { m: 'm', p: { xs: 's', md: 'l' } },
 *   800, 
 *   true
 * );
 * ```
 */
export function generateCombinedClassName(
    dollarProps: DollarCssProps,
    shortProps: IShortStyleBoxProps,
    width: number,
    styleReset?: boolean
): string {
    const breakpoints = getBreakpoints();

    // Process short props first
    const shortStyles = processShortProps(shortProps, width);

    // Process dollar props (these take precedence)
    const dollarStyles: Record<string, any> = {};
    for (const [key, value] of Object.entries(dollarProps)) {
        if (key.startsWith('$') && value !== undefined) {
            const cssProperty = key.slice(1);
            const resolvedValue = resolveResponsiveValue(value, width, breakpoints);

            if (resolvedValue !== undefined) {
                dollarStyles[cssProperty] = resolvedValue;
            }
        }
    }

    // Merge styles with dollar props taking precedence
    const mergedStyles = { ...shortStyles, ...dollarStyles };

    // Generate the main styles class
    const stylesClass = Object.keys(mergedStyles).length > 0
        ? css(mergedStyles as any)
        : '';

    // Combine with reset if needed
    return cx(
        styleReset ? STYLE_RESET : '',
        stylesClass
    );
}

/**
 * Resolves a spacing value to its final CSS value.
 * 
 * - Spacing scale keys (e.g., 'xs', 'sm', 'md') are resolved using the spacing configuration
 * - Numbers are treated as raw pixel values and passed through
 * 
 * @param value - Spacing value to resolve (either a key from the spacing scale or a number)
 * @returns Resolved CSS value
 * 
 * @example
 * ```ts
 * resolveSpacing('md');  // Returns 12 (from spacing scale)
 * resolveSpacing(16);    // Returns 16 (raw pixels)
 * resolveSpacing('xl');  // Returns 20 (from spacing scale)
 * ```
 */
export function resolveSpacing(value: SpacingKey | number): string | number {
    const spacingScale = getSpacing();

    // Type guard: check if value is a string (SpacingKey) and exists in spacing scale
    if (typeof value === 'string' && value in spacingScale) {
        return spacingScale[value];
    }

    // Pass-through for numbers (raw pixel values)
    return value;
}