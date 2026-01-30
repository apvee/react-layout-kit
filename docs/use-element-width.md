# useElementWidth

> A hook that measures an element’s width using ResizeObserver with debounced updates.

**Package:** @apvee/react-layout-kit  
**Component Type:** Utility  
**Since:** v1.0.0

---

## Overview

`useElementWidth` is the **core width-measurement hook** in the library. It observes a DOM element with `ResizeObserver`, returns the element’s width in pixels, and supports debounced updates for performance. It is SSR-safe and can be disabled at runtime, resetting the width to `0`.

Use `useElementWidth` when you need a **low-level measurement hook** (e.g., custom layout logic). For a semantic alias designed for layout containers, use [useContainerWidth](./use-container-width.md).

---

## Features

- **ResizeObserver-based** width measurement
- **Immediate initial measurement** (not debounced)
- **Debounced updates** via `debounceMs` (default `16`)
- **SSR-safe guardrails** (skips when `window`/`ResizeObserver` are unavailable)
- **Disable toggle** to stop observing and reset width to `0`
- **Integer pixel output** using `Math.floor`

---

## Props

### useElementWidth Parameters

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
import { useElementWidth } from '@apvee/react-layout-kit';

export function BasicMeasure() {
  const ref = React.useRef<HTMLDivElement>(null);
  const width = useElementWidth(ref);

  return (
    <div ref={ref} style={{ border: '1px solid #e2e8f0', padding: 12 }}>
      Width: {width}px
    </div>
  );
}
```

### Debounced Measurement

```tsx
import * as React from 'react';
import { useElementWidth } from '@apvee/react-layout-kit';

export function DebouncedMeasure() {
  const ref = React.useRef<HTMLDivElement>(null);
  const width = useElementWidth(ref, { debounceMs: 120 });

  return (
    <div ref={ref} style={{ resize: 'horizontal', overflow: 'auto', padding: 12 }}>
      Debounced width: {width}px
    </div>
  );
}
```

### Disabled Toggle

```tsx
import * as React from 'react';
import { useElementWidth } from '@apvee/react-layout-kit';

export function ToggleMeasure() {
  const ref = React.useRef<HTMLDivElement>(null);
  const [disabled, setDisabled] = React.useState(false);
  const width = useElementWidth(ref, { disabled });

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

### With Other Components

```tsx
import * as React from 'react';
import { Box, useElementWidth } from '@apvee/react-layout-kit';

export function MeasuredCard() {
  const ref = React.useRef<HTMLDivElement>(null);
  const width = useElementWidth(ref, { debounceMs: 32 });

  return (
    <Box ref={ref} p="md" $border="1px dashed #cbd5e1" $borderRadius="12px">
      Current width: {width}px
    </Box>
  );
}
```

---

## Responsive Values

`useElementWidth` does not accept responsive values directly, but its output can drive responsive props in other components (e.g., `Box`, `Grid`, `Stack`).

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
import { Box, useElementWidth } from '@apvee/react-layout-kit';

export function ResponsivePadding() {
  const ref = React.useRef<HTMLDivElement>(null);
  const width = useElementWidth(ref);

  return (
    <Box ref={ref} p={{ xs: 'sm', md: 'lg' }} containerWidth={width}>
      Responsive padding driven by element width.
    </Box>
  );
}
```

> **Note:** Responsive resolution is based on the component's container width, not the viewport. You can customize breakpoints via module augmentation. [Learn more about responsive values →](./responsive-values.md)

---

## Best Practices

- **Use `useElementWidth` for low-level measurement:** Prefer `useContainerWidth` for layout containers.
- **Pass a stable ref:** Initialize the ref once with `useRef` and pass it directly.
- **Choose an appropriate debounce:** Use smaller values for real-time feedback, larger values for performance.
- **Handle SSR safely:** The hook returns `0` when measurement isn’t available.
- **Avoid layout thrash:** Minimize expensive calculations triggered by width changes.

---

## Related Components

- [useContainerWidth](./use-container-width.md) – semantic wrapper for container layouts
- [Box]((./box.md) – accepts `containerWidth` for responsive props
- [Stack]((.//stack.md) – vertical layout with responsive props

---

## TypeScript

### Type Definitions

```typescript
import * as React from 'react';
import { useElementWidth } from '@apvee/react-layout-kit';

const ref = React.useRef<HTMLDivElement>(null);
const width = useElementWidth(ref, { debounceMs: 32, disabled: false });
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

> **Integer output:** Width values are returned as integers via `Math.floor`.

> **Initial value:** Starts at `0` until the element is measured.

> **ResizeObserver required:** Measurement is skipped if `ResizeObserver` is unavailable.
