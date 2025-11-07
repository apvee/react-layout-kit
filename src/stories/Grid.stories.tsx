import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Grid } from '../components/Grid';
import type { GridProps } from '../components/Grid/Grid.types';

const meta: Meta<GridProps> = {
  title: 'Components/Layouts/Grid',
  component: Grid,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
A comprehensive CSS Grid layout component with configurable columns and responsive behavior for creating structured layouts.

## Key Features

- **12-Column System**: Default 12-column grid system (configurable to any number)
- **Grid.Col Sub-Component**: Precise control over individual grid items with span, offset, and order
- **Flexible Gutters**: Configurable gap between grid items using spacing scale or custom values
- **Alignment Control**: Full control over align-items and justify-content
- **Growing Columns**: Optional grow mode where last row columns expand to fill space
- **Responsive Values**: All props support responsive breakpoint objects for adaptive layouts
- **Container-Aware**: Measures container width for accurate responsive resolution
- **Performance Optimized**: Memoized calculations for efficient re-renders
- **Composition Ready**: Extends Box component with all layout props (margin, padding, size, etc.)

## When to Use

- **Dashboard Layouts**: Multi-column dashboards with cards of varying sizes
- **Form Layouts**: Two-column forms with labels and inputs aligned
- **Product Galleries**: Image galleries with consistent grid structure
- **Magazine Layouts**: Editorial content with multi-column article layouts
- **Card Grids**: Content cards arranged in structured grid patterns
- **Responsive Tables**: Tabular data that adapts to different screen sizes
- **Settings Panels**: Configuration interfaces with structured layouts
- **Profile Pages**: User profiles with sidebar and main content grid
- **Portfolio Grids**: Work showcase with varying item sizes
- **Admin Panels**: Complex admin interfaces with structured sections

## When NOT to Use

- **Simple Vertical Stacks**: Use Stack component instead (simpler API)
- **Simple Horizontal Rows**: Use Group or Flex instead (simpler)
- **Equal-Width Auto-Wrapping**: Use SimpleGrid for automatic equal columns
- **Complex Named Areas**: Use AreaGrid for template-based layouts with named regions
- **Single-Direction Flows**: Use Flex for one-dimensional layouts

## Grid vs Other Components

### Grid vs Flex
- **Grid**: Two-dimensional layouts (rows AND columns), grid template-based sizing
- **Flex**: One-dimensional layouts (row OR column), content-based sizing
- **Grid**: Column system with span/offset
- **Flex**: Flexible growth with flex/grow/shrink

### Grid vs SimpleGrid
- **Grid**: Explicit column control with Grid.Col span and offset
- **SimpleGrid**: Automatic equal-width columns, simpler API
- **Grid**: Better for complex layouts with varying column sizes
- **SimpleGrid**: Better for uniform item grids

### Grid vs AreaGrid
- **Grid**: Column-based layout with numeric spans
- **AreaGrid**: Named area template-based layout
- **Grid**: More flexible for dynamic content
- **AreaGrid**: Better for fixed, named layout regions

## Column System Explained

The Grid uses a **12-column system** by default (configurable via \`columns\` prop):

### How It Works
- Grid container divides space into equal columns (default: 12)
- Grid.Col items span across one or more columns
- Column widths are calculated as fractions: \`span={6}\` = 50% width (6/12)
- Multiple Grid.Col items automatically wrap to new rows

### Column Spanning
\`\`\`tsx
<Grid columns={12}>
  <Grid.Col span={12}>Full width (100%)</Grid.Col>
  <Grid.Col span={6}>Half width (50%)</Grid.Col>
  <Grid.Col span={6}>Half width (50%)</Grid.Col>
  <Grid.Col span={4}>Third width (33.33%)</Grid.Col>
  <Grid.Col span={4}>Third width (33.33%)</Grid.Col>
  <Grid.Col span={4}>Third width (33.33%)</Grid.Col>
  <Grid.Col span={3}>Quarter width (25%)</Grid.Col>
</Grid>
\`\`\`

### Custom Column Count
\`\`\`tsx
// 6-column grid instead of 12
<Grid columns={6}>
  <Grid.Col span={2}>Spans 2 of 6 columns (33.33%)</Grid.Col>
  <Grid.Col span={4}>Spans 4 of 6 columns (66.67%)</Grid.Col>
</Grid>
\`\`\`

## Grid.Col Component

The Grid.Col sub-component provides precise control over individual grid items:

### Properties
- **span** (default: 12): Number of columns this item spans
- **offset**: Number of columns to skip before this item starts
- **order**: Visual order of item (for reordering items)

### Common Patterns
\`\`\`tsx
// Full width item
<Grid.Col span={12}>Full width</Grid.Col>

// Half width items
<Grid.Col span={6}>Left half</Grid.Col>
<Grid.Col span={6}>Right half</Grid.Col>

// Offset for centering
<Grid.Col span={8} offset={2}>Centered content (8 cols, 2 offset each side)</Grid.Col>

// Custom ordering
<Grid.Col span={6} order={2}>Shows second (visually)</Grid.Col>
<Grid.Col span={6} order={1}>Shows first (visually)</Grid.Col>

// Responsive spans
<Grid.Col span={{ xs: 12, md: 6, lg: 4 }}>Responsive width</Grid.Col>
\`\`\`

## Gutter System

Gutters use the same spacing scale as margin and padding:
- **xs**: 4px - Very tight spacing
- **sm**: 8px - Tight spacing  
- **md**: 16px - Comfortable spacing
- **lg**: 24px - Loose spacing
- **xl**: 32px - Very loose spacing
- **xxl**: 48px - Extra loose spacing

You can also use custom CSS values: \`gutter="2rem"\`, \`gutter="20px"\`

## Alignment Explained

### \`align\` (Cross-Axis / Vertical)
Controls vertical alignment of items within rows:
- **stretch** (default): Items stretch to fill row height
- **start**: Items align to top of row
- **end**: Items align to bottom of row
- **center**: Items center vertically in row
- **baseline**: Items align by text baseline

### \`justify\` (Main-Axis / Horizontal)
Controls horizontal distribution of items:
- **flex-start** (default): Items start at left
- **flex-end**: Items align to right
- **center**: Items center horizontally
- **space-between**: First item at left, last at right, even spacing
- **space-around**: Equal space around each item
- **space-evenly**: Equal space between and around items

## Grow Behavior

When \`grow={true}\`, columns in the last row expand to fill remaining space:
\`\`\`tsx
<Grid grow>
  <Grid.Col span={4}>Item 1</Grid.Col>
  <Grid.Col span={4}>Item 2</Grid.Col>
  <Grid.Col span={4}>Item 3 (last row, will grow)</Grid.Col>
</Grid>
\`\`\`

## Responsive Patterns

All props support responsive values using breakpoint objects:

\`\`\`tsx
<Grid 
  columns={{ xs: 1, sm: 2, md: 3, lg: 4 }}
  gutter={{ xs: "sm", md: "md", lg: "lg" }}
>
  <Grid.Col span={{ xs: 1, md: 1 }}>Responsive item</Grid.Col>
</Grid>
\`\`\`

**Breakpoints**:
- \`xs\`: 0px - 640px
- \`sm\`: 640px - 768px
- \`md\`: 768px - 1024px
- \`lg\`: 1024px - 1280px
- \`xl\`: 1280px - 1536px
- \`xxl\`: 1536px+

## Best Practices

**Do:**
- ✅ Use Grid for layouts that need structured column control
- ✅ Use 12-column system for maximum flexibility
- ✅ Use Grid.Col span to control item widths
- ✅ Use offset to create asymmetric layouts and centering
- ✅ Stick to spacing scale (xs, sm, md, lg, xl, xxl) for consistency
- ✅ Use responsive values to adapt layouts across breakpoints
- ✅ Use grow for flexible last row behavior
- ✅ Combine with Box props for margins and padding

**Don't:**
- ❌ Use Grid when SimpleGrid would be simpler (equal-width items)
- ❌ Use Grid when Stack or Flex would be simpler (single direction)
- ❌ Forget that span is relative to columns prop
- ❌ Mix spacing units inconsistently across Grids
- ❌ Nest too many Grid levels (impacts performance)
- ❌ Overcomplicate with too many responsive breakpoints
- ❌ Use Grid.Col without understanding span system
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    // Component-specific props
    columns: {
      control: 'number',
      description: 'Number of columns in the grid',
      table: {
        category: 'Component',
        type: { summary: 'ResponsiveValue<number>' },
        defaultValue: { summary: '12' },
      },
    },
    gutter: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'],
      description: 'Gap between grid items. Use spacing scale keys or custom CSS values',
      table: {
        category: 'Component',
        type: { summary: 'ResponsiveValue<string>' },
        defaultValue: { summary: '"1rem"' },
      },
    },
    align: {
      control: 'select',
      options: ['stretch', 'start', 'end', 'center', 'baseline'],
      description: 'Vertical alignment of items within rows',
      table: {
        category: 'Component',
        type: { summary: 'ResponsiveValue<CSS.Property.AlignItems>' },
        defaultValue: { summary: 'stretch' },
      },
    },
    justify: {
      control: 'select',
      options: ['flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'space-evenly'],
      description: 'Horizontal distribution of items',
      table: {
        category: 'Component',
        type: { summary: 'ResponsiveValue<CSS.Property.JustifyContent>' },
        defaultValue: { summary: 'flex-start' },
      },
    },
    grow: {
      control: 'boolean',
      description: 'When true, columns in last row expand to fill available space',
      table: {
        category: 'Component',
        type: { summary: 'ResponsiveValue<boolean>' },
        defaultValue: { summary: 'false' },
      },
    },
    overflow: {
      control: 'select',
      options: ['visible', 'hidden', 'scroll', 'auto'],
      description: 'Overflow behavior of the grid container',
      table: {
        category: 'Component',
        type: { summary: 'ResponsiveValue<CSS.Property.Overflow>' },
        defaultValue: { summary: 'visible' },
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
type Story = StoryObj<GridProps>;

export const Usage: Story = {
  args: {
    columns: 12,
    gutter: 'md',
    align: 'stretch',
    justify: 'flex-start',
  },
  render: (args: GridProps) => (
    <div style={{ width: '100%', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Hero Section */}
      <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1rem', color: '#1a1a1a' }}>
          Grid Component
        </h1>
        <p style={{ fontSize: '1.125rem', color: '#666', maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>
          Comprehensive CSS Grid layout with 12-column system. Perfect for dashboards, forms, galleries, and structured layouts.
        </p>
      </div>

      {/* Interactive Demo */}
      <div style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: '#333' }}>
          Interactive Demo
        </h2>
        <p style={{ fontSize: '0.875rem', color: '#666', marginBottom: '1.5rem' }}>
          Adjust <strong>columns</strong>, <strong>gutter</strong>, <strong>align</strong>, and <strong>justify</strong> to see how Grid adapts.
        </p>
        <div style={{
          padding: '2rem',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px',
        }}>
          <Grid
            {...args}
            style={{
              backgroundColor: '#ffffff',
              padding: '1.5rem',
              borderRadius: '8px',
              border: '1px solid #e0e0e0',
            }}
          >
            {Array.from({ length: 6 }, (_, i) => (
              <Grid.Col
                key={i}
                span={i === 0 ? 12 : i === 1 || i === 2 ? 6 : 4}
                style={{
                  padding: '1rem',
                  backgroundColor: ['#1890ff', '#52c41a', '#fa8c16', '#eb2f96', '#722ed1', '#13c2c2'][i],
                  color: 'white',
                  borderRadius: '4px',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  textAlign: 'center',
                }}
              >
                Span {i === 0 ? 12 : i === 1 || i === 2 ? 6 : 4}
              </Grid.Col>
            ))}
          </Grid>
        </div>
      </div>

      {/* Real-World Examples */}
      <div style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: '#333' }}>
          Real-World Examples
        </h2>

        {/* Dashboard Layout */}
        <div style={{ marginBottom: '2.5rem' }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.75rem', color: '#1890ff' }}>
            📊 Dashboard Layout
          </h3>
          <Grid columns={12} gutter={args.gutter}>
            {/* Full width header */}
            <Grid.Col span={12} style={{ backgroundColor: '#1890ff', color: 'white', padding: '1.5rem', borderRadius: '8px', textAlign: 'center', fontWeight: '600' }}>
              Dashboard Header (span 12)
            </Grid.Col>
            
            {/* Three equal cards */}
            <Grid.Col span={4} style={{ backgroundColor: '#f0f5ff', padding: '1.5rem', borderRadius: '8px', border: '1px solid #91d5ff' }}>
              <div style={{ fontSize: '0.75rem', color: '#8c8c8c', marginBottom: '0.5rem' }}>TOTAL USERS</div>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1890ff' }}>1,234</div>
              <div style={{ fontSize: '0.875rem', color: '#52c41a', marginTop: '0.5rem' }}>↑ 12% from last month</div>
            </Grid.Col>
            <Grid.Col span={4} style={{ backgroundColor: '#f6ffed', padding: '1.5rem', borderRadius: '8px', border: '1px solid #b7eb8f' }}>
              <div style={{ fontSize: '0.75rem', color: '#8c8c8c', marginBottom: '0.5rem' }}>REVENUE</div>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#52c41a' }}>$45.2K</div>
              <div style={{ fontSize: '0.875rem', color: '#52c41a', marginTop: '0.5rem' }}>↑ 8% from last month</div>
            </Grid.Col>
            <Grid.Col span={4} style={{ backgroundColor: '#fff7e6', padding: '1.5rem', borderRadius: '8px', border: '1px solid #ffd591' }}>
              <div style={{ fontSize: '0.75rem', color: '#8c8c8c', marginBottom: '0.5rem' }}>ORDERS</div>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#fa8c16' }}>567</div>
              <div style={{ fontSize: '0.875rem', color: '#ff4d4f', marginTop: '0.5rem' }}>↓ 3% from last month</div>
            </Grid.Col>
            
            {/* Two column content */}
            <Grid.Col span={8} style={{ backgroundColor: '#fafafa', padding: '1.5rem', borderRadius: '8px', border: '1px solid #f0f0f0' }}>
              <h4 style={{ margin: '0 0 1rem 0', color: '#262626' }}>Main Chart Area (span 8)</h4>
              <div style={{ height: '200px', backgroundColor: '#f0f0f0', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8c8c8c' }}>
                Chart Placeholder
              </div>
            </Grid.Col>
            <Grid.Col span={4} style={{ backgroundColor: '#fafafa', padding: '1.5rem', borderRadius: '8px', border: '1px solid #f0f0f0' }}>
              <h4 style={{ margin: '0 0 1rem 0', color: '#262626' }}>Sidebar (span 4)</h4>
              <div style={{ fontSize: '0.875rem', color: '#666', lineHeight: '1.6' }}>
                Recent activity, notifications, or other sidebar content goes here.
              </div>
            </Grid.Col>
          </Grid>
        </div>

        {/* Form Grid */}
        <div style={{ marginBottom: '2.5rem' }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.75rem', color: '#52c41a' }}>
            📝 Form Grid Layout
          </h3>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <Grid columns={12} gutter={args.gutter} style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '8px', border: '1px solid #f0f0f0' }}>
              {/* Full width title */}
              <Grid.Col span={12}>
                <h3 style={{ margin: '0 0 1rem 0', color: '#262626' }}>User Information</h3>
              </Grid.Col>
              
              {/* Two column inputs */}
              <Grid.Col span={6}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500', color: '#595959' }}>
                  First Name
                </label>
                <input type="text" placeholder="John" style={{ width: '100%', padding: '0.75rem', border: '1px solid #d9d9d9', borderRadius: '6px', fontSize: '0.875rem', boxSizing: 'border-box' }} />
              </Grid.Col>
              <Grid.Col span={6}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500', color: '#595959' }}>
                  Last Name
                </label>
                <input type="text" placeholder="Doe" style={{ width: '100%', padding: '0.75rem', border: '1px solid #d9d9d9', borderRadius: '6px', fontSize: '0.875rem', boxSizing: 'border-box' }} />
              </Grid.Col>
              
              {/* Full width email */}
              <Grid.Col span={12}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500', color: '#595959' }}>
                  Email Address
                </label>
                <input type="email" placeholder="john@example.com" style={{ width: '100%', padding: '0.75rem', border: '1px solid #d9d9d9', borderRadius: '6px', fontSize: '0.875rem', boxSizing: 'border-box' }} />
              </Grid.Col>
              
              {/* Two column selects */}
              <Grid.Col span={6}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500', color: '#595959' }}>
                  Country
                </label>
                <select style={{ width: '100%', padding: '0.75rem', border: '1px solid #d9d9d9', borderRadius: '6px', fontSize: '0.875rem', boxSizing: 'border-box', backgroundColor: 'white' }}>
                  <option>United States</option>
                  <option>Canada</option>
                  <option>United Kingdom</option>
                </select>
              </Grid.Col>
              <Grid.Col span={6}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500', color: '#595959' }}>
                  Phone
                </label>
                <input type="tel" placeholder="+1 (555) 123-4567" style={{ width: '100%', padding: '0.75rem', border: '1px solid #d9d9d9', borderRadius: '6px', fontSize: '0.875rem', boxSizing: 'border-box' }} />
              </Grid.Col>
              
              {/* Submit button */}
              <Grid.Col span={12}>
                <button style={{ width: '100%', padding: '1rem', backgroundColor: '#52c41a', color: 'white', border: 'none', borderRadius: '6px', fontSize: '1rem', fontWeight: '600', cursor: 'pointer', marginTop: '0.5rem' }}>
                  Save Information
                </button>
              </Grid.Col>
            </Grid>
          </div>
        </div>

        {/* Offset Example */}
        <div style={{ marginBottom: '2.5rem' }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.75rem', color: '#fa8c16' }}>
            📐 Offset & Centering
          </h3>
          <Grid columns={12} gutter={args.gutter}>
            {/* Centered content with offset */}
            <Grid.Col span={8} offset={2} style={{ backgroundColor: '#fff7e6', padding: '1.5rem', borderRadius: '8px', border: '1px solid #ffd591', textAlign: 'center' }}>
              <h4 style={{ margin: '0 0 0.5rem 0', color: '#fa8c16' }}>Centered (span 8, offset 2)</h4>
              <p style={{ margin: 0, fontSize: '0.875rem', color: '#666' }}>
                2 columns offset on left, 8 columns width, 2 columns empty on right = centered
              </p>
            </Grid.Col>
            
            {/* Asymmetric layout with offsets */}
            <Grid.Col span={4} offset={1} style={{ backgroundColor: '#f0f5ff', padding: '1rem', borderRadius: '8px', border: '1px solid #91d5ff', textAlign: 'center' }}>
              <div style={{ fontSize: '0.875rem', color: '#1890ff', fontWeight: '600' }}>span 4, offset 1</div>
            </Grid.Col>
            <Grid.Col span={4} offset={2} style={{ backgroundColor: '#f6ffed', padding: '1rem', borderRadius: '8px', border: '1px solid #b7eb8f', textAlign: 'center' }}>
              <div style={{ fontSize: '0.875rem', color: '#52c41a', fontWeight: '600' }}>span 4, offset 2</div>
            </Grid.Col>
          </Grid>
        </div>

        {/* Responsive Grid */}
        <div style={{ marginBottom: '2.5rem' }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.75rem', color: '#722ed1' }}>
            📱 Responsive Grid
          </h3>
          <p style={{ fontSize: '0.875rem', color: '#666', marginBottom: '1rem' }}>
            Grid adapts: 1 column on mobile, 2 on tablet, 4 on desktop
          </p>
          <Grid columns={{ xs: 1, sm: 2, md: 4 }} gutter={args.gutter}>
            {['Product 1', 'Product 2', 'Product 3', 'Product 4'].map((label, i) => (
              <Grid.Col key={i} span={1} style={{ backgroundColor: '#f9f0ff', padding: '1.5rem', borderRadius: '8px', border: '1px solid #d3adf7' }}>
                <div style={{ width: '100%', height: '120px', backgroundColor: ['#722ed1', '#9254de', '#b37feb', '#d3adf7'][i], borderRadius: '6px', marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold' }}>
                  Image
                </div>
                <h4 style={{ margin: '0 0 0.5rem 0', color: '#722ed1', fontSize: '1rem' }}>{label}</h4>
                <p style={{ margin: 0, fontSize: '0.875rem', color: '#8c8c8c' }}>$29.99</p>
              </Grid.Col>
            ))}
          </Grid>
        </div>

        {/* Gallery */}
        <div style={{ marginBottom: '2.5rem' }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.75rem', color: '#eb2f96' }}>
            🖼️ Image Gallery
          </h3>
          <Grid columns={12} gutter={args.gutter}>
            {/* Varied span sizes for dynamic gallery */}
            <Grid.Col span={6} style={{ backgroundColor: '#fff0f6', height: '200px', borderRadius: '8px', border: '1px solid #ffadd2', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#eb2f96', fontWeight: '600' }}>
              Large (6)
            </Grid.Col>
            <Grid.Col span={6} style={{ backgroundColor: '#fff0f6', height: '200px', borderRadius: '8px', border: '1px solid #ffadd2', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#eb2f96', fontWeight: '600' }}>
              Large (6)
            </Grid.Col>
            <Grid.Col span={4} style={{ backgroundColor: '#fff0f6', height: '150px', borderRadius: '8px', border: '1px solid #ffadd2', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#eb2f96', fontWeight: '600' }}>
              Medium (4)
            </Grid.Col>
            <Grid.Col span={4} style={{ backgroundColor: '#fff0f6', height: '150px', borderRadius: '8px', border: '1px solid #ffadd2', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#eb2f96', fontWeight: '600' }}>
              Medium (4)
            </Grid.Col>
            <Grid.Col span={4} style={{ backgroundColor: '#fff0f6', height: '150px', borderRadius: '8px', border: '1px solid #ffadd2', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#eb2f96', fontWeight: '600' }}>
              Medium (4)
            </Grid.Col>
          </Grid>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      source: {
        state: 'open',
        code: `// Basic grid with 12 columns
<Grid columns={12} gutter="md">
  <Grid.Col span={12}>Full width</Grid.Col>
  <Grid.Col span={6}>Half</Grid.Col>
  <Grid.Col span={6}>Half</Grid.Col>
  <Grid.Col span={4}>Third</Grid.Col>
  <Grid.Col span={4}>Third</Grid.Col>
  <Grid.Col span={4}>Third</Grid.Col>
</Grid>

// Dashboard layout
<Grid columns={12} gutter="lg">
  <Grid.Col span={12}>Header</Grid.Col>
  <Grid.Col span={4}>Stat Card 1</Grid.Col>
  <Grid.Col span={4}>Stat Card 2</Grid.Col>
  <Grid.Col span={4}>Stat Card 3</Grid.Col>
  <Grid.Col span={8}>Main Chart</Grid.Col>
  <Grid.Col span={4}>Sidebar</Grid.Col>
</Grid>

// Form grid layout
<Grid columns={12} gutter="md">
  <Grid.Col span={6}>
    <Input label="First Name" />
  </Grid.Col>
  <Grid.Col span={6}>
    <Input label="Last Name" />
  </Grid.Col>
  <Grid.Col span={12}>
    <Input label="Email" />
  </Grid.Col>
</Grid>

// Centered content with offset
<Grid columns={12}>
  <Grid.Col span={8} offset={2}>
    Centered content
  </Grid.Col>
</Grid>

// Responsive columns
<Grid 
  columns={{ xs: 1, sm: 2, md: 3, lg: 4 }}
  gutter={{ xs: "sm", md: "lg" }}
>
  <Grid.Col span={1}>Item 1</Grid.Col>
  <Grid.Col span={1}>Item 2</Grid.Col>
  <Grid.Col span={1}>Item 3</Grid.Col>
  <Grid.Col span={1}>Item 4</Grid.Col>
</Grid>

// Custom column count
<Grid columns={6} gutter="lg">
  <Grid.Col span={2}>Sidebar (2 of 6)</Grid.Col>
  <Grid.Col span={4}>Main (4 of 6)</Grid.Col>
</Grid>

// Gallery with varied sizes
<Grid columns={12} gutter="sm">
  <Grid.Col span={6}>Large</Grid.Col>
  <Grid.Col span={6}>Large</Grid.Col>
  <Grid.Col span={4}>Medium</Grid.Col>
  <Grid.Col span={4}>Medium</Grid.Col>
  <Grid.Col span={4}>Medium</Grid.Col>
</Grid>

// With alignment
<Grid 
  columns={12}
  gutter="md"
  align="center"
  justify="space-between"
>
  <Grid.Col span={4}>Item</Grid.Col>
  <Grid.Col span={4}>Item</Grid.Col>
</Grid>

// Growing last row
<Grid columns={12} gutter="md" grow>
  <Grid.Col span={4}>Item 1</Grid.Col>
  <Grid.Col span={4}>Item 2</Grid.Col>
  <Grid.Col span={4}>Item 3 (grows)</Grid.Col>
</Grid>

// With Box props (margin, padding)
<Grid
  columns={12}
  gutter="md"
  p="lg"
  m="xl"
  style={{ backgroundColor: '#f8f9fa' }}
>
  <Grid.Col span={12}>Content</Grid.Col>
</Grid>`,
      },
    },
  },
};
