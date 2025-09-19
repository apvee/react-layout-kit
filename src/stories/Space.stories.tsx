import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { SpaceProps, Space } from '..';

const meta: Meta<SpaceProps> = {
  title: 'Components/Layouts/Space',
  component: Space,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
A component that adds horizontal or vertical spacing using the theme's spacing scale.

## Features
- Horizontal spacing with w prop (width)
- Vertical spacing with h prop (height)
- Predefined spacing scale ('xs', 's', 'm', 'l', 'xl', 'xxl')
- Custom CSS values support (rem, px, %)
- Responsive values using breakpoint objects
- Container width measurement for responsive calculations
- Prevents shrinking in flex containers with flexShrink: 0
- Useful for consistent spacing without margins
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    // Space-specific props
    w: {
      control: 'text',
      description: 'Horizontal spacing (width) - can use spacing scale keys (xs, s, m, l, xl, xxl) or CSS values',
    },
    h: {
      control: 'text',
      description: 'Vertical spacing (height) - can use spacing scale keys (xs, s, m, l, xl, xxl) or CSS values',
    },

    // Core props
    containerWidth: {
      control: 'number',
      description: 'Fixed container width for responsive calculations',
    },
  },
};

export default meta;
type Story = StoryObj<SpaceProps>;

// Basic horizontal spacing
export const HorizontalSpacing: Story = {
  render: () => (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center',
      backgroundColor: '#f5f5f5',
      padding: '1rem',
      borderRadius: '8px',
      border: '2px dashed #ccc'
    }}>
      <div style={{ 
        padding: '1rem', 
        backgroundColor: '#1890ff', 
        color: 'white', 
        borderRadius: '4px',
        fontWeight: '500'
      }}>
        Left Content
      </div>
      <Space w="l" />
      <div style={{ 
        padding: '1rem', 
        backgroundColor: '#52c41a', 
        color: 'white', 
        borderRadius: '4px',
        fontWeight: '500'
      }}>
        Right Content
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Basic horizontal spacing using Space component with w="l" to separate elements in a flex layout.',
      },
    },
  },
};

// Basic vertical spacing
export const VerticalSpacing: Story = {
  render: () => (
    <div style={{ 
      backgroundColor: '#f5f5f5',
      padding: '1rem',
      borderRadius: '8px',
      border: '2px dashed #ccc'
    }}>
      <div style={{ 
        padding: '1rem', 
        backgroundColor: '#1890ff', 
        color: 'white', 
        borderRadius: '4px',
        textAlign: 'center',
        fontWeight: '500'
      }}>
        Top Content
      </div>
      <Space h="l" />
      <div style={{ 
        padding: '1rem', 
        backgroundColor: '#52c41a', 
        color: 'white', 
        borderRadius: '4px',
        textAlign: 'center',
        fontWeight: '500'
      }}>
        Bottom Content
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Basic vertical spacing using Space component with h="l" to separate elements vertically.',
      },
    },
  },
};

// Different spacing sizes
export const SpacingSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h4 style={{ margin: '0 0 1rem 0', color: '#262626' }}>Horizontal Spacing Sizes</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {['xs', 's', 'm', 'l', 'xl', 'xxl'].map((size) => (
            <div key={size} style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#f8f9fa',
              padding: '0.5rem',
              borderRadius: '4px'
            }}>
              <span style={{ 
                minWidth: '60px',
                fontSize: '14px',
                color: '#595959',
                fontFamily: 'monospace'
              }}>
                {size}:
              </span>
              <div style={{ 
                width: '40px', 
                height: '30px', 
                backgroundColor: '#1890ff', 
                borderRadius: '2px' 
              }} />
              <Space w={size as any} />
              <div style={{ 
                width: '40px', 
                height: '30px', 
                backgroundColor: '#52c41a', 
                borderRadius: '2px' 
              }} />
            </div>
          ))}
        </div>
      </div>

      <div>
        <h4 style={{ margin: '0 0 1rem 0', color: '#262626' }}>Vertical Spacing Sizes</h4>
        <div style={{ display: 'flex', gap: '2rem' }}>
          {['xs', 's', 'm', 'l', 'xl'].map((size) => (
            <div key={size} style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              backgroundColor: '#f8f9fa',
              padding: '0.5rem',
              borderRadius: '4px'
            }}>
              <span style={{ 
                fontSize: '14px',
                color: '#595959',
                fontFamily: 'monospace',
                marginBottom: '0.5rem'
              }}>
                {size}
              </span>
              <div style={{ 
                width: '30px', 
                height: '20px', 
                backgroundColor: '#1890ff', 
                borderRadius: '2px' 
              }} />
              <Space h={size as any} />
              <div style={{ 
                width: '30px', 
                height: '20px', 
                backgroundColor: '#52c41a', 
                borderRadius: '2px' 
              }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different spacing sizes from the predefined scale: xs, s, m, l, xl, xxl.',
      },
    },
  },
};

// Combined horizontal and vertical spacing
export const CombinedSpacing: Story = {
  render: () => (
    <div style={{
      backgroundColor: '#f5f5f5',
      padding: '1rem',
      borderRadius: '8px',
      border: '2px dashed #ccc',
      display: 'inline-block'
    }}>
      <div style={{ 
        width: '80px',
        height: '60px',
        backgroundColor: '#1890ff', 
        borderRadius: '4px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontWeight: '500',
        fontSize: '14px'
      }}>
        Origin
      </div>
      <Space w="xl" h="l" />
      <div style={{ 
        width: '80px',
        height: '60px',
        backgroundColor: '#52c41a', 
        borderRadius: '4px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontWeight: '500',
        fontSize: '14px'
      }}>
        Target
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Combined horizontal and vertical spacing using both w and h props.',
      },
    },
  },
};

// Button toolbar with spacing
export const ButtonToolbar: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h4 style={{ margin: '0 0 1rem 0', color: '#262626' }}>Primary Actions (Large Spacing)</h4>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center',
          backgroundColor: 'white',
          padding: '1rem',
          borderRadius: '8px',
          border: '1px solid #f0f0f0'
        }}>
          <button style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: '#1890ff',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: '500'
          }}>
            Save
          </button>
          <Space w="l" />
          <button style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: 'transparent',
            color: '#595959',
            border: '1px solid #d9d9d9',
            borderRadius: '6px',
            cursor: 'pointer'
          }}>
            Cancel
          </button>
          <Space w="l" />
          <button style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: '#52c41a',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: '500'
          }}>
            Publish
          </button>
        </div>
      </div>

      <div>
        <h4 style={{ margin: '0 0 1rem 0', color: '#262626' }}>Secondary Actions (Small Spacing)</h4>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center',
          backgroundColor: 'white',
          padding: '1rem',
          borderRadius: '8px',
          border: '1px solid #f0f0f0'
        }}>
          <button style={{
            padding: '0.5rem 1rem',
            backgroundColor: 'transparent',
            color: '#595959',
            border: '1px solid #d9d9d9',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px'
          }}>
            Edit
          </button>
          <Space w="s" />
          <button style={{
            padding: '0.5rem 1rem',
            backgroundColor: 'transparent',
            color: '#595959',
            border: '1px solid #d9d9d9',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px'
          }}>
            Copy
          </button>
          <Space w="s" />
          <button style={{
            padding: '0.5rem 1rem',
            backgroundColor: 'transparent',
            color: '#ff4d4f',
            border: '1px solid #ff4d4f',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px'
          }}>
            Delete
          </button>
        </div>
      </div>

      <div>
        <h4 style={{ margin: '0 0 1rem 0', color: '#262626' }}>Icon Toolbar (Extra Small Spacing)</h4>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center',
          backgroundColor: 'white',
          padding: '1rem',
          borderRadius: '8px',
          border: '1px solid #f0f0f0'
        }}>
          {['B', 'I', 'U', 'S'].map((icon, index) => (
            <React.Fragment key={index}>
              <button style={{
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
              {index < 3 && <Space w="xs" />}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Real-world example: button toolbars with different spacing sizes for different use cases.',
      },
    },
  },
};

// Content sections with vertical spacing
export const ContentSections: Story = {
  render: () => (
    <div style={{
      backgroundColor: 'white',
      padding: '2rem',
      borderRadius: '8px',
      border: '1px solid #f0f0f0',
      maxWidth: '600px'
    }}>
      <h1 style={{ 
        margin: '0', 
        color: '#262626', 
        fontSize: '28px',
        fontWeight: '700'
      }}>
        Article Title
      </h1>
      
      <Space h="m" />
      
      <div style={{ 
        color: '#8c8c8c', 
        fontSize: '14px',
        display: 'flex',
        gap: '1rem'
      }}>
        <span>By John Doe</span>
        <span>•</span>
        <span>March 15, 2024</span>
        <span>•</span>
        <span>5 min read</span>
      </div>
      
      <Space h="l" />
      
      <p style={{ 
        margin: '0', 
        color: '#595959', 
        lineHeight: 1.6,
        fontSize: '18px',
        fontStyle: 'italic'
      }}>
        This is the article introduction or excerpt that provides a brief overview 
        of what the reader can expect from the content below.
      </p>
      
      <Space h="xl" />
      
      <h2 style={{ 
        margin: '0', 
        color: '#262626', 
        fontSize: '22px',
        fontWeight: '600'
      }}>
        First Section
      </h2>
      
      <Space h="m" />
      
      <p style={{ 
        margin: '0', 
        color: '#595959', 
        lineHeight: 1.7
      }}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod 
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
        quis nostrud exercitation ullamco laboris.
      </p>
      
      <Space h="l" />
      
      <p style={{ 
        margin: '0', 
        color: '#595959', 
        lineHeight: 1.7
      }}>
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum 
        dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non 
        proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </p>
      
      <Space h="xl" />
      
      <h2 style={{ 
        margin: '0', 
        color: '#262626', 
        fontSize: '22px',
        fontWeight: '600'
      }}>
        Second Section
      </h2>
      
      <Space h="m" />
      
      <p style={{ 
        margin: '0', 
        color: '#595959', 
        lineHeight: 1.7
      }}>
        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium 
        doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore 
        veritatis et quasi architecto beatae vitae dicta sunt explicabo.
      </p>
      
      <Space h="xxl" />
      
      <div style={{
        backgroundColor: '#f8f9fa',
        padding: '1.5rem',
        borderRadius: '8px',
        borderLeft: '4px solid #1890ff'
      }}>
        <h3 style={{ 
          margin: '0 0 0.5rem 0', 
          color: '#262626', 
          fontSize: '16px',
          fontWeight: '600'
        }}>
          💡 Pro Tip
        </h3>
        <p style={{ 
          margin: '0', 
          color: '#595959', 
          lineHeight: 1.6
        }}>
          This is a highlighted callout section that stands out from the main content 
          with proper spacing above and below.
        </p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Real-world example: article layout with consistent vertical spacing between sections.',
      },
    },
  },
};

// Responsive spacing
export const ResponsiveSpacing: Story = {
  render: () => (
    <div style={{
      backgroundColor: '#f5f5f5',
      padding: '1rem',
      borderRadius: '8px',
      border: '2px dashed #ccc'
    }}>
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        <div style={{ 
          padding: '1rem 2rem', 
          backgroundColor: '#1890ff', 
          color: 'white', 
          borderRadius: '6px',
          fontWeight: '500',
          textAlign: 'center'
        }}>
          Responsive Content Block
        </div>
        
        <Space h={{ xs: "s", md: "m", lg: "l" }} />
        
        <div style={{ 
          padding: '1rem 2rem', 
          backgroundColor: '#52c41a', 
          color: 'white', 
          borderRadius: '6px',
          fontWeight: '500',
          textAlign: 'center'
        }}>
          Spacing changes at breakpoints
        </div>
      </div>

      <Space h="xl" />

      <div style={{ 
        display: 'flex', 
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ 
          padding: '1rem', 
          backgroundColor: '#fa8c16', 
          color: 'white', 
          borderRadius: '6px',
          fontWeight: '500'
        }}>
          Left
        </div>
        
        <Space w={{ xs: "s", md: "l", lg: "xl" }} />
        
        <div style={{ 
          padding: '1rem', 
          backgroundColor: '#722ed1', 
          color: 'white', 
          borderRadius: '6px',
          fontWeight: '500'
        }}>
          Right
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Responsive spacing that changes size at different breakpoints using breakpoint objects.',
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

// Custom spacing values
export const CustomSpacing: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h4 style={{ margin: '0 0 1rem 0', color: '#262626' }}>Custom CSS Values</h4>
        <div style={{
          backgroundColor: '#f8f9fa',
          padding: '1rem',
          borderRadius: '6px'
        }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center'
          }}>
            <div style={{ 
              padding: '1rem', 
              backgroundColor: '#1890ff', 
              color: 'white', 
              borderRadius: '4px',
              fontSize: '14px'
            }}>
              3rem spacing
            </div>
            <Space w={"3rem" as any} />
            <div style={{ 
              padding: '1rem', 
              backgroundColor: '#52c41a', 
              color: 'white', 
              borderRadius: '4px',
              fontSize: '14px'
            }}>
              Next item
            </div>
          </div>
          
          <Space h={"2rem" as any} />
          
          <div style={{ 
            display: 'flex', 
            alignItems: 'center'
          }}>
            <div style={{ 
              padding: '1rem', 
              backgroundColor: '#fa8c16', 
              color: 'white', 
              borderRadius: '4px',
              fontSize: '14px'
            }}>
              40px spacing
            </div>
            <Space w={"40px" as any} />
            <div style={{ 
              padding: '1rem', 
              backgroundColor: '#722ed1', 
              color: 'white', 
              borderRadius: '4px',
              fontSize: '14px'
            }}>
              Next item
            </div>
          </div>
        </div>
      </div>

      <div>
        <h4 style={{ margin: '0 0 1rem 0', color: '#262626' }}>Percentage Values</h4>
        <div style={{
          backgroundColor: '#f8f9fa',
          padding: '1rem',
          borderRadius: '6px',
          width: '400px'
        }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center'
          }}>
            <div style={{ 
              padding: '1rem', 
              backgroundColor: '#eb2f96', 
              color: 'white', 
              borderRadius: '4px',
              fontSize: '14px'
            }}>
              Start
            </div>
            <Space w={"20%" as any} />
            <div style={{ 
              padding: '1rem', 
              backgroundColor: '#13c2c2', 
              color: 'white', 
              borderRadius: '4px',
              fontSize: '14px'
            }}>
              20% spacing
            </div>
          </div>
        </div>
      </div>

      <div>
        <h4 style={{ margin: '0 0 1rem 0', color: '#262626' }}>Zero Spacing</h4>
        <div style={{
          backgroundColor: '#f8f9fa',
          padding: '1rem',
          borderRadius: '6px'
        }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center'
          }}>
            <div style={{ 
              padding: '1rem', 
              backgroundColor: '#ff4d4f', 
              color: 'white',
              fontSize: '14px'
            }}>
              Connected
            </div>
            <Space w={0} />
            <div style={{ 
              padding: '1rem', 
              backgroundColor: '#ff7875', 
              color: 'white',
              fontSize: '14px'
            }}>
              Items
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Custom spacing values using different CSS units: rem, px, %, and 0.',
      },
    },
  },
};

// Navigation breadcrumbs
export const NavigationBreadcrumbs: Story = {
  render: () => (
    <div style={{
      backgroundColor: 'white',
      padding: '1rem 1.5rem',
      borderRadius: '8px',
      border: '1px solid #f0f0f0'
    }}>
      <div style={{ 
        display: 'flex', 
        alignItems: 'center',
        fontSize: '14px'
      }}>
        <a href="#" style={{ 
          color: '#1890ff', 
          textDecoration: 'none',
          padding: '0.25rem 0.5rem',
          borderRadius: '4px',
          transition: 'background-color 0.2s'
        }}>
          Home
        </a>
        <Space w="xs" />
        <span style={{ color: '#bfbfbf' }}>›</span>
        <Space w="xs" />
        <a href="#" style={{ 
          color: '#1890ff', 
          textDecoration: 'none',
          padding: '0.25rem 0.5rem',
          borderRadius: '4px'
        }}>
          Products
        </a>
        <Space w="xs" />
        <span style={{ color: '#bfbfbf' }}>›</span>
        <Space w="xs" />
        <a href="#" style={{ 
          color: '#1890ff', 
          textDecoration: 'none',
          padding: '0.25rem 0.5rem',
          borderRadius: '4px'
        }}>
          Electronics
        </a>
        <Space w="xs" />
        <span style={{ color: '#bfbfbf' }}>›</span>
        <Space w="xs" />
        <span style={{ 
          color: '#262626',
          fontWeight: '500',
          padding: '0.25rem 0.5rem'
        }}>
          Smartphones
        </span>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Real-world example: navigation breadcrumbs with consistent spacing between items.',
      },
    },
  },
};

// Card layout with spacing
export const CardLayout: Story = {
  render: () => (
    <div style={{
      backgroundColor: '#fafafa',
      padding: '2rem',
      borderRadius: '8px'
    }}>
      <h3 style={{ 
        margin: '0', 
        color: '#262626',
        textAlign: 'center',
        marginBottom: '2rem'
      }}>
        Product Showcase
      </h3>
      
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        {[
          { name: 'Product A', price: '$99', color: '#1890ff' },
          { name: 'Product B', price: '$149', color: '#52c41a' },
          { name: 'Product C', price: '$199', color: '#fa8c16' },
        ].map((product, i) => (
          <div key={i} style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            padding: '1.5rem',
            width: '200px',
            textAlign: 'center',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
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
              fontWeight: '600'
            }}>
              Image
            </div>
            
            <h4 style={{ 
              margin: '0', 
              color: '#262626',
              fontSize: '16px',
              fontWeight: '600'
            }}>
              {product.name}
            </h4>
            
            <Space h="s" />
            
            <p style={{ 
              margin: '0', 
              color: '#8c8c8c',
              fontSize: '14px',
              lineHeight: 1.5
            }}>
              Lorem ipsum dolor sit amet consectetur.
            </p>
            
            <Space h="m" />
            
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <span style={{ 
                fontSize: '20px', 
                fontWeight: 'bold', 
                color: product.color 
              }}>
                {product.price}
              </span>
              <Space w="s" />
              <button style={{
                padding: '0.5rem 1rem',
                backgroundColor: product.color,
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '14px'
              }}>
                Buy
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Real-world example: product card layout with strategic spacing for visual hierarchy.',
      },
    },
  },
};