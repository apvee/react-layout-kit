import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { AreaGrid } from '../components/AreaGrid';

const meta: Meta<typeof AreaGrid> = {
  title: 'Components/Layouts/AreaGrid',
  component: AreaGrid,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
# AreaGrid

A powerful CSS Grid layout component that uses named grid areas for creating semantic, maintainable layouts. 
Perfect for building complex page layouts with well-defined regions like headers, sidebars, main content areas, and footers.

## Key Features

- **Named Grid Areas**: Define layouts using meaningful area names via grid-template-areas
- **Semantic Layouts**: Create self-documenting code with area names that describe content purpose
- **Responsive Design**: All properties support responsive values using breakpoint objects
- **Full Grid Control**: Complete control over rows, columns, gaps, and alignment properties
- **Conditional Rendering**: AreaGrid.Item automatically hides when its area doesn't exist in current layout
- **Type Safety**: Full TypeScript support with comprehensive prop types

## Components

### AreaGrid (Container)
The main container component that defines the grid structure and named areas.

**Main Props:**
- areas: Defines named grid areas using CSS grid-template-areas syntax
- rows: Controls row sizing with grid-template-rows
- columns: Controls column sizing with grid-template-columns  
- gap: Space between grid items (supports spacing scale)
- justifyItems: Default horizontal alignment for all items
- alignItems: Default vertical alignment for all items

### AreaGrid.Item
Child component that positions itself in a named grid area.

**Main Props:**
- area: Name of the grid area (must match parent's areas definition)
- justifySelf: Override horizontal alignment for this item
- alignSelf: Override vertical alignment for this item
        `,
      },
      source: {
        state: 'open',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    areas: {
      control: 'text',
      description: 'Grid template areas - defines named regions using CSS grid-template-areas syntax.',
      table: {
        type: { summary: 'string | ResponsiveValue<string>' },
        defaultValue: { summary: 'undefined' },
      },
    },
    rows: {
      control: 'text',
      description: 'Grid template rows - defines the height of each row.',
      table: {
        type: { summary: 'string | ResponsiveValue<string>' },
        defaultValue: { summary: 'undefined' },
      },
    },
    columns: {
      control: 'text',
      description: 'Grid template columns - defines the width of each column.',
      table: {
        type: { summary: 'string | ResponsiveValue<string>' },
        defaultValue: { summary: 'undefined' },
      },
    },
    gap: {
      control: 'text',
      description: 'Space between grid items. Accepts spacing scale values or CSS values.',
      table: {
        type: { summary: 'SpacingValue | ResponsiveValue<SpacingValue>' },
        defaultValue: { summary: '0' },
      },
    },
    justifyItems: {
      control: 'select',
      options: ['stretch', 'start', 'end', 'center', 'baseline'],
      description: 'Horizontal alignment of all items within their grid areas.',
      table: {
        type: { summary: 'CSS.Property.JustifyItems' },
        defaultValue: { summary: 'stretch' },
      },
    },
    alignItems: {
      control: 'select',
      options: ['stretch', 'start', 'end', 'center', 'baseline'],
      description: 'Vertical alignment of all items within their grid areas.',
      table: {
        type: { summary: 'CSS.Property.AlignItems' },
        defaultValue: { summary: 'stretch' },
      },
    },
    justifyContent: {
      control: 'select',
      options: ['stretch', 'start', 'end', 'center', 'space-between', 'space-around', 'space-evenly'],
      description: 'Horizontal distribution of the entire grid within its container.',
      table: {
        type: { summary: 'CSS.Property.JustifyContent' },
        defaultValue: { summary: 'stretch' },
      },
    },
    alignContent: {
      control: 'select',
      options: ['stretch', 'start', 'end', 'center', 'space-between', 'space-around', 'space-evenly'],
      description: 'Vertical distribution of the entire grid within its container.',
      table: {
        type: { summary: 'CSS.Property.AlignContent' },
        defaultValue: { summary: 'stretch' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof AreaGrid>;

/**
 * Interactive Usage Example
 * 
 * Complete page layout with header, sidebar, main content, and footer using named grid areas.
 * Adjust the controls below to see how different properties affect the layout.
 */
export const Usage: Story = {
  args: {
    areas: '"header header header" "sidebar main main" "footer footer footer"',
    rows: 'auto 1fr auto',
    columns: '200px 1fr 1fr',
    gap: 'md',
    justifyItems: 'stretch',
    alignItems: 'stretch',
    justifyContent: 'stretch',
    alignContent: 'stretch',
    style: {
      minHeight: '500px',
      backgroundColor: '#f5f5f5',
      border: '1px solid #ddd',
      borderRadius: '8px',
    },
  },
  render: (args: typeof Usage.args) => (
    <AreaGrid {...args}>
      <AreaGrid.Item 
        area="header"
        style={{
          backgroundColor: '#1976d2',
          color: 'white',
          padding: '1.5rem',
          textAlign: 'center',
          fontSize: '1.5rem',
          fontWeight: 'bold',
          borderRadius: '6px',
        }}
      >
        Header Area
      </AreaGrid.Item>
      
      <AreaGrid.Item 
        area="sidebar"
        style={{
          backgroundColor: '#4caf50',
          color: 'white',
          padding: '1.5rem',
          borderRadius: '6px',
        }}
      >
        <div style={{ fontWeight: 'bold', marginBottom: '1rem' }}>Sidebar</div>
        <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>
          <div style={{ marginBottom: '0.5rem' }}>• Navigation Item 1</div>
          <div style={{ marginBottom: '0.5rem' }}>• Navigation Item 2</div>
          <div style={{ marginBottom: '0.5rem' }}>• Navigation Item 3</div>
          <div>• Navigation Item 4</div>
        </div>
      </AreaGrid.Item>
      
      <AreaGrid.Item 
        area="main"
        style={{
          backgroundColor: '#ffffff',
          border: '1px solid #e0e0e0',
          padding: '2rem',
          borderRadius: '6px',
        }}
      >
        <h2 style={{ margin: '0 0 1rem 0', color: '#333' }}>Main Content Area</h2>
        <p style={{ margin: '0 0 1rem 0', color: '#666', lineHeight: 1.6 }}>
          This is the main content area of the page. It occupies the larger portion of the layout
          and contains the primary information or functionality.
        </p>
        <p style={{ margin: 0, color: '#666', lineHeight: 1.6 }}>
          The AreaGrid component automatically handles the grid layout structure using named areas,
          making it easy to create semantic, maintainable page layouts with CSS Grid.
        </p>
        <div style={{
          marginTop: '1.5rem',
          padding: '1rem',
          backgroundColor: '#e3f2fd',
          borderLeft: '4px solid #2196f3',
          borderRadius: '4px',
        }}>
          <strong style={{ color: '#1976d2' }}>💡 Tip:</strong>
          <span style={{ marginLeft: '0.5rem', color: '#555' }}>
            Use the controls panel to experiment with different grid configurations!
          </span>
        </div>
      </AreaGrid.Item>
      
      <AreaGrid.Item 
        area="footer"
        style={{
          backgroundColor: '#424242',
          color: 'white',
          padding: '1.5rem',
          textAlign: 'center',
          borderRadius: '6px',
          fontSize: '0.9rem',
        }}
      >
        Footer Area - © 2024 AreaGrid Layout Example
      </AreaGrid.Item>
    </AreaGrid>
  ),
  parameters: {
    docs: {
      description: {
        story: `
### Interactive Page Layout

This example demonstrates a typical page layout structure using AreaGrid with four main areas:

1. **Header**: Spans the full width at the top
2. **Sidebar**: Fixed 200px width for navigation  
3. **Main**: Flexible content area that takes remaining space
4. **Footer**: Spans the full width at the bottom

**Key Features:**
- Named grid areas for semantic structure
- Mix of fixed (200px) and flexible (1fr) column sizing
- Auto-sizing header and footer with flexible content area
- Spacing control via the gap property
- Item alignment within their grid areas

Use the controls panel to modify grid properties and see real-time changes.
        `,
      },
    },
  },
};
