# @apvee/react-layout-kit

> A type-safe, responsive React layout library built with TypeScript and Emotion CSS. Simplifies layout creation with component-based styling and container-aware responsive design.

![React Layout Kit](./assets/banner.png)

## Table of Contents

- [Introduction](#introduction)
- [Key Features](#key-features)
- [Installation](#installation)
- [Quick Start](#quick-start)
- [Core Concepts](#core-concepts)
  - [Responsive Values](#responsive-values)
  - [Container-Aware Design](#container-aware-design)
  - [Dollar Props & Short Props](#dollar-props--short-props)
- [API Reference](#api-reference)
  - [Components](#components)
  - [Hooks](#hooks)
  - [Utilities](#utilities)
  - [Configuration](#configuration)
  - [Type Definitions](#type-definitions)
- [Advanced Usage](#advanced-usage)
- [LLM Context (llm-full.txt)](#llm-context-llm-fulltxt)
- [Contributing](#contributing)
- [License](#license)

---

## Introduction

**@apvee/react-layout-kit** is an opinionated, type-safe React layout library that enables you to build responsive layouts without leaving the React component context. Built on TypeScript and Emotion CSS, it provides a comprehensive set of layout components with full CSS-in-JS capabilities, responsive prop support, and powerful composition patterns.

### Why @apvee/react-layout-kit?

- **🎯 Type Safety**: Full TypeScript support with IntelliSense for all CSS properties
- **📱 True Responsive Design**: JavaScript-driven responsive system that works with any container, not just viewport
- **🚀 Performance Optimized**: Emotion CSS runtime optimization, debounced ResizeObserver, memoized calculations
- **⚡ Zero Configuration**: No CSS setup required - styles are generated dynamically from props
- **🔧 Highly Configurable**: Customizable breakpoints and spacing scales with module augmentation
- **🎨 Developer Experience**: Intuitive API with both full CSS props and convenient shorthand properties
- **🔄 Composition Ready**: `asChild` prop for seamless component composition via Slot pattern
- **🌐 SSR Compatible**: Works perfectly with server-side rendering

---

## Key Features

### Layout Components
- **Box** - Foundation component with all CSS properties
- **Flex** / **Flex.Item** - Flexbox layouts with specialized controls
- **Grid** / **Grid.Col** - CSS Grid with responsive column management
- **Stack** - Vertical/horizontal stacking layouts
- **SimpleGrid** - Equal-width grid layouts
- **AreaGrid** / **AreaGrid.Item** - Named CSS Grid areas
- **Container** - Content wrapper with max-width
- **Center** - Flexbox centering utility
- **AspectRatio** - Maintains consistent aspect ratios
- **Group** - Horizontal grouping with overflow handling
- **Space** - Invisible spacing utility
- **ScrollArea** - Custom scrollable containers

### Composition System
- **Slot** - Component composition primitive for `asChild` pattern
- **Slottable** - Marker component for advanced slot scenarios
- **useSlot** - Hook for programmatic slot detection

---

## Installation

Install the package using npm or yarn:

```bash
npm install @apvee/react-layout-kit
```

```bash
yarn add @apvee/react-layout-kit
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

---

## Quick Start

### Basic Usage

```tsx
import * as React from 'react';
import { Box, Flex, Stack } from '@apvee/react-layout-kit';

function App() {
  return (
    <Box $padding={24} $margin="auto" $maxWidth={1200}>
      <Stack gap="lg">
        <Box asChild $fontSize={32} $fontWeight="bold">
          <h1>Welcome to React Layout Kit</h1>
        </Box>
        
        <Flex gap="md" align="center" justify="space-between">
          <Box $flex={1}>Content on the left</Box>
          <Box $flex={1}>Content on the right</Box>
        </Flex>
      </Stack>
    </Box>
  );
}
```

### Responsive Layout

```tsx
import { Box, Grid } from '@apvee/react-layout-kit';

function ResponsiveGrid() {
  return (
    <Grid 
      columns={{ xs: 1, sm: 2, md: 3, lg: 4 }}
      gutter={{ xs: "0.5rem", md: "1rem", lg: "1.5rem" }}
    >
      <Grid.Col span={{ xs: 1, md: 2 }}>
        <Box $padding="lg" $backgroundColor="#f0f0f0">
          Wide Item
        </Box>
      </Grid.Col>
      <Grid.Col>
        <Box $padding="lg" $backgroundColor="#e0e0e0">
          Regular Item
        </Box>
      </Grid.Col>
      <Grid.Col>
        <Box $padding="lg" $backgroundColor="#d0d0d0">
          Regular Item
        </Box>
      </Grid.Col>
    </Grid>
  );
}
```

---

## Core Concepts

### Responsive Values

Responsive values allow you to specify different values for different screen sizes using breakpoint objects. This is container-aware, meaning it responds to the actual container size, not just the viewport.

```tsx
<Box
  $padding={{
    xs: 8,   // 0px and up
    sm: 12,  // 480px and up
    md: 16,  // 640px and up
    lg: 24,  // 1024px and up
    xl: 32,  // 1366px and up
  }}
  $fontSize={{ xs: 14, md: 16, lg: 18 }}
  $backgroundColor={{ xs: "lightblue", md: "lightgreen" }}
>
  Container-aware responsive content
</Box>
```

### Container-Aware Design

Unlike CSS media queries that respond to viewport size, responsive values respond to the actual container width. This enables true component-level responsive design.

```tsx
import { Box, useContainerWidth } from '@apvee/react-layout-kit';

function ResponsiveCard() {
  const cardRef = React.useRef<HTMLDivElement>(null);
  const width = useContainerWidth(cardRef);

  return (
    <Box
      ref={cardRef}
      containerWidth={width}
      $padding={{ xs: 8, md: 16, lg: 24 }}
      $display={{ xs: "block", md: "flex" }}
    >
      Width: {width}px - Layout adapts to container size
    </Box>
  );
}
```

### Dollar Props & Short Props

The library provides two ways to specify styling:

**Dollar Props**: Full CSS properties with `$` prefix
```tsx
<Box
  $display="flex"
  $flexDirection="column"
  $padding="16px"
  $margin="8px"
  $backgroundColor="#f0f0f0"
  $borderRadius="8px"
/>
```

**Short Props**: Convenient shorthand properties
```tsx
<Box
  m="md"     // margin
  p="lg"     // padding
  w="100%"   // width
  h="200px"  // height
  mt="sm"    // margin-top
  px="xl"    // padding-inline (left + right)
/>
```

When both are used, dollar props take precedence:
```tsx
<Box
  p="lg"           // padding: 16px (from spacing scale)
  $padding="24px"  // Wins! Final padding: 24px
/>
```

---

## API Reference

### Components

#### Box

The foundation component that all other layout components are built upon. Provides full CSS-in-JS capabilities with responsive support.

**Type**: `React.ForwardRefExoticComponent<BoxProps & React.RefAttributes<HTMLDivElement>>`

**Props**:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `asChild` | `boolean` | `false` | Render as child element using Slot pattern |
| `containerWidth` | `number` | `undefined` | Fixed container width for responsive calculations |
| `styleReset` | `boolean` | `false` | Apply basic style reset (box-sizing: border-box) |
| `className` | `string` | `undefined` | Additional CSS class names |
| `children` | `React.ReactNode` | `undefined` | Child elements |

Additionally accepts all HTML div attributes and CSS properties with `$` prefix.

**Short Props**:

Margin: `m`, `mt`, `mr`, `mb`, `ml`, `ms`, `me`, `mx`, `my`  
Padding: `p`, `pt`, `pr`, `pb`, `pl`, `ps`, `pe`, `px`, `py`  
Size: `w`, `h`, `miw`, `maw`, `mih`, `mah`  
Position: `top`, `left`, `bottom`, `right`

**Example**:

```tsx
import { Box } from '@apvee/react-layout-kit';

// Basic usage with dollar props
function BasicBox() {
  return (
    <Box $display="flex" $padding="16px" $margin="8px">
      Content
    </Box>
  );
}

// Using short-hand props
function ShortPropsBox() {
  return (
    <Box m="md" p="lg" w="100%">
      Content with spacing scale
    </Box>
  );
}

// Responsive values
function ResponsiveBox() {
  return (
    <Box 
      $display={{ xs: "block", md: "flex" }}
      p={{ xs: "sm", md: "md", lg: "lg" }}
    >
      Responsive layout
    </Box>
  );
}

// Polymorphic with asChild
function PolymorphicBox() {
  return (
    <Box asChild $padding="md" $backgroundColor="blue">
      <button>Renders as button with Box styles</button>
    </Box>
  );
}
```

---

#### Flex

A flexbox container component with comprehensive flex control and a specialized `Flex.Item` sub-component.

**Type**: `React.ForwardRefExoticComponent<FlexProps & React.RefAttributes<HTMLDivElement>>`

**Props**:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `align` | `ResponsiveValue<AlignItems>` | `undefined` | Cross-axis alignment (align-items) |
| `justify` | `ResponsiveValue<JustifyContent>` | `undefined` | Main-axis alignment (justify-content) |
| `direction` | `ResponsiveValue<FlexDirection>` | `undefined` | Flex direction |
| `wrap` | `ResponsiveValue<FlexWrap>` | `undefined` | Flex wrap behavior |
| `gap` | `ResponsiveValue<SpacingValue>` | `undefined` | Gap between all elements |
| `rowGap` | `ResponsiveValue<SpacingValue>` | `undefined` | Gap between rows |
| `columnGap` | `ResponsiveValue<SpacingValue>` | `undefined` | Gap between columns |

All Box props are also available.

**Flex.Item Props**:

| Prop | Type | Description |
|------|------|-------------|
| `flex` | `ResponsiveValue<Flex>` | Flex shorthand |
| `grow` | `ResponsiveValue<FlexGrow>` | Ability to grow |
| `shrink` | `ResponsiveValue<FlexShrink>` | Ability to shrink |
| `basis` | `ResponsiveValue<FlexBasis>` | Base size |
| `alignSelf` | `ResponsiveValue<AlignSelf>` | Individual alignment |
| `order` | `ResponsiveValue<Order>` | Visual order |

**Example**:

```tsx
import { Flex } from '@apvee/react-layout-kit';

// Basic flex container
function BasicFlex() {
  return (
    <Flex align="center" justify="space-between" gap="md">
      <div>Item 1</div>
      <div>Item 2</div>
      <div>Item 3</div>
    </Flex>
  );
}

// Responsive direction
function ResponsiveFlex() {
  return (
    <Flex
      direction={{ xs: "column", md: "row" }}
      align={{ xs: "stretch", md: "center" }}
      gap={{ xs: "sm", md: "lg" }}
    >
      <div>Responsive Item 1</div>
      <div>Responsive Item 2</div>
    </Flex>
  );
}

// Advanced flex items
function FlexWithItems() {
  return (
    <Flex gap="md">
      <Flex.Item flex={1}>Grows to fill space</Flex.Item>
      <Flex.Item shrink={0} basis="200px">Fixed 200px width</Flex.Item>
      <Flex.Item grow={2} alignSelf="flex-end">
        Grows 2x, aligns to end
      </Flex.Item>
    </Flex>
  );
}
```

---

#### Grid

A CSS Grid layout component with flexible column management and a `Grid.Col` sub-component for individual items.

**Type**: `React.ForwardRefExoticComponent<GridProps & React.RefAttributes<HTMLDivElement>>`

**Props**:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `columns` | `ResponsiveValue<number>` | `12` | Number of columns |
| `gutter` | `ResponsiveValue<string \| number>` | `"1rem"` | Gap between columns |
| `align` | `ResponsiveValue<AlignItems>` | `"stretch"` | Vertical alignment |
| `justify` | `ResponsiveValue<JustifyContent>` | `"flex-start"` | Horizontal alignment |
| `grow` | `ResponsiveValue<boolean>` | `false` | Columns expand to fill space |
| `overflow` | `ResponsiveValue<Overflow>` | `"visible"` | Overflow behavior |

**Grid.Col Props**:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `span` | `ResponsiveValue<number>` | `12` | Number of columns to span |
| `offset` | `ResponsiveValue<number>` | `undefined` | Column offset |
| `order` | `ResponsiveValue<Order>` | `undefined` | Visual order |

**Example**:

```tsx
import { Grid } from '@apvee/react-layout-kit';

// Basic grid
function BasicGrid() {
  return (
    <Grid columns={3} gutter="1rem">
      <Grid.Col span={1}>Column 1</Grid.Col>
      <Grid.Col span={1}>Column 2</Grid.Col>
      <Grid.Col span={1}>Column 3</Grid.Col>
    </Grid>
  );
}

// Responsive grid
function ResponsiveGrid() {
  return (
    <Grid 
      columns={{ xs: 1, md: 2, lg: 3 }}
      gutter={{ xs: "0.5rem", md: "1rem" }}
    >
      <Grid.Col span={{ xs: 1, md: 2 }}>Wide Item</Grid.Col>
      <Grid.Col>Regular Item</Grid.Col>
      <Grid.Col>Regular Item</Grid.Col>
    </Grid>
  );
}
```

---

#### Stack

A component for vertical stacking layouts with consistent spacing.

**Type**: `React.ForwardRefExoticComponent<StackProps & React.RefAttributes<HTMLDivElement>>`

**Props**:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `align` | `ResponsiveValue<AlignItems>` | `"stretch"` | Horizontal alignment |
| `justify` | `ResponsiveValue<JustifyContent>` | `"flex-start"` | Vertical alignment |
| `gap` | `ResponsiveValue<SpacingValue>` | `undefined` | Space between items |

**Example**:

```tsx
import { Stack } from '@apvee/react-layout-kit';

// Basic vertical stack
function BasicStack() {
  return (
    <Stack gap="md">
      <div>Item 1</div>
      <div>Item 2</div>
      <div>Item 3</div>
    </Stack>
  );
}

// Form layout
function FormStack() {
  return (
    <Stack gap="md" align="stretch">
      <input type="text" placeholder="Name" />
      <input type="email" placeholder="Email" />
      <textarea placeholder="Message" />
      <button>Submit</button>
    </Stack>
  );
}

// Responsive stack
function ResponsiveStack() {
  return (
    <Stack 
      gap={{ xs: "sm", md: "md", lg: "lg" }}
      align={{ xs: "center", md: "stretch" }}
    >
      <div>Responsive Item 1</div>
      <div>Responsive Item 2</div>
    </Stack>
  );
}
```

---

#### SimpleGrid

A responsive grid component where each item takes equal amount of space.

**Type**: `React.ForwardRefExoticComponent<SimpleGridProps & React.RefAttributes<HTMLDivElement>>`

**Props**:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `cols` | `ResponsiveValue<number>` | `1` | Number of columns |
| `spacing` | `ResponsiveValue<SpacingValue>` | `undefined` | Gap between columns |
| `verticalSpacing` | `ResponsiveValue<SpacingValue>` | `undefined` | Gap between rows |

**Example**:

```tsx
import { SimpleGrid } from '@apvee/react-layout-kit';

// Basic equal-width grid
function BasicSimpleGrid() {
  return (
    <SimpleGrid cols={3} spacing="md">
      <div>Card 1</div>
      <div>Card 2</div>
      <div>Card 3</div>
    </SimpleGrid>
  );
}

// Responsive columns
function ResponsiveSimpleGrid() {
  return (
    <SimpleGrid
      cols={{ xs: 1, sm: 2, md: 3, lg: 4 }}
      spacing={{ xs: "sm", md: "lg" }}
    >
      <div>Responsive Card 1</div>
      <div>Responsive Card 2</div>
      <div>Responsive Card 3</div>
      <div>Responsive Card 4</div>
    </SimpleGrid>
  );
}
```

---

#### AreaGrid

A CSS Grid component using named grid areas for semantic layouts.

**Type**: `React.ForwardRefExoticComponent<AreaGridProps & React.RefAttributes<HTMLDivElement>>`

**Props**:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `areas` | `ResponsiveValue<string>` | `undefined` | Grid-template-areas definition |
| `rows` | `ResponsiveValue<string>` | `undefined` | Grid-template-rows sizing |
| `columns` | `ResponsiveValue<string>` | `undefined` | Grid-template-columns sizing |
| `gap` | `ResponsiveValue<SpacingValue>` | `0` | Gap between items |
| `justifyItems` | `ResponsiveValue<JustifyItems>` | `"stretch"` | Horizontal alignment of items |
| `alignItems` | `ResponsiveValue<AlignItems>` | `"stretch"` | Vertical alignment of items |
| `justifyContent` | `ResponsiveValue<JustifyContent>` | `"stretch"` | Horizontal distribution |
| `alignContent` | `ResponsiveValue<AlignContent>` | `"stretch"` | Vertical distribution |

**AreaGrid.Item Props**:

| Prop | Type | Description |
|------|------|-------------|
| `area` | `ResponsiveValue<string>` | Grid area assignment |
| `justifySelf` | `ResponsiveValue<JustifySelf>` | Individual horizontal alignment |
| `alignSelf` | `ResponsiveValue<AlignSelf>` | Individual vertical alignment |

**Example**:

```tsx
import { AreaGrid } from '@apvee/react-layout-kit';

// Basic page layout
function PageLayout() {
  return (
    <AreaGrid
      areas='"header header" "sidebar main" "footer footer"'
      rows="auto 1fr auto"
      columns="200px 1fr"
      gap="md"
    >
      <AreaGrid.Item area="header">Header</AreaGrid.Item>
      <AreaGrid.Item area="sidebar">Sidebar</AreaGrid.Item>
      <AreaGrid.Item area="main">Main</AreaGrid.Item>
      <AreaGrid.Item area="footer">Footer</AreaGrid.Item>
    </AreaGrid>
  );
}

// Responsive restructuring
function ResponsiveAreaGrid() {
  return (
    <AreaGrid
      areas={{
        xs: '"header" "main" "sidebar" "footer"',
        md: '"header header" "sidebar main" "footer footer"'
      }}
      rows={{ xs: "auto auto auto auto", md: "auto 1fr auto" }}
      columns={{ xs: "1fr", md: "200px 1fr" }}
      gap={{ xs: "sm", md: "md" }}
    >
      <AreaGrid.Item area="header">Header</AreaGrid.Item>
      <AreaGrid.Item area="sidebar">Sidebar</AreaGrid.Item>
      <AreaGrid.Item area="main">Main</AreaGrid.Item>
      <AreaGrid.Item area="footer">Footer</AreaGrid.Item>
    </AreaGrid>
  );
}
```

---

#### Container

A component that centers content horizontally and controls maximum width.

**Type**: `React.ForwardRefExoticComponent<ContainerProps & React.RefAttributes<HTMLDivElement>>`

**Props**:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `ResponsiveValue<number>` | `1200` | Maximum width in pixels |
| `fluid` | `ResponsiveValue<boolean>` | `false` | Full width mode |

**Example**:

```tsx
import { Container } from '@apvee/react-layout-kit';

// Default container
function DefaultContainer() {
  return (
    <Container>
      <h1>Centered Content</h1>
      <p>Max width 1200px</p>
    </Container>
  );
}

// Custom size
function CustomContainer() {
  return (
    <Container size={800}>
      <div>Narrower content area</div>
    </Container>
  );
}

// Fluid container
function FluidContainer() {
  return (
    <Container fluid>
      <div>Full width content</div>
    </Container>
  );
}

// Responsive size
function ResponsiveContainer() {
  return (
    <Container 
      size={{ xs: 320, sm: 480, md: 640, lg: 1024 }}
    >
      <div>Responsive container</div>
    </Container>
  );
}
```

---

#### Center

A component that centers content both vertically and horizontally using flexbox.

**Type**: `React.ForwardRefExoticComponent<CenterProps & React.RefAttributes<HTMLDivElement>>`

**Props**:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `inline` | `ResponsiveValue<boolean>` | `false` | Use inline-flex instead of flex |

**Example**:

```tsx
import { Center } from '@apvee/react-layout-kit';

// Basic centering
function BasicCenter() {
  return (
    <Center $height="200px">
      <button>Perfectly Centered Button</button>
    </Center>
  );
}

// Inline centering
function InlineCenter() {
  return (
    <Center inline>
      <span>Inline centered text</span>
    </Center>
  );
}

// Responsive inline
function ResponsiveCenter() {
  return (
    <Center inline={{ xs: true, md: false }}>
      <div>Inline on mobile, block on desktop</div>
    </Center>
  );
}
```

---

#### AspectRatio

A component that maintains a constant aspect ratio between width and height.

**Type**: `React.ForwardRefExoticComponent<AspectRatioProps & React.RefAttributes<HTMLDivElement>>`

**Props**:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `ratio` | `ResponsiveValue<number>` | `1` | Aspect ratio as width/height |

**Example**:

```tsx
import { AspectRatio } from '@apvee/react-layout-kit';

// 16:9 video aspect ratio
function VideoAspect() {
  return (
    <AspectRatio ratio={16 / 9}>
      <iframe 
        src="video-url" 
        style={{ width: '100%', height: '100%' }} 
      />
    </AspectRatio>
  );
}

// Square aspect ratio
function SquareAspect() {
  return (
    <AspectRatio ratio={1}>
      <img 
        src="profile.jpg" 
        style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
      />
    </AspectRatio>
  );
}

// Responsive aspect ratio
function ResponsiveAspect() {
  return (
    <AspectRatio ratio={{ xs: 1, md: 16 / 9 }}>
      <video controls style={{ width: '100%', height: '100%' }} />
    </AspectRatio>
  );
}
```

---

#### Group

A component for horizontal flex layouts with advanced overflow handling.

**Type**: `React.ForwardRefExoticComponent<GroupProps & React.RefAttributes<HTMLDivElement>>`

**Props**:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `align` | `ResponsiveValue<AlignItems>` | `"center"` | Cross-axis alignment |
| `gap` | `ResponsiveValue<SpacingValue>` | `undefined` | Gap between items |
| `grow` | `ResponsiveValue<boolean>` | `false` | Whether children should grow |
| `justify` | `ResponsiveValue<JustifyContent>` | `"flex-start"` | Main-axis alignment |
| `preventGrowOverflow` | `ResponsiveValue<boolean>` | `true` | Prevent overflow with grow |
| `wrap` | `ResponsiveValue<FlexWrap>` | `"wrap"` | Wrapping behavior |

**Example**:

```tsx
import { Group } from '@apvee/react-layout-kit';

// Button group
function ButtonGroup() {
  return (
    <Group gap="sm" wrap="nowrap">
      <button>Save</button>
      <button>Cancel</button>
      <button>Delete</button>
    </Group>
  );
}

// Growing children
function GrowingGroup() {
  return (
    <Group grow>
      <button>Equal width</button>
      <button>Equal width</button>
      <button>Equal width</button>
    </Group>
  );
}

// Responsive toolbar
function ResponsiveGroup() {
  return (
    <Group
      gap={{ xs: "xs", md: "sm" }}
      justify={{ xs: "center", md: "flex-start" }}
      wrap={{ xs: "wrap", md: "nowrap" }}
    >
      <button>Action 1</button>
      <button>Action 2</button>
      <button>Action 3</button>
    </Group>
  );
}
```

---

#### Space

An invisible spacing component for creating consistent whitespace.

**Type**: `React.ForwardRefExoticComponent<SpaceProps & React.RefAttributes<HTMLDivElement>>`

**Props**:

| Prop | Type | Description |
|------|------|-------------|
| `w` | `ResponsiveValue<SpacingValue>` | Horizontal spacing (width) |
| `h` | `ResponsiveValue<SpacingValue>` | Vertical spacing (height) |

**Example**:

```tsx
import { Space } from '@apvee/react-layout-kit';

// Vertical section spacing
function VerticalSpacing() {
  return (
    <div>
      <h1>Section 1</h1>
      <Space h="xl" />
      <h2>Section 2</h2>
      <Space h="lg" />
      <p>Content with consistent spacing</p>
    </div>
  );
}

// Horizontal spacing
function HorizontalSpacing() {
  return (
    <div style={{ display: 'flex' }}>
      <div>Left Content</div>
      <Space w="lg" />
      <div>Right Content</div>
    </div>
  );
}

// Responsive spacing
function ResponsiveSpacing() {
  return (
    <div>
      <div>Content Block 1</div>
      <Space h={{ xs: "md", md: "xl" }} />
      <div>Content Block 2</div>
    </div>
  );
}
```

---

#### ScrollArea

A flexible scroll area component with custom scrollbars and native scrolling behavior.

**Type**: `React.ForwardRefExoticComponent<ScrollAreaProps & React.RefAttributes<HTMLDivElement>>`

**Props**:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `asChild` | `boolean` | `false` | Render as child element |
| `size` | `ResponsiveValue<'small' \| 'medium' \| 'large'>` | `'small'` | Scrollbar thickness |
| `radius` | `'none' \| 'small' \| 'medium' \| 'large' \| 'full'` | `'small'` | Border radius |
| `scrollbars` | `'vertical' \| 'horizontal' \| 'both'` | `'both'` | Which scrollbars to show |
| `type` | `'hover' \| 'always' \| 'scroll'` | `'hover'` | Visibility behavior |
| `scrollHideDelay` | `number` | `600` | Hide delay in milliseconds |
| `dir` | `'ltr' \| 'rtl'` | `'ltr'` | Text direction |
| `trackColor` | `string` | default | Scrollbar track background |
| `thumbColor` | `string` | default | Scrollbar thumb color |
| `thumbHoverColor` | `string` | default | Thumb color on hover |
| `thumbActiveColor` | `string` | default | Thumb color when pressed |

**Example**:

```tsx
import { ScrollArea } from '@apvee/react-layout-kit';

// Basic usage
function BasicScrollArea() {
  return (
    <ScrollArea style={{ height: 300, width: 400 }}>
      <div style={{ height: 1000 }}>
        Very long content that will scroll...
      </div>
    </ScrollArea>
  );
}

// Responsive size
function ResponsiveScrollArea() {
  return (
    <ScrollArea 
      size={{ xs: 'small', md: 'medium', lg: 'large' }}
      type="always"
    >
      <div style={{ height: 500 }}>
        Content with responsive scrollbars
      </div>
    </ScrollArea>
  );
}

// Custom colors
function CustomScrollArea() {
  return (
    <ScrollArea
      thumbColor="rgba(0, 123, 255, 0.5)"
      thumbHoverColor="rgba(0, 123, 255, 0.8)"
      trackColor="rgba(0, 0, 0, 0.1)"
      radius="large"
      type="hover"
    >
      <div style={{ height: 400 }}>
        Styled scrollable content
      </div>
    </ScrollArea>
  );
}

// Horizontal-only scrolling
function HorizontalScrollArea() {
  return (
    <ScrollArea scrollbars="horizontal" style={{ width: 300 }}>
      <div style={{ width: 800, whiteSpace: 'nowrap' }}>
        Wide content that scrolls horizontally...
      </div>
    </ScrollArea>
  );
}
```

---

#### Slot

A component composition primitive that enables the `asChild` pattern by merging props with its direct child.

**Type**: `React.ForwardRefExoticComponent<SlotProps & React.RefAttributes<HTMLElement>>`

**Props**:

| Prop | Type | Description |
|------|------|-------------|
| `children` | `React.ReactNode` | Single React element to receive props |

**Example**:

```tsx
import { Slot } from '@apvee/react-layout-kit';

// Basic usage
function SlotExample() {
  return (
    <Slot onClick={() => alert('Clicked!')} className="custom-class">
      <button className="btn">Click me</button>
    </Slot>
  );
  // Result: <button onClick={...} className="custom-class btn">Click me</button>
}

// Event handlers are composed
function ComposedHandlers() {
  const handleParent = () => console.log('Parent');
  const handleChild = () => console.log('Child');
  
  return (
    <Slot onClick={handleParent}>
      <button onClick={handleChild}>Both handlers fire</button>
    </Slot>
  );
}

// className and style are merged
function MergedProps() {
  return (
    <Slot 
      className="parent-class" 
      style={{ color: 'red' }}
    >
      <div 
        className="child-class" 
        style={{ fontSize: '16px' }}
      >
        Merged styles
      </div>
    </Slot>
  );
}
```

---

#### Slottable

A marker component for explicitly marking elements that should receive slot props.

**Type**: `React.FunctionComponent<SlottableProps>`

**Props**:

| Prop | Type | Description |
|------|------|-------------|
| `children` | `React.ReactNode` | Content to mark as slottable |

**Example**:

```tsx
import { Slot, Slottable } from '@apvee/react-layout-kit';

// Mark specific child to receive props
function SlottableExample() {
  return (
    <Slot className="slot-class">
      <button>
        <span>Icon</span>
        <Slottable>
          <span className="text">Text receives slot props</span>
        </Slottable>
      </button>
    </Slot>
  );
}
```

---

### Hooks

#### useContainerWidth

A hook that measures container width using ResizeObserver with debounced updates.

**Type**: `(elementRef: React.RefObject<T>, options?: UseContainerWidthOptions) => number`

**Parameters**:

| Parameter | Type | Description |
|-----------|------|-------------|
| `elementRef` | `React.RefObject<T>` | Ref to the element to measure |
| `options.disabled` | `boolean` | Whether to disable measurement (default: false) |
| `options.debounceMs` | `number` | Debounce delay in milliseconds (default: 16ms for 60fps) |

**Returns**: Current width of the element in pixels, or 0 if not available.

**Example**:

```tsx
import * as React from 'react';
import { Box, useContainerWidth } from '@apvee/react-layout-kit';

function ResponsiveCard() {
  const ref = React.useRef<HTMLDivElement>(null);
  const width = useContainerWidth(ref, { debounceMs: 32 }); // 30fps
  
  return (
    <Box
      ref={ref}
      $padding={{ xs: 8, md: 16 }}
      containerWidth={width}
    >
      Container width: {width}px
    </Box>
  );
}
```

---

#### useElementWidth

The core implementation hook for measuring element width. This is functionally identical to `useContainerWidth` but with a more generic name.

**Type**: `(elementRef: React.RefObject<T>, options?: UseElementWidthOptions) => number`

**Parameters**: Same as `useContainerWidth`

**Returns**: Current width of the element in pixels, or 0 if not measurable.

**Example**:

```tsx
import * as React from 'react';
import { useElementWidth } from '@apvee/react-layout-kit';

function MeasuredElement() {
  const ref = React.useRef<HTMLDivElement>(null);
  const width = useElementWidth(ref);
  
  return (
    <div ref={ref}>
      Element width: {width}px
    </div>
  );
}
```

---

#### useSlot

A hook for working with Slot components in a declarative way.

**Type**: `(element: React.ReactElement | null) => UseSlotReturn`

**Parameters**:

| Parameter | Type | Description |
|-----------|------|-------------|
| `element` | `React.ReactElement \| null` | React element to check if it's a Slot |

**Returns**:

| Property | Type | Description |
|----------|------|-------------|
| `ref` | `React.RefCallback<HTMLElement>` | Ref callback for slot detection |
| `slotRef` | `HTMLElement \| null` | Current slot DOM node reference |
| `isSlot` | `boolean` | Whether element is a Slot component |

**Example**:

```tsx
import * as React from 'react';
import { useSlot, Slot } from '@apvee/react-layout-kit';

function CustomComponent({ children }: { children: React.ReactElement }) {
  const { ref, slotRef, isSlot } = useSlot(children);
  
  React.useEffect(() => {
    if (slotRef && isSlot) {
      console.log('Rendering as Slot:', slotRef);
    }
  }, [slotRef, isSlot]);
  
  return <div ref={ref}>{children}</div>;
}
```

---

#### useMergedRef

A hook for combining multiple refs into a single ref callback. Re-exported from `@react-hook/merged-ref`.

**Type**: `<T>(...refs: Array<React.Ref<T> | undefined>) => React.RefCallback<T>`

**Parameters**:

| Parameter | Type | Description |
|-----------|------|-------------|
| `...refs` | `Array<React.Ref<T> \| undefined>` | Multiple refs to merge |

**Returns**: A single ref callback that updates all provided refs.

**Example**:

```tsx
import * as React from 'react';
import useMergedRef from '@apvee/react-layout-kit';

function MergedRefExample() {
  const localRef = React.useRef<HTMLDivElement>(null);
  const forwardedRef = React.useRef<HTMLDivElement>(null);
  
  const mergedRef = useMergedRef(localRef, forwardedRef);
  
  return <div ref={mergedRef}>Element with merged refs</div>;
}
```

---

### Utilities

#### resolveResponsiveValue

Resolves a responsive value based on current container width and breakpoints.

**Type**: `<T>(value: ResponsiveValue<T>, width: number, breakpoints: Breakpoints) => T | undefined`

**Parameters**:

| Parameter | Type | Description |
|-----------|------|-------------|
| `value` | `ResponsiveValue<T>` | The responsive value to resolve |
| `width` | `number` | Current container width in pixels |
| `breakpoints` | `Breakpoints` | Breakpoint configuration |

**Returns**: Resolved value for the current width, or undefined.

**Example**:

```tsx
import { resolveResponsiveValue, getBreakpoints } from '@apvee/react-layout-kit';

function ResolveExample() {
  const value = { xs: 8, md: 16, lg: 24 };
  const breakpoints = getBreakpoints();
  const resolved = resolveResponsiveValue(value, 800, breakpoints);
  
  console.log(resolved); // 16 (md breakpoint at 640px)
  
  return null;
}
```

---

#### resolveSpacing

Resolves a spacing value to its final CSS value using the spacing scale configuration.

**Type**: `(value: SpacingValue) => string | number`

**Parameters**:

| Parameter | Type | Description |
|-----------|------|-------------|
| `value` | `SpacingValue` | Spacing value to resolve |

**Returns**: Resolved CSS value (string or number).

**Example**:

```tsx
import { resolveSpacing } from '@apvee/react-layout-kit';

// Spacing scale keys
console.log(resolveSpacing('md'));      // 12 (from spacing scale)
console.log(resolveSpacing('lg'));      // 16

// Numbers are returned as-is
console.log(resolveSpacing(24));        // 24

// CSS strings are passed through
console.log(resolveSpacing('10px'));    // '10px'
console.log(resolveSpacing('1.5rem')); // '1.5rem'
```

---

#### createStyles

Creates CSS classes from style objects using Emotion's `css` function. Re-exported from Emotion CSS.

**Type**: `(styles: CSSObject | TemplateStringsArray) => string`

**Parameters**:

| Parameter | Type | Description |
|-----------|------|-------------|
| `styles` | `CSSObject \| TemplateStringsArray` | CSS style object or template literal |

**Returns**: Generated CSS class name.

**Example**:

```tsx
import { createStyles, Box } from '@apvee/react-layout-kit';

// Create reusable styles
const buttonStyles = createStyles({
  padding: '12px 24px',
  backgroundColor: '#007bff',
  color: 'white',
  borderRadius: '4px',
  '&:hover': {
    backgroundColor: '#0056b3'
  }
});

function StyledButton() {
  return (
    <Box asChild className={buttonStyles}>
      <button>Custom Styled Button</button>
    </Box>
  );
}
```

---

#### mergeClasses

Merges multiple class names into a single string, filtering out falsy values. Re-exported from Emotion CSS.

**Type**: `(...classNames: Array<string | undefined | null | false>) => string`

**Parameters**:

| Parameter | Type | Description |
|-----------|------|-------------|
| `...classNames` | `Array<string \| undefined \| null \| false>` | Class names to merge |

**Returns**: Single merged class name string.

**Example**:

```tsx
import { mergeClasses, createStyles } from '@apvee/react-layout-kit';

const baseClass = 'base-styles';
const activeClass = createStyles({ color: 'blue' });

function MergedClassesExample({ isActive }: { isActive: boolean }) {
  const className = mergeClasses(
    baseClass,
    isActive && activeClass,
    'additional-class'
  );
  
  return <div className={className}>Merged classes</div>;
}
```

---

### Configuration

#### configureBox

Configures global settings for the Box component system, including breakpoints and spacing scales.

**Type**: `(config: BoxConfig) => void`

**Parameters**:

| Parameter | Type | Description |
|-----------|------|-------------|
| `config.breakpoints` | `Partial<Breakpoints>` | Partial breakpoints to merge with defaults |
| `config.spacing` | `Partial<Spacing>` | Partial spacing scale to merge with defaults |

**Example**:

```tsx
import { configureBox } from '@apvee/react-layout-kit';

// Configure custom breakpoints and spacing
configureBox({
  breakpoints: {
    xs: 0,
    sm: 480,
    md: 768,
    tablet: 900,
    lg: 1024,
    xl: 1280,
    '2xl': 1440
  },
  spacing: {
    none: 0,
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    xxl: 24,
    xxxl: 32
  }
});
```

**TypeScript Module Augmentation**:

To get full TypeScript support for custom breakpoints and spacing:

```typescript
// types/react-layout-kit.d.ts
import '@apvee/react-layout-kit';

declare module '@apvee/react-layout-kit' {
  interface BreakpointDefs {
    tablet: number;
    '2xl': number;
  }
  
  interface SpacingDefs {
    xxs: string | number;
    '4xl': string | number;
  }
}
```

---

#### resetBoxConfig

Resets both breakpoints and spacing to their default values.

**Type**: `() => void`

**Example**:

```tsx
import { resetBoxConfig } from '@apvee/react-layout-kit';

// Reset to defaults
resetBoxConfig();
```

---

#### getBreakpoints

Gets the current breakpoints configuration.

**Type**: `() => Breakpoints`

**Returns**: Current breakpoints object.

**Example**:

```tsx
import { getBreakpoints } from '@apvee/react-layout-kit';

const breakpoints = getBreakpoints();
console.log(breakpoints);
// { xs: 0, sm: 480, md: 640, lg: 1024, xl: 1366, xxl: 1920 }
```

---

#### getSpacing

Gets the current spacing scale configuration.

**Type**: `() => Spacing`

**Returns**: Current spacing object.

**Example**:

```tsx
import { getSpacing } from '@apvee/react-layout-kit';

const spacing = getSpacing();
console.log(spacing);
// { none: 0, xs: 4, sm: 8, md: 12, lg: 16, xl: 20, xxl: 24, xxxl: 32 }
```

---

### Type Definitions

#### ResponsiveValue<T>

A type representing a value that can be either a single value or an object mapping breakpoints to values.

```typescript
type ResponsiveValue<T> = T | Partial<Record<BreakpointKey, T>>;
```

**Example**:

```typescript
import type { ResponsiveValue } from '@apvee/react-layout-kit';

// Single value
const padding: ResponsiveValue<number> = 16;

// Responsive object
const responsivePadding: ResponsiveValue<number> = {
  xs: 8,
  md: 16,
  lg: 24
};
```

---

#### BreakpointDefs

An interface defining the breakpoint keys and their values. Can be augmented for custom breakpoints.

```typescript
interface BreakpointDefs {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  xxl: number;
}
```

---

#### SpacingDefs

An interface defining the spacing scale keys and their values. Can be augmented for custom spacing.

```typescript
interface SpacingDefs {
  none: string | number;
  xs: string | number;
  sm: string | number;
  md: string | number;
  lg: string | number;
  xl: string | number;
  xxl: string | number;
  xxxl: string | number;
}
```

---

#### BoxProps

The complete props interface for the Box component, including all CSS properties with `$` prefix and short props.

```typescript
type BoxProps = BaseBoxProps & DollarCssProps;
```

---

#### DollarCssProps

Type representing all CSS properties with `$` prefix and support for responsive values.

```typescript
type DollarCssProps = {
  [K in keyof CSSProperties as `$${K}`]?: ResponsiveValue<CSSProperties[K]>;
};
```

---

#### IShortStyleBoxProps

Interface defining all short-hand styling props (m, p, w, h, etc.).

```typescript
interface IShortStyleBoxProps {
  // Margin
  m?: ResponsiveValue<SpacingValue>;
  mt?: ResponsiveValue<SpacingValue>;
  mr?: ResponsiveValue<SpacingValue>;
  mb?: ResponsiveValue<SpacingValue>;
  ml?: ResponsiveValue<SpacingValue>;
  ms?: ResponsiveValue<SpacingValue>;
  me?: ResponsiveValue<SpacingValue>;
  mx?: ResponsiveValue<SpacingValue>;
  my?: ResponsiveValue<SpacingValue>;
  
  // Padding
  p?: ResponsiveValue<SpacingValue>;
  pt?: ResponsiveValue<SpacingValue>;
  pr?: ResponsiveValue<SpacingValue>;
  pb?: ResponsiveValue<SpacingValue>;
  pl?: ResponsiveValue<SpacingValue>;
  ps?: ResponsiveValue<SpacingValue>;
  pe?: ResponsiveValue<SpacingValue>;
  px?: ResponsiveValue<SpacingValue>;
  py?: ResponsiveValue<SpacingValue>;
  
  // Size
  w?: ResponsiveValue<Width>;
  h?: ResponsiveValue<Height>;
  miw?: ResponsiveValue<MinWidth>;
  maw?: ResponsiveValue<MaxWidth>;
  mih?: ResponsiveValue<MinHeight>;
  mah?: ResponsiveValue<MaxHeight>;
  
  // Position
  top?: ResponsiveValue<Top>;
  left?: ResponsiveValue<Left>;
  bottom?: ResponsiveValue<Bottom>;
  right?: ResponsiveValue<Right>;
}
```

---

## Advanced Usage

### Custom Component with Responsive Behavior

```tsx
import * as React from 'react';
import { Box, useContainerWidth, resolveResponsiveValue, getBreakpoints } from '@apvee/react-layout-kit';
import type { BoxProps, ResponsiveValue } from '@apvee/react-layout-kit';

interface CustomCardProps extends BoxProps {
  variant?: ResponsiveValue<'primary' | 'secondary' | 'danger'>;
  elevation?: ResponsiveValue<'low' | 'medium' | 'high'>;
}

function CustomCard({ variant = 'primary', elevation = 'medium', children, ...props }: CustomCardProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const width = useContainerWidth(ref);
  const breakpoints = getBreakpoints();
  
  const resolvedVariant = resolveResponsiveValue(variant, width, breakpoints) ?? 'primary';
  const resolvedElevation = resolveResponsiveValue(elevation, width, breakpoints) ?? 'medium';
  
  const variantStyles = {
    primary: { $backgroundColor: '#007bff', $color: 'white' },
    secondary: { $backgroundColor: '#6c757d', $color: 'white' },
    danger: { $backgroundColor: '#dc3545', $color: 'white' },
  };
  
  const elevationStyles = {
    low: { $boxShadow: '0 1px 3px rgba(0,0,0,0.1)' },
    medium: { $boxShadow: '0 4px 6px rgba(0,0,0,0.1)' },
    high: { $boxShadow: '0 10px 25px rgba(0,0,0,0.15)' },
  };
  
  return (
    <Box
      ref={ref}
      containerWidth={width}
      $padding="lg"
      $borderRadius={8}
      {...elevationStyles[resolvedElevation]}
      {...variantStyles[resolvedVariant]}
      {...props}
    >
      {children}
    </Box>
  );
}
```

### Complex Layout Example

```tsx
import * as React from 'react';
import { Box, Container, AreaGrid, Flex, Stack } from '@apvee/react-layout-kit';

function DashboardLayout() {
  return (
    <Container size={1400} fluid={{ xs: true, lg: false }}>
      <AreaGrid
        areas={{
          xs: '"header" "sidebar" "main" "footer"',
          md: '"header header" "sidebar main" "footer footer"'
        }}
        rows={{ xs: "auto auto 1fr auto", md: "auto 1fr auto" }}
        columns={{ xs: "1fr", md: "250px 1fr" }}
        gap={{ xs: "sm", md: "md" }}
        $minHeight="100vh"
      >
        {/* Header */}
        <AreaGrid.Item area="header">
          <Box $padding="lg" $backgroundColor="#1a1a1a" $color="white">
            <Flex align="center" justify="space-between">
              <Box asChild $fontSize={24} $fontWeight="bold">
                <h1>Dashboard</h1>
              </Box>
              <Flex gap="md">
                <button>Profile</button>
                <button>Settings</button>
              </Flex>
            </Flex>
          </Box>
        </AreaGrid.Item>
        
        {/* Sidebar */}
        <AreaGrid.Item area="sidebar">
          <Box $padding="md" $backgroundColor="#f8f9fa">
            <Stack gap="sm">
              <Box asChild $padding="sm" $backgroundColor="white" $borderRadius={4}>
                <a href="/dashboard">Dashboard</a>
              </Box>
              <Box asChild $padding="sm" $backgroundColor="white" $borderRadius={4}>
                <a href="/analytics">Analytics</a>
              </Box>
              <Box asChild $padding="sm" $backgroundColor="white" $borderRadius={4}>
                <a href="/settings">Settings</a>
              </Box>
            </Stack>
          </Box>
        </AreaGrid.Item>
        
        {/* Main Content */}
        <AreaGrid.Item area="main">
          <Box $padding="lg">
            <Stack gap="xl">
              <Box asChild $fontSize={28} $fontWeight="600">
                <h2>Main Content Area</h2>
              </Box>
              
              <Flex gap="lg" wrap="wrap">
                <Box $flex={1} $minWidth={250} $padding="lg" $backgroundColor="#e9ecef" $borderRadius={8}>
                  <h3>Card 1</h3>
                  <p>Some content here</p>
                </Box>
                <Box $flex={1} $minWidth={250} $padding="lg" $backgroundColor="#e9ecef" $borderRadius={8}>
                  <h3>Card 2</h3>
                  <p>Some content here</p>
                </Box>
                <Box $flex={1} $minWidth={250} $padding="lg" $backgroundColor="#e9ecef" $borderRadius={8}>
                  <h3>Card 3</h3>
                  <p>Some content here</p>
                </Box>
              </Flex>
            </Stack>
          </Box>
        </AreaGrid.Item>
        
        {/* Footer */}
        <AreaGrid.Item area="footer">
          <Box $padding="md" $backgroundColor="#1a1a1a" $color="white" $textAlign="center">
            <p>&copy; 2024 Your Company. All rights reserved.</p>
          </Box>
        </AreaGrid.Item>
      </AreaGrid>
    </Container>
  );
}
```

---

## LLM Context (llm-full.txt)

This repository includes an LLM-optimized documentation file to improve results with tools like GitHub Copilot, ChatGPT, or Claude.

• File: [llm-full.txt](./llm-full.txt)

### What it is
- A single Markdown document with public API signatures, prop tables, and TypeScript usage examples for all components, hooks, and utilities.
- Designed for Large Language Models (LLMs) as context input.
- Does not include internal source code.

### How to use it
1. Provide it as “additional context” when using an LLM for implementation help, refactors, or code reviews.
2. If your tool has limited context size, copy only the relevant section (e.g., “Flex”, “Grid”, “Configuration”).
3. Keep it in sync: regenerate or update it after API changes so assistants propose accurate code.
4. In pull requests, reference the specific section from `llm-full.txt` to guide reviewers (human and AI) to the intended API.
5. For retrieval-based tools, chunk by top-level headings (##) and index section anchors for precise grounding.

### When to reach for it
- You need quick, accurate prop names and types without searching through source files.
- You’re composing complex layouts and want example-driven guidance.
- You’re extending configuration (breakpoints/spacing) and want the module augmentation pattern at hand.

Quick link: [Open llm-full.txt](./llm-full.txt)

---

## Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Setup

```bash
# Clone the repository
git clone https://github.com/apvee/react-layout-kit.git
cd react-layout-kit

# Install dependencies
npm install

# Run development mode with watch
npm run dev

# Run Storybook for component development
npm run storybook

# Build the library
npm run build

# Type check
npm run check
```

---

## License

MIT License

---

## Links

- **GitHub Repository**: [https://github.com/apvee/react-layout-kit](https://github.com/apvee/react-layout-kit)
- **Issues**: [https://github.com/apvee/react-layout-kit/issues](https://github.com/apvee/react-layout-kit/issues)
- **NPM Package**: [@apvee/react-layout-kit](https://www.npmjs.com/package/@apvee/react-layout-kit)

---

Made with ❤️ by [Apvee Solutions](https://github.com/apvee)
