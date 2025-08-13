import { test, expect } from '@playwright/test';

test('app loads and grid is visible', async ({ page }) => {
  await page.goto('/');
  const grid = page.getByRole('grid');
  await expect(grid).toBeVisible();
});
