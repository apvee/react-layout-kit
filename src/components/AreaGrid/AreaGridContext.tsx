import * as React from 'react';

/**
 * Context for sharing defined grid areas between AreaGrid and AreaGrid.Item components.
 * 
 * This context provides the resolved grid-template-areas string to child AreaGrid.Item
 * components so they can validate if their assigned area exists in the current layout.
 * 
 * @internal This is an internal implementation detail and should not be used directly.
 */
export const AreaGridContext = React.createContext<string | undefined>(undefined);

/**
 * Hook to access the current grid areas from the AreaGrid context.
 * 
 * @returns The resolved grid-template-areas string from the parent AreaGrid, or undefined if not within an AreaGrid.
 * 
 * @internal This is an internal implementation detail and should not be used directly.
 */
export const useAreaGridContext = (): string | undefined => {
  return React.useContext(AreaGridContext);
};
