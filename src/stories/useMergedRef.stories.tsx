import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Box, Stack, useMergedRef } from '..';

const meta: Meta = {
	title: 'Hooks/useMergedRef',
	parameters: {
		layout: 'padded',
		docs: {
			description: {
				component: [
					'A small utility hook for merging multiple refs into a single ref.',
					'',
					'In this library it is exposed as a convenience export and is a re-export of the `@react-hook/merged-ref` package (see `src/hooks/useMergedRef.ts`).',
					'',
					'## When it helps',
					'',
					'- A component needs an internal ref **and** supports a forwarded ref.',
					'- You need to keep both a `RefObject` and a callback ref in sync.',
					'- You want to “fan out” a single DOM node to multiple ref consumers.',
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
		type DemoInputProps = {
			label: string;
		};

		const DemoInput = React.forwardRef<HTMLInputElement, DemoInputProps>((props, forwardedRef) => {
			const { label } = props;
			const internalRef = React.useRef<HTMLInputElement>(null);
			const mergedRef = useMergedRef(internalRef, forwardedRef);

			const [internalConnected, setInternalConnected] = React.useState(false);
			const [measuredWidth, setMeasuredWidth] = React.useState<number | null>(null);

			React.useEffect(() => {
				setInternalConnected(Boolean(internalRef.current));
			}, []);

			return (
				<Box
					p="lg"
					style={{
						borderRadius: 12,
						border: '1px solid rgba(0,0,0,0.12)',
						background: 'rgba(0,0,0,0.02)',
					}}
				>
					<Stack gap="sm">
						<div style={{ fontWeight: 700 }}>{label}</div>

						<input
							ref={mergedRef}
							defaultValue="Try focusing me"
							style={{
								width: '100%',
								padding: '10px 12px',
								borderRadius: 10,
								border: '1px solid rgba(0,0,0,0.2)',
							}}
						/>

						<div style={{ fontSize: 12, opacity: 0.75, lineHeight: 1.5 }}>
							internalRef connected: <strong>{String(internalConnected)}</strong>
							{measuredWidth === null ? null : (
								<>
									{' '}· measured width: <strong>{measuredWidth}px</strong>
								</>
							)}
						</div>

						<div>
							<button
								type="button"
								onClick={() => {
									const w = internalRef.current?.getBoundingClientRect().width;
									setMeasuredWidth(w ? Math.floor(w) : 0);
								}}
								style={{
									padding: '8px 12px',
									borderRadius: 8,
									border: '1px solid rgba(0,0,0,0.2)',
									background: 'white',
									cursor: 'pointer',
								}}
							>
								Measure width via internal ref
							</button>
						</div>
					</Stack>
				</Box>
			);
		});
		DemoInput.displayName = 'DemoInput';

		const parentRef = React.useRef<HTMLInputElement>(null);
		const [parentConnected, setParentConnected] = React.useState(false);

		React.useEffect(() => {
			setParentConnected(Boolean(parentRef.current));
		}, []);

		return (
			<Stack gap="lg" style={{ maxWidth: 900 }}>
				<Stack gap="xs">
					<h2 style={{ margin: 0 }}>Forwarded ref + internal ref</h2>
					<div style={{ opacity: 0.75, lineHeight: 1.5 }}>
						The same input is referenced by both an internal ref and a forwarded ref.
					</div>
				</Stack>

				<DemoInput ref={parentRef} label="Merged refs input" />

				<Box
					p="md"
					style={{
						borderRadius: 12,
						border: '1px solid rgba(0,0,0,0.12)',
						background: 'rgba(24, 144, 255, 0.06)',
					}}
				>
					<Stack gap="sm">
						<div style={{ fontSize: 12, opacity: 0.8 }}>
							parentRef connected: <strong>{String(parentConnected)}</strong>
						</div>
						<div>
							<button
								type="button"
								onClick={() => parentRef.current?.focus()}
								style={{
									padding: '8px 12px',
									borderRadius: 8,
									border: '1px solid rgba(0,0,0,0.2)',
									background: 'white',
									cursor: 'pointer',
								}}
							>
								Focus via parent ref
							</button>
						</div>
					</Stack>
				</Box>
			</Stack>
		);
	},
};

export const CallbackAndObjectRef: Story = {
	render: () => {
		const objectRef = React.useRef<HTMLInputElement>(null);
		const [callbackNode, setCallbackNode] = React.useState<HTMLInputElement | null>(null);

		const callbackRef = React.useCallback((node: HTMLInputElement | null) => {
			setCallbackNode(node);
		}, []);

		const mergedRef = useMergedRef(callbackRef, objectRef);

		return (
			<Stack gap="lg" style={{ maxWidth: 900 }}>
				<Stack gap="xs">
					<h2 style={{ margin: 0 }}>Callback ref + RefObject</h2>
					<div style={{ opacity: 0.75, lineHeight: 1.5 }}>
						Useful when you need both an object ref (imperative APIs) and a callback ref (state sync).
					</div>
				</Stack>

				<Box
					p="lg"
					style={{
						borderRadius: 12,
						border: '1px solid rgba(0,0,0,0.12)',
						background: 'rgba(0,0,0,0.02)',
					}}
				>
					<Stack gap="sm">
						<input
							ref={mergedRef}
							defaultValue="Hello"
							style={{
								width: '100%',
								padding: '10px 12px',
								borderRadius: 10,
								border: '1px solid rgba(0,0,0,0.2)',
							}}
						/>

						<div style={{ fontSize: 12, opacity: 0.75, lineHeight: 1.5 }}>
							callbackNode is set: <strong>{String(Boolean(callbackNode))}</strong>
							{' '}· objectRef is set: <strong>{String(Boolean(objectRef.current))}</strong>
							{' '}· same node: <strong>{String(callbackNode === objectRef.current)}</strong>
						</div>

						<div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
							<button
								type="button"
								onClick={() => objectRef.current?.focus()}
								style={{
									padding: '8px 12px',
									borderRadius: 8,
									border: '1px solid rgba(0,0,0,0.2)',
									background: 'white',
									cursor: 'pointer',
								}}
							>
								Focus via objectRef
							</button>
							<button
								type="button"
								onClick={() => callbackNode?.focus()}
								style={{
									padding: '8px 12px',
									borderRadius: 8,
									border: '1px solid rgba(0,0,0,0.2)',
									background: 'white',
									cursor: 'pointer',
								}}
							>
								Focus via callbackNode
							</button>
						</div>
					</Stack>
				</Box>
			</Stack>
		);
	},
};

export const ThreeRefs: Story = {
	render: () => {
		const parentRef = React.useRef<HTMLInputElement>(null);
		const internalRef = React.useRef<HTMLInputElement>(null);
		const [node, setNode] = React.useState<HTMLInputElement | null>(null);

		const mergedRef = useMergedRef(parentRef, internalRef, (n: HTMLInputElement | null) => setNode(n));

		return (
			<Stack gap="lg" style={{ maxWidth: 900 }}>
				<Stack gap="xs">
					<h2 style={{ margin: 0 }}>Merging more than two refs</h2>
					<div style={{ opacity: 0.75, lineHeight: 1.5 }}>
						You can merge multiple refs (objects and callbacks) into a single ref.
					</div>
				</Stack>

				<Box
					p="lg"
					style={{
						borderRadius: 12,
						border: '1px solid rgba(0,0,0,0.12)',
						background: 'rgba(0,0,0,0.02)',
					}}
				>
					<Stack gap="sm">
						<input
							ref={mergedRef}
							defaultValue="Merged x3"
							style={{
								width: '100%',
								padding: '10px 12px',
								borderRadius: 10,
								border: '1px solid rgba(0,0,0,0.2)',
							}}
						/>

						<div style={{ fontSize: 12, opacity: 0.75, lineHeight: 1.5 }}>
							parentRef set: <strong>{String(Boolean(parentRef.current))}</strong>
							{' '}· internalRef set: <strong>{String(Boolean(internalRef.current))}</strong>
							{' '}· callback node set: <strong>{String(Boolean(node))}</strong>
						</div>

						<div>
							<button
								type="button"
								onClick={() => parentRef.current?.focus()}
								style={{
									padding: '8px 12px',
									borderRadius: 8,
									border: '1px solid rgba(0,0,0,0.2)',
									background: 'white',
									cursor: 'pointer',
								}}
							>
								Focus via parentRef
							</button>
						</div>
					</Stack>
				</Box>
			</Stack>
		);
	},
};

