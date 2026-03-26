import { defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './vite.config';

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      coverage: {
        provider: 'v8',
        all: true,
        reporter: ['text', 'lcov'],
        include: [
          'src/components/Map/MapView.tsx',
          'src/components/mapTools/MapToolsOverlay.tsx',
          'src/stores/useMapTools.ts',
        ],
        thresholds: {
          statements: 100,
          branches: 100,
          functions: 100,
          lines: 100,
        },
      },
      environment: 'jsdom',
      setupFiles: './src/test/setup.ts',
      css: true,
    },
  }),
);
