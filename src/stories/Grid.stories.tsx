import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { GridProps, Grid, createStyles } from '..';

const meta: Meta<GridProps> = {
  title: 'Components/Layouts/Grid',
  component: Grid,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
A comprehensive CSS Grid layout component with configurable columns and responsive behavior.

## Features
- 12-column grid system by default (configurable)
- Grid.Col sub-component for individual column control
- Responsive values for all grid properties using breakpoint objects
- Configurable gutters and alignment
- Column spanning, offsetting, and ordering
- Container width measurement for responsive calculations
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    // Grid container props
    columns: {
      control: 'number',
      description: 'Number of columns in the grid',
    },
    gutter: {
      control: 'text',
      description: 'Gap between grid items',
    },
    align: {
      control: 'select',
      options: ['stretch', 'start', 'end', 'center', 'baseline'],
      description: 'align-items CSS property for grid container',
    },
    justify: {
      control: 'select',
      options: ['start', 'end', 'center', 'stretch', 'space-between', 'space-around', 'space-evenly'],
      description: 'justify-content CSS property for grid container',
    },
    grow: {
      control: 'boolean',
      description: 'Columns in last row expand to fill available space',
    },
    overflow: {
      control: 'select',
      options: ['visible', 'hidden', 'scroll', 'auto'],
      description: 'overflow CSS property on the grid container',
    },

    // Core props
    containerWidth: {
      control: 'number',
      description: 'Fixed container width for responsive calculations',
    },
  },
};

export default meta;
type Story = StoryObj<GridProps>;

// Basic 12-column grid
export const BasicGrid: Story = {
  render: () => (
    <Grid 
      className={createStyles({
        backgroundColor: "#f5f5f5",
        border: "2px dashed #ccc",
        padding: "1rem",
        borderRadius: "8px"
      })}
    >
      <Grid.Col span={4} className={createStyles({ backgroundColor: "#1890ff", color: "white", padding: "1rem", borderRadius: "4px", textAlign: "center" })}>
        4 columns
      </Grid.Col>
      <Grid.Col span={4} className={createStyles({ backgroundColor: "#52c41a", color: "white", padding: "1rem", borderRadius: "4px", textAlign: "center" })}>
        4 columns
      </Grid.Col>
      <Grid.Col span={4} className={createStyles({ backgroundColor: "#fa8c16", color: "white", padding: "1rem", borderRadius: "4px", textAlign: "center" })}>
        4 columns
      </Grid.Col>
    </Grid>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Basic 12-column grid with three equal-width columns (4/12 each).',
      },
    },
  },
};

// Different column spans
export const ColumnSpans: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Grid className={createStyles({ backgroundColor: "#f0f2f5", padding: "1rem", borderRadius: "6px" })}>
        <Grid.Col span={12} className={createStyles({ backgroundColor: "#722ed1", color: "white", padding: "1rem", borderRadius: "4px", textAlign: "center" })}>
          span={'{12}'} - Full width
        </Grid.Col>
      </Grid>

      <Grid className={createStyles({ backgroundColor: "#f0f2f5", padding: "1rem", borderRadius: "6px" })}>
        <Grid.Col span={6} className={createStyles({ backgroundColor: "#1890ff", color: "white", padding: "1rem", borderRadius: "4px", textAlign: "center" })}>
          span={'{6}'} - Half width
        </Grid.Col>
        <Grid.Col span={6} className={createStyles({ backgroundColor: "#40a9ff", color: "white", padding: "1rem", borderRadius: "4px", textAlign: "center" })}>
          span={'{6}'} - Half width
        </Grid.Col>
      </Grid>

      <Grid className={createStyles({ backgroundColor: "#f0f2f5", padding: "1rem", borderRadius: "6px" })}>
        <Grid.Col span={3} className={createStyles({ backgroundColor: "#52c41a", color: "white", padding: "1rem", borderRadius: "4px", textAlign: "center" })}>
          span={'{3}'}
        </Grid.Col>
        <Grid.Col span={3} className={createStyles({ backgroundColor: "#73d13d", color: "white", padding: "1rem", borderRadius: "4px", textAlign: "center" })}>
          span={'{3}'}
        </Grid.Col>
        <Grid.Col span={3} className={createStyles({ backgroundColor: "#95de64", color: "white", padding: "1rem", borderRadius: "4px", textAlign: "center" })}>
          span={'{3}'}
        </Grid.Col>
        <Grid.Col span={3} className={createStyles({ backgroundColor: "#b7eb8f", color: "white", padding: "1rem", borderRadius: "4px", textAlign: "center" })}>
          span={'{3}'}
        </Grid.Col>
      </Grid>

      <Grid className={createStyles({ backgroundColor: "#f0f2f5", padding: "1rem", borderRadius: "6px" })}>
        <Grid.Col span={2} className={createStyles({ backgroundColor: "#fa541c", color: "white", padding: "1rem", borderRadius: "4px", textAlign: "center" })}>
          2
        </Grid.Col>
        <Grid.Col span={8} className={createStyles({ backgroundColor: "#fa8c16", color: "white", padding: "1rem", borderRadius: "4px", textAlign: "center" })}>
          span={'{8}'} - Main content
        </Grid.Col>
        <Grid.Col span={2} className={createStyles({ backgroundColor: "#fa541c", color: "white", padding: "1rem", borderRadius: "4px", textAlign: "center" })}>
          2
        </Grid.Col>
      </Grid>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different column span configurations showing various layout possibilities.',
      },
    },
  },
};

// Custom number of columns
export const CustomColumns: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Grid columns={10} className={createStyles({ backgroundColor: "#f0f2f5", padding: "1rem", borderRadius: "6px" })}>
        <Grid.Col span={2} className={createStyles({ backgroundColor: "#9254de", color: "white", padding: "1rem", borderRadius: "4px", textAlign: "center" })}>
          2/10
        </Grid.Col>
        <Grid.Col span={6} className={createStyles({ backgroundColor: "#ad6adc", color: "white", padding: "1rem", borderRadius: "4px", textAlign: "center" })}>
          6/10
        </Grid.Col>
        <Grid.Col span={2} className={createStyles({ backgroundColor: "#c381db", color: "white", padding: "1rem", borderRadius: "4px", textAlign: "center" })}>
          2/10
        </Grid.Col>
      </Grid>

      <Grid columns={16} className={createStyles({ backgroundColor: "#f0f2f5", padding: "1rem", borderRadius: "6px" })}>
        <Grid.Col span={4} className={createStyles({ backgroundColor: "#1890ff", color: "white", padding: "1rem", borderRadius: "4px", textAlign: "center" })}>
          4/16
        </Grid.Col>
        <Grid.Col span={8} className={createStyles({ backgroundColor: "#40a9ff", color: "white", padding: "1rem", borderRadius: "4px", textAlign: "center" })}>
          8/16
        </Grid.Col>
        <Grid.Col span={4} className={createStyles({ backgroundColor: "#69c0ff", color: "white", padding: "1rem", borderRadius: "4px", textAlign: "center" })}>
          4/16
        </Grid.Col>
      </Grid>
    </div>
  ),

  parameters: {
    docs: {
      description: {
        story: 'Custom number of columns (10 and 16) instead of default 12.',
      },
    },
  },
};

// Column offsets
export const ColumnOffsets: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Grid className={createStyles({ backgroundColor: "#f9f0ff", border: "1px solid #d3adf7", padding: "1rem", borderRadius: "6px" })}>
        <Grid.Col span={4} offset={4} className={createStyles({ backgroundColor: "#722ed1", color: "white", padding: "1rem", borderRadius: "4px", textAlign: "center" })}>
          span={'{4}'} offset={'{4}'} - Centered
        </Grid.Col>
      </Grid>

      <Grid className={createStyles({ backgroundColor: "#f9f0ff", border: "1px solid #d3adf7", padding: "1rem", borderRadius: "6px" })}>
        <Grid.Col span={3} offset={2} className={createStyles({ backgroundColor: "#9254de", color: "white", padding: "1rem", borderRadius: "4px", textAlign: "center" })}>
          span={'{3}'} offset={'{2}'}
        </Grid.Col>
        <Grid.Col span={4} offset={1} className={createStyles({ backgroundColor: "#b37feb", color: "white", padding: "1rem", borderRadius: "4px", textAlign: "center" })}>
          span={'{4}'} offset={'{1}'}
        </Grid.Col>
      </Grid>

      <Grid className={createStyles({ backgroundColor: "#f9f0ff", border: "1px solid #d3adf7", padding: "1rem", borderRadius: "6px" })}>
        <Grid.Col span={6} className={createStyles({ backgroundColor: "#722ed1", color: "white", padding: "1rem", borderRadius: "4px", textAlign: "center" })}>
          span={'{6}'} - No offset
        </Grid.Col>
        <Grid.Col span={3} offset={3} className={createStyles({ backgroundColor: "#9254de", color: "white", padding: "1rem", borderRadius: "4px", textAlign: "center" })}>
          span={'{3}'} offset={'{3}'}
        </Grid.Col>
      </Grid>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Column offsets for precise positioning and alignment.',
      },
    },
  },
};

// Responsive grid
export const ResponsiveGrid: Story = {
  render: () => (
    <Grid 
      columns={{ xs: 1, sm: 2, md: 3, lg: 4 }}
      gutter={{ xs: "0.5rem", md: "1rem", lg: "1.5rem" }}
      className={createStyles({ 
        backgroundColor: "#f0f5ff", 
        border: "1px solid #91d5ff", 
        padding: "1rem",
        borderRadius: "8px"
      })}
    >
      {Array.from({ length: 8 }, (_, i) => (
        <Grid.Col 
          key={i} 
          span={{ xs: 1, sm: 1, md: 1, lg: 1 }}
          className={createStyles({
            backgroundColor: "#1890ff", 
            color: "white", 
            padding: "1.5rem", 
            borderRadius: "6px", 
            textAlign: "center",
            minHeight: "100px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          })}
        >
          Item {i + 1}
        </Grid.Col>
      ))}
    </Grid>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Responsive grid that changes column count at different breakpoints: 1→2→3→4 columns.',
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

// Different gutters
export const DifferentGutters: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <h4 style={{ margin: '0 0 0.5rem 0', color: '#262626' }}>No Gutter (0)</h4>
        <Grid gutter={0} className={createStyles({ backgroundColor: "#fff2e8", border: "1px solid #ffbb96", padding: "1rem", borderRadius: "6px" })}>
          <Grid.Col span={4} className={createStyles({ backgroundColor: "#fa541c", color: "white", padding: "1rem", textAlign: "center" })}>
            Column 1
          </Grid.Col>
          <Grid.Col span={4} className={createStyles({ backgroundColor: "#fa8c16", color: "white", padding: "1rem", textAlign: "center" })}>
            Column 2
          </Grid.Col>
          <Grid.Col span={4} className={createStyles({ backgroundColor: "#ffa940", color: "white", padding: "1rem", textAlign: "center" })}>
            Column 3
          </Grid.Col>
        </Grid>
      </div>

      <div>
        <h4 style={{ margin: '0 0 0.5rem 0', color: '#262626' }}>Small Gutter (0.5rem)</h4>
        <Grid gutter="0.5rem" className={createStyles({ backgroundColor: "#f6ffed", border: "1px solid #b7eb8f", padding: "1rem", borderRadius: "6px" })}>
          <Grid.Col span={4} className={createStyles({ backgroundColor: "#52c41a", color: "white", padding: "1rem", borderRadius: "4px", textAlign: "center" })}>
            Column 1
          </Grid.Col>
          <Grid.Col span={4} className={createStyles({ backgroundColor: "#73d13d", color: "white", padding: "1rem", borderRadius: "4px", textAlign: "center" })}>
            Column 2
          </Grid.Col>
          <Grid.Col span={4} className={createStyles({ backgroundColor: "#95de64", color: "white", padding: "1rem", borderRadius: "4px", textAlign: "center" })}>
            Column 3
          </Grid.Col>
        </Grid>
      </div>

      <div>
        <h4 style={{ margin: '0 0 0.5rem 0', color: '#262626' }}>Large Gutter (2rem)</h4>
        <Grid gutter="2rem" className={createStyles({ backgroundColor: "#e6f7ff", border: "1px solid #91d5ff", padding: "1rem", borderRadius: "6px" })}>
          <Grid.Col span={4} className={createStyles({ backgroundColor: "#1890ff", color: "white", padding: "1rem", borderRadius: "4px", textAlign: "center" })}>
            Column 1
          </Grid.Col>
          <Grid.Col span={4} className={createStyles({ backgroundColor: "#40a9ff", color: "white", padding: "1rem", borderRadius: "4px", textAlign: "center" })}>
            Column 2
          </Grid.Col>
          <Grid.Col span={4} className={createStyles({ backgroundColor: "#69c0ff", color: "white", padding: "1rem", borderRadius: "4px", textAlign: "center" })}>
            Column 3
          </Grid.Col>
        </Grid>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different gutter sizes: 0, 0.5rem, and 2rem.',
      },
    },
  },
};

// Grid alignment
export const GridAlignment: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <h4 style={{ margin: '0 0 0.5rem 0', color: '#262626' }}>Justify: Center</h4>
        <Grid 
          columns={3} 
          justify="center"
          className={createStyles({
            backgroundColor: "#f0f2f5", 
            border: "1px solid #d9d9d9", 
            padding: "1rem", 
            borderRadius: "6px",
            minHeight: "120px"
          })}
        >
          <Grid.Col span={1} className={createStyles({ backgroundColor: "#1890ff", color: "white", padding: "1rem", borderRadius: "4px", textAlign: "center" })}>
            1
          </Grid.Col>
          <Grid.Col span={1} className={createStyles({ backgroundColor: "#40a9ff", color: "white", padding: "1rem", borderRadius: "4px", textAlign: "center" })}>
            2
          </Grid.Col>
        </Grid>
      </div>

      <div>
        <h4 style={{ margin: '0 0 0.5rem 0', color: '#262626' }}>Align: Center</h4>
        <Grid 
          align="center"
          className={createStyles({
            backgroundColor: "#f0f2f5", 
            border: "1px solid #d9d9d9", 
            padding: "1rem", 
            borderRadius: "6px",
            minHeight: "120px"
          })}
        >
          <Grid.Col span={4} className={createStyles({ backgroundColor: "#52c41a", color: "white", padding: "0.5rem", borderRadius: "4px", textAlign: "center" })}>
            Short
          </Grid.Col>
          <Grid.Col span={4} className={createStyles({ backgroundColor: "#73d13d", color: "white", padding: "2rem", borderRadius: "4px", textAlign: "center" })}>
            Tall Content
          </Grid.Col>
          <Grid.Col span={4} className={createStyles({ backgroundColor: "#95de64", color: "white", padding: "1rem", borderRadius: "4px", textAlign: "center" })}>
            Medium
          </Grid.Col>
        </Grid>
      </div>

      <div>
        <h4 style={{ margin: '0 0 0.5rem 0', color: '#262626' }}>Justify: Space Between</h4>
        <Grid 
          columns={4}
          justify="space-between"
          className={createStyles({
            backgroundColor: "#f0f2f5", 
            border: "1px solid #d9d9d9", 
            padding: "1rem", 
            borderRadius: "6px"
          })}
        >
          <Grid.Col span={1} className={createStyles({ backgroundColor: "#fa8c16", color: "white", padding: "1rem", borderRadius: "4px", textAlign: "center" })}>
            1
          </Grid.Col>
          <Grid.Col span={1} className={createStyles({ backgroundColor: "#ffa940", color: "white", padding: "1rem", borderRadius: "4px", textAlign: "center" })}>
            2
          </Grid.Col>
        </Grid>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Grid alignment options: justify-content and align-items.',
      },
    },
  },
};

// Complex layout example
export const ComplexLayout: Story = {
  render: () => (
    <Grid 
      gutter="1rem"
      className={createStyles({
        backgroundColor: "#fafafa", 
        padding: "1rem", 
        borderRadius: "8px",
        minHeight: "400px"
      })}
    >
      {/* Header */}
      <Grid.Col 
        span={12} 
        className={createStyles({
          backgroundColor: "#001529", 
          color: "white", 
          padding: "1.5rem", 
          borderRadius: "6px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between"
        })}
      >
        <span style={{ fontWeight: 'bold', fontSize: '18px' }}>Website Header</span>
        <span>Navigation Menu</span>
      </Grid.Col>

      {/* Sidebar */}
      <Grid.Col 
        span={3} 
        className={createStyles({
          backgroundColor: "white", 
          border: "1px solid #f0f0f0", 
          padding: "1.5rem", 
          borderRadius: "6px"
        })}
      >
        <h4 style={{ margin: '0 0 1rem 0', color: '#262626' }}>Sidebar</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <div style={{ padding: '0.5rem', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>Menu Item 1</div>
          <div style={{ padding: '0.5rem', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>Menu Item 2</div>
          <div style={{ padding: '0.5rem', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>Menu Item 3</div>
        </div>
      </Grid.Col>

      {/* Main Content */}
      <Grid.Col 
        span={6} 
        className={createStyles({
          backgroundColor: "white", 
          border: "1px solid #f0f0f0", 
          padding: "1.5rem", 
          borderRadius: "6px"
        })}
      >
        <h2 style={{ margin: '0 0 1rem 0', color: '#262626' }}>Main Content</h2>
        <p style={{ margin: '0 0 1rem 0', color: '#595959', lineHeight: 1.6 }}>
          This is the main content area of the layout. It takes up 6 columns (half width) 
          and contains the primary content of the page.
        </p>
        <div style={{ 
          backgroundColor: '#f0f2f5', 
          padding: '1rem', 
          borderRadius: '4px',
          border: '1px solid #d9d9d9'
        }}>
          <h4 style={{ margin: '0 0 0.5rem 0', color: '#262626' }}>Content Block</h4>
          <p style={{ margin: 0, color: '#8c8c8c', fontSize: '14px' }}>
            Additional content or media could go here.
          </p>
        </div>
      </Grid.Col>

      {/* Aside */}
      <Grid.Col 
        span={3} 
        className={createStyles({
          backgroundColor: "white", 
          border: "1px solid #f0f0f0", 
          padding: "1.5rem", 
          borderRadius: "6px"
        })}
      >
        <h4 style={{ margin: '0 0 1rem 0', color: '#262626' }}>Aside</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ 
            padding: '1rem', 
            backgroundColor: '#e6f7ff', 
            border: '1px solid #91d5ff',
            borderRadius: '4px' 
          }}>
            <h5 style={{ margin: '0 0 0.5rem 0', color: '#0958d9' }}>Widget 1</h5>
            <p style={{ margin: 0, fontSize: '14px', color: '#1677ff' }}>Widget content</p>
          </div>
          <div style={{ 
            padding: '1rem', 
            backgroundColor: '#f6ffed', 
            border: '1px solid #b7eb8f',
            borderRadius: '4px' 
          }}>
            <h5 style={{ margin: '0 0 0.5rem 0', color: '#389e0d' }}>Widget 2</h5>
            <p style={{ margin: 0, fontSize: '14px', color: '#52c41a' }}>More content</p>
          </div>
        </div>
      </Grid.Col>

      {/* Footer */}
      <Grid.Col 
        span={12} 
        className={createStyles({
          backgroundColor: "#8c8c8c", 
          color: "white", 
          padding: "1rem", 
          borderRadius: "6px",
          textAlign: "center"
        })}
      >
        <span>© 2024 Website Footer - All rights reserved</span>
      </Grid.Col>
    </Grid>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Complex website layout using Grid: header, sidebar, main content, aside, and footer.',
      },
    },
  },
};

// Card grid example
export const CardGrid: Story = {
  render: () => (
    <Grid 
      columns={{ xs: 1, sm: 2, md: 3, lg: 4 }}
      gutter="1.5rem"
      className={createStyles({
        padding: "1rem", 
        backgroundColor: "#f5f5f5",
        borderRadius: "8px"
      })}
    >
      {[
        { title: 'Product 1', price: '$29.99', description: 'Lorem ipsum dolor sit amet', color: '#1890ff' },
        { title: 'Product 2', price: '$39.99', description: 'Consectetur adipiscing elit', color: '#52c41a' },
        { title: 'Product 3', price: '$19.99', description: 'Sed do eiusmod tempor', color: '#fa8c16' },
        { title: 'Product 4', price: '$49.99', description: 'Incididunt ut labore', color: '#eb2f96' },
        { title: 'Product 5', price: '$24.99', description: 'Et dolore magna aliqua', color: '#722ed1' },
        { title: 'Product 6', price: '$34.99', description: 'Ut enim ad minim veniam', color: '#13c2c2' },
        { title: 'Product 7', price: '$44.99', description: 'Quis nostrud exercitation', color: '#fa541c' },
        { title: 'Product 8', price: '$54.99', description: 'Ullamco laboris nisi', color: '#2f54eb' }
      ].map((product, index) => (
        <Grid.Col key={index} span={1}>
          <div style={{
            backgroundColor: 'white',
            border: '1px solid #f0f0f0',
            borderRadius: '8px',
            padding: '1.5rem',
            height: '100%',
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            display: 'flex',
            flexDirection: 'column'
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
            <p style={{ margin: '0 0 1rem 0', color: '#8c8c8c', fontSize: '14px', flex: 1 }}>
              {product.description}
            </p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
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
            </div>
          </div>
        </Grid.Col>
      ))}
    </Grid>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Responsive card grid for products with automatic wrapping.',
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