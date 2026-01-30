import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Box, Stack, resolveResponsiveValue, type Breakpoints, type ResponsiveValue } from '..';

type StoryArgs = {
	width: number;
	value: ResponsiveValue<number>;
};

function makeDefaultBreakpoints(): Breakpoints {
	return {
		xs: 0,
		sm: 480,
		md: 768,
		lg: 1024,
		xl: 1280,
		xxl: 1536,
		xxxl: 1920,
	};
}

function ResolvedBadge(props: {
	label: string;
	resolved: number | undefined;
}) {
	const { label, resolved } = props;
	return (
		<Box
			px="md"
			py="xs"
			style={{
				display: 'inline-flex',
				alignItems: 'center',
				gap: 8,
				borderRadius: 999,
				border: '1px solid rgba(0,0,0,0.12)',
				background: 'rgba(0,0,0,0.03)',
				fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
				fontSize: 12,
			}}
		>
			<span style={{ opacity: 0.7 }}>{label}</span>
			<strong>{resolved ?? 'undefined'}</strong>
		</Box>
	);
}

const meta: Meta<StoryArgs> = {
	title: 'Advanced/ResponsiveUtilities',
	parameters: {
		layout: 'padded',
		docs: {
			description: {
				component: [
					'This story documents the responsive resolution helper exported by the library:',
					'',
					'- `resolveResponsiveValue(value, width, breakpoints)` from `src/core/responsive/resolver.ts`',
					'- `ResponsiveValue<T>` from `src/types/responsive.ts`',
					'',
					'## `ResponsiveValue<T>`',
					'',
					'`ResponsiveValue<T>` is a union:',
					'',
					'- a single value (`T`), or',
					'- a breakpoint map (`Partial<Record<BreakpointKey, T>>`).',
					'',
					'## `resolveResponsiveValue`',
					'',
					'Given a `width` (in pixels) and a `breakpoints` map, it resolves the value using a **mobile-first** approach:',
					'',
					'- non-objects (or `null`) are returned as-is',
					'- objects are treated as responsive maps **only if** they contain at least one known breakpoint key',
					'- when multiple breakpoints match, the **last** matching breakpoint (largest `minWidth` ≤ `width`) wins',
				].join('\n'),
			},
		},
	},
	tags: ['autodocs'],
	argTypes: {
		width: {
			control: { type: 'range', min: 0, max: 1400, step: 10 },
			table: { category: 'Inputs' },
		},
		value: {
			control: 'object',
			table: { category: 'Inputs' },
		},
	},
	args: {
		width: 800,
		value: { xs: 8, md: 16, lg: 24 },
	},
};

export default meta;
type Story = StoryObj<StoryArgs>;

export const Playground: Story = {
	render: (args) => {
		const breakpoints = React.useMemo(() => makeDefaultBreakpoints(), []);
		const resolved = resolveResponsiveValue(args.value, args.width, breakpoints);

		return (
			<Stack gap="lg">
				<Stack gap="xs">
					<h2 style={{ margin: 0 }}>resolveResponsiveValue</h2>
					<div style={{ opacity: 0.75 }}>
						Use the controls to change <code>width</code> and the responsive map.
					</div>
				</Stack>

				<Stack gap="sm" style={{ alignItems: 'flex-start' }}>
					<ResolvedBadge label="width" resolved={args.width} />
					<ResolvedBadge label="resolved" resolved={resolved} />
				</Stack>

				<Box
					p="lg"
					containerWidth={args.width}
					style={{
						borderRadius: 12,
						border: '1px solid rgba(0,0,0,0.12)',
						background: 'rgba(24, 144, 255, 0.06)',
						maxWidth: 700,
					}}
				>
					<Stack gap="sm">
						<div style={{ fontWeight: 600 }}>Example: feeding containerWidth into Box</div>
						<div style={{ opacity: 0.8, lineHeight: 1.5 }}>
							This library’s components can accept <code>containerWidth</code> to resolve responsive props.
							Here we only show the plumbing: the <code>containerWidth</code> value is driven by the slider.
						</div>
						<Box
							p={{ xs: 'xs', md: 'md', lg: 'lg' }}
							style={{
								borderRadius: 10,
								border: '1px dashed rgba(0,0,0,0.25)',
								background: 'rgba(255,255,255,0.9)',
							}}
						>
							Padding is responsive (xs/md/lg). Move the width slider.
						</Box>
					</Stack>
				</Box>
			</Stack>
		);
	},
};

export const MobileFirstResolution: Story = {
	args: {
		width: 1100,
		value: { xs: 4, sm: 8, md: 12, lg: 16 },
	},
	render: (args) => {
		const breakpoints = React.useMemo(() => makeDefaultBreakpoints(), []);
		const resolved = resolveResponsiveValue(args.value, args.width, breakpoints);

		return (
			<Stack gap="md" style={{ maxWidth: 760 }}>
				<h2 style={{ margin: 0 }}>Mobile-first (last match wins)</h2>
				<div style={{ opacity: 0.75, lineHeight: 1.5 }}>
					With <code>width</code> set to <strong>{args.width}px</strong>, this should resolve to the value of the
					last breakpoint whose <code>minWidth</code> is ≤ width.
				</div>
				<Stack gap="sm" style={{ alignItems: 'flex-start' }}>
					<ResolvedBadge label="resolved" resolved={resolved} />
				</Stack>

				<Box
					p="lg"
					style={{
						borderRadius: 12,
						border: '1px solid rgba(0,0,0,0.12)',
						background: 'rgba(82, 196, 26, 0.06)',
					}}
				>
					<pre style={{ margin: 0, fontSize: 12, overflow: 'auto' }}>{JSON.stringify(args.value, null, 2)}</pre>
				</Box>
			</Stack>
		);
	},
};

export const NonResponsiveObjects: Story = {
	args: {
		width: 900,
		// This object does NOT contain breakpoint keys, so resolver returns it "as-is".
		// We keep it numeric-only in story args type, so show this behavior by using a single value.
		value: 12,
	},
	render: (args) => {
		const breakpoints = React.useMemo(() => makeDefaultBreakpoints(), []);
		const resolved = resolveResponsiveValue(args.value, args.width, breakpoints);

		return (
			<Stack gap="md" style={{ maxWidth: 760 }}>
				<h2 style={{ margin: 0 }}>Non-map values</h2>
				<div style={{ opacity: 0.75, lineHeight: 1.5 }}>
					If <code>value</code> is not an object (or is <code>null</code>), it is returned as-is.
				</div>
				<Stack gap="sm" style={{ alignItems: 'flex-start' }}>
					<ResolvedBadge label="value" resolved={typeof args.value === 'number' ? args.value : undefined} />
					<ResolvedBadge label="resolved" resolved={resolved} />
				</Stack>
			</Stack>
		);
	},
};
