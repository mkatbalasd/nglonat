import { defineConfig } from '@playwright/test';

declare const process: { env: Record<string, string | undefined> };

export default defineConfig({
  testDir: './e2e',
  use: {
    headless: true,
    baseURL: 'http://127.0.0.1:5173',
  },

  webServer: {
    // build first, then start preview (ci:e2e:start runs the preview)
    command: 'npm run build && npm run ci:e2e:start',
    url: 'http://127.0.0.1:5173',
    reuseExistingServer: !process.env.CI,
    // تمديد المهلة لأن البناء+preview قد يأخذ وقتاً
    timeout: 240_000,
  },

  reporter: [['junit', { outputFile: 'playwright-report/results.xml' }]],
});
