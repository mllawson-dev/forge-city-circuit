// Fan portal smoke tests: every route renders, announces itself, moves focus and stays error-free.
import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';

const read = (name) => JSON.parse(readFileSync(new URL(`../../portal/js/data/${name}`, import.meta.url), 'utf8'));
const sports = read('sports.json');
const teams = read('teams.json');
const season = read('season.json');

// Fail any test that logs a console error or throws on the page.
test.beforeEach(async ({ page }) => {
  const problems = [];
  page.on('console', (msg) => { if (msg.type() === 'error') problems.push(msg.text()); });
  page.on('pageerror', (err) => problems.push(err.message));
  page.problems = problems;
});
test.afterEach(async ({ page }) => {
  expect(page.problems, 'no console errors or uncaught exceptions').toEqual([]);
});

const open = (page, hash) => page.goto(`/portal/${hash}`);

test('league hub loads the snapshot', async ({ page }) => {
  await open(page, '#/');
  await expect(page).toHaveTitle('League Hub — Forge City Circuit');
  await expect(page.locator('#route-status')).toHaveText('League Hub loaded');
  await expect(page.locator('main h1')).toBeVisible();
});

for (const sport of sports) {
  test.describe(sport.name, () => {
    test('standings list every team in the order the data gives', async ({ page }) => {
      await open(page, `#/${sport.id}/standings`);
      await expect(page).toHaveTitle(`${sport.name} Standings — Forge City Circuit`);
      await expect(page.locator('main h1')).toBeFocused();
      const names = await page.locator('.standings-table tbody .team-cell a').allTextContents();
      const expected = season[sport.id].standings.map((row) => teams.find((t) => t.id === row.teamId).name);
      expect(names.map((n) => n.replace(/^\d/, '').trim())).toEqual(expected);
    });

    test('schedule filters by team and announces the count', async ({ page }) => {
      await open(page, `#/${sport.id}/schedule`);
      await expect(page).toHaveTitle(`${sport.name} Schedule — Forge City Circuit`);
      const total = season[sport.id].games.length;
      await expect(page.locator('#schedule-status')).toHaveText(`${total} games shown`);

      const team = season[sport.id].standings[0].teamId;
      const teamGames = season[sport.id].games.filter((g) => g.homeTeamId === team || g.awayTeamId === team).length;
      await page.selectOption('#team-filter', team);
      await expect(page.locator('#schedule-status')).toHaveText(`${teamGames} games shown`);
      await expect(page.locator('.game-row')).toHaveCount(teamGames);

      await page.selectOption('#status-filter', 'scheduled');
      const upcoming = season[sport.id].games.filter((g) => g.status === 'scheduled' && (g.homeTeamId === team || g.awayTeamId === team)).length;
      await expect(page.locator('.game-row')).toHaveCount(upcoming);
    });

    test('bracket shows both semifinals and the championship', async ({ page }) => {
      await open(page, `#/${sport.id}/bracket`);
      await expect(page).toHaveTitle(`${sport.name} Playoff Bracket — Forge City Circuit`);
      await expect(page.locator('.bracket-matchup')).toHaveCount(3);
      const seeds = await page.locator('.bracket-round').first().locator('.seed').allTextContents();
      expect(seeds).toEqual(['1', '4', '2', '3']);
    });

    test('team page shows the roster', async ({ page }) => {
      const team = teams[0];
      await open(page, `#/${sport.id}/team/${team.id}`);
      await expect(page.locator('main h1')).toContainText(team.name);
      await expect(page).toHaveTitle(new RegExp(`${sport.name} — Forge City Circuit$`));
    });
  });
}

test('unknown sport shows a friendly message', async ({ page }) => {
  await open(page, '#/curling/standings');
  await expect(page.locator('main h1')).toHaveText('Unknown League');
  await expect(page.getByRole('link', { name: 'Back to the hub.' })).toBeVisible();
});

test('unknown path shows page not found', async ({ page }) => {
  await open(page, '#/not/a/real/route');
  await expect(page.locator('main h1')).toHaveText('Page Not Found');
});

test('navigating between views moves focus to the new heading', async ({ page }) => {
  await open(page, `#/${sports[0].id}/standings`);
  await page.evaluate((id) => { location.hash = `#/${id}/bracket`; }, sports[0].id);
  await expect(page.locator('main h1')).toHaveText('Playoff Bracket');
  await expect(page.locator('main h1')).toBeFocused();
});
