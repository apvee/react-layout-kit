import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { useContainerWidth } from '../hooks/useContainerWidth';
import { Box } from '../components/Box';
import { Grid } from '../components/Grid';
import { Flex } from '../components/Flex';

/**
 * Args interface for useContainerWidth story controls
 */
interface UseContainerWidthArgs {
  debounceMs: number;
  disabled: boolean;
}

/**
 * Meta configuration for useContainerWidth hook story.
 * This is the semantic, user-facing alias of useElementWidth focused on practical use cases.
 */
const meta: Meta<UseContainerWidthArgs> = {
  title: 'Hooks/useContainerWidth',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
# useContainerWidth Hook

A React hook for measuring container width. Semantic alias of \`useElementWidth\` optimized for container measurement use cases.

## Key Features

- **Container-Focused API**: Named for measuring parent container widths
- **Responsive Integration**: Perfect for use with Box, Grid, Flex responsive props
- **ResizeObserver-Based**: Modern, performant width tracking
- **Smart Debouncing**: Immediate initial measurement, debounced resize events (default: 16ms)
- **SSR-Safe**: Gracefully handles server-side rendering
- **Zero Performance Overhead**: Same efficient implementation as useElementWidth

## When to Use

- **Responsive Component Props**: Pass width to Box/Grid/Flex \`containerWidth\` prop
- **Custom Container Queries**: Build responsive logic based on container (not viewport)
- **Adaptive Layouts**: Change component behavior based on available space
- **Dashboard Widgets**: Resize charts, tables, cards to fit containers
- **Dynamic Content**: Adjust typography, spacing, columns based on container
- **Split Panes**: Track pane widths in resizable layouts
- **Modal/Drawer Sizing**: Adapt content to modal/drawer dimensions

## When NOT to Use

- **Viewport Queries**: Use CSS media queries for viewport-based responsiveness
- **Static Layouts**: If container width never changes, measure once outside React
- **SSR-Critical Content**: Returns 0 on server, may cause layout shift

## Relation to useElementWidth

\`useContainerWidth\` and \`useElementWidth\` are **identical**:
- Same implementation (useContainerWidth simply calls useElementWidth)
- Same parameters and return type
- Same performance characteristics

**Naming guidance:**
- Use \`useContainerWidth\` for measuring parent containers
- Use \`useElementWidth\` for technical/general element measurement
- Choose based on code readability and team conventions

## API

\`\`\`typescript
function useContainerWidth<T extends Element>(
  elementRef: React.RefObject<T>,
  options?: {
    disabled?: boolean;      // Disable measurement (returns 0)
    debounceMs?: number;     // Debounce delay (default: 16ms)
  }
): number; // Width in pixels (integer)
\`\`\`

## Basic Usage

\`\`\`tsx
import { useContainerWidth } from '@apvee/react-layout-kit';

function ResponsiveCard() {
  const ref = React.useRef<HTMLDivElement>(null);
  const width = useContainerWidth(ref);

  return (
    <div ref={ref}>
      Container: {width}px
    </div>
  );
}
\`\`\`

## Integration with Box Component

### Responsive Padding
\`\`\`tsx
function ResponsivePadding() {
  const ref = React.useRef<HTMLDivElement>(null);
  const containerWidth = useContainerWidth(ref);

  return (
    <Box
      ref={ref}
      containerWidth={containerWidth}
      p={{ xs: 'sm', md: 'lg', xl: 'xxl' }}
    >
      Padding adapts to container width (not viewport!)
    </Box>
  );
}
\`\`\`

### Responsive Styling
\`\`\`tsx
function AdaptiveBox() {
  const ref = React.useRef<HTMLDivElement>(null);
  const containerWidth = useContainerWidth(ref);

  return (
    <Box
      ref={ref}
      containerWidth={containerWidth}
      $padding={{ xs: '0.5rem', md: '1rem', lg: '2rem' }}
      $fontSize={{ xs: '14px', md: '16px', lg: '18px' }}
      $backgroundColor={{ xs: '#f0f0f0', md: '#e0e0e0', lg: '#d0d0d0' }}
    >
      All props respond to container width
    </Box>
  );
}
\`\`\`

## Integration with Grid Component

### Dynamic Columns
\`\`\`tsx
function ResponsiveGrid() {
  const ref = React.useRef<HTMLDivElement>(null);
  const containerWidth = useContainerWidth(ref);

  return (
    <Grid
      ref={ref}
      containerWidth={containerWidth}
      columns={{ xs: 1, sm: 2, md: 3, lg: 4 }}
      gutter={{ xs: 'sm', md: 'lg' }}
    >
      <Grid.Col span={1}>Item 1</Grid.Col>
      <Grid.Col span={1}>Item 2</Grid.Col>
      <Grid.Col span={1}>Item 3</Grid.Col>
      <Grid.Col span={1}>Item 4</Grid.Col>
    </Grid>
  );
}
\`\`\`

## Integration with Flex Component

### Responsive Direction
\`\`\`tsx
function ResponsiveFlex() {
  const ref = React.useRef<HTMLDivElement>(null);
  const containerWidth = useContainerWidth(ref);

  return (
    <Flex
      ref={ref}
      containerWidth={containerWidth}
      direction={{ xs: 'column', md: 'row' }}
      gap={{ xs: 'sm', md: 'lg' }}
    >
      <Flex.Item>Item 1</Flex.Item>
      <Flex.Item>Item 2</Flex.Item>
    </Flex>
  );
}
\`\`\`

## Advanced Patterns

### Custom Breakpoint Logic
\`\`\`tsx
function CustomResponsive() {
  const ref = React.useRef<HTMLDivElement>(null);
  const width = useContainerWidth(ref);

  // Custom logic based on container width
  const columns = width < 400 ? 1 : width < 800 ? 2 : 3;
  const fontSize = width < 500 ? '14px' : '16px';

  return (
    <div ref={ref}>
      <div style={{ fontSize }}>
        Showing {columns} columns
      </div>
    </div>
  );
}
\`\`\`

### Performance Optimization
\`\`\`tsx
function OptimizedMeasurement() {
  const ref = React.useRef<HTMLDivElement>(null);
  
  // Slower debounce for expensive operations
  const width = useContainerWidth(ref, { debounceMs: 100 });

  // Expensive computation based on width
  const complexLayout = React.useMemo(() => {
    return calculateComplexLayout(width);
  }, [width]);

  return <div ref={ref}>{complexLayout}</div>;
}
\`\`\`

### Conditional Measurement
\`\`\`tsx
function ConditionalMeasure() {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);
  
  // Only measure when expanded
  const width = useContainerWidth(ref, { disabled: !isExpanded });

  return (
    <div ref={ref}>
      <button onClick={() => setIsExpanded(!isExpanded)}>
        Toggle
      </button>
      {isExpanded && <div>Width: {width}px</div>}
    </div>
  );
}
\`\`\`

## Real-World Examples

### Dashboard Widget
\`\`\`tsx
function DashboardWidget() {
  const ref = React.useRef<HTMLDivElement>(null);
  const width = useContainerWidth(ref);

  // Adapt chart type based on width
  const ChartComponent = width < 400 ? MobileChart : DesktopChart;

  return (
    <Box ref={ref} p="lg">
      <ChartComponent data={data} width={width} />
    </Box>
  );
}
\`\`\`

### Responsive Table
\`\`\`tsx
function ResponsiveTable({ data }) {
  const ref = React.useRef<HTMLTableElement>(null);
  const width = useContainerWidth(ref);

  // Show fewer columns on narrow containers
  const visibleColumns = width < 500 ? 2 : width < 800 ? 4 : 6;

  return (
    <table ref={ref}>
      {/* Render only visibleColumns columns */}
    </table>
  );
}
\`\`\`

### Adaptive Form
\`\`\`tsx
function AdaptiveForm() {
  const ref = React.useRef<HTMLFormElement>(null);
  const width = useContainerWidth(ref);

  // Single column on narrow, two columns on wide
  const columns = width < 600 ? 1 : 2;

  return (
    <form ref={ref}>
      <Grid columns={columns} gutter="md">
        <Grid.Col span={1}><input placeholder="Name" /></Grid.Col>
        <Grid.Col span={1}><input placeholder="Email" /></Grid.Col>
      </Grid>
    </form>
  );
}
\`\`\`

## Performance Tips

**Optimize debounce for your use case:**
- \`16ms\`: Smooth animations, immediate feedback (default)
- \`32ms\`: Good balance, 30fps updates
- \`100ms\`: Heavy computations, chart rendering
- \`200ms+\`: API calls, expensive recalculations

**Memoize expensive calculations:**
\`\`\`tsx
const layout = React.useMemo(() => {
  return calculateLayout(width);
}, [width]);
\`\`\`

**Disable when not needed:**
\`\`\`tsx
const width = useContainerWidth(ref, { 
  disabled: !isVisible 
});
\`\`\`

## Best Practices

**Do:**
- ✅ Use with Box/Grid/Flex \`containerWidth\` prop for responsive props
- ✅ Choose debounceMs based on operation cost
- ✅ Memoize derived calculations with useMemo
- ✅ Handle width=0 case during initial render
- ✅ Use disabled to pause measurement when component hidden

**Don't:**
- ❌ Measure the same element multiple times
- ❌ Use for viewport-based media queries (use CSS instead)
- ❌ Forget about SSR (width=0 on server)
- ❌ Set debounceMs too low without profiling
- ❌ Trigger expensive side effects directly on every width change

## Troubleshooting

**Width is always 0:**
- Check ref is attached to DOM element
- Verify element is mounted before reading width
- Ensure disabled is not set to true

**Updates too slow:**
- Decrease debounceMs (default is 16ms)
- Check for expensive computations blocking main thread

**Too many updates:**
- Increase debounceMs to throttle updates
- Use useMemo for expensive derived values
- Set disabled=true when measurement not needed

**Layout shift on SSR:**
- Hook returns 0 on server
- Use default/placeholder layouts for initial render
- Consider using CSS for critical first-paint layouts
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
type Story = StoryObj<UseContainerWidthArgs>;

export const Usage: Story = {
  args: {
    debounceMs: 16,
    disabled: false,
  },
  render: (args) => {
    // Integration with Box - Responsive Padding
    const ResponsivePaddingDemo = () => {
      const ref = React.useRef<HTMLDivElement>(null);
      const containerWidth = useContainerWidth(ref, { debounceMs: args.debounceMs, disabled: args.disabled });

      return (
        <Box
          ref={ref}
          containerWidth={containerWidth}
          p={{ xs: 'sm', sm: 'md', md: 'lg', lg: 'xl' }}
          style={{
            backgroundColor: '#f6ffed',
            borderRadius: '8px',
            border: '2px solid #52c41a',
            resize: 'horizontal',
            overflow: 'auto',
            minWidth: '200px',
            maxWidth: '100%',
          }}
        >
          <div style={{ fontSize: '1rem', fontWeight: '600', color: '#52c41a', marginBottom: '0.5rem' }}>
            Container: {containerWidth}px
          </div>
          <div style={{ fontSize: '0.875rem', color: '#666' }}>
            Padding adapts to container width:
          </div>
          <div style={{ fontSize: '0.75rem', color: '#8c8c8c', marginTop: '0.5rem', lineHeight: '1.6' }}>
            • &lt; 640px: small padding (8px)<br />
            • 640-768px: medium padding (16px)<br />
            • 768-1024px: large padding (24px)<br />
            • &gt; 1024px: extra large padding (32px)
          </div>
        </Box>
      );
    };

    // Integration with Grid - Dynamic Columns
    const ResponsiveGridDemo = () => {
      const ref = React.useRef<HTMLDivElement>(null);
      const containerWidth = useContainerWidth(ref, { debounceMs: args.debounceMs, disabled: args.disabled });

      const getColumns = () => {
        if (containerWidth < 400) return 1;
        if (containerWidth < 600) return 2;
        if (containerWidth < 900) return 3;
        return 4;
      };

      const columns = getColumns();

      return (
        <div
          ref={ref}
          style={{
            backgroundColor: '#f0f5ff',
            padding: '1.5rem',
            borderRadius: '8px',
            border: '2px solid #1890ff',
            resize: 'horizontal',
            overflow: 'auto',
            minWidth: '200px',
            maxWidth: '100%',
          }}
        >
          <div style={{ fontSize: '0.875rem', color: '#1890ff', fontWeight: '600', marginBottom: '1rem' }}>
            Container: {containerWidth}px → {columns} column{columns > 1 ? 's' : ''}
          </div>
          <Grid columns={columns} gutter="md">
            {Array.from({ length: 8 }, (_, i) => (
              <Grid.Col key={i} span={1}>
                <div
                  style={{
                    padding: '1rem',
                    backgroundColor: '#ffffff',
                    borderRadius: '6px',
                    textAlign: 'center',
                    fontSize: '0.875rem',
                    color: '#1890ff',
                    fontWeight: '500',
                  }}
                >
                  {i + 1}
                </div>
              </Grid.Col>
            ))}
          </Grid>
        </div>
      );
    };

    // Integration with Flex - Responsive Direction
    const ResponsiveFlexDemo = () => {
      const ref = React.useRef<HTMLDivElement>(null);
      const containerWidth = useContainerWidth(ref, { debounceMs: args.debounceMs, disabled: args.disabled });

      const direction = containerWidth < 500 ? 'column' : 'row';

      return (
        <div
          ref={ref}
          style={{
            backgroundColor: '#fff7e6',
            padding: '1.5rem',
            borderRadius: '8px',
            border: '2px solid #fa8c16',
            resize: 'horizontal',
            overflow: 'auto',
            minWidth: '200px',
            maxWidth: '100%',
          }}
        >
          <div style={{ fontSize: '0.875rem', color: '#fa8c16', fontWeight: '600', marginBottom: '1rem' }}>
            Container: {containerWidth}px → Direction: {direction}
          </div>
          <Flex direction={direction} gap="md" align="stretch">
            <Flex.Item style={{ flex: 1 }}>
              <div
                style={{
                  padding: '1rem',
                  backgroundColor: '#ffffff',
                  borderRadius: '6px',
                  fontSize: '0.875rem',
                  color: '#fa8c16',
                  fontWeight: '500',
                }}
              >
                Item 1
              </div>
            </Flex.Item>
            <Flex.Item style={{ flex: 1 }}>
              <div
                style={{
                  padding: '1rem',
                  backgroundColor: '#ffffff',
                  borderRadius: '6px',
                  fontSize: '0.875rem',
                  color: '#fa8c16',
                  fontWeight: '500',
                }}
              >
                Item 2
              </div>
            </Flex.Item>
            <Flex.Item style={{ flex: 1 }}>
              <div
                style={{
                  padding: '1rem',
                  backgroundColor: '#ffffff',
                  borderRadius: '6px',
                  fontSize: '0.875rem',
                  color: '#fa8c16',
                  fontWeight: '500',
                }}
              >
                Item 3
              </div>
            </Flex.Item>
          </Flex>
        </div>
      );
    };

    // Custom Breakpoint Logic
    const CustomBreakpointDemo = () => {
      const ref = React.useRef<HTMLDivElement>(null);
      const width = useContainerWidth(ref, { debounceMs: args.debounceMs, disabled: args.disabled });

      const getLayout = () => {
        if (width < 300) return { columns: 1, fontSize: '12px', label: 'Compact' };
        if (width < 500) return { columns: 2, fontSize: '14px', label: 'Small' };
        if (width < 700) return { columns: 3, fontSize: '16px', label: 'Medium' };
        return { columns: 4, fontSize: '18px', label: 'Large' };
      };

      const layout = getLayout();

      return (
        <Box
          ref={ref}
          p="lg"
          style={{
            backgroundColor: '#f9f0ff',
            borderRadius: '8px',
            border: '2px solid #722ed1',
            resize: 'horizontal',
            overflow: 'auto',
            minWidth: '200px',
            maxWidth: '100%',
          }}
        >
          <div style={{ fontSize: '0.875rem', color: '#722ed1', fontWeight: '600', marginBottom: '1rem' }}>
            {width}px → {layout.label} Layout ({layout.columns} cols, {layout.fontSize})
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${layout.columns}, 1fr)`,
              gap: '0.5rem',
            }}
          >
            {Array.from({ length: layout.columns * 2 }, (_, i) => (
              <div
                key={i}
                style={{
                  padding: '0.75rem',
                  backgroundColor: '#ffffff',
                  borderRadius: '4px',
                  textAlign: 'center',
                  fontSize: layout.fontSize,
                  color: '#722ed1',
                  fontWeight: '500',
                }}
              >
                {i + 1}
              </div>
            ))}
          </div>
        </Box>
      );
    };

    return (
      <div style={{ width: '100%', maxWidth: '1200px', margin: '0 auto' }}>
        {/* Hero */}
        <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1rem', color: '#1a1a1a' }}>
            useContainerWidth Hook
          </h1>
          <p style={{ fontSize: '1.125rem', color: '#666', maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>
            Semantic hook for container width measurement. Perfect for responsive props and adaptive layouts.
          </p>
        </div>

        {/* Box Integration */}
        <div style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: '#333' }}>
            📦 Box Integration - Responsive Padding
          </h2>
          <p style={{ fontSize: '0.875rem', color: '#666', marginBottom: '1.5rem' }}>
            Pass <code>containerWidth</code> to Box for responsive padding. Resize to see padding adapt.
          </p>
          <ResponsivePaddingDemo />
        </div>

        {/* Grid Integration */}
        <div style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: '#333' }}>
            🎯 Grid Integration - Dynamic Columns
          </h2>
          <p style={{ fontSize: '0.875rem', color: '#666', marginBottom: '1.5rem' }}>
            Grid columns adapt to container width: 1 col (&lt;400px), 2 cols (&lt;600px), 3 cols (&lt;900px), 4 cols (≥900px).
          </p>
          <ResponsiveGridDemo />
        </div>

        {/* Flex Integration */}
        <div style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: '#333' }}>
            🔀 Flex Integration - Responsive Direction
          </h2>
          <p style={{ fontSize: '0.875rem', color: '#666', marginBottom: '1.5rem' }}>
            Flex direction changes from column (&lt;500px) to row (≥500px).
          </p>
          <ResponsiveFlexDemo />
        </div>

        {/* Custom Logic */}
        <div style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: '#333' }}>
            ⚙️ Custom Breakpoint Logic
          </h2>
          <p style={{ fontSize: '0.875rem', color: '#666', marginBottom: '1.5rem' }}>
            Build custom responsive logic: columns, fontSize, and layout adapt simultaneously.
          </p>
          <CustomBreakpointDemo />
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      source: {
        code: `// Basic usage with Box responsive padding
import { useContainerWidth, Box } from '@apvee/react-layout-kit';

function ResponsivePadding() {
  const ref = React.useRef<HTMLDivElement>(null);
  const containerWidth = useContainerWidth(ref);

  return (
    <Box
      ref={ref}
      containerWidth={containerWidth}
      p={{ xs: 'sm', md: 'lg', xl: 'xxl' }}
    >
      Padding adapts to container width
    </Box>
  );
}

// Grid with dynamic columns
function ResponsiveGrid() {
  const ref = React.useRef<HTMLDivElement>(null);
  const containerWidth = useContainerWidth(ref);

  const columns = containerWidth < 400 ? 1 
    : containerWidth < 600 ? 2 
    : containerWidth < 900 ? 3 
    : 4;

  return (
    <div ref={ref}>
      <Grid columns={columns} gutter="md">
        <Grid.Col span={1}>Item 1</Grid.Col>
        <Grid.Col span={1}>Item 2</Grid.Col>
        <Grid.Col span={1}>Item 3</Grid.Col>
      </Grid>
    </div>
  );
}

// Flex with responsive direction
function ResponsiveFlex() {
  const ref = React.useRef<HTMLDivElement>(null);
  const containerWidth = useContainerWidth(ref);

  const direction = containerWidth < 500 ? 'column' : 'row';

  return (
    <div ref={ref}>
      <Flex direction={direction} gap="md">
        <Flex.Item>Item 1</Flex.Item>
        <Flex.Item>Item 2</Flex.Item>
        <Flex.Item>Item 3</Flex.Item>
      </Flex>
    </div>
  );
}

// Custom breakpoint logic
function CustomBreakpoints() {
  const ref = React.useRef<HTMLDivElement>(null);
  const width = useContainerWidth(ref);

  const layout = React.useMemo(() => {
    if (width < 300) return { columns: 1, fontSize: '12px' };
    if (width < 500) return { columns: 2, fontSize: '14px' };
    if (width < 700) return { columns: 3, fontSize: '16px' };
    return { columns: 4, fontSize: '18px' };
  }, [width]);

  return (
    <div ref={ref}>
      <div style={{ 
        gridTemplateColumns: \`repeat(\${layout.columns}, 1fr)\`,
        fontSize: layout.fontSize 
      }}>
        {/* Grid content */}
      </div>
    </div>
  );
}

// Performance optimization
function OptimizedComponent() {
  const ref = React.useRef<HTMLDivElement>(null);
  
  // Slower debounce for expensive operations
  const width = useContainerWidth(ref, { debounceMs: 100 });

  // Memoize expensive calculations
  const layout = React.useMemo(() => {
    return calculateExpensiveLayout(width);
  }, [width]);

  return <div ref={ref}>{layout}</div>;
}

// Conditional measurement
function ConditionalMeasure() {
  const [isVisible, setIsVisible] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);
  
  // Only measure when visible
  const width = useContainerWidth(ref, { disabled: !isVisible });

  return (
    <div ref={ref}>
      {isVisible && <div>Width: {width}px</div>}
    </div>
  );
}`,
      },
    },
  },
};
