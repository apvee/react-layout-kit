import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Box, createStyles, mergeClasses, resolveSpacing, Stack } from '..';

function Frame(props: {
	title: string;
	description?: string;
	children: React.ReactNode;
}) {
	const { title, description, children } = props;

	return (
		<Box
			p="lg"
			$border="1px solid #e2e8f0"
			$borderRadius={12}
			$backgroundColor="#ffffff"
		>
			<Box mb="md">
				<div style={{ fontWeight: 700 }}>{title}</div>
				{description ? <div style={{ fontSize: 13, color: '#64748b' }}>{description}</div> : null}
			</Box>
			{children}
		</Box>
	);
}

type Tone = 'slate' | 'blue' | 'green' | 'pink';

interface StylingArgs {
	tone: Tone;
	active: boolean;
	withHover: boolean;
}

function getToneColors(tone: Tone) {
	switch (tone) {
		case 'blue':
			return { bg: '#eff6ff', border: '#93c5fd', fg: '#1e3a8a' };
		case 'green':
			return { bg: '#ecfdf5', border: '#6ee7b7', fg: '#064e3b' };
		case 'pink':
			return { bg: '#fdf2f8', border: '#f9a8d4', fg: '#831843' };
		case 'slate':
		default:
			return { bg: '#f8fafc', border: '#cbd5e1', fg: '#0f172a' };
	}
}

const meta: Meta<StylingArgs> = {
	title: 'Advanced/Styling',
	parameters: {
		layout: 'padded',
		docs: {
			description: {
				component: `
This module exposes lightweight styling utilities built on top of **Emotion**:

- \`createStyles\`: re-export of \`@emotion/css\`'s \`css\` — returns a generated class name.
- \`mergeClasses\`: re-export of \`@emotion/css\`'s \`cx\` — composes class names (filters falsy values).
- \`resolveSpacing\`: resolves spacing tokens (e.g. \`"md"\`) using the current spacing configuration.

In most component usage, prefer **Box dollar props** (\`$...\`) and **short props** (\`p\`, \`m\`, etc.).
Use these utilities when you need custom CSS selectors (e.g. \`:hover\`) or you’re building helpers outside Box.
				`.trim(),
			},
		},
	},
	tags: ['autodocs'],
	argTypes: {
		tone: {
			control: 'select',
			options: ['slate', 'blue', 'green', 'pink'],
		},
		active: {
			control: 'boolean',
		},
		withHover: {
			control: 'boolean',
		},
	},
};

export default meta;
type Story = StoryObj<StylingArgs>;

export const CreateStyles: Story = {
	args: {
		tone: 'slate',
		active: false,
		withHover: true,
	},
	render: (args) => {
		const colors = getToneColors(args.tone);

		const className = React.useMemo(() => {
			const hoverStyles = args.withHover
				? {
						'&:hover': {
							transform: 'translateY(-1px)',
							boxShadow: '0 8px 20px rgba(15, 23, 42, 0.10)',
						},
					}
				: undefined;

			return createStyles({
				display: 'inline-flex',
				alignItems: 'center',
				justifyContent: 'center',
				padding: '10px 14px',
				borderRadius: 12,
				border: `1px solid ${colors.border}`,
				backgroundColor: colors.bg,
				color: colors.fg,
				fontWeight: 800,
				cursor: 'default',
				transition: 'transform 120ms ease, box-shadow 120ms ease, background-color 120ms ease',
				...(args.active
					? {
							backgroundColor: colors.border,
						}
					: undefined),
				...hoverStyles,
			});
		}, [args.active, args.tone, args.withHover, colors.bg, colors.border, colors.fg]);

		return (
			<Stack gap="lg">
				<Frame
					title="createStyles"
					description="Generate a className from a style object (supports selectors like &:hover)."
				>
					<Box className={className}>Hover me</Box>

					<Box mt="md" $color="#64748b" style={{ fontSize: 13 }}>
						Generated class: <code>{className}</code>
					</Box>
				</Frame>
			</Stack>
		);
	},
};

export const MergeClasses: Story = {
	args: {
		tone: 'blue',
		active: true,
		withHover: true,
	},
	render: (args) => {
		const colors = getToneColors(args.tone);

		const base = React.useMemo(() => {
			return createStyles({
				padding: '10px 14px',
				borderRadius: 12,
				border: '1px solid #e2e8f0',
				backgroundColor: '#ffffff',
				fontWeight: 800,
			});
		}, []);

		const toneClass = React.useMemo(() => {
			return createStyles({
				borderColor: colors.border,
				color: colors.fg,
			});
		}, [colors.border, colors.fg]);

		const activeClass = React.useMemo(() => {
			return createStyles({
				backgroundColor: colors.bg,
			});
		}, [colors.bg]);

		const hoverClass = React.useMemo(() => {
			return createStyles({
				transition: 'transform 120ms ease',
				'&:hover': {
					transform: 'translateY(-1px)',
				},
			});
		}, []);

		const className = mergeClasses(
			base,
			toneClass,
			args.active && activeClass,
			args.withHover && hoverClass
		);

		return (
			<Stack gap="lg">
				<Frame
					title="mergeClasses"
					description="Compose multiple class names (falsy values are ignored)."
				>
					<Box className={className}>Composed styles</Box>

					<Box mt="md" $color="#64748b" style={{ fontSize: 13 }}>
						Final className: <code>{className}</code>
					</Box>
				</Frame>
			</Stack>
		);
	},
};

export const ResolveSpacing: Story = {
	render: () => {
		const inputs: Array<string | number> = ['xs', 'sm', 'md', 'lg', 'xl', 8, 16, '2rem'];

		return (
			<Stack gap="lg">
				<Frame
					title="resolveSpacing"
					description="Resolve a spacing token using the current spacing configuration (numbers are passed through)."
				>
					<Box $border="1px solid #e2e8f0" $borderRadius={12} $overflow="hidden">
						<Box
							$display="grid"
							style={{ gridTemplateColumns: '180px 1fr', fontSize: 13 }}
						>
							<Box p="sm" $backgroundColor="#f8fafc" $borderBottom="1px solid #e2e8f0" $fontWeight={700}>
								Input
							</Box>
							<Box p="sm" $backgroundColor="#f8fafc" $borderBottom="1px solid #e2e8f0" $fontWeight={700}>
								Output
							</Box>

							{inputs.map((value) => {
								const resolved = resolveSpacing(value);
								const key = `${typeof value}:${String(value)}`;

								return (
									<React.Fragment key={key}>
										<Box p="sm" $borderBottom="1px solid #f1f5f9">
											<code>{JSON.stringify(value)}</code>
										</Box>
										<Box p="sm" $borderBottom="1px solid #f1f5f9">
											<code>{JSON.stringify(resolved)}</code>
										</Box>
									</React.Fragment>
								);
							})}
						</Box>
					</Box>
				</Frame>
			</Stack>
		);
	},
};

