import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { SimpleGridProps, SimpleGrid, createStyles } from '..';

const meta: Meta<SimpleGridProps> = {
  title: 'Components/Layouts/SimpleGrid',
  component: SimpleGrid,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
A responsive grid component where each item takes equal amount of space.

## Features
- CSS Grid with equal-width items using repeat(cols, 1fr)
- Responsive column count with breakpoint objects
- Predefined spacing scale for gaps ('xs', 'sm', 'md', 'lg', 'xl', 'xxl')
- Separate horizontal and vertical spacing control
- Container width measurement for responsive calculations
- Perfect for card layouts, image galleries, and consistent item grids
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    // SimpleGrid-specific props
    cols: {
      control: 'number',
      description: 'Number of columns in the grid',
    },
    spacing: {
      control: 'text',
      description: 'Gap between columns - can use spacing scale keys (xs, s, m, l, xl, xxl) or CSS values',
    },
    verticalSpacing: {
      control: 'text',
      description: 'Gap between rows - can use spacing scale keys or CSS values. Falls back to spacing if not provided',
    },

    // Core props
    containerWidth: {
      control: 'number',
      description: 'Fixed container width for responsive calculations',
    },
  },
};

export default meta;
type Story = StoryObj<SimpleGridProps>;

// Basic grid layout
export const BasicGrid: Story = {
  render: () => (
    <SimpleGrid 
      cols={3}
      className={createStyles({
        backgroundColor: "#f5f5f5", 
        border: "2px dashed #ccc", 
        padding: "1rem",
        borderRadius: "8px"
      })}
    >
      {Array.from({ length: 6 }, (_, i) => (
        <div key={i} style={{
          padding: '1.5rem',
          backgroundColor: '#1890ff',
          color: 'white',
          borderRadius: '6px',
          textAlign: 'center',
          fontWeight: '500'
        }}>
          Item {i + 1}
        </div>
      ))}
    </SimpleGrid>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Basic SimpleGrid with 3 columns and equal-sized items.',
      },
    },
  },
};

// Different column counts
export const ColumnCounts: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h4 style={{ margin: '0 0 1rem 0', color: '#262626' }}>1 Column</h4>
        <SimpleGrid 
          cols={1}
          className={createStyles({
            backgroundColor: "#e6f7ff", 
            border: "1px solid #91d5ff", 
            padding: "1rem",
            borderRadius: "6px"
          })}
        >
          {Array.from({ length: 3 }, (_, i) => (
            <div key={i} style={{
              padding: '1rem',
              backgroundColor: '#1890ff',
              color: 'white',
              borderRadius: '4px',
              textAlign: 'center'
            }}>
              Full Width Item {i + 1}
            </div>
          ))}
        </SimpleGrid>
      </div>

      <div>
        <h4 style={{ margin: '0 0 1rem 0', color: '#262626' }}>2 Columns</h4>
        <SimpleGrid 
          cols={2}
          className={createStyles({
            backgroundColor: "#f6ffed", 
            border: "1px solid #b7eb8f", 
            padding: "1rem",
            borderRadius: "6px"
          })}
        >
          {Array.from({ length: 4 }, (_, i) => (
            <div key={i} style={{
              padding: '1rem',
              backgroundColor: '#52c41a',
              color: 'white',
              borderRadius: '4px',
              textAlign: 'center'
            }}>
              Half Width {i + 1}
            </div>
          ))}
        </SimpleGrid>
      </div>

      <div>
        <h4 style={{ margin: '0 0 1rem 0', color: '#262626' }}>4 Columns</h4>
        <SimpleGrid 
          cols={4}
          className={createStyles({
            backgroundColor: "#fff7e6", 
            border: "1px solid #ffd591", 
            padding: "1rem",
            borderRadius: "6px"
          })}
        >
          {Array.from({ length: 8 }, (_, i) => (
            <div key={i} style={{
              padding: '1rem',
              backgroundColor: '#fa8c16',
              color: 'white',
              borderRadius: '4px',
              textAlign: 'center'
            }}>
              1/4 {i + 1}
            </div>
          ))}
        </SimpleGrid>
      </div>

      <div>
        <h4 style={{ margin: '0 0 1rem 0', color: '#262626' }}>6 Columns</h4>
        <SimpleGrid 
          cols={6}
          className={createStyles({
            backgroundColor: "#f9f0ff", 
            border: "1px solid #d3adf7", 
            padding: "1rem",
            borderRadius: "6px"
          })}
        >
          {Array.from({ length: 12 }, (_, i) => (
            <div key={i} style={{
              padding: '0.75rem 0.5rem',
              backgroundColor: '#722ed1',
              color: 'white',
              borderRadius: '4px',
              textAlign: 'center',
              fontSize: '14px'
            }}>
              {i + 1}
            </div>
          ))}
        </SimpleGrid>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different column counts: 1, 2, 4, and 6 columns with equal-width items.',
      },
    },
  },
};

// Spacing variations
export const SpacingVariations: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h4 style={{ margin: '0 0 1rem 0', color: '#262626' }}>Extra Small Spacing (xs)</h4>
        <SimpleGrid 
          cols={3}
          spacing="xs"
          className={createStyles({
            backgroundColor: "#fff7e6", 
            border: "1px solid #ffd591", 
            padding: "1rem",
            borderRadius: "6px"
          })}
        >
          {Array.from({ length: 6 }, (_, i) => (
            <div key={i} style={{
              padding: '1rem',
              backgroundColor: '#fa8c16',
              color: 'white',
              borderRadius: '4px',
              textAlign: 'center'
            }}>
              XS {i + 1}
            </div>
          ))}
        </SimpleGrid>
      </div>

      <div>
        <h4 style={{ margin: '0 0 1rem 0', color: '#262626' }}>Medium Spacing (m) - Default</h4>
        <SimpleGrid 
          cols={3}
          spacing="md"
          className={createStyles({
            backgroundColor: "#e6f7ff", 
            border: "1px solid #91d5ff", 
            padding: "1rem",
            borderRadius: "6px"
          })}
        >
          {Array.from({ length: 6 }, (_, i) => (
            <div key={i} style={{
              padding: '1rem',
              backgroundColor: '#1890ff',
              color: 'white',
              borderRadius: '4px',
              textAlign: 'center'
            }}>
              M {i + 1}
            </div>
          ))}
        </SimpleGrid>
      </div>

      <div>
        <h4 style={{ margin: '0 0 1rem 0', color: '#262626' }}>Extra Large Spacing (xl)</h4>
        <SimpleGrid 
          cols={3}
          spacing="xl"
          className={createStyles({
            backgroundColor: "#f6ffed", 
            border: "1px solid #b7eb8f", 
            padding: "1rem",
            borderRadius: "6px"
          })}
        >
          {Array.from({ length: 6 }, (_, i) => (
            <div key={i} style={{
              padding: '1rem',
              backgroundColor: '#52c41a',
              color: 'white',
              borderRadius: '4px',
              textAlign: 'center'
            }}>
              XL {i + 1}
            </div>
          ))}
        </SimpleGrid>
      </div>

      <div>
        <h4 style={{ margin: '0 0 1rem 0', color: '#262626' }}>No Spacing (0)</h4>
        <SimpleGrid 
          cols={3}
          spacing="xs"
          className={createStyles({
            backgroundColor: "#f0f2f5", 
            border: "1px solid #d9d9d9", 
            padding: "1rem",
            borderRadius: "6px"
          })}
        >
          {Array.from({ length: 6 }, (_, i) => (
            <div key={i} style={{
              padding: '1rem',
              backgroundColor: '#595959',
              color: 'white',
              textAlign: 'center'
            }}>
              No Gap {i + 1}
            </div>
          ))}
        </SimpleGrid>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different spacing options using the predefined scale: xs, m (default), xl, and 0.',
      },
    },
  },
};

// Vertical spacing control
export const VerticalSpacing: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h4 style={{ margin: '0 0 1rem 0', color: '#262626' }}>Same Horizontal and Vertical Spacing</h4>
        <SimpleGrid 
          cols={3}
          spacing="md"
          className={createStyles({
            backgroundColor: "#e6f7ff", 
            border: "1px solid #91d5ff", 
            padding: "1rem",
            borderRadius: "6px"
          })}
        >
          {Array.from({ length: 9 }, (_, i) => (
            <div key={i} style={{
              padding: '1rem',
              backgroundColor: '#1890ff',
              color: 'white',
              borderRadius: '4px',
              textAlign: 'center'
            }}>
              Item {i + 1}
            </div>
          ))}
        </SimpleGrid>
      </div>

      <div>
        <h4 style={{ margin: '0 0 1rem 0', color: '#262626' }}>Large Horizontal, Small Vertical</h4>
        <SimpleGrid 
          cols={3}
          spacing="lg"
          verticalSpacing="xs"
          className={createStyles({
            backgroundColor: "#f6ffed", 
            border: "1px solid #b7eb8f", 
            padding: "1rem",
            borderRadius: "6px"
          })}
        >
          {Array.from({ length: 9 }, (_, i) => (
            <div key={i} style={{
              padding: '1rem',
              backgroundColor: '#52c41a',
              color: 'white',
              borderRadius: '4px',
              textAlign: 'center'
            }}>
              Item {i + 1}
            </div>
          ))}
        </SimpleGrid>
      </div>

      <div>
        <h4 style={{ margin: '0 0 1rem 0', color: '#262626' }}>Small Horizontal, Large Vertical</h4>
        <SimpleGrid 
          cols={3}
          spacing="xs"
          verticalSpacing="lg"
          className={createStyles({
            backgroundColor: "#fff7e6", 
            border: "1px solid #ffd591", 
            padding: "1rem",
            borderRadius: "6px"
          })}
        >
          {Array.from({ length: 9 }, (_, i) => (
            <div key={i} style={{
              padding: '1rem',
              backgroundColor: '#fa8c16',
              color: 'white',
              borderRadius: '4px',
              textAlign: 'center'
            }}>
              Item {i + 1}
            </div>
          ))}
        </SimpleGrid>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Control horizontal and vertical spacing independently with spacing and verticalSpacing props.',
      },
    },
  },
};

// Responsive grid
export const ResponsiveGrid: Story = {
  render: () => (
    <SimpleGrid 
      cols={{ xs: 1, sm: 2, md: 3, lg: 4 }}
      spacing={{ xs: "sm", md: "md", lg: "lg" }}
      verticalSpacing={{ xs: "md", md: "sm" }}
      className={createStyles({
        backgroundColor: "#f0f5ff", 
        border: "1px solid #91d5ff", 
        padding: "1.5rem",
        borderRadius: "8px"
      })}
    >
      {Array.from({ length: 12 }, (_, i) => (
        <div key={i} style={{
          padding: '1.5rem',
          backgroundColor: '#1890ff',
          color: 'white',
          borderRadius: '6px',
          textAlign: 'center',
          fontWeight: '500'
        }}>
          Responsive Item {i + 1}
        </div>
      ))}
    </SimpleGrid>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Responsive grid that changes columns and spacing at different breakpoints: 1 col (xs), 2 cols (sm), 3 cols (md), 4 cols (lg).',
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

// Card gallery
export const CardGallery: Story = {
  render: () => (
    <SimpleGrid 
      cols={{ xs: 1, sm: 2, md: 3 }}
      spacing="lg"
      className={createStyles({
        backgroundColor: "white"
      })}
    >
      {[
        { title: 'Product Card', price: '$99.99', color: '#1890ff' },
        { title: 'Service Card', price: '$49.99', color: '#52c41a' },
        { title: 'Feature Card', price: '$29.99', color: '#fa8c16' },
        { title: 'Premium Card', price: '$199.99', color: '#722ed1' },
        { title: 'Basic Card', price: '$19.99', color: '#eb2f96' },
        { title: 'Enterprise Card', price: '$499.99', color: '#13c2c2' },
      ].map((card, i) => (
        <div key={i} style={{
          backgroundColor: 'white',
          border: '1px solid #f0f0f0',
          borderRadius: '8px',
          padding: '1.5rem',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          transition: 'box-shadow 0.3s ease'
        }}>
          <div style={{
            width: '100%',
            height: '120px',
            backgroundColor: card.color,
            borderRadius: '6px',
            marginBottom: '1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '18px',
            fontWeight: '600'
          }}>
            {card.title}
          </div>
          <h3 style={{ margin: '0 0 0.5rem 0', color: '#262626', fontSize: '16px' }}>
            {card.title}
          </h3>
          <p style={{ margin: '0 0 1rem 0', color: '#8c8c8c', fontSize: '14px' }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <span style={{ fontSize: '20px', fontWeight: 'bold', color: card.color }}>
              {card.price}
            </span>
            <button style={{
              padding: '0.5rem 1rem',
              backgroundColor: card.color,
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '14px'
            }}>
              Buy Now
            </button>
          </div>
        </div>
      ))}
    </SimpleGrid>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Real-world example: responsive card gallery with product cards.',
      },
    },
  },
};

// Image gallery
export const ImageGallery: Story = {
  render: () => (
    <SimpleGrid 
      cols={{ xs: 2, sm: 3, md: 4, lg: 5 }}
      spacing="sm"
      className={createStyles({
        backgroundColor: "#fafafa",
        padding: "1rem",
        borderRadius: "8px"
      })}
    >
      {Array.from({ length: 15 }, (_, i) => {
        const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3', '#54a0ff', '#5f27cd', '#00d2d3', '#ff9f43'];
        const color = colors[i % colors.length];
        return (
          <div key={i} style={{
            aspectRatio: '1',
            backgroundColor: color,
            borderRadius: '6px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '18px',
            cursor: 'pointer',
            transition: 'transform 0.2s ease',
          }}>
            {i + 1}
          </div>
        );
      })}
    </SimpleGrid>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Image gallery layout with responsive columns and square aspect ratio items.',
      },
    },
  },
};

// Feature grid
export const FeatureGrid: Story = {
  render: () => (
    <SimpleGrid 
      cols={{ xs: 1, md: 2, lg: 3 }}
      spacing="xl"
      verticalSpacing="xl"
      className={createStyles({
        backgroundColor: "white",
        padding: "2rem"
      })}
    >
      {[
        { icon: '🚀', title: 'Performance', description: 'Lightning fast rendering with optimized components' },
        { icon: '📱', title: 'Responsive', description: 'Perfect adaptation to any screen size and device' },
        { icon: '🎨', title: 'Customizable', description: 'Easy theming and styling with CSS-in-JS' },
        { icon: '♿', title: 'Accessible', description: 'Built with accessibility best practices in mind' },
        { icon: '🔧', title: 'Developer DX', description: 'Great developer experience with TypeScript support' },
        { icon: '📦', title: 'Lightweight', description: 'Minimal bundle size with tree-shaking support' },
      ].map((feature, i) => (
        <div key={i} style={{
          padding: '2rem',
          backgroundColor: 'white',
          border: '1px solid #f0f0f0',
          borderRadius: '12px',
          textAlign: 'center',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease'
        }}>
          <div style={{
            fontSize: '48px',
            marginBottom: '1rem'
          }}>
            {feature.icon}
          </div>
          <h3 style={{
            margin: '0 0 1rem 0',
            color: '#262626',
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
    </SimpleGrid>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Feature showcase grid with icons, titles, and descriptions.',
      },
    },
  },
};

// Custom spacing values
export const CustomSpacing: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h4 style={{ margin: '0 0 1rem 0', color: '#262626' }}>Large Horizontal, Medium Vertical</h4>
        <SimpleGrid 
          cols={3}
          spacing="lg"
          verticalSpacing="md"
          className={createStyles({
            backgroundColor: "#f9f0ff", 
            border: "1px solid #d3adf7", 
            padding: "1rem",
            borderRadius: "6px"
          })}
        >
          {Array.from({ length: 6 }, (_, i) => (
            <div key={i} style={{
              padding: '1rem',
              backgroundColor: '#722ed1',
              color: 'white',
              borderRadius: '4px',
              textAlign: 'center'
            }}>
              Custom {i + 1}
            </div>
          ))}
        </SimpleGrid>
      </div>

      <div>
        <h4 style={{ margin: '0 0 1rem 0', color: '#262626' }}>Large Spacing</h4>
        <SimpleGrid 
          cols={4}
          spacing="lg"
          className={createStyles({
            backgroundColor: "#fff0f6", 
            border: "1px solid #ffadd6", 
            padding: "1rem",
            borderRadius: "6px"
          })}
        >
          {Array.from({ length: 8 }, (_, i) => (
            <div key={i} style={{
              padding: '0.75rem',
              backgroundColor: '#eb2f96',
              color: 'white',
              borderRadius: '4px',
              textAlign: 'center',
              fontSize: '14px'
            }}>
              24px {i + 1}
            </div>
          ))}
        </SimpleGrid>
      </div>

      <div>
        <h4 style={{ margin: '0 0 1rem 0', color: '#262626' }}>Medium Horizontal, Small Vertical</h4>
        <SimpleGrid 
          cols={3}
          spacing="md"
          verticalSpacing="xs"
          className={createStyles({
            backgroundColor: "#f0f9ff", 
            border: "1px solid #bae7ff", 
            padding: "1rem",
            borderRadius: "6px"
          })}
        >
          {Array.from({ length: 9 }, (_, i) => (
            <div key={i} style={{
              padding: '1rem',
              backgroundColor: '#13c2c2',
              color: 'white',
              borderRadius: '4px',
              textAlign: 'center'
            }}>
              Mixed {i + 1}
            </div>
          ))}
        </SimpleGrid>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Custom spacing values using different CSS units: rem, px, and mixed units.',
      },
    },
  },
};

// Dashboard layout
export const DashboardLayout: Story = {
  render: () => (
    <div style={{ backgroundColor: '#f5f5f5', padding: '1.5rem', borderRadius: '8px' }}>
      <h3 style={{ margin: '0 0 1.5rem 0', color: '#262626' }}>Dashboard Overview</h3>
      
      {/* Stats cards */}
      <SimpleGrid 
        cols={{ xs: 1, sm: 2, lg: 4 }}
        spacing="md"
        className={createStyles({
          marginBottom: "1.5rem"
        })}
      >
        {[
          { label: 'Total Users', value: '12,345', change: '+12%', color: '#1890ff' },
          { label: 'Revenue', value: '$54,321', change: '+8%', color: '#52c41a' },
          { label: 'Orders', value: '1,234', change: '+23%', color: '#fa8c16' },
          { label: 'Conversion', value: '3.45%', change: '-2%', color: '#722ed1' },
        ].map((stat, i) => (
          <div key={i} style={{
            backgroundColor: 'white',
            padding: '1.5rem',
            borderRadius: '8px',
            border: '1px solid #f0f0f0',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.02)'
          }}>
            <div style={{ color: '#8c8c8c', fontSize: '14px', marginBottom: '0.5rem' }}>
              {stat.label}
            </div>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#262626', marginBottom: '0.25rem' }}>
              {stat.value}
            </div>
            <div style={{ 
              fontSize: '12px', 
              color: stat.change.startsWith('+') ? '#52c41a' : '#ff4d4f' 
            }}>
              {stat.change} from last month
            </div>
          </div>
        ))}
      </SimpleGrid>

      {/* Charts section */}
      <SimpleGrid 
        cols={{ xs: 1, lg: 2 }}
        spacing="md"
      >
        <div style={{
          backgroundColor: 'white',
          padding: '1.5rem',
          borderRadius: '8px',
          border: '1px solid #f0f0f0',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.02)'
        }}>
          <h4 style={{ margin: '0 0 1rem 0', color: '#262626' }}>Revenue Trend</h4>
          <div style={{
            height: '200px',
            backgroundColor: '#f8f9fa',
            borderRadius: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#8c8c8c'
          }}>
            Chart Placeholder
          </div>
        </div>

        <div style={{
          backgroundColor: 'white',
          padding: '1.5rem',
          borderRadius: '8px',
          border: '1px solid #f0f0f0',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.02)'
        }}>
          <h4 style={{ margin: '0 0 1rem 0', color: '#262626' }}>User Activity</h4>
          <div style={{
            height: '200px',
            backgroundColor: '#f8f9fa',
            borderRadius: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#8c8c8c'
          }}>
            Chart Placeholder
          </div>
        </div>
      </SimpleGrid>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Complex dashboard layout with stats cards and chart sections using multiple SimpleGrid instances.',
      },
    },
  },
};