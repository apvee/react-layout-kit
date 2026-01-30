# useContainerWidth

> A hook that measures an element’s width for container-aware responsive layouts.

**Package:** @apvee/react-layout-kit  
**Component Type:** Utility  
**Since:** v1.0.0

---

## Overview

`useContainerWidth` is a public, SSR-safe hook that measures an element’s width using `ResizeObserver`. It is a **semantic alias** of `useElementWidth` and shares identical behavior. The hook returns the current width in pixels (integer), which is commonly used as the `containerWidth` prop for responsive components like `Box`, `Stack`, `Grid`, and others.

Use `useContainerWidth` when you want to drive responsive behavior based on **container width** (not viewport width), especially in components that accept `ResponsiveValue<T>` props.

---

## Features

- **SSR-safe measurement** (skips when `window` or `ResizeObserver` is unavailable)
- **Debounced updates** for performance (`debounceMs`, default `16`)
- **Disable toggle** to stop measurements and reset width to `0`
- **Container-aware responsive workflows** (feeds `containerWidth` to layout components)
- **Stable API** that mirrors `useElementWidth`

---

## Props

### useContainerWidth Parameters

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `elementRef` | `React.RefObject<T>` | `-` | Ref to the element whose width should be measured. |
| `options` | `{ disabled?: boolean; debounceMs?: number }` | `{}` | Optional configuration object. |
| `options.disabled` | `boolean` | `false` | When `true`, measurement is stopped and the hook resets width to `0`. |
| `options.debounceMs` | `number` | `16` | Debounce delay in milliseconds for resize updates (default is ~60fps). |

### Inherited Props

Not applicable — this hook does not accept Box props.

---

## Usage

### Basic Usage

```tsx
import * as React from 'react';
import { useContainerWidth } from '@apvee/react-layout-kit';

export function BasicMeasure() {
  const ref = React.useRef<HTMLDivElement>(null);
  const width = useContainerWidth(ref);

  return (
    <div ref={ref} style={{ border: '1px solid #e2e8f0', padding: 12 }}>
      Width: {width}px
    </div>
  );
}
```

### Responsive Layout

```tsx
import * as React from 'react';
import { Box, useContainerWidth } from '@apvee/react-layout-kit';

export function ResponsiveBox() {
  const ref = React.useRef<HTMLDivElement>(null);
  const width = useContainerWidth(ref);

  return (
    <Box ref={ref} p={{ xs: 'xs', md: 'md', lg: 'lg' }} containerWidth={width}>
      Padding changes with container width.
    </Box>
  );
}
```

### Debounced Updates

```tsx
import * as React from 'react';
import { useContainerWidth } from '@apvee/react-layout-kit';

export function DebouncedMeasure() {
  const ref = React.useRef<HTMLDivElement>(null);
  const width = useContainerWidth(ref, { debounceMs: 120 });

  return (
    <div ref={ref} style={{ resize: 'horizontal', overflow: 'auto', padding: 12 }}>
      Slow updates: {width}px
    </div>
  );
}
```

### Disabled Measurement

```tsx
import * as React from 'react';
import { useContainerWidth } from '@apvee/react-layout-kit';

export function ToggleMeasure() {
  const ref = React.useRef<HTMLDivElement>(null);
  const [disabled, setDisabled] = React.useState(false);
  const width = useContainerWidth(ref, { disabled });

  return (
    <div>
      <button type="button" onClick={() => setDisabled((v) => !v)}>
        {disabled ? 'Enable' : 'Disable'} measurement
      </button>
      <div ref={ref} style={{ border: '1px solid #e2e8f0', padding: 12, marginTop: 8 }}>
        Width: {width}px
      </div>
    </div>
  );
}
```

---

## Responsive Values

`useContainerWidth` does not accept responsive values directly, but it enables responsive props by providing the `containerWidth` value to other components.

**Default Breakpoints:**
- `xs`: 0px (mobile)
- `sm`: 576px (mobile landscape)
- `md`: 768px (tablet)
- `lg`: 992px (desktop)
- `xl`: 1200px (large desktop)
- `xxl`: 1400px (extra large desktop)

**Usage:**
```tsx
import * as React from 'react';
import { Box, useContainerWidth } from '@apvee/react-layout-kit';

export function ResponsivePadding() {
  const ref = React.useRef<HTMLDivElement>(null);
  const width = useContainerWidth(ref);

  return (
    <Box ref={ref} p={{ xs: 'sm', md: 'lg' }} containerWidth={width}>
      Responsive padding driven by container width.
    </Box>
  );
}
```

> **Note:** Responsive resolution is based on the component's container width, not the viewport. You can customize breakpoints via module augmentation. [Learn more about responsive values →](./responsive-values.md)

---

## Best Practices

- **Measure the same element you pass `containerWidth` to:** This keeps responsive calculations consistent.
- **Use `debounceMs` to reduce update frequency:** Helpful when resizing or animating layouts.
- **Handle SSR gracefully:** The hook returns `0` when `window`/`ResizeObserver` is unavailable.
- **Avoid excessive re-renders:** Use debouncing and minimal layout work in render based on width.
- **Prefer `useContainerWidth` for UI layout logic:** Use `useElementWidth` for more general measurement needs.

---

## Related Components

- [useElementWidth](./use-element-width.md) – core width-measurement hook
- [Box](./box.md) – accepts `containerWidth` for responsive props
- [Stack]((./stack.md) – vertical layout with responsive props
- [Grid]((./grid.md) – responsive grid layout

---

## TypeScript

### Type Definitions

```typescript
import * as React from 'react';
import { useContainerWidth } from '@apvee/react-layout-kit';

const ref = React.useRef<HTMLDivElement>(null);
const width = useContainerWidth(ref, { debounceMs: 32, disabled: false });
```

### Customizing Breakpoints

You can customize the responsive breakpoints used by components that consume `containerWidth`:

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

> **Returns integer pixels:** The width is `Math.floor`’d before being returned.

> **Disabled resets width to 0:** When `disabled` is `true`, measurement stops and the hook returns `0`.

> **ResizeObserver required:** If `ResizeObserver` is unavailable, measurement is skipped and width remains `0`.
