import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ScrollArea } from '../components/ScrollArea';
import type { ScrollAreaProps } from '../components/ScrollArea';

const meta: Meta<typeof ScrollArea> = {
  title: 'Components/Layouts/ScrollArea',
  component: ScrollArea,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Size of the scrollbars (track and thumb thickness)',
    },
    radius: {
      control: 'select',
      options: ['none', 'small', 'medium', 'large', 'full'],
      description: 'Border radius for scrollbars and thumbs',
    },
    scrollbars: {
      control: 'select',
      options: ['vertical', 'horizontal', 'both'],
      description: 'Which scrollbars to show when content overflows',
    },
    type: {
      control: 'select',
      options: ['hover', 'always', 'scroll'],
      description: 'Scrollbar visibility behavior',
    },
    scrollHideDelay: {
      control: 'number',
      description: 'Delay in milliseconds before hiding scrollbars',
    },
    dir: {
      control: 'select',
      options: ['ltr', 'rtl'],
      description: 'Text direction for RTL support',
    },
    trackColor: {
      control: 'color',
      description: 'Custom track background color',
    },
    thumbColor: {
      control: 'color',
      description: 'Custom thumb color',
    },
    thumbHoverColor: {
      control: 'color',
      description: 'Custom thumb hover color',
    },
    thumbActiveColor: {
      control: 'color',
      description: 'Custom thumb active/pressed color',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample content for testing
const SampleContent = ({ height = 400, width = 600 }: { height?: number; width?: number }) => (
  <div style={{ padding: 20 }}>
    <h3 style={{ margin: '0 0 16px 0', color: '#333' }}>Sample Content</h3>
    <div style={{ 
      height, 
      width, 
      background: 'linear-gradient(45deg, #f0f0f0 25%, transparent 25%), linear-gradient(-45deg, #f0f0f0 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #f0f0f0 75%), linear-gradient(-45deg, transparent 75%, #f0f0f0 75%)',
      backgroundSize: '20px 20px',
      backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px',
      border: '2px solid #ddd',
      borderRadius: 8,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 18,
      fontWeight: 'bold',
      color: '#666'
    }}>
      {width} × {height} Content
    </div>
    <p style={{ margin: '16px 0', color: '#666', lineHeight: 1.5 }}>
      This is additional content to demonstrate scrolling behavior. 
      The content area extends beyond the visible viewport to show how 
      the custom scrollbars work with different configurations.
    </p>
    {Array.from({ length: 10 }, (_, i) => (
      <p key={i} style={{ margin: '8px 0', color: '#888' }}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
        Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </p>
    ))}
  </div>
);

export const Default: Story = {
  args: {
    size: 'small',
    radius: 'small',
    scrollbars: 'both',
    type: 'hover',
    scrollHideDelay: 600,
    dir: 'ltr',
  },
  render: (args: any) => (
    <ScrollArea {...args} style={{ height: 200, width: 300 }}>
      <SampleContent height={400} width={500} />
    </ScrollArea>
  ),
};

export const VerticalOnly: Story = {
  args: {
    ...Default.args,
    scrollbars: 'vertical',
    type: 'always',
  },
  render: (args: any) => (
    <ScrollArea {...args} style={{ height: 180, width: 300 }}>
      <SampleContent height={400} width={280} />
    </ScrollArea>
  ),
};

export const HorizontalOnly: Story = {
  args: {
    ...Default.args,
    scrollbars: 'horizontal',
    type: 'always',
    size: 'medium',
    radius: 'full',
  },
  render: (args: any) => (
    <ScrollArea {...args} style={{ height: 150, width: 300 }}>
      <SampleContent height={120} width={600} />
    </ScrollArea>
  ),
};

export const BothScrollbars: Story = {
  args: {
    ...Default.args,
    type: 'always',
    size: 'large',
    radius: 'medium',
  },
  render: (args: any) => (
    <ScrollArea {...args} style={{ height: 200, width: 300 }}>
      <SampleContent height={400} width={600} />
    </ScrollArea>
  ),
};

export const RTLSupport: Story = {
  args: {
    ...Default.args,
    dir: 'rtl',
    type: 'always',
  },
  render: (args: any) => (
    <ScrollArea {...args} style={{ height: 200, width: 300 }}>
      <div style={{ padding: 20, direction: 'rtl' }}>
        <h3 style={{ margin: '0 0 16px 0', color: '#333' }}>محتوى عربي</h3>
        <div style={{ 
          height: 300, 
          width: 500, 
          background: '#f8f9fa',
          border: '2px solid #ddd',
          borderRadius: 8,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 18,
          fontWeight: 'bold',
          color: '#666'
        }}>
          RTL Content Area
        </div>
        <p style={{ margin: '16px 0', color: '#666', lineHeight: 1.5 }}>
          هذا نص تجريبي باللغة العربية لاختبار دعم الاتجاه من اليمين إلى اليسار.
          شريط التمرير العمودي يجب أن يظهر على الجانب الأيسر.
        </p>
      </div>
    </ScrollArea>
  ),
};

export const CustomColors: Story = {
  args: {
    ...Default.args,
    type: 'always',
    trackColor: 'rgba(59, 130, 246, 0.1)',
    thumbColor: 'rgba(59, 130, 246, 0.5)',
    thumbHoverColor: 'rgba(59, 130, 246, 0.7)',
    thumbActiveColor: 'rgba(59, 130, 246, 0.9)',
    radius: 'full',
  },
  render: (args: any) => (
    <ScrollArea {...args} style={{ height: 200, width: 300 }}>
      <SampleContent height={400} width={500} />
    </ScrollArea>
  ),
};

export const ResponsiveSize: Story = {
  args: {
    ...Default.args,
    size: { xs: 'small', md: 'medium', lg: 'large' },
    type: 'always',
  },
  render: (args: any) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <p style={{ margin: 0, color: '#666', fontSize: 14 }}>
        Resize your window to see responsive scrollbar sizing
      </p>
      <ScrollArea {...args} style={{ height: 200, width: 300 }}>
        <SampleContent height={400} width={500} />
      </ScrollArea>
    </div>
  ),
};

export const ScrollBehaviorTypes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
      <div style={{ textAlign: 'center' }}>
        <h4 style={{ margin: '0 0 8px 0', fontSize: 14, color: '#666' }}>Hover</h4>
        <ScrollArea type="hover" style={{ height: 150, width: 200 }}>
          <SampleContent height={300} width={350} />
        </ScrollArea>
      </div>
      <div style={{ textAlign: 'center' }}>
        <h4 style={{ margin: '0 0 8px 0', fontSize: 14, color: '#666' }}>Always</h4>
        <ScrollArea type="always" style={{ height: 150, width: 200 }}>
          <SampleContent height={300} width={350} />
        </ScrollArea>
      </div>
      <div style={{ textAlign: 'center' }}>
        <h4 style={{ margin: '0 0 8px 0', fontSize: 14, color: '#666' }}>Scroll</h4>
        <ScrollArea type="scroll" style={{ height: 150, width: 200 }}>
          <SampleContent height={300} width={350} />
        </ScrollArea>
      </div>
    </div>
  ),
};