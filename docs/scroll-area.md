# ScrollArea

> A flexible scroll area component that provides custom scrollbars with native scrolling performance.

**Package:** @apvee/react-layout-kit  
**Component Type:** Layout  
**Since:** v1.0.0

---

## Overview

The **ScrollArea** component wraps content in a scrollable container with custom overlay scrollbars that maintain native scroll performance. Unlike browser-native scrollbars that vary across platforms, ScrollArea provides consistent, styleable scrollbars while preserving smooth, native scrolling behavior.

Key capabilities:
- **Native scroll performance**: Uses browser's native scrolling with custom visual scrollbars
- **Multiple visibility modes**: `hover`, `always`, or `scroll` - control when scrollbars appear
- **Responsive sizing**: Scrollbar thickness adapts to breakpoints via responsive `size` prop
- **Directional control**: Show `vertical`, `horizontal`, or `both` scrollbars
- **RTL support**: Proper right-to-left layout support via `dir` prop
- **Customizable appearance**: Custom colors for track, thumb, hover, and active states
- **Accessible dragging**: Minimum 44px touch targets for thumb dragging
- **Composition support**: `asChild` pattern for semantic HTML

The component uses a viewport element with hidden native scrollbars and overlays custom scrollbars that sync with scroll position and handle drag interactions.

---

## Features

- **Custom scrollbars** with consistent cross-platform appearance
- **Native scroll performance** without JavaScript-based scrolling
- **Three visibility modes** for different UX patterns
- **Responsive scrollbar sizing** with breakpoint objects
- **Bi-directional scrolling** with independent or combined scrollbars
- **RTL layout support** for international applications
- **Fully customizable colors** for all scrollbar states
- **Touch-friendly** with minimum 44px thumb size
- **Composition support** via `asChild` pattern

---

## Props

### ScrollArea-specific Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `ResponsiveValue<'small' \| 'medium' \| 'large'>` | `'small'` | Scrollbar track thickness. `small`: 4px, `medium`: 8px, `large`: 12px. Supports responsive objects. |
| `radius` | `'none' \| 'small' \| 'medium' \| 'large' \| 'full'` | `'small'` | Border radius for scrollbars. `none`: 0, `small`: 4px, `medium`: 8px, `large`: 12px, `full`: 9999px. |
| `scrollbars` | `'vertical' \| 'horizontal' \| 'both'` | `'both'` | Which scrollbars to display when content overflows. |
| `type` | `'hover' \| 'always' \| 'scroll'` | `'hover'` | Scrollbar visibility behavior. `hover`: Show on hover/focus/scroll, hide after delay. `always`: Always visible. `scroll`: Show while scrolling, hide after delay. |
| `scrollHideDelay` | `number` | `600` | Delay in milliseconds before hiding scrollbars (for `hover` and `scroll` types). |
| `dir` | `'ltr' \| 'rtl'` | `'ltr'` | Text direction for RTL support. Affects vertical scrollbar positioning. |
| `trackColor` | `string` | `'rgba(0, 0, 0, 0.05)'` | Custom background color for scrollbar tracks. |
| `thumbColor` | `string` | `'rgba(0, 0, 0, 0.3)'` | Custom color for scrollbar thumbs. |
| `thumbHoverColor` | `string` | `'rgba(0, 0, 0, 0.5)'` | Custom color for scrollbar thumbs on hover. |
| `thumbActiveColor` | `string` | `'rgba(0, 0, 0, 0.7)'` | Custom color for scrollbar thumbs when dragging/active. |
| `asChild` | `boolean` | `false` | When true, renders as child component (composition pattern). |
| `className` | `string` | `undefined` | Additional CSS class name for the container. |
| `style` | `React.CSSProperties` | `undefined` | Inline styles for the container (useful for width/height). |

---

## Usage

### Basic Vertical Scrolling

Create a scrollable area with vertical overflow:

```tsx
import { ScrollArea } from '@apvee/react-layout-kit';

function ContentPanel() {
  return (
    <ScrollArea style={{ width: 400, height: 300 }}>
      <div>
        {/* Long content that overflows vertically */}
        {Array.from({ length: 50 }).map((_, i) => (
          <p key={i}>Line {i + 1}</p>
        ))}
      </div>
    </ScrollArea>
  );
}
```

### Horizontal Scrolling

Show only horizontal scrollbar for wide content:

```tsx
<ScrollArea
  scrollbars="horizontal"
  style={{ width: 400, height: 200 }}
>
  <div style={{ display: 'flex', gap: 16, minWidth: 1200 }}>
    <Card />
    <Card />
    <Card />
    {/* More cards... */}
  </div>
</ScrollArea>
```

### Both Directions

Allow scrolling in both directions:

```tsx
<ScrollArea
  scrollbars="both"
  style={{ width: 400, height: 300 }}
>
  <div style={{ minWidth: 1000, minHeight: 800 }}>
    {/* Content larger than viewport in both dimensions */}
    <LargeTable />
  </div>
</ScrollArea>
```

### Visibility Modes

Control when scrollbars are visible:

```tsx
// Show on hover, focus, or scroll (default)
<ScrollArea type="hover" style={{ width: 400, height: 300 }}>
  <Content />
</ScrollArea>

// Always visible when content overflows
<ScrollArea type="always" style={{ width: 400, height: 300 }}>
  <Content />
</ScrollArea>

// Show while scrolling, hide after delay
<ScrollArea type="scroll" style={{ width: 400, height: 300 }}>
  <Content />
</ScrollArea>
```

### Custom Hide Delay

Adjust how long scrollbars remain visible:

```tsx
// Hide quickly (300ms)
<ScrollArea
  type="hover"
  scrollHideDelay={300}
  style={{ width: 400, height: 300 }}
>
  <Content />
</ScrollArea>

// Keep visible longer (1200ms)
<ScrollArea
  type="scroll"
  scrollHideDelay={1200}
  style={{ width: 400, height: 300 }}
>
  <Content />
</ScrollArea>
```

### Scrollbar Sizing

Control scrollbar thickness:

```tsx
// Thin scrollbars (4px)
<ScrollArea size="small" style={{ width: 400, height: 300 }}>
  <Content />
</ScrollArea>

// Medium scrollbars (8px)
<ScrollArea size="medium" style={{ width: 400, height: 300 }}>
  <Content />
</ScrollArea>

// Thick scrollbars (12px)
<ScrollArea size="large" style={{ width: 400, height: 300 }}>
  <Content />
</ScrollArea>
```

### Custom Colors

Customize scrollbar appearance:

```tsx
<ScrollArea
  type="always"
  trackColor="rgba(15, 23, 42, 0.08)"
  thumbColor="rgba(59, 130, 246, 0.55)"
  thumbHoverColor="rgba(59, 130, 246, 0.75)"
  thumbActiveColor="rgba(59, 130, 246, 0.95)"
  style={{ width: 400, height: 300 }}
>
  <Content />
</ScrollArea>
```

### Border Radius

Control scrollbar and thumb rounding:

```tsx
// No rounding
<ScrollArea radius="none" style={{ width: 400, height: 300 }}>
  <Content />
</ScrollArea>

// Fully rounded (pill-shaped)
<ScrollArea radius="full" style={{ width: 400, height: 300 }}>
  <Content />
</ScrollArea>

// Medium rounding
<ScrollArea radius="medium" style={{ width: 400, height: 300 }}>
  <Content />
</ScrollArea>
```

### RTL Support

Support right-to-left layouts:

```tsx
<ScrollArea
  dir="rtl"
  style={{ width: 400, height: 300 }}
>
  <div style={{ direction: 'rtl' }}>
    {/* RTL content */}
    <p>محتوى باللغة العربية</p>
  </div>
</ScrollArea>
```

### Semantic HTML with asChild

Render semantic elements while maintaining ScrollArea behavior:

```tsx
<ScrollArea
  asChild
  type="hover"
  style={{ width: 400, height: 300 }}
>
  <section aria-label="Latest articles">
    <ArticleList />
  </section>
</ScrollArea>
```

---

## Responsive Values

### Responsive Scrollbar Size

Change scrollbar thickness at different breakpoints:

```tsx
<ScrollArea
  size={{ xs: 'small', md: 'medium', lg: 'large' }}
  type="always"
  style={{ width: '100%', height: 400 }}
>
  <Content />
</ScrollArea>
```

This creates:
- **Mobile (xs)**: Thin 4px scrollbars for compact displays
- **Tablet (md)**: Medium 8px scrollbars
- **Desktop (lg+)**: Thick 12px scrollbars for easier interaction

### Automatic Width Measurement

ScrollArea automatically measures its own width for responsive resolution:

```tsx
// Responsive size works automatically
<ScrollArea
  size={{ xs: 'small', lg: 'large' }}
  style={{ width: '100%', height: 400 }}
>
  <Content />
</ScrollArea>
```

### Explicit containerWidth

For deterministic resolution (useful in Storybook or testing):

```tsx
import { useContainerWidth } from '@apvee/react-layout-kit';

function ResponsiveScroll() {
  const [ref, containerWidth] = useContainerWidth<HTMLDivElement>();

  return (
    <div ref={ref}>
      <ScrollArea
        size={{ xs: 'small', lg: 'large' }}
        style={{ width: '100%', height: 400 }}
      >
        <Content />
      </ScrollArea>
    </div>
  );
}
```

---

## Best Practices

### 1. Always Set Container Dimensions

ScrollArea requires explicit dimensions to determine overflow:

```tsx
// ✅ Correct - explicit width and height
<ScrollArea style={{ width: 400, height: 300 }}>
  <Content />
</ScrollArea>

// ❌ Won't work - no height constraint
<ScrollArea style={{ width: 400 }}>
  <Content />
</ScrollArea>

// ✅ Also works - parent dimensions
<div style={{ width: 400, height: 300 }}>
  <ScrollArea style={{ width: '100%', height: '100%' }}>
    <Content />
  </ScrollArea>
</div>
```

### 2. Choose Appropriate Visibility Type

Match visibility behavior to your use case:

```tsx
// ✅ hover - for content-focused areas (articles, documents)
<ScrollArea type="hover">
  <Article />
</ScrollArea>

// ✅ always - for data tables, code editors
<ScrollArea type="always">
  <DataTable />
</ScrollArea>

// ✅ scroll - for image galleries, carousels
<ScrollArea type="scroll">
  <ImageGallery />
</ScrollArea>
```

### 3. Use Appropriate Scrollbar Size

Consider the context and user interaction:

```tsx
// ✅ small - for compact UIs, sidebars
<ScrollArea size="small">
  <Sidebar />
</ScrollArea>

// ✅ medium - for general content areas
<ScrollArea size="medium">
  <MainContent />
</ScrollArea>

// ✅ large - for touch interfaces, accessibility
<ScrollArea size="large">
  <TouchOptimizedContent />
</ScrollArea>
```

### 4. Ensure Content Overflows

ScrollArea only shows scrollbars when content exceeds container:

```tsx
// ✅ Content larger than container
<ScrollArea style={{ width: 400, height: 300 }}>
  <div style={{ height: 600 }}>
    {/* Overflows vertically */}
  </div>
</ScrollArea>

// ⚠️ No scrollbar - content fits
<ScrollArea style={{ width: 400, height: 300 }}>
  <div style={{ height: 200 }}>
    {/* Doesn't overflow */}
  </div>
</ScrollArea>
```

### 5. Consider Padding

Add padding to the content, not the ScrollArea container:

```tsx
// ✅ Padding on content
<ScrollArea style={{ width: 400, height: 300 }}>
  <div style={{ padding: 16 }}>
    <Content />
  </div>
</ScrollArea>

// ❌ Padding on ScrollArea affects scroll calculation
<ScrollArea style={{ width: 400, height: 300, padding: 16 }}>
  <Content />
</ScrollArea>
```

### 6. Adjust Hide Delay for Context

Match delay to user expectations:

```tsx
// ✅ Quick hide for clean UI
<ScrollArea type="hover" scrollHideDelay={300}>
  <Article />
</ScrollArea>

// ✅ Longer delay for interactive content
<ScrollArea type="scroll" scrollHideDelay={1000}>
  <InteractiveMap />
</ScrollArea>
```

### 7. Match Colors to Theme

Customize scrollbar colors to match your design:

```tsx
// Light theme
<ScrollArea
  trackColor="rgba(0, 0, 0, 0.05)"
  thumbColor="rgba(0, 0, 0, 0.3)"
  thumbHoverColor="rgba(0, 0, 0, 0.5)"
>
  <Content />
</ScrollArea>

// Dark theme
<ScrollArea
  trackColor="rgba(255, 255, 255, 0.1)"
  thumbColor="rgba(255, 255, 255, 0.3)"
  thumbHoverColor="rgba(255, 255, 255, 0.5)"
>
  <Content />
</ScrollArea>
```

### 8. Test Overflow in Both Directions

When using `scrollbars="both"`, ensure content overflows as expected:

```tsx
<ScrollArea
  scrollbars="both"
  style={{ width: 600, height: 400 }}
>
  <div style={{ minWidth: 1000, minHeight: 800 }}>
    {/* Overflows both horizontally and vertically */}
    <LargeContent />
  </div>
</ScrollArea>
```

---

## Related Components

- [Box](./box.md) - Foundation primitive for layout and styling
- [Container](./container.md) - Max-width container for page layouts
- [Stack](./stack.md) - Vertical spacing for content inside scroll areas

---

## TypeScript

ScrollArea is fully typed with TypeScript:

```tsx
import type {
  ScrollAreaProps,
  ScrollAreaSize,
  ScrollAreaRadius,
  ScrollAreaScrollbars,
  ScrollAreaType,
  ScrollAreaDirection,
} from '@apvee/react-layout-kit';

// ScrollArea props
const scrollAreaProps: ScrollAreaProps = {
  size: 'medium',
  radius: 'small',
  scrollbars: 'both',
  type: 'hover',
  scrollHideDelay: 600,
  dir: 'ltr',
  trackColor: 'rgba(0, 0, 0, 0.05)',
  thumbColor: 'rgba(0, 0, 0, 0.3)',
  thumbHoverColor: 'rgba(0, 0, 0, 0.5)',
  thumbActiveColor: 'rgba(0, 0, 0, 0.7)',
  asChild: false,
  style: { width: 400, height: 300 },
  children: <div>Content</div>,
};

// Type aliases
const size: ScrollAreaSize = 'medium';
const radius: ScrollAreaRadius = 'full';
const scrollbars: ScrollAreaScrollbars = 'vertical';
const type: ScrollAreaType = 'always';
const direction: ScrollAreaDirection = 'rtl';

// Responsive size values
const responsiveSize: ScrollAreaProps['size'] = {
  xs: 'small',
  md: 'medium',
  lg: 'large',
};

// Access via namespace import
import { ScrollArea } from '@apvee/react-layout-kit';
type Props = React.ComponentProps<typeof ScrollArea>;
```

### Type Definitions

```tsx
type ScrollAreaSize = 'small' | 'medium' | 'large';
type ScrollAreaRadius = 'none' | 'small' | 'medium' | 'large' | 'full';
type ScrollAreaScrollbars = 'vertical' | 'horizontal' | 'both';
type ScrollAreaType = 'hover' | 'always' | 'scroll';
type ScrollAreaDirection = 'ltr' | 'rtl';

interface ScrollAreaProps {
  asChild?: boolean;
  size?: ResponsiveValue<ScrollAreaSize>;
  radius?: ScrollAreaRadius;
  scrollbars?: ScrollAreaScrollbars;
  type?: ScrollAreaType;
  scrollHideDelay?: number;
  dir?: ScrollAreaDirection;
  trackColor?: string;
  thumbColor?: string;
  thumbHoverColor?: string;
  thumbActiveColor?: string;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}
```

---

## Notes and Warnings

### Container Dimensions Required

ScrollArea must have explicit dimensions (width and height) to calculate overflow:

```tsx
// ❌ Won't work - no height
<ScrollArea style={{ width: 400 }}>
  <Content />
</ScrollArea>

// ✅ Works - explicit dimensions
<ScrollArea style={{ width: 400, height: 300 }}>
  <Content />
</ScrollArea>
```

### Native Scrollbars Hidden

ScrollArea hides native browser scrollbars using:
- `scrollbar-width: none` (Firefox)
- `-ms-overflow-style: none` (IE/Edge)
- `::-webkit-scrollbar { display: none }` (Chrome/Safari)

The custom scrollbars are purely visual overlays that sync with the native scroll position.

### Minimum Thumb Size

For accessibility, thumbs have a minimum size of 44px (recommended touch target size):

```tsx
// Even with size="small" (4px track), thumbs are at least 44px
<ScrollArea size="small">
  <VeryLongContent />
</ScrollArea>
```

This ensures thumbs are always draggable on touch devices.

### Scrollbar Positioning

Scrollbars are positioned as absolute overlays:
- **Vertical**: Right edge (LTR) or left edge (RTL)
- **Horizontal**: Bottom edge
- When both are visible, a corner element fills the intersection

### Performance Considerations

ScrollArea uses native scrolling (not JavaScript-based), so performance is excellent even with large content. The custom scrollbars update position via `scroll` event listeners and CSS transforms.

### Visibility State Management

The visibility system uses:
- `ResizeObserver` to detect overflow changes
- `scroll` event listeners to detect scrolling
- `pointerenter`/`pointerleave` for hover detection (when `type="hover"`)
- Timers for auto-hiding behavior

### RTL Support

When `dir="rtl"`:
- Vertical scrollbar moves to the left side
- Horizontal scroll direction is reversed
- Thumb calculations account for RTL layout

### Browser Compatibility

ScrollArea relies on modern browser features:
- **CSS Grid/Flexbox**: All modern browsers
- **ResizeObserver**: Chrome 64+, Firefox 69+, Safari 13.1+, Edge 79+ (polyfill available)
- **Pointer Events**: All modern browsers (IE11+)
- **CSS Custom Properties**: All modern browsers (IE11 with ponyfill)

For older browsers, consider fallback to native scrollbars.

### Size Tokens

Scrollbar sizes map to pixel values:

```tsx
SIZE_TOKENS = {
  small: 4,
  medium: 8,
  large: 12,
}
```

### Radius Tokens

Border radius values:

```tsx
RADIUS_TOKENS = {
  none: 0,
  small: 4,
  medium: 8,
  large: 12,
  full: 9999,
}
```

### Default Colors

Default scrollbar colors:

```tsx
DEFAULT_COLORS = {
  track: 'rgba(0, 0, 0, 0.05)',
  thumb: 'rgba(0, 0, 0, 0.3)',
  thumbHover: 'rgba(0, 0, 0, 0.5)',
  thumbActive: 'rgba(0, 0, 0, 0.7)',
}
```

---

## See Also

- [Responsive System Guide](../guides/responsive-system.md) - Container-width based breakpoints
- [useScrollArea Hook](../hooks/use-scroll-area.md) - Internal hook powering ScrollArea
- [Box Component](./box.md) - Foundation primitive
