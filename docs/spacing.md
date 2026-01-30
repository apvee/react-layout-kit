# Spacing Configuration

> Customizable spacing scale for consistent spacing values throughout your application.

**Package:** @apvee/react-layout-kit  
**Type:** Configuration  
**Since:** v1.0.0

---

## Overview

The spacing system in @apvee/react-layout-kit provides a configurable scale of spacing tokens that ensure consistent spacing throughout your application. All layout components accept spacing tokens (like `'md'`, `'lg'`) in addition to raw pixel values for properties like `gap`, `padding`, and `margin`.

The spacing scale is:
- **Globally configurable**: Set once at app initialization
- **Type-safe**: Full TypeScript support with autocomplete
- **Augmentable**: Extend or override the default scale via module augmentation
- **Reactive**: Components automatically update when configuration changes
- **Consistent**: Used across all spacing-related props in the library

**Key benefits:**
- Maintain consistent spacing across your entire application
- Change spacing values globally without updating individual components
- Use semantic tokens instead of magic numbers
- Leverage TypeScript autocomplete for spacing values

---

## Default Spacing Scale

The library provides a carefully balanced default spacing scale:

| Token | Value (px) | Use Case |
|-------|-----------|----------|
| `none` | `0` | No spacing |
| `xxs` | `2` | Minimal spacing, borders, dividers |
| `xs` | `4` | Very tight spacing, icon gaps |
| `sm` | `8` | Compact spacing, button padding |
| `md` | `12` | Base spacing unit, card padding |
| `lg` | `16` | Comfortable spacing, section gaps |
| `xl` | `20` | Large spacing, major sections |
| `xxl` | `24` | Extra large spacing, page sections |
| `xxxl` | `32` | Maximum spacing, hero sections |

**Design rationale:**
- Non-linear scale for better visual rhythm
- Covers most common spacing needs
- Balanced for both compact and spacious layouts
- Mobile-friendly (small enough for mobile, large enough for desktop)

---

## Usage in Components

### Short Props (Margin & Padding)

All Box-based components accept spacing tokens in short props:

```tsx
import { Box, Stack } from '@apvee/react-layout-kit';

function MyComponent() {
  return (
    <Box
      m="md"        // margin: 12px
      p="lg"        // padding: 16px
      mt="xl"       // margin-top: 20px
      px="sm"       // padding-left & padding-right: 8px
    >
      <Stack gap="md">  {/* gap: 12px */}
        <div>Item 1</div>
        <div>Item 2</div>
      </Stack>
    </Box>
  );
}
```

### Layout Component Gap Props

Grid, Flex, Stack, Group, and SimpleGrid components accept spacing tokens for gaps:

```tsx
import { Grid, Flex, Stack, SimpleGrid } from '@apvee/react-layout-kit';

function Layouts() {
  return (
    <>
      <Grid cols={3} spacing="md">      {/* grid gap: 12px */}
        {/* Grid items */}
      </Grid>

      <Flex gap="lg">                    {/* flex gap: 16px */}
        {/* Flex items */}
      </Flex>

      <Stack gap="xl">                   {/* flex column gap: 20px */}
        {/* Stack items */}
      </Stack>

      <SimpleGrid cols={2} spacing="md"> {/* grid gap: 12px */}
        {/* Grid items */}
      </SimpleGrid>
    </>
  );
}
```

### Dollar Props

Dollar props also support spacing tokens:

```tsx
import { Box } from '@apvee/react-layout-kit';

function StyledBox() {
  return (
    <Box
      $margin="lg"          // 16px
      $padding="md"         // 12px
      $gap="sm"             // 8px
      $marginBottom="xxl"   // 24px
    >
      Content
    </Box>
  );
}
```

### Responsive Spacing

Spacing tokens work seamlessly with responsive values:

```tsx
import { Box, Stack } from '@apvee/react-layout-kit';

function ResponsiveSpacing() {
  return (
    <Box
      p={{ xs: 'sm', md: 'lg', xl: 'xxl' }}  // 8px → 16px → 24px
      m={{ xs: 'xs', lg: 'xl' }}              // 4px → 20px
    >
      <Stack gap={{ xs: 'xs', md: 'md', lg: 'lg' }}>
        <div>Responsive stack gap</div>
      </Stack>
    </Box>
  );
}
```

---

## Configuration API

### configureBox

Configure the global spacing scale for your application.

**Function Signature:**
```typescript
function configureBox(config: BoxConfig): void

interface BoxConfig {
  spacing?: Partial<Spacing>;
  breakpoints?: Partial<Breakpoints>;
}
```

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `config.spacing` | `Partial<Spacing>` | Partial spacing scale to merge with defaults |

**Usage Example:**
```tsx
import { configureBox } from '@apvee/react-layout-kit';

// Call once at app initialization (e.g., in main.tsx or App.tsx)
configureBox({
  spacing: {
    none: 0,
    xxs: 2,
    xs: 4,
    sm: 8,
    md: 16,      // Changed from 12
    lg: 24,      // Changed from 16
    xl: 32,      // Changed from 20
    xxl: 40,     // Changed from 24
    xxxl: 48,    // Changed from 32
  },
});
```

**Notes:**
- Call `configureBox` once at app startup before rendering components
- Only provide tokens you want to override (partial merge)
- Changes apply globally to all components
- Existing components automatically re-render with new values

---

### getSpacing

Retrieve the current spacing scale configuration.

**Function Signature:**
```typescript
function getSpacing(): Spacing
```

**Returns:** Current spacing scale object (copy, not reference)

**Usage Example:**
```tsx
import { getSpacing } from '@apvee/react-layout-kit';

function DebugSpacing() {
  const spacing = getSpacing();
  
  console.log(spacing);
  // { none: 0, xxs: 2, xs: 4, sm: 8, md: 12, ... }
  
  return <div>Current md spacing: {spacing.md}px</div>;
}
```

---

### resetBoxConfig

Reset spacing and breakpoints to their default values.

**Function Signature:**
```typescript
function resetBoxConfig(): void
```

**Usage Example:**
```tsx
import { resetBoxConfig } from '@apvee/react-layout-kit';

function ResetButton() {
  const handleReset = () => {
    resetBoxConfig();
    // All spacing values return to defaults
  };
  
  return <button onClick={handleReset}>Reset Configuration</button>;
}
```

---

### resolveSpacing

Resolve a spacing token to its configured value.

**Function Signature:**
```typescript
function resolveSpacing(value: string | number): string | number
```

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `value` | `string \| number` | Spacing token (e.g., `'md'`) or raw pixel value |

**Returns:** Resolved spacing value or original number

**Usage Example:**
```tsx
import { resolveSpacing, createStyles } from '@apvee/react-layout-kit';

function CustomComponent() {
  const styles = createStyles({
    padding: resolveSpacing('md'),      // → 12
    margin: resolveSpacing('lg'),       // → 16
    gap: resolveSpacing(24),            // → 24 (pass-through)
  });
  
  return <div className={styles}>Content</div>;
}
```

[Learn more about resolveSpacing →](./styling-utilities.md#resolvespacing)

---

## TypeScript Customization

### Module Augmentation

Customize the spacing scale types for your application:

**Step 1: Create type declaration file**

```typescript
// types/react-layout-kit.d.ts
declare module '@apvee/react-layout-kit' {
  interface CustomSpacing {
    // Override default tokens
    none: 0;
    tiny: 2;
    small: 4;
    base: 8;
    medium: 12;
    large: 16;
    xlarge: 24;
    huge: 32;
    massive: 48;
  }
}
```

**Step 2: Configure runtime values**

```typescript
// src/config/layout.ts
import { configureBox } from '@apvee/react-layout-kit';

configureBox({
  spacing: {
    none: 0,
    tiny: 2,
    small: 4,
    base: 8,
    medium: 12,
    large: 16,
    xlarge: 24,
    huge: 32,
    massive: 48,
  },
});
```

**Step 3: Use custom tokens**

```tsx
import { Box } from '@apvee/react-layout-kit';

function MyComponent() {
  return (
    <Box 
      m="base"      // TypeScript autocomplete: tiny, small, base, medium, etc.
      p="medium"
      gap="large"
    >
      Content with custom spacing tokens
    </Box>
  );
}
```

### Type Definitions

```typescript
import type { Spacing, SpacingKey } from '@apvee/react-layout-kit';

// SpacingKey is a union of all spacing token names
type TokenName = SpacingKey;  // 'none' | 'xxs' | 'xs' | 'sm' | ...

// Spacing is a complete mapping of tokens to values
const spacingScale: Spacing = {
  none: 0,
  xxs: 2,
  xs: 4,
  // ...
};

// Use in custom utilities
function calculateSpacing(token: SpacingKey): number {
  const spacing = getSpacing();
  return spacing[token] as number;
}
```

---

## Common Patterns

### Design System Integration

Create a centralized spacing configuration:

```typescript
// src/design-system/spacing.ts
import { configureBox } from '@apvee/react-layout-kit';

// Define your design system spacing
export const DESIGN_SYSTEM_SPACING = {
  none: 0,
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  xxxl: 48,
} as const;

// Apply configuration
export function initializeSpacing() {
  configureBox({
    spacing: DESIGN_SYSTEM_SPACING,
  });
}
```

```typescript
// src/main.tsx
import { initializeSpacing } from './design-system/spacing';

initializeSpacing();  // Configure before rendering

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<App />);
```

### Semantic Spacing Aliases

Create semantic aliases for spacing tokens:

```typescript
// src/design-system/spacing-aliases.ts
import { resolveSpacing } from '@apvee/react-layout-kit';

export const spacing = {
  // Semantic aliases
  buttonPadding: () => resolveSpacing('sm'),
  cardPadding: () => resolveSpacing('md'),
  sectionGap: () => resolveSpacing('lg'),
  pageMargin: () => resolveSpacing('xl'),
  
  // Component-specific
  inputPadding: () => resolveSpacing('xs'),
  modalPadding: () => resolveSpacing('lg'),
} as const;
```

### Spacing Utilities

Build custom spacing utilities:

```typescript
// src/utils/spacing-utils.ts
import { getSpacing, type SpacingKey } from '@apvee/react-layout-kit';

// Get multiple spacing values
export function getSpacingValues(...tokens: SpacingKey[]) {
  const spacing = getSpacing();
  return tokens.map(token => spacing[token]);
}

// Calculate spacing multiples
export function multiplySpacing(token: SpacingKey, multiplier: number) {
  const spacing = getSpacing();
  const value = spacing[token];
  return typeof value === 'number' ? value * multiplier : value;
}

// Usage
const [small, medium, large] = getSpacingValues('sm', 'md', 'lg');
const doubleBase = multiplySpacing('md', 2);  // 24px (12 * 2)
```

---

## Best Practices

### Configuration

**✅ Do:**
- Configure spacing once at app initialization (before rendering)
- Use partial configuration to override only needed tokens
- Document your custom spacing scale in your project
- Keep spacing scale consistent with your design system
- Use semantic token names that reflect usage

**❌ Don't:**
- Call `configureBox` multiple times during app runtime
- Override spacing in the middle of component lifecycle
- Use inconsistent token naming (mix semantic and numeric)
- Create too many spacing tokens (keep it manageable)

### Token Selection

**✅ Do:**
- Use spacing tokens instead of raw pixel values when possible
- Choose tokens that match your design intent (not exact pixels)
- Prefer adjacent tokens for progressive spacing (xs → sm → md)
- Use responsive spacing for different screen sizes

**❌ Don't:**
- Mix tokens and raw pixels inconsistently
- Use tokens when precise pixel control is needed
- Skip spacing levels (e.g., xs → lg without using md)

### Responsive Spacing

**✅ Do:**
- Reduce spacing on smaller screens (e.g., `{ xs: 'sm', md: 'lg' }`)
- Use consistent spacing patterns across breakpoints
- Test spacing at various screen sizes

**❌ Don't:**
- Increase spacing dramatically between breakpoints
- Use different spacing rhythms on mobile vs desktop
- Forget to test edge cases (very small/large screens)

### Custom Utilities

**✅ Do:**
- Use `resolveSpacing` when building custom components
- Create semantic wrappers for common spacing patterns
- Keep spacing utilities pure and predictable

**❌ Don't:**
- Hard-code spacing values in custom utilities
- Create utilities that bypass the spacing system
- Mutate the spacing configuration object

---

## Performance Considerations

### Configuration Changes

- **Reactive Updates**: Components automatically re-render when spacing changes
- **Memoization**: Internal memoization prevents unnecessary recalculations
- **One-time Setup**: Configure spacing once at app startup for best performance

### Component Usage

- **Token Resolution**: Fast lookup from spacing scale object
- **Raw Values**: Numbers are passed through without resolution (instant)
- **Responsive Resolution**: Only recalculates when container width changes

---

## Migration Guide

### From Fixed Pixels

**Before:**
```tsx
<Box padding={12} margin={16} gap={8}>
  <Stack gap={12}>
    {/* ... */}
  </Stack>
</Box>
```

**After:**
```tsx
<Box p="md" m="lg" gap="sm">
  <Stack gap="md">
    {/* ... */}
  </Stack>
</Box>
```

### From Other Design Systems

**Material-UI:**
```tsx
// MUI: theme.spacing(2) = 16px
<Box sx={{ p: 2, m: 3, gap: 1 }}>

// React Layout Kit
<Box p="lg" m="xl" gap="sm">
```

**Chakra UI:**
```tsx
// Chakra: spacing scale 0-96
<Box p={4} m={6} gap={2}>

// React Layout Kit
<Box p="md" m="xl" gap="xs">
```

---

## Troubleshooting

### Tokens Not Resolving

**Problem:** Spacing tokens return as strings instead of pixel values.

**Solution:** Ensure you're using spacing tokens in props that support them:
```tsx
// ✅ Correct - short props support tokens
<Box p="md" m="lg">

// ❌ Wrong - style prop needs resolved values
<Box style={{ padding: 'md' }}>  // 'md' is not valid CSS

// ✅ Correct - resolve manually for style prop
<Box style={{ padding: resolveSpacing('md') }}>
```

### TypeScript Errors

**Problem:** TypeScript doesn't recognize custom spacing tokens.

**Solution:** Ensure module augmentation is properly set up:
```typescript
// Make sure this file is included in tsconfig.json
declare module '@apvee/react-layout-kit' {
  interface CustomSpacing {
    // Your custom tokens
  }
}
```

### Configuration Not Applied

**Problem:** Configuration changes don't take effect.

**Solution:** Call `configureBox` before rendering any components:
```typescript
// ✅ Correct order
configureBox({ spacing: { /* ... */ } });
ReactDOM.render(<App />, root);

// ❌ Wrong - too late
ReactDOM.render(<App />, root);
configureBox({ spacing: { /* ... */ } });  // Already rendered
```

---

## Related Documentation

- [Responsive Values](./responsive-values.md) - Container-based responsive design
- [Styling Utilities](./styling-utilities.md) - `resolveSpacing` function
- [Box Component](./box.md) - Foundation component using spacing
- [Short Props](./short-props.md) - Margin, padding, and sizing shortcuts

---

## Additional Resources

- [Design System Spacing Scales](https://www.designsystems.com/spacing-scales/)
- [Material Design Spacing](https://material.io/design/layout/spacing-methods.html)
- [Tailwind Spacing Scale](https://tailwindcss.com/docs/customizing-spacing)
