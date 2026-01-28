# Responsive Values

> Container-based responsive design system for creating layouts that adapt to their container width, not viewport size.

**Package:** @apvee/react-layout-kit  
**Type:** Core System  
**Since:** v1.0.0

---

## Overview

The responsive value system in @apvee/react-layout-kit enables you to specify different values for different container widths using breakpoint objects. Unlike traditional viewport-based responsive design (media queries), this system resolves values based on the **actual width of the container**, making components truly reusable across any context.

**Key characteristics:**
- **Container-aware**: Responds to container width, not viewport width
- **Mobile-first**: Smaller breakpoints cascade to larger ones
- **Type-safe**: Full TypeScript support with generic types
- **Universal**: Works with any prop value (numbers, strings, objects)
- **Automatic**: Built into all layout components by default

This approach is particularly powerful for:
- Component libraries that work in any container
- Dashboard widgets that need different layouts in different panel sizes
- Reusable components used in sidebars, modals, or main content
- Responsive cards or tiles that adapt independently

---

## ResponsiveValue Type

### Type Definition

```typescript
type ResponsiveValue<T> = T | Partial<Record<BreakpointKey, T>>;
```

A `ResponsiveValue<T>` can be either:
1. **Direct value**: `T` - Applied at all sizes
2. **Breakpoint object**: `Partial<Record<BreakpointKey, T>>` - Different values per breakpoint

**Example:**
```typescript
// Direct value (number)
const gap: ResponsiveValue<number> = 16;

// Breakpoint object (number per breakpoint)
const responsiveGap: ResponsiveValue<number> = {
  xs: 8,
  md: 16,
  lg: 24,
};

// Direct value (string)
const direction: ResponsiveValue<'row' | 'column'> = 'row';

// Breakpoint object (string per breakpoint)
const responsiveDirection: ResponsiveValue<'row' | 'column'> = {
  xs: 'column',
  md: 'row',
};
```

---

## Default Breakpoints

The library provides seven default breakpoints:

| Breakpoint | Min Width (px) | Typical Device |
|------------|---------------|----------------|
| `xs` | `0` | Mobile portrait (base) |
| `sm` | `480` | Mobile landscape |
| `md` | `768` | Tablet portrait |
| `lg` | `1024` | Tablet landscape / Small laptop |
| `xl` | `1366` | Desktop / Laptop |
| `xxl` | `1920` | Large desktop |
| `xxxl` | `2560` | Extra large desktop / 4K |

**Note:** These breakpoints represent **container widths**, not viewport widths. A component with a responsive value will check its own container width, not the window width.

---

## Resolution Algorithm

### Mobile-First Approach

Values are resolved using a **mobile-first** strategy:

1. Sort breakpoints by minimum width (ascending)
2. Find all breakpoints where `containerWidth >= breakpoint.minWidth`
3. Return the value from the **last matching breakpoint** (largest min-width ≤ container width)

**Example:**
```typescript
const value = { xs: 8, md: 16, lg: 24 };
const breakpoints = { xs: 0, sm: 480, md: 768, lg: 1024, xl: 1366, xxl: 1920, xxxl: 2560 };

// Container width: 500px
// Matches: xs (0) ✓, sm (480) ✓, md (768) ✗
// Result: Value from sm (cascades from xs) → 8

// Container width: 900px  
// Matches: xs (0) ✓, sm (480) ✓, md (768) ✓, lg (1024) ✗
// Result: Value from md → 16

// Container width: 1200px
// Matches: xs (0) ✓, sm (480) ✓, md (768) ✓, lg (1024) ✓
// Result: Value from lg → 24
```

### Value Cascading

Values cascade to larger breakpoints unless overridden:

```typescript
// Only specify xs and lg - md inherits from xs
const gap = { xs: 8, lg: 24 };

// Width 0-1023px: 8 (from xs)
// Width 1024px+: 24 (from lg)
```

---

## Usage in Components

### Layout Props

Most layout components support responsive values for their primary props:

#### Stack Component

```tsx
import { Stack } from '@apvee/react-layout-kit';

function ResponsiveStack() {
  return (
    <Stack
      gap={{ xs: 'xs', md: 'md', lg: 'lg' }}          // 4px → 12px → 16px
      align={{ xs: 'stretch', md: 'flex-start' }}      // stretch → flex-start
    >
      <div>Item 1</div>
      <div>Item 2</div>
    </Stack>
  );
}
```

#### Flex Component

```tsx
import { Flex } from '@apvee/react-layout-kit';

function ResponsiveFlex() {
  return (
    <Flex
      direction={{ xs: 'column', md: 'row' }}           // column → row
      gap={{ xs: 'sm', md: 'lg' }}                      // 8px → 16px
      justify={{ xs: 'flex-start', md: 'space-between' }}
    >
      <div>Item 1</div>
      <div>Item 2</div>
    </Flex>
  );
}
```

#### Grid Component

```tsx
import { Grid } from '@apvee/react-layout-kit';

function ResponsiveGrid() {
  return (
    <Grid
      cols={{ xs: 1, sm: 2, md: 3, lg: 4 }}             // 1 → 2 → 3 → 4 columns
      spacing={{ xs: 'sm', md: 'md', lg: 'lg' }}        // 8px → 12px → 16px
    >
      <Grid.Col>Item 1</Grid.Col>
      <Grid.Col>Item 2</Grid.Col>
      <Grid.Col>Item 3</Grid.Col>
    </Grid>
  );
}
```

#### SimpleGrid Component

```tsx
import { SimpleGrid } from '@apvee/react-layout-kit';

function ResponsiveSimpleGrid() {
  return (
    <SimpleGrid
      cols={{ xs: 1, sm: 2, lg: 3 }}                    // 1 → 2 → 3 columns
      spacing={{ xs: 'xs', md: 'md' }}                  // 4px → 12px
    >
      <div>Card 1</div>
      <div>Card 2</div>
      <div>Card 3</div>
    </SimpleGrid>
  );
}
```

### Box Dollar Props

All dollar props on Box support responsive values:

```tsx
import { Box } from '@apvee/react-layout-kit';

function ResponsiveBox() {
  return (
    <Box
      $display={{ xs: 'block', md: 'flex' }}
      $flexDirection={{ md: 'row', lg: 'column' }}
      $padding={{ xs: 'sm', md: 'md', lg: 'lg' }}      // 8px → 12px → 16px
      $fontSize={{ xs: 14, md: 16, lg: 18 }}           // 14px → 16px → 18px
      $width={{ xs: '100%', md: '50%', lg: '33.333%' }}
    >
      Responsive box content
    </Box>
  );
}
```

### Short Props

Short props (margin, padding, sizing) support responsive values:

```tsx
import { Box } from '@apvee/react-layout-kit';

function ResponsiveShortProps() {
  return (
    <Box
      p={{ xs: 'xs', md: 'md', lg: 'lg' }}              // padding: 4px → 12px → 16px
      m={{ xs: 'sm', lg: 'xl' }}                        // margin: 8px → 20px
      w={{ xs: '100%', md: '50%', lg: 320 }}            // width: 100% → 50% → 320px
      h={{ xs: 200, md: 300, lg: 400 }}                 // height: 200px → 300px → 400px
    >
      Content with responsive spacing and sizing
    </Box>
  );
}
```

---

## Advanced Usage

### Nested Responsive Components

Responsive components work independently based on their own container width:

```tsx
import { Box, Stack, Flex } from '@apvee/react-layout-kit';

function NestedResponsive() {
  return (
    <Box w={{ xs: '100%', lg: 1200 }}>
      {/* Outer Stack responds to Box width */}
      <Stack gap={{ xs: 'sm', md: 'lg' }}>
        
        {/* Inner Flex responds to Stack item width (same as Box) */}
        <Flex 
          direction={{ xs: 'column', md: 'row' }}
          gap={{ xs: 'xs', md: 'md' }}
        >
          <div>Nested item 1</div>
          <div>Nested item 2</div>
        </Flex>
        
        {/* Another nested component */}
        <Box w={{ xs: '100%', md: 400 }}>
          {/* This Grid's breakpoints are based on this Box's width (400px max),
              NOT the outer container */}
          <Grid
            cols={{ xs: 1, md: 2 }}  // Switches at 768px of THIS Box's width
            spacing="sm"
          >
            <div>Grid item 1</div>
            <div>Grid item 2</div>
          </Grid>
        </Box>
      </Stack>
    </Box>
  );
}
```

### Partial Breakpoint Coverage

You don't need to specify all breakpoints - values cascade:

```tsx
import { Stack } from '@apvee/react-layout-kit';

function PartialBreakpoints() {
  return (
    <Stack
      // Only specify xs and lg - intermediate sizes use xs value
      gap={{ xs: 'xs', lg: 'xl' }}  // 4px (0-1023px) → 20px (1024px+)
    >
      <div>Item 1</div>
      <div>Item 2</div>
    </Stack>
  );
}
```

### Skipping Breakpoints

Skip breakpoints for more dramatic transitions:

```tsx
import { Flex } from '@apvee/react-layout-kit';

function DramaticTransition() {
  return (
    <Flex
      // Skip sm, md - jump directly from xs to lg
      direction={{ xs: 'column', lg: 'row' }}
      gap={{ xs: 'xs', lg: 'xxl' }}  // 4px → 24px (no intermediate)
    >
      <div>Item 1</div>
      <div>Item 2</div>
    </Flex>
  );
}
```

### Custom Container Width

Override automatic width measurement with a fixed container width:

```tsx
import { Box, Stack } from '@apvee/react-layout-kit';

function FixedContainerWidth() {
  return (
    <Stack
      containerWidth={800}  // Force resolution as if container is 800px
      gap={{ xs: 'xs', md: 'md', lg: 'lg' }}
    >
      {/* gap will resolve to 'md' (12px) since 800 >= 768 (md breakpoint) */}
      <div>Item 1</div>
      <div>Item 2</div>
    </Stack>
  );
}
```

---

## Resolution API

### resolveResponsiveValue

Low-level utility for resolving responsive values manually.

**Function Signature:**
```typescript
function resolveResponsiveValue<T>(
  value: ResponsiveValue<T> | undefined,
  width: number,
  breakpoints: Breakpoints
): T | undefined
```

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `value` | `ResponsiveValue<T> \| undefined` | Value to resolve (direct or breakpoint object) |
| `width` | `number` | Current container width in pixels |
| `breakpoints` | `Breakpoints` | Breakpoint configuration |

**Returns:** Resolved value for the given width, or `undefined`

**Usage Example:**
```tsx
import { resolveResponsiveValue, getBreakpoints } from '@apvee/react-layout-kit';

function ManualResolution() {
  const value = { xs: 8, md: 16, lg: 24 };
  const breakpoints = getBreakpoints();
  
  const resolved800 = resolveResponsiveValue(value, 800, breakpoints);
  // Returns: 16 (matches md breakpoint at 768)
  
  const resolved1200 = resolveResponsiveValue(value, 1200, breakpoints);
  // Returns: 24 (matches lg breakpoint at 1024)
  
  return (
    <div>
      At 800px: {resolved800}px<br />
      At 1200px: {resolved1200}px
    </div>
  );
}
```

### Non-Object Values

The resolver handles non-object values automatically:

```typescript
import { resolveResponsiveValue, getBreakpoints } from '@apvee/react-layout-kit';

const breakpoints = getBreakpoints();

// Direct values pass through unchanged
resolveResponsiveValue(16, 800, breakpoints);          // → 16
resolveResponsiveValue('row', 800, breakpoints);       // → 'row'
resolveResponsiveValue(null, 800, breakpoints);        // → null
resolveResponsiveValue(undefined, 800, breakpoints);   // → undefined

// Objects without breakpoint keys pass through as-is
resolveResponsiveValue({ foo: 'bar' }, 800, breakpoints);  // → { foo: 'bar' }
```

---

## TypeScript Support

### Type Definitions

```typescript
import type { ResponsiveValue, BreakpointKey } from '@apvee/react-layout-kit';

// Define responsive prop types
interface MyComponentProps {
  gap: ResponsiveValue<number>;
  direction: ResponsiveValue<'row' | 'column'>;
  align: ResponsiveValue<'flex-start' | 'center' | 'flex-end'>;
}

// Usage with full type safety
const props: MyComponentProps = {
  gap: { xs: 8, md: 16, lg: 24 },                      // ✓ Valid
  direction: { xs: 'column', md: 'row' },              // ✓ Valid
  align: 'center',                                      // ✓ Valid (direct value)
};

// TypeScript errors
const invalid: MyComponentProps = {
  gap: { xs: 'foo' },           // ✗ Error: 'foo' not assignable to number
  direction: { xs: 'diagonal' }, // ✗ Error: 'diagonal' not valid direction
  align: { sm: 'left' },        // ✗ Error: 'left' not valid alignment
};
```

### Custom Breakpoints with Types

Customize breakpoints via module augmentation:

```typescript
// types/react-layout-kit.d.ts
declare module '@apvee/react-layout-kit' {
  interface CustomBreakpoints {
    mobile: 0;
    tablet: 768;
    desktop: 1024;
    wide: 1440;
    ultrawide: 2560;
  }
}
```

```tsx
import { configureBox, Stack } from '@apvee/react-layout-kit';

// Configure runtime values
configureBox({
  breakpoints: {
    mobile: 0,
    tablet: 768,
    desktop: 1024,
    wide: 1440,
    ultrawide: 2560,
  },
});

// Use custom breakpoint keys with type safety
function CustomBreakpoints() {
  return (
    <Stack
      gap={{ mobile: 'xs', tablet: 'md', desktop: 'lg' }}  // ✓ TypeScript autocomplete
    >
      <div>Item 1</div>
    </Stack>
  );
}
```

---

## Common Patterns

### Mobile-First Content Flow

Stack vertically on mobile, horizontally on desktop:

```tsx
import { Flex } from '@apvee/react-layout-kit';

function MobileFirstFlow() {
  return (
    <Flex
      direction={{ xs: 'column', md: 'row' }}
      gap={{ xs: 'sm', md: 'lg' }}
      align={{ xs: 'stretch', md: 'center' }}
    >
      <div>Primary content</div>
      <div>Secondary content</div>
    </Flex>
  );
}
```

### Responsive Grid Columns

Increase grid columns as container grows:

```tsx
import { SimpleGrid } from '@apvee/react-layout-kit';

function ResponsiveCardGrid() {
  return (
    <SimpleGrid
      cols={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 5 }}  // 1 → 2 → 3 → 4 → 5 columns
      spacing={{ xs: 'sm', md: 'md', lg: 'lg' }}     // 8px → 12px → 16px
    >
      {cards.map(card => <Card key={card.id} {...card} />)}
    </SimpleGrid>
  );
}
```

### Progressive Spacing

Increase spacing progressively for larger screens:

```tsx
import { Stack } from '@apvee/react-layout-kit';

function ProgressiveSpacing() {
  return (
    <Stack
      gap={{ xs: 'xs', sm: 'sm', md: 'md', lg: 'lg', xl: 'xl' }}
      p={{ xs: 'sm', md: 'md', lg: 'lg', xl: 'xl' }}
    >
      <h1>Title</h1>
      <p>Content with progressively larger spacing</p>
    </Stack>
  );
}
```

### Dashboard Widgets

Widgets that adapt to different panel sizes:

```tsx
import { Box, Stack, Flex } from '@apvee/react-layout-kit';

function DashboardWidget({ width }: { width: number }) {
  return (
    <Box
      containerWidth={width}  // Widget gets explicit container width
      p={{ xs: 'sm', md: 'md', lg: 'lg' }}
    >
      <Stack gap={{ xs: 'xs', md: 'sm' }}>
        <h3>Widget Title</h3>
        <Flex
          direction={{ xs: 'column', md: 'row' }}
          gap={{ xs: 'xs', md: 'sm' }}
        >
          <div>Metric 1</div>
          <div>Metric 2</div>
        </Flex>
      </Stack>
    </Box>
  );
}

// Usage in different sized panels
<DashboardWidget width={400} />   // Compact layout
<DashboardWidget width={800} />   // Expanded layout
```

---

## Best Practices

### Breakpoint Selection

**✅ Do:**
- Use adjacent breakpoints for smooth transitions (xs → sm → md)
- Define values for xs (mobile baseline) and at least one larger breakpoint
- Test at breakpoint boundaries to ensure smooth transitions
- Consider the most common container sizes in your app

**❌ Don't:**
- Skip too many breakpoints (e.g., xs → xl only) unless intentional
- Define values for every single breakpoint if not needed
- Use breakpoints that don't match your actual container sizes

### Value Progression

**✅ Do:**
- Increase values progressively (8 → 12 → 16, not 8 → 32 → 12)
- Maintain visual rhythm across breakpoints
- Use spacing tokens for consistent progression

**❌ Don't:**
- Jump dramatically between adjacent breakpoints
- Decrease values at larger breakpoints (usually)
- Mix units inconsistently (8 → '2rem' → 24)

### Component Organization

**✅ Do:**
- Colocate responsive values with their component
- Extract complex responsive configs to constants
- Document why specific breakpoint values were chosen
- Test components at various container widths

**❌ Don't:**
- Hardcode responsive values in multiple places
- Assume viewport size matches container size
- Over-complicate with too many breakpoint variations

### Performance

**✅ Do:**
- Use `containerWidth` prop to skip width measurement when width is known
- Trust automatic width measurement for typical use cases
- Memoize complex responsive configurations

**❌ Don't:**
- Manually measure width with ResizeObserver when components do it automatically
- Force unnecessary re-renders by changing containerWidth frequently
- Create new responsive objects on every render

---

## Comparison with Viewport-Based Responsive Design

### Traditional Media Queries (Viewport-Based)

```css
/* Component always responds to viewport width */
.component {
  padding: 8px;
}

@media (min-width: 768px) {
  .component {
    padding: 16px;
  }
}

@media (min-width: 1024px) {
  .component {
    padding: 24px;
  }
}
```

**Problems:**
- Component in sidebar uses same breakpoints as main content
- Can't reuse component in different contexts
- Requires different styles for each container context

### React Layout Kit (Container-Based)

```tsx
<Stack
  p={{ xs: 'xs', md: 'md', lg: 'lg' }}  // 8px → 16px → 24px
>
  {/* Adapts to CONTAINER width, not viewport */}
</Stack>
```

**Benefits:**
- Works in sidebars, modals, panels - any container
- Single component definition works everywhere
- True reusability across contexts

---

## Troubleshooting

### Values Not Changing

**Problem:** Responsive values don't change when container resizes.

**Causes & Solutions:**

1. **Container width not measured:**
   - Ensure the component is mounted (ref attached)
   - Check that parent has defined width (not `auto`)

2. **Wrong breakpoint values:**
   - Verify container actually crosses breakpoint thresholds
   - Log `currentWidth` to see actual container size

3. **Cached values:**
   - Components automatically re-render on width change
   - Check if width actually changed (use browser DevTools)

### Unexpected Value Resolution

**Problem:** Wrong value is being used at a specific width.

**Solution:** Check mobile-first resolution logic:

```tsx
// Example: At 900px width
const value = { xs: 8, md: 16, lg: 24 };

// Breakpoints: xs: 0, sm: 480, md: 768, lg: 1024
// At 900px: Matches xs ✓, sm ✓, md ✓, lg ✗
// Result: 16 (from md)  ← Last matching breakpoint
```

### TypeScript Errors

**Problem:** TypeScript doesn't accept responsive values.

**Solution:** Ensure prop type uses `ResponsiveValue<T>`:

```typescript
// ✗ Wrong
interface Props {
  gap: number;  // Only accepts direct values
}

// ✓ Correct
interface Props {
  gap: ResponsiveValue<number>;  // Accepts direct or breakpoint object
}
```

---

## Related Documentation

- [Spacing Configuration](./spacing.md) - Customize spacing scale and breakpoints
- [Box Component](./box.md) - Foundation component with responsive props
- [Flex Component](./flex.md) - Flexible layouts with responsive direction
- [Grid Component](./grid.md) - Responsive grid columns
- [useElementWidth Hook](./use-element-width.md) - Measure container width

---

## Additional Resources

- [Container Queries Polyfill](https://github.com/GoogleChromeLabs/container-query-polyfill)
- [CSS Container Queries](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Container_Queries)
- [Responsive Design Principles](https://web.dev/responsive-web-design-basics/)
