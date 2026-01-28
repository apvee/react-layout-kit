# React Layout Kit

> A type-safe, responsive React layout library with container-aware design and powerful composition patterns.

**Package:** @apvee/react-layout-kit  
**Version:** 1.1.0  
**License:** MIT

---

## Introduction

**@apvee/react-layout-kit** is an opinionated, type-safe React layout library that enables you to build responsive layouts without leaving the React component context. Built on TypeScript and Emotion CSS, it provides a comprehensive set of layout components with full CSS-in-JS capabilities, responsive prop support, and powerful composition patterns.

### Core Philosophy

The library is built around **one core idea**:

> Treat layout as typed props, and resolve responsive values against the **container width** (not the viewport).

This fundamental principle enables:
- **True component-level responsive design** - Components adapt to their container, not just the viewport
- **Reusable layouts** - Components work correctly in any context (sidebars, modals, main content)
- **Type-safe styling** - Full TypeScript support with autocomplete for all CSS properties
- **Zero configuration** - No CSS setup required; styles are generated dynamically from props

---

## Why React Layout Kit?

### Problems It Solves

**Traditional CSS Media Queries:**
```css
/* Always responds to viewport width */
.card {
  padding: 8px;
}

@media (min-width: 768px) {
  .card {
    padding: 16px;
  }
}
```
- ❌ Card in sidebar uses same breakpoints as main content
- ❌ Can't reuse component in different contexts
- ❌ Requires different styles for each container context

**React Layout Kit Approach:**
```tsx
<Box p={{ xs: 'xs', md: 'md' }}>
  {/* Adapts to CONTAINER width, not viewport */}
</Box>
```
- ✅ Works in sidebars, modals, panels - any container
- ✅ Single component definition works everywhere
- ✅ True reusability across contexts

### Key Advantages

- **🎯 Type Safety**: Full TypeScript support with IntelliSense for all CSS properties
- **📱 Container-Aware**: JavaScript-driven responsive system that works with any container
- **🚀 Performance Optimized**: Emotion CSS runtime optimization, debounced ResizeObserver, memoized calculations
- **⚡ Zero Configuration**: No CSS setup required - styles are generated from props
- **🔧 Highly Configurable**: Customizable breakpoints and spacing scales
- **🎨 Developer Experience**: Intuitive API with both full CSS props and convenient shortcuts
- **🔄 Composition Ready**: `asChild` prop for seamless component composition
- **🌐 SSR Compatible**: Works perfectly with server-side rendering

---

## Installation

### Package Manager

Install using npm, yarn, or pnpm:

```bash
npm install @apvee/react-layout-kit
```

```bash
yarn add @apvee/react-layout-kit
```

```bash
pnpm add @apvee/react-layout-kit
```

### Peer Dependencies

The library requires React 17.0.0 or higher:

```json
{
  "peerDependencies": {
    "react": ">=17.0.0",
    "react-dom": ">=17.0.0"
  }
}
```

### Dependencies

The library includes these dependencies:
- **@emotion/css** - CSS-in-JS runtime
- **@react-hook/merged-ref** - Ref composition utility
- **csstype** - TypeScript CSS type definitions

---

## Quick Start

### Hello World

```tsx
import { Box, Stack } from '@apvee/react-layout-kit';

function App() {
  return (
    <Stack gap="md">
      <Box p="lg" $backgroundColor="#f0f0f0" $borderRadius={8}>
        Hello World
      </Box>
      <Box p="md" $backgroundColor="#e0e0e0">
        Welcome to React Layout Kit
      </Box>
    </Stack>
  );
}
```

### Responsive Layout

```tsx
import { Box, Flex } from '@apvee/react-layout-kit';

function ResponsiveLayout() {
  return (
    <Flex
      direction={{ xs: 'column', md: 'row' }}
      gap={{ xs: 'sm', md: 'lg' }}
      p={{ xs: 'md', lg: 'xl' }}
    >
      <Box $flex={1} $backgroundColor="#f8f9fa">
        Content adapts to container width
      </Box>
      <Box $flex={1} $backgroundColor="#e9ecef">
        Not viewport width!
      </Box>
    </Flex>
  );
}
```

### Grid Layout

```tsx
import { Grid } from '@apvee/react-layout-kit';

function ResponsiveGrid() {
  return (
    <Grid
      cols={{ xs: 1, sm: 2, md: 3, lg: 4 }}
      spacing={{ xs: 'sm', md: 'md', lg: 'lg' }}
    >
      <Grid.Col span={{ xs: 1, md: 2 }}>
        <Box p="md" $backgroundColor="#f0f0f0">
          Wide Item
        </Box>
      </Grid.Col>
      <Grid.Col>
        <Box p="md" $backgroundColor="#e0e0e0">
          Regular Item
        </Box>
      </Grid.Col>
      <Grid.Col>
        <Box p="md" $backgroundColor="#d0d0d0">
          Regular Item
        </Box>
      </Grid.Col>
    </Grid>
  );
}
```

---

## Core Concepts

### 1. Box - The Foundation

**Box** is the foundational component that all other layout components are built upon. It provides:

- **Dollar Props**: Direct CSS properties prefixed with `$` (e.g., `$display`, `$padding`, `$margin`)
- **Short Props**: Convenient aliases (e.g., `p` for padding, `m` for margin, `w` for width)
- **Responsive Values**: Both dollar and short props support breakpoint objects
- **Composition**: `asChild` pattern for polymorphic rendering
- **Auto-measurement**: Automatic container width detection via ResizeObserver

**Example:**
```tsx
<Box
  // Short props
  p="md"              // padding: 12px
  m="lg"              // margin: 16px
  
  // Dollar props
  $display="flex"
  $alignItems="center"
  $gap={16}
  
  // Responsive values
  $fontSize={{ xs: 14, md: 16, lg: 18 }}
>
  Content
</Box>
```

### 2. Responsive Values

Responsive values enable different values for different container widths using breakpoint objects:

```tsx
<Box
  p={{
    xs: 'xs',    // 0px+: 4px
    sm: 'sm',    // 480px+: 8px
    md: 'md',    // 768px+: 12px
    lg: 'lg',    // 1024px+: 16px
    xl: 'xl',    // 1366px+: 20px
  }}
>
  Responsive padding
</Box>
```

**Mobile-First Resolution:**
- Values cascade from smaller to larger breakpoints
- Specify only the breakpoints you need
- Last matching breakpoint wins

**Default Breakpoints:**
| Key | Width | Device |
|-----|-------|--------|
| `xs` | 0px | Mobile portrait |
| `sm` | 480px | Mobile landscape |
| `md` | 768px | Tablet portrait |
| `lg` | 1024px | Tablet landscape / Laptop |
| `xl` | 1366px | Desktop |
| `xxl` | 1920px | Large desktop |
| `xxxl` | 2560px | 4K displays |

[Learn more about responsive values →](./responsive-values.md)

### 3. Container-Aware Design

Unlike CSS media queries (viewport-based), responsive values respond to the **actual container width**:

```tsx
// Sidebar Widget (400px wide)
<Box containerWidth={400}>
  <Stack gap={{ xs: 'xs', md: 'md' }}>
    {/* Uses 'xs' spacing (container is 400px) */}
  </Stack>
</Box>

// Main Content (1200px wide)
<Box containerWidth={1200}>
  <Stack gap={{ xs: 'xs', md: 'md' }}>
    {/* Uses 'md' spacing (container is 1200px) */}
  </Stack>
</Box>
```

**Automatic Width Measurement:**
If you don't provide `containerWidth`, components automatically measure themselves using ResizeObserver:

```tsx
<Box p={{ xs: 'sm', md: 'lg' }}>
  {/* Width measured automatically */}
</Box>
```

[Learn more about container-aware design →](./responsive-values.md)

### 4. Dollar Props & Short Props

**Dollar Props** - Direct CSS property access:
```tsx
<Box
  $display="flex"
  $flexDirection="column"
  $alignItems="center"
  $justifyContent="space-between"
  $padding={16}
  $margin="auto"
  $backgroundColor="#f0f0f0"
  $borderRadius={8}
>
  Full CSS control
</Box>
```

**Short Props** - Convenient aliases:
```tsx
<Box
  p="md"        // padding
  m="lg"        // margin
  w="100%"      // width
  h={200}       // height
  mt="xl"       // margin-top
  px="sm"       // padding-left & padding-right
>
  Shorthand syntax
</Box>
```

**Conflict Resolution:**
When both dollar and short props map to the same CSS property, **dollar props win**:
```tsx
<Box
  p="md"              // padding: 12px
  $padding={20}       // Wins: padding: 20px
>
  Dollar prop takes precedence
</Box>
```

### 5. Spacing System

The library provides a configurable spacing scale:

**Default Spacing Scale:**
| Token | Value | Use Case |
|-------|-------|----------|
| `none` | 0 | No spacing |
| `xxs` | 2px | Borders, dividers |
| `xs` | 4px | Tight spacing |
| `sm` | 8px | Compact spacing |
| `md` | 12px | Base spacing |
| `lg` | 16px | Comfortable spacing |
| `xl` | 20px | Large spacing |
| `xxl` | 24px | Extra large spacing |
| `xxxl` | 32px | Maximum spacing |

**Usage:**
```tsx
<Stack gap="md">      {/* 12px gap */}
  <Box p="lg">        {/* 16px padding */}
    <Text>Content</Text>
  </Box>
</Stack>
```

[Learn more about spacing configuration →](./spacing.md)

### 6. Composition with asChild

The `asChild` pattern enables polymorphic rendering using the Slot pattern:

```tsx
// Box renders as button, but keeps Box styling
<Box asChild p="md" $borderRadius={8} $backgroundColor="#007bff">
  <button onClick={handleClick}>
    Styled Button
  </button>
</Box>

// Renders as: <button class="..." style="...">Styled Button</button>
// Not: <div><button>Styled Button</button></div>
```

**Benefits:**
- No wrapper elements
- Proper semantic HTML
- Both event handlers work (composed)
- Both styles apply (merged)
- Both refs receive the DOM node

[Learn more about composition →](./slot.md)

---

## Component Overview

### Layout Components

#### Box
Foundation component with complete CSS-in-JS capabilities.

```tsx
<Box p="md" $display="flex" $gap={16}>
  Foundation for all layouts
</Box>
```
[Documentation →](./box.md)

#### Flex
Flexbox layouts with specialized controls.

```tsx
<Flex direction="row" align="center" justify="space-between" gap="md">
  <Flex.Item grow={1}>Item 1</Flex.Item>
  <Flex.Item>Item 2</Flex.Item>
</Flex>
```
[Documentation →](./flex.md)

#### Grid
CSS Grid with responsive column management.

```tsx
<Grid cols={{ xs: 1, md: 2, lg: 3 }} spacing="md">
  <Grid.Col span={2}>Wide</Grid.Col>
  <Grid.Col>Regular</Grid.Col>
</Grid>
```
[Documentation →](./grid.md)

#### Stack
Vertical or horizontal stacking layouts.

```tsx
<Stack gap="lg" align="stretch">
  <div>Item 1</div>
  <div>Item 2</div>
</Stack>
```
[Documentation →](./stack.md)

#### SimpleGrid
Equal-width grid layouts.

```tsx
<SimpleGrid cols={{ xs: 1, sm: 2, lg: 3 }} spacing="md">
  <div>Card 1</div>
  <div>Card 2</div>
  <div>Card 3</div>
</SimpleGrid>
```
[Documentation →](./simple-grid.md)

#### AreaGrid
Named CSS Grid areas for complex layouts.

```tsx
<AreaGrid
  areas={{
    xs: `"header" "main" "footer"`,
    md: `"header header" "sidebar main" "footer footer"`
  }}
  cols={{ xs: '1fr', md: '200px 1fr' }}
>
  <AreaGrid.Item area="header">Header</AreaGrid.Item>
  <AreaGrid.Item area="main">Main</AreaGrid.Item>
  <AreaGrid.Item area="sidebar">Sidebar</AreaGrid.Item>
  <AreaGrid.Item area="footer">Footer</AreaGrid.Item>
</AreaGrid>
```
[Documentation →](./area-grid.md)

### Container Components

#### Container
Content wrapper with max-width constraints.

```tsx
<Container size="md" p="lg">
  Centered content with max-width
</Container>
```
[Documentation →](./container.md)

#### Center
Flexbox-based centering utility.

```tsx
<Center h={400}>
  <div>Perfectly centered</div>
</Center>
```
[Documentation →](./center.md)

#### AspectRatio
Maintains consistent aspect ratios.

```tsx
<AspectRatio ratio={16 / 9}>
  <img src="video-thumbnail.jpg" alt="Video" />
</AspectRatio>
```
[Documentation →](./aspect-ratio.md)

### Utility Components

#### Group
Horizontal grouping with gap and overflow handling.

```tsx
<Group gap="sm" wrap="wrap">
  <button>Action 1</button>
  <button>Action 2</button>
  <button>Action 3</button>
</Group>
```
[Documentation →](./group.md)

#### Space
Invisible spacing utility.

```tsx
<div>
  <span>Text</span>
  <Space w="md" />
  <span>More text</span>
</div>
```
[Documentation →](./space.md)

#### ScrollArea
Custom scrollable containers.

```tsx
<ScrollArea h={400} type="auto" scrollbars="vertical">
  <div style={{ height: 800 }}>
    Long scrollable content
  </div>
</ScrollArea>
```
[Documentation →](./scroll-area.md)

---

## Hooks

### useElementWidth
Measure element width with ResizeObserver.

```tsx
const ref = useRef<HTMLDivElement>(null);
const width = useElementWidth(ref, { debounceMs: 100 });

return <div ref={ref}>Width: {width}px</div>;
```
[Documentation →](./use-element-width.md)

### useContainerWidth
Semantic alias for useElementWidth (same functionality).

```tsx
const ref = useRef<HTMLDivElement>(null);
const width = useContainerWidth(ref);

return <div ref={ref}>Container width: {width}px</div>;
```
[Documentation →](./use-container-width.md)

### useMergedRef
Combine multiple refs into one.

```tsx
const ref1 = useRef<HTMLElement>(null);
const ref2 = useRef<HTMLElement>(null);
const mergedRef = useMergedRef(ref1, ref2);

return <div ref={mergedRef}>Both refs work</div>;
```
[Documentation →](./use-merged-ref.md)

### useSlot
Detect and work with Slot components programmatically.

```tsx
const { ref, slotRef, isSlot } = useSlot(element);

// isSlot: true if element is a Slot component
// slotRef: DOM node reference once mounted
```
[Documentation →](./slot.md#useslot-hook)

---

## Utilities

### createStyles
Generate CSS class names from style objects (re-export of Emotion's `css`).

```tsx
const buttonStyles = createStyles({
  padding: '10px 16px',
  borderRadius: 8,
  backgroundColor: '#007bff',
  '&:hover': {
    backgroundColor: '#0056b3',
  },
});

<Box className={buttonStyles}>Button</Box>
```
[Documentation →](./styling-utilities.md#createstyles)

### mergeClasses
Compose multiple class names (re-export of Emotion's `cx`).

```tsx
const className = mergeClasses(
  'base-class',
  isActive && 'active-class',
  props.className
);

<Box className={className}>Merged classes</Box>
```
[Documentation →](./styling-utilities.md#mergeclasses)

### resolveSpacing
Resolve spacing tokens to configured values.

```tsx
const padding = resolveSpacing('md');  // → 12
const margin = resolveSpacing(16);     // → 16 (pass-through)

const styles = createStyles({
  padding: resolveSpacing('lg'),  // 16px
  margin: resolveSpacing('xl'),   // 20px
});
```
[Documentation →](./styling-utilities.md#resolvespacing)

### resolveResponsiveValue
Manually resolve responsive values for custom components.

```tsx
const value = { xs: 8, md: 16, lg: 24 };
const breakpoints = getBreakpoints();
const resolved = resolveResponsiveValue(value, 900, breakpoints);
// → 16 (matches md breakpoint)
```
[Documentation →](./core/responsive-values.md#resolvresponsivevalue)

---

## Configuration

### configureBox
Customize global breakpoints and spacing at app initialization.

```tsx
import { configureBox } from '@apvee/react-layout-kit';

// Call once at app startup
configureBox({
  breakpoints: {
    xs: 0,
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200,
    xxl: 1400,
    xxxl: 2560,
  },
  spacing: {
    none: 0,
    xxs: 2,
    xs: 4,
    sm: 8,
    md: 16,      // Changed from 12
    lg: 24,      // Changed from 16
    xl: 32,      // Changed from 20
    xxl: 40,     // Changed from 24
    xxxl: 48,    // Changed from 32
  },
});
```
[Documentation →](./spacing.md#configurebox)

### getBreakpoints / getSpacing
Retrieve current configuration.

```tsx
const breakpoints = getBreakpoints();
console.log(breakpoints.md);  // 768

const spacing = getSpacing();
console.log(spacing.md);  // 12
```

### resetBoxConfig
Reset configuration to defaults.

```tsx
resetBoxConfig();  // Resets both breakpoints and spacing
```

---

## TypeScript Support

### Full Type Safety

All components have complete TypeScript definitions:

```tsx
import type { BoxProps, FlexProps, GridProps } from '@apvee/react-layout-kit';

const boxProps: BoxProps = {
  p: 'md',
  $display: 'flex',
  $gap: 16,
};

const flexProps: FlexProps = {
  direction: { xs: 'column', md: 'row' },
  align: 'center',
  gap: 'lg',
};
```

### Module Augmentation

Customize spacing and breakpoint types:

```typescript
// types/react-layout-kit.d.ts
declare module '@apvee/react-layout-kit' {
  interface CustomSpacing {
    tiny: 2;
    small: 4;
    base: 8;
    medium: 12;
    large: 16;
    xlarge: 24;
    huge: 32;
  }

  interface CustomBreakpoints {
    mobile: 0;
    tablet: 768;
    desktop: 1024;
    wide: 1440;
  }
}
```

Then configure at runtime:

```typescript
configureBox({
  spacing: {
    tiny: 2,
    small: 4,
    base: 8,
    medium: 12,
    large: 16,
    xlarge: 24,
    huge: 32,
  },
  breakpoints: {
    mobile: 0,
    tablet: 768,
    desktop: 1024,
    wide: 1440,
  },
});
```

Now TypeScript autocomplete shows your custom tokens!

[Learn more about TypeScript customization →](./spacing.md#typescript-customization)

---

## Advanced Patterns

### Custom Responsive Component

```tsx
import { Box, useElementWidth, resolveResponsiveValue, getBreakpoints } from '@apvee/react-layout-kit';

interface ResponsiveCardProps {
  padding: ResponsiveValue<number>;
  children: React.ReactNode;
}

function ResponsiveCard({ padding, children }: ResponsiveCardProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const width = useElementWidth(ref);
  const breakpoints = getBreakpoints();
  
  const resolvedPadding = React.useMemo(() => {
    return resolveResponsiveValue(padding, width, breakpoints);
  }, [padding, width, breakpoints]);

  return (
    <Box
      ref={ref}
      $padding={resolvedPadding}
      $borderRadius={8}
      $backgroundColor="#f0f0f0"
    >
      {children}
    </Box>
  );
}

// Usage
<ResponsiveCard padding={{ xs: 8, md: 16, lg: 24 }}>
  Content
</ResponsiveCard>
```

### Polymorphic Button Component

```tsx
import { Box } from '@apvee/react-layout-kit';

interface ButtonProps {
  variant: 'primary' | 'secondary';
  size: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
}

function Button({ variant, size, children, onClick }: ButtonProps) {
  const variantStyles = {
    primary: { $backgroundColor: '#007bff', $color: 'white' },
    secondary: { $backgroundColor: '#6c757d', $color: 'white' },
  };

  const sizeStyles = {
    sm: { p: 'xs' as const, $fontSize: 13 },
    md: { p: 'sm' as const, $fontSize: 14 },
    lg: { p: 'md' as const, $fontSize: 16 },
  };

  return (
    <Box
      asChild
      {...variantStyles[variant]}
      {...sizeStyles[size]}
      $borderRadius={6}
      $border="none"
      $cursor="pointer"
      onClick={onClick}
    >
      <button>{children}</button>
    </Box>
  );
}
```

### Responsive Dashboard Layout

```tsx
import { Box, Grid, Stack } from '@apvee/react-layout-kit';

function Dashboard() {
  return (
    <Box p={{ xs: 'md', lg: 'xl' }}>
      <Stack gap={{ xs: 'md', lg: 'lg' }}>
        {/* Header */}
        <Box $backgroundColor="#f8f9fa" p="lg" $borderRadius={8}>
          <h1>Dashboard</h1>
        </Box>

        {/* Main Content */}
        <Grid
          cols={{ xs: 1, md: 2, lg: 3 }}
          spacing={{ xs: 'sm', md: 'md', lg: 'lg' }}
        >
          <Grid.Col span={{ xs: 1, md: 2 }}>
            <Box $backgroundColor="white" p="md" $borderRadius={8} h="100%">
              Main Chart
            </Box>
          </Grid.Col>
          
          <Grid.Col>
            <Stack gap="sm">
              <Box $backgroundColor="white" p="md" $borderRadius={8}>
                Widget 1
              </Box>
              <Box $backgroundColor="white" p="md" $borderRadius={8}>
                Widget 2
              </Box>
            </Stack>
          </Grid.Col>
        </Grid>
      </Stack>
    </Box>
  );
}
```

---

## Performance Considerations

### Automatic Optimizations

The library includes several performance optimizations:

1. **Memoized Style Generation**: Styles are only regenerated when props change
2. **Debounced ResizeObserver**: Width measurements are debounced (default 150ms)
3. **Emotion Caching**: Identical styles reuse cached class names
4. **Selective Re-renders**: Configuration changes trigger minimal re-renders

### Best Practices

**✅ Do:**
- Use `containerWidth` prop when width is known (skips measurement)
- Memoize complex responsive value objects
- Use spacing tokens instead of raw numbers for consistency

**❌ Don't:**
- Create new responsive objects on every render
- Nest too many ResizeObserver-powered components
- Change global configuration during runtime (only at app init)

---

## Browser Support

The library supports all modern browsers:

- Chrome/Edge 88+
- Firefox 78+
- Safari 14+
- iOS Safari 14+
- Android Chrome 88+

**Required APIs:**
- ResizeObserver (for automatic width measurement)
- CSS Grid & Flexbox
- CSS Custom Properties (for Emotion)

For older browsers, consider using polyfills:
- [@juggle/resize-observer](https://github.com/juggle/resize-observer) - ResizeObserver polyfill

---

## Migration Guide

### From CSS Modules

**Before:**
```css
.container {
  padding: 16px;
  display: flex;
  gap: 12px;
}

@media (min-width: 768px) {
  .container {
    padding: 24px;
    gap: 16px;
  }
}
```

```tsx
<div className={styles.container}>
  <div>Item 1</div>
  <div>Item 2</div>
</div>
```

**After:**
```tsx
<Flex
  p={{ xs: 'md', md: 'xl' }}
  gap={{ xs: 'sm', md: 'md' }}
>
  <div>Item 1</div>
  <div>Item 2</div>
</Flex>
```

### From Styled Components

**Before:**
```tsx
const Container = styled.div`
  padding: ${props => props.theme.spacing.md};
  display: flex;
  gap: ${props => props.theme.spacing.sm};
  
  @media (min-width: 768px) {
    padding: ${props => props.theme.spacing.lg};
    gap: ${props => props.theme.spacing.md};
  }
`;
```

**After:**
```tsx
<Flex
  p={{ xs: 'md', md: 'lg' }}
  gap={{ xs: 'sm', md: 'md' }}
>
  Content
</Flex>
```

### From Chakra UI / Mantine

**Chakra:**
```tsx
<Box p={4} bg="gray.100">
  <Stack spacing={4}>
    <div>Item</div>
  </Stack>
</Box>
```

**React Layout Kit:**
```tsx
<Box p="md" $backgroundColor="#f0f0f0">
  <Stack gap="md">
    <div>Item</div>
  </Stack>
</Box>
```

---

## Troubleshooting

### Common Issues

**Issue: Responsive values not changing**
- **Cause**: Container width not crossing breakpoint thresholds
- **Solution**: Check actual container width with browser DevTools, verify breakpoint values

**Issue: TypeScript errors with custom spacing**
- **Cause**: Module augmentation not properly set up
- **Solution**: Ensure `.d.ts` file is included in `tsconfig.json`, restart TypeScript server

**Issue: Styles not applying**
- **Cause**: Emotion CSS not initialized
- **Solution**: Ensure `@emotion/css` is installed, check for CSS-in-JS conflicts

**Issue: Performance with many nested components**
- **Cause**: Too many ResizeObserver instances
- **Solution**: Use `containerWidth` prop to skip measurement when possible

---

## Documentation

### Component Documentation
- [Box](./box.md) - Foundation component
- [Flex](./flex.md) - Flexbox layouts
- [Grid](./grid.md) - CSS Grid layouts
- [Stack](./stack.md) - Vertical/horizontal stacking
- [SimpleGrid](./simple-grid.md) - Equal-width grids
- [AreaGrid](./area-grid.md) - Named grid areas
- [Container](./container.md) - Content wrapper
- [Center](./center.md) - Centering utility
- [AspectRatio](./aspect-ratio.md) - Aspect ratio container
- [Group](./group.md) - Horizontal grouping
- [Space](./space.md) - Spacing utility
- [ScrollArea](./scroll-area.md) - Custom scrollbars

### Core Concepts
- [Responsive Values](./responsive-values.md) - Container-aware responsive design
- [Spacing Configuration](./spacing.md) - Customizable spacing scale
- [Slot Pattern](./slot.md) - Composition primitives

### Utilities
- [Styling Utilities](./styling-utilities.md) - createStyles, mergeClasses, resolveSpacing
- [Hooks](./use-element-width.md) - useElementWidth, useContainerWidth, useMergedRef

---

## Contributing

Contributions are welcome! Please read the contributing guidelines before submitting PRs.

### Development Setup

```bash
# Clone repository
git clone https://github.com/apvee/react-layout-kit.git
cd react-layout-kit

# Install dependencies
npm install

# Run Storybook
npm run storybook

# Build library
npm run build

# Type check
npm run check
```

---

## License

MIT © [APVEE](https://github.com/apvee)

---

## Resources

- **GitHub Repository**: [github.com/apvee/react-layout-kit](https://github.com/apvee/react-layout-kit)
- **npm Package**: [@apvee/react-layout-kit](https://www.npmjs.com/package/@apvee/react-layout-kit)
- **Storybook**: [View live examples](https://apvee.github.io/react-layout-kit/)

### External Resources
- [Emotion Documentation](https://emotion.sh/docs/introduction)
- [CSS Grid Guide](https://css-tricks.com/snippets/css/complete-guide-grid/)
- [Flexbox Guide](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
- [ResizeObserver API](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
