import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Space } from '../components/Space';
import type { SpaceProps } from '../components/Space/Space.types';

/**
 * Meta configuration for Space component stories
 */
const meta: Meta<typeof Space> = {
  title: 'Components/Layouts/Space',
  component: Space,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
# Space Component

A component that adds horizontal or vertical spacing using the theme's spacing scale. Perfect for creating consistent spacing between elements without using margins or padding.

## Key Features

- **Horizontal Spacing**: Use the \`w\` prop to add width-based spacing between elements
- **Vertical Spacing**: Use the \`h\` prop to add height-based spacing between elements
- **Spacing Scale**: Support for predefined spacing values (\`xs\`, \`sm\`, \`md\`, \`lg\`, \`xl\`, \`xxl\`, \`xxxl\`)
- **Custom Values**: Accept any valid CSS value (rem, px, %, etc.)
- **Responsive Spacing**: Both \`w\` and \`h\` props support responsive values using breakpoint objects
- **Flex-Friendly**: Uses \`flex-shrink: 0\` to prevent shrinking in flex containers
- **Semantic Separation**: Creates visual separation without affecting element margins
- **Zero Overhead**: Renders as a simple div with width/height only when needed

## When to Use

- **Button Toolbars**: Consistent spacing between action buttons
- **Content Sections**: Vertical spacing between article sections and headings
- **Navigation**: Spacing in breadcrumbs, menus, and navigation bars
- **Card Layouts**: Spacing between and within card elements
- **Form Groups**: Separating form fields and labels
- **Icon Toolbars**: Tight spacing in icon-based toolbars
- **List Items**: Consistent spacing in custom list layouts

## Spacing Scale

The default spacing scale includes:
- \`xs\`: Extra small spacing (typically 4-8px)
- \`sm\`: Small spacing (typically 8-12px)
- \`md\`: Medium spacing (typically 16-20px)
- \`lg\`: Large spacing (typically 24-32px)
- \`xl\`: Extra large spacing (typically 32-48px)
- \`xxl\`: Double extra large spacing (typically 48-64px)
- \`xxxl\`: Triple extra large spacing (typically 64-96px)

## Responsive Behavior

The \`containerWidth\` prop enables proper responsive resolution:
- When provided, spacing values resolve based on current container width and breakpoints
- Without it, the component measures its container for responsive calculations
- Responsive objects like \`{ xs: 'sm', md: 'lg' }\` change spacing at different breakpoints

## Accessibility

The Space component is purely presentational and creates visual spacing only. It does not affect accessibility, keyboard navigation, or screen reader behavior.

## Best Practices

✅ **Do:**
- Use predefined spacing scale for consistency
- Use Space for layout spacing, not content margins
- Combine with flex/grid layouts for powerful layouts
- Use responsive spacing for adaptive designs

❌ **Don't:**
- Use Space as a replacement for proper layout components
- Overuse custom values (stick to the scale when possible)
- Use Space for structural layout (use Grid, Flex, Stack instead)
- Apply margins or padding to Space itself

## Examples

\`\`\`tsx
// Horizontal spacing in flex layout
<div style={{ display: 'flex' }}>
  <button>Save</button>
  <Space w="md" />
  <button>Cancel</button>
</div>

// Vertical spacing in content
<div>
  <h2>Section Title</h2>
  <Space h="lg" />
  <p>Section content...</p>
</div>

// Responsive spacing
<Space 
  w={{ xs: 'sm', md: 'lg' }}
  h={{ xs: 'md', md: 'xl' }}
/>

// Custom spacing
<Space w="3rem" h="40px" />

// In button toolbar
<div style={{ display: 'flex' }}>
  <button>Edit</button>
  <Space w="sm" />
  <button>Copy</button>
  <Space w="sm" />
  <button>Delete</button>
</div>
\`\`\`
        `,
      },
      source: {
        state: 'open',
      },
    },
  },
  argTypes: {
    // Space-specific props
    w: {
      control: 'text',
      description: 'Horizontal spacing (width). Can be a spacing scale key (xs, sm, md, lg, xl, xxl, xxxl), a number (converted to rem), or any valid CSS value. Supports responsive values using breakpoint objects.',
      table: {
        type: { summary: 'SpacingValue | ResponsiveValue<SpacingValue>' },
        defaultValue: { summary: 'undefined' },
      },
    },

    h: {
      control: 'text',
      description: 'Vertical spacing (height). Can be a spacing scale key (xs, sm, md, lg, xl, xxl, xxxl), a number (converted to rem), or any valid CSS value. Supports responsive values using breakpoint objects.',
      table: {
        type: { summary: 'SpacingValue | ResponsiveValue<SpacingValue>' },
        defaultValue: { summary: 'undefined' },
      },
    },

    // Core props
    containerWidth: {
      control: 'number',
      description: 'Optional container width for responsive prop resolution. If not provided, the component will measure its container width.',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: 'undefined' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Space>;

/**
 * Default usage story showcasing the Space component with interactive controls.
 * This story demonstrates all the main features and props of the Space component.
 */
export const Usage: Story = {
  args: {
    w: 'lg',
    h: undefined,
    containerWidth: undefined,
  },
  render: (args) => (
    <div
      style={{
        backgroundColor: '#ffffff',
        border: '1px solid #e0e0e0',
        borderRadius: '12px',
        padding: '3rem',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
      }}
    >
      {/* Hero Section */}
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <div style={{ fontSize: '64px', marginBottom: '1rem' }}>↔️</div>
        <h1
          style={{
            margin: '0 0 1rem 0',
            fontSize: '36px',
            fontWeight: '700',
            color: '#262626',
          }}
        >
          Space Component
        </h1>
        <p
          style={{
            margin: '0',
            fontSize: '18px',
            color: '#595959',
            maxWidth: '600px',
            marginLeft: 'auto',
            marginRight: 'auto',
            lineHeight: 1.6,
          }}
        >
          Create consistent spacing between elements using the predefined spacing scale or custom values
        </p>
      </div>

      {/* Interactive Demo */}
      <div
        style={{
          backgroundColor: '#f8f9fa',
          padding: '2rem',
          borderRadius: '8px',
          marginBottom: '3rem',
          border: '2px dashed #d9d9d9',
        }}
      >
        <h3
          style={{
            margin: '0 0 1.5rem 0',
            fontSize: '20px',
            fontWeight: '600',
            color: '#262626',
            textAlign: 'center',
          }}
        >
          Live Demo - Adjust Controls Below
        </h3>

        {/* Horizontal Spacing Demo */}
        <div style={{ marginBottom: '2rem' }}>
          <div
            style={{
              fontSize: '14px',
              color: '#8c8c8c',
              marginBottom: '1rem',
              textAlign: 'center',
            }}
          >
            Horizontal Spacing (w prop)
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                padding: '1rem 1.5rem',
                backgroundColor: '#1890ff',
                color: 'white',
                borderRadius: '6px',
                fontWeight: '500',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              }}
            >
              Left Element
            </div>
            <Space {...args} h={undefined} />
            <div
              style={{
                padding: '1rem 1.5rem',
                backgroundColor: '#52c41a',
                color: 'white',
                borderRadius: '6px',
                fontWeight: '500',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              }}
            >
              Right Element
            </div>
          </div>
        </div>

        {/* Vertical Spacing Demo */}
        <div>
          <div
            style={{
              fontSize: '14px',
              color: '#8c8c8c',
              marginBottom: '1rem',
              textAlign: 'center',
            }}
          >
            Vertical Spacing (h prop)
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                padding: '1rem 2rem',
                backgroundColor: '#fa8c16',
                color: 'white',
                borderRadius: '6px',
                fontWeight: '500',
                textAlign: 'center',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              }}
            >
              Top Element
            </div>
            <Space {...args} w={undefined} h={args.h || 'lg'} />
            <div
              style={{
                padding: '1rem 2rem',
                backgroundColor: '#722ed1',
                color: 'white',
                borderRadius: '6px',
                fontWeight: '500',
                textAlign: 'center',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              }}
            >
              Bottom Element
            </div>
          </div>
        </div>
      </div>

      {/* Spacing Scale Reference */}
      <div
        style={{
          backgroundColor: '#fff7e6',
          padding: '2rem',
          borderRadius: '8px',
          marginBottom: '3rem',
          border: '1px solid #ffd591',
        }}
      >
        <h3
          style={{
            margin: '0 0 1.5rem 0',
            fontSize: '20px',
            fontWeight: '600',
            color: '#d46b08',
          }}
        >
          📏 Spacing Scale Reference
        </h3>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem',
          }}
        >
          {[
            { key: 'xs', label: 'Extra Small', desc: '4-8px' },
            { key: 'sm', label: 'Small', desc: '8-12px' },
            { key: 'md', label: 'Medium', desc: '16-20px' },
            { key: 'lg', label: 'Large', desc: '24-32px' },
            { key: 'xl', label: 'Extra Large', desc: '32-48px' },
            { key: 'xxl', label: '2X Large', desc: '48-64px' },
          ].map((item) => (
            <div
              key={item.key}
              style={{
                backgroundColor: 'white',
                padding: '1rem',
                borderRadius: '6px',
                border: '1px solid #ffe7ba',
              }}
            >
              <div
                style={{
                  fontFamily: 'monospace',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#d46b08',
                  marginBottom: '0.25rem',
                }}
              >
                {item.key}
              </div>
              <div style={{ fontSize: '12px', color: '#8c8c8c', marginBottom: '0.25rem' }}>
                {item.label}
              </div>
              <div style={{ fontSize: '11px', color: '#ad6800' }}>
                {item.desc}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Use Cases */}
      <div>
        <h3
          style={{
            margin: '0 0 1.5rem 0',
            fontSize: '20px',
            fontWeight: '600',
            color: '#262626',
          }}
        >
          💡 Common Use Cases
        </h3>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1rem',
          }}
        >
          {[
            {
              icon: '🔘',
              title: 'Button Toolbars',
              description: 'Consistent spacing between action buttons and controls',
              color: '#1890ff',
            },
            {
              icon: '📄',
              title: 'Content Sections',
              description: 'Vertical spacing between article sections and headings',
              color: '#52c41a',
            },
            {
              icon: '🧭',
              title: 'Navigation',
              description: 'Spacing in breadcrumbs, menus, and navigation items',
              color: '#fa8c16',
            },
            {
              icon: '📋',
              title: 'Form Groups',
              description: 'Separating form fields, labels, and input groups',
              color: '#722ed1',
            },
          ].map((useCase, index) => (
            <div
              key={index}
              style={{
                padding: '1.5rem',
                backgroundColor: '#fafafa',
                border: '1px solid #f0f0f0',
                borderRadius: '8px',
              }}
            >
              <div style={{ fontSize: '32px', marginBottom: '0.75rem' }}>
                {useCase.icon}
              </div>
              <h4
                style={{
                  margin: '0 0 0.5rem 0',
                  fontSize: '16px',
                  fontWeight: '600',
                  color: useCase.color,
                }}
              >
                {useCase.title}
              </h4>
              <p
                style={{
                  margin: 0,
                  fontSize: '14px',
                  color: '#595959',
                  lineHeight: 1.5,
                }}
              >
                {useCase.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      source: {
        state: 'open',
        code: `// Horizontal spacing between elements
<div style={{ display: 'flex', alignItems: 'center' }}>
  <button>Save</button>
  <Space w="lg" />
  <button>Cancel</button>
</div>

// Vertical spacing between sections
<div>
  <h2>Section Title</h2>
  <Space h="lg" />
  <p>Section content...</p>
</div>

// Responsive spacing
<Space 
  w={{ xs: 'sm', md: 'lg' }}
  h={{ xs: 'md', md: 'xl' }}
/>

// Custom values
<Space w="3rem" h="40px" />`,
      },
    },
  },
};
