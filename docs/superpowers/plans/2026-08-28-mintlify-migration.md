# Mintlify Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [x]`) syntax for tracking.

**Goal:** Replace the active Docusaurus runtime with Mintlify while preserving product documentation, legacy URLs, supported analytics, and an archive of the current theme/colors.

**Architecture:** Keep the existing documentation tree and static assets as the content base, add a root `docs.json` for Mintlify’s configuration/navigation, and use a small Node validation utility to verify navigation targets, internal links, and Docusaurus syntax. Archive the removed Docusaurus theme source before deleting it from the active runtime.

**Tech Stack:** Mintlify CLI, Markdown/MDX, JSON, Node.js 20+, npm.

**Spec:** `docs/superpowers/specs/2026-08-28-mintlify-migration-design.md`

## Global Constraints

- Mintlify is the only active documentation runtime after migration.
- Use Mintlify’s built-in theme initially.
- Preserve current product content and static assets unless a page is a Docusaurus demo or cannot be represented.
- Track every page or feature issue in `docs/superpowers/mintlify-migration-status.md`.
- Preserve the current theme, colors, fonts, logos, and relevant Docusaurus components under `design-archive/docusaurus-theme/`.
- Keep or redirect existing public URLs when paths change.
- Do not claim completion without fresh validation evidence.

---

### Task 1: Create the migration ledger and validation test

**Files:**
- Create: `docs/superpowers/mintlify-migration-status.md`
- Create: `scripts/check-mintlify-migration.mjs`
- Create: `test/check-mintlify-migration.test.mjs`
- Modify: `package.json`

**Interfaces:**
- Produces `npm run check:migration` as a deterministic repository check.
- The checker reads `docs.json`, walks active Markdown/MDX files, validates navigation targets and local links, and reports Docusaurus-only syntax.
- The ledger records status values `completed`, `blocked`, `skipped`, `needs-setup`, and `limitation`.

- [x] **Step 1: Write the failing checker test** covering an invalid navigation target and an active Docusaurus import.
- [x] **Step 2: Run the focused test and verify it fails because the checker does not yet exist.**
- [x] **Step 3: Implement the checker with explicit diagnostics and non-zero exit status for errors.**
- [x] **Step 4: Add `check:migration` to `package.json` and run the test until it passes.**
- [x] **Step 5: Add the initial ledger inventory, including all pages containing Docusaurus syntax and known feature gaps.**

### Task 2: Archive the current Docusaurus design system

**Files:**
- Create: `design-archive/docusaurus-theme/README.md`
- Create: `design-archive/docusaurus-theme/custom.css`
- Create: `design-archive/docusaurus-theme/components/`
- Create: `design-archive/docusaurus-theme/assets/fonts/`
- Create: `design-archive/docusaurus-theme/assets/logos/`
- Create: `design-archive/docusaurus-theme/assets/favicons/`

**Interfaces:**
- Archive is reference-only and is not imported by Mintlify.
- README documents exact colors, font family/weights, logo variants, favicon files, and Docusaurus-specific selectors/components.

- [x] **Step 1: Copy current CSS, custom theme component source, fonts, logos, and favicon assets into the archive.**
- [x] **Step 2: Write the archive README with palette and reuse notes.**
- [x] **Step 3: Run a file inventory comparison to ensure every referenced archive asset exists.**

### Task 3: Convert content syntax and classify Docusaurus demo pages

**Files:**
- Modify: active `docs/**/*.md` and `docs/**/*.mdx` files identified by the checker.
- Create or modify: `docs/superpowers/mintlify-migration-status.md`

**Interfaces:**
- Active pages contain no Docusaurus-only imports, `@theme` references, React page examples, or `:::` admonitions.
- Mintlify callouts use supported `<Note>`, `<Tip>`, `<Warning>`, or `<Error>` components where appropriate.
- Product pages retain their current content and code samples.

- [x] **Step 1: Convert admonitions and remove only Docusaurus runtime syntax from the identified product pages.**
- [x] **Step 2: Move or mark Docusaurus tutorial-demo pages according to the ledger; preserve them only when they remain meaningful documentation.**
- [x] **Step 3: Normalize image references and verify referenced local assets exist.**
- [x] **Step 4: Run the checker and update each issue entry with completed, skipped, or limitation status.**

### Task 4: Create explicit Mintlify configuration and navigation

**Files:**
- Create: `docs.json`
- Modify: `README.md`
- Modify: `docs/superpowers/mintlify-migration-status.md`

**Interfaces:**
- `docs.json` contains valid Mintlify `theme`, `name`, `colors`, `logo`, `favicon`, `appearance`, `background`, `navbar`, `footer`, `navigation`, `redirects`, and supported analytics/integration settings.
- Navigation groups include Getting Started, Projects, Servers, Add-ons, Integrations, CLI, Kubernetes Agent, Collaborations, How-to Guides, Troubleshooting, and Changelogs.
- All navigation targets resolve to active page files.

- [x] **Step 1: Build the navigation path map from current page files and category metadata.**
- [x] **Step 2: Write `docs.json` with the Mintlify theme, PipeOps branding, dark-first appearance, links, and explicit groups.**
- [x] **Step 3: Add redirects for renamed paths and the legacy `/docs/...` prefix where needed.**
- [x] **Step 4: Document unsupported analytics or custom runtime features in the ledger.**
- [x] **Step 5: Run JSON validation and the migration checker.**

### Task 5: Replace the Docusaurus runtime

**Files:**
- Modify: `package.json`
- Modify: `README.md`
- Modify: `Dockerfile`
- Delete from active runtime: `docusaurus.config.js`, `sidebars.js`, `babel.config.js`, `src/`, and Docusaurus-only dependency entries after archival.

**Interfaces:**
- `npm run dev` starts Mintlify local preview.
- `npm run check:links` and `npm run check:migration` run deterministic validation.
- Docker uses the Mintlify-compatible documented workflow or is removed if Mintlify hosting supersedes it.

- [x] **Step 1: Replace Docusaurus dependencies/scripts with Mintlify CLI scripts.**
- [x] **Step 2: Remove active Docusaurus configuration and source after verifying the archive.**
- [x] **Step 3: Update README with setup, local preview, validation, deployment handoff, and limitations.**
- [x] **Step 4: Refresh the lockfile using the repository’s package manager.**
- [x] **Step 5: Run the checker and inspect the active file tree for stale Docusaurus runtime files.**

### Task 6: Verify representative rendering and finish the migration record

**Files:**
- Modify: `docs/superpowers/mintlify-migration-status.md`
- Modify: `README.md` only if verification discovers a command/documentation mismatch.

**Interfaces:**
- Verification evidence is recorded with command, date, result, and unresolved issues.
- Representative pages cover navigation, callouts, code blocks, images, nested groups, redirects, and a page with known limitation.

- [x] **Step 1: Run dependency installation and all repository validation commands.**
- [x] **Step 2: Start Mintlify local preview and inspect representative routes when the CLI is available.**
- [x] **Step 3: Run the full migration checker and confirm no unclassified issue remains.**
- [x] **Step 4: Mark each ledger entry as completed, blocked, skipped, needs-setup, or limitation with a concrete explanation.**
- [x] **Step 5: Run final git diff/status review and commit the migration in coherent commits.**

---

