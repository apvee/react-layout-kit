# Box

> The foundational layout primitive with complete CSS-in-JS styling capabilities.

**Package:** @apvee/react-layout-kit  
**Component Type:** Layout  
**Since:** v1.0.0

---

## Overview

Box is the foundational component that all other layout components in react-layout-kit are built upon. It renders a `div` element by default and provides a flexible styling API through both dollar props (CSS properties prefixed with `$`) and short-hand props (e.g., `m`, `p`, `w`, `h`).

Box enables you to:
- Apply any CSS property through type-safe dollar props
- Use convenient shorthand properties for common styling needs
- Create responsive layouts with breakpoint-based values
- Compose with other components using the `asChild` pattern
- Measure container width automatically for responsive calculations

The component automatically handles responsive value resolution based on container width, making it perfect for creating truly responsive layouts that work in any context, not just based on viewport size. When the global configuration changes (spacing scale or breakpoints), Box automatically rerenders to reflect the updated values.

## Features

- ✅ **Complete CSS Property Support**: Access any CSS property via dollar props with full TypeScript intellisense
- ✅ **Short-hand Props**: Convenient aliases for common properties (m for margin, p for padding, etc.)
- ✅ **Responsive Values**: All style props support breakpoint objects for responsive design
- ✅ **Container-Aware**: Automatically measures element width for responsive calculations via ResizeObserver
- ✅ **Polymorphic Rendering**: Use `asChild` to render as any element while maintaining Box styling
- ✅ **Performance Optimized**: Memoized style generation and debounced resize handling
- ✅ **Type-Safe**: Full TypeScript support with autocomplete for all CSS properties
- ✅ **Configuration Reactive**: Automatically updates when global spacing/breakpoints change
- ✅ **Style Reset**: Optional basic CSS reset with `styleReset` prop

## Props

### BoxProps

Extends `React.HTMLAttributes<HTMLDivElement>`, `IShortStyleBoxProps`, and `DollarCssProps`.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `asChild` | `boolean` | `false` | When true, merges props into child element using Slot pattern instead of rendering a wrapper div. Useful for composition without extra DOM nodes. |
| `containerWidth` | `number` | `undefined` | Fixed container width (in pixels) for responsive calculations. When provided, disables automatic width measurement via ResizeObserver. Useful for deterministic behavior in tests or demos. |
| `styleReset` | `boolean` | `false` | Whether to apply basic style reset (sets `box-sizing: border-box`). |
| `className` | `string` | `undefined` | Additional CSS class names to apply to the component. Merged with generated classes. |
| `children` | `React.ReactNode` | `undefined` | Content to render inside the Box. |

### Short Props

Box supports convenient short-hand properties for common CSS values. All short props support responsive values.

**Spacing Short Props:**

| Prop | CSS Property | Supports Spacing Keys | Description |
|------|--------------|------------------------|-------------|
| `m` | `margin` | ✅ | Margin on all sides |
| `mt` | `margin-top` | ✅ | Margin top |
| `mr` | `margin-right` | ✅ | Margin right |
| `mb` | `margin-bottom` | ✅ | Margin bottom |
| `ml` | `margin-left` | ✅ | Margin left |
| `mx` | `margin-left` & `margin-right` | ✅ | Horizontal margin |
| `my` | `margin-top` & `margin-bottom` | ✅ | Vertical margin |
| `p` | `padding` | ✅ | Padding on all sides |
| `pt` | `padding-top` | ✅ | Padding top |
| `pr` | `padding-right` | ✅ | Padding right |
| `pb` | `padding-bottom` | ✅ | Padding bottom |
| `pl` | `padding-left` | ✅ | Padding left |
| `px` | `padding-left` & `padding-right` | ✅ | Horizontal padding |
| `py` | `padding-top` & `padding-bottom` | ✅ | Vertical padding |

**Sizing Short Props:**

| Prop | CSS Property | Description |
|------|--------------|-------------|
| `w` | `width` | Width (accepts any CSS width value) |
| `h` | `height` | Height (accepts any CSS height value) |
| `miw` | `min-width` | Minimum width |
| `mih` | `min-height` | Minimum height |
| `maw` | `max-width` | Maximum width |
| `mah` | `max-height` | Maximum height |

**Note:** Spacing short props accept spacing keys from the configured spacing scale (e.g., `"xs"`, `"sm"`, `"md"`, `"lg"`, `"xl"`) or any CSS value (string or number).

### Dollar Props

Box supports **all CSS properties** through dollar props. Simply prefix any CSS property name with `$` and use camelCase:

- `$display`, `$flexDirection`, `$alignItems`, `$justifyContent`
- `$margin`, `$padding`, `$width`, `$height`
- `$backgroundColor`, `$color`, `$border`, `$borderRadius`
- `$gap`, `$gridTemplateColumns`, `$gridTemplateRows`
- And any other valid CSS property...

**All dollar props support:**
- Type-safe values with TypeScript autocomplete
- Responsive values via breakpoint objects
- Spacing keys for spacing-related properties (margin, padding, gap, etc.)

**Example:**
```tsx
<Box
  $display="flex"
  $flexDirection="column"
  $gap="md"
  $backgroundColor="#f1f5f9"
  $borderRadius={12}
  $padding="lg"
>
  Content
</Box>
```

### Inherited Props

**From React.HTMLAttributes\<HTMLDivElement\>:**
- All standard HTML div attributes: `id`, `title`, `role`, `aria-*`, `data-*`
- Event handlers: `onClick`, `onMouseEnter`, `onFocus`, etc.
- Standard HTML props: `style`, `tabIndex`, etc.

**Note:** When using `asChild`, the props are merged into the child element, so you can apply element-specific attributes (like `href` for links or `type` for buttons) directly on the child element.

## Usage

### Basic Usage

```tsx
import { Box } from '@apvee/react-layout-kit';

function BasicExample() {
  return (
    <Box
      p="lg"
      $backgroundColor="#f1f5f9"
      $border="1px solid #e2e8f0"
      $borderRadius={12}
    >
      Hello from Box
    </Box>
  );
}
```

### Using Short Props

```tsx
import { Box } from '@apvee/react-layout-kit';

function ShortPropsExample() {
  return (
    <Box
      m="md"        // margin using spacing scale
      p="lg"        // padding using spacing scale
      w="100%"      // width
      h="200px"     // height
      $display="flex"
      $alignItems="center"
      $justifyContent="center"
    >
      Content with spacing scale values
    </Box>
  );
}
```

### Responsive Layout

```tsx
import { Box } from '@apvee/react-layout-kit';

function ResponsiveExample() {
  return (
    <Box
      p={{ xs: 'sm', md: 'lg', xl: 'xl' }}
      $display="flex"
      $flexDirection={{ xs: 'column', md: 'row' }}
      $gap={{ xs: 'sm', md: 'md', lg: 'lg' }}
      $backgroundColor="#f8fafc"
      $border="1px solid #e2e8f0"
      $borderRadius={12}
    >
      <Box p="sm" $backgroundColor="#dbeafe" $borderRadius={10}>
        Item 1
      </Box>
      <Box p="sm" $backgroundColor="#dcfce7" $borderRadius={10}>
        Item 2
      </Box>
      <Box p="sm" $backgroundColor="#fef3c7" $borderRadius={10}>
        Item 3
      </Box>
    </Box>
  );
}
```

### Polymorphic Rendering with asChild

```tsx
import { Box } from '@apvee/react-layout-kit';

function AsChildExample() {
  return (
    <>
      {/* Renders as a button element */}
      <Box
        asChild
        p="md"
        $backgroundColor="#3b82f6"
        $color="white"
        $borderRadius={10}
        $cursor="pointer"
        $display="inline-flex"
        $alignItems="center"
        $justifyContent="center"
      >
        <button type="button">Click me</button>
      </Box>

      {/* Renders as an anchor element */}
      <Box
        asChild
        p="md"
        $backgroundColor="#10b981"
        $color="white"
        $borderRadius={10}
        $textDecoration="none"
        $display="inline-flex"
        $alignItems="center"
      >
        <a href="/about">Go to About</a>
      </Box>
    </>
  );
}
```

### Fixed Container Width for Deterministic Behavior

```tsx
import { Box } from '@apvee/react-layout-kit';

function FixedWidthExample() {
  return (
    <Box
      containerWidth={360}  // Force mobile breakpoint resolution
      p={{ xs: 'sm', md: 'lg' }}
      $display="flex"
      $flexDirection={{ xs: 'column', md: 'row' }}
    >
      This will always use mobile layout (xs breakpoint)
      because containerWidth is set to 360px
    </Box>
  );
}
```

### Combining with Standard HTML Props

```tsx
import { Box } from '@apvee/react-layout-kit';

function HtmlPropsExample() {
  const handleClick = () => {
    console.log('Box clicked!');
  };

  return (
    <Box
      p="lg"
      $backgroundColor="#f1f5f9"
      onClick={handleClick}
      role="button"
      tabIndex={0}
      aria-label="Clickable box"
      data-testid="my-box"
      style={{ fontWeight: 700 }}
    >
      Clickable Box with HTML attributes
    </Box>
  );
}
```

## Responsive Values

Many props in Box support responsive values through breakpoint objects. This allows you to specify different values for different container widths.

### Default Breakpoints

- `xs`: 0px (mobile)
- `sm`: 576px (mobile landscape)
- `md`: 768px (tablet)
- `lg`: 992px (desktop)
- `xl`: 1200px (large desktop)
- `xxl`: 1400px (extra large desktop)
- `xxxl`: 1920px (ultra-wide)

### How Responsive Resolution Works

Box uses **container width** (not viewport width) to resolve responsive values:

1. **By default**, Box measures its own width using ResizeObserver
2. The measured width is debounced for performance
3. Responsive values are resolved to the closest breakpoint that doesn't exceed the container width
4. You can override this by providing `containerWidth` prop for deterministic behavior

### Usage Examples

```tsx
// Direct value (non-responsive)
<Box p="lg" />

// Responsive value with breakpoints
<Box 
  p={{ 
    xs: "sm",      // Mobile: small padding
    md: "md",      // Tablet: medium padding
    lg: "lg",      // Desktop: large padding
    xl: "xl"       // Large desktop: extra large padding
  }} 
/>

// Responsive with dollar props
<Box
  $display={{ xs: "block", md: "flex" }}
  $gap={{ xs: "8px", md: "16px", lg: "24px" }}
  $backgroundColor={{ xs: "#f1f5f9", lg: "#f8fafc" }}
/>

// Mixed: some responsive, some direct
<Box
  p={{ xs: "sm", lg: "xl" }}     // Responsive padding
  $backgroundColor="#f1f5f9"      // Direct background color
  $borderRadius={12}               // Direct border radius
/>
```

### Important Notes

- Responsive resolution is based on **container width**, not viewport width
- You only need to specify breakpoints that differ; missing breakpoints use the next smaller defined value
- When `containerWidth` prop is provided, automatic width measurement is disabled
- You can customize breakpoints via TypeScript module augmentation (see TypeScript section)

[Learn more about responsive design →](./responsive-values.md)

## Best Practices

### Use Short Props for Common Styling

Prefer short props for spacing and sizing as they're more concise:

```tsx
// ✅ Good - concise with short props
<Box p="lg" m="md" w="100%" />

// ❌ Avoid - verbose with dollar props
<Box $padding="lg" $margin="md" $width="100%" />
```

### Use Dollar Props for All Other CSS

For any CSS property beyond spacing/sizing, use dollar props:

```tsx
// ✅ Good - using dollar props
<Box 
  p="lg"
  $display="flex"
  $alignItems="center"
  $backgroundColor="#f1f5f9"
/>
```

### Leverage Responsive Values

Take advantage of container-based responsive values for truly adaptive layouts:

```tsx
// ✅ Good - responsive layout that adapts to container
<Box
  p={{ xs: 'sm', md: 'lg' }}
  $display={{ xs: 'block', md: 'flex' }}
  $gap={{ xs: 'sm', md: 'md' }}
>
  {/* Content */}
</Box>
```

### Use asChild for Semantic HTML

When you need a specific semantic element, use `asChild` instead of styling the wrong element:

```tsx
// ✅ Good - proper semantic button with Box styling
<Box asChild p="md" $backgroundColor="#3b82f6">
  <button type="button">Click me</button>
</Box>

// ❌ Avoid - div pretending to be a button
<Box p="md" $backgroundColor="#3b82f6" role="button" tabIndex={0}>
  Click me
</Box>
```

### Optimize Performance with containerWidth

For static layouts or when you know the width, use `containerWidth` to avoid measurement overhead:

```tsx
// ✅ Good for static/known widths
<Box containerWidth={1200} p={{ xs: 'sm', lg: 'xl' }}>
  {/* Content */}
</Box>
```

### Keep Responsive Breakpoints Minimal

Only specify the breakpoints that actually change:

```tsx
// ✅ Good - only specify changing values
<Box p={{ xs: 'sm', lg: 'xl' }} />

// ❌ Avoid - unnecessary intermediate values
<Box p={{ xs: 'sm', sm: 'sm', md: 'sm', lg: 'xl', xl: 'xl' }} />
```

### Combine with Configuration for Consistent Spacing

Use spacing keys from your configuration for consistent spacing across your app:

```tsx
// ✅ Good - using spacing scale
<Box p="lg" m="md" gap="sm" />

// ⚠️ Caution - hardcoded values bypass your design system
<Box $padding="24px" $margin="16px" $gap="8px" />
```

### Accessibility Considerations

- Use `asChild` to render semantic HTML elements (button, a, etc.) instead of divs with click handlers
- Provide appropriate ARIA attributes when needed
- Ensure sufficient color contrast for text content
- Consider focus states for interactive elements

```tsx
// ✅ Good - semantic and accessible
<Box asChild p="md" $backgroundColor="#3b82f6">
  <button type="button" aria-label="Submit form">
    Submit
  </button>
</Box>
```

## Related Components

### Built on Box

All layout components in this library are built on Box:
- [Flex](./flex.md) - Flexbox layouts with Flex.Item sub-component
- [Grid](./grid.md) - CSS Grid layouts with Grid.Col sub-component
- [Stack](./stack.md) - Vertical/horizontal stacking layouts
- [Group](./group.md) - Horizontal grouping with alignment
- [Center](./center.md) - Centering container
- [Container](./container.md) - Max-width container with responsive padding

### Complementary Components

- [AspectRatio](./aspect-ratio.md) - Maintain aspect ratio while sizing
- [SimpleGrid](./simple-grid.md) - Automatic responsive grid
- [AreaGrid](./area-grid.md) - Named grid areas for complex layouts
- [ScrollArea](./scroll-area.md) - Custom scrollable area

### Core Utilities

- [useElementWidth](../hooks/use-element-width.md) - Hook used internally by Box
- [useMergedRef](../hooks/use-merged-ref.md) - Hook for ref merging
- [Slot](./slot.md) - Component used for asChild pattern

## TypeScript

### Type Definitions

The component uses the following TypeScript types:

```typescript
import type { BoxProps, BaseBoxProps } from '@apvee/react-layout-kit';

// Using BoxProps for full prop typing
const MyComponent: React.FC = () => {
  const props: BoxProps = {
    p: 'lg',
    $display: 'flex',
    $gap: 'md',
  };
  
  return <Box {...props}>Content</Box>;
};

// BaseBoxProps excludes dollar props (useful for extending)
interface CustomComponentProps extends BaseBoxProps {
  customProp: string;
}
```

### Type Safety with Dollar Props

Dollar props provide full TypeScript support for CSS properties:

```typescript
import { Box } from '@apvee/react-layout-kit';

function TypeSafeExample() {
  return (
    <Box
      // ✅ Valid CSS display values with autocomplete
      $display="flex"
      
      // ✅ Valid flex-direction values with autocomplete
      $flexDirection="column"
      
      // ✅ Any valid CSS color value
      $backgroundColor="#f1f5f9"
      
      // ✅ Number automatically converted to px
      $padding={24}
      
      // ❌ TypeScript error: invalid display value
      // $display="invalid"
    >
      Content
    </Box>
  );
}
```

### Responsive Value Types

```typescript
import type { ResponsiveValue } from '@apvee/react-layout-kit';

// ResponsiveValue<T> accepts either T or a breakpoint object
type PaddingValue = ResponsiveValue<string | number>;

// Examples of valid values:
const directValue: PaddingValue = "16px";
const responsiveValue: PaddingValue = {
  xs: "8px",
  md: "16px",
  lg: "24px"
};
```

### Customizing Spacing Scale

You can customize the spacing scale used by Box through TypeScript module augmentation:

```typescript
// types/react-layout-kit.d.ts
declare module '@apvee/react-layout-kit' {
  interface CustomSpacing {
    xs: '4px';
    sm: '8px';
    md: '16px';
    lg: '24px';
    xl: '32px';
    xxl: '48px';
  }
}
```

After customizing, your spacing keys will be properly typed:

```tsx
// ✅ TypeScript knows about your custom spacing keys
<Box p="xs" m="xxl" gap="md" />

// ❌ TypeScript error: 'giant' is not a valid spacing key
// <Box p="giant" />
```

### Customizing Breakpoints

You can customize the responsive breakpoints:

```typescript
// types/react-layout-kit.d.ts
declare module '@apvee/react-layout-kit' {
  interface CustomBreakpoints {
    mobile: 0;
    tablet: 768;
    desktop: 1024;
    wide: 1440;
  }
}
```

After customizing, your breakpoint keys will be properly typed:

```tsx
// ✅ TypeScript knows about your custom breakpoints
<Box p={{ mobile: 'sm', tablet: 'md', desktop: 'lg' }} />

// ❌ TypeScript error: 'xs' is not a valid breakpoint
// <Box p={{ xs: 'sm' }} />
```

[Learn more about configuration →](./customization.md)

### ForwardRef and Ref Types

Box properly forwards refs with correct typing:

```typescript
import { useRef } from 'react';
import { Box } from '@apvee/react-layout-kit';

function RefExample() {
  const boxRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    // ✅ Properly typed as HTMLDivElement
    console.log(boxRef.current?.offsetWidth);
  };

  return (
    <Box ref={boxRef} p="lg" onClick={handleClick}>
      Content
    </Box>
  );
}
```

When using `asChild`, the ref type matches the child element:

```typescript
import { useRef } from 'react';
import { Box } from '@apvee/react-layout-kit';

function AsChildRefExample() {
  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <Box asChild p="md">
      <button ref={buttonRef} type="button">
        Button with Box styling
      </button>
    </Box>
  );
}
```

## Notes and Warnings

### Browser Compatibility

- **ResizeObserver**: Used for automatic width measurement. Supported in all modern browsers (Chrome 64+, Firefox 69+, Safari 13.1+, Edge 79+).
- **CSS Custom Properties**: Used for dynamic style generation. Supported in all modern browsers.
- For older browsers, consider providing `containerWidth` explicitly or using a ResizeObserver polyfill.

### Performance Considerations

- **Width Measurement**: Box uses ResizeObserver with debouncing (150ms default) for performance
- **Style Generation**: Styles are memoized and only regenerated when props or container width changes
- **Configuration Updates**: When global configuration changes, all Box instances will rerender
- For static layouts, consider using `containerWidth` prop to avoid measurement overhead

### Known Limitations

- **SSR**: Container width measurement doesn't work during server-side rendering (defaults to undefined)
  - Solution: Provide `containerWidth` prop for SSR, or accept client-side hydration update
- **asChild with Multiple Children**: When using `asChild`, provide exactly one child element
  - The Slot pattern requires a single child to merge props into
- **Nested Responsive Values**: Only top-level props support responsive values, not nested object properties

### Migration from v0.x

If migrating from an earlier version:

- **Breaking**: `className` is now merged with generated classes (was replaced before)
- **Breaking**: `styleReset` defaults to `false` (was `true` in some versions)
- **New**: Dollar props now support all CSS properties (was limited set)
- **New**: Automatic configuration reactivity (manual rerender not needed)

---

**Next Steps:**
- Learn about [responsive design patterns](./responsive-values.md)
- Explore [spacing configuration](./spacing.md)
- See [Flex component](./flex.md) for flexbox layouts
- See [Grid component](./grid.md) for grid layouts
