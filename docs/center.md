# Center

> A flexbox-based component that centers content both vertically and horizontally.

**Package:** @apvee/react-layout-kit  
**Component Type:** Container  
**Since:** v1.0.0

---

## Overview

Center is a convenient container component that centers its children both vertically and horizontally using CSS flexbox. It's built on top of Box and provides an easy, declarative way to achieve perfect centering without writing flexbox properties manually.

Center enables you to:
- Center content vertically and horizontally in a single component
- Switch between block-level centering (flex) and inline centering (inline-flex)
- Create responsive centering behavior with breakpoint-based values
- Use as a wrapper for buttons, badges, icons, or any content requiring centering
- Apply all Box styling capabilities (padding, margin, borders, backgrounds, etc.)

The component uses `display: flex` by default with `align-items: center` and `justify-content: center`. When the `inline` prop is true, it uses `display: inline-flex` instead, allowing the centered container to flow inline with surrounding content like text.

## Features

- ✅ **Perfect Centering**: Always centers content vertically and horizontally
- ✅ **Flexbox-Based**: Uses CSS flexbox for reliable, cross-browser centering
- ✅ **Inline Mode**: Support for inline-flex to create inline centered elements (badges, icons)
- ✅ **Responsive Display**: Switch between flex and inline-flex at different breakpoints
- ✅ **Box Integration**: Inherits all Box styling capabilities
- ✅ **Container-Aware**: Automatic width measurement for responsive resolution
- ✅ **Type-Safe**: Full TypeScript support
- ✅ **Performance Optimized**: Uses Box's memoized style generation
- ✅ **Zero Configuration**: Works out of the box with sensible defaults

## Props

### CenterProps

Extends `BaseBoxProps` to inherit all Box styling capabilities.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `inline` | `ResponsiveValue<boolean>` | `false` | If true, uses `display: inline-flex` instead of `display: flex`. Useful for creating inline centered elements like badges or icons that flow with text. Supports responsive values using breakpoint objects. |
| `children` | `React.ReactNode` | `undefined` | Content to be centered within the container. Can be any valid React node. |

### Inherited Props

**From BaseBoxProps:**
- `asChild`, `containerWidth`, `styleReset` (see Box documentation)
- All standard HTML div attributes (`className`, `style`, `onClick`, etc.)

**Short Props** (from IShortStyleBoxProps):
- Spacing: `m`, `mt`, `mr`, `mb`, `ml`, `mx`, `my`, `p`, `pt`, `pr`, `pb`, `pl`, `px`, `py`
- Sizing: `w`, `h`, `miw`, `mih`, `maw`, `mah`
- [View complete short props reference](./short-props.md)

**Dollar Props** (from DollarCssProps):
- Any CSS property prefixed with `$` (e.g., `$display`, `$backgroundColor`, `$borderRadius`)
- All dollar props support responsive values
- [View complete CSS properties reference](./dollar-props.md)

**Note:** Center internally sets `$display`, `$alignItems`, and `$justifyContent`. If you pass these props manually, they will be overwritten by the component's centering logic.

## Usage

### Basic Centering

```tsx
import { Center } from '@apvee/react-layout-kit';

function CenteredButton() {
  return (
    <Center h="200px">
      <button>Centered Button</button>
    </Center>
  );
}
```

### Centered Content with Dimensions

```tsx
import { Center } from '@apvee/react-layout-kit';

function CenteredCard() {
  return (
    <Center 
      w="100%" 
      h="400px"
      $backgroundColor="#f1f5f9"
      $border="1px solid #e2e8f0"
      $borderRadius={12}
    >
      <div style={{ textAlign: 'center', padding: '24px' }}>
        <h2>Welcome</h2>
        <p>Perfectly centered content</p>
      </div>
    </Center>
  );
}
```

### Inline Centered Badge

```tsx
import { Center } from '@apvee/react-layout-kit';

function NotificationBadge() {
  return (
    <div>
      <span>Messages </span>
      <Center
        inline
        px="sm"
        py="xs"
        $backgroundColor="#ef4444"
        $color="white"
        $borderRadius={999}
        style={{ fontWeight: 700, fontSize: '12px' }}
      >
        5
      </Center>
      <span> unread</span>
    </div>
  );
}
```

### Inline Centered Icon

```tsx
import { Center } from '@apvee/react-layout-kit';

function IconButton() {
  return (
    <Center
      inline
      w="40px"
      h="40px"
      $backgroundColor="#3b82f6"
      $color="white"
      $borderRadius={8}
      $cursor="pointer"
      style={{ fontSize: '20px' }}
    >
      ⚙
    </Center>
  );
}
```

### Full Page Centering

```tsx
import { Center } from '@apvee/react-layout-kit';

function LoadingScreen() {
  return (
    <Center w="100vw" h="100vh">
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>⏳</div>
        <div>Loading...</div>
      </div>
    </Center>
  );
}
```

### Responsive Inline Mode

```tsx
import { Center } from '@apvee/react-layout-kit';

function ResponsiveBadge() {
  return (
    <div>
      <span>Status: </span>
      <Center
        inline={{ xs: true, md: false }}  // Inline on mobile, block on desktop
        px="md"
        py="sm"
        $backgroundColor="#10b981"
        $color="white"
        $borderRadius={8}
        style={{ fontWeight: 700 }}
      >
        Active
      </Center>
    </div>
  );
}
```

### Centered Avatar

```tsx
import { Center } from '@apvee/react-layout-kit';

function Avatar() {
  return (
    <Center
      w="64px"
      h="64px"
      $backgroundColor="#dbeafe"
      $borderRadius="50%"
      $border="2px solid #3b82f6"
      style={{ fontSize: '24px', fontWeight: 700 }}
    >
      JD
    </Center>
  );
}
```

### Centered Grid Item

```tsx
import { Center, Grid } from '@apvee/react-layout-kit';

function CenteredGrid() {
  return (
    <Grid cols={3} gap="md">
      <Center 
        h="150px" 
        $backgroundColor="#f1f5f9"
        $borderRadius={8}
      >
        <span>Item 1</span>
      </Center>
      <Center 
        h="150px" 
        $backgroundColor="#f1f5f9"
        $borderRadius={8}
      >
        <span>Item 2</span>
      </Center>
      <Center 
        h="150px" 
        $backgroundColor="#f1f5f9"
        $borderRadius={8}
      >
        <span>Item 3</span>
      </Center>
    </Grid>
  );
}
```

### With Custom Background

```tsx
import { Center } from '@apvee/react-layout-kit';

function GradientCenter() {
  return (
    <Center
      w="100%"
      h="300px"
      $background="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
      $color="white"
      $borderRadius={12}
    >
      <div style={{ textAlign: 'center', fontWeight: 700 }}>
        <div style={{ fontSize: '48px', marginBottom: '12px' }}>🎉</div>
        <div style={{ fontSize: '24px' }}>Celebration</div>
      </div>
    </Center>
  );
}
```

### Centered Error Message

```tsx
import { Center } from '@apvee/react-layout-kit';

function ErrorState() {
  return (
    <Center 
      h="400px"
      $backgroundColor="#fef2f2"
      $border="1px solid #fecaca"
      $borderRadius={12}
      p="xl"
    >
      <div style={{ textAlign: 'center', maxWidth: '400px' }}>
        <div style={{ fontSize: '64px', marginBottom: '16px' }}>⚠️</div>
        <h3 style={{ margin: '0 0 8px', color: '#dc2626' }}>
          Something went wrong
        </h3>
        <p style={{ margin: 0, color: '#991b1b' }}>
          Please try again later or contact support
        </p>
      </div>
    </Center>
  );
}
```

## Responsive Values

The `inline` prop supports responsive values through breakpoint objects. This allows you to switch between block-level centering (flex) and inline centering (inline-flex) at different breakpoints.

### Default Breakpoints

- `xs`: 0px (mobile)
- `sm`: 576px (mobile landscape)
- `md`: 768px (tablet)
- `lg`: 992px (desktop)
- `xl`: 1200px (large desktop)
- `xxl`: 1400px (extra large desktop)
- `xxxl`: 1920px (ultra-wide)

### How Responsive Resolution Works

Center uses **container width** (not viewport width) to resolve responsive values:

1. **By default**, Center measures its own width using ResizeObserver
2. The measured width is debounced for performance
3. Responsive values are resolved to the closest breakpoint that doesn't exceed the container width
4. You can override this by providing `containerWidth` prop for deterministic behavior

### Usage Examples

```tsx
// Direct value (non-responsive) - most common use case
<Center inline={false}>
  <button>Centered</button>
</Center>

// Responsive inline with automatic width measurement
<Center inline={{ xs: true, md: false }}>
  <span>Inline on mobile, block on desktop</span>
</Center>

// Responsive inline with explicit containerWidth
<Center 
  inline={{ xs: true, md: false }}
  containerWidth={1024}  // Desktop size - resolves to false
>
  <span>Block display on desktop</span>
</Center>

// Multiple responsive breakpoints
<Center
  inline={{ xs: true, sm: true, md: false, lg: false }}
  w={{ xs: 'auto', md: '100%' }}
>
  <div>Complex responsive behavior</div>
</Center>
```

### Important Notes

- Responsive resolution is based on **container width**, not viewport width
- You only need to specify breakpoints that differ; missing breakpoints use the next smaller defined value
- When `containerWidth` prop is provided, automatic width measurement is disabled
- Most use cases don't need responsive `inline` - a static boolean value is typically sufficient
- You can customize breakpoints via TypeScript module augmentation (see TypeScript section)

[Learn more about responsive design →](./responsive-values.md)

## Best Practices

### Use for Simple Centering Tasks

Center is ideal for straightforward centering needs:

```tsx
// ✅ Good - simple centering use case
<Center h="200px">
  <button>Click me</button>
</Center>

// ❌ Avoid - overly complex for simple centering
<Box 
  $display="flex" 
  $alignItems="center" 
  $justifyContent="center" 
  h="200px"
>
  <button>Click me</button>
</Box>
```

### Provide Dimensions for Visibility

Center needs dimensions (width/height) or content to be visible:

```tsx
// ✅ Good - explicit dimensions
<Center w="100%" h="300px">
  <div>Content</div>
</Center>

// ✅ Good - inherits parent dimensions
<div style={{ width: '100%', height: '300px' }}>
  <Center style={{ height: '100%' }}>
    <div>Content</div>
  </Center>
</div>

// ⚠️ Caution - may have no visible height without dimensions
<Center>
  <div>Content</div>
</Center>
```

### Use Inline Mode for Text-Flow Elements

Use `inline` for badges, icons, or elements that should flow with text:

```tsx
// ✅ Good - inline badge in text
<p>
  You have 
  <Center inline px="sm" py="xs" $backgroundColor="#ef4444" $color="white" $borderRadius={999}>
    5
  </Center>
  unread messages
</p>

// ❌ Avoid - block-level breaks text flow
<p>
  You have 
  <Center px="sm" py="xs" $backgroundColor="#ef4444" $color="white">
    5
  </Center>
  unread messages
</p>
```

### Don't Override Centering Props

Center manages `$display`, `$alignItems`, and `$justifyContent` internally:

```tsx
// ✅ Good - let Center handle centering
<Center h="200px">
  <button>Centered</button>
</Center>

// ❌ Avoid - these props will be overwritten
<Center 
  h="200px"
  $display="grid"              // Will be overwritten to 'flex'
  $alignItems="flex-start"     // Will be overwritten to 'center'
  $justifyContent="flex-end"   // Will be overwritten to 'center'
>
  <button>Not properly configured</button>
</Center>
```

### Combine with Other Layout Components

Center works well with other layout components:

```tsx
// ✅ Good - Center with Stack for vertical spacing
<Center h="400px">
  <Stack gap="md" $alignItems="center">
    <div>Item 1</div>
    <div>Item 2</div>
    <div>Item 3</div>
  </Stack>
</Center>

// ✅ Good - Center in Grid cells
<Grid cols={3} gap="md">
  <Center h="150px" $backgroundColor="#f1f5f9">Cell 1</Center>
  <Center h="150px" $backgroundColor="#f1f5f9">Cell 2</Center>
  <Center h="150px" $backgroundColor="#f1f5f9">Cell 3</Center>
</Grid>
```

### Consider Alternative Approaches

Center is not always the best solution:

```tsx
// ✅ Good use case - centering in a container
<Center h="300px">
  <button>Action</button>
</Center>

// ⚠️ Consider alternatives - text centering
// Use text-align instead
<div style={{ textAlign: 'center' }}>
  Text content
</div>

// ⚠️ Consider alternatives - complex multi-axis layouts
// Use Grid or Flex with explicit control
<Flex direction="column" align="center" justify="space-between">
  <div>Top</div>
  <div>Middle</div>
  <div>Bottom</div>
</Flex>
```

### Performance Considerations

- Center uses Box's memoized style generation for optimal performance
- Width measurement (when needed) is debounced via useElementWidth hook
- For static layouts, provide explicit `containerWidth` to avoid measurement overhead
- Inline mode has no performance impact - it's just a CSS display property change

### Accessibility Considerations

- Center is purely presentational - ensure content inside remains accessible
- Don't use Center to hide content off-screen (use proper visibility techniques)
- Ensure sufficient contrast for centered text content
- Provide appropriate focus styles for interactive centered elements
- Consider keyboard navigation for centered interactive content

```tsx
// ✅ Good - accessible centered button
<Center h="200px">
  <button 
    aria-label="Submit form"
    style={{ padding: '12px 24px' }}
  >
    Submit
  </button>
</Center>

// ✅ Good - accessible centered image
<Center h="300px">
  <img 
    src="logo.svg" 
    alt="Company logo"
    style={{ maxWidth: '100%' }}
  />
</Center>
```

## Related Components

### Built on Box

Center is built on Box:
- [Box](./box.md) - Foundational layout primitive with all styling capabilities

### Alternative Centering Components

- [Flex](./flex.md) - More flexible layout with explicit control over alignment and direction
- [Grid](./grid.md) - Grid-based layouts with cell-level alignment control
- [Stack](./stack.md) - Vertical/horizontal stacking with alignment options

### Commonly Used Together

- [Container](./container.md) - Wrap Center in Container for max-width constraints
- [Stack](./stack.md) - Combine with Stack for vertically centered content with spacing
- [Group](./group.md) - Horizontal grouping of centered elements
- [AspectRatio](./aspect-ratio.md) - Center content within aspect-ratio containers

### When to Use Alternatives

- **Use Flex**: When you need more control over alignment, direction, or wrapping
- **Use Grid**: For complex multi-dimensional layouts with specific cell positioning
- **Use Box**: When you need custom alignment values or complex flexbox configurations
- **Use text-align**: For simple text centering without container requirements

## TypeScript

### Type Definitions

The component uses the following TypeScript types:

```typescript
import type { CenterProps } from '@apvee/react-layout-kit';

// Using CenterProps
const MyComponent: React.FC = () => {
  const props: CenterProps = {
    inline: false,
    w: '100%',
    h: '300px',
    children: <button>Centered</button>,
  };
  
  return <Center {...props} />;
};
```

### Type Safety with Inline Prop

```typescript
import { Center } from '@apvee/react-layout-kit';

function TypeSafeComponent() {
  return (
    <>
      {/* ✅ Valid - boolean value */}
      <Center inline={false}>
        <button>Block centering</button>
      </Center>

      {/* ✅ Valid - responsive boolean */}
      <Center inline={{ xs: true, md: false }}>
        <span>Responsive display</span>
      </Center>

      {/* ❌ TypeScript error: string not allowed */}
      {/* <Center inline="yes">
        <button>Invalid</button>
      </Center> */}
    </>
  );
}
```

### Responsive Value Types

```typescript
import type { ResponsiveValue } from '@apvee/react-layout-kit';
import { Center } from '@apvee/react-layout-kit';

function TypedResponsive() {
  // Type-safe responsive inline
  const inline: ResponsiveValue<boolean> = {
    xs: true,
    md: false,
    lg: false
  };

  // Type-safe responsive dimensions
  const height: ResponsiveValue<string | number> = {
    xs: '200px',
    md: '300px',
    lg: '400px'
  };

  return (
    <Center 
      inline={inline}
      h={height}
      w="100%"
    >
      <button>Responsive centered button</button>
    </Center>
  );
}
```

### Generic Component Props

Create reusable centered component configurations:

```typescript
import type { CenterProps } from '@apvee/react-layout-kit';
import { Center } from '@apvee/react-layout-kit';

// Configuration for centered badges
type BadgeConfig = Pick<CenterProps, 'inline' | 'px' | 'py'> & {
  variant: 'error' | 'warning' | 'success' | 'info';
};

const badgeStyles = {
  error: { backgroundColor: '#ef4444', color: 'white' },
  warning: { backgroundColor: '#f59e0b', color: 'white' },
  success: { backgroundColor: '#10b981', color: 'white' },
  info: { backgroundColor: '#3b82f6', color: 'white' },
};

function Badge({ variant, children, ...props }: BadgeConfig & { children: React.ReactNode }) {
  return (
    <Center
      inline
      px="sm"
      py="xs"
      $borderRadius={999}
      style={{ 
        fontWeight: 700, 
        fontSize: '12px',
        ...badgeStyles[variant]
      }}
      {...props}
    >
      {children}
    </Center>
  );
}

// Usage
function App() {
  return (
    <div>
      You have <Badge variant="error">5</Badge> unread messages
    </div>
  );
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

After customizing:

```tsx
// ✅ TypeScript knows about your custom breakpoints
<Center inline={{ mobile: true, desktop: false }}>
  <span>Custom breakpoints</span>
</Center>

// ❌ TypeScript error: 'xs' is not a valid breakpoint
// <Center inline={{ xs: true }}>...</Center>
```

[Learn more about configuration →](./customization.md)

### ForwardRef and Ref Types

Center properly forwards refs with correct typing:

```typescript
import { useRef } from 'react';
import { Center } from '@apvee/react-layout-kit';

function RefExample() {
  const centerRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    // ✅ Properly typed as HTMLDivElement
    console.log(centerRef.current?.offsetWidth);
    console.log(centerRef.current?.offsetHeight);
  };

  return (
    <Center 
      ref={centerRef}
      h="200px"
      onClick={handleClick}
    >
      <button>Click me</button>
    </Center>
  );
}
```

### Extending CenterProps

Create custom wrapper components:

```typescript
import type { CenterProps } from '@apvee/react-layout-kit';
import { Center } from '@apvee/react-layout-kit';

interface LoadingCenterProps extends CenterProps {
  message?: string;
  spinner?: React.ReactNode;
}

function LoadingCenter({ 
  message = 'Loading...', 
  spinner = '⏳',
  children,
  ...props 
}: LoadingCenterProps) {
  return (
    <Center {...props}>
      {children || (
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>
            {spinner}
          </div>
          <div>{message}</div>
        </div>
      )}
    </Center>
  );
}

// Usage
function App() {
  return (
    <LoadingCenter 
      h="100vh" 
      message="Please wait..."
      spinner="🔄"
    />
  );
}
```

## Notes and Warnings

### Browser Compatibility

- **Flexbox**: Supported in all modern browsers (IE11+ with prefixes, all modern browsers without)
- **ResizeObserver**: Used for width measurement. Supported in all modern browsers (Chrome 64+, Firefox 69+, Safari 13.1+, Edge 79+)
- For older browsers, provide explicit `containerWidth` or accept static behavior

### Centering Props are Locked

Center enforces specific flexbox properties for centering:

- `$display` is set to `'flex'` or `'inline-flex'` (based on `inline` prop)
- `$alignItems` is set to `'center'`
- `$justifyContent` is set to `'center'`

**These props cannot be overridden**. If you pass them manually, they will be ignored:

```tsx
// ⚠️ Warning: these props are overwritten
<Center 
  $display="grid"              // Ignored, will be 'flex'
  $alignItems="flex-start"     // Ignored, will be 'center'
  $justifyContent="flex-end"   // Ignored, will be 'center'
>
  <button>Button</button>
</Center>
```

If you need custom alignment values, use Box or Flex instead.

### Performance Considerations

- **Pure CSS Solution**: Uses flexbox with no JavaScript calculations during render
- **Width Measurement**: Optional width measurement via ResizeObserver (only when using responsive `inline`)
- **Memoization**: Uses Box's memoized style generation for optimal performance
- **Best Performance**: Use static `inline` prop (boolean) when responsive behavior isn't needed

### Known Limitations

- **SSR**: Container width measurement doesn't work during server-side rendering
  - Solution: Provide explicit `containerWidth` prop or accept client-side hydration update
- **Fixed Centering Props**: Cannot customize alignment or justify-content values
  - Solution: Use Flex or Box with explicit flexbox props for custom alignment
- **Single-Axis Centering**: Cannot center on only one axis (horizontal or vertical)
  - Solution: Use Flex with specific `align` or `justify` props

### Common Mistakes

❌ **Forgetting dimensions**:
```tsx
// May have no visible height
<Center>
  <button>Button</button>
</Center>
```

❌ **Trying to override centering props**:
```tsx
// These props are ignored
<Center $justifyContent="flex-start">
  <button>Button</button>
</Center>
```

❌ **Using block mode for inline elements**:
```tsx
// Breaks text flow
<p>
  Text <Center><span>Badge</span></Center> more text
</p>
```

❌ **Complex layouts**:
```tsx
// Center is too simple for this
<Center>
  <div>Top</div>
  <div>Middle</div>
  <div>Bottom</div>
</Center>
```

✅ **Correct patterns**:
```tsx
// Explicit dimensions
<Center w="100%" h="300px">
  <button>Button</button>
</Center>

// Inline mode for text flow
<p>
  Text <Center inline><span>Badge</span></Center> more text
</p>

// Use Flex for complex layouts
<Flex direction="column" align="center" justify="space-between">
  <div>Top</div>
  <div>Middle</div>
  <div>Bottom</div>
</Flex>
```

### When Not to Use Center

**Use text-align instead:**
```tsx
// ❌ Overkill
<Center>
  <p>Centered text</p>
</Center>

// ✅ Better
<p style={{ textAlign: 'center' }}>Centered text</p>
```

**Use Flex for complex alignment:**
```tsx
// ❌ Too limited
<Center>
  <Stack>...</Stack>
</Center>

// ✅ More control
<Flex align="center" justify="center" direction="column">
  <div>Item 1</div>
  <div>Item 2</div>
</Flex>
```

**Use Grid for multi-dimensional layouts:**
```tsx
// ❌ Wrong tool
<Center>
  <div>Multiple items in grid</div>
</Center>

// ✅ Proper solution
<Grid cols={3} gap="md">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</Grid>
```

---

**Next Steps:**
- Learn about [responsive design patterns](./responsive-values.md)
- Explore [Flex component](./flex.md) for more flexible centering options
- See [Box component](./box.md) for foundational styling capabilities
- Review [Stack component](./stack.md) for vertical layouts with alignment
