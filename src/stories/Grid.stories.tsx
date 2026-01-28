import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Box, Grid, Stack, type GridProps } from '..';

function Frame(props: {
  title: string;
  description?: string;
  width?: number;
  children: React.ReactNode;
}) {
  const { title, description, width, children } = props;

  return (
    <Box
      $border="1px solid #e5e7eb"
      $borderRadius="12px"
      $backgroundColor="#ffffff"
      $boxShadow="0 1px 2px rgba(0,0,0,0.06)"
      p="lg"
      style={width ? { width } : undefined}
    >
      <Box mb="md">
        <div style={{ fontWeight: 700 }}>{title}</div>
        {description ? <div style={{ fontSize: 13, color: '#6b7280' }}>{description}</div> : null}
      </Box>
      {children}
    </Box>
  );
}

function Tile(props: { label: string; tone: 'blue' | 'pink' | 'green' | 'slate' }) {
  const { label, tone } = props;

  const tones = {
    blue: { bg: '#eff6ff', border: '#93c5fd', fg: '#1e3a8a' },
    pink: { bg: '#fdf2f8', border: '#f9a8d4', fg: '#831843' },
    green: { bg: '#ecfdf5', border: '#6ee7b7', fg: '#064e3b' },
    slate: { bg: '#f8fafc', border: '#cbd5e1', fg: '#0f172a' },
  };

  const t = tones[tone];

  return (
    <Box
      $border={`1px solid ${t.border}`}
      $borderRadius="10px"
      $backgroundColor={t.bg}
      p="md"
      $textAlign="center"
    >
      <div style={{ fontWeight: 800, color: t.fg }}>{label}</div>
    </Box>
  );
}

const meta = {
  title: 'Components/Grid',
  component: Grid,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
\`Grid\` is a \`Box\` wrapper that renders a CSS Grid container based on a configurable column system (default: \`12\`).
Use \`Grid.Col\` for per-item placement via \`span\`, \`offset\` and \`order\`.

## Responsive behavior

Most Grid props accept responsive values (breakpoint objects). Values are resolved using the measured container width.
For deterministic demos/tests, pass \`containerWidth\`.

## Composition (asChild)

Grid and Grid.Col inherit Box composition via \`asChild\`, so you can render semantic elements like \`<section>\` / \`<article>\`.
        `.trim(),
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    columns: {
      control: { type: 'number', min: 1, max: 24, step: 1 },
      table: { category: 'Grid' },
    },
    gutter: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', 'xxl', 'xxxl', 8, 12, 16, 24],
      table: { category: 'Grid' },
    },
    align: {
      control: 'select',
      options: ['stretch', 'flex-start', 'flex-end', 'center', 'baseline'],
      table: { category: 'Grid' },
    },
    justify: {
      control: 'select',
      options: ['flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'space-evenly'],
      table: { category: 'Grid' },
    },
    grow: {
      control: 'boolean',
      table: { category: 'Grid' },
    },
    overflow: {
      control: 'select',
      options: ['visible', 'hidden', 'scroll', 'auto'],
      table: { category: 'Grid' },
    },
    containerWidth: {
      control: 'number',
      table: { category: 'Responsive' },
    },
    asChild: {
      control: 'boolean',
      table: { category: 'Composition' },
    },
    children: { control: false },
  },
} satisfies Meta<typeof Grid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    columns: 12,
    gutter: 'md',
  } satisfies Partial<GridProps>,
  render: (args: GridProps) => (
    <Box $backgroundColor="#f5f5f5" p="lg">
      <Frame title="Playground" description="Tweak container props from the controls and see how columns span.">
        <Grid
          {...args}
          p="lg"
          $border="1px dashed #cbd5e1"
          $borderRadius="12px"
          $backgroundColor="#f8fafc"
        >
          <Grid.Col span={4}>
            <Tile label="span=4" tone="blue" />
          </Grid.Col>
          <Grid.Col span={4}>
            <Tile label="span=4" tone="pink" />
          </Grid.Col>
          <Grid.Col span={4}>
            <Tile label="span=4" tone="green" />
          </Grid.Col>
        </Grid>
      </Frame>
    </Box>
  ),
};

export const ResponsiveColumns: Story = {
  render: () => {
    const responsiveColumns: GridProps['columns'] = { xs: 1, md: 6, lg: 12 };
    const responsiveGutter: GridProps['gutter'] = { xs: 'sm', md: 'md' };

    const Viewport = (props: { label: string; width: number }) => {
      const { label, width } = props;

      return (
        <Frame
          title={label}
          description={`containerWidth: ${width}px (deterministic breakpoint resolution)`}
          width={width}
        >
          <Grid
            columns={responsiveColumns}
            gutter={responsiveGutter}
            containerWidth={width}
            p="lg"
            $border="1px dashed #cbd5e1"
            $borderRadius="12px"
            $backgroundColor="#f8fafc"
          >
            <Grid.Col span={{ xs: 1, md: 3, lg: 4 }}>
              <Tile label="xs:1 · md:3 · lg:4" tone="blue" />
            </Grid.Col>
            <Grid.Col span={{ xs: 1, md: 3, lg: 4 }}>
              <Tile label="xs:1 · md:3 · lg:4" tone="pink" />
            </Grid.Col>
            <Grid.Col span={{ xs: 1, md: 6, lg: 4 }}>
              <Tile label="xs:1 · md:6 · lg:4" tone="green" />
            </Grid.Col>
          </Grid>
        </Frame>
      );
    };

    return (
      <Box $backgroundColor="#f5f5f5" p="lg">
        <Frame
          title="Responsive columns"
          description="Same responsive props, different containerWidth values."
        >
          <Box $display="flex" $flexWrap="wrap" $gap="16px">
            <Viewport label="Small" width={360} />
            <Viewport label="Large" width={1100} />
          </Box>
        </Frame>
      </Box>
    );
  },
};

export const AsChildSemantics: Story = {
  render: () => (
    <Box $backgroundColor="#f5f5f5" p="lg">
      <Frame
        title="Composition (asChild)"
        description="Render semantic elements while keeping Grid layout behavior."
      >
        <Stack gap="lg">
          <Grid
            asChild
            columns={{ xs: 1, md: 12 }}
            gutter="md"
            containerWidth={900}
            p="lg"
            $border="1px dashed #cbd5e1"
            $borderRadius="12px"
            $backgroundColor="#ffffff"
          >
            <section aria-label="Dashboard">
              <Grid.Col asChild span={{ xs: 1, md: 8 }} p="lg" $border="1px solid #e2e8f0" $borderRadius="12px" $backgroundColor="#f8fafc">
                <article>
                  <h3 style={{ marginTop: 0 }}>Main</h3>
                  <p style={{ margin: 0, color: '#334155' }}>This Grid.Col renders an <code>&lt;article&gt;</code>.</p>
                </article>
              </Grid.Col>
              <Grid.Col asChild span={{ xs: 1, md: 4 }} p="lg" $border="1px solid #e2e8f0" $borderRadius="12px" $backgroundColor="#f8fafc">
                <aside aria-label="Sidebar">
                  <h3 style={{ marginTop: 0 }}>Sidebar</h3>
                  <p style={{ margin: 0, color: '#334155' }}>Rendered as <code>&lt;aside&gt;</code> via <code>asChild</code>.</p>
                </aside>
              </Grid.Col>
            </section>
          </Grid>
        </Stack>
      </Frame>
    </Box>
  ),
};