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
      exclude: ['src/pages/main.tsx', 'src/**/*.d.ts'],
      reporter: ['text', 'json-summary', 'html', 'lcov'],
      thresholds: {
        branches: 70,
        functions: 80,
        lines: 80,
        statements: 80,
      },
    },
    environment: 'jsdom',
    exclude: ['tests/e2e/**'],
    include: ['tests/**/*.{test,spec}.{ts,tsx}'],
    pool: 'threads',
    maxWorkers: 1,
    setupFiles: ['tests/setup/vitest.setup.ts'],
  },
})
