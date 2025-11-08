import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { createStyles, mergeClasses } from '../core/styling';
import { Box } from '../components/Box';
import { Stack } from '../components/Stack';
import { Grid } from '../components/Grid';
import { Flex } from '../components/Flex';

/**
 * Args interface for Styling story controls
 */
interface StylingArgs {
  includeBaseClass: boolean;
  includePrimaryClass: boolean;
  includeActiveClass: boolean;
  includeHoverClass: boolean;
}

/**
 * Meta configuration for Styling Utilities story.
 * CSS-in-JS utilities for building styled components.
 */
const meta: Meta<StylingArgs> = {
  title: 'Advanced/Styling',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
# Styling Utilities

CSS-in-JS utilities for building styled components that integrate with the layout system.

## Key APIs

### createStyles(styleObject)
Wrapper for Emotion's \`css()\` function. Generates a className from a CSS object.

\`\`\`typescript
import { createStyles } from '@apvee/react-layout-kit';

const buttonClass = createStyles({
  padding: '1rem 2rem',
  backgroundColor: '#1890ff',
  color: 'white',
  borderRadius: '6px',
  '&:hover': {
    backgroundColor: '#40a9ff',
  },
});

<button className={buttonClass}>Click me</button>
\`\`\`

### mergeClasses(...classNames)
Wrapper for Emotion's \`cx()\` function. Merges multiple className strings intelligently.

\`\`\`typescript
import { mergeClasses } from '@apvee/react-layout-kit';

const className = mergeClasses(
  'base-class',
  isActive && 'active-class',
  isPrimary && 'primary-class',
  props.className
);

<div className={className}>Content</div>
\`\`\`

## When to Use

- **Custom Components**: Building styled components without direct Emotion dependency
- **Dynamic Styling**: Generate styles based on props or state
- **Conditional Classes**: Merge classes based on conditions
- **Design System**: Keep consistent API with layout components
- **Library Abstraction**: Avoid exposing Emotion as a peer dependency

## When NOT to Use

- **Static Styles**: Use CSS files or styled-components for static styles
- **Simple Components**: Use inline styles for one-off components
- **External Styling**: If using a CSS-in-JS library directly (styled-components, etc.)

## Features

### createStyles

- **CSS-in-JS**: Write CSS as JavaScript objects
- **Type-Safe**: Full TypeScript support for CSS properties
- **Pseudo-Selectors**: Support for :hover, :active, ::before, etc.
- **Media Queries**: Support for @media, @keyframes, etc.
- **Nested Selectors**: Support for nested CSS selectors
- **Auto-Prefixing**: Automatic vendor prefixing via Emotion
- **Deduplication**: Same styles generate same className

### mergeClasses

- **Conditional Merging**: Handles false/null/undefined gracefully
- **Deduplication**: Removes duplicate class names
- **Order Preservation**: Maintains class order for CSS specificity
- **Type-Safe**: TypeScript support for className parameters
- **Performance**: Optimized for runtime performance

## Styling Patterns

### Basic Styling
\`\`\`tsx
import { createStyles } from '@apvee/react-layout-kit';

const cardStyles = createStyles({
  padding: '1.5rem',
  backgroundColor: 'white',
  borderRadius: '8px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
});

function Card({ children }) {
  return <div className={cardStyles}>{children}</div>;
}
\`\`\`

### With Pseudo-Selectors
\`\`\`tsx
const buttonStyles = createStyles({
  padding: '0.75rem 1.5rem',
  backgroundColor: '#1890ff',
  color: 'white',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  transition: 'all 0.2s',
  
  '&:hover': {
    backgroundColor: '#40a9ff',
    transform: 'translateY(-2px)',
  },
  
  '&:active': {
    backgroundColor: '#096dd9',
    transform: 'translateY(0)',
  },
  
  '&:disabled': {
    backgroundColor: '#d9d9d9',
    cursor: 'not-allowed',
  },
});
\`\`\`

### With Media Queries
\`\`\`tsx
const responsiveStyles = createStyles({
  padding: '1rem',
  fontSize: '1rem',
  
  '@media (min-width: 768px)': {
    padding: '1.5rem',
    fontSize: '1.125rem',
  },
  
  '@media (min-width: 1024px)': {
    padding: '2rem',
    fontSize: '1.25rem',
  },
});
\`\`\`

### With Nested Selectors
\`\`\`tsx
const containerStyles = createStyles({
  padding: '2rem',
  backgroundColor: '#f5f5f5',
  
  '& > h2': {
    marginTop: 0,
    color: '#333',
  },
  
  '& > p': {
    lineHeight: 1.6,
    color: '#666',
  },
  
  '& .highlight': {
    backgroundColor: '#fff3cd',
    padding: '0 0.25rem',
  },
});
\`\`\`

### Dynamic Styles with Props
\`\`\`tsx
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'danger';
  size: 'sm' | 'md' | 'lg';
}

function Button({ variant, size, children }: ButtonProps) {
  const baseStyles = createStyles({
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 600,
    transition: 'all 0.2s',
  });
  
  const variantStyles = {
    primary: createStyles({
      backgroundColor: '#1890ff',
      color: 'white',
      '&:hover': { backgroundColor: '#40a9ff' },
    }),
    secondary: createStyles({
      backgroundColor: '#52c41a',
      color: 'white',
      '&:hover': { backgroundColor: '#73d13d' },
    }),
    danger: createStyles({
      backgroundColor: '#ff4d4f',
      color: 'white',
      '&:hover': { backgroundColor: '#ff7875' },
    }),
  };
  
  const sizeStyles = {
    sm: createStyles({ padding: '0.5rem 1rem', fontSize: '0.875rem' }),
    md: createStyles({ padding: '0.75rem 1.5rem', fontSize: '1rem' }),
    lg: createStyles({ padding: '1rem 2rem', fontSize: '1.125rem' }),
  };
  
  const className = mergeClasses(
    baseStyles,
    variantStyles[variant],
    sizeStyles[size]
  );
  
  return <button className={className}>{children}</button>;
}
\`\`\`

## Merging Class Names

### Basic Merging
\`\`\`tsx
import { mergeClasses } from '@apvee/react-layout-kit';

const className = mergeClasses('btn', 'btn-primary');
// Result: 'btn btn-primary'
\`\`\`

### Conditional Merging
\`\`\`tsx
const className = mergeClasses(
  'btn',
  isActive && 'btn-active',
  isPrimary && 'btn-primary',
  isDisabled && 'btn-disabled'
);

// If isActive=true, isPrimary=false, isDisabled=false:
// Result: 'btn btn-active'
\`\`\`

### With Parent Props
\`\`\`tsx
interface MyComponentProps {
  className?: string;
  variant: 'primary' | 'secondary';
  active?: boolean;
}

function MyComponent({ className, variant, active }: MyComponentProps) {
  const styles = createStyles({ padding: '1rem' });
  
  const mergedClassName = mergeClasses(
    styles,
    \`variant-\${variant}\`,
    active && 'active',
    className // Parent's className last for override priority
  );
  
  return <div className={mergedClassName}>Content</div>;
}

// Usage
<MyComponent className="custom-class" variant="primary" active />
// Result: 'css-xyz variant-primary active custom-class'
\`\`\`

## Integration with Layout Components

### Styled Box Component
\`\`\`tsx
import { Box, createStyles, mergeClasses } from '@apvee/react-layout-kit';

interface StyledCardProps {
  className?: string;
  variant?: 'default' | 'bordered' | 'elevated';
  children: React.ReactNode;
}

function StyledCard({ className, variant = 'default', children }: StyledCardProps) {
  const baseStyles = createStyles({
    borderRadius: '8px',
    overflow: 'hidden',
  });
  
  const variantStyles = {
    default: createStyles({
      backgroundColor: 'white',
    }),
    bordered: createStyles({
      backgroundColor: 'white',
      border: '1px solid #d9d9d9',
    }),
    elevated: createStyles({
      backgroundColor: 'white',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    }),
  };
  
  return (
    <Box
      p="lg"
      className={mergeClasses(baseStyles, variantStyles[variant], className)}
    >
      {children}
    </Box>
  );
}
\`\`\`

### Custom Styled Component with Responsive Props
\`\`\`tsx
import { Box, createStyles, mergeClasses } from '@apvee/react-layout-kit';

function Badge({ children, variant = 'default' }: { children: React.ReactNode; variant?: string }) {
  const styles = createStyles({
    display: 'inline-flex',
    alignItems: 'center',
    fontSize: '0.75rem',
    fontWeight: 600,
    borderRadius: '12px',
    transition: 'all 0.2s',
  });
  
  const variantClass = variant === 'primary' ? 'badge-primary' : 'badge-default';
  
  return (
    <Box
      px="sm"
      py="xs"
      className={mergeClasses(styles, variantClass)}
    >
      {children}
    </Box>
  );
}
\`\`\`

## Best Practices

**Do:**
- ✅ Use createStyles for reusable style objects
- ✅ Memoize style generation with useMemo for dynamic styles
- ✅ Put parent's className last in mergeClasses for override priority
- ✅ Use mergeClasses for conditional classes
- ✅ Combine with layout components (Box, Flex, etc.)

**Don't:**
- ❌ Generate styles inside render without memoization
- ❌ Use createStyles for one-off inline styles (use style prop instead)
- ❌ Forget to handle undefined/null in mergeClasses (it's safe)
- ❌ Over-nest selectors (keep specificity low)
- ❌ Mix createStyles with other CSS-in-JS libraries (choose one approach)

## Performance Optimization

### Memoize Dynamic Styles
\`\`\`tsx
function DynamicComponent({ color, size }: { color: string; size: number }) {
  // ✅ GOOD: Memoized
  const styles = React.useMemo(
    () => createStyles({
      backgroundColor: color,
      width: size,
      height: size,
    }),
    [color, size]
  );
  
  return <div className={styles}>Content</div>;
}

// ❌ BAD: Generated on every render
function DynamicComponent({ color, size }) {
  const styles = createStyles({
    backgroundColor: color,
    width: size,
    height: size,
  });
  
  return <div className={styles}>Content</div>;
}
\`\`\`

### Static Styles Outside Component
\`\`\`tsx
// ✅ GOOD: Generated once
const cardStyles = createStyles({
  padding: '1.5rem',
  borderRadius: '8px',
});

function Card() {
  return <div className={cardStyles}>Content</div>;
}
\`\`\`

## TypeScript Support

\`\`\`typescript
import { createStyles, mergeClasses } from '@apvee/react-layout-kit';
import type { CSSObject } from '@emotion/css';

// Type-safe style object
const styles: string = createStyles({
  padding: '1rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
});

// Type-safe class merging
const className: string = mergeClasses(
  'base',
  true && 'conditional',
  false && 'never-included',
  undefined,
  null,
  'final'
);

// Generic style generator
function createButtonStyles(variant: 'primary' | 'secondary'): string {
  const colors: Record<string, CSSObject> = {
    primary: { backgroundColor: '#1890ff', color: 'white' },
    secondary: { backgroundColor: '#52c41a', color: 'white' },
  };
  
  return createStyles(colors[variant]);
}
\`\`\`

## Troubleshooting

**Styles not applying:**
- Check if className is being passed to the element
- Verify CSS specificity (more specific rules win)
- Ensure Emotion is installed (@emotion/css)
- Check for CSS conflicts with global styles

**Classes not merging:**
- Use mergeClasses, not template strings
- Ensure all arguments are strings or falsy values
- Check order of classes (last wins in specificity tie)

**Performance issues:**
- Memoize dynamic styles with useMemo
- Move static styles outside components
- Avoid generating styles on every render
- Use CSS variables for frequently changing values
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    includeBaseClass: {
      control: 'boolean',
      description: 'Include base class in merged result',
      table: {
        category: 'Class Merging',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    includePrimaryClass: {
      control: 'boolean',
      description: 'Include primary variant class',
      table: {
        category: 'Class Merging',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    includeActiveClass: {
      control: 'boolean',
      description: 'Include active state class',
      table: {
        category: 'Class Merging',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    includeHoverClass: {
      control: 'boolean',
      description: 'Include hover state class',
      table: {
        category: 'Class Merging',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<StylingArgs>;

export const Usage: Story = {
  args: {
    includeBaseClass: true,
    includePrimaryClass: false,
    includeActiveClass: false,
    includeHoverClass: false,
  },
  render: (args) => {
    // Demo styles created with createStyles
    const baseButtonStyles = createStyles({
      padding: '0.75rem 1.5rem',
      fontSize: '1rem',
      fontWeight: 600,
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      transition: 'all 0.2s',
      backgroundColor: '#f0f0f0',
      color: '#333',
    });

    const primaryButtonStyles = createStyles({
      backgroundColor: '#1890ff',
      color: 'white',
      '&:hover': {
        backgroundColor: '#40a9ff',
      },
    });

    const activeButtonStyles = createStyles({
      boxShadow: '0 0 0 3px rgba(24, 144, 255, 0.3)',
      transform: 'scale(1.05)',
    });

    const hoverableStyles = createStyles({
      '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
      },
    });

    // Merge classes based on args
    const mergedClassName = mergeClasses(
      args.includeBaseClass && baseButtonStyles,
      args.includePrimaryClass && primaryButtonStyles,
      args.includeActiveClass && activeButtonStyles,
      args.includeHoverClass && hoverableStyles
    );

    return (
      <div style={{ width: '100%', maxWidth: '1200px', margin: '0 auto' }}>
        {/* Hero */}
        <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1rem', color: '#1a1a1a' }}>
            Styling Utilities
          </h1>
          <p style={{ fontSize: '1.125rem', color: '#666', maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>
            CSS-in-JS utilities for building styled components. Wrappers for Emotion's css() and cx() functions.
          </p>
        </div>

        {/* createStyles Demo */}
        <Box p="lg" mb="xl" style={{ backgroundColor: '#f0f5ff', borderRadius: '8px', border: '2px solid #1890ff' }}>
          <h3 style={{ margin: '0 0 1rem 0', color: '#1890ff', fontSize: '1.125rem', fontWeight: '600' }}>
            🎨 createStyles() Demo
          </h3>
          <div style={{ fontSize: '0.875rem', color: '#595959', marginBottom: '1.5rem' }}>
            Generate className from CSS object. Supports pseudo-selectors, media queries, and nested selectors.
          </div>

          <Grid columns={{ xs: 1, md: 2 }} gutter="lg">
            <Grid.Col span={1}>
              <div style={{ fontSize: '0.875rem', fontWeight: '600', color: '#595959', marginBottom: '0.5rem' }}>
                CSS Object Input
              </div>
              <pre style={{
                fontSize: '0.75rem',
                backgroundColor: '#fff',
                padding: '1rem',
                borderRadius: '6px',
                margin: 0,
                overflow: 'auto',
                border: '1px solid #adc6ff',
                lineHeight: '1.6',
              }}>
{`createStyles({
  padding: '0.75rem 1.5rem',
  fontSize: '1rem',
  fontWeight: 600,
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  backgroundColor: '#1890ff',
  color: 'white',
  
  '&:hover': {
    backgroundColor: '#40a9ff',
  },
})`}
              </pre>
            </Grid.Col>
            <Grid.Col span={1}>
              <div style={{ fontSize: '0.875rem', fontWeight: '600', color: '#595959', marginBottom: '0.5rem' }}>
                Generated className
              </div>
              <div style={{
                fontSize: '0.875rem',
                fontFamily: 'monospace',
                backgroundColor: '#fff',
                padding: '1rem',
                borderRadius: '6px',
                border: '2px solid #1890ff',
                color: '#1890ff',
                fontWeight: 'bold',
                wordBreak: 'break-all',
              }}>
                {primaryButtonStyles}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#8c8c8c', marginTop: '0.5rem' }}>
                ℹ️ Same input = same className (deduplicated)
              </div>
            </Grid.Col>
          </Grid>

          <div style={{ marginTop: '1.5rem', padding: '1rem', backgroundColor: '#fff', borderRadius: '6px' }}>
            <div style={{ fontSize: '0.875rem', fontWeight: '600', color: '#595959', marginBottom: '0.75rem' }}>
              Live Preview
            </div>
            <button className={primaryButtonStyles}>
              Styled Button
            </button>
          </div>
        </Box>

        {/* mergeClasses Demo */}
        <Box p="lg" mb="xl" style={{ backgroundColor: '#f6ffed', borderRadius: '8px', border: '2px solid #52c41a' }}>
          <h3 style={{ margin: '0 0 1rem 0', color: '#52c41a', fontSize: '1.125rem', fontWeight: '600' }}>
            🔀 mergeClasses() Demo
          </h3>
          <div style={{ fontSize: '0.875rem', color: '#595959', marginBottom: '1.5rem' }}>
            Conditionally merge multiple classNames. Use controls above to toggle classes on/off.
          </div>

          <Stack gap="md">
            <Box p="md" style={{ backgroundColor: '#fff', borderRadius: '6px', border: '1px solid #b7eb8f' }}>
              <div style={{ fontSize: '0.875rem', fontWeight: '600', color: '#595959', marginBottom: '0.75rem' }}>
                Merge Configuration
              </div>
              <Stack gap="xs">
                <Flex align="center" gap="sm">
                  <input
                    type="checkbox"
                    checked={args.includeBaseClass}
                    readOnly
                    style={{ cursor: 'pointer' }}
                  />
                  <span style={{ fontSize: '0.875rem' }}>
                    <strong>Base Styles</strong>: padding, fontSize, border, borderRadius
                  </span>
                </Flex>
                <Flex align="center" gap="sm">
                  <input
                    type="checkbox"
                    checked={args.includePrimaryClass}
                    readOnly
                    style={{ cursor: 'pointer' }}
                  />
                  <span style={{ fontSize: '0.875rem' }}>
                    <strong>Primary Variant</strong>: blue background, white text
                  </span>
                </Flex>
                <Flex align="center" gap="sm">
                  <input
                    type="checkbox"
                    checked={args.includeActiveClass}
                    readOnly
                    style={{ cursor: 'pointer' }}
                  />
                  <span style={{ fontSize: '0.875rem' }}>
                    <strong>Active State</strong>: focus ring, scale transform
                  </span>
                </Flex>
                <Flex align="center" gap="sm">
                  <input
                    type="checkbox"
                    checked={args.includeHoverClass}
                    readOnly
                    style={{ cursor: 'pointer' }}
                  />
                  <span style={{ fontSize: '0.875rem' }}>
                    <strong>Hover Effects</strong>: translateY, shadow
                  </span>
                </Flex>
              </Stack>
            </Box>

            <Box p="md" style={{ backgroundColor: '#fff', borderRadius: '6px', border: '1px solid #b7eb8f' }}>
              <div style={{ fontSize: '0.875rem', fontWeight: '600', color: '#595959', marginBottom: '0.75rem' }}>
                Merged Result
              </div>
              <pre style={{
                fontSize: '0.75rem',
                backgroundColor: '#f6ffed',
                padding: '1rem',
                borderRadius: '6px',
                margin: 0,
                overflow: 'auto',
                border: '1px solid #b7eb8f',
                lineHeight: '1.6',
              }}>
{`mergeClasses(
  ${args.includeBaseClass ? 'baseButtonStyles' : 'false'},
  ${args.includePrimaryClass ? 'primaryButtonStyles' : 'false'},
  ${args.includeActiveClass ? 'activeButtonStyles' : 'false'},
  ${args.includeHoverClass ? 'hoverableStyles' : 'false'}
)

// Result:
"${mergedClassName}"`}
              </pre>
            </Box>

            <Box p="md" style={{ backgroundColor: '#fff', borderRadius: '6px', border: '1px solid #b7eb8f' }}>
              <div style={{ fontSize: '0.875rem', fontWeight: '600', color: '#595959', marginBottom: '0.75rem' }}>
                Live Preview
              </div>
              <button className={mergedClassName}>
                Dynamic Styled Button
              </button>
              <div style={{ fontSize: '0.75rem', color: '#8c8c8c', marginTop: '0.75rem' }}>
                Toggle controls above to see styles change in real-time
              </div>
            </Box>
          </Stack>
        </Box>

        {/* Real Component Example */}
        <Box p="lg" mb="xl" style={{ backgroundColor: '#fff7e6', borderRadius: '8px', border: '2px solid #fa8c16' }}>
          <h3 style={{ margin: '0 0 1rem 0', color: '#fa8c16', fontSize: '1.125rem', fontWeight: '600' }}>
            🎯 Real Component Example
          </h3>
          <div style={{ fontSize: '0.875rem', color: '#595959', marginBottom: '1.5rem' }}>
            A custom button component using both createStyles and mergeClasses together.
          </div>

          <StyledButtonDemo />
        </Box>

        {/* Integration with Layout Components */}
        <Box p="lg" mb="xl" style={{ backgroundColor: '#f9f0ff', borderRadius: '8px', border: '2px solid #722ed1' }}>
          <h3 style={{ margin: '0 0 1rem 0', color: '#722ed1', fontSize: '1.125rem', fontWeight: '600' }}>
            🔗 Integration with Layout Components
          </h3>
          <div style={{ fontSize: '0.875rem', color: '#595959', marginBottom: '1.5rem' }}>
            Combine styling utilities with Box, Flex, and other layout components.
          </div>

          <IntegrationDemo />
        </Box>

        {/* Best Practices */}
        <Box p="lg" style={{ backgroundColor: '#e6f7ff', borderRadius: '8px', border: '1px solid #91d5ff' }}>
          <h3 style={{ margin: '0 0 1rem 0', color: '#1890ff', fontSize: '1.125rem', fontWeight: '600' }}>
            💡 Best Practices
          </h3>
          <Grid columns={{ xs: 1, md: 2 }} gutter="lg">
            <Grid.Col span={1}>
              <Box p="md" style={{ backgroundColor: '#fff', borderRadius: '6px', height: '100%' }}>
                <h4 style={{ margin: '0 0 0.75rem 0', fontSize: '1rem', fontWeight: '600', color: '#52c41a' }}>
                  ✅ Do
                </h4>
                <Stack gap="sm">
                  {[
                    'Use createStyles for reusable styles',
                    'Memoize dynamic styles with useMemo',
                    'Put parent className last in mergeClasses',
                    'Combine with layout components',
                    'Use for conditional class merging',
                  ].map((item, i) => (
                    <div key={i} style={{ fontSize: '0.875rem', color: '#666', lineHeight: '1.5' }}>
                      • {item}
                    </div>
                  ))}
                </Stack>
              </Box>
            </Grid.Col>
            <Grid.Col span={1}>
              <Box p="md" style={{ backgroundColor: '#fff', borderRadius: '6px', height: '100%' }}>
                <h4 style={{ margin: '0 0 0.75rem 0', fontSize: '1rem', fontWeight: '600', color: '#ff4d4f' }}>
                  ❌ Don't
                </h4>
                <Stack gap="sm">
                  {[
                    'Generate styles on every render',
                    'Use for one-off inline styles',
                    'Over-nest CSS selectors',
                    'Mix with other CSS-in-JS libraries',
                    'Forget to handle falsy values',
                  ].map((item, i) => (
                    <div key={i} style={{ fontSize: '0.875rem', color: '#666', lineHeight: '1.5' }}>
                      • {item}
                    </div>
                  ))}
                </Stack>
              </Box>
            </Grid.Col>
          </Grid>
        </Box>
      </div>
    );
  },
  parameters: {
    docs: {
      source: {
        code: `import { createStyles, mergeClasses } from '@apvee/react-layout-kit';

// Create styles from CSS object
const buttonStyles = createStyles({
  padding: '0.75rem 1.5rem',
  fontSize: '1rem',
  fontWeight: 600,
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  backgroundColor: '#1890ff',
  color: 'white',
  transition: 'all 0.2s',
  
  '&:hover': {
    backgroundColor: '#40a9ff',
  },
  
  '&:active': {
    backgroundColor: '#096dd9',
  },
});

// Merge multiple classNames
const className = mergeClasses(
  'base-class',
  isActive && 'active-class',
  isPrimary && 'primary-class',
  props.className
);

// Complete component example
interface ButtonProps {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  active?: boolean;
  className?: string;
  children: React.ReactNode;
}

function Button({ variant = 'primary', size = 'md', active, className, children }: ButtonProps) {
  const baseStyles = createStyles({
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 600,
    transition: 'all 0.2s',
  });
  
  const variantStyles = {
    primary: createStyles({
      backgroundColor: '#1890ff',
      color: 'white',
      '&:hover': { backgroundColor: '#40a9ff' },
    }),
    secondary: createStyles({
      backgroundColor: '#52c41a',
      color: 'white',
      '&:hover': { backgroundColor: '#73d13d' },
    }),
  };
  
  const sizeStyles = {
    sm: createStyles({ padding: '0.5rem 1rem', fontSize: '0.875rem' }),
    md: createStyles({ padding: '0.75rem 1.5rem', fontSize: '1rem' }),
    lg: createStyles({ padding: '1rem 2rem', fontSize: '1.125rem' }),
  };
  
  const activeStyles = createStyles({
    boxShadow: '0 0 0 3px rgba(24, 144, 255, 0.3)',
  });
  
  const mergedClassName = mergeClasses(
    baseStyles,
    variantStyles[variant],
    sizeStyles[size],
    active && activeStyles,
    className
  );
  
  return <button className={mergedClassName}>{children}</button>;
}

// Usage
<Button variant="primary" size="lg" active>
  Click me
</Button>`,
      },
    },
  },
};

/**
 * Demo component: Styled button with variants
 */
function StyledButtonDemo() {
  const [activeVariant, setActiveVariant] = React.useState<'primary' | 'secondary' | 'danger'>('primary');

  const baseStyles = createStyles({
    padding: '0.75rem 1.5rem',
    fontSize: '1rem',
    fontWeight: 600,
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'all 0.2s',
  });

  const variantStyles = {
    primary: createStyles({
      backgroundColor: '#1890ff',
      color: 'white',
      '&:hover': { backgroundColor: '#40a9ff' },
    }),
    secondary: createStyles({
      backgroundColor: '#52c41a',
      color: 'white',
      '&:hover': { backgroundColor: '#73d13d' },
    }),
    danger: createStyles({
      backgroundColor: '#ff4d4f',
      color: 'white',
      '&:hover': { backgroundColor: '#ff7875' },
    }),
  };

  return (
    <Stack gap="lg">
      <Box p="md" style={{ backgroundColor: '#fff', borderRadius: '6px' }}>
        <div style={{ fontSize: '0.875rem', fontWeight: '600', color: '#595959', marginBottom: '0.75rem' }}>
          Select Variant
        </div>
        <Flex gap="sm">
          {(['primary', 'secondary', 'danger'] as const).map((variant) => (
            <button
              key={variant}
              onClick={() => setActiveVariant(variant)}
              className={mergeClasses(
                baseStyles,
                variantStyles[variant],
                activeVariant === variant && createStyles({ boxShadow: '0 0 0 3px rgba(0,0,0,0.2)' })
              )}
            >
              {variant.charAt(0).toUpperCase() + variant.slice(1)}
            </button>
          ))}
        </Flex>
      </Box>

      <Box p="md" style={{ backgroundColor: '#fff', borderRadius: '6px' }}>
        <div style={{ fontSize: '0.875rem', fontWeight: '600', color: '#595959', marginBottom: '0.75rem' }}>
          Generated Code
        </div>
        <pre style={{
          fontSize: '0.75rem',
          backgroundColor: '#f5f5f5',
          padding: '1rem',
          borderRadius: '6px',
          margin: 0,
          overflow: 'auto',
          lineHeight: '1.6',
        }}>
{`const baseStyles = createStyles({ /* ... */ });
const variantStyles = {
  ${activeVariant}: createStyles({ /* ... */ })
};

mergeClasses(baseStyles, variantStyles.${activeVariant})`}
        </pre>
      </Box>
    </Stack>
  );
}

/**
 * Demo component: Integration with layout components
 */
function IntegrationDemo() {
  const cardStyles = createStyles({
    borderRadius: '8px',
    overflow: 'hidden',
    transition: 'all 0.2s',
    '&:hover': {
      transform: 'translateY(-4px)',
      boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
    },
  });

  return (
    <Grid columns={{ xs: 1, sm: 2, md: 3 }} gutter="lg">
      {[1, 2, 3].map((i) => (
        <Grid.Col key={i} span={1}>
          <Box
            p="lg"
            className={cardStyles}
            style={{
              backgroundColor: 'white',
              border: '1px solid #e8e8e8',
            }}
          >
            <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem', fontWeight: '600', color: '#333' }}>
              Card {i}
            </h4>
            <p style={{ margin: 0, fontSize: '0.875rem', color: '#666', lineHeight: '1.5' }}>
              Combining Box component with createStyles for hover effects and styling.
            </p>
          </Box>
        </Grid.Col>
      ))}
    </Grid>
  );
}
