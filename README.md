# @apvee/react-layout-kit

An opinionated, type-safe React layout library that simplifies styling and layout creation without leaving the React component context. Features responsive CSS-in-JS with Box, Grid, Flex, and Stack components.

Built with TypeScript and Emotion CSS, **@apvee/react-layout-kit** leverages Emotion CSS internally for optimized runtime style generation along with a custom high-performance Slot implementation for component composition. This approach enables seamless dynamic styling based entirely on React props with minimal overhead, dramatically simplifying the React developer experience by eliminating the need for separate CSS files, complex CSS-in-JS setup, or verbose styled-components patterns.

## Why @apvee/react-layout-kit?

**@apvee/react-layout-kit** solves common pain points in modern React development:

- **🎯 Type Safety**: Full TypeScript support with autocompletion for all CSS properties
- **📱 True Responsive Design**: JavaScript-driven responsive system that works with any container
- **🚀 Performance Optimized**: Emotion CSS runtime optimization, debounced ResizeObserver, and memoized calculations
- **⚡ Zero Configuration**: No CSS setup required - styles are generated dynamically from React props
- **🔧 Highly Configurable**: Customizable breakpoints and spacing scales with module augmentation
- **🎨 Developer Experience**: Intuitive API with both full CSS props and convenient shorthand properties
- **🔄 Composition Ready**: `asChild` prop for seamless component composition
- **🌐 SSR Compatible**: Works perfectly with server-side rendering

## 🚀 Quick Start

### Installation

```bash
npm install @apvee/react-layout-kit
```

### Import Patterns

**@apvee/react-layout-kit** supports flexible import patterns for optimal tree-shaking and developer experience:

```tsx
// Main barrel export (recommended for most use cases)
import { Box, Flex, Stack, Grid } from "@apvee/react-layout-kit";

// Granular imports for optimal tree-shaking
import { Box } from "@apvee/react-layout-kit/components/Box";
import { Flex } from "@apvee/react-layout-kit/components/Flex";
import { Stack } from "@apvee/react-layout-kit/components/Stack";

// Type imports
import type { BoxProps, FlexProps } from "@apvee/react-layout-kit";
import type { BoxProps } from "@apvee/react-layout-kit/components/Box";

// Core utilities
import { resolveResponsiveValue } from "@apvee/react-layout-kit/core/responsive";
import { createStyles } from "@apvee/react-layout-kit/core/styling";
```

### Basic Usage

```tsx
import { Box } from "@apvee/react-layout-kit";

function App() {
  return (
    <Box
      $display="flex"
      $gap={16}
      $padding={{ xs: 8, md: 16, lg: 24 }}
      $backgroundColor="blue"
      $color="white"
      $borderRadius={8}
    >
      Hello World - I'm responsive!
    </Box>
  );
}
```

### Component Composition

```tsx
import { Box, Slot } from "@apvee/react-layout-kit";

function StyledButton() {
  return (
    <Box asChild $padding="m" $backgroundColor="blue" $borderRadius={8}>
      <button onClick={() => alert('Clicked!')}>
        Button with Box styling
      </button>
    </Box>
  );
}
```

## Architecture & Structure

**@apvee/react-layout-kit** follows a modular architecture for optimal developer experience and bundle optimization:

```
@apvee/react-layout-kit/
├── components/          # All layout components
│   ├── Box/            # Foundation component
│   ├── Flex/           # Flexbox layouts
│   ├── Stack/          # Vertical/horizontal stacking
│   ├── Grid/           # CSS Grid layouts
│   ├── SimpleGrid/     # Equal-width grids
│   ├── Container/      # Content containers
│   ├── Center/         # Centering utilities
│   ├── Group/          # Horizontal grouping
│   ├── Space/          # Spacing utilities
│   ├── AspectRatio/    # Aspect ratio maintenance
│   └── AreaGrid/       # Named grid areas
├── core/               # Core utilities
│   ├── styling/        # CSS generation utilities
│   ├── responsive/     # Responsive value resolution
│   ├── components/     # Slot system
│   ├── configuration/  # Global configuration
│   └── utils/          # General utilities
├── hooks/              # React hooks
├── types/              # TypeScript definitions
└── index               # Main export
```

### Available Module Exports

| Export Path | Contents |
|-------------|----------|
| `@apvee/react-layout-kit` | All components, hooks, and utilities |
| `@apvee/react-layout-kit/components/Box` | Box component and types |
| `@apvee/react-layout-kit/components/Flex` | Flex component and types |
| `@apvee/react-layout-kit/components/Stack` | Stack component and types |
| `@apvee/react-layout-kit/components/Grid` | Grid component and types |
| `@apvee/react-layout-kit/components/SimpleGrid` | SimpleGrid component and types |
| `@apvee/react-layout-kit/components/Group` | Group component and types |
| `@apvee/react-layout-kit/components/Container` | Container component and types |
| `@apvee/react-layout-kit/components/Center` | Center component and types |
| `@apvee/react-layout-kit/components/AspectRatio` | AspectRatio component and types |
| `@apvee/react-layout-kit/components/AreaGrid` | AreaGrid component and types |
| `@apvee/react-layout-kit/components/Space` | Space component and types |
| `@apvee/react-layout-kit/core/styling` | CSS utilities and generators |
| `@apvee/react-layout-kit/core/responsive` | Responsive value utilities |
| `@apvee/react-layout-kit/types` | All TypeScript definitions |

### Benefits of This Structure

- **🌳 Tree-shakable**: Import only what you need for optimal bundle sizes
- **📦 Modular**: Each component is self-contained with its own types
- **🔧 Maintainable**: Clear separation of concerns and logical organization
- **📚 Discoverable**: Intuitive import paths that reflect component hierarchy
- **⚡ Performance**: Granular imports enable better build optimization
- **🎯 Type-safe**: Dedicated type exports for enhanced TypeScript experience

## Core Components & Features

### Complete Component Library

**@apvee/react-layout-kit** provides a comprehensive set of layout components that work together seamlessly:

#### Core Layout Components

- **`Box`** - The foundation component with all CSS properties and responsive capabilities

#### Specialized Components

- **`Flex`** - Flexbox container with specialized flex properties and `Flex.Item` for children
- **`Grid`** - CSS Grid container with responsive column management and `Grid.Col` for items
- **`Stack`** - Vertical or horizontal stacking with consistent spacing
- **`SimpleGrid`** - Equal-width grid with responsive column counts
- **`AreaGrid`** - Named CSS Grid areas with `AreaGrid.Item` for semantic layouts
- **`Container`** - Content wrapper with max-width and centering
- **`Center`** - Flexbox centering utility for both inline and block content
- **`AspectRatio`** - Maintains consistent aspect ratios for media content
- **`Group`** - Horizontal grouping with gap and overflow handling
- **`Space`** - Invisible spacing utility for consistent whitespace

#### Component Composition

- **`Slot`** - Powerful component composition primitive for the `asChild` pattern with advanced prop merging
- **`Slottable`** - Marker component for advanced slot composition scenarios
- **`useSlot`** - Hook for programmatic slot detection and manipulation

All components share the same responsive system, spacing scale, and styling capabilities through the `Box` foundation.

### The Box Component

The `Box` component is the foundation of the library. It's a polymorphic component that can render as any HTML element while providing powerful styling capabilities.

#### Key Features

- **Universal CSS Properties**: Every CSS property is available with a `$` prefix
- **Responsive Values**: Use breakpoint objects for responsive design
- **Automatic Width Measurement**: Built-in ResizeObserver for container-aware responsive behavior
- **Component Composition**: Render as any element using the `asChild` prop
- **Performance Optimized**: Memoized computations and debounced measurements

#### Box Core Props

| Prop             | Type      | Description                                       |
| ---------------- | --------- | ------------------------------------------------- |
| `asChild`        | `boolean` | Render as child element using internal Slot       |
| `containerWidth` | `number`  | Fixed container width for responsive calculations |
| `styleReset`     | `boolean` | Apply basic style reset (box-sizing: border-box)  |

#### Box Short Props - Margin

| Prop | Type                            | Description                            |
| ---- | ------------------------------- | -------------------------------------- |
| `m`  | `ResponsiveValue<SpacingValue>` | Margin (all sides)                     |
| `mt` | `ResponsiveValue<SpacingValue>` | Margin top                             |
| `mb` | `ResponsiveValue<SpacingValue>` | Margin bottom                          |
| `ml` | `ResponsiveValue<SpacingValue>` | Margin left                            |
| `mr` | `ResponsiveValue<SpacingValue>` | Margin right                           |
| `ms` | `ResponsiveValue<SpacingValue>` | Margin inline start (logical property) |
| `me` | `ResponsiveValue<SpacingValue>` | Margin inline end (logical property)   |
| `mx` | `ResponsiveValue<SpacingValue>` | Margin inline (left + right)           |
| `my` | `ResponsiveValue<SpacingValue>` | Margin block (top + bottom)            |

#### Box Short Props - Padding

| Prop | Type                            | Description                             |
| ---- | ------------------------------- | --------------------------------------- |
| `p`  | `ResponsiveValue<SpacingValue>` | Padding (all sides)                     |
| `pt` | `ResponsiveValue<SpacingValue>` | Padding top                             |
| `pb` | `ResponsiveValue<SpacingValue>` | Padding bottom                          |
| `pl` | `ResponsiveValue<SpacingValue>` | Padding left                            |
| `pr` | `ResponsiveValue<SpacingValue>` | Padding right                           |
| `ps` | `ResponsiveValue<SpacingValue>` | Padding inline start (logical property) |
| `pe` | `ResponsiveValue<SpacingValue>` | Padding inline end (logical property)   |
| `px` | `ResponsiveValue<SpacingValue>` | Padding inline (left + right)           |
| `py` | `ResponsiveValue<SpacingValue>` | Padding block (top + bottom)            |

#### Box Short Props - Size

| Prop  | Type                         | Description                 |
| ----- | ---------------------------- | --------------------------- |
| `w`   | `ResponsiveValue<Width>`     | Width - accepts CSS values  |
| `miw` | `ResponsiveValue<MinWidth>`  | Minimum width               |
| `maw` | `ResponsiveValue<MaxWidth>`  | Maximum width               |
| `h`   | `ResponsiveValue<Height>`    | Height - accepts CSS values |
| `mih` | `ResponsiveValue<MinHeight>` | Minimum height              |
| `mah` | `ResponsiveValue<MaxHeight>` | Maximum height              |

#### Box Short Props - Position

| Prop     | Type                      | Description                       |
| -------- | ------------------------- | --------------------------------- |
| `top`    | `ResponsiveValue<Top>`    | Top position - uses CSS values    |
| `left`   | `ResponsiveValue<Left>`   | Left position - uses CSS values   |
| `bottom` | `ResponsiveValue<Bottom>` | Bottom position - uses CSS values |
| `right`  | `ResponsiveValue<Right>`  | Right position - uses CSS values  |

#### Box Dollar Props

All CSS properties are available with a `$` prefix and support responsive values:

| Property Category | Examples                                                                 |
| ----------------- | ------------------------------------------------------------------------ |
| **Layout**        | `$display`, `$position`, `$float`, `$clear`                              |
| **Flexbox**       | `$flexDirection`, `$justifyContent`, `$alignItems`, `$flex`, `$flexGrow` |
| **Grid**          | `$gridTemplateColumns`, `$gridArea`, `$justifyItems`, `$alignContent`    |
| **Spacing**       | `$margin`, `$padding`, `$gap`, `$rowGap`, `$columnGap`                   |
| **Sizing**        | `$width`, `$height`, `$minWidth`, `$maxHeight`, `$boxSizing`             |
| **Typography**    | `$fontSize`, `$fontWeight`, `$lineHeight`, `$textAlign`, `$color`        |
| **Visual**        | `$backgroundColor`, `$border`, `$borderRadius`, `$boxShadow`, `$opacity` |
| **Positioning**   | `$top`, `$left`, `$bottom`, `$right`, `$zIndex`                          |
| **Transform**     | `$transform`, `$transformOrigin`, `$rotate`, `$scale`, `$translate`      |
| **Animation**     | `$transition`, `$animation`, `$transitionDuration`                       |

#### CSS Properties with $ Prefix

Every CSS property is available with a `$` prefix, providing full type safety and autocompletion:

```tsx
<Box
  // Layout
  $display="flex"
  $flexDirection="column"
  $alignItems="center"
  $justifyContent="space-between"
  // Spacing
  $padding={24}
  $margin="auto"
  $gap={16}
  // Visual
  $backgroundColor="#f0f8ff"
  $borderRadius={12}
  $boxShadow="0 4px 12px rgba(0,0,0,0.1)"
  $border="1px solid #e1e5e9"
  // Typography
  $fontSize={18}
  $fontWeight="600"
  $color="#333"
  $textAlign="center"
  // Positioning
  $position="relative"
  $top={0}
  $zIndex={10}
>
  Fully styled content
</Box>
```

## Layout Components In Detail

### The Flex Component

The `Flex` component provides comprehensive flexbox layout capabilities with responsive support and a specialized `Flex.Item` sub-component.

#### Key Features

- **Complete Flexbox Control**: All CSS flexbox properties available
- **Flex.Item Sub-component**: Individual flex item control with grow, shrink, basis
- **Advanced Gap Control**: Separate row and column gaps
- **Responsive Values**: Every property supports responsive breakpoint objects
- **Container-aware**: Automatic width measurement for responsive calculations

#### Flex Props

| Prop        | Type                              | Description                      |
| ----------- | --------------------------------- | -------------------------------- |
| `align`     | `ResponsiveValue<AlignItems>`     | Cross-axis alignment of elements |
| `justify`   | `ResponsiveValue<JustifyContent>` | Main-axis alignment of elements  |
| `direction` | `ResponsiveValue<FlexDirection>`  | Flex layout direction            |
| `wrap`      | `ResponsiveValue<FlexWrap>`       | Flex items wrapping behavior     |
| `gap`       | `ResponsiveValue<SpacingValue>`   | Space between all elements       |
| `rowGap`    | `ResponsiveValue<SpacingValue>`   | Space between rows               |
| `columnGap` | `ResponsiveValue<SpacingValue>`   | Space between columns            |

#### Flex.Item Props

| Prop        | Type                          | Description                  |
| ----------- | ----------------------------- | ---------------------------- |
| `flex`      | `ResponsiveValue<Flex>`       | Flex shorthand property      |
| `grow`      | `ResponsiveValue<FlexGrow>`   | Element's ability to grow    |
| `shrink`    | `ResponsiveValue<FlexShrink>` | Element's ability to shrink  |
| `basis`     | `ResponsiveValue<FlexBasis>`  | Element's base size          |
| `alignSelf` | `ResponsiveValue<AlignSelf>`  | Individual element alignment |
| `order`     | `ResponsiveValue<Order>`      | Visual order of element      |

#### Flex Examples

```tsx
// Basic flex container
<Flex align="center" justify="space-between" gap="m">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</Flex>

// Column layout with responsive direction
<Flex
  direction={{ xs: "column", md: "row" }}
  align={{ xs: "stretch", md: "center" }}
  gap={{ xs: "s", md: "l" }}
>
  <div>Responsive Item 1</div>
  <div>Responsive Item 2</div>
</Flex>

// Advanced flex items
<Flex gap="m">
  <Flex.Item flex={1}>Grows to fill space</Flex.Item>
  <Flex.Item shrink={0} basis="200px">Fixed 200px width</Flex.Item>
  <Flex.Item grow={2} alignSelf="flex-end">Grows 2x, aligns to end</Flex.Item>
</Flex>
```

### The Stack Component

The `Stack` component creates vertical or horizontal stacking layouts with consistent spacing and alignment.

#### Key Features

- **Vertical/Horizontal Stacking**: Simple direction control
- **Consistent Spacing**: Automatic gap management between items
- **Responsive Alignment**: All properties support responsive values
- **Semantic HTML**: Works with any child elements

#### Stack Props

| Prop      | Type                              | Description                      |
| --------- | --------------------------------- | -------------------------------- |
| `align`   | `ResponsiveValue<AlignItems>`     | Cross-axis alignment of elements |
| `justify` | `ResponsiveValue<JustifyContent>` | Main-axis alignment of elements  |
| `gap`     | `ResponsiveValue<SpacingValue>`   | Space between elements           |

#### Stack Examples

```tsx
// Vertical stack (default)
<Stack gap="m" align="center">
  <h1>Title</h1>
  <p>Description</p>
  <button>Action</button>
</Stack>

// Responsive stack with dynamic spacing
<Stack
  gap={{ xs: "s", md: "l" }}
  align={{ xs: "stretch", md: "center" }}
>
  <div>Stack Item 1</div>
  <div>Stack Item 2</div>
  <div>Stack Item 3</div>
</Stack>
```

### The Container Component

The `Container` component centers content horizontally and controls maximum width for consistent page layouts.

#### Key Features

- **Automatic Centering**: Uses auto margins for horizontal centering
- **Max Width Control**: Configurable maximum width with responsive values
- **Fluid Mode**: Full-width option for dashboard layouts
- **Built-in Padding**: Consistent horizontal padding for readability

#### Container Props

| Prop    | Type                       | Description             |
| ------- | -------------------------- | ----------------------- |
| `size`  | `ResponsiveValue<number>`  | Maximum width in pixels |
| `fluid` | `ResponsiveValue<boolean>` | Full width mode         |

#### Container Examples

```tsx
// Default container (1200px max width)
<Container>
  <h1>Centered Content</h1>
  <p>This content is automatically centered and has a max width of 1200px</p>
</Container>

// Responsive container sizes
<Container size={{ xs: 320, sm: 480, md: 768, lg: 1024, xl: 1200 }}>
  <div>Responsive container content</div>
</Container>

// Fluid container for full-width layouts
<Container fluid>
  <div>Full width content for dashboards</div>
</Container>
```

### The Grid Component

The `Grid` component provides CSS Grid layout capabilities with flexible column management and responsive behavior.

#### Key Features

- **CSS Grid Layout**: Full CSS Grid support with responsive columns
- **Grid.Col Sub-component**: Individual grid item control
- **Flexible Columns**: Dynamic column count and sizing
- **Responsive Layout**: Container-aware responsive behavior

#### Grid Props

| Prop      | Type                              | Description            |
| --------- | --------------------------------- | ---------------------- |
| `columns` | `ResponsiveValue<number>`         | Number of columns      |
| `gutter`  | `ResponsiveValue<SpacingValue>`   | Space between elements |
| `align`   | `ResponsiveValue<AlignItems>`     | Vertical alignment     |
| `justify` | `ResponsiveValue<JustifyContent>` | Horizontal alignment   |

#### Grid.Col Props

| Prop     | Type                      | Description               |
| -------- | ------------------------- | ------------------------- |
| `span`   | `ResponsiveValue<number>` | Number of columns to span |
| `offset` | `ResponsiveValue<number>` | Column offset             |

#### Grid Examples

```tsx
// Basic 3-column grid
<Grid columns={3} gutter="m">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</Grid>

// Responsive grid with column spans
<Grid columns={{ xs: 1, sm: 2, md: 3, lg: 4 }} gutter="l">
  <Grid.Col span={{ xs: 1, md: 2 }}>Wide item</Grid.Col>
  <Grid.Col>Regular item</Grid.Col>
  <Grid.Col>Regular item</Grid.Col>
</Grid>
```

### The SimpleGrid Component

The `SimpleGrid` component creates equal-width grid layouts with responsive column counts.

#### Key Features

- **Equal Width Columns**: Automatic equal-width grid items
- **Responsive Columns**: Dynamic column count based on breakpoints
- **Simple API**: Minimal configuration for common grid layouts
- **Auto-fit Behavior**: Intelligent column fitting

#### SimpleGrid Props

| Prop            | Type                            | Description               |
| --------------- | ------------------------------- | ------------------------- |
| `cols`          | `ResponsiveValue<number>`       | Number of columns         |
| `spacing`       | `ResponsiveValue<SpacingValue>` | Space between elements    |
| `minChildWidth` | `ResponsiveValue<number>`       | Minimum width of children |

#### SimpleGrid Examples

```tsx
// Simple equal-width grid
<SimpleGrid cols={3} spacing="m">
  <div>Card 1</div>
  <div>Card 2</div>
  <div>Card 3</div>
</SimpleGrid>

// Responsive column count
<SimpleGrid
  cols={{ xs: 1, sm: 2, md: 3, lg: 4 }}
  spacing={{ xs: "s", md: "l" }}
>
  <div>Responsive Card 1</div>
  <div>Responsive Card 2</div>
  <div>Responsive Card 3</div>
  <div>Responsive Card 4</div>
</SimpleGrid>
```

### The Center Component

The `Center` component provides perfect centering for content using flexbox.

#### Key Features

- **Perfect Centering**: Both horizontal and vertical centering
- **Inline/Block Mode**: Support for both inline-flex and flex display
- **Responsive Behavior**: Responsive inline/block switching
- **Semantic HTML**: Works with any child content

#### Center Props

| Prop     | Type                       | Description                     |
| -------- | -------------------------- | ------------------------------- |
| `inline` | `ResponsiveValue<boolean>` | Use inline-flex instead of flex |

#### Center Examples

```tsx
// Center content in a container
<Center $height="200px">
  <button>Perfectly Centered Button</button>
</Center>

// Inline centering for text elements
<Center inline>
  <span>Inline centered text</span>
</Center>
```

### The AspectRatio Component

The `AspectRatio` component maintains consistent aspect ratios for media content.

#### Key Features

- **Consistent Ratios**: Maintains width/height ratios perfectly
- **Responsive Ratios**: Different ratios at different breakpoints
- **Media Perfect**: Ideal for images, videos, maps, and embeds
- **CSS Padding Technique**: Uses reliable CSS padding-bottom method

#### AspectRatio Props

| Prop    | Type                      | Description                  |
| ------- | ------------------------- | ---------------------------- |
| `ratio` | `ResponsiveValue<number>` | Aspect ratio as width/height |

#### AspectRatio Examples

```tsx
// 16:9 video aspect ratio
<AspectRatio ratio={16/9}>
  <iframe src="video-url" style={{ width: '100%', height: '100%' }} />
</AspectRatio>

// Responsive aspect ratios
<AspectRatio ratio={{ xs: 1, md: 16/9 }}>
  <img src="image.jpg" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
</AspectRatio>
```

### The Group Component

The `Group` component creates horizontal flex layouts with advanced overflow handling.

#### Key Features

- **Horizontal Grouping**: Specialized for horizontal layouts
- **Overflow Prevention**: Smart overflow handling for button groups
- **Flexible Growth**: Optional grow behavior for items
- **Responsive Wrapping**: Configurable wrap behavior

#### Group Props

| Prop                  | Type                              | Description                      |
| --------------------- | --------------------------------- | -------------------------------- |
| `align`               | `ResponsiveValue<AlignItems>`     | Cross-axis alignment of elements |
| `gap`                 | `ResponsiveValue<SpacingValue>`   | Space between elements           |
| `grow`                | `ResponsiveValue<boolean>`        | Element growth behavior          |
| `justify`             | `ResponsiveValue<JustifyContent>` | Main-axis alignment of elements  |
| `preventGrowOverflow` | `ResponsiveValue<boolean>`        | Prevent overflow with grow       |
| `wrap`                | `ResponsiveValue<FlexWrap>`       | Wrapping behavior                |

#### Group Examples

```tsx
// Button group
<Group gap="s" wrap="nowrap">
  <button>Save</button>
  <button>Cancel</button>
  <button>Delete</button>
</Group>

// Responsive toolbar
<Group
  gap={{ xs: "xs", md: "s" }}
  justify={{ xs: "center", md: "flex-start" }}
  wrap={{ xs: "wrap", md: "nowrap" }}
>
  <button>Action 1</button>
  <button>Action 2</button>
  <button>Action 3</button>
</Group>
```

### The Space Component

The `Space` component provides invisible spacing utility for consistent whitespace.

#### Key Features

- **Invisible Spacing**: Creates space without visual elements
- **Width/Height Control**: Both horizontal and vertical spacing
- **Responsive Spacing**: Dynamic spacing based on breakpoints
- **Layout Utility**: Perfect for section spacing and layout rhythm

#### Space Props

| Prop | Type                            | Description        |
| ---- | ------------------------------- | ------------------ |
| `w`  | `ResponsiveValue<SpacingValue>` | Horizontal spacing |
| `h`  | `ResponsiveValue<SpacingValue>` | Vertical spacing   |

#### Space Examples

```tsx
// Vertical section spacing
<div>
  <h1>Section 1</h1>
  <Space h="xl" />
  <h2>Section 2</h2>
  <Space h="l" />
  <p>Content with consistent spacing</p>
</div>

// Responsive spacing
// Responsive spacing
<div>
  <div>Content Block 1</div>
  <Space h={{ xs: "m", md: "xl" }} />
  <div>Content Block 2</div>
</div>
```

### The Slot Component

The `Slot` component enables powerful component composition using the `asChild` pattern, allowing props to be passed through to child elements while merging refs, event handlers, and styles intelligently.

#### Key Features

- **Seamless Composition**: Pass props to child elements without wrapper divs
- **Advanced Prop Merging**: Intelligent merging of event handlers, className, style, and refs
- **Slottable Support**: Advanced composition scenarios with the `Slottable` component
- **Zero Dependencies**: Standalone implementation optimized for performance and SPFx compatibility
- **Full TypeScript Support**: Complete type safety with prop merging and composition

#### Slot Props

| Prop       | Type                | Description                    |
| ---------- | ------------------- | ------------------------------ |
| `children` | `React.ReactNode`   | Child element to receive props |

#### Slottable Props

| Prop       | Type                | Description                           |
| ---------- | ------------------- | ------------------------------------- |
| `children` | `React.ReactNode`   | Content to be marked as slottable     |

#### useSlot Hook

Returns an object with utilities for working with Slot components programmatically:

| Return Property | Type                        | Description                          |
| --------------- | --------------------------- | ------------------------------------ |
| `ref`           | `React.RefCallback<HTMLElement>` | Ref callback for slot detection |
| `slotRef`       | `HTMLElement \| null`       | Current slot element reference       |
| `isSlot`        | `boolean`                   | Whether element is a Slot component  |

#### Slot Examples

```tsx
// Basic slot usage - props merge with button
<Slot 
  onClick={handleClick} 
  className="custom-class"
  style={{ margin: '10px' }}
>
  <button className="btn" style={{ padding: '5px' }}>
    Click me
  </button>
</Slot>
// Renders: <button onClick={handleClick} className="custom-class btn" style={{ margin: '10px', padding: '5px' }}>

// Advanced composition with Box
<Box asChild $padding="m" $backgroundColor="blue" $borderRadius={8}>
  <button onClick={handleSubmit}>
    Styled Button with Box props
  </button>
</Box>

// Multiple prop merging
<Slot 
  onClick={handlePrimary}
  onFocus={handleFocus}
  className="wrapper-class"
  style={{ fontSize: '16px' }}
>
  <CustomButton 
    onClick={handleSecondary}
    className="button-class"
    style={{ color: 'red' }}
  >
    Merged Props Button
  </CustomButton>
</Slot>
// Both onClick handlers will be called, classes and styles merged

// Using with Slottable for complex scenarios
<Slot onClick={handleClick}>
  <Slottable>
    <ComplexComponent>
      <NestedContent />
    </ComplexComponent>
  </Slottable>
</Slot>

// useSlot hook for programmatic detection
function CustomComponent({ element }) {
  const { ref, slotRef, isSlot } = useSlot(element);
  
  return (
    <div ref={ref}>
      {isSlot ? 'This is a Slot component' : 'Regular component'}
      {slotRef && <p>Slot element: {slotRef.tagName}</p>}
    </div>
  );
}
```

### The AreaGrid Component

The `AreaGrid` component provides CSS Grid layouts using named grid areas for semantic, flexible layouts.

#### Key Features

- **Named Grid Areas**: Use semantic names like "header", "sidebar", "main", "footer"
- **AreaGrid.Item Sub-component**: Positions items in named areas with individual alignment
- **Responsive Restructuring**: Completely change layout structure at different breakpoints
- **Full Grid Control**: Complete control over rows, columns, gaps, and alignment
- **Context-aware Rendering**: Items only render when their area exists in current layout

#### AreaGrid Props

| Prop             | Type                              | Description                     |
| ---------------- | --------------------------------- | ------------------------------- |
| `areas`          | `ResponsiveValue<string>`         | Grid-template-areas definition  |
| `rows`           | `ResponsiveValue<string>`         | Grid-template-rows sizing       |
| `columns`        | `ResponsiveValue<string>`         | Grid-template-columns sizing    |
| `gap`            | `ResponsiveValue<SpacingValue>`   | Space between grid items        |
| `justifyItems`   | `ResponsiveValue<JustifyItems>`   | Horizontal alignment of items   |
| `alignItems`     | `ResponsiveValue<AlignItems>`     | Vertical alignment of items     |
| `justifyContent` | `ResponsiveValue<JustifyContent>` | Horizontal alignment of content |
| `alignContent`   | `ResponsiveValue<AlignContent>`   | Vertical alignment of content   |

#### AreaGrid.Item Props

| Prop          | Type                           | Description                     |
| ------------- | ------------------------------ | ------------------------------- |
| `area`        | `ResponsiveValue<string>`      | Grid area assignment            |
| `justifySelf` | `ResponsiveValue<JustifySelf>` | Individual horizontal alignment |
| `alignSelf`   | `ResponsiveValue<AlignSelf>`   | Individual vertical alignment   |

#### AreaGrid Examples

```tsx
// Basic page layout
<AreaGrid
  areas='"header header header" "sidebar main main" "footer footer footer"'
  rows="auto 1fr auto"
  columns="200px 1fr 1fr"
  gap="m"
>
  <AreaGrid.Item area="header">Header Content</AreaGrid.Item>
  <AreaGrid.Item area="sidebar">Sidebar Content</AreaGrid.Item>
  <AreaGrid.Item area="main">Main Content</AreaGrid.Item>
  <AreaGrid.Item area="footer">Footer Content</AreaGrid.Item>
</AreaGrid>

// Responsive layout restructuring
<AreaGrid
  areas={{
    xs: '"header" "main" "sidebar" "footer"',    // Mobile: stacked vertically
    md: '"header header" "sidebar main" "footer footer"'  // Desktop: sidebar layout
  }}
  rows={{ xs: "auto auto auto auto", md: "auto 1fr auto" }}
  columns={{ xs: "1fr", md: "200px 1fr" }}
  gap={{ xs: "s", md: "l" }}
>
  <AreaGrid.Item area="header">Responsive Header</AreaGrid.Item>
  <AreaGrid.Item area="sidebar">Responsive Sidebar</AreaGrid.Item>
  <AreaGrid.Item area="main">Responsive Main Content</AreaGrid.Item>
  <AreaGrid.Item area="footer">Responsive Footer</AreaGrid.Item>
</AreaGrid>

// Advanced dashboard layout
<AreaGrid
  areas={`
    "nav nav nav nav"
    "sidebar main main widgets"
    "sidebar charts charts widgets"
    "footer footer footer footer"
  `}
  columns="180px 1fr 1fr 200px"
  rows="60px 1fr 1fr 50px"
  gap="s"
>
  <AreaGrid.Item area="nav" justifySelf="stretch">Navigation</AreaGrid.Item>
  <AreaGrid.Item area="sidebar">Dashboard Sidebar</AreaGrid.Item>
  <AreaGrid.Item area="main">Main Dashboard</AreaGrid.Item>
  <AreaGrid.Item area="widgets">Widget Panel</AreaGrid.Item>
  <AreaGrid.Item area="charts">Chart Area</AreaGrid.Item>
  <AreaGrid.Item area="footer">Dashboard Footer</AreaGrid.Item>
</AreaGrid>
```

## Responsive Values System

### What are Responsive Values?

Responsive values allow you to specify different values for different screen sizes using breakpoint objects. This is more powerful than traditional CSS media queries because it's container-aware and JavaScript-driven.

```tsx
type ResponsiveValue<T> = T | Partial<Record<BreakpointKey, T>>;
```

### How Responsive Values Work

The library automatically measures container width and applies the appropriate value based on your breakpoint configuration:

```tsx
<Box
  $padding={{
    xs: 8, // 0px and up
    sm: 12, // 480px and up
    md: 16, // 768px and up
    lg: 24, // 1024px and up
    xl: 32, // 1280px and up
  }}
  $fontSize={{
    xs: 14,
    md: 16,
    lg: 18,
  }}
  $backgroundColor={{
    xs: "lightblue",
    md: "lightgreen",
    lg: "lightcoral",
  }}
>
  I change based on my container size, not just viewport!
</Box>
```

### Mobile-First Approach

Responsive values use a mobile-first approach. Each breakpoint applies from that width up until a larger breakpoint is reached:

```tsx
<Box $padding={{ xs: 8, lg: 24 }}>
  {/* 8px padding from 0-1023px, 24px padding from 1024px+ */}
</Box>
```

### Container-Aware Responsiveness

Unlike CSS media queries that respond to viewport size, responsive values respond to the actual container width:

```tsx
function SidebarCard() {
  return (
    <div style={{ width: "300px" }}>
      {" "}
      {/* Small container */}
      <Box
        $padding={{ xs: 8, md: 16, lg: 24 }}
        $fontSize={{ xs: 12, md: 14, lg: 16 }}
      >
        {/* Uses xs values because container is 300px wide */}
        Small container content
      </Box>
    </div>
  );
}

function MainContent() {
  return (
    <div style={{ width: "800px" }}>
      {" "}
      {/* Large container */}
      <Box
        $padding={{ xs: 8, md: 16, lg: 24 }}
        $fontSize={{ xs: 12, md: 14, lg: 16 }}
      >
        {/* Uses md values because container is 800px wide */}
        Large container content
      </Box>
    </div>
  );
}
```

## Short-Style Props

### Why Short Props?

Short props provide a more concise and familiar syntax for common CSS properties, especially spacing. They're inspired by popular libraries like Chakra UI and Tailwind CSS.

### Available Short Props

#### Margin Properties

```tsx
// Individual sides
m = "m"; // margin (all sides)
mt = "s"; // margin-top
mr = "l"; // margin-right
mb = "m"; // margin-bottom
ml = "xs"; // margin-left

// Logical properties (recommended for internationalization)
ms = "s"; // margin-inline-start (left in LTR, right in RTL)
me = "m"; // margin-inline-end (right in LTR, left in RTL)
mx = "l"; // margin-inline (left + right)
my = "m"; // margin-block (top + bottom)
```

#### Padding Properties

```tsx
// Individual sides
p = "m"; // padding (all sides)
pt = "s"; // padding-top
pr = "l"; // padding-right
pb = "m"; // padding-bottom
pl = "xs"; // padding-left

// Logical properties
ps = "s"; // padding-inline-start
pe = "m"; // padding-inline-end
px = "l"; // padding-inline (left + right)
py = "m"; // padding-block (top + bottom)
```

#### Size Properties

```tsx
w = "200px"; // width (uses CSS values, not spacing scale)
h = "l"; // height (uses spacing scale)
miw = "m"; // min-width (uses spacing scale)
maw = "xl"; // max-width (uses spacing scale)
mih = "s"; // min-height (uses spacing scale)
mah = "l"; // max-height (uses spacing scale)
```

#### Position Properties

```tsx
top = "10px"; // top (uses CSS values, not spacing scale)
left = "20px"; // left
bottom = "0"; // bottom
right = "auto"; // right
```

### Short Props with Responsive Values

Short props work seamlessly with responsive values:

```tsx
<Box
  p={{ xs: "s", md: "m", lg: "l" }} // responsive padding
  mx={{ xs: "xs", lg: "xl" }} // responsive horizontal margin
  h={{ xs: "s", md: "m" }} // responsive height (using spacing scale)
  w={{ xs: "100px", md: "200px" }} // responsive width (using CSS values)
>
  Responsive short props
</Box>
```

### Spacing Scale Integration

Most spacing-related short props (margin, padding, spacing-specific size props) automatically use the spacing scale, while width/height and position props use CSS values directly:

```tsx
<Box
  p="m" // Uses spacing scale: resolves to 16px by default
  m="l" // Uses spacing scale: resolves to 24px by default
  h="l" // Uses spacing scale: resolves to 24px by default
  w="200px" // CSS value: uses exactly "200px"
  top="10px" // CSS value: uses exactly "10px"
  left="2rem" // CSS value: uses exactly "2rem"
>
  Mixed spacing types
</Box>
```

### Precedence: Dollar Props Win

When both dollar props and short props define the same CSS property, dollar props take precedence:

```tsx
<Box
  p="l" // padding: 24px from spacing scale
  $padding="8px" // Wins! Final padding: 8px
>
  Dollar props always win
</Box>
```

## Container Width Measurement

### The useContainerWidth Hook

The `useContainerWidth` hook provides precise, debounced container width measurement using ResizeObserver. Internally, it's a wrapper around the more fundamental `useElementWidth` hook:

```tsx
import { useContainerWidth, useElementWidth } from "@apvee/react-layout-kit";

function ResponsiveCard() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const width = useContainerWidth(containerRef, {
    debounceMs: 16, // 60fps updates (default)
  });

  return (
    <Box
      ref={containerRef}
      containerWidth={width} // Use measured width for responsive calculations
      $padding={{ xs: 8, md: 16, lg: 24 }}
      $backgroundColor={width < 400 ? "lightblue" : "lightgreen"}
    >
      Container width: {width}px
      <div>Responsive based on actual container size!</div>
    </Box>
  );
}
```

### Hook Options

```tsx
interface UseContainerWidthOptions {
  disabled?: boolean; // Disable measurement
  debounceMs?: number; // Debounce delay (default: 16ms for 60fps)
}

// Examples
const width1 = useContainerWidth(ref); // Default options
const width2 = useContainerWidth(ref, { debounceMs: 32 }); // 30fps updates
const width3 = useContainerWidth(ref, { disabled: true }); // Disabled
```

### Why Use Container Width?

Container-aware responsive design is more powerful than viewport-based media queries:

```tsx
// Traditional CSS media queries - responds to viewport
@media (max-width: 768px) {
  .card { padding: 8px; }
}

// Container-aware responsive - responds to actual container
<Box $padding={{ xs: 8, md: 16 }}>
  {/* Automatically uses correct padding based on container size */}
</Box>
```

This enables true component-level responsive design, where the same component can behave differently in different contexts.

### Fixed Container Width

For performance optimization or when you know the container width, you can provide it directly:

```tsx
<Box
  containerWidth={750} // Skip measurement, use fixed width
  $padding={{ xs: 8, md: 16, lg: 24 }}
>
  Fixed width responsive behavior
</Box>
```

## CSS Class Utilities

### mergeClasses Function

`mergeClasses` is a re-export of Emotion's `cx` function for combining class names safely:

```tsx
import { mergeClasses } from "@apvee/react-layout-kit";

const baseClass = "base-styles";
const conditionalClass = isActive ? "active" : undefined;
const emotionClass = css({ color: "red" });

const combinedClass = mergeClasses(
  baseClass,
  conditionalClass, // undefined values are filtered out
  emotionClass,
  "additional-class"
);
```

### createStyles Function

`createStyles` is a re-export of Emotion's `css` function for creating CSS classes:

```tsx
import { createStyles, mergeClasses } from "@apvee/react-layout-kit";

// Create reusable style classes
const buttonBase = createStyles({
  padding: "12px 24px",
  borderRadius: "6px",
  border: "none",
  cursor: "pointer",
  fontWeight: 600,
});

const primaryButton = createStyles({
  backgroundColor: "#007bff",
  color: "white",
  "&:hover": {
    backgroundColor: "#0056b3",
  },
});

const secondaryButton = createStyles({
  backgroundColor: "#6c757d",
  color: "white",
  "&:hover": {
    backgroundColor: "#545b62",
  },
});

// Use with Box component
function CustomButton({ variant = "primary", children, ...props }) {
  const variantClass = variant === "primary" ? primaryButton : secondaryButton;

  return (
    <Box asChild className={mergeClasses(buttonBase, variantClass)} {...props}>
      <button>{children}</button>
    </Box>
  );
}
```

### Integration with Box

The utility functions work seamlessly with the Box component:

```tsx
const myCustomStyles = createStyles({
  border: "2px solid #007bff",
  "&:hover": {
    borderColor: "#0056b3",
  },
});

<Box
  className={mergeClasses(myCustomStyles, "additional-class")}
  $padding="m"
  $borderRadius={8}
>
  Combined custom and Box styles
</Box>;
```

## 🔧 Custom Configuration

### Default Breakpoints

The library comes with sensible default breakpoints:

```tsx
const defaultBreakpoints = {
  xs: 0, // Mobile first
  sm: 480, // Small mobile
  md: 768, // Tablet
  lg: 1024, // Desktop
  xl: 1280, // Large desktop
};
```

### Default Spacing Scale

The library includes a default spacing scale:

```tsx
const defaultSpacing = {
  none: 0,
  xs: 4, // 0.25rem equivalent
  s: 8, // 0.5rem equivalent
  m: 16, // 1rem equivalent
  l: 24, // 1.5rem equivalent
  xl: 32, // 2rem equivalent
  xxl: 40, // 2.5rem equivalent
};
```

### Customizing Breakpoints (BreakpointDefs)

You can extend the default breakpoints by using TypeScript module augmentation and runtime configuration:

#### Step 1: Type Declaration

Create a type declaration file in your project:

```tsx
// types/react-box.d.ts
import "@apvee/react-layout-kit";

declare module "@apvee/react-layout-kit" {
  interface BreakpointDefs {
    // Add custom breakpoints while keeping defaults
    tablet: number;
    "2xl": number;
    "3xl": number;
    mobile: number;
  }
}
```

#### Step 2: Runtime Configuration

Configure the actual breakpoint values at runtime:

```tsx
// config/box-config.ts
import { configureBox } from "@apvee/react-layout-kit";

configureBox({
  breakpoints: {
    // Keep defaults and add custom ones
    xs: 0,
    mobile: 360, // Custom mobile breakpoint
    sm: 480,
    tablet: 600, // Custom tablet breakpoint
    md: 768,
    lg: 1024,
    xl: 1280,
    "2xl": 1440, // Custom large desktop
    "3xl": 1920, // Custom extra large
  },
});
```

#### Step 3: Use Custom Breakpoints

Now you can use your custom breakpoints with full type safety:

```tsx
<Box
  $padding={{
    xs: 8,
    mobile: 12, // Custom breakpoint with autocomplete!
    tablet: 16, // Custom breakpoint with autocomplete!
    md: 20,
    "2xl": 32, // Custom breakpoint with autocomplete!
    "3xl": 40, // Custom breakpoint with autocomplete!
  }}
>
  Custom responsive behavior
</Box>
```

### Customizing Spacing Scale (SpacingDefs)

Similarly, you can extend the spacing scale:

#### Step 1: Type Declaration

```tsx
// types/react-box.d.ts
import "@apvee/react-layout-kit";

declare module "@apvee/react-layout-kit" {
  interface SpacingDefs {
    // Add custom spacing tokens
    xxs: string | number;
    xxxl: string | number;
    "0": string | number;
    "1": string | number;
    "2": string | number;
    "4": string | number;
    "8": string | number;
  }
}
```

#### Step 2: Runtime Configuration

```tsx
// config/box-config.ts
import { configureBox } from "@apvee/react-layout-kit";

configureBox({
  spacing: {
    // Keep defaults and add custom ones
    "0": 0,
    xxs: 2, // 0.125rem
    "1": 4,
    xs: 4,
    "2": 8,
    s: 8,
    m: 16,
    "4": 16,
    l: 24,
    xl: 32,
    "8": 32,
    xxl: 40,
    xxxl: 64, // 4rem
  },
});
```

#### Step 3: Use Custom Spacing

```tsx
<Box
  p={{
    xs: "xxs", // Custom spacing with autocomplete!
    md: "4", // Numeric spacing tokens
    lg: "xxxl", // Custom large spacing
  }}
  m="2" // Numeric spacing token
>
  Custom spacing system
</Box>
```

### Advanced Spacing Configuration

You can use different units and even responsive spacing values:

```tsx
configureBox({
  spacing: {
    none: 0,
    xxs: "0.125rem", // rem units
    xs: "0.25rem",
    s: "0.5rem",
    m: "1rem",
    l: "1.5rem",
    xl: "2rem",
    xxl: "3rem",
    fluid: "clamp(1rem, 2vw, 2rem)", // CSS clamp for fluid spacing
    golden: "1.618rem", // Golden ratio spacing
  },
});
```

### Runtime Configuration Best Practices

1. **Configure Early**: Set up configuration before rendering any Box components
2. **Use Module Augmentation**: Always extend types for better DX
3. **Keep Consistency**: Use consistent naming patterns for breakpoints and spacing
4. **Document Your Scale**: Create documentation for your custom spacing and breakpoints

```tsx
// app/setup.ts - Configure before app starts
import { configureBox } from "@apvee/react-layout-kit";

export function setupBoxConfiguration() {
  configureBox({
    breakpoints: {
      xs: 0,
      sm: 576, // Bootstrap-like
      md: 768,
      lg: 992,
      xl: 1200,
      xxl: 1400,
    },
    spacing: {
      0: 0,
      1: "0.25rem", // 4px
      2: "0.5rem", // 8px
      3: "0.75rem", // 12px
      4: "1rem", // 16px
      5: "1.25rem", // 20px
      6: "1.5rem", // 24px
      8: "2rem", // 32px
      10: "2.5rem", // 40px
      12: "3rem", // 48px
      16: "4rem", // 64px
      20: "5rem", // 80px
    },
  });
}

// main.tsx
import { setupBoxConfiguration } from "./app/setup";

setupBoxConfiguration(); // Call before rendering
```

## Component Composition with asChild

### Why asChild?

The `asChild` prop allows the Box component to render as any HTML element or React component while preserving all its styling capabilities. This is powered by an internal high-performance Slot implementation.

### Basic asChild Usage

```tsx
// Render as a button
<Box asChild $padding="m" $backgroundColor="blue" $color="white" $borderRadius={6}>
  <button onClick={() => alert('Clicked!')}>
    Styled Button
  </button>
</Box>

// Render as a link
<Box asChild $display="inline-block" $padding="s" $textDecoration="none">
  <a href="/about">
    Styled Link
  </a>
</Box>

// Render as an article
<Box asChild $maxWidth={600} $margin="auto" $padding="l">
  <article>
    <h1>Article Title</h1>
    <p>Article content...</p>
  </article>
</Box>
```

### Advanced Composition Patterns

```tsx
// Custom button component with Box styling
function CustomButton({ variant, children, ...props }) {
  const variantStyles = {
    primary: { $backgroundColor: "blue", $color: "white" },
    secondary: { $backgroundColor: "gray", $color: "black" },
  };

  return (
    <Box
      asChild
      $padding="m"
      $borderRadius={6}
      $border="none"
      $cursor="pointer"
      {...variantStyles[variant]}
      {...props}
    >
      <button>{children}</button>
    </Box>
  );
}

// Custom link component
function CustomLink({ children, ...props }) {
  return (
    <Box
      asChild
      $textDecoration="none"
      $color="blue"
      $padding="s"
      $borderRadius={4}
      $hover={{ $backgroundColor: "lightblue" }}
      {...props}
    >
      <a>{children}</a>
    </Box>
  );
}
```

### Event Handling with asChild

Event handlers are properly merged when using `asChild`:

```tsx
function InteractiveCard() {
  const handleBoxClick = () => console.log("Box clicked");
  const handleButtonClick = () => console.log("Button clicked");

  return (
    <Box
      asChild
      $padding="l"
      $border="1px solid #ccc"
      $borderRadius={8}
      onClick={handleBoxClick} // This will be merged with button's onClick
    >
      <button onClick={handleButtonClick}>
        {/* Both click handlers will fire */}
        Click me!
      </button>
    </Box>
  );
}
```

## Complete Examples

### Responsive Card Component

```tsx
import { Box, useContainerWidth } from "@apvee/react-layout-kit";

function ResponsiveCard({ title, content, image }) {
  const cardRef = React.useRef<HTMLDivElement>(null);
  const width = useContainerWidth(cardRef);

  // Adjust layout based on card width
  const isCompact = width < 300;

  return (
    <Box
      ref={cardRef}
      $display="flex"
      $flexDirection={{ xs: "column", md: isCompact ? "column" : "row" }}
      $backgroundColor="white"
      $borderRadius={12}
      $boxShadow="0 4px 12px rgba(0,0,0,0.1)"
      $overflow="hidden"
      $maxWidth={600}
    >
      {/* Image */}
      <Box
        $width={{ xs: "100%", md: isCompact ? "100%" : "200px" }}
        $height={{ xs: "200px", md: isCompact ? "150px" : "100%" }}
        $backgroundColor="#f0f0f0"
        $backgroundImage={`url(${image})`}
        $backgroundSize="cover"
        $backgroundPosition="center"
      />

      {/* Content */}
      <Box
        $padding={{ xs: "m", sm: "l" }}
        $display="flex"
        $flexDirection="column"
        $flex={1}
      >
        <Box
          asChild
          $fontSize={{ xs: 18, md: isCompact ? 16 : 20 }}
          $fontWeight="600"
          $marginBottom="s"
          $color="#333"
        >
          <h3>{title}</h3>
        </Box>

        <Box
          asChild
          $fontSize={{ xs: 14, md: 16 }}
          $color="#666"
          $lineHeight={1.5}
        >
          <p>{content}</p>
        </Box>
      </Box>
    </Box>
  );
}
```

### Layout System

```tsx
import { Container, Stack, SimpleGrid, Flex } from '@apvee/react-layout-kit';

// Container
function ResponsiveContainer({ children, ...props }) {
  return (
    <Container
      size={{ xs: 320, md: 768, lg: 1200 }}
      {...props}
    >
      {children}
    </Container>
  );
}

// Flexible Grid
function ResponsiveGrid({ columns = { xs: 1, sm: 2, md: 3, lg: 4 }, gap = 'm', children, ...props }) {
  return (
    <SimpleGrid
      cols={columns}
      spacing={gap}
      {...props}
    >
      {children}
    </SimpleGrid>
  );
}

// Stack component
function VStack({ align, justify, gap = 'm', children, ...props }) {
  return (
    <Stack
      align={align}
      justify={justify}
      gap={gap}
      {...props}
    >
      {children}
    </Stack>
  );
}

// Usage
# Usage
function App() {
  return (
    <Container>
      <Stack gap="xl">
        <Box asChild $textAlign="center" $marginBottom="l">
          <h1>My App</h1>
        </Box>

        <SimpleGrid cols={{ xs: 1, sm: 2, lg: 3 }} spacing="l">
          <ResponsiveCard title="Card 1" content="Content 1" />
          <ResponsiveCard title="Card 2" content="Content 2" />
          <ResponsiveCard title="Card 3" content="Content 3" />
        </SimpleGrid>
      </Stack>
    </Container>
  );
}
```

## TypeScript Integration

### Type Exports

```tsx
import type {
  // Core component types
  BoxProps,
  BaseBoxProps,
  FlexProps,
  FlexItemProps,
  GridProps,
  GridColProps,
  StackProps,
  SimpleGridProps,
  AreaGridProps,
  AreaGridItemProps,
  ContainerProps,
  CenterProps,
  AspectRatioProps,
  GroupProps,
  SpaceProps,

  // System types
  ResponsiveValue,
  BreakpointDefs,
  SpacingValue,
  BoxConfig,

  // Advanced types
  DollarCssProps,
  IShortStyleBoxProps,
} from "@apvee/react-layout-kit";
```

### Creating Custom Components

```tsx
import type { BoxProps } from "@apvee/react-layout-kit";

// Extend Box props
interface CustomCardProps extends BoxProps {
  variant?: "primary" | "secondary" | "danger";
  elevation?: "low" | "medium" | "high";
}

function CustomCard({
  variant = "primary",
  elevation = "medium",
  children,
  ...boxProps
}: CustomCardProps) {
  const variantStyles = {
    primary: { $backgroundColor: "#007bff", $color: "white" },
    secondary: { $backgroundColor: "#6c757d", $color: "white" },
    danger: { $backgroundColor: "#dc3545", $color: "white" },
  };

  const elevationStyles = {
    low: { $boxShadow: "0 1px 3px rgba(0,0,0,0.1)" },
    medium: { $boxShadow: "0 4px 6px rgba(0,0,0,0.1)" },
    high: { $boxShadow: "0 10px 25px rgba(0,0,0,0.15)" },
  };

  return (
    <Box
      $padding="l"
      $borderRadius={8}
      {...elevationStyles[elevation]}
      {...variantStyles[variant]}
      {...boxProps}
    >
      {children}
    </Box>
  );
}
```

### Working with Responsive Types

```tsx
import type { ResponsiveValue } from "@apvee/react-layout-kit";

// Helper function for responsive values
function createResponsiveValue<T>(
  mobile: T,
  tablet?: T,
  desktop?: T
): ResponsiveValue<T> {
  return {
    xs: mobile,
    ...(tablet && { md: tablet }),
    ...(desktop && { lg: desktop }),
  };
}

// Usage
const responsivePadding = createResponsiveValue(8, 16, 24);
const responsiveFontSize = createResponsiveValue("14px", "16px", "18px");

<Box $padding={responsivePadding} $fontSize={responsiveFontSize}>
  Helper-created responsive values
</Box>;
```

## Performance & Optimization

### Built-in Optimizations

1. **Debounced ResizeObserver**: Measurements are debounced to 16ms (60fps) by default
2. **Memoized Computations**: Responsive value resolution and class generation are memoized
3. **Efficient CSS**: Uses Emotion for optimal CSS generation and caching
4. **Smart Re-renders**: Only re-renders when props or container width actually change

### Performance Best Practices

```tsx
// ✅ Good: Stable objects outside render
const cardStyles = {
  $padding: { xs: "m", md: "l" },
  $borderRadius: 8,
  $backgroundColor: "white",
};

function MyComponent() {
  return <Box {...cardStyles}>Content</Box>;
}

// ❌ Avoid: Creating objects in render
function MyComponent() {
  return (
    <Box
      $padding={{ xs: "m", md: "l" }} // New object every render
      $borderRadius={8}
      $backgroundColor="white"
    >
      Content
    </Box>
  );
}

// ✅ Good: Use useMemo for complex computed styles
function MyComponent({ theme, size }) {
  const dynamicStyles = React.useMemo(
    () => ({
      $backgroundColor: theme.primary,
      $padding: size === "large" ? "xl" : "m",
      $fontSize: {
        xs: size === "large" ? 16 : 14,
        md: size === "large" ? 20 : 16,
      },
    }),
    [theme.primary, size]
  );

  return <Box {...dynamicStyles}>Content</Box>;
}
```

### Custom Debounce Settings

```tsx
// Adjust debounce for different performance needs
const fastWidth = useContainerWidth(ref, { debounceMs: 8 }); // 120fps - very responsive
const normalWidth = useContainerWidth(ref, { debounceMs: 16 }); // 60fps - default
const slowWidth = useContainerWidth(ref, { debounceMs: 32 }); // 30fps - battery saving
```

### Tree-Shaking Optimization

The modular architecture enables excellent tree-shaking for optimal bundle sizes:

```tsx
// ✅ Excellent: Import only what you need
import { Box } from "@apvee/react-layout-kit/components/Box";
import { Flex } from "@apvee/react-layout-kit/components/Flex";
// Bundle includes: Box + Flex (~2-3KB gzipped)

// ✅ Good: Barrel import (modern bundlers handle this well)
import { Box, Flex } from "@apvee/react-layout-kit";
// Bundle includes: Box + Flex + small barrel overhead

// ❌ Avoid: Deep imports (older pattern)
import Box from "@apvee/react-layout-kit/Box";
// Less reliable tree-shaking with some bundlers
```

**Bundle Size Benefits:**
- **Granular imports**: Include only components you use (~1-2KB per component)
- **Automatic dead code elimination**: Unused components are completely excluded
- **Optimized dependencies**: Shared utilities are deduplicated across components
- **Framework-agnostic**: Works with Webpack, Vite, Rollup, and other modern bundlers

## Server-Side Rendering (SSR)

### SSR Compatibility

The library is fully SSR-compatible with automatic fallbacks:

- **Width measurement** is disabled on server-side
- **ResizeObserver** usage is properly guarded
- **No hydration mismatches** with responsive styles

### SSR Best Practices

```tsx
// For critical above-the-fold content, provide containerWidth
function HeroSection() {
  return (
    <Box
      containerWidth={1200} // Assume desktop width for SSR
      $padding={{ xs: "m", md: "l", lg: "xl" }}
      $fontSize={{ xs: 24, md: 32, lg: 40 }}
    >
      Critical hero content
    </Box>
  );
}

// For non-critical content, let it measure on client
function SidebarWidget() {
  return (
    <Box $padding={{ xs: "s", md: "m" }}>Non-critical sidebar content</Box>
  );
}
```

### Next.js Integration

```tsx
// pages/_app.tsx
import { configureBox } from "@apvee/react-layout-kit";

// Configure once globally
configureBox({
  breakpoints: {
    xs: 0,
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    "2xl": 1536,
  },
});

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
```

## Migration & Compatibility

### From Styled-Components

```tsx
// Before (styled-components)
const StyledBox = styled.div`
  display: flex;
  padding: ${(props) => props.theme.spacing.medium};

  @media (min-width: 768px) {
    padding: ${(props) => props.theme.spacing.large};
  }
`;

// After (@apvee/react-layout-kit)
<Box $display="flex" $padding={{ xs: "m", md: "l" }}>
  Content
</Box>;
```

### From Chakra UI

```tsx
// Before (Chakra UI)
<Box p={[4, 6, 8]} bg="blue.500" color="white">
  Content
</Box>

// After (@apvee/react-layout-kit)
<Box
  p={{ xs: 'm', md: 'l', lg: 'xl' }}
  $backgroundColor="blue"
  $color="white"
>
  Content
</Box>
```

### Browser Support

- **Modern browsers** with ResizeObserver support
- **React** ≥ 17.0.0
- **TypeScript** ≥ 4.0 (recommended for best experience)

## Development & Building

### Development Setup

```bash
# Clone and install
git clone <repository-url>
cd react-box
npm install

# Start Storybook for development
npm run storybook

# Build library
npm run build

# Type checking
npm run check
```

### Building Your Project

```bash
# Build production bundle
npm run build

# Build Storybook documentation
npm run build-storybook
```

## Complete Documentation

For comprehensive documentation including all features, advanced usage patterns, and implementation details, see [llm-full.txt](./llm-full.txt). This file contains the complete library reference and technical specifications designed to be used together with this README for AI code generation and development assistance.

## License

MIT License - see LICENSE file for details.

---

**@apvee/react-layout-kit** - Build responsive, type-safe React applications with confidence! 🚀
