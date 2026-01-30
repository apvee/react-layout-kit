import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Box, Group, type GroupProps, Stack } from '..';

function Frame(props: {
	title: string;
	description?: string;
	width?: number;
	children: React.ReactNode;
}) {
	const { title, description, width, children } = props;

	return (
		<Box
			$border="1px solid #e5e7eb"
			$borderRadius="12px"
			$backgroundColor="#ffffff"
			$boxShadow="0 1px 2px rgba(0,0,0,0.06)"
			p="lg"
			style={width ? { width } : undefined}
		>
			<Box mb="md">
				<div style={{ fontWeight: 700 }}>{title}</div>
				{description ? <div style={{ fontSize: 13, color: '#6b7280' }}>{description}</div> : null}
			</Box>
			{children}
		</Box>
	);
}

function Pill(props: { children: React.ReactNode; tone: 'blue' | 'pink' | 'green' | 'slate' }) {
	const { children, tone } = props;

	const tones = {
		blue: { bg: '#eff6ff', border: '#93c5fd', fg: '#1e3a8a' },
		pink: { bg: '#fdf2f8', border: '#f9a8d4', fg: '#831843' },
		green: { bg: '#ecfdf5', border: '#6ee7b7', fg: '#064e3b' },
		slate: { bg: '#f8fafc', border: '#cbd5e1', fg: '#0f172a' },
	};

	const t = tones[tone];

	return (
		<Box
			$border={`1px solid ${t.border}`}
			$borderRadius="999px"
			$backgroundColor={t.bg}
			px="md"
			py="sm"
			$textAlign="center"
		>
			<span style={{ fontWeight: 700, color: t.fg, whiteSpace: 'nowrap' }}>{children}</span>
		</Box>
	);
}

const meta = {
	title: 'Components/Group',
	component: Group,
	parameters: {
		layout: 'padded',
		docs: {
			description: {
				component: `
\`Group\` composes elements/components in a **horizontal flex container** (\`flex-direction: row\`).
It’s handy for button groups, toolbars, tags, and any “row of items” layout.

## Key behaviors

- **Layout props**: \`align\`, \`justify\`, \`wrap\`, and \`gap\` map to flexbox + gap.
- **grow / preventGrowOverflow**: when enabled, \`Group\` may apply **inline styles** to its *direct children*:
	- \`grow\` → children receive \`flex-grow: 1\`
	- \`preventGrowOverflow\` → children receive \`max-width: 100% / N\` (based on children count)

## Responsive behavior

All Group props support responsive values (breakpoint objects). Values are resolved using the measured container width;
for deterministic Storybook demos, pass \`containerWidth\`.
				`.trim(),
			},
		},
	},
	tags: ['autodocs'],
	argTypes: {
		align: {
			control: 'select',
			options: ['stretch', 'flex-start', 'flex-end', 'center', 'baseline'],
			table: { category: 'Layout' },
		},
		justify: {
			control: 'select',
			options: ['flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'space-evenly'],
			table: { category: 'Layout' },
		},
		wrap: {
			control: 'select',
			options: ['wrap', 'nowrap', 'wrap-reverse'],
			table: { category: 'Layout' },
		},
		gap: {
			control: 'select',
			options: ['xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl', 'xxxl', 0, 8, 12, 16, 24],
			table: { category: 'Spacing' },
		},
		grow: {
			control: 'boolean',
			table: { category: 'Children behavior' },
		},
		preventGrowOverflow: {
			control: 'boolean',
			table: { category: 'Children behavior' },
		},
		containerWidth: {
			control: 'number',
			table: { category: 'Responsive' },
		},
		asChild: {
			control: 'boolean',
			table: { category: 'Composition' },
		},
		children: { control: false },
	},
} satisfies Meta<typeof Group>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
	args: {
		gap: 'sm',
		align: 'center',
		justify: 'flex-start',
		wrap: 'wrap',
		grow: false,
		preventGrowOverflow: true,
	} satisfies Partial<GroupProps>,
	render: (args: GroupProps) => (
		<Box $backgroundColor="#f5f5f5" p="lg">
			<Frame title="Playground" description="Tweak layout props in Controls.">
				<Group
					{...args}
					p="md"
					$border="1px dashed #cbd5e1"
					$borderRadius="12px"
					$backgroundColor="#f8fafc"
				>
					<Pill tone="blue">One</Pill>
					<Pill tone="pink">Two</Pill>
					<Pill tone="green">Three</Pill>
					<Pill tone="slate">Four</Pill>
				</Group>
			</Frame>
		</Box>
	),
};

export const Variants: Story = {
	render: () => (
		<Box $backgroundColor="#f5f5f5" p="lg">
			<Stack gap="lg">
				<Frame title="1) Toolbar (space-between)" description="Use justify to spread items and keep them aligned.">
					<Group justify="space-between" gap="md" wrap="nowrap" p="md" $backgroundColor="#ffffff" $borderRadius="12px">
						<Group gap="sm" wrap="nowrap">
							<Pill tone="blue">Back</Pill>
							<Pill tone="slate">Search</Pill>
						</Group>
						<Group gap="sm" wrap="nowrap">
							<Pill tone="green">Save</Pill>
							<Pill tone="pink">Publish</Pill>
						</Group>
					</Group>
				</Frame>

				<Frame title="2) Equal-width items (grow)" description="When grow=true, direct children receive flex-grow: 1.">
					<Group grow gap="sm" wrap="nowrap" p="md" $backgroundColor="#ffffff" $borderRadius="12px">
						<Pill tone="blue">Primary</Pill>
						<Pill tone="pink">Secondary</Pill>
						<Pill tone="slate">Tertiary</Pill>
					</Group>
				</Frame>

				<Frame
					title="3) Wrapped chips (gap + wrap)"
					description="When wrap=wrap, items flow to the next line with consistent gap."
				>
					<Group gap="sm" wrap="wrap" p="md" $backgroundColor="#ffffff" $borderRadius="12px">
						<Pill tone="slate">Design</Pill>
						<Pill tone="blue">Frontend</Pill>
						<Pill tone="pink">Docs</Pill>
						<Pill tone="green">Release</Pill>
						<Pill tone="slate">Bugfix</Pill>
						<Pill tone="blue">Refactor</Pill>
						<Pill tone="pink">Chore</Pill>
					</Group>
				</Frame>
			</Stack>
		</Box>
	),
};

export const ResponsiveAndAsChild: Story = {
	render: () => {
		const Viewport = (props: { label: string; width: number }) => {
			const { label, width } = props;

			return (
				<Frame title={label} description={`containerWidth: ${width}px`} width={width}>
					<Group
						asChild
						containerWidth={width}
						gap={{ xs: 'sm', md: 'md' }}
						justify={{ xs: 'center', md: 'space-between' }}
						wrap={{ xs: 'wrap', md: 'nowrap' }}
						p="md"
						$border="1px dashed #cbd5e1"
						$borderRadius="12px"
						$backgroundColor="#ffffff"
					>
						<nav aria-label="Quick actions">
							<Pill tone="blue">Home</Pill>
							<Pill tone="slate">Docs</Pill>
							<Pill tone="green">Status</Pill>
							<Pill tone="pink">Contact</Pill>
						</nav>
					</Group>
				</Frame>
			);
		};

		return (
			<Box $backgroundColor="#f5f5f5" p="lg">
				<Frame
					title="Responsive + asChild"
					description="Same responsive props, different containerWidth values. Group renders a semantic <nav> via asChild."
				>
					<Box $display="flex" $flexWrap="wrap" $gap="16px">
						<Viewport label="Small" width={360} />
						<Viewport label="Large" width={1100} />
					</Box>
				</Frame>
			</Box>
		);
	},
};

