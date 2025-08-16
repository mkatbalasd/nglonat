import { defineConfig } from '@playwright/test';

declare const process: { env: Record<string, string | undefined> };

export default defineConfig({
  testDir: './e2e',
  use: {
    headless: true,
    baseURL: 'http://127.0.0.1:5173',
  },

  webServer: {
    command: 'npm run ci:e2e:start',
    url: 'http://127.0.0.1:5173',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },

  reporter: [['junit', { outputFile: 'playwright-report/results.xml' }]],
});
