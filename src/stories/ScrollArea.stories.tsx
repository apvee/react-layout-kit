import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Box, ScrollArea, Stack, type ScrollAreaProps } from '..';

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
		<Box
			$border="1px solid #e2e8f0"
			$borderRadius="12px"
			$backgroundColor="#f8fafc"
			p="md"
		>
			<div style={{ fontWeight: 800, color: '#0f172a' }}>{title}</div>
			<div style={{ fontSize: 13, color: '#334155' }}>{body}</div>
		</Box>
	);
}

function VerticalContent() {
	return (
		<Stack gap="sm">
			{Array.from({ length: 16 }).map((_, i) => (
				<Card
					// eslint-disable-next-line react/no-array-index-key
					key={i}
					title={`Item ${i + 1}`}
					body="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
				/>
			))}
		</Stack>
	);
}

function HorizontalContent() {
	return (
		<Box $display="flex" $gap="12px" $alignItems="stretch">
			{Array.from({ length: 10 }).map((_, i) => (
				<Box
					// eslint-disable-next-line react/no-array-index-key
					key={i}
					$minWidth="220px"
				>
					<Card title={`Column ${i + 1}`} body="Wide content to force horizontal scrolling." />
				</Box>
			))}
		</Box>
	);
}

const meta = {
	title: 'Components/ScrollArea',
	component: ScrollArea,
	parameters: {
		layout: 'padded',
		docs: {
			description: {
				component: `
\`ScrollArea\` provides **native scrolling** with **custom overlay scrollbars**.

## Features (from implementation)

- Multiple visibility modes: \`type\` = \`"hover" | "always" | "scroll"\`
- Supports showing \`vertical\`, \`horizontal\`, or \`both\` scrollbars
- Responsive scrollbar thickness via \`size\` (a responsive value)
- RTL support via \`dir\`
- Customizable colors (track + thumb states)

## Responsive behavior

Only \`size\` is typed as a responsive value. It’s resolved from the **measured container width**.
In Storybook we demonstrate responsiveness by rendering the same component at different widths.

## Composition (asChild)

\`asChild\` is exposed on the public API. Note: in the current implementation, the scrollable content is rendered inside an internal viewport element, so the typical “provide your own root element” composition is not demonstrated here.
				`.trim(),
			},
		},
	},
	tags: ['autodocs'],
	argTypes: {
		size: {
			control: 'select',
			options: ['small', 'medium', 'large'],
			table: { category: 'Scrollbars' },
		},
		radius: {
			control: 'select',
			options: ['none', 'small', 'medium', 'large', 'full'],
			table: { category: 'Scrollbars' },
		},
		scrollbars: {
			control: 'select',
			options: ['vertical', 'horizontal', 'both'],
			table: { category: 'Scrollbars' },
		},
		type: {
			control: 'select',
			options: ['hover', 'always', 'scroll'],
			table: { category: 'Behavior' },
		},
		scrollHideDelay: {
			control: { type: 'number', min: 0, step: 50 },
			table: { category: 'Behavior' },
		},
		dir: {
			control: 'select',
			options: ['ltr', 'rtl'],
			table: { category: 'Behavior' },
		},
		trackColor: {
			control: 'color',
			table: { category: 'Colors' },
		},
		thumbColor: {
			control: 'color',
			table: { category: 'Colors' },
		},
		thumbHoverColor: {
			control: 'color',
			table: { category: 'Colors' },
		},
		thumbActiveColor: {
			control: 'color',
			table: { category: 'Colors' },
		},
		asChild: {
			control: 'boolean',
			table: { category: 'Composition' },
		},
		className: { control: false },
		style: { control: false },
		children: { control: false },
	},
} satisfies Meta<typeof ScrollArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
	args: {
		size: 'small',
		radius: 'small',
		scrollbars: 'both',
		type: 'hover',
		scrollHideDelay: 600,
		dir: 'ltr',
	} satisfies Partial<ScrollAreaProps>,
	render: (args: ScrollAreaProps) => (
		<Box $backgroundColor="#f5f5f5" p="lg">
			<Frame title="Playground" description="Content overflows in both directions so you can test every scrollbar mode.">
				<ScrollArea
					{...args}
					style={{ width: 360, height: 220 }}
				>
					<Box p="md" $minWidth="900px">
						<VerticalContent />
					</Box>
				</ScrollArea>
			</Frame>
		</Box>
	),
};

export const Variants: Story = {
	render: () => (
		<Box $backgroundColor="#f5f5f5" p="lg">
			<Stack gap="lg">
				<Frame
					title="1) Vertical only"
					description="scrollbars=vertical, with a fixed viewport height."
				>
					<ScrollArea scrollbars="vertical" type="hover" style={{ width: 360, height: 220 }}>
						<Box p="md">
							<VerticalContent />
						</Box>
					</ScrollArea>
				</Frame>

				<Frame
					title="2) Horizontal only"
					description="scrollbars=horizontal, with wide content."
				>
					<ScrollArea scrollbars="horizontal" type="hover" style={{ width: 360, height: 160 }}>
						<Box p="md">
							<HorizontalContent />
						</Box>
					</ScrollArea>
				</Frame>

				<Frame
					title="3) Always visible + custom colors"
					description="type=always, thicker scrollbars (size=medium), and custom thumb/track colors."
				>
					<ScrollArea
						type="always"
						size="medium"
						radius="full"
						trackColor="rgba(15, 23, 42, 0.08)"
						thumbColor="rgba(59, 130, 246, 0.55)"
						thumbHoverColor="rgba(59, 130, 246, 0.75)"
						thumbActiveColor="rgba(59, 130, 246, 0.95)"
						style={{ width: 360, height: 220 }}
					>
						<Box p="md">
							<VerticalContent />
						</Box>
					</ScrollArea>
				</Frame>
			</Stack>
		</Box>
	),
};

export const ResponsiveSize: Story = {
	render: () => {
		const Viewport = (props: { label: string; width: number }) => {
			const { label, width } = props;

			return (
				<Frame
					title={label}
					description="Same responsive size prop, different measured widths."
					width={width}
				>
					<ScrollArea
						size={{ xs: 'small', lg: 'large' }}
						type="always"
						scrollbars="vertical"
						style={{ width: '100%', height: 220 }}
					>
						<Box p="md">
							<VerticalContent />
						</Box>
					</ScrollArea>
				</Frame>
			);
		};

		return (
			<Box $backgroundColor="#f5f5f5" p="lg">
				<Frame title="Responsive scrollbar size" description="Resize is simulated by rendering two different widths.">
					<Box $display="flex" $flexWrap="wrap" $gap="16px">
						<Viewport label="Small (xs)" width={360} />
						<Viewport label="Large (lg)" width={1100} />
					</Box>
				</Frame>
			</Box>
		);
	},
};

