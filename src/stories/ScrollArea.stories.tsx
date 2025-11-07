import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ScrollArea } from '../components/ScrollArea';
import type { ScrollAreaProps } from '../components/ScrollArea/ScrollArea.types';

const meta: Meta<ScrollAreaProps> = {
  title: 'Components/Layouts/ScrollArea',
  component: ScrollArea,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
A flexible scroll area component that provides custom scrollbars with native scrolling performance.

## Key Features

- **Native Performance**: Uses native browser scrolling for optimal performance and smooth experience
- **Custom Scrollbars**: Beautiful overlay scrollbars that match your design system
- **Visibility Modes**: Three types - hover (show on hover/focus), always (persistent), scroll (show while scrolling)
- **Draggable Thumbs**: Fully interactive thumb dragging with pointer capture API
- **RTL Support**: Automatic positioning for right-to-left languages
- **Responsive Sizing**: Scrollbar dimensions can adapt to different breakpoints
- **Accessibility**: Minimum 44px touch targets for mobile-friendly interactions
- **Auto-detection**: Automatically detects content overflow and shows appropriate scrollbars
- **Custom Colors**: Full control over track and thumb colors including hover/active states
- **Corner Element**: Intelligent corner element when both scrollbars are visible

## When to Use

- **Chat Interfaces**: Message lists with smooth scrolling and custom scrollbars
- **Code Editors**: Syntax highlighted code blocks with horizontal and vertical scrolling
- **Data Tables**: Large datasets with row/column scrolling
- **Sidebars**: Navigation menus with many items
- **Modal Dialogs**: Long form content in overlays
- **Documentation**: Articles and guides with extensive content
- **Product Galleries**: Image grids with overflow

## Visibility Types Explained

### \`hover\`
Scrollbars appear on:
- Mouse hover over container
- Keyboard focus on container
- Scrolling action

Scrollbars hide after \`scrollHideDelay\` ms of inactivity.
**Best for**: General content where scrollbars aren't always needed.

### \`always\`
Scrollbars are always visible when content overflows.
**Best for**: Data tables, code editors where scroll position awareness is critical.

### \`scroll\`
Scrollbars appear only during scrolling action.
Fade out after \`scrollHideDelay\` ms.
**Best for**: Minimalist interfaces where visual space is premium.

## Size Options

- **small** (4px): Subtle, minimal scrollbars for clean interfaces
- **medium** (8px): Balanced size for most use cases
- **large** (12px): Prominent scrollbars for easier interaction

## Technical Details

- **Scroll Method**: Native browser scroll (not custom scroll simulation)
- **Update Strategy**: ResizeObserver + RequestAnimationFrame for efficiency
- **Thumb Calculation**: Dynamic sizing based on content-to-viewport ratio
- **Minimum Thumb**: 44px for accessibility (WCAG touch target guidelines)
- **Drag Logic**: Pointer capture prevents selection during drag
- **Hide Timer**: Clearable timeout for smooth show/hide transitions

## Best Practices

**Do:**
- ✅ Set explicit height/width on ScrollArea for viewport definition
- ✅ Use \`type="hover"\` for general content
- ✅ Use \`type="always"\` for data-heavy interfaces
- ✅ Provide custom colors to match your brand
- ✅ Use \`dir="rtl"\` for Arabic, Hebrew, Persian languages
- ✅ Test with keyboard navigation and screen readers

**Don't:**
- ❌ Nest multiple ScrollAreas (causes confusion)
- ❌ Use without overflow content (unnecessary)
- ❌ Forget to set container dimensions
- ❌ Use extremely short scrollHideDelay (jarring UX)
- ❌ Override native scroll behavior unnecessarily
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    // Component-specific props
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Size of scrollbars (track and thumb thickness)',
      table: {
        category: 'Component',
        type: { summary: 'ResponsiveValue<ScrollAreaSize>' },
        defaultValue: { summary: 'small' },
      },
    },
    radius: {
      control: 'select',
      options: ['none', 'small', 'medium', 'large', 'full'],
      description: 'Border radius for scrollbars and thumbs',
      table: {
        category: 'Component',
        type: { summary: 'ScrollAreaRadius' },
        defaultValue: { summary: 'small' },
      },
    },
    scrollbars: {
      control: 'select',
      options: ['vertical', 'horizontal', 'both'],
      description: 'Which scrollbars to show when content overflows',
      table: {
        category: 'Component',
        type: { summary: 'ScrollAreaScrollbars' },
        defaultValue: { summary: 'both' },
      },
    },
    type: {
      control: 'select',
      options: ['hover', 'always', 'scroll'],
      description: 'Scrollbar visibility behavior (hover, always, scroll)',
      table: {
        category: 'Component',
        type: { summary: 'ScrollAreaType' },
        defaultValue: { summary: 'hover' },
      },
    },
    scrollHideDelay: {
      control: 'number',
      description: 'Delay in milliseconds before hiding scrollbars (for hover/scroll types)',
      table: {
        category: 'Component',
        type: { summary: 'number' },
        defaultValue: { summary: '600' },
      },
    },
    dir: {
      control: 'select',
      options: ['ltr', 'rtl'],
      description: 'Text direction for RTL language support',
      table: {
        category: 'Component',
        type: { summary: 'ScrollAreaDirection' },
        defaultValue: { summary: 'ltr' },
      },
    },
    trackColor: {
      control: 'color',
      description: 'Custom track background color',
      table: {
        category: 'Styling',
        type: { summary: 'string' },
        defaultValue: { summary: 'rgba(0, 0, 0, 0.05)' },
      },
    },
    thumbColor: {
      control: 'color',
      description: 'Custom thumb color',
      table: {
        category: 'Styling',
        type: { summary: 'string' },
        defaultValue: { summary: 'rgba(0, 0, 0, 0.3)' },
      },
    },
    thumbHoverColor: {
      control: 'color',
      description: 'Custom thumb hover color',
      table: {
        category: 'Styling',
        type: { summary: 'string' },
        defaultValue: { summary: 'rgba(0, 0, 0, 0.5)' },
      },
    },
    thumbActiveColor: {
      control: 'color',
      description: 'Custom thumb active/pressed color',
      table: {
        category: 'Styling',
        type: { summary: 'string' },
        defaultValue: { summary: 'rgba(0, 0, 0, 0.7)' },
      },
    },
    asChild: {
      control: 'boolean',
      description: 'Render as child element (composition pattern)',
      table: {
        category: 'Advanced',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    className: {
      control: 'text',
      description: 'Additional CSS class name',
      table: { category: 'HTML Attributes' },
    },
    style: {
      control: 'object',
      description: 'Inline styles for the container',
      table: { category: 'HTML Attributes' },
    },
  },
};

export default meta;
type Story = StoryObj<ScrollAreaProps>;

export const Usage: Story = {
  args: {
    size: 'small',
    radius: 'small',
    scrollbars: 'both',
    type: 'hover',
    scrollHideDelay: 600,
    dir: 'ltr',
  },
  render: (args: ScrollAreaProps) => (
    <div style={{ width: '100%', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Hero Section */}
      <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1rem', color: '#1a1a1a' }}>
          ScrollArea Component
        </h1>
        <p style={{ fontSize: '1.125rem', color: '#666', maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>
          Custom scrollbars with native performance. Perfect for chat interfaces, code editors, data tables, and any content that needs elegant scrolling.
        </p>
      </div>

      {/* Interactive Demo */}
      <div style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: '#333' }}>
          Interactive Demo
        </h2>
        <p style={{ fontSize: '0.875rem', color: '#666', marginBottom: '1.5rem' }}>
          Adjust <strong>size</strong>, <strong>type</strong>, <strong>scrollbars</strong>, and <strong>colors</strong> to see how ScrollArea adapts. Try hovering, scrolling, and dragging the thumb.
        </p>
        <div style={{ 
          padding: '2rem', 
          backgroundColor: '#f8f9fa', 
          borderRadius: '8px',
          display: 'flex',
          justifyContent: 'center',
        }}>
          <ScrollArea {...args} style={{ height: '300px', width: '100%', maxWidth: '500px', border: '1px solid #e0e0e0', borderRadius: '8px', backgroundColor: '#ffffff' }}>
            <div style={{ padding: '1.5rem' }}>
              <h3 style={{ margin: '0 0 1rem 0', color: '#333', fontSize: '1.25rem' }}>Scrollable Content</h3>
              <p style={{ margin: '0 0 1rem 0', color: '#666', lineHeight: '1.6' }}>
                This content is larger than the viewport to demonstrate scrolling behavior. 
                The scrollbars will appear based on the <code>type</code> prop setting.
              </p>
              {Array.from({ length: 15 }, (_, i) => (
                <div key={i} style={{
                  padding: '1rem',
                  marginBottom: '0.75rem',
                  backgroundColor: i % 2 === 0 ? '#f8f9fa' : '#e9ecef',
                  borderRadius: '6px',
                  borderLeft: `3px solid ${['#1890ff', '#52c41a', '#fa8c16', '#722ed1', '#eb2f96'][i % 5]}`,
                }}>
                  <strong style={{ color: '#333' }}>Item {i + 1}</strong>
                  <p style={{ margin: '0.5rem 0 0 0', color: '#666', fontSize: '0.875rem' }}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.
                  </p>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>

      {/* Real-World Examples */}
      <div style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: '#333' }}>
          Real-World Examples
        </h2>
        <p style={{ fontSize: '0.875rem', color: '#666', marginBottom: '2rem' }}>
          Production-ready patterns for common use cases.
        </p>

        {/* Chat Interface */}
        <div style={{ marginBottom: '2.5rem' }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.75rem', color: '#1890ff' }}>
            💬 Chat Interface
          </h3>
          <p style={{ fontSize: '0.875rem', color: '#666', marginBottom: '1rem' }}>
            Message list with <code>type="scroll"</code> - scrollbars appear during scrolling for smooth chat experience.
          </p>
          <ScrollArea
            type="scroll"
            scrollbars="vertical"
            size="small"
            radius="full"
            style={{ 
              height: '400px', 
              width: '100%', 
              maxWidth: '600px',
              backgroundColor: '#ffffff',
              border: '1px solid #e0e0e0',
              borderRadius: '12px',
            }}
          >
            <div style={{ padding: '1rem' }}>
              {[
                { from: 'Alice', time: '10:32 AM', text: 'Hey! How are you doing?', isMe: false },
                { from: 'You', time: '10:33 AM', text: "I'm great! Just working on some React components.", isMe: true },
                { from: 'Alice', time: '10:34 AM', text: 'Sounds interesting! What kind of components?', isMe: false },
                { from: 'You', time: '10:35 AM', text: 'Building a ScrollArea component with custom scrollbars. Want to see?', isMe: true },
                { from: 'Alice', time: '10:36 AM', text: 'Absolutely! Send me the link!', isMe: false },
                { from: 'You', time: '10:37 AM', text: 'https://github.com/apvee/react-layout-kit - check it out!', isMe: true },
                { from: 'Alice', time: '10:38 AM', text: 'This looks amazing! Love the smooth scrolling.', isMe: false },
                { from: 'You', time: '10:39 AM', text: 'Thanks! It uses native scroll performance with custom overlay scrollbars.', isMe: true },
                { from: 'Alice', time: '10:40 AM', text: 'The attention to detail is impressive. RTL support too?', isMe: false },
                { from: 'You', time: '10:41 AM', text: 'Yes! Full RTL support with automatic positioning.', isMe: true },
              ].map((msg, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    justifyContent: msg.isMe ? 'flex-end' : 'flex-start',
                    marginBottom: '1rem',
                  }}
                >
                  <div
                    style={{
                      maxWidth: '70%',
                      padding: '0.75rem 1rem',
                      backgroundColor: msg.isMe ? '#1890ff' : '#f0f0f0',
                      color: msg.isMe ? 'white' : '#333',
                      borderRadius: '12px',
                      borderTopRightRadius: msg.isMe ? '4px' : '12px',
                      borderTopLeftRadius: msg.isMe ? '12px' : '4px',
                    }}
                  >
                    {!msg.isMe && (
                      <div style={{ fontSize: '0.75rem', fontWeight: '600', marginBottom: '0.25rem', opacity: 0.8 }}>
                        {msg.from}
                      </div>
                    )}
                    <div style={{ fontSize: '0.875rem', lineHeight: '1.4' }}>{msg.text}</div>
                    <div style={{ fontSize: '0.7rem', marginTop: '0.25rem', opacity: 0.7, textAlign: 'right' }}>
                      {msg.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Code Editor */}
        <div style={{ marginBottom: '2.5rem' }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.75rem', color: '#52c41a' }}>
            📝 Code Editor
          </h3>
          <p style={{ fontSize: '0.875rem', color: '#666', marginBottom: '1rem' }}>
            Syntax highlighted code with <code>type="always"</code> and <code>scrollbars="both"</code> for precise scroll control.
          </p>
          <ScrollArea
            type="always"
            scrollbars="both"
            size="medium"
            radius="small"
            thumbColor="rgba(82, 196, 26, 0.4)"
            thumbHoverColor="rgba(82, 196, 26, 0.6)"
            style={{ 
              height: '350px',
              width: '100%',
              backgroundColor: '#1e1e1e',
              border: '1px solid #333',
              borderRadius: '8px',
              fontFamily: "'Fira Code', 'Consolas', monospace",
              fontSize: '0.875rem',
            }}
          >
            <pre style={{ margin: 0, padding: '1rem', color: '#d4d4d4', lineHeight: '1.5' }}>
              <code>{`import * as React from 'react';
import { ScrollArea } from '@apvee/react-layout-kit';

/**
 * A flexible scroll area component with custom scrollbars.
 * Provides native scrolling performance with beautiful overlay scrollbars.
 */
export const ChatInterface = () => {
  const [messages, setMessages] = React.useState([
    { id: 1, text: 'Hello!', from: 'Alice', time: '10:30 AM' },
    { id: 2, text: 'Hi there!', from: 'Bob', time: '10:31 AM' },
  ]);

  return (
    <ScrollArea 
      type="scroll" 
      scrollbars="vertical"
      size="small"
      style={{ height: '400px', width: '100%' }}
    >
      <div className="chat-messages">
        {messages.map(msg => (
          <ChatMessage 
            key={msg.id}
            text={msg.text}
            from={msg.from}
            time={msg.time}
          />
        ))}
      </div>
    </ScrollArea>
  );
};

// Responsive sizing
<ScrollArea size={{ xs: 'small', md: 'medium', lg: 'large' }}>
  <YourContent />
</ScrollArea>

// Custom colors matching your brand
<ScrollArea
  thumbColor="rgba(59, 130, 246, 0.5)"
  thumbHoverColor="rgba(59, 130, 246, 0.7)"
  trackColor="rgba(59, 130, 246, 0.1)"
>
  <YourContent />
</ScrollArea>

// RTL support for international apps
<ScrollArea dir="rtl">
  <ArabicContent />
</ScrollArea>`}</code>
            </pre>
          </ScrollArea>
        </div>

        {/* Data Table */}
        <div style={{ marginBottom: '2.5rem' }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.75rem', color: '#fa8c16' }}>
            📊 Data Table
          </h3>
          <p style={{ fontSize: '0.875rem', color: '#666', marginBottom: '1rem' }}>
            Scrollable table with <code>type="always"</code> for constant scroll position awareness. Vertical scrollbar only.
          </p>
          <ScrollArea
            type="always"
            scrollbars="vertical"
            size="small"
            style={{ 
              height: '350px',
              width: '100%',
              backgroundColor: '#ffffff',
              border: '1px solid #e0e0e0',
              borderRadius: '8px',
            }}
          >
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: '#fafafa', borderBottom: '2px solid #e0e0e0', position: 'sticky', top: 0, zIndex: 1 }}>
                  <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', color: '#333' }}>ID</th>
                  <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', color: '#333' }}>Name</th>
                  <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', color: '#333' }}>Email</th>
                  <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', color: '#333' }}>Status</th>
                  <th style={{ padding: '1rem', textAlign: 'right', fontWeight: '600', color: '#333' }}>Amount</th>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: 50 }, (_, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #f0f0f0' }}>
                    <td style={{ padding: '0.75rem', color: '#666' }}>#{1000 + i}</td>
                    <td style={{ padding: '0.75rem', color: '#333', fontWeight: '500' }}>
                      {['Alice Johnson', 'Bob Smith', 'Carol White', 'David Brown', 'Emma Davis'][i % 5]}
                    </td>
                    <td style={{ padding: '0.75rem', color: '#666', fontSize: '0.875rem' }}>
                      {['alice', 'bob', 'carol', 'david', 'emma'][i % 5]}@example.com
                    </td>
                    <td style={{ padding: '0.75rem' }}>
                      <span style={{
                        padding: '4px 12px',
                        borderRadius: '12px',
                        fontSize: '0.75rem',
                        fontWeight: '500',
                        backgroundColor: i % 3 === 0 ? '#f6ffed' : i % 3 === 1 ? '#fff7e6' : '#e6f7ff',
                        color: i % 3 === 0 ? '#52c41a' : i % 3 === 1 ? '#fa8c16' : '#1890ff',
                      }}>
                        {i % 3 === 0 ? 'Active' : i % 3 === 1 ? 'Pending' : 'Completed'}
                      </span>
                    </td>
                    <td style={{ padding: '0.75rem', textAlign: 'right', color: '#333', fontWeight: '600' }}>
                      ${(Math.random() * 10000).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </ScrollArea>
        </div>

        {/* Sidebar Navigation */}
        <div style={{ marginBottom: '2.5rem' }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.75rem', color: '#722ed1' }}>
            📑 Sidebar Navigation
          </h3>
          <p style={{ fontSize: '0.875rem', color: '#666', marginBottom: '1rem' }}>
            Navigation menu with <code>type="hover"</code> - scrollbars appear on hover for clean appearance.
          </p>
          <ScrollArea
            type="hover"
            scrollbars="vertical"
            size="small"
            radius="medium"
            style={{ 
              height: '400px',
              width: '280px',
              backgroundColor: '#fafafa',
              border: '1px solid #e0e0e0',
              borderRadius: '8px',
            }}
          >
            <div style={{ padding: '1rem' }}>
              {[
                { icon: '🏠', label: 'Dashboard', badge: null },
                { icon: '📊', label: 'Analytics', badge: 'New' },
                { icon: '📈', label: 'Reports', badge: null },
                { icon: '👥', label: 'Team', badge: '3' },
                { icon: '💬', label: 'Messages', badge: '12' },
                { icon: '📁', label: 'Projects', badge: null },
                { icon: '⚙️', label: 'Settings', badge: null },
                { icon: '🔔', label: 'Notifications', badge: '5' },
                { icon: '📅', label: 'Calendar', badge: null },
                { icon: '📧', label: 'Email', badge: '24' },
                { icon: '🎨', label: 'Design System', badge: null },
                { icon: '🔍', label: 'Search', badge: null },
                { icon: '📝', label: 'Documents', badge: null },
                { icon: '💼', label: 'Business', badge: null },
                { icon: '🎯', label: 'Goals', badge: '2' },
                { icon: '📱', label: 'Mobile App', badge: 'Beta' },
                { icon: '🌐', label: 'Website', badge: null },
                { icon: '🔒', label: 'Security', badge: null },
                { icon: '💳', label: 'Billing', badge: null },
                { icon: '🚀', label: 'Launch', badge: null },
              ].map((item, i) => (
                <div
                  key={i}
                  style={{
                    padding: '0.75rem 1rem',
                    marginBottom: '0.25rem',
                    backgroundColor: i === 0 ? '#e6f7ff' : 'transparent',
                    color: i === 0 ? '#1890ff' : '#333',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontWeight: i === 0 ? '500' : 'normal',
                    fontSize: '0.875rem',
                    transition: 'background-color 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    if (i !== 0) e.currentTarget.style.backgroundColor = '#f5f5f5';
                  }}
                  onMouseLeave={(e) => {
                    if (i !== 0) e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  <span>
                    <span style={{ marginRight: '0.75rem' }}>{item.icon}</span>
                    {item.label}
                  </span>
                  {item.badge && (
                    <span style={{
                      padding: '2px 8px',
                      backgroundColor: '#ff4d4f',
                      color: 'white',
                      borderRadius: '10px',
                      fontSize: '0.7rem',
                      fontWeight: '600',
                    }}>
                      {item.badge}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      source: {
        state: 'open',
        code: `// Basic usage
<ScrollArea style={{ height: 300, width: 400 }}>
  <YourLongContent />
</ScrollArea>

// Chat interface with scroll visibility
<ScrollArea 
  type="scroll"
  scrollbars="vertical"
  size="small"
  radius="full"
  style={{ height: 400, width: 600 }}
>
  <ChatMessages />
</ScrollArea>

// Code editor with always-visible scrollbars
<ScrollArea
  type="always"
  scrollbars="both"
  size="medium"
  thumbColor="rgba(82, 196, 26, 0.4)"
  style={{ height: 350, backgroundColor: '#1e1e1e' }}
>
  <CodeContent />
</ScrollArea>

// Data table with vertical scrolling only
<ScrollArea
  type="always"
  scrollbars="vertical"
  style={{ height: 350 }}
>
  <DataTable />
</ScrollArea>

// Sidebar navigation with hover-triggered scrollbars
<ScrollArea
  type="hover"
  scrollbars="vertical"
  size="small"
  style={{ height: 400, width: 280 }}
>
  <NavigationMenu />
</ScrollArea>

// Responsive sizing
<ScrollArea
  size={{ xs: 'small', md: 'medium', lg: 'large' }}
  style={{ height: 300 }}
>
  <Content />
</ScrollArea>

// Custom brand colors
<ScrollArea
  trackColor="rgba(59, 130, 246, 0.1)"
  thumbColor="rgba(59, 130, 246, 0.5)"
  thumbHoverColor="rgba(59, 130, 246, 0.7)"
  thumbActiveColor="rgba(59, 130, 246, 0.9)"
>
  <Content />
</ScrollArea>

// RTL support for internationalization
<ScrollArea dir="rtl">
  <ArabicContent />
</ScrollArea>

// Composition pattern with asChild
<ScrollArea asChild>
  <section className="my-scrollable-section">
    <Content />
  </section>
</ScrollArea>`,
      },
    },
  },
};