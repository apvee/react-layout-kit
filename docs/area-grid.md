# AreaGrid

> CSS Grid layout component using named template areas for semantic, structured layouts.

**Package:** @apvee/react-layout-kit  
**Component Type:** Layout / Grid  
**Since:** v1.0.0

---

## Overview

AreaGrid is a powerful layout component built on CSS Grid's **template areas** feature (`grid-template-areas`). Instead of positioning items via numeric row and column indices, you define a semantic template with named regions (like `header`, `sidebar`, `main`, `footer`) and assign child items to those named areas.

AreaGrid enables you to:
- Create semantic, readable layout structures with named grid areas
- Define complex multi-region layouts (headers, sidebars, main content, footers)
- Build responsive layouts that completely restructure at different breakpoints
- Control grid sizing with flexible row and column definitions
- Conditionally show/hide layout regions based on screen size
- Align items individually or collectively within their grid areas

The component uses CSS Grid with `display: grid` and `grid-template-areas`, providing a more intuitive way to define complex layouts compared to numeric grid positioning. All grid properties support responsive values based on container width, and child items that reference non-existent areas are automatically hidden.

## Features

- ✅ **Named Grid Areas**: Semantic layout definition using CSS grid-template-areas
- ✅ **Responsive Restructuring**: Completely change layout structure at different breakpoints
- ✅ **Conditional Rendering**: Items automatically hide when their area doesn't exist in current layout
- ✅ **Flexible Sizing**: Control row heights and column widths with CSS grid syntax
- ✅ **Responsive Area Assignment**: Items can move between different areas at different breakpoints
- ✅ **Alignment Control**: Container-level and per-item alignment options
- ✅ **Spacing System**: Gap support with spacing tokens or custom values
- ✅ **Sub-component Pattern**: AreaGrid.Item for semantic child component structure
- ✅ **Context-based**: Uses React Context for area validation
- ✅ **Container-Aware**: Automatic width measurement for responsive resolution
- ✅ **Type-Safe**: Full TypeScript support with autocomplete for CSS properties
- ✅ **Box Integration**: Inherits all Box styling capabilities

## Props

### AreaGridProps

Extends `BaseBoxProps` to inherit all Box styling capabilities.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `areas` | `ResponsiveValue<string>` | `undefined` | CSS grid-template-areas property. Defines named grid areas. Each row should be a quoted string within the overall string. Supports responsive values. |
| `rows` | `ResponsiveValue<string>` | `undefined` | CSS grid-template-rows property. Defines the size of grid rows. Works with `areas` to define the complete grid structure. Supports responsive values. |
| `columns` | `ResponsiveValue<string>` | `undefined` | CSS grid-template-columns property. Defines the size of grid columns. Works with `areas` to define the complete grid structure. Supports responsive values. |
| `gap` | `ResponsiveValue<SpacingKey \| number>` | `0` | CSS gap property. Space between grid items (applies to both rows and columns). Accepts spacing scale keys or numbers (converted to px). Supports responsive values. |
| `justifyItems` | `ResponsiveValue<CSS.Property.JustifyItems>` | `"stretch"` | CSS justify-items property. Controls horizontal alignment of all items within their grid areas. Individual items can override with `justifySelf`. Supports responsive values. |
| `alignItems` | `ResponsiveValue<CSS.Property.AlignItems>` | `"stretch"` | CSS align-items property. Controls vertical alignment of all items within their grid areas. Individual items can override with `alignSelf`. Supports responsive values. |
| `justifyContent` | `ResponsiveValue<CSS.Property.JustifyContent>` | `"stretch"` | CSS justify-content property. Controls horizontal distribution of the entire grid within its container when the grid is smaller than the container. Supports responsive values. |
| `alignContent` | `ResponsiveValue<CSS.Property.AlignContent>` | `"stretch"` | CSS align-content property. Controls vertical distribution of the entire grid within its container when the grid is smaller than the container. Supports responsive values. |
| `children` | `React.ReactNode` | `undefined` | Child elements - typically AreaGrid.Item components. |

### AreaGrid.Item Props

Extends `BaseBoxProps` to inherit all Box styling capabilities.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `area` | `ResponsiveValue<string>` | `undefined` | CSS grid-area property. Assigns this item to a named grid area defined in the parent AreaGrid's `areas` prop. Must match an area name. If the area doesn't exist in the current layout, the item won't render. Supports responsive values. |
| `justifySelf` | `ResponsiveValue<CSS.Property.JustifySelf>` | `undefined` | CSS justify-self property. Controls horizontal alignment of this specific item within its grid area. Overrides the container's `justifyItems` for this item. Supports responsive values. |
| `alignSelf` | `ResponsiveValue<CSS.Property.AlignSelf>` | `undefined` | CSS align-self property. Controls vertical alignment of this specific item within its grid area. Overrides the container's `alignItems` for this item. Supports responsive values. |
| `children` | `React.ReactNode` | `undefined` | Content to render within this grid item. |

### Inherited Props

**From BaseBoxProps:**
- `asChild`, `containerWidth`, `styleReset` (see Box documentation)
- All standard HTML div attributes (`className`, `style`, `onClick`, etc.)

**Short Props** (from IShortStyleBoxProps):
- Spacing: `m`, `mt`, `mr`, `mb`, `ml`, `mx`, `my`, `p`, `pt`, `pr`, `pb`, `pl`, `px`, `py`
- Sizing: `w`, `h`, `miw`, `mih`, `maw`, `mah`
- [View complete short props reference](./short-props.md)

**Dollar Props** (from DollarCssProps):
- Any CSS property prefixed with `$` (e.g., `$backgroundColor`, `$border`, `$borderRadius`)
- All dollar props support responsive values
- [View complete CSS properties reference](./dollar-props.md)

## Usage

### Basic Page Layout

```tsx
import { AreaGrid } from '@apvee/react-layout-kit';

function BasicLayout() {
  return (
    <AreaGrid
      areas={`
        "header header header"
        "sidebar main main"
        "footer footer footer"
      `}
      rows="auto 1fr auto"
      columns="200px 1fr 1fr"
      gap="md"
      $minHeight="100vh"
    >
      <AreaGrid.Item area="header">
        <header>Header Content</header>
      </AreaGrid.Item>
      
      <AreaGrid.Item area="sidebar">
        <aside>Sidebar Navigation</aside>
      </AreaGrid.Item>
      
      <AreaGrid.Item area="main">
        <main>Main Content Area</main>
      </AreaGrid.Item>
      
      <AreaGrid.Item area="footer">
        <footer>Footer Content</footer>
      </AreaGrid.Item>
    </AreaGrid>
  );
}
```

### Responsive Layout Restructuring

```tsx
import { AreaGrid } from '@apvee/react-layout-kit';

function ResponsiveLayout() {
  return (
    <AreaGrid
      areas={{
        // Mobile: single column, stacked layout
        xs: `
          "header"
          "main"
          "sidebar"
          "footer"
        `,
        // Tablet: two columns with sidebar
        md: `
          "header header"
          "sidebar main"
          "footer footer"
        `,
        // Desktop: three columns with additional aside
        lg: `
          "header header header"
          "sidebar main aside"
          "footer footer footer"
        `
      }}
      rows={{
        xs: "auto auto auto auto",
        md: "auto 1fr auto",
        lg: "auto 1fr auto"
      }}
      columns={{
        xs: "1fr",
        md: "200px 1fr",
        lg: "200px 1fr 250px"
      }}
      gap={{ xs: 'sm', md: 'md', lg: 'lg' }}
      $minHeight="100vh"
    >
      <AreaGrid.Item area="header">
        <header>Header</header>
      </AreaGrid.Item>
      
      <AreaGrid.Item area="sidebar">
        <nav>Main Navigation</nav>
      </AreaGrid.Item>
      
      <AreaGrid.Item area="main">
        <main>Content</main>
      </AreaGrid.Item>
      
      {/* This aside only appears on lg+ screens */}
      <AreaGrid.Item area="aside">
        <aside>Additional Info</aside>
      </AreaGrid.Item>
      
      <AreaGrid.Item area="footer">
        <footer>Footer</footer>
      </AreaGrid.Item>
    </AreaGrid>
  );
}
```

### Conditional Area Rendering

```tsx
import { AreaGrid } from '@apvee/react-layout-kit';

function ConditionalAreas() {
  return (
    <AreaGrid
      areas={{
        xs: '"header" "main" "footer"',
        lg: '"header header" "main toolbar" "main aside" "footer footer"'
      }}
      rows={{
        xs: "auto 1fr auto",
        lg: "auto auto 1fr auto"
      }}
      columns={{
        xs: "1fr",
        lg: "1fr 260px"
      }}
      gap="md"
    >
      <AreaGrid.Item area="header">
        <div>Header</div>
      </AreaGrid.Item>
      
      <AreaGrid.Item area="main">
        <div>Main Content</div>
      </AreaGrid.Item>
      
      {/* Toolbar only renders on lg+ (when "toolbar" area exists) */}
      <AreaGrid.Item area="toolbar">
        <div>Toolbar - Desktop Only</div>
      </AreaGrid.Item>
      
      {/* Aside only renders on lg+ (when "aside" area exists) */}
      <AreaGrid.Item area="aside">
        <div>Sidebar - Desktop Only</div>
      </AreaGrid.Item>
      
      <AreaGrid.Item area="footer">
        <div>Footer</div>
      </AreaGrid.Item>
    </AreaGrid>
  );
}
```

### Items Moving Between Areas

```tsx
import { AreaGrid } from '@apvee/react-layout-kit';

function MovingItems() {
  return (
    <AreaGrid
      areas={{
        xs: '"header" "promo" "main" "footer"',
        lg: '"header header" "main promo" "footer footer"'
      }}
      rows={{
        xs: "auto auto 1fr auto",
        lg: "auto 1fr auto"
      }}
      columns={{
        xs: "1fr",
        lg: "1fr 300px"
      }}
      gap="md"
    >
      <AreaGrid.Item area="header">
        <div>Header</div>
      </AreaGrid.Item>
      
      {/* This promo box moves:
          - Mobile: between header and main
          - Desktop: sidebar next to main */}
      <AreaGrid.Item area="promo">
        <div>Promotional Content</div>
      </AreaGrid.Item>
      
      <AreaGrid.Item area="main">
        <div>Main Content</div>
      </AreaGrid.Item>
      
      <AreaGrid.Item area="footer">
        <div>Footer</div>
      </AreaGrid.Item>
    </AreaGrid>
  );
}
```

### Custom Alignment

```tsx
import { AreaGrid } from '@apvee/react-layout-kit';

function AlignmentExample() {
  return (
    <AreaGrid
      areas='"left center right"'
      columns="200px 200px 200px"
      rows="300px"
      gap="md"
      justifyItems="center"    // Default horizontal alignment
      alignItems="center"       // Default vertical alignment
      justifyContent="space-between"
      $padding="lg"
    >
      {/* Override alignment for specific item */}
      <AreaGrid.Item 
        area="left" 
        justifySelf="start" 
        alignSelf="start"
      >
        <div>Top Left</div>
      </AreaGrid.Item>
      
      {/* Uses container defaults (center/center) */}
      <AreaGrid.Item area="center">
        <div>Centered</div>
      </AreaGrid.Item>
      
      {/* Stretch to fill the entire area */}
      <AreaGrid.Item 
        area="right" 
        justifySelf="stretch" 
        alignSelf="stretch"
      >
        <div style={{ height: '100%', width: '100%' }}>
          Stretched
        </div>
      </AreaGrid.Item>
    </AreaGrid>
  );
}
```

### Holy Grail Layout

```tsx
import { AreaGrid } from '@apvee/react-layout-kit';

function HolyGrailLayout() {
  return (
    <AreaGrid
      areas={{
        xs: `
          "header"
          "nav"
          "main"
          "aside"
          "footer"
        `,
        md: `
          "header header header"
          "nav main aside"
          "footer footer footer"
        `
      }}
      rows={{
        xs: "auto auto 1fr auto auto",
        md: "auto 1fr auto"
      }}
      columns={{
        xs: "1fr",
        md: "180px 1fr 180px"
      }}
      gap="md"
      $minHeight="100vh"
      $backgroundColor="#f8fafc"
      p="md"
    >
      <AreaGrid.Item area="header" $backgroundColor="#dbeafe">
        <div style={{ padding: '1rem' }}>Header</div>
      </AreaGrid.Item>
      
      <AreaGrid.Item area="nav" $backgroundColor="#fef3c7">
        <div style={{ padding: '1rem' }}>Navigation</div>
      </AreaGrid.Item>
      
      <AreaGrid.Item area="main" $backgroundColor="white">
        <div style={{ padding: '1rem' }}>Main Content</div>
      </AreaGrid.Item>
      
      <AreaGrid.Item area="aside" $backgroundColor="#dcfce7">
        <div style={{ padding: '1rem' }}>Sidebar</div>
      </AreaGrid.Item>
      
      <AreaGrid.Item area="footer" $backgroundColor="#e0e7ff">
        <div style={{ padding: '1rem' }}>Footer</div>
      </AreaGrid.Item>
    </AreaGrid>
  );
}
```

### With Fixed Container Width

```tsx
import { AreaGrid } from '@apvee/react-layout-kit';

function FixedWidthExample() {
  return (
    <AreaGrid
      containerWidth={1200}  // Force desktop layout
      areas='"header header" "sidebar main" "footer footer"'
      rows="auto 1fr auto"
      columns="250px 1fr"
      gap="lg"
    >
      <AreaGrid.Item area="header">Header</AreaGrid.Item>
      <AreaGrid.Item area="sidebar">Sidebar</AreaGrid.Item>
      <AreaGrid.Item area="main">Main</AreaGrid.Item>
      <AreaGrid.Item area="footer">Footer</AreaGrid.Item>
    </AreaGrid>
  );
}
```

## Responsive Values

Many props in AreaGrid support responsive values through breakpoint objects. This allows you to completely restructure layouts for different container widths.

### Default Breakpoints

- `xs`: 0px (mobile)
- `sm`: 576px (mobile landscape)
- `md`: 768px (tablet)
- `lg`: 992px (desktop)
- `xl`: 1200px (large desktop)
- `xxl`: 1400px (extra large desktop)
- `xxxl`: 1920px (ultra-wide)

### How Responsive Resolution Works

AreaGrid uses **container width** (not viewport width) to resolve responsive values:

1. **By default**, AreaGrid measures its own width using ResizeObserver
2. The measured width is debounced for performance
3. Responsive values are resolved to the closest breakpoint that doesn't exceed the container width
4. The resolved `areas` string is provided to child items via React Context
5. Child items validate their `area` prop against the current areas and hide if not present
6. You can override this by providing `containerWidth` prop for deterministic behavior

### Usage Examples

```tsx
// Direct value (non-responsive)
<AreaGrid areas='"header" "main" "footer"' />

// Responsive areas with different layouts
<AreaGrid 
  areas={{ 
    xs: '"header" "main" "footer"',
    md: '"header header" "main aside" "footer footer"',
    lg: '"header header header" "nav main aside" "footer footer footer"'
  }}
  rows={{
    xs: "auto 1fr auto",
    md: "auto 1fr auto",
    lg: "auto 1fr auto"
  }}
  columns={{
    xs: "1fr",
    md: "1fr 250px",
    lg: "200px 1fr 250px"
  }}
/>

// Responsive gap with spacing keys
<AreaGrid
  areas='"header" "main" "footer"'
  gap={{ xs: "sm", md: "md", lg: "lg" }}
/>

// Responsive alignment
<AreaGrid
  areas='"left center right"'
  justifyItems={{ xs: "stretch", md: "center" }}
  alignItems={{ xs: "start", md: "center" }}
/>
```

### Item Responsive Behavior

```tsx
// Item moving between areas responsively
<AreaGrid.Item 
  area={{ xs: "promo", lg: "sidebar" }}
>
  Content moves from promo area to sidebar area
</AreaGrid.Item>

// Item with responsive alignment
<AreaGrid.Item
  area="main"
  justifySelf={{ xs: "stretch", md: "center" }}
  alignSelf={{ xs: "start", md: "center" }}
>
  Content with responsive self-alignment
</AreaGrid.Item>
```

### Important Notes

- Responsive resolution is based on **container width**, not viewport width
- Items automatically hide when their `area` doesn't exist in the current `areas` template
- You only need to specify breakpoints that differ; missing breakpoints use the next smaller defined value
- When `containerWidth` prop is provided, automatic width measurement is disabled
- You can customize breakpoints via TypeScript module augmentation (see TypeScript section)

[Learn more about responsive design →](./responsive-values.md)

## Best Practices

### Use Semantic Area Names

Choose descriptive, semantic names that reflect the purpose of each area:

```tsx
// ✅ Good - semantic and clear
<AreaGrid areas='"header" "navigation" "main" "sidebar" "footer"'>
  <AreaGrid.Item area="header">...</AreaGrid.Item>
  <AreaGrid.Item area="navigation">...</AreaGrid.Item>
</AreaGrid>

// ❌ Avoid - generic, unclear names
<AreaGrid areas='"area1" "area2" "area3"'>
  <AreaGrid.Item area="area1">...</AreaGrid.Item>
</AreaGrid>
```

### Design Mobile-First

Start with the mobile layout and progressively enhance for larger screens:

```tsx
// ✅ Good - mobile-first approach
<AreaGrid
  areas={{
    xs: '"header" "main" "footer"',           // Simple stack
    md: '"header header" "main aside" "footer footer"',  // Add sidebar
    lg: '"header header header" "nav main aside" "footer footer footer"'  // Add nav
  }}
>
```

### Keep Areas Template Clean

Format multi-line area templates for readability:

```tsx
// ✅ Good - readable template formatting
<AreaGrid
  areas={`
    "header header header"
    "nav    main   aside"
    "footer footer footer"
  `}
>

// ❌ Avoid - hard to read
<AreaGrid areas='"header header header" "nav main aside" "footer footer footer"'>
```

### Match Rows/Columns to Areas

Ensure your `rows` and `columns` definitions match the structure in `areas`:

```tsx
// ✅ Good - 3 rows, 3 columns match the areas template
<AreaGrid
  areas='"header header header" "sidebar main main" "footer footer footer"'
  rows="auto 1fr auto"        // 3 rows
  columns="200px 1fr 1fr"     // 3 columns
>

// ❌ Avoid - mismatch can cause layout issues
<AreaGrid
  areas='"header header header" "sidebar main main" "footer footer footer"'
  rows="auto 1fr"             // Only 2 rows defined!
  columns="200px 1fr"         // Only 2 columns defined!
>
```

### Leverage Conditional Rendering

Use area-based conditional rendering instead of JavaScript conditionals:

```tsx
// ✅ Good - declarative, area-based
<AreaGrid
  areas={{
    xs: '"header" "main" "footer"',
    lg: '"header header" "main toolbar" "footer footer"'
  }}
>
  {/* Toolbar automatically hides on mobile */}
  <AreaGrid.Item area="toolbar">
    Desktop Toolbar
  </AreaGrid.Item>
</AreaGrid>

// ❌ Avoid - imperative JavaScript conditionals
<AreaGrid areas={isMobile ? '"header" "main"' : '"header header" "main toolbar"'}>
  {!isMobile && <AreaGrid.Item area="toolbar">...</AreaGrid.Item>}
</AreaGrid>
```

### Use Flexible Row/Column Sizing

Combine auto, fr, and fixed units for flexible layouts:

```tsx
// ✅ Good - flexible and adaptive
<AreaGrid
  rows="auto 1fr auto"        // Header/footer auto-size, content fills
  columns="minmax(200px, 250px) 1fr minmax(200px, 300px)"
>

// ❌ Avoid - overly rigid fixed sizes
<AreaGrid
  rows="100px 500px 80px"
  columns="200px 800px 200px"
>
```

### Prefer Gap Over Item Margins

Use the `gap` prop instead of margins on individual items:

```tsx
// ✅ Good - clean gap spacing
<AreaGrid gap="md">
  <AreaGrid.Item area="header">...</AreaGrid.Item>
  <AreaGrid.Item area="main">...</AreaGrid.Item>
</AreaGrid>

// ❌ Avoid - manual margins
<AreaGrid>
  <AreaGrid.Item area="header" mb="md">...</AreaGrid.Item>
  <AreaGrid.Item area="main" mb="md">...</AreaGrid.Item>
</AreaGrid>
```

### Use Alignment Props Appropriately

Use container-level alignment for consistent behavior, per-item for exceptions:

```tsx
// ✅ Good - container defaults with item overrides
<AreaGrid justifyItems="center" alignItems="center">
  <AreaGrid.Item area="header">Centered by default</AreaGrid.Item>
  <AreaGrid.Item area="main" justifySelf="stretch">Override to stretch</AreaGrid.Item>
</AreaGrid>
```

### Performance Considerations

- Use `containerWidth` prop for static layouts to avoid measurement overhead
- Avoid excessive responsive breakpoints; use only what's necessary
- Group layout changes at the same breakpoints for consistency
- Consider using CSS Grid's built-in auto-placement when area names aren't needed

### Accessibility Considerations

- Use semantic HTML elements within AreaGrid.Item (header, nav, main, aside, footer)
- Ensure logical reading order in mobile layouts (areas should stack logically)
- Don't rely solely on visual grid positioning to convey meaning
- Provide appropriate landmarks and ARIA attributes when needed

```tsx
// ✅ Good - semantic HTML with proper landmarks
<AreaGrid areas='"header" "nav" "main" "aside" "footer"'>
  <AreaGrid.Item area="header">
    <header role="banner">Header</header>
  </AreaGrid.Item>
  <AreaGrid.Item area="nav">
    <nav role="navigation">Navigation</nav>
  </AreaGrid.Item>
  <AreaGrid.Item area="main">
    <main role="main">Content</main>
  </AreaGrid.Item>
</AreaGrid>
```

## Related Components

### Built on Box

AreaGrid and AreaGrid.Item are built on Box:
- [Box](./box.md) - Foundational layout primitive with all styling capabilities

### Alternative Grid Components

- [Grid](./grid.md) - Numeric grid positioning with Grid.Col sub-component
- [SimpleGrid](./simple-grid.md) - Automatic responsive grid with equal-width columns

### Commonly Used Together

- [Container](./container.md) - Max-width container for centering AreaGrid layouts
- [Stack](./stack.md) - For content within AreaGrid.Item areas
- [Flex](./flex.md) - For flexible content within AreaGrid.Item areas
- [ScrollArea](./scroll-area.md) - For scrollable content within AreaGrid.Item areas

### Core Utilities

- [useElementWidth](../hooks/use-element-width.md) - Hook used internally for width measurement
- [useMergedRef](../hooks/use-merged-ref.md) - Hook for ref merging
- [useResponsiveResolvers](../hooks/use-responsive-resolvers.md) - Hook for responsive value resolution

## TypeScript

### Type Definitions

The component uses the following TypeScript types:

```typescript
import type { 
  AreaGridProps, 
  AreaGridItemProps 
} from '@apvee/react-layout-kit';

// Using AreaGridProps
const GridComponent: React.FC = () => {
  const gridProps: AreaGridProps = {
    areas: '"header" "main" "footer"',
    rows: 'auto 1fr auto',
    columns: '1fr',
    gap: 'md',
  };
  
  return (
    <AreaGrid {...gridProps}>
      <AreaGrid.Item area="header">Header</AreaGrid.Item>
      <AreaGrid.Item area="main">Main</AreaGrid.Item>
      <AreaGrid.Item area="footer">Footer</AreaGrid.Item>
    </AreaGrid>
  );
};

// Using AreaGridItemProps
const ItemComponent: React.FC = () => {
  const itemProps: AreaGridItemProps = {
    area: 'sidebar',
    justifySelf: 'start',
    alignSelf: 'center',
  };
  
  return <AreaGrid.Item {...itemProps}>Sidebar</AreaGrid.Item>;
};
```

### Type Safety with Responsive Values

```typescript
import type { ResponsiveValue } from '@apvee/react-layout-kit';
import { AreaGrid } from '@apvee/react-layout-kit';

function TypeSafeGrid() {
  // Type-safe responsive areas
  const areas: ResponsiveValue<string> = {
    xs: '"header" "main" "footer"',
    md: '"header header" "main aside" "footer footer"'
  };

  // Type-safe responsive gap
  const gap: ResponsiveValue<string | number> = {
    xs: 'sm',
    md: 'md',
    lg: 16
  };

  return (
    <AreaGrid
      areas={areas}
      gap={gap}
      rows={{ xs: 'auto 1fr auto', md: 'auto 1fr auto' }}
      columns={{ xs: '1fr', md: '1fr 300px' }}
    >
      <AreaGrid.Item area="header">Header</AreaGrid.Item>
      <AreaGrid.Item area="main">Main</AreaGrid.Item>
      <AreaGrid.Item area="aside">Aside</AreaGrid.Item>
      <AreaGrid.Item area="footer">Footer</AreaGrid.Item>
    </AreaGrid>
  );
}
```

### CSS Property Types

AreaGrid uses CSS type definitions from the `csstype` package:

```typescript
import type * as CSS from 'csstype';
import { AreaGrid } from '@apvee/react-layout-kit';

function TypedAlignment() {
  // Type-safe CSS alignment values
  const justifyItems: CSS.Property.JustifyItems = 'center';
  const alignItems: CSS.Property.AlignItems = 'start';
  const justifyContent: CSS.Property.JustifyContent = 'space-between';

  return (
    <AreaGrid
      areas='"left center right"'
      justifyItems={justifyItems}
      alignItems={alignItems}
      justifyContent={justifyContent}
    >
      <AreaGrid.Item area="left">Left</AreaGrid.Item>
      <AreaGrid.Item area="center">Center</AreaGrid.Item>
      <AreaGrid.Item area="right">Right</AreaGrid.Item>
    </AreaGrid>
  );
}
```

### Customizing Spacing Scale

You can customize the spacing scale used by the `gap` prop:

```typescript
// types/react-layout-kit.d.ts
declare module '@apvee/react-layout-kit' {
  interface CustomSpacing {
    xs: '4px';
    sm: '8px';
    md: '16px';
    lg: '24px';
    xl: '32px';
    xxl: '48px';
  }
}
```

After customizing, your spacing keys will be properly typed:

```tsx
// ✅ TypeScript knows about your custom spacing keys
<AreaGrid gap="xs" />
<AreaGrid gap={{ xs: "sm", md: "lg", xl: "xxl" }} />

// ❌ TypeScript error: 'giant' is not a valid spacing key
// <AreaGrid gap="giant" />
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

After customizing, your breakpoint keys will be properly typed:

```tsx
// ✅ TypeScript knows about your custom breakpoints
<AreaGrid 
  areas={{ 
    mobile: '"header" "main"',
    desktop: '"header header" "main aside"'
  }}
/>

// ❌ TypeScript error: 'xs' is not a valid breakpoint
// <AreaGrid areas={{ xs: '"header"' }} />
```

[Learn more about configuration →](./customization.md)

### ForwardRef and Ref Types

AreaGrid and AreaGrid.Item properly forward refs with correct typing:

```typescript
import { useRef } from 'react';
import { AreaGrid } from '@apvee/react-layout-kit';

function RefExample() {
  const gridRef = useRef<HTMLDivElement>(null);
  const itemRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    // ✅ Properly typed as HTMLDivElement
    console.log(gridRef.current?.offsetWidth);
    console.log(itemRef.current?.offsetHeight);
  };

  return (
    <AreaGrid 
      ref={gridRef}
      areas='"header" "main"'
      onClick={handleClick}
    >
      <AreaGrid.Item ref={itemRef} area="header">
        Header
      </AreaGrid.Item>
      <AreaGrid.Item area="main">
        Main
      </AreaGrid.Item>
    </AreaGrid>
  );
}
```

### Generic Helper Types

Create reusable layout configurations with proper typing:

```typescript
import type { AreaGridProps } from '@apvee/react-layout-kit';

// Type-safe layout configuration
type LayoutConfig = Pick<AreaGridProps, 'areas' | 'rows' | 'columns' | 'gap'>;

const blogLayout: LayoutConfig = {
  areas: {
    xs: '"header" "content" "sidebar" "footer"',
    md: '"header header" "content sidebar" "footer footer"'
  },
  rows: {
    xs: 'auto 1fr auto auto',
    md: 'auto 1fr auto'
  },
  columns: {
    xs: '1fr',
    md: '1fr 300px'
  },
  gap: { xs: 'sm', md: 'md' }
};

// Use in component
function BlogLayout() {
  return <AreaGrid {...blogLayout}>...</AreaGrid>;
}
```

## Notes and Warnings

### Browser Compatibility

- **CSS Grid Template Areas**: Supported in all modern browsers (Chrome 57+, Firefox 52+, Safari 10.1+, Edge 16+)
- **ResizeObserver**: Used for automatic width measurement. Supported in all modern browsers (Chrome 64+, Firefox 69+, Safari 13.1+, Edge 79+)
- For older browsers, provide `containerWidth` explicitly or use a ResizeObserver polyfill

### Area Name Validation

- **Area Existence Check**: AreaGrid.Item validates if its `area` prop exists in the current `areas` template
- **Non-existent Areas**: Items with areas that don't exist in the current layout automatically return `null` (don't render)
- **Case Sensitive**: Area names are case-sensitive; "Header" ≠ "header"
- **Whitespace**: Extra whitespace in area templates is normalized by CSS

### Performance Considerations

- **Width Measurement**: Uses ResizeObserver with debouncing (150ms default) for performance
- **Style Generation**: All styles are applied via Box dollar props, not inline styles
- **Context Updates**: When areas change, all child items re-validate their area prop
- **Memoization**: Resolved values are memoized and only recalculated when dependencies change
- For static layouts, use `containerWidth` prop to avoid measurement overhead

### Known Limitations

- **SSR**: Container width measurement doesn't work during server-side rendering (defaults to undefined)
  - Solution: Provide `containerWidth` prop for SSR, or accept client-side hydration update
- **Single Child Requirement for asChild**: When using `asChild` on AreaGrid.Item, provide exactly one child element
- **Area Template Syntax**: Must follow CSS grid-template-areas syntax rules (quoted strings, valid identifiers)
- **No Partial Area Matching**: Area names must match exactly; partial matches won't work

### Common Mistakes

❌ **Mismatched row/column counts**:
```tsx
// 3x3 grid template but only 2 columns defined
<AreaGrid
  areas='"a b c" "d e f" "g h i"'
  columns="1fr 1fr"  // Should be "1fr 1fr 1fr"
/>
```

❌ **Forgetting quotes in area template**:
```tsx
// Invalid - missing quotes around rows
<AreaGrid areas="header main footer" />  // Wrong

// Correct
<AreaGrid areas='"header" "main" "footer"' />
```

❌ **Using undefined area names**:
```tsx
<AreaGrid areas='"header" "main"'>
  {/* This won't render - "footer" area doesn't exist */}
  <AreaGrid.Item area="footer">Footer</AreaGrid.Item>
</AreaGrid>
```

❌ **Not accounting for conditional rendering**:
```tsx
// Forgetting that items hide when area doesn't exist
<AreaGrid areas={{ xs: '"header" "main"', md: '"header" "main" "footer"' }}>
  <AreaGrid.Item area="footer">
    {/* This won't show on mobile! Need to handle the conditional content */}
  </AreaGrid.Item>
</AreaGrid>
```

### Migration Notes

If you're familiar with numeric CSS Grid positioning:

- **AreaGrid uses names** instead of line numbers for positioning
- **More semantic** but less flexible for dynamic grid sizes
- **Use Grid component** if you need numeric row/column positioning
- **Use SimpleGrid** if you just need equal-width columns

---

**Next Steps:**
- Learn about [responsive design patterns](./responsive-values.md)
- Explore [Grid component](./grid.md) for numeric grid positioning
- See [SimpleGrid component](./simple-grid.md) for automatic responsive grids
- Review [Box component](./box.md) for foundational styling capabilities
