import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { SimpleGrid } from '../components/SimpleGrid';
import type { SimpleGridProps } from '../components/SimpleGrid/SimpleGrid.types';

const meta: Meta<SimpleGridProps> = {
  title: 'Components/Layouts/SimpleGrid',
  component: SimpleGrid,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
A responsive grid component where each item takes equal amount of space, perfect for creating consistent layouts.

## Key Features

- **Equal-Width Items**: Every child takes the same fraction of available space using CSS Grid fractional units
- **Responsive Columns**: Column count adapts to different breakpoints with responsive value objects
- **Flexible Spacing**: Predefined spacing scale ('xs', 'sm', 'md', 'lg', 'xl', 'xxl') or custom CSS values
- **Independent Gap Control**: Separate horizontal (spacing) and vertical (verticalSpacing) gap configuration
- **Container-Aware**: Uses container width measurement for accurate responsive resolution
- **Performance Optimized**: Memoized calculations for efficient re-renders
- **Type-Safe**: Full TypeScript support with responsive value types
- **Composition Ready**: Extends Box component with all layout props available

## When to Use

- **Product Card Grids**: E-commerce product listings with consistent card sizes
- **Image Galleries**: Photo grids, portfolios, media libraries
- **Feature Showcases**: Landing page feature sections with equal-sized cards
- **Dashboard Statistics**: Metric cards and KPI displays
- **Blog Post Grids**: Article previews with uniform layout
- **Team Member Cards**: About us pages with team member profiles
- **Pricing Tables**: Side-by-side pricing plans
- **Icon Libraries**: Tool palettes and icon showcases
- **Video Thumbnails**: YouTube-style video grids
- **App Launchers**: Application grids similar to iOS/Android home screens

## Grid Template Explained

SimpleGrid uses CSS Grid with the template:
\`\`\`css
grid-template-columns: repeat(cols, 1fr);
\`\`\`

This creates \`cols\` number of columns where each column takes **1 fractional unit** of available space. All items automatically stretch to fill their column width equally.

**Example**: With \`cols={3}\`, you get three equal columns each taking 33.33% width.

## Spacing System

### Predefined Scale Keys
The spacing scale provides consistent gaps across your application:
- \`xs\`: Extra small gap (4px)
- \`sm\`: Small gap (8px)
- \`md\`: Medium gap (16px) - recommended default
- \`lg\`: Large gap (24px)
- \`xl\`: Extra large gap (32px)
- \`xxl\`: Double extra large gap (48px)

### Custom CSS Values
You can also use any valid CSS value:
- \`spacing="2rem"\` - rem units
- \`spacing="20px"\` - pixel units
- \`spacing="5%"\` - percentage units

### Asymmetric Gaps
Use \`spacing\` for horizontal gaps and \`verticalSpacing\` for different vertical gaps:
\`\`\`tsx
<SimpleGrid spacing="lg" verticalSpacing="sm">
  {/* Wide horizontal gaps, tight vertical gaps */}
</SimpleGrid>
\`\`\`

## Responsive Patterns

All props support responsive values using breakpoint objects:

\`\`\`tsx
<SimpleGrid 
  cols={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 6 }}
  spacing={{ xs: 'sm', md: 'md', lg: 'lg' }}
>
  {/* Adapts to screen size */}
</SimpleGrid>
\`\`\`

**Breakpoints**:
- \`xs\`: 0px - 640px
- \`sm\`: 640px - 768px
- \`md\`: 768px - 1024px
- \`lg\`: 1024px - 1280px
- \`xl\`: 1280px - 1536px
- \`xxl\`: 1536px+

## SimpleGrid vs Grid

**Use SimpleGrid when**:
- ✅ All items should have equal width
- ✅ You want automatic column wrapping
- ✅ Simple, consistent layouts are the goal
- ✅ You need quick, responsive grids

**Use Grid when**:
- ✅ You need custom column spans
- ✅ Items should have different widths
- ✅ Complex, asymmetric layouts are required
- ✅ You need precise grid template control

## Best Practices

**Do:**
- ✅ Use responsive column counts for better mobile experience
- ✅ Stick to spacing scale for consistency
- ✅ Use verticalSpacing when rows need different gaps than columns
- ✅ Set explicit \`cols\` for predictable layouts
- ✅ Combine with Box props for margins and padding
- ✅ Test with different item counts to verify wrapping behavior

**Don't:**
- ❌ Use when items need different widths (use Grid instead)
- ❌ Mix spacing units inconsistently across grids
- ❌ Forget to test responsive breakpoints
- ❌ Use excessive column counts on mobile
- ❌ Overcomplicate with too many responsive breakpoints
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    // Component-specific props
    cols: {
      control: 'number',
      description: 'Number of columns in the grid. Each column gets equal width (1fr)',
      table: {
        category: 'Component',
        type: { summary: 'ResponsiveValue<number>' },
        defaultValue: { summary: '1' },
      },
    },
    spacing: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'],
      description: 'Horizontal gap between columns. Use spacing scale keys or custom CSS values',
      table: {
        category: 'Component',
        type: { summary: 'ResponsiveValue<SpacingValue>' },
        defaultValue: { summary: 'undefined' },
      },
    },
    verticalSpacing: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'],
      description: 'Vertical gap between rows. Falls back to spacing value if not provided',
      table: {
        category: 'Component',
        type: { summary: 'ResponsiveValue<SpacingValue>' },
        defaultValue: { summary: 'undefined (uses spacing)' },
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
    // Spacing - Margin
    m: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'],
      description: 'Margin on all sides',
      table: { category: 'Spacing - Margin' },
    },
    mx: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'],
      description: 'Horizontal margin (left and right)',
      table: { category: 'Spacing - Margin' },
    },
    my: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'],
      description: 'Vertical margin (top and bottom)',
      table: { category: 'Spacing - Margin' },
    },
    mt: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'],
      description: 'Margin top',
      table: { category: 'Spacing - Margin' },
    },
    mr: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'],
      description: 'Margin right',
      table: { category: 'Spacing - Margin' },
    },
    mb: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'],
      description: 'Margin bottom',
      table: { category: 'Spacing - Margin' },
    },
    ml: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'],
      description: 'Margin left',
      table: { category: 'Spacing - Margin' },
    },
    // Spacing - Padding
    p: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'],
      description: 'Padding on all sides',
      table: { category: 'Spacing - Padding' },
    },
    px: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'],
      description: 'Horizontal padding (left and right)',
      table: { category: 'Spacing - Padding' },
    },
    py: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'],
      description: 'Vertical padding (top and bottom)',
      table: { category: 'Spacing - Padding' },
    },
    pt: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'],
      description: 'Padding top',
      table: { category: 'Spacing - Padding' },
    },
    pr: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'],
      description: 'Padding right',
      table: { category: 'Spacing - Padding' },
    },
    pb: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'],
      description: 'Padding bottom',
      table: { category: 'Spacing - Padding' },
    },
    pl: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'],
      description: 'Padding left',
      table: { category: 'Spacing - Padding' },
    },
    // Size
    w: {
      control: 'text',
      description: 'Width',
      table: { category: 'Size' },
    },
    h: {
      control: 'text',
      description: 'Height',
      table: { category: 'Size' },
    },
    minW: {
      control: 'text',
      description: 'Minimum width',
      table: { category: 'Size' },
    },
    minH: {
      control: 'text',
      description: 'Minimum height',
      table: { category: 'Size' },
    },
    maxW: {
      control: 'text',
      description: 'Maximum width',
      table: { category: 'Size' },
    },
    maxH: {
      control: 'text',
      description: 'Maximum height',
      table: { category: 'Size' },
    },
    className: {
      control: 'text',
      description: 'Additional CSS class name',
      table: { category: 'HTML Attributes' },
    },
    style: {
      control: 'object',
      description: 'Inline styles',
      table: { category: 'HTML Attributes' },
    },
  },
};

export default meta;
type Story = StoryObj<SimpleGridProps>;

export const Usage: Story = {
  args: {
    cols: 3,
    spacing: 'md',
  },
  render: (args: SimpleGridProps) => (
    <div style={{ width: '100%', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Hero Section */}
      <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1rem', color: '#1a1a1a' }}>
          SimpleGrid Component
        </h1>
        <p style={{ fontSize: '1.125rem', color: '#666', maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>
          Equal-width grid layouts made simple. Perfect for product cards, image galleries, dashboards, and any layout where consistency matters.
        </p>
      </div>

      {/* Interactive Demo */}
      <div style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: '#333' }}>
          Interactive Demo
        </h2>
        <p style={{ fontSize: '0.875rem', color: '#666', marginBottom: '1.5rem' }}>
          Adjust <strong>cols</strong> and <strong>spacing</strong> to see how SimpleGrid adapts. Each item automatically takes equal width.
        </p>
        <div style={{ 
          padding: '2rem', 
          backgroundColor: '#f8f9fa', 
          borderRadius: '8px',
        }}>
          <SimpleGrid {...args}>
            {Array.from({ length: 9 }, (_, i) => (
              <div
                key={i}
                style={{
                  padding: '1.5rem',
                  backgroundColor: '#ffffff',
                  border: '2px solid #e0e0e0',
                  borderRadius: '8px',
                  borderLeft: `4px solid ${['#1890ff', '#52c41a', '#fa8c16', '#722ed1', '#eb2f96', '#13c2c2', '#faad14', '#f5222d', '#2f54eb'][i % 9]}`,
                  textAlign: 'center',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
                  {['📱', '💻', '🖥️', '⌚', '🎮', '📷', '🎧', '⌨️', '🖱️'][i % 9]}
                </div>
                <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem', fontWeight: '600', color: '#333' }}>
                  Item {i + 1}
                </h3>
                <p style={{ margin: 0, fontSize: '0.875rem', color: '#666' }}>
                  Equal width grid item
                </p>
              </div>
            ))}
          </SimpleGrid>
        </div>
      </div>

      {/* Real-World Examples */}
      <div style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: '#333' }}>
          Real-World Examples
        </h2>
        <p style={{ fontSize: '0.875rem', color: '#666', marginBottom: '2rem' }}>
          Production-ready patterns for common use cases.
        </p>

        {/* Product Card Grid */}
        <div style={{ marginBottom: '2.5rem' }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.75rem', color: '#1890ff' }}>
            🛍️ Product Card Grid
          </h3>
          <p style={{ fontSize: '0.875rem', color: '#666', marginBottom: '1rem' }}>
            E-commerce product listing with responsive columns: <code>cols={`{{ xs: 1, sm: 2, md: 3, lg: 4 }}`}</code>
          </p>
          <SimpleGrid
            cols={{ xs: 1, sm: 2, md: 3, lg: 4 }}
            spacing="lg"
          >
            {[
              { name: 'Wireless Headphones', price: '$79.99', image: '🎧', rating: '4.8', reviews: 234 },
              { name: 'Smart Watch Pro', price: '$299.99', image: '⌚', rating: '4.9', reviews: 567 },
              { name: 'Laptop Stand', price: '$49.99', image: '💻', rating: '4.7', reviews: 189 },
              { name: 'Mechanical Keyboard', price: '$129.99', image: '⌨️', rating: '4.9', reviews: 892 },
              { name: 'Wireless Mouse', price: '$39.99', image: '🖱️', rating: '4.6', reviews: 456 },
              { name: 'USB-C Hub', price: '$59.99', image: '🔌', rating: '4.8', reviews: 321 },
              { name: 'Phone Case', price: '$19.99', image: '📱', rating: '4.5', reviews: 678 },
              { name: 'Screen Protector', price: '$14.99', image: '🛡️', rating: '4.7', reviews: 234 },
            ].map((product, i) => (
              <div
                key={i}
                style={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #e0e0e0',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.12)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{
                  height: '180px',
                  backgroundColor: '#f8f9fa',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '4rem',
                }}>
                  {product.image}
                </div>
                <div style={{ padding: '1rem' }}>
                  <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem', fontWeight: '600', color: '#333' }}>
                    {product.name}
                  </h4>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <span style={{ color: '#faad14', marginRight: '0.25rem' }}>⭐</span>
                    <span style={{ fontSize: '0.875rem', fontWeight: '500', color: '#333', marginRight: '0.25rem' }}>
                      {product.rating}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: '#999' }}>
                      ({product.reviews})
                    </span>
                  </div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#1890ff' }}>
                    {product.price}
                  </div>
                </div>
              </div>
            ))}
          </SimpleGrid>
        </div>

        {/* Image Gallery */}
        <div style={{ marginBottom: '2.5rem' }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.75rem', color: '#52c41a' }}>
            📸 Image Gallery
          </h3>
          <p style={{ fontSize: '0.875rem', color: '#666', marginBottom: '1rem' }}>
            Photo grid with equal-sized thumbnails. Using <code>spacing="sm"</code> for tight gallery feel.
          </p>
          <SimpleGrid cols={4} spacing="sm">
            {Array.from({ length: 12 }, (_, i) => (
              <div
                key={i}
                style={{
                  position: 'relative',
                  paddingBottom: '100%',
                  backgroundColor: ['#ffd6e7', '#ffe7ba', '#d9f7be', '#bae7ff', '#efdbff', '#ffccc7'][i % 6],
                  borderRadius: '8px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'transform 0.2s',
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '2.5rem',
                }}>
                  {['🌄', '🏖️', '🏔️', '🌅', '🌃', '🌉', '🏞️', '🌆', '🌇', '🌌', '🌠', '🎆'][i]}
                </div>
              </div>
            ))}
          </SimpleGrid>
        </div>

        {/* Dashboard Stats */}
        <div style={{ marginBottom: '2.5rem' }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.75rem', color: '#fa8c16' }}>
            📊 Dashboard Statistics
          </h3>
          <p style={{ fontSize: '0.875rem', color: '#666', marginBottom: '1rem' }}>
            KPI cards with responsive layout: <code>cols={`{{ xs: 1, sm: 2, lg: 4 }}`}</code>
          </p>
          <SimpleGrid cols={{ xs: 1, sm: 2, lg: 4 }} spacing="lg">
            {[
              { label: 'Total Revenue', value: '$124,563', change: '+12.5%', trend: 'up', icon: '💰', color: '#52c41a' },
              { label: 'Active Users', value: '8,426', change: '+8.3%', trend: 'up', icon: '👥', color: '#1890ff' },
              { label: 'Conversion Rate', value: '3.24%', change: '-0.8%', trend: 'down', icon: '📈', color: '#fa8c16' },
              { label: 'Avg. Order Value', value: '$89.50', change: '+5.2%', trend: 'up', icon: '🛒', color: '#722ed1' },
            ].map((stat, i) => (
              <div
                key={i}
                style={{
                  padding: '1.5rem',
                  backgroundColor: '#ffffff',
                  border: '1px solid #e0e0e0',
                  borderRadius: '12px',
                  transition: 'box-shadow 0.2s',
                }}
                onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.08)'}
                onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <span style={{ fontSize: '2rem' }}>{stat.icon}</span>
                  <span style={{
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    color: stat.trend === 'up' ? '#52c41a' : '#f5222d',
                    padding: '4px 8px',
                    backgroundColor: stat.trend === 'up' ? '#f6ffed' : '#fff1f0',
                    borderRadius: '6px',
                  }}>
                    {stat.change}
                  </span>
                </div>
                <div style={{ fontSize: '0.875rem', color: '#666', marginBottom: '0.5rem' }}>
                  {stat.label}
                </div>
                <div style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#333' }}>
                  {stat.value}
                </div>
              </div>
            ))}
          </SimpleGrid>
        </div>

        {/* Feature Showcase */}
        <div style={{ marginBottom: '2.5rem' }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.75rem', color: '#722ed1' }}>
            ✨ Feature Showcase
          </h3>
          <p style={{ fontSize: '0.875rem', color: '#666', marginBottom: '1rem' }}>
            Landing page features with <code>verticalSpacing="xl"</code> for breathing room between rows.
          </p>
          <SimpleGrid cols={{ xs: 1, md: 2, lg: 3 }} spacing="lg" verticalSpacing="xl">
            {[
              { icon: '⚡', title: 'Lightning Fast', description: 'Optimized performance for instant interactions', color: '#faad14' },
              { icon: '🔒', title: 'Secure by Default', description: 'Enterprise-grade security built into every layer', color: '#52c41a' },
              { icon: '🎨', title: 'Beautiful Design', description: 'Pixel-perfect components that delight users', color: '#eb2f96' },
              { icon: '📱', title: 'Fully Responsive', description: 'Perfect experience on every device and screen size', color: '#1890ff' },
              { icon: '♿', title: 'Accessible', description: 'WCAG 2.1 compliant with keyboard navigation', color: '#722ed1' },
              { icon: '🌍', title: 'i18n Ready', description: 'Multi-language support with RTL layouts', color: '#13c2c2' },
            ].map((feature, i) => (
              <div
                key={i}
                style={{
                  padding: '2rem',
                  backgroundColor: '#ffffff',
                  border: '2px solid #f0f0f0',
                  borderRadius: '12px',
                  textAlign: 'center',
                  transition: 'border-color 0.2s, transform 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = feature.color;
                  e.currentTarget.style.transform = 'translateY(-4px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#f0f0f0';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div style={{
                  width: '64px',
                  height: '64px',
                  margin: '0 auto 1rem',
                  backgroundColor: `${feature.color}15`,
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '2rem',
                }}>
                  {feature.icon}
                </div>
                <h4 style={{ margin: '0 0 0.75rem 0', fontSize: '1.125rem', fontWeight: '600', color: '#333' }}>
                  {feature.title}
                </h4>
                <p style={{ margin: 0, fontSize: '0.875rem', color: '#666', lineHeight: '1.5' }}>
                  {feature.description}
                </p>
              </div>
            ))}
          </SimpleGrid>
        </div>

        {/* Team Members */}
        <div style={{ marginBottom: '2.5rem' }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.75rem', color: '#eb2f96' }}>
            👥 Team Members
          </h3>
          <p style={{ fontSize: '0.875rem', color: '#666', marginBottom: '1rem' }}>
            About page with team profiles. Mobile-first with <code>cols={`{{ xs: 1, sm: 2, md: 4 }}`}</code>
          </p>
          <SimpleGrid cols={{ xs: 1, sm: 2, md: 4 }} spacing="lg">
            {[
              { name: 'Sarah Johnson', role: 'CEO & Founder', avatar: '👩‍💼', color: '#1890ff' },
              { name: 'Michael Chen', role: 'CTO', avatar: '👨‍💻', color: '#52c41a' },
              { name: 'Emily Rodriguez', role: 'Design Lead', avatar: '👩‍🎨', color: '#eb2f96' },
              { name: 'David Kim', role: 'Engineering Manager', avatar: '👨‍🔧', color: '#722ed1' },
            ].map((member, i) => (
              <div
                key={i}
                style={{
                  padding: '1.5rem',
                  backgroundColor: '#ffffff',
                  border: '1px solid #e0e0e0',
                  borderRadius: '12px',
                  textAlign: 'center',
                  transition: 'box-shadow 0.2s',
                }}
                onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.1)'}
                onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}
              >
                <div style={{
                  width: '80px',
                  height: '80px',
                  margin: '0 auto 1rem',
                  backgroundColor: `${member.color}15`,
                  border: `3px solid ${member.color}`,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '2.5rem',
                }}>
                  {member.avatar}
                </div>
                <h4 style={{ margin: '0 0 0.25rem 0', fontSize: '1rem', fontWeight: '600', color: '#333' }}>
                  {member.name}
                </h4>
                <p style={{ margin: '0 0 1rem 0', fontSize: '0.875rem', color: '#666' }}>
                  {member.role}
                </p>
                <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                  {['💼', '✉️', '🔗'].map((icon, idx) => (
                    <div
                      key={idx}
                      style={{
                        width: '32px',
                        height: '32px',
                        backgroundColor: '#f8f9fa',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        transition: 'background-color 0.2s',
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e9ecef'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f8f9fa'}
                    >
                      {icon}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </SimpleGrid>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      source: {
        state: 'open',
        code: `// Basic usage
<SimpleGrid cols={3} spacing="md">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</SimpleGrid>

// Responsive product grid
<SimpleGrid 
  cols={{ xs: 1, sm: 2, md: 3, lg: 4 }}
  spacing="lg"
>
  {products.map(product => (
    <ProductCard key={product.id} {...product} />
  ))}
</SimpleGrid>

// Image gallery with tight spacing
<SimpleGrid cols={4} spacing="sm">
  {images.map(img => (
    <img key={img.id} src={img.url} alt={img.title} />
  ))}
</SimpleGrid>

// Dashboard statistics
<SimpleGrid 
  cols={{ xs: 1, sm: 2, lg: 4 }} 
  spacing="lg"
>
  <StatCard label="Revenue" value="$124K" />
  <StatCard label="Users" value="8,426" />
  <StatCard label="Conversion" value="3.24%" />
  <StatCard label="AOV" value="$89.50" />
</SimpleGrid>

// Feature showcase with vertical spacing
<SimpleGrid 
  cols={{ xs: 1, md: 2, lg: 3 }}
  spacing="lg"
  verticalSpacing="xl"
>
  {features.map(feature => (
    <FeatureCard key={feature.id} {...feature} />
  ))}
</SimpleGrid>

// Team members grid
<SimpleGrid 
  cols={{ xs: 1, sm: 2, md: 4 }}
  spacing="lg"
>
  {team.map(member => (
    <TeamCard key={member.id} {...member} />
  ))}
</SimpleGrid>

// Custom spacing values
<SimpleGrid 
  cols={3}
  spacing="2rem"
  verticalSpacing="3rem"
>
  <Content />
</SimpleGrid>

// With Box props (margin, padding, etc.)
<SimpleGrid
  cols={3}
  spacing="md"
  p="lg"
  m="xl"
  style={{ backgroundColor: '#f8f9fa' }}
>
  <Content />
</SimpleGrid>`,
      },
    },
  },
};