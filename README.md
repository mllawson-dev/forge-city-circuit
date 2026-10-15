# Forge City Circuit

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

## Structure

```
index.html            Project home
case-study/           Case study page
crest/                Three.js crest study
portal/               Fan portal (ES modules, hash router, JSON data)
assets/               Shared CSS, fonts, images, vendored Three.js r128
```

## Scope

The league, franchises, venues, scores, rosters and schedules are fictional portfolio content.

---

Designed and built by **Michael L. Lawson**, design engineer and creative developer · [mll-creativeeng.com](https://www.mll-creativeeng.com) · [LinkedIn](https://www.linkedin.com/in/michael-lawson-a7707924)
