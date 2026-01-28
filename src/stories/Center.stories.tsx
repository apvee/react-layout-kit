import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Box, Center, Stack } from '..';

function ExampleFrame({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <Box $display="grid" gap="sm">
      <Box style={{ fontSize: 12, fontWeight: 600, color: '#64748b' }}>{label}</Box>
      {children}
    </Box>
  );
}

const meta = {
  title: 'Components/Center',
  component: Center,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
Center is a convenience component built on top of \`Box\` that always centers its children using flexbox:

- \`align-items: center\`
- \`justify-content: center\`

## Display mode (inline)

The \`inline\` prop controls whether the component uses:

- \`display: flex\` (default)
- \`display: inline-flex\` (when \`inline\` resolves to \`true\`)

\`inline\` supports responsive values (breakpoint objects). The value is resolved using the current container width.

## Responsive resolution and containerWidth

Center resolves responsive props using a measured container width; for deterministic demos/tests you can pass \`containerWidth\`.

## Notes

Center enforces its own \`$display\`, \`$alignItems\` and \`$justifyContent\`. If you pass those props manually, they will be overwritten.
        `.trim(),
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    inline: {
      control: 'boolean',
      description: 'If set, inline-flex is used instead of flex. Supports responsive values using breakpoint objects.',
      table: { category: 'Core', defaultValue: { summary: 'false' } },
    },
    containerWidth: {
      control: { type: 'number', min: 0, max: 2000, step: 10 },
      description: 'Override container width used to resolve responsive values.',
      table: { category: 'Responsive' },
    },
    w: {
      control: 'text',
      description: 'Width (short prop). Useful to create a visible centering container.',
      table: { category: 'Layout' },
    },
    h: {
      control: 'text',
      description: 'Height (short prop). Useful to create a visible centering container.',
      table: { category: 'Layout' },
    },
  },
} satisfies Meta<typeof Center>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    inline: false,
    w: '420px',
    h: '260px',
    p: 'lg',
  },
  render: (args: Partial<React.ComponentProps<typeof Center>>) => (
    <Center
      {...args}
      $backgroundColor="#f8fafc"
      $border="2px dashed #e2e8f0"
      $borderRadius={12}
    >
      <Box
        p="lg"
        $backgroundColor="#3b82f6"
        $color="white"
        $borderRadius={10}
        $textAlign="center"
        style={{ fontWeight: 700 }}
      >
        <div style={{ fontSize: '2rem', lineHeight: 1, marginBottom: '0.5rem' }}>◎</div>
        <div>Perfectly centered</div>
        <div style={{ fontSize: 12, opacity: 0.9, marginTop: 6 }}>
          display: {args.inline ? 'inline-flex' : 'flex'}
        </div>
      </Box>
    </Center>
  ),
};

export const InlineMode: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Using inline mode to create badge-like elements. The inline prop uses inline-flex for inline centering.',
      },
    },
  },
  render: () => (
    <Stack gap="lg">
      <ExampleFrame label="Inline badge inside text">
        <Box p="md" $backgroundColor="#f8fafc" $borderRadius={10}>
          <span style={{ color: '#0f172a' }}>Messages </span>
          <Center
            inline
            px="sm"
            py="xs"
            $backgroundColor="#ef4444"
            $color="white"
            $borderRadius={999}
            style={{ fontWeight: 800, fontSize: 12 }}
          >
            5
          </Center>
          <span style={{ color: '#0f172a' }}> unread</span>
        </Box>
      </ExampleFrame>

      <ExampleFrame label="Inline square icon">
        <Box $display="flex" $gap="12px" $alignItems="center">
          <span style={{ color: '#0f172a' }}>Settings</span>
          <Center
            inline
            w="32px"
            h="32px"
            $backgroundColor="#dbeafe"
            $borderRadius={8}
            style={{ fontSize: 16, fontWeight: 800 }}
          >
            ⚙
          </Center>
        </Box>
      </ExampleFrame>
    </Stack>
  ),
};

export const ResponsiveInline: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Responsive inline mode. The display switches between inline-flex on mobile and flex on desktop.',
      },
    },
  },
  render: () => (
    <Stack gap="lg">
      <ExampleFrame label="Mobile (containerWidth: 360) — inline-flex">
        <Box p="md" $backgroundColor="#f8fafc" $borderRadius={10}>
          <span>Before </span>
          <Center
            containerWidth={360}
            inline={{ xs: true, md: false }}
            px="md"
            py="sm"
            $backgroundColor="#dbeafe"
            $borderRadius={8}
            style={{ fontWeight: 700 }}
          >
            inline
          </Center>
          <span> after</span>
        </Box>
      </ExampleFrame>

      <ExampleFrame label="Desktop (containerWidth: 1100) — flex">
        <Box p="md" $backgroundColor="#f8fafc" $borderRadius={10}>
          <span>Before </span>
          <Center
            containerWidth={1100}
            inline={{ xs: true, md: false }}
            w="100%"
            h="120px"
            px="md"
            py="sm"
            $backgroundColor="#dcfce7"
            $borderRadius={8}
            style={{ fontWeight: 700 }}
          >
            block
          </Center>
          <span> after</span>
        </Box>
      </ExampleFrame>
    </Stack>
  ),
};