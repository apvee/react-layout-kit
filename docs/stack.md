# Stack

> A vertical flex container for composing content with consistent spacing and alignment.

**Package:** @apvee/react-layout-kit  
**Component Type:** Layout  
**Since:** v1.0.0

---

## Overview

Stack is a focused layout component that arranges its children in a **vertical flex column** (`flex-direction: column`). It is ideal for forms, card lists, content sections, and any layout where elements should be stacked top-to-bottom with consistent spacing.

It wraps the [Box](./box.md) component, forcing `display: flex` and `flex-direction: column`, while exposing a minimal set of props for alignment and spacing. All props support responsive values resolved against the **container width** (not the viewport).

Use Stack when you need simple, vertical layout composition without the extra complexity of a full flex container.

---

## Features

- **Vertical flex layout** with `flex-direction: column`
- **Gap spacing** using the design system spacing scale or custom values
- **Cross-axis alignment** via `align` (`align-items`)
- **Main-axis alignment** via `justify` (`justify-content`)
- **Responsive values** for all layout props
- **Container-aware resolution** for responsive props
- **Composition support** via `asChild`
- **Full Box styling support** through inherited props

---

## Props

### StackProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `align` | `ResponsiveValue<CSS.Property.AlignItems>` | `"stretch"` | Maps to `align-items`. Supports responsive values. Common values: `stretch`, `flex-start`, `flex-end`, `center`, `baseline`. |
| `gap` | `ResponsiveValue<SpacingKey \| number>` | `-` | Gap between items. Spacing scale key or number (px). Supports responsive values. When undefined, no gap is applied. |
| `justify` | `ResponsiveValue<CSS.Property.JustifyContent>` | `"flex-start"` | Maps to `justify-content`. Supports responsive values. Common values: `flex-start`, `flex-end`, `center`, `space-between`, `space-around`, `space-evenly`. |

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
import { Stack } from '@apvee/react-layout-kit';

export function BasicStack() {
  return (
    <Stack gap="md">
      <div>Item 1</div>
      <div>Item 2</div>
      <div>Item 3</div>
    </Stack>
  );
}
```

### Responsive Layout

```tsx
import { Stack } from '@apvee/react-layout-kit';

export function ResponsiveStack() {
  return (
    <Stack
      gap={{ xs: 'sm', md: 'md', lg: 'xl' }}
      align={{ xs: 'stretch', md: 'center' }}
      justify={{ xs: 'flex-start', md: 'center' }}
    >
      <div>Responsive Item 1</div>
      <div>Responsive Item 2</div>
      <div>Responsive Item 3</div>
    </Stack>
  );
}
```

### Advanced Composition (asChild)

```tsx
import { Stack } from '@apvee/react-layout-kit';

export function SemanticSection() {
  return (
    <Stack asChild gap="sm">
      <section aria-label="Card list">
        <article>Card 1</article>
        <article>Card 2</article>
        <article>Card 3</article>
      </section>
    </Stack>
  );
}
```

### With Other Components

```tsx
import { Stack, Group, Box } from '@apvee/react-layout-kit';

export function FormLayout() {
  return (
    <Stack gap="lg" $backgroundColor="#f8fafc" p="lg" $borderRadius="12px">
      <Box asChild>
        <label>
          Name
          <input type="text" />
        </label>
      </Box>
      <Box asChild>
        <label>
          Email
          <input type="email" />
        </label>
      </Box>
      <Group gap="sm" justify="flex-end">
        <button type="button">Cancel</button>
        <button type="submit">Save</button>
      </Group>
    </Stack>
  );
}
```

---

## Responsive Values

Many props in Stack support responsive values through breakpoint objects. This allows you to specify different values for different container widths.

**Default Breakpoints:**
- `xs`: 0px (mobile)
- `sm`: 576px (mobile landscape)
- `md`: 768px (tablet)
- `lg`: 992px (desktop)
- `xl`: 1200px (large desktop)
- `xxl`: 1400px (extra large desktop)

**Usage:**
```tsx
import { Stack } from '@apvee/react-layout-kit';

export function ResponsiveGap() {
  return (
    <Stack gap={{ xs: 'sm', md: 'md', lg: 'lg' }}>
      <div>Item</div>
      <div>Item</div>
    </Stack>
  );
}
```

> **Note:** Responsive resolution is based on the component's container width, not viewport width. You can customize breakpoints via module augmentation. [Learn more about responsive values →](./responsive-values.md)

---

## Best Practices

- **Use Stack for vertical layout:** Prefer Stack over Flex when you only need a column layout.
- **Set `gap` explicitly:** Stack does not apply a default gap, so specify one for consistent spacing.
- **Leverage `align` for narrow stacks:** Use `align="center"` to keep narrow cards aligned in a column.
- **Use `containerWidth` for deterministic behavior:** Useful in Storybook/tests when container measurement is unstable.
- **Avoid overriding `display` or `flexDirection`:** Stack forces `display: flex` and `flex-direction: column`.
- **Use `asChild` for semantics:** Render `section`, `form`, or `article` while keeping Stack layout behavior.

---

## Related Components

- [Box](./box.md) – foundational styling primitive
- [Group](./group.md) – horizontal equivalent of Stack
- [Flex](./flex.md) – full flexbox control
- [SimpleGrid](./simple-grid.md) – equal-width grid layouts

---

## TypeScript

### Type Definitions

The component uses the following TypeScript types:

```typescript
import type { StackProps } from '@apvee/react-layout-kit';

const props: StackProps = {
  gap: 'md',
  align: 'stretch',
  justify: 'flex-start',
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

> **Forced Flex Column:** Stack always renders `display: flex` and `flex-direction: column`. Use [Box](./box.md) if you need a different layout.

> **No Default Gap:** If `gap` is undefined, Stack applies no spacing between items.

> **Responsive Resolution:** Responsive props are resolved based on container width measured via `ResizeObserver`. Provide `containerWidth` for deterministic results.
