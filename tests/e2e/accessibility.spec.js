// Automated WCAG 2.2 AA scan (axe-core) on every page type.
// Automated checks catch roughly a third of real issues; keyboard and screen reader passes are still done by hand.
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const pages = [
  ['project home', '/'],
  ['case study', '/case-study/'],
  ['3D crest', '/crest/'],
  ['league hub', '/portal/#/'],
  ['standings', '/portal/#/baseball/standings'],
  ['schedule', '/portal/#/basketball/schedule'],
  ['bracket', '/portal/#/flagfootball/bracket'],
  ['team page', '/portal/#/baseball/team/ironside']
];

for (const [name, url] of pages) {
  test(`${name} has no detectable WCAG 2.2 AA violations`, async ({ page }) => {
    await page.goto(url);
    await expect(page.locator('h1, #stage').first()).toBeVisible();
    await expect(page.locator('main[aria-busy="true"]')).toHaveCount(0);
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
      .analyze();
    const summary = results.violations.map((v) => `${v.id} (${v.impact}): ${v.nodes.map((n) => n.target.join(' ')).slice(0, 3).join(' | ')}`);
    expect(summary).toEqual([]);
  });
}
