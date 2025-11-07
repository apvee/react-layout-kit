import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Flex } from '../components/Flex';
import type { FlexProps } from '../components/Flex/Flex.types';

const meta: Meta<FlexProps> = {
  title: 'Components/Layouts/Flex',
  component: Flex,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
A comprehensive flexbox layout component with full CSS flexbox control for composing responsive layouts.

## Key Features

- **Full Flexbox Control**: Complete control over flex-direction, align-items, justify-content, flex-wrap, and gaps
- **Spacing Scale Integration**: Gap, rowGap, and columnGap use predefined spacing scale (xs, sm, md, lg, xl, xxl) or custom CSS values
- **Bidirectional Layouts**: Supports both row (horizontal) and column (vertical) flex directions
- **Advanced Gap Control**: Independent control of row and column gaps with rowGap and columnGap
- **Flex Item Component**: Flex.Item sub-component for precise flex item control (flex, grow, shrink, basis, alignSelf, order)
- **Responsive Values**: All props support responsive breakpoint objects for adaptive layouts
- **Container-Aware**: Measures container width for accurate responsive resolution
- **Performance Optimized**: Memoized calculations for efficient re-renders
- **Composition Ready**: Extends Box component with all layout props (margin, padding, size, etc.)

## When to Use

- **Navigation Bars**: Horizontal headers with logo, menu, and actions
- **Button Groups**: Toolbars, action buttons, form controls aligned horizontally
- **Card Layouts**: Horizontal or vertical card arrangements with flexible spacing
- **Sidebar Layouts**: Two-column layouts with flexible main content area
- **Form Rows**: Inline form controls (label + input + button)
- **Media Objects**: Image/icon alongside content with flexible alignment
- **App Shells**: Header-Main-Footer layouts with flexible content areas
- **Responsive Layouts**: Layouts that switch between row and column based on screen size
- **Flex Item Control**: When you need precise control over individual item flex behavior
- **Toolbars & Menus**: Horizontal action bars with space-between or space-around distribution

## When NOT to Use

- **Simple Vertical Stacks**: Use Stack component instead (simpler API, direction locked to column)
- **Simple Horizontal Groups**: Use Group component instead (simpler API, direction locked to row)
- **Equal-Width Grids**: Use SimpleGrid for automatic equal-width columns
- **Complex Grid Layouts**: Use Grid or AreaGrid for multi-row/column layouts with precise control

## Flex vs Other Components

### Flex vs Stack
- **Flex**: Configurable direction (row/column/row-reverse/column-reverse), full flexbox control
- **Stack**: Direction locked to column, simpler API for vertical layouts only

### Flex vs Group
- **Flex**: Configurable direction and full flex properties
- **Group**: Direction locked to row, simpler API for horizontal layouts only

### Flex vs Grid
- **Flex**: One-dimensional layouts (row OR column), content-based sizing
- **Grid**: Two-dimensional layouts (rows AND columns), grid template-based sizing

### Flex vs SimpleGrid
- **Flex**: Flexible content-based layouts, items can have different sizes
- **SimpleGrid**: Equal-width items in a grid, automatic wrapping

## Direction Explained

Controls the main axis direction for flex items:
- **row** (default): Items flow left to right horizontally
- **row-reverse**: Items flow right to left horizontally
- **column**: Items flow top to bottom vertically
- **column-reverse**: Items flow bottom to top vertically

## Alignment Explained

### \`align\` (Cross-Axis)
Controls alignment perpendicular to the main axis:
- **direction: row** → align controls vertical alignment
- **direction: column** → align controls horizontal alignment

Options: stretch (default), flex-start, flex-end, center, baseline

### \`justify\` (Main-Axis)
Controls distribution along the main axis:
- **direction: row** → justify controls horizontal distribution
- **direction: column** → justify controls vertical distribution

Options: flex-start (default), flex-end, center, space-between, space-around, space-evenly

## Gap System

Gap uses the same spacing scale as margin and padding:
- **xs**: 4px - Very tight spacing
- **sm**: 8px - Tight spacing
- **md**: 16px - Default comfortable spacing
- **lg**: 24px - Loose spacing
- **xl**: 32px - Very loose spacing
- **xxl**: 48px - Extra loose spacing

### Advanced Gap Control
- \`gap\`: Sets both row and column gaps
- \`rowGap\`: Controls gap between rows (overrides gap)
- \`columnGap\`: Controls gap between columns (overrides gap)

## Flex.Item Component

The Flex.Item sub-component provides precise control over individual flex items:

### Properties
- **flex**: Shorthand for grow, shrink, and basis (e.g., \`flex={1}\`, \`flex="1 1 auto"\`)
- **grow**: How much item grows relative to siblings (e.g., \`grow={1}\`, \`grow={2}\`)
- **shrink**: How much item shrinks when space is limited (e.g., \`shrink={0}\`, \`shrink={1}\`)
- **basis**: Initial main size before flex growth/shrink (e.g., \`basis="200px"\`, \`basis="auto"\`)
- **alignSelf**: Override parent align for this item (e.g., \`alignSelf="flex-start"\`)
- **order**: Visual order of item (e.g., \`order={1}\`, \`order={-1}\`)

## Wrap Behavior

Controls whether items wrap to new lines:
- **nowrap** (default): All items on one line, may overflow
- **wrap**: Items wrap to multiple rows/columns as needed
- **wrap-reverse**: Items wrap in reverse order

## Responsive Patterns

All props support responsive values using breakpoint objects:
- \`xs\`: 0px - 640px
- \`sm\`: 640px - 768px
- \`md\`: 768px - 1024px
- \`lg\`: 1024px - 1280px
- \`xl\`: 1280px - 1536px
- \`xxl\`: 1536px+

## Best Practices

**Do:**
- ✅ Use Flex for layouts that need full flexbox control
- ✅ Use direction="row" for horizontal layouts, direction="column" for vertical
- ✅ Use Flex.Item when you need precise flex item control
- ✅ Stick to spacing scale (xs, sm, md, lg, xl, xxl) for consistency
- ✅ Use responsive values to adapt layouts across breakpoints
- ✅ Use wrap="wrap" for button groups and tag lists that may overflow
- ✅ Use justify="space-between" for navbars and toolbars
- ✅ Combine with Box props for margins and padding

**Don't:**
- ❌ Use Flex when Stack or Group would be simpler
- ❌ Forget that align and justify swap meaning based on direction
- ❌ Mix spacing units inconsistently across Flex containers
- ❌ Nest too many Flex levels (impacts performance)
- ❌ Use for grid-style layouts (use Grid or SimpleGrid instead)
- ❌ Overcomplicate with too many responsive breakpoints
- ❌ Use Flex.Item without understanding flex grow/shrink behavior
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    // Component-specific props
    align: {
      control: 'select',
      options: ['stretch', 'flex-start', 'flex-end', 'center', 'baseline'],
      description: 'Cross-axis alignment of items (perpendicular to direction)',
      table: {
        category: 'Component',
        type: { summary: 'ResponsiveValue<CSS.Property.AlignItems>' },
        defaultValue: { summary: 'stretch' },
      },
    },
    justify: {
      control: 'select',
      options: ['flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'space-evenly'],
      description: 'Main-axis distribution of items (along direction)',
      table: {
        category: 'Component',
        type: { summary: 'ResponsiveValue<CSS.Property.JustifyContent>' },
        defaultValue: { summary: 'flex-start' },
      },
    },
    direction: {
      control: 'select',
      options: ['row', 'row-reverse', 'column', 'column-reverse'],
      description: 'Main axis direction for flex items',
      table: {
        category: 'Component',
        type: { summary: 'ResponsiveValue<CSS.Property.FlexDirection>' },
        defaultValue: { summary: 'row' },
      },
    },
    wrap: {
      control: 'select',
      options: ['nowrap', 'wrap', 'wrap-reverse'],
      description: 'Whether items wrap to new lines',
      table: {
        category: 'Component',
        type: { summary: 'ResponsiveValue<CSS.Property.FlexWrap>' },
        defaultValue: { summary: 'nowrap' },
      },
    },
    gap: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'],
      description: 'Gap between all flex items (both row and column). Use spacing scale keys or custom CSS values',
      table: {
        category: 'Component',
        type: { summary: 'ResponsiveValue<SpacingValue>' },
        defaultValue: { summary: 'undefined' },
      },
    },
    rowGap: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'],
      description: 'Gap between rows. Overrides gap for row spacing',
      table: {
        category: 'Component',
        type: { summary: 'ResponsiveValue<SpacingValue>' },
        defaultValue: { summary: 'undefined (uses gap)' },
      },
    },
    columnGap: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'],
      description: 'Gap between columns. Overrides gap for column spacing',
      table: {
        category: 'Component',
        type: { summary: 'ResponsiveValue<SpacingValue>' },
        defaultValue: { summary: 'undefined (uses gap)' },
      },
    },
    containerWidth: {
      control: 'number',
      description: 'Container width for responsive calculations. Auto-measured if not provided',
      table: {
        category: 'Responsive',
        type: { summary: 'number' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<FlexProps>;

export const Usage: Story = {
  args: {
    direction: 'row',
    align: 'center',
    justify: 'flex-start',
    gap: 'md',
  },
  render: (args: FlexProps) => (
    <div style={{ width: '100%', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Hero Section */}
      <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1rem', color: '#1a1a1a' }}>
          Flex Component
        </h1>
        <p style={{ fontSize: '1.125rem', color: '#666', maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>
          Comprehensive flexbox control for building responsive layouts. Perfect for navbars, button groups, card layouts, and any layout requiring precise flex control.
        </p>
      </div>

      {/* Interactive Demo */}
      <div style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: '#333' }}>
          Interactive Demo
        </h2>
        <p style={{ fontSize: '0.875rem', color: '#666', marginBottom: '1.5rem' }}>
          Adjust <strong>direction</strong>, <strong>align</strong>, <strong>justify</strong>, and <strong>gap</strong> to see how Flex adapts.
        </p>
        <div style={{
          padding: '2rem',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px',
        }}>
          <Flex
            {...args}
            style={{
              backgroundColor: '#ffffff',
              padding: '1.5rem',
              borderRadius: '8px',
              border: '1px solid #e0e0e0',
              minHeight: '200px',
            }}
          >
            {Array.from({ length: 4 }, (_, i) => (
              <div
                key={i}
                style={{
                  padding: '1rem',
                  backgroundColor: ['#1890ff', '#52c41a', '#fa8c16', '#eb2f96'][i],
                  color: 'white',
                  borderRadius: '4px',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                }}
              >
                Item {i + 1}
              </div>
            ))}
          </Flex>
        </div>
      </div>

      {/* Real-World Examples */}
      <div style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: '#333' }}>
          Real-World Examples
        </h2>

        {/* Navigation Bar */}
        <div style={{ marginBottom: '2.5rem' }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.75rem', color: '#1890ff' }}>
            🧭 Navigation Bar
          </h3>
          <Flex
            direction="row"
            justify="space-between"
            align="center"
            style={{
              backgroundColor: '#001529',
              padding: '1rem 1.5rem',
              borderRadius: '8px',
            }}
          >
            <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#fff' }}>
              🚀 MyApp
            </div>
            <Flex gap="lg" align="center">
              <a href="#" style={{ color: '#fff', textDecoration: 'none', fontSize: '0.875rem' }}>Home</a>
              <a href="#" style={{ color: '#fff', textDecoration: 'none', fontSize: '0.875rem' }}>Products</a>
              <a href="#" style={{ color: '#fff', textDecoration: 'none', fontSize: '0.875rem' }}>About</a>
            </Flex>
            <button style={{ padding: '0.5rem 1rem', backgroundColor: '#1890ff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
              Sign In
            </button>
          </Flex>
        </div>

        {/* Button Group */}
        <div style={{ marginBottom: '2.5rem' }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.75rem', color: '#52c41a' }}>
            🎯 Button Group
          </h3>
          <Flex gap="sm" wrap="wrap">
            {['Save', 'Cancel', 'Preview', 'Delete'].map((label) => (
              <button key={label} style={{ padding: '0.5rem 1rem', backgroundColor: '#1890ff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                {label}
              </button>
            ))}
          </Flex>
        </div>

        {/* Flex.Item Layout */}
        <div style={{ marginBottom: '2.5rem' }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.75rem', color: '#fa8c16' }}>
            📐 Flex.Item - Sidebar + Main
          </h3>
          <Flex gap="lg" style={{ minHeight: '250px' }}>
            <Flex.Item shrink={0} basis="250px" style={{ backgroundColor: '#f0f0f0', padding: '1.5rem', borderRadius: '8px' }}>
              <h4 style={{ margin: '0 0 1rem 0' }}>Sidebar</h4>
              <div style={{ fontSize: '0.875rem', color: '#666' }}>
                Fixed width sidebar<br/><code>shrink={'{0}'}</code><br/><code>basis="250px"</code>
              </div>
            </Flex.Item>
            <Flex.Item flex={1} style={{ backgroundColor: '#fff', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e0e0e0' }}>
              <h4 style={{ margin: '0 0 1rem 0' }}>Main Content</h4>
              <div style={{ fontSize: '0.875rem', color: '#666' }}>
                Flexible main content area<br/><code>flex={'{1}'}</code>
              </div>
            </Flex.Item>
          </Flex>
        </div>

        {/* Responsive */}
        <div style={{ marginBottom: '2.5rem' }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.75rem', color: '#722ed1' }}>
            📱 Responsive Layout
          </h3>
          <Flex direction={{ xs: 'column', md: 'row' }} gap={{ xs: 'sm', md: 'lg' }}>
            {['Feature 1', 'Feature 2', 'Feature 3'].map((label, i) => (
              <div key={i} style={{ flex: 1, backgroundColor: '#f8f9fa', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e0e0e0' }}>
                <h4 style={{ margin: '0 0 0.5rem 0' }}>{label}</h4>
                <p style={{ margin: 0, fontSize: '0.875rem', color: '#666' }}>Responsive direction</p>
              </div>
            ))}
          </Flex>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      source: {
        state: 'open',
        code: `// Basic usage
<Flex direction="row" gap="md" align="center">
  <div>Item 1</div>
  <div>Item 2</div>
</Flex>

// Navigation bar
<Flex justify="space-between" align="center">
  <Logo />
  <Navigation />
  <UserMenu />
</Flex>

// Button group with wrapping
<Flex gap="sm" wrap="wrap">
  <button>Save</button>
  <button>Cancel</button>
</Flex>

// Two column layout with Flex.Item
<Flex gap="lg">
  <Flex.Item shrink={0} basis="250px">
    <Sidebar />
  </Flex.Item>
  <Flex.Item flex={1}>
    <MainContent />
  </Flex.Item>
</Flex>

// Responsive layout
<Flex 
  direction={{ xs: "column", md: "row" }}
  gap={{ xs: "sm", md: "lg" }}
>
  <Feature1 />
  <Feature2 />
</Flex>`,
      },
    },
  },
};
