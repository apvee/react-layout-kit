# Container

> Centers content horizontally and applies a max-width constraint for consistent page layouts.

**Package:** @apvee/react-layout-kit  
**Component Type:** Layout  
**Since:** v1.0.0

---

## Overview

The **Container** component is a specialized layout primitive that centers its content horizontally within a maximum width boundary. It's commonly used as the outermost wrapper for page sections, ensuring content remains readable and well-proportioned across different screen sizes.

Internally, Container renders a [Box](./box.md) with forced layout properties:
- `width: 100%`
- `margin-left/right: auto` (for horizontal centering)
- `max-width` derived from the `size` prop (or `none` when `fluid` is true)
- Fixed horizontal padding: `padding-left/right: 1rem`

The component is designed to work with the library's responsive system, accepting responsive objects for both `size` and `fluid` props.

---

## Features

- **Horizontal centering** with automatic left/right margins
- **Max-width constraint** via the `size` prop (default: 1200px)
- **Fluid mode** to disable max-width and use full available width
- **Responsive sizing** with ResponsiveValue support for both `size` and `fluid`
- **Fixed horizontal padding** (1rem) for consistent inner spacing
- **Composition support** via `asChild` for semantic HTML elements
- **Full Box inheritance** for additional styling and responsive control

---

## Props

### Container-specific Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `ResponsiveValue<number>` | `1200` | Maximum width in pixels. Supports responsive objects with breakpoint keys. |
| `fluid` | `ResponsiveValue<boolean>` | `false` | When true, removes max-width constraint and uses full width. Supports responsive objects. |

### Inherited from Box

Container extends [BaseBoxProps](./box.md#props), so you can use all Box props including:
- Layout props: `$display`, `$overflow`, etc.
- Spacing props: `$margin`, `$padding`, or their short forms (`m`, `p`)
- Styling props: `$backgroundColor`, `$border`, etc.
- Responsive control: `containerWidth` for breakpoint resolution

---

## Usage

### Basic Container

The simplest usage with default max-width of 1200px:

```tsx
import { Container } from '@apvee/react-layout-kit';

function Page() {
  return (
    <Container>
      <h1>Welcome</h1>
      <p>This content is centered and constrained to 1200px.</p>
    </Container>
  );
}
```

### Custom Width

Adjust the max-width to suit your layout needs:

```tsx
// Article layout with narrow width for readability
<Container size={720}>
  <article>
    <h1>Article Title</h1>
    <p>Long-form content benefits from narrower widths...</p>
  </article>
</Container>

// Wide layout for dashboards
<Container size={1440}>
  <Dashboard />
</Container>
```

### Fluid Container

Remove the max-width constraint for full-width sections:

```tsx
<Container fluid>
  <Banner>This spans the full width (minus padding)</Banner>
</Container>
```

### Responsive Sizing

Use responsive objects to change container width at different breakpoints:

```tsx
<Container
  size={{ xs: 360, sm: 540, md: 768, lg: 1024, xl: 1280 }}
  containerWidth={containerWidth}
>
  <Content />
</Container>
```

**Important:** For responsive `size` or `fluid` to work correctly, you must pass `containerWidth`. Without it, the component falls back to the first defined value in the responsive object.

### Responsive Fluid Mode

Toggle between fluid and constrained modes at different breakpoints:

```tsx
<Container
  fluid={{ xs: true, md: false }}  // Fluid on mobile, constrained on desktop
  size={{ md: 768, lg: 1024 }}
  containerWidth={containerWidth}
>
  <Content />
</Container>
```

### Semantic HTML with asChild

Use `asChild` to render semantic elements while maintaining Container behavior:

```tsx
<Container asChild size={720}>
  <article>
    <h1>Blog Post</h1>
    <p>Content...</p>
  </article>
</Container>
```

### Additional Styling

Combine with Box props for custom styling:

```tsx
<Container
  size={960}
  $backgroundColor="#f8fafc"
  $borderTop="1px solid #e2e8f0"
  $borderBottom="1px solid #e2e8f0"
  py="xl"
>
  <Section />
</Container>
```

---

## Responsive Values

### Understanding Responsive Resolution

Container's `size` and `fluid` props support ResponsiveValue objects:

```tsx
type ResponsiveValue<T> = T | { xs?: T; sm?: T; md?: T; lg?: T; xl?: T; xxl?: T; xxxl?: T };
```

**With `containerWidth`** (recommended):
```tsx
// Resolves based on containerWidth measurement
<Container
  size={{ xs: 360, md: 768, lg: 1024 }}
  containerWidth={containerWidth}
>
  {/* Correct resolution at each breakpoint */}
</Container>
```

**Without `containerWidth`** (fallback):
```tsx
// Falls back to first defined key (xs: 360)
<Container size={{ xs: 360, md: 768, lg: 1024 }}>
  {/* Always uses 360px */}
</Container>
```

### Why containerWidth is Required

Container's max-width directly affects its measured width, creating a circular dependency:
1. Container needs `containerWidth` to resolve its `size`
2. But Container's `size` determines its actual width
3. Without external measurement, it can't know which breakpoint to use

**Solution:** Measure Container's parent width and pass it via `containerWidth`:

```tsx
import { useContainerWidth } from '@apvee/react-layout-kit';

function Page() {
  const [ref, containerWidth] = useContainerWidth<HTMLDivElement>();

  return (
    <div ref={ref}>
      <Container
        size={{ xs: 360, md: 768, lg: 1024 }}
        containerWidth={containerWidth}
      >
        <Content />
      </Container>
    </div>
  );
}
```

### Breakpoint Fallback Behavior

When `containerWidth` is not provided, Container uses the **first defined key** from responsive objects:

```tsx
// These will all use 720px:
<Container size={{ xs: 720, md: 960 }} />
<Container size={{ sm: 720, lg: 1024 }} />
<Container size={{ md: 720, xl: 1280 }} />
```

This ensures the component still renders, but without responsive behavior.

---

## Best Practices

### 1. Use Standard Widths

Stick to common container sizes for consistency:

```tsx
// Common patterns
<Container size={1200}>   {/* Default - most pages */}
<Container size={1440}>   {/* Wide layouts */}
<Container size={960}>    {/* Medium content */}
<Container size={720}>    {/* Articles/blogs */}
<Container size={540}>    {/* Narrow forms */}
```

### 2. Measure Parent for Responsive Sizing

Always provide `containerWidth` when using responsive values:

```tsx
// ✅ Correct - measures parent width
function Page() {
  const [ref, containerWidth] = useContainerWidth<HTMLDivElement>();

  return (
    <div ref={ref}>
      <Container
        size={{ xs: 360, md: 768, lg: 1024 }}
        containerWidth={containerWidth}
      >
        <Content />
      </Container>
    </div>
  );
}

// ❌ Incorrect - will use fallback value (360)
<Container size={{ xs: 360, md: 768, lg: 1024 }}>
  <Content />
</Container>
```

### 3. Nest Containers Carefully

Avoid nesting multiple Containers as it creates conflicting centering:

```tsx
// ❌ Avoid - nested centering conflicts
<Container size={1200}>
  <Container size={960}>
    <Content />
  </Container>
</Container>

// ✅ Better - use Box for nested sections
<Container size={1200}>
  <Box $maxWidth="960px" $margin="0 auto">
    <Content />
  </Box>
</Container>
```

### 4. Use Fluid Mode Strategically

Reserve fluid mode for sections that should span full width:

```tsx
function Layout() {
  return (
    <>
      {/* Hero spans full width */}
      <Container fluid>
        <Hero />
      </Container>

      {/* Content is constrained */}
      <Container size={960}>
        <Article />
      </Container>

      {/* Footer spans full width */}
      <Container fluid>
        <Footer />
      </Container>
    </>
  );
}
```

### 5. Account for Fixed Padding

Remember that Container applies 1rem horizontal padding:

```tsx
// Container always has 1rem padding left/right
<Container size={960}>
  {/* Effective content width: 960px - 2rem */}
  <Content />
</Container>

// To override padding, use Box props
<Container size={960} px={0}>
  {/* Full 960px available */}
  <FullWidthContent />
</Container>
```

### 6. Combine with Page Sections

Use Container for each major page section:

```tsx
function LandingPage() {
  return (
    <>
      <Container asChild size={1200}>
        <header>
          <Navigation />
        </header>
      </Container>

      <Container asChild fluid>
        <section>
          <Hero />
        </section>
      </Container>

      <Container asChild size={960}>
        <main>
          <Features />
          <Pricing />
        </main>
      </Container>

      <Container asChild fluid>
        <footer>
          <FooterContent />
        </footer>
      </Container>
    </>
  );
}
```

### 7. Avoid Overriding Layout Props

Container forces specific layout props for its behavior to work:

```tsx
// ❌ Avoid - these will be overridden
<Container $width="50%" $marginLeft="20px" $maxWidth="800px">
  <Content />
</Container>

// ✅ Correct - use size and let Container handle layout
<Container size={800}>
  <Content />
</Container>
```

---

## Related Components

- [Box](./box.md) - Foundation primitive; Container is built on Box
- [Center](./center.md) - Centers content both horizontally and vertically using flexbox
- [Stack](./stack.md) - Vertical spacing for content within containers
- [Group](./group.md) - Horizontal spacing for content within containers

---

## TypeScript

Container is fully typed with TypeScript:

```tsx
import type { ContainerProps } from '@apvee/react-layout-kit';

// All props are optional except children
const containerProps: ContainerProps = {
  size: 1200,
  fluid: false,
  containerWidth: 1024,
  asChild: false,
  children: <div>Content</div>,
};

// Responsive values are properly typed
const responsiveSize: ContainerProps['size'] = {
  xs: 360,
  sm: 540,
  md: 768,
  lg: 1024,
  xl: 1280,
};

const responsiveFluid: ContainerProps['fluid'] = {
  xs: true,
  md: false,
};

// Access via namespace import
import { Container } from '@apvee/react-layout-kit';
type Props = React.ComponentProps<typeof Container>;
```

### Type Definitions

```tsx
interface ContainerProps extends BaseBoxProps {
  /**
   * Maximum width in pixels. Supports responsive objects.
   * @default 1200
   */
  size?: ResponsiveValue<number>;

  /**
   * When true, removes max-width constraint. Supports responsive objects.
   * @default false
   */
  fluid?: ResponsiveValue<boolean>;

  /**
   * Container width for resolving responsive size/fluid.
   * Required for proper responsive behavior.
   */
  containerWidth?: number;
}
```

---

## Notes and Warnings

### Circular Measurement Dependency

Container has a circular dependency for responsive resolution:
- It needs `containerWidth` to determine its `max-width`
- But its `max-width` affects its actual width
- Without external measurement, it uses the first key as fallback

**Always measure the parent container and pass `containerWidth` for responsive behavior.**

### Fixed Horizontal Padding

Container applies **1rem** padding on left and right by default:

```tsx
// Effective content width = size - 2rem
<Container size={1200}>  {/* Content area: ~1168px */}
  <Content />
</Container>

// Override if needed
<Container size={1200} px={0}>  {/* Content area: 1200px */}
  <Content />
</Container>
```

### Forced Layout Properties

Container overrides certain Box props to maintain its behavior:
- `width: 100%` (always)
- `marginLeft: auto` and `marginRight: auto` (for centering)
- `maxWidth: ${size}px` (unless fluid is true)
- `paddingLeft: 1rem` and `paddingRight: 1rem` (unless overridden)

Trying to set these manually via dollar props will be ignored.

### Fluid Mode Ignores Size

When `fluid` resolves to `true`, the `size` prop is ignored:

```tsx
// Size is ignored because fluid is true
<Container size={960} fluid>
  {/* max-width: none */}
</Container>

// Responsive: fluid takes precedence when true
<Container
  size={{ xs: 360, md: 768 }}
  fluid={{ xs: true, md: false }}
  containerWidth={containerWidth}
>
  {/* xs: no max-width, md: max-width 768px */}
</Container>
```

### Browser Compatibility

Container uses standard CSS properties with excellent browser support:
- `margin: auto` (all browsers)
- `max-width` (all browsers)
- `box-sizing: border-box` (IE8+)

The responsive behavior depends on the parent's width measurement, which uses `ResizeObserver` (requires polyfill for IE11).

---

## See Also

- [Responsive System Guide](../guides/responsive-system.md) - Understanding container-width based breakpoints
- [useContainerWidth Hook](../hooks/use-container-width.md) - Measure container width for responsive resolution
- [Box Component](./box.md) - Foundation primitive with all styling capabilities
