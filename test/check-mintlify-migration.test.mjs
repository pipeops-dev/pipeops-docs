import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { checkMigration } from "../scripts/check-mintlify-migration.mjs";

test("reports missing navigation pages and Docusaurus-only imports", async () => {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), "mintlify-check-"));
  await fs.mkdir(path.join(root, "docs"), { recursive: true });
  await fs.writeFile(
    path.join(root, "docs.json"),
    JSON.stringify({
      navigation: { groups: [{ group: "Docs", pages: ["docs/exists", "docs/missing"] }] },
    }),
  );
  await fs.writeFile(path.join(root, "docs", "exists.mdx"), "import Layout from '@theme/Layout';\n# Exists\n");

  const result = await checkMigration(root);

  assert.equal(result.ok, false);
  assert.match(result.errors.join("\n"), /navigation target does not exist: docs\/missing/);
  assert.match(result.errors.join("\n"), /Docusaurus-only syntax/);
});

test("passes for valid navigation and Mintlify callouts", async () => {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), "mintlify-check-"));
  await fs.mkdir(path.join(root, "docs"), { recursive: true });
  await fs.writeFile(
    path.join(root, "docs.json"),
    JSON.stringify({ navigation: { groups: [{ group: "Docs", pages: ["docs/exists"] }] } }),
  );
  await fs.writeFile(
    path.join(root, "docs", "exists.mdx"),
    "# Exists\n\n<Note>Safe content.</Note>\n",
  );

  const result = await checkMigration(root);

  assert.deepEqual(result.errors, []);
  assert.equal(result.ok, true);
});
