# AspectRatio

> A container component that maintains a constant aspect ratio for its child element.

**Package:** @apvee/react-layout-kit  
**Component Type:** Container  
**Since:** v1.0.0

---

## Overview

AspectRatio is a container component that maintains a constant width-to-height ratio for a single child element, regardless of the container size. It's perfect for displaying media content (images, videos, embeds) or creating consistent proportional layouts that need to scale responsively while preserving their aspect ratio.

AspectRatio enables you to:
- Maintain consistent proportions for images, videos, iframes, and custom content
- Prevent layout shifts during content loading (CLS optimization)
- Create responsive media containers that scale correctly
- Support common aspect ratios (16:9, 4:3, 1:1, 21:9) and custom ratios
- Optionally use responsive aspect ratios at different breakpoints

The component uses the classic CSS "padding-bottom" technique to create an intrinsic aspect ratio container. The child element is automatically positioned to fill the container with `width: 100%` and `height: 100%` applied via the `asChild` pattern, ensuring it always matches the aspect ratio dimensions.

**Important:** AspectRatio only accepts a **single React element** as children (enforced with `React.Children.only`). If you need multiple elements, wrap them in a single container.

## Features

- ✅ **Constant Aspect Ratio**: Maintains proportions regardless of container size changes
- ✅ **Single Child Enforcement**: TypeScript and runtime validation for single child element
- ✅ **Automatic Sizing**: Child automatically receives width: 100% and height: 100%
- ✅ **Responsive Ratios**: Support for different aspect ratios at different breakpoints (with containerWidth)
- ✅ **Common Ratios**: Support for standard ratios (16:9, 4:3, 1:1, 21:9, etc.)
- ✅ **Media-Friendly**: Perfect for images, videos, iframes, and embeds
- ✅ **CLS Prevention**: Prevents cumulative layout shift during content loading
- ✅ **Box Integration**: Inherits all Box styling capabilities (padding, margin, borders, etc.)
- ✅ **Performance Optimized**: Uses CSS padding-bottom technique for native performance
- ✅ **Type-Safe**: Full TypeScript support with proper child element typing

## Props

### AspectRatioProps

Extends `BaseBoxProps` (excluding `children`) to inherit Box styling capabilities with a modified children type.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `ratio` | `ResponsiveValue<number>` | `1` | Aspect ratio as width/height (e.g., `16/9`, `4/3`, `1`). Controls the proportional relationship between width and height. The component maintains this ratio regardless of container size. Supports responsive values (requires `containerWidth` for proper resolution). |
| `children` | `React.ReactElement` | **Required** | **Single child element** that will fill the aspect ratio container. The child automatically receives `width: '100%'` and `height: '100%'` styles. Must be a valid React element - strings, numbers, or fragments are not allowed. For multiple children, wrap them in a single container element. |
| `w` | `ResponsiveValue<string \| number>` | `"100%"` | Width of the AspectRatio container. Inherited from BaseBoxProps. The aspect ratio is maintained relative to this width. |

### Inherited Props

**From BaseBoxProps:**
- `asChild`, `containerWidth`, `styleReset` (see Box documentation)
- All standard HTML div attributes (`className`, `style`, `onClick`, etc.)

**Short Props** (from IShortStyleBoxProps):
- Spacing: `m`, `mt`, `mr`, `mb`, `ml`, `mx`, `my`, `p`, `pt`, `pr`, `pb`, `pl`, `px`, `py`
- Sizing: `w`, `h`, `miw`, `mih`, `maw`, `mah`
- [View complete short props reference](./short-props.md)

**Dollar Props** (from DollarCssProps):
- Any CSS property prefixed with `$` (e.g., `$display`, `$backgroundColor`, `$borderRadius`)
- All dollar props support responsive values
- [View complete CSS properties reference](./dollar-props.md)

## Usage

### Basic 16:9 Video Aspect Ratio

```tsx
import { AspectRatio } from '@apvee/react-layout-kit';

function VideoThumbnail() {
  return (
    <AspectRatio ratio={16 / 9}>
      <img 
        src="/video-thumbnail.jpg" 
        alt="Video thumbnail"
        style={{ objectFit: 'cover' }}
      />
    </AspectRatio>
  );
}
```

### Square Aspect Ratio (1:1)

```tsx
import { AspectRatio } from '@apvee/react-layout-kit';

function ProfileImage() {
  return (
    <AspectRatio ratio={1} w="200px">
      <img 
        src="/profile.jpg" 
        alt="Profile"
        style={{ objectFit: 'cover', borderRadius: '8px' }}
      />
    </AspectRatio>
  );
}
```

### Classic Photo Aspect Ratio (4:3)

```tsx
import { AspectRatio } from '@apvee/react-layout-kit';

function PhotoGallery() {
  return (
    <AspectRatio ratio={4 / 3}>
      <img 
        src="/landscape.jpg" 
        alt="Landscape photo"
        style={{ objectFit: 'cover' }}
      />
    </AspectRatio>
  );
}
```

### Video Embed with iframe

```tsx
import { AspectRatio } from '@apvee/react-layout-kit';

function YouTubeEmbed() {
  return (
    <AspectRatio ratio={16 / 9} w="100%" maw="800px">
      <iframe 
        src="https://www.youtube.com/embed/dQw4w9WgXcQ"
        title="YouTube video"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        style={{ border: 'none' }}
      />
    </AspectRatio>
  );
}
```

### Multiple Children with Overlay

```tsx
import { AspectRatio, Box } from '@apvee/react-layout-kit';

function ImageWithOverlay() {
  return (
    <AspectRatio ratio={16 / 9}>
      {/* Single child container wrapping multiple elements */}
      <Box $position="relative">
        <img 
          src="/background.jpg" 
          alt="Background"
          style={{ 
            width: '100%', 
            height: '100%', 
            objectFit: 'cover' 
          }}
        />
        
        <Box
          $position="absolute"
          $top={16}
          $left={16}
          p="md"
          $backgroundColor="rgba(0, 0, 0, 0.7)"
          $color="white"
          $borderRadius={8}
        >
          <h3 style={{ margin: 0 }}>Title</h3>
          <p style={{ margin: '4px 0 0', fontSize: '14px' }}>
            Description text
          </p>
        </Box>
      </Box>
    </AspectRatio>
  );
}
```

### Responsive Aspect Ratio

```tsx
import { AspectRatio } from '@apvee/react-layout-kit';

function ResponsiveMedia() {
  return (
    <AspectRatio 
      ratio={{ xs: 1, md: 4 / 3, lg: 16 / 9 }}
      containerWidth={undefined}  // Without containerWidth, falls back to first value (xs: 1)
    >
      <img 
        src="/responsive-image.jpg" 
        alt="Responsive"
        style={{ objectFit: 'cover' }}
      />
    </AspectRatio>
  );
}

// With containerWidth for proper responsive behavior
function ResponsiveMediaWithWidth() {
  return (
    <AspectRatio 
      ratio={{ xs: 1, md: 4 / 3, lg: 16 / 9 }}
      containerWidth={1024}  // Desktop size - resolves to 16/9
    >
      <img 
        src="/responsive-image.jpg" 
        alt="Responsive"
        style={{ objectFit: 'cover' }}
      />
    </AspectRatio>
  );
}
```

### Custom Ultrawide Ratio (21:9)

```tsx
import { AspectRatio, Box } from '@apvee/react-layout-kit';

function UltrawideBanner() {
  return (
    <AspectRatio ratio={21 / 9} w="100%">
      <Box
        $background="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
        $display="flex"
        $alignItems="center"
        $justifyContent="center"
        $color="white"
        style={{ fontSize: '1.5rem', fontWeight: 700 }}
      >
        Ultrawide Banner Content
      </Box>
    </AspectRatio>
  );
}
```

### With Fixed Width

```tsx
import { AspectRatio } from '@apvee/react-layout-kit';

function FixedSizeCard() {
  return (
    <AspectRatio 
      ratio={3 / 4} 
      w="300px"
      $border="1px solid #e2e8f0"
      $borderRadius={12}
      style={{ overflow: 'hidden' }}
    >
      <img 
        src="/card-image.jpg" 
        alt="Card"
        style={{ objectFit: 'cover' }}
      />
    </AspectRatio>
  );
}
```

### Portrait Aspect Ratio

```tsx
import { AspectRatio } from '@apvee/react-layout-kit';

function PortraitPhoto() {
  return (
    <AspectRatio ratio={3 / 4} w="100%" maw="400px">
      <img 
        src="/portrait.jpg" 
        alt="Portrait"
        style={{ objectFit: 'cover' }}
      />
    </AspectRatio>
  );
}
```

### Map Embed

```tsx
import { AspectRatio } from '@apvee/react-layout-kit';

function MapEmbed() {
  return (
    <AspectRatio ratio={16 / 9} w="100%">
      <iframe
        src="https://www.google.com/maps/embed?pb=..."
        title="Map location"
        style={{ border: 'none' }}
        loading="lazy"
      />
    </AspectRatio>
  );
}
```

### Custom Content with Aspect Ratio

```tsx
import { AspectRatio, Box } from '@apvee/react-layout-kit';

function CustomRatioContent() {
  return (
    <AspectRatio ratio={2 / 1}>
      <Box
        $display="flex"
        $flexDirection="column"
        $alignItems="center"
        $justifyContent="center"
        $backgroundColor="#f1f5f9"
        $border="2px dashed #cbd5e1"
        $borderRadius={8}
        p="lg"
      >
        <div style={{ fontSize: '2rem', marginBottom: '8px' }}>📐</div>
        <div style={{ fontWeight: 600, fontSize: '1.125rem' }}>
          2:1 Aspect Ratio
        </div>
        <div style={{ fontSize: '0.875rem', color: '#64748b', marginTop: '4px' }}>
          Custom proportions maintained
        </div>
      </Box>
    </AspectRatio>
  );
}
```

## Responsive Values

The `ratio` prop supports responsive values through breakpoint objects. However, responsive resolution requires the `containerWidth` prop for proper functionality.

### Default Breakpoints

- `xs`: 0px (mobile)
- `sm`: 576px (mobile landscape)
- `md`: 768px (tablet)
- `lg`: 992px (desktop)
- `xl`: 1200px (large desktop)
- `xxl`: 1400px (extra large desktop)
- `xxxl`: 1920px (ultra-wide)

### How Responsive Resolution Works

AspectRatio handles responsive values differently than other components:

1. **With `containerWidth` provided**: Responsive ratio is resolved based on the container width using the standard breakpoint system
2. **Without `containerWidth`**: Falls back to the **first valid value** in the responsive object to avoid circular dependency (since the component needs to measure its own width)

### Usage Examples

```tsx
// Direct value (non-responsive) - most common use case
<AspectRatio ratio={16 / 9}>
  <img src="image.jpg" alt="Image" />
</AspectRatio>

// Responsive with containerWidth - proper responsive behavior
<AspectRatio 
  ratio={{ xs: 1, md: 4 / 3, lg: 16 / 9 }}
  containerWidth={1024}  // Resolved to lg breakpoint = 16/9
>
  <img src="image.jpg" alt="Image" />
</AspectRatio>

// Responsive without containerWidth - uses fallback (first value)
<AspectRatio 
  ratio={{ xs: 1, md: 4 / 3, lg: 16 / 9 }}
  // No containerWidth: will use xs value (1) regardless of actual size
>
  <img src="image.jpg" alt="Image" />
</AspectRatio>
```

### Important Notes

- **Responsive ratios require `containerWidth`** for proper breakpoint resolution
- Without `containerWidth`, the first defined breakpoint value is used as fallback
- The `w` (width) prop can be responsive without requiring `containerWidth`
- Most use cases don't need responsive ratios - a single ratio value is typically sufficient
- You can customize breakpoints via TypeScript module augmentation (see TypeScript section)

### Common Patterns

```tsx
// Pattern 1: Fixed ratio, responsive width (recommended)
<AspectRatio 
  ratio={16 / 9}
  w={{ xs: '100%', md: '600px', lg: '800px' }}
>
  <img src="image.jpg" alt="Image" />
</AspectRatio>

// Pattern 2: Responsive ratio with explicit containerWidth
<AspectRatio 
  ratio={{ xs: 1, md: 16 / 9 }}
  containerWidth={768}  // Tablet size
  w="100%"
>
  <img src="image.jpg" alt="Image" />
</AspectRatio>

// Pattern 3: Simple fixed ratio (most common)
<AspectRatio ratio={16 / 9}>
  <img src="image.jpg" alt="Image" />
</AspectRatio>
```

[Learn more about responsive design →](./responsive-values.md)

## Best Practices

### Use Standard Aspect Ratios

Stick to common aspect ratios for familiar user experience:

```tsx
// ✅ Good - standard ratios
<AspectRatio ratio={16 / 9}>  {/* Widescreen video */}
<AspectRatio ratio={4 / 3}>   {/* Classic photo */}
<AspectRatio ratio={1}>       {/* Square */}
<AspectRatio ratio={21 / 9}>  {/* Ultrawide */}
<AspectRatio ratio={3 / 4}>   {/* Portrait */}

// ⚠️ Caution - unusual ratios may feel awkward
<AspectRatio ratio={7 / 5}>
<AspectRatio ratio={13 / 8}>
```

### Always Use Single Child Element

Wrap multiple children in a container:

```tsx
// ✅ Good - single child container
<AspectRatio ratio={16 / 9}>
  <div>
    <img src="background.jpg" alt="Background" />
    <div style={{ position: 'absolute', top: 10, left: 10 }}>
      Overlay
    </div>
  </div>
</AspectRatio>

// ❌ Incorrect - multiple children (will cause error)
<AspectRatio ratio={16 / 9}>
  <img src="background.jpg" alt="Background" />
  <div>Overlay</div>
</AspectRatio>
```

### Use object-fit for Images

Apply `object-fit` to images to control how they fill the aspect ratio:

```tsx
// ✅ Good - object-fit ensures proper scaling
<AspectRatio ratio={16 / 9}>
  <img 
    src="image.jpg" 
    alt="Image"
    style={{ objectFit: 'cover' }}  // or 'contain'
  />
</AspectRatio>

// ❌ Avoid - image may distort
<AspectRatio ratio={16 / 9}>
  <img src="image.jpg" alt="Image" />
</AspectRatio>
```

### Constrain Width, Not Height

Let height be determined by the aspect ratio:

```tsx
// ✅ Good - constrain width, height follows ratio
<AspectRatio ratio={16 / 9} w="100%" maw="800px">
  <img src="image.jpg" alt="Image" />
</AspectRatio>

// ❌ Avoid - setting height conflicts with aspect ratio
<AspectRatio ratio={16 / 9} w="800px" h="450px">
  <img src="image.jpg" alt="Image" />
</AspectRatio>
```

### Prevent CLS (Cumulative Layout Shift)

Use AspectRatio to reserve space before content loads:

```tsx
// ✅ Good - space reserved, no layout shift
<AspectRatio ratio={16 / 9}>
  <img 
    src="large-image.jpg" 
    alt="Image"
    loading="lazy"
    style={{ objectFit: 'cover' }}
  />
</AspectRatio>

// ❌ Avoid - causes layout shift as image loads
<img src="large-image.jpg" alt="Image" />
```

### Use Responsive Width, Not Responsive Ratio

In most cases, responsive width is more practical than responsive ratio:

```tsx
// ✅ Good - simpler and more predictable
<AspectRatio 
  ratio={16 / 9}
  w={{ xs: '100%', md: '600px', lg: '800px' }}
>
  <img src="image.jpg" alt="Image" />
</AspectRatio>

// ⚠️ Less common - needs containerWidth for proper behavior
<AspectRatio 
  ratio={{ xs: 1, md: 16 / 9 }}
  containerWidth={containerWidthValue}
>
  <img src="image.jpg" alt="Image" />
</AspectRatio>
```

### Add Border and Styling to Container

Apply borders, shadows, and backgrounds to the AspectRatio component:

```tsx
// ✅ Good - styling on container
<AspectRatio 
  ratio={16 / 9}
  $border="1px solid #e2e8f0"
  $borderRadius={12}
  $boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)"
  style={{ overflow: 'hidden' }}
>
  <img src="image.jpg" alt="Image" />
</AspectRatio>
```

### Performance Considerations

- AspectRatio uses pure CSS (padding-bottom technique) - no JavaScript calculations
- Child element is rendered via `asChild` for optimal performance
- Width measurement (when needed) is debounced via useElementWidth hook
- For static layouts, provide explicit width to avoid measurement overhead

### Accessibility Considerations

- Provide meaningful `alt` text for images
- Use `title` attribute for iframes and embeds
- Ensure sufficient contrast for text overlays
- Consider loading strategies (`loading="lazy"`) for images
- Provide keyboard-accessible controls for video/audio content

```tsx
// ✅ Good - accessible image
<AspectRatio ratio={16 / 9}>
  <img 
    src="image.jpg" 
    alt="Detailed description of the image content"
    loading="lazy"
    style={{ objectFit: 'cover' }}
  />
</AspectRatio>

// ✅ Good - accessible video
<AspectRatio ratio={16 / 9}>
  <video 
    controls
    aria-label="Video description"
  >
    <source src="video.mp4" type="video/mp4" />
    <track kind="captions" src="captions.vtt" />
  </video>
</AspectRatio>
```

## Related Components

### Built on Box

AspectRatio is built on Box:
- [Box](./box.md) - Foundational layout primitive with all styling capabilities

### Commonly Used Together

- [Container](./container.md) - Wrap AspectRatio in Container for max-width constraints
- [Grid](./grid.md) / [SimpleGrid](./simple-grid.md) - Create galleries of AspectRatio components
- [Stack](./stack.md) - Vertical stacking of multiple AspectRatio components
- [Flex](./flex.md) - Flexible layouts containing AspectRatio items

### Alternative Approaches

- **Native CSS `aspect-ratio`**: Modern browsers support the CSS `aspect-ratio` property, but AspectRatio provides better browser compatibility and additional features
- **Box with dollar props**: Use `$aspectRatio` dollar prop on Box for simpler cases (when single child constraint is not needed)

### Core Utilities

- [useElementWidth](../hooks/use-element-width.md) - Hook used internally for width measurement
- [useMergedRef](../hooks/use-merged-ref.md) - Hook for ref merging
- [useResponsiveResolvers](../hooks/use-responsive-resolvers.md) - Hook for responsive value resolution

## TypeScript

### Type Definitions

The component uses the following TypeScript types:

```typescript
import type { AspectRatioProps } from '@apvee/react-layout-kit';

// Using AspectRatioProps
const MyComponent: React.FC = () => {
  const props: AspectRatioProps = {
    ratio: 16 / 9,
    w: '100%',
    children: <img src="image.jpg" alt="Image" />,
  };
  
  return <AspectRatio {...props} />;
};
```

### Type Safety with Single Child

TypeScript enforces the single child constraint:

```typescript
import { AspectRatio } from '@apvee/react-layout-kit';

function TypeSafeComponent() {
  return (
    <>
      {/* ✅ Valid - single React element */}
      <AspectRatio ratio={16 / 9}>
        <img src="image.jpg" alt="Image" />
      </AspectRatio>

      {/* ✅ Valid - single element containing multiple children */}
      <AspectRatio ratio={16 / 9}>
        <div>
          <img src="image.jpg" alt="Image" />
          <div>Overlay</div>
        </div>
      </AspectRatio>

      {/* ❌ TypeScript error: multiple children not allowed */}
      {/* <AspectRatio ratio={16 / 9}>
        <img src="image.jpg" alt="Image" />
        <div>Overlay</div>
      </AspectRatio> */}

      {/* ❌ TypeScript error: string child not allowed */}
      {/* <AspectRatio ratio={16 / 9}>
        Text content
      </AspectRatio> */}
    </>
  );
}
```

### Responsive Value Types

```typescript
import type { ResponsiveValue } from '@apvee/react-layout-kit';
import { AspectRatio } from '@apvee/react-layout-kit';

function TypedResponsive() {
  // Type-safe responsive ratio
  const ratio: ResponsiveValue<number> = {
    xs: 1,
    md: 4 / 3,
    lg: 16 / 9
  };

  // Type-safe responsive width
  const width: ResponsiveValue<string | number> = {
    xs: '100%',
    md: '600px',
    lg: '800px'
  };

  return (
    <AspectRatio 
      ratio={ratio}
      w={width}
    >
      <img src="image.jpg" alt="Image" />
    </AspectRatio>
  );
}
```

### Common Aspect Ratio Constants

Create type-safe constants for common ratios:

```typescript
// types/aspect-ratios.ts
export const ASPECT_RATIOS = {
  SQUARE: 1,
  VIDEO_WIDESCREEN: 16 / 9,
  VIDEO_ULTRAWIDE: 21 / 9,
  PHOTO_CLASSIC: 4 / 3,
  PHOTO_PORTRAIT: 3 / 4,
  CINEMA: 2.35 / 1,
  GOLDEN: 1.618,
} as const;

export type AspectRatioPreset = typeof ASPECT_RATIOS[keyof typeof ASPECT_RATIOS];
```

Usage:

```typescript
import { AspectRatio } from '@apvee/react-layout-kit';
import { ASPECT_RATIOS } from './types/aspect-ratios';

function VideoPlayer() {
  return (
    <AspectRatio ratio={ASPECT_RATIOS.VIDEO_WIDESCREEN}>
      <video controls>
        <source src="video.mp4" type="video/mp4" />
      </video>
    </AspectRatio>
  );
}
```

### Customizing Breakpoints

You can customize the responsive breakpoints:

```typescript
// types/react-layout-kit.d.ts
declare module '@apvee/react-layout-kit' {
  interface CustomBreakpoints {
    mobile: 0;
    tablet: 768;
    desktop: 1024;
    wide: 1440;
  }
}
```

After customizing:

```tsx
// ✅ TypeScript knows about your custom breakpoints
<AspectRatio 
  ratio={{ mobile: 1, desktop: 16 / 9 }}
  containerWidth={1024}
>
  <img src="image.jpg" alt="Image" />
</AspectRatio>
```

[Learn more about configuration →](./customization.md)

### ForwardRef and Ref Types

AspectRatio properly forwards refs with correct typing:

```typescript
import { useRef } from 'react';
import { AspectRatio } from '@apvee/react-layout-kit';

function RefExample() {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    // ✅ Properly typed as HTMLDivElement
    console.log(containerRef.current?.offsetWidth);
  };

  return (
    <AspectRatio 
      ref={containerRef}
      ratio={16 / 9}
      onClick={handleClick}
    >
      <img src="image.jpg" alt="Image" />
    </AspectRatio>
  );
}
```

### Generic Helper Types

Create reusable configurations:

```typescript
import type { AspectRatioProps } from '@apvee/react-layout-kit';

// Configuration for video embeds
type VideoEmbedConfig = Pick<AspectRatioProps, 'ratio' | 'w'> & {
  maxWidth?: string;
};

const videoConfig: VideoEmbedConfig = {
  ratio: 16 / 9,
  w: '100%',
  maxWidth: '800px'
};

function VideoEmbed({ src }: { src: string }) {
  return (
    <AspectRatio {...videoConfig} maw={videoConfig.maxWidth}>
      <iframe src={src} title="Video" style={{ border: 'none' }} />
    </AspectRatio>
  );
}
```

## Notes and Warnings

### Browser Compatibility

- **Padding-bottom Technique**: Supported in all browsers (IE11+)
- **CSS `aspect-ratio` Property**: Modern alternative (Chrome 88+, Firefox 89+, Safari 15+), but not used by this component for maximum compatibility
- **ResizeObserver**: Used for width measurement. Supported in all modern browsers (Chrome 64+, Firefox 69+, Safari 13.1+, Edge 79+)
- For older browsers, provide explicit `w` prop to avoid measurement

### Single Child Requirement

- **Runtime Enforcement**: Component uses `React.Children.only()` which throws an error if multiple children are provided
- **TypeScript Enforcement**: The `children` prop type is `React.ReactElement` (not `React.ReactNode`)
- **Workaround**: Wrap multiple elements in a single container (div, Box, etc.)

```tsx
// ❌ Runtime error: "React.Children.only expected to receive a single React element child"
<AspectRatio ratio={16 / 9}>
  <img src="bg.jpg" alt="Background" />
  <div>Overlay</div>
</AspectRatio>

// ✅ Correct: single child wrapper
<AspectRatio ratio={16 / 9}>
  <div>
    <img src="bg.jpg" alt="Background" />
    <div>Overlay</div>
  </div>
</AspectRatio>
```

### Responsive Ratio Limitations

- **Requires containerWidth**: Responsive `ratio` resolution only works properly when `containerWidth` is provided
- **Fallback Behavior**: Without `containerWidth`, the first defined breakpoint value is used
- **Recommendation**: Use responsive `w` (width) instead of responsive `ratio` for simpler behavior

### Performance Considerations

- **Pure CSS Solution**: Uses padding-bottom technique with no JavaScript calculations during render
- **Width Measurement**: Optional width measurement via ResizeObserver (only when needed for responsive resolution)
- **Child Rendering**: Uses `asChild` pattern which adds minimal overhead
- **Best Performance**: Provide explicit `w` prop to avoid measurement

### Known Limitations

- **SSR**: Container width measurement doesn't work during server-side rendering
  - Solution: Provide explicit `w` prop or accept client-side hydration update
- **Child Must Accept Style Props**: The child element must accept and apply `width` and `height` styles
  - Most HTML elements and Box-based components work correctly
  - Custom components must forward style props to DOM element
- **No Min/Max Height**: The aspect ratio determines height; min/max height constraints may conflict with the ratio

### Common Mistakes

❌ **Multiple children without wrapper**:
```tsx
<AspectRatio ratio={16 / 9}>
  <img src="image.jpg" alt="Image" />
  <div>Text</div>  {/* Error! */}
</AspectRatio>
```

❌ **String or number children**:
```tsx
<AspectRatio ratio={16 / 9}>
  Text content  {/* Error! */}
</AspectRatio>
```

❌ **Setting conflicting height**:
```tsx
<AspectRatio ratio={16 / 9} h="400px">  {/* Height conflicts with ratio */}
  <img src="image.jpg" alt="Image" />
</AspectRatio>
```

❌ **Expecting responsive ratio without containerWidth**:
```tsx
<AspectRatio ratio={{ xs: 1, md: 16 / 9 }}>
  {/* Will use fallback (xs: 1) regardless of size */}
  <img src="image.jpg" alt="Image" />
</AspectRatio>
```

✅ **Correct patterns**:
```tsx
// Single element child
<AspectRatio ratio={16 / 9}>
  <img src="image.jpg" alt="Image" />
</AspectRatio>

// Multiple elements wrapped
<AspectRatio ratio={16 / 9}>
  <div>
    <img src="image.jpg" alt="Image" />
    <div>Text</div>
  </div>
</AspectRatio>

// Responsive width (simpler than responsive ratio)
<AspectRatio ratio={16 / 9} w={{ xs: '100%', md: '600px' }}>
  <img src="image.jpg" alt="Image" />
</AspectRatio>
```

### Migration from Native CSS aspect-ratio

If you're considering using the native CSS `aspect-ratio` property instead:

**Advantages of AspectRatio component:**
- Better browser compatibility (works in older browsers)
- Single child enforcement prevents mistakes
- Integration with Box styling system
- TypeScript type safety for children
- Consistent with other layout components

**When to use native CSS:**
- Targeting only modern browsers
- Need to apply aspect ratio to elements that can't be wrapped
- Prefer inline styles over component composition

---

**Next Steps:**
- Learn about [responsive design patterns](./responsive-values.md)
- Explore [Container component](./container.md) for max-width constraints
- See [Grid](./grid.md) and [SimpleGrid](./simple-grid.md) for creating galleries
- Review [Box component](./box.md) for foundational styling capabilities
