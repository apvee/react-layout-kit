import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { GroupProps, Group, createStyles } from '..';

const meta: Meta<GroupProps> = {
  title: 'Components/Layouts/Group',
  component: Group,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
A horizontal flex container component for composing elements in a row.

## Features
- Horizontal flexbox layout (flex-direction: row)
- Predefined spacing scale for gaps ('xs', 'sm', 'md', 'lg', 'xl', 'xxl')
- Children can grow to fill space equally with grow prop
- Prevents overflow with max-width calculation (preventGrowOverflow)
- Responsive values for all flexbox properties using breakpoint objects
- Container width measurement for responsive calculations
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    // Group-specific props
    align: {
      control: 'select',
      options: ['stretch', 'flex-start', 'flex-end', 'center', 'baseline'],
      description: 'align-items CSS property - cross-axis alignment',
    },
    justify: {
      control: 'select',
      options: ['flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'space-evenly'],
      description: 'justify-content CSS property - main-axis alignment',
    },
    wrap: {
      control: 'select',
      options: ['nowrap', 'wrap', 'wrap-reverse'],
      description: 'flex-wrap CSS property',
    },
    gap: {
      control: 'text',
      description: 'Gap between items - can use spacing scale keys (xs, s, m, l, xl, xxl) or CSS values',
    },
    grow: {
      control: 'boolean',
      description: 'Whether children should have flex-grow: 1',
    },
    preventGrowOverflow: {
      control: 'boolean',
      description: 'Prevents children from overflowing by setting max-width',
    },

    // Core props
    containerWidth: {
      control: 'number',
      description: 'Fixed container width for responsive calculations',
    },
  },
};

export default meta;
type Story = StoryObj<GroupProps>;

// Basic horizontal group
export const BasicGroup: Story = {
  render: () => (
    <Group 
      className={createStyles({
        backgroundColor: "#f5f5f5", 
        border: "2px dashed #ccc", 
        padding: "1rem",
        borderRadius: "8px"
      })}
    >
      <button style={{ 
        padding: '0.5rem 1rem', 
        backgroundColor: '#1890ff', 
        color: 'white', 
        border: 'none', 
        borderRadius: '4px',
        cursor: 'pointer'
      }}>
        Button 1
      </button>
      <button style={{ 
        padding: '0.5rem 1rem', 
        backgroundColor: '#52c41a', 
        color: 'white', 
        border: 'none', 
        borderRadius: '4px',
        cursor: 'pointer'
      }}>
        Button 2
      </button>
      <button style={{ 
        padding: '0.5rem 1rem', 
        backgroundColor: '#fa8c16', 
        color: 'white', 
        border: 'none', 
        borderRadius: '4px',
        cursor: 'pointer'
      }}>
        Button 3
      </button>
    </Group>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Basic Group with default settings: center alignment, medium gap, wrap enabled.',
      },
    },
  },
};

// Different gap sizes using spacing scale
export const SpacingScale: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <h4 style={{ margin: '0 0 0.5rem 0', color: '#262626' }}>Extra Small Gap (xs)</h4>
        <Group 
          gap="xs"
          className={createStyles({
            backgroundColor: "#fff7e6", 
            border: "1px solid #ffd591", 
            padding: "1rem",
            borderRadius: "6px"
          })}
        >
          <span style={{ padding: '0.5rem', backgroundColor: '#fa8c16', color: 'white', borderRadius: '4px' }}>Item</span>
          <span style={{ padding: '0.5rem', backgroundColor: '#fa8c16', color: 'white', borderRadius: '4px' }}>Item</span>
          <span style={{ padding: '0.5rem', backgroundColor: '#fa8c16', color: 'white', borderRadius: '4px' }}>Item</span>
        </Group>
      </div>

      <div>
        <h4 style={{ margin: '0 0 0.5rem 0', color: '#262626' }}>Small Gap (s)</h4>
        <Group 
          gap="sm"
          className={createStyles({
            backgroundColor: "#f6ffed", 
            border: "1px solid #b7eb8f", 
            padding: "1rem",
            borderRadius: "6px"
          })}
        >
          <span style={{ padding: '0.5rem', backgroundColor: '#52c41a', color: 'white', borderRadius: '4px' }}>Item</span>
          <span style={{ padding: '0.5rem', backgroundColor: '#52c41a', color: 'white', borderRadius: '4px' }}>Item</span>
          <span style={{ padding: '0.5rem', backgroundColor: '#52c41a', color: 'white', borderRadius: '4px' }}>Item</span>
        </Group>
      </div>

      <div>
        <h4 style={{ margin: '0 0 0.5rem 0', color: '#262626' }}>Medium Gap (m) - Default</h4>
        <Group 
          gap="md"
          className={createStyles({
            backgroundColor: "#e6f7ff", 
            border: "1px solid #91d5ff", 
            padding: "1rem",
            borderRadius: "6px"
          })}
        >
          <span style={{ padding: '0.5rem', backgroundColor: '#1890ff', color: 'white', borderRadius: '4px' }}>Item</span>
          <span style={{ padding: '0.5rem', backgroundColor: '#1890ff', color: 'white', borderRadius: '4px' }}>Item</span>
          <span style={{ padding: '0.5rem', backgroundColor: '#1890ff', color: 'white', borderRadius: '4px' }}>Item</span>
        </Group>
      </div>

      <div>
        <h4 style={{ margin: '0 0 0.5rem 0', color: '#262626' }}>Large Gap (lg)</h4>
        <Group 
          gap="lg"
          className={createStyles({
            backgroundColor: "#f9f0ff", 
            border: "1px solid #d3adf7", 
            padding: "1rem",
            borderRadius: "6px"
          })}
        >
          <span style={{ padding: '0.5rem', backgroundColor: '#722ed1', color: 'white', borderRadius: '4px' }}>Item</span>
          <span style={{ padding: '0.5rem', backgroundColor: '#722ed1', color: 'white', borderRadius: '4px' }}>Item</span>
          <span style={{ padding: '0.5rem', backgroundColor: '#722ed1', color: 'white', borderRadius: '4px' }}>Item</span>
        </Group>
      </div>

      <div>
        <h4 style={{ margin: '0 0 0.5rem 0', color: '#262626' }}>Extra Large Gap (xl)</h4>
        <Group 
          gap="xl"
          className={createStyles({
            backgroundColor: "#fff0f6", 
            border: "1px solid #ffadd6", 
            padding: "1rem",
            borderRadius: "6px"
          })}
        >
          <span style={{ padding: '0.5rem', backgroundColor: '#eb2f96', color: 'white', borderRadius: '4px' }}>Item</span>
          <span style={{ padding: '0.5rem', backgroundColor: '#eb2f96', color: 'white', borderRadius: '4px' }}>Item</span>
          <span style={{ padding: '0.5rem', backgroundColor: '#eb2f96', color: 'white', borderRadius: '4px' }}>Item</span>
        </Group>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different gap sizes using the predefined spacing scale: xs, s, m, l, xl.',
      },
    },
  },
};

// Growing children
export const GrowingChildren: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <h4 style={{ margin: '0 0 0.5rem 0', color: '#262626' }}>Without Grow (default)</h4>
        <Group 
          className={createStyles({
            backgroundColor: "#f0f2f5", 
            border: "1px solid #d9d9d9", 
            padding: "1rem",
            borderRadius: "6px"
          })}
        >
          <button style={{ padding: '0.75rem 1rem', backgroundColor: '#1890ff', color: 'white', border: 'none', borderRadius: '4px' }}>
            Short
          </button>
          <button style={{ padding: '0.75rem 1rem', backgroundColor: '#40a9ff', color: 'white', border: 'none', borderRadius: '4px' }}>
            Medium Length
          </button>
          <button style={{ padding: '0.75rem 1rem', backgroundColor: '#69c0ff', color: 'white', border: 'none', borderRadius: '4px' }}>
            Very Long Button Text
          </button>
        </Group>
      </div>

      <div>
        <h4 style={{ margin: '0 0 0.5rem 0', color: '#262626' }}>With Grow (equal width)</h4>
        <Group 
          grow
          className={createStyles({
            backgroundColor: "#f6ffed", 
            border: "1px solid #b7eb8f", 
            padding: "1rem",
            borderRadius: "6px"
          })}
        >
          <button style={{ padding: '0.75rem 1rem', backgroundColor: '#52c41a', color: 'white', border: 'none', borderRadius: '4px' }}>
            Short
          </button>
          <button style={{ padding: '0.75rem 1rem', backgroundColor: '#73d13d', color: 'white', border: 'none', borderRadius: '4px' }}>
            Medium Length
          </button>
          <button style={{ padding: '0.75rem 1rem', backgroundColor: '#95de64', color: 'white', border: 'none', borderRadius: '4px' }}>
            Very Long Button Text
          </button>
        </Group>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Comparison between default behavior and grow=true where children take equal width.',
      },
    },
  },
};

// Alignment options
export const AlignmentOptions: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <h4 style={{ margin: '0 0 0.5rem 0', color: '#262626' }}>Align: Center (default)</h4>
        <Group 
          align="center"
          className={createStyles({
            backgroundColor: "#f0f2f5", 
            border: "1px solid #d9d9d9", 
            padding: "1rem",
            borderRadius: "6px",
            minHeight: "80px"
          })}
        >
          <div style={{ padding: '0.5rem', backgroundColor: '#1890ff', color: 'white', borderRadius: '4px' }}>Short</div>
          <div style={{ padding: '1.5rem', backgroundColor: '#40a9ff', color: 'white', borderRadius: '4px' }}>Tall Content</div>
          <div style={{ padding: '1rem', backgroundColor: '#69c0ff', color: 'white', borderRadius: '4px' }}>Medium</div>
        </Group>
      </div>

      <div>
        <h4 style={{ margin: '0 0 0.5rem 0', color: '#262626' }}>Align: Flex-Start</h4>
        <Group 
          align="flex-start"
          className={createStyles({
            backgroundColor: "#f6ffed", 
            border: "1px solid #b7eb8f", 
            padding: "1rem",
            borderRadius: "6px",
            minHeight: "80px"
          })}
        >
          <div style={{ padding: '0.5rem', backgroundColor: '#52c41a', color: 'white', borderRadius: '4px' }}>Short</div>
          <div style={{ padding: '1.5rem', backgroundColor: '#73d13d', color: 'white', borderRadius: '4px' }}>Tall Content</div>
          <div style={{ padding: '1rem', backgroundColor: '#95de64', color: 'white', borderRadius: '4px' }}>Medium</div>
        </Group>
      </div>

      <div>
        <h4 style={{ margin: '0 0 0.5rem 0', color: '#262626' }}>Align: Stretch</h4>
        <Group 
          align="stretch"
          className={createStyles({
            backgroundColor: "#fff7e6", 
            border: "1px solid #ffd591", 
            padding: "1rem",
            borderRadius: "6px",
            minHeight: "80px"
          })}
        >
          <div style={{ padding: '0.5rem', backgroundColor: '#fa8c16', color: 'white', borderRadius: '4px', display: 'flex', alignItems: 'center' }}>Short</div>
          <div style={{ padding: '0.5rem', backgroundColor: '#ffa940', color: 'white', borderRadius: '4px', display: 'flex', alignItems: 'center' }}>Stretched Content</div>
          <div style={{ padding: '0.5rem', backgroundColor: '#ffbb71', color: 'white', borderRadius: '4px', display: 'flex', alignItems: 'center' }}>Medium</div>
        </Group>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different alignment options: center (default), flex-start, and stretch.',
      },
    },
  },
};

// Justify content options
export const JustifyContent: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <h4 style={{ margin: '0 0 0.5rem 0', color: '#262626' }}>Justify: Flex-Start (default)</h4>
        <Group 
          justify="flex-start"
          className={createStyles({
            backgroundColor: "#e6f7ff", 
            border: "1px solid #91d5ff", 
            padding: "1rem",
            borderRadius: "6px"
          })}
        >
          <span style={{ padding: '0.5rem 1rem', backgroundColor: '#1890ff', color: 'white', borderRadius: '4px' }}>Item 1</span>
          <span style={{ padding: '0.5rem 1rem', backgroundColor: '#40a9ff', color: 'white', borderRadius: '4px' }}>Item 2</span>
        </Group>
      </div>

      <div>
        <h4 style={{ margin: '0 0 0.5rem 0', color: '#262626' }}>Justify: Center</h4>
        <Group 
          justify="center"
          className={createStyles({
            backgroundColor: "#f6ffed", 
            border: "1px solid #b7eb8f", 
            padding: "1rem",
            borderRadius: "6px"
          })}
        >
          <span style={{ padding: '0.5rem 1rem', backgroundColor: '#52c41a', color: 'white', borderRadius: '4px' }}>Item 1</span>
          <span style={{ padding: '0.5rem 1rem', backgroundColor: '#73d13d', color: 'white', borderRadius: '4px' }}>Item 2</span>
        </Group>
      </div>

      <div>
        <h4 style={{ margin: '0 0 0.5rem 0', color: '#262626' }}>Justify: Space-Between</h4>
        <Group 
          justify="space-between"
          className={createStyles({
            backgroundColor: "#fff7e6", 
            border: "1px solid #ffd591", 
            padding: "1rem",
            borderRadius: "6px"
          })}
        >
          <span style={{ padding: '0.5rem 1rem', backgroundColor: '#fa8c16', color: 'white', borderRadius: '4px' }}>Start</span>
          <span style={{ padding: '0.5rem 1rem', backgroundColor: '#ffa940', color: 'white', borderRadius: '4px' }}>End</span>
        </Group>
      </div>

      <div>
        <h4 style={{ margin: '0 0 0.5rem 0', color: '#262626' }}>Justify: Space-Around</h4>
        <Group 
          justify="space-around"
          className={createStyles({
            backgroundColor: "#f9f0ff", 
            border: "1px solid #d3adf7", 
            padding: "1rem",
            borderRadius: "6px"
          })}
        >
          <span style={{ padding: '0.5rem 1rem', backgroundColor: '#722ed1', color: 'white', borderRadius: '4px' }}>Item 1</span>
          <span style={{ padding: '0.5rem 1rem', backgroundColor: '#9254de', color: 'white', borderRadius: '4px' }}>Item 2</span>
          <span style={{ padding: '0.5rem 1rem', backgroundColor: '#b37feb', color: 'white', borderRadius: '4px' }}>Item 3</span>
        </Group>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different justify-content options for main-axis alignment.',
      },
    },
  },
};

// Prevent grow overflow
export const PreventGrowOverflow: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <h4 style={{ margin: '0 0 0.5rem 0', color: '#262626' }}>Without Prevent Grow Overflow</h4>
        <Group 
          grow 
          preventGrowOverflow={false}
          className={createStyles({
            backgroundColor: "#fff2e8", 
            border: "1px solid #ffbb96", 
            padding: "1rem",
            borderRadius: "6px"
          })}
        >
          <div style={{ padding: '1rem', backgroundColor: '#fa541c', color: 'white', borderRadius: '4px' }}>
            This is a very long content that might overflow and cause layout issues when growing
          </div>
          <div style={{ padding: '1rem', backgroundColor: '#fa8c16', color: 'white', borderRadius: '4px' }}>
            Another long piece of content that could break the layout
          </div>
        </Group>
        <p style={{ margin: '0.5rem 0 0 0', fontSize: '14px', color: '#8c8c8c' }}>
          Children can overflow their intended space
        </p>
      </div>

      <div>
        <h4 style={{ margin: '0 0 0.5rem 0', color: '#262626' }}>With Prevent Grow Overflow (default)</h4>
        <Group 
          grow 
          preventGrowOverflow={true}
          className={createStyles({
            backgroundColor: "#f6ffed", 
            border: "1px solid #b7eb8f", 
            padding: "1rem",
            borderRadius: "6px"
          })}
        >
          <div style={{ padding: '1rem', backgroundColor: '#52c41a', color: 'white', borderRadius: '4px' }}>
            This is a very long content that might overflow and cause layout issues when growing
          </div>
          <div style={{ padding: '1rem', backgroundColor: '#73d13d', color: 'white', borderRadius: '4px' }}>
            Another long piece of content that could break the layout
          </div>
        </Group>
        <p style={{ margin: '0.5rem 0 0 0', fontSize: '14px', color: '#8c8c8c' }}>
          Children are constrained with max-width to prevent overflow
        </p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'preventGrowOverflow controls whether children are constrained with max-width to prevent overflow.',
      },
    },
  },
};

// Responsive behavior
export const ResponsiveBehavior: Story = {
  render: () => (
    <Group 
      gap={{ xs: "sm", md: "md", lg: "lg" }}
      align={{ xs: "stretch", md: "center" }}
      justify={{ xs: "center", md: "flex-start" }}
      wrap={{ xs: "wrap", md: "nowrap" }}
      grow={{ xs: true, md: false }}
      className={createStyles({
        backgroundColor: "#f0f5ff", 
        border: "1px solid #91d5ff", 
        padding: "1.5rem",
        borderRadius: "8px"
      })}
    >
      <button style={{ 
        padding: '1rem', 
        backgroundColor: '#1890ff', 
        color: 'white', 
        border: 'none', 
        borderRadius: '6px',
        cursor: 'pointer',
        minWidth: '120px'
      }}>
        Responsive
      </button>
      <button style={{ 
        padding: '1rem', 
        backgroundColor: '#40a9ff', 
        color: 'white', 
        border: 'none', 
        borderRadius: '6px',
        cursor: 'pointer',
        minWidth: '120px'
      }}>
        Button Group
      </button>
      <button style={{ 
        padding: '1rem', 
        backgroundColor: '#69c0ff', 
        color: 'white', 
        border: 'none', 
        borderRadius: '6px',
        cursor: 'pointer',
        minWidth: '120px'
      }}>
        Layout
      </button>
    </Group>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Responsive Group that changes gap, alignment, justification, wrapping, and grow behavior at different breakpoints.',
      },
    },
    viewport: {
      viewports: {
        mobile: { name: 'Mobile', styles: { width: '320px', height: '568px' } },
        tablet: { name: 'Tablet', styles: { width: '768px', height: '1024px' } },
        desktop: { name: 'Desktop', styles: { width: '1200px', height: '800px' } },
      },
    },
  },
};

// Button toolbar example
export const ButtonToolbar: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h4 style={{ margin: '0 0 1rem 0', color: '#262626' }}>Action Toolbar</h4>
        <Group 
          gap="sm" 
          className={createStyles({
            backgroundColor: "white", 
            border: "1px solid #f0f0f0", 
            padding: "1rem", 
            borderRadius: "8px"
          })}
        >
          <button style={{
            padding: '8px 16px',
            backgroundColor: '#1890ff',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: '500'
          }}>
            Save
          </button>
          <button style={{
            padding: '8px 16px',
            backgroundColor: 'transparent',
            color: '#595959',
            border: '1px solid #d9d9d9',
            borderRadius: '6px',
            cursor: 'pointer'
          }}>
            Cancel
          </button>
          <button style={{
            padding: '8px 16px',
            backgroundColor: 'transparent',
            color: '#595959',
            border: '1px solid #d9d9d9',
            borderRadius: '6px',
            cursor: 'pointer'
          }}>
            Preview
          </button>
        </Group>
      </div>

      <div>
        <h4 style={{ margin: '0 0 1rem 0', color: '#262626' }}>Icon Toolbar</h4>
        <Group 
          gap="xs" 
          className={createStyles({
            backgroundColor: "white", 
            border: "1px solid #f0f0f0", 
            padding: "1rem", 
            borderRadius: "8px"
          })}
        >
          {['B', 'I', 'U', 'S'].map((icon, index) => (
            <button key={index} style={{
              width: '32px',
              height: '32px',
              backgroundColor: index === 0 ? '#1890ff' : 'transparent',
              color: index === 0 ? 'white' : '#595959',
              border: '1px solid #d9d9d9',
              borderRadius: '4px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold'
            }}>
              {icon}
            </button>
          ))}
          <div style={{ width: '1px', height: '24px', backgroundColor: '#f0f0f0', margin: '0 4px' }} />
          {['←', '→'].map((icon, index) => (
            <button key={index} style={{
              width: '32px',
              height: '32px',
              backgroundColor: 'transparent',
              color: '#595959',
              border: '1px solid #d9d9d9',
              borderRadius: '4px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {icon}
            </button>
          ))}
        </Group>
      </div>

      <div>
        <h4 style={{ margin: '0 0 1rem 0', color: '#262626' }}>Navigation Tabs</h4>
        <Group 
          gap="xs" 
          className={createStyles({
            backgroundColor: "white", 
            border: "1px solid #f0f0f0", 
            borderRadius: "8px", 
            overflow: "hidden"
          })}
        >
          {['Dashboard', 'Analytics', 'Reports', 'Settings'].map((tab, index) => (
            <button key={index} style={{
              padding: '12px 20px',
              backgroundColor: index === 0 ? '#f0f2f5' : 'transparent',
              color: index === 0 ? '#1890ff' : '#595959',
              border: 'none',
              borderRight: index < 3 ? '1px solid #f0f0f0' : 'none',
              cursor: 'pointer',
              fontWeight: index === 0 ? '500' : 'normal'
            }}>
              {tab}
            </button>
          ))}
        </Group>
      </div>

      <div>
        <h4 style={{ margin: '0 0 1rem 0', color: '#262626' }}>Growing Button Group</h4>
        <Group 
          grow 
          gap="xs" 
          className={createStyles({
            backgroundColor: "white", 
            border: "1px solid #f0f0f0", 
            padding: "1rem", 
            borderRadius: "8px"
          })}
        >
          <button style={{
            padding: '12px',
            backgroundColor: '#52c41a',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer'
          }}>
            Accept
          </button>
          <button style={{
            padding: '12px',
            backgroundColor: '#ff4d4f',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer'
          }}>
            Decline
          </button>
          <button style={{
            padding: '12px',
            backgroundColor: '#faad14',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer'
          }}>
            Postpone
          </button>
        </Group>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Real-world examples: action toolbar, icon toolbar, navigation tabs, and growing button groups.',
      },
    },
  },
};

// Custom gap values
export const CustomGapValues: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <h4 style={{ margin: '0 0 0.5rem 0', color: '#262626' }}>Custom CSS Gap (2rem)</h4>
        <Group 
          gap="xl"
          className={createStyles({
            backgroundColor: "#f9f0ff", 
            border: "1px solid #d3adf7", 
            padding: "1rem",
            borderRadius: "6px"
          })}
        >
          <span style={{ padding: '0.75rem 1rem', backgroundColor: '#722ed1', color: 'white', borderRadius: '4px' }}>Item 1</span>
          <span style={{ padding: '0.75rem 1rem', backgroundColor: '#9254de', color: 'white', borderRadius: '4px' }}>Item 2</span>
          <span style={{ padding: '0.75rem 1rem', backgroundColor: '#b37feb', color: 'white', borderRadius: '4px' }}>Item 3</span>
        </Group>
      </div>

      <div>
        <h4 style={{ margin: '0 0 0.5rem 0', color: '#262626' }}>Large Gap (lg)</h4>
        <Group 
          gap="lg"
          className={createStyles({
            backgroundColor: "#fff0f6", 
            border: "1px solid #ffadd6", 
            padding: "1rem",
            borderRadius: "6px"
          })}
        >
          <span style={{ padding: '0.75rem 1rem', backgroundColor: '#eb2f96', color: 'white', borderRadius: '4px' }}>Item 1</span>
          <span style={{ padding: '0.75rem 1rem', backgroundColor: '#f759ab', color: 'white', borderRadius: '4px' }}>Item 2</span>
          <span style={{ padding: '0.75rem 1rem', backgroundColor: '#ff85c0', color: 'white', borderRadius: '4px' }}>Item 3</span>
        </Group>
      </div>

      <div>
        <h4 style={{ margin: '0 0 0.5rem 0', color: '#262626' }}>Extra Small Gap (xs)</h4>
        <Group 
          gap="xs"
          className={createStyles({
            backgroundColor: "#e6f7ff", 
            border: "1px solid #91d5ff", 
            padding: "1rem",
            borderRadius: "6px"
          })}
        >
          <span style={{ padding: '0.75rem 1rem', backgroundColor: '#1890ff', color: 'white' }}>Connected</span>
          <span style={{ padding: '0.75rem 1rem', backgroundColor: '#40a9ff', color: 'white' }}>Items</span>
          <span style={{ padding: '0.75rem 1rem', backgroundColor: '#69c0ff', color: 'white' }}>Together</span>
        </Group>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Custom gap values using CSS units: rem, px, or 0 for no gap.',
      },
    },
  },
};

// Wrapping behavior
export const WrappingBehavior: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <h4 style={{ margin: '0 0 0.5rem 0', color: '#262626' }}>Wrap: wrap (default)</h4>
        <Group 
          wrap="wrap"
          className={createStyles({
            backgroundColor: "#f6ffed", 
            border: "1px solid #b7eb8f", 
            padding: "1rem",
            borderRadius: "6px",
            maxWidth: "300px"
          })}
        >
          {Array.from({ length: 8 }, (_, i) => (
            <span key={i} style={{ 
              padding: '0.5rem 1rem', 
              backgroundColor: '#52c41a', 
              color: 'white', 
              borderRadius: '4px',
              whiteSpace: 'nowrap'
            }}>
              Item {i + 1}
            </span>
          ))}
        </Group>
        <p style={{ margin: '0.5rem 0 0 0', fontSize: '14px', color: '#8c8c8c' }}>
          Items wrap to new lines when space runs out
        </p>
      </div>

      <div>
        <h4 style={{ margin: '0 0 0.5rem 0', color: '#262626' }}>Wrap: nowrap</h4>
        <Group 
          wrap="nowrap"
          className={createStyles({
            backgroundColor: "#fff7e6", 
            border: "1px solid #ffd591", 
            padding: "1rem",
            borderRadius: "6px",
            maxWidth: "300px",
            overflow: "auto"
          })}
        >
          {Array.from({ length: 6 }, (_, i) => (
            <span key={i} style={{ 
              padding: '0.5rem 1rem', 
              backgroundColor: '#fa8c16', 
              color: 'white', 
              borderRadius: '4px',
              whiteSpace: 'nowrap',
              flexShrink: 0
            }}>
              Item {i + 1}
            </span>
          ))}
        </Group>
        <p style={{ margin: '0.5rem 0 0 0', fontSize: '14px', color: '#8c8c8c' }}>
          Items stay on one line, may cause horizontal overflow
        </p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Wrapping behavior: wrap (default) vs nowrap.',
      },
    },
  },
};