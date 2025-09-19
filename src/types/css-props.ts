/**
 * Dollar-prefixed CSS properties for React props.
 */

import * as CSS from 'csstype';
import type { ResponsiveValue } from './responsive';

/**
 * CSS properties that can be used as responsive values.
 */
type CssProps = CSS.Properties<number | string>;

/**
 * Transform CSS property keys to have $ prefix for React props.
 */
type Dollarize<T> = {
    [K in keyof T as K extends string ? `$${K}` : never]?: ResponsiveValue<T[K]>;
};

/**
 * All CSS properties with $ prefix as responsive React props.
 */
export type DollarCssProps = Dollarize<CssProps>;