import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@test': fileURLToPath(new URL('./tests', import.meta.url)),
    },
  },
  test: {
    coverage: {
      provider: 'v8',
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        'src/pages/main.tsx',
        'src/**/*.d.ts',
        'src/**/*.test.{ts,tsx}',
        'src/**/*.spec.{ts,tsx}',
        'src/**/*.styles.{ts,tsx}',
        'src/**/*.style.{ts,tsx}',
        'src/**/*.css',
        'src/**/*.scss',
        'src/**/types.ts',
        'src/**/constants.ts',
      ],
      reporter: ['text', 'json-summary', 'html', 'lcov'],
      thresholds: {
        branches: 20,
        functions: 20,
        lines: 20,
        statements: 20,
      },
    },
    environment: 'jsdom',
    exclude: ['tests/e2e/**'],
    include: ['tests/**/*.{test,spec}.{ts,tsx}', 'src/**/*.test.{ts,tsx}'],
    server: {
      deps: { inline: ['@csstools/css-calc', '@asamuzakjp/css-color'] },
    },
    pool: 'threads',
    maxWorkers: 1,
    setupFiles: ['tests/setup/vitest.setup.ts'],
  },
})
