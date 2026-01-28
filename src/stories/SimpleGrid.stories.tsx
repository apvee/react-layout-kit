import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Box, SimpleGrid, Stack, type SimpleGridProps } from '..';

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

function Tile(props: { label: string; tone: 'blue' | 'pink' | 'green' | 'slate' }) {
	const { label, tone } = props;

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
			$borderRadius="12px"
			$backgroundColor={t.bg}
			p="md"
			$textAlign="center"
		>
			<div style={{ fontWeight: 800, color: t.fg }}>{label}</div>
		</Box>
	);
}

const meta = {
	title: 'Components/SimpleGrid',
	component: SimpleGrid,
	parameters: {
		layout: 'padded',
		docs: {
			description: {
				component: `
\`SimpleGrid\` is a responsive CSS Grid where **each item takes an equal fraction** of the available space.

## Key props

- \`cols\`: number of columns (supports responsive values)
- \`spacing\`: column gap (spacing token or number → px; supports responsive values)
- \`verticalSpacing\`: row gap (defaults to \`spacing\` when omitted)

## Responsive behavior

Props are resolved using the measured container width. For deterministic Storybook demos you can pass \`containerWidth\`.
				`.trim(),
			},
		},
	},
	tags: ['autodocs'],
	argTypes: {
		cols: {
			control: { type: 'number', min: 1, max: 12, step: 1 },
			table: { category: 'Grid' },
		},
		spacing: {
			control: 'select',
			options: ['xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl', 'xxxl', 0, 8, 12, 16, 24],
			table: { category: 'Spacing' },
		},
		verticalSpacing: {
			control: 'select',
			options: ['xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl', 'xxxl', 0, 8, 12, 16, 24],
			table: { category: 'Spacing' },
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
} satisfies Meta<typeof SimpleGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
	args: {
		cols: 3,
		spacing: 'sm',
		verticalSpacing: 'sm',
	} satisfies Partial<SimpleGridProps>,
	render: (args: SimpleGridProps) => (
		<Box $backgroundColor="#f5f5f5" p="lg">
			<Frame title="Playground" description="Tweak cols/spacing in Controls.">
				<SimpleGrid
					{...args}
					p="lg"
					$border="1px dashed #cbd5e1"
					$borderRadius="12px"
					$backgroundColor="#f8fafc"
				>
					<Tile label="1" tone="blue" />
					<Tile label="2" tone="pink" />
					<Tile label="3" tone="green" />
					<Tile label="4" tone="slate" />
					<Tile label="5" tone="blue" />
					<Tile label="6" tone="pink" />
				</SimpleGrid>
			</Frame>
		</Box>
	),
};

export const Variants: Story = {
	render: () => (
		<Box $backgroundColor="#f5f5f5" p="lg">
			<Stack gap="lg">
				<Frame title="1) Equal columns" description="A basic 4-column grid with consistent gaps.">
					<SimpleGrid cols={4} spacing="sm" p="md" $backgroundColor="#ffffff" $borderRadius="12px">
						<Tile label="A" tone="blue" />
						<Tile label="B" tone="pink" />
						<Tile label="C" tone="green" />
						<Tile label="D" tone="slate" />
					</SimpleGrid>
				</Frame>

				<Frame title="2) Different row vs column gaps" description="verticalSpacing defaults to spacing, but you can override it.">
					<SimpleGrid cols={3} spacing="xl" verticalSpacing="sm" p="md" $backgroundColor="#ffffff" $borderRadius="12px">
						<Tile label="1" tone="slate" />
						<Tile label="2" tone="slate" />
						<Tile label="3" tone="slate" />
						<Tile label="4" tone="slate" />
						<Tile label="5" tone="slate" />
						<Tile label="6" tone="slate" />
					</SimpleGrid>
				</Frame>

				<Frame title="3) Composition (asChild)" description="Render a semantic element while keeping SimpleGrid layout.">
					<SimpleGrid
						asChild
						cols={3}
						spacing="sm"
						p="md"
						$backgroundColor="#ffffff"
						$borderRadius="12px"
					>
						<section aria-label="Cards">
							<Tile label="Card 1" tone="blue" />
							<Tile label="Card 2" tone="pink" />
							<Tile label="Card 3" tone="green" />
						</section>
					</SimpleGrid>
				</Frame>
			</Stack>
		</Box>
	),
};

export const ResponsiveColumns: Story = {
	render: () => {
		const Viewport = (props: { label: string; width: number }) => {
			const { label, width } = props;

			return (
				<Frame title={label} description={`containerWidth: ${width}px`} width={width}>
					<SimpleGrid
						cols={{ xs: 1, md: 2, lg: 4 }}
						spacing={{ xs: 'sm', md: 'md' }}
						containerWidth={width}
						p="md"
						$border="1px dashed #cbd5e1"
						$borderRadius="12px"
						$backgroundColor="#f8fafc"
					>
						<Tile label="One" tone="blue" />
						<Tile label="Two" tone="pink" />
						<Tile label="Three" tone="green" />
						<Tile label="Four" tone="slate" />
					</SimpleGrid>
				</Frame>
			);
		};

		return (
			<Box $backgroundColor="#f5f5f5" p="lg">
				<Frame title="Responsive columns" description="Same responsive props, different container widths.">
					<Box $display="flex" $flexWrap="wrap" $gap="16px">
						<Viewport label="Small" width={360} />
						<Viewport label="Large" width={1100} />
					</Box>
				</Frame>
			</Box>
		);
	},
};

