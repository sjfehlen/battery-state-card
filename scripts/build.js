#!/usr/bin/env node
/**
 * build.js — battery-state-card fork build script
 *
 * Downloads the official battery-state-card.js from the GitHub release,
 * appends our visual editor patch, and writes the combined file to dist/.
 *
 * Usage:
 *   node scripts/build.js              — full build
 *   node scripts/build.js --editor-only — skip download, just re-append editor
 */

const https = require("https");
const http = require("http");
const fs = require("fs");
const path = require("path");

const BASE_VERSION = "3.2.1";
const BASE_URL = `https://github.com/maxwroc/battery-state-card/releases/download/v${BASE_VERSION}/battery-state-card.js`;
const BASE_CACHE = path.join(__dirname, "..", "dist", `battery-state-card-base-v${BASE_VERSION}.js`);
const EDITOR_SRC = path.join(__dirname, "..", "src", "editor", "battery-state-card-editor.js");
const OUTPUT = path.join(__dirname, "..", "dist", "battery-state-card.js");

const DIST_DIR = path.join(__dirname, "..", "dist");

const ARGS = process.argv.slice(2);
const EDITOR_ONLY = ARGS.includes("--editor-only");
const WATCH = ARGS.includes("--watch");

// ── Helpers ──────────────────────────────────────────────────────────────────

function log(msg) {
  const now = new Date().toLocaleTimeString();
  console.log(`[${now}] ${msg}`);
}

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    log(`Downloading: ${url}`);
    const file = fs.createWriteStream(dest);
    const protocol = url.startsWith("https") ? https : http;

    function request(url) {
      protocol.get(url, res => {
        // Follow redirects (GitHub releases redirect to codeload.github.com)
        if (res.statusCode === 301 || res.statusCode === 302 || res.statusCode === 307) {
          const redirectUrl = res.headers.location;
          log(`Redirecting to: ${redirectUrl}`);
          file.close();
          // Use correct protocol for redirect
          const rProto = redirectUrl.startsWith("https") ? https : http;
          rProto.get(redirectUrl, res2 => {
            if (res2.statusCode !== 200) {
              reject(new Error(`Download failed: HTTP ${res2.statusCode} at ${redirectUrl}`));
              return;
            }
            const newFile = fs.createWriteStream(dest);
            res2.pipe(newFile);
            newFile.on("finish", () => {
              newFile.close(() => {
                log(`Downloaded successfully (${formatBytes(fs.statSync(dest).size)})`);
                resolve();
              });
            });
            newFile.on("error", reject);
          }).on("error", reject);
          return;
        }

        if (res.statusCode !== 200) {
          reject(new Error(`Download failed: HTTP ${res.statusCode} for ${url}`));
          return;
        }

        res.pipe(file);
        file.on("finish", () => {
          file.close(() => {
            log(`Downloaded successfully (${formatBytes(fs.statSync(dest).size)})`);
            resolve();
          });
        });
        file.on("error", reject);
      }).on("error", reject);
    }

    request(url);
  });
}

function formatBytes(bytes) {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(1) + " MB";
}

// ── Build ────────────────────────────────────────────────────────────────────

async function build() {
  // Ensure dist/ exists
  if (!fs.existsSync(DIST_DIR)) {
    fs.mkdirSync(DIST_DIR, { recursive: true });
  }

  // Step 1: Get the official base JS
  if (!EDITOR_ONLY) {
    if (fs.existsSync(BASE_CACHE)) {
      log(`Using cached base JS: ${path.basename(BASE_CACHE)}`);
    } else {
      log(`Downloading official battery-state-card v${BASE_VERSION}...`);
      try {
        await downloadFile(BASE_URL, BASE_CACHE);
      } catch (err) {
        // Try alternate URL format
        const altUrl = `https://github.com/maxwroc/battery-state-card/releases/download/v${BASE_VERSION}/battery-state-card.js`;
        log(`Primary download failed: ${err.message}`);
        log(`Trying alternate URL...`);
        try {
          await downloadFile(altUrl, BASE_CACHE);
        } catch (err2) {
          console.error(`\n❌ Could not download base JS: ${err2.message}`);
          console.error(`\nManual fix: Download battery-state-card.js from:`);
          console.error(`  https://github.com/maxwroc/battery-state-card/releases/tag/v${BASE_VERSION}`);
          console.error(`and save it to: ${BASE_CACHE}\n`);
          process.exit(1);
        }
      }
    }
  } else {
    if (!fs.existsSync(BASE_CACHE)) {
      console.error(`\n❌ --editor-only specified but base JS not found at:\n  ${BASE_CACHE}`);
      console.error(`Run 'node scripts/build.js' first (without --editor-only) to download it.\n`);
      process.exit(1);
    }
    log(`--editor-only: Reusing cached base JS`);
  }

  // Step 2: Read both files
  log("Reading base JS...");
  const baseJs = fs.readFileSync(BASE_CACHE, "utf8");

  log("Reading editor patch...");
  const editorJs = fs.readFileSync(EDITOR_SRC, "utf8");

  // Step 3: Combine
  log("Combining files...");
  const separator = `\n\n/* ─────────────────────────────────────────────────────────────────────
 * Visual Editor Patch — battery-state-card fork
 * Appended by build.js — https://github.com/YOUR_USERNAME/battery-state-card
 * ───────────────────────────────────────────────────────────────────── */\n\n`;

  const combined = baseJs + separator + editorJs;

  // Step 4: Write output
  fs.writeFileSync(OUTPUT, combined, "utf8");

  const finalSize = formatBytes(fs.statSync(OUTPUT).size);
  log(`✅ Built: ${OUTPUT} (${finalSize})`);
  console.log("\n📦 Output: dist/battery-state-card.js");
  console.log("   Drop this file into config/www/ in your Home Assistant instance.\n");
}

// ── Watch mode ───────────────────────────────────────────────────────────────

function watch() {
  build().catch(console.error);

  log(`Watching for changes in ${EDITOR_SRC}...`);
  fs.watch(EDITOR_SRC, () => {
    log("Editor file changed — rebuilding...");
    build().catch(console.error);
  });
}

// ── Main ─────────────────────────────────────────────────────────────────────

if (WATCH) {
  watch();
} else {
  build().catch(err => {
    console.error("Build failed:", err);
    process.exit(1);
  });
}
