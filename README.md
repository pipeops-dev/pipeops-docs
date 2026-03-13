# PipeOps Docs

This repository now runs as a Mintlify documentation project.

## Local development

```bash
npm install
npm run dev
```

Mintlify runs on port `3000` by default. Use `npm run dev:3001` if port `3000` is already occupied.

## Link validation

```bash
npm run check:links
```

## Project structure

- `docs.json` is the source of truth for navigation, redirects, branding, analytics, and footer/navbar links.
- `index.mdx` is the landing page for the docs home.
- The product content is grouped into `getting-started`, `guides`, `applications`, `infrastructure`, `cli`, `troubleshooting`, and `changelog`.
- Utility pages such as `about.mdx`, `pricing.mdx`, and `support.mdx` stay outside the primary navigation hierarchy.
# pipeops-doc-v2
