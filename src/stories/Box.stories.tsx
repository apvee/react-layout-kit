import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { BoxProps, Box } from '..';

const meta: Meta<BoxProps> = {
  title: 'Components/Foundation/Box',
  component: Box,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
# Box Component

The **Box** component is the foundation of the layout system, providing a flexible and type-safe way to build UIs with responsive CSS-in-JS styling.

## Key Features

- **🎨 All CSS Properties**: Every CSS property is available with a \`$\` prefix (e.g., \`$display\`, \`$padding\`, \`$backgroundColor\`)
- **📱 Responsive Design**: Use breakpoint objects for container-aware responsive values
- **⚡ Short Props**: Convenient shorthands for common properties (p, m, w, h, mx, py, etc.)
- **🔧 Composition Ready**: \`asChild\` prop for seamless component composition using Slot pattern
- **📏 Auto Measurement**: Automatic container width measurement for responsive calculations
- **🎯 Type-Safe**: Full TypeScript support with autocompletion for all CSS properties
- **🚀 Performance**: Memoized computations and Emotion CSS optimization

## Prop Categories

### Core Props
- \`asChild\`: Render as child element using Slot pattern
- \`containerWidth\`: Fixed container width for responsive calculations
- \`styleReset\`: Apply box-sizing: border-box reset

### Dollar Props ($)
All CSS properties available with \`$\` prefix:
- Layout: \`$display\`, \`$position\`, \`$flexDirection\`, etc.
- Spacing: \`$margin\`, \`$padding\`, \`$gap\`, etc.
- Sizing: \`$width\`, \`$height\`, \`$minWidth\`, \`$maxHeight\`, etc.
- Visual: \`$backgroundColor\`, \`$border\`, \`$borderRadius\`, \`$boxShadow\`, etc.
- Typography: \`$fontSize\`, \`$fontWeight\`, \`$lineHeight\`, \`$color\`, etc.
- Transform: \`$transform\`, \`$rotate\`, \`$scale\`, \`$translate\`, etc.

### Short Props
Convenient shorthands that use the spacing scale:
- Margin: \`m\`, \`mt\`, \`mr\`, \`mb\`, \`ml\`, \`mx\`, \`my\`, \`ms\`, \`me\`
- Padding: \`p\`, \`pt\`, \`pr\`, \`pb\`, \`pl\`, \`px\`, \`py\`, \`ps\`, \`pe\`
- Size: \`w\`, \`h\`, \`miw\`, \`mih\`, \`maw\`, \`mah\`
- Position: \`top\`, \`left\`, \`right\`, \`bottom\`

## Responsive Values

Use breakpoint objects for responsive design:

\`\`\`tsx
<Box
  $padding={{ xs: 8, md: 16, lg: 24 }}
  $fontSize={{ xs: 14, md: 16, lg: 18 }}
  $backgroundColor={{ xs: 'lightblue', md: 'lightgreen' }}
>
  Responsive content
</Box>
\`\`\`

## Spacing Scale

Short props automatically use the spacing scale:
- \`none\`: 0
- \`xs\`: 4px
- \`sm\`: 8px
- \`md\`: 12px
- \`lg\`: 16px
- \`xl\`: 20px
- \`xxl\`: 24px
- \`xxxl\`: 32px

## Examples

\`\`\`tsx
// Basic styling
<Box $display="flex" $gap={16} $padding="lg" $backgroundColor="#f0f0f0">
  Content
</Box>

// Short props
<Box p="lg" m="md" w={300} h={200}>
  Content with short props
</Box>

// Responsive design
<Box $padding={{ xs: 8, md: 16, lg: 24 }}>
  Responsive padding
</Box>

// Composition with asChild
<Box asChild $padding="md" $backgroundColor="blue">
  <button>Styled Button</button>
</Box>
\`\`\`
        `,
      },
      source: {
        state: 'open',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    // Core Box props
    asChild: {
      control: 'boolean',
      description: 'When true, renders as its child element, merging props and refs using Slot pattern. Perfect for styling existing components without wrapper divs.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'Core Props',
      },
    },
    containerWidth: {
      control: { type: 'number', min: 0, max: 2000, step: 10 },
      description: 'Fixed container width in pixels for responsive calculations. When provided, disables automatic width measurement. Useful for programmatic control of responsive behavior.',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: 'undefined' },
        category: 'Core Props',
      },
    },
    styleReset: {
      control: 'boolean',
      description: 'Apply basic style reset (box-sizing: border-box) for consistent box model behavior across browsers.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'Core Props',
      },
    },
    className: {
      control: 'text',
      description: 'Additional CSS class names to merge with generated styles. Classes are combined intelligently with Emotion cx.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
        category: 'Core Props',
      },
    },

    // Short Props - Margin
    m: {
      control: 'text',
      description: 'Margin (all sides). Accepts spacing scale tokens (none, xs, sm, md, lg, xl, xxl, xxxl) or numbers. Example: "lg" or 16',
      table: {
        type: { summary: 'SpacingValue | ResponsiveValue<SpacingValue>' },
        defaultValue: { summary: 'undefined' },
        category: 'Short Props - Margin',
      },
    },
    mt: {
      control: 'text',
      description: 'Margin top. Uses spacing scale.',
      table: {
        type: { summary: 'SpacingValue | ResponsiveValue<SpacingValue>' },
        category: 'Short Props - Margin',
      },
    },
    mr: {
      control: 'text',
      description: 'Margin right. Uses spacing scale.',
      table: {
        type: { summary: 'SpacingValue | ResponsiveValue<SpacingValue>' },
        category: 'Short Props - Margin',
      },
    },
    mb: {
      control: 'text',
      description: 'Margin bottom. Uses spacing scale.',
      table: {
        type: { summary: 'SpacingValue | ResponsiveValue<SpacingValue>' },
        category: 'Short Props - Margin',
      },
    },
    ml: {
      control: 'text',
      description: 'Margin left. Uses spacing scale.',
      table: {
        type: { summary: 'SpacingValue | ResponsiveValue<SpacingValue>' },
        category: 'Short Props - Margin',
      },
    },
    mx: {
      control: 'text',
      description: 'Margin inline (left + right). Uses spacing scale.',
      table: {
        type: { summary: 'SpacingValue | ResponsiveValue<SpacingValue>' },
        category: 'Short Props - Margin',
      },
    },
    my: {
      control: 'text',
      description: 'Margin block (top + bottom). Uses spacing scale.',
      table: {
        type: { summary: 'SpacingValue | ResponsiveValue<SpacingValue>' },
        category: 'Short Props - Margin',
      },
    },
    ms: {
      control: 'text',
      description: 'Margin inline start (left in LTR, right in RTL). Uses spacing scale.',
      table: {
        type: { summary: 'SpacingValue | ResponsiveValue<SpacingValue>' },
        category: 'Short Props - Margin',
      },
    },
    me: {
      control: 'text',
      description: 'Margin inline end (right in LTR, left in RTL). Uses spacing scale.',
      table: {
        type: { summary: 'SpacingValue | ResponsiveValue<SpacingValue>' },
        category: 'Short Props - Margin',
      },
    },

    // Short Props - Padding
    p: {
      control: 'text',
      description: 'Padding (all sides). Accepts spacing scale tokens (none, xs, sm, md, lg, xl, xxl, xxxl) or numbers. Example: "lg" or 16',
      table: {
        type: { summary: 'SpacingValue | ResponsiveValue<SpacingValue>' },
        defaultValue: { summary: 'undefined' },
        category: 'Short Props - Padding',
      },
    },
    pt: {
      control: 'text',
      description: 'Padding top. Uses spacing scale.',
      table: {
        type: { summary: 'SpacingValue | ResponsiveValue<SpacingValue>' },
        category: 'Short Props - Padding',
      },
    },
    pr: {
      control: 'text',
      description: 'Padding right. Uses spacing scale.',
      table: {
        type: { summary: 'SpacingValue | ResponsiveValue<SpacingValue>' },
        category: 'Short Props - Padding',
      },
    },
    pb: {
      control: 'text',
      description: 'Padding bottom. Uses spacing scale.',
      table: {
        type: { summary: 'SpacingValue | ResponsiveValue<SpacingValue>' },
        category: 'Short Props - Padding',
      },
    },
    pl: {
      control: 'text',
      description: 'Padding left. Uses spacing scale.',
      table: {
        type: { summary: 'SpacingValue | ResponsiveValue<SpacingValue>' },
        category: 'Short Props - Padding',
      },
    },
    px: {
      control: 'text',
      description: 'Padding inline (left + right). Uses spacing scale.',
      table: {
        type: { summary: 'SpacingValue | ResponsiveValue<SpacingValue>' },
        category: 'Short Props - Padding',
      },
    },
    py: {
      control: 'text',
      description: 'Padding block (top + bottom). Uses spacing scale.',
      table: {
        type: { summary: 'SpacingValue | ResponsiveValue<SpacingValue>' },
        category: 'Short Props - Padding',
      },
    },
    ps: {
      control: 'text',
      description: 'Padding inline start (left in LTR, right in RTL). Uses spacing scale.',
      table: {
        type: { summary: 'SpacingValue | ResponsiveValue<SpacingValue>' },
        category: 'Short Props - Padding',
      },
    },
    pe: {
      control: 'text',
      description: 'Padding inline end (right in LTR, left in RTL). Uses spacing scale.',
      table: {
        type: { summary: 'SpacingValue | ResponsiveValue<SpacingValue>' },
        category: 'Short Props - Padding',
      },
    },

    // Short Props - Size
    w: {
      control: 'text',
      description: 'Width. Accepts CSS values (px, %, rem, vw, etc.) or numbers. Example: "300px" or "50%" or 300',
      table: {
        type: { summary: 'Width | ResponsiveValue<Width>' },
        category: 'Short Props - Size',
      },
    },
    h: {
      control: 'text',
      description: 'Height. Accepts CSS values (px, %, rem, vh, etc.) or numbers. Example: "200px" or "100%" or 200',
      table: {
        type: { summary: 'Height | ResponsiveValue<Height>' },
        category: 'Short Props - Size',
      },
    },
    miw: {
      control: 'text',
      description: 'Min width. Uses spacing scale or CSS values.',
      table: {
        type: { summary: 'MinWidth | ResponsiveValue<MinWidth>' },
        category: 'Short Props - Size',
      },
    },
    maw: {
      control: 'text',
      description: 'Max width. Uses spacing scale or CSS values.',
      table: {
        type: { summary: 'MaxWidth | ResponsiveValue<MaxWidth>' },
        category: 'Short Props - Size',
      },
    },
    mih: {
      control: 'text',
      description: 'Min height. Uses spacing scale or CSS values.',
      table: {
        type: { summary: 'MinHeight | ResponsiveValue<MinHeight>' },
        category: 'Short Props - Size',
      },
    },
    mah: {
      control: 'text',
      description: 'Max height. Uses spacing scale or CSS values.',
      table: {
        type: { summary: 'MaxHeight | ResponsiveValue<MaxHeight>' },
        category: 'Short Props - Size',
      },
    },

    // Short Props - Position
    top: {
      control: 'text',
      description: 'Top position. Uses CSS values (px, %, rem, etc.). Requires position prop to be set.',
      table: {
        type: { summary: 'Top | ResponsiveValue<Top>' },
        category: 'Short Props - Position',
      },
    },
    left: {
      control: 'text',
      description: 'Left position. Uses CSS values (px, %, rem, etc.). Requires position prop to be set.',
      table: {
        type: { summary: 'Left | ResponsiveValue<Left>' },
        category: 'Short Props - Position',
      },
    },
    bottom: {
      control: 'text',
      description: 'Bottom position. Uses CSS values (px, %, rem, etc.). Requires position prop to be set.',
      table: {
        type: { summary: 'Bottom | ResponsiveValue<Bottom>' },
        category: 'Short Props - Position',
      },
    },
    right: {
      control: 'text',
      description: 'Right position. Uses CSS values (px, %, rem, etc.). Requires position prop to be set.',
      table: {
        type: { summary: 'Right | ResponsiveValue<Right>' },
        category: 'Short Props - Position',
      },
    },

    // Dollar Props - Note: These are dynamically typed, so we document the most common ones
    $display: {
      control: 'text',
      description: 'CSS display property. Example: "flex", "grid", "block", "inline-block", "none"',
      table: {
        type: { summary: 'Display | ResponsiveValue<Display>' },
        category: 'Dollar Props - Layout',
      },
    },
    $position: {
      control: 'select',
      options: ['static', 'relative', 'absolute', 'fixed', 'sticky'],
      description: 'CSS position property.',
      table: {
        type: { summary: 'Position | ResponsiveValue<Position>' },
        category: 'Dollar Props - Layout',
      },
    },
    $flexDirection: {
      control: 'select',
      options: ['row', 'row-reverse', 'column', 'column-reverse'],
      description: 'CSS flex-direction property.',
      table: {
        type: { summary: 'FlexDirection | ResponsiveValue<FlexDirection>' },
        category: 'Dollar Props - Layout',
      },
    },
    $alignItems: {
      control: 'select',
      options: ['flex-start', 'center', 'flex-end', 'stretch', 'baseline'],
      description: 'CSS align-items property.',
      table: {
        type: { summary: 'AlignItems | ResponsiveValue<AlignItems>' },
        category: 'Dollar Props - Layout',
      },
    },
    $justifyContent: {
      control: 'select',
      options: ['flex-start', 'center', 'flex-end', 'space-between', 'space-around', 'space-evenly'],
      description: 'CSS justify-content property.',
      table: {
        type: { summary: 'JustifyContent | ResponsiveValue<JustifyContent>' },
        category: 'Dollar Props - Layout',
      },
    },
    $gap: {
      control: { type: 'number', min: 0, max: 100 },
      description: 'CSS gap property (for flex and grid). Accepts numbers (pixels) or CSS values.',
      table: {
        type: { summary: 'Gap | ResponsiveValue<Gap>' },
        category: 'Dollar Props - Layout',
      },
    },
    $backgroundColor: {
      control: 'color',
      description: 'CSS background-color property. Accepts any valid CSS color value.',
      table: {
        type: { summary: 'BackgroundColor | ResponsiveValue<BackgroundColor>' },
        category: 'Dollar Props - Visual',
      },
    },
    $color: {
      control: 'color',
      description: 'CSS color property for text. Accepts any valid CSS color value.',
      table: {
        type: { summary: 'Color | ResponsiveValue<Color>' },
        category: 'Dollar Props - Visual',
      },
    },
    $border: {
      control: 'text',
      description: 'CSS border property. Example: "1px solid #ccc"',
      table: {
        type: { summary: 'Border | ResponsiveValue<Border>' },
        category: 'Dollar Props - Visual',
      },
    },
    $borderRadius: {
      control: { type: 'number', min: 0, max: 50 },
      description: 'CSS border-radius property. Accepts numbers (pixels) or CSS values.',
      table: {
        type: { summary: 'BorderRadius | ResponsiveValue<BorderRadius>' },
        category: 'Dollar Props - Visual',
      },
    },
    $boxShadow: {
      control: 'text',
      description: 'CSS box-shadow property. Example: "0 2px 8px rgba(0,0,0,0.1)"',
      table: {
        type: { summary: 'BoxShadow | ResponsiveValue<BoxShadow>' },
        category: 'Dollar Props - Visual',
      },
    },
    $fontSize: {
      control: { type: 'number', min: 8, max: 72 },
      description: 'CSS font-size property. Accepts numbers (pixels) or CSS values.',
      table: {
        type: { summary: 'FontSize | ResponsiveValue<FontSize>' },
        category: 'Dollar Props - Typography',
      },
    },
    $fontWeight: {
      control: 'select',
      options: ['normal', 'bold', '100', '200', '300', '400', '500', '600', '700', '800', '900'],
      description: 'CSS font-weight property.',
      table: {
        type: { summary: 'FontWeight | ResponsiveValue<FontWeight>' },
        category: 'Dollar Props - Typography',
      },
    },
    $lineHeight: {
      control: { type: 'number', min: 1, max: 3, step: 0.1 },
      description: 'CSS line-height property. Accepts numbers or CSS values.',
      table: {
        type: { summary: 'LineHeight | ResponsiveValue<LineHeight>' },
        category: 'Dollar Props - Typography',
      },
    },
    $textAlign: {
      control: 'select',
      options: ['left', 'center', 'right', 'justify'],
      description: 'CSS text-align property.',
      table: {
        type: { summary: 'TextAlign | ResponsiveValue<TextAlign>' },
        category: 'Dollar Props - Typography',
      },
    },
  },
};

export default meta;
type Story = StoryObj<BoxProps>;

/**
 * ## Interactive Usage Example
 * 
 * This story demonstrates the full capabilities of the Box component with interactive controls.
 * 
 * ### What You Can Do:
 * - **Adjust spacing** using short props (p, m, px, py)
 * - **Change colors** for background and text
 * - **Modify layout** with flexbox properties
 * - **Set dimensions** with width and height
 * - **Apply visual styling** like borders and shadows
 * - **Experiment with typography** settings
 * 
 * ### Try These Patterns:
 * 
 * **Card Layout:**
 * ```tsx
 * <Box
 *   p="lg"
 *   $backgroundColor="#ffffff"
 *   $border="1px solid #e0e0e0"
 *   $borderRadius={8}
 *   $boxShadow="0 2px 8px rgba(0,0,0,0.1)"
 * >
 *   Card content
 * </Box>
 * ```
 * 
 * **Flexbox Container:**
 * ```tsx
 * <Box
 *   $display="flex"
 *   $gap={16}
 *   $alignItems="center"
 *   $justifyContent="space-between"
 * >
 *   Flex items
 * </Box>
 * ```
 * 
 * **Responsive Design:**
 * ```tsx
 * <Box
 *   $padding={{ xs: 8, md: 16, lg: 24 }}
 *   $fontSize={{ xs: 14, md: 16, lg: 18 }}
 * >
 *   Responsive content
 * </Box>
 * ```
 * 
 * **Component Composition:**
 * ```tsx
 * <Box asChild $padding="md" $backgroundColor="blue">
 *   <button>Styled Button</button>
 * </Box>
 * ```
 */
export const Usage: Story = {
  args: {
    // Content
    children: 'Box Component - Foundation of the Layout System',
    
    // Core props
    asChild: false,
    styleReset: false,
    
    // Short props - Padding
    p: 'lg',
    
    // Short props - Margin
    m: 'md',
    
    // Short props - Size
    w: 400,
    
    // Dollar props - Layout
    $display: 'flex',
    $alignItems: 'center',
    $justifyContent: 'center',
    
    // Dollar props - Visual
    $backgroundColor: '#f5f5f5',
    $color: '#333333',
    $border: '1px solid #e0e0e0',
    $borderRadius: 8,
    $boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    
    // Dollar props - Typography
    $fontSize: 16,
    $fontWeight: '500',
    $textAlign: 'center',
    $lineHeight: 1.5,
    
    // Dollar props - Spacing
    $minHeight: 120,
  },
  parameters: {
    docs: {
      description: {
        story: `
This interactive story showcases the Box component with realistic default values. 
Use the **Controls** panel below to experiment with different props and see how they affect the component.

**Key Features Demonstrated:**
- Short props for spacing (p, m) using the spacing scale
- Dollar props for all CSS properties
- Visual styling with colors, borders, and shadows
- Flexbox layout capabilities
- Typography controls

**Tips:**
- Try changing \`$display\` to "grid" or "block"
- Experiment with spacing values: "xs", "sm", "md", "lg", "xl", "xxl", "xxxl"
- Toggle \`asChild\` to see composition in action (requires child element in your implementation)
- Adjust \`containerWidth\` to test responsive behavior
        `,
      },
      source: {
        state: 'open',
        transform: (code: string) => {
          // Clean up the code display for better readability
          return code
            .replace(/children:\s*"[^"]*"/g, 'children="Your content here"')
            .replace(/\n\s*\n/g, '\n');
        },
      },
    },
  },
};