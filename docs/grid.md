# Grid

> A CSS Grid-based layout component with a configurable column system for creating responsive, structured layouts.

**Package:** @apvee/react-layout-kit  
**Component Type:** Layout  
**Since:** v1.0.0

---

## Overview

The **Grid** component is a wrapper around [Box](./box.md) that creates a CSS Grid container based on a configurable column system. It provides an intuitive, prop-based API for CSS Grid with default 12-column layout, similar to popular CSS frameworks like Bootstrap and Material-UI.

Key capabilities:
- **Column-based system**: Default 12-column grid with customizable column count
- **Gutter control**: Configurable gap between grid items using spacing scale or custom values
- **Per-column control**: `Grid.Col` sub-component for `span`, `offset`, and `order` properties
- **Responsive layout**: All props accept ResponsiveValue objects for breakpoint-specific behavior
- **Alignment control**: Props for `align-items` and `justify-content`
- **Composition support**: Both `Grid` and `Grid.Col` support `asChild` for semantic HTML

The component uses `display: grid` with `grid-template-columns: repeat(N, 1fr)` where N is the number of columns. All styles are applied via Box dollar-props—no inline styles are used.

---

## Features

- **Configurable column system** with default 12-column layout
- **Flexible gutters** using spacing scale keys or custom CSS values
- **Per-column control** via `Grid.Col` for span, offset, and order
- **Responsive grid layouts** with breakpoint objects
- **Automatic width measurement** for responsive resolution
- **Alignment and justification** control for grid items
- **Composition support** via `asChild` pattern for semantic HTML
- **Full Box inheritance** for additional styling and responsive control

---

## Props

### Grid Container Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `columns` | `ResponsiveValue<number>` | `12` | Number of columns in the grid. Supports responsive objects. |
| `gutter` | `ResponsiveValue<string \| number>` | `"1rem"` | Gap between grid items. Accepts spacing keys, pixel numbers, or CSS values. |
| `align` | `ResponsiveValue<CSS.Property.AlignItems>` | `"stretch"` | Controls `align-items` (cross-axis alignment). Supports: `stretch`, `flex-start`, `flex-end`, `center`, `baseline`. |
| `justify` | `ResponsiveValue<CSS.Property.JustifyContent>` | `"flex-start"` | Controls `justify-content` (main-axis alignment). Supports: `flex-start`, `flex-end`, `center`, `space-between`, `space-around`, `space-evenly`. |
| `grow` | `ResponsiveValue<boolean>` | `false` | When true, columns in the last row expand to fill available space. |
| `overflow` | `ResponsiveValue<CSS.Property.Overflow>` | `"visible"` | Controls overflow behavior. Supports: `visible`, `hidden`, `scroll`, `auto`. |

### Grid.Col Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `span` | `ResponsiveValue<number>` | `12` | Number of columns this item should span. Must be ≤ parent Grid's `columns`. |
| `offset` | `ResponsiveValue<number>` | `undefined` | Number of columns to skip before this item (left margin in LTR layouts). |
| `order` | `ResponsiveValue<CSS.Property.Order>` | `undefined` | Visual order of this grid item. Integer value. |

### Inherited from Box

Both `Grid` and `Grid.Col` extend [BaseBoxProps](./box.md#props), so you can use all Box props including:
- Layout props: `$display`, `$overflow`, `$position`, etc.
- Spacing props: `$margin`, `$padding`, or short forms (`m`, `p`, `mt`, `px`, etc.)
- Sizing props: `$width`, `$height`, `$minWidth`, `$maxWidth`
- Styling props: `$backgroundColor`, `$border`, `$borderRadius`, etc.
- Responsive control: `containerWidth` for explicit breakpoint resolution

---

## Usage

### Basic Grid Layout

Create a 12-column grid with equal-width columns:

```tsx
import { Grid } from '@apvee/react-layout-kit';

function BasicLayout() {
  return (
    <Grid>
      <Grid.Col span={4}>
        <Card>Column 1</Card>
      </Grid.Col>
      <Grid.Col span={4}>
        <Card>Column 2</Card>
      </Grid.Col>
      <Grid.Col span={4}>
        <Card>Column 3</Card>
      </Grid.Col>
    </Grid>
  );
}
```

### Custom Column Count

Adjust the number of columns:

```tsx
// 6-column grid
<Grid columns={6}>
  <Grid.Col span={2}>Sidebar</Grid.Col>
  <Grid.Col span={4}>Main</Grid.Col>
</Grid>

// 3-column grid
<Grid columns={3}>
  <Grid.Col span={1}>Left</Grid.Col>
  <Grid.Col span={1}>Center</Grid.Col>
  <Grid.Col span={1}>Right</Grid.Col>
</Grid>
```

### Custom Gutters

Control spacing between grid items:

```tsx
// Spacing scale keys
<Grid gutter="xs">   {/* 4px gap */}
<Grid gutter="sm">   {/* 8px gap */}
<Grid gutter="md">   {/* 16px gap */}
<Grid gutter="lg">   {/* 24px gap */}

// Custom values
<Grid gutter="2rem">
  <Grid.Col span={6}>Item 1</Grid.Col>
  <Grid.Col span={6}>Item 2</Grid.Col>
</Grid>

// Numeric pixel values
<Grid gutter={32}>
  <Grid.Col span={4}>Item 1</Grid.Col>
  <Grid.Col span={4}>Item 2</Grid.Col>
  <Grid.Col span={4}>Item 3</Grid.Col>
</Grid>
```

### Column Spanning

Control how many columns each item spans:

```tsx
<Grid columns={12} gutter="md">
  {/* Full width */}
  <Grid.Col span={12}>
    <Header />
  </Grid.Col>

  {/* Two thirds / one third layout */}
  <Grid.Col span={8}>
    <Main />
  </Grid.Col>
  <Grid.Col span={4}>
    <Sidebar />
  </Grid.Col>

  {/* Three equal columns */}
  <Grid.Col span={4}>
    <Feature />
  </Grid.Col>
  <Grid.Col span={4}>
    <Feature />
  </Grid.Col>
  <Grid.Col span={4}>
    <Feature />
  </Grid.Col>
</Grid>
```

### Column Offset

Skip columns before an item:

```tsx
<Grid columns={12} gutter="md">
  {/* Center a 6-column item with 3-column offset on each side */}
  <Grid.Col span={6} offset={3}>
    <CenteredContent />
  </Grid.Col>

  {/* Align right with offset */}
  <Grid.Col span={4} offset={8}>
    <RightAligned />
  </Grid.Col>
</Grid>
```

### Column Order

Change visual order of items:

```tsx
<Grid columns={12} gutter="md">
  {/* Second in DOM, first visually */}
  <Grid.Col span={6} order={2}>
    <div>Visual Second</div>
  </Grid.Col>

  {/* First in DOM, second visually */}
  <Grid.Col span={6} order={1}>
    <div>Visual First</div>
  </Grid.Col>
</Grid>
```

### Alignment Control

Control how items align within the grid:

```tsx
// Vertical alignment
<Grid align="center" gutter="md">
  <Grid.Col span={4}>
    <Box $height="100px">Tall item</Box>
  </Grid.Col>
  <Grid.Col span={4}>
    <Box $height="50px">Short item (centered)</Box>
  </Grid.Col>
</Grid>

// Horizontal justification
<Grid justify="center" gutter="md">
  <Grid.Col span={4}>Centered</Grid.Col>
</Grid>
```

### Semantic HTML with asChild

Render semantic elements while maintaining Grid behavior:

```tsx
<Grid asChild columns={12} gutter="md">
  <section aria-label="Dashboard">
    <Grid.Col asChild span={8}>
      <article>
        <h1>Main Content</h1>
        <p>Article content...</p>
      </article>
    </Grid.Col>

    <Grid.Col asChild span={4}>
      <aside aria-label="Sidebar">
        <h2>Related</h2>
        <nav>...</nav>
      </aside>
    </Grid.Col>
  </section>
</Grid>
```

### Combining with Box Props

Leverage Box inheritance for styling:

```tsx
<Grid
  columns={12}
  gutter="lg"
  p="xl"
  $backgroundColor="#f8fafc"
  $border="1px solid #e2e8f0"
  $borderRadius="12px"
>
  <Grid.Col
    span={6}
    p="md"
    $backgroundColor="#ffffff"
    $borderRadius="8px"
    $boxShadow="0 1px 3px rgba(0,0,0,0.1)"
  >
    <Card />
  </Grid.Col>
  <Grid.Col
    span={6}
    p="md"
    $backgroundColor="#ffffff"
    $borderRadius="8px"
    $boxShadow="0 1px 3px rgba(0,0,0,0.1)"
  >
    <Card />
  </Grid.Col>
</Grid>
```

---

## Responsive Values

### Responsive Column Count

Change the number of columns at different breakpoints:

```tsx
<Grid
  columns={{ xs: 1, sm: 2, md: 3, lg: 4 }}
  gutter={{ xs: 'sm', md: 'md', lg: 'lg' }}
>
  <Grid.Col span={1}>
    <Card />
  </Grid.Col>
  <Grid.Col span={1}>
    <Card />
  </Grid.Col>
  <Grid.Col span={1}>
    <Card />
  </Grid.Col>
  <Grid.Col span={1}>
    <Card />
  </Grid.Col>
</Grid>
```

This creates:
- **Mobile (xs)**: 1 column layout, small gaps
- **Tablet (sm)**: 2 columns, small gaps
- **Desktop (md)**: 3 columns, medium gaps
- **Large (lg+)**: 4 columns, large gaps

### Responsive Column Spans

Change how many columns an item spans at different breakpoints:

```tsx
<Grid columns={{ xs: 4, md: 12 }} gutter="md">
  {/* Full width on mobile, half on desktop */}
  <Grid.Col span={{ xs: 4, md: 6 }}>
    <Main />
  </Grid.Col>

  {/* Full width on mobile, half on desktop */}
  <Grid.Col span={{ xs: 4, md: 6 }}>
    <Sidebar />
  </Grid.Col>

  {/* Full width on mobile, one third on desktop */}
  <Grid.Col span={{ xs: 4, md: 4 }}>
    <Feature />
  </Grid.Col>
  <Grid.Col span={{ xs: 4, md: 4 }}>
    <Feature />
  </Grid.Col>
  <Grid.Col span={{ xs: 4, md: 4 }}>
    <Feature />
  </Grid.Col>
</Grid>
```

### Responsive Offset and Order

Use responsive objects for offset and order:

```tsx
<Grid columns={{ xs: 4, md: 12 }} gutter="md">
  {/* No offset on mobile, centered on desktop */}
  <Grid.Col
    span={{ xs: 4, md: 6 }}
    offset={{ xs: 0, md: 3 }}
  >
    <CenteredContent />
  </Grid.Col>

  {/* Reorder at different breakpoints */}
  <Grid.Col
    span={6}
    order={{ xs: 2, md: 1 }}
  >
    <PrimaryContent />
  </Grid.Col>
  <Grid.Col
    span={6}
    order={{ xs: 1, md: 2 }}
  >
    <SecondaryContent />
  </Grid.Col>
</Grid>
```

### Automatic Width Measurement

Grid automatically measures its own width for responsive resolution:

```tsx
// Responsive props work automatically
<Grid
  columns={{ xs: 1, md: 2, lg: 3 }}
  gutter={{ xs: 'sm', md: 'md' }}
>
  <Grid.Col span={{ xs: 1, md: 1, lg: 1 }}>
    {/* Automatic responsive resolution */}
  </Grid.Col>
</Grid>
```

### Explicit containerWidth

For deterministic resolution (useful in Storybook or nested contexts):

```tsx
import { useContainerWidth } from '@apvee/react-layout-kit';

function ResponsiveGrid() {
  const [ref, containerWidth] = useContainerWidth<HTMLDivElement>();

  return (
    <div ref={ref}>
      <Grid
        columns={{ xs: 1, md: 2, lg: 3 }}
        containerWidth={containerWidth}
      >
        <Grid.Col
          span={{ xs: 1, md: 1, lg: 1 }}
          containerWidth={containerWidth}
        >
          <Content />
        </Grid.Col>
      </Grid>
    </div>
  );
}
```

---

## Best Practices

### 1. Match Column Spans to Grid Columns

Ensure spans don't exceed the parent grid's column count:

```tsx
// ✅ Correct - spans match column count
<Grid columns={12}>
  <Grid.Col span={6}>Half</Grid.Col>
  <Grid.Col span={6}>Half</Grid.Col>
</Grid>

// ❌ Incorrect - span exceeds columns (will overflow)
<Grid columns={6}>
  <Grid.Col span={8}>Too wide!</Grid.Col>
</Grid>

// ✅ Responsive - spans adapt to column count
<Grid columns={{ xs: 4, md: 12 }}>
  <Grid.Col span={{ xs: 4, md: 6 }}>Adapts correctly</Grid.Col>
</Grid>
```

### 2. Use Consistent Gutters

Prefer spacing scale keys for consistency:

```tsx
// ✅ Recommended - uses design system
<Grid gutter="md">
  <Grid.Col span={6}>Item</Grid.Col>
</Grid>

// ⚠️ Less ideal - arbitrary value
<Grid gutter="17px">
  <Grid.Col span={6}>Item</Grid.Col>
</Grid>
```

### 3. Plan Column Counts for Common Layouts

Choose column counts that divide evenly for your layout needs:

```tsx
// ✅ 12 columns - divides by 2, 3, 4, 6
<Grid columns={12}>
  <Grid.Col span={4}>1/3</Grid.Col>
  <Grid.Col span={4}>1/3</Grid.Col>
  <Grid.Col span={4}>1/3</Grid.Col>
</Grid>

// ✅ 6 columns - simpler for halves and thirds
<Grid columns={6}>
  <Grid.Col span={3}>Half</Grid.Col>
  <Grid.Col span={3}>Half</Grid.Col>
</Grid>

// ✅ 4 columns - quarters
<Grid columns={4}>
  <Grid.Col span={1}>Quarter</Grid.Col>
  <Grid.Col span={1}>Quarter</Grid.Col>
  <Grid.Col span={1}>Quarter</Grid.Col>
  <Grid.Col span={1}>Quarter</Grid.Col>
</Grid>
```

### 4. Use Grid.Col Only When Needed

You can use Grid.Col for all children or only for items that need specific properties:

```tsx
// ✅ Mix - only use Grid.Col when needed
<Grid columns={12} gutter="md">
  <Grid.Col span={8}>
    <Main />
  </Grid.Col>
  <Grid.Col span={4}>
    <Sidebar />
  </Grid.Col>
</Grid>

// ✅ All Grid.Col - clearer when all items need control
<Grid columns={3} gutter="md">
  <Grid.Col span={1}><Card /></Grid.Col>
  <Grid.Col span={1}><Card /></Grid.Col>
  <Grid.Col span={1}><Card /></Grid.Col>
</Grid>
```

### 5. Consider SimpleGrid for Equal Items

For simple equal-width layouts, [SimpleGrid](./simple-grid.md) may be simpler:

```tsx
// ✅ Use Grid for unequal spans
<Grid columns={12}>
  <Grid.Col span={8}>Wide</Grid.Col>
  <Grid.Col span={4}>Narrow</Grid.Col>
</Grid>

// ✅ Use SimpleGrid for equal items
<SimpleGrid cols={{ xs: 1, md: 2, lg: 3 }} spacing="md">
  <Card />
  <Card />
  <Card />
</SimpleGrid>
```

### 6. Test Responsive Behavior

Always test responsive layouts at various breakpoints:

```tsx
// ✅ Test with containerWidth for predictable behavior
<Grid
  columns={{ xs: 4, md: 12 }}
  containerWidth={containerWidth}
>
  <Grid.Col span={{ xs: 4, md: 6 }}>
    {/* Verify behavior at xs and md breakpoints */}
  </Grid.Col>
</Grid>
```

### 7. Use Offset Sparingly

Offsets are useful for centering or creating asymmetric layouts, but can complicate responsive behavior:

```tsx
// ✅ Good use - centering content
<Grid columns={12}>
  <Grid.Col span={6} offset={3}>
    <CenteredContent />
  </Grid.Col>
</Grid>

// ⚠️ Complex - multiple offsets can be hard to maintain
<Grid columns={12}>
  <Grid.Col span={3} offset={2}>Item 1</Grid.Col>
  <Grid.Col span={3} offset={1}>Item 2</Grid.Col>
  <Grid.Col span={2} offset={1}>Item 3</Grid.Col>
</Grid>
```

### 8. Preserve Semantic HTML

Use `asChild` to maintain meaningful HTML structure:

```tsx
// ✅ Semantic structure preserved
<Grid asChild columns={12}>
  <main>
    <Grid.Col asChild span={8}>
      <article>
        <h1>Article Title</h1>
      </article>
    </Grid.Col>
    <Grid.Col asChild span={4}>
      <aside>Sidebar</aside>
    </Grid.Col>
  </main>
</Grid>
```

---

## Related Components

- [Box](./box.md) - Foundation primitive; Grid is built on Box
- [SimpleGrid](./simple-grid.md) - Simpler grid for equal-width items without column system
- [Flex](./flex.md) - One-dimensional flexible layouts
- [AreaGrid](./area-grid.md) - CSS Grid with named template areas
- [Stack](./stack.md) - Simple vertical spacing

---

## TypeScript

Grid and Grid.Col are fully typed with TypeScript:

```tsx
import type { GridProps, GridColProps } from '@apvee/react-layout-kit';

// Grid container props
const gridProps: GridProps = {
  columns: 12,
  gutter: 'md',
  align: 'stretch',
  justify: 'flex-start',
  grow: false,
  overflow: 'visible',
  children: <div>Content</div>,
};

// Grid.Col props
const gridColProps: GridColProps = {
  span: 6,
  offset: 3,
  order: 2,
  children: <div>Column</div>,
};

// Responsive values are properly typed
const responsiveColumns: GridProps['columns'] = {
  xs: 4,
  sm: 6,
  md: 12,
};

const responsiveGutter: GridProps['gutter'] = {
  xs: 'sm',    // spacing key
  md: '1rem',  // CSS value
  lg: 24,      // pixel number
};

const responsiveSpan: GridColProps['span'] = {
  xs: 4,
  md: 6,
  lg: 4,
};

// Access via namespace import
import { Grid } from '@apvee/react-layout-kit';
type GridComponentProps = React.ComponentProps<typeof Grid>;
type GridColComponentProps = React.ComponentProps<typeof Grid.Col>;
```

### Type Definitions

```tsx
// Grid container props
interface GridProps extends BaseBoxProps {
  /**
   * align-items CSS property.
   * @default "stretch"
   */
  align?: ResponsiveValue<CSS.Property.AlignItems>;

  /**
   * Number of columns in the grid.
   * @default 12
   */
  columns?: ResponsiveValue<number>;

  /**
   * If true, columns in last row expand to fill space.
   * @default false
   */
  grow?: ResponsiveValue<boolean>;

  /**
   * Gap between grid items.
   * @default "1rem"
   */
  gutter?: ResponsiveValue<string | number>;

  /**
   * justify-content CSS property.
   * @default "flex-start"
   */
  justify?: ResponsiveValue<CSS.Property.JustifyContent>;

  /**
   * overflow CSS property.
   * @default "visible"
   */
  overflow?: ResponsiveValue<CSS.Property.Overflow>;
}

// Grid.Col props
interface GridColProps extends BaseBoxProps {
  /**
   * Column offset - number of columns to skip.
   */
  offset?: ResponsiveValue<number>;

  /**
   * Visual order of the grid item.
   */
  order?: ResponsiveValue<CSS.Property.Order>;

  /**
   * Number of columns to span.
   * @default 12
   */
  span?: ResponsiveValue<number>;
}
```

---

## Notes and Warnings

### Display Property is Forced

Grid always sets `display: grid` on the container. You cannot override this:

```tsx
// ❌ $display is ignored
<Grid $display="flex">
  {/* Still renders as grid */}
</Grid>

// ✅ Use Box if you need other display values
<Box $display="flex">
  <div>Not a grid container</div>
</Box>
```

### Column Spanning Limitations

Column spans should not exceed the parent grid's column count:

```tsx
// ❌ Will overflow - span exceeds columns
<Grid columns={6}>
  <Grid.Col span={8}>Too wide!</Grid.Col>
</Grid>

// ✅ Span within column count
<Grid columns={6}>
  <Grid.Col span={6}>Full width</Grid.Col>
</Grid>
```

### Grid Template Columns

Grid uses `repeat(N, 1fr)` for `grid-template-columns` where N is the `columns` prop value. This creates equal-width columns. For more complex layouts with custom column widths, use [AreaGrid](./area-grid.md) or Box with custom `$gridTemplateColumns`.

### Default Grid.Col Span

`Grid.Col` defaults to `span={12}`, which may not match your grid's column count:

```tsx
// ⚠️ Without explicit span, defaults to 12
<Grid columns={6}>
  <Grid.Col>
    {/* Spans 12 columns in a 6-column grid - will overflow! */}
  </Grid.Col>
</Grid>

// ✅ Always specify span when columns != 12
<Grid columns={6}>
  <Grid.Col span={6}>
    {/* Correctly spans all 6 columns */}
  </Grid.Col>
</Grid>
```

### Gutter Spacing Resolution

The `gutter` prop accepts:
- **Spacing keys**: `xs`, `sm`, `md`, `lg`, `xl`, `xxl`, `xxxl` (resolved to pixel values)
- **Numeric values**: Treated as pixels (e.g., `16` → `"16px"`)
- **CSS strings**: Passed through as-is (e.g., `"2rem"`, `"5%"`)

### Grow Property Status

The `grow` prop is defined in the interface but not fully implemented in the current version. It's planned for future releases to control whether the last row's columns expand to fill available space.

### Browser Compatibility

Grid uses CSS Grid properties with excellent browser support:
- `display: grid` (Chrome 57+, Firefox 52+, Safari 10.1+, Edge 16+)
- `grid-template-columns`, `grid-column-start`, `grid-column-end` (same as above)
- `gap` for grid (Chrome 68+, Firefox 61+, Safari 12+, Edge 84+)

For IE11 support (which has limited Grid support), consider using [Flex](./flex.md) or fallback layouts.

### ResizeObserver Dependency

Responsive prop resolution uses ResizeObserver for automatic width measurement. This requires:
- Native support (Chrome 64+, Firefox 69+, Safari 13.1+, Edge 79+)
- Or a polyfill for older browsers

---

## See Also

- [Responsive System Guide](../guides/responsive-system.md) - Understanding container-width based breakpoints
- [Spacing Scale](../guides/spacing-scale.md) - Spacing key values and customization
- [Box Component](./box.md) - Foundation primitive with all styling capabilities
- [SimpleGrid Component](./simple-grid.md) - Simpler grid for equal-width items
- [AreaGrid Component](./area-grid.md) - CSS Grid with named template areas
