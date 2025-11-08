import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { AspectRatio } from '../components/AspectRatio';
import type { AspectRatioProps } from '../components/AspectRatio/AspectRatio.types';
import type { ResponsiveValue } from '../types';

const meta: Meta<AspectRatioProps> = {
    title: 'Components/Layouts/AspectRatio',
    component: AspectRatio,
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component: `
A component that maintains a constant aspect ratio between width and height, perfect for images, videos, maps, and other media with consistent proportions.

## Key Features

- **Automatic Sizing**: Automatically applies \`width: '100%'\` and \`height: '100%'\` to child elements
- **CSS Padding Technique**: Uses the padding-bottom percentage technique for reliable aspect ratio maintenance
- **Responsive Values**: Supports responsive aspect ratios using breakpoint objects
- **Container Width Measurement**: Automatically measures container width for responsive calculations
- **Box-based Styling**: Inherits all Box component styling capabilities (spacing, size, position, CSS props)
- **Single Child Only**: Enforced at runtime - accepts only one React element as children

## When to Use

- **Images**: Maintain consistent image proportions with object-fit cover/contain
- **Videos**: Create video player containers with 16:9 or other standard ratios
- **Iframes**: Embed maps, forms, or external content with fixed aspect ratios
- **Cards**: Design card components with consistent media sections
- **Hero Sections**: Build responsive hero images that maintain proportions
- **Galleries**: Create uniform image galleries with consistent aspect ratios

## Aspect Ratio Technique

The component uses the CSS padding-bottom percentage technique:
1. Creates an invisible placeholder element with padding-bottom percentage
2. Positions content absolutely to fill the aspect ratio container
3. Maintains proportions regardless of container size changes
4. Works seamlessly with responsive layouts and container queries

## Responsive Behavior

- **With containerWidth**: Full responsive functionality - aspect ratio changes at breakpoints
- **Without containerWidth**: Falls back to first valid key from responsive object or auto-measures
- **Auto-measurement**: Component automatically measures its width using ResizeObserver

## Children Requirements

⚠️ **Important**: Only accepts a single React element as children. Multiple children, strings, numbers, or fragments will cause runtime/TypeScript errors.

**Correct Usage:**
\`\`\`tsx
// ✅ Single element
<AspectRatio ratio={16/9}>
  <img src="..." />
</AspectRatio>

// ✅ Multiple children wrapped
<AspectRatio ratio={16/9}>
  <div>
    <img src="..." />
    <div>Overlay</div>
  </div>
</AspectRatio>
\`\`\`

**Incorrect Usage:**
\`\`\`tsx
// ❌ Multiple children
<AspectRatio ratio={16/9}>
  <img src="..." />
  <div>Overlay</div>
</AspectRatio>

// ❌ String child
<AspectRatio ratio={16/9}>
  Text content
</AspectRatio>
\`\`\`

## Accessibility

- Use semantic HTML elements inside AspectRatio (\`<img>\`, \`<video>\`, \`<iframe>\`)
- Provide alt text for images
- Ensure embedded content (iframes) has appropriate titles
- Consider loading states for media content
- Test with keyboard navigation for interactive content

## Common Aspect Ratios

- **16:9** (1.778): Widescreen video, modern displays
- **4:3** (1.333): Classic photos, older displays
- **1:1** (1): Square images, profile pictures, Instagram
- **21:9** (2.333): Ultrawide displays, cinematic content
- **3:4** (0.75): Portrait orientation
- **2:3** (0.667): Portrait photos

## Best Practices

**Do:**
- ✅ Use for media content that needs consistent proportions
- ✅ Combine with object-fit for images (cover, contain, fill)
- ✅ Provide containerWidth for responsive aspect ratios when needed
- ✅ Wrap multiple children in a single container element
- ✅ Use appropriate semantic HTML elements as children
- ✅ Add loading states for images/videos

**Don't:**
- ❌ Use for text content without media
- ❌ Provide multiple children without wrapping
- ❌ Use string or number children directly
- ❌ Forget object-fit on images (may distort)
- ❌ Nest AspectRatio components unnecessarily
        `,
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        // Component-specific props
        ratio: {
            control: 'number',
            description: 'Aspect ratio as width/height (e.g., 16/9 = 1.778, 4/3 = 1.333, 1 = 1.0). Supports responsive values.',
            table: {
                category: 'Component',
                type: { summary: 'number | ResponsiveValue<number>' },
                defaultValue: { summary: '1' },
            },
        },
        containerWidth: {
            control: 'number',
            description: 'Fixed container width in pixels for responsive calculations. When provided, enables full responsive behavior.',
            table: {
                category: 'Component',
                type: { summary: 'number' },
            },
        },

        // Spacing - Margin
        m: {
            control: 'text',
            description: 'Margin on all sides (e.g., "md", "lg", "1rem")',
            table: { category: 'Spacing - Margin' },
        },
        mt: {
            control: 'text',
            description: 'Margin top',
            table: { category: 'Spacing - Margin' },
        },
        mb: {
            control: 'text',
            description: 'Margin bottom',
            table: { category: 'Spacing - Margin' },
        },
        ml: {
            control: 'text',
            description: 'Margin left',
            table: { category: 'Spacing - Margin' },
        },
        mr: {
            control: 'text',
            description: 'Margin right',
            table: { category: 'Spacing - Margin' },
        },
        mx: {
            control: 'text',
            description: 'Margin horizontal (left and right)',
            table: { category: 'Spacing - Margin' },
        },
        my: {
            control: 'text',
            description: 'Margin vertical (top and bottom)',
            table: { category: 'Spacing - Margin' },
        },

        // Spacing - Padding
        p: {
            control: 'text',
            description: 'Padding on all sides',
            table: { category: 'Spacing - Padding' },
        },
        pt: {
            control: 'text',
            description: 'Padding top',
            table: { category: 'Spacing - Padding' },
        },
        pb: {
            control: 'text',
            description: 'Padding bottom',
            table: { category: 'Spacing - Padding' },
        },
        pl: {
            control: 'text',
            description: 'Padding left',
            table: { category: 'Spacing - Padding' },
        },
        pr: {
            control: 'text',
            description: 'Padding right',
            table: { category: 'Spacing - Padding' },
        },
        px: {
            control: 'text',
            description: 'Padding horizontal (left and right)',
            table: { category: 'Spacing - Padding' },
        },
        py: {
            control: 'text',
            description: 'Padding vertical (top and bottom)',
            table: { category: 'Spacing - Padding' },
        },

        // Size props
        w: {
            control: 'text',
            description: 'Width of the aspect ratio container (default: "100%")',
            table: { category: 'Size' },
        },
        h: {
            control: 'text',
            description: 'Height (not recommended - aspect ratio controls height)',
            table: { category: 'Size' },
        },
        miw: {
            control: 'text',
            description: 'Min width',
            table: { category: 'Size' },
        },
        maw: {
            control: 'text',
            description: 'Max width',
            table: { category: 'Size' },
        },
        mih: {
            control: 'text',
            description: 'Min height',
            table: { category: 'Size' },
        },
        mah: {
            control: 'text',
            description: 'Max height',
            table: { category: 'Size' },
        },

        // Position props
        pos: {
            control: 'text',
            description: 'CSS position',
            table: { category: 'Position' },
        },
        top: {
            control: 'text',
            description: 'Top position',
            table: { category: 'Position' },
        },
        bottom: {
            control: 'text',
            description: 'Bottom position',
            table: { category: 'Position' },
        },
        left: {
            control: 'text',
            description: 'Left position',
            table: { category: 'Position' },
        },
        right: {
            control: 'text',
            description: 'Right position',
            table: { category: 'Position' },
        },
        inset: {
            control: 'text',
            description: 'Inset (shorthand for top, right, bottom, left)',
            table: { category: 'Position' },
        },

        // HTML attributes
        id: {
            control: 'text',
            description: 'HTML id attribute',
            table: { category: 'HTML Attributes' },
        },
        className: {
            control: 'text',
            description: 'CSS class name',
            table: { category: 'HTML Attributes' },
        },
        style: {
            control: 'object',
            description: 'Inline styles',
            table: { category: 'HTML Attributes' },
        },
        asChild: {
            control: 'boolean',
            description: 'Merge props into child element instead of wrapping',
            table: { category: 'HTML Attributes' },
        },
        styleReset: {
            control: 'boolean',
            description: 'Reset default styles',
            table: { category: 'HTML Attributes' },
        },
    },
};

export default meta;
type Story = StoryObj<AspectRatioProps>;

export const Usage: Story = {
    args: {
        ratio: 16 / 9,
        w: '400px',
        containerWidth: undefined,
    },
    render: (args) => (
        <div style={{ width: '100%', maxWidth: '1200px', margin: '0 auto' }}>
            {/* Hero Section */}
            <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
                <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1rem', color: '#1a1a1a' }}>
                    AspectRatio Component
                </h1>
                <p style={{ fontSize: '1.125rem', color: '#666', maxWidth: '600px', margin: '0 auto', lineHeight: '1.6' }}>
                    Maintain consistent aspect ratios for images, videos, and embedded content with automatic sizing and responsive support.
                </p>
            </div>

            {/* Interactive Demo */}
            <div style={{ marginBottom: '3rem' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: '#333' }}>
                    Interactive Demo
                </h2>
                <p style={{ fontSize: '0.875rem', color: '#666', marginBottom: '1.5rem' }}>
                    Adjust the <strong>ratio</strong> and <strong>w</strong> controls to see how AspectRatio maintains proportions.
                </p>
                <div style={{
                    padding: '2rem',
                    backgroundColor: '#f8f9fa',
                    borderRadius: '8px',
                    display: 'flex',
                    justifyContent: 'center',
                }}>
                    <AspectRatio {...args}>
                        <div
                            style={{
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white',
                                fontSize: '1rem',
                                fontWeight: 'bold',
                                textAlign: 'center',
                                borderRadius: '8px',
                                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                                padding: '1rem',
                            }}
                        >
                            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📐</div>
                            <div style={{ marginBottom: '0.5rem' }}>Aspect Ratio Content</div>
                            <div style={{ fontSize: '0.875rem', opacity: 0.9 }}>
                                Ratio: {typeof args.ratio === 'number' ? args.ratio.toFixed(3) : 'responsive'}
                            </div>
                            <div style={{ fontSize: '0.875rem', opacity: 0.9 }}>
                                Width: {args.w || '100%'}
                            </div>
                        </div>
                    </AspectRatio>
                </div>
            </div>

            {/* Real-World Examples */}
            <div style={{ marginBottom: '3rem' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: '#333' }}>
                    Real-World Examples
                </h2>
                <p style={{ fontSize: '0.875rem', color: '#666', marginBottom: '2rem' }}>
                    See AspectRatio in action with actual images, videos, and iframe embeds.
                </p>

                {/* Image Example */}
                <div style={{ marginBottom: '2.5rem' }}>
                    <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.75rem', color: '#1976d2' }}>
                        📷 Image with Object-Fit Cover
                    </h3>
                    <p style={{ fontSize: '0.875rem', color: '#666', marginBottom: '1rem' }}>
                        Using <code>object-fit: cover</code> to fill the aspect ratio container while maintaining image proportions.
                    </p>
                    <AspectRatio ratio={16 / 9} w="100%" maw="800px">
                        <img
                            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=675&fit=crop"
                            alt="Mountain landscape"
                            style={{
                                objectFit: 'cover',
                                borderRadius: '8px',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                            }}
                        />
                    </AspectRatio>
                </div>

                {/* Video Example */}
                <div style={{ marginBottom: '2.5rem' }}>
                    <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.75rem', color: '#ff9800' }}>
                        🎬 Video Embed (YouTube)
                    </h3>
                    <p style={{ fontSize: '0.875rem', color: '#666', marginBottom: '1rem' }}>
                        Perfect 16:9 container for YouTube embeds. The iframe automatically fills the aspect ratio.
                    </p>
                    <AspectRatio ratio={16 / 9} w="100%" maw="800px">
                        <iframe
                            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                            title="YouTube video player"
                            style={{ border: 'none', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    </AspectRatio>
                </div>

                {/* Iframe/Map Example */}
                <div style={{ marginBottom: '2.5rem' }}>
                    <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.75rem', color: '#4caf50' }}>
                        🗺️ Map Embed (Google Maps)
                    </h3>
                    <p style={{ fontSize: '0.875rem', color: '#666', marginBottom: '1rem' }}>
                        Using 4:3 aspect ratio for map embeds. Consistent sizing across different viewport sizes.
                    </p>
                    <AspectRatio ratio={4 / 3} w="100%" maw="800px">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.15830869428!2d-74.11976383964465!3d40.69766374874431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1234567890123!5m2!1sen!2s"
                            title="Google Maps embed"
                            style={{ border: 'none', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                    </AspectRatio>
                </div>

                {/* Square Image Example */}
                <div style={{ marginBottom: '2.5rem' }}>
                    <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.75rem', color: '#9c27b0' }}>
                        🖼️ Square Image (1:1 Ratio)
                    </h3>
                    <p style={{ fontSize: '0.875rem', color: '#666', marginBottom: '1rem' }}>
                        Perfect for profile pictures, product images, or Instagram-style content.
                    </p>
                    <AspectRatio ratio={1} w="100%" maw="400px">
                        <img
                            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=675&fit=crop"
                            alt="Portrait"
                            style={{
                                objectFit: 'cover',
                                borderRadius: '8px',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                            }}
                        />
                    </AspectRatio>
                </div>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            source: {
                state: 'open',
                code: `// Basic 16:9 aspect ratio for video content
<AspectRatio ratio={16 / 9} w="400px">
  <img src="video-thumbnail.jpg" style={{ objectFit: 'cover' }} />
</AspectRatio>

// Square aspect ratio (1:1) for profile images
<AspectRatio ratio={1} w="200px">
  <img src="profile.jpg" style={{ objectFit: 'cover' }} />
</AspectRatio>

// Classic photo aspect ratio (4:3)
<AspectRatio ratio={4 / 3} w="300px">
  <img src="landscape.jpg" style={{ objectFit: 'cover' }} />
</AspectRatio>

// Responsive aspect ratio with containerWidth
<AspectRatio 
  ratio={{ xs: 1, md: 16 / 9 }} 
  containerWidth={600}
  w="100%"
>
  <video controls />
</AspectRatio>

// Video player container
<AspectRatio ratio={16 / 9} w="500px">
  <iframe 
    src="https://www.youtube.com/embed/dQw4w9WgXcQ"
    style={{ border: 'none' }}
    allowFullScreen
  />
</AspectRatio>

// Multiple children wrapped in container
<AspectRatio ratio={16 / 9} w="400px">
  <div style={{ position: 'relative' }}>
    <img src="background.jpg" style={{ objectFit: 'cover' }} />
    <div style={{ 
      position: 'absolute', 
      top: 10, 
      left: 10,
      color: 'white',
      fontWeight: 'bold'
    }}>
      Overlay Text
    </div>
  </div>
</AspectRatio>`,
            },
        },
    },
};

