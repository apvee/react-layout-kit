import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Box, Stack, type StackProps } from '..';

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

function Card(props: { title: string; body: string }) {
	const { title, body } = props;

	return (
		<Box $border="1px solid #e2e8f0" $borderRadius="12px" $backgroundColor="#f8fafc" p="md">
			<div style={{ fontWeight: 800, color: '#0f172a' }}>{title}</div>
			<div style={{ fontSize: 13, color: '#334155' }}>{body}</div>
		</Box>
	);
}

const meta = {
	title: 'Components/Stack',
	component: Stack,
	parameters: {
		layout: 'padded',
		docs: {
			description: {
				component: `
\`Stack\` composes children in a **vertical flex container** (\`flex-direction: column\`).
It’s useful for forms, card lists, and page sections.

## Key props

- \`gap\`: spacing between items (spacing token or number → px; supports responsive values)
- \`align\`: maps to \`align-items\` (default: \`"stretch"\`)
- \`justify\`: maps to \`justify-content\` (default: \`"flex-start"\`)

## Responsive behavior

Props are resolved using the measured container width. For deterministic Storybook demos, pass \`containerWidth\`.
				`.trim(),
			},
		},
	},
	tags: ['autodocs'],
	argTypes: {
		gap: {
			control: 'select',
			options: ['xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl', 'xxxl', 0, 8, 12, 16, 24],
			table: { category: 'Spacing' },
		},
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
} satisfies Meta<typeof Stack>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
	args: {
		gap: 'sm',
		align: 'stretch',
		justify: 'flex-start',
	} satisfies Partial<StackProps>,
	render: (args: StackProps) => (
		<Box $backgroundColor="#f5f5f5" p="lg">
			<Frame title="Playground" description="Tweak gap/align/justify from Controls.">
				<Stack
					{...args}
					p="lg"
					$border="1px dashed #cbd5e1"
					$borderRadius="12px"
					$backgroundColor="#f8fafc"
				>
					<Card title="Item 1" body="First item in the stack." />
					<Card title="Item 2" body="Second item in the stack." />
					<Card title="Item 3" body="Third item in the stack." />
				</Stack>
			</Frame>
		</Box>
	),
};

export const Variants: Story = {
	render: () => (
		<Box $backgroundColor="#f5f5f5" p="lg">
			<Stack gap="lg">
				<Frame
					title="1) Centered content"
					description="align=center changes cross-axis alignment, useful for narrow stacks."
				>
					<Stack align="center" gap="sm" p="md" $backgroundColor="#ffffff" $borderRadius="12px">
						<Box $width="260px">
							<Card title="Title" body="A centered card." />
						</Box>
						<Box $width="220px">
							<Card title="Subtitle" body="Another centered card." />
						</Box>
					</Stack>
				</Frame>

				<Frame
					title="2) Space between (fixed height)"
					description="justify=space-between distributes items along the vertical axis when a height is set."
				>
					<Stack
						justify="space-between"
						gap="sm"
						p="md"
						$backgroundColor="#ffffff"
						$borderRadius="12px"
						style={{ height: 280 }}
					>
						<Card title="Header" body="Top" />
						<Card title="Body" body="Middle" />
						<Card title="Footer" body="Bottom" />
					</Stack>
				</Frame>

				<Frame
					title="3) Composition (asChild)"
					description="Render a semantic element while keeping Stack layout."
				>
					<Stack
						asChild
						gap="sm"
						p="md"
						$backgroundColor="#ffffff"
						$borderRadius="12px"
					>
						<section aria-label="Card list">
							<Card title="Card 1" body="Rendered inside a semantic section." />
							<Card title="Card 2" body="Still a vertical stack." />
						</section>
					</Stack>
				</Frame>
			</Stack>
		</Box>
	),
};

export const Responsive: Story = {
	render: () => {
		const Viewport = (props: { label: string; width: number }) => {
			const { label, width } = props;

			return (
				<Frame title={label} description={`containerWidth: ${width}px`} width={width}>
					<Stack
						containerWidth={width}
						gap={{ xs: 'xs', md: 'md', lg: 'xl' }}
						align={{ xs: 'stretch', md: 'center' }}
						p="md"
						$border="1px dashed #cbd5e1"
						$borderRadius="12px"
						$backgroundColor="#f8fafc"
					>
						<Box $maxWidth="520px">
							<Card title="Responsive gap" body="Gap grows with the breakpoint (xs → md → lg)." />
						</Box>
						<Box $maxWidth="520px">
							<Card title="Responsive align" body="Align switches to center from md and up." />
						</Box>
					</Stack>
				</Frame>
			);
		};

		return (
			<Box $backgroundColor="#f5f5f5" p="lg">
				<Frame title="Responsive Stack" description="Same responsive props, different container widths.">
					<Box $display="flex" $flexWrap="wrap" $gap="16px">
						<Viewport label="Small" width={360} />
						<Viewport label="Large" width={1100} />
					</Box>
				</Frame>
			</Box>
		);
	},
};

