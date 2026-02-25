#!/usr/bin/env node
/**
 * build.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Downloads official battery-state-card.js from maxwroc's GitHub release,
 * appends our visual editor patch, writes combined output to dist/.
 *
 * Usage:
 *   node scripts/build.js               full build (download + combine)
 *   node scripts/build.js --editor-only skip download, re-append editor only
 *   node scripts/build.js --watch       rebuild editor on file-change
 *   node scripts/build.js --version 3.2.1  use a specific upstream version
 * ─────────────────────────────────────────────────────────────────────────────
 */

"use strict";

const https   = require("https");
const http    = require("http");
const fs      = require("fs");
const path    = require("path");

// ── Configuration ─────────────────────────────────────────────────────────────

const ARGS         = new Set(process.argv.slice(2));
const EDITOR_ONLY  = ARGS.has("--editor-only");
const WATCH_MODE   = ARGS.has("--watch");

// Allow --version X.Y.Z override
let BASE_VERSION = "3.2.1";
const vIdx = process.argv.indexOf("--version");
if (vIdx !== -1 && process.argv[vIdx + 1]) {
  BASE_VERSION = process.argv[vIdx + 1];
}

const ROOT       = path.resolve(__dirname, "..");
const DIST_DIR   = path.join(ROOT, "dist");
const BASE_URL   = `https://github.com/maxwroc/battery-state-card/releases/download/v${BASE_VERSION}/battery-state-card.js`;
const BASE_CACHE = path.join(DIST_DIR, `battery-state-card-base-v${BASE_VERSION}.js`);
const EDITOR_SRC = path.join(ROOT, "src", "editor", "battery-state-card-editor.js");
const OUTPUT     = path.join(DIST_DIR, "battery-state-card.js");

// ── Utilities ─────────────────────────────────────────────────────────────────

const ts  = () => new Date().toLocaleTimeString("en-US", { hour12: false });
const log = (msg) => console.log(`[${ts()}] ${msg}`);
const err = (msg) => console.error(`[${ts()}] ❌ ${msg}`);

function fmtBytes(n) {
  if (n < 1024)       return n + " B";
  if (n < 1048576)    return (n / 1024).toFixed(1) + " KB";
  return (n / 1048576).toFixed(2) + " MB";
}

// ── Downloader (follows redirects) ───────────────────────────────────────────

function get(url) {
  return new Promise((resolve, reject) => {
    const mod = url.startsWith("https://") ? https : http;
    mod.get(url, { headers: { "User-Agent": "battery-state-card-build/1.0" } }, (res) => {
      const { statusCode, headers } = res;

      if (statusCode === 301 || statusCode === 302 || statusCode === 307 || statusCode === 308) {
        res.resume();
        return get(headers.location).then(resolve, reject);
      }

      if (statusCode !== 200) {
        res.resume();
        return reject(new Error(`HTTP ${statusCode} — ${url}`));
      }

      const chunks = [];
      res.on("data", (c) => chunks.push(c));
      res.on("end",  () => resolve(Buffer.concat(chunks)));
      res.on("error", reject);
    }).on("error", reject);
  });
}

async function download(url, dest) {
  log(`Downloading ${path.basename(dest)} from upstream...`);
  const buf = await get(url);
  fs.writeFileSync(dest, buf);
  log(`Saved ${path.basename(dest)} (${fmtBytes(buf.length)})`);
}

// ── Build ─────────────────────────────────────────────────────────────────────

async function build() {
  // Ensure dist/ exists
  if (!fs.existsSync(DIST_DIR)) fs.mkdirSync(DIST_DIR, { recursive: true });

  // ── Step 1: obtain base JS ──────────────────────────────────────────────────
  if (!EDITOR_ONLY) {
    if (fs.existsSync(BASE_CACHE)) {
      log(`Using cached base: ${path.basename(BASE_CACHE)} (${fmtBytes(fs.statSync(BASE_CACHE).size)})`);
    } else {
      try {
        await download(BASE_URL, BASE_CACHE);
      } catch (e) {
        err(`Could not download upstream JS: ${e.message}`);
        err(`Download manually from: https://github.com/maxwroc/battery-state-card/releases/tag/v${BASE_VERSION}`);
        err(`Save it to: ${BASE_CACHE}`);
        process.exit(1);
      }
    }
  } else {
    if (!fs.existsSync(BASE_CACHE)) {
      err(`--editor-only: cached base not found at ${BASE_CACHE}`);
      err(`Run without --editor-only first.`);
      process.exit(1);
    }
    log(`--editor-only: reusing ${path.basename(BASE_CACHE)}`);
  }

  // ── Step 2: read both files ─────────────────────────────────────────────────
  const baseJs   = fs.readFileSync(BASE_CACHE, "utf8");
  const editorJs = fs.readFileSync(EDITOR_SRC, "utf8");

  // ── Step 3: combine ─────────────────────────────────────────────────────────
  const banner = [
    "/**",
    ` * battery-state-card v${BASE_VERSION} + Visual Editor`,
    ` * Upstream: https://github.com/maxwroc/battery-state-card`,
    ` * Editor:   https://github.com/sjfehlen/battery-state-card`,
    ` * Built:    ${new Date().toISOString()}`,
    " */",
    "",
  ].join("\n");

  const divider = [
    "",
    "/* ─────────────────────────────────────────────────────────────────────────",
    " * Visual Editor Patch — sjfehlen/battery-state-card fork",
    " * ───────────────────────────────────────────────────────────────────────── */",
    "",
  ].join("\n");

  const combined = banner + baseJs + divider + editorJs;
  fs.writeFileSync(OUTPUT, combined, "utf8");

  log(`✅  Built: dist/battery-state-card.js (${fmtBytes(fs.statSync(OUTPUT).size)})`);
  console.log("\n  → Copy dist/battery-state-card.js to config/www/ in Home Assistant\n");
}

// ── Watch ─────────────────────────────────────────────────────────────────────

function watch() {
  build().catch((e) => err(e.message));

  log(`Watching: ${path.relative(ROOT, EDITOR_SRC)}`);
  let debounce;
  fs.watch(EDITOR_SRC, () => {
    clearTimeout(debounce);
    debounce = setTimeout(() => {
      log("Change detected — rebuilding…");
      build().catch((e) => err(e.message));
    }, 100);
  });
}

// ── Entry ─────────────────────────────────────────────────────────────────────

if (WATCH_MODE) {
  watch();
} else {
  build().catch((e) => { err(e.message); process.exit(1); });
}
