# Forge City Circuit

[![Tests](https://github.com/mllawson-dev/forge-city-circuit/actions/workflows/tests.yml/badge.svg)](https://github.com/mllawson-dev/forge-city-circuit/actions/workflows/tests.yml)

A brand identity carried all the way into a working product: one forged shield expands into three sport marks, eight neighborhood franchises, a 3D crest and a data-driven fan portal for a fictional civic sports league.

**[Live site](https://forge-city-circuit.vercel.app/)** · **[Case study](https://www.mll-creativeeng.com/studies/forge-city-circuit/case-study/)**

## What I built

- **Identity system.** A chamfered shield with fixed rivets and one central field. Sport icons and accent colors change; the shape never does. A simplified mark takes over at small sizes.
- **Fan portal** (`/portal/`). A single-page app in plain JavaScript ES modules with no framework: a small hash router (`portal/js/router.js`) renders five views (home, standings, schedule, bracket, team) from a JSON data layer covering eight teams across three sports.
- **Dimensional crest** (`/crest/`). The same shield geometry rebuilt in Three.js with drag and keyboard rotation, plus a static SVG fallback.

## Key decisions

- **No framework for the portal.** The views are simple enough that a router under 50 lines and ES modules keep the bundle small and the code easy to follow.
- **Deterministic data.** Standings, schedules and brackets are generated from one season snapshot, so every view agrees with every other view.
- **Stress-test the brand.** Dense tables, filters, brackets and mobile layouts were the real test of whether the identity holds up.

## Run locally

Static site, no build step. From the repository root:

```sh
python3 -m http.server 4173
```

Open http://localhost:4173/. The portal needs a local server because it loads its JSON with `fetch()`.

Or, with Node 22+: `npm run serve`.

## Testing

The site has no build step; the tests are the only reason this repo has a `package.json`.

```sh
npm install
npm test                          # unit + data tests (Node's built-in runner, no dependencies)
npx playwright install chromium   # first time only
npm run test:e2e                  # browser and accessibility tests (Playwright + axe-core)
```

- **Router** (`tests/unit/router.test.js`): static and parameter routes, URL decoding, segment counts, route order.
- **Data layer** (`tests/unit/data.test.js`): win percentage, games behind, date formatting, schedule splits and sort order, team, seed and league-wide lookups.
- **Season integrity** (`tests/unit/season-integrity.test.js`): recomputes every team's record, points and streak from the raw game results and checks they match the standings; checks the full round robin, seeding, 1 v 4 / 2 v 3 semifinals, that the bracket and schedule show identical games, and that every roster is complete. This is what backs the claim that every view tells the same story.
- **Portal** (`tests/e2e/portal.spec.js`): every route for every sport renders, sets the page title, announces itself and moves focus to the heading; schedule filters update the results and the live count; unknown routes show friendly messages; no console errors.
- **Pages** (`tests/e2e/pages.spec.js`): project home, case study and crest load cleanly, and the crest falls back to its static SVG when Three.js can't load.
- **Accessibility** (`tests/e2e/accessibility.spec.js`): an axe-core WCAG 2.2 AA scan of every page type, on desktop and phone sizes. Automated scans catch only part of what matters, so keyboard and screen reader checks are still done by hand.

GitHub Actions runs everything on every push and pull request (`.github/workflows/tests.yml`). Test files are excluded from the Vercel deploy by `.vercelignore`.

## Structure

```
index.html            Project home
case-study/           Case study page
crest/                Three.js crest study
portal/               Fan portal (ES modules, hash router, JSON data)
assets/               Shared CSS, fonts, images, vendored Three.js r128
tests/                Unit, data, browser and accessibility tests
```

## Scope

The league, franchises, venues, scores, rosters and schedules are fictional portfolio content.

---

Designed and built by **Michael L. Lawson**, design engineer and creative developer · [mll-creativeeng.com](https://www.mll-creativeeng.com) · [LinkedIn](https://www.linkedin.com/in/michael-lawson-a7707924)
