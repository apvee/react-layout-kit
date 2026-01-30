# react-layout-kit — project overview

## Purpose
`@apvee/react-layout-kit` is a type-safe React layout/component library built on TypeScript and Emotion (`@emotion/css`). It provides layout primitives (`Box`, `Flex`, `Grid`, `Stack`, etc.) with:
- **Dollar props**: `$display`, `$padding`, … (full CSS surface via `csstype`), supporting responsive values.
- **Short props**: `m`, `p`, `w`, `h`, … shorthand props, also responsive.
- **Container-aware responsive resolution**: responsive values resolve based on **measured container width** (ResizeObserver) or an explicit `containerWidth` prop.
- **Composition**: `asChild` pattern via `Slot`/`Slottable`.

## Tech stack
- React (peer dependency `>=17`)
- TypeScript (strict mode)
- Emotion CSS (`@emotion/css`) for runtime class generation
- Storybook for examples

## High-level structure
- `src/index.ts`: public API barrel (components, hooks, types, core utilities)
- `src/components/*`: public components; most wrap `Box` and resolve their own responsive props
- `src/core/*`: internal utilities
  - `core/styling`: class generation helpers (`createStyles`, `mergeClasses`, spacing resolver)
  - `core/responsive`: `resolveResponsiveValue`
  - `core/configuration`: global breakpoints/spacing config (`configureBox`, `getBreakpoints`, `getSpacing`)
  - `core/components`: `Slot`/`Slottable` composition primitives
  - `core/hooks`: internal hooks like `useResponsiveResolvers`
  - `core/utils`: small utilities like `debounce`
- `src/hooks/*`: public hooks (`useElementWidth`, `useContainerWidth`)
- `src/types/*`: shared public types and internal short-props helpers
- `src/stories/*`: Storybook stories (excluded from build)
