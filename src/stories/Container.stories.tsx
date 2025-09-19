import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ContainerProps, Container, createStyles } from '..';

const meta: Meta<ContainerProps> = {
  title: 'Components/Layouts/Container',
  component: Container,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
A layout component that centers content horizontally and controls maximum width.

## Features
- Automatic horizontal centering with auto margins
- Configurable maximum width with the size prop
- Fluid mode for full-width layouts
- Responsive size and fluid behavior with breakpoint objects
- Built-in horizontal padding for better readability
- Container width measurement for responsive calculations
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    // Container-specific props
    size: {
      control: 'number',
      description: 'Maximum width of the container in pixels',
    },
    fluid: {
      control: 'boolean',
      description: 'Use full width (100%) ignoring the size prop',
    },

    // Core props
    containerWidth: {
      control: 'number',
      description: 'Fixed container width for responsive calculations',
    },
  },
};

export default meta;
type Story = StoryObj<ContainerProps>;

// Basic container with default size
export const DefaultContainer: Story = {
  render: () => (
    <div style={{ backgroundColor: '#f0f2f5', minHeight: '100vh', padding: '2rem 0' }}>
      <Container className={createStyles({
        backgroundColor: "white",
        border: "1px solid #d9d9d9",
        borderRadius: "8px",
        padding: "2rem"
      })}>
        <h2 style={{ margin: '0 0 1rem 0', color: '#262626' }}>Default Container</h2>
        <p style={{ margin: '0 0 1rem 0', color: '#595959', lineHeight: 1.6 }}>
          This container uses the default maximum width of 1200px and is automatically centered 
          on the page. It includes built-in horizontal padding for better content readability.
        </p>
        <p style={{ margin: 0, color: '#8c8c8c', fontSize: '14px' }}>
          Max width: 1200px • Centered horizontally • Built-in padding
        </p>
      </Container>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Default container with 1200px maximum width and automatic centering.',
      },
    },
  },
};

// Custom size container
export const CustomSizeContainer: Story = {
  render: () => (
    <div style={{ backgroundColor: '#f6ffed', minHeight: '100vh', padding: '2rem 0' }}>
      <Container 
        size={800} 
        className={createStyles({
          backgroundColor: "white",
          border: "1px solid #b7eb8f",
          borderRadius: "8px",
          padding: "2rem",
          marginBottom: "2rem"
        })}
      >
        <h2 style={{ margin: '0 0 1rem 0', color: '#389e0d' }}>Narrow Container (800px)</h2>
        <p style={{ margin: '0 0 1rem 0', color: '#52c41a', lineHeight: 1.6 }}>
          This container has a custom maximum width of 800px, making it narrower than the default.
          Perfect for focused content like articles or forms.
        </p>
        <p style={{ margin: 0, color: '#73d13d', fontSize: '14px' }}>
          Max width: 800px
        </p>
      </Container>

      <Container 
        size={600} 
        className={createStyles({
          backgroundColor: "white",
          border: "1px solid #b7eb8f",
          borderRadius: "8px",
          padding: "2rem"
        })}
      >
        <h2 style={{ margin: '0 0 1rem 0', color: '#389e0d' }}>Even Narrower (600px)</h2>
        <p style={{ margin: 0, color: '#52c41a', lineHeight: 1.6 }}>
          This container is even more focused with a 600px maximum width.
          Great for reading-focused content.
        </p>
      </Container>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Containers with custom maximum widths for different content types.',
      },
    },
  },
};

// Fluid container (full width)
export const FluidContainer: Story = {
  render: () => (
    <div style={{ backgroundColor: '#fff2e8', minHeight: '100vh', padding: '2rem 0' }}>
      <Container 
        fluid 
        className={createStyles({
          backgroundColor: "white",
          border: "1px solid #ffbb96",
          borderRadius: "8px",
          padding: "2rem"
        })}
      >
        <h2 style={{ margin: '0 0 1rem 0', color: '#d4380d' }}>Fluid Container</h2>
        <p style={{ margin: '0 0 1rem 0', color: '#fa541c', lineHeight: 1.6 }}>
          This container uses the full width of its parent container, ignoring the size prop.
          Perfect for full-width layouts, dashboards, or when you need edge-to-edge content.
        </p>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '1rem',
          marginTop: '2rem'
        }}>
          {Array.from({ length: 6 }, (_, i) => (
            <div 
              key={i}
              style={{
                backgroundColor: '#fff7e6',
                border: '1px solid #ffd591',
                borderRadius: '6px',
                padding: '1rem',
                textAlign: 'center',
                color: '#ad6800'
              }}
            >
              Item {i + 1}
            </div>
          ))}
        </div>
        <p style={{ margin: '2rem 0 0 0', color: '#ad4e00', fontSize: '14px' }}>
          Width: 100% • No maximum width constraint
        </p>
      </Container>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Fluid container that uses full width, perfect for dashboards and full-width layouts.',
      },
    },
  },
};

// Responsive container sizes
export const ResponsiveContainer: Story = {
  render: () => (
    <div style={{ backgroundColor: '#f0f5ff', minHeight: '100vh', padding: '2rem 0' }}>
      <Container 
        size={{ xs: 320, sm: 480, md: 768, lg: 1024, xl: 1200 }}
        containerWidth={800} // Fixed for demonstration
        className={createStyles({
          backgroundColor: "white",
          border: "1px solid #91d5ff",
          borderRadius: "8px",
          padding: "2rem"
        })}
      >
        <h2 style={{ margin: '0 0 1rem 0', color: '#0958d9' }}>Responsive Container</h2>
        <p style={{ margin: '0 0 1rem 0', color: '#1677ff', lineHeight: 1.6 }}>
          This container adapts its maximum width based on the current container width.
          The width changes at different breakpoints to provide optimal reading experience.
        </p>
        <div style={{ 
          backgroundColor: '#e6f7ff', 
          border: '1px solid #91d5ff',
          borderRadius: '6px',
          padding: '1rem',
          marginTop: '1rem',
          fontSize: '14px',
          color: '#0958d9'
        }}>
          <strong>Responsive Breakpoints:</strong>
          <br />• xs: 320px max width
          <br />• sm: 480px max width  
          <br />• md: 768px max width
          <br />• lg: 1024px max width
          <br />• xl: 1200px max width
        </div>
      </Container>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Container with responsive maximum widths that adapt to different screen sizes.',
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

// Responsive fluid behavior
export const ResponsiveFluid: Story = {
  render: () => (
    <div style={{ backgroundColor: '#fcf0ff', minHeight: '100vh', padding: '2rem 0' }}>
      <Container 
        size={800}
        fluid={{ xs: true, md: false }}
        containerWidth={600} // Fixed for demonstration  
        className={createStyles({
          backgroundColor: "white",
          border: "1px solid #d3adf7",
          borderRadius: "8px",
          padding: "2rem"
        })}
      >
        <h2 style={{ margin: '0 0 1rem 0', color: '#531dab' }}>Responsive Fluid Behavior</h2>
        <p style={{ margin: '0 0 1rem 0', color: '#722ed1', lineHeight: 1.6 }}>
          This container switches between fluid (full width) and constrained (800px max) 
          behavior based on the screen size. Mobile gets full width, desktop gets constrained.
        </p>
        <div style={{ 
          backgroundColor: '#f9f0ff', 
          border: '1px solid #d3adf7',
          borderRadius: '6px',
          padding: '1rem',
          marginTop: '1rem',
          fontSize: '14px',
          color: '#531dab'
        }}>
          <strong>Responsive Behavior:</strong>
          <br />• Mobile (xs): Fluid (100% width)
          <br />• Desktop (md+): Constrained (800px max width)
        </div>
      </Container>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Container that switches between fluid and constrained modes at different breakpoints.',
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

// Multiple containers with different sizes
export const MultipleContainers: Story = {
  render: () => (
    <div style={{ backgroundColor: '#f6f6f6', minHeight: '100vh', padding: '2rem 0' }}>
      <Container 
        size={1200} 
        className={createStyles({
          backgroundColor: "#1890ff",
          color: "white",
          padding: "1.5rem",
          marginBottom: "1rem",
          borderRadius: "8px"
        })}
      >
        <h3 style={{ margin: '0 0 0.5rem 0' }}>Wide Container (1200px)</h3>
        <p style={{ margin: 0, opacity: 0.9 }}>
          Full-width container for headers and hero sections
        </p>
      </Container>

      <Container 
        size={900} 
        className={createStyles({
          backgroundColor: "#52c41a",
          color: "white",
          padding: "1.5rem",
          marginBottom: "1rem",
          borderRadius: "8px"
        })}
      >
        <h3 style={{ margin: '0 0 0.5rem 0' }}>Medium Container (900px)</h3>
        <p style={{ margin: 0, opacity: 0.9 }}>
          Good for main content areas and articles
        </p>
      </Container>

      <Container 
        size={600} 
        className={createStyles({
          backgroundColor: "#fa8c16",
          color: "white",
          padding: "1.5rem",
          marginBottom: "1rem",
          borderRadius: "8px"
        })}
      >
        <h3 style={{ margin: '0 0 0.5rem 0' }}>Narrow Container (600px)</h3>
        <p style={{ margin: 0, opacity: 0.9 }}>
          Perfect for focused content and forms
        </p>
      </Container>

      <Container 
        fluid 
        className={createStyles({
          backgroundColor: "#eb2f96",
          color: "white",
          padding: "1.5rem",
          borderRadius: "8px"
        })}
      >
        <h3 style={{ margin: '0 0 0.5rem 0' }}>Fluid Container</h3>
        <p style={{ margin: 0, opacity: 0.9 }}>
          Full-width container for complex layouts
        </p>
      </Container>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Multiple containers with different sizes showing the variety of layout options.',
      },
    },
  },
};

// Container for content types
export const ContentTypeContainers: Story = {
  render: () => (
    <div style={{ backgroundColor: '#fafafa', minHeight: '100vh', padding: '2rem 0' }}>
      {/* Article Container */}
      <Container 
        size={700} 
        className={createStyles({
          backgroundColor: "white",
          border: "1px solid #f0f0f0",
          borderRadius: "8px",
          padding: "3rem",
          marginBottom: "2rem",
          boxShadow: "0 2px 8px rgba(0,0,0,0.02)"
        })}
      >
        <h1 style={{ margin: '0 0 1rem 0', color: '#262626', fontSize: '2rem' }}>
          Article Title
        </h1>
        <p style={{ margin: '0 0 1rem 0', color: '#8c8c8c', fontSize: '14px' }}>
          Published on March 15, 2024 • 5 min read
        </p>
        <p style={{ margin: '0 0 1.5rem 0', color: '#595959', lineHeight: 1.7, fontSize: '16px' }}>
          This container is optimized for reading content with a 700px maximum width. 
          The narrower width ensures optimal line length for comfortable reading, 
          typically 45-75 characters per line.
        </p>
        <p style={{ margin: '0 0 1.5rem 0', color: '#595959', lineHeight: 1.7, fontSize: '16px' }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod 
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
          quis nostrud exercitation ullamco laboris.
        </p>
      </Container>

      {/* Form Container */}
      <Container 
        size={500} 
        className={createStyles({
          backgroundColor: "white",
          border: "1px solid #f0f0f0",
          borderRadius: "8px",
          padding: "2rem",
          marginBottom: "2rem",
          boxShadow: "0 2px 8px rgba(0,0,0,0.02)"
        })}
      >
        <h2 style={{ margin: '0 0 1.5rem 0', color: '#262626', textAlign: 'center' }}>
          Contact Form
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <input 
            type="text" 
            placeholder="Name" 
            style={{
              padding: '12px',
              border: '1px solid #d9d9d9',
              borderRadius: '6px',
              fontSize: '14px'
            }}
          />
          <input 
            type="email" 
            placeholder="Email" 
            style={{
              padding: '12px',
              border: '1px solid #d9d9d9',
              borderRadius: '6px',
              fontSize: '14px'
            }}
          />
          <textarea 
            placeholder="Message" 
            rows={4}
            style={{
              padding: '12px',
              border: '1px solid #d9d9d9',
              borderRadius: '6px',
              fontSize: '14px',
              resize: 'vertical'
            }}
          />
          <button style={{
            padding: '12px',
            backgroundColor: '#1890ff',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            fontSize: '16px',
            cursor: 'pointer'
          }}>
            Send Message
          </button>
        </div>
      </Container>

      {/* Dashboard Container */}
      <Container 
        fluid 
        className={createStyles({
          backgroundColor: "white",
          border: "1px solid #f0f0f0",
          borderRadius: "8px",
          padding: "2rem",
          boxShadow: "0 2px 8px rgba(0,0,0,0.02)"
        })}
      >
        <h2 style={{ margin: '0 0 2rem 0', color: '#262626' }}>
          Dashboard Overview
        </h2>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
          gap: '1.5rem'
        }}>
          {[
            { title: 'Total Users', value: '12,345', color: '#1890ff' },
            { title: 'Revenue', value: '$89,123', color: '#52c41a' },
            { title: 'Orders', value: '1,234', color: '#fa8c16' },
            { title: 'Conversion', value: '3.2%', color: '#eb2f96' }
          ].map((metric, index) => (
            <div 
              key={index}
              style={{
                padding: '1.5rem',
                backgroundColor: '#fafafa',
                border: '1px solid #f0f0f0',
                borderRadius: '8px',
                textAlign: 'center'
              }}
            >
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: metric.color, marginBottom: '0.5rem' }}>
                {metric.value}
              </div>
              <div style={{ color: '#8c8c8c', fontSize: '14px' }}>
                {metric.title}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Containers optimized for different content types: articles, forms, and dashboards.',
      },
    },
  },
};