import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { StackProps, Stack, createStyles } from '..';

const meta: Meta<StackProps> = {
  title: 'Components/Layouts/Stack',
  component: Stack,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
A vertical flex container component for composing elements in a column.

## Features
- Vertical flexbox layout (flex-direction: column)
- Predefined spacing scale for gaps ('xs', 'sm', 'md', 'lg', 'xl', 'xxl')
- Cross-axis alignment control with align prop
- Main-axis justification control with justify prop
- Responsive values for all flexbox properties using breakpoint objects
- Container width measurement for responsive calculations
- Perfect for forms, card stacks, and vertical content layouts
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    // Stack-specific props
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
    gap: {
      control: 'text',
      description: 'Gap between items - can use spacing scale keys (xs, s, m, l, xl, xxl) or CSS values',
    },

    // Core props
    containerWidth: {
      control: 'number',
      description: 'Fixed container width for responsive calculations',
    },
  },
};

export default meta;
type Story = StoryObj<StackProps>;

// Basic vertical stack
export const BasicStack: Story = {
  render: () => (
    <Stack 
      className={createStyles({
        backgroundColor: "#f5f5f5", 
        border: "2px dashed #ccc", 
        padding: "1rem",
        borderRadius: "8px"
      })}
    >
      <div style={{ 
        padding: '1rem', 
        backgroundColor: '#1890ff', 
        color: 'white', 
        borderRadius: '4px',
        textAlign: 'center'
      }}>
        First Item
      </div>
      <div style={{ 
        padding: '1rem', 
        backgroundColor: '#52c41a', 
        color: 'white', 
        borderRadius: '4px',
        textAlign: 'center'
      }}>
        Second Item
      </div>
      <div style={{ 
        padding: '1rem', 
        backgroundColor: '#fa8c16', 
        color: 'white', 
        borderRadius: '4px',
        textAlign: 'center'
      }}>
        Third Item
      </div>
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Basic Stack with default settings: stretch alignment, medium gap, flex-start justification.',
      },
    },
  },
};

// Different gap sizes using spacing scale
export const SpacingScale: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h4 style={{ margin: '0 0 1rem 0', color: '#262626' }}>Extra Small Gap (xs)</h4>
        <Stack 
          gap="xs"
          className={createStyles({
            backgroundColor: "#fff7e6", 
            border: "1px solid #ffd591", 
            padding: "1rem",
            borderRadius: "6px"
          })}
        >
          <div style={{ padding: '0.75rem', backgroundColor: '#fa8c16', color: 'white', borderRadius: '4px', textAlign: 'center' }}>Item A</div>
          <div style={{ padding: '0.75rem', backgroundColor: '#ffa940', color: 'white', borderRadius: '4px', textAlign: 'center' }}>Item B</div>
          <div style={{ padding: '0.75rem', backgroundColor: '#ffbb71', color: 'white', borderRadius: '4px', textAlign: 'center' }}>Item C</div>
        </Stack>
      </div>

      <div>
        <h4 style={{ margin: '0 0 1rem 0', color: '#262626' }}>Small Gap (s)</h4>
        <Stack 
          gap="sm"
          className={createStyles({
            backgroundColor: "#f6ffed", 
            border: "1px solid #b7eb8f", 
            padding: "1rem",
            borderRadius: "6px"
          })}
        >
          <div style={{ padding: '0.75rem', backgroundColor: '#52c41a', color: 'white', borderRadius: '4px', textAlign: 'center' }}>Item A</div>
          <div style={{ padding: '0.75rem', backgroundColor: '#73d13d', color: 'white', borderRadius: '4px', textAlign: 'center' }}>Item B</div>
          <div style={{ padding: '0.75rem', backgroundColor: '#95de64', color: 'white', borderRadius: '4px', textAlign: 'center' }}>Item C</div>
        </Stack>
      </div>

      <div>
        <h4 style={{ margin: '0 0 1rem 0', color: '#262626' }}>Medium Gap (m) - Default</h4>
        <Stack 
          gap="md"
          className={createStyles({
            backgroundColor: "#e6f7ff", 
            border: "1px solid #91d5ff", 
            padding: "1rem",
            borderRadius: "6px"
          })}
        >
          <div style={{ padding: '0.75rem', backgroundColor: '#1890ff', color: 'white', borderRadius: '4px', textAlign: 'center' }}>Item A</div>
          <div style={{ padding: '0.75rem', backgroundColor: '#40a9ff', color: 'white', borderRadius: '4px', textAlign: 'center' }}>Item B</div>
          <div style={{ padding: '0.75rem', backgroundColor: '#69c0ff', color: 'white', borderRadius: '4px', textAlign: 'center' }}>Item C</div>
        </Stack>
      </div>

      <div>
        <h4 style={{ margin: '0 0 1rem 0', color: '#262626' }}>Large Gap (l)</h4>
        <Stack 
          gap="l"
          className={createStyles({
            backgroundColor: "#f9f0ff", 
            border: "1px solid #d3adf7", 
            padding: "1rem",
            borderRadius: "6px"
          })}
        >
          <div style={{ padding: '0.75rem', backgroundColor: '#722ed1', color: 'white', borderRadius: '4px', textAlign: 'center' }}>Item A</div>
          <div style={{ padding: '0.75rem', backgroundColor: '#9254de', color: 'white', borderRadius: '4px', textAlign: 'center' }}>Item B</div>
          <div style={{ padding: '0.75rem', backgroundColor: '#b37feb', color: 'white', borderRadius: '4px', textAlign: 'center' }}>Item C</div>
        </Stack>
      </div>

      <div>
        <h4 style={{ margin: '0 0 1rem 0', color: '#262626' }}>Extra Large Gap (xl)</h4>
        <Stack 
          gap="xl"
          className={createStyles({
            backgroundColor: "#fff0f6", 
            border: "1px solid #ffadd6", 
            padding: "1rem",
            borderRadius: "6px"
          })}
        >
          <div style={{ padding: '0.75rem', backgroundColor: '#eb2f96', color: 'white', borderRadius: '4px', textAlign: 'center' }}>Item A</div>
          <div style={{ padding: '0.75rem', backgroundColor: '#f759ab', color: 'white', borderRadius: '4px', textAlign: 'center' }}>Item B</div>
          <div style={{ padding: '0.75rem', backgroundColor: '#ff85c0', color: 'white', borderRadius: '4px', textAlign: 'center' }}>Item C</div>
        </Stack>
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

// Alignment options
export const AlignmentOptions: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h4 style={{ margin: '0 0 1rem 0', color: '#262626' }}>Align: Stretch (default)</h4>
        <Stack 
          align="stretch"
          className={createStyles({
            backgroundColor: "#f0f2f5", 
            border: "1px solid #d9d9d9", 
            padding: "1rem",
            borderRadius: "6px",
            width: "300px"
          })}
        >
          <div style={{ padding: '1rem', backgroundColor: '#1890ff', color: 'white', borderRadius: '4px' }}>Full Width Item</div>
          <div style={{ padding: '0.5rem', backgroundColor: '#40a9ff', color: 'white', borderRadius: '4px' }}>Also Full Width</div>
          <div style={{ padding: '1.5rem', backgroundColor: '#69c0ff', color: 'white', borderRadius: '4px' }}>Stretched Item</div>
        </Stack>
      </div>

      <div>
        <h4 style={{ margin: '0 0 1rem 0', color: '#262626' }}>Align: Center</h4>
        <Stack 
          align="center"
          className={createStyles({
            backgroundColor: "#f6ffed", 
            border: "1px solid #b7eb8f", 
            padding: "1rem",
            borderRadius: "6px",
            width: "300px"
          })}
        >
          <div style={{ padding: '1rem 2rem', backgroundColor: '#52c41a', color: 'white', borderRadius: '4px' }}>Centered</div>
          <div style={{ padding: '0.5rem 1rem', backgroundColor: '#73d13d', color: 'white', borderRadius: '4px' }}>Small Centered</div>
          <div style={{ padding: '1rem 3rem', backgroundColor: '#95de64', color: 'white', borderRadius: '4px' }}>Large Centered</div>
        </Stack>
      </div>

      <div>
        <h4 style={{ margin: '0 0 1rem 0', color: '#262626' }}>Align: Flex-Start</h4>
        <Stack 
          align="flex-start"
          className={createStyles({
            backgroundColor: "#fff7e6", 
            border: "1px solid #ffd591", 
            padding: "1rem",
            borderRadius: "6px",
            width: "300px"
          })}
        >
          <div style={{ padding: '1rem 2rem', backgroundColor: '#fa8c16', color: 'white', borderRadius: '4px' }}>Left Aligned</div>
          <div style={{ padding: '0.5rem 1rem', backgroundColor: '#ffa940', color: 'white', borderRadius: '4px' }}>Small Left</div>
          <div style={{ padding: '1rem 3rem', backgroundColor: '#ffbb71', color: 'white', borderRadius: '4px' }}>Large Left</div>
        </Stack>
      </div>

      <div>
        <h4 style={{ margin: '0 0 1rem 0', color: '#262626' }}>Align: Flex-End</h4>
        <Stack 
          align="flex-end"
          className={createStyles({
            backgroundColor: "#f9f0ff", 
            border: "1px solid #d3adf7", 
            padding: "1rem",
            borderRadius: "6px",
            width: "300px"
          })}
        >
          <div style={{ padding: '1rem 2rem', backgroundColor: '#722ed1', color: 'white', borderRadius: '4px' }}>Right Aligned</div>
          <div style={{ padding: '0.5rem 1rem', backgroundColor: '#9254de', color: 'white', borderRadius: '4px' }}>Small Right</div>
          <div style={{ padding: '1rem 3rem', backgroundColor: '#b37feb', color: 'white', borderRadius: '4px' }}>Large Right</div>
        </Stack>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different alignment options: stretch (default), center, flex-start, and flex-end.',
      },
    },
  },
};

// Justify content options
export const JustifyContent: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h4 style={{ margin: '0 0 1rem 0', color: '#262626' }}>Justify: Flex-Start (default)</h4>
        <Stack 
          justify="flex-start"
          className={createStyles({
            backgroundColor: "#e6f7ff", 
            border: "1px solid #91d5ff", 
            padding: "1rem",
            borderRadius: "6px",
            height: "200px"
          })}
        >
          <div style={{ padding: '1rem', backgroundColor: '#1890ff', color: 'white', borderRadius: '4px', textAlign: 'center' }}>Top Item 1</div>
          <div style={{ padding: '1rem', backgroundColor: '#40a9ff', color: 'white', borderRadius: '4px', textAlign: 'center' }}>Top Item 2</div>
        </Stack>
      </div>

      <div>
        <h4 style={{ margin: '0 0 1rem 0', color: '#262626' }}>Justify: Center</h4>
        <Stack 
          justify="center"
          className={createStyles({
            backgroundColor: "#f6ffed", 
            border: "1px solid #b7eb8f", 
            padding: "1rem",
            borderRadius: "6px",
            height: "200px"
          })}
        >
          <div style={{ padding: '1rem', backgroundColor: '#52c41a', color: 'white', borderRadius: '4px', textAlign: 'center' }}>Centered Item 1</div>
          <div style={{ padding: '1rem', backgroundColor: '#73d13d', color: 'white', borderRadius: '4px', textAlign: 'center' }}>Centered Item 2</div>
        </Stack>
      </div>

      <div>
        <h4 style={{ margin: '0 0 1rem 0', color: '#262626' }}>Justify: Flex-End</h4>
        <Stack 
          justify="flex-end"
          className={createStyles({
            backgroundColor: "#fff7e6", 
            border: "1px solid #ffd591", 
            padding: "1rem",
            borderRadius: "6px",
            height: "200px"
          })}
        >
          <div style={{ padding: '1rem', backgroundColor: '#fa8c16', color: 'white', borderRadius: '4px', textAlign: 'center' }}>Bottom Item 1</div>
          <div style={{ padding: '1rem', backgroundColor: '#ffa940', color: 'white', borderRadius: '4px', textAlign: 'center' }}>Bottom Item 2</div>
        </Stack>
      </div>

      <div>
        <h4 style={{ margin: '0 0 1rem 0', color: '#262626' }}>Justify: Space-Between</h4>
        <Stack 
          justify="space-between"
          className={createStyles({
            backgroundColor: "#f9f0ff", 
            border: "1px solid #d3adf7", 
            padding: "1rem",
            borderRadius: "6px",
            height: "200px"
          })}
        >
          <div style={{ padding: '1rem', backgroundColor: '#722ed1', color: 'white', borderRadius: '4px', textAlign: 'center' }}>Top Item</div>
          <div style={{ padding: '1rem', backgroundColor: '#9254de', color: 'white', borderRadius: '4px', textAlign: 'center' }}>Middle Item</div>
          <div style={{ padding: '1rem', backgroundColor: '#b37feb', color: 'white', borderRadius: '4px', textAlign: 'center' }}>Bottom Item</div>
        </Stack>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different justify-content options for main-axis alignment in vertical layout.',
      },
    },
  },
};

// Form layout example
export const FormLayout: Story = {
  render: () => (
    <Stack 
      gap="md" 
      align="stretch"
      className={createStyles({
        backgroundColor: "white", 
        border: "1px solid #f0f0f0", 
        padding: "2rem",
        borderRadius: "8px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        maxWidth: "400px"
      })}
    >
      <h3 style={{ margin: '0 0 1rem 0', color: '#262626', textAlign: 'center' }}>Contact Form</h3>
      
      <div>
        <label style={{ display: 'block', marginBottom: '0.5rem', color: '#595959', fontWeight: '500' }}>
          Full Name
        </label>
        <input 
          type="text" 
          placeholder="Enter your full name"
          style={{
            width: '100%',
            padding: '0.75rem',
            border: '1px solid #d9d9d9',
            borderRadius: '6px',
            fontSize: '14px',
            boxSizing: 'border-box'
          }}
        />
      </div>

      <div>
        <label style={{ display: 'block', marginBottom: '0.5rem', color: '#595959', fontWeight: '500' }}>
          Email Address
        </label>
        <input 
          type="email" 
          placeholder="Enter your email"
          style={{
            width: '100%',
            padding: '0.75rem',
            border: '1px solid #d9d9d9',
            borderRadius: '6px',
            fontSize: '14px',
            boxSizing: 'border-box'
          }}
        />
      </div>

      <div>
        <label style={{ display: 'block', marginBottom: '0.5rem', color: '#595959', fontWeight: '500' }}>
          Subject
        </label>
        <select 
          aria-label="Subject"
          style={{
            width: '100%',
            padding: '0.75rem',
            border: '1px solid #d9d9d9',
            borderRadius: '6px',
            fontSize: '14px',
            backgroundColor: 'white',
            boxSizing: 'border-box'
          }}
        >
          <option>General Inquiry</option>
          <option>Support Request</option>
          <option>Feature Request</option>
          <option>Bug Report</option>
        </select>
      </div>

      <div>
        <label style={{ display: 'block', marginBottom: '0.5rem', color: '#595959', fontWeight: '500' }}>
          Message
        </label>
        <textarea 
          placeholder="Enter your message"
          rows={4}
          style={{
            width: '100%',
            padding: '0.75rem',
            border: '1px solid #d9d9d9',
            borderRadius: '6px',
            fontSize: '14px',
            resize: 'vertical',
            fontFamily: 'inherit',
            boxSizing: 'border-box'
          }}
        />
      </div>

      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
        <input type="checkbox" id="newsletter" />
        <label htmlFor="newsletter" style={{ color: '#595959', fontSize: '14px' }}>
          Subscribe to newsletter
        </label>
      </div>

      <button style={{
        padding: '1rem',
        backgroundColor: '#1890ff',
        color: 'white',
        border: 'none',
        borderRadius: '6px',
        fontSize: '16px',
        fontWeight: '500',
        cursor: 'pointer',
        marginTop: '0.5rem'
      }}>
        Send Message
      </button>
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Real-world example: contact form with proper spacing and stretched form elements.',
      },
    },
  },
};

// Card stack layout
export const CardStack: Story = {
  render: () => (
    <Stack 
      gap="l"
      align="center"
      className={createStyles({
        backgroundColor: "#fafafa",
        padding: "2rem",
        borderRadius: "8px",
        maxWidth: "600px"
      })}
    >
      <h2 style={{ margin: '0 0 1rem 0', color: '#262626', textAlign: 'center' }}>Feature Highlights</h2>
      
      {[
        { 
          title: 'Performance Optimized', 
          description: 'Built with performance in mind, ensuring fast render times and smooth interactions.',
          icon: '⚡',
          color: '#1890ff'
        },
        { 
          title: 'Fully Responsive', 
          description: 'Adapts perfectly to any screen size with responsive breakpoint system.',
          icon: '📱',
          color: '#52c41a'
        },
        { 
          title: 'TypeScript Ready', 
          description: 'Full TypeScript support with comprehensive type definitions for better DX.',
          icon: '🔷',
          color: '#722ed1'
        },
        { 
          title: 'Accessible by Default', 
          description: 'Built with accessibility best practices and ARIA compliance in mind.',
          icon: '♿',
          color: '#fa8c16'
        },
      ].map((feature, i) => (
        <div key={i} style={{
          backgroundColor: 'white',
          border: '1px solid #f0f0f0',
          borderRadius: '12px',
          padding: '2rem',
          width: '100%',
          maxWidth: '480px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
          textAlign: 'center'
        }}>
          <div style={{
            fontSize: '48px',
            marginBottom: '1rem'
          }}>
            {feature.icon}
          </div>
          <h3 style={{
            margin: '0 0 1rem 0',
            color: feature.color,
            fontSize: '20px',
            fontWeight: '600'
          }}>
            {feature.title}
          </h3>
          <p style={{
            margin: '0',
            color: '#8c8c8c',
            lineHeight: 1.6
          }}>
            {feature.description}
          </p>
        </div>
      ))}
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Card stack layout with centered alignment and large gaps for feature showcase.',
      },
    },
  },
};

// Responsive behavior
export const ResponsiveBehavior: Story = {
  render: () => (
    <Stack 
      gap={{ xs: "sm", md: "md", lg: "lg" }}
      align={{ xs: "center", md: "stretch" }}
      justify={{ xs: "center", md: "flex-start" }}
      className={createStyles({
        backgroundColor: "#f0f5ff",
        border: "1px solid #91d5ff",
        padding: "1.5rem",
        borderRadius: "8px",
        minHeight: "300px"
      })}
    >
      <div style={{ 
        padding: '1.5rem', 
        backgroundColor: '#1890ff', 
        color: 'white', 
        borderRadius: '6px',
        textAlign: 'center',
        fontWeight: '500'
      }}>
        Responsive Item 1
      </div>
      <div style={{ 
        padding: '1.5rem', 
        backgroundColor: '#40a9ff', 
        color: 'white', 
        borderRadius: '6px',
        textAlign: 'center',
        fontWeight: '500'
      }}>
        Responsive Item 2
      </div>
      <div style={{ 
        padding: '1.5rem', 
        backgroundColor: '#69c0ff', 
        color: 'white', 
        borderRadius: '6px',
        textAlign: 'center',
        fontWeight: '500'
      }}>
        Responsive Item 3
      </div>
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Responsive Stack that changes gap, alignment, and justification at different breakpoints.',
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

// Custom gap values
export const CustomGapValues: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h4 style={{ margin: '0 0 1rem 0', color: '#262626' }}>Custom CSS Gap (3rem)</h4>
        <Stack 
          gap="xl"
          className={createStyles({
            backgroundColor: "#f9f0ff",
            border: "1px solid #d3adf7",
            padding: "1rem",
            borderRadius: "6px"
          })}
        >
          <div style={{ padding: '1rem', backgroundColor: '#722ed1', color: 'white', borderRadius: '4px', textAlign: 'center' }}>Large Gap Item 1</div>
          <div style={{ padding: '1rem', backgroundColor: '#9254de', color: 'white', borderRadius: '4px', textAlign: 'center' }}>Large Gap Item 2</div>
          <div style={{ padding: '1rem', backgroundColor: '#b37feb', color: 'white', borderRadius: '4px', textAlign: 'center' }}>Large Gap Item 3</div>
        </Stack>
      </div>

      <div>
        <h4 style={{ margin: '0 0 1rem 0', color: '#262626' }}>Pixel Values (8px)</h4>
        <Stack 
          gap="xs"
          className={createStyles({
            backgroundColor: "#fff0f6",
            border: "1px solid #ffadd6",
            padding: "1rem",
            borderRadius: "6px"
          })}
        >
          <div style={{ padding: '0.75rem', backgroundColor: '#eb2f96', color: 'white', borderRadius: '4px', textAlign: 'center' }}>Tight Item 1</div>
          <div style={{ padding: '0.75rem', backgroundColor: '#f759ab', color: 'white', borderRadius: '4px', textAlign: 'center' }}>Tight Item 2</div>
          <div style={{ padding: '0.75rem', backgroundColor: '#ff85c0', color: 'white', borderRadius: '4px', textAlign: 'center' }}>Tight Item 3</div>
        </Stack>
      </div>

      <div>
        <h4 style={{ margin: '0 0 1rem 0', color: '#262626' }}>No Gap (0)</h4>
        <Stack 
          gap={0}
          className={createStyles({
            backgroundColor: "#e6f7ff",
            border: "1px solid #91d5ff",
            padding: "1rem",
            borderRadius: "6px"
          })}
        >
          <div style={{ padding: '1rem', backgroundColor: '#1890ff', color: 'white', textAlign: 'center' }}>Connected Item 1</div>
          <div style={{ padding: '1rem', backgroundColor: '#40a9ff', color: 'white', textAlign: 'center' }}>Connected Item 2</div>
          <div style={{ padding: '1rem', backgroundColor: '#69c0ff', color: 'white', textAlign: 'center' }}>Connected Item 3</div>
        </Stack>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Custom gap values using different CSS units: rem, px, or 0 for no gap.',
      },
    },
  },
};

// Navigation sidebar example
export const NavigationSidebar: Story = {
  render: () => (
    <Stack 
      gap="xs"
      align="stretch"
      className={createStyles({
        backgroundColor: "white",
        border: "1px solid #f0f0f0",
        borderRadius: "8px",
        width: "250px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)"
      })}
    >
      {/* Header */}
      <div style={{
        padding: '1.5rem',
        backgroundColor: '#1890ff',
        color: 'white',
        fontWeight: '600',
        fontSize: '18px',
        textAlign: 'center',
        borderRadius: '8px 8px 0 0'
      }}>
        Navigation
      </div>

      {/* Menu Items */}
      <div style={{ padding: '0.5rem' }}>
        <Stack gap="xs" align="stretch">
          {[
            { label: 'Dashboard', icon: '📊', active: true },
            { label: 'Analytics', icon: '📈', active: false },
            { label: 'Users', icon: '👥', active: false },
            { label: 'Settings', icon: '⚙️', active: false },
            { label: 'Reports', icon: '📋', active: false },
            { label: 'Help', icon: '❓', active: false },
          ].map((item, i) => (
            <button key={i} style={{
              padding: '0.75rem 1rem',
              backgroundColor: item.active ? '#e6f7ff' : 'transparent',
              color: item.active ? '#1890ff' : '#595959',
              border: 'none',
              borderRadius: '6px',
              textAlign: 'left',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              fontSize: '14px',
              fontWeight: item.active ? '500' : 'normal',
              transition: 'all 0.2s ease'
            }}>
              <span>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </Stack>
      </div>

      {/* Footer */}
      <div style={{
        padding: '1rem',
        borderTop: '1px solid #f0f0f0',
        color: '#8c8c8c',
        fontSize: '12px',
        textAlign: 'center'
      }}>
        Version 1.0.0
      </div>
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Real-world example: navigation sidebar with header, menu items, and footer.',
      },
    },
  },
};

// Page layout example
export const PageLayout: Story = {
  render: () => (
    <Stack 
      gap={0}
      align="stretch"
      justify="space-between"
      className={createStyles({
        backgroundColor: "#f5f5f5",
        minHeight: "400px",
        borderRadius: "8px",
        overflow: "hidden",
        border: "1px solid #d9d9d9"
      })}
    >
      {/* Header */}
      <header style={{
        padding: '1.5rem 2rem',
        backgroundColor: '#001529',
        color: 'white',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <h1 style={{ margin: 0, fontSize: '20px' }}>My Application</h1>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <span style={{ fontSize: '14px' }}>Welcome, User</span>
          <button style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#1890ff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}>
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main style={{
        flex: 1,
        padding: '2rem',
        backgroundColor: 'white'
      }}>
        <Stack gap="l">
          <h2 style={{ margin: 0, color: '#262626' }}>Main Content Area</h2>
          <p style={{ margin: 0, color: '#595959', lineHeight: 1.6 }}>
            This is the main content area of the page. It grows to fill the available space 
            between the header and footer.
          </p>
          <div style={{
            padding: '2rem',
            backgroundColor: '#f8f9fa',
            borderRadius: '8px',
            border: '1px solid #e9ecef',
            textAlign: 'center'
          }}>
            <h3 style={{ margin: '0 0 1rem 0', color: '#495057' }}>Content Block</h3>
            <p style={{ margin: 0, color: '#6c757d' }}>
              Additional content goes here...
            </p>
          </div>
        </Stack>
      </main>

      {/* Footer */}
      <footer style={{
        padding: '1rem 2rem',
        backgroundColor: '#f0f2f5',
        borderTop: '1px solid #d9d9d9',
        textAlign: 'center',
        color: '#8c8c8c',
        fontSize: '14px'
      }}>
        © 2024 My Application. All rights reserved.
      </footer>
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Complete page layout with header, main content area, and footer using space-between justification.',
      },
    },
  },
};