import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Box, Slot, Stack, useSlot } from '..';

const meta: Meta = {
	title: 'Advanced/Composition',
	parameters: {
		layout: 'padded',
		docs: {
			description: {
				component: [
					'This library supports the **`asChild`** pattern via a `Slot` component (see `src/core/components/slot.tsx`).',
					'',
					'When a component renders `Slot` (e.g. `Box` with `asChild={true}`), the `Slot` merges the parent props with the direct child element:',
					'',
					'- **Event handlers** are composed: the child handler runs first, then the parent handler (unless `event.defaultPrevented`).',
					'- **`className`** strings are merged.',
					'- **`style`** objects are merged (child style takes precedence).',
					'- **Refs** are composed so both refs receive the same DOM node.',
					'',
					'The module also exports `useSlot`, a small helper for detecting Slot elements and capturing a DOM node via a callback ref.',
				].join('\n'),
			},
		},
	},
	tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const Playground: Story = {
	render: () => {
		const [log, setLog] = React.useState<string[]>([]);

		const append = React.useCallback((msg: string) => {
			setLog((prev) => [msg, ...prev].slice(0, 8));
		}, []);

		return (
			<Stack gap="lg" style={{ maxWidth: 980 }}>
				<Stack gap="xs">
					<h2 style={{ margin: 0 }}>Box + asChild</h2>
					<div style={{ opacity: 0.75, lineHeight: 1.5 }}>
						`Box` renders `Slot` when <code>asChild</code> is true. Click the button to see handler composition.
					</div>
				</Stack>

				<Box
					asChild
					p="md"
					$border="1px solid rgba(0,0,0,0.12)"
					$borderRadius={12}
					$backgroundColor="rgba(24, 144, 255, 0.08)"
					className="box-root"
					style={{ color: '#0f172a' }}
					onClick={() => append('Box onClick (parent)')}
				>
					<button
						type="button"
						className="child-button"
						style={{
							width: '100%',
							padding: '10px 12px',
							borderRadius: 10,
							border: '1px solid rgba(0,0,0,0.25)',
							background: 'white',
							cursor: 'pointer',
						}}
						onClick={() => append('button onClick (child)')}
					>
						Click me (child handler first)
					</button>
				</Box>

				<Box p="md" $border="1px solid rgba(0,0,0,0.12)" $borderRadius={12} $backgroundColor="#ffffff">
					<div style={{ fontWeight: 700, marginBottom: 8 }}>Click log</div>
					<ol style={{ margin: 0, paddingLeft: 18, color: '#334155' }}>
						{log.length === 0 ? <li style={{ opacity: 0.7 }}>No clicks yet</li> : null}
						{log.map((entry, idx) => (
							<li key={`${entry}-${idx}`}>{entry}</li>
						))}
					</ol>
				</Box>
			</Stack>
		);
	},
};

export const SlotMergingSemantics: Story = {
	render: () => {
		const [preventDefault, setPreventDefault] = React.useState(false);
		const [log, setLog] = React.useState<string[]>([]);

		const append = React.useCallback((msg: string) => {
			setLog((prev) => [msg, ...prev].slice(0, 8));
		}, []);

		return (
			<Stack gap="lg" style={{ maxWidth: 980 }}>
				<Stack gap="xs">
					<h2 style={{ margin: 0 }}>Slot prop merging</h2>
					<div style={{ opacity: 0.75, lineHeight: 1.5 }}>
						This demonstrates handler composition and the <code>defaultPrevented</code> check.
					</div>
				</Stack>

				<label style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
					<input
						type="checkbox"
						checked={preventDefault}
						onChange={(e) => setPreventDefault(e.currentTarget.checked)}
					/>
					<span>Child handler calls preventDefault()</span>
				</label>

				<Slot
					onClick={() => append('Slot onClick (parent)')}
					className="slot-root"
					style={{ color: '#0f172a' }}
				>
					<a
						href="#"
						className="child-anchor"
						style={{
							display: 'inline-flex',
							alignItems: 'center',
							gap: 8,
							padding: '10px 12px',
							borderRadius: 10,
							border: '1px solid rgba(0,0,0,0.25)',
							background: 'rgba(0,0,0,0.02)',
							textDecoration: 'none',
						}}
						onClick={(e) => {
							append('a onClick (child)');
							if (preventDefault) e.preventDefault();
						}}
					>
						Clickable anchor
						<span style={{ fontSize: 12, opacity: 0.7 }}>(see log)</span>
					</a>
				</Slot>

				<Box p="md" $border="1px solid rgba(0,0,0,0.12)" $borderRadius={12} $backgroundColor="#ffffff">
					<div style={{ fontWeight: 700, marginBottom: 8 }}>Click log</div>
					<ol style={{ margin: 0, paddingLeft: 18, color: '#334155' }}>
						{log.length === 0 ? <li style={{ opacity: 0.7 }}>No clicks yet</li> : null}
						{log.map((entry, idx) => (
							<li key={`${entry}-${idx}`}>{entry}</li>
						))}
					</ol>
				</Box>
			</Stack>
		);
	},
};

export const UseSlotHook: Story = {
	render: () => {
		const [renderAsSlot, setRenderAsSlot] = React.useState(true);

		const element = renderAsSlot ? (
			<Slot>
				<button
					type="button"
					style={{
						padding: '10px 12px',
						borderRadius: 10,
						border: '1px solid rgba(0,0,0,0.25)',
						background: 'white',
						cursor: 'pointer',
					}}
				>
					I am inside Slot
				</button>
			</Slot>
		) : (
			<button
				type="button"
				style={{
					padding: '10px 12px',
					borderRadius: 10,
					border: '1px solid rgba(0,0,0,0.25)',
					background: 'white',
					cursor: 'pointer',
				}}
			>
				I am a plain button
			</button>
		);

		const { ref, slotRef, isSlot } = useSlot(element);

		const rendered = React.isValidElement(element)
			? React.cloneElement(element as React.ReactElement, { ref } as any)
			: null;

		return (
			<Stack gap="lg" style={{ maxWidth: 980 }}>
				<Stack gap="xs">
					<h2 style={{ margin: 0 }}>useSlot helper</h2>
					<div style={{ opacity: 0.75, lineHeight: 1.5 }}>
						Detects whether a React element is a <code>Slot</code> and provides a callback ref you can attach.
					</div>
				</Stack>

				<label style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
					<input
						type="checkbox"
						checked={renderAsSlot}
						onChange={(e) => setRenderAsSlot(e.currentTarget.checked)}
					/>
					<span>Render element as Slot</span>
				</label>

				{rendered}

				<Box p="md" $border="1px solid rgba(0,0,0,0.12)" $borderRadius={12} $backgroundColor="#ffffff">
					<div style={{ fontWeight: 700, marginBottom: 8 }}>State</div>
					<div style={{ fontSize: 13, lineHeight: 1.6, color: '#334155' }}>
						<div>
							isSlot: <strong>{String(isSlot)}</strong>
						</div>
						<div>
							slotRef set: <strong>{String(Boolean(slotRef))}</strong>
						</div>
						<div>
							slotRef tagName: <strong>{slotRef?.tagName ?? '—'}</strong>
						</div>
					</div>
				</Box>
			</Stack>
		);
	},
};

