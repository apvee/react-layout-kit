# Space

> A lightweight spacer component for consistent horizontal and vertical spacing.

**Package:** @apvee/react-layout-kit  
**Component Type:** Utility  
**Since:** v1.0.0

---

## Overview

Space is a minimal utility component that renders a simple spacer using the design system spacing scale. It is useful for inserting **consistent horizontal or vertical space** between elements without relying on margins.

Unlike most layout components, Space **does not extend Box**. It only accepts `w`, `h`, and an optional `containerWidth` for responsive resolution. It renders a `div` with `width` and/or `height` set, and returns `null` if both resolve to `undefined`.

Use Space when you need an explicit gap between elements in flex or block layouts.

---

## Features

- **Horizontal (`w`) and vertical (`h`) spacing**
- **Spacing scale integration** (`xxs` → `xxxl` or numeric px values)
- **Responsive values** for both width and height
- **Container-aware resolution** for responsive props
- **Zero layout overhead** (returns `null` when no spacing is defined)
- **Flex-friendly** (uses `flex-shrink: 0` to preserve spacing)

---

## Props

### SpaceProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `w` | `ResponsiveValue<SpacingKey \| number>` | `-` | Horizontal spacing (width). Spacing key or number (px). Supports responsive values. |
| `h` | `ResponsiveValue<SpacingKey \| number>` | `-` | Vertical spacing (height). Spacing key or number (px). Supports responsive values. |
| `containerWidth` | `number` | `-` | Optional container width override for responsive resolution. If not provided, Space measures its container. |

---

## Usage

### Horizontal Spacing

```tsx
import { Space } from '@apvee/react-layout-kit';

export function HorizontalSpacing() {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <span>Left</span>
      <Space w="md" />
      <span>Right</span>
    </div>
  );
}
```

### Vertical Spacing

```tsx
import { Space } from '@apvee/react-layout-kit';

export function VerticalSpacing() {
  return (
    <div>
      <h2>Section A</h2>
      <Space h="lg" />
      <p>Content...</p>
      <Space h="xl" />
      <h2>Section B</h2>
    </div>
  );
}
```

### Both Dimensions

```tsx
import { Space } from '@apvee/react-layout-kit';

export function BothDimensions() {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <span>Start</span>
      <Space w="lg" h="lg" />
      <span>End</span>
    </div>
  );
}
```

### Responsive Spacing

```tsx
import { Space } from '@apvee/react-layout-kit';

export function ResponsiveSpacing() {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <span>Left</span>
      <Space w={{ xs: 'sm', md: 'lg' }} />
      <span>Right</span>
    </div>
  );
}
```

### With Other Components

```tsx
import { Space, Stack, Box } from '@apvee/react-layout-kit';

export function MixedLayout() {
  return (
    <Stack gap="md">
      <Box>Top</Box>
      <Space h="sm" />
      <Box>Middle</Box>
      <Space h="lg" />
      <Box>Bottom</Box>
    </Stack>
  );
}
```

---

## Responsive Values

Both `w` and `h` support responsive values through breakpoint objects. This allows you to specify different spacing at different container widths.

**Default Breakpoints:**
- `xs`: 0px (mobile)
- `sm`: 576px (mobile landscape)
- `md`: 768px (tablet)
- `lg`: 992px (desktop)
- `xl`: 1200px (large desktop)
- `xxl`: 1400px (extra large desktop)

**Usage:**
```tsx
import { Space } from '@apvee/react-layout-kit';

export function ResponsiveGap() {
  return (
    <Space w={{ xs: 'sm', md: 'md', lg: 'lg' }} h={{ xs: 'xs', md: 'sm' }} />
  );
}
```

> **Note:** Responsive resolution is based on the component's container width, not viewport width. You can customize breakpoints via module augmentation. [Learn more about responsive values →](./responsive-values.md)

---

## Best Practices

- **Use Space for explicit gaps:** Prefer Space when you need a fixed spacer, not general layout.
- **Avoid overusing margins:** Space keeps spacing explicit and consistent with the design system.
- **Set at least one dimension:** If both `w` and `h` resolve to `undefined`, Space renders `null`.
- **Use responsive values for adaptive layouts:** Adjust spacing for different container sizes.
- **Use in flex rows:** Space sets `flex-shrink: 0` to prevent collapsing.

---

## Related Components

- [Stack](./stack.md) – vertical layout with gaps
- [Group](./group.md) – horizontal layout with gaps
- [Box](./box.md) – general-purpose layout primitive

---

## TypeScript

### Type Definitions

The component uses the following TypeScript types:

```typescript
import type { SpaceProps } from '@apvee/react-layout-kit';

const props: SpaceProps = {
  w: 'md',
  h: 'sm',
  containerWidth: 480,
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

> **No Box Props:** Space does not extend `BaseBoxProps`. It only accepts `w`, `h`, and `containerWidth`.

> **Null Render:** If both `w` and `h` resolve to `undefined`, Space renders `null` and adds no layout.

> **Flex Shrink Disabled:** Space uses `flex-shrink: 0` to preserve spacing inside flex containers.
