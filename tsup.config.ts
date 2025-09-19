import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    'components/Box': 'src/components/Box/index.ts',
    'components/AreaGrid': 'src/components/AreaGrid/index.ts',
    'components/AspectRatio': 'src/components/AspectRatio/index.ts',
    'components/Center': 'src/components/Center/index.ts',
    'components/Container': 'src/components/Container/index.ts',
    'components/Flex': 'src/components/Flex/index.ts',
    'components/Grid': 'src/components/Grid/index.ts',
    'components/SimpleGrid': 'src/components/SimpleGrid/index.ts',
    'components/Space': 'src/components/Space/index.ts',
    'components/Stack': 'src/components/Stack/index.ts',
    'components/Group': 'src/components/Group/index.ts',
    'core/responsive': 'src/core/responsive/index.ts',
    'core/styling': 'src/core/styling/index.ts',
    'core/components': 'src/core/components/index.ts',
    'core/configuration': 'src/core/configuration/index.ts',
    'core/utils': 'src/core/utils/index.ts',
    'types': 'src/types/index.ts',
    'hooks': 'src/hooks/index.ts'
  },
  outDir: 'dist',
  format: ['cjs', 'esm'],
  platform: 'browser',
  target: 'es2018',
  splitting: true,
  sourcemap: true,
  clean: true,
  minify: true,
  treeshake: 'safest',
  dts: true,
  cjsInterop: true,
  define: { 'process.env.NODE_ENV': '"production"' },
  external: ['react', 'react-dom'],
  esbuildOptions(options) {
    options.alias = { '@': './src' };
    options.jsx = 'transform';
    options.jsxFactory = 'React.createElement';
    options.jsxFragment = 'React.Fragment';
  }
});
