# Group

> A horizontal flex container component for composing elements in a row with configurable spacing and alignment.

**Package:** @apvee/react-layout-kit  
**Component Type:** Layout  
**Since:** v1.0.0

---

## Overview

The **Group** component is a specialized wrapper around [Box](./box.md) that creates a horizontal flex container (`flex-direction: row`). It's designed for common horizontal layout patterns like button groups, toolbars, navigation menus, and tag collections.

Key capabilities:
- **Horizontal layout**: Uses `display: flex` with `flex-direction: row`
- **Alignment control**: Props for `align-items` and `justify-content`
- **Gap spacing**: Configurable spacing between items using spacing scale or custom values
- **Wrapping control**: Configure whether items wrap to new lines
- **Growing children**: Optional equal-width items via `grow` prop
- **Overflow prevention**: Automatic max-width control via `preventGrowOverflow`
- **Responsive support**: All props accept ResponsiveValue objects
- **Composition support**: `asChild` pattern for semantic HTML

Unlike [Flex](./flex.md), Group is simpler and focused specifically on horizontal compositions. It can apply inline styles to children when `grow` or `preventGrowOverflow` are enabled.

---

## Features

- **Simple horizontal layouts** without flex complexity
- **Spacing scale integration** for consistent gap values
- **Equal-width items** via `grow` prop
- **Automatic overflow prevention** to keep items within bounds
- **Wrapping control** for responsive behavior
- **Full responsive support** with breakpoint objects
- **Composition support** via `asChild` for semantic HTML
- **Full Box inheritance** for additional styling

---

## Props

### Group-specific Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `align` | `ResponsiveValue<CSS.Property.AlignItems>` | `"center"` | Controls `align-items` (cross-axis alignment). Supports: `stretch`, `flex-start`, `flex-end`, `center`, `baseline`. |
| `justify` | `ResponsiveValue<CSS.Property.JustifyContent>` | `"flex-start"` | Controls `justify-content` (main-axis alignment). Supports: `flex-start`, `flex-end`, `center`, `space-between`, `space-around`, `space-evenly`. |
| `gap` | `ResponsiveValue<SpacingKey \| number>` | `undefined` | Gap between items. Accepts spacing keys or pixel numbers. When undefined, no gap is applied. |
| `wrap` | `ResponsiveValue<CSS.Property.FlexWrap>` | `"wrap"` | Controls `flex-wrap` (wrapping behavior). Supports: `nowrap`, `wrap`, `wrap-reverse`. |
| `grow` | `ResponsiveValue<boolean>` | `false` | When true, applies `flex-grow: 1` inline style to each child for equal-width items. |
| `preventGrowOverflow` | `ResponsiveValue<boolean>` | `true` | When true, applies `max-width: 100% / N` inline style to each child to prevent overflow. |

### Inherited from Box

Group extends [BaseBoxProps](./box.md#props), so you can use all Box props including:
- Layout props: `$display`, `$overflow`, `$position`, etc.
- Spacing props: `$margin`, `$padding`, or short forms (`m`, `p`, `mt`, `px`, etc.)
- Sizing props: `$width`, `$height`, `$minWidth`, `$maxWidth`
- Styling props: `$backgroundColor`, `$border`, `$borderRadius`, etc.
- Responsive control: `containerWidth` for explicit breakpoint resolution

---

## Usage

### Basic Horizontal Group

Create a simple horizontal layout:

```tsx
import { Group } from '@apvee/react-layout-kit';

function ButtonGroup() {
  return (
    <Group>
      <button>Save</button>
      <button>Cancel</button>
      <button>Delete</button>
    </Group>
  );
}
```

### With Gap Spacing

Use spacing scale keys or custom values:

```tsx
// Spacing scale keys
<Group gap="xs">   {/* 4px gap */}
<Group gap="sm">   {/* 8px gap */}
<Group gap="md">   {/* 16px gap */}
<Group gap="lg">   {/* 24px gap */}

// Custom pixel values
<Group gap={12}>
  <button>Action 1</button>
  <button>Action 2</button>
</Group>
```

### Alignment Control

Control horizontal and vertical alignment:

```tsx
// Center items vertically (default)
<Group align="center" gap="sm">
  <img src="icon.svg" alt="" style={{ height: 24 }} />
  <span>Icon with text</span>
</Group>

// Distribute items with space-between
<Group justify="space-between" gap="sm">
  <div>Left</div>
  <div>Center</div>
  <div>Right</div>
</Group>

// Align items to end
<Group align="flex-end" justify="flex-end" gap="sm">
  <button>Aligned right</button>
</Group>
```

### Equal-Width Items

Use `grow` for equal-width children:

```tsx
<Group grow gap="md">
  <button>Equal</button>
  <button>Width</button>
  <button>Buttons</button>
</Group>
```

This applies `flex-grow: 1` as an inline style to each direct child.

### Wrapping Control

Configure how items wrap to new lines:

```tsx
// Default - allows wrapping
<Group wrap="wrap" gap="sm">
  <Chip />
  <Chip />
  <Chip />
  {/* Wraps to next line if needed */}
</Group>

// Prevent wrapping
<Group wrap="nowrap" gap="sm">
  <button>No</button>
  <button>Wrap</button>
  <button>Allowed</button>
</Group>
```

### Toolbar Layout

Combine alignment and spacing for toolbar patterns:

```tsx
<Group justify="space-between" wrap="nowrap" gap="md">
  {/* Left section */}
  <Group gap="sm">
    <button>Back</button>
    <button>Search</button>
  </Group>

  {/* Right section */}
  <Group gap="sm">
    <button>Save</button>
    <button>Publish</button>
  </Group>
</Group>
```

### Tag/Chip Collections

Perfect for tag lists with wrapping:

```tsx
<Group gap="sm" wrap="wrap">
  <Chip>Design</Chip>
  <Chip>Frontend</Chip>
  <Chip>Backend</Chip>
  <Chip>DevOps</Chip>
  <Chip>Documentation</Chip>
</Group>
```

### Overflow Prevention

`preventGrowOverflow` (enabled by default) prevents children from overflowing:

```tsx
// Default - prevents overflow
<Group grow preventGrowOverflow>
  <button>Very long button text that would overflow</button>
  <button>Short</button>
</Group>

// Disable if you want natural sizing
<Group grow preventGrowOverflow={false}>
  <button>Can grow freely</button>
  <button>No max-width constraint</button>
</Group>
```

### Semantic HTML with asChild

Render semantic elements while maintaining Group behavior:

```tsx
<Group asChild gap="md" align="center">
  <nav aria-label="Primary navigation">
    <a href="/home">Home</a>
    <a href="/docs">Docs</a>
    <a href="/pricing">Pricing</a>
  </nav>
</Group>
```

### Combining with Box Props

Leverage Box inheritance for styling:

```tsx
<Group
  gap="sm"
  p="md"
  $backgroundColor="#f8fafc"
  $border="1px solid #e2e8f0"
  $borderRadius="12px"
>
  <button>Styled</button>
  <button>Group</button>
</Group>
```

---

## Responsive Values

### Responsive Gap and Alignment

All Group props support ResponsiveValue objects:

```tsx
<Group
  gap={{ xs: 'sm', md: 'md', lg: 'lg' }}
  align={{ xs: 'stretch', md: 'center' }}
  justify={{ xs: 'center', md: 'flex-start' }}
  wrap={{ xs: 'wrap', md: 'nowrap' }}
>
  <button>Responsive</button>
  <button>Layout</button>
  <button>Items</button>
</Group>
```

This creates:
- **Mobile (xs)**: Small gap, stretched items, centered, wrapping allowed
- **Desktop (md+)**: Medium/large gap, centered items, left-aligned, no wrapping

### Responsive Growing

Change whether items grow at different breakpoints:

```tsx
<Group
  grow={{ xs: false, md: true }}
  gap="md"
>
  <button>Equal on desktop</button>
  <button>Natural width on mobile</button>
</Group>
```

### Automatic Width Measurement

Group automatically measures its own width for responsive resolution:

```tsx
// Responsive props work automatically
<Group gap={{ xs: 'sm', md: 'lg' }}>
  <button>Item 1</button>
  <button>Item 2</button>
</Group>
```

### Explicit containerWidth

For deterministic resolution (useful in Storybook):

```tsx
import { useContainerWidth } from '@apvee/react-layout-kit';

function ResponsiveToolbar() {
  const [ref, containerWidth] = useContainerWidth<HTMLDivElement>();

  return (
    <div ref={ref}>
      <Group
        gap={{ xs: 'sm', md: 'lg' }}
        justify={{ xs: 'center', md: 'space-between' }}
        containerWidth={containerWidth}
      >
        <button>Action 1</button>
        <button>Action 2</button>
      </Group>
    </div>
  );
}
```

---

## Best Practices

### 1. Choose Between Group, Flex, and Stack

Use the right component for your layout needs:

```tsx
// ✅ Use Group for simple horizontal layouts
<Group gap="sm">
  <button>Save</button>
  <button>Cancel</button>
</Group>

// ✅ Use Flex when you need more control (wrap, direction, per-item control)
<Flex wrap="wrap" gap="md">
  <Flex.Item grow={1}>Flexible item</Flex.Item>
  <Flex.Item shrink={0}>Fixed item</Flex.Item>
</Flex>

// ✅ Use Stack for vertical layouts
<Stack spacing="md">
  <div>Item 1</div>
  <div>Item 2</div>
</Stack>
```

### 2. Use Spacing Scale for Gaps

Prefer spacing scale keys over arbitrary values:

```tsx
// ✅ Recommended - consistent with design system
<Group gap="md">
  <Chip>Tag</Chip>
</Group>

// ⚠️ Less ideal - arbitrary value
<Group gap={17}>
  <Chip>Tag</Chip>
</Group>
```

### 3. Consider preventGrowOverflow

The default `preventGrowOverflow={true}` prevents items from overflowing their container:

```tsx
// ✅ Default - safe, prevents overflow
<Group grow>
  <button>Very long button text</button>
  <button>Short</button>
</Group>

// ⚠️ May overflow if text is too long
<Group grow preventGrowOverflow={false}>
  <button>Very long button text</button>
  <button>Short</button>
</Group>
```

### 4. Use wrap for Responsive Lists

Enable wrapping for chip/tag collections:

```tsx
// ✅ Wraps naturally as container shrinks
<Group wrap="wrap" gap="sm">
  {tags.map(tag => (
    <Chip key={tag.id}>{tag.name}</Chip>
  ))}
</Group>

// ❌ Forces single line, may overflow
<Group wrap="nowrap" gap="sm">
  {tags.map(tag => (
    <Chip key={tag.id}>{tag.name}</Chip>
  ))}
</Group>
```

### 5. Nest Groups for Complex Toolbars

Use nested Groups for toolbar sections:

```tsx
// ✅ Clear sections with space-between
<Group justify="space-between">
  <Group gap="sm">
    {/* Left actions */}
    <button>Back</button>
    <button>Forward</button>
  </Group>
  
  <Group gap="sm">
    {/* Right actions */}
    <button>Save</button>
    <button>Publish</button>
  </Group>
</Group>
```

### 6. Be Aware of Inline Styles

When `grow` or `preventGrowOverflow` are enabled, Group applies inline styles to children:

```tsx
// Group applies inline styles to children
<Group grow preventGrowOverflow>
  <button>  {/* Receives: style={{ flexGrow: 1, maxWidth: '33.33%' }} */}
    Button
  </button>
</Group>
```

This may conflict with existing inline styles on children. Consider using Flex.Item for more explicit control.

### 7. Use asChild for Semantic HTML

Preserve meaningful HTML structure:

```tsx
// ✅ Semantic navigation
<Group asChild gap="md">
  <nav aria-label="Main menu">
    <a href="/home">Home</a>
    <a href="/about">About</a>
  </nav>
</Group>
```

### 8. Default Gap is Undefined

Unlike some components, Group doesn't apply a default gap:

```tsx
// No gap applied
<Group>
  <button>No</button>
  <button>Spacing</button>
</Group>

// ✅ Explicitly set gap
<Group gap="sm">
  <button>With</button>
  <button>Spacing</button>
</Group>
```

---

## Related Components

- [Box](./box.md) - Foundation primitive; Group is built on Box
- [Flex](./flex.md) - More powerful flexbox component with per-item control
- [Stack](./stack.md) - Vertical equivalent of Group for stacking items
- [Center](./center.md) - Centers content both horizontally and vertically

---

## TypeScript

Group is fully typed with TypeScript:

```tsx
import type { GroupProps } from '@apvee/react-layout-kit';

// Group props
const groupProps: GroupProps = {
  align: 'center',
  justify: 'flex-start',
  gap: 'md',
  wrap: 'wrap',
  grow: false,
  preventGrowOverflow: true,
  children: <div>Content</div>,
};

// Responsive values are properly typed
const responsiveGap: GroupProps['gap'] = {
  xs: 'sm',   // spacing key
  md: 16,     // pixel value
  lg: 'lg',   // spacing key
};

const responsiveAlign: GroupProps['align'] = {
  xs: 'stretch',
  md: 'center',
};

const responsiveGrow: GroupProps['grow'] = {
  xs: false,
  md: true,
};

// Access via namespace import
import { Group } from '@apvee/react-layout-kit';
type Props = React.ComponentProps<typeof Group>;
```

### Type Definitions

```tsx
interface GroupProps extends BaseBoxProps {
  /**
   * align-items CSS property.
   * @default "center"
   */
  align?: ResponsiveValue<CSS.Property.AlignItems>;

  /**
   * gap CSS property. Spacing key or number.
   * When undefined, no gap is applied.
   */
  gap?: ResponsiveValue<SpacingKey | number>;

  /**
   * Whether children should have flex-grow: 1.
   * @default false
   */
  grow?: ResponsiveValue<boolean>;

  /**
   * justify-content CSS property.
   * @default "flex-start"
   */
  justify?: ResponsiveValue<CSS.Property.JustifyContent>;

  /**
   * Whether to prevent overflow with max-width.
   * @default true
   */
  preventGrowOverflow?: ResponsiveValue<boolean>;

  /**
   * flex-wrap CSS property.
   * @default "wrap"
   */
  wrap?: ResponsiveValue<CSS.Property.FlexWrap>;
}
```

---

## Notes and Warnings

### Display and FlexDirection are Forced

Group always sets `display: flex` and `flex-direction: row`. You cannot override these:

```tsx
// ❌ These are ignored
<Group $display="block" $flexDirection="column">
  {/* Still renders as flex row */}
</Group>

// ✅ Use Box or Stack for other layouts
<Box $display="block">Content</Box>
<Stack>Vertical layout</Stack>
```

### Inline Styles Applied to Children

When `grow` or `preventGrowOverflow` are enabled, Group applies inline styles to direct children:

```tsx
<Group grow preventGrowOverflow>
  <button>
    {/* Receives inline styles: */}
    {/* { flexGrow: 1, maxWidth: '33.33%' } */}
  </button>
</Group>
```

This happens via `React.cloneElement` and merges with existing inline styles. Be aware this may affect children with custom inline styles.

### React.Fragment Children

Group skips React.Fragment children when applying inline styles to avoid warnings:

```tsx
<Group grow>
  <>
    {/* Fragment itself doesn't receive styles */}
    <button>But content inside does</button>
  </>
</Group>
```

### No Default Gap

Unlike Stack (which has default spacing), Group has no default gap:

```tsx
// These have NO gap
<Group><button>A</button><button>B</button></Group>

// Must explicitly set gap
<Group gap="sm"><button>A</button><button>B</button></Group>
```

### preventGrowOverflow Calculation

`preventGrowOverflow` sets `max-width: 100% / childrenCount`:

```tsx
// With 3 children
<Group grow preventGrowOverflow>
  {/* Each child gets max-width: 33.33% */}
  <button>1</button>
  <button>2</button>
  <button>3</button>
</Group>
```

This ensures items don't overflow, but may not work well with varying content sizes. Consider disabling for mixed-size items.

### Spacing Scale Keys

The spacing scale keys resolve to pixel values:

```tsx
// Default spacing scale
xs:   4px
sm:   8px
md:   16px
lg:   24px
xl:   32px
xxl:  48px
xxxl: 64px
```

### Browser Compatibility

Group uses CSS flexbox properties with excellent browser support:
- `display: flex`, `flex-direction`, `align-items`, `justify-content` (IE11+)
- `gap` for flexbox (Chrome 84+, Firefox 63+, Safari 14.1+, Edge 84+)

For older browsers without `gap` support, consider polyfills or margin-based spacing.

### ResizeObserver Dependency

Responsive prop resolution uses ResizeObserver for automatic width measurement:
- Native support (Chrome 64+, Firefox 69+, Safari 13.1+, Edge 79+)
- Polyfill needed for IE11

---

## See Also

- [Responsive System Guide](../guides/responsive-system.md) - Container-width based breakpoints
- [Spacing Scale](../guides/spacing-scale.md) - Spacing key values
- [Box Component](./box.md) - Foundation primitive
- [Flex Component](./flex.md) - More powerful flexbox control
- [Stack Component](./stack.md) - Vertical layout equivalent
