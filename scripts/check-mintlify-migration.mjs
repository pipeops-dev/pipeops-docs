import fs from "node:fs/promises";
import path from "node:path";

const CONTENT_EXTENSIONS = new Set([".md", ".mdx"]);
const DOCUSaurus_PATTERNS = [
  /@theme\//,
  /@docusaurus\//,
  /from\s+["']@docusaurus\//,
  /^\s*:::(?:note|tip|info|warning|danger|caution|success|important|secondary|quote)?\b/m,
  /#__docusaurus\b/,
];

async function walk(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    if (entry.name === "node_modules" || entry.name === ".git" || entry.name === "design-archive") continue;
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(entryPath)));
    else if (CONTENT_EXTENSIONS.has(path.extname(entry.name))) files.push(entryPath);
  }
  return files;
}

function navigationPages(value) {
  if (!value || typeof value !== "object") return [];
  if (Array.isArray(value)) return value.flatMap(navigationPages);
  const pages = Array.isArray(value.pages) ? value.pages.filter((page) => typeof page === "string") : [];
  return [...pages, ...Object.entries(value).flatMap(([key, child]) => (key === "pages" ? [] : navigationPages(child)))];
}

function pageCandidates(root, page) {
  const normalized = page.replace(/^\//, "");
  const variants = [normalized, normalized.replace(/^docs\//, "")];
  return variants.flatMap((variant) => [
    path.join(root, variant),
    path.join(root, `${variant}.md`),
    path.join(root, `${variant}.mdx`),
  ]);
}

async function firstExisting(paths) {
  for (const candidate of paths) {
    try {
      await fs.access(candidate);
      return candidate;
    } catch {
      // Continue looking for the Markdown/MDX variant.
    }
  }
  return null;
}

function isExternalLink(target) {
  return /^(?:[a-z][a-z\d+.-]*:|\/\/|#)/i.test(target);
}

async function checkInternalLinks(root, file, errors) {
  const content = await fs.readFile(file, "utf8");
  const linkPattern = /!?(?:\[[^\]]*\])\(([^)\s]+)(?:\s+[^)]*)?\)/g;
  for (const match of content.matchAll(linkPattern)) {
    const target = match[1].replace(/^<|>$/g, "");
    if (isExternalLink(target) || !/\.(?:md|mdx)(?:#.*)?$/i.test(target)) continue;
    const [pathname] = target.split("#");
    const candidate = pathname.startsWith("/")
      ? path.join(root, pathname.replace(/^\//, ""))
      : path.resolve(path.dirname(file), pathname);
    const existing = await firstExisting([candidate, `${candidate}.md`, `${candidate}.mdx`]);
    if (!existing) errors.push(`${path.relative(root, file)}: internal link does not exist: ${target}`);
  }
}

export async function checkMigration(root) {
  const errors = [];
  const configPath = path.join(root, "docs.json");
  let config;
  try {
    config = JSON.parse(await fs.readFile(configPath, "utf8"));
  } catch (error) {
    errors.push(`docs.json is not valid JSON: ${error.message}`);
    return { ok: false, errors };
  }

  for (const page of navigationPages(config.navigation)) {
    if (!(await firstExisting(pageCandidates(root, page)))) {
      errors.push(`navigation target does not exist: ${page}`);
    }
  }

  const files = await walk(root);
  for (const file of files) {
    const content = await fs.readFile(file, "utf8");
    if (DOCUSaurus_PATTERNS.some((pattern) => pattern.test(content))) {
      errors.push(`${path.relative(root, file)}: Docusaurus-only syntax remains`);
    }
    await checkInternalLinks(root, file, errors);
  }

  return { ok: errors.length === 0, errors };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const result = await checkMigration(process.cwd());
  if (!result.ok) {
    console.error(result.errors.map((error) => `- ${error}`).join("\n"));
    process.exitCode = 1;
  } else {
    console.log("Mintlify migration checks passed.");
  }
}
