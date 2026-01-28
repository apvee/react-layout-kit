# SimpleGrid

> A responsive CSS grid where each item takes an equal fraction of available space.

**Package:** @apvee/react-layout-kit  
**Component Type:** Layout  
**Since:** v1.0.0

---

## Overview

SimpleGrid is a lightweight grid component for layouts where **all items should have equal width**. It uses CSS Grid with a template of `repeat(cols, 1fr)` and supports responsive column counts and spacing. This makes it ideal for feature cards, galleries, dashboards, and any layout where equal-sized items are preferred.

Unlike [Grid](./grid.md), SimpleGrid does not support column spans or offsets. Instead, it focuses on a simpler API: define the number of columns and the spacing between items.

---

## Features

- **Equal-width columns** using CSS Grid
- **Configurable column count** with responsive support
- **Row and column spacing** via `spacing` and `verticalSpacing`
- **Responsive values** for all layout props
- **Container-aware resolution** for breakpoints
- **Composition support** via `asChild`
- **Full Box styling support** through inherited props

---

## Props

### SimpleGridProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `cols` | `ResponsiveValue<number>` | `1` | Number of columns in the grid. Supports responsive values. |
| `spacing` | `ResponsiveValue<SpacingKey \| number>` | `-` | Column gap. Spacing key or number (px). Supports responsive values. When undefined, no spacing is applied. |
| `verticalSpacing` | `ResponsiveValue<SpacingKey \| number>` | `-` | Row gap. If not provided, falls back to `spacing`. Supports responsive values. |

### Inherited Props

**From BaseBoxProps:**
- `asChild` (Slot pattern composition)
- `containerWidth` (override container width for responsive calculations)
- `styleReset`
- All standard HTML div attributes (`className`, `style`, `onClick`, etc.)

**Short Props** (from IShortStyleBoxProps):
- Spacing: `m`, `mt`, `mr`, `mb`, `ml`, `mx`, `my`, `p`, `pt`, `pr`, `pb`, `pl`, `px`, `py`
- Sizing: `w`, `h`, `miw`, `mih`, `maw`, `mah`
- [View complete short props reference](./short-props.md)

**Dollar Props** (from DollarCssProps):
- Any CSS property prefixed with `$` (e.g., `$display`, `$backgroundColor`, `$borderRadius`)
- All dollar props support responsive values
- [View complete CSS properties reference](./dollar-props.md)

---

## Usage

### Basic Usage

```tsx
import { SimpleGrid } from '@apvee/react-layout-kit';

export function BasicGrid() {
  return (
    <SimpleGrid cols={3} spacing="md">
      <div>Item 1</div>
      <div>Item 2</div>
      <div>Item 3</div>
      <div>Item 4</div>
    </SimpleGrid>
  );
}
```

### Responsive Columns

```tsx
import { SimpleGrid } from '@apvee/react-layout-kit';

export function ResponsiveColumns() {
  return (
    <SimpleGrid cols={{ xs: 1, md: 2, lg: 4 }} spacing={{ xs: 'sm', md: 'md' }}>
      <div>One</div>
      <div>Two</div>
      <div>Three</div>
      <div>Four</div>
    </SimpleGrid>
  );
}
```

### Different Row vs Column Spacing

```tsx
import { SimpleGrid } from '@apvee/react-layout-kit';

export function MixedSpacing() {
  return (
    <SimpleGrid cols={3} spacing="xl" verticalSpacing="sm">
      <div>Card A</div>
      <div>Card B</div>
      <div>Card C</div>
      <div>Card D</div>
      <div>Card E</div>
      <div>Card F</div>
    </SimpleGrid>
  );
}
```

### Advanced Composition (asChild)

```tsx
import { SimpleGrid } from '@apvee/react-layout-kit';

export function SemanticGrid() {
  return (
    <SimpleGrid asChild cols={3} spacing="sm">
      <section aria-label="Cards">
        <article>Card 1</article>
        <article>Card 2</article>
        <article>Card 3</article>
      </section>
    </SimpleGrid>
  );
}
```

### With Other Components

```tsx
import { SimpleGrid, Box } from '@apvee/react-layout-kit';

export function CardGrid() {
  return (
    <SimpleGrid cols={2} spacing="lg" p="lg" $backgroundColor="#f8fafc" $borderRadius="12px">
      <Box p="md" $backgroundColor="#fff" $borderRadius="10px">Card 1</Box>
      <Box p="md" $backgroundColor="#fff" $borderRadius="10px">Card 2</Box>
      <Box p="md" $backgroundColor="#fff" $borderRadius="10px">Card 3</Box>
      <Box p="md" $backgroundColor="#fff" $borderRadius="10px">Card 4</Box>
    </SimpleGrid>
  );
}
```

---

## Responsive Values

Many props in SimpleGrid support responsive values through breakpoint objects. This allows you to specify different values for different container widths.

**Default Breakpoints:**
- `xs`: 0px (mobile)
- `sm`: 576px (mobile landscape)
- `md`: 768px (tablet)
- `lg`: 992px (desktop)
- `xl`: 1200px (large desktop)
- `xxl`: 1400px (extra large desktop)

**Usage:**
```tsx
import { SimpleGrid } from '@apvee/react-layout-kit';

export function ResponsiveGrid() {
  return (
    <SimpleGrid cols={{ xs: 1, md: 2, lg: 4 }} spacing={{ xs: 'sm', md: 'lg' }}>
      <div>Item</div>
      <div>Item</div>
      <div>Item</div>
      <div>Item</div>
    </SimpleGrid>
  );
}
```

> **Note:** Responsive resolution is based on the component's container width, not viewport width. You can customize breakpoints via module augmentation. [Learn more about responsive values →](./responsive-values.md)

---

## Best Practices

- **Use SimpleGrid for equal-width layouts:** For custom spans or offsets, use [Grid](./grid.md).
- **Specify `cols` explicitly:** Default is `1`, so set `cols` for multi-column layouts.
- **Use spacing tokens:** Prefer spacing scale keys for consistent design.
- **Override `verticalSpacing` only when needed:** It defaults to `spacing`, which is often sufficient.
- **Provide `containerWidth` in controlled environments:** Useful in Storybook or tests.

---

## Related Components

- [Grid](./grid.md) – column-span grid with offsets and order
- [AreaGrid](./area-grid.md) – grid layout with named areas
- [Stack](./stack.md) – vertical layout composition
- [Box](./box.md) – foundational layout primitive

---

## TypeScript

### Type Definitions

The component uses the following TypeScript types:

```typescript
import type { SimpleGridProps } from '@apvee/react-layout-kit';

const props: SimpleGridProps = {
  cols: 3,
  spacing: 'md',
  verticalSpacing: 'sm',
};
```

### Customizing Spacing Scale

You can customize the spacing scale used by this component:

```typescript
// types/react-layout-kit.d.ts
declare module '@apvee/react-layout-kit' {
  interface CustomSpacing {
    xs: '4px';
    sm: '8px';
    md: '16px';
    lg: '24px';
    xl: '32px';
  }
}
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

[Learn more about configuration →](./customization.md)

---

## Notes and Warnings

> **Forced Grid Layout:** SimpleGrid always renders `display: grid`. Use [Box](./box.md) if you need a different layout.

> **Equal Columns Only:** SimpleGrid uses `repeat(cols, 1fr)`, so all columns are equal width. For uneven columns, use [Grid](./grid.md).

> **Spacing Fallback:** If `verticalSpacing` is undefined, it falls back to `spacing`. If both are undefined, no gap is applied.

> **Responsive Resolution:** Responsive props are resolved based on container width measured via `ResizeObserver`.
