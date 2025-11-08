import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { useElementWidth } from '../hooks/useElementWidth';
import { Box } from '../components/Box';

/**
 * Args interface for useElementWidth story controls
 */
interface UseElementWidthArgs {
  debounceMs: number;
  disabled: boolean;
}

/**
 * Meta configuration for useElementWidth hook story.
 * This hook measures element width using ResizeObserver with debouncing.
 */
const meta: Meta<UseElementWidthArgs> = {
  title: 'Hooks/useElementWidth',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
# useElementWidth Hook

A React hook that measures element width using the ResizeObserver API with intelligent debouncing for optimal performance.

## Key Features

- **ResizeObserver-Based**: Uses modern browser API for accurate, efficient width measurement
- **Smart Debouncing**: Initial size immediate, resize events debounced (default: 16ms = 60fps)
- **Performance Optimized**: Configurable debounce delay to balance responsiveness and CPU usage
- **SSR-Safe**: Gracefully handles server-side rendering with fallback behavior
- **Integer Values**: Returns Math.floor values for consistent CSS pixel alignment
- **Modern API Support**: Prefers borderBoxSize over contentRect when available
- **Automatic Cleanup**: Properly disconnects ResizeObserver on unmount

## When to Use

- **Custom Responsive Components**: Build components that react to their container width
- **Dynamic Layouts**: Adjust content based on available space
- **Performance Monitoring**: Track element size changes for analytics
- **Responsive Typography**: Scale text based on container width
- **Adaptive Visualizations**: Resize charts/graphics to fit container
- **Container Queries Polyfill**: Implement container-query-like behavior
- **Measurement Utilities**: Any scenario requiring width tracking

## When NOT to Use

- **Static Layouts**: If width doesn't change, use direct measurement instead
- **Server-Side Only**: Hook returns 0 during SSR (use static values)
- **High-Frequency Updates**: For sub-16ms precision, consider direct ResizeObserver
- **Simple Media Queries**: Use CSS media queries when viewport-based

## Technical Details

### ResizeObserver API
The hook leverages the ResizeObserver browser API which provides:
- Native browser-optimized resize detection
- Better performance than polling or window resize listeners
- Per-element observations (not window-level)
- Sub-pixel precision with \`borderBoxSize\`

### Debouncing Strategy
\`\`\`tsx
// Initial measurement: IMMEDIATE (no debounce)
const rect = element.getBoundingClientRect();
setWidth(Math.floor(rect.width)); // Instant feedback

// Subsequent resizes: DEBOUNCED
observerRef.current = new ResizeObserver((entries) => {
  debouncedSetWidth(newWidth); // Throttled updates
});
\`\`\`

**Why this approach?**
- First render needs immediate width for layout
- Resize events can fire 100+ times during drag → debounce prevents excessive re-renders
- Balances responsiveness with performance

### Debounce Timing Guide
- **16ms (default)**: 60fps smoothness, minimal lag
- **32ms**: 30fps, good for most use cases, better performance
- **100ms**: Noticeable lag but excellent for heavy computations
- **200ms+**: Only for expensive operations (complex calculations, network calls)

## API

\`\`\`typescript
function useElementWidth<T extends Element>(
  elementRef: React.RefObject<T>,
  options?: {
    disabled?: boolean;      // Disable measurement (returns 0)
    debounceMs?: number;     // Debounce delay (default: 16)
  }
): number; // Width in pixels (integer)
\`\`\`

## Basic Usage

\`\`\`tsx
import { useElementWidth } from '@apvee/react-layout-kit';

function ResponsiveCard() {
  const ref = React.useRef<HTMLDivElement>(null);
  const width = useElementWidth(ref);

  return (
    <div ref={ref}>
      Container width: {width}px
    </div>
  );
}
\`\`\`

## Advanced Patterns

### Custom Debounce
\`\`\`tsx
// Slow down updates for expensive operations
const width = useElementWidth(ref, { debounceMs: 100 });
\`\`\`

### Conditional Measurement
\`\`\`tsx
// Only measure when needed
const [shouldMeasure, setShouldMeasure] = React.useState(false);
const width = useElementWidth(ref, { disabled: !shouldMeasure });
\`\`\`

### Responsive Breakpoints
\`\`\`tsx
function ResponsiveComponent() {
  const ref = React.useRef<HTMLDivElement>(null);
  const width = useElementWidth(ref);

  // Custom breakpoint logic
  const isMobile = width < 640;
  const isTablet = width >= 640 && width < 1024;
  const isDesktop = width >= 1024;

  return (
    <div ref={ref}>
      {isMobile && <MobileLayout />}
      {isTablet && <TabletLayout />}
      {isDesktop && <DesktopLayout />}
    </div>
  );
}
\`\`\`

### Update Counter (Performance Monitoring)
\`\`\`tsx
function PerformanceMonitor() {
  const ref = React.useRef<HTMLDivElement>(null);
  const width = useElementWidth(ref, { debounceMs: 16 });
  const [updateCount, setUpdateCount] = React.useState(0);

  React.useEffect(() => {
    if (width > 0) {
      setUpdateCount(prev => prev + 1);
    }
  }, [width]);

  return (
    <div ref={ref} style={{ resize: 'horizontal', overflow: 'auto' }}>
      Width: {width}px | Updates: {updateCount}
    </div>
  );
}
\`\`\`

## Browser Support

- ✅ Chrome 64+
- ✅ Firefox 69+
- ✅ Safari 13.1+
- ✅ Edge 79+
- ❌ IE 11 (use polyfill or fallback)

## Performance Considerations

**Good:**
- ✅ Default 16ms debounce balances smoothness and performance
- ✅ Only one ResizeObserver per element
- ✅ Automatic cleanup prevents memory leaks
- ✅ Integer values reduce decimal comparison issues

**Watch Out:**
- ⚠️ Many instances (50+) may impact performance
- ⚠️ Very short debounce (<10ms) increases CPU usage
- ⚠️ Complex computations in render triggered by width changes

## Relation to useContainerWidth

\`useElementWidth\` and \`useContainerWidth\` are **identical** in functionality:
- Same implementation
- Same parameters
- Same behavior

**Naming difference:**
- \`useElementWidth\`: Technical, describes what it does (measures element)
- \`useContainerWidth\`: Semantic, describes the use case (container measurement)

Choose based on your preference or code style. Both are public APIs.

## Best Practices

**Do:**
- ✅ Use ref on the element you want to measure
- ✅ Adjust debounceMs based on your performance needs
- ✅ Use disabled to pause measurement when not needed
- ✅ Combine with useMemo for derived calculations

**Don't:**
- ❌ Create multiple observers for the same element
- ❌ Use very short debounce (<10ms) without profiling
- ❌ Measure elements that don't change size
- ❌ Forget to handle width=0 case during initial render
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    debounceMs: {
      control: { type: 'number', min: 0, max: 500, step: 10 },
      description: 'Debounce delay in milliseconds for resize events',
      table: {
        category: 'Options',
        type: { summary: 'number' },
        defaultValue: { summary: '16' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'When true, stops width measurement and returns 0',
      table: {
        category: 'Options',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<UseElementWidthArgs>;

export const Usage: Story = {
  args: {
    debounceMs: 16,
    disabled: false,
  },
  render: (args) => {
    // Component demos
    const BasicDemo = () => {
      const ref = React.useRef<HTMLDivElement>(null);
      const width = useElementWidth(ref, { debounceMs: args.debounceMs, disabled: args.disabled });

      return (
        <Box
          ref={ref}
          p="lg"
          style={{
            backgroundColor: '#f0f5ff',
            borderRadius: '8px',
            border: '2px solid #1890ff',
            resize: 'horizontal',
            overflow: 'auto',
            minWidth: '200px',
            maxWidth: '100%',
          }}
        >
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1890ff', marginBottom: '0.5rem' }}>
            {width}px
          </div>
          <div style={{ fontSize: '0.875rem', color: '#666' }}>
            👆 Drag the bottom-right corner to resize
          </div>
        </Box>
      );
    };

    const DebounceComparisonDemo = () => {
      const ref16 = React.useRef<HTMLDivElement>(null);
      const ref100 = React.useRef<HTMLDivElement>(null);
      const ref200 = React.useRef<HTMLDivElement>(null);

      const width16 = useElementWidth(ref16, { debounceMs: 16, disabled: args.disabled });
      const width100 = useElementWidth(ref100, { debounceMs: 100, disabled: args.disabled });
      const width200 = useElementWidth(ref200, { debounceMs: 200, disabled: args.disabled });

      const [count16, setCount16] = React.useState(0);
      const [count100, setCount100] = React.useState(0);
      const [count200, setCount200] = React.useState(0);

      React.useEffect(() => {
        if (width16 > 0) setCount16(prev => prev + 1);
      }, [width16]);

      React.useEffect(() => {
        if (width100 > 0) setCount100(prev => prev + 1);
      }, [width100]);

      React.useEffect(() => {
        if (width200 > 0) setCount200(prev => prev + 1);
      }, [width200]);

      const cardStyle = {
        padding: '1rem',
        borderRadius: '6px',
        resize: 'horizontal' as const,
        overflow: 'auto' as const,
        minWidth: '200px',
        maxWidth: '100%',
      };

      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div ref={ref16} style={{ ...cardStyle, backgroundColor: '#f6ffed', border: '2px solid #52c41a' }}>
            <div style={{ fontSize: '0.75rem', color: '#8c8c8c', marginBottom: '0.25rem' }}>16ms (60fps) - Smooth</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#52c41a' }}>{width16}px</div>
            <div style={{ fontSize: '0.75rem', color: '#595959', marginTop: '0.25rem' }}>Updates: {count16}</div>
          </div>

          <div ref={ref100} style={{ ...cardStyle, backgroundColor: '#fff7e6', border: '2px solid #fa8c16' }}>
            <div style={{ fontSize: '0.75rem', color: '#8c8c8c', marginBottom: '0.25rem' }}>100ms - Balanced</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#fa8c16' }}>{width100}px</div>
            <div style={{ fontSize: '0.75rem', color: '#595959', marginTop: '0.25rem' }}>Updates: {count100}</div>
          </div>

          <div ref={ref200} style={{ ...cardStyle, backgroundColor: '#fff0f6', border: '2px solid #eb2f96' }}>
            <div style={{ fontSize: '0.75rem', color: '#8c8c8c', marginBottom: '0.25rem' }}>200ms - Performance</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#eb2f96' }}>{width200}px</div>
            <div style={{ fontSize: '0.75rem', color: '#595959', marginTop: '0.25rem' }}>Updates: {count200}</div>
          </div>

          <div style={{ fontSize: '0.875rem', color: '#666', fontStyle: 'italic', marginTop: '0.5rem' }}>
            💡 Drag any container to see how different debounce values affect update frequency
          </div>
        </div>
      );
    };

    const ResponsiveBreakpointsDemo = () => {
      const ref = React.useRef<HTMLDivElement>(null);
      const width = useElementWidth(ref, { debounceMs: args.debounceMs, disabled: args.disabled });

      const getBreakpoint = () => {
        if (width === 0) return 'Not measured';
        if (width < 400) return 'Mobile';
        if (width < 768) return 'Tablet';
        if (width < 1024) return 'Desktop';
        return 'Large Desktop';
      };

      const breakpoint = getBreakpoint();
      const colors = {
        'Mobile': '#722ed1',
        'Tablet': '#1890ff',
        'Desktop': '#52c41a',
        'Large Desktop': '#fa8c16',
        'Not measured': '#8c8c8c',
      };

      return (
        <Box
          ref={ref}
          p="lg"
          style={{
            backgroundColor: '#fafafa',
            borderRadius: '8px',
            border: '2px solid #d9d9d9',
            resize: 'horizontal',
            overflow: 'auto',
            minWidth: '200px',
            maxWidth: '100%',
          }}
        >
          <div style={{ fontSize: '0.875rem', color: '#8c8c8c', marginBottom: '0.5rem' }}>Current Width: {width}px</div>
          <div
            style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: colors[breakpoint as keyof typeof colors],
              marginBottom: '0.5rem',
            }}
          >
            {breakpoint}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#666', lineHeight: '1.5' }}>
            <div>📱 Mobile: &lt; 400px</div>
            <div>💻 Tablet: 400px - 768px</div>
            <div>🖥️ Desktop: 768px - 1024px</div>
            <div>🖼️ Large: &gt; 1024px</div>
          </div>
        </Box>
      );
    };

    return (
      <div style={{ width: '100%', maxWidth: '1200px', margin: '0 auto' }}>
        {/* Hero */}
        <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1rem', color: '#1a1a1a' }}>
            useElementWidth Hook
          </h1>
          <p style={{ fontSize: '1.125rem', color: '#666', maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>
            Measure element width with ResizeObserver. Smart debouncing, SSR-safe, performance-optimized.
          </p>
        </div>

        {/* Basic Demo */}
        <div style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: '#333' }}>
            Basic Width Measurement
          </h2>
          <p style={{ fontSize: '0.875rem', color: '#666', marginBottom: '1.5rem' }}>
            Use <strong>debounceMs</strong> and <strong>disabled</strong> controls above to experiment.
          </p>
          <BasicDemo />
        </div>

        {/* Debounce Comparison */}
        <div style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: '#333' }}>
            ⚡ Debounce Comparison
          </h2>
          <p style={{ fontSize: '0.875rem', color: '#666', marginBottom: '1.5rem' }}>
            Compare update frequencies with different debounce values. Notice how lower values update more frequently.
          </p>
          <DebounceComparisonDemo />
        </div>

        {/* Responsive Breakpoints */}
        <div style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: '#333' }}>
            📱 Responsive Breakpoints
          </h2>
          <p style={{ fontSize: '0.875rem', color: '#666', marginBottom: '1.5rem' }}>
            Build custom breakpoint logic based on container width instead of viewport width.
          </p>
          <ResponsiveBreakpointsDemo />
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      source: {
        code: `// Basic usage
import { useElementWidth } from '@apvee/react-layout-kit';

function BasicExample() {
  const ref = React.useRef<HTMLDivElement>(null);
  const width = useElementWidth(ref);

  return (
    <div ref={ref}>
      Width: {width}px
    </div>
  );
}

// With custom debounce
function CustomDebounce() {
  const ref = React.useRef<HTMLDivElement>(null);
  const width = useElementWidth(ref, { debounceMs: 100 });

  return <div ref={ref}>Width (100ms debounce): {width}px</div>;
}

// With disabled state
function ConditionalMeasurement() {
  const [enabled, setEnabled] = React.useState(true);
  const ref = React.useRef<HTMLDivElement>(null);
  const width = useElementWidth(ref, { disabled: !enabled });

  return (
    <>
      <button onClick={() => setEnabled(!enabled)}>
        {enabled ? 'Disable' : 'Enable'} Measurement
      </button>
      <div ref={ref}>Width: {width}px</div>
    </>
  );
}

// Debounce comparison with update counters
function DebounceComparison() {
  const ref16 = React.useRef<HTMLDivElement>(null);
  const ref100 = React.useRef<HTMLDivElement>(null);
  const ref200 = React.useRef<HTMLDivElement>(null);

  const width16 = useElementWidth(ref16, { debounceMs: 16 });
  const width100 = useElementWidth(ref100, { debounceMs: 100 });
  const width200 = useElementWidth(ref200, { debounceMs: 200 });

  const [count16, setCount16] = React.useState(0);
  const [count100, setCount100] = React.useState(0);
  const [count200, setCount200] = React.useState(0);

  React.useEffect(() => {
    if (width16 > 0) setCount16(prev => prev + 1);
  }, [width16]);

  React.useEffect(() => {
    if (width100 > 0) setCount100(prev => prev + 1);
  }, [width100]);

  React.useEffect(() => {
    if (width200 > 0) setCount200(prev => prev + 1);
  }, [width200]);

  return (
    <div>
      <div ref={ref16} style={{ resize: 'horizontal', overflow: 'auto' }}>
        16ms: {width16}px (Updates: {count16})
      </div>
      <div ref={ref100} style={{ resize: 'horizontal', overflow: 'auto' }}>
        100ms: {width100}px (Updates: {count100})
      </div>
      <div ref={ref200} style={{ resize: 'horizontal', overflow: 'auto' }}>
        200ms: {width200}px (Updates: {count200})
      </div>
    </div>
  );
}

// Custom breakpoint logic
function ResponsiveBreakpoints() {
  const ref = React.useRef<HTMLDivElement>(null);
  const width = useElementWidth(ref);

  const getBreakpoint = () => {
    if (width < 400) return 'Mobile';
    if (width < 768) return 'Tablet';
    if (width < 1024) return 'Desktop';
    return 'Large Desktop';
  };

  return (
    <div ref={ref} style={{ resize: 'horizontal', overflow: 'auto' }}>
      <div>Width: {width}px</div>
      <div>Breakpoint: {getBreakpoint()}</div>
    </div>
  );
}`,
      },
    },
  },
};
