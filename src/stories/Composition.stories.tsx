import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Slot, Slottable } from '../core/components';
import { Box } from '../components/Box';
import { Stack } from '../components/Stack';
import { Flex } from '../components/Flex';

/**
 * Args interface for Composition story controls
 */
interface CompositionArgs {
  useAsChild: boolean;
  mergeStyles: boolean;
}

/**
 * Meta configuration for Composition API story.
 * Component composition primitives for the asChild pattern.
 */
const meta: Meta<CompositionArgs> = {
  title: 'Advanced/Composition',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
# Composition API

Component composition primitives enabling the **asChild pattern** for maximum flexibility and reusability.

## Key Features

- **Polymorphic Components**: Render as any element or component via \`asChild\`
- **Prop Merging**: Automatic merging of className, style, and event handlers
- **Ref Forwarding**: Maintains ref forwarding through composition layers
- **Type Safety**: Full TypeScript support for composed props
- **Zero Runtime Cost**: Composition happens at render time
- **Framework Agnostic**: Works with any React component or element

## Core Primitives

### Slot
A container component that adopts the first child and merges props with it.

\`\`\`tsx
import { Slot } from '@apvee/react-layout-kit';

function Button({ asChild, ...props }) {
  const Comp = asChild ? Slot : 'button';
  return <Comp {...props} />;
}

// Renders as <a> with Button's props
<Button asChild>
  <a href="/home">Home</a>
</Button>
\`\`\`

### Slottable
Explicitly marks which child should be the slot target when multiple children exist.

\`\`\`tsx
import { Slot, Slottable } from '@apvee/react-layout-kit';

function Button({ asChild, icon, children }) {
  const Comp = asChild ? Slot : 'button';
  return (
    <Comp>
      {icon}
      <Slottable>{children}</Slottable>
    </Comp>
  );
}

// Icon stays, only text content gets slotted
<Button asChild icon={<Icon />}>
  <a href="/home">Home</a>
</Button>
\`\`\`

## When to Use

- **Design System Components**: Allow consumers to control the rendered element
- **Polymorphic Components**: Same component, different HTML semantics
- **Accessibility**: Render correct semantic elements (button vs a vs div)
- **Custom Styling**: Apply design system styles to any component
- **Link Integration**: Use routing library links with styled components
- **Framework Integration**: Integrate with Next.js Link, React Router, etc.

## When NOT to Use

- **Simple Wrappers**: Use regular props if you only need styling
- **Performance Critical**: Adds minimal overhead but still more than direct rendering
- **Type Complexity**: Can make TypeScript types more complex
- **Simple Components**: Overkill for components that don't need polymorphism

## Pattern Examples

### Button Component
\`\`\`tsx
interface ButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  asChild?: boolean;
  variant?: 'primary' | 'secondary';
}

function Button({ asChild, variant = 'primary', ...props }: ButtonProps) {
  const Comp = asChild ? Slot : 'button';
  const className = \`btn btn-\${variant}\`;
  
  return <Comp {...props} className={className} />;
}

// Usage: Render as button
<Button onClick={handleClick}>Click me</Button>

// Usage: Render as link
<Button asChild>
  <a href="/home">Go Home</a>
</Button>

// Usage: With routing library
<Button asChild>
  <Link to="/profile">Profile</Link>
</Button>
\`\`\`

### Layout Component with asChild
\`\`\`tsx
interface CardProps {
  asChild?: boolean;
  padding?: string;
  children: React.ReactNode;
}

function Card({ asChild, padding = '1rem', children, ...props }: CardProps) {
  const Comp = asChild ? Slot : 'div';
  
  return (
    <Comp
      {...props}
      style={{
        padding,
        borderRadius: '8px',
        backgroundColor: 'white',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        ...props.style
      }}
    >
      {children}
    </Comp>
  );
}

// Render as div (default)
<Card>
  <h2>Title</h2>
  <p>Content</p>
</Card>

// Render as article
<Card asChild>
  <article>
    <h2>Article Title</h2>
    <p>Article content</p>
  </article>
</Card>

// Render as custom component
<Card asChild>
  <motion.div animate={{ opacity: 1 }}>
    <p>Animated content</p>
  </motion.div>
</Card>
\`\`\`

### Complex Composition with Slottable
\`\`\`tsx
interface ButtonProps {
  asChild?: boolean;
  icon?: React.ReactNode;
  loading?: boolean;
  children: React.ReactNode;
}

function Button({ asChild, icon, loading, children, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : 'button';
  
  return (
    <Comp {...props} disabled={loading}>
      {loading ? <Spinner /> : icon}
      <Slottable>{children}</Slottable>
    </Comp>
  );
}

// Icon stays, content gets slotted
<Button asChild icon={<HomeIcon />}>
  <a href="/home">Home</a>
</Button>
// Renders: <a href="/home"><HomeIcon />Home</a>

// Without asChild
<Button icon={<HomeIcon />}>Home</Button>
// Renders: <button><HomeIcon />Home</button>
\`\`\`

## Prop Merging Behavior

### ClassName Merging
\`\`\`tsx
// Parent provides: className="btn btn-primary"
// Child provides: className="custom-link"
// Result: className="btn btn-primary custom-link"

<Button asChild className="btn btn-primary">
  <a className="custom-link" href="/home">Home</a>
</Button>
\`\`\`

### Style Merging
\`\`\`tsx
// Parent provides: style={{ padding: '1rem' }}
// Child provides: style={{ color: 'blue' }}
// Result: style={{ padding: '1rem', color: 'blue' }}

<Card asChild style={{ padding: '1rem' }}>
  <div style={{ color: 'blue' }}>Content</div>
</Card>
\`\`\`

### Event Handler Merging
\`\`\`tsx
// Both handlers are called in order: parent first, then child
<Button asChild onClick={parentHandler}>
  <a onClick={childHandler} href="/home">Home</a>
</Button>
\`\`\`

### Ref Forwarding
\`\`\`tsx
function Parent() {
  const parentRef = React.useRef();
  const childRef = React.useRef();
  
  // Both refs are assigned to the same element
  return (
    <Button asChild ref={parentRef}>
      <a ref={childRef} href="/home">Home</a>
    </Button>
  );
}
\`\`\`

## Integration Examples

### Next.js Link
\`\`\`tsx
import Link from 'next/link';
import { Button } from './Button';

function Navigation() {
  return (
    <Button asChild variant="primary">
      <Link href="/dashboard">Dashboard</Link>
    </Button>
  );
}
\`\`\`

### React Router Link
\`\`\`tsx
import { Link } from 'react-router-dom';
import { Button } from './Button';

function Navigation() {
  return (
    <Button asChild variant="primary">
      <Link to="/profile">Profile</Link>
    </Button>
  );
}
\`\`\`

### Framer Motion
\`\`\`tsx
import { motion } from 'framer-motion';
import { Card } from './Card';

function AnimatedCard() {
  return (
    <Card asChild padding="2rem">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <p>Animated card content</p>
      </motion.div>
    </Card>
  );
}
\`\`\`

### Radix UI Primitives
\`\`\`tsx
import * as Dialog from '@radix-ui/react-dialog';
import { Button } from './Button';

function MyDialog() {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button variant="primary">Open Dialog</Button>
      </Dialog.Trigger>
      <Dialog.Content>
        <p>Dialog content</p>
      </Dialog.Content>
    </Dialog.Root>
  );
}
\`\`\`

## Building Components with Slot

### Step 1: Define Props Interface
\`\`\`tsx
interface MyComponentProps extends React.ComponentPropsWithoutRef<'div'> {
  asChild?: boolean;
  variant?: string;
}
\`\`\`

### Step 2: Use Slot Pattern
\`\`\`tsx
function MyComponent({ asChild, variant, ...props }: MyComponentProps) {
  const Comp = asChild ? Slot : 'div';
  
  return (
    <Comp {...props} data-variant={variant}>
      {props.children}
    </Comp>
  );
}
\`\`\`

### Step 3: Add TypeScript Overloads (Optional)
\`\`\`tsx
type MyComponentElement = React.ElementRef<'div'>;

interface MyComponentPropsBase {
  variant?: string;
  children?: React.ReactNode;
}

interface MyComponentPropsAsDiv extends MyComponentPropsBase, React.ComponentPropsWithoutRef<'div'> {
  asChild?: false;
}

interface MyComponentPropsAsChild extends MyComponentPropsBase {
  asChild: true;
}

type MyComponentProps = MyComponentPropsAsDiv | MyComponentPropsAsChild;

const MyComponent = React.forwardRef<MyComponentElement, MyComponentProps>(
  ({ asChild, variant, ...props }, ref) => {
    const Comp = asChild ? Slot : 'div';
    return <Comp {...props} ref={ref} data-variant={variant} />;
  }
);
\`\`\`

## Best Practices

**Do:**
- ✅ Use asChild for components that should be polymorphic
- ✅ Document which props are merged vs replaced
- ✅ Forward refs properly with React.forwardRef
- ✅ Use Slottable when you have multiple children
- ✅ Type your component props correctly
- ✅ Test both asChild and non-asChild cases

**Don't:**
- ❌ Use asChild for every component (adds unnecessary complexity)
- ❌ Forget to handle ref forwarding
- ❌ Assume prop merging behavior without testing
- ❌ Use without understanding the merging logic
- ❌ Over-complicate simple components

## Common Patterns

### Conditional Rendering
\`\`\`tsx
function Button({ asChild, disabled, ...props }) {
  const Comp = asChild ? Slot : 'button';
  
  if (disabled) {
    return (
      <Comp {...props} disabled aria-disabled="true">
        {props.children}
      </Comp>
    );
  }
  
  return <Comp {...props}>{props.children}</Comp>;
}
\`\`\`

### With Default Props
\`\`\`tsx
function Card({ asChild, padding = '1rem', ...props }) {
  const Comp = asChild ? Slot : 'div';
  
  return (
    <Comp
      {...props}
      style={{
        padding,
        ...props.style
      }}
    />
  );
}
\`\`\`

### With Children Manipulation
\`\`\`tsx
function List({ asChild, items, ...props }) {
  const Comp = asChild ? Slot : 'ul';
  
  return (
    <Comp {...props}>
      {items.map(item => (
        <li key={item.id}>{item.label}</li>
      ))}
    </Comp>
  );
}
\`\`\`

## Troubleshooting

**Props not merging correctly:**
- Check prop merging order (parent props come first)
- Verify you're using Slot correctly
- Ensure child component accepts and spreads props

**Ref not working:**
- Use React.forwardRef on your component
- Ensure child component forwards ref

**TypeScript errors:**
- Define proper prop types with asChild conditional types
- Use ComponentPropsWithoutRef for base props
- Consider discriminated union types for asChild variants

**Children not rendering:**
- Check if you need Slottable for multiple children
- Verify child component renders children prop
- Ensure you're not accidentally filtering children

## Performance Considerations

- **Minimal Overhead**: Slot adds negligible runtime cost
- **No Re-renders**: Doesn't cause additional re-renders
- **Prop Spreading**: Same cost as manual prop spreading
- **Ref Merging**: Uses efficient ref callback pattern
- **Memoization**: Works normally with React.memo

## Testing

\`\`\`tsx
import { render } from '@testing-library/react';
import { Button } from './Button';

describe('Button with asChild', () => {
  it('renders as button by default', () => {
    const { container } = render(<Button>Click me</Button>);
    expect(container.querySelector('button')).toBeInTheDocument();
  });

  it('renders as child element with asChild', () => {
    const { container } = render(
      <Button asChild>
        <a href="/home">Home</a>
      </Button>
    );
    expect(container.querySelector('a')).toBeInTheDocument();
    expect(container.querySelector('a')).toHaveAttribute('href', '/home');
  });

  it('merges className correctly', () => {
    const { container } = render(
      <Button asChild className="btn-primary">
        <a className="custom-link" href="/home">Home</a>
      </Button>
    );
    const link = container.querySelector('a');
    expect(link).toHaveClass('btn-primary');
    expect(link).toHaveClass('custom-link');
  });

  it('merges event handlers', () => {
    const parentClick = jest.fn();
    const childClick = jest.fn();
    
    const { container } = render(
      <Button asChild onClick={parentClick}>
        <a onClick={childClick} href="/home">Home</a>
      </Button>
    );
    
    container.querySelector('a')?.click();
    expect(parentClick).toHaveBeenCalled();
    expect(childClick).toHaveBeenCalled();
  });
});
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    useAsChild: {
      control: 'boolean',
      description: 'Render components using asChild pattern',
      table: {
        category: 'Composition',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    mergeStyles: {
      control: 'boolean',
      description: 'Demonstrate style merging behavior',
      table: {
        category: 'Composition',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<CompositionArgs>;

/**
 * Custom Button component demonstrating the asChild pattern
 */
interface CustomButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  asChild?: boolean;
  variant?: 'primary' | 'secondary' | 'outline';
}

const CustomButton = React.forwardRef<HTMLButtonElement, CustomButtonProps>(
  ({ asChild, variant = 'primary', className, style, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';

    const variantStyles = {
      primary: {
        backgroundColor: '#1890ff',
        color: 'white',
        border: 'none',
      },
      secondary: {
        backgroundColor: '#52c41a',
        color: 'white',
        border: 'none',
      },
      outline: {
        backgroundColor: 'transparent',
        color: '#1890ff',
        border: '2px solid #1890ff',
      },
    };

    const baseStyle = {
      padding: '0.75rem 1.5rem',
      borderRadius: '6px',
      fontSize: '1rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.2s',
      ...variantStyles[variant],
      ...style,
    };

    return (
      <Comp
        ref={ref}
        {...props}
        className={className}
        style={baseStyle}
      />
    );
  }
);
CustomButton.displayName = 'CustomButton';

/**
 * Custom Card component with asChild support
 */
interface CustomCardProps extends React.ComponentPropsWithoutRef<'div'> {
  asChild?: boolean;
  padding?: string;
}

const CustomCard = React.forwardRef<HTMLDivElement, CustomCardProps>(
  ({ asChild, padding = '1.5rem', className, style, children, ...props }, ref) => {
    const Comp = asChild ? Slot : 'div';

    const cardStyle = {
      padding,
      borderRadius: '8px',
      backgroundColor: 'white',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      border: '1px solid #e8e8e8',
      ...style,
    };

    return (
      <Comp ref={ref} {...props} className={className} style={cardStyle}>
        {children}
      </Comp>
    );
  }
);
CustomCard.displayName = 'CustomCard';

export const Usage: Story = {
  args: {
    useAsChild: false,
    mergeStyles: false,
  },
  render: (args) => {
    return (
      <div style={{ width: '100%', maxWidth: '1200px', margin: '0 auto' }}>
        {/* Hero */}
        <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1rem', color: '#1a1a1a' }}>
            Composition API
          </h1>
          <p style={{ fontSize: '1.125rem', color: '#666', maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>
            Build polymorphic components with the asChild pattern. Render as any element while preserving behavior.
          </p>
        </div>

        {/* Button Examples */}
        <div style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: '#333' }}>
            🔘 Button Component with asChild
          </h2>
          <p style={{ fontSize: '0.875rem', color: '#666', marginBottom: '1.5rem' }}>
            {args.useAsChild 
              ? 'Using asChild: Button renders as <a> with link behavior but button styling'
              : 'Default: Button renders as <button> element'
            }
          </p>

          <Stack gap="lg">
            <Box p="lg" style={{ backgroundColor: '#f0f5ff', borderRadius: '8px', border: '1px solid #adc6ff' }}>
              <div style={{ fontSize: '0.875rem', fontWeight: '600', color: '#1890ff', marginBottom: '1rem' }}>
                Primary Button {args.useAsChild ? '(as Link)' : '(as Button)'}
              </div>
              {args.useAsChild ? (
                <CustomButton asChild variant="primary">
                  <a href="#primary" style={{ textDecoration: 'none' }}>
                    Go to Primary Section
                  </a>
                </CustomButton>
              ) : (
                <CustomButton variant="primary" onClick={() => alert('Primary clicked!')}>
                  Click Primary Button
                </CustomButton>
              )}
              <pre style={{
                fontSize: '0.75rem',
                backgroundColor: '#fff',
                padding: '1rem',
                borderRadius: '4px',
                marginTop: '1rem',
                overflow: 'auto',
              }}>
                {args.useAsChild
                  ? `<CustomButton asChild variant="primary">
  <a href="#primary">Go to Primary Section</a>
</CustomButton>`
                  : `<CustomButton variant="primary" onClick={handleClick}>
  Click Primary Button
</CustomButton>`}
              </pre>
            </Box>

            <Box p="lg" style={{ backgroundColor: '#f6ffed', borderRadius: '8px', border: '1px solid #b7eb8f' }}>
              <div style={{ fontSize: '0.875rem', fontWeight: '600', color: '#52c41a', marginBottom: '1rem' }}>
                Secondary Button {args.useAsChild ? '(as Link)' : '(as Button)'}
              </div>
              {args.useAsChild ? (
                <CustomButton asChild variant="secondary">
                  <a href="#secondary" style={{ textDecoration: 'none' }}>
                    Go to Secondary Section
                  </a>
                </CustomButton>
              ) : (
                <CustomButton variant="secondary" onClick={() => alert('Secondary clicked!')}>
                  Click Secondary Button
                </CustomButton>
              )}
              <pre style={{
                fontSize: '0.75rem',
                backgroundColor: '#fff',
                padding: '1rem',
                borderRadius: '4px',
                marginTop: '1rem',
                overflow: 'auto',
              }}>
                {args.useAsChild
                  ? `<CustomButton asChild variant="secondary">
  <a href="#secondary">Go to Secondary Section</a>
</CustomButton>`
                  : `<CustomButton variant="secondary" onClick={handleClick}>
  Click Secondary Button
</CustomButton>`}
              </pre>
            </Box>

            <Box p="lg" style={{ backgroundColor: '#fff7e6', borderRadius: '8px', border: '1px solid #ffd591' }}>
              <div style={{ fontSize: '0.875rem', fontWeight: '600', color: '#fa8c16', marginBottom: '1rem' }}>
                Outline Button {args.useAsChild ? '(as Link)' : '(as Button)'}
              </div>
              {args.useAsChild ? (
                <CustomButton asChild variant="outline">
                  <a href="#outline" style={{ textDecoration: 'none' }}>
                    Go to Outline Section
                  </a>
                </CustomButton>
              ) : (
                <CustomButton variant="outline" onClick={() => alert('Outline clicked!')}>
                  Click Outline Button
                </CustomButton>
              )}
              <pre style={{
                fontSize: '0.75rem',
                backgroundColor: '#fff',
                padding: '1rem',
                borderRadius: '4px',
                marginTop: '1rem',
                overflow: 'auto',
              }}>
                {args.useAsChild
                  ? `<CustomButton asChild variant="outline">
  <a href="#outline">Go to Outline Section</a>
</CustomButton>`
                  : `<CustomButton variant="outline" onClick={handleClick}>
  Click Outline Button
</CustomButton>`}
              </pre>
            </Box>
          </Stack>
        </div>

        {/* Card Examples */}
        <div style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: '#333' }}>
            📦 Card Component with asChild
          </h2>
          <p style={{ fontSize: '0.875rem', color: '#666', marginBottom: '1.5rem' }}>
            {args.useAsChild 
              ? 'Using asChild: Card renders as <article> with semantic HTML but card styling'
              : 'Default: Card renders as <div> element'
            }
          </p>

          <Stack gap="lg">
            <CustomCard asChild={args.useAsChild}>
              {args.useAsChild ? (
                <article>
                  <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.25rem', fontWeight: '600', color: '#333' }}>
                    Article Title
                  </h3>
                  <p style={{ margin: 0, fontSize: '0.875rem', color: '#666', lineHeight: '1.6' }}>
                    This card is rendered as an <code style={{ backgroundColor: '#f0f0f0', padding: '2px 6px', borderRadius: '3px' }}>
                      &lt;article&gt;
                    </code> element for better semantics while maintaining card styling.
                  </p>
                </article>
              ) : (
                <>
                  <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.25rem', fontWeight: '600', color: '#333' }}>
                    Regular Card
                  </h3>
                  <p style={{ margin: 0, fontSize: '0.875rem', color: '#666', lineHeight: '1.6' }}>
                    This card is rendered as a <code style={{ backgroundColor: '#f0f0f0', padding: '2px 6px', borderRadius: '3px' }}>
                      &lt;div&gt;
                    </code> element (default behavior).
                  </p>
                </>
              )}
            </CustomCard>

            <pre style={{
              fontSize: '0.75rem',
              backgroundColor: '#f5f5f5',
              padding: '1rem',
              borderRadius: '4px',
              margin: 0,
              overflow: 'auto',
            }}>
              {args.useAsChild
                ? `<CustomCard asChild>
  <article>
    <h3>Article Title</h3>
    <p>Article content...</p>
  </article>
</CustomCard>

// Renders: <article style="padding: 1.5rem; border-radius: 8px; ...">
//            <h3>Article Title</h3>
//            <p>Article content...</p>
//          </article>`
                : `<CustomCard>
  <h3>Regular Card</h3>
  <p>Card content...</p>
</CustomCard>

// Renders: <div style="padding: 1.5rem; border-radius: 8px; ...">
//            <h3>Regular Card</h3>
//            <p>Card content...</p>
//          </div>`}
            </pre>
          </Stack>
        </div>

        {/* Style Merging Demo */}
        <div style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: '#333' }}>
            🎨 Prop Merging Demonstration
          </h2>
          <p style={{ fontSize: '0.875rem', color: '#666', marginBottom: '1.5rem' }}>
            {args.mergeStyles 
              ? 'With merging: Parent and child styles are combined'
              : 'Without merging: Only parent styles apply'
            }
          </p>

          <Flex gap="lg" wrap="wrap">
            <Box p="lg" style={{ backgroundColor: '#f9f0ff', borderRadius: '8px', border: '1px solid #d3adf7', flex: 1, minWidth: '300px' }}>
              <div style={{ fontSize: '0.875rem', fontWeight: '600', color: '#722ed1', marginBottom: '1rem' }}>
                Parent Provides: Blue background, padding
              </div>
              <CustomButton
                asChild
                style={{ backgroundColor: '#1890ff', padding: '1rem 2rem' }}
              >
                <a
                  href="#merge"
                  style={{
                    textDecoration: 'none',
                    ...(args.mergeStyles ? { fontSize: '1.25rem', fontWeight: 'bold' } : {})
                  }}
                >
                  {args.mergeStyles ? 'Merged Styles!' : 'Parent Styles Only'}
                </a>
              </CustomButton>
              <div style={{ fontSize: '0.75rem', color: '#8c8c8c', marginTop: '1rem', lineHeight: '1.5' }}>
                {args.mergeStyles ? (
                  <>
                    ✅ Parent: backgroundColor, padding<br />
                    ✅ Child: fontSize, fontWeight<br />
                    Result: All styles applied
                  </>
                ) : (
                  <>
                    ✅ Parent: backgroundColor, padding<br />
                    ❌ Child: (no additional styles)<br />
                    Result: Only parent styles
                  </>
                )}
              </div>
            </Box>

            <Box p="lg" style={{ backgroundColor: '#f6ffed', borderRadius: '8px', border: '1px solid #b7eb8f', flex: 1, minWidth: '300px' }}>
              <div style={{ fontSize: '0.875rem', fontWeight: '600', color: '#52c41a', marginBottom: '1rem' }}>
                ClassName Merging
              </div>
              <CustomButton
                asChild
                className="parent-class"
              >
                <a
                  href="#class-merge"
                  className={args.mergeStyles ? 'child-class' : ''}
                  style={{ textDecoration: 'none' }}
                >
                  {args.mergeStyles ? 'Both Classes' : 'Parent Class'}
                </a>
              </CustomButton>
              <div style={{ fontSize: '0.75rem', color: '#8c8c8c', marginTop: '1rem', lineHeight: '1.5' }}>
                {args.mergeStyles ? (
                  <>
                    className="parent-class child-class"<br />
                    Both classes are applied
                  </>
                ) : (
                  <>
                    className="parent-class"<br />
                    Only parent class applied
                  </>
                )}
              </div>
            </Box>
          </Flex>

          <pre style={{
            fontSize: '0.75rem',
            backgroundColor: '#f5f5f5',
            padding: '1rem',
            borderRadius: '4px',
            marginTop: '1.5rem',
            overflow: 'auto',
          }}>
{`// Parent provides: backgroundColor, padding
// Child provides: fontSize, fontWeight
<CustomButton
  asChild
  style={{ backgroundColor: '#1890ff', padding: '1rem 2rem' }}
>
  <a style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>
    Merged!
  </a>
</CustomButton>

// Result: ALL styles are applied
// style={{ 
//   backgroundColor: '#1890ff',  // from parent
//   padding: '1rem 2rem',        // from parent
//   fontSize: '1.25rem',         // from child
//   fontWeight: 'bold'           // from child
// }}`}
          </pre>
        </div>

        {/* Key Concepts */}
        <div style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: '#333' }}>
            💡 Key Concepts
          </h2>
          <Stack gap="md">
            <Box p="lg" style={{ backgroundColor: '#e6f7ff', borderRadius: '8px', border: '1px solid #91d5ff' }}>
              <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem', fontWeight: '600', color: '#1890ff' }}>
                Polymorphic Rendering
              </h4>
              <p style={{ margin: 0, fontSize: '0.875rem', color: '#666', lineHeight: '1.6' }}>
                The same component can render as different HTML elements or custom components,
                preserving its styling and behavior while adapting to the context.
              </p>
            </Box>

            <Box p="lg" style={{ backgroundColor: '#f6ffed', borderRadius: '8px', border: '1px solid #b7eb8f' }}>
              <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem', fontWeight: '600', color: '#52c41a' }}>
                Prop Merging
              </h4>
              <p style={{ margin: 0, fontSize: '0.875rem', color: '#666', lineHeight: '1.6' }}>
                When using asChild, props from both parent and child are intelligently merged.
                className is concatenated, style is merged, and event handlers are chained.
              </p>
            </Box>

            <Box p="lg" style={{ backgroundColor: '#fff7e6', borderRadius: '8px', border: '1px solid #ffd591' }}>
              <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem', fontWeight: '600', color: '#fa8c16' }}>
                Semantic HTML
              </h4>
              <p style={{ margin: 0, fontSize: '0.875rem', color: '#666', lineHeight: '1.6' }}>
                Use asChild to maintain proper HTML semantics (button vs a vs div) while keeping
                consistent styling and behavior across your design system.
              </p>
            </Box>

            <Box p="lg" style={{ backgroundColor: '#f9f0ff', borderRadius: '8px', border: '1px solid #d3adf7' }}>
              <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem', fontWeight: '600', color: '#722ed1' }}>
                Framework Integration
              </h4>
              <p style={{ margin: 0, fontSize: '0.875rem', color: '#666', lineHeight: '1.6' }}>
                Seamlessly integrate with Next.js Link, React Router, Framer Motion, and other
                libraries by rendering your styled components as their custom elements.
              </p>
            </Box>
          </Stack>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      source: {
        code: `// Define a component with asChild support
import { Slot } from '@apvee/react-layout-kit';

interface ButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  asChild?: boolean;
  variant?: 'primary' | 'secondary';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ asChild, variant = 'primary', ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    
    return (
      <Comp
        ref={ref}
        {...props}
        className={\`btn btn-\${variant}\`}
      />
    );
  }
);

// Usage: Default rendering (as button)
<Button onClick={handleClick}>
  Click me
</Button>

// Usage: Render as link
<Button asChild>
  <a href="/home">Go Home</a>
</Button>

// Usage: With Next.js Link
import Link from 'next/link';

<Button asChild>
  <Link href="/dashboard">Dashboard</Link>
</Button>

// Usage: With React Router
import { Link } from 'react-router-dom';

<Button asChild>
  <Link to="/profile">Profile</Link>
</Button>

// Usage: With Framer Motion
import { motion } from 'framer-motion';

<Card asChild>
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
  >
    <p>Animated content</p>
  </motion.div>
</Card>

// Advanced: Using Slottable for complex children
import { Slot, Slottable } from '@apvee/react-layout-kit';

function Button({ asChild, icon, children, ...props }) {
  const Comp = asChild ? Slot : 'button';
  
  return (
    <Comp {...props}>
      {icon}
      <Slottable>{children}</Slottable>
    </Comp>
  );
}

// Icon stays, text gets slotted
<Button asChild icon={<HomeIcon />}>
  <a href="/home">Home</a>
</Button>
// Renders: <a href="/home"><HomeIcon />Home</a>`,
      },
    },
  },
};
