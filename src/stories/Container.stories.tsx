import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Box, Container, type ContainerProps } from '..';

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
        {description ? (
          <div style={{ fontSize: 13, color: '#6b7280' }}>{description}</div>
        ) : null}
      </Box>
      {children}
    </Box>
  );
}

const meta = {
  title: 'Components/Container',
  component: Container,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
Centers content horizontally and applies a max-width constraint. 
Internally it renders a \`Box\` and forces a few layout-related props:

- \`width: 100%\`
- \`margin-left/right: auto\` (centering)
- \`max-width\` from \`size\` (or \`none\` when \`fluid\` resolves to \`true\`)
- fixed horizontal padding: \`padding-left/right: 1rem\`

## Responsive notes

\`size\` and \`fluid\` accept responsive objects. For these two props, the component only performs
breakpoint resolution when you pass \`containerWidth\`. Without \`containerWidth\`, it falls back to the
first defined value in the responsive object (to avoid circular measurement).
        `.trim(),
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'number',
      description: 'Max width (px). Supports responsive objects.',
      table: {
        type: { summary: 'ResponsiveValue<number>' },
        defaultValue: { summary: '1200' },
        category: 'Container',
      },
    },
    fluid: {
      control: 'boolean',
      description: 'When true, uses full width and ignores size. Supports responsive objects.',
      table: {
        type: { summary: 'ResponsiveValue<boolean>' },
        defaultValue: { summary: 'false' },
        category: 'Container',
      },
    },
    containerWidth: {
      control: 'number',
      description: 'Used to resolve responsive size/fluid; also forwarded to internal Box for nested responsive props.',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: 'undefined' },
        category: 'Responsive',
      },
    },
    asChild: {
      control: 'boolean',
      description: 'Render as child element (Box composition).',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'Composition',
      },
    },
    children: { control: false },
  },
} satisfies Meta<typeof Container>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    size: 900,
    fluid: false,
    children: (
      <Box
        $border="1px dashed #cbd5e1"
        $borderRadius="10px"
        $backgroundColor="#f8fafc"
        p="lg"
      >
        <div style={{ fontWeight: 700, marginBottom: 8 }}>Content</div>
        <div style={{ color: '#334155' }}>
          Use the controls to change <code>size</code> / <code>fluid</code>. The container is always centered and
          applies a fixed horizontal padding of <code>1rem</code>.
        </div>
      </Box>
    ),
  } satisfies Partial<ContainerProps>,
  render: (args: ContainerProps) => (
    <Box $backgroundColor="#f5f5f5" p="lg">
      <Frame title="Playground" description="Tweak size/fluid from the controls.">
        <Container {...args} />
      </Frame>
    </Box>
  ),
};

export const CommonLayouts: Story = {
  render: () => (
    <Box $backgroundColor="#f5f5f5" p="lg">
      <Box $display="flex" $flexDirection="column" $gap="16px">
        <Frame title="Default (size=1200)" description="A typical page container.">
          <Container>
            <Box $border="1px solid #93c5fd" $borderRadius="10px" $backgroundColor="#eff6ff" p="lg">
              <div style={{ fontWeight: 700, marginBottom: 8 }}>Title</div>
              <div style={{ color: '#1e3a8a' }}>
                The content area is centered and constrained by max-width.
              </div>
            </Box>
          </Container>
        </Frame>

        <Frame title="Article width (size=720)" description="A narrower width for long-form content.">
          <Container asChild size={720}>
            <article>
              <Box $border="1px solid #fcd34d" $borderRadius="10px" $backgroundColor="#fffbeb" p="lg">
                <div style={{ fontWeight: 700, marginBottom: 8 }}>Article</div>
                <div style={{ color: '#92400e' }}>
                  This story uses <code>asChild</code> to render a semantic <code>&lt;article&gt;</code>.
                </div>
              </Box>
            </article>
          </Container>
        </Frame>

        <Frame title="Fluid" description="Full-width container (max-width: none).">
          <Container fluid>
            <Box $border="1px solid #c4b5fd" $borderRadius="10px" $backgroundColor="#f5f3ff" p="lg">
              <div style={{ fontWeight: 700, marginBottom: 8 }}>Dashboard-like section</div>
              <div style={{ color: '#4c1d95' }}>
                When <code>fluid</code> resolves to true, the container does not apply a max-width.
              </div>
            </Box>
          </Container>
        </Frame>
      </Box>
    </Box>
  ),
};

export const ResponsiveResolution: Story = {
  render: () => {
    const responsiveSize: ContainerProps['size'] = { xs: 360, md: 768, lg: 1024 };
    const responsiveFluid: ContainerProps['fluid'] = { xs: true, md: false };

    const Viewport = (props: {
      label: string;
      width: number;
      withContainerWidth: boolean;
    }) => {
      const { label, width, withContainerWidth } = props;

      return (
        <Box
          $border="1px solid #e5e7eb"
          $borderRadius="12px"
          $backgroundColor="#ffffff"
          p="md"
          style={{ width }}
        >
          <Box mb="sm">
            <div style={{ fontWeight: 700 }}>{label}</div>
            <div style={{ fontSize: 13, color: '#6b7280' }}>
              width: {width}px · {withContainerWidth ? 'with containerWidth' : 'no containerWidth (fallback)'}
            </div>
          </Box>

          <Container
            size={responsiveSize}
            fluid={responsiveFluid}
            containerWidth={withContainerWidth ? width : undefined}
          >
            <Box
              $border="1px dashed #94a3b8"
              $borderRadius="10px"
              $backgroundColor="#f8fafc"
              p="md"
            >
              <div style={{ fontWeight: 700, marginBottom: 6 }}>Responsive Container</div>
              <div style={{ fontSize: 13, color: '#334155' }}>
                size: <code>{JSON.stringify(responsiveSize)}</code>
                <br />
                fluid: <code>{JSON.stringify(responsiveFluid)}</code>
              </div>
            </Box>
          </Container>
        </Box>
      );
    };

    return (
      <Box $backgroundColor="#f5f5f5" p="lg">
        <Frame
          title="Responsive resolution"
          description="Compare responsive size/fluid with and without containerWidth."
        >
          <Box $display="flex" $flexWrap="wrap" $gap="16px">
            <Viewport label="Small" width={360} withContainerWidth />
            <Viewport label="Small" width={360} withContainerWidth={false} />
            <Viewport label="Large" width={1100} withContainerWidth />
            <Viewport label="Large" width={1100} withContainerWidth={false} />
          </Box>
        </Frame>
      </Box>
    );
  },
};