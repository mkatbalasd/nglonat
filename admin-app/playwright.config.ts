import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  use: {
    headless: true,
    baseURL: 'http://127.0.0.1:5173',
  },
  reporter: [['junit', { outputFile: 'playwright-report/results.xml' }]],
});
