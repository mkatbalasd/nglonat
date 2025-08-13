import { test, expect } from '@playwright/test';

test('app loads and grid is visible', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('table')).toBeVisible();
});
