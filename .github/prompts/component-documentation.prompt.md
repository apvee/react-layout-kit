# Component Documentation Generator Prompt

## Core Directives

You WILL generate comprehensive Markdown documentation for React components in the @apvee/react-layout-kit library.
You WILL create ONE documentation file per component specified by the user.
You WILL analyze the component's source code, types, and stories to extract all relevant information.
You WILL follow the established documentation structure and patterns used in this project.
You WILL NEVER invent features or properties that don't exist in the actual component code.
You WILL ALWAYS verify information by reading the component files before documenting.

## Requirements

<!-- <requirements> -->

### Analysis Requirements

You MUST analyze the following files for each component:

1. **Component Implementation** (`ComponentName.tsx`):
   - Component function signature and JSDoc comments
   - Props destructuring and default values
   - Internal logic and state management
   - Hooks usage (useResponsiveResolvers, useMergedRef, etc.)
   - Child components (e.g., Flex.Item, Grid.Col)

2. **Type Definitions** (`ComponentName.types.ts`):
   - Props interface/type definitions
   - JSDoc documentation on type properties
   - Responsive value support
   - Extension of base types (BaseBoxProps, etc.)

3. **Stories** (`ComponentName.stories.tsx`):
   - Usage examples from Storybook stories
   - Common use cases and variations
   - Edge cases and advanced patterns

4. **Related Components**:
   - Sub-components (Item, Col, etc.)
   - Context providers if applicable
   - Custom hooks associated with the component

### Documentation Structure Requirements

You WILL structure each documentation file with the following sections:

#### 1. Component Header

```markdown
# [ComponentName]

> [Brief one-line description of the component's primary purpose]

**Package:** @apvee/react-layout-kit  
**Component Type:** [Layout | Container | Utility | Composition]  
**Since:** [Version if available, otherwise "v1.0.0"]
```

#### 2. Overview Section

You MUST include:
- Detailed description of what the component does
- Primary use cases
- Key capabilities and features
- When to use this component vs alternatives

#### 3. Features Section

You WILL list all component features with bullet points:
- Core functionality
- Responsive capabilities
- Composition support (asChild)
- Performance optimizations
- Integration with other components

#### 4. Props API Section

You WILL document ALL props in a table format:

```markdown
## Props

### [ComponentName]Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `propName` | `PropType` | `defaultValue` | Detailed description with responsive support info |
```

For components with sub-components, document each separately:

```markdown
### [ComponentName].ItemProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
```

You MUST include:
- Exact prop name in code format
- Full TypeScript type (including ResponsiveValue wrapper when applicable)
- Default value (use `-` if no default)
- Comprehensive description including:
  - What the prop controls
  - Whether it supports responsive values
  - Valid values or ranges
  - Relationship to CSS properties

**Handling Inherited Props:**

For components with many inherited props (e.g., extending BaseBoxProps):
- You WILL document component-specific props in detail in the main table
- You WILL create a separate "Inherited Props" section after the main props table
- You WILL summarize inherited prop categories with links:
  ```markdown
  ### Inherited Props
  
  **From BaseBoxProps:**
  - `asChild`, `containerWidth`, `styleReset` (documented above)
  - All standard HTML div attributes (`className`, `style`, `onClick`, etc.)
  
  **Short Props** (from IShortStyleBoxProps):
  - Spacing: `m`, `mt`, `mr`, `mb`, `ml`, `mx`, `my`, `p`, `pt`, `pr`, `pb`, `pl`, `px`, `py`
  - Sizing: `w`, `h`, `miw`, `mih`, `maw`, `mah`
  - [View complete short props reference](../core/short-props.md)
  
  **Dollar Props** (from DollarCssProps):
  - Any CSS property prefixed with `$` (e.g., `$display`, `$flexDirection`, `$backgroundColor`)
  - All dollar props support responsive values
  - [View complete CSS properties reference](../core/dollar-props.md)
  ```

#### 5. Usage Examples Section

You WILL provide multiple practical examples:

```markdown
## Usage

### Basic Usage

\`\`\`tsx
import { ComponentName } from '@apvee/react-layout-kit';

// Simple example showing most common usage
\`\`\`

### Responsive Layout

\`\`\`tsx
// Example showing responsive values with breakpoints
\`\`\`

### Advanced Composition

\`\`\`tsx
// Example showing asChild pattern or advanced features
\`\`\`

### With Other Components

\`\`\`tsx
// Example showing integration with other layout components
\`\`\`
```

You MUST:
- Include working, copy-paste ready code examples
- Show import statements
- Demonstrate both simple and complex use cases
- Include responsive examples when component supports responsive props
- Show asChild usage if component supports it

#### 6. Best Practices Section

You WILL include:
- Recommended usage patterns
- Performance considerations
- Accessibility guidelines
- Common mistakes to avoid
- Tips for optimal responsive behavior

#### 7. Related Components Section

You WILL list:
- Parent or child components
- Alternative components for similar use cases
- Components commonly used together
- Links to related documentation

#### 8. TypeScript Section

You WILL include:
- Type definitions for props
- Generic types if applicable
- Module augmentation examples for customization
- Type utility usage examples

**Module Augmentation Examples:**

For components that use configurable spacing or breakpoints, you MUST include:

```markdown
## TypeScript

### Type Definitions

The component uses the following TypeScript types:

\`\`\`typescript
import type { ComponentNameProps } from '@apvee/react-layout-kit';

const MyComponent: React.FC = () => {
  const props: ComponentNameProps = {
    // ... typed props
  };
  return <ComponentName {...props} />;
};
\`\`\`

### Customizing Spacing Scale

You can customize the spacing scale used by this component:

\`\`\`typescript
// types/react-layout-kit.d.ts
declare module '@apvee/react-layout-kit' {
  interface CustomSpacing {
    xs: '4px';
    sm: '8px';
    md: '16px';
    lg: '24px';
    xl: '32px';
  }
}
\`\`\`

### Customizing Breakpoints

You can customize the responsive breakpoints:

\`\`\`typescript
// types/react-layout-kit.d.ts
declare module '@apvee/react-layout-kit' {
  interface CustomBreakpoints {
    mobile: 0;
    tablet: 768;
    desktop: 1024;
    wide: 1440;
  }
}
\`\`\`

[Learn more about configuration →](../configuration/customization.md)
```

#### 9. Notes and Warnings Section (if applicable)

You WILL document:
- Browser compatibility issues
- Known limitations
- Breaking changes from previous versions
- Migration guidance

### Code Quality Requirements

You WILL ensure:
- All code examples use TypeScript with proper typing
- All imports are correct and complete
- Examples follow React 17+ best practices
- Code follows the project's ESLint and Prettier configuration
- Examples use proper JSX formatting

### Accuracy Requirements

You MUST:
- Read the actual source files before documenting
- Use exact prop names from the type definitions
- Copy descriptions from JSDoc comments when available
- Verify default values from component implementation
- Extract examples from existing Storybook stories when available
- Cross-reference with README.md for consistency

### Responsive Values Documentation Requirements

When a prop supports `ResponsiveValue<T>`, you WILL explain:
- That the prop accepts either a direct value OR a breakpoint object
- The breakpoint object structure: `{ xs?, sm?, md?, lg?, xl?, xxl? }`
- How responsive resolution works based on container width
- Example of both direct and responsive usage

You MUST include a "Responsive Values" subsection in the documentation:

```markdown
### Responsive Values

Many props in [ComponentName] support responsive values through breakpoint objects. This allows you to specify different values for different container widths.

**Default Breakpoints:**
- `xs`: 0px (mobile)
- `sm`: 576px (mobile landscape)
- `md`: 768px (tablet)
- `lg`: 992px (desktop)
- `xl`: 1200px (large desktop)
- `xxl`: 1400px (extra large desktop)

**Usage:**
```tsx
// Direct value
<ComponentName someProp="value" />

// Responsive value
<ComponentName 
  someProp={{ 
    xs: "mobileValue", 
    md: "tabletValue", 
    lg: "desktopValue" 
  }} 
/>
```

**Note:** Responsive resolution is based on the component's container width, not viewport width. You can customize breakpoints via module augmentation. [Learn more about responsive design →](../core/responsive-values.md)
```

### Style Props Documentation Requirements

You WILL document these standard props that extend from BaseBoxProps:
- Short props (m, p, w, h, etc.) with link to spacing system
- Dollar props ($display, $margin, etc.) with link to CSS properties
- asChild prop with Slot pattern explanation
- containerWidth prop for responsive calculations
- styleReset prop

<!-- </requirements> -->

## Documentation Format

<!-- <format> -->

### File Naming Convention

You WILL name files using this pattern:
- Component name in kebab-case

### Code Example Validation Standards

All code examples MUST be:
- **Syntactically correct**: Valid TypeScript/TSX that would compile without errors
- **Importable**: Use actual exported names and paths from the library
- **Prop-accurate**: Use only props that actually exist on the component's type definition
- **Type-safe**: Include proper TypeScript types for variables and function parameters
- **Runnable**: Could be copied and pasted into a React application without modification (aside from adding necessary provider wrappers)

You WILL verify each example by:
1. Confirming all imported names exist in the library exports
2. Checking that all props used exist in the component's type definition
3. Ensuring JSX syntax is correct
4. Validating that prop values match expected types
- `.md` extension
- Location: `/docs/components/[component-name].md`

**Directory Creation:**
- You MUST create the `/docs/components/` directory structure if it doesn't exist
- You WILL use the appropriate file creation tool to ensure proper directory setup

Examples:
- `/docs/components/box.md`
- `/docs/components/flex.md`
- `/docs/components/area-grid.md`

### Markdown Formatting Standards

You WILL follow these standards:
- Use ATX-style headers (`#`, `##`, `###`)
- Use fenced code blocks with language specifiers (\`\`\`tsx)
- Use tables for props documentation
- Use bold for emphasis on important concepts
- Use inline code for prop names, component names, and values
- Use blockquotes for notes and warnings
- Use numbered lists for sequential steps
- Use bullet lists for features and options

### Code Block Standards

You WILL:
- Always specify language: \`\`\`tsx or \`\`\`typescript
- Include necessary imports in every example
- Use complete, runnable examples (not fragments)
- Add comments to explain complex parts
- Follow 2-space indentation
- Keep examples under 30 lines when possible

### Link Standards

You WILL:
- Link to other component documentation using relative paths
- Link to type definitions in the codebase
- Link to external resources (MDN, React docs) when explaining concepts
- Use descriptive link text (not "click here")

<!-- </format> -->

## Generation Process

<!-- <process> -->

### Step 1: Component Analysis

You WILL:
1. Read the component implementation file (ComponentName.tsx)
2. Read the type definitions file (ComponentName.types.ts)
3. Read the Storybook stories file (ComponentName.stories.tsx)
4. Read any related sub-component files
5. Search for usage examples in other components
6. Identify all props, types, and default values

### Step 2: Information Extraction

You WILL extract:
- Component JSDoc description
- All prop definitions with types
- Default values from prop destructuring
- Responsive value support for each prop
- Usage examples from stories
- Integration patterns from codebase

### Step 3: Structure Organization

You WILL organize information into sections:
- Header with metadata
- Overview based on JSDoc and implementation
- Features list from capabilities
- Props table from type definitions
- Examples from stories and codebase
- Best practices from implementation patterns
- Related components from imports and exports

### Step 4: Documentation Writing

You WILL write:
- Clear, concise descriptions
- Practical, working code examples
- Comprehensive prop tables
- Helpful notes and warnings
- Accurate type information

### Step 5: Validation

You WILL verify:
- All prop names match the type definitions
- All examples are syntactically correct
- All imports are correct
- Default values are accurate
- Responsive value documentation is complete
- Links to other documentation are valid

<!-- </process> -->

## Quality Standards

<!-- <quality> -->

### Completeness Standards

Documentation is complete when it includes:
- All public props documented
- At least 3-4 working code examples
- Responsive usage examples (if applicable)
- asChild pattern example (if applicable)
- Sub-component documentation (if applicable)
- Best practices section
- Related components section

### Accuracy Standards

Documentation is accurate when:
- All information comes from actual source files
- No invented or assumed features
- All code examples are tested and working
- All types match the actual type definitions
- All default values match the implementation

### Clarity Standards

Documentation is clear when:
- Technical terms are explained
- Examples progress from simple to complex
- Each prop description explains WHAT it does and WHEN to use it
- Responsive behavior is clearly explained
- Common mistakes are addressed

### Consistency Standards

Documentation is consistent when:
- Formatting matches other component docs
- Terminology is consistent (e.g., "responsive values" not "breakpoint values")
- Code style matches project standards
- Section order matches the template

<!-- </quality> -->

## Usage Instructions

<!-- <usage> -->

To use this prompt:

1. **Specify the component(s):** Tell me which component(s) you want documented
   - Example: "Document the Box component"
   - Example: "Create documentation for Flex, Grid, and Stack"

2. **I will analyze:** I will read all relevant source files and extract information

3. **I will generate:** I will create complete markdown documentation following this template

4. **I will validate:** I will verify all information is accurate and complete

5. **Location:** Documentation will be created in `/docs/components/[component-name].md`

### Example Request

"Please create documentation for the following components: Box, Flex, Grid"

I will then:
1. Analyze each component's source files
2. Generate three separate markdown files:
   - `/docs/components/box.md`
   - `/docs/components/flex.md`
   - `/docs/components/grid.md`
3. Ensure all documentation is accurate, complete, and consistent

<!-- </usage> -->

## Component-Specific Guidelines

<!-- <component-specific> -->

### For Layout Components (Box, Flex, Grid, Stack)

You MUST document:
- CSS property mappings
- Responsive behavior in detail
- Container width measurement
- Integration with spacing system
- Dollar props and short props support

### For Container Components (Container, Center, AspectRatio)

You MUST document:
- Dimensional constraints
- Responsive sizing behavior
- Common layout patterns
- Best practices for content wrapping

### For Grid Components (Grid, SimpleGrid, AreaGrid)

You MUST document:
- Column/row configuration
- Grid template areas (for AreaGrid)
- Responsive grid behavior
- Gap and spacing control

### For Composition Components

You MUST document:
- Sub-component relationships
- Context providers and consumers
- Prop forwarding behavior
- Ref handling

### For Components with Hooks (ScrollArea)

You MUST document:
- Associated hook API
- Hook usage examples
- Hook return values
- When to use hook vs component

<!-- </component-specific> -->

## Example Output Structure

<!-- <example> -->

```markdown
# Box

> The foundational layout primitive with complete CSS-in-JS styling capabilities.

**Package:** @apvee/react-layout-kit  
**Component Type:** Layout  
**Since:** v1.0.0

---

## Overview

Box is the foundational component that all other layout components in react-layout-kit are built upon. It renders a `div` element by default and provides a flexible styling API through both dollar props (CSS properties prefixed with `$`) and short-hand props (e.g., `m`, `p`, `w`, `h`).

Box enables you to:
- Apply any CSS property through type-safe dollar props
- Use convenient shorthand properties for common styling needs
- Create responsive layouts with breakpoint-based values
- Compose with other components using the `asChild` pattern
- Measure container width automatically for responsive calculations

The component automatically handles responsive value resolution based on container width, making it perfect for creating truly responsive layouts that work in any context, not just based on viewport size.

## Features

- ✅ **Complete CSS Property Support**: Access any CSS property via dollar props with full TypeScript intellisense
- ✅ **Short-hand Props**: Convenient aliases for common properties (m for margin, p for padding, etc.)
- ✅ **Responsive Values**: All style props support breakpoint objects for responsive design
- ✅ **Container-Aware**: Automatically measures element width for responsive calculations
- ✅ **Polymorphic Rendering**: Use `asChild` to render as any element while maintaining Box styling
- ✅ **Performance Optimized**: Memoized style generation and debounced resize handling
- ✅ **Type-Safe**: Full TypeScript support with autocomplete for all CSS properties
- ✅ **Configuration Reactive**: Automatically updates when global spacing/breakpoints change

## Props

### BoxProps

Extends `React.HTMLAttributes<HTMLDivElement>`, `IShortStyleBoxProps`, and `DollarCssProps`.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `asChild` | `boolean` | `false` | When true, merges props into child element using Slot pattern instead of rendering a wrapper div |
| `containerWidth` | `number` | `undefined` | Fixed container width for responsive calculations. When provided, disables automatic width measurement |
| `styleReset` | `boolean` | `false` | Whether to apply basic style reset (box-sizing: border-box) |
| `className` | `string` | `undefined` | Additional CSS class names to apply |
| `$display` | `ResponsiveValue<CSS.Property.Display>` | `undefined` | CSS display property. Supports responsive values |
| `$margin` | `ResponsiveValue<SpacingKey \| string \| number>` | `undefined` | CSS margin property. Supports spacing keys and responsive values |
| `$padding` | `ResponsiveValue<SpacingKey \| string \| number>` | `undefined` | CSS padding property. Supports spacing keys and responsive values |
| `m` | `ResponsiveValue<SpacingKey \| string \| number>` | `undefined` | Shorthand for margin. Supports spacing keys and responsive values |
| `p` | `ResponsiveValue<SpacingKey \| string \| number>` | `undefined` | Shorthand for padding. Supports spacing keys and responsive values |
| `w` | `ResponsiveValue<string \| number>` | `undefined` | Shorthand for width. Supports responsive values |
| `h` | `ResponsiveValue<string \| number>` | `undefined` | Shorthand for height. Supports responsive values |
| ...and all other CSS properties via dollar props | Various | `undefined` | Full CSS property support with `$` prefix |

**Note:** All dollar props support responsive values using breakpoint objects: `{ xs?, sm?, md?, lg?, xl?, xxl? }`

## Usage

[... complete examples as shown in template ...]

## Best Practices

[... best practices section ...]

## Related Components

[... related components section ...]

## TypeScript

[... TypeScript section ...]
```

<!-- </example> -->

## Notes

- ALWAYS read the source files before documenting - NEVER guess or invent features
- Extract exact descriptions from JSDoc comments when available
- Verify examples by checking stories or creating runnable code
- Include responsive examples for components that support responsive values
- Link to related components and types appropriately
- Follow the project's existing documentation patterns and style
