import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import useMergedRef from '@react-hook/merged-ref';
import { Box } from '../components/Box';
import { Stack } from '../components/Stack';
import { Grid } from '../components/Grid';
import { Flex } from '../components/Flex';

/**
 * Args interface for useMergedRef story controls
 */
interface UseMergedRefArgs {
  showRefCount: boolean;
  enableInteraction: boolean;
}

/**
 * Meta configuration for useMergedRef hook story.
 * Hook for merging multiple refs into a single ref callback.
 */
const meta: Meta<UseMergedRefArgs> = {
  title: 'Hooks/useMergedRef',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
# useMergedRef

Hook for merging multiple refs into a single ref callback. Essential for components that need both internal and forwarded refs.

## Overview

\`useMergedRef\` is a re-export of [@react-hook/merged-ref](https://www.npmjs.com/package/@react-hook/merged-ref). It allows you to combine multiple refs (RefObject, RefCallback, or both) into a single ref that can be passed to a component.

\`\`\`typescript
import { useMergedRef } from '@apvee/react-layout-kit';

function MyComponent({ children }, forwardedRef) {
  const internalRef = React.useRef<HTMLDivElement>(null);
  const mergedRef = useMergedRef(internalRef, forwardedRef);
  
  return <div ref={mergedRef}>{children}</div>;
}
\`\`\`

## When to Use

- **Forwarded Refs**: Component needs internal ref AND accepts forwarded ref
- **Multiple Refs**: Need to attach multiple refs to single element
- **Measurement + Forwarding**: Internal width/height measurement + parent control
- **asChild Pattern**: Slot components that merge parent and child refs
- **HOCs**: Higher-order components that forward refs
- **Hooks with Refs**: Custom hooks that return refs + component forwards ref

## When NOT to Use

- **Single Ref**: Only one ref needed (use ref directly)
- **No Ref Forwarding**: Component doesn't accept external refs
- **Simple Components**: No internal ref logic needed

## Key Features

- **Multiple Ref Types**: Supports RefObject, RefCallback, null, undefined
- **Type-Safe**: Full TypeScript support with generics
- **Zero Re-renders**: Doesn't cause unnecessary re-renders
- **Stable Reference**: Returns stable callback ref
- **Cleanup**: Properly cleans up all refs on unmount
- **Order Independent**: All refs are updated regardless of order

## Basic Usage

### With React.forwardRef
\`\`\`tsx
import { useMergedRef } from '@apvee/react-layout-kit';
import React from 'react';

const CustomInput = React.forwardRef<HTMLInputElement, { label: string }>(
  ({ label }, forwardedRef) => {
    const internalRef = React.useRef<HTMLInputElement>(null);
    const mergedRef = useMergedRef(internalRef, forwardedRef);
    
    // Can use internalRef for internal logic
    React.useEffect(() => {
      console.log('Input width:', internalRef.current?.offsetWidth);
    }, []);
    
    return (
      <div>
        <label>{label}</label>
        <input ref={mergedRef} />
      </div>
    );
  }
);
\`\`\`

### With Multiple Refs
\`\`\`tsx
function MyComponent({ children }, forwardedRef) {
  const measureRef = React.useRef<HTMLDivElement>(null);
  const scrollRef = React.useRef<HTMLDivElement>(null);
  
  // Merge internal refs + forwarded ref
  const mergedRef = useMergedRef(measureRef, scrollRef, forwardedRef);
  
  // All refs point to the same element
  React.useEffect(() => {
    console.log('Width:', measureRef.current?.offsetWidth);
    console.log('ScrollTop:', scrollRef.current?.scrollTop);
  }, []);
  
  return <div ref={mergedRef}>{children}</div>;
}
\`\`\`

### With Callback Refs
\`\`\`tsx
function MyComponent({ children }, forwardedRef) {
  const internalRef = React.useRef<HTMLDivElement>(null);
  
  const callbackRef = React.useCallback((node: HTMLDivElement | null) => {
    if (node) {
      console.log('Element mounted:', node);
    } else {
      console.log('Element unmounted');
    }
  }, []);
  
  // Merge RefObject + RefCallback + forwarded ref
  const mergedRef = useMergedRef(internalRef, callbackRef, forwardedRef);
  
  return <div ref={mergedRef}>{children}</div>;
}
\`\`\`

## Advanced Patterns

### With useElementWidth Hook
\`\`\`tsx
import { useElementWidth, useMergedRef } from '@apvee/react-layout-kit';

const ResponsiveComponent = React.forwardRef<HTMLDivElement, Props>(
  ({ children }, forwardedRef) => {
    const [measureRef, width] = useElementWidth<HTMLDivElement>();
    const mergedRef = useMergedRef(measureRef, forwardedRef);
    
    return (
      <div ref={mergedRef}>
        <p>Width: {width}px</p>
        {children}
      </div>
    );
  }
);
\`\`\`

### With Focus Management
\`\`\`tsx
interface InputProps {
  autoFocus?: boolean;
}

const CustomInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ autoFocus }, forwardedRef) => {
    const internalRef = React.useRef<HTMLInputElement>(null);
    const mergedRef = useMergedRef(internalRef, forwardedRef);
    
    React.useEffect(() => {
      if (autoFocus && internalRef.current) {
        internalRef.current.focus();
      }
    }, [autoFocus]);
    
    return <input ref={mergedRef} />;
  }
);
\`\`\`

### With Scroll Management
\`\`\`tsx
const ScrollableContainer = React.forwardRef<HTMLDivElement, Props>(
  ({ children, scrollToTop }, forwardedRef) => {
    const internalRef = React.useRef<HTMLDivElement>(null);
    const mergedRef = useMergedRef(internalRef, forwardedRef);
    
    React.useEffect(() => {
      if (scrollToTop && internalRef.current) {
        internalRef.current.scrollTop = 0;
      }
    }, [scrollToTop]);
    
    return (
      <div ref={mergedRef} style={{ overflow: 'auto', maxHeight: '400px' }}>
        {children}
      </div>
    );
  }
);
\`\`\`

### With Intersection Observer
\`\`\`tsx
const LazyComponent = React.forwardRef<HTMLDivElement, Props>(
  ({ children, onVisible }, forwardedRef) => {
    const internalRef = React.useRef<HTMLDivElement>(null);
    const mergedRef = useMergedRef(internalRef, forwardedRef);
    
    React.useEffect(() => {
      const node = internalRef.current;
      if (!node) return;
      
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            onVisible?.();
          }
        },
        { threshold: 0.1 }
      );
      
      observer.observe(node);
      return () => observer.disconnect();
    }, [onVisible]);
    
    return <div ref={mergedRef}>{children}</div>;
  }
);
\`\`\`

## Integration with asChild Pattern

\`useMergedRef\` is used internally by the Slot component to merge refs when using the asChild pattern:

\`\`\`tsx
import { Slot, useMergedRef } from '@apvee/react-layout-kit';

function Button({ asChild, ...props }, forwardedRef) {
  const internalRef = React.useRef<HTMLButtonElement>(null);
  const mergedRef = useMergedRef(internalRef, forwardedRef);
  
  const Comp = asChild ? Slot : 'button';
  
  // Slot automatically merges refs from parent and child
  return <Comp ref={mergedRef} {...props} />;
}

// Parent ref and child ref both work
<Button ref={parentRef} asChild>
  <a ref={childRef} href="/home">Home</a>
</Button>
\`\`\`

## TypeScript Support

### Basic Typing
\`\`\`typescript
import { useMergedRef } from '@apvee/react-layout-kit';
import type { RefObject } from 'react';

const MyComponent = React.forwardRef<HTMLDivElement, Props>(
  (props, forwardedRef) => {
    const internalRef = React.useRef<HTMLDivElement>(null);
    
    // TypeScript knows this returns RefCallback<HTMLDivElement>
    const mergedRef = useMergedRef(internalRef, forwardedRef);
    
    return <div ref={mergedRef}>Content</div>;
  }
);
\`\`\`

### Generic Component
\`\`\`typescript
type Element = HTMLElement;
type Props<T extends Element> = {
  elementType?: string;
  children?: React.ReactNode;
};

const GenericComponent = React.forwardRef(
  <T extends Element = HTMLDivElement>(
    { elementType = 'div', children }: Props<T>,
    forwardedRef: React.ForwardedRef<T>
  ) => {
    const internalRef = React.useRef<T>(null);
    const mergedRef = useMergedRef(internalRef, forwardedRef);
    
    return React.createElement(elementType, { ref: mergedRef }, children);
  }
) as <T extends Element = HTMLDivElement>(
  props: Props<T> & { ref?: React.Ref<T> }
) => React.ReactElement;
\`\`\`

## Best Practices

**Do:**
- ✅ Use with React.forwardRef for components that forward refs
- ✅ Merge internal measurement refs with forwarded refs
- ✅ Use for multiple refs on the same element
- ✅ Handle null/undefined refs gracefully (hook does this)
- ✅ Memoize callback refs passed to useMergedRef
- ✅ Document which refs your component uses internally

**Don't:**
- ❌ Use if you only have a single ref
- ❌ Create new refs on every render (use useRef)
- ❌ Forget to use React.forwardRef when accepting external refs
- ❌ Mutate refs directly (read-only except for .current)
- ❌ Over-complicate with too many refs (3+ is usually a sign)

## Common Patterns

### Measure + Forward
\`\`\`tsx
const MeasuredBox = React.forwardRef<HTMLDivElement, BoxProps>(
  (props, forwardedRef) => {
    const [measureRef, width] = useElementWidth<HTMLDivElement>();
    const mergedRef = useMergedRef(measureRef, forwardedRef);
    
    return (
      <Box ref={mergedRef} {...props}>
        Width: {width}px
      </Box>
    );
  }
);
\`\`\`

### Focus + Forward
\`\`\`tsx
const AutoFocusInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ autoFocus, ...props }, forwardedRef) => {
    const internalRef = React.useRef<HTMLInputElement>(null);
    const mergedRef = useMergedRef(internalRef, forwardedRef);
    
    React.useEffect(() => {
      if (autoFocus) internalRef.current?.focus();
    }, [autoFocus]);
    
    return <input ref={mergedRef} {...props} />;
  }
);
\`\`\`

### Scroll + Forward
\`\`\`tsx
const ScrollToTop = React.forwardRef<HTMLDivElement, ScrollProps>(
  ({ trigger, children }, forwardedRef) => {
    const internalRef = React.useRef<HTMLDivElement>(null);
    const mergedRef = useMergedRef(internalRef, forwardedRef);
    
    React.useEffect(() => {
      internalRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    }, [trigger]);
    
    return <div ref={mergedRef}>{children}</div>;
  }
);
\`\`\`

## Performance Considerations

- **Stable Reference**: useMergedRef returns a stable ref callback
- **No Re-renders**: Changing refs doesn't cause re-renders
- **Cleanup**: Properly cleans up all refs on unmount
- **Memoization**: Memoize callback refs to avoid recreating merged ref

\`\`\`tsx
// ✅ GOOD: Memoized callback ref
const callbackRef = React.useCallback((node: HTMLDivElement | null) => {
  if (node) console.log('Mounted');
}, []);

const mergedRef = useMergedRef(internalRef, callbackRef, forwardedRef);

// ❌ BAD: New callback on every render
const mergedRef = useMergedRef(
  internalRef,
  (node) => { if (node) console.log('Mounted'); },
  forwardedRef
);
\`\`\`

## Troubleshooting

**Refs not updating:**
- Ensure you're using React.forwardRef when accepting external refs
- Check that refs are actually being passed down
- Verify element is rendered (not conditional without ref)

**TypeScript errors:**
- Ensure ref types match element type (HTMLDivElement, etc.)
- Use React.ForwardedRef<T> type for forwarded refs
- Check that all refs in useMergedRef have same type

**Memory leaks:**
- useMergedRef handles cleanup automatically
- Ensure you're not storing refs in external state
- Don't manually manage ref cleanup (let hook do it)

## Testing

\`\`\`tsx
import { render } from '@testing-library/react';
import { useMergedRef } from '@apvee/react-layout-kit';

describe('useMergedRef', () => {
  it('merges internal and forwarded refs', () => {
    const forwardedRef = React.createRef<HTMLDivElement>();
    
    const Component = React.forwardRef<HTMLDivElement>((props, ref) => {
      const internalRef = React.useRef<HTMLDivElement>(null);
      const mergedRef = useMergedRef(internalRef, ref);
      
      return <div ref={mergedRef}>Content</div>;
    });
    
    render(<Component ref={forwardedRef} />);
    
    expect(forwardedRef.current).toBeInstanceOf(HTMLDivElement);
    expect(forwardedRef.current?.textContent).toBe('Content');
  });
  
  it('calls callback refs', () => {
    const callbackRef = jest.fn();
    
    const Component = React.forwardRef<HTMLDivElement>((props, ref) => {
      const internalRef = React.useRef<HTMLDivElement>(null);
      const mergedRef = useMergedRef(internalRef, callbackRef, ref);
      
      return <div ref={mergedRef}>Content</div>;
    });
    
    const { unmount } = render(<Component />);
    
    expect(callbackRef).toHaveBeenCalledWith(expect.any(HTMLDivElement));
    
    unmount();
    expect(callbackRef).toHaveBeenCalledWith(null);
  });
});
\`\`\`

## Related Hooks

- **useElementWidth**: Measures element width, returns ref for merging
- **useContainerWidth**: Alias for useElementWidth
- **useSlot**: Uses merged refs internally for asChild pattern

## External Resources

- [@react-hook/merged-ref NPM](https://www.npmjs.com/package/@react-hook/merged-ref)
- [React Refs Guide](https://react.dev/reference/react/useRef)
- [React forwardRef API](https://react.dev/reference/react/forwardRef)
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    showRefCount: {
      control: 'boolean',
      description: 'Show how many refs point to the element',
      table: {
        category: 'Display',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    enableInteraction: {
      control: 'boolean',
      description: 'Enable interactive demonstrations',
      table: {
        category: 'Interaction',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<UseMergedRefArgs>;

export const Usage: Story = {
  args: {
    showRefCount: true,
    enableInteraction: true,
  },
  render: (args) => {
    return (
      <div style={{ width: '100%', maxWidth: '1200px', margin: '0 auto' }}>
        {/* Hero */}
        <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1rem', color: '#1a1a1a' }}>
            useMergedRef
          </h1>
          <p style={{ fontSize: '1.125rem', color: '#666', maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>
            Hook for merging multiple refs into a single ref callback. Essential for forwarding refs with internal logic.
          </p>
        </div>

        {/* Basic Example */}
        <Box p="lg" mb="xl" style={{ backgroundColor: '#f0f5ff', borderRadius: '8px', border: '2px solid #1890ff' }}>
          <h3 style={{ margin: '0 0 1rem 0', color: '#1890ff', fontSize: '1.125rem', fontWeight: '600' }}>
            📍 Basic Ref Merging
          </h3>
          <div style={{ fontSize: '0.875rem', color: '#595959', marginBottom: '1.5rem' }}>
            Component with internal ref + forwarded ref. Both refs point to the same element.
          </div>
          <BasicRefExample showCount={args.showRefCount} />
        </Box>

        {/* Multiple Refs */}
        <Box p="lg" mb="xl" style={{ backgroundColor: '#f6ffed', borderRadius: '8px', border: '2px solid #52c41a' }}>
          <h3 style={{ margin: '0 0 1rem 0', color: '#52c41a', fontSize: '1.125rem', fontWeight: '600' }}>
            🔗 Multiple Refs on Same Element
          </h3>
          <div style={{ fontSize: '0.875rem', color: '#595959', marginBottom: '1.5rem' }}>
            Merging 3 refs: measure ref, scroll ref, and forwarded ref. All point to the same element.
          </div>
          <MultipleRefsExample showCount={args.showRefCount} enableInteraction={args.enableInteraction} />
        </Box>

        {/* Width Measurement + Forward */}
        <Box p="lg" mb="xl" style={{ backgroundColor: '#fff7e6', borderRadius: '8px', border: '2px solid #fa8c16' }}>
          <h3 style={{ margin: '0 0 1rem 0', color: '#fa8c16', fontSize: '1.125rem', fontWeight: '600' }}>
            📏 Width Measurement + Ref Forwarding
          </h3>
          <div style={{ fontSize: '0.875rem', color: '#595959', marginBottom: '1.5rem' }}>
            Common pattern: internal measurement ref merged with forwarded ref for parent control.
          </div>
          <MeasurementExample showCount={args.showRefCount} enableInteraction={args.enableInteraction} />
        </Box>

        {/* Focus Management */}
        <Box p="lg" mb="xl" style={{ backgroundColor: '#f9f0ff', borderRadius: '8px', border: '2px solid #722ed1' }}>
          <h3 style={{ margin: '0 0 1rem 0', color: '#722ed1', fontSize: '1.125rem', fontWeight: '600' }}>
            🎯 Focus Management + Ref Forwarding
          </h3>
          <div style={{ fontSize: '0.875rem', color: '#595959', marginBottom: '1.5rem' }}>
            Internal focus logic with external ref forwarding. Parent can also control focus.
          </div>
          <FocusExample showCount={args.showRefCount} enableInteraction={args.enableInteraction} />
        </Box>

        {/* Code Examples */}
        <Box p="lg" style={{ backgroundColor: '#e6f7ff', borderRadius: '8px', border: '1px solid #91d5ff' }}>
          <h3 style={{ margin: '0 0 1rem 0', color: '#1890ff', fontSize: '1.125rem', fontWeight: '600' }}>
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
{`import { useMergedRef } from '@apvee/react-layout-kit';
import React from 'react';

const MyComponent = React.forwardRef<HTMLDivElement, Props>(
  ({ children }, forwardedRef) => {
    // Internal ref for component logic
    const internalRef = React.useRef<HTMLDivElement>(null);
    
    // Merge internal ref with forwarded ref
    const mergedRef = useMergedRef(internalRef, forwardedRef);
    
    // Use internal ref for internal logic
    React.useEffect(() => {
      console.log('Width:', internalRef.current?.offsetWidth);
    }, []);
    
    // Both refs point to the same element
    return <div ref={mergedRef}>{children}</div>;
  }
);

// Usage: Parent can access element via ref
function Parent() {
  const parentRef = React.useRef<HTMLDivElement>(null);
  
  const handleClick = () => {
    // Parent can control element
    parentRef.current?.scrollIntoView();
  };
  
  return (
    <>
      <button onClick={handleClick}>Scroll to Element</button>
      <MyComponent ref={parentRef}>Content</MyComponent>
    </>
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
        code: `import { useMergedRef } from '@apvee/react-layout-kit';
import React from 'react';

// Basic pattern: Internal ref + Forwarded ref
const MyComponent = React.forwardRef<HTMLDivElement, Props>(
  ({ children }, forwardedRef) => {
    const internalRef = React.useRef<HTMLDivElement>(null);
    const mergedRef = useMergedRef(internalRef, forwardedRef);
    
    return <div ref={mergedRef}>{children}</div>;
  }
);

// Multiple refs
const MultiRefComponent = React.forwardRef<HTMLDivElement, Props>(
  ({ children }, forwardedRef) => {
    const measureRef = React.useRef<HTMLDivElement>(null);
    const scrollRef = React.useRef<HTMLDivElement>(null);
    
    const mergedRef = useMergedRef(measureRef, scrollRef, forwardedRef);
    
    return <div ref={mergedRef}>{children}</div>;
  }
);

// With measurement hook
import { useElementWidth } from '@apvee/react-layout-kit';

const MeasuredComponent = React.forwardRef<HTMLDivElement, Props>(
  ({ children }, forwardedRef) => {
    const [measureRef, width] = useElementWidth<HTMLDivElement>();
    const mergedRef = useMergedRef(measureRef, forwardedRef);
    
    return (
      <div ref={mergedRef}>
        Width: {width}px
        {children}
      </div>
    );
  }
);`,
      },
    },
  },
};

/**
 * Basic ref merging example
 */
function BasicRefExample({ showCount }: { showCount: boolean }) {
  const [refCount, setRefCount] = React.useState(0);

  const InnerComponent = React.forwardRef<HTMLDivElement>((props, forwardedRef) => {
    const internalRef = React.useRef<HTMLDivElement>(null);
    const mergedRef = useMergedRef(internalRef, forwardedRef);

    React.useEffect(() => {
      setRefCount(2); // Internal + forwarded
    }, []);

    return (
      <Box
        ref={mergedRef}
        p="lg"
        style={{ backgroundColor: '#fff', borderRadius: '6px', border: '2px dashed #1890ff' }}
      >
        <div style={{ fontSize: '0.875rem', color: '#333', textAlign: 'center' }}>
          Component Content
          {showCount && (
            <div style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: '#1890ff', fontWeight: 'bold' }}>
              🔗 {refCount} refs pointing to this element
            </div>
          )}
        </div>
      </Box>
    );
  });

  const parentRef = React.useRef<HTMLDivElement>(null);

  return (
    <Stack gap="md">
      <InnerComponent ref={parentRef} />
      <Box p="md" style={{ backgroundColor: '#fff', borderRadius: '6px' }}>
        <pre style={{ fontSize: '0.75rem', margin: 0, lineHeight: '1.6' }}>
{`const MyComponent = React.forwardRef((props, forwardedRef) => {
  const internalRef = useRef(null);
  const mergedRef = useMergedRef(internalRef, forwardedRef);
  
  return <div ref={mergedRef}>Content</div>;
});

const parentRef = useRef(null);
<MyComponent ref={parentRef} />`}
        </pre>
      </Box>
    </Stack>
  );
}

/**
 * Multiple refs example
 */
function MultipleRefsExample({ showCount, enableInteraction }: { showCount: boolean; enableInteraction: boolean }) {
  const [refCount, setRefCount] = React.useState(0);
  const [scrollTop, setScrollTop] = React.useState(0);

  const ScrollableComponent = React.forwardRef<HTMLDivElement>((props, forwardedRef) => {
    const measureRef = React.useRef<HTMLDivElement>(null);
    const scrollRef = React.useRef<HTMLDivElement>(null);
    const mergedRef = useMergedRef(measureRef, scrollRef, forwardedRef);

    React.useEffect(() => {
      setRefCount(3); // measure + scroll + forwarded
    }, []);

    const handleScroll = () => {
      if (scrollRef.current) {
        setScrollTop(Math.round(scrollRef.current.scrollTop));
      }
    };

    return (
      <Box
        ref={mergedRef}
        p="md"
        onScroll={handleScroll}
        style={{
          backgroundColor: '#fff',
          borderRadius: '6px',
          border: '2px dashed #52c41a',
          maxHeight: '200px',
          overflow: 'auto',
        }}
      >
        <Stack gap="sm">
          {Array.from({ length: 20 }, (_, i) => (
            <div
              key={i}
              style={{
                padding: '0.5rem',
                backgroundColor: '#f6ffed',
                borderRadius: '4px',
                fontSize: '0.875rem',
              }}
            >
              Item {i + 1}
            </div>
          ))}
        </Stack>
        {showCount && (
          <div style={{
            position: 'sticky',
            top: 0,
            fontSize: '0.75rem',
            color: '#52c41a',
            fontWeight: 'bold',
            backgroundColor: '#fff',
            padding: '0.5rem',
            textAlign: 'center',
            borderBottom: '2px solid #52c41a',
          }}>
            🔗 {refCount} refs | Scroll: {scrollTop}px
          </div>
        )}
      </Box>
    );
  });

  const parentRef = React.useRef<HTMLDivElement>(null);

  const scrollToTop = () => {
    if (parentRef.current) {
      parentRef.current.scrollTop = 0;
    }
  };

  return (
    <Stack gap="md">
      <ScrollableComponent ref={parentRef} />
      {enableInteraction && (
        <button
          onClick={scrollToTop}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#52c41a',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '0.875rem',
            fontWeight: '600',
          }}
        >
          Scroll to Top (via Parent Ref)
        </button>
      )}
    </Stack>
  );
}

/**
 * Width measurement example
 */
function MeasurementExample({ showCount, enableInteraction }: { showCount: boolean; enableInteraction: boolean }) {
  const [width, setWidth] = React.useState(0);
  const [refCount, setRefCount] = React.useState(0);

  const MeasuredComponent = React.forwardRef<HTMLDivElement>((props, forwardedRef) => {
    const measureRef = React.useRef<HTMLDivElement>(null);
    const mergedRef = useMergedRef(measureRef, forwardedRef);

    React.useEffect(() => {
      setRefCount(2);

      const updateWidth = () => {
        if (measureRef.current) {
          setWidth(Math.round(measureRef.current.offsetWidth));
        }
      };

      updateWidth();
      window.addEventListener('resize', updateWidth);
      return () => window.removeEventListener('resize', updateWidth);
    }, []);

    return (
      <Box
        ref={mergedRef}
        p="lg"
        style={{
          backgroundColor: '#fff',
          borderRadius: '6px',
          border: '2px dashed #fa8c16',
          resize: 'horizontal',
          overflow: 'auto',
          minWidth: '200px',
          maxWidth: '100%',
        }}
      >
        <div style={{ fontSize: '0.875rem', color: '#333', textAlign: 'center' }}>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#fa8c16', marginBottom: '0.5rem' }}>
            {width}px
          </div>
          Resize me →
          {showCount && (
            <div style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: '#fa8c16', fontWeight: 'bold' }}>
              🔗 {refCount} refs (measure + forwarded)
            </div>
          )}
        </div>
      </Box>
    );
  });

  const parentRef = React.useRef<HTMLDivElement>(null);

  const logDimensions = () => {
    if (parentRef.current) {
      const { offsetWidth, offsetHeight } = parentRef.current;
      alert(`Width: ${offsetWidth}px\nHeight: ${offsetHeight}px`);
    }
  };

  return (
    <Stack gap="md">
      <MeasuredComponent ref={parentRef} />
      {enableInteraction && (
        <button
          onClick={logDimensions}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#fa8c16',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '0.875rem',
            fontWeight: '600',
          }}
        >
          Log Dimensions (via Parent Ref)
        </button>
      )}
    </Stack>
  );
}

/**
 * Focus management example
 */
function FocusExample({ showCount, enableInteraction }: { showCount: boolean; enableInteraction: boolean }) {
  const [refCount, setRefCount] = React.useState(0);

  const FocusableInput = React.forwardRef<HTMLInputElement, { autoFocus?: boolean }>(
    ({ autoFocus }, forwardedRef) => {
      const internalRef = React.useRef<HTMLInputElement>(null);
      const mergedRef = useMergedRef(internalRef, forwardedRef);

      React.useEffect(() => {
        setRefCount(2);

        if (autoFocus && internalRef.current) {
          internalRef.current.focus();
        }
      }, [autoFocus]);

      return (
        <input
          ref={mergedRef}
          placeholder="Type something..."
          style={{
            width: '100%',
            padding: '0.75rem',
            fontSize: '1rem',
            border: '2px solid #722ed1',
            borderRadius: '6px',
            outline: 'none',
          }}
        />
      );
    }
  );

  const parentRef = React.useRef<HTMLInputElement>(null);

  const focusFromParent = () => {
    if (parentRef.current) {
      parentRef.current.focus();
    }
  };

  return (
    <Stack gap="md">
      <Box p="md" style={{ backgroundColor: '#fff', borderRadius: '6px' }}>
        <FocusableInput ref={parentRef} autoFocus />
        {showCount && (
          <div style={{
            marginTop: '0.5rem',
            fontSize: '0.75rem',
            color: '#722ed1',
            fontWeight: 'bold',
            textAlign: 'center',
          }}>
            🔗 {refCount} refs (internal focus + forwarded)
          </div>
        )}
      </Box>
      {enableInteraction && (
        <button
          onClick={focusFromParent}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#722ed1',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '0.875rem',
            fontWeight: '600',
          }}
        >
          Focus Input (via Parent Ref)
        </button>
      )}
    </Stack>
  );
}
