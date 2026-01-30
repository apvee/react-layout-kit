# Style & conventions (observed)

## TypeScript
- `strict: true`, `noImplicitReturns`, `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes` enabled.
- Types are centralized in `src/types/*` and re-exported from `src/types/index.ts`.
- Public API is curated in `src/index.ts`.

## React
- Functional components with `React.forwardRef` are the default for public components.
- Components often accept an optional `containerWidth` override; otherwise measure width via `ResizeObserver`.
- `asChild` pattern supported via internal `Slot` component in `src/core/components/slot.tsx`.

## Styling
- Uses `@emotion/css`.
- `Box` turns `$*` props + short props into an Emotion class via `generateCombinedClassName`.

## Naming & structure
- Each component lives in its own folder with `Component.tsx`, `Component.types.ts`, and an `index.ts` barrel.
- Internal-only helpers often imported directly from internal paths (e.g. `@/types/short-props`).

## Repo instruction files
- `.github/instructions/react17.instructions.md`
- `.github/instructions/typescript.instructions.md`
