import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { configureBox, resetBoxConfig, getBreakpoints, getSpacing } from '../core/configuration';
import { Box } from '../components/Box';
import { Grid } from '../components/Grid';
import { Stack } from '../components/Stack';

/**
 * Args interface for Configuration story controls
 */
interface ConfigurationArgs {
  customBreakpoints: boolean;
  customSpacing: boolean;
}

/**
 * Meta configuration for Configuration API story.
 * Global configuration functions for customizing breakpoints and spacing scales.
 */
const meta: Meta<ConfigurationArgs> = {
  title: 'Advanced/Configuration',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
# Configuration API

Global configuration functions for customizing the layout system's design tokens: **breakpoints** and **spacing scales**.

## Key Features

- **Global Configuration**: Single source of truth for all layout components
- **Design Token Customization**: Align with your design system
- **Theme Switching**: Change breakpoints/spacing at runtime
- **Multi-Tenant Support**: Different configurations per tenant/client
- **Type-Safe**: Full TypeScript support with BoxConfig interface
- **Getter Functions**: Access current configuration values
- **Reset Capability**: Restore default configuration

## API Overview

### configureBox(config: BoxConfig)
Sets global breakpoints and spacing scale configuration.

\`\`\`typescript
interface BoxConfig {
  breakpoints?: Partial<Breakpoints>;
  spacing?: Partial<Spacing>;
}

configureBox({
  breakpoints: {
    xs: 0,
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    xxl: 1536
  },
  spacing: {
    none: 0,
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
    xxxl: 64
  }
});
\`\`\`

### resetBoxConfig()
Resets configuration to library defaults.

\`\`\`typescript
resetBoxConfig(); // Restore defaults
\`\`\`

### getBreakpoints()
Returns current breakpoint configuration.

\`\`\`typescript
const breakpoints = getBreakpoints();
// { xs: 0, sm: 640, md: 768, lg: 1024, xl: 1280, xxl: 1536 }
\`\`\`

### getSpacing()
Returns current spacing scale configuration.

\`\`\`typescript
const spacing = getSpacing();
// { none: 0, xs: 4, sm: 8, md: 16, lg: 24, xl: 32, xxl: 48, xxxl: 64 }
\`\`\`

## When to Use

- **Design System Integration**: Match your company's breakpoints/spacing
- **Brand Consistency**: Use exact spacing values from brand guidelines
- **Responsive Customization**: Custom breakpoints for specific screen sizes
- **Multi-Tenant Apps**: Different spacing/breakpoints per tenant
- **Theme Switching**: Change design tokens at runtime
- **A/B Testing**: Test different spacing/breakpoint strategies
- **Accessibility**: Larger spacing for accessibility-focused themes

## When NOT to Use

- **Component-Level Overrides**: Use component props instead (p="lg", containerWidth, etc.)
- **One-Off Adjustments**: Use direct CSS values (\`p="32px"\` vs configuring global spacing)
- **Frequent Changes**: Configuration is global and not reactive
- **Per-Page Variations**: Use component props for page-specific layouts

## Default Configuration

\`\`\`typescript
// Default Breakpoints (px)
{
  xs: 0,      // Mobile portrait
  sm: 640,    // Mobile landscape / Small tablet portrait
  md: 768,    // Tablet portrait / Small laptop
  lg: 1024,   // Tablet landscape / Laptop
  xl: 1280,   // Desktop
  xxl: 1536   // Large desktop
}

// Default Spacing Scale (px)
{
  none: 0,
  xs: 4,      // 0.25rem
  sm: 8,      // 0.5rem
  md: 16,     // 1rem
  lg: 24,     // 1.5rem
  xl: 32,     // 2rem
  xxl: 48,    // 3rem
  xxxl: 64    // 4rem
}
\`\`\`

## Configuration Patterns

### Material Design 3 Spacing
\`\`\`typescript
configureBox({
  spacing: {
    none: 0,
    xs: 4,    // Compact
    sm: 8,    // Small
    md: 12,   // Medium
    lg: 16,   // Large
    xl: 24,   // Extra large
    xxl: 32,  // XXL
    xxxl: 48  // XXXL
  }
});
\`\`\`

### Tailwind CSS Breakpoints
\`\`\`typescript
configureBox({
  breakpoints: {
    xs: 0,
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    xxl: 1536
  }
});
\`\`\`

### Bootstrap Breakpoints
\`\`\`typescript
configureBox({
  breakpoints: {
    xs: 0,
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200,
    xxl: 1400
  }
});
\`\`\`

### 8px Grid System
\`\`\`typescript
configureBox({
  spacing: {
    none: 0,
    xs: 8,     // 1 unit
    sm: 16,    // 2 units
    md: 24,    // 3 units
    lg: 32,    // 4 units
    xl: 40,    // 5 units
    xxl: 48,   // 6 units
    xxxl: 64   // 8 units
  }
});
\`\`\`

### Custom Mobile-First
\`\`\`typescript
configureBox({
  breakpoints: {
    xs: 0,      // Phone
    sm: 480,    // Large phone
    md: 768,    // Tablet
    lg: 1024,   // Desktop
    xl: 1440,   // Large desktop
    xxl: 1920   // HD display
  }
});
\`\`\`

## Runtime Configuration

### App Initialization
\`\`\`tsx
// In your main App.tsx or index.tsx
import { configureBox } from '@apvee/react-layout-kit';

// Configure once at app start
configureBox({
  breakpoints: { xs: 0, sm: 640, md: 768, lg: 1024, xl: 1280, xxl: 1536 },
  spacing: { xs: 4, sm: 8, md: 16, lg: 24, xl: 32, xxl: 48 }
});

function App() {
  return <YourApp />;
}
\`\`\`

### Theme Switching
\`\`\`tsx
function ThemeSwitcher() {
  const applyCompactTheme = () => {
    configureBox({
      spacing: { xs: 2, sm: 4, md: 8, lg: 12, xl: 16, xxl: 24 }
    });
    // Force remount of components to pick up new config
    window.location.reload(); // Or use state to trigger remount
  };

  const applyComfortableTheme = () => {
    configureBox({
      spacing: { xs: 8, sm: 16, md: 24, lg: 32, xl: 48, xxl: 64 }
    });
    window.location.reload();
  };

  const resetTheme = () => {
    resetBoxConfig();
    window.location.reload();
  };

  return (
    <div>
      <button onClick={applyCompactTheme}>Compact Theme</button>
      <button onClick={applyComfortableTheme}>Comfortable Theme</button>
      <button onClick={resetTheme}>Reset to Default</button>
    </div>
  );
}
\`\`\`

### Multi-Tenant Configuration
\`\`\`tsx
function configureTenant(tenantId: string) {
  const configs = {
    tenant1: {
      breakpoints: { xs: 0, sm: 600, md: 900, lg: 1200, xl: 1536, xxl: 1920 },
      spacing: { xs: 4, sm: 8, md: 12, lg: 16, xl: 20, xxl: 24 }
    },
    tenant2: {
      breakpoints: { xs: 0, sm: 640, md: 768, lg: 1024, xl: 1280, xxl: 1600 },
      spacing: { xs: 8, sm: 16, md: 24, lg: 32, xl: 40, xxl: 48 }
    }
  };

  const config = configs[tenantId] || configs.tenant1;
  configureBox(config);
}

// At app initialization
configureTenant(getCurrentTenantId());
\`\`\`

## Important Notes

### ⚠️ Non-Reactive Configuration
Configuration changes do NOT automatically update existing components. You must:
1. Configure BEFORE rendering components
2. Force component remount after configuration changes
3. Use at app initialization, not during runtime state changes

### ✅ Best Practice: Initialize Once
\`\`\`tsx
// ✅ GOOD: Configure at app start
configureBox({ ... });
ReactDOM.render(<App />, root);

// ❌ BAD: Configure during component lifecycle
function MyComponent() {
  React.useEffect(() => {
    configureBox({ ... }); // Won't update existing components!
  }, []);
}
\`\`\`

### 🔄 Forcing Updates After Configuration
If you must change configuration at runtime:

\`\`\`tsx
function ThemeProvider({ children }) {
  const [key, setKey] = React.useState(0);

  const changeTheme = (config) => {
    configureBox(config);
    setKey(prev => prev + 1); // Force remount with new key
  };

  return (
    <div key={key}>
      {children}
    </div>
  );
}
\`\`\`

## Accessing Configuration

Use getter functions to read current configuration:

\`\`\`tsx
import { getBreakpoints, getSpacing } from '@apvee/react-layout-kit';

function ConfigViewer() {
  const breakpoints = getBreakpoints();
  const spacing = getSpacing();

  return (
    <div>
      <h3>Current Breakpoints:</h3>
      <pre>{JSON.stringify(breakpoints, null, 2)}</pre>

      <h3>Current Spacing:</h3>
      <pre>{JSON.stringify(spacing, null, 2)}</pre>
    </div>
  );
}
\`\`\`

## TypeScript Support

\`\`\`typescript
import type { BoxConfig, Breakpoints, Spacing } from '@apvee/react-layout-kit';

const config: BoxConfig = {
  breakpoints: {
    xs: 0,
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    xxl: 1536
  },
  spacing: {
    none: 0,
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
    xxxl: 64
  }
};

configureBox(config);
\`\`\`

## Best Practices

**Do:**
- ✅ Configure once at app initialization
- ✅ Use partial configuration (only override what you need)
- ✅ Document your custom configuration values
- ✅ Keep spacing scale consistent (use multipliers: 4, 8, 16, 24, 32...)
- ✅ Test responsive behavior with custom breakpoints
- ✅ Use resetBoxConfig() in tests to restore defaults

**Don't:**
- ❌ Configure during component lifecycle (useEffect)
- ❌ Change configuration frequently during app runtime
- ❌ Use random spacing values (breaks visual consistency)
- ❌ Forget that configuration is global (affects ALL components)
- ❌ Mix different spacing systems (8px grid vs 4px grid)

## Testing

\`\`\`typescript
import { configureBox, resetBoxConfig, getBreakpoints, getSpacing } from '@apvee/react-layout-kit';

describe('Layout Configuration', () => {
  beforeEach(() => {
    resetBoxConfig(); // Reset before each test
  });

  it('should apply custom breakpoints', () => {
    configureBox({
      breakpoints: { xs: 0, sm: 500, md: 800, lg: 1200, xl: 1600, xxl: 2000 }
    });

    const breakpoints = getBreakpoints();
    expect(breakpoints.sm).toBe(500);
    expect(breakpoints.lg).toBe(1200);
  });

  it('should apply custom spacing', () => {
    configureBox({
      spacing: { xs: 2, sm: 4, md: 8, lg: 12, xl: 16, xxl: 20 }
    });

    const spacing = getSpacing();
    expect(spacing.md).toBe(8);
    expect(spacing.xl).toBe(16);
  });

  it('should reset to defaults', () => {
    configureBox({ spacing: { md: 100 } });
    resetBoxConfig();

    const spacing = getSpacing();
    expect(spacing.md).toBe(16); // Default value
  });
});
\`\`\`

## Troubleshooting

**Configuration not applying:**
- Ensure you configure BEFORE rendering components
- Check if components are memoized (may need key change to remount)
- Verify you're importing from correct package

**Inconsistent spacing:**
- Check if you configured partial config (missing keys use defaults)
- Ensure all components use spacing scale keys, not hardcoded values

**Breakpoints not working:**
- Verify containerWidth is provided to components
- Check if your custom breakpoints are in ascending order
- Ensure breakpoint values match your viewport sizes
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    customBreakpoints: {
      control: 'boolean',
      description: 'Apply custom breakpoint configuration',
      table: {
        category: 'Configuration',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    customSpacing: {
      control: 'boolean',
      description: 'Apply custom spacing configuration',
      table: {
        category: 'Configuration',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<ConfigurationArgs>;

export const Usage: Story = {
  args: {
    customBreakpoints: false,
    customSpacing: false,
  },
  render: (args) => {
    const [configKey, setConfigKey] = React.useState(0);

    React.useEffect(() => {
      // Apply custom configuration based on args
      if (args.customBreakpoints && args.customSpacing) {
        // Both custom
        configureBox({
          breakpoints: { xs: 0, sm: 500, md: 750, lg: 1000, xl: 1400, xxl: 1800 },
          spacing: { none: 0, xs: 8, sm: 16, md: 24, lg: 32, xl: 48, xxl: 64, xxxl: 96 }
        });
      } else if (args.customBreakpoints) {
        // Custom breakpoints only
        configureBox({
          breakpoints: { xs: 0, sm: 500, md: 750, lg: 1000, xl: 1400, xxl: 1800 }
        });
      } else if (args.customSpacing) {
        // Custom spacing only
        configureBox({
          spacing: { none: 0, xs: 8, sm: 16, md: 24, lg: 32, xl: 48, xxl: 64, xxxl: 96 }
        });
      } else {
        // Reset to defaults
        resetBoxConfig();
      }

      // Force remount of demos with new configuration
      setConfigKey(prev => prev + 1);
    }, [args.customBreakpoints, args.customSpacing]);

    const CurrentConfigViewer = () => {
      const breakpoints = getBreakpoints();
      const spacing = getSpacing();

      return (
        <Box p="lg" style={{ backgroundColor: '#f0f5ff', borderRadius: '8px', border: '2px solid #1890ff' }}>
          <h3 style={{ margin: '0 0 1rem 0', color: '#1890ff', fontSize: '1.125rem', fontWeight: '600' }}>
            Current Configuration
          </h3>
          <Grid columns={2} gutter="md">
            <Grid.Col span={1}>
              <div style={{ fontSize: '0.875rem', fontWeight: '600', color: '#595959', marginBottom: '0.5rem' }}>
                Breakpoints (px)
              </div>
              <pre style={{ 
                fontSize: '0.75rem', 
                backgroundColor: '#ffffff', 
                padding: '0.75rem', 
                borderRadius: '4px',
                margin: 0,
                overflow: 'auto'
              }}>
                {JSON.stringify(breakpoints, null, 2)}
              </pre>
            </Grid.Col>
            <Grid.Col span={1}>
              <div style={{ fontSize: '0.875rem', fontWeight: '600', color: '#595959', marginBottom: '0.5rem' }}>
                Spacing Scale (px)
              </div>
              <pre style={{ 
                fontSize: '0.75rem', 
                backgroundColor: '#ffffff', 
                padding: '0.75rem', 
                borderRadius: '4px',
                margin: 0,
                overflow: 'auto'
              }}>
                {JSON.stringify(spacing, null, 2)}
              </pre>
            </Grid.Col>
          </Grid>
        </Box>
      );
    };

    const SpacingDemonstration = () => {
      const spacing = getSpacing();
      const spacingKeys = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'] as const;

      return (
        <Box p="lg" style={{ backgroundColor: '#f6ffed', borderRadius: '8px', border: '2px solid #52c41a' }}>
          <h3 style={{ margin: '0 0 1rem 0', color: '#52c41a', fontSize: '1.125rem', fontWeight: '600' }}>
            Spacing Scale Visual
          </h3>
          <Stack gap="sm">
            {spacingKeys.map(key => (
              <div key={key} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{ fontSize: '0.875rem', fontWeight: '600', color: '#52c41a', width: '60px' }}>
                  {key}
                </span>
                <div
                  style={{
                    width: `${spacing[key]}px`,
                    height: '32px',
                    backgroundColor: '#52c41a',
                    borderRadius: '4px',
                  }}
                />
                <span style={{ fontSize: '0.75rem', color: '#8c8c8c' }}>
                  {spacing[key]}px
                </span>
              </div>
            ))}
          </Stack>
        </Box>
      );
    };

    const ResponsiveDemo = () => {
      return (
        <Box
          p={{ xs: 'sm', sm: 'md', md: 'lg', lg: 'xl' }}
          style={{
            backgroundColor: '#fff7e6',
            borderRadius: '8px',
            border: '2px solid #fa8c16',
            resize: 'horizontal',
            overflow: 'auto',
            minWidth: '200px',
            maxWidth: '100%',
          }}
        >
          <h3 style={{ margin: '0 0 0.5rem 0', color: '#fa8c16', fontSize: '1rem', fontWeight: '600' }}>
            Responsive Padding Demo
          </h3>
          <div style={{ fontSize: '0.75rem', color: '#8c8c8c', lineHeight: '1.6' }}>
            Padding uses configured spacing scale:<br />
            • xs breakpoint: 'sm' padding<br />
            • sm breakpoint: 'md' padding<br />
            • md breakpoint: 'lg' padding<br />
            • lg breakpoint: 'xl' padding<br />
            <br />
            👉 Resize this container to see padding change!<br />
            👉 Toggle controls above to change spacing values!
          </div>
        </Box>
      );
    };

    return (
      <div key={configKey} style={{ width: '100%', maxWidth: '1200px', margin: '0 auto' }}>
        {/* Hero */}
        <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1rem', color: '#1a1a1a' }}>
            Configuration API
          </h1>
          <p style={{ fontSize: '1.125rem', color: '#666', maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>
            Global configuration for breakpoints and spacing scales. Customize design tokens to match your system.
          </p>
        </div>

        {/* Config Viewer */}
        <div style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: '#333' }}>
            📋 Current Configuration
          </h2>
          <p style={{ fontSize: '0.875rem', color: '#666', marginBottom: '1.5rem' }}>
            Use controls above to toggle custom breakpoints and spacing. Configuration updates on change.
          </p>
          <CurrentConfigViewer />
        </div>

        {/* Spacing Visual */}
        <div style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: '#333' }}>
            📏 Spacing Scale Visualization
          </h2>
          <p style={{ fontSize: '0.875rem', color: '#666', marginBottom: '1.5rem' }}>
            Visual representation of current spacing scale. Toggle "customSpacing" to see larger values.
          </p>
          <SpacingDemonstration />
        </div>

        {/* Responsive Demo */}
        <div style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: '#333' }}>
            🎯 Configuration in Action
          </h2>
          <p style={{ fontSize: '0.875rem', color: '#666', marginBottom: '1.5rem' }}>
            This component uses responsive padding values. Configuration changes affect how spacing resolves.
          </p>
          <ResponsiveDemo />
        </div>

        {/* Code Examples */}
        <div style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: '#333' }}>
            💻 Configuration Examples
          </h2>
          <Grid columns={{ xs: 1, md: 2 }} gutter="lg">
            <Grid.Col span={1}>
              <Box p="lg" style={{ backgroundColor: '#f9f0ff', borderRadius: '8px', border: '1px solid #d3adf7' }}>
                <h4 style={{ margin: '0 0 0.75rem 0', fontSize: '1rem', fontWeight: '600', color: '#722ed1' }}>
                  Custom Breakpoints
                </h4>
                <pre style={{
                  fontSize: '0.75rem',
                  backgroundColor: '#ffffff',
                  padding: '1rem',
                  borderRadius: '4px',
                  margin: 0,
                  overflow: 'auto',
                  lineHeight: '1.5'
                }}>
{`configureBox({
  breakpoints: {
    xs: 0,
    sm: 500,
    md: 750,
    lg: 1000,
    xl: 1400,
    xxl: 1800
  }
});`}
                </pre>
              </Box>
            </Grid.Col>
            <Grid.Col span={1}>
              <Box p="lg" style={{ backgroundColor: '#f9f0ff', borderRadius: '8px', border: '1px solid #d3adf7' }}>
                <h4 style={{ margin: '0 0 0.75rem 0', fontSize: '1rem', fontWeight: '600', color: '#722ed1' }}>
                  Custom Spacing
                </h4>
                <pre style={{
                  fontSize: '0.75rem',
                  backgroundColor: '#ffffff',
                  padding: '1rem',
                  borderRadius: '4px',
                  margin: 0,
                  overflow: 'auto',
                  lineHeight: '1.5'
                }}>
{`configureBox({
  spacing: {
    xs: 8,
    sm: 16,
    md: 24,
    lg: 32,
    xl: 48,
    xxl: 64,
    xxxl: 96
  }
});`}
                </pre>
              </Box>
            </Grid.Col>
          </Grid>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      source: {
        code: `// Basic usage: Configure at app initialization
import { configureBox, resetBoxConfig, getBreakpoints, getSpacing } from '@apvee/react-layout-kit';

// Configure custom breakpoints and spacing
configureBox({
  breakpoints: {
    xs: 0,
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    xxl: 1536
  },
  spacing: {
    none: 0,
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
    xxxl: 64
  }
});

// Partial configuration (only override what you need)
configureBox({
  spacing: {
    md: 20,  // Change only medium spacing
    lg: 28   // Change only large spacing
  }
});

// Reset to defaults
resetBoxConfig();

// Read current configuration
const breakpoints = getBreakpoints();
const spacing = getSpacing();

console.log('Current breakpoints:', breakpoints);
console.log('Current spacing:', spacing);

// Material Design 3 Example
configureBox({
  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    xxl: 32,
    xxxl: 48
  }
});

// Bootstrap Breakpoints Example
configureBox({
  breakpoints: {
    xs: 0,
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200,
    xxl: 1400
  }
});

// Theme Switching Example
function applyCompactTheme() {
  configureBox({
    spacing: { xs: 2, sm: 4, md: 8, lg: 12, xl: 16, xxl: 24 }
  });
}

function applyComfortableTheme() {
  configureBox({
    spacing: { xs: 8, sm: 16, md: 24, lg: 32, xl: 48, xxl: 64 }
  });
}

// Multi-tenant Configuration
function configureTenant(tenantId: string) {
  const configs = {
    tenant1: {
      breakpoints: { xs: 0, sm: 600, md: 900, lg: 1200, xl: 1536, xxl: 1920 },
      spacing: { xs: 4, sm: 8, md: 12, lg: 16, xl: 20, xxl: 24 }
    },
    tenant2: {
      breakpoints: { xs: 0, sm: 640, md: 768, lg: 1024, xl: 1280, xxl: 1600 },
      spacing: { xs: 8, sm: 16, md: 24, lg: 32, xl: 40, xxl: 48 }
    }
  };
  
  configureBox(configs[tenantId]);
}`,
      },
    },
  },
};
