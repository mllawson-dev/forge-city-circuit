// Project home, case study and 3D crest: load cleanly, and the crest falls back to its static SVG.
import { test, expect } from '@playwright/test';

test('project home loads without errors', async ({ page }) => {
  const errors = [];
  page.on('pageerror', (err) => errors.push(err.message));
  await page.goto('/');
  await expect(page.locator('h1').first()).toBeVisible();
  expect(errors).toEqual([]);
});

test('case study loads without errors', async ({ page }) => {
  const errors = [];
  page.on('pageerror', (err) => errors.push(err.message));
  await page.goto('/case-study/');
  await expect(page.locator('h1').first()).toBeVisible();
  expect(errors).toEqual([]);
});

test('3D crest renders into its canvas', async ({ page }) => {
  const errors = [];
  page.on('pageerror', (err) => errors.push(err.message));
  await page.goto('/crest/');
  await expect(page.locator('#scene')).toBeAttached();
  await expect(page.locator('#staticCrest')).toBeAttached();
  expect(errors).toEqual([]);
});

test('crest still shows the static shield when Three.js cannot load', async ({ page }) => {
  const errors = [];
  page.on('pageerror', (err) => errors.push(err.message));
  await page.route('**/three.r128.min.js', (route) => route.abort());
  await page.goto('/crest/');
  await expect(page.locator('#staticCrest')).toBeVisible();
  expect(errors).toEqual([]);
});

test('missing pages use the custom 404', async ({ page }) => {
  const response = await page.goto('/does-not-exist/');
  expect(response.status()).toBe(404);
  await expect(page.locator('h1').first()).toBeVisible();
});
