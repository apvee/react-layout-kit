import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Container } from '../components/Container';

/**
 * Meta configuration for Container component stories
 */
const meta: Meta<typeof Container> = {
  title: 'Components/Layouts/Container',
  component: Container,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# Container Component

A layout component that centers content horizontally and controls maximum width. Perfect for creating consistent page layouts with controlled content width across your application.

## Key Features

- **Automatic Horizontal Centering**: Uses CSS auto margins to center content horizontally
- **Configurable Maximum Width**: Control content width with the \`size\` prop (default: 1200px)
- **Fluid Mode**: Full-width layouts with the \`fluid\` prop
- **Responsive Behavior**: 
  - Both \`size\` and \`fluid\` props support responsive values using breakpoint objects
  - Responsive functionality requires \`containerWidth\` prop for proper resolution
  - Without \`containerWidth\`, falls back to first valid key from responsive objects
- **Built-in Padding**: Includes default horizontal padding (1rem) for better readability
- **Box-Sizing**: Uses \`border-box\` to include padding in width calculations

## When to Use

- **Page Layouts**: Create consistent max-width content areas across pages
- **Article Content**: Narrow containers (600-800px) for optimal reading line length
- **Form Layouts**: Medium containers (500-600px) for focused form experiences
- **Dashboard Layouts**: Fluid containers for full-width data displays
- **Hero Sections**: Wide containers (1200px+) for prominent content areas
- **Responsive Designs**: Different container sizes at different breakpoints

## Responsive Behavior Notes

⚠️ **Important**: For full responsive functionality, always provide the \`containerWidth\` prop when using responsive values.

Without \`containerWidth\`:
- The component cannot measure its own width (circular dependency)
- Falls back to the first valid key in responsive objects
- Example: \`size={{ xs: 320, md: 768 }}\` will use \`320\` as fallback

With \`containerWidth\`:
- Full responsive resolution based on current width
- Proper breakpoint matching
- Example: \`containerWidth={800}\` will correctly resolve to \`md\` breakpoint value

## Accessibility

The Container component is purely presentational and does not affect accessibility. Ensure that contained content maintains proper semantic structure and heading hierarchy.

## Examples

\`\`\`tsx
// Basic container with default max-width (1200px)
<Container>
  <h1>Page Title</h1>
  <p>Content goes here...</p>
</Container>

// Custom size container for articles
<Container size={700}>
  <article>Narrow content for better reading</article>
</Container>

// Fluid container for dashboards
<Container fluid>
  <div>Full-width dashboard layout</div>
</Container>

// Responsive container with proper containerWidth
<Container 
  size={{ xs: 320, md: 768, lg: 1200 }}
  containerWidth={800}
>
  <div>Properly responsive container</div>
</Container>

// Responsive fluid behavior
<Container 
  size={800}
  fluid={{ xs: true, md: false }}
  containerWidth={600}
>
  <div>Fluid on mobile, constrained on desktop</div>
</Container>
\`\`\`
        `,
      },
      source: {
        state: 'open',
      },
    },
  },
  argTypes: {
    // Container-specific props
    size: {
      control: 'number',
      description: 'Maximum width of the container in pixels. Supports responsive values using breakpoint objects.',
      table: {
        type: { summary: 'number | ResponsiveValue<number>' },
        defaultValue: { summary: '1200' },
      },
    },

    fluid: {
      control: 'boolean',
      description: 'If true, the container uses full width (100%) ignoring the size prop. Supports responsive values using breakpoint objects.',
      table: {
        type: { summary: 'boolean | ResponsiveValue<boolean>' },
        defaultValue: { summary: 'false' },
      },
    },

    // Core Box props
    containerWidth: {
      control: 'number',
      description: 'Fixed container width to use for responsive calculations instead of measuring. Required for proper responsive behavior with responsive size/fluid values.',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: 'undefined' },
      },
    },

    asChild: {
      control: 'boolean',
      description: 'When true, the Container will render as its child element, merging props and refs. Uses Radix UI Slot for robust prop merging.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },

    styleReset: {
      control: 'boolean',
      description: 'Whether to apply basic style reset (box-sizing: border-box).',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },

    // Spacing props (margin)
    m: {
      control: 'text',
      description: 'Margin (all sides). Supports spacing scale keys (xs, sm, md, lg, xl, xxl, xxxl) or number/string values.',
      table: {
        type: { summary: 'SpacingValue | ResponsiveValue<SpacingValue>' },
        category: 'Spacing - Margin',
      },
    },
    mt: {
      control: 'text',
      description: 'Margin top',
      table: {
        type: { summary: 'SpacingValue | ResponsiveValue<SpacingValue>' },
        category: 'Spacing - Margin',
      },
    },
    mb: {
      control: 'text',
      description: 'Margin bottom',
      table: {
        type: { summary: 'SpacingValue | ResponsiveValue<SpacingValue>' },
        category: 'Spacing - Margin',
      },
    },
    ml: {
      control: 'text',
      description: 'Margin left',
      table: {
        type: { summary: 'SpacingValue | ResponsiveValue<SpacingValue>' },
        category: 'Spacing - Margin',
      },
    },
    mr: {
      control: 'text',
      description: 'Margin right',
      table: {
        type: { summary: 'SpacingValue | ResponsiveValue<SpacingValue>' },
        category: 'Spacing - Margin',
      },
    },
    mx: {
      control: 'text',
      description: 'Margin inline (left + right)',
      table: {
        type: { summary: 'SpacingValue | ResponsiveValue<SpacingValue>' },
        category: 'Spacing - Margin',
      },
    },
    my: {
      control: 'text',
      description: 'Margin block (top + bottom)',
      table: {
        type: { summary: 'SpacingValue | ResponsiveValue<SpacingValue>' },
        category: 'Spacing - Margin',
      },
    },

    // Spacing props (padding)
    p: {
      control: 'text',
      description: 'Padding (all sides). Supports spacing scale keys (xs, sm, md, lg, xl, xxl, xxxl) or number/string values.',
      table: {
        type: { summary: 'SpacingValue | ResponsiveValue<SpacingValue>' },
        category: 'Spacing - Padding',
      },
    },
    pt: {
      control: 'text',
      description: 'Padding top',
      table: {
        type: { summary: 'SpacingValue | ResponsiveValue<SpacingValue>' },
        category: 'Spacing - Padding',
      },
    },
    pb: {
      control: 'text',
      description: 'Padding bottom',
      table: {
        type: { summary: 'SpacingValue | ResponsiveValue<SpacingValue>' },
        category: 'Spacing - Padding',
      },
    },
    pl: {
      control: 'text',
      description: 'Padding left',
      table: {
        type: { summary: 'SpacingValue | ResponsiveValue<SpacingValue>' },
        category: 'Spacing - Padding',
      },
    },
    pr: {
      control: 'text',
      description: 'Padding right',
      table: {
        type: { summary: 'SpacingValue | ResponsiveValue<SpacingValue>' },
        category: 'Spacing - Padding',
      },
    },
    px: {
      control: 'text',
      description: 'Padding inline (left + right)',
      table: {
        type: { summary: 'SpacingValue | ResponsiveValue<SpacingValue>' },
        category: 'Spacing - Padding',
      },
    },
    py: {
      control: 'text',
      description: 'Padding block (top + bottom)',
      table: {
        type: { summary: 'SpacingValue | ResponsiveValue<SpacingValue>' },
        category: 'Spacing - Padding',
      },
    },

    // Size props
    w: {
      control: 'text',
      description: 'Width (supports CSS values)',
      table: {
        type: { summary: 'CSS.Property.Width | ResponsiveValue<CSS.Property.Width>' },
        category: 'Size',
      },
    },
    h: {
      control: 'text',
      description: 'Height (supports CSS values)',
      table: {
        type: { summary: 'CSS.Property.Height | ResponsiveValue<CSS.Property.Height>' },
        category: 'Size',
      },
    },
    miw: {
      control: 'text',
      description: 'Min width',
      table: {
        type: { summary: 'CSS.Property.MinWidth | ResponsiveValue<CSS.Property.MinWidth>' },
        category: 'Size',
      },
    },
    maw: {
      control: 'text',
      description: 'Max width',
      table: {
        type: { summary: 'CSS.Property.MaxWidth | ResponsiveValue<CSS.Property.MaxWidth>' },
        category: 'Size',
      },
    },
    mih: {
      control: 'text',
      description: 'Min height',
      table: {
        type: { summary: 'CSS.Property.MinHeight | ResponsiveValue<CSS.Property.MinHeight>' },
        category: 'Size',
      },
    },
    mah: {
      control: 'text',
      description: 'Max height',
      table: {
        type: { summary: 'CSS.Property.MaxHeight | ResponsiveValue<CSS.Property.MaxHeight>' },
        category: 'Size',
      },
    },

    // Position props
    top: {
      control: 'text',
      description: 'Top position',
      table: {
        type: { summary: 'CSS.Property.Top | ResponsiveValue<CSS.Property.Top>' },
        category: 'Position',
      },
    },
    left: {
      control: 'text',
      description: 'Left position',
      table: {
        type: { summary: 'CSS.Property.Left | ResponsiveValue<CSS.Property.Left>' },
        category: 'Position',
      },
    },
    bottom: {
      control: 'text',
      description: 'Bottom position',
      table: {
        type: { summary: 'CSS.Property.Bottom | ResponsiveValue<CSS.Property.Bottom>' },
        category: 'Position',
      },
    },
    right: {
      control: 'text',
      description: 'Right position',
      table: {
        type: { summary: 'CSS.Property.Right | ResponsiveValue<CSS.Property.Right>' },
        category: 'Position',
      },
    },

    // Standard HTML props
    className: {
      control: 'text',
      description: 'CSS class name for custom styling',
      table: {
        type: { summary: 'string' },
        category: 'HTML Attributes',
      },
    },
    style: {
      control: 'object',
      description: 'Inline styles (object)',
      table: {
        type: { summary: 'React.CSSProperties' },
        category: 'HTML Attributes',
      },
    },
    children: {
      control: false,
      description: 'Content to be contained and centered',
      table: {
        type: { summary: 'React.ReactNode' },
        category: 'HTML Attributes',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Container>;

/**
 * Default usage story showcasing the Container component with interactive controls.
 * This story demonstrates all the main features and props of the Container component.
 */
export const Usage: Story = {
  args: {
    size: 900,
    fluid: false,
    containerWidth: undefined,
    asChild: false,
    styleReset: false,
    py: 'xl',
    style: {
      backgroundColor: '#ffffff',
      border: '1px solid #e0e0e0',
      borderRadius: '12px',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
    },
    children: (
      <div>
        {/* Hero Section */}
        <div
          style={{
            textAlign: 'center',
            padding: '3rem 0',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: '8px',
            marginBottom: '3rem',
            color: 'white',
          }}
        >
          <div style={{ fontSize: '64px', marginBottom: '1rem' }}>🎯</div>
          <h1
            style={{
              margin: '0 0 1rem 0',
              fontSize: '36px',
              fontWeight: '700',
            }}
          >
            Container Component
          </h1>
          <p
            style={{
              margin: '0 0 1.5rem 0',
              fontSize: '18px',
              opacity: 0.95,
              maxWidth: '600px',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            Perfectly centered content with controlled maximum width for optimal layout and readability
          </p>
          <button
            style={{
              padding: '12px 32px',
              backgroundColor: 'white',
              color: '#667eea',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
              transition: 'transform 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            Get Started
          </button>
        </div>

        {/* Feature Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '2rem',
            marginBottom: '3rem',
          }}
        >
          {[
            {
              icon: '📐',
              title: 'Controlled Width',
              description: 'Set maximum width with the size prop for perfect content containment',
              color: '#1890ff',
            },
            {
              icon: '🎯',
              title: 'Auto Centering',
              description: 'Automatic horizontal centering using CSS auto margins',
              color: '#52c41a',
            },
            {
              icon: '📱',
              title: 'Responsive',
              description: 'Supports responsive values for different breakpoints',
              color: '#fa8c16',
            },
            {
              icon: '🌊',
              title: 'Fluid Mode',
              description: 'Full-width layouts with the fluid prop option',
              color: '#eb2f96',
            },
          ].map((feature, index) => (
            <div
              key={index}
              style={{
                padding: '2rem',
                backgroundColor: '#fafafa',
                border: '1px solid #f0f0f0',
                borderRadius: '8px',
                textAlign: 'center',
                transition: 'transform 0.2s, box-shadow 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={{ fontSize: '48px', marginBottom: '1rem' }}>{feature.icon}</div>
              <h3
                style={{
                  margin: '0 0 0.75rem 0',
                  fontSize: '20px',
                  fontWeight: '600',
                  color: feature.color,
                }}
              >
                {feature.title}
              </h3>
              <p
                style={{
                  margin: 0,
                  fontSize: '14px',
                  color: '#595959',
                  lineHeight: '1.6',
                }}
              >
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Content Section */}
        <div
          style={{
            backgroundColor: '#f8f9fa',
            padding: '2rem',
            borderRadius: '8px',
            marginBottom: '2rem',
          }}
        >
          <h2
            style={{
              margin: '0 0 1rem 0',
              fontSize: '24px',
              fontWeight: '600',
              color: '#262626',
            }}
          >
            About Container Component
          </h2>
          <p
            style={{
              margin: '0 0 1rem 0',
              fontSize: '16px',
              color: '#595959',
              lineHeight: '1.7',
            }}
          >
            The Container component is a fundamental layout primitive that provides consistent content
            width and automatic horizontal centering. It's perfect for creating professional page layouts
            where content needs to be constrained to a maximum width for better readability and visual
            hierarchy.
          </p>
          <p
            style={{
              margin: 0,
              fontSize: '16px',
              color: '#595959',
              lineHeight: '1.7',
            }}
          >
            Use the controls below to experiment with different container sizes, fluid behavior, and
            responsive settings. The container includes built-in horizontal padding and uses border-box
            sizing for predictable layout behavior.
          </p>
        </div>

        {/* Stats Section */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: '1.5rem',
            padding: '2rem',
            backgroundColor: '#fff7e6',
            border: '1px solid #ffd591',
            borderRadius: '8px',
          }}
        >
          {[
            { label: 'Default Size', value: '1200px' },
            { label: 'Current Size', value: '900px' },
            { label: 'Fluid Mode', value: 'Off' },
            { label: 'Built-in Padding', value: '1rem' },
          ].map((stat, index) => (
            <div key={index} style={{ textAlign: 'center' }}>
              <div
                style={{
                  fontSize: '24px',
                  fontWeight: 'bold',
                  color: '#d46b08',
                  marginBottom: '0.25rem',
                }}
              >
                {stat.value}
              </div>
              <div style={{ fontSize: '12px', color: '#ad6800', textTransform: 'uppercase' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  decorators: [
    (Story: React.ComponentType) => (
      <div style={{ backgroundColor: '#f5f5f5', minHeight: '100vh', padding: '2rem 0' }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      source: {
        state: 'open',
        code: `<Container
  size={900}
  py="xl"
  style={{
    backgroundColor: '#ffffff',
    border: '1px solid #e0e0e0',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
  }}
>
  {/* Hero Section */}
  <div
    style={{
      textAlign: 'center',
      padding: '3rem 0',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      borderRadius: '8px',
      marginBottom: '3rem',
      color: 'white',
    }}
  >
    <div style={{ fontSize: '64px', marginBottom: '1rem' }}>🎯</div>
    <h1 style={{ margin: '0 0 1rem 0', fontSize: '36px', fontWeight: '700' }}>
      Container Component
    </h1>
    <p style={{ margin: '0 0 1.5rem 0', fontSize: '18px', opacity: 0.95 }}>
      Perfectly centered content with controlled maximum width
    </p>
    <button
      style={{
        padding: '12px 32px',
        backgroundColor: 'white',
        color: '#667eea',
        border: 'none',
        borderRadius: '8px',
        fontSize: '16px',
        fontWeight: '600',
        cursor: 'pointer',
      }}
    >
      Get Started
    </button>
  </div>

  {/* Feature Grid */}
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '2rem',
    }}
  >
    {/* Feature cards... */}
  </div>
</Container>`,
      },
    },
  },
};