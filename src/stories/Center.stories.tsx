import type { Meta, StoryObj } from '@storybook/react';
import { Center } from '../components/Center';

/**
 * Meta configuration for Center component stories
 */
const meta: Meta<typeof Center> = {
  title: 'Components/Layouts/Center',
  component: Center,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
# Center Component

A flexbox-based component that centers content both vertically and horizontally. Perfect for centering single elements, text, or any content that needs to be positioned in the exact center of its container.

## Key Features

- **Perfect Centering**: Uses CSS flexbox with \`align-items: center\` and \`justify-content: center\`
- **Display Modes**: 
  - Default: Uses \`display: flex\` for block-level centering
  - Inline: Uses \`display: inline-flex\` when \`inline\` prop is true
- **Responsive Behavior**: The \`inline\` prop supports responsive values for different display modes at different breakpoints
- **Container Width Measurement**: Automatic or manual container width for responsive prop resolution
- **No Inline Styles**: All styles are applied via Box component props

## When to Use

- Centering buttons or CTAs in a container
- Creating loading states with centered spinners
- Centering cards, modals, or dialog content
- Centering icons in circular or square containers
- Creating badge-like inline centered elements
- Empty states with centered messages

## Accessibility

The Center component is purely presentational and does not affect accessibility. Ensure that centered content maintains proper semantic structure and keyboard navigation.

## Examples

\`\`\`tsx
// Basic centering
<Center>
  <button>Centered Button</button>
</Center>

// Inline centering with responsive behavior
<Center inline={{ xs: true, md: false }}>
  <span>Badge</span>
</Center>

// With Box props for styling
<Center w="100%" h="200px" style={{ backgroundColor: '#f0f0f0' }}>
  <div>Centered Content</div>
</Center>
\`\`\`
        `,
      },
      source: {
        state: 'open',
      },
    },
  },
  argTypes: {
    // Center-specific props
    inline: {
      control: 'boolean',
      description: 'If set, inline-flex is used instead of flex. Supports responsive values using breakpoint objects.',
      table: {
        type: { summary: 'boolean | ResponsiveValue<boolean>' },
        defaultValue: { summary: 'false' },
      },
    },

    // Core Box props
    containerWidth: {
      control: 'number',
      description: 'Fixed container width to use for responsive calculations instead of measuring. When provided, disables automatic width measurement.',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: 'undefined' },
      },
    },

    asChild: {
      control: 'boolean',
      description: 'When true, the Center will render as its child element, merging props and refs. Uses Radix UI Slot for robust prop merging.',
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
      description: 'Content to be centered',
      table: {
        type: { summary: 'React.ReactNode' },
        category: 'HTML Attributes',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Center>;

/**
 * Default usage story showcasing the Center component with interactive controls.
 * This story demonstrates all the main features and props of the Center component.
 */
export const Usage: Story = {
  args: {
    inline: false,
    containerWidth: undefined,
    asChild: false,
    styleReset: false,
    w: '100%',
    h: '300px',
    m: undefined,
    p: 'md',
    style: {
      backgroundColor: '#f0f2f5',
      border: '2px dashed #d9d9d9',
      borderRadius: '8px',
    },
    children: (
      <div
        style={{
          padding: '2rem',
          backgroundColor: '#1890ff',
          color: 'white',
          borderRadius: '12px',
          textAlign: 'center',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          maxWidth: '400px',
        }}
      >
        <div
          style={{
            fontSize: '48px',
            marginBottom: '1rem',
          }}
        >
          ✨
        </div>
        <h3
          style={{
            margin: '0 0 0.5rem 0',
            fontSize: '24px',
            fontWeight: '600',
          }}
        >
          Perfectly Centered
        </h3>
        <p
          style={{
            margin: '0 0 1.5rem 0',
            fontSize: '16px',
            lineHeight: '1.5',
            opacity: 0.9,
          }}
        >
          This content is centered both vertically and horizontally using flexbox.
          Try changing the props in the controls below!
        </p>
        <button
          style={{
            padding: '10px 20px',
            backgroundColor: 'white',
            color: '#1890ff',
            border: 'none',
            borderRadius: '6px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'transform 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          Get Started
        </button>
      </div>
    ),
  },
  parameters: {
    docs: {
      source: {
        state: 'open',
        code: `<Center
  w="100%"
  h="300px"
  p="md"
  style={{
    backgroundColor: '#f0f2f5',
    border: '2px dashed #d9d9d9',
    borderRadius: '8px',
  }}
>
  <div
    style={{
      padding: '2rem',
      backgroundColor: '#1890ff',
      color: 'white',
      borderRadius: '12px',
      textAlign: 'center',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
      maxWidth: '400px',
    }}
  >
    <div style={{ fontSize: '48px', marginBottom: '1rem' }}>✨</div>
    <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '24px', fontWeight: '600' }}>
      Perfectly Centered
    </h3>
    <p style={{ margin: '0 0 1.5rem 0', fontSize: '16px', lineHeight: '1.5', opacity: 0.9 }}>
      This content is centered both vertically and horizontally using flexbox.
      Try changing the props in the controls below!
    </p>
    <button
      style={{
        padding: '10px 20px',
        backgroundColor: 'white',
        color: '#1890ff',
        border: 'none',
        borderRadius: '6px',
        fontSize: '14px',
        fontWeight: '600',
        cursor: 'pointer',
      }}
    >
      Get Started
    </button>
  </div>
</Center>`,
      },
    },
  },
};