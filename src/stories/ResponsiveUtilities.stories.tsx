import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { resolveResponsiveValue } from '../core/responsive';
import { resolveSpacing } from '../core/styling';
import { getBreakpoints, getSpacing } from '../core/configuration';
import { Box } from '../components/Box';
import { Stack } from '../components/Stack';
import { Grid } from '../components/Grid';
import { Flex } from '../components/Flex';
import { useElementWidth } from '../hooks/useElementWidth';
import type { ResponsiveValue } from '../types';

/**
 * Args interface for ResponsiveUtilities story controls
 */
interface ResponsiveUtilitiesArgs {
  containerWidth: number;
  spacingKey: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'xxxl';
  showBreakpoints: boolean;
}

/**
 * Meta configuration for Responsive Utilities story.
 * Core utilities for building responsive custom components.
 */
const meta: Meta<ResponsiveUtilitiesArgs> = {
  title: 'Advanced/Responsive Utilities',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
# Responsive Utilities

Core utilities for building custom components that integrate seamlessly with the responsive layout system.

## Key APIs

### resolveResponsiveValue(value, containerWidth, breakpoints)
Resolves responsive value objects to a single value based on container width and breakpoints.

\`\`\`typescript
import { resolveResponsiveValue } from '@apvee/react-layout-kit';

const value = resolveResponsiveValue(
  { xs: 'column', md: 'row' },
  800,
  { xs: 0, sm: 640, md: 768, lg: 1024, xl: 1280, xxl: 1536 }
);
// Returns: 'row' (because 800px is >= md breakpoint)
\`\`\`

### resolveSpacing(value)
Converts spacing scale keys to CSS values using the configured spacing scale.

\`\`\`typescript
import { resolveSpacing } from '@apvee/react-layout-kit';

resolveSpacing('md')    // → '16px'
resolveSpacing('lg')    // → '24px'
resolveSpacing(32)      // → '32px'
resolveSpacing('2rem')  // → '2rem'
\`\`\`

## When to Use

- **Custom Components**: Building components that need responsive props
- **Dynamic Styling**: Computing styles based on container width
- **Spacing Consistency**: Using the same spacing scale as layout components
- **Responsive Logic**: Implementing custom responsive behavior
- **Library Extensions**: Creating components that integrate with the layout system

## When NOT to Use

- **Layout Components**: Use Box, Flex, Grid instead (they handle this internally)
- **Static Values**: No need to resolve if values don't change
- **Non-Responsive**: Use direct CSS values for non-responsive components

## Features

### resolveResponsiveValue

- **Container-Aware**: Resolves based on container width, not viewport
- **Breakpoint Matching**: Finds the largest matching breakpoint
- **Fallback Handling**: Returns closest smaller breakpoint value
- **Non-Responsive Passthrough**: Direct values are returned unchanged
- **Type-Safe**: Full TypeScript support with generics

### resolveSpacing

- **Scale Resolution**: Converts 'xs', 'sm', 'md', etc. to pixel values
- **Direct Values**: Passes through numbers and CSS strings
- **Configuration-Aware**: Uses configured spacing scale
- **Unit Handling**: Converts numbers to 'px', preserves string units
- **Consistent Output**: Always returns a string for CSS

## Resolution Logic

### Breakpoint Resolution
\`\`\`typescript
// Container width: 900px
// Breakpoints: { xs: 0, sm: 640, md: 768, lg: 1024, xl: 1280, xxl: 1536 }
// Value: { xs: 'A', sm: 'B', md: 'C', lg: 'D' }

// Active breakpoint: 'md' (768 <= 900 < 1024)
// Result: 'C'

// If md was missing: { xs: 'A', sm: 'B', lg: 'D' }
// Result: 'B' (fallback to closest smaller breakpoint)
\`\`\`

### Spacing Resolution
\`\`\`typescript
// Configured spacing: { xs: 4, sm: 8, md: 16, lg: 24, xl: 32, xxl: 48, xxxl: 64 }

resolveSpacing('md')    // → '16px' (from scale)
resolveSpacing('lg')    // → '24px' (from scale)
resolveSpacing(20)      // → '20px' (number to px)
resolveSpacing('1.5rem') // → '1.5rem' (string passthrough)
\`\`\`

## Building Responsive Components

### Basic Pattern
\`\`\`tsx
import { resolveResponsiveValue, resolveSpacing } from '@apvee/react-layout-kit';
import { useElementWidth } from '@apvee/react-layout-kit';
import { getBreakpoints } from '@apvee/react-layout-kit';

interface MyComponentProps {
  direction?: ResponsiveValue<'horizontal' | 'vertical'>;
  spacing?: ResponsiveValue<SpacingValue>;
}

function MyComponent({ direction = 'horizontal', spacing = 'md' }: MyComponentProps) {
  const [ref, containerWidth] = useElementWidth();
  const breakpoints = getBreakpoints();
  
  // Resolve responsive direction
  const resolvedDirection = React.useMemo(
    () => resolveResponsiveValue(direction, containerWidth, breakpoints),
    [direction, containerWidth, breakpoints]
  );
  
  // Resolve responsive spacing
  const resolvedSpacing = React.useMemo(() => {
    const rawValue = resolveResponsiveValue(spacing, containerWidth, breakpoints);
    return resolveSpacing(rawValue);
  }, [spacing, containerWidth, breakpoints]);
  
  return (
    <div
      ref={ref}
      style={{
        display: 'flex',
        flexDirection: resolvedDirection === 'horizontal' ? 'row' : 'column',
        gap: resolvedSpacing,
      }}
    >
      {/* content */}
    </div>
  );
}
\`\`\`

### Advanced Pattern with Memoization
\`\`\`tsx
function CustomGrid({ 
  columns = { xs: 1, sm: 2, md: 3, lg: 4 },
  gap = { xs: 'sm', md: 'md', lg: 'lg' }
}) {
  const [ref, containerWidth] = useElementWidth();
  const breakpoints = getBreakpoints();
  
  const resolvedColumns = React.useMemo(
    () => resolveResponsiveValue(columns, containerWidth, breakpoints) ?? 1,
    [columns, containerWidth, breakpoints]
  );
  
  const resolvedGap = React.useMemo(() => {
    const rawGap = resolveResponsiveValue(gap, containerWidth, breakpoints) ?? 'md';
    return resolveSpacing(rawGap);
  }, [gap, containerWidth, breakpoints]);
  
  return (
    <div
      ref={ref}
      style={{
        display: 'grid',
        gridTemplateColumns: \`repeat(\${resolvedColumns}, 1fr)\`,
        gap: resolvedGap,
      }}
    >
      {/* items */}
    </div>
  );
}
\`\`\`

## Integration Examples

### With useElementWidth Hook
\`\`\`tsx
import { useElementWidth, resolveResponsiveValue, getBreakpoints } from '@apvee/react-layout-kit';

function ResponsiveCard({ padding = { xs: 'sm', md: 'lg' } }) {
  const [ref, width] = useElementWidth();
  const breakpoints = getBreakpoints();
  
  const resolvedPadding = resolveResponsiveValue(
    padding,
    width,
    breakpoints
  );
  
  return (
    <div ref={ref} style={{ padding: resolveSpacing(resolvedPadding) }}>
      <p>Width: {width}px</p>
      <p>Padding: {resolvedPadding}</p>
    </div>
  );
}
\`\`\`

### Custom Responsive Hook
\`\`\`tsx
function useResponsiveProp<T>(
  value: ResponsiveValue<T> | T,
  containerWidth: number
): T {
  const breakpoints = getBreakpoints();
  
  return React.useMemo(
    () => resolveResponsiveValue(value, containerWidth, breakpoints),
    [value, containerWidth, breakpoints]
  );
}

// Usage
function MyComponent({ columns = { xs: 1, md: 2, lg: 3 } }) {
  const [ref, width] = useElementWidth();
  const resolvedColumns = useResponsiveProp(columns, width);
  
  return <div ref={ref}>{/* use resolvedColumns */}</div>;
}
\`\`\`

### Multiple Responsive Props
\`\`\`tsx
function FlexContainer({
  direction = { xs: 'column', md: 'row' },
  gap = { xs: 'sm', md: 'md', lg: 'lg' },
  align = { xs: 'stretch', md: 'center' }
}) {
  const [ref, width] = useElementWidth();
  const breakpoints = getBreakpoints();
  
  const styles = React.useMemo(() => {
    const dir = resolveResponsiveValue(direction, width, breakpoints);
    const gapValue = resolveResponsiveValue(gap, width, breakpoints);
    const alignValue = resolveResponsiveValue(align, width, breakpoints);
    
    return {
      display: 'flex',
      flexDirection: dir,
      gap: resolveSpacing(gapValue),
      alignItems: alignValue,
    };
  }, [direction, gap, align, width, breakpoints]);
  
  return <div ref={ref} style={styles}>{/* content */}</div>;
}
\`\`\`

## Best Practices

**Do:**
- ✅ Memoize resolved values to avoid unnecessary recalculations
- ✅ Use with useElementWidth for container-aware responsiveness
- ✅ Combine both utilities for spacing + responsive logic
- ✅ Return fallback values for undefined/null inputs
- ✅ Keep responsive objects simple (2-3 breakpoints usually enough)

**Don't:**
- ❌ Resolve on every render (use useMemo)
- ❌ Pass invalid breakpoint keys
- ❌ Forget to handle undefined/null values
- ❌ Over-complicate responsive objects (too many breakpoints)
- ❌ Use viewport width instead of container width

## Performance Tips

\`\`\`tsx
// ✅ GOOD: Memoized resolution
const resolvedValue = React.useMemo(
  () => resolveResponsiveValue(value, width, breakpoints),
  [value, width, breakpoints]
);

// ❌ BAD: Resolving on every render
const resolvedValue = resolveResponsiveValue(value, width, breakpoints);

// ✅ GOOD: Single resolution for multiple uses
const resolvedGap = React.useMemo(() => {
  const raw = resolveResponsiveValue(gap, width, breakpoints);
  return resolveSpacing(raw);
}, [gap, width, breakpoints]);

// ❌ BAD: Multiple resolutions
<div style={{ 
  marginTop: resolveSpacing(resolveResponsiveValue(gap, width, breakpoints)),
  marginBottom: resolveSpacing(resolveResponsiveValue(gap, width, breakpoints))
}} />
\`\`\`

## TypeScript Support

\`\`\`typescript
import type { ResponsiveValue, SpacingKey } from '@apvee/react-layout-kit';

interface MyProps {
  // Responsive prop with type
  columns?: ResponsiveValue<number>;
  
  // Responsive spacing (accepts scale keys or raw numbers)
  gap?: ResponsiveValue<SpacingKey | number>;
  
  // Responsive string union
  direction?: ResponsiveValue<'horizontal' | 'vertical'>;
}

// Type-safe resolution
function MyComponent({ columns, gap, direction }: MyProps) {
  const [ref, width] = useElementWidth<HTMLDivElement>();
  const breakpoints = getBreakpoints();
  
  // TypeScript knows these are the correct types
  const cols: number = resolveResponsiveValue(columns ?? 1, width, breakpoints);
  const gapValue: string = resolveSpacing(
    resolveResponsiveValue(gap ?? 'md', width, breakpoints)
  );
  const dir: 'horizontal' | 'vertical' = resolveResponsiveValue(
    direction ?? 'horizontal',
    width,
    breakpoints
  );
  
  return <div ref={ref}>{/* ... */}</div>;
}
\`\`\`

## Edge Cases

### Non-Responsive Values
\`\`\`typescript
// Direct values are passed through
resolveResponsiveValue('static', 800, breakpoints)  // → 'static'
resolveResponsiveValue(42, 800, breakpoints)        // → 42
\`\`\`

### Missing Breakpoints
\`\`\`typescript
// Falls back to closest smaller breakpoint
const value = { xs: 'A', lg: 'B' };
resolveResponsiveValue(value, 900, breakpoints)  // → 'A' (no md, falls back to xs)
\`\`\`

### Undefined/Null
\`\`\`typescript
resolveResponsiveValue(undefined, 800, breakpoints)  // → undefined
resolveResponsiveValue(null, 800, breakpoints)       // → null
\`\`\`

### Invalid Spacing Keys
\`\`\`typescript
resolveSpacing('invalid-key')  // → 'invalid-key' (passthrough)
resolveSpacing('md')           // → '16px' (from scale)
\`\`\`

## Testing

\`\`\`typescript
import { resolveResponsiveValue, resolveSpacing } from '@apvee/react-layout-kit';

describe('resolveResponsiveValue', () => {
  const breakpoints = { xs: 0, sm: 640, md: 768, lg: 1024, xl: 1280, xxl: 1536 };
  
  it('resolves correct breakpoint', () => {
    const value = { xs: 'small', md: 'medium', lg: 'large' };
    
    expect(resolveResponsiveValue(value, 500, breakpoints)).toBe('small');
    expect(resolveResponsiveValue(value, 800, breakpoints)).toBe('medium');
    expect(resolveResponsiveValue(value, 1200, breakpoints)).toBe('large');
  });
  
  it('returns direct values unchanged', () => {
    expect(resolveResponsiveValue('static', 800, breakpoints)).toBe('static');
    expect(resolveResponsiveValue(42, 800, breakpoints)).toBe(42);
  });
});

describe('resolveSpacing', () => {
  it('converts spacing keys', () => {
    expect(resolveSpacing('md')).toBe('16px');
    expect(resolveSpacing('lg')).toBe('24px');
  });
  
  it('converts numbers to px', () => {
    expect(resolveSpacing(32)).toBe('32px');
  });
  
  it('passes through CSS strings', () => {
    expect(resolveSpacing('2rem')).toBe('2rem');
    expect(resolveSpacing('10%')).toBe('10%');
  });
});
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    containerWidth: {
      control: { type: 'range', min: 320, max: 1536, step: 1 },
      description: 'Container width for responsive resolution',
      table: {
        category: 'Resolution',
        type: { summary: 'number' },
        defaultValue: { summary: '768' },
      },
    },
    spacingKey: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', 'xxl', 'xxxl'],
      description: 'Spacing scale key to resolve',
      table: {
        category: 'Spacing',
        type: { summary: 'string' },
        defaultValue: { summary: 'md' },
      },
    },
    showBreakpoints: {
      control: 'boolean',
      description: 'Show breakpoint visualization',
      table: {
        category: 'Display',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<ResponsiveUtilitiesArgs>;

export const Usage: Story = {
  args: {
    containerWidth: 768,
    spacingKey: 'md',
    showBreakpoints: true,
  },
  render: (args) => {
    const breakpoints = getBreakpoints();
    const spacing = getSpacing();

    // Demo 1: Responsive Value Resolution
    const responsiveValue = { xs: 'Mobile', sm: 'Tablet', md: 'Laptop', lg: 'Desktop', xl: 'Large Desktop' };
    const resolvedValue = resolveResponsiveValue(responsiveValue, args.containerWidth, breakpoints) as string;

    // Demo 2: Spacing Resolution
    const resolvedSpacing = resolveSpacing(args.spacingKey);

    // Find active breakpoint
    const getActiveBreakpoint = (width: number) => {
      const entries = Object.entries(breakpoints).sort(([, a], [, b]) => (b as number) - (a as number));
      for (const [key, value] of entries) {
        if (width >= (value as number)) return { key, value: value as number };
      }
      return { key: 'xs', value: 0 };
    };

    const activeBreakpoint = getActiveBreakpoint(args.containerWidth);

    return (
      <div style={{ width: '100%', maxWidth: '1200px', margin: '0 auto' }}>
        {/* Hero */}
        <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1rem', color: '#1a1a1a' }}>
            Responsive Utilities
          </h1>
          <p style={{ fontSize: '1.125rem', color: '#666', maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>
            Core utilities for building custom responsive components that integrate with the layout system.
          </p>
        </div>

        {/* Interactive Width Control */}
        <Box p="lg" mb="xl" style={{ backgroundColor: '#f0f5ff', borderRadius: '8px', border: '2px solid #1890ff' }}>
          <h3 style={{ margin: '0 0 1rem 0', color: '#1890ff', fontSize: '1.125rem', fontWeight: '600' }}>
            🎚️ Container Width Control
          </h3>
          <div style={{ fontSize: '0.875rem', color: '#595959', marginBottom: '1rem' }}>
            Use the slider in Controls to change container width and see responsive resolution in action.
          </div>
          <div style={{ 
            fontSize: '2rem', 
            fontWeight: 'bold', 
            color: '#1890ff',
            textAlign: 'center',
            padding: '1rem',
            backgroundColor: '#fff',
            borderRadius: '8px',
          }}>
            {args.containerWidth}px
          </div>
          <div style={{ 
            fontSize: '0.875rem', 
            color: '#8c8c8c', 
            textAlign: 'center',
            marginTop: '0.5rem'
          }}>
            Active Breakpoint: <strong style={{ color: '#1890ff' }}>{activeBreakpoint.key}</strong> (≥ {activeBreakpoint.value}px)
          </div>
        </Box>

        {/* Breakpoint Visualization */}
        {args.showBreakpoints && (
          <Box p="lg" mb="xl" style={{ backgroundColor: '#f6ffed', borderRadius: '8px', border: '2px solid #52c41a' }}>
            <h3 style={{ margin: '0 0 1rem 0', color: '#52c41a', fontSize: '1.125rem', fontWeight: '600' }}>
              📏 Breakpoint Visualization
            </h3>
            <Stack gap="sm">
              {Object.entries(breakpoints).map(([key, value]) => {
                const breakpointValue = value as number;
                const isActive = args.containerWidth >= breakpointValue;
                const isCurrentBreakpoint = activeBreakpoint.key === key;
                
                return (
                  <div
                    key={key}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '0.75rem',
                      backgroundColor: isCurrentBreakpoint ? '#52c41a' : isActive ? '#d9f7be' : '#fff',
                      borderRadius: '6px',
                      border: isCurrentBreakpoint ? '2px solid #52c41a' : '1px solid #e8e8e8',
                      transition: 'all 0.3s',
                    }}
                  >
                    <span style={{ 
                      fontWeight: '600', 
                      fontSize: '0.875rem',
                      color: isCurrentBreakpoint ? '#fff' : '#333',
                      width: '60px'
                    }}>
                      {key}
                    </span>
                    <span style={{ 
                      fontSize: '0.75rem',
                      color: isCurrentBreakpoint ? '#fff' : '#8c8c8c',
                      marginRight: '1rem'
                    }}>
                      ≥ {breakpointValue}px
                    </span>
                    <div style={{ flex: 1, position: 'relative', height: '24px' }}>
                      <div
                        style={{
                          position: 'absolute',
                          left: 0,
                          top: 0,
                          height: '100%',
                          width: isActive ? '100%' : '0%',
                          backgroundColor: isCurrentBreakpoint ? '#fff' : '#52c41a',
                          opacity: isCurrentBreakpoint ? 0.3 : 0.3,
                          borderRadius: '4px',
                          transition: 'width 0.3s',
                        }}
                      />
                      {isCurrentBreakpoint && (
                        <span style={{
                          position: 'absolute',
                          right: '0.5rem',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          fontSize: '0.75rem',
                          fontWeight: 'bold',
                          color: '#fff',
                        }}>
                          ← ACTIVE
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </Stack>
          </Box>
        )}

        {/* resolveResponsiveValue Demo */}
        <Box p="lg" mb="xl" style={{ backgroundColor: '#fff7e6', borderRadius: '8px', border: '2px solid #fa8c16' }}>
          <h3 style={{ margin: '0 0 1rem 0', color: '#fa8c16', fontSize: '1.125rem', fontWeight: '600' }}>
            🔄 resolveResponsiveValue Demo
          </h3>
          <Grid columns={2} gutter="lg">
            <Grid.Col span={{ xs: 2, md: 1 }}>
              <div style={{ fontSize: '0.875rem', fontWeight: '600', color: '#595959', marginBottom: '0.5rem' }}>
                Input (Responsive Object)
              </div>
              <pre style={{
                fontSize: '0.75rem',
                backgroundColor: '#fff',
                padding: '1rem',
                borderRadius: '6px',
                margin: 0,
                overflow: 'auto',
                border: '1px solid #ffd591',
              }}>
{JSON.stringify(responsiveValue, null, 2)}
              </pre>
            </Grid.Col>
            <Grid.Col span={{ xs: 2, md: 1 }}>
              <div style={{ fontSize: '0.875rem', fontWeight: '600', color: '#595959', marginBottom: '0.5rem' }}>
                Output (Resolved Value)
              </div>
              <div style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                color: '#fa8c16',
                backgroundColor: '#fff',
                padding: '1rem',
                borderRadius: '6px',
                textAlign: 'center',
                border: '2px solid #fa8c16',
              }}>
                "{resolvedValue}"
              </div>
              <div style={{ fontSize: '0.75rem', color: '#8c8c8c', marginTop: '0.5rem', textAlign: 'center' }}>
                At {args.containerWidth}px ({activeBreakpoint.key} breakpoint)
              </div>
            </Grid.Col>
          </Grid>
          <pre style={{
            fontSize: '0.75rem',
            backgroundColor: '#fff',
            padding: '1rem',
            borderRadius: '6px',
            marginTop: '1rem',
            overflow: 'auto',
            border: '1px solid #ffd591',
          }}>
{`const value = ${JSON.stringify(responsiveValue)};
const resolved = resolveResponsiveValue(
  value,
  ${args.containerWidth},
  breakpoints
);
// Result: "${resolvedValue}"`}
          </pre>
        </Box>

        {/* resolveSpacing Demo */}
        <Box p="lg" mb="xl" style={{ backgroundColor: '#f9f0ff', borderRadius: '8px', border: '2px solid #722ed1' }}>
          <h3 style={{ margin: '0 0 1rem 0', color: '#722ed1', fontSize: '1.125rem', fontWeight: '600' }}>
            📐 resolveSpacing Demo
          </h3>
          <div style={{ fontSize: '0.875rem', color: '#595959', marginBottom: '1rem' }}>
            Use the "spacingKey" control to select different spacing scale keys and see the resolved CSS value.
          </div>
          <Grid columns={2} gutter="lg">
            <Grid.Col span={{ xs: 2, md: 1 }}>
              <div style={{ fontSize: '0.875rem', fontWeight: '600', color: '#595959', marginBottom: '0.5rem' }}>
                All Spacing Scale Keys
              </div>
              <Stack gap="xs">
                {Object.entries(spacing).map(([key, value]) => {
                  const spacingValue = value as number;
                  const isSelected = key === args.spacingKey;
                  return (
                    <div
                      key={key}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '0.5rem 0.75rem',
                        backgroundColor: isSelected ? '#722ed1' : '#fff',
                        color: isSelected ? '#fff' : '#333',
                        borderRadius: '4px',
                        border: `1px solid ${isSelected ? '#722ed1' : '#e8e8e8'}`,
                        fontSize: '0.75rem',
                      }}
                    >
                      <span style={{ fontWeight: '600' }}>'{key}'</span>
                      <span style={{ opacity: 0.8 }}>→</span>
                      <span>{spacingValue}px</span>
                    </div>
                  );
                })}
              </Stack>
            </Grid.Col>
            <Grid.Col span={{ xs: 2, md: 1 }}>
              <div style={{ fontSize: '0.875rem', fontWeight: '600', color: '#595959', marginBottom: '0.5rem' }}>
                Selected: '{args.spacingKey}'
              </div>
              <div style={{
                fontSize: '2rem',
                fontWeight: 'bold',
                color: '#722ed1',
                backgroundColor: '#fff',
                padding: '2rem',
                borderRadius: '6px',
                textAlign: 'center',
                border: '2px solid #722ed1',
              }}>
                {resolvedSpacing}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#8c8c8c', marginTop: '0.5rem', textAlign: 'center' }}>
                From spacing scale: {spacing[args.spacingKey]}px
              </div>
              <pre style={{
                fontSize: '0.75rem',
                backgroundColor: '#fff',
                padding: '1rem',
                borderRadius: '6px',
                marginTop: '1rem',
                overflow: 'auto',
                border: '1px solid #d3adf7',
              }}>
{`resolveSpacing('${args.spacingKey}')
// Returns: '${resolvedSpacing}'`}
              </pre>
            </Grid.Col>
          </Grid>
        </Box>

        {/* Real Component Example */}
        <Box p="lg" mb="xl" style={{ backgroundColor: '#e6f7ff', borderRadius: '8px', border: '2px solid #1890ff' }}>
          <h3 style={{ margin: '0 0 1rem 0', color: '#1890ff', fontSize: '1.125rem', fontWeight: '600' }}>
            🎯 Real Component Example
          </h3>
          <div style={{ fontSize: '0.875rem', color: '#595959', marginBottom: '1rem' }}>
            A custom component using both utilities together. Resize container to see responsive behavior.
          </div>
          <ResponsiveCustomComponent containerWidth={args.containerWidth} />
        </Box>

        {/* Code Example */}
        <Box p="lg" style={{ backgroundColor: '#f5f5f5', borderRadius: '8px', border: '1px solid #d9d9d9' }}>
          <h3 style={{ margin: '0 0 1rem 0', color: '#333', fontSize: '1.125rem', fontWeight: '600' }}>
            💻 Implementation Pattern
          </h3>
          <pre style={{
            fontSize: '0.75rem',
            backgroundColor: '#fff',
            padding: '1rem',
            borderRadius: '6px',
            margin: 0,
            overflow: 'auto',
            lineHeight: '1.6',
          }}>
{`import { 
  resolveResponsiveValue, 
  resolveSpacing, 
  useElementWidth, 
  getBreakpoints 
} from '@apvee/react-layout-kit';

function CustomComponent({ 
  direction = { xs: 'column', md: 'row' },
  gap = { xs: 'sm', md: 'lg' }
}) {
  const [ref, containerWidth] = useElementWidth();
  const breakpoints = getBreakpoints();
  
  // Resolve responsive direction
  const resolvedDirection = React.useMemo(
    () => resolveResponsiveValue(direction, containerWidth, breakpoints),
    [direction, containerWidth, breakpoints]
  );
  
  // Resolve responsive spacing
  const resolvedGap = React.useMemo(() => {
    const rawGap = resolveResponsiveValue(gap, containerWidth, breakpoints);
    return resolveSpacing(rawGap);
  }, [gap, containerWidth, breakpoints]);
  
  return (
    <div
      ref={ref}
      style={{
        display: 'flex',
        flexDirection: resolvedDirection,
        gap: resolvedGap,
      }}
    >
      {/* content */}
    </div>
  );
}`}
          </pre>
        </Box>
      </div>
    );
  },
  parameters: {
    docs: {
      source: {
        code: `import { 
  resolveResponsiveValue, 
  resolveSpacing, 
  useElementWidth, 
  getBreakpoints 
} from '@apvee/react-layout-kit';
import type { ResponsiveValue, SpacingKey } from '@apvee/react-layout-kit';

// Basic responsive value resolution
const breakpoints = getBreakpoints();
const value = { xs: 'column', md: 'row' };
const resolved = resolveResponsiveValue(value, containerWidth, breakpoints);

// Spacing resolution
const spacingValue = resolveSpacing('md');  // '16px'
const customSpacing = resolveSpacing(24);   // '24px'

// Building a responsive component
function CustomComponent({ 
  direction = { xs: 'column', md: 'row' },
  gap = { xs: 'sm', md: 'lg' }
}) {
  const [ref, containerWidth] = useElementWidth();
  const breakpoints = getBreakpoints();
  
  const resolvedDirection = React.useMemo(
    () => resolveResponsiveValue(direction, containerWidth, breakpoints),
    [direction, containerWidth, breakpoints]
  );
  
  const resolvedGap = React.useMemo(() => {
    const rawGap = resolveResponsiveValue(gap, containerWidth, breakpoints);
    return resolveSpacing(rawGap);
  }, [gap, containerWidth, breakpoints]);
  
  return (
    <div
      ref={ref}
      style={{
        display: 'flex',
        flexDirection: resolvedDirection,
        gap: resolvedGap,
      }}
    >
      {/* content */}
    </div>
  );
}`,
      },
    },
  },
};

/**
 * Demo component showing real usage of both utilities
 */
function ResponsiveCustomComponent({ containerWidth }: { containerWidth: number }) {
  const breakpoints = getBreakpoints();
  
  const direction = { xs: 'column', md: 'row' };
  const gap = { xs: 'sm', md: 'md', lg: 'lg' };
  const padding = { xs: 'sm', md: 'lg' };
  
  const resolvedDirection = resolveResponsiveValue(direction, containerWidth, breakpoints) as 'column' | 'row';
  const resolvedGap = resolveSpacing(resolveResponsiveValue(gap, containerWidth, breakpoints));
  const resolvedPadding = resolveSpacing(resolveResponsiveValue(padding, containerWidth, breakpoints));
  
  return (
    <div style={{ backgroundColor: '#fff', borderRadius: '8px', padding: resolvedPadding, border: '1px solid #d9d9d9' }}>
      <div style={{ fontSize: '0.875rem', fontWeight: '600', color: '#333', marginBottom: '1rem' }}>
        Responsive Flex Container
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: resolvedDirection,
          gap: resolvedGap,
        }}
      >
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            style={{
              flex: 1,
              padding: '1rem',
              backgroundColor: '#f0f5ff',
              borderRadius: '6px',
              textAlign: 'center',
              fontSize: '0.875rem',
              color: '#1890ff',
              fontWeight: '600',
              border: '1px solid #adc6ff',
            }}
          >
            Item {i}
          </div>
        ))}
      </div>
      <div style={{ marginTop: '1rem', fontSize: '0.75rem', color: '#8c8c8c' }}>
        • Direction: <strong>{resolvedDirection}</strong><br />
        • Gap: <strong>{resolvedGap}</strong><br />
        • Padding: <strong>{resolvedPadding}</strong>
      </div>
    </div>
  );
}
