#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(SCRIPT_DIR, "..");
const BLOG_ROOT = path.join(REPO_ROOT, "blog");
const PUBLIC_ROOT = path.join(BLOG_ROOT, ".vuepress", "public");
const EXCLUDED_DIRECTORIES = new Set([".git", "node_modules", ".cache", ".temp", "dist"]);

const BASELINE_NAVIGATION_CASE_MISMATCHES = new Map([
  [
    "blog/.vuepress/sidebar.ts\0/python/语言/网络编程/WebSocket",
    "Legacy sidebar target uses WebSocket while the tracked file is Websocket.md; Linux paths are case-sensitive.",
  ],
  [
    "blog/.vuepress/sidebar.ts\0/tool/Git/安装Gitlab",
    "Legacy sidebar target uses Gitlab while the tracked file is 安装GitLab.md; Linux paths are case-sensitive.",
  ],
]);

const BASELINE_MISSING_RESOURCES = new Map([
  [
    "blog/ai/HelloAgents/各种疑问.md\0/api/attachments.redirect?id=b453f47c-0744-40c3-9ead-7dc4d6c83398",
    "Legacy editor attachment URL has no file or API handler in this static site.",
  ],
  [
    "blog/ai/HelloAgents/各种疑问.md\0/api/attachments.redirect?id=9bdc2bb0-97d8-4b72-b4f5-7a73c376a5fc",
    "Legacy editor attachment URL has no file or API handler in this static site.",
  ],
]);

// These predate the current lint baseline and were found by the first full
// relative-link scan. Keep each exception exact so new broken links still fail.
const BASELINE_MISSING_RELATIVE_LINKS = new Map([
  [
    "blog/python/语言/基础/文件基础.md\0../../库/标准库进阶/运行时服务.html#contextlib",
    "Pre-existing link points to a removed standard-library article; no matching page is tracked.",
  ],
  [
    "blog/python/语言/进阶/函数.md\0../../库/标准库进阶/函数式编程.html#_1-functools",
    "Pre-existing link points to a removed functional-programming article; no matching page is tracked.",
  ],
  [
    "blog/python/语言/进阶/装饰器.md\0../../库/标准库进阶/函数式编程.html#_1-functools",
    "Pre-existing link points to a removed functional-programming article; no matching page is tracked.",
  ],
  [
    "blog/unix/CentOS/LDAP/LDAP.md\0./AD",
    "Pre-existing link names AD, while the repository only contains differently named AD-domain articles.",
  ],
  [
    "blog/python/语言/asyncio/底层实现.md\0那他妈的是因为，傻逼作者写了一半，不给运行代码.弔东西还只调度个事件循环，拿不出实际返回值，还要填tam的其他方法才能满足",
    "Pre-existing prose uses Markdown reference-definition syntax even though its value is commentary, not a link target.",
  ],
]);

const errors = [];
const warnings = [];
const directoryEntries = new Map();

function repoPath(filePath) {
  return path.relative(REPO_ROOT, filePath).split(path.sep).join("/");
}

function addError(code, what, why, how) {
  errors.push({ level: "ERROR", code, what, why, how });
}

function addWarning(code, what, why, how) {
  warnings.push({ level: "WARN", code, what, why, how });
}

function printIssue(issue) {
  const output = issue.level === "ERROR" ? console.error : console.warn;
  output(`[${issue.level}] ${issue.code}`);
  output(`  WHAT: ${issue.what}`);
  output(`  WHY: ${issue.why}`);
  output(`  HOW: ${issue.how}`);
}

function walkMarkdownFiles(directory) {
  const files = [];
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (entry.isDirectory() && EXCLUDED_DIRECTORIES.has(entry.name)) continue;
    if (entry.isDirectory() && entry.name === ".vuepress") continue;
    const absolutePath = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...walkMarkdownFiles(absolutePath));
    if (entry.isFile() && /\.md$/i.test(entry.name)) files.push(absolutePath);
  }
  return files;
}

function checkFrontmatter(file, lines) {
  if ((lines[0] ?? "").replace(/^\uFEFF/, "").trim() !== "---") return;
  const closingLine = lines.findIndex((line, index) => index > 0 && /^(?:---|\.\.\.)\s*$/.test(line));
  if (closingLine === -1) {
    addError(
      "CONTENT_UNCLOSED_FRONTMATTER",
      `${repoPath(file)} opens frontmatter on line 1 but never closes it`,
      "Unclosed frontmatter causes page metadata and content to be parsed incorrectly.",
      "Add a closing --- line before the Markdown body.",
    );
  }
}

function checkFences(file, lines) {
  let openFence = null;
  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    if (!openFence) {
      const match = /^ {0,3}(`{3,}|~{3,})(.*)$/.exec(line);
      if (match) openFence = { marker: match[1][0], length: match[1].length, line: index + 1 };
      continue;
    }

    const closePattern = new RegExp(`^ {0,3}${openFence.marker === "`" ? "`" : "~"}{${openFence.length},}\\s*$`);
    if (closePattern.test(line)) openFence = null;
  }

  if (openFence) {
    addError(
      "CONTENT_UNCLOSED_FENCE",
      `${repoPath(file)} has an unclosed ${openFence.marker.repeat(openFence.length)} fence from line ${openFence.line}`,
      "An unbalanced code fence can turn the remainder of a page into a code block.",
      `Close the fence with at least ${openFence.length} ${openFence.marker} characters.`,
    );
  }
}

function markdownLinesOutsideFences(lines) {
  let openFence = null;
  let inHtmlComment = false;
  return lines.map((line) => {
    if (!openFence) {
      const match = /^ {0,3}(`{3,}|~{3,})(.*)$/.exec(line);
      if (match) {
        openFence = { marker: match[1][0], length: match[1].length };
        return "";
      }
      let visible = line;
      if (inHtmlComment) {
        const commentEnd = visible.indexOf("-->");
        if (commentEnd === -1) return "";
        visible = visible.slice(commentEnd + 3);
        inHtmlComment = false;
      }
      while (visible.includes("<!--")) {
        const commentStart = visible.indexOf("<!--");
        const commentEnd = visible.indexOf("-->", commentStart + 4);
        if (commentEnd === -1) {
          visible = visible.slice(0, commentStart);
          inHtmlComment = true;
          break;
        }
        visible = `${visible.slice(0, commentStart)}${visible.slice(commentEnd + 3)}`;
      }
      return visible.replace(/`+[^`]*`+/g, "");
    }

    const closePattern = new RegExp(`^ {0,3}${openFence.marker === "`" ? "`" : "~"}{${openFence.length},}\\s*$`);
    if (closePattern.test(line)) openFence = null;
    return "";
  });
}

function parseDestination(value) {
  const trimmed = value.trim();
  if (!trimmed) return "";
  if (trimmed.startsWith("<")) {
    const end = trimmed.indexOf(">");
    return end === -1 ? trimmed.slice(1) : trimmed.slice(1, end);
  }
  return trimmed.split(/\s+(?=["'(])/, 1)[0];
}

function extractLinks(lines) {
  const references = [];
  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    const inlinePattern = /!?\[[^\]\n]*\]\(([^)\n]*)\)/g;
    const htmlPattern = /<(?:a|img|source|video|audio)\b[^>]*?\b(?:href|src)\s*=\s*["']([^"']+)["'][^>]*>/gi;
    const definitionPattern = /^\s{0,3}\[(?!\^)[^\]]+\]:\s*(\S+)/;
    let match;

    while ((match = inlinePattern.exec(line)) !== null) {
      const target = parseDestination(match[1]);
      if (target) references.push({ target, line: index + 1 });
    }
    while ((match = htmlPattern.exec(line)) !== null) {
      references.push({ target: match[1], line: index + 1 });
    }
    const definition = definitionPattern.exec(line);
    if (definition) references.push({ target: parseDestination(definition[1]), line: index + 1 });
  }
  return references;
}

function isLocalTarget(target) {
  return !(
    target.startsWith("#")
    || target.startsWith("//")
    || /^[a-z][a-z\d+.-]*:/i.test(target)
    || target.startsWith("@")
  );
}

function decodeTargetPath(target) {
  const pathname = target.split(/[?#]/, 1)[0];
  try {
    return decodeURIComponent(pathname);
  } catch {
    return null;
  }
}

function candidatePaths(target, sourceFile, allowDirectory) {
  const decodedPath = decodeTargetPath(target);
  if (decodedPath === null || decodedPath === "") return [];

  const bases = decodedPath.startsWith("/")
    ? [path.join(BLOG_ROOT, decodedPath), path.join(PUBLIC_ROOT, decodedPath)]
    : [path.resolve(path.dirname(sourceFile), decodedPath)];
  const candidates = [];

  for (const base of bases) {
    const extension = path.extname(base).toLowerCase();
    if (extension === ".html" || extension === ".htm") {
      candidates.push(base.replace(/\.html?$/i, ".md"));
    } else {
      candidates.push(base);
      if (!extension) {
        candidates.push(`${base}.md`, path.join(base, "README.md"), path.join(base, "index.md"));
      }
    }
  }

  return [...new Set(candidates)].filter((candidate) => allowDirectory || path.extname(candidate));
}

function entriesFor(directory) {
  if (!directoryEntries.has(directory)) {
    try {
      directoryEntries.set(directory, fs.readdirSync(directory));
    } catch {
      directoryEntries.set(directory, null);
    }
  }
  return directoryEntries.get(directory);
}

function inspectExactCase(absolutePath) {
  const normalized = path.resolve(absolutePath);
  const { root } = path.parse(normalized);
  const parts = normalized.slice(root.length).split(path.sep).filter(Boolean);
  let current = root;
  let exact = true;

  for (const part of parts) {
    const entries = entriesFor(current);
    if (!entries) return { exists: false, exact: false, actualPath: null };
    let actual = entries.find((entry) => entry === part);
    if (!actual) {
      actual = entries.find((entry) => entry.toLowerCase() === part.toLowerCase());
      if (!actual) return { exists: false, exact: false, actualPath: null };
      exact = false;
    }
    current = path.join(current, actual);
  }

  return { exists: true, exact, actualPath: current };
}

function resolveLocalTarget(target, sourceFile, allowDirectory = true) {
  let mismatch = null;
  for (const candidate of candidatePaths(target, sourceFile, allowDirectory)) {
    const result = inspectExactCase(candidate);
    if (result.exists && result.exact) return { status: "exact", actualPath: result.actualPath };
    if (result.exists && !mismatch) mismatch = result;
  }
  return mismatch
    ? { status: "case-mismatch", actualPath: mismatch.actualPath }
    : { status: "missing", actualPath: null };
}

function baselineKey(sourceFile, target) {
  return `${repoPath(sourceFile)}\0${target}`;
}

function validateMarkdownLink(sourceFile, reference) {
  if (!isLocalTarget(reference.target)) return;
  if (reference.target.startsWith("/") && !reference.target.startsWith("/api/attachments.redirect?")) return;
  const decoded = decodeTargetPath(reference.target);
  if (decoded === null) {
    addError(
      "CONTENT_INVALID_URL_ENCODING",
      `${repoPath(sourceFile)}:${reference.line} has invalid URL encoding: ${reference.target}`,
      "Invalid percent encoding cannot be resolved consistently by browsers or the build.",
      "Percent-encode the target correctly or use a direct relative path.",
    );
    return;
  }

  const result = resolveLocalTarget(reference.target, sourceFile);
  if (result.status === "exact") return;

  const key = baselineKey(sourceFile, reference.target);
  const baselineReason = BASELINE_MISSING_RESOURCES.get(key) ?? BASELINE_MISSING_RELATIVE_LINKS.get(key);
  if (result.status === "missing" && baselineReason) {
    addWarning(
      "CONTENT_BASELINE_MISSING_TARGET",
      `${repoPath(sourceFile)}:${reference.line} retains known unresolved target ${reference.target}`,
      baselineReason,
      "Correct the definition or replace the target with a tracked page/resource; only this exact occurrence is allowlisted.",
    );
    return;
  }

  if (result.status === "case-mismatch") {
    addError(
      "CONTENT_LINK_CASE_MISMATCH",
      `${repoPath(sourceFile)}:${reference.line} uses ${reference.target}, but tracked case is ${repoPath(result.actualPath)}`,
      "The link may work on case-insensitive macOS but fail on Linux and GitHub Pages.",
      "Change the link spelling to exactly match the tracked path.",
    );
  } else {
    addError(
      "CONTENT_MISSING_LOCAL_TARGET",
      `${repoPath(sourceFile)}:${reference.line} points to missing local target ${reference.target}`,
      "A static site cannot serve a local link or resource that is absent from the repository.",
      "Add the target, correct the relative path, or use a valid external URL.",
    );
  }
}

function tokenizeJavaScript(source) {
  const tokens = [];
  let index = 0;

  while (index < source.length) {
    if (/\s/.test(source[index])) {
      index += 1;
      continue;
    }
    if (source.startsWith("//", index)) {
      index = source.indexOf("\n", index + 2);
      if (index === -1) break;
      continue;
    }
    if (source.startsWith("/*", index)) {
      const end = source.indexOf("*/", index + 2);
      index = end === -1 ? source.length : end + 2;
      continue;
    }

    const character = source[index];
    if (character === '"' || character === "'") {
      const quote = character;
      let value = "";
      index += 1;
      while (index < source.length && source[index] !== quote) {
        if (source[index] === "\\" && index + 1 < source.length) {
          const escaped = source[index + 1];
          const simpleEscapes = { n: "\n", r: "\r", t: "\t", b: "\b", f: "\f", v: "\v" };
          value += simpleEscapes[escaped] ?? escaped;
          index += 2;
        } else {
          value += source[index];
          index += 1;
        }
      }
      index += 1;
      tokens.push({ type: "string", value });
      continue;
    }

    if ("{}[]():,".includes(character)) {
      tokens.push({ type: character, value: character });
      index += 1;
      continue;
    }

    const identifier = /^[A-Za-z_$][\w$]*/.exec(source.slice(index));
    if (identifier) {
      tokens.push({ type: "identifier", value: identifier[0] });
      index += identifier[0].length;
      continue;
    }
    index += 1;
  }
  return tokens;
}

function parseLiteralConfiguration(source, helperName) {
  const tokens = tokenizeJavaScript(source);
  let index = tokens.findIndex((token, position) => (
    token.type === "identifier"
    && token.value === helperName
    && tokens[position + 1]?.type === "("
  ));
  if (index === -1) throw new Error(`Cannot find ${helperName}(...) configuration call.`);
  index += 2;

  function parseValue() {
    const token = tokens[index];
    if (!token) throw new Error(`Unexpected end while parsing ${helperName} configuration.`);
    if (token.type === "string") {
      index += 1;
      return token.value;
    }
    if (token.type === "[") {
      index += 1;
      const array = [];
      while (tokens[index] && tokens[index].type !== "]") {
        array.push(parseValue());
        if (tokens[index]?.type === ",") index += 1;
      }
      if (tokens[index]?.type !== "]") throw new Error("Unclosed array in navigation configuration.");
      index += 1;
      return array;
    }
    if (token.type === "{") {
      index += 1;
      const object = {};
      while (tokens[index] && tokens[index].type !== "}") {
        const key = tokens[index];
        if (key.type !== "string" && key.type !== "identifier") throw new Error("Unsupported object key in navigation configuration.");
        index += 1;
        if (tokens[index]?.type !== ":") throw new Error(`Missing colon after navigation key ${key.value}.`);
        index += 1;
        object[key.value] = parseValue();
        if (tokens[index]?.type === ",") index += 1;
      }
      if (tokens[index]?.type !== "}") throw new Error("Unclosed object in navigation configuration.");
      index += 1;
      return object;
    }
    if (token.type === "identifier") {
      index += 1;
      if (token.value === "false") return false;
      if (token.value === "true") return true;
      return token.value;
    }
    throw new Error(`Unsupported token ${token.value} in navigation configuration.`);
  }

  return parseValue();
}

function isExternalRoute(route) {
  return route.startsWith("//") || /^[a-z][a-z\d+.-]*:/i.test(route);
}

function joinRoute(prefix, route) {
  if (route.startsWith("/")) return path.posix.normalize(route);
  return path.posix.normalize(`${prefix.endsWith("/") ? prefix : `${prefix}/`}${route}`);
}

function collectNavigationTargets(node, prefix, targets) {
  if (typeof node === "string") {
    if (node !== "structure" && !isExternalRoute(node)) targets.push(joinRoute(prefix, node));
    return;
  }
  if (Array.isArray(node)) {
    for (const child of node) collectNavigationTargets(child, prefix, targets);
    return;
  }
  if (!node || typeof node !== "object") return;

  const nextPrefix = typeof node.prefix === "string" && !isExternalRoute(node.prefix)
    ? joinRoute(prefix, node.prefix)
    : prefix;
  if (typeof node.link === "string" && !isExternalRoute(node.link) && !node.link.startsWith("#")) {
    targets.push(joinRoute(nextPrefix, node.link));
  }
  if (node.children !== undefined) collectNavigationTargets(node.children, nextPrefix, targets);
}

function navigationTargets(file, helperName) {
  const config = parseLiteralConfiguration(fs.readFileSync(file, "utf8"), helperName);
  const targets = [];
  if (helperName === "sidebar" && config && !Array.isArray(config) && typeof config === "object") {
    for (const [prefix, children] of Object.entries(config)) collectNavigationTargets(children, prefix, targets);
  } else {
    collectNavigationTargets(config, "/", targets);
  }
  return [...new Set(targets)];
}

function validateNavigationTarget(sourceFile, target) {
  const result = resolveLocalTarget(target, sourceFile, true);
  if (result.status === "exact") return;

  const key = baselineKey(sourceFile, target);
  const baselineReason = BASELINE_NAVIGATION_CASE_MISMATCHES.get(key);
  if (result.status === "case-mismatch" && baselineReason) {
    addWarning(
      "CONTENT_BASELINE_NAVIGATION_CASE",
      `${repoPath(sourceFile)} retains known case-mismatched target ${target}; tracked path is ${repoPath(result.actualPath)}`,
      baselineReason,
      "Match the target case to the tracked Markdown filename; this exact warning is allowlisted only to keep initial validation green.",
    );
    return;
  }

  if (result.status === "case-mismatch") {
    addError(
      "CONTENT_NAVIGATION_CASE_MISMATCH",
      `${repoPath(sourceFile)} targets ${target}, but tracked case is ${repoPath(result.actualPath)}`,
      "Case-only mismatches become broken navigation on Linux and GitHub Pages.",
      "Change the navigation target to exactly match the tracked path.",
    );
  } else {
    addError(
      "CONTENT_MISSING_NAVIGATION_TARGET",
      `${repoPath(sourceFile)} targets missing internal route ${target}`,
      "Navbar and sidebar entries must resolve to a page, asset, or existing content directory.",
      "Correct the target or add the intended Markdown page.",
    );
  }
}

function markdownRoute(file) {
  const relativePath = path.relative(BLOG_ROOT, file).split(path.sep).join("/");
  const withoutExtension = relativePath.replace(/\.md$/i, "");
  const routePath = withoutExtension.replace(/\/(?:README|index)$/i, "");
  return `/${routePath}`;
}

function validateDatabaseSidebarCoverage(markdownFiles, sidebarTargets) {
  const targetSet = new Set(sidebarTargets);
  const databaseFiles = markdownFiles.filter((file) => {
    const relativePath = path.relative(BLOG_ROOT, file).split(path.sep).join("/");
    return relativePath.startsWith("database/") && !relativePath.endsWith(".snippet.md");
  });

  for (const file of databaseFiles) {
    const route = markdownRoute(file);
    if (targetSet.has(route)) continue;
    addError(
      "CONTENT_DATABASE_PAGE_NOT_IN_SIDEBAR",
      `${repoPath(file)} generates ${route} but is not referenced by blog/.vuepress/sidebar.ts`,
      "Database navigation is manually curated, so an unlisted page exists but is absent from the left sidebar.",
      `Add the exact filename to the children list for ${path.posix.dirname(route)} in blog/.vuepress/sidebar.ts.`,
    );
  }
}

try {
  const markdownFiles = walkMarkdownFiles(BLOG_ROOT);
  let linkCount = 0;
  for (const file of markdownFiles) {
    const source = fs.readFileSync(file, "utf8");
    const lines = source.split(/\r?\n/);
    checkFrontmatter(file, lines);
    checkFences(file, lines);
    const references = extractLinks(markdownLinesOutsideFences(lines));
    linkCount += references.length;
    for (const reference of references) validateMarkdownLink(file, reference);
  }

  let navigationCount = 0;
  let sidebarTargets = [];
  for (const [filename, helperName] of [["navbar.ts", "navbar"], ["sidebar.ts", "sidebar"]]) {
    const file = path.join(BLOG_ROOT, ".vuepress", filename);
    const targets = navigationTargets(file, helperName);
    if (helperName === "sidebar") sidebarTargets = targets;
    navigationCount += targets.length;
    for (const target of targets) validateNavigationTarget(file, target);
  }
  validateDatabaseSidebarCoverage(markdownFiles, sidebarTargets);

  for (const warning of warnings) printIssue(warning);
  for (const error of errors) printIssue(error);

  if (errors.length > 0) {
    console.error(`Content lint failed with ${errors.length} error(s) and ${warnings.length} baseline warning(s).`);
    process.exitCode = 1;
  } else {
    console.log(`Content lint passed: ${markdownFiles.length} Markdown file(s), ${linkCount} link/resource reference(s), ${navigationCount} navigation target(s), ${warnings.length} baseline warning(s).`);
  }
} catch (error) {
  addError(
    "CONTENT_LINTER_FAILURE",
    error instanceof Error ? error.message : String(error),
    "The content check could not complete, so broken content may be missed.",
    "Run the script with a supported Node.js version and inspect the reported parser or filesystem failure.",
  );
  printIssue(errors.at(-1));
  process.exitCode = 1;
}
