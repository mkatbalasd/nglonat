import { defineConfig, defaultExclude } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
    reporters: ['verbose','junit'],
    outputFile: { junit: 'reports/junit/junit.xml' },
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov', 'cobertura'],
      reportsDirectory: 'reports/coverage'
    },
    exclude: [...defaultExclude, 'e2e/**'],
    include: ['src/**/*.{test,spec}.{ts,tsx}'] // اختياري
  }
});
