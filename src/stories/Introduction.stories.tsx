import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
	AreaGrid,
	AspectRatio,
	Box,
	Center,
	Container,
	Flex,
	Grid,
	Group,
	ScrollArea,
	SimpleGrid,
	Slot,
	Slottable,
	Space,
	Stack,
	configureBox,
	createStyles,
	getBreakpoints,
	getSpacing,
	mergeClasses,
	resetBoxConfig,
	resolveResponsiveValue,
	resolveSpacing,
	useContainerWidth,
	useElementWidth,
	useSlot,
} from '..';

const meta: Meta = {
	title: 'Introduction',
	parameters: {
		layout: 'padded',
		docs: {
			description: {
				component: [
					'`@apvee/react-layout-kit` is a small set of layout primitives built around **one core idea**:',
					'',
					'> Treat *layout* as typed props, and resolve responsive values against the **container width** (not the viewport).',
					'',
					'Everything else (Grid, Stack, Group, …) builds on the same foundation.',
					'',
					'## Installation & basic usage',
					'',
					'```tsx',
					'import { Box, Stack } from "@apvee/react-layout-kit";',
					'',
					'export function Example() {',
					'  return (',
					'    <Stack gap="md">',
					'      <Box p="md" $background="#f5f5f5">Hello</Box>',
					'      <Box p={{ xs: "sm", md: "lg" }} $borderRadius={8}>Responsive</Box>',
					'    </Stack>',
					'  );',
					'}',
					'```',
					'',
					'## 1) `Box`: the foundation',
					'',
					'The `Box` component is the **base primitive**. It supports:',
					'',
					'- **Dollar props**: `$display`, `$padding`, `$gap`, … (direct CSS properties)',
					'- **Short props**: `m`, `p`, `w`, `h`, … (shortcuts mapped to CSS properties)',
					'- **Responsive values** for both dollar and short props',
					'- **`asChild` composition** via `Slot` (see below)',
					'- Optional `styleReset` (currently a simple `boxSizing: "border-box"` reset)',
					'',
					'Implementation detail that matters for usage:',
					'',
					'- When both a dollar prop and a short prop resolve to the same CSS property, **dollar props win** (see `generateCombinedClassName` in `src/core/styling/spacing-resolver.ts`).',
					'',
					'## 2) Container-aware responsive values',
					'',
					'`ResponsiveValue<T>` is defined as:',
					'',
					'```ts',
					'type ResponsiveValue<T> = T | Partial<Record<BreakpointKey, T>>;',
					'```',
					'',
					'To resolve a responsive object, the library uses `resolveResponsiveValue(value, width, breakpoints)` (mobile-first).',
					'',
					'In practice, `Box` gets its `width` from:',
					'',
					'- `containerWidth` prop **if provided** (you control the width)',
					'- otherwise, it measures itself via `useElementWidth` (ResizeObserver)',
					'',
					'This makes responsive behavior **container-based** by default.',
					'',
					'## 3) Composition: `asChild`, `Slot`, `Slottable`',
					'',
					'Many components support an `asChild` pattern by rendering a `Slot` instead of their default element.',
					'',
					'`Slot` merges props with its direct child:',
					'',
					'- Event handlers are **composed** (child runs first; parent runs second and is skipped if `event.defaultPrevented`)',
					'- `className` strings are concatenated',
					'- `style` objects are shallow-merged (`child` wins on conflicts)',
					'- Refs are composed',
					'',
					'When you need to “target” a nested element, wrap it with `Slottable` so it receives slot props.',
					'',
					'## 4) Global tokens: breakpoints & spacing',
					'',
					'The layout system uses a small, global configuration module (`src/core/configuration/*`).',
					'By default the exported getters return these values (see `DEFAULT_BREAKPOINTS` / `DEFAULT_SPACING`):',
					'',
					'- Breakpoints: `xs=0`, `sm=480`, `md=640`, `lg=1024`, `xl=1366`, `xxl=1920`, `xxxl=2560`',
					'- Spacing: `none=0`, `xxs=2`, `xs=4`, `sm=8`, `md=12`, `lg=16`, `xl=20`, `xxl=24`, `xxxl=32`',
					'',
					'You can customize them at app boot:',
					'',
					'```ts',
					'import { configureBox } from "@apvee/react-layout-kit";',
					'',
					'configureBox({',
					'  breakpoints: { md: 768, xl: 1280 },',
					'  spacing: { md: 16, lg: 24 },',
					'});',
					'```',
					'',
					'Note: this is **module-level state**. If you tweak it in a story/test, make sure you reset it (via `resetBoxConfig()`).',
					'',
					'## 5) Hooks & utilities you can reuse',
					'',
					'- `useElementWidth(ref, { debounceMs })`: measures an element width with ResizeObserver and debounced updates (SSR-safe checks)',
					'- `useContainerWidth`: semantic alias of `useElementWidth`',
					'- `resolveResponsiveValue`: resolver utility (works independently from React components)',
					'- `resolveSpacing`: resolve spacing keys (like `"md"`) to numbers from the spacing scale',
					'- `createStyles` / `mergeClasses`: thin re-exports of Emotion’s `css` / `cx`',
					'',
					'## 6) What’s included in the public API',
					'',
					'The package root (`src/index.ts`) exports:',
					'',
					'- Components: `Box`, `Flex`, `Grid`, `Stack`, `SimpleGrid`, `AreaGrid`, `Container`, `Center`, `AspectRatio`, `Group`, `Space`, `ScrollArea`',
					'- Composition primitives: `Slot`, `Slottable`, `useSlot`',
					'- Configuration: `configureBox`, `resetBoxConfig`, `getBreakpoints`, `getSpacing`',
					'- Responsive & styling helpers: `resolveResponsiveValue`, `resolveSpacing`, `createStyles`, `mergeClasses`',
					'- Hooks: `useElementWidth`, `useContainerWidth`, and `useMergedRef` (default export re-export)',
					'',
					'For deeper context, the repo includes `llm-full.txt` (a snapshot for AI tooling) and the main `README.md`.',
				].join('\n'),
			},
		},
	},
	tags: ['autodocs'],
};

export default meta;

type Story = StoryObj;

export const Docs: Story = {
	render: () => {
		// Docs-only story: keep an entry in the sidebar without providing a Canvas demo.
		// Touch exports so they stay referenced and show up in docs tooling.
		void Box;
		void Flex;
		void Grid;
		void Stack;
		void SimpleGrid;
		void AreaGrid;
		void Container;
		void Center;
		void AspectRatio;
		void Group;
		void Space;
		void ScrollArea;
		void Slot;
		void Slottable;
		void useSlot;
		void resolveResponsiveValue;
		void configureBox;
		void resetBoxConfig;
		void getBreakpoints;
		void getSpacing;
		void resolveSpacing;
		void useElementWidth;
		void useContainerWidth;
		void createStyles;
		void mergeClasses;

		return <></>;
	},
	parameters: {
		docsOnly: true,
	},
};
