# Slot & Slottable

> Composition primitives enabling the asChild pattern for polymorphic rendering and prop merging.

**Package:** @apvee/react-layout-kit  
**Component Type:** Composition  
**Since:** v1.0.0

---

## Overview

The **Slot** and **Slottable** components enable the powerful `asChild` pattern in React, allowing components to be polymorphic - they can render as their own element or delegate rendering to a child element while maintaining full control over behavior and styling.

When a parent component uses `asChild={true}`, it renders a Slot instead of its default element. The Slot receives all parent props and intelligently merges them with the child element's props:

- **Event handlers** are composed (both execute in sequence)
- **className** strings are concatenated
- **style** objects are merged (child takes precedence)
- **refs** are combined using ref composition

This pattern is compatible with Radix UI's `@radix-ui/react-slot` but implemented without external dependencies.

**Key benefits:**
- Create truly polymorphic components without prop drilling
- Compose behavior across component boundaries
- Maintain parent component logic while customizing rendered element
- Avoid unnecessary wrapper elements in the DOM
- Full TypeScript support with proper ref handling

**When to use:**
- Building polymorphic components (e.g., Button that can render as `<a>`)
- Creating compound components with flexible rendering
- Avoiding wrapper div proliferation
- Composing behavior from multiple components

---

## Components

### Slot

The core composition primitive that merges props with its single child element.

**Key characteristics:**
- Accepts a single React element child (or Slottable wrapper)
- Merges all parent props with child props intelligently
- Composes event handlers (both fire in sequence)
- Combines refs using composition
- Falls back to `<span>` wrapper if child is invalid

### Slottable

Explicit marker for elements that should receive slot props when multiple children exist.

**Key characteristics:**
- Renders as React Fragment (no DOM nodes)
- Marks specific child for prop merging
- Useful when Slot has complex child structure
- Allows multiple children in Slot (only Slottable receives props)

---

## Features

- ✅ **Polymorphic Rendering**: Components can render as any element while maintaining behavior
- ✅ **Intelligent Prop Merging**: Event handlers, className, style, and refs composed correctly
- ✅ **Event Handler Composition**: Both parent and child handlers execute in sequence
- ✅ **className Merging**: Concatenates class names from both sources
- ✅ **Style Merging**: Combines style objects with child styles taking precedence
- ✅ **Ref Composition**: Multiple refs receive the same DOM node
- ✅ **TypeScript Support**: Fully typed with proper generic constraints
- ✅ **Zero Dependencies**: No external dependencies (compatible with Radix implementation)
- ✅ **Fallback Handling**: Gracefully handles invalid children with span wrapper

---

## Props

### SlotProps

Extends `React.HTMLAttributes<HTMLElement>`.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `React.ReactNode` | - | Single React element to receive merged props, or Slottable wrapper with single child |

**Inherited Props:**
- All standard HTML element attributes (`className`, `style`, `onClick`, event handlers, etc.)

### SlottableProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `React.ReactNode` | - | Content to mark as the target for slot prop merging |

---

## Usage

### Basic Slot Usage

```tsx
import { Slot } from '@apvee/react-layout-kit';

function BasicSlotExample() {
  return (
    <Slot
      className="parent-class"
      style={{ padding: 16, backgroundColor: '#f0f0f0' }}
      onClick={() => console.log('Parent clicked')}
    >
      <button
        className="child-class"
        style={{ border: '1px solid blue' }}
        onClick={() => console.log('Child clicked')}
      >
        Click me
      </button>
    </Slot>
  );
}

// Renders as:
// <button 
//   class="parent-class child-class" 
//   style="padding: 16px; background-color: #f0f0f0; border: 1px solid blue"
//   onclick={composedHandler}
// >
//   Click me
// </button>

// Clicking triggers:
// 1. "Child clicked" (child handler first)
// 2. "Parent clicked" (parent handler second)
```

### asChild Pattern with Box

```tsx
import { Box } from '@apvee/react-layout-kit';

function PolymorphicButton() {
  return (
    <Box
      asChild
      p="md"                    // Box spacing
      $borderRadius={8}         // Box styling
      $backgroundColor="#007bff"
      $color="white"
      onClick={() => console.log('Box logic')}
    >
      <button onClick={() => console.log('Button logic')}>
        Styled Button
      </button>
    </Box>
  );
}

// Renders as single button element with:
// - Box padding, border-radius, colors
// - Button semantics and behavior
// - Both click handlers composed
```

### Polymorphic Link

```tsx
import { Box } from '@apvee/react-layout-kit';

function StyledLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Box
      asChild
      p="sm"
      $display="inline-flex"
      $alignItems="center"
      $gap={8}
      $textDecoration="none"
      $color="#007bff"
      $borderRadius={4}
      style={{
        transition: 'background-color 150ms',
      }}
      onMouseEnter={() => console.log('Link hovered')}
    >
      <a href={href}>
        {children}
      </a>
    </Box>
  );
}

// Usage
<StyledLink href="/docs">
  Go to docs →
</StyledLink>

// Renders as:
// <a href="/docs" class="..." style="..." onmouseenter="...">
//   Go to docs →
// </a>
```

### Event Handler Composition

```tsx
import { Slot } from '@apvee/react-layout-kit';

function EventComposition() {
  const [clicks, setClicks] = React.useState(0);

  return (
    <Slot
      onClick={(e) => {
        console.log('Slot handler');
        setClicks(prev => prev + 1);
      }}
    >
      <button onClick={(e) => {
        console.log('Button handler');
        // Both handlers execute unless preventDefault is called
      }}>
        Clicked {clicks} times
      </button>
    </Slot>
  );
}

// Click sequence:
// 1. "Button handler" logs
// 2. "Slot handler" logs
// 3. clicks state increments
```

### Preventing Parent Handler

```tsx
import { Slot } from '@apvee/react-layout-kit';

function ConditionalComposition() {
  return (
    <Slot onClick={() => console.log('Slot handler (may not run)')}>
      <a
        href="#section"
        onClick={(e) => {
          console.log('Link handler');
          e.preventDefault();  // Prevents Slot handler from running
          // Custom navigation logic
        }}
      >
        Navigate
      </a>
    </Slot>
  );
}

// Click result:
// 1. "Link handler" logs
// 2. e.preventDefault() called
// 3. Slot handler DOES NOT run (defaultPrevented is true)
```

### Using Slottable

```tsx
import { Slot, Slottable } from '@apvee/react-layout-kit';

function WithSlottable() {
  return (
    <Slot className="parent-styles">
      <button>
        {/* Icon stays as-is */}
        <span className="icon">🔥</span>
        
        {/* Only Slottable content receives parent props */}
        <Slottable>
          <span>Button Text</span>
        </Slottable>
      </button>
    </Slot>
  );
}

// Result:
// <button>
//   <span class="icon">🔥</span>
//   <span class="parent-styles">Button Text</span>
// </button>
```

### Ref Composition

```tsx
import { Slot } from '@apvee/react-layout-kit';

function RefComposition() {
  const parentRef = React.useRef<HTMLButtonElement>(null);
  const childRef = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    // Both refs receive the same DOM node
    console.log('Same element:', parentRef.current === childRef.current);
    // true
  }, []);

  return (
    <Slot ref={parentRef}>
      <button ref={childRef}>
        Both refs work
      </button>
    </Slot>
  );
}
```

### Complex Composition

```tsx
import { Box, Stack } from '@apvee/react-layout-kit';

interface ButtonProps {
  variant: 'primary' | 'secondary';
  size: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}

function Button({ variant, size, disabled, children, onClick }: ButtonProps) {
  const variantStyles = {
    primary: { $backgroundColor: '#007bff', $color: 'white' },
    secondary: { $backgroundColor: '#6c757d', $color: 'white' },
  };

  const sizeStyles = {
    sm: { p: 'xs' as const, $fontSize: 13 },
    md: { p: 'sm' as const, $fontSize: 14 },
    lg: { p: 'md' as const, $fontSize: 16 },
  };

  return (
    <Box
      asChild
      {...variantStyles[variant]}
      {...sizeStyles[size]}
      $borderRadius={6}
      $border="none"
      $cursor={disabled ? 'not-allowed' : 'pointer'}
      $opacity={disabled ? 0.6 : 1}
      onClick={onClick}
    >
      <button disabled={disabled}>
        {children}
      </button>
    </Box>
  );
}

// Usage
<Stack gap="sm">
  <Button variant="primary" size="md" onClick={() => alert('Clicked')}>
    Primary Button
  </Button>
  
  <Button variant="secondary" size="lg" disabled>
    Disabled Button
  </Button>
</Stack>
```

### Custom Component with asChild

```tsx
import { Slot } from '@apvee/react-layout-kit';

interface CardProps {
  asChild?: boolean;
  elevation?: 1 | 2 | 3;
  padding?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

function Card({ asChild, elevation = 1, padding = 'md', children }: CardProps) {
  const Component = asChild ? Slot : 'div';
  
  const elevationStyles = {
    1: '0 1px 3px rgba(0,0,0,0.12)',
    2: '0 4px 8px rgba(0,0,0,0.15)',
    3: '0 8px 16px rgba(0,0,0,0.18)',
  };

  const paddingValues = {
    sm: 12,
    md: 16,
    lg: 24,
  };

  return (
    <Component
      style={{
        padding: paddingValues[padding],
        borderRadius: 8,
        backgroundColor: 'white',
        boxShadow: elevationStyles[elevation],
      }}
    >
      {children}
    </Component>
  );
}

// Usage as normal div
<Card elevation={2} padding="lg">
  <h3>Card Title</h3>
  <p>Card content</p>
</Card>

// Usage with asChild (render as article)
<Card asChild elevation={2} padding="lg">
  <article>
    <h3>Article Title</h3>
    <p>Article content</p>
  </article>
</Card>
```

---

## useSlot Hook

A utility hook for working with Slot components in a declarative way.

### Hook Signature

```typescript
function useSlot(element: React.ReactElement | null): {
  ref: React.RefCallback<HTMLElement>;
  slotRef: HTMLElement | null;
  isSlot: boolean;
}
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `element` | `React.ReactElement \| null` | React element to check if it's a Slot component |

### Returns

| Property | Type | Description |
|----------|------|-------------|
| `ref` | `React.RefCallback<HTMLElement>` | Callback ref to attach to the element |
| `slotRef` | `HTMLElement \| null` | Reference to the DOM node once mounted |
| `isSlot` | `boolean` | Whether the element is a Slot component |

### Usage Examples

#### Basic useSlot Usage

```tsx
import { Slot, useSlot } from '@apvee/react-layout-kit';

function SlotDetector({ children }: { children: React.ReactElement }) {
  const { ref, slotRef, isSlot } = useSlot(children);
  
  // Clone element with ref attached
  const element = React.cloneElement(children, { ref } as any);
  
  return (
    <div>
      <div>Is Slot: {String(isSlot)}</div>
      <div>Element: {slotRef?.tagName}</div>
      {element}
    </div>
  );
}

// Usage
<SlotDetector>
  <Slot>
    <button>Test</button>
  </Slot>
</SlotDetector>

// Output:
// Is Slot: true
// Element: BUTTON
```

#### Conditional Rendering Based on Slot

```tsx
import { Slot, useSlot } from '@apvee/react-layout-kit';

function ConditionalWrapper({ children }: { children: React.ReactElement }) {
  const { ref, slotRef, isSlot } = useSlot(children);
  
  React.useEffect(() => {
    if (isSlot && slotRef) {
      console.log('Slot detected, applying custom logic');
      slotRef.addEventListener('click', handleSlotClick);
      
      return () => {
        slotRef.removeEventListener('click', handleSlotClick);
      };
    }
  }, [isSlot, slotRef]);
  
  const handleSlotClick = () => {
    console.log('Slot element clicked');
  };
  
  const element = React.cloneElement(children, { ref } as any);
  
  return isSlot ? (
    <div className="slot-wrapper">{element}</div>
  ) : (
    <div className="normal-wrapper">{element}</div>
  );
}
```

#### Measuring Slot DOM Node

```tsx
import { Slot, useSlot } from '@apvee/react-layout-kit';

function SlotDimensions({ children }: { children: React.ReactElement }) {
  const { ref, slotRef, isSlot } = useSlot(children);
  const [dimensions, setDimensions] = React.useState({ width: 0, height: 0 });
  
  React.useEffect(() => {
    if (slotRef) {
      const updateDimensions = () => {
        setDimensions({
          width: slotRef.offsetWidth,
          height: slotRef.offsetHeight,
        });
      };
      
      updateDimensions();
      
      const observer = new ResizeObserver(updateDimensions);
      observer.observe(slotRef);
      
      return () => observer.disconnect();
    }
  }, [slotRef]);
  
  const element = React.cloneElement(children, { ref } as any);
  
  return (
    <div>
      {isSlot && (
        <div style={{ fontSize: 12, marginBottom: 8 }}>
          Size: {dimensions.width}×{dimensions.height}px
        </div>
      )}
      {element}
    </div>
  );
}
```

#### Toggle Between Slot and Normal Element

```tsx
import { Slot, useSlot } from '@apvee/react-layout-kit';

function TogglableSlot() {
  const [useSlotMode, setUseSlotMode] = React.useState(true);
  
  const element = useSlotMode ? (
    <Slot style={{ padding: 16 }}>
      <button>Slot Button</button>
    </Slot>
  ) : (
    <button style={{ padding: 16 }}>
      Normal Button
    </button>
  );
  
  const { ref, slotRef, isSlot } = useSlot(element);
  
  const clonedElement = React.isValidElement(element)
    ? React.cloneElement(element, { ref } as any)
    : element;
  
  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={useSlotMode}
          onChange={(e) => setUseSlotMode(e.currentTarget.checked)}
        />
        Use Slot mode
      </label>
      
      <div style={{ marginTop: 16 }}>
        <div>Mode: {isSlot ? 'Slot' : 'Normal'}</div>
        <div>Tag: {slotRef?.tagName ?? 'Not mounted'}</div>
      </div>
      
      {clonedElement}
    </div>
  );
}
```

---

## Best Practices

### Component Design

**✅ Do:**
- Use Slot when building polymorphic components
- Provide `asChild` prop for flexibility
- Document expected child element types
- Handle edge cases (multiple children, no children, invalid children)
- Use TypeScript generics for type safety

**❌ Don't:**
- Pass multiple direct children to Slot (use Slottable if needed)
- Assume Slot child is always valid
- Forget to handle ref forwarding
- Ignore TypeScript warnings about element types

### Event Handling

**✅ Do:**
- Remember event handlers compose (both run)
- Use `e.preventDefault()` to stop parent handler execution
- Document event handling behavior in component docs
- Test event composition thoroughly

**❌ Don't:**
- Assume only one handler runs
- Forget that child handler runs first
- Ignore `defaultPrevented` flag
- Create complex handler dependencies

### Styling

**✅ Do:**
- Remember className concatenates (both apply)
- Understand style merging order (child wins conflicts)
- Use consistent class naming conventions
- Test with conflicting styles

**❌ Don't:**
- Assume one className overwrites the other
- Forget that style objects merge (not replace)
- Create conflicting style rules without understanding precedence

### Ref Management

**✅ Do:**
- Use `useMergedRef` or similar for ref composition
- Test that all refs receive the node
- Handle cleanup in ref callbacks
- Forward refs properly through component trees

**❌ Don't:**
- Forget to forward refs when using Slot
- Create circular ref dependencies
- Assume only one ref works
- Ignore ref cleanup

### Performance

**✅ Do:**
- Memoize complex props passed to Slot
- Use React.memo for components using asChild when appropriate
- Profile components to ensure no performance regression
- Keep prop merging logic simple

**❌ Don't:**
- Create new function props on every render
- Over-optimize without measuring
- Pass unstable references as props

---

## Advanced Patterns

### Conditional Slot Rendering

```tsx
import { Slot } from '@apvee/react-layout-kit';

interface FlexibleButtonProps {
  asChild?: boolean;
  variant: 'primary' | 'secondary';
  children: React.ReactNode;
  onClick?: () => void;
}

function FlexibleButton({ 
  asChild, 
  variant, 
  children, 
  onClick 
}: FlexibleButtonProps) {
  const Component = asChild ? Slot : 'button';
  
  const variantClasses = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
  };
  
  return (
    <Component
      className={variantClasses[variant]}
      onClick={onClick}
      {...(!asChild && { type: 'button' })}
    >
      {children}
    </Component>
  );
}

// As button
<FlexibleButton variant="primary" onClick={handleClick}>
  Click me
</FlexibleButton>

// As link
<FlexibleButton asChild variant="primary">
  <a href="/page">Navigate</a>
</FlexibleButton>
```

### Slot with Render Props

```tsx
import { Slot } from '@apvee/react-layout-kit';

interface RenderPropsSlotProps {
  children: (props: { open: boolean; toggle: () => void }) => React.ReactElement;
}

function RenderPropsSlot({ children }: RenderPropsSlotProps) {
  const [open, setOpen] = React.useState(false);
  const toggle = () => setOpen(prev => !prev);
  
  const element = children({ open, toggle });
  
  return (
    <Slot onClick={toggle}>
      {element}
    </Slot>
  );
}

// Usage
<RenderPropsSlot>
  {({ open, toggle }) => (
    <button onClick={() => console.log('Child clicked')}>
      {open ? 'Open' : 'Closed'}
    </button>
  )}
</RenderPropsSlot>
```

### Nested Slots

```tsx
import { Box } from '@apvee/react-layout-kit';

function NestedSlots() {
  return (
    <Box asChild p="lg" $backgroundColor="#f0f0f0">
      <div>
        <Box asChild m="sm" $color="blue">
          <span>
            Nested slot composition
          </span>
        </Box>
      </div>
    </Box>
  );
}

// Renders as:
// <div class="..." style="padding: ...; background: ...">
//   <span class="..." style="margin: ...; color: blue">
//     Nested slot composition
//   </span>
// </div>
```

---

## TypeScript

### Type Definitions

```typescript
import type { SlotProps, SlottableProps } from '@apvee/react-layout-kit';

// Basic Slot usage
const slotProps: SlotProps = {
  className: 'parent-class',
  onClick: () => console.log('clicked'),
  children: <button>Child</button>,
};

// Slottable usage
const slottableProps: SlottableProps = {
  children: <span>Marked content</span>,
};
```

### Component with asChild

```typescript
import { Slot } from '@apvee/react-layout-kit';

interface MyComponentProps {
  asChild?: boolean;
  variant: 'primary' | 'secondary';
  children: React.ReactNode;
}

function MyComponent({ asChild, variant, children }: MyComponentProps) {
  const Component = asChild ? Slot : 'div';
  
  return (
    <Component className={`variant-${variant}`}>
      {children}
    </Component>
  );
}

// Type-safe usage
<MyComponent variant="primary">Content</MyComponent>
<MyComponent asChild variant="secondary">
  <article>Article content</article>
</MyComponent>
```

### useSlot Hook Types

```typescript
import { useSlot } from '@apvee/react-layout-kit';

function TypedUseSlot({ children }: { children: React.ReactElement }) {
  // Return type is automatically inferred
  const { ref, slotRef, isSlot } = useSlot(children);
  
  // ref: React.RefCallback<HTMLElement>
  // slotRef: HTMLElement | null
  // isSlot: boolean
  
  return React.cloneElement(children, { ref } as any);
}
```

### Generic Slot Component

```typescript
import { Slot } from '@apvee/react-layout-kit';

interface GenericSlotProps<T extends HTMLElement> {
  children: React.ReactElement;
  onMount?: (element: T) => void;
}

function GenericSlot<T extends HTMLElement>({ 
  children, 
  onMount 
}: GenericSlotProps<T>) {
  const ref = React.useCallback((node: T | null) => {
    if (node && onMount) {
      onMount(node);
    }
  }, [onMount]);
  
  return (
    <Slot ref={ref as any}>
      {children}
    </Slot>
  );
}

// Usage with type inference
<GenericSlot<HTMLButtonElement> onMount={(btn) => {
  // btn is HTMLButtonElement
  console.log(btn.disabled);
}}>
  <button>Typed button</button>
</GenericSlot>
```

---

## Internal Implementation

### Prop Merging Strategy

Slot uses specific merging strategies for different prop types:

1. **Event Handlers** (`onX` props):
   - Both handlers execute in sequence
   - Child handler runs first
   - Parent handler runs second (unless `defaultPrevented`)

2. **className**:
   - Both class strings concatenated: `"parent-class child-class"`

3. **style**:
   - Objects merged with child taking precedence
   - `{ ...parentStyle, ...childStyle }`

4. **refs**:
   - Composed using `composeRefs` utility
   - Both refs receive same DOM node

5. **Other props**:
   - Child props take precedence
   - Parent props used as fallback

### Composition Functions

The implementation uses internal utility functions:

```typescript
// Compose multiple refs into one callback ref
function composeRefs<T>(...refs: Array<React.Ref<T>>): React.RefCallback<T>

// Compose two event handlers
function composeEventHandlers<E>(
  originalHandler?: (event: E) => void,
  ourHandler?: (event: E) => void,
  options?: { checkForDefaultPrevented?: boolean }
): (event: E) => void

// Merge className strings
function composeClassName(original?: string, ours?: string): string | undefined

// Merge style objects
function composeStyle(
  original?: React.CSSProperties,
  ours?: React.CSSProperties
): React.CSSProperties | undefined
```

---

## Related Components

- [Box](./box.md) - Uses Slot for asChild pattern
- [Flex](./flex.md) - Supports asChild rendering
- [Stack](./stack.md) - Supports asChild rendering
- [Group](./group.md) - Supports asChild rendering
- [Grid](./grid.md) - Supports asChild rendering

---

## External Resources

- [Radix UI Slot](https://www.radix-ui.com/primitives/docs/utilities/slot) - Original inspiration
- [Polymorphic React Components](https://www.benmvp.com/blog/polymorphic-react-components/) - Pattern explanation
- [React Ref Forwarding](https://react.dev/reference/react/forwardRef) - Official React docs
- [Event Composition Patterns](https://kentcdodds.com/blog/compound-components-with-react-hooks) - Kent C. Dodds article
