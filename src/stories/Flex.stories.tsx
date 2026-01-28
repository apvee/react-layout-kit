import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Box, Flex, type FlexProps } from '..';

function Frame(props: {
  title: string;
  description?: string;
  width?: number;
  children: React.ReactNode;
}) {
  const { title, description, width, children } = props;

  return (
    <Box
      $border="1px solid #e5e7eb"
      $borderRadius="12px"
      $backgroundColor="#ffffff"
      $boxShadow="0 1px 2px rgba(0,0,0,0.06)"
      p="lg"
      style={width ? { width } : undefined}
    >
      <Box mb="md">
        <div style={{ fontWeight: 700 }}>{title}</div>
        {description ? (
          <div style={{ fontSize: 13, color: '#6b7280' }}>{description}</div>
        ) : null}
      </Box>
      {children}
    </Box>
  );
}

function ItemCard(props: { label: string; tone: 'blue' | 'pink' | 'green' | 'slate' }) {
  const { label, tone } = props;

  const tones = {
    blue: { bg: '#eff6ff', border: '#93c5fd', fg: '#1e3a8a' },
    pink: { bg: '#fdf2f8', border: '#f9a8d4', fg: '#831843' },
    green: { bg: '#ecfdf5', border: '#6ee7b7', fg: '#064e3b' },
    slate: { bg: '#f8fafc', border: '#cbd5e1', fg: '#0f172a' },
  };

  const t = tones[tone];

  return (
    <Box
      $border={`1px solid ${t.border}`}
      $borderRadius="10px"
      $backgroundColor={t.bg}
      p="md"
      style={{ minWidth: 120 }}
    >
      <div style={{ fontWeight: 700, color: t.fg }}>{label}</div>
    </Box>
  );
}

const meta = {
  title: 'Components/Flex',
  component: Flex,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
\`Flex\` is a \`Box\` wrapper that always renders a flex container (it forces \`display: flex\`).
It accepts a focused set of flexbox props and resolves responsive values based on the container width.

- Container props: \`direction\`, \`align\`, \`justify\`, \`wrap\`, \`gap\`, \`rowGap\`, \`columnGap\`
- Item props (via \`Flex.Item\`): \`flex\`, \`grow\`, \`shrink\`, \`basis\`, \`order\`, \`alignSelf\`

## Responsive behavior

Both \`Flex\` and \`Flex.Item\` resolve responsive values using the measured element width.
If you want deterministic resolution (e.g. in Storybook), pass \`containerWidth\`.
        `.trim(),
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    direction: {
      control: 'select',
      options: ['row', 'row-reverse', 'column', 'column-reverse'],
      table: { category: 'Flex' },
    },
    align: {
      control: 'select',
      options: ['stretch', 'flex-start', 'flex-end', 'center', 'baseline'],
      table: { category: 'Flex' },
    },
    justify: {
      control: 'select',
      options: ['flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'space-evenly'],
      table: { category: 'Flex' },
    },
    wrap: {
      control: 'select',
      options: ['nowrap', 'wrap', 'wrap-reverse'],
      table: { category: 'Flex' },
    },
    gap: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', 'xxl', 'xxxl', 8, 12, 16, 24],
      table: { category: 'Flex' },
    },
    containerWidth: {
      control: 'number',
      table: { category: 'Responsive' },
    },
    children: { control: false },
  },
} satisfies Meta<typeof Flex>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    direction: 'row',
    align: 'center',
    justify: 'flex-start',
    wrap: 'wrap',
    gap: 'md',
  } satisfies Partial<FlexProps>,
  render: (args: FlexProps) => (
    <Box $backgroundColor="#f5f5f5" p="lg">
      <Frame title="Playground" description="Tune common flex container props from the controls.">
        <Flex
          {...args}
          p="lg"
          $border="1px dashed #cbd5e1"
          $borderRadius="12px"
          $backgroundColor="#f8fafc"
        >
          <ItemCard label="Item 1" tone="blue" />
          <ItemCard label="Item 2" tone="pink" />
          <ItemCard label="Item 3" tone="green" />
          <ItemCard label="Item 4" tone="slate" />
        </Flex>
      </Frame>
    </Box>
  ),
};

export const ItemsAndComposition: Story = {
  render: () => (
    <Box $backgroundColor="#f5f5f5" p="lg">
      <Box $display="flex" $flexDirection="column" $gap="16px">
        <Frame
          title="Flex.Item sizing"
          description="Use Flex.Item for per-item flex (grow/shrink/basis/order/alignSelf)."
        >
          <Flex gap="md" $alignItems="stretch" $border="1px dashed #cbd5e1" $borderRadius="12px" p="lg">
            <Flex.Item grow={1}>
              <ItemCard label="grow=1" tone="blue" />
            </Flex.Item>
            <Flex.Item shrink={0} basis="220px">
              <ItemCard label="shrink=0 · basis=220px" tone="pink" />
            </Flex.Item>
            <Flex.Item grow={1}>
              <ItemCard label="grow=1" tone="green" />
            </Flex.Item>
          </Flex>
        </Frame>

        <Frame
          title="Composition (asChild)"
          description="Flex and Flex.Item inherit Box composition; you can render semantic elements via asChild."
        >
          <Flex asChild justify="space-between" align="center" gap="md" p="lg" $border="1px dashed #cbd5e1" $borderRadius="12px">
            <nav aria-label="Primary">
              <Box style={{ fontWeight: 800 }}>Logo</Box>

              <Flex gap="sm" asChild>
                <ul style={{ display: 'flex', gap: 8, listStyle: 'none', margin: 0, padding: 0 }}>
                  <li>
                    <a href="#" onClick={(e) => e.preventDefault()}>
                      Docs
                    </a>
                  </li>
                  <li>
                    <a href="#" onClick={(e) => e.preventDefault()}>
                      Pricing
                    </a>
                  </li>
                  <li>
                    <a href="#" onClick={(e) => e.preventDefault()}>
                      About
                    </a>
                  </li>
                </ul>
              </Flex>
            </nav>
          </Flex>
        </Frame>
      </Box>
    </Box>
  ),
};

export const ResponsiveLayout: Story = {
  render: () => {
    const responsiveDirection: FlexProps['direction'] = { xs: 'column', md: 'row' };
    const responsiveGap: FlexProps['gap'] = { xs: 'sm', md: 'lg' };
    const responsiveJustify: FlexProps['justify'] = { xs: 'flex-start', md: 'space-between' };

    const Viewport = (props: { label: string; width: number }) => {
      const { label, width } = props;

      return (
        <Box
          $border="1px solid #e5e7eb"
          $borderRadius="12px"
          $backgroundColor="#ffffff"
          p="md"
          style={{ width }}
        >
          <Box mb="sm">
            <div style={{ fontWeight: 700 }}>{label}</div>
            <div style={{ fontSize: 13, color: '#6b7280' }}>containerWidth: {width}px</div>
          </Box>

          <Flex
            direction={responsiveDirection}
            justify={responsiveJustify}
            align={{ xs: 'stretch', md: 'center' }}
            gap={responsiveGap}
            wrap="wrap"
            containerWidth={width}
            p="lg"
            $border="1px dashed #cbd5e1"
            $borderRadius="12px"
            $backgroundColor="#f8fafc"
          >
            <Flex.Item
              order={{ xs: 2, md: 1 }}
              containerWidth={width}
              $width={{ xs: '100%', md: 'auto' }}
            >
              <ItemCard label="order: xs=2 md=1" tone="pink" />
            </Flex.Item>
            <Flex.Item grow={{ xs: 0, md: 1 }} containerWidth={width}>
              <ItemCard label="grow: xs=0 md=1" tone="blue" />
            </Flex.Item>
            <Flex.Item shrink={0} basis={{ xs: 'auto', md: '240px' }} containerWidth={width}>
              <ItemCard label="basis: xs=auto md=240px" tone="green" />
            </Flex.Item>
          </Flex>
        </Box>
      );
    };

    return (
      <Box $backgroundColor="#f5f5f5" p="lg">
        <Frame
          title="Responsive layout"
          description="Deterministic responsive resolution by passing containerWidth."
        >
          <Box $display="flex" $flexWrap="wrap" $gap="16px">
            <Viewport label="Small" width={360} />
            <Viewport label="Large" width={1100} />
          </Box>
        </Frame>
      </Box>
    );
  },
};

/*
 * Legacy story content (pre-refactor) was accidentally appended below.
 * It is intentionally disabled to avoid duplicate meta/default export.
 * Remove this block once you no longer need the reference.
 */

/* const meta: Meta<FlexProps> = {
  title: 'Components/Layouts/Flex',
  component: Flex,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
# Flex

A component that creates a flex container with comprehensive flexbox control. Perfect for composing elements with flexible layouts and responsive behavior.

## What It Is

The Flex component is a convenience wrapper around CSS Flexbox that provides an intuitive, prop-based API for creating flexible layouts. It wraps the Box component and applies \`display: flex\` along with all standard flexbox properties via props.

All styles are applied via Box component dollar-props - no inline styles are used internally. The component provides full responsive support for all flexbox properties through breakpoint objects.

## Key Features

- **Comprehensive Flexbox Control**: All standard flex container properties (\`direction\`, \`align\`, \`justify\`, \`wrap\`)
- **Gap Support**: Single \`gap\` prop or granular \`rowGap\`/\`columnGap\` control
- **Spacing Integration**: Gap values support spacing scale keys (xs, sm, md, lg, xl, xxl, xxxl) or numeric pixel values
- **Full Responsive Support**: All flex properties accept responsive values via breakpoint objects
- **Sub-component Pattern**: \`Flex.Item\` for per-item flex control (grow, shrink, basis, order, alignSelf)
- **Extends Box**: Inherits all Box props (spacing, styling, composition via \`asChild\`)
- **Container Width Measurement**: Automatic width measurement for responsive calculations

## When to Use

**Use Flex when you need:**
- Horizontal or vertical layouts with items that can grow/shrink
- Centering content along main or cross axis
- Space distribution (space-between, space-around, space-evenly)
- Responsive layouts that change direction at different breakpoints
- Wrapping items automatically when they don't fit
- Individual item control with \`Flex.Item\` (grow, shrink, basis, order)
- Gaps between items using spacing scale values

**Avoid Flex when:**
- You need complex multi-dimensional grid layouts (use Grid or AreaGrid instead)
- You need fixed column/row structures with explicit placement (use Grid)
- You're just stacking items with uniform gaps (use Stack for simpler API)
- You need template-based layouts with named areas (use AreaGrid)

## Core Props

### Flex Container Props

**\`direction\`** (FlexDirection | ResponsiveValue<FlexDirection>)
- Controls \`flex-direction\` CSS property
- Values: \`'row'\` | \`'row-reverse'\` | \`'column'\` | \`'column-reverse'\`
- Default: \`'row'\` (browser default)
- Supports responsive values: \`direction={{ xs: 'column', md: 'row' }}\`

**\`align\`** (AlignItems | ResponsiveValue<AlignItems>)
- Controls \`align-items\` CSS property (cross-axis alignment)
- Values: \`'stretch'\` | \`'flex-start'\` | \`'flex-end'\` | \`'center'\` | \`'baseline'\`
- Default: \`'stretch'\` (browser default)
- Supports responsive values: \`align={{ xs: 'stretch', md: 'center' }}\`

**\`justify\`** (JustifyContent | ResponsiveValue<JustifyContent>)
- Controls \`justify-content\` CSS property (main-axis alignment)
- Values: \`'flex-start'\` | \`'flex-end'\` | \`'center'\` | \`'space-between'\` | \`'space-around'\` | \`'space-evenly'\`
- Default: \`'flex-start'\` (browser default)
- Supports responsive values: \`justify={{ xs: 'flex-start', md: 'space-between' }}\`

**\`wrap\`** (FlexWrap | ResponsiveValue<FlexWrap>)
- Controls \`flex-wrap\` CSS property
- Values: \`'nowrap'\` | \`'wrap'\` | \`'wrap-reverse'\`
- Default: \`'nowrap'\` (browser default)
- Supports responsive values: \`wrap={{ xs: 'wrap', md: 'nowrap' }}\`

**\`gap\`** (SpacingKey | number | ResponsiveValue<SpacingKey | number>)
- Controls \`gap\` CSS property (spacing between all items)
- Accepts spacing scale keys: \`'xs'\`, \`'sm'\`, \`'md'\`, \`'lg'\`, \`'xl'\`, \`'xxl'\`, \`'xxxl'\`
- Or numeric pixel values: \`8\`, \`16\`, \`24\`, etc.
- Supports responsive values: \`gap={{ xs: 'sm', md: 'lg' }}\` or \`gap={{ xs: 8, md: 16 }}\`

**\`rowGap\`** (SpacingKey | number | ResponsiveValue<SpacingKey | number>)
- Controls \`row-gap\` CSS property (spacing between rows)
- Same value types as \`gap\`
- Overrides \`gap\` for row spacing when both are provided

**\`columnGap\`** (SpacingKey | number | ResponsiveValue<SpacingKey | number>)
- Controls \`column-gap\` CSS property (spacing between columns)
- Same value types as \`gap\`
- Overrides \`gap\` for column spacing when both are provided

### Flex.Item Props

**\`flex\`** (CSS Flex | ResponsiveValue<CSS Flex>)
- Controls \`flex\` CSS shorthand (grow, shrink, basis combined)
- Values: \`'1'\`, \`'0 0 auto'\`, \`'1 1 200px'\`, etc.
- Supports responsive values: \`flex={{ xs: '1', md: '0 0 200px' }}\`

**\`grow\`** (number | ResponsiveValue<number>)
- Controls \`flex-grow\` CSS property (ability to grow)
- Values: \`0\` (don't grow), \`1\` (can grow), \`2\` (grow twice as fast), etc.
- Supports responsive values: \`grow={{ xs: 0, md: 1 }}\`

**\`shrink\`** (number | ResponsiveValue<number>)
- Controls \`flex-shrink\` CSS property (ability to shrink)
- Values: \`0\` (don't shrink), \`1\` (can shrink - default), etc.
- Supports responsive values: \`shrink={{ xs: 1, md: 0 }}\`

**\`basis\`** (CSS FlexBasis | ResponsiveValue<CSS FlexBasis>)
- Controls \`flex-basis\` CSS property (initial main size)
- Values: \`'auto'\`, \`'200px'\`, \`'50%'\`, \`'0'\`, etc.
- Supports responsive values: \`basis={{ xs: 'auto', md: '300px' }}\`

**\`order\`** (number | ResponsiveValue<number>)
- Controls \`order\` CSS property (visual order of flex items)
- Values: any integer (default: \`0\`)
- Supports responsive values: \`order={{ xs: 2, md: 1 }}\` (reorder on mobile)

**\`alignSelf\`** (AlignSelf | ResponsiveValue<AlignSelf>)
- Controls \`align-self\` CSS property (individual cross-axis alignment)
- Values: \`'auto'\` | \`'flex-start'\` | \`'flex-end'\` | \`'center'\` | \`'baseline'\` | \`'stretch'\`
- Overrides container's \`align\` for this specific item
- Supports responsive values: \`alignSelf={{ xs: 'stretch', md: 'center' }}\`

### Box Props (Inherited)

Flex extends Box, so all Box props are available:
- **Spacing**: \`m\`, \`mt\`, \`mb\`, \`ml\`, \`mr\`, \`mx\`, \`my\`, \`p\`, \`pt\`, \`pb\`, \`pl\`, \`pr\`, \`px\`, \`py\`
- **Composition**: \`asChild\` (render as child element with prop merging)
- **Styling**: All CSS properties via dollar-props (\`$backgroundColor\`, \`$borderRadius\`, etc.)
- **Responsive**: \`containerWidth\` prop for responsive calculations

## Responsive Behavior

All Flex properties support responsive values via breakpoint objects. The component automatically measures its width (or uses provided \`containerWidth\`) to resolve the correct value for the current breakpoint.

Default breakpoints (customizable via configuration):
- \`xs\`: 0-575px
- \`sm\`: 576-767px
- \`md\`: 768-991px
- \`lg\`: 992-1199px
- \`xl\`: 1200px+

<Box p="md" $backgroundColor="#f5f5f5" $borderRadius="8px">
<Flex 
  direction={{ xs: 'column', md: 'row' }}
  align={{ xs: 'stretch', md: 'center' }}
  gap={{ xs: 'sm', md: 'lg' }}
>
  <Box p="md" $backgroundColor="#fff">Item 1</Box>
  <Box p="md" $backgroundColor="#fff">Item 2</Box>
</Flex>
</Box>

The above Flex will:
- Stack vertically with small gap on xs/sm screens
- Display horizontally with large gap on md+ screens
- Stretch items on mobile, center on desktop

## Flex.Item Sub-component

Use \`Flex.Item\` when you need per-item control:

<Flex gap="md">
  <Flex.Item grow={1}>
    <Box p="md" $backgroundColor="#e3f2fd">Grows to fill space</Box>
  </Flex.Item>
  <Flex.Item shrink={0} basis="200px">
    <Box p="md" $backgroundColor="#f3e5f5">Fixed 200px width</Box>
  </Flex.Item>
</Flex>

\`Flex.Item\` is not required for basic layouts - it's only needed for fine-grained control over individual flex items.

## Spacing Scale Integration

The \`gap\`, \`rowGap\`, and \`columnGap\` props integrate with the spacing scale:

- \`gap="xs"\` → \`4px\`
- \`gap="sm"\` → \`8px\`
- \`gap="md"\` → \`16px\`
- \`gap="lg"\` → \`24px\`
- \`gap="xl"\` → \`32px\`
- \`gap="xxl"\` → \`48px\`
- \`gap="xxxl"\` → \`64px\`

Or use numeric pixel values directly: \`gap={12}\`, \`rowGap={20}\`, etc.

## Examples

### Basic Horizontal Layout

<Flex gap="md">
  <Box p="md" $backgroundColor="#e3f2fd">Item 1</Box>
  <Box p="md" $backgroundColor="#f3e5f5">Item 2</Box>
  <Box p="md" $backgroundColor="#e8f5e9">Item 3</Box>
</Flex>

### Centered Content

<Flex align="center" justify="center" $minHeight="200px">
  <button>Centered Button</button>
</Flex>

### Column Layout (Stack)

<Flex direction="column" gap="sm">
  <Box p="md" $backgroundColor="#fff">Row 1</Box>
  <Box p="md" $backgroundColor="#fff">Row 2</Box>
  <Box p="md" $backgroundColor="#fff">Row 3</Box>
</Flex>

### Space Between (Header Layout)

<Flex justify="space-between" align="center" p="md" $backgroundColor="#333" $color="#fff">
  <h1>Logo</h1>
  <nav>Navigation</nav>
</Flex>

### Responsive Direction

<Flex 
  direction={{ xs: 'column', md: 'row' }}
  gap={{ xs: 'sm', md: 'lg' }}
>
  <Box flex={1} p="xl" $backgroundColor="#fff">Main Content</Box>
  <Box $width={{ xs: '100%', md: '300px' }} p="xl" $backgroundColor="#f5f5f5">Sidebar</Box>
</Flex>

### With Flex.Item (Grow/Shrink)

<Flex gap="md">
  <Flex.Item grow={1}>
    <Box p="md" $backgroundColor="#e3f2fd">Flexible (grows)</Box>
  </Flex.Item>
  <Flex.Item shrink={0} basis="200px">
    <Box p="md" $backgroundColor="#f3e5f5">Fixed 200px</Box>
  </Flex.Item>
  <Flex.Item grow={1}>
    <Box p="md" $backgroundColor="#e8f5e9">Flexible (grows)</Box>
  </Flex.Item>
</Flex>

### Wrapping Layout

<Flex wrap="wrap" gap="md">
  {Array.from({ length: 12 }).map((_, i) => (
    <Box key={i} p="md" $width="120px" $backgroundColor="#f0f0f0">
      Item {i + 1}
    </Box>
  ))}
</Flex>

## Best Practices

1. **Use semantic direction names**: Use \`direction="column"\` instead of thinking in terms of flex-direction abstractions.

2. **Prefer \`gap\` over margins**: Use \`gap\` prop for spacing between items instead of margins on children (cleaner, more maintainable).

3. **Use Flex.Item sparingly**: Only use \`Flex.Item\` when you need per-item control. Most layouts work fine without it.

4. **Combine with Box for styling**: Use Box dollar-props on Flex for backgrounds, borders, padding, etc.

5. **Responsive direction changes**: Common pattern: \`direction={{ xs: 'column', md: 'row' }}\` for mobile-first responsive layouts.

6. **Center content efficiently**: \`<Flex align="center" justify="center">\` is the most concise way to center content.

7. **Use spacing scale**: Prefer spacing scale keys (\`gap="md"\`) over numeric values for consistency.

8. **Avoid nesting too deeply**: More than 3-4 levels of nested Flex can become hard to reason about. Consider Grid or AreaGrid for complex layouts.

## Common Patterns

### Navigation Bar

<Flex justify="space-between" align="center" p="md" $backgroundColor="#333" $color="#fff">
  <Box>Logo</Box>
  <Flex gap="lg">
    <a>Home</a>
    <a>About</a>
    <a>Contact</a>
  </Flex>
</Flex>

### Card with Actions

<Box $border="1px solid #e0e0e0" $borderRadius="8px" $overflow="hidden">
  <Box p="lg">
    <h3>Card Title</h3>
    <p>Card content goes here...</p>
  </Box>
  <Flex justify="flex-end" gap="sm" p="md" $backgroundColor="#f5f5f5" $borderTop="1px solid #e0e0e0">
    <button>Cancel</button>
    <button>Save</button>
  </Flex>
</Box>

### Responsive Sidebar Layout

<Flex direction={{ xs: 'column', md: 'row' }} gap="lg">
  <Flex.Item grow={1} basis={{ xs: 'auto', md: '0' }}>
    <Box p="xl" $backgroundColor="#fff">Main Content</Box>
  </Flex.Item>
  <Flex.Item shrink={0} basis={{ xs: 'auto', md: '300px' }}>
    <Box p="xl" $backgroundColor="#f5f5f5">Sidebar</Box>
  </Flex.Item>
</Flex>

### Equal Width Columns

<Flex gap="md">
  <Flex.Item flex={1}>
    <Box p="lg" $backgroundColor="#e3f2fd">Column 1</Box>
  </Flex.Item>
  <Flex.Item flex={1}>
    <Box p="lg" $backgroundColor="#f3e5f5">Column 2</Box>
  </Flex.Item>
  <Flex.Item flex={1}>
    <Box p="lg" $backgroundColor="#e8f5e9">Column 3</Box>
  </Flex.Item>
</Flex>

## Accessibility

Flex is purely a layout component and does not introduce accessibility concerns by itself. However:

- **Visual vs DOM order**: The \`order\` prop changes visual order but not DOM/tab order. Use carefully to avoid confusing keyboard navigation.
- **Semantic structure**: Use appropriate semantic elements inside Flex (\`<nav>\`, \`<header>\`, \`<main>\`, \`<article>\`, etc.)
- **Focus management**: Ensure focus indicators are visible and tab order makes sense
- **Screen readers**: Flex doesn't affect screen reader behavior, but visual order changes (via \`order\`) might confuse users

Use \`asChild\` to render Flex as semantic elements when appropriate:

<Flex asChild justify="space-between" align="center">
  <nav>
    <div>Logo</div>
    <ul>Navigation items</ul>
  </nav>
</Flex>
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    direction: {
      control: 'select',
      options: ['row', 'row-reverse', 'column', 'column-reverse'],
      description: 'Flex direction (main axis)',
      table: {
        type: { summary: 'FlexDirection | ResponsiveValue<FlexDirection>' },
        defaultValue: { summary: 'row' },
        category: 'Flex Container',
      },
    },
    align: {
      control: 'select',
      options: ['stretch', 'flex-start', 'flex-end', 'center', 'baseline'],
      description: 'Cross-axis alignment',
      table: {
        type: { summary: 'AlignItems | ResponsiveValue<AlignItems>' },
        defaultValue: { summary: 'stretch' },
        category: 'Flex Container',
      },
    },
    justify: {
      control: 'select',
      options: ['flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'space-evenly'],
      description: 'Main-axis alignment',
      table: {
        type: { summary: 'JustifyContent | ResponsiveValue<JustifyContent>' },
        defaultValue: { summary: 'flex-start' },
        category: 'Flex Container',
      },
    },
    wrap: {
      control: 'select',
      options: ['nowrap', 'wrap', 'wrap-reverse'],
      description: 'Flex wrap behavior',
      table: {
        type: { summary: 'FlexWrap | ResponsiveValue<FlexWrap>' },
        defaultValue: { summary: 'nowrap' },
        category: 'Flex Container',
      },
    },
    gap: {
      control: 'text',
      description: 'Gap between all items (supports spacing scale keys or numbers)',
      table: {
        type: { summary: 'SpacingKey | number | ResponsiveValue<SpacingKey | number>' },
        category: 'Flex Container',
      },
    },
    rowGap: {
      control: 'text',
      description: 'Gap between rows',
      table: {
        type: { summary: 'SpacingKey | number | ResponsiveValue<SpacingKey | number>' },
        category: 'Flex Container',
      },
    },
    columnGap: {
      control: 'text',
      description: 'Gap between columns',
      table: {
        type: { summary: 'SpacingKey | number | ResponsiveValue<SpacingKey | number>' },
        category: 'Flex Container',
      },
    },
    containerWidth: {
      control: 'number',
      description: 'Fixed container width for responsive calculations',
      table: {
        type: { summary: 'number' },
        category: 'Responsive',
      },
    },
    asChild: {
      control: 'boolean',
      description: 'Render as child element, merging props and refs',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'Box Props',
      },
    },
  },
};

export default meta;
type Story = StoryObj<FlexProps>;

/**
 * Interactive playground to experiment with all Flex props.
 * /
export const Playground: Story = {
  args: {
    direction: 'row',
    align: 'center',
    justify: 'flex-start',
    wrap: 'wrap',
    gap: 'md',
  },
  render: (args) => (
    <Flex {...args} p="lg" $backgroundColor="#f8fafc" $border="1px solid #e2e8f0" $borderRadius="8px">
      <Box p="md" $backgroundColor="#dbeafe" $border="1px solid #3b82f6" $borderRadius="6px">
        Item 1
      </Box>
      <Box p="md" $backgroundColor="#fce7f3" $border="1px solid #ec4899" $borderRadius="6px">
        Item 2
      </Box>
      <Box p="md" $backgroundColor="#d1fae5" $border="1px solid #10b981" $borderRadius="6px">
        Item 3
      </Box>
    </Flex>
  ),
};

/**
 * Basic horizontal layout with gaps between items.
 * /
export const HorizontalLayout: Story = {
  render: () => (
    <Flex gap="md">
      <Box p="lg" $backgroundColor="#dbeafe" $borderRadius="8px" $minWidth="120px">
        <h4 style={{ margin: 0 }}>📊</h4>
        <p style={{ margin: '8px 0 0 0', fontSize: '14px' }}>Dashboard</p>
      </Box>
      <Box p="lg" $backgroundColor="#fce7f3" $borderRadius="8px" $minWidth="120px">
        <h4 style={{ margin: 0 }}>📈</h4>
        <p style={{ margin: '8px 0 0 0', fontSize: '14px' }}>Analytics</p>
      </Box>
      <Box p="lg" $backgroundColor="#d1fae5" $borderRadius="8px" $minWidth="120px">
        <h4 style={{ margin: 0 }}>⚙️</h4>
        <p style={{ margin: '8px 0 0 0', fontSize: '14px' }}>Settings</p>
      </Box>
    </Flex>
  ),
};

/**
 * Vertical layout (column direction) with spacing.
 * /
export const ColumnLayout: Story = {
  render: () => (
    <Flex direction="column" gap="sm" style={{ maxWidth: '400px' }}>
      <Box p="md" $backgroundColor="#f3f4f6" $border="1px solid #d1d5db" $borderRadius="6px">
        <strong>Step 1:</strong> Choose your plan
      </Box>
      <Box p="md" $backgroundColor="#f3f4f6" $border="1px solid #d1d5db" $borderRadius="6px">
        <strong>Step 2:</strong> Enter your details
      </Box>
      <Box p="md" $backgroundColor="#f3f4f6" $border="1px solid #d1d5db" $borderRadius="6px">
        <strong>Step 3:</strong> Confirm and pay
      </Box>
    </Flex>
  ),
};

/**
 * Centered content both horizontally and vertically.
 * /
export const CenteredContent: Story = {
  render: () => (
    <Flex align="center" justify="center" $minHeight="300px" $backgroundColor="#f8fafc" $borderRadius="8px">
      <Box p="xl" $backgroundColor="#ffffff" $border="2px solid #3b82f6" $borderRadius="12px" $textAlign="center">
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>🎯</div>
        <h3 style={{ margin: '0 0 8px 0' }}>Perfectly Centered</h3>
        <p style={{ margin: 0, color: '#6b7280' }}>Using align="center" justify="center"</p>
      </Box>
    </Flex>
  ),
};

/**
 * Space between layout (common for headers/navigation).
 * /
export const SpaceBetween: Story = {
  render: () => (
    <Flex justify="space-between" align="center" p="lg" $backgroundColor="#1e293b" $color="#ffffff" $borderRadius="8px">
      <Box $fontSize="24px" $fontWeight="bold">
        🚀 Logo
      </Box>
      <Flex gap="lg">
        <Box style={{ cursor: 'pointer' }}>Home</Box>
        <Box style={{ cursor: 'pointer' }}>About</Box>
        <Box style={{ cursor: 'pointer' }}>Contact</Box>
      </Flex>
    </Flex>
  ),
};

/**
 * Wrapping layout that automatically wraps items to new rows.
 * /
export const WrappingLayout: Story = {
  render: () => (
    <Flex wrap="wrap" gap="md" p="lg" $backgroundColor="#f8fafc" $borderRadius="8px">
      {Array.from({ length: 12 }).map((_, i) => (
        <Box 
          key={i} 
          p="md" 
          $width="120px" 
          $backgroundColor="#ffffff" 
          $border="1px solid #e2e8f0"
          $borderRadius="6px"
          $textAlign="center"
        >
          Item {i + 1}
        </Box>
      ))}
    </Flex>
  ),
};

/**
 * Flex.Item with grow and shrink control for flexible layouts.
 * /
export const FlexItemGrowShrink: Story = {
  render: () => (
    <Box>
      <h3 style={{ marginTop: 0 }}>Flex.Item with grow/shrink</h3>
      <Flex gap="md" p="lg" $backgroundColor="#f8fafc" $borderRadius="8px">
        <Flex.Item grow={1}>
          <Box p="lg" $backgroundColor="#dbeafe" $border="2px solid #3b82f6" $borderRadius="8px">
            <strong>grow=1</strong>
            <p style={{ margin: '8px 0 0 0', fontSize: '14px' }}>
              This item grows to fill available space
            </p>
          </Box>
        </Flex.Item>
        
        <Flex.Item shrink={0} basis="200px">
          <Box p="lg" $backgroundColor="#fce7f3" $border="2px solid #ec4899" $borderRadius="8px">
            <strong>shrink=0, basis=200px</strong>
            <p style={{ margin: '8px 0 0 0', fontSize: '14px' }}>
              Fixed 200px width, won't shrink
            </p>
          </Box>
        </Flex.Item>
        
        <Flex.Item grow={2}>
          <Box p="lg" $backgroundColor="#d1fae5" $border="2px solid #10b981" $borderRadius="8px">
            <strong>grow=2</strong>
            <p style={{ margin: '8px 0 0 0', fontSize: '14px' }}>
              Grows twice as fast as grow=1
            </p>
          </Box>
        </Flex.Item>
      </Flex>
    </Box>
  ),
};

/**
 * Flex.Item with order prop for reordering items.
 * /
export const FlexItemOrder: Story = {
  render: () => (
    <Box>
      <h3 style={{ marginTop: 0 }}>Flex.Item with order (visual reordering)</h3>
      <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '16px' }}>
        DOM order: First → Second → Third, but visually reordered via <code>order</code> prop
      </p>
      <Flex gap="md" p="lg" $backgroundColor="#f8fafc" $borderRadius="8px">
        <Flex.Item order={2}>
          <Box p="lg" $backgroundColor="#dbeafe" $border="2px solid #3b82f6" $borderRadius="8px">
            <strong>First in DOM</strong>
            <p style={{ margin: '8px 0 0 0', fontSize: '14px' }}>order=2 (displays second)</p>
          </Box>
        </Flex.Item>
        
        <Flex.Item order={3}>
          <Box p="lg" $backgroundColor="#fce7f3" $border="2px solid #ec4899" $borderRadius="8px">
            <strong>Second in DOM</strong>
            <p style={{ margin: '8px 0 0 0', fontSize: '14px' }}>order=3 (displays last)</p>
          </Box>
        </Flex.Item>
        
        <Flex.Item order={1}>
          <Box p="lg" $backgroundColor="#d1fae5" $border="2px solid #10b981" $borderRadius="8px">
            <strong>Third in DOM</strong>
            <p style={{ margin: '8px 0 0 0', fontSize: '14px' }}>order=1 (displays first)</p>
          </Box>
        </Flex.Item>
      </Flex>
    </Box>
  ),
};

/**
 * Flex.Item with alignSelf for individual cross-axis alignment.
 * /
export const FlexItemAlignSelf: Story = {
  render: () => (
    <Box>
      <h3 style={{ marginTop: 0 }}>Flex.Item with alignSelf</h3>
      <Flex gap="md" p="lg" $backgroundColor="#f8fafc" $borderRadius="8px" $minHeight="200px">
        <Flex.Item alignSelf="flex-start">
          <Box p="md" $backgroundColor="#dbeafe" $border="2px solid #3b82f6" $borderRadius="8px">
            alignSelf="flex-start"
          </Box>
        </Flex.Item>
        
        <Flex.Item alignSelf="center">
          <Box p="md" $backgroundColor="#fce7f3" $border="2px solid #ec4899" $borderRadius="8px">
            alignSelf="center"
          </Box>
        </Flex.Item>
        
        <Flex.Item alignSelf="flex-end">
          <Box p="md" $backgroundColor="#d1fae5" $border="2px solid #10b981" $borderRadius="8px">
            alignSelf="flex-end"
          </Box>
        </Flex.Item>
        
        <Flex.Item alignSelf="stretch">
          <Box p="md" $backgroundColor="#fef3c7" $border="2px solid #f59e0b" $borderRadius="8px" $height="100%">
            alignSelf="stretch"
          </Box>
        </Flex.Item>
      </Flex>
    </Box>
  ),
};

/**
 * Responsive direction: column on mobile, row on desktop.
 * /
export const ResponsiveDirection: Story = {
  render: () => (
    <Box>
      <h3 style={{ marginTop: 0 }}>Responsive Direction</h3>
      <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '16px' }}>
        First container (containerWidth=400): <strong>column</strong> layout
        <br />
        Second container (containerWidth=900): <strong>row</strong> layout
      </p>
      
      <Flex
        direction={{ xs: 'column', md: 'row' }}
        gap={{ xs: 'sm', md: 'lg' }}
        containerWidth={400}
        p="lg"
        $backgroundColor="#f8fafc"
        $borderRadius="8px"
        style={{ marginBottom: '24px' }}
      >
        <Box flex={1} p="lg" $backgroundColor="#dbeafe" $borderRadius="8px">
          Item 1
        </Box>
        <Box flex={1} p="lg" $backgroundColor="#fce7f3" $borderRadius="8px">
          Item 2
        </Box>
        <Box flex={1} p="lg" $backgroundColor="#d1fae5" $borderRadius="8px">
          Item 3
        </Box>
      </Flex>
      
      <Flex
        direction={{ xs: 'column', md: 'row' }}
        gap={{ xs: 'sm', md: 'lg' }}
        containerWidth={900}
        p="lg"
        $backgroundColor="#f8fafc"
        $borderRadius="8px"
      >
        <Box flex={1} p="lg" $backgroundColor="#dbeafe" $borderRadius="8px">
          Item 1
        </Box>
        <Box flex={1} p="lg" $backgroundColor="#fce7f3" $borderRadius="8px">
          Item 2
        </Box>
        <Box flex={1} p="lg" $backgroundColor="#d1fae5" $borderRadius="8px">
          Item 3
        </Box>
      </Flex>
    </Box>
  ),
};

/**
 * Responsive Flex.Item: different grow values at different breakpoints.
 * /
export const ResponsiveFlexItem: Story = {
  render: () => (
    <Box>
      <h3 style={{ marginTop: 0 }}>Responsive Flex.Item</h3>
      <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '16px' }}>
        First container (containerWidth=400, xs): Main grows, sidebar fixed
        <br />
        Second container (containerWidth=900, md): Both grow proportionally
      </p>
      
      <Flex
        gap="md"
        containerWidth={400}
        p="lg"
        $backgroundColor="#f8fafc"
        $borderRadius="8px"
        style={{ marginBottom: '24px' }}
      >
        <Flex.Item grow={{ xs: 1, md: 2 }} containerWidth={400}>
          <Box p="lg" $backgroundColor="#dbeafe" $borderRadius="8px">
            <strong>Main</strong>
            <p style={{ margin: '8px 0 0 0', fontSize: '14px' }}>
              grow: xs=1, md=2
            </p>
          </Box>
        </Flex.Item>
        <Flex.Item grow={{ xs: 0, md: 1 }} basis={{ xs: '100px', md: 'auto' }} containerWidth={400}>
          <Box p="lg" $backgroundColor="#fce7f3" $borderRadius="8px">
            <strong>Sidebar</strong>
            <p style={{ margin: '8px 0 0 0', fontSize: '14px' }}>
              grow: xs=0, md=1
            </p>
          </Box>
        </Flex.Item>
      </Flex>
      
      <Flex
        gap="md"
        containerWidth={900}
        p="lg"
        $backgroundColor="#f8fafc"
        $borderRadius="8px"
      >
        <Flex.Item grow={{ xs: 1, md: 2 }} containerWidth={900}>
          <Box p="lg" $backgroundColor="#dbeafe" $borderRadius="8px">
            <strong>Main</strong>
            <p style={{ margin: '8px 0 0 0', fontSize: '14px' }}>
              grow: xs=1, md=2 (current: 2)
            </p>
          </Box>
        </Flex.Item>
        <Flex.Item grow={{ xs: 0, md: 1 }} basis={{ xs: '100px', md: 'auto' }} containerWidth={900}>
          <Box p="lg" $backgroundColor="#fce7f3" $borderRadius="8px">
            <strong>Sidebar</strong>
            <p style={{ margin: '8px 0 0 0', fontSize: '14px' }}>
              grow: xs=0, md=1 (current: 1)
            </p>
          </Box>
        </Flex.Item>
      </Flex>
    </Box>
  ),
};

/**
 * Card layout with header and footer using Flex.
 * /
export const CardLayout: Story = {
  render: () => (
    <Box 
      $width="400px" 
      $border="1px solid #e2e8f0" 
      $borderRadius="12px" 
      $overflow="hidden"
      $boxShadow="0 4px 6px rgba(0,0,0,0.1)"
    >
      {/* Header * /}
      <Flex 
        justify="space-between" 
        align="center" 
        p="lg" 
        $backgroundColor="#ffffff"
        $borderBottom="1px solid #e2e8f0"
      >
        <h3 style={{ margin: 0 }}>Card Title</h3>
        <button style={{ padding: '4px 12px', borderRadius: '4px', border: '1px solid #d1d5db', background: 'white', cursor: 'pointer' }}>
          ⋮
        </button>
      </Flex>
      
      {/* Content * /}
      <Box p="lg">
        <p style={{ margin: '0 0 12px 0', lineHeight: '1.6' }}>
          This card uses Flex for the header and footer layouts with space-between alignment for optimal
          content distribution.
        </p>
        <p style={{ margin: 0, lineHeight: '1.6' }}>
          The content area is a simple Box, while actions use Flex with gap for proper button spacing.
        </p>
      </Box>
      
      {/* Footer / Actions * /}
      <Flex 
        justify="flex-end" 
        gap="sm" 
        p="lg" 
        $backgroundColor="#f8fafc"
        $borderTop="1px solid #e2e8f0"
      >
        <button style={{ padding: '8px 16px', borderRadius: '6px', border: '1px solid #d1d5db', background: 'white', cursor: 'pointer' }}>
          Cancel
        </button>
        <button style={{ padding: '8px 16px', borderRadius: '6px', border: 'none', background: '#3b82f6', color: 'white', cursor: 'pointer', fontWeight: '600' }}>
          Save
        </button>
      </Flex>
    </Box>
  ),
};

/**
 * Sidebar layout with responsive behavior.
 * /
export const SidebarLayout: Story = {
  render: () => (
    <Box>
      <h3 style={{ marginTop: 0 }}>Responsive Sidebar Layout</h3>
      <Flex 
        direction={{ xs: 'column', md: 'row' }}
        gap="lg"
        $minHeight="400px"
      >
        <Flex.Item grow={1} basis={{ xs: 'auto', md: '0' }}>
          <Box 
            p="xl" 
            $backgroundColor="#ffffff" 
            $border="1px solid #e2e8f0" 
            $borderRadius="8px"
            $height="100%"
          >
            <h4 style={{ marginTop: 0 }}>Main Content</h4>
            <p>This is the main content area that grows to fill available space.</p>
            <p>On mobile (xs), it takes full width and appears first.</p>
            <p>On desktop (md), it shares space with the sidebar using grow=1.</p>
          </Box>
        </Flex.Item>
        
        <Flex.Item shrink={0} basis={{ xs: 'auto', md: '300px' }}>
          <Box 
            p="xl" 
            $backgroundColor="#f8fafc" 
            $border="1px solid #e2e8f0" 
            $borderRadius="8px"
            $height="100%"
          >
            <h4 style={{ marginTop: 0 }}>Sidebar</h4>
            <p>Fixed 300px width on desktop.</p>
            <p>Full width on mobile.</p>
          </Box>
        </Flex.Item>
      </Flex>
    </Box>
  ),
};

/**
 * Equal width columns using flex=1.
 * /
export const EqualColumns: Story = {
  render: () => (
    <Flex gap="lg">
      <Flex.Item flex={1}>
        <Box p="xl" $backgroundColor="#dbeafe" $border="2px solid #3b82f6" $borderRadius="8px">
          <h4 style={{ marginTop: 0 }}>Column 1</h4>
          <p style={{ marginBottom: 0 }}>flex=1</p>
        </Box>
      </Flex.Item>
      <Flex.Item flex={1}>
        <Box p="xl" $backgroundColor="#fce7f3" $border="2px solid #ec4899" $borderRadius="8px">
          <h4 style={{ marginTop: 0 }}>Column 2</h4>
          <p style={{ marginBottom: 0 }}>flex=1</p>
        </Box>
      </Flex.Item>
      <Flex.Item flex={1}>
        <Box p="xl" $backgroundColor="#d1fae5" $border="2px solid #10b981" $borderRadius="8px">
          <h4 style={{ marginTop: 0 }}>Column 3</h4>
          <p style={{ marginBottom: 0 }}>flex=1</p>
        </Box>
      </Flex.Item>
    </Flex>
  ),
};

/**
 * Form layout using Flex for label-input pairs.
 * /
export const FormLayout: Story = {
  render: () => (
    <Box $maxWidth="500px" p="xl" $backgroundColor="#ffffff" $border="1px solid #e2e8f0" $borderRadius="12px">
      <h3 style={{ marginTop: 0 }}>Contact Form</h3>
      
      <Flex direction="column" gap="lg">
        <Flex direction="column" gap="xs">
          <label style={{ fontWeight: '600', fontSize: '14px' }}>Name</label>
          <input 
            type="text" 
            placeholder="John Doe"
            style={{ padding: '10px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '16px' }}
          />
        </Flex>
        
        <Flex direction="column" gap="xs">
          <label style={{ fontWeight: '600', fontSize: '14px' }}>Email</label>
          <input 
            type="email" 
            placeholder="john@example.com"
            style={{ padding: '10px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '16px' }}
          />
        </Flex>
        
        <Flex direction="column" gap="xs">
          <label style={{ fontWeight: '600', fontSize: '14px' }}>Message</label>
          <textarea 
            placeholder="Your message..."
            rows={4}
            style={{ padding: '10px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '16px', fontFamily: 'inherit' }}
          />
        </Flex>
        
        <Flex justify="flex-end" gap="sm">
          <button style={{ padding: '10px 20px', borderRadius: '6px', border: '1px solid #d1d5db', background: 'white', cursor: 'pointer' }}>
            Cancel
          </button>
          <button style={{ padding: '10px 20px', borderRadius: '6px', border: 'none', background: '#3b82f6', color: 'white', cursor: 'pointer', fontWeight: '600' }}>
            Submit
          </button>
        </Flex>
      </Flex>
    </Box>
  ),
};

*/