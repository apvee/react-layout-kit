import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Box, Space, Stack, type SpaceProps } from '..';

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

function Chip(props: { children: React.ReactNode }) {
	return (
		<Box
			$border="1px solid #cbd5e1"
			$borderRadius="999px"
			$backgroundColor="#f8fafc"
			px="md"
			py="sm"
		>
			<span style={{ fontWeight: 700, color: '#0f172a', whiteSpace: 'nowrap' }}>{props.children}</span>
		</Box>
	);
}

const meta = {
	title: 'Components/Space',
	component: Space,
	parameters: {
		layout: 'padded',
		docs: {
			description: {
				component: `
\`Space\` renders a simple spacer with a configurable **width** (\`w\`) and/or **height** (\`h\`) using the theme spacing scale.

## Notes

- Unlike most layout components, \`Space\` **does not extend Box**; it only accepts \`w\`, \`h\`, and optional \`containerWidth\`.
- If both \`w\` and \`h\` resolve to \`undefined\`, the component **renders \`null\`**.

## Responsive behavior

\`w\` and \`h\` accept responsive values (breakpoint objects). Values are resolved using the measured container width; for deterministic demos you can pass \`containerWidth\`.
				`.trim(),
			},
		},
	},
	tags: ['autodocs'],
	argTypes: {
		w: {
			control: 'select',
			options: ['xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl', 'xxxl', 0, 4, 8, 12, 16, 24, 32],
			table: { category: 'Spacing' },
		},
		h: {
			control: 'select',
			options: ['xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl', 'xxxl', 0, 4, 8, 12, 16, 24, 32],
			table: { category: 'Spacing' },
		},
		containerWidth: {
			control: 'number',
			table: { category: 'Responsive' },
		},
	},
} satisfies Meta<typeof Space>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
	args: {
		w: 'md',
		h: undefined,
	} satisfies Partial<SpaceProps>,
	render: (args: SpaceProps) => (
		<Box $backgroundColor="#f5f5f5" p="lg">
			<Frame title="Playground" description="Use w/h to add horizontal or vertical spacing.">
				<Stack gap="lg">
					<Box>
						<div style={{ fontWeight: 700, marginBottom: 8 }}>Horizontal (flex row)</div>
						<Box $display="flex" $alignItems="center">
							<Chip>Left</Chip>
							<Space {...args} />
							<Chip>Right</Chip>
						</Box>
					</Box>

					<Box>
						<div style={{ fontWeight: 700, marginBottom: 8 }}>Vertical (stacked)</div>
						<Chip>Top</Chip>
						<Space h={args.h ?? 'md'} w={undefined} />
						<Chip>Bottom</Chip>
					</Box>
				</Stack>
			</Frame>
		</Box>
	),
};

export const LayoutExamples: Story = {
	render: () => (
		<Box $backgroundColor="#f5f5f5" p="lg">
			<Stack gap="lg">
				<Frame
					title="1) Button row spacing"
					description="In a flex container, Space prevents shrink and acts like a consistent gap."
				>
					<Box $display="flex" $alignItems="center" $flexWrap="wrap">
						<Chip>Action 1</Chip>
						<Space w="sm" />
						<Chip>Action 2</Chip>
						<Space w="sm" />
						<Chip>Action 3</Chip>
					</Box>
				</Frame>

				<Frame title="2) Vertical rhythm" description="Use Space(h) to separate sections without margins.">
					<Chip>Section A</Chip>
					<Space h="md" />
					<Chip>Section B</Chip>
					<Space h="xl" />
					<Chip>Section C</Chip>
				</Frame>

				<Frame
					title="3) Both dimensions"
					description="You can set both w and h (useful as a fixed-size spacer in a grid of demos)."
				>
					<Box $display="flex" $alignItems="center">
						<Chip>Start</Chip>
						<Space w="lg" h="lg" />
						<Chip>End</Chip>
					</Box>
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
					<Box $display="flex" $alignItems="center" $flexWrap="wrap">
						<Chip>Left</Chip>
						<Space
							containerWidth={width}
							w={{ xs: 'sm', md: 'lg' }}
						/>
						<Chip>Right</Chip>
					</Box>

					<Space h="md" />

					<Chip>
						Spacer w: {'{ xs: "sm", md: "lg" }'}
					</Chip>
				</Frame>
			);
		};

		return (
			<Box $backgroundColor="#f5f5f5" p="lg">
				<Frame title="Responsive spacing" description="Same responsive prop, different containerWidth values.">
					<Box $display="flex" $flexWrap="wrap" $gap="16px">
						<Viewport label="Small" width={360} />
						<Viewport label="Large" width={1100} />
					</Box>
				</Frame>
			</Box>
		);
	},
};

