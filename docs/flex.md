# Flex

> A comprehensive flexbox container component with full responsive support for creating flexible layouts.

**Package:** @apvee/react-layout-kit  
**Component Type:** Layout  
**Since:** v1.0.0

---

## Overview

The **Flex** component is a specialized wrapper around [Box](./box.md) that creates a flex container with an intuitive, prop-based API for all CSS flexbox properties. It automatically sets `display: flex` and provides focused props for flexbox control.

Key capabilities:
- **Container props**: `direction`, `align`, `justify`, `wrap`, `gap`, `rowGap`, `columnGap`
- **Item control**: `Flex.Item` sub-component for per-item flex properties (`flex`, `grow`, `shrink`, `basis`, `order`, `alignSelf`)
- **Spacing integration**: Gap values support spacing scale keys (`xs`, `sm`, `md`, etc.) or numeric pixel values
- **Full responsive support**: All props accept ResponsiveValue objects for breakpoint-specific layouts
- **Composition support**: Both `Flex` and `Flex.Item` support `asChild` for semantic HTML

All styles are applied via Box component dollar-props—no inline styles are used. The component measures its own width via ResizeObserver for responsive prop resolution.

---

## Features

- **Complete flexbox control** with props for all CSS flex container properties
- **Spacing scale integration** for consistent gap values across your design system
- **Responsive layouts** with breakpoint objects for all flex properties
- **Per-item control** via `Flex.Item` sub-component
- **Automatic width measurement** for responsive resolution without manual `containerWidth`
- **Composition support** via `asChild` pattern for semantic HTML elements
- **Full Box inheritance** for additional styling and responsive control

---

## Props

### Flex Container Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `align` | `ResponsiveValue<CSS.Property.AlignItems>` | `undefined` | Controls `align-items` (cross-axis alignment). Supports: `stretch`, `flex-start`, `flex-end`, `center`, `baseline`. |
| `justify` | `ResponsiveValue<CSS.Property.JustifyContent>` | `undefined` | Controls `justify-content` (main-axis alignment). Supports: `flex-start`, `flex-end`, `center`, `space-between`, `space-around`, `space-evenly`. |
| `direction` | `ResponsiveValue<CSS.Property.FlexDirection>` | `undefined` | Controls `flex-direction` (main axis direction). Supports: `row`, `row-reverse`, `column`, `column-reverse`. |
| `wrap` | `ResponsiveValue<CSS.Property.FlexWrap>` | `undefined` | Controls `flex-wrap` (wrapping behavior). Supports: `nowrap`, `wrap`, `wrap-reverse`. |
| `gap` | `ResponsiveValue<SpacingKey \| number>` | `undefined` | Gap between all flex items (rows and columns). Accepts spacing keys or pixel numbers. |
| `rowGap` | `ResponsiveValue<SpacingKey \| number>` | `undefined` | Gap between rows only. Takes precedence over `gap` for row spacing. |
| `columnGap` | `ResponsiveValue<SpacingKey \| number>` | `undefined` | Gap between columns only. Takes precedence over `gap` for column spacing. |

### Flex.Item Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `flex` | `ResponsiveValue<CSS.Property.Flex>` | `undefined` | Shorthand for `flex-grow`, `flex-shrink`, and `flex-basis`. Example: `"1 1 0%"` or `1`. |
| `grow` | `ResponsiveValue<CSS.Property.FlexGrow>` | `undefined` | Controls `flex-grow` (ability to grow). Numeric value (commonly `0` or `1`). |
| `shrink` | `ResponsiveValue<CSS.Property.FlexShrink>` | `undefined` | Controls `flex-shrink` (ability to shrink). Numeric value (default browser value is `1`). |
| `basis` | `ResponsiveValue<CSS.Property.FlexBasis>` | `undefined` | Controls `flex-basis` (initial main size). Accepts lengths like `"200px"`, `"50%"`, or `"auto"`. |
| `alignSelf` | `ResponsiveValue<CSS.Property.AlignSelf>` | `undefined` | Controls `align-self` (individual cross-axis alignment). Overrides parent's `align`. |
| `order` | `ResponsiveValue<CSS.Property.Order>` | `undefined` | Controls `order` (visual order of flex items). Integer value. |

### Inherited from Box

Both `Flex` and `Flex.Item` extend [BaseBoxProps](./box.md#props), so you can use all Box props including:
- Layout props: `$display`, `$overflow`, `$position`, etc.
- Spacing props: `$margin`, `$padding`, or short forms (`m`, `p`, `mt`, `px`, etc.)
- Sizing props: `$width`, `$height`, `$minWidth`, `$maxWidth`
- Styling props: `$backgroundColor`, `$border`, `$borderRadius`, etc.
- Responsive control: `containerWidth` for explicit breakpoint resolution

---

## Usage

### Basic Flex Container

Create a horizontal flex layout with default settings:

```tsx
import { Flex } from '@apvee/react-layout-kit';

function Toolbar() {
  return (
    <Flex>
      <button>Action 1</button>
      <button>Action 2</button>
      <button>Action 3</button>
    </Flex>
  );
}
```

### Alignment Control

Use `align` and `justify` for flexible alignment:

```tsx
// Center items horizontally and vertically
<Flex align="center" justify="center">
  <button>Centered Button</button>
</Flex>

// Space items evenly
<Flex justify="space-between" align="center">
  <div>Left</div>
  <div>Center</div>
  <div>Right</div>
</Flex>

// Align to end of both axes
<Flex align="flex-end" justify="flex-end">
  <button>Bottom Right</button>
</Flex>
```

### Direction and Wrapping

Control layout direction and wrapping behavior:

```tsx
// Vertical stack (column)
<Flex direction="column" gap="md">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</Flex>

// Horizontal with wrapping
<Flex wrap="wrap" gap="md">
  <Card />
  <Card />
  <Card />
  <Card />
</Flex>

// Reverse direction
<Flex direction="row-reverse" gap="sm">
  <button>Third</button>
  <button>Second</button>
  <button>First</button>
</Flex>
```

### Gap Control

Use the spacing scale or custom pixel values:

```tsx
// Spacing scale keys
<Flex gap="xs">   {/* 4px */}
<Flex gap="sm">   {/* 8px */}
<Flex gap="md">   {/* 16px */}
<Flex gap="lg">   {/* 24px */}
<Flex gap="xl">   {/* 32px */}

// Custom pixel values
<Flex gap={12}>
  <div>Custom spacing</div>
</Flex>

// Separate row and column gaps
<Flex
  direction="row"
  wrap="wrap"
  rowGap={16}
  columnGap={8}
>
  <Card />
  <Card />
  <Card />
</Flex>
```

### Flex.Item for Individual Control

Use `Flex.Item` to control individual flex item behavior:

```tsx
<Flex gap="md">
  {/* Grows to fill available space */}
  <Flex.Item grow={1}>
    <main>Main Content</main>
  </Flex.Item>

  {/* Fixed width, doesn't shrink */}
  <Flex.Item shrink={0} basis="300px">
    <aside>Sidebar</aside>
  </Flex.Item>
</Flex>
```

### Flex Shorthand

Use the `flex` prop for concise flex control:

```tsx
<Flex gap="md">
  {/* flex: 1 1 0% - grows and shrinks equally */}
  <Flex.Item flex={1}>
    <div>Equal flex item</div>
  </Flex.Item>

  <Flex.Item flex={1}>
    <div>Equal flex item</div>
  </Flex.Item>

  {/* flex: 0 0 auto - fixed size */}
  <Flex.Item flex="0 0 auto">
    <div>Fixed size</div>
  </Flex.Item>
</Flex>
```

### Order and AlignSelf

Control visual order and individual alignment:

```tsx
<Flex align="stretch" gap="md">
  {/* Second in DOM, first visually */}
  <Flex.Item order={1}>
    <div>Visual First</div>
  </Flex.Item>

  {/* First in DOM, second visually */}
  <Flex.Item order={2}>
    <div>Visual Second</div>
  </Flex.Item>

  {/* Align differently from siblings */}
  <Flex.Item alignSelf="flex-end">
    <div>Aligned to end</div>
  </Flex.Item>
</Flex>
```

### Semantic HTML with asChild

Render semantic elements while maintaining Flex behavior:

```tsx
<Flex asChild align="center" justify="space-between" p="md">
  <nav aria-label="Primary navigation">
    <div>Logo</div>
    <Flex asChild gap="sm">
      <ul>
        <li><a href="/docs">Docs</a></li>
        <li><a href="/pricing">Pricing</a></li>
        <li><a href="/about">About</a></li>
      </ul>
    </Flex>
  </nav>
</Flex>
```

### Combining with Box Props

Leverage Box inheritance for styling:

```tsx
<Flex
  direction="column"
  gap="md"
  p="lg"
  $backgroundColor="#f8fafc"
  $border="1px solid #e2e8f0"
  $borderRadius="12px"
  $boxShadow="0 1px 3px rgba(0,0,0,0.1)"
>
  <h2>Panel Title</h2>
  <p>Panel content...</p>
</Flex>
```

---

## Responsive Values

### Container Responsive Layout

All Flex container props support ResponsiveValue objects:

```tsx
<Flex
  direction={{ xs: 'column', md: 'row' }}
  align={{ xs: 'stretch', md: 'center' }}
  justify={{ xs: 'flex-start', md: 'space-between' }}
  gap={{ xs: 'sm', md: 'lg' }}
  wrap={{ md: 'wrap' }}
>
  <Card />
  <Card />
  <Card />
</Flex>
```

This creates:
- **Mobile (xs)**: Vertical stack with small gap, stretched items
- **Desktop (md+)**: Horizontal row with large gap, centered items, space-between distribution, wrapping enabled

### Item Responsive Behavior

`Flex.Item` props also support responsive values:

```tsx
<Flex direction={{ xs: 'column', md: 'row' }} gap="md">
  {/* Sidebar: full width on mobile, fixed on desktop */}
  <Flex.Item
    grow={{ xs: 0, md: 0 }}
    shrink={{ xs: 0, md: 0 }}
    basis={{ xs: '100%', md: '300px' }}
  >
    <Sidebar />
  </Flex.Item>

  {/* Main: full width on mobile, flexible on desktop */}
  <Flex.Item
    grow={{ xs: 0, md: 1 }}
    basis={{ xs: '100%', md: 'auto' }}
  >
    <Main />
  </Flex.Item>
</Flex>
```

### Automatic Width Measurement

Flex and Flex.Item automatically measure their own width via ResizeObserver for responsive resolution:

```tsx
// Responsive props work automatically without containerWidth
<Flex direction={{ xs: 'column', md: 'row' }}>
  <Flex.Item grow={{ xs: 0, md: 1 }}>
    {/* Responsive resolution happens automatically */}
  </Flex.Item>
</Flex>
```

### Explicit containerWidth

For deterministic resolution (useful in Storybook or nested contexts), pass `containerWidth`:

```tsx
import { useContainerWidth } from '@apvee/react-layout-kit';

function ResponsiveLayout() {
  const [ref, containerWidth] = useContainerWidth<HTMLDivElement>();

  return (
    <div ref={ref}>
      <Flex
        direction={{ xs: 'column', md: 'row' }}
        containerWidth={containerWidth}
      >
        <Flex.Item
          grow={{ xs: 0, md: 1 }}
          containerWidth={containerWidth}
        >
          <Content />
        </Flex.Item>
      </Flex>
    </div>
  );
}
```

### Responsive Reordering

Change visual order at different breakpoints:

```tsx
<Flex direction="column" gap="md">
  {/* Sidebar first on mobile, last on desktop */}
  <Flex.Item order={{ xs: 1, md: 2 }}>
    <Sidebar />
  </Flex.Item>

  {/* Main last on mobile, first on desktop */}
  <Flex.Item order={{ xs: 2, md: 1 }}>
    <Main />
  </Flex.Item>
</Flex>
```

---

## Best Practices

### 1. Choose Between Flex and Stack/Group

Use the right component for your layout needs:

```tsx
// ✅ Use Flex when you need alignment, wrapping, or item-specific control
<Flex align="center" justify="space-between">
  <Logo />
  <Navigation />
</Flex>

// ✅ Use Stack for simple vertical spacing
<Stack spacing="md">
  <div>Item 1</div>
  <div>Item 2</div>
</Stack>

// ✅ Use Group for simple horizontal spacing
<Group spacing="sm">
  <button>Save</button>
  <button>Cancel</button>
</Group>
```

### 2. Use Spacing Scale for Gaps

Prefer spacing scale keys over arbitrary pixel values:

```tsx
// ✅ Recommended - uses design system scale
<Flex gap="md">
  <Card />
  <Card />
</Flex>

// ⚠️ Less ideal - arbitrary value
<Flex gap={17}>
  <Card />
  <Card />
</Flex>
```

### 3. Leverage Flex.Item for Unequal Sizing

Use `Flex.Item` when items need different flex behavior:

```tsx
// ✅ Clear intent with Flex.Item
<Flex gap="md">
  <Flex.Item grow={1}>
    <main>Flexible content</main>
  </Flex.Item>
  <Flex.Item shrink={0} basis="300px">
    <aside>Fixed sidebar</aside>
  </Flex.Item>
</Flex>

// ❌ Without Flex.Item - harder to control
<Flex gap="md">
  <Box $flexGrow={1}>
    <main>Flexible content</main>
  </Box>
  <Box $flexShrink={0} $flexBasis="300px">
    <aside>Fixed sidebar</aside>
  </Box>
</Flex>
```

### 4. Use flex Shorthand When Appropriate

The `flex` prop is more concise for common patterns:

```tsx
// ✅ Concise with flex shorthand
<Flex.Item flex={1}>
  <div>Equal flex</div>
</Flex.Item>

// ⚠️ More verbose
<Flex.Item grow={1} shrink={1} basis="0%">
  <div>Equal flex</div>
</Flex.Item>
```

### 5. Responsive Direction Changes

When switching between row and column, consider item sizing:

```tsx
// ✅ Items adapt to layout direction
<Flex direction={{ xs: 'column', md: 'row' }} gap="md">
  <Flex.Item
    basis={{ xs: 'auto', md: '300px' }}
    grow={{ xs: 0, md: 0 }}
  >
    <Sidebar />
  </Flex.Item>
  <Flex.Item grow={1}>
    <Main />
  </Flex.Item>
</Flex>
```

### 6. Avoid Mixing Gap Props

When using `rowGap` and `columnGap`, don't also use `gap`:

```tsx
// ✅ Either use gap alone
<Flex gap="md">
  <Card />
</Flex>

// ✅ Or use rowGap + columnGap
<Flex rowGap={16} columnGap={8}>
  <Card />
</Flex>

// ❌ Don't mix - rowGap/columnGap override gap
<Flex gap="md" rowGap={8}>
  <Card />
</Flex>
```

### 7. Use asChild for Semantic HTML

Preserve semantic HTML structure when appropriate:

```tsx
// ✅ Semantic navigation
<Flex asChild align="center" justify="space-between" p="md">
  <nav>
    <Logo />
    <Menu />
  </nav>
</Flex>

// ✅ Semantic article layout
<Flex asChild direction="column" gap="lg">
  <article>
    <h1>Title</h1>
    <p>Content...</p>
  </article>
</Flex>
```

### 8. Consider Performance with Many Items

For lists with many items, Flex is efficient, but consider virtualization for very large lists:

```tsx
// ✅ Fine for reasonable number of items (<100)
<Flex wrap="wrap" gap="md">
  {items.map(item => (
    <Card key={item.id} />
  ))}
</Flex>

// ⚠️ For hundreds of items, consider virtualization
// Use react-window or similar for better performance
```

---

## Related Components

- [Box](./box.md) - Foundation primitive; Flex is built on Box
- [Stack](./stack.md) - Simpler vertical spacing without flex complexity
- [Group](./group.md) - Simpler horizontal spacing without flex complexity
- [Grid](./grid.md) - Two-dimensional grid layouts with fr units
- [Center](./center.md) - Specialized flexbox centering component

---

## TypeScript

Flex and Flex.Item are fully typed with TypeScript:

```tsx
import type { FlexProps, FlexItemProps } from '@apvee/react-layout-kit';

// Flex container props
const flexProps: FlexProps = {
  direction: 'row',
  align: 'center',
  justify: 'space-between',
  wrap: 'wrap',
  gap: 'md',
  children: <div>Content</div>,
};

// Flex.Item props
const flexItemProps: FlexItemProps = {
  flex: 1,
  grow: 1,
  shrink: 0,
  basis: '200px',
  order: 2,
  alignSelf: 'flex-end',
  children: <div>Item</div>,
};

// Responsive values are properly typed
const responsiveDirection: FlexProps['direction'] = {
  xs: 'column',
  md: 'row',
  lg: 'row-reverse',
};

const responsiveGap: FlexProps['gap'] = {
  xs: 'sm',   // spacing key
  md: 16,     // pixel value
  lg: 'lg',   // spacing key
};

const responsiveGrow: FlexItemProps['grow'] = {
  xs: 0,
  md: 1,
};

// Access via namespace import
import { Flex } from '@apvee/react-layout-kit';
type FlexComponentProps = React.ComponentProps<typeof Flex>;
type FlexItemComponentProps = React.ComponentProps<typeof Flex.Item>;
```

### Type Definitions

```tsx
// Flex container props
interface FlexProps extends BaseBoxProps {
  /**
   * align-items CSS property.
   * Supports responsive values using breakpoint objects.
   */
  align?: ResponsiveValue<CSS.Property.AlignItems>;

  /**
   * column-gap CSS property.
   * Supports responsive values using breakpoint objects.
   */
  columnGap?: ResponsiveValue<SpacingKey | number>;

  /**
   * flex-direction CSS property.
   * Supports responsive values using breakpoint objects.
   */
  direction?: ResponsiveValue<CSS.Property.FlexDirection>;

  /**
   * gap CSS property.
   * Supports responsive values using breakpoint objects.
   */
  gap?: ResponsiveValue<SpacingKey | number>;

  /**
   * justify-content CSS property.
   * Supports responsive values using breakpoint objects.
   */
  justify?: ResponsiveValue<CSS.Property.JustifyContent>;

  /**
   * row-gap CSS property.
   * Supports responsive values using breakpoint objects.
   */
  rowGap?: ResponsiveValue<SpacingKey | number>;

  /**
   * flex-wrap CSS property.
   * Supports responsive values using breakpoint objects.
   */
  wrap?: ResponsiveValue<CSS.Property.FlexWrap>;
}

// Flex.Item props
interface FlexItemProps extends BaseBoxProps {
  /**
   * flex CSS property (shorthand).
   * Supports responsive values using breakpoint objects.
   */
  flex?: ResponsiveValue<CSS.Property.Flex>;

  /**
   * flex-grow CSS property.
   * Supports responsive values using breakpoint objects.
   */
  grow?: ResponsiveValue<CSS.Property.FlexGrow>;

  /**
   * flex-shrink CSS property.
   * Supports responsive values using breakpoint objects.
   */
  shrink?: ResponsiveValue<CSS.Property.FlexShrink>;

  /**
   * flex-basis CSS property.
   * Supports responsive values using breakpoint objects.
   */
  basis?: ResponsiveValue<CSS.Property.FlexBasis<string | number>>;

  /**
   * align-self CSS property.
   * Supports responsive values using breakpoint objects.
   */
  alignSelf?: ResponsiveValue<CSS.Property.AlignSelf>;

  /**
   * order CSS property.
   * Supports responsive values using breakpoint objects.
   */
  order?: ResponsiveValue<CSS.Property.Order>;
}
```

---

## Notes and Warnings

### Display Property is Forced

Flex always sets `display: flex` on the container. You cannot override this:

```tsx
// ❌ $display is ignored
<Flex $display="block">
  {/* Still renders as flex */}
</Flex>

// ✅ Use Box if you need other display values
<Box $display="block">
  <div>Not a flex container</div>
</Box>
```

### Gap vs RowGap/ColumnGap Precedence

When both `gap` and `rowGap`/`columnGap` are specified, the specific props take precedence:

```tsx
// rowGap and columnGap override gap
<Flex gap="md" rowGap={8} columnGap={16}>
  {/* Uses rowGap: 8px, columnGap: 16px (gap is ignored) */}
</Flex>
```

### Flex.Item is Optional

You don't need to wrap every child in `Flex.Item`. Use it only when you need per-item control:

```tsx
// ✅ Fine - direct children work
<Flex gap="md">
  <div>Item 1</div>
  <div>Item 2</div>
</Flex>

// ✅ Also fine - mix direct children and Flex.Item
<Flex gap="md">
  <div>Regular item</div>
  <Flex.Item grow={1}>
    <div>Flexible item</div>
  </Flex.Item>
  <div>Regular item</div>
</Flex>
```

### Spacing Scale Keys

The spacing scale keys (`xs`, `sm`, `md`, `lg`, `xl`, `xxl`, `xxxl`) resolve to pixel values defined in your configuration:

```tsx
// Default spacing scale
xs:   4px
sm:   8px
md:   16px
lg:   24px
xl:   32px
xxl:  48px
xxxl: 64px

// Used via gap props
<Flex gap="md">  {/* 16px gap */}
```

### Browser Compatibility

Flex uses modern CSS flexbox properties with excellent browser support:
- `display: flex` (IE11+, all modern browsers)
- `flex-direction`, `flex-wrap`, `align-items`, `justify-content` (IE11+)
- `gap` for flexbox (Chrome 84+, Firefox 63+, Safari 14.1+, Edge 84+)

For older browsers without `gap` support, consider polyfills or fallback styling.

### ResizeObserver Dependency

Responsive prop resolution uses ResizeObserver for automatic width measurement. This requires:
- Native support (Chrome 64+, Firefox 69+, Safari 13.1+, Edge 79+)
- Or a polyfill for older browsers (IE11 support)

---

## See Also

- [Responsive System Guide](../guides/responsive-system.md) - Understanding container-width based breakpoints
- [Spacing Scale](../guides/spacing-scale.md) - Spacing key values and customization
- [Box Component](./box.md) - Foundation primitive with all styling capabilities
- [Stack Component](./stack.md) - Simpler vertical layouts
- [Group Component](./group.md) - Simpler horizontal layouts
