import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Stack } from '../components/Stack';
import type { StackProps } from '../components/Stack/Stack.types';

const meta: Meta<StackProps> = {
  title: 'Components/Layouts/Stack',
  component: Stack,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
A vertical flex container component for composing elements in a column layout.

## Key Features

- **Vertical Flexbox Layout**: Uses flex-direction: column for stacking elements vertically
- **Spacing Scale Integration**: Gap uses predefined spacing scale (xs, sm, md, lg, xl, xxl) or custom CSS values
- **Cross-Axis Alignment**: Control horizontal alignment with align prop (stretch, center, flex-start, flex-end, baseline)
- **Main-Axis Justification**: Control vertical distribution with justify prop (flex-start, flex-end, center, space-between, space-around, space-evenly)
- **Responsive Values**: All props support responsive breakpoint objects for adaptive layouts
- **Container-Aware**: Measures container width for accurate responsive resolution
- **Performance Optimized**: Memoized calculations for efficient re-renders
- **Composition Ready**: Extends Box component with all layout props (margin, padding, size, etc.)

## When to Use

- **Form Layouts**: Vertical forms with inputs, textareas, and buttons stacked with consistent spacing
- **Card Stacks**: Vertical lists of cards or content blocks with large gaps
- **Navigation Sidebars**: Menu items stacked vertically with tight spacing
- **Page Layouts**: Header-Main-Footer layouts with space-between for sticky footers
- **Content Sections**: Blog posts, articles with paragraph and heading spacing
- **Modal Content**: Dialog elements arranged vertically
- **Settings Panels**: Configuration options stacked in vertical lists
- **Notification Lists**: Toast messages or alerts stacked vertically
- **Timeline Layouts**: Events displayed in chronological vertical order
- **Dashboard Widgets**: Vertical arrangements of dashboard cards and metrics

## Stack vs Other Components

### Stack vs Group
- **Stack**: Vertical layouts only (flex-direction: column), simpler API
- **Group**: Horizontal layouts (flex-direction: row), for button toolbars and navigation

### Stack vs Flex
- **Stack**: Direction locked to column, focused use case
- **Flex**: Configurable direction (row/column), more flexible but requires more configuration

### Stack vs SimpleGrid
- **Stack**: Single column vertical layout with flexible heights
- **SimpleGrid**: Multi-column grid with equal-width items

## Alignment Explained

### \`align\` (Cross-Axis / Horizontal)
Controls how items align horizontally within the vertical stack:
- **stretch** (default): Items stretch to fill container width
- **flex-start**: Items align to left edge
- **flex-end**: Items align to right edge
- **center**: Items center horizontally
- **baseline**: Items align by text baseline

### \`justify\` (Main-Axis / Vertical)
Controls how items distribute vertically:
- **flex-start** (default): Items start at top
- **flex-end**: Items align to bottom
- **center**: Items center vertically
- **space-between**: First item at top, last at bottom, even spacing between
- **space-around**: Equal space around each item
- **space-evenly**: Equal space between and around items

## Gap System

Gap uses the same spacing scale as margin and padding:
- **xs**: 4px - Very tight spacing
- **sm**: 8px - Tight spacing
- **md**: 16px - Default comfortable spacing
- **lg**: 24px - Loose spacing
- **xl**: 32px - Very loose spacing
- **xxl**: 48px - Extra loose spacing

You can also use custom CSS values: \`gap="2rem"\`, \`gap="20px"\`, \`gap="5%"\`

## Responsive Patterns

All props support responsive values:

\`\`\`tsx
<Stack 
  gap={{ xs: 'sm', md: 'md', lg: 'lg' }}
  align={{ xs: 'center', md: 'stretch' }}
  justify={{ xs: 'center', md: 'flex-start' }}
>
  <div>Responsive Item 1</div>
  <div>Responsive Item 2</div>
</Stack>
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
- ✅ Use Stack for vertical layouts exclusively
- ✅ Stick to spacing scale (xs, sm, md, lg, xl, xxl) for consistency
- ✅ Use \`align="stretch"\` for full-width form elements
- ✅ Use \`justify="space-between"\` for header-footer layouts
- ✅ Combine with Box props for margins and padding
- ✅ Test responsive breakpoints on different screen sizes
- ✅ Use \`align="center"\` for card stacks and centered content

**Don't:**
- ❌ Use Stack for horizontal layouts (use Group or Flex instead)
- ❌ Mix spacing units inconsistently across Stacks
- ❌ Forget the default \`align="stretch"\` behavior affects item widths
- ❌ Nest too many Stack levels (impacts performance)
- ❌ Use when items need equal heights (use Grid instead)
- ❌ Overcomplicate with too many responsive breakpoints
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
      description: 'Cross-axis (horizontal) alignment of items',
      table: {
        category: 'Component',
        type: { summary: 'ResponsiveValue<CSS.Property.AlignItems>' },
        defaultValue: { summary: 'stretch' },
      },
    },
    gap: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'],
      description: 'Vertical gap between items. Use spacing scale keys or custom CSS values',
      table: {
        category: 'Component',
        type: { summary: 'ResponsiveValue<SpacingValue>' },
        defaultValue: { summary: 'undefined' },
      },
    },
    justify: {
      control: 'select',
      options: ['flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'space-evenly'],
      description: 'Main-axis (vertical) distribution of items',
      table: {
        category: 'Component',
        type: { summary: 'ResponsiveValue<CSS.Property.JustifyContent>' },
        defaultValue: { summary: 'flex-start' },
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
type Story = StoryObj<StackProps>;

export const Usage: Story = {
  args: {
    align: 'stretch',
    gap: 'md',
    justify: 'flex-start',
  },
  render: (args: StackProps) => (
    <div style={{ width: '100%', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Hero Section */}
      <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1rem', color: '#1a1a1a' }}>
          Stack Component
        </h1>
        <p style={{ fontSize: '1.125rem', color: '#666', maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>
          Vertical flex container for stacking elements. Perfect for forms, card lists, navigation menus, and any vertical layout.
        </p>
      </div>

      {/* Interactive Demo */}
      <div style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: '#333' }}>
          Interactive Demo
        </h2>
        <p style={{ fontSize: '0.875rem', color: '#666', marginBottom: '1.5rem' }}>
          Adjust <strong>align</strong>, <strong>gap</strong>, and <strong>justify</strong> to see how Stack adapts. Items are stacked vertically.
        </p>
        <div style={{
          padding: '2rem',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px',
          display: 'flex',
          justifyContent: 'center',
        }}>
          <Stack {...args} style={{ width: '100%', maxWidth: '400px', backgroundColor: '#ffffff', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e0e0e0', minHeight: '300px' }}>
            {Array.from({ length: 4 }, (_, i) => (
              <div
                key={i}
                style={{
                  padding: '1.25rem',
                  backgroundColor: ['#1890ff', '#52c41a', '#fa8c16', '#722ed1'][i],
                  color: 'white',
                  borderRadius: '6px',
                  textAlign: 'center',
                  fontWeight: '500',
                  fontSize: '0.875rem',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.02)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                Item {i + 1}
              </div>
            ))}
          </Stack>
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

        {/* Form Layout */}
        <div style={{ marginBottom: '2.5rem' }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.75rem', color: '#1890ff' }}>
            📝 Form Layout
          </h3>
          <p style={{ fontSize: '0.875rem', color: '#666', marginBottom: '1rem' }}>
            Contact form with <code>gap="md"</code> and <code>align="stretch"</code> for full-width inputs.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Stack
              gap="md"
              align="stretch"
              style={{
                width: '100%',
                maxWidth: '500px',
                backgroundColor: '#ffffff',
                border: '1px solid #e0e0e0',
                padding: '2rem',
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
              }}
            >
              <h3 style={{ margin: '0 0 1rem 0', color: '#333', textAlign: 'center', fontSize: '1.25rem' }}>
                Contact Us
              </h3>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#595959', fontWeight: '500', fontSize: '0.875rem' }}>
                  Full Name *
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #d9d9d9',
                    borderRadius: '6px',
                    fontSize: '0.875rem',
                    boxSizing: 'border-box',
                    transition: 'border-color 0.2s',
                  }}
                  onFocus={(e) => e.currentTarget.style.borderColor = '#1890ff'}
                  onBlur={(e) => e.currentTarget.style.borderColor = '#d9d9d9'}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#595959', fontWeight: '500', fontSize: '0.875rem' }}>
                  Email Address *
                </label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #d9d9d9',
                    borderRadius: '6px',
                    fontSize: '0.875rem',
                    boxSizing: 'border-box',
                    transition: 'border-color 0.2s',
                  }}
                  onFocus={(e) => e.currentTarget.style.borderColor = '#1890ff'}
                  onBlur={(e) => e.currentTarget.style.borderColor = '#d9d9d9'}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#595959', fontWeight: '500', fontSize: '0.875rem' }}>
                  Subject *
                </label>
                <select
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #d9d9d9',
                    borderRadius: '6px',
                    fontSize: '0.875rem',
                    backgroundColor: 'white',
                    boxSizing: 'border-box',
                    cursor: 'pointer',
                    transition: 'border-color 0.2s',
                  }}
                  onFocus={(e) => e.currentTarget.style.borderColor = '#1890ff'}
                  onBlur={(e) => e.currentTarget.style.borderColor = '#d9d9d9'}
                >
                  <option>General Inquiry</option>
                  <option>Technical Support</option>
                  <option>Feature Request</option>
                  <option>Bug Report</option>
                  <option>Partnership</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#595959', fontWeight: '500', fontSize: '0.875rem' }}>
                  Message *
                </label>
                <textarea
                  placeholder="Tell us how we can help..."
                  rows={5}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #d9d9d9',
                    borderRadius: '6px',
                    fontSize: '0.875rem',
                    resize: 'vertical',
                    fontFamily: 'inherit',
                    boxSizing: 'border-box',
                    transition: 'border-color 0.2s',
                  }}
                  onFocus={(e) => e.currentTarget.style.borderColor = '#1890ff'}
                  onBlur={(e) => e.currentTarget.style.borderColor = '#d9d9d9'}
                />
              </div>

              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                <input
                  type="checkbox"
                  id="subscribe"
                  style={{ marginTop: '3px', cursor: 'pointer' }}
                />
                <label htmlFor="subscribe" style={{ color: '#595959', fontSize: '0.875rem', lineHeight: '1.5', cursor: 'pointer' }}>
                  I agree to receive marketing emails and updates
                </label>
              </div>

              <button
                style={{
                  padding: '1rem',
                  backgroundColor: '#1890ff',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  marginTop: '0.5rem',
                  transition: 'background-color 0.2s, transform 0.1s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#40a9ff';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#1890ff';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                Send Message
              </button>
            </Stack>
          </div>
        </div>

        {/* Card Stack */}
        <div style={{ marginBottom: '2.5rem' }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.75rem', color: '#52c41a' }}>
            💳 Card Stack
          </h3>
          <p style={{ fontSize: '0.875rem', color: '#666', marginBottom: '1rem' }}>
            Feature cards with <code>gap="lg"</code> and <code>align="center"</code> for centered content.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Stack
              gap="lg"
              align="center"
              style={{
                width: '100%',
                maxWidth: '600px',
                backgroundColor: '#fafafa',
                padding: '2rem',
                borderRadius: '12px',
              }}
            >
              {[
                { title: 'Performance Optimized', description: 'Built for speed with memoized calculations and efficient re-renders.', icon: '⚡', color: '#1890ff' },
                { title: 'Fully Responsive', description: 'Adapts to any screen size with responsive breakpoint system.', icon: '📱', color: '#52c41a' },
                { title: 'TypeScript Ready', description: 'Complete type definitions for excellent developer experience.', icon: '🔷', color: '#722ed1' },
                { title: 'Accessible Design', description: 'Built with ARIA compliance and keyboard navigation support.', icon: '♿', color: '#fa8c16' },
              ].map((feature, i) => (
                <div
                  key={i}
                  style={{
                    backgroundColor: 'white',
                    border: '1px solid #e0e0e0',
                    borderRadius: '12px',
                    padding: '2rem',
                    width: '100%',
                    maxWidth: '520px',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
                    textAlign: 'center',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.12)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.04)';
                  }}
                >
                  <div style={{
                    fontSize: '3rem',
                    marginBottom: '1rem',
                  }}>
                    {feature.icon}
                  </div>
                  <h3 style={{
                    margin: '0 0 0.75rem 0',
                    color: feature.color,
                    fontSize: '1.25rem',
                    fontWeight: '600',
                  }}>
                    {feature.title}
                  </h3>
                  <p style={{
                    margin: '0',
                    color: '#666',
                    lineHeight: 1.6,
                    fontSize: '0.875rem',
                  }}>
                    {feature.description}
                  </p>
                </div>
              ))}
            </Stack>
          </div>
        </div>

        {/* Navigation Sidebar */}
        <div style={{ marginBottom: '2.5rem' }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.75rem', color: '#fa8c16' }}>
            🗂️ Navigation Sidebar
          </h3>
          <p style={{ fontSize: '0.875rem', color: '#666', marginBottom: '1rem' }}>
            Menu items with <code>gap="xs"</code> and <code>align="stretch"</code> for tight vertical navigation.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Stack
              gap="xs"
              align="stretch"
              style={{
                width: '100%',
                maxWidth: '280px',
                backgroundColor: 'white',
                border: '1px solid #e0e0e0',
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
              }}
            >
              {/* Header */}
              <div style={{
                padding: '1.5rem',
                backgroundColor: '#fa8c16',
                color: 'white',
                fontWeight: '600',
                fontSize: '1.125rem',
                textAlign: 'center',
              }}>
                📋 Menu
              </div>

              {/* Menu Items */}
              <div style={{ padding: '0.5rem' }}>
                <Stack gap="xs" align="stretch">
                  {[
                    { label: 'Dashboard', icon: '📊', active: true, badge: null },
                    { label: 'Analytics', icon: '📈', active: false, badge: 'New' },
                    { label: 'Projects', icon: '📁', active: false, badge: null },
                    { label: 'Team', icon: '👥', active: false, badge: '3' },
                    { label: 'Messages', icon: '💬', active: false, badge: '12' },
                    { label: 'Calendar', icon: '📅', active: false, badge: null },
                    { label: 'Settings', icon: '⚙️', active: false, badge: null },
                    { label: 'Help', icon: '❓', active: false, badge: null },
                  ].map((item, i) => (
                    <button
                      key={i}
                      style={{
                        padding: '0.875rem 1rem',
                        backgroundColor: item.active ? '#fff7e6' : 'transparent',
                        color: item.active ? '#fa8c16' : '#595959',
                        border: 'none',
                        borderRadius: '6px',
                        textAlign: 'left',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        fontSize: '0.875rem',
                        fontWeight: item.active ? '600' : 'normal',
                        transition: 'all 0.2s ease',
                      }}
                      onMouseEnter={(e) => {
                        if (!item.active) e.currentTarget.style.backgroundColor = '#f5f5f5';
                      }}
                      onMouseLeave={(e) => {
                        if (!item.active) e.currentTarget.style.backgroundColor = 'transparent';
                      }}
                    >
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <span>{item.icon}</span>
                        {item.label}
                      </span>
                      {item.badge && (
                        <span style={{
                          padding: '2px 8px',
                          backgroundColor: '#ff4d4f',
                          color: 'white',
                          borderRadius: '10px',
                          fontSize: '0.7rem',
                          fontWeight: '600',
                        }}>
                          {item.badge}
                        </span>
                      )}
                    </button>
                  ))}
                </Stack>
              </div>

              {/* Footer */}
              <div style={{
                padding: '1rem',
                borderTop: '1px solid #f0f0f0',
                color: '#999',
                fontSize: '0.75rem',
                textAlign: 'center',
              }}>
                Version 1.0.0
              </div>
            </Stack>
          </div>
        </div>

        {/* Page Layout */}
        <div style={{ marginBottom: '2.5rem' }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.75rem', color: '#722ed1' }}>
            📄 Page Layout
          </h3>
          <p style={{ fontSize: '0.875rem', color: '#666', marginBottom: '1rem' }}>
            Header-Main-Footer with <code>justify="space-between"</code> for sticky footer effect.
          </p>
          <Stack
            gap="none"
            align="stretch"
            justify="space-between"
            style={{
              width: '100%',
              backgroundColor: '#f5f5f5',
              minHeight: '500px',
              borderRadius: '12px',
              overflow: 'hidden',
              border: '1px solid #d9d9d9',
            }}
          >
            {/* Header */}
            <header style={{
              padding: '1.5rem 2rem',
              backgroundColor: '#001529',
              color: 'white',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
              <h1 style={{ margin: 0, fontSize: '1.25rem', fontWeight: '600' }}>
                My Application
              </h1>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <span style={{ fontSize: '0.875rem' }}>👤 Welcome, User</span>
                <button style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: '#722ed1',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  transition: 'background-color 0.2s',
                }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#9254de'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#722ed1'}
                >
                  Logout
                </button>
              </div>
            </header>

            {/* Main Content */}
            <main style={{
              flex: 1,
              padding: '2rem',
              backgroundColor: 'white',
            }}>
              <Stack gap="lg">
                <h2 style={{ margin: 0, color: '#333', fontSize: '1.5rem' }}>
                  Main Content Area
                </h2>
                <p style={{ margin: 0, color: '#666', lineHeight: 1.6 }}>
                  This is the main content area. The Stack component uses <code>justify="space-between"</code>
                  to push the footer to the bottom, creating a sticky footer effect.
                </p>
                <div style={{
                  padding: '2rem',
                  backgroundColor: '#f8f9fa',
                  borderRadius: '8px',
                  border: '1px solid #e9ecef',
                  textAlign: 'center',
                }}>
                  <h3 style={{ margin: '0 0 0.75rem 0', color: '#495057' }}>Content Block</h3>
                  <p style={{ margin: 0, color: '#6c757d', fontSize: '0.875rem' }}>
                    Additional content goes here. The layout automatically adjusts
                    to fill the available space.
                  </p>
                </div>
              </Stack>
            </main>

            {/* Footer */}
            <footer style={{
              padding: '1.5rem 2rem',
              backgroundColor: '#fafafa',
              borderTop: '1px solid #e0e0e0',
              textAlign: 'center',
              color: '#8c8c8c',
              fontSize: '0.875rem',
            }}>
              © 2024 My Application. All rights reserved.
            </footer>
          </Stack>
        </div>

        {/* Settings Panel */}
        <div style={{ marginBottom: '2.5rem' }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.75rem', color: '#eb2f96' }}>
            ⚙️ Settings Panel
          </h3>
          <p style={{ fontSize: '0.875rem', color: '#666', marginBottom: '1rem' }}>
            Configuration options with <code>gap="lg"</code> for clear separation between settings groups.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Stack
              gap="lg"
              align="stretch"
              style={{
                width: '100%',
                maxWidth: '500px',
                backgroundColor: 'white',
                border: '1px solid #e0e0e0',
                padding: '2rem',
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
              }}
            >
              <h3 style={{ margin: 0, color: '#333', fontSize: '1.25rem', fontWeight: '600' }}>
                Account Settings
              </h3>

              {/* Setting Group 1 */}
              <div>
                <div style={{ marginBottom: '0.75rem' }}>
                  <label style={{ fontWeight: '500', color: '#333', fontSize: '0.875rem', display: 'block', marginBottom: '0.5rem' }}>
                    Display Name
                  </label>
                  <input
                    type="text"
                    defaultValue="John Doe"
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #d9d9d9',
                      borderRadius: '6px',
                      fontSize: '0.875rem',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>
                <p style={{ margin: 0, color: '#999', fontSize: '0.75rem' }}>
                  This is how others will see your name
                </p>
              </div>

              {/* Setting Group 2 */}
              <div>
                <label style={{ fontWeight: '500', color: '#333', fontSize: '0.875rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <span>Email Notifications</span>
                  <input
                    type="checkbox"
                    defaultChecked
                    style={{
                      width: '20px',
                      height: '20px',
                      cursor: 'pointer',
                    }}
                  />
                </label>
                <p style={{ margin: 0, color: '#999', fontSize: '0.75rem' }}>
                  Receive email updates about your account activity
                </p>
              </div>

              {/* Setting Group 3 */}
              <div>
                <label style={{ fontWeight: '500', color: '#333', fontSize: '0.875rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <span>Push Notifications</span>
                  <input
                    type="checkbox"
                    style={{
                      width: '20px',
                      height: '20px',
                      cursor: 'pointer',
                    }}
                  />
                </label>
                <p style={{ margin: 0, color: '#999', fontSize: '0.75rem' }}>
                  Get notified about important updates
                </p>
              </div>

              {/* Setting Group 4 */}
              <div>
                <div style={{ marginBottom: '0.75rem' }}>
                  <label style={{ fontWeight: '500', color: '#333', fontSize: '0.875rem', display: 'block', marginBottom: '0.5rem' }}>
                    Language
                  </label>
                  <select
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #d9d9d9',
                      borderRadius: '6px',
                      fontSize: '0.875rem',
                      backgroundColor: 'white',
                      boxSizing: 'border-box',
                      cursor: 'pointer',
                    }}
                  >
                    <option>English</option>
                    <option>Español</option>
                    <option>Français</option>
                    <option>Deutsch</option>
                    <option>日本語</option>
                  </select>
                </div>
                <p style={{ margin: 0, color: '#999', fontSize: '0.75rem' }}>
                  Choose your preferred language
                </p>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
                <button
                  style={{
                    flex: 1,
                    padding: '0.875rem',
                    backgroundColor: '#eb2f96',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f759ab'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#eb2f96'}
                >
                  Save Changes
                </button>
                <button
                  style={{
                    flex: 1,
                    padding: '0.875rem',
                    backgroundColor: 'white',
                    color: '#666',
                    border: '1px solid #d9d9d9',
                    borderRadius: '6px',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'border-color 0.2s, color 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#999';
                    e.currentTarget.style.color = '#333';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#d9d9d9';
                    e.currentTarget.style.color = '#666';
                  }}
                >
                  Cancel
                </button>
              </div>
            </Stack>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      source: {
        state: 'open',
        code: `// Basic usage
<Stack gap="md" align="stretch">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</Stack>

// Form layout
<Stack gap="md" align="stretch">
  <input type="text" placeholder="Name" />
  <input type="email" placeholder="Email" />
  <textarea placeholder="Message" rows={5} />
  <button>Submit</button>
</Stack>

// Card stack with centered alignment
<Stack gap="lg" align="center">
  <FeatureCard title="Fast" icon="⚡" />
  <FeatureCard title="Secure" icon="🔒" />
  <FeatureCard title="Scalable" icon="📈" />
</Stack>

// Navigation sidebar
<Stack gap="xs" align="stretch">
  <NavHeader>Menu</NavHeader>
  <NavItem icon="📊" label="Dashboard" active />
  <NavItem icon="📈" label="Analytics" />
  <NavItem icon="⚙️" label="Settings" />
  <NavFooter>Version 1.0</NavFooter>
</Stack>

// Page layout with sticky footer
<Stack 
  gap="none" 
  justify="space-between" 
  style={{ minHeight: '100vh' }}
>
  <Header />
  <Main style={{ flex: 1 }} />
  <Footer />
</Stack>

// Settings panel
<Stack gap="lg" align="stretch">
  <SettingItem label="Notifications" type="toggle" />
  <SettingItem label="Language" type="select" />
  <SettingItem label="Theme" type="select" />
  <ActionButtons />
</Stack>

// Responsive behavior
<Stack 
  gap={{ xs: 'sm', md: 'md', lg: 'lg' }}
  align={{ xs: 'center', md: 'stretch' }}
>
  <Content />
</Stack>

// Custom gap value
<Stack gap="2rem" justify="center" style={{ height: 400 }}>
  <Header />
  <Content />
  <Footer />
</Stack>

// With Box props (margin, padding)
<Stack
  gap="md"
  align="stretch"
  p="lg"
  m="xl"
  style={{ backgroundColor: '#f8f9fa' }}
>
  <Content />
</Stack>`,
      },
    },
  },
};