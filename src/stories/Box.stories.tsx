import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { BoxProps, Box } from '..';

const meta: Meta<BoxProps> = {
  title: 'Components/Box',
  component: Box,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
A flexible layout component with responsive CSS-in-JS styling capabilities.

## Features
- All CSS properties available as $-prefixed props (e.g., $display, $padding)
- Short props for common properties (p, m, w, h, etc.)
- Responsive values using breakpoint objects
- Automatic container width measurement
- Composition via asChild prop
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    // Core Box props
    asChild: {
      control: 'boolean',
      description: 'Render as child element using Radix Slot',
    },
    containerWidth: {
      control: 'number',
      description: 'Fixed container width for responsive calculations',
    },
    styleReset: {
      control: 'boolean',
      description: 'Apply basic style reset (box-sizing: border-box)',
    },

    // Margin props (use spacing scale)
    m: {
      control: 'text',
      description: 'Margin (all sides) - uses spacing scale (xs, s, m, l, xl, etc.)',
    },
    mt: {
      control: 'text',
      description: 'Margin top - uses spacing scale',
    },
    mb: {
      control: 'text',
      description: 'Margin bottom - uses spacing scale',
    },
    ml: {
      control: 'text',
      description: 'Margin left - uses spacing scale',
    },
    mr: {
      control: 'text',
      description: 'Margin right - uses spacing scale',
    },
    ms: {
      control: 'text',
      description: 'Margin inline start (logical property) - uses spacing scale',
    },
    me: {
      control: 'text',
      description: 'Margin inline end (logical property) - uses spacing scale',
    },
    mx: {
      control: 'text',
      description: 'Margin inline (left + right) - uses spacing scale',
    },
    my: {
      control: 'text',
      description: 'Margin block (top + bottom) - uses spacing scale',
    },

    // Padding props (use spacing scale)
    p: {
      control: 'text',
      description: 'Padding (all sides) - uses spacing scale (xs, s, m, l, xl, etc.)',
    },
    pt: {
      control: 'text',
      description: 'Padding top - uses spacing scale',
    },
    pb: {
      control: 'text',
      description: 'Padding bottom - uses spacing scale',
    },
    pl: {
      control: 'text',
      description: 'Padding left - uses spacing scale',
    },
    pr: {
      control: 'text',
      description: 'Padding right - uses spacing scale',
    },
    ps: {
      control: 'text',
      description: 'Padding inline start (logical property) - uses spacing scale',
    },
    pe: {
      control: 'text',
      description: 'Padding inline end (logical property) - uses spacing scale',
    },
    px: {
      control: 'text',
      description: 'Padding inline (left + right) - uses spacing scale',
    },
    py: {
      control: 'text',
      description: 'Padding block (top + bottom) - uses spacing scale',
    },

    // Size props
    w: {
      control: 'text',
      description: 'Width - accepts CSS values or numbers',
    },
    miw: {
      control: 'text',
      description: 'Min width - uses spacing scale',
    },
    maw: {
      control: 'text',
      description: 'Max width - uses spacing scale',
    },
    h: {
      control: 'text',
      description: 'Height - accepts CSS values or numbers',
    },
    mih: {
      control: 'text',
      description: 'Min height - uses spacing scale',
    },
    mah: {
      control: 'text',
      description: 'Max height - uses spacing scale',
    },

    // Position props (use native CSS values)
    top: {
      control: 'text',
      description: 'Top position - uses CSS values (px, rem, %, etc.)',
    },
    left: {
      control: 'text',
      description: 'Left position - uses CSS values (px, rem, %, etc.)',
    },
    bottom: {
      control: 'text',
      description: 'Bottom position - uses CSS values (px, rem, %, etc.)',
    },
    right: {
      control: 'text',
      description: 'Right position - uses CSS values (px, rem, %, etc.)',
    },
  },
};

export default meta;
type Story = StoryObj<BoxProps>;

// Basic usage with dollar props
export const BasicStyling: Story = {
  args: {
    $display: 'flex',
    $alignItems: 'center',
    $justifyContent: 'center',
    $padding: 16,
    $backgroundColor: '#f0f0f0',
    $border: '1px solid #ccc',
    $borderRadius: 8,
    $minHeight: 100,
    children: 'Basic Box with dollar props',
  },
  parameters: {
    docs: {
      description: {
        story: 'Basic Box usage with CSS properties as $-prefixed props.',
      },
    },
  },
};

// Short props for spacing and sizing
export const ShortProps: Story = {
  args: {
    p: 4, // padding
    m: 2, // margin
    w: 200, // width
    h: 150, // height
    $backgroundColor: '#e3f2fd',
    $border: '2px solid #2196f3',
    $borderRadius: 4,
    $display: 'flex',
    $alignItems: 'center',
    $justifyContent: 'center',
    children: 'Short props example',
  },
  parameters: {
    docs: {
      description: {
        story: 'Using short props for common styling: p (padding), m (margin), w (width), h (height).',
      },
    },
  },
};

// Responsive values
export const ResponsiveValues: Story = {
  args: {
    $padding: { xs: 8, md: 16, lg: 24 },
    $fontSize: { xs: '14px', md: '16px', lg: '18px' },
    $backgroundColor: { xs: '#ffebee', md: '#e8f5e8', lg: '#e3f2fd' },
    $textAlign: 'center',
    $border: '1px solid #ddd',
    $borderRadius: 8,
    $minHeight: 100,
    children: 'Resize the viewport to see responsive changes',
  },
  parameters: {
    docs: {
      description: {
        story: 'Responsive values that change based on viewport size. Try resizing the browser window.',
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

// Flexbox layout example
export const FlexboxLayout: Story = {
  render: () => (
    <Box $display="flex" $gap={16} $padding={16} $backgroundColor="#f5f5f5">
      <Box 
        $flex={1} 
        $padding={16} 
        $backgroundColor="#fff" 
        $border="1px solid #ddd"
        $borderRadius={4}
      >
        Flex item 1
      </Box>
      <Box 
        $flex={2} 
        $padding={16} 
        $backgroundColor="#fff" 
        $border="1px solid #ddd"
        $borderRadius={4}
      >
        Flex item 2 (flex: 2)
      </Box>
      <Box 
        $flex={1} 
        $padding={16} 
        $backgroundColor="#fff" 
        $border="1px solid #ddd"
        $borderRadius={4}
      >
        Flex item 3
      </Box>
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Using Box for flexbox layouts with gap and flex properties.',
      },
    },
  },
};

// AsChild composition pattern
export const AsChildComposition: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
      <Box 
        asChild 
        $padding={12} 
        $backgroundColor="#4caf50" 
        $color="white" 
        $borderRadius={4}
        $border="none"
        $cursor="pointer"
        $transition="all 0.2s"
      >
        <button onClick={() => alert('Button clicked!')}>
          Styled Button via asChild
        </button>
      </Box>
      
      <Box 
        asChild 
        $color="#1976d2" 
        $textDecoration="none"
        $padding={8}
        $border="1px solid #1976d2"
        $borderRadius={4}
      >
        <a href="#" onClick={(e) => e.preventDefault()}>
          Styled Link via asChild
        </a>
      </Box>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Using asChild to apply Box styling to other components like buttons and links.',
      },
    },
  },
};

// Grid layout example
export const GridLayout: Story = {
  render: () => (
    <Box 
      $display="grid" 
      $gridTemplateColumns="repeat(auto-fit, minmax(150px, 1fr))"
      $gap={16}
      $padding={16}
      $backgroundColor="#f5f5f5"
    >
      {Array.from({ length: 6 }, (_, i) => (
        <Box 
          key={i}
          $padding={16}
          $backgroundColor="#fff"
          $border="1px solid #ddd"
          $borderRadius={4}
          $textAlign="center"
          $minHeight={80}
          $display="flex"
          $alignItems="center"
          $justifyContent="center"
        >
          Grid item {i + 1}
        </Box>
      ))}
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Using Box for CSS Grid layouts with responsive columns.',
      },
    },
  },
};

// Position and z-index example
export const PositionExample: Story = {
  render: () => (
    <Box 
      $position="relative" 
      $width={300} 
      $height={200} 
      $backgroundColor="#f0f0f0"
      $border="1px solid #ccc"
      $borderRadius={8}
    >
      <Box 
        $position="absolute"
        $top={10}
        $left={10}
        $padding={8}
        $backgroundColor="#ff5722"
        $color="white"
        $borderRadius={4}
        $zIndex={2}
      >
        Positioned element
      </Box>
      <Box 
        $position="absolute"
        $bottom={10}
        $right={10}
        $padding={8}
        $backgroundColor="#2196f3"
        $color="white"
        $borderRadius={4}
        $zIndex={1}
      >
        Another positioned element
      </Box>
      <Box 
        $position="absolute"
        $top="50%"
        $left="50%"
        $transform="translate(-50%, -50%)"
        $padding={12}
        $backgroundColor="rgba(76, 175, 80, 0.9)"
        $color="white"
        $borderRadius={4}
        $textAlign="center"
      >
        Centered element
      </Box>
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Demonstrating absolute positioning, z-index, and transform properties.',
      },
    },
  },
};

// Typography and text styling
export const TypographyExample: Story = {
  render: () => (
    <Box $maxWidth={400} $margin="0 auto" $padding={16}>
      <Box 
        $fontSize={24}
        $fontWeight="bold"
        $marginBottom={16}
        $color="#333"
        $textAlign="center"
      >
        Typography Example
      </Box>
      <Box 
        $fontSize={16}
        $lineHeight={1.6}
        $color="#666"
        $marginBottom={12}
      >
        This paragraph demonstrates text styling with Box component. 
        You can control font size, line height, color, and spacing.
      </Box>
      <Box 
        $fontSize={14}
        $fontStyle="italic"
        $color="#999"
        $textAlign="right"
      >
        — Styled with Box component
      </Box>
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Using Box for typography and text styling.',
      },
    },
  },
};

// Style reset example
export const StyleResetExample: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px' }}>
      <Box 
        $padding={16}
        $backgroundColor="#fff3e0"
        $border="1px solid #ff9800"
        $borderRadius={4}
      >
        <div>Without styleReset</div>
        <div>Default box-sizing behavior</div>
      </Box>
      <Box 
        styleReset
        $padding={16}
        $backgroundColor="#e8f5e8"
        $border="1px solid #4caf50"
        $borderRadius={4}
      >
        <div>With styleReset</div>
        <div>box-sizing: border-box applied</div>
      </Box>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Comparison between Box with and without styleReset prop.',
      },
    },
  },
};