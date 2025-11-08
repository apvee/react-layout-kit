/**
 * @fileoverview CSS generation and styling utilities
 */

export { mergeClasses, createStyles } from './css-generator';
export { 
  processShortProps, 
  generateCombinedClassName, 
  resolveSpacing 
} from './spacing-resolver';

// Re-export from configuration for internal component usage
export { getBreakpoints, getSpacing } from '../configuration';