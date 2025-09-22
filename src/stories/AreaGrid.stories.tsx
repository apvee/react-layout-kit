import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { AreaGrid, AreaGridProps, createStyles } from '../index';

const meta: Meta<AreaGridProps> = {
  title: 'Components/Layouts/AreaGrid',
  component: AreaGrid,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
A CSS Grid layout component using named grid areas for semantic layouts.

## Features
- Named grid areas using grid-template-areas
- Responsive grid layouts with breakpoint objects
- Full control over grid sizing (rows, columns)
- Grid alignment and distribution properties
- AreaGrid.Item component for positioning items in named areas
- Container width measurement for responsive calculations
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    // Grid definition props
    areas: {
      control: 'text',
      description: 'Grid template areas - defines named grid areas using quoted strings',
    },
    rows: {
      control: 'text',
      description: 'Grid template rows - defines the size of grid rows',
    },
    columns: {
      control: 'text',
      description: 'Grid template columns - defines the size of grid columns',
    },
    gap: {
      control: 'text',
      description: 'Gap between grid items',
    },

    // Alignment props
    justifyItems: {
      control: 'select',
      options: ['stretch', 'start', 'center', 'end'],
      description: 'Horizontal alignment of items within their grid areas',
    },
    alignItems: {
      control: 'select',
      options: ['stretch', 'start', 'center', 'end'],
      description: 'Vertical alignment of items within their grid areas',
    },
    justifyContent: {
      control: 'select',
      options: ['stretch', 'start', 'center', 'end', 'space-between', 'space-around', 'space-evenly'],
      description: 'Horizontal distribution of the grid within its container',
    },
    alignContent: {
      control: 'select',
      options: ['stretch', 'start', 'center', 'end', 'space-between', 'space-around', 'space-evenly'],
      description: 'Vertical distribution of the grid within its container',
    },

    // Core props
    containerWidth: {
      control: 'number',
      description: 'Fixed container width for responsive calculations',
    },
  },
};

export default meta;
type Story = StoryObj<AreaGridProps>;

// Basic page layout
export const BasicPageLayout: Story = {
  render: () => (
    <AreaGrid
      areas='"header header header" "sidebar main main" "footer footer footer"'
      rows="auto 1fr auto"
      columns="200px 1fr 1fr"
      gap="xl"
      className={createStyles({minHeight: "400px", backgroundColor: "#f5f5f5", border: "1px solid #ddd"})}
    >
      <AreaGrid.Item 
        area="header" 
        className={createStyles({backgroundColor: "#1976d2", color: "white", padding: "1rem", textAlign: "center"})}
      >
        Header
      </AreaGrid.Item>
      <AreaGrid.Item 
        area="sidebar" 
        className={createStyles({backgroundColor: "#4caf50", color: "white", padding: "1rem"})}
      >
        Sidebar
      </AreaGrid.Item>
      <AreaGrid.Item 
        area="main" 
        className={createStyles({backgroundColor: "#ff9800", color: "white", padding: "1rem"})}
      >
        Main Content Area
      </AreaGrid.Item>
      <AreaGrid.Item 
        area="footer" 
        className={createStyles({backgroundColor: "#9c27b0", color: "white", padding: "1rem", textAlign: "center"})}
      >
        Footer
      </AreaGrid.Item>
    </AreaGrid>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Basic page layout with header, sidebar, main content, and footer using named grid areas.',
      },
    },
  },
};

// Responsive layout that changes structure
export const ResponsiveLayout: Story = {
  render: () => (
    <AreaGrid
      areas={{
        xs: '"header" "main" "sidebar" "footer"',
        md: '"header header" "sidebar main" "footer footer"',
        lg: '"header header header" "sidebar main aside" "footer footer footer"'
      }}
      rows={{
        xs: "auto auto auto auto",
        md: "auto 1fr auto",
        lg: "auto 1fr auto"
      }}
      columns={{
        xs: "1fr",
        md: "200px 1fr",
        lg: "200px 1fr 150px"
      }}
      gap={{ xs: 'xs', md: 'md', lg: 'lg' }}
      className={createStyles({minHeight: "400px", backgroundColor: "#f5f5f5", border: "1px solid #ddd"})}
    >
      <AreaGrid.Item 
        area="header" 
        className={createStyles({backgroundColor: "#1976d2", color: "white", padding: "1rem", textAlign: "center"})}
      >
        Responsive Header
      </AreaGrid.Item>
      <AreaGrid.Item 
        area="sidebar" 
        className={createStyles({backgroundColor: "#4caf50", color: "white", padding: "1rem"})}
      >
        Sidebar
      </AreaGrid.Item>
      <AreaGrid.Item 
        area="main" 
        className={createStyles({backgroundColor: "#ff9800", color: "white", padding: "1rem"})}
      >
        Main content that adapts to different screen sizes
      </AreaGrid.Item>
      <AreaGrid.Item 
        area="aside" 
        className={createStyles({backgroundColor: "#e91e63", color: "white", padding: "1rem"})}
      >
        Aside (desktop only)
      </AreaGrid.Item>
      <AreaGrid.Item 
        area="footer" 
        className={createStyles({backgroundColor: "#9c27b0", color: "white", padding: "1rem", textAlign: "center"})}
      >
        Footer
      </AreaGrid.Item>
    </AreaGrid>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Responsive layout that changes structure at different breakpoints. Resize to see changes.',
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

// Simple grid with different alignments
export const AlignmentExample: Story = {
  render: () => (
    <AreaGrid
      areas='"left center right"'
      columns="1fr 200px 1fr"
      rows="200px"
      gap={32}
      justifyItems="center"
      alignItems="center"
      className={createStyles({backgroundColor: "#f5f5f5", border: "1px solid #ddd", padding: "1rem"})}
    >
      <AreaGrid.Item 
        area="left" 
        justifySelf="start"
        className={createStyles({backgroundColor: "#2196f3", color: "white", padding: "1rem", borderRadius: "4px"})}
      >
        Start Aligned
      </AreaGrid.Item>
      <AreaGrid.Item 
        area="center"
        className={createStyles({backgroundColor: "#4caf50", color: "white", padding: "1rem", borderRadius: "4px", width: "100%"})}
      >
        Center (full width)
      </AreaGrid.Item>
      <AreaGrid.Item 
        area="right" 
        justifySelf="end"
        alignSelf="start"
        className={createStyles({backgroundColor: "#ff9800", color: "white", padding: "1rem", borderRadius: "4px"})}
      >
        End & Top
      </AreaGrid.Item>
    </AreaGrid>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Demonstrating different alignment options for grid items using justifySelf and alignSelf.',
      },
    },
  },
};

// Card-based layout
export const CardLayout: Story = {
  render: () => (
    <AreaGrid
      areas='"featured featured" "card1 card2" "card3 card4"'
      columns="1fr 1fr"
      rows="200px 150px 150px"
      gap="sm"
      className={createStyles({padding: "1rem", backgroundColor: "#f5f5f5"})}
    >
      <AreaGrid.Item 
        area="featured"
        className={createStyles({backgroundColor: "white", border: "1px solid #ddd", borderRadius: "8px", padding: "1.5rem", boxShadow: "0 2px 4px rgba(0,0,0,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem", fontWeight: "bold", color: "#333"})}
      >
        Featured Content
      </AreaGrid.Item>
      {['card1', 'card2', 'card3', 'card4'].map((area, index) => (
        <AreaGrid.Item 
          key={area}
          area={area}
          className={createStyles({backgroundColor: "white", border: "1px solid #ddd", borderRadius: "8px", padding: "1rem", boxShadow: "0 2px 4px rgba(0,0,0,0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "#666"})}
        >
          Card {index + 1}
        </AreaGrid.Item>
      ))}
    </AreaGrid>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Card-based layout with a featured area spanning multiple columns.',
      },
    },
  },
};

// Complex dashboard layout
export const DashboardLayout: Story = {
  render: () => (
    <AreaGrid
      areas={`
        "nav nav nav nav"
        "sidebar main main widgets"
        "sidebar charts charts widgets"
        "footer footer footer footer"
      `}
      columns="180px 1fr 1fr 200px"
      rows="60px 1fr 1fr 50px"
      gap="sm"
      className={createStyles({minHeight: "500px", backgroundColor: "#f0f2f5", padding: "1rem"})}
    >
      <AreaGrid.Item 
        area="nav"
        className={createStyles({backgroundColor: "#1a365d", color: "white", padding: "1rem", display: "flex", alignItems: "center", justifyContent: "space-between", borderRadius: "4px"})}
      >
        <span>Dashboard Navigation</span>
        <span>User Menu</span>
      </AreaGrid.Item>
      
      <AreaGrid.Item 
        area="sidebar"
        className={createStyles({backgroundColor: "white", border: "1px solid #e2e8f0", padding: "1rem", borderRadius: "4px"})}
      >
        <div style={{ fontWeight: 'bold', marginBottom: '1rem' }}>Menu</div>
        <div>• Analytics</div>
        <div>• Reports</div>
        <div>• Settings</div>
      </AreaGrid.Item>
      
      <AreaGrid.Item 
        area="main"
        className={createStyles({backgroundColor: "white", border: "1px solid #e2e8f0", padding: "1.5rem", borderRadius: "4px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem"})}
      >
        Main Content Area
      </AreaGrid.Item>
      
      <AreaGrid.Item 
        area="widgets"
        className={createStyles({backgroundColor: "white", border: "1px solid #e2e8f0", padding: "1rem", borderRadius: "4px"})}
      >
        <div style={{ fontWeight: 'bold', marginBottom: '1rem' }}>Widgets</div>
        <div style={{ background: '#f7fafc', padding: '0.5rem', marginBottom: '0.5rem', borderRadius: '4px' }}>
          Widget 1
        </div>
        <div style={{ background: '#f7fafc', padding: '0.5rem', borderRadius: '4px' }}>
          Widget 2
        </div>
      </AreaGrid.Item>
      
      <AreaGrid.Item 
        area="charts"
        className={createStyles({backgroundColor: "white", border: "1px solid #e2e8f0", padding: "1rem", borderRadius: "4px", display: "flex", alignItems: "center", justifyContent: "center", color: "#718096"})}
      >
        Charts & Analytics
      </AreaGrid.Item>
      
      <AreaGrid.Item 
        area="footer"
        className={createStyles({backgroundColor: "#2d3748", color: "white", padding: "1rem", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "4px", fontSize: "0.9rem"})}
      >
        © 2024 Dashboard Footer
      </AreaGrid.Item>
    </AreaGrid>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Complex dashboard layout with navigation, sidebar, main content, widgets, charts, and footer.',
      },
    },
  },
};

// Magazine-style layout
export const MagazineLayout: Story = {
  render: () => (
    <AreaGrid
      areas={`
        "hero hero hero"
        "article1 article2 ads"
        "article3 article3 ads"
      `}
      columns="1fr 1fr 200px"
      rows="250px auto auto"
      gap="sm"
      className={createStyles({padding: "1rem", backgroundColor: "#fafafa"})}
    >
      <AreaGrid.Item 
        area="hero"
        className={createStyles({backgroundColor: "#667eea", color: "white", padding: "2rem", borderRadius: "8px", display: "flex", flexDirection: "column", justifyContent: "center", textAlign: "center", backgroundImage: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"})}
      >
        <h1 style={{ margin: 0, marginBottom: '1rem', fontSize: '2rem' }}>Hero Article</h1>
        <p style={{ margin: 0, opacity: 0.9 }}>Featured content with large visual impact</p>
      </AreaGrid.Item>
      
      <AreaGrid.Item 
        area="article1"
        className={createStyles({backgroundColor: "white", border: "1px solid #e5e5e5", padding: "1.5rem", borderRadius: "8px"})}
      >
        <h3 style={{ margin: '0 0 1rem 0', color: '#333' }}>Article 1</h3>
        <p style={{ margin: 0, color: '#666', lineHeight: 1.6 }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
          Sed do eiusmod tempor incididunt ut labore.
        </p>
      </AreaGrid.Item>
      
      <AreaGrid.Item 
        area="article2"
        className={createStyles({backgroundColor: "white", border: "1px solid #e5e5e5", padding: "1.5rem", borderRadius: "8px"})}
      >
        <h3 style={{ margin: '0 0 1rem 0', color: '#333' }}>Article 2</h3>
        <p style={{ margin: 0, color: '#666', lineHeight: 1.6 }}>
          Ut enim ad minim veniam, quis nostrud exercitation 
          ullamco laboris nisi ut aliquip.
        </p>
      </AreaGrid.Item>
      
      <AreaGrid.Item 
        area="article3"
        className={createStyles({backgroundColor: "white", border: "1px solid #e5e5e5", padding: "1.5rem", borderRadius: "8px"})}
      >
        <h3 style={{ margin: '0 0 1rem 0', color: '#333' }}>Featured Article</h3>
        <p style={{ margin: 0, color: '#666', lineHeight: 1.6 }}>
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum 
          dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.
        </p>
      </AreaGrid.Item>
      
      <AreaGrid.Item 
        area="ads"
        className={createStyles({backgroundColor: "#f8f9fa", border: "1px solid #dee2e6", padding: "1rem", borderRadius: "8px", display: "flex", flexDirection: "column", gap: "1rem"})}
      >
        <div style={{ 
          background: '#28a745', 
          color: 'white', 
          padding: '1rem', 
          borderRadius: '4px', 
          textAlign: 'center' 
        }}>
          Ad Space 1
        </div>
        <div style={{ 
          background: '#17a2b8', 
          color: 'white', 
          padding: '1rem', 
          borderRadius: '4px', 
          textAlign: 'center' 
        }}>
          Ad Space 2
        </div>
      </AreaGrid.Item>
    </AreaGrid>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Magazine-style layout with hero section, articles, and advertising space.',
      },
    },
  },
};