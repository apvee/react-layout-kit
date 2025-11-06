import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { CenterProps, Center, createStyles } from '..';

const meta: Meta<CenterProps> = {
  title: 'Components/Layouts/Center',
  component: Center,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
A flexbox component that centers content both vertically and horizontally.

## Features
- Perfect centering using CSS flexbox (align-items: center, justify-content: center)
- Block-level centering with display: flex (default)
- Inline centering with display: inline-flex when inline prop is true
- Responsive inline behavior with breakpoint objects
- Container width measurement for responsive calculations
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    // Center-specific props
    inline: {
      control: 'boolean',
      description: 'Use inline-flex instead of flex for inline centering behavior',
    },

    // Core props
    containerWidth: {
      control: 'number',
      description: 'Fixed container width for responsive calculations',
    },
  },
};

export default meta;
type Story = StoryObj<CenterProps>;

// Basic centering example
export const BasicCentering: Story = {
  render: () => (
    <Center
      className={createStyles({
        minHeight: "200px",
        backgroundColor: "#f5f5f5",
        border: "2px dashed #ccc"
      })}
    >
      <div style={{ 
        padding: '1rem', 
        backgroundColor: '#2196f3', 
        color: 'white', 
        borderRadius: '8px',
        textAlign: 'center'
      }}>
        Perfectly Centered Content
      </div>
    </Center>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Basic usage showing content centered both horizontally and vertically.',
      },
    },
  },
};

// Button centering
export const CenteredButton: Story = {
  render: () => (
    <Center 
      className={createStyles({
        minHeight: "150px",
        backgroundColor: "#f0f2f5",
        border: "1px solid #d9d9d9",
        borderRadius: "8px"
      })}
    >
      <button style={{
        padding: '12px 24px',
        backgroundColor: '#52c41a',
        color: 'white',
        border: 'none',
        borderRadius: '6px',
        fontSize: '16px',
        fontWeight: '500',
        cursor: 'pointer',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        Centered Action Button
      </button>
    </Center>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Centering interactive elements like buttons.',
      },
    },
  },
};

// Text centering
export const CenteredText: Story = {
  render: () => (
    <Center 
      className={createStyles({
        minHeight: "120px",
        backgroundColor: "#fff7e6",
        border: "1px solid #ffd591",
        borderRadius: "6px"
      })}
    >
      <div style={{ textAlign: 'center' }}>
        <h3 style={{ margin: '0 0 0.5rem 0', color: '#d46b08' }}>
          Centered Heading
        </h3>
        <p style={{ margin: 0, color: '#ad6800' }}>
          This text content is perfectly centered
        </p>
      </div>
    </Center>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Centering text content and headings.',
      },
    },
  },
};

// Inline centering
export const InlineCentering: Story = {
  render: () => (
    <div style={{ textAlign: 'left', padding: '1rem', backgroundColor: '#f9f9f9' }}>
      <p style={{ margin: '0 0 1rem 0' }}>
        Some text before the centered element. 
        <Center 
          inline 
          className={createStyles({
            width: "120px",
            height: "40px",
            backgroundColor: "#722ed1",
            color: "white",
            borderRadius: "20px",
            margin: "0 0.5rem"
          })}
        >
          Inline Center
        </Center>
        And some text after the centered element.
      </p>
      <p style={{ margin: 0 }}>
        Another line with 
        <Center 
          inline 
          className={createStyles({
            width: "80px",
            height: "30px",
            backgroundColor: "#eb2f96",
            color: "white",
            borderRadius: "15px",
            margin: "0 0.5rem"
          })}
        >
          Badge
        </Center>
        inline centered content.
      </p>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Using inline prop to create inline-flex centering that flows with text.',
      },
    },
  },
};

// Responsive inline behavior
export const ResponsiveInline: Story = {
  render: () => (
    <div style={{ padding: '1rem' }}>
      <p style={{ marginBottom: '1rem', color: '#666' }}>
        This Center component changes between inline and block behavior at different screen sizes.
      </p>
      <Center
        inline={{ xs: true, md: false }}
        className={createStyles({
          width: { xs: "auto", md: "300px" },
          height: "100px",
          backgroundColor: { xs: "#ff7875", md: "#40a9ff" },
          color: "white",
          borderRadius: "8px",
          margin: { xs: "0 0.5rem", md: "0 auto" }
        })}
      >
        <span style={{ padding: '0.5rem' }}>
          Responsive Center
        </span>
      </Center>
      <p style={{ marginTop: '1rem', color: '#666', fontSize: '14px' }}>
        • Mobile (xs): Inline centering with auto width
        <br />
        • Desktop (md+): Block centering with fixed width
      </p>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Responsive inline behavior that changes at different breakpoints.',
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

// Card centering
export const CenteredCard: Story = {
  render: () => (
    <Center 
      className={createStyles({
        minHeight: "300px",
        backgroundColor: "#f0f2f5",
        padding: "2rem"
      })}
    >
      <div style={{
        backgroundColor: 'white',
        padding: '2rem',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        maxWidth: '400px',
        textAlign: 'center'
      }}>
        <div style={{
          width: '60px',
          height: '60px',
          backgroundColor: '#1890ff',
          borderRadius: '50%',
          margin: '0 auto 1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '24px'
        }}>
          ✓
        </div>
        <h3 style={{ margin: '0 0 1rem 0', color: '#262626' }}>
          Success Message
        </h3>
        <p style={{ margin: '0 0 1.5rem 0', color: '#8c8c8c', lineHeight: 1.5 }}>
          Your action has been completed successfully. 
          This card is perfectly centered in its container.
        </p>
        <button style={{
          padding: '8px 16px',
          backgroundColor: '#1890ff',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer'
        }}>
          Continue
        </button>
      </div>
    </Center>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Centering a complete card component with complex content.',
      },
    },
  },
};

// Loading state centering
export const LoadingCenter: Story = {
  render: () => (
    <Center 
      className={createStyles({
        minHeight: "200px",
        backgroundColor: "#fafafa",
        border: "1px solid #f0f0f0",
        borderRadius: "8px"
      })}
    >
      <div style={{ textAlign: 'center' }}>
        <div style={{
          width: '40px',
          height: '40px',
          border: '4px solid #f3f3f3',
          borderTop: '4px solid #1890ff',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
          margin: '0 auto 1rem'
        }} />
        <div style={{ color: '#8c8c8c', fontSize: '14px' }}>
          Loading...
        </div>
      </div>
    </Center>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Perfect for centering loading indicators and empty states.',
      },
    },
  },
  decorators: [
    (Story: any) => (
      <div>
        <style>
          {`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}
        </style>
        <Story />
      </div>
    ),
  ],
};

// Multiple centered items
export const MultipleCenteredItems: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      <Center 
        className={createStyles({
          width: "150px",
          height: "150px",
          backgroundColor: "#ff4d4f",
          borderRadius: "12px"
        })}
      >
        <span style={{ color: 'white', fontWeight: 'bold' }}>Item 1</span>
      </Center>
      
      <Center 
        className={createStyles({
          width: "150px",
          height: "150px",
          backgroundColor: "#52c41a",
          borderRadius: "12px"
        })}
      >
        <span style={{ color: 'white', fontWeight: 'bold' }}>Item 2</span>
      </Center>
      
      <Center 
        className={createStyles({
          width: "150px",
          height: "150px",
          backgroundColor: "#1890ff",
          borderRadius: "12px"
        })}
      >
        <span style={{ color: 'white', fontWeight: 'bold' }}>Item 3</span>
      </Center>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Multiple Center components used together for consistent centering.',
      },
    },
  },
};

// Icon centering
export const CenteredIcon: Story = {
  render: () => (
    <Center 
      className={createStyles({
        width: "80px",
        height: "80px",
        backgroundColor: "#722ed1",
        borderRadius: "50%",
        margin: "0 auto",
        boxShadow: "0 4px 12px rgba(114, 46, 209, 0.3)"
      })}
    >
      <span style={{ 
        color: 'white', 
        fontSize: '32px',
        display: 'block',
        lineHeight: 1
      }}>
        ⭐
      </span>
    </Center>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Perfect for centering icons in circular containers.',
      },
    },
  },
};