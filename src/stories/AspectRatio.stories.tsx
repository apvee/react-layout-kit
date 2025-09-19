import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { AspectRatioProps, AspectRatio } from '..';

const meta: Meta<AspectRatioProps> = {
    title: 'Components/Layouts/AspectRatio',
    component: AspectRatio,
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component: `
A component that maintains a constant aspect ratio between width and height.

## Features
- Maintains consistent aspect ratios for any content
- Responsive aspect ratio values using breakpoint objects
- Uses CSS padding-bottom technique for reliable ratio maintenance
- Perfect for images, videos, maps, and other media
- Container width measurement for responsive calculations
- Absolute positioning for content overlay
        `,
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        // Core props
        ratio: {
            control: 'number',
            description: 'Aspect ratio as width/height (e.g., 16/9 = 1.777, 4/3 = 1.333)',
        },
        containerWidth: {
            control: 'number',
            description: 'Fixed container width for responsive calculations',
        },
        w: {
            control: 'text',
            description: 'Width of the aspect ratio container',
        },
    },
};

export default meta;
type Story = StoryObj<AspectRatioProps>;

// Basic usage with different ratios
export const BasicUsage: Story = {
    render: () => (
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <AspectRatio ratio={16 / 9} w="300px">
                <div
                    style={{
                        width: '100%',
                        height: '100%',
                        backgroundColor: '#1976d2',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: '1rem',
                        fontWeight: 'bold',
                        border: '1px solid #0d47a1',
                        borderRadius: '4px',
                    }}
                >
                    16:9 Video
                </div>
            </AspectRatio>

            <AspectRatio ratio={1} w="200px">
                <div
                    style={{
                        width: '100%',
                        height: '100%',
                        backgroundColor: '#4caf50',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: '1rem',
                        fontWeight: 'bold',
                        border: '1px solid #2e7d32',
                        borderRadius: '4px',
                    }}
                >
                    1:1 Square
                </div>
            </AspectRatio>

            <AspectRatio ratio={4 / 3} w="250px">
                <div
                    style={{
                        width: '100%',
                        height: '100%',
                        backgroundColor: '#ff9800',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: '1rem',
                        fontWeight: 'bold',
                        border: '1px solid #ef6c00',
                        borderRadius: '4px',
                    }}
                >
                    4:3 Photo
                </div>
            </AspectRatio>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Basic aspect ratio examples: 16:9 for videos, 1:1 for squares, and 4:3 for photos.',
            },
        },
    },
};

// Image with object-fit cover
export const ImageExample: Story = {
    render: () => (
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <AspectRatio ratio={16 / 9} w="300px">
                <img
                    src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=450&fit=crop"
                    alt="Landscape"
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        borderRadius: '4px',
                        border: '1px solid #ddd',
                    }}
                />
            </AspectRatio>

            <AspectRatio ratio={1} w="200px">
                <img
                    src="https://images.unsplash.com/photo-1494790108755-2616c353b4b7?w=400&h=400&fit=crop&crop=face"
                    alt="Portrait"
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        borderRadius: '4px',
                        border: '1px solid #ddd',
                    }}
                />
            </AspectRatio>

            <AspectRatio ratio={4 / 3} w="250px">
                <img
                    src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&h=450&fit=crop"
                    alt="Nature"
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        borderRadius: '4px',
                        border: '1px solid #ddd',
                    }}
                />
            </AspectRatio>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Images with different aspect ratios using object-fit: cover to maintain proportions.',
            },
        },
    },
};

// Video placeholder example
export const VideoExample: Story = {
    render: () => (
        <AspectRatio ratio={16 / 9} w="500px">
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    backgroundColor: '#000',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '1rem',
                    borderRadius: '4px',
                    border: '1px solid #333',
                }}
            >
                <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>▶️</div>
                    <div>Video Player</div>
                    <div style={{ fontSize: '0.8rem', opacity: 0.7, marginTop: '0.5rem' }}>
                        16:9 aspect ratio
                    </div>
                </div>
            </div>
        </AspectRatio>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Video player container with 16:9 aspect ratio, perfect for YouTube or Vimeo embeds.',
            },
        },
    },
};

// Iframe/embed example
export const IframeExample: Story = {
    render: () => (
        <AspectRatio ratio={16 / 9} w="600px">
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    backgroundColor: '#f5f5f5',
                    border: '2px dashed #ccc',
                    borderRadius: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#666',
                    fontSize: '1rem',
                    textAlign: 'center',
                }}
            >
                <div>
                    <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🌐</div>
                    <div style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>
                        Iframe Placeholder
                    </div>
                    <div style={{ fontSize: '0.8rem' }}>
                        Maps, forms, or external content
                    </div>
                </div>
            </div>
        </AspectRatio>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Container for iframe embeds like maps, forms, or external content with consistent aspect ratio.',
            },
        },
    },
};

// Responsive aspect ratio
export const ResponsiveRatio: Story = {
    render: () => (
        <div style={{ width: '100%', maxWidth: '1024px', resize: 'horizontal', overflow: 'auto', border: '1px dashed #ccc', padding: '1rem' }}>
            <AspectRatio
                ratio={{ xs: 4 / 3, sm: 1, lg: 16 / 9 }}
                w="100%"
            >
                <div
                    style={{
                        width: '100%',
                        height: '100%',
                        backgroundColor: '#9c27b0',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: '1rem',
                        fontWeight: 'bold',
                        textAlign: 'center',
                        border: '1px solid #7b1fa2',
                        borderRadius: '4px',
                    }}
                >
                    <div>
                        <div>Responsive Aspect Ratio</div>
                        <div style={{ fontSize: '0.8rem', opacity: 0.9, marginTop: '0.5rem' }}>
                            xs: 1:1 • md: 4:3 • lg: 16:9
                        </div>
                    </div>
                </div>
            </AspectRatio>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Responsive aspect ratio that changes at different breakpoints. The component automatically measures container width. Try resizing the dashed container horizontally.',
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