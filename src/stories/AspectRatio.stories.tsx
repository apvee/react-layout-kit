import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { AspectRatio, Box } from '..';

function ExampleFrame({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <Box $display="grid" gap="sm">
      <Box style={{ fontSize: 12, fontWeight: 600, color: '#64748b' }}>{label}</Box>
      {children}
    </Box>
  );
}

const meta = {
  title: 'Components/AspectRatio',
  component: AspectRatio,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
AspectRatio keeps a constant width/height ratio for a **single** child element.

## How it works

The component uses the classic “padding-bottom” technique:

- it computes $\text{paddingBottom} = \frac{1}{\text{ratio}} \cdot 100\%$
- it renders an invisible placeholder with that padding
- it places the child absolutely to fill the container

The child is rendered via \`asChild\` and receives \`width: 100%\` and \`height: 100%\`.

## Children constraint

Only **one** React element is accepted (enforced with \`React.Children.only\`). If you need multiple elements, wrap them in a single container.

## Responsive ratio

- If \`containerWidth\` is provided, a responsive \`ratio\` object (e.g. \`{ xs, md }\`) is resolved using the container width.
- If \`containerWidth\` is **not** provided and \`ratio\` is an object, the component falls back to the **first defined value**.
        `.trim(),
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    ratio: {
      control: { type: 'number', min: 0.1, step: 0.01 },
      description: 'Aspect ratio as width/height (e.g. 16/9). Responsive values are supported by the component API.',
      table: { category: 'Layout', defaultValue: { summary: '1' } },
    },
    w: {
      control: 'text',
      description: 'Width of the container (defaults to "100%")',
      table: { category: 'Layout' },
    },
    containerWidth: {
      control: { type: 'number', min: 0, max: 2000, step: 10 },
      description: 'Override container width used to resolve responsive values',
      table: { category: 'Responsive' },
    },
  },
} satisfies Meta<typeof AspectRatio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    ratio: 16 / 9,
    w: '520px',
  },
  render: (args: Partial<React.ComponentProps<typeof AspectRatio>>) => (
    <Box $display="grid" gap="md" p="lg" $backgroundColor="#f8fafc" $borderRadius={12}>
      <Box style={{ fontSize: 12, fontWeight: 600, color: '#64748b' }}>
        Tip: the child is forced to fill 100% × 100%.
      </Box>

      <Box $display="flex" $justifyContent="center">
        <AspectRatio {...args} $border="1px solid #e2e8f0" $borderRadius={12} p="sm">
          <Box
            $display="flex"
            $flexDirection="column"
            $alignItems="center"
            $justifyContent="center"
            $background="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
            $color="white"
            $borderRadius={8}
            style={{ fontWeight: 600, fontSize: 16, textAlign: 'center' }}
          >
            <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>📐</div>
            <div style={{ marginBottom: '0.25rem' }}>AspectRatio</div>
            <div style={{ fontSize: '0.875rem', opacity: 0.9 }}>ratio: {args.ratio?.toFixed?.(3)}</div>
            <div style={{ fontSize: '0.875rem', opacity: 0.9 }}>w: {args.w ?? '100%'}</div>
          </Box>
        </AspectRatio>
      </Box>
    </Box>
  ),
};

export const ResponsiveRatio: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Responsive `ratio` resolution: without `containerWidth` the component falls back to the first defined value; with `containerWidth` it resolves the responsive object by breakpoints.',
      },
    },
  },
  render: () => (
    <Box $display="grid" gap="lg">
      <ExampleFrame label="No containerWidth — fallback to first defined value (xs: 1)">
        <AspectRatio ratio={{ xs: 1, md: 16 / 9 }} w="420px" $border="1px solid #e2e8f0" $borderRadius={12}>
          <Box
            $display="flex"
            $alignItems="center"
            $justifyContent="center"
            $background="linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)"
            $color="#0f172a"
            $borderRadius={10}
            style={{ fontWeight: 700 }}
          >
            fallback → square
          </Box>
        </AspectRatio>
      </ExampleFrame>

      <ExampleFrame label="Mobile (containerWidth: 360) — resolves to xs: 1">
        <AspectRatio
          containerWidth={360}
          ratio={{ xs: 1, md: 16 / 9 }}
          w="100%"
          maw="640px"
          $border="1px solid #e2e8f0"
          $borderRadius={12}
        >
          <Box
            $display="flex"
            $alignItems="center"
            $justifyContent="center"
            $background="linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)"
            $color="#0f172a"
            $borderRadius={10}
            style={{ fontWeight: 700 }}
          >
            xs → 1:1
          </Box>
        </AspectRatio>
      </ExampleFrame>

      <ExampleFrame label="Desktop (containerWidth: 1100) — resolves to md: 16/9">
        <AspectRatio
          containerWidth={1100}
          ratio={{ xs: 1, md: 16 / 9 }}
          w="100%"
          maw="640px"
          $border="1px solid #e2e8f0"
          $borderRadius={12}
        >
          <Box
            $display="flex"
            $alignItems="center"
            $justifyContent="center"
            $background="linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)"
            $color="#0f172a"
            $borderRadius={10}
            style={{ fontWeight: 700 }}
          >
            md → 16:9
          </Box>
        </AspectRatio>
      </ExampleFrame>
    </Box>
  ),
};

export const SingleChildAndEmbeds: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Two common patterns: (1) an iframe/embed that fills the container; (2) a multi-layer UI (overlay) wrapped in a single child element.',
      },
    },
  },
  render: () => (
    <Box $display="grid" gap="lg">
      <ExampleFrame label="Iframe embed (offline) via srcDoc">
        <AspectRatio ratio={16 / 9} w="100%" maw="720px" $border="1px solid #e2e8f0" $borderRadius={12}>
          <iframe
            title="Demo embed"
            srcDoc={`<!doctype html><html><body style="margin:0;display:flex;align-items:center;justify-content:center;background:#0f172a;color:#e2e8f0;font-family:system-ui;">
<div style="text-align:center;">
  <div style="font-size:48px;line-height:1;">⟂</div>
  <div style="font-weight:700;">iframe</div>
  <div style="opacity:.8;font-size:12px;">fills 100% × 100%</div>
</div>
</body></html>`}
            style={{ border: 'none', borderRadius: 10, width: '100%', height: '100%' }}
          />
        </AspectRatio>
      </ExampleFrame>

      <ExampleFrame label="Overlay: multiple nodes, single child">
        <AspectRatio ratio={16 / 9} w="100%" maw="720px" $border="1px solid #e2e8f0" $borderRadius={12}>
          <Box $position="relative" $borderRadius={10} style={{ overflow: 'hidden' }}>
            <Box
              $width="100%"
              $height="100%"
              $background="linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
            />

            <Box
              $position="absolute"
              $top={16}
              $left={16}
              p="md"
              $borderRadius={10}
              $backgroundColor="rgba(15, 23, 42, 0.75)"
              $color="#e2e8f0"
              style={{ fontWeight: 700 }}
            >
              Overlay title
              <div style={{ fontWeight: 600, opacity: 0.85, fontSize: 12, marginTop: 4 }}>
                multiple nodes inside, single child outside
              </div>
            </Box>

            <Box
              $position="absolute"
              $bottom={16}
              $right={16}
              p="sm"
              $borderRadius={999}
              $backgroundColor="rgba(255, 255, 255, 0.9)"
              $color="#0f172a"
              style={{ fontWeight: 700, fontSize: 12 }}
            >
              Badge
            </Box>
          </Box>
        </AspectRatio>
      </ExampleFrame>
    </Box>
  ),
};

