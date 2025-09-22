import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { FlexProps, Flex, createStyles } from '..';

const meta: Meta<FlexProps> = {
  title: 'Components/Layouts/Flex',
  component: Flex,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
A comprehensive flexbox layout component with full CSS flexbox control.

## Features
- Complete flexbox container properties (align, justify, direction, wrap, gap)
- Flex.Item sub-component for individual flex item control
- Responsive values for all flexbox properties using breakpoint objects
- Advanced gap control with separate row and column gaps
- Container width measurement for responsive calculations
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    // Flex container props
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
    direction: {
      control: 'select',
      options: ['row', 'row-reverse', 'column', 'column-reverse'],
      description: 'flex-direction CSS property',
    },
    wrap: {
      control: 'select',
      options: ['nowrap', 'wrap', 'wrap-reverse'],
      description: 'flex-wrap CSS property',
    },
    gap: {
      control: 'text',
      description: 'gap CSS property - space between all flex items',
    },
    rowGap: {
      control: 'text',
      description: 'row-gap CSS property - space between rows',
    },
    columnGap: {
      control: 'text',
      description: 'column-gap CSS property - space between columns',
    },

    // Core props
    containerWidth: {
      control: 'number',
      description: 'Fixed container width for responsive calculations',
    },
  },
};

export default meta;
type Story = StoryObj<FlexProps>;

// Basic flex container
export const BasicFlex: Story = {
  render: () => (
    <Flex 
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
        borderRadius: '4px' 
      }}>
        Item 1
      </div>
      <div style={{ 
        padding: '1rem', 
        backgroundColor: '#52c41a', 
        color: 'white', 
        borderRadius: '4px' 
      }}>
        Item 2
      </div>
      <div style={{ 
        padding: '1rem', 
        backgroundColor: '#fa8c16', 
        color: 'white', 
        borderRadius: '4px' 
      }}>
        Item 3
      </div>
    </Flex>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Basic Flex container with default flex behavior (row direction, no gaps).',
      },
    },
  },
};

// Centered content
export const CenteredContent: Story = {
  render: () => (
    <Flex 
      align="center" 
      justify="center"
      className={createStyles({
        minHeight: "200px",
        backgroundColor: "#f0f2f5",
        border: "1px solid #d9d9d9",
        borderRadius: "8px"
      })}
    >
      <div style={{ 
        padding: '1.5rem 2rem', 
        backgroundColor: '#722ed1', 
        color: 'white', 
        borderRadius: '8px',
        textAlign: 'center',
        fontWeight: 'bold'
      }}>
        Perfectly Centered Content
      </div>
    </Flex>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Flex container with content centered both horizontally and vertically.',
      },
    },
  },
};

// Space distribution
export const SpaceDistribution: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div>
        <h4 style={{ margin: '0 0 0.5rem 0', color: '#262626' }}>Space Between</h4>
        <Flex 
          justify="space-between"
          className={createStyles({
            backgroundColor: "#fff7e6",
            border: "1px solid #ffd591",
            padding: "1rem",
            borderRadius: "6px"
          })}
        >
          <div style={{ padding: '0.5rem 1rem', backgroundColor: '#fa8c16', color: 'white', borderRadius: '4px' }}>
            Start
          </div>
          <div style={{ padding: '0.5rem 1rem', backgroundColor: '#fa8c16', color: 'white', borderRadius: '4px' }}>
            Middle
          </div>
          <div style={{ padding: '0.5rem 1rem', backgroundColor: '#fa8c16', color: 'white', borderRadius: '4px' }}>
            End
          </div>
        </Flex>
      </div>

      <div>
        <h4 style={{ margin: '0 0 0.5rem 0', color: '#262626' }}>Space Around</h4>
        <Flex 
          justify="space-around"
          className={createStyles({
            backgroundColor: "#f6ffed",
            border: "1px solid #b7eb8f",
            padding: "1rem",
            borderRadius: "6px"
          })}
        >
          <div style={{ padding: '0.5rem 1rem', backgroundColor: '#52c41a', color: 'white', borderRadius: '4px' }}>
            Item 1
          </div>
          <div style={{ padding: '0.5rem 1rem', backgroundColor: '#52c41a', color: 'white', borderRadius: '4px' }}>
            Item 2
          </div>
          <div style={{ padding: '0.5rem 1rem', backgroundColor: '#52c41a', color: 'white', borderRadius: '4px' }}>
            Item 3
          </div>
        </Flex>
      </div>

      <div>
        <h4 style={{ margin: '0 0 0.5rem 0', color: '#262626' }}>Space Evenly</h4>
        <Flex 
          justify="space-evenly"
          className={createStyles({
            backgroundColor: "#e6f7ff",
            border: "1px solid #91d5ff",
            padding: "1rem",
            borderRadius: "6px"
          })}
        >
          <div style={{ padding: '0.5rem 1rem', backgroundColor: '#1890ff', color: 'white', borderRadius: '4px' }}>
            Item A
          </div>
          <div style={{ padding: '0.5rem 1rem', backgroundColor: '#1890ff', color: 'white', borderRadius: '4px' }}>
            Item B
          </div>
          <div style={{ padding: '0.5rem 1rem', backgroundColor: '#1890ff', color: 'white', borderRadius: '4px' }}>
            Item C
          </div>
        </Flex>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different space distribution options: space-between, space-around, and space-evenly.',
      },
    },
  },
};

// Column layout with gaps
export const ColumnLayout: Story = {
  render: () => (
    <Flex 
      direction="column" 
      gap="lg"
      className={createStyles({
        backgroundColor: "#fafafa",
        border: "1px solid #f0f0f0",
        padding: "1.5rem",
        borderRadius: "8px",
        maxWidth: "400px"
      })}
    >
      <div style={{ 
        padding: '1rem', 
        backgroundColor: '#eb2f96', 
        color: 'white', 
        borderRadius: '6px',
        textAlign: 'center'
      }}>
        Header Section
      </div>
      <div style={{ 
        padding: '2rem 1rem', 
        backgroundColor: '#f759ab', 
        color: 'white', 
        borderRadius: '6px',
        textAlign: 'center'
      }}>
        Main Content Area
      </div>
      <div style={{ 
        padding: '1rem', 
        backgroundColor: '#eb2f96', 
        color: 'white', 
        borderRadius: '6px',
        textAlign: 'center'
      }}>
        Footer Section
      </div>
    </Flex>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Column layout with consistent gaps between items.',
      },
    },
  },
};

// Responsive flex behavior
export const ResponsiveFlex: Story = {
  render: () => (
    <Flex 
      direction={{ xs: "column", md: "row" }}
      align={{ xs: "stretch", md: "center" }}
      justify={{ xs: "flex-start", md: "space-between" }}
      gap={{ xs: "xs", md: "lg" }}
      wrap="wrap"
      className={createStyles({
        backgroundColor: "#f0f5ff",
        border: "1px solid #91d5ff",
        padding: "1.5rem",
        borderRadius: "8px"
      })}
    >
      <div style={{ 
        padding: '1rem', 
        backgroundColor: '#1890ff', 
        color: 'white', 
        borderRadius: '6px',
        minWidth: '150px',
        textAlign: 'center'
      }}>
        Responsive Item 1
      </div>
      <div style={{ 
        padding: '1rem', 
        backgroundColor: '#40a9ff', 
        color: 'white', 
        borderRadius: '6px',
        minWidth: '150px',
        textAlign: 'center'
      }}>
        Responsive Item 2
      </div>
      <div style={{ 
        padding: '1rem', 
        backgroundColor: '#69c0ff', 
        color: 'white', 
        borderRadius: '6px',
        minWidth: '150px',
        textAlign: 'center'
      }}>
        Responsive Item 3
      </div>
    </Flex>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Responsive flex layout that changes direction, alignment, and gaps at different breakpoints.',
      },
    },
    viewport: {
      viewports: {
        mobile: { name: 'Mobile', styles: { width: '320px', height: '568px' } },
        tablet: { name: 'Tablet', styles: { width: '640px', height: '1024px' } },
        desktop: { name: 'Desktop', styles: { width: '1200px', height: '800px' } },
      },
    },
  },
};

// Flex items with grow/shrink
export const FlexItemControls: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <h4 style={{ margin: '0 0 0.5rem 0', color: '#262626' }}>Basic Flex Items</h4>
        <Flex 
          gap="xs"
          className={createStyles({
            backgroundColor: "#fff2e8",
            border: "1px solid #ffbb96",
            padding: "1rem",
            borderRadius: "6px"
          })}
        >
          <Flex.Item flex={1} className={createStyles({ backgroundColor: "#fa541c", color: "white", padding: "1rem", borderRadius: "4px", textAlign: "center" })}>
            flex: 1
          </Flex.Item>
          <Flex.Item flex={2} className={createStyles({ backgroundColor: "#fa8c16", color: "white", padding: "1rem", borderRadius: "4px", textAlign: "center" })}>
            flex: 2 (grows more)
          </Flex.Item>
          <Flex.Item flex={1} className={createStyles({ backgroundColor: "#fa541c", color: "white", padding: "1rem", borderRadius: "4px", textAlign: "center" })}>
            flex: 1
          </Flex.Item>
        </Flex>
      </div>

      <div>
        <h4 style={{ margin: '0 0 0.5rem 0', color: '#262626' }}>Grow and Shrink Control</h4>
        <Flex 
          gap="xs"
          className={createStyles({
            backgroundColor: "#f6ffed",
            border: "1px solid #b7eb8f",
            padding: "1rem",
            borderRadius: "6px"
          })}
        >
          <Flex.Item grow={0} shrink={0} basis="120px" className={createStyles({ backgroundColor: "#52c41a", color: "white", padding: "1rem", borderRadius: "4px", textAlign: "center" })}>
            Fixed 120px
          </Flex.Item>
          <Flex.Item grow={1} shrink={1} className={createStyles({ backgroundColor: "#73d13d", color: "white", padding: "1rem", borderRadius: "4px", textAlign: "center" })}>
            Flexible content
          </Flex.Item>
          <Flex.Item grow={0} shrink={0} basis="100px" className={createStyles({ backgroundColor: "#52c41a", color: "white", padding: "1rem", borderRadius: "4px", textAlign: "center" })}>
            Fixed 100px
          </Flex.Item>
        </Flex>
      </div>

      <div>
        <h4 style={{ margin: '0 0 0.5rem 0', color: '#262626' }}>Align Self</h4>
        <Flex 
          align="flex-start"
          gap="xs"
          className={createStyles({
            backgroundColor: "#e6f7ff",
            border: "1px solid #91d5ff",
            padding: "1rem",
            borderRadius: "6px",
            minHeight: "120px"
          })}
        >
          <Flex.Item className={createStyles({ backgroundColor: "#1890ff", color: "white", padding: "0.5rem 1rem", borderRadius: "4px" })}>
            Default
          </Flex.Item>
          <Flex.Item alignSelf="center" className={createStyles({ backgroundColor: "#40a9ff", color: "white", padding: "0.5rem 1rem", borderRadius: "4px" })}>
            Center
          </Flex.Item>
          <Flex.Item alignSelf="flex-end" className={createStyles({ backgroundColor: "#69c0ff", color: "white", padding: "0.5rem 1rem", borderRadius: "4px" })}>
            End
          </Flex.Item>
          <Flex.Item alignSelf="stretch" className={createStyles({ backgroundColor: "#91d5ff", color: "white", padding: "0.5rem 1rem", borderRadius: "4px" })}>
            Stretch
          </Flex.Item>
        </Flex>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Flex.Item component demonstrating flex properties: flex shorthand, grow/shrink/basis, and alignSelf.',
      },
    },
  },
};

// Advanced gap control
export const AdvancedGaps: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <h4 style={{ margin: '0 0 0.5rem 0', color: '#262626' }}>Uniform Gap</h4>
        <Flex 
          wrap="wrap"
          gap="lg"
          className={createStyles({
            backgroundColor: "#f9f0ff",
            border: "1px solid #d3adf7",
            padding: "1rem",
            borderRadius: "6px"
          })}
        >
          {Array.from({ length: 6 }, (_, i) => (
            <div 
              key={i}
              style={{ 
                padding: '0.75rem 1rem', 
                backgroundColor: '#722ed1', 
                color: 'white', 
                borderRadius: '4px',
                minWidth: '80px',
                textAlign: 'center'
              }}
            >
              Item {i + 1}
            </div>
          ))}
        </Flex>
      </div>

      <div>
        <h4 style={{ margin: '0 0 0.5rem 0', color: '#262626' }}>Custom Row and Column Gaps</h4>
        <Flex 
          wrap="wrap"
          rowGap="xxl"
          columnGap="xs"
          className={createStyles({
            backgroundColor: "#fff0f6",
            border: "1px solid #ffadd6",
            padding: "1rem",
            borderRadius: "6px"
          })}
        >
          {Array.from({ length: 8 }, (_, i) => (
            <div 
              key={i}
              style={{ 
                padding: '0.75rem 1rem', 
                backgroundColor: '#eb2f96', 
                color: 'white', 
                borderRadius: '4px',
                minWidth: '70px',
                textAlign: 'center'
              }}
            >
              {i + 1}
            </div>
          ))}
        </Flex>
        <p style={{ margin: '0.5rem 0 0 0', fontSize: '14px', color: '#8c8c8c' }}>
          Row gap: 2rem • Column gap: 0.5rem
        </p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Advanced gap control with uniform gaps and separate row/column gaps.',
      },
    },
  },
};

// Navigation example
export const NavigationExample: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {/* Header Navigation */}
      <Flex 
        justify="space-between" 
        align="center"
        className={createStyles({
          backgroundColor: "#001529",
          color: "white",
          padding: "0 1.5rem",
          height: "60px",
          borderRadius: "6px"
        })}
      >
        <div style={{ fontWeight: 'bold', fontSize: '18px' }}>
          Brand Logo
        </div>
        <Flex align="center" gap="xxl">
          <a href="#" style={{ color: 'white', textDecoration: 'none' }}>Home</a>
          <a href="#" style={{ color: 'white', textDecoration: 'none' }}>Products</a>
          <a href="#" style={{ color: 'white', textDecoration: 'none' }}>About</a>
          <a href="#" style={{ color: 'white', textDecoration: 'none' }}>Contact</a>
        </Flex>
        <Flex align="center" gap="lg">
          <button style={{
            padding: '6px 12px',
            backgroundColor: 'transparent',
            color: 'white',
            border: '1px solid white',
            borderRadius: '4px',
            cursor: 'pointer'
          }}>
            Login
          </button>
          <button style={{
            padding: '6px 12px',
            backgroundColor: '#1890ff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}>
            Sign Up
          </button>
        </Flex>
      </Flex>

      {/* Breadcrumb Navigation */}
      <Flex 
        align="center" 
        gap="xs"
        className={createStyles({
          backgroundColor: "#fafafa",
          border: "1px solid #f0f0f0",
          padding: "0.75rem 1rem",
          borderRadius: "6px"
        })}
      >
        <span style={{ color: '#1890ff', cursor: 'pointer' }}>Home</span>
        <span style={{ color: '#8c8c8c' }}>›</span>
        <span style={{ color: '#1890ff', cursor: 'pointer' }}>Products</span>
        <span style={{ color: '#8c8c8c' }}>›</span>
        <span style={{ color: '#262626' }}>Current Page</span>
      </Flex>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Navigation components built with Flex: header navigation and breadcrumbs.',
      },
    },
  },
};

// Card layout example
export const CardLayoutExample: Story = {
  render: () => (
    <Flex 
      wrap="wrap" 
      gap="lg"
      justify="flex-start"
      className={createStyles({
        padding: "1rem",
        backgroundColor: "#f5f5f5",
        borderRadius: "8px"
      })}
    >
      {[
        { title: 'Product 1', price: '$29.99', color: '#1890ff' },
        { title: 'Product 2', price: '$39.99', color: '#52c41a' },
        { title: 'Product 3', price: '$19.99', color: '#fa8c16' },
        { title: 'Product 4', price: '$49.99', color: '#eb2f96' },
        { title: 'Product 5', price: '$24.99', color: '#722ed1' },
        { title: 'Product 6', price: '$34.99', color: '#13c2c2' }
      ].map((product, index) => (
        <Flex.Item key={index} basis="200px" grow={0} shrink={0}>
          <div style={{
            backgroundColor: 'white',
            border: '1px solid #f0f0f0',
            borderRadius: '8px',
            padding: '1.5rem',
            height: '100%',
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
          }}>
            <div style={{
              width: '100%',
              height: '120px',
              backgroundColor: product.color,
              borderRadius: '6px',
              marginBottom: '1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 'bold'
            }}>
              Image
            </div>
            <h4 style={{ margin: '0 0 0.5rem 0', color: '#262626' }}>
              {product.title}
            </h4>
            <Flex justify="space-between" align="center">
              <span style={{ fontSize: '18px', fontWeight: 'bold', color: product.color }}>
                {product.price}
              </span>
              <button style={{
                padding: '6px 12px',
                backgroundColor: product.color,
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '12px'
              }}>
                Add to Cart
              </button>
            </Flex>
          </div>
        </Flex.Item>
      ))}
    </Flex>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Product card layout using Flex with wrapping and consistent sizing.',
      },
    },
  },
};

// Form layout example
export const FormLayoutExample: Story = {
  render: () => (
    <div style={{ maxWidth: '500px', margin: '0 auto' }}>
      <Flex 
        direction="column" 
        gap="lg"
        className={createStyles({
          backgroundColor: "white",
          border: "1px solid #f0f0f0",
          padding: "2rem",
          borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.05)"
        })}
      >
        <h2 style={{ margin: 0, color: '#262626', textAlign: 'center' }}>
          Contact Form
        </h2>
        
        <Flex gap="lg">
          <Flex.Item flex={1}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#262626', fontWeight: '500' }}>
              First Name
            </label>
            <input 
              type="text" 
              placeholder="Enter first name"
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #d9d9d9',
                borderRadius: '6px',
                fontSize: '14px',
                boxSizing: 'border-box'
              }}
            />
          </Flex.Item>
          <Flex.Item flex={1}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#262626', fontWeight: '500' }}>
              Last Name
            </label>
            <input 
              type="text" 
              placeholder="Enter last name"
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #d9d9d9',
                borderRadius: '6px',
                fontSize: '14px',
                boxSizing: 'border-box'
              }}
            />
          </Flex.Item>
        </Flex>

        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: '#262626', fontWeight: '500' }}>
            Email
          </label>
          <input 
            type="email" 
            placeholder="Enter your email"
            style={{
              width: '100%',
              padding: '12px',
              border: '1px solid #d9d9d9',
              borderRadius: '6px',
              fontSize: '14px',
              boxSizing: 'border-box'
            }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: '#262626', fontWeight: '500' }}>
            Message
          </label>
          <textarea 
            rows={4}
            placeholder="Enter your message"
            style={{
              width: '100%',
              padding: '12px',
              border: '1px solid #d9d9d9',
              borderRadius: '6px',
              fontSize: '14px',
              resize: 'vertical',
              boxSizing: 'border-box'
            }}
          />
        </div>

        <Flex gap="lg" justify="flex-end">
          <button style={{
            padding: '12px 24px',
            backgroundColor: 'transparent',
            color: '#595959',
            border: '1px solid #d9d9d9',
            borderRadius: '6px',
            cursor: 'pointer'
          }}>
            Cancel
          </button>
          <button style={{
            padding: '12px 24px',
            backgroundColor: '#1890ff',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer'
          }}>
            Send Message
          </button>
        </Flex>
      </Flex>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Complex form layout using Flex for responsive field arrangement and button alignment.',
      },
    },
  },
};