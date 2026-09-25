# Forge City Circuit

Forge City Circuit is a fictional civic sports identity and product-design case study. One forged shield expands into three sport identities, eight neighborhood franchises, a dimensional crest study, and a working fan portal.

## Project paths

- `/` — visual project home
- `/case-study/` — full case study
- `/showcase/` — compatibility redirect to the project home
- `/portal/` — interactive fan portal
- `/crest/` — dimensional crest study

## Local preview

The project is static and has no install or build step. Start any local file server from the repository root, for example:

```sh
python3 -m http.server 4173
```

Then open `http://localhost:4173/`.

The portal requires a local server because it loads its deterministic JSON snapshot with `fetch()`.

## Deployment

Import this GitHub repository into Vercel. The included `vercel.json` serves the repository root as a static project and adds production security and cache headers. No environment variables are required.

All league names, franchises, venues, scores, rosters, schedules, and season information are fictional portfolio content.
