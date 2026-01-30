# Styling Utilities

> Lightweight CSS-in-JS utilities built on Emotion for creating custom styles and composing class names.

**Package:** @apvee/react-layout-kit  
**Utility Type:** Styling  
**Since:** v1.0.0

---

## Overview

The styling utilities module provides three core functions for working with CSS-in-JS when Box component's dollar props and short props aren't sufficient:

- **`createStyles`**: Generate CSS class names from style objects (re-export of Emotion's `css`)
- **`mergeClasses`**: Compose multiple class names while filtering falsy values (re-export of Emotion's `cx`)
- **`resolveSpacing`**: Resolve spacing tokens from the configured spacing scale

These utilities are built on top of [@emotion/css](https://emotion.sh/docs/@emotion/css) and provide a lightweight alternative to full CSS-in-JS solutions when you need custom selectors (`:hover`, `:focus`, etc.) or dynamic style generation.

**When to use these utilities:**
- You need pseudo-selectors like `:hover`, `:active`, or `:focus`
- You're building custom style helpers outside the Box component
- You need to dynamically generate class names based on props
- You want to compose multiple style sources conditionally

**When NOT to use:**
- For most layout and styling needs, prefer **Box dollar props** (`$display`, `$padding`, etc.) and **short props** (`m`, `p`, `w`, `h`)
- Box props provide better TypeScript support, responsive values, and integration with the spacing system

## Features

- ✅ **Lightweight CSS-in-JS**: Minimal runtime overhead using Emotion
- ✅ **Type-Safe**: Full TypeScript support with CSS property autocomplete
- ✅ **Pseudo-Selectors**: Support for `:hover`, `:focus`, `:active`, and other pseudo-classes
- ✅ **Conditional Styles**: Easily compose styles based on component state
- ✅ **Spacing Integration**: `resolveSpacing` integrates with the global spacing scale
- ✅ **Performance**: Emotion's optimized CSS generation and caching
- ✅ **No Runtime Parsing**: Styles are converted to class names at runtime, not parse time
- ✅ **Automatic Vendor Prefixing**: Emotion handles browser prefixes automatically

---

## API Reference

### createStyles

Generate a CSS class name from a style object or template literal.

**Type Signature:**
```typescript
function createStyles(
  styles: CSSObject | TemplateStringsArray
): string
```

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `styles` | `CSSObject \| TemplateStringsArray` | Style object with CSS properties or template literal with CSS |

**Returns:** `string` - Generated CSS class name

**Description:**

This is a re-export of Emotion's `css` function. Use it to create dynamic styles that require features not available through Box component props, such as:
- Pseudo-selectors (`:hover`, `:focus`, `:active`)
- Media queries
- Nested selectors
- Keyframe animations
- Advanced CSS features

The function generates a unique class name and injects the styles into the document. Multiple calls with identical styles return the same class name (cached).

---

### mergeClasses

Compose multiple class names into a single string, filtering out falsy values.

**Type Signature:**
```typescript
function mergeClasses(
  ...classNames: Array<string | undefined | null | false>
): string
```

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `...classNames` | `Array<string \| undefined \| null \| false>` | Variable number of class names or falsy values to merge |

**Returns:** `string` - Single merged class name string with falsy values filtered

**Description:**

This is a re-export of Emotion's `cx` function. Use it to conditionally combine CSS class names from multiple sources:
- Base styles + conditional modifiers
- Component styles + user-provided className prop
- Multiple generated class names from `createStyles`

Falsy values (`undefined`, `null`, `false`) are automatically filtered out, making conditional class application simple and clean.

---

### resolveSpacing

Resolve a spacing token to its configured value or pass through raw numbers.

**Type Signature:**
```typescript
function resolveSpacing(
  value: string | number
): string | number
```

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `value` | `string \| number` | Spacing key (e.g., `'md'`, `'lg'`) or raw pixel value |

**Returns:** `string \| number` - Resolved spacing value from scale or original number

**Description:**

Resolves spacing tokens using the current spacing configuration. This utility allows you to use the same spacing scale in custom styles that Box components use internally.

**Behavior:**
- **String values**: Looks up the value in the spacing scale (e.g., `'md'` → `12`)
- **Number values**: Returns the number unchanged (treated as raw pixel values)
- **Unknown strings**: Returns the string unchanged

**Default Spacing Scale:**
```typescript
{
  none: 0,    // No spacing
  xxs: 2,     // Extra extra small
  xs: 4,      // Extra small
  sm: 8,      // Small
  md: 12,     // Medium (base)
  lg: 16,     // Large
  xl: 20,     // Extra large
  xxl: 24,    // Extra extra large
  xxxl: 32    // Extra extra extra large
}
```

---

## Usage Examples

### Basic createStyles Usage

```tsx
import { Box, createStyles } from '@apvee/react-layout-kit';

function MyComponent() {
  const buttonStyles = createStyles({
    display: 'inline-flex',
    alignItems: 'center',
    padding: '10px 16px',
    borderRadius: 8,
    backgroundColor: '#007bff',
    color: 'white',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 120ms ease',
    '&:hover': {
      backgroundColor: '#0056b3',
      transform: 'translateY(-1px)',
      boxShadow: '0 4px 12px rgba(0, 123, 255, 0.3)',
    },
    '&:active': {
      transform: 'translateY(0)',
    },
  });

  return (
    <Box className={buttonStyles}>
      Hover me
    </Box>
  );
}
```

### Dynamic Styles with createStyles

```tsx
import { Box, createStyles } from '@apvee/react-layout-kit';

interface ButtonProps {
  variant: 'primary' | 'secondary' | 'danger';
  size: 'sm' | 'md' | 'lg';
}

function DynamicButton({ variant, size }: ButtonProps) {
  const colors = {
    primary: { bg: '#007bff', hover: '#0056b3' },
    secondary: { bg: '#6c757d', hover: '#545b62' },
    danger: { bg: '#dc3545', hover: '#c82333' },
  };

  const sizes = {
    sm: { padding: '6px 12px', fontSize: 13 },
    md: { padding: '10px 16px', fontSize: 14 },
    lg: { padding: '14px 20px', fontSize: 16 },
  };

  const buttonClass = createStyles({
    display: 'inline-flex',
    alignItems: 'center',
    borderRadius: 6,
    border: 'none',
    color: 'white',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 120ms ease',
    backgroundColor: colors[variant].bg,
    padding: sizes[size].padding,
    fontSize: sizes[size].fontSize,
    '&:hover': {
      backgroundColor: colors[variant].hover,
    },
  });

  return <Box className={buttonClass}>Click me</Box>;
}
```

### Merging Class Names

```tsx
import { Box, createStyles, mergeClasses } from '@apvee/react-layout-kit';

interface CardProps {
  isActive: boolean;
  isHovered: boolean;
  className?: string;
}

function Card({ isActive, isHovered, className }: CardProps) {
  const baseStyles = createStyles({
    padding: 16,
    borderRadius: 8,
    border: '1px solid #e2e8f0',
    backgroundColor: 'white',
    transition: 'all 150ms ease',
  });

  const activeStyles = createStyles({
    borderColor: '#007bff',
    boxShadow: '0 0 0 3px rgba(0, 123, 255, 0.1)',
  });

  const hoverStyles = createStyles({
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
  });

  // Merge base styles with conditional modifiers and user className
  const cardClass = mergeClasses(
    baseStyles,
    isActive && activeStyles,
    isHovered && hoverStyles,
    className
  );

  return (
    <Box className={cardClass}>
      Card content
    </Box>
  );
}
```

### Conditional Style Composition

```tsx
import { Box, createStyles, mergeClasses } from '@apvee/react-layout-kit';

interface TagProps {
  label: string;
  tone: 'blue' | 'green' | 'red';
  withBorder?: boolean;
  withHover?: boolean;
}

function Tag({ label, tone, withBorder, withHover }: TagProps) {
  const toneColors = {
    blue: { bg: '#eff6ff', border: '#93c5fd', fg: '#1e3a8a' },
    green: { bg: '#ecfdf5', border: '#6ee7b7', fg: '#064e3b' },
    red: { bg: '#fef2f2', border: '#fca5a5', fg: '#7f1d1d' },
  };

  const baseClass = createStyles({
    display: 'inline-flex',
    alignItems: 'center',
    padding: '4px 10px',
    borderRadius: 6,
    fontSize: 13,
    fontWeight: 600,
    backgroundColor: toneColors[tone].bg,
    color: toneColors[tone].fg,
  });

  const borderClass = withBorder && createStyles({
    border: `1px solid ${toneColors[tone].border}`,
  });

  const hoverClass = withHover && createStyles({
    cursor: 'pointer',
    transition: 'transform 100ms ease',
    '&:hover': {
      transform: 'scale(1.05)',
    },
  });

  return (
    <Box className={mergeClasses(baseClass, borderClass, hoverClass)}>
      {label}
    </Box>
  );
}
```

### Using resolveSpacing in Custom Styles

```tsx
import { createStyles, resolveSpacing } from '@apvee/react-layout-kit';

function CustomLayout() {
  // Resolve spacing tokens to use in custom styles
  const gridStyles = createStyles({
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: resolveSpacing('md'),        // → 12px
    padding: resolveSpacing('lg'),     // → 16px
    margin: resolveSpacing(24),        // → 24 (raw number)
  });

  return <div className={gridStyles}>Grid content</div>;
}
```

### Combining All Three Utilities

```tsx
import { 
  Box, 
  createStyles, 
  mergeClasses, 
  resolveSpacing 
} from '@apvee/react-layout-kit';

interface InteractiveCardProps {
  title: string;
  active: boolean;
  disabled: boolean;
}

function InteractiveCard({ title, active, disabled }: InteractiveCardProps) {
  // Base card styles using spacing tokens
  const baseCard = createStyles({
    padding: resolveSpacing('lg'),
    borderRadius: 8,
    border: '1px solid #e2e8f0',
    backgroundColor: 'white',
    transition: 'all 150ms ease',
  });

  // Active state styles
  const activeCard = createStyles({
    borderColor: '#007bff',
    backgroundColor: '#f8fcff',
    boxShadow: '0 0 0 3px rgba(0, 123, 255, 0.1)',
  });

  // Disabled state styles
  const disabledCard = createStyles({
    opacity: 0.6,
    cursor: 'not-allowed',
    pointerEvents: 'none',
  });

  // Interactive hover styles (only when not disabled)
  const hoverCard = !disabled && createStyles({
    cursor: 'pointer',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
    },
  });

  // Merge all conditional styles
  const cardClass = mergeClasses(
    baseCard,
    active && activeCard,
    disabled && disabledCard,
    hoverCard
  );

  return (
    <Box className={cardClass}>
      <h3>{title}</h3>
    </Box>
  );
}
```

### Template Literal Syntax

```tsx
import { Box, createStyles } from '@apvee/react-layout-kit';

function TemplateExample() {
  // You can also use template literal syntax
  const styles = createStyles`
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 20px;
    
    &:hover {
      background-color: #f5f5f5;
    }
    
    & > h2 {
      margin: 0;
      color: #333;
    }
  `;

  return (
    <Box className={styles}>
      <h2>Title</h2>
      <p>Content</p>
    </Box>
  );
}
```

### Keyframe Animations

```tsx
import { Box, createStyles } from '@apvee/react-layout-kit';
import { keyframes } from '@emotion/css';

function AnimatedComponent() {
  // Define keyframe animation
  const fadeInUp = keyframes`
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  `;

  const animatedBox = createStyles({
    animation: `${fadeInUp} 0.4s ease-out`,
    padding: '20px',
    borderRadius: 8,
    backgroundColor: '#f0f9ff',
  });

  return (
    <Box className={animatedBox}>
      Animated content
    </Box>
  );
}
```

---

## Best Practices

### When to Use Each Utility

**Use `createStyles` when:**
- You need pseudo-selectors (`:hover`, `:focus`, `:active`)
- Building complex interactive components with state-dependent styles
- Creating animations with keyframes
- Need nested selectors or media queries
- Building reusable style functions outside components

**Use `mergeClasses` when:**
- Combining base styles with conditional modifiers
- Merging component styles with user-provided className prop
- Composing multiple generated class names
- Applying styles conditionally based on props or state

**Use `resolveSpacing` when:**
- Creating custom utilities that should use the same spacing scale
- Building layout helpers outside the Box component
- Need to access spacing values in non-Box contexts
- Ensuring consistency with the global spacing configuration

**Prefer Box dollar props when:**
- Applying standard CSS properties without pseudo-selectors
- Building responsive layouts (dollar props support ResponsiveValue)
- Using spacing tokens (short props automatically resolve spacing)
- Most common layout and styling needs

### Performance Considerations

1. **Memoize Style Generation**: Use `React.useMemo` when generating styles based on props
   ```tsx
   const styles = React.useMemo(() => 
     createStyles({ color: props.color }), 
     [props.color]
   );
   ```

2. **Static Styles Outside Components**: Define unchanging styles at module level
   ```tsx
   const staticStyles = createStyles({
     padding: 20,
     borderRadius: 8,
   });
   ```

3. **Avoid Inline Style Objects**: Don't create new style objects on every render
   ```tsx
   // ❌ Bad - new object every render
   <Box className={createStyles({ padding: 20 })} />
   
   // ✅ Good - memoized or static
   const styles = createStyles({ padding: 20 });
   <Box className={styles} />
   ```

4. **Batch Class Merges**: Merge all classes in a single `mergeClasses` call
   ```tsx
   // ✅ Good - single merge
   mergeClasses(base, active && activeClass, hover && hoverClass)
   
   // ❌ Less efficient - multiple merges
   mergeClasses(mergeClasses(base, active && activeClass), hover && hoverClass)
   ```

### Accessibility

When using custom styles, ensure:
- Interactive elements have visible focus states (`:focus`, `:focus-visible`)
- Sufficient color contrast ratios (WCAG AA: 4.5:1 for normal text)
- Hover states don't rely solely on color changes
- Disabled states are clearly indicated visually

```tsx
const accessibleButton = createStyles({
  // Visible focus indicator
  '&:focus-visible': {
    outline: '2px solid #007bff',
    outlineOffset: 2,
  },
  
  // Clear hover indication beyond color
  '&:hover': {
    backgroundColor: '#0056b3',
    transform: 'translateY(-1px)',
  },
  
  // Clear disabled state
  '&:disabled': {
    opacity: 0.6,
    cursor: 'not-allowed',
  },
});
```

### Composition Patterns

**Style Variants Pattern:**
```tsx
const buttonVariants = {
  primary: createStyles({ /* ... */ }),
  secondary: createStyles({ /* ... */ }),
  danger: createStyles({ /* ... */ }),
};

function Button({ variant = 'primary' }) {
  return <Box className={buttonVariants[variant]}>Button</Box>;
}
```

**Style Builder Pattern:**
```tsx
function createButtonStyles(options: ButtonStyleOptions) {
  return createStyles({
    padding: resolveSpacing(options.size),
    backgroundColor: options.color,
    // ... more styles
  });
}
```

---

## Related Components

- [Box](./box.md) - Foundation component with dollar props and short props
- [Stack](./stack.md) - Vertical layout using Box
- [Group](./group.md) - Horizontal layout using Box
- [Flex](./flex.md) - Flexible box layout

---

## TypeScript

### Type Definitions

```typescript
import type { CSSObject } from '@emotion/css';
import { 
  createStyles, 
  mergeClasses, 
  resolveSpacing 
} from '@apvee/react-layout-kit';

// createStyles accepts CSSObject or template literals
const styles1: string = createStyles({
  display: 'flex',
  padding: 20,
});

const styles2: string = createStyles`
  display: flex;
  padding: 20px;
`;

// mergeClasses accepts variable number of class names
const merged: string = mergeClasses(
  'base-class',
  isActive && 'active-class',
  undefined,
  null
);

// resolveSpacing accepts string keys or numbers
const spacing1: string | number = resolveSpacing('md');
const spacing2: string | number = resolveSpacing(16);
```

### Emotion Type Imports

```typescript
// Import Emotion types for advanced usage
import type { CSSObject, SerializedStyles } from '@emotion/css';

interface StyleConfig {
  padding: number;
  color: string;
}

function buildStyles(config: StyleConfig): string {
  const styleObject: CSSObject = {
    padding: config.padding,
    color: config.color,
    '&:hover': {
      opacity: 0.8,
    },
  };
  
  return createStyles(styleObject);
}
```

### Customizing Spacing Scale

You can customize the spacing tokens used by `resolveSpacing`:

```typescript
// types/react-layout-kit.d.ts
declare module '@apvee/react-layout-kit' {
  interface CustomSpacing {
    none: 0;
    tiny: 2;
    small: 4;
    base: 8;
    medium: 12;
    large: 16;
    xlarge: 24;
    huge: 32;
  }
}
```

Then configure the spacing at app initialization:

```typescript
import { configureLayoutKit } from '@apvee/react-layout-kit';

configureLayoutKit({
  spacing: {
    none: 0,
    tiny: 2,
    small: 4,
    base: 8,
    medium: 12,
    large: 16,
    xlarge: 24,
    huge: 32,
  },
});
```

Now `resolveSpacing('base')` will return `8` instead of the default value.

[Learn more about configuration →](./customization.md)

---

## Notes and Warnings

### Emotion CSS-in-JS

These utilities are thin wrappers around [@emotion/css](https://emotion.sh/docs/@emotion/css):
- **`createStyles`** = `@emotion/css`'s `css` function
- **`mergeClasses`** = `@emotion/css`'s `cx` function

For advanced usage, consult the [Emotion documentation](https://emotion.sh/docs/introduction).

### Server-Side Rendering (SSR)

When using these utilities in SSR environments:
- Styles are automatically injected during render
- No additional setup required for Next.js or other React frameworks
- Emotion handles style extraction and hydration automatically

### Style Specificity

Generated class names from `createStyles` have standard CSS specificity. If styles don't apply as expected:
- Check for conflicting styles from other sources
- Use browser DevTools to inspect actual applied styles
- Consider specificity rules when combining with global CSS

### Performance Notes

- Emotion caches generated styles, so identical style objects produce the same class name
- Style generation is fast but not free - memoize style creation when possible
- For very large applications, consider code splitting or lazy loading style-heavy components

### Migration from Other CSS-in-JS Libraries

If migrating from other CSS-in-JS solutions:
- **styled-components**: Both use CSS-in-JS, but `createStyles` returns class names, not components
- **Tailwind**: These utilities are for runtime styles; Tailwind is build-time
- **CSS Modules**: Similar mental model, but `createStyles` generates styles at runtime

---

## Additional Resources

- [Emotion Documentation](https://emotion.sh/docs/introduction)
- [Emotion CSS-in-JS](https://emotion.sh/docs/@emotion/css)
- [Box Component Documentation](./box.md)
- [Spacing Configuration Guide](./spacing.md)
- [Responsive Design Guide](./responsive-values.md)
