import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Box, Stack, useContainerWidth } from '..';

interface UseContainerWidthArgs {
	debounceMs: number;
	disabled: boolean;
}

function DemoCard(props: {
	debounceMs: number;
	disabled: boolean;
	label: string;
	initialHint?: string;
}) {
	const { debounceMs, disabled, label, initialHint } = props;

	const ref = React.useRef<HTMLDivElement>(null);
	const width = useContainerWidth(ref, { debounceMs, disabled });

	return (
		<Box
			ref={ref}
			p="lg"
			style={{
				borderRadius: 12,
				border: '1px solid rgba(0,0,0,0.12)',
				background: 'rgba(0,0,0,0.02)',
				resize: 'horizontal',
				overflow: 'auto',
				minWidth: 240,
				maxWidth: '100%',
			}}
		>
			<Stack gap="sm">
				<div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 12 }}>
					<div style={{ fontWeight: 700 }}>{label}</div>
					<div
						style={{
							fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
							fontSize: 12,
							opacity: 0.8,
						}}
					>
						width: <strong>{width}</strong>
					</div>
				</div>

				<div style={{ fontSize: 12, opacity: 0.75, lineHeight: 1.5 }}>
					Drag the bottom-right handle to resize this container.
					{initialHint ? ` ${initialHint}` : ''}
				</div>

				<Box
					p={{ xs: 'xs', md: 'md', lg: 'lg' }}
					containerWidth={width}
					style={{
						borderRadius: 10,
						border: '1px dashed rgba(0,0,0,0.25)',
						background: 'rgba(24, 144, 255, 0.06)',
					}}
				>
					<div style={{ fontSize: 13, lineHeight: 1.5 }}>
						This inner <code>Box</code> uses a responsive <code>p</code> value and receives <code>containerWidth</code>
						from <code>useContainerWidth</code>.
					</div>
				</Box>
			</Stack>
		</Box>
	);
}

const meta: Meta<UseContainerWidthArgs> = {
	title: 'Hooks/useContainerWidth',
	parameters: {
		layout: 'padded',
		docs: {
			description: {
				component: [
					'Public hook for measuring container width. It is a semantic, SSR-safe wrapper around `useElementWidth`.',
					'',
					'## Signature',
					'',
					'```ts',
					'function useContainerWidth<T extends Element>(',
					'  elementRef: React.RefObject<T>,',
					'  options?: { disabled?: boolean; debounceMs?: number }',
					'): number',
					'```',
					'',
					'## Notes',
					'',
					'- Returns the current width in pixels (integer), or `0` when not available.',
					'- When `disabled` is true, measurement is stopped and the hook resets to `0`.',
					'- During SSR (no `window`) or when `ResizeObserver` is unavailable, measurement is skipped.',
				].join('\n'),
			},
		},
	},
	tags: ['autodocs'],
	args: {
		debounceMs: 16,
		disabled: false,
	},
	argTypes: {
		debounceMs: {
			control: { type: 'number', min: 0, max: 500, step: 10 },
			table: { category: 'Options' },
		},
		disabled: {
			control: 'boolean',
			table: { category: 'Options' },
		},
	},
};

export default meta;
type Story = StoryObj<UseContainerWidthArgs>;

export const Playground: Story = {
	render: (args) => {
		return (
			<Stack gap="lg" style={{ maxWidth: 980 }}>
				<Stack gap="xs">
					<h2 style={{ margin: 0 }}>Measure a container</h2>
					<div style={{ opacity: 0.75, lineHeight: 1.5 }}>
						Use the controls to adjust <code>debounceMs</code> / <code>disabled</code>.
					</div>
				</Stack>

				<DemoCard
					label="Resizable container"
					debounceMs={args.debounceMs}
					disabled={args.disabled}
					initialHint="The measured width is used as containerWidth for the inner Box."
				/>
			</Stack>
		);
	},
};

export const DebounceComparison: Story = {
	render: () => {
		const ComparisonCard = (props: { label: string; debounceMs: number }) => {
			const { label, debounceMs } = props;
			const ref = React.useRef<HTMLDivElement>(null);
			const width = useContainerWidth(ref, { debounceMs });
			const [updates, setUpdates] = React.useState(0);

			React.useEffect(() => {
				if (width > 0) setUpdates((v) => v + 1);
			}, [width]);

			return (
				<Box
					ref={ref}
					p="lg"
					style={{
						borderRadius: 12,
						border: '1px solid rgba(0,0,0,0.12)',
						background: 'rgba(0,0,0,0.02)',
						resize: 'horizontal',
						overflow: 'auto',
						minWidth: 240,
					}}
				>
					<Stack gap="sm">
						<div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
							<div style={{ fontWeight: 700 }}>{label}</div>
							<div
								style={{
									fontFamily:
										'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
									fontSize: 12,
									opacity: 0.8,
								}}
							>
								{width}px
							</div>
						</div>
						<div style={{ fontSize: 12, opacity: 0.75, lineHeight: 1.5 }}>
							debounceMs: <strong>{debounceMs}</strong> · updates: <strong>{updates}</strong>
						</div>
					</Stack>
				</Box>
			);
		};

		return (
			<Stack gap="lg" style={{ maxWidth: 980 }}>
				<Stack gap="xs">
					<h2 style={{ margin: 0 }}>Debounce comparison</h2>
					<div style={{ opacity: 0.75, lineHeight: 1.5 }}>
						Resize both containers and compare how often they update.
					</div>
				</Stack>

				<div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 16 }}>
					<ComparisonCard label="Smooth" debounceMs={16} />
					<ComparisonCard label="Less frequent" debounceMs={120} />
				</div>
			</Stack>
		);
	},
};

export const DisabledToggle: Story = {
	render: () => {
		const ref = React.useRef<HTMLDivElement>(null);
		const [disabled, setDisabled] = React.useState(false);
		const width = useContainerWidth(ref, { disabled, debounceMs: 16 });

		return (
			<Stack gap="lg" style={{ maxWidth: 980 }}>
				<Stack gap="xs">
					<h2 style={{ margin: 0 }}>Disabled behavior</h2>
					<div style={{ opacity: 0.75, lineHeight: 1.5 }}>
						When disabled, the hook resets the width to <code>0</code>.
					</div>
				</Stack>

				<div>
					<button
						type="button"
						onClick={() => setDisabled((v) => !v)}
						style={{
							padding: '8px 12px',
							borderRadius: 8,
							border: '1px solid rgba(0,0,0,0.2)',
							background: 'white',
							cursor: 'pointer',
						}}
					>
						{disabled ? 'Enable measurement' : 'Disable measurement'}
					</button>
				</div>

				<Box
					ref={ref}
					p="lg"
					style={{
						borderRadius: 12,
						border: '1px solid rgba(0,0,0,0.12)',
						background: 'rgba(0,0,0,0.02)',
						resize: 'horizontal',
						overflow: 'auto',
						minWidth: 240,
						maxWidth: '100%',
					}}
				>
					<Stack gap="sm">
						<div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
							<div style={{ fontWeight: 700 }}>Resizable container</div>
							<div
								style={{
									fontFamily:
										'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
									fontSize: 12,
									opacity: 0.8,
								}}
							>
								width: <strong>{width}</strong>
							</div>
						</div>
						<div style={{ fontSize: 12, opacity: 0.75, lineHeight: 1.5 }}>
							disabled: <strong>{String(disabled)}</strong>
						</div>
					</Stack>
				</Box>
			</Stack>
		);
	},
};

