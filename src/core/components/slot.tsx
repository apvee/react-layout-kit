import * as React from 'react';

/**
 * Utility per combinare refs.
 * 
 * @internal
 */
function composeRefs<T>(...refs: Array<React.Ref<T> | undefined>): React.RefCallback<T> {
  return (node: T) => {
    refs.forEach((ref) => {
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref != null) {
        (ref as React.MutableRefObject<T | null>).current = node;
      }
    });
  };
}

/**
 * Utility per combinare event handlers.
 * 
 * @internal
 */
function composeEventHandlers<E>(
  originalEventHandler?: (event: E) => void,
  ourEventHandler?: (event: E) => void,
  { checkForDefaultPrevented = true } = {}
) {
  return function handleEvent(event: E) {
    originalEventHandler?.(event);

    if (
      checkForDefaultPrevented === false ||
      !(event as unknown as Event).defaultPrevented
    ) {
      return ourEventHandler?.(event);
    }
  };
}

/**
 * Utility per combinare className.
 * 
 * @internal
 */
function composeClassName(originalClassName?: string, ourClassName?: string): string | undefined {
  if (!originalClassName && !ourClassName) return undefined;
  if (!originalClassName) return ourClassName;
  if (!ourClassName) return originalClassName;
  return `${originalClassName} ${ourClassName}`;
}

/**
 * Utility per combinare style objects.
 * 
 * @internal
 */
function composeStyle(
  originalStyle?: React.CSSProperties,
  ourStyle?: React.CSSProperties
): React.CSSProperties | undefined {
  if (!originalStyle && !ourStyle) return undefined;
  return { ...originalStyle, ...ourStyle };
}

export interface SlotProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
}

/**
 * Slot component che permette di passare props al child diretto.
 * Compatibile con @radix-ui/react-slot ma senza dipendenze esterne.
 */
export const Slot = React.forwardRef<HTMLElement, SlotProps>(
  ({ children, ...slotProps }, forwardedRef) => {
    const childrenArray = React.Children.toArray(children);
    const slottable = childrenArray.find(isSlottable);

    if (slottable) {
      // Il nuovo elemento da renderizzare è il primo child valido
      const newElement = slottable.props.children as React.ReactElement;

      const newChildren = childrenArray.map((child) => {
        if (child === slottable) {
          // Rimuove il Slottable ma mantiene i suoi children
          if (React.Children.count(newElement) > 1) {
            return React.Children.only(null);
          }
          return newElement;
        } else {
          return child;
        }
      });

      return React.isValidElement(newElement)
        ? React.cloneElement(
            newElement,
            {
              ...mergeProps(slotProps, newElement.props as Record<string, any>),
              ref: forwardedRef
                ? composeRefs(forwardedRef, (newElement as any).ref)
                : (newElement as any).ref,
            } as any,
            newChildren.length > 1 ? newChildren : newChildren[0]
          )
        : null;
    }

    // Se non c'è slottable, clona il primo elemento valido
    if (React.isValidElement(children)) {
      return React.cloneElement(children, {
        ...mergeProps(slotProps, children.props as Record<string, any>),
        ref: forwardedRef
          ? composeRefs(forwardedRef, (children as any).ref)
          : (children as any).ref,
      } as any);
    }

    // Fallback: crea un span wrapper
    return React.createElement('span', { ...slotProps, ref: forwardedRef }, children);
  }
);

Slot.displayName = 'Slot';

export interface SlottableProps {
  children: React.ReactNode;
}

/**
 * Slottable component per marcare elementi che possono ricevere slot props
 */
export const Slottable = ({ children }: SlottableProps) => {
  return React.createElement(React.Fragment, {}, children);
};

Slottable.displayName = 'Slottable';

/**
 * Utility function to check if a child is a Slottable component.
 * 
 * @internal
 */
function isSlottable(child: React.ReactNode): child is React.ReactElement {
  return React.isValidElement(child) && child.type === Slottable;
}

/**
 * Utility function to merge props from slot and child.
 * 
 * @internal
 */
function mergeProps(slotProps: Record<string, any>, childProps: Record<string, any>) {
  // Tutti i child props hanno la precedenza
  const overrideProps = { ...childProps };

  for (const propName in childProps) {
    const slotPropValue = slotProps[propName];
    const childPropValue = childProps[propName];

    const isHandler = /^on[A-Z]/.test(propName);
    
    if (isHandler) {
      // Componi event handlers
      if (slotPropValue && childPropValue) {
        overrideProps[propName] = composeEventHandlers(childPropValue, slotPropValue);
      } else if (slotPropValue) {
        overrideProps[propName] = slotPropValue;
      }
    }
    // Gestioni speciali per className e style
    else if (propName === 'className') {
      overrideProps[propName] = composeClassName(slotPropValue, childPropValue);
    } else if (propName === 'style') {
      overrideProps[propName] = composeStyle(slotPropValue, childPropValue);
    }
  }

  return { ...slotProps, ...overrideProps };
}

// Hook per usare slot in modo più dichiarativo
export function useSlot(element: React.ReactElement | null) {
  const [slotRef, setSlotRef] = React.useState<HTMLElement | null>(null);
  
  const ref = React.useCallback((node: HTMLElement) => {
    setSlotRef(node);
  }, []);

  return {
    ref,
    slotRef,
    isSlot: React.isValidElement(element) && element.type === Slot,
  };
}

// Type utilities
export type SlotComponentType = typeof Slot;
export type SlottableComponentType = typeof Slottable;

// Export per compatibilità con @radix-ui/react-slot
export { Slot as Root };