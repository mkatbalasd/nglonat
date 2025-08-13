import { defineConfig } from 'vitest/config';
export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
    reporters: ['verbose','junit'],
    outputFile: { junit: 'reports/junit/junit.xml' },
    coverage: {
      reporter: ['text', 'lcov', 'cobertura'],
      reportsDirectory: 'reports/coverage'
    }
  }
});
