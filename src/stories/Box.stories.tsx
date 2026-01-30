import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Box, Stack } from '..';

function ExampleFrame({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <Box $display="grid" gap="sm">
      <Box style={{ fontSize: 12, fontWeight: 600, color: '#64748b' }}>{label}</Box>
      {children}
    </Box>
  );
}

const meta = {
  title: 'Components/Box',
  component: Box,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
Box is the foundational layout primitive of this library. It renders a \`div\` by default and lets you style it through:

- **Short props** (e.g. \`p\`, \`m\`, \`w\`, \`h\`, …)
- **Dollar props** (any CSS property prefixed with \`$\`, e.g. \`$display\`, \`$gap\`, \`$backgroundColor\`)

## Responsive styling

Both short and dollar props support responsive values via breakpoint objects (e.g. \`{ xs, md }\`). Breakpoints are resolved using the current container width:

- by default, Box measures its own width via \`ResizeObserver\`
- for deterministic demos/tests, you can pass \`containerWidth\` to override measurement

## Composition (asChild)

When \`asChild\` is true, Box uses the Slot pattern to **merge** its props/classes into the child element instead of rendering an extra wrapper.

## Configuration updates

Box reacts to global configuration changes (spacing/breakpoints) so updated values are reflected in the generated styles.

See the stories below for practical usage (basic styling, responsive behavior, and \`asChild\` composition).
        `.trim(),
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: 'text',
      description: 'Content rendered inside the Box.',
      table: { category: 'Core' },
    },
    asChild: {
      control: 'boolean',
      description: 'Render as the child element (Slot), merging props and refs.',
      table: { category: 'Core' },
    },
    styleReset: {
      control: 'boolean',
      description: 'Apply a basic style reset (box-sizing: border-box).',
      table: { category: 'Core' },
    },
    containerWidth: {
      control: { type: 'number', min: 0, max: 2000, step: 10 },
      description: 'Override container width used to resolve responsive values (disables measurement).',
      table: { category: 'Responsive' },
    },
    p: {
      control: 'text',
      description: 'Padding short prop (supports spacing tokens / CSS values depending on config).',
      table: { category: 'Short props' },
    },
    m: {
      control: 'text',
      description: 'Margin short prop (supports spacing tokens / CSS values depending on config).',
      table: { category: 'Short props' },
    },
    w: {
      control: 'text',
      description: 'Width short prop (CSS value).',
      table: { category: 'Short props' },
    },
    h: {
      control: 'text',
      description: 'Height short prop (CSS value).',
      table: { category: 'Short props' },
    },
    $display: {
      control: 'text',
      description: 'CSS display property.',
      table: { category: 'Dollar props' },
    },
    $gap: {
      control: 'text',
      description: 'CSS gap property (flex/grid).',
      table: { category: 'Dollar props' },
    },
    $backgroundColor: {
      control: 'text',
      description: 'CSS background-color property.',
      table: { category: 'Dollar props' },
    },
    $border: {
      control: 'text',
      description: 'CSS border property.',
      table: { category: 'Dollar props' },
    },
    $borderRadius: {
      control: 'number',
      description: 'CSS border-radius property.',
      table: { category: 'Dollar props' },
    },
  },
} satisfies Meta<typeof Box>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    children: 'Hello from Box',
    p: 'lg',
    w: '420px',
    h: '180px',
    $display: 'flex',
    $alignItems: 'center',
    $justifyContent: 'center',
    $backgroundColor: '#f1f5f9',
    $border: '1px solid #e2e8f0',
    $borderRadius: 12,
    styleReset: true,
  },
  render: (args: Partial<React.ComponentProps<typeof Box>>) => (
    <Box
      {...args}
      style={{ fontWeight: 700, fontSize: 16 }}
    />
  ),
};

export const ResponsiveValues: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Responsive values are resolved by container width. Here we force two different widths via `containerWidth` so the behavior is deterministic.',
      },
    },
  },
  render: () => (
    <Stack gap="lg">
      <ExampleFrame label="Mobile (containerWidth: 360) — column layout + smaller padding">
        <Box
          containerWidth={360}
          p={{ xs: 'sm', md: 'lg' }}
          gap={{ xs: 'sm', md: 'lg' }}
          $display="flex"
          $flexDirection={{ xs: 'column', md: 'row' }}
          $backgroundColor="#f8fafc"
          $border="1px solid #e2e8f0"
          $borderRadius={12}
        >
          <Box p="sm" $backgroundColor="#dbeafe" $borderRadius={10} style={{ fontWeight: 700 }}>
            Item 1
          </Box>
          <Box p="sm" $backgroundColor="#dcfce7" $borderRadius={10} style={{ fontWeight: 700 }}>
            Item 2
          </Box>
          <Box p="sm" $backgroundColor="#fef3c7" $borderRadius={10} style={{ fontWeight: 700 }}>
            Item 3
          </Box>
        </Box>
      </ExampleFrame>

      <ExampleFrame label="Desktop (containerWidth: 1100) — row layout + larger padding">
        <Box
          containerWidth={1100}
          p={{ xs: 'sm', md: 'lg' }}
          gap={{ xs: 'sm', md: 'lg' }}
          $display="flex"
          $flexDirection={{ xs: 'column', md: 'row' }}
          $backgroundColor="#f8fafc"
          $border="1px solid #e2e8f0"
          $borderRadius={12}
        >
          <Box p="sm" $backgroundColor="#dbeafe" $borderRadius={10} style={{ fontWeight: 700 }}>
            Item 1
          </Box>
          <Box p="sm" $backgroundColor="#dcfce7" $borderRadius={10} style={{ fontWeight: 700 }}>
            Item 2
          </Box>
          <Box p="sm" $backgroundColor="#fef3c7" $borderRadius={10} style={{ fontWeight: 700 }}>
            Item 3
          </Box>
        </Box>
      </ExampleFrame>
    </Stack>
  ),
};

export const AsChildComposition: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'With `asChild`, Box does not render an extra wrapper: it merges its styles/props into the child element (Slot pattern). Put element-specific attributes (like `href` or `type`) directly on the child.',
      },
    },
  },
  render: () => (
    <Stack gap="md">
      <ExampleFrame label="Button (asChild)">
        <Box
          asChild
          p="md"
          $backgroundColor="#3b82f6"
          $color="white"
          $borderRadius={10}
          $border="1px solid rgba(255,255,255,0.25)"
          $cursor="pointer"
          $display="inline-flex"
          $alignItems="center"
          $justifyContent="center"
          style={{ fontWeight: 700 }}
        >
          <button type="button">Renders as &lt;button&gt;</button>
        </Box>
      </ExampleFrame>

      <ExampleFrame label="Link (asChild)">
        <Box
          asChild
          p="md"
          $backgroundColor="#10b981"
          $color="white"
          $borderRadius={10}
          $textDecoration="none"
          $display="inline-flex"
          $alignItems="center"
          $justifyContent="center"
          style={{ fontWeight: 700 }}
        >
          <a href="#box-aschild">Renders as &lt;a&gt;</a>
        </Box>
      </ExampleFrame>
    </Stack>
  ),
};