#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(SCRIPT_DIR, "..");
const CONFIG_ROOT = path.join(REPO_ROOT, "blog", ".vuepress");
const EXCLUDED_DIRECTORIES = new Set([".git", "node_modules", ".cache", ".temp", "dist"]);

// Higher layers may depend on lower layers. The allowlist is deliberately
// closed so a new configuration module must be classified before it is used.
const MODULE_RULES = new Map([
  ["blog/.vuepress/client.ts", {
    layer: 1,
    role: "client compatibility configuration",
    allowedRelativeDependencies: new Set(),
  }],
  ["blog/.vuepress/config.ts", {
    layer: 3,
    role: "site configuration",
    allowedRelativeDependencies: new Set(["blog/.vuepress/theme.ts"]),
  }],
  ["blog/.vuepress/theme.ts", {
    layer: 2,
    role: "theme composition",
    allowedRelativeDependencies: new Set([
      "blog/.vuepress/navbar.ts",
      "blog/.vuepress/sidebar.ts",
    ]),
  }],
  ["blog/.vuepress/navbar.ts", {
    layer: 1,
    role: "navigation data",
    allowedRelativeDependencies: new Set(),
  }],
  ["blog/.vuepress/sidebar.ts", {
    layer: 1,
    role: "sidebar data",
    allowedRelativeDependencies: new Set(),
  }],
]);

const issues = [];

function repoPath(filePath) {
  return path.relative(REPO_ROOT, filePath).split(path.sep).join("/");
}

function addIssue(code, what, why, how) {
  issues.push({ code, what, why, how });
}

function walkTypeScriptFiles(directory) {
  if (!fs.existsSync(directory)) return [];

  const files = [];
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (entry.isDirectory() && EXCLUDED_DIRECTORIES.has(entry.name)) continue;
    const absolutePath = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...walkTypeScriptFiles(absolutePath));
    if (entry.isFile() && entry.name.endsWith(".ts")) files.push(absolutePath);
  }
  return files;
}

function staticImports(source) {
  const imports = [];
  const pattern = /(?:^|\n)\s*(?:import\s+(?:type\s+)?(?:[^"'`;]+?\s+from\s+)?|export\s+(?:type\s+)?(?:\*|\{[^}]*\})\s+from\s+)["']([^"']+)["']/g;
  let match;
  while ((match = pattern.exec(source)) !== null) imports.push(match[1]);
  return imports;
}

function resolveRelativeImport(importer, specifier, knownFiles) {
  const withoutSuffix = specifier.split(/[?#]/, 1)[0];
  const absoluteBase = path.resolve(path.dirname(importer), withoutSuffix);
  const candidates = [];

  if (/\.(?:[cm]?[jt]s)$/.test(absoluteBase)) {
    candidates.push(absoluteBase.replace(/\.(?:[cm]?js)$/, ".ts"));
    candidates.push(absoluteBase);
  } else {
    candidates.push(`${absoluteBase}.ts`, path.join(absoluteBase, "index.ts"));
  }

  return candidates.find((candidate) => knownFiles.has(path.normalize(candidate)))
    ?? path.normalize(candidates[0]);
}

function findCycles(graph) {
  const cycles = [];
  const state = new Map();
  const stack = [];

  function visit(node) {
    state.set(node, "visiting");
    stack.push(node);

    for (const dependency of graph.get(node) ?? []) {
      if (!graph.has(dependency)) continue;
      if (state.get(dependency) === "visiting") {
        const start = stack.indexOf(dependency);
        cycles.push([...stack.slice(start), dependency]);
      } else if (!state.has(dependency)) {
        visit(dependency);
      }
    }

    stack.pop();
    state.set(node, "visited");
  }

  for (const node of graph.keys()) {
    if (!state.has(node)) visit(node);
  }
  return cycles;
}

function printIssue(issue) {
  console.error(`[ERROR] ${issue.code}`);
  console.error(`  WHAT: ${issue.what}`);
  console.error(`  WHY: ${issue.why}`);
  console.error(`  HOW: ${issue.how}`);
}

try {
  const discoveredFiles = walkTypeScriptFiles(CONFIG_ROOT).map(path.normalize);
  const discoveredSet = new Set(discoveredFiles);

  for (const expected of MODULE_RULES.keys()) {
    const absolutePath = path.join(REPO_ROOT, expected);
    if (!discoveredSet.has(path.normalize(absolutePath))) {
      addIssue(
        "ARCH_MISSING_MODULE",
        `Expected configuration module is missing: ${expected}`,
        "The architecture contract covers every authored VuePress TypeScript module.",
        `Restore ${expected}, or update this linter and the architecture documentation in the same reviewed change.`,
      );
    }
  }

  for (const file of discoveredFiles) {
    const relativePath = repoPath(file);
    if (!MODULE_RULES.has(relativePath)) {
      addIssue(
        "ARCH_UNKNOWN_MODULE",
        `Unclassified VuePress TypeScript module: ${relativePath}`,
        "Unclassified modules can bypass the documented layer direction and ownership boundary.",
        "Place the behavior in one of the owned modules, or add an explicit layer and dependency rule here.",
      );
    }
  }

  const graph = new Map(discoveredFiles.map((file) => [file, new Set()]));
  for (const importer of discoveredFiles) {
    const importerPath = repoPath(importer);
    const importerRule = MODULE_RULES.get(importerPath);
    const source = fs.readFileSync(importer, "utf8");

    for (const specifier of staticImports(source)) {
      if (!specifier.startsWith(".")) continue;
      const dependency = resolveRelativeImport(importer, specifier, discoveredSet);
      const dependencyPath = repoPath(dependency);
      graph.get(importer).add(dependency);

      if (!discoveredSet.has(dependency)) {
        addIssue(
          "ARCH_UNKNOWN_RELATIVE_TARGET",
          `${importerPath} imports ${specifier}, resolved as missing ${dependencyPath}`,
          "A missing or unclassified local import makes the configuration graph incomplete.",
          "Fix the import path or add and classify the target module explicitly.",
        );
        continue;
      }

      const dependencyRule = MODULE_RULES.get(dependencyPath);
      if (!importerRule || !dependencyRule) continue;
      if (importerRule.allowedRelativeDependencies.has(dependencyPath)) continue;

      if (dependencyRule.layer > importerRule.layer) {
        addIssue(
          "ARCH_REVERSE_DEPENDENCY",
          `${importerPath} (${importerRule.role}) depends upward on ${dependencyPath} (${dependencyRule.role})`,
          "Lower layers must remain reusable data/configuration leaves and cannot depend on their composers.",
          `Remove the import. Allowed relative dependencies for ${importerPath}: ${[...importerRule.allowedRelativeDependencies].join(", ") || "none"}.`,
        );
      } else {
        addIssue(
          "ARCH_DISALLOWED_DEPENDENCY",
          `${importerPath} imports non-allowlisted peer/lower module ${dependencyPath}`,
          "The explicit dependency allowlist prevents hidden coupling between configuration responsibilities.",
          `Remove the import or update the documented architecture and this allowlist together. Allowed targets: ${[...importerRule.allowedRelativeDependencies].join(", ") || "none"}.`,
        );
      }
    }
  }

  for (const cycle of findCycles(graph)) {
    addIssue(
      "ARCH_CYCLE",
      `Circular relative dependency: ${cycle.map(repoPath).join(" -> ")}`,
      "Cycles make configuration initialization order fragile and violate the one-way layer graph.",
      "Move shared constants downward or duplicate simple declarative data so every dependency points toward a leaf.",
    );
  }

  if (issues.length > 0) {
    for (const issue of issues) printIssue(issue);
    console.error(`Architecture lint failed with ${issues.length} error(s).`);
    process.exitCode = 1;
  } else {
    console.log(`Architecture lint passed: ${discoveredFiles.length} classified module(s), no reverse dependencies or cycles.`);
  }
} catch (error) {
  addIssue(
    "ARCH_LINTER_FAILURE",
    error instanceof Error ? error.message : String(error),
    "The architecture check could not complete, so its result cannot be trusted.",
    "Run the script with a supported Node.js version and inspect file permissions and syntax.",
  );
  printIssue(issues.at(-1));
  process.exitCode = 1;
}
