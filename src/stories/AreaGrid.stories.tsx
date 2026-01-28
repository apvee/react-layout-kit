import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { AreaGrid, Box, type AreaGridProps } from '..';

/**
 * Reusable panel component for story examples.
 */
function Panel({ title, color = '#ffffff' }: { title: string; color?: string }) {
  return (
    <Box
      p="md"
      $border="1px solid #e2e8f0"
      $borderRadius={8}
      $backgroundColor={color}
      $minHeight={64}
      $display="flex"
      $alignItems="center"
      $justifyContent="center"
      style={{ fontWeight: 600, fontSize: 14 }}
    >
      {title}
    </Box>
  );
}

function ExampleFrame({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <Box $display="grid" gap="sm">
      <Box style={{ fontSize: 12, fontWeight: 600, color: '#64748b' }}>{label}</Box>
      {children}
    </Box>
  );
}

const meta: Meta<AreaGridProps> = {
  title: 'Components/AreaGrid',
  component: AreaGrid,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
AreaGrid is a layout component built on CSS Grid **template areas** (\`grid-template-areas\`). Instead of placing items via numeric rows/columns, you define a semantic template (e.g. \`header\`, \`sidebar\`, \`main\`, \`footer\`) and then assign children to those named areas via \`AreaGrid.Item\`.

## Key ideas

- **Template-driven layout**: \`areas\` maps to \`grid-template-areas\`.
- **Row/column sizing**: \`rows\` and \`columns\` map to \`grid-template-rows\` / \`grid-template-columns\`.
- **Spacing**: \`gap\` controls the grid gap (supports spacing tokens or numbers).
- **Alignment**: \`justifyItems\` / \`alignItems\` (default item alignment) and \`justifyContent\` / \`alignContent\` (grid distribution).

## Responsive behavior

All of the grid-related props (including \`areas\`) accept responsive values using breakpoint objects (e.g. \`{ xs, md, lg }\`). The component resolves those values using the measured **container width** (or the optional \`containerWidth\` override).

## AreaGrid.Item behavior

- \`AreaGrid.Item\` assigns itself to a named \`area\` (\`grid-area\`).
- \`area\`, \`justifySelf\`, and \`alignSelf\` also support responsive values.
- If the resolved area name **doesn’t exist** in the current \`areas\` template, the item returns \`null\` (i.e. it does not render).

See the stories below for practical configurations (basic, responsive + conditional areas, and alignment overrides).
        `.trim(),
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    areas: {
      control: 'text',
      description: 'grid-template-areas string (responsive values are supported by the component API)',
      table: { category: 'Layout' },
    },
    rows: {
      control: 'text',
      description: 'grid-template-rows (responsive values are supported by the component API)',
      table: { category: 'Layout' },
    },
    columns: {
      control: 'text',
      description: 'grid-template-columns (responsive values are supported by the component API)',
      table: { category: 'Layout' },
    },
    gap: {
      control: 'object',
      description: 'grid gap (spacing token or number; responsive values are supported by the component API)',
      table: { category: 'Layout' },
    },
    justifyItems: { table: { category: 'Alignment' } },
    alignItems: { table: { category: 'Alignment' } },
    justifyContent: { table: { category: 'Alignment' } },
    alignContent: { table: { category: 'Alignment' } },
    containerWidth: {
      control: { type: 'number', min: 0, max: 2000, step: 10 },
      description: 'Override container width used to resolve responsive values',
      table: { category: 'Responsive' },
    },
  },
};

export default meta;
type Story = StoryObj<AreaGridProps>;

export const Playground: Story = {
  args: {
    areas: '"header header" "sidebar main" "footer footer"',
    rows: 'auto 1fr auto',
    columns: '240px 1fr',
    gap: 'md',
  },
  render: (args) => (
    <AreaGrid
      {...args}
      p="md"
      $border="1px solid #e2e8f0"
      $borderRadius={12}
      $backgroundColor="#f8fafc"
      $minHeight={400}
    >
      <AreaGrid.Item area="header">
        <Panel title="Header" color="#dbeafe" />
      </AreaGrid.Item>
      <AreaGrid.Item area="sidebar">
        <Panel title="Sidebar" color="#fef3c7" />
      </AreaGrid.Item>
      <AreaGrid.Item area="main">
        <Panel title="Main Content" color="#ffffff" />
      </AreaGrid.Item>
      <AreaGrid.Item area="footer">
        <Panel title="Footer" color="#e0e7ff" />
      </AreaGrid.Item>
    </AreaGrid>
  ),
};

export const ResponsiveLayout: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Responsive `areas`/`rows`/`columns`/`gap` resolved via container width. Demonstrates both conditional rendering (items in non-existing areas return `null`) and responsive item placement (an item can move between areas via responsive `area`).',
      },
    },
  },
  render: () => (
    <Box $display="grid" gap="lg">
      <ExampleFrame label="Mobile (containerWidth: 360) — promo row present, toolbar/aside not present">
        <AreaGrid
          containerWidth={360}
          areas={{
            xs: '"header" "promo" "main" "footer"',
            lg: '"header header" "main toolbar" "main aside" "footer footer"',
          }}
          rows={{ xs: 'auto auto 1fr auto', lg: 'auto auto 1fr auto' }}
          columns={{ xs: '1fr', lg: '1fr 260px' }}
          gap={{ xs: 'sm', md: 'md' }}
          p="md"
          $border="1px solid #e2e8f0"
          $borderRadius={12}
          $backgroundColor="#f8fafc"
          $minHeight={320}
        >
          <AreaGrid.Item area="header">
            <Panel title="Header" color="#dbeafe" />
          </AreaGrid.Item>

          <AreaGrid.Item area={{ xs: 'promo', lg: 'aside' }}>
            <Panel title="Moves: promo → aside" color="#dcfce7" />
          </AreaGrid.Item>

          <AreaGrid.Item area="toolbar">
            <Panel title="Toolbar (won't render here)" color="#fef3c7" />
          </AreaGrid.Item>

          <AreaGrid.Item area="main">
            <Panel title="Main" color="#ffffff" />
          </AreaGrid.Item>

          <AreaGrid.Item area="footer">
            <Panel title="Footer" color="#e0e7ff" />
          </AreaGrid.Item>
        </AreaGrid>
      </ExampleFrame>

      <ExampleFrame label="Desktop (containerWidth: 1200) — toolbar/aside present">
        <AreaGrid
          containerWidth={1200}
          areas={{
            xs: '"header" "promo" "main" "footer"',
            lg: '"header header" "main toolbar" "main aside" "footer footer"',
          }}
          rows={{ xs: 'auto auto 1fr auto', lg: 'auto auto 1fr auto' }}
          columns={{ xs: '1fr', lg: '1fr 260px' }}
          gap={{ xs: 'sm', md: 'md' }}
          p="md"
          $border="1px solid #e2e8f0"
          $borderRadius={12}
          $backgroundColor="#f8fafc"
          $minHeight={320}
        >
          <AreaGrid.Item area="header">
            <Panel title="Header" color="#dbeafe" />
          </AreaGrid.Item>

          <AreaGrid.Item area={{ xs: 'promo', lg: 'aside' }}>
            <Panel title="Moves: promo → aside" color="#dcfce7" />
          </AreaGrid.Item>

          <AreaGrid.Item area="toolbar">
            <Panel title="Toolbar" color="#fef3c7" />
          </AreaGrid.Item>

          <AreaGrid.Item area="main">
            <Panel title="Main" color="#ffffff" />
          </AreaGrid.Item>

          <AreaGrid.Item area="footer">
            <Panel title="Footer" color="#e0e7ff" />
          </AreaGrid.Item>
        </AreaGrid>
      </ExampleFrame>
    </Box>
  ),
};

export const CustomAlignment: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Container-level alignment (`justifyItems`/`alignItems` + `justifyContent`/`alignContent`) and per-item overrides (`justifySelf`/`alignSelf`).',
      },
    },
  },
  render: () => (
    <AreaGrid
      areas='"left center right"'
      columns="160px 160px 160px"
      rows="220px"
      gap="md"
      justifyItems="center"
      alignItems="center"
      justifyContent="space-between"
      alignContent="center"
      p="md"
      $border="1px solid #e2e8f0"
      $borderRadius={12}
      $backgroundColor="#f8fafc"
      $minHeight={320}
    >
      <AreaGrid.Item area="left" justifySelf="start" alignSelf="start">
        <Panel title="start / start" color="#dbeafe" />
      </AreaGrid.Item>

      <AreaGrid.Item area="center">
        <Panel title="centered (from container)" color="#fef3c7" />
      </AreaGrid.Item>

      <AreaGrid.Item area="right" justifySelf="stretch" alignSelf="stretch">
        <Box
          p="md"
          $border="1px solid #e2e8f0"
          $borderRadius={8}
          $backgroundColor="#e0e7ff"
          $height="100%"
          $display="flex"
          $alignItems="center"
          $justifyContent="center"
          style={{ fontWeight: 600, fontSize: 14 }}
        >
          stretch / stretch
        </Box>
      </AreaGrid.Item>
    </AreaGrid>
  ),
};