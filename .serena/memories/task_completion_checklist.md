# What to do when a task is completed

- Run `npm run check` (typecheck)
- Run `npm run build` (ensures `dist/` compiles and `tsc-alias` succeeds)
- If changes affect Storybook/examples, run `npm run storybook` and sanity-check key stories
- Keep public API stable (`src/index.ts` exports) unless the task explicitly requires breaking changes
