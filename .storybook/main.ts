import type { StorybookConfig } from '@storybook/react-vite';
import path from 'path';
import { defineConfig } from 'vite';

const config: StorybookConfig = {
  "stories": [
    "../src/stories/**/*.mdx",
    "../src/stories/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    '@storybook/addon-essentials',
  ],
  "docs": {
    "autodocs": "tag", // Enable autodocs for components with 'autodocs' tag
  },
  "typescript": {
    "check": true, // Enable type checking
    "reactDocgen": "react-docgen-typescript", // For TypeScript
    "reactDocgenTypescriptOptions": {
      "shouldExtractLiteralValuesFromEnum": true,
      "propFilter": (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
    },
  },
  "framework": {
    "name": "@storybook/react-vite",
    "options": {}
  },
  // Configuration for TypeScript paths
  async viteFinal(config) {
    return defineConfig({
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve?.alias,
          '@': path.resolve(__dirname, '../src'),
        },
      },
    });
  },
};
export default config;