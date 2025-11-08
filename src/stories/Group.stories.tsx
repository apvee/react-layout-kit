import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Group } from '../components/Group';
import type { GroupProps } from '../components/Group/Group.types';

const meta: Meta<GroupProps> = {
  title: 'Components/Layouts/Group',
  component: Group,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
A horizontal flex container component for composing elements in a row with configurable spacing and alignment.

## Key Features

- **Horizontal Layout**: Fixed flex-direction: row for horizontal composition
- **Spacing Scale**: Predefined gap values (xs, sm, md, lg, xl, xxl) or custom CSS values
- **Growing Children**: Children can grow equally to fill space with \`grow\` prop
- **Overflow Prevention**: \`preventGrowOverflow\` constrains children with max-width calculation
- **Alignment Control**: Full control over cross-axis (align) and main-axis (justify) alignment
- **Wrap Behavior**: Configurable flex-wrap for responsive layouts
- **Responsive Values**: All properties support breakpoint objects for responsive behavior
- **Box-based**: Inherits all Box component styling capabilities

## When to Use

- **Button Toolbars**: Action buttons, form controls, toolbar items
- **Navigation**: Tab bars, breadcrumbs, navigation links
- **Icon Groups**: Icon buttons, social media links, tag lists
- **Badge Collections**: Status badges, labels, chips in a row
- **Form Actions**: Submit/Cancel/Reset button groups
- **Card Actions**: Footer actions in cards with consistent spacing

## Properties Explained

### \`align\` (align-items)
Controls cross-axis alignment (vertical in horizontal layout):
- **center** (default): Items centered vertically
- **flex-start**: Items aligned to top
- **flex-end**: Items aligned to bottom
- **stretch**: Items stretched to container height
- **baseline**: Items aligned by text baseline

### \`justify\` (justify-content)
Controls main-axis alignment (horizontal in horizontal layout):
- **flex-start** (default): Items at start
- **flex-end**: Items at end
- **center**: Items centered
- **space-between**: Items with space between
- **space-around**: Items with space around
- **space-evenly**: Items with even space

### \`gap\`
Space between items:
- Spacing scale: xs, sm, md, lg, xl, xxl
- Custom CSS: "1rem", "20px", "2em"
- Numbers converted to rem
- Undefined = no gap

### \`grow\`
When true, all children receive \`flex-grow: 1\` for equal width distribution.

### \`preventGrowOverflow\`
When true (default), children get \`max-width\` constraint to prevent overflow when growing.
Formula: \`max-width = 100% / childrenCount\`

### \`wrap\`
Controls wrapping behavior:
- **wrap** (default): Items wrap to new lines
- **nowrap**: Items stay on one line
- **wrap-reverse**: Items wrap in reverse order

## Responsive Behavior

All Group properties support responsive values using breakpoint objects:

\`\`\`tsx
<Group
  gap={{ xs: 'sm', md: 'md', lg: 'lg' }}
  align={{ xs: 'stretch', md: 'center' }}
  justify={{ xs: 'center', lg: 'flex-start' }}
  wrap={{ xs: 'wrap', md: 'nowrap' }}
  grow={{ xs: true, md: false }}
>
  {/* Items adapt at different breakpoints */}
</Group>
\`\`\`

## Best Practices

**Do:**
- ✅ Use for horizontal layouts of similar items
- ✅ Use spacing scale (sm, md, lg) for consistency
- ✅ Use \`grow\` for equal-width button groups
- ✅ Use \`wrap\` for responsive item wrapping
- ✅ Combine with \`justify="space-between"\` for spread layouts
- ✅ Use \`align="center"\` for mixed-height items

**Don't:**
- ❌ Use for vertical layouts (use Stack instead)
- ❌ Use for complex grid layouts (use Grid or SimpleGrid)
- ❌ Forget \`preventGrowOverflow\` when using \`grow\`
- ❌ Mix too many different item types
- ❌ Use for single items (unnecessary wrapper)
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
      description: 'align-items CSS property - controls cross-axis (vertical) alignment',
      table: {
        category: 'Component',
        type: { summary: 'ResponsiveValue<CSS.Property.AlignItems>' },
        defaultValue: { summary: 'center' },
      },
    },
    justify: {
      control: 'select',
      options: ['flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'space-evenly'],
      description: 'justify-content CSS property - controls main-axis (horizontal) alignment',
      table: {
        category: 'Component',
        type: { summary: 'ResponsiveValue<CSS.Property.JustifyContent>' },
        defaultValue: { summary: 'flex-start' },
      },
    },
    wrap: {
      control: 'select',
      options: ['nowrap', 'wrap', 'wrap-reverse'],
      description: 'flex-wrap CSS property - controls wrapping behavior',
      table: {
        category: 'Component',
        type: { summary: 'ResponsiveValue<CSS.Property.FlexWrap>' },
        defaultValue: { summary: 'wrap' },
      },
    },
    gap: {
      control: 'text',
      description: 'Gap between items - spacing scale key (xs, sm, md, lg, xl, xxl) or CSS value',
      table: {
        category: 'Component',
        type: { summary: 'ResponsiveValue<SpacingValue>' },
      },
    },
    grow: {
      control: 'boolean',
      description: 'Whether children should have flex-grow: 1 for equal width',
      table: {
        category: 'Component',
        type: { summary: 'ResponsiveValue<boolean>' },
        defaultValue: { summary: 'false' },
      },
    },
    preventGrowOverflow: {
      control: 'boolean',
      description: 'Prevents children overflow by setting max-width constraint',
      table: {
        category: 'Component',
        type: { summary: 'ResponsiveValue<boolean>' },
        defaultValue: { summary: 'true' },
      },
    },
    containerWidth: {
      control: 'number',
      description: 'Fixed container width in pixels for responsive calculations',
      table: {
        category: 'Component',
        type: { summary: 'number' },
      },
    },

    // Spacing - Margin
    m: {
      control: 'text',
      description: 'Margin on all sides (e.g., "md", "lg", "1rem")',
      table: { category: 'Spacing - Margin' },
    },
    mt: {
      control: 'text',
      description: 'Margin top',
      table: { category: 'Spacing - Margin' },
    },
    mb: {
      control: 'text',
      description: 'Margin bottom',
      table: { category: 'Spacing - Margin' },
    },
    ml: {
      control: 'text',
      description: 'Margin left',
      table: { category: 'Spacing - Margin' },
    },
    mr: {
      control: 'text',
      description: 'Margin right',
      table: { category: 'Spacing - Margin' },
    },
    mx: {
      control: 'text',
      description: 'Margin horizontal (left and right)',
      table: { category: 'Spacing - Margin' },
    },
    my: {
      control: 'text',
      description: 'Margin vertical (top and bottom)',
      table: { category: 'Spacing - Margin' },
    },

    // Spacing - Padding
    p: {
      control: 'text',
      description: 'Padding on all sides',
      table: { category: 'Spacing - Padding' },
    },
    pt: {
      control: 'text',
      description: 'Padding top',
      table: { category: 'Spacing - Padding' },
    },
    pb: {
      control: 'text',
      description: 'Padding bottom',
      table: { category: 'Spacing - Padding' },
    },
    pl: {
      control: 'text',
      description: 'Padding left',
      table: { category: 'Spacing - Padding' },
    },
    pr: {
      control: 'text',
      description: 'Padding right',
      table: { category: 'Spacing - Padding' },
    },
    px: {
      control: 'text',
      description: 'Padding horizontal (left and right)',
      table: { category: 'Spacing - Padding' },
    },
    py: {
      control: 'text',
      description: 'Padding vertical (top and bottom)',
      table: { category: 'Spacing - Padding' },
    },

    // Size props
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
    miw: {
      control: 'text',
      description: 'Min width',
      table: { category: 'Size' },
    },
    maw: {
      control: 'text',
      description: 'Max width',
      table: { category: 'Size' },
    },
    mih: {
      control: 'text',
      description: 'Min height',
      table: { category: 'Size' },
    },
    mah: {
      control: 'text',
      description: 'Max height',
      table: { category: 'Size' },
    },

    // Position props
    pos: {
      control: 'text',
      description: 'CSS position',
      table: { category: 'Position' },
    },
    top: {
      control: 'text',
      description: 'Top position',
      table: { category: 'Position' },
    },
    bottom: {
      control: 'text',
      description: 'Bottom position',
      table: { category: 'Position' },
    },
    left: {
      control: 'text',
      description: 'Left position',
      table: { category: 'Position' },
    },
    right: {
      control: 'text',
      description: 'Right position',
      table: { category: 'Position' },
    },
    inset: {
      control: 'text',
      description: 'Inset (shorthand for top, right, bottom, left)',
      table: { category: 'Position' },
    },

    // HTML attributes
    id: {
      control: 'text',
      description: 'HTML id attribute',
      table: { category: 'HTML Attributes' },
    },
    className: {
      control: 'text',
      description: 'CSS class name',
      table: { category: 'HTML Attributes' },
    },
    style: {
      control: 'object',
      description: 'Inline styles',
      table: { category: 'HTML Attributes' },
    },
    asChild: {
      control: 'boolean',
      description: 'Merge props into child element instead of wrapping',
      table: { category: 'HTML Attributes' },
    },
    styleReset: {
      control: 'boolean',
      description: 'Reset default styles',
      table: { category: 'HTML Attributes' },
    },
  },
};

export default meta;
type Story = StoryObj<GroupProps>;

export const Usage: Story = {
  args: {
    gap: 'md',
    align: 'center',
    justify: 'flex-start',
    wrap: 'wrap',
    grow: false,
    preventGrowOverflow: true,
  },
  render: (args: GroupProps) => (
    <div style={{ width: '100%', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Hero Section */}
      <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1rem', color: '#1a1a1a' }}>
          Group Component
        </h1>
        <p style={{ fontSize: '1.125rem', color: '#666', maxWidth: '600px', margin: '0 auto', lineHeight: '1.6' }}>
          Horizontal flex container for composing elements in a row with configurable spacing, alignment, and wrapping.
        </p>
      </div>

      {/* Interactive Demo */}
      <div style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: '#333' }}>
          Interactive Demo
        </h2>
        <p style={{ fontSize: '0.875rem', color: '#666', marginBottom: '1.5rem' }}>
          Adjust the controls to see how <strong>gap</strong>, <strong>align</strong>, <strong>justify</strong>, <strong>wrap</strong>, and <strong>grow</strong> affect the layout.
        </p>
        <div style={{ 
          padding: '2rem', 
          backgroundColor: '#f8f9fa', 
          borderRadius: '8px',
        }}>
          <Group {...args}>
            <button style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: '#1890ff',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: '500',
            }}>
              Button 1
            </button>
            <button style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: '#52c41a',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: '500',
            }}>
              Button 2
            </button>
            <button style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: '#fa8c16',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: '500',
            }}>
              Button 3
            </button>
          </Group>
        </div>
      </div>

      {/* Real-World Examples */}
      <div style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: '#333' }}>
          Real-World Examples
        </h2>
        <p style={{ fontSize: '0.875rem', color: '#666', marginBottom: '2rem' }}>
          Common use cases for Group component in modern UI design.
        </p>

        {/* Action Button Toolbar */}
        <div style={{ marginBottom: '2.5rem' }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.75rem', color: '#1976d2' }}>
            🔧 Action Button Toolbar
          </h3>
          <p style={{ fontSize: '0.875rem', color: '#666', marginBottom: '1rem' }}>
            Primary, secondary, and tertiary actions with consistent spacing using <code>gap="sm"</code>.
          </p>
          <Group gap="sm" style={{ 
            padding: '1rem', 
            backgroundColor: '#ffffff', 
            border: '1px solid #f0f0f0', 
            borderRadius: '8px' 
          }}>
            <button style={{
              padding: '10px 20px',
              backgroundColor: '#1890ff',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: '500',
              fontSize: '0.875rem',
            }}>
              Save
            </button>
            <button style={{
              padding: '10px 20px',
              backgroundColor: 'transparent',
              color: '#595959',
              border: '1px solid #d9d9d9',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '0.875rem',
            }}>
              Cancel
            </button>
            <button style={{
              padding: '10px 20px',
              backgroundColor: 'transparent',
              color: '#595959',
              border: '1px solid #d9d9d9',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '0.875rem',
            }}>
              Preview
            </button>
          </Group>
        </div>

        {/* Icon Toolbar */}
        <div style={{ marginBottom: '2.5rem' }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.75rem', color: '#fa8c16' }}>
            ✏️ Icon Toolbar (Text Formatting)
          </h3>
          <p style={{ fontSize: '0.875rem', color: '#666', marginBottom: '1rem' }}>
            Compact icon buttons with minimal spacing using <code>gap="xs"</code>.
          </p>
          <Group gap="xs" style={{ 
            padding: '1rem', 
            backgroundColor: '#ffffff', 
            border: '1px solid #f0f0f0', 
            borderRadius: '8px' 
          }}>
            {[
              { icon: 'B', active: true, label: 'Bold' },
              { icon: 'I', active: false, label: 'Italic' },
              { icon: 'U', active: false, label: 'Underline' },
              { icon: 'S', active: false, label: 'Strikethrough' },
            ].map((item, index) => (
              <button
                key={index}
                title={item.label}
                style={{
                  width: '36px',
                  height: '36px',
                  backgroundColor: item.active ? '#1890ff' : 'transparent',
                  color: item.active ? 'white' : '#595959',
                  border: '1px solid #d9d9d9',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold',
                  fontSize: '0.875rem',
                }}
              >
                {item.icon}
              </button>
            ))}
            <div style={{ width: '1px', height: '28px', backgroundColor: '#f0f0f0', margin: '0 4px' }} />
            {['←', '→'].map((icon, index) => (
              <button
                key={index}
                style={{
                  width: '36px',
                  height: '36px',
                  backgroundColor: 'transparent',
                  color: '#595959',
                  border: '1px solid #d9d9d9',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1rem',
                }}
              >
                {icon}
              </button>
            ))}
          </Group>
        </div>

        {/* Navigation Tabs */}
        <div style={{ marginBottom: '2.5rem' }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.75rem', color: '#52c41a' }}>
            🗂️ Navigation Tabs
          </h3>
          <p style={{ fontSize: '0.875rem', color: '#666', marginBottom: '1rem' }}>
            Tab navigation with active state indication and seamless borders using <code>gap="0"</code>.
          </p>
          <Group gap="0" style={{ 
            backgroundColor: '#ffffff', 
            border: '1px solid #f0f0f0', 
            borderRadius: '8px',
            overflow: 'hidden',
          }}>
            {[
              { label: 'Dashboard', active: true },
              { label: 'Analytics', active: false },
              { label: 'Reports', active: false },
              { label: 'Settings', active: false },
            ].map((tab, index) => (
              <button
                key={index}
                style={{
                  padding: '12px 24px',
                  backgroundColor: tab.active ? '#f0f2f5' : 'transparent',
                  color: tab.active ? '#1890ff' : '#595959',
                  border: 'none',
                  borderRight: index < 3 ? '1px solid #f0f0f0' : 'none',
                  cursor: 'pointer',
                  fontWeight: tab.active ? '500' : 'normal',
                  fontSize: '0.875rem',
                  transition: 'all 0.2s',
                }}
              >
                {tab.label}
              </button>
            ))}
          </Group>
        </div>

        {/* Badge Group */}
        <div style={{ marginBottom: '2.5rem' }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.75rem', color: '#722ed1' }}>
            🏷️ Status Badge Group
          </h3>
          <p style={{ fontSize: '0.875rem', color: '#666', marginBottom: '1rem' }}>
            Collection of status badges with wrapping enabled using <code>gap="sm"</code> and <code>wrap="wrap"</code>.
          </p>
          <Group gap="sm" wrap="wrap" style={{ 
            padding: '1rem', 
            backgroundColor: '#fafafa', 
            border: '1px solid #f0f0f0', 
            borderRadius: '8px' 
          }}>
            {[
              { label: 'Active', color: '#52c41a', bg: '#f6ffed' },
              { label: 'Pending', color: '#faad14', bg: '#fff7e6' },
              { label: 'Processing', color: '#1890ff', bg: '#e6f7ff' },
              { label: 'Completed', color: '#722ed1', bg: '#f9f0ff' },
              { label: 'Cancelled', color: '#ff4d4f', bg: '#fff1f0' },
              { label: 'Draft', color: '#8c8c8c', bg: '#fafafa' },
            ].map((badge, index) => (
              <span
                key={index}
                style={{
                  padding: '4px 12px',
                  backgroundColor: badge.bg,
                  color: badge.color,
                  border: `1px solid ${badge.color}`,
                  borderRadius: '12px',
                  fontSize: '0.75rem',
                  fontWeight: '500',
                }}
              >
                {badge.label}
              </span>
            ))}
          </Group>
        </div>

        {/* Growing Buttons */}
        <div style={{ marginBottom: '2.5rem' }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.75rem', color: '#eb2f96' }}>
            ⚖️ Equal-Width Button Group
          </h3>
          <p style={{ fontSize: '0.875rem', color: '#666', marginBottom: '1rem' }}>
            Buttons with equal width distribution using <code>grow={`{true}`}</code> for balanced layouts.
          </p>
          <Group grow gap="sm" style={{ 
            padding: '1rem', 
            backgroundColor: '#ffffff', 
            border: '1px solid #f0f0f0', 
            borderRadius: '8px' 
          }}>
            <button style={{
              padding: '14px',
              backgroundColor: '#52c41a',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: '500',
              fontSize: '0.875rem',
            }}>
              ✓ Accept
            </button>
            <button style={{
              padding: '14px',
              backgroundColor: '#ff4d4f',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: '500',
              fontSize: '0.875rem',
            }}>
              ✕ Decline
            </button>
            <button style={{
              padding: '14px',
              backgroundColor: '#faad14',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: '500',
              fontSize: '0.875rem',
            }}>
              ⏸ Postpone
            </button>
          </Group>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      source: {
        state: 'open',
        code: `// Basic button toolbar
<Group gap="sm">
  <button>Save</button>
  <button>Cancel</button>
  <button>Preview</button>
</Group>

// Icon toolbar with minimal spacing
<Group gap="xs">
  <button>B</button>
  <button>I</button>
  <button>U</button>
</Group>

// Navigation tabs (no gap)
<Group gap="0">
  <button>Dashboard</button>
  <button>Analytics</button>
  <button>Reports</button>
</Group>

// Badge group with wrapping
<Group gap="sm" wrap="wrap">
  <span>Active</span>
  <span>Pending</span>
  <span>Processing</span>
  <span>Completed</span>
</Group>

// Equal-width buttons
<Group grow gap="sm">
  <button>Accept</button>
  <button>Decline</button>
  <button>Postpone</button>
</Group>

// Responsive Group
<Group
  gap={{ xs: 'sm', md: 'md', lg: 'lg' }}
  align={{ xs: 'stretch', md: 'center' }}
  justify={{ xs: 'center', lg: 'flex-start' }}
  wrap={{ xs: 'wrap', md: 'nowrap' }}
  grow={{ xs: true, md: false }}
>
  <button>Button 1</button>
  <button>Button 2</button>
  <button>Button 3</button>
</Group>

// Alignment options
<Group align="center" justify="space-between" gap="md">
  <span>Left</span>
  <span>Center</span>
  <span>Right</span>
</Group>`,
      },
    },
  },
};
