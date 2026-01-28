import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { configureBox, getBreakpoints, getSpacing, resetBoxConfig } from '..';

const meta: Meta = {
	title: 'Configuration',
	parameters: {
		layout: 'padded',
		docs: {
			description: {
				component: [
					'`@apvee/react-layout-kit` exposes a small configuration API to customize the global tokens used by the layout system:',
					'',
					'- `configureBox(config)`',
					'- `resetBoxConfig()`',
					'- `getBreakpoints()`',
					'- `getSpacing()`',
					'',
					'## Important: global module state',
					'',
					'These functions mutate **module-level** state (see `src/core/configuration/index.ts`). Any changes affect all components that rely on breakpoints/spacing.',
					'',
					'If you change the configuration in a test, a story, or during app boot, consider calling `resetBoxConfig()` when appropriate to avoid leaking state across environments.',
					'',
					'## `configureBox` merges partial values',
					'',
					'When you pass `breakpoints` or `spacing`, the implementation **merges** your partial object into the current values (it does not replace the whole object).',
					'',
					'```ts',
					'import { configureBox } from "@apvee/react-layout-kit";',
					'',
					'configureBox({',
					'  breakpoints: { md: 768, xl: 1280 },',
					'  spacing: { md: 20, lg: 28 },',
					'});',
					'```',
					'',
					'## Reading current values',
					'',
					'Use `getBreakpoints()` / `getSpacing()` to read the current configuration. The functions return **copies** of the internal objects:',
					'',
					'```ts',
					'import { getBreakpoints, getSpacing } from "@apvee/react-layout-kit";',
					'',
					'const breakpoints = getBreakpoints();',
					'const spacing = getSpacing();',
					'```',
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
		// (We still export one story so this file appears in Storybook navigation.)
		React.useEffect(() => {
			// Ensure any external navigation to this story never leaves the config mutated.
			return () => resetBoxConfig();
		}, []);

		// Touch getters so tree-shaking doesn't hide the symbols in docs.
		void configureBox;
		void getBreakpoints;
		void getSpacing;
		return <></>;
	},
	parameters: {
		docsOnly: true,
	},
};

