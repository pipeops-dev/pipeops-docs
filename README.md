# PipeOps Docs

This repository contains the PipeOps documentation site powered by Mintlify.

## Local development

Install dependencies and start Mintlify’s local preview:

```bash
npm install
npm run dev
```

The preview normally runs on `http://localhost:3000`.

## Validation

Run the deterministic migration/content checks:

```bash
npm run test:migration
npm run check:migration
```

`check:migration` validates `docs.json` navigation targets, local Markdown links, and remaining Docusaurus-only syntax.

`npm run build` runs Mintlify’s strict documentation validator. Production hosting and custom-domain setup are managed through the Mintlify dashboard.

## Project structure

- `docs.json` is the source of truth for navigation, redirects, branding, analytics, and footer/navbar links.
- `docs/` contains the active product documentation.
- `static/` contains logos, favicons, screenshots, and other public assets.
- `design-archive/docusaurus-theme/` preserves the previous Docusaurus theme, colors, fonts, logos, and custom components for possible future reuse.
- `design-archive/docusaurus-content/` preserves Docusaurus tutorial/demo pages intentionally excluded from the product navigation.
- `scripts/check-mintlify-migration.mjs` performs repository-level migration checks.
- `docs/superpowers/mintlify-migration-status.md` records completed work, skipped pages, blockers, setup requirements, and Mintlify limitations.

## External Mintlify setup

After connecting this repository in Mintlify:

1. Configure the `docs.pipeops.io` custom domain and DNS records.
2. Confirm the GA4, Google Tag Manager, and PostHog integrations in the Mintlify dashboard.
3. If iframe embedding is still required, replace the retired Docusaurus iframe script with a Mintlify-supported custom integration.
4. Read [`DEPLOYMENT.md`](DEPLOYMENT.md) for the recommended Mintlify-hosted deployment, native search setup, and the optional Docker/static-export path.
