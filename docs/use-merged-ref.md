# useMergedRef

> A utility hook for combining multiple refs into a single callback ref.

**Package:** @apvee/react-layout-kit  
**Component Type:** Utility  
**Since:** v1.0.0

---

## Overview

`useMergedRef` is a small utility hook for **merging multiple refs** (callback refs and/or `RefObject`s) into a single callback ref. It is commonly used when a component needs to keep an **internal ref** while also supporting a **forwarded ref**.

In this library, `useMergedRef` is a **re-export** of the hook from [`@react-hook/merged-ref`](https://www.npmjs.com/package/@react-hook/merged-ref). Refer to that package for the authoritative API and behavior.

---

## Features

- **Merges multiple refs** into one callback ref
- **Supports callback refs and object refs** (`useRef`, `createRef`)
- **Ideal for forwarded refs** combined with internal refs
- **Re-exported from a maintained external package**

---

## Props

### useMergedRef Parameters

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `...refs` | `React.Ref<T>[]` | `-` | Any number of callback refs or object refs to be merged into a single ref. |

### Inherited Props

Not applicable — this hook does not accept Box props.

---

## Usage

### Basic Usage (forwarded ref + internal ref)

```tsx
import * as React from 'react';
import { useMergedRef } from '@apvee/react-layout-kit';

type InputProps = { label: string };

export const Input = React.forwardRef<HTMLInputElement, InputProps>((props, forwardedRef) => {
  const internalRef = React.useRef<HTMLInputElement>(null);
  const mergedRef = useMergedRef(internalRef, forwardedRef);

  return (
    <label>
      {props.label}
      <input ref={mergedRef} />
    </label>
  );
});
```

### Callback Ref + RefObject

```tsx
import * as React from 'react';
import { useMergedRef } from '@apvee/react-layout-kit';

export function MixedRefs() {
  const objectRef = React.useRef<HTMLInputElement>(null);
  const [node, setNode] = React.useState<HTMLInputElement | null>(null);

  const callbackRef = React.useCallback((el: HTMLInputElement | null) => {
    setNode(el);
  }, []);

  const mergedRef = useMergedRef(objectRef, callbackRef);

  return (
    <input ref={mergedRef} defaultValue={node ? 'Connected' : 'Pending'} />
  );
}
```

### Merging More Than Two Refs

```tsx
import * as React from 'react';
import { useMergedRef } from '@apvee/react-layout-kit';

export function MultiRefInput() {
  const parentRef = React.useRef<HTMLInputElement>(null);
  const internalRef = React.useRef<HTMLInputElement>(null);
  const [node, setNode] = React.useState<HTMLInputElement | null>(null);

  const mergedRef = useMergedRef(
    parentRef,
    internalRef,
    (el: HTMLInputElement | null) => setNode(el)
  );

  return (
    <input ref={mergedRef} placeholder={node ? 'Merged' : 'Waiting'} />
  );
}
```

### With Other Components

```tsx
import * as React from 'react';
import { Box, useMergedRef } from '@apvee/react-layout-kit';

export const FocusableCard = React.forwardRef<HTMLDivElement>((_, forwardedRef) => {
  const internalRef = React.useRef<HTMLDivElement>(null);
  const mergedRef = useMergedRef(internalRef, forwardedRef);

  return (
    <Box
      ref={mergedRef}
      tabIndex={0}
      p="md"
      $border="1px solid #e2e8f0"
      $borderRadius="12px"
    >
      Focusable content
    </Box>
  );
});
```

---

## Responsive Values

`useMergedRef` does not accept responsive values. If you use the merged ref to measure elements or pass `containerWidth`, refer to the responsive system documentation for breakpoint behavior.

**Default Breakpoints:**
- `xs`: 0px (mobile)
- `sm`: 576px (mobile landscape)
- `md`: 768px (tablet)
- `lg`: 992px (desktop)
- `xl`: 1200px (large desktop)
- `xxl`: 1400px (extra large desktop)

> **Note:** Responsive resolution is based on container width, not viewport width. [Learn more about responsive values →](./responsive-values.md)

---

## Best Practices

- **Use for forwarded refs:** Ideal when a component needs both an internal ref and a parent ref.
- **Wrap callback refs in `useCallback`:** Prevents unnecessary re-renders and ref churn.
- **Prefer object refs for imperative APIs:** e.g., `.focus()`, `.scrollIntoView()`.
- **Avoid mixing unstable refs:** Ensure refs are stable across renders.

---

## Related Components

- [useContainerWidth](./use-container-width.md) – measure container width for responsive layouts
- [useElementWidth](./use-element-width.md) – low-level width measurement
- [Box]((./box.md) – common consumer of refs and `containerWidth`

---

## TypeScript

### Type Definitions

```typescript
import * as React from 'react';
import { useMergedRef } from '@apvee/react-layout-kit';

const objectRef = React.useRef<HTMLDivElement>(null);
const mergedRef = useMergedRef<HTMLDivElement>(objectRef, (node) => {
  // node is the same element assigned to objectRef
});
```

> The underlying signature (from `@react-hook/merged-ref`) is:
> `function useMergedRef<T>(...refs: React.Ref<T>[]): React.RefCallback<T>`

### Customizing Breakpoints

If you use the merged ref to provide `containerWidth` to responsive components, you can customize breakpoints:

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

> **External dependency:** This hook is re-exported from `@react-hook/merged-ref`. See the package docs for implementation details.

> **Callback ref output:** The hook returns a callback ref; attach it directly to the element.

> **Do not pass unstable refs:** Always pass refs that remain stable across renders.
