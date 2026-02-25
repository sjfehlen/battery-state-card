# Battery State Card — Visual Editor Fork

[![GitHub Release](https://img.shields.io/github/release/sjfehlen/battery-state-card.svg?style=flat-square)](https://github.com/sjfehlen/battery-state-card/releases)
[![hacs_badge](https://img.shields.io/badge/HACS-Custom-orange.svg?style=flat-square)](https://hacs.xyz)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)

A fork of [maxwroc/battery-state-card](https://github.com/maxwroc/battery-state-card) that adds a **complete visual (UI) editor** — configure every feature of the card without touching YAML.

> **Upstream card version:** v3.2.1 — all original functionality is 100% preserved. This fork only adds the editor.

---

## What's New in This Fork

The original card shows **"Visual editor not supported"** when you try to edit it through the HA dashboard. This fork fixes that with a full 5-tab GUI editor:

| Tab | What you can configure |
|---|---|
| **⚙️ General** | Title, secondary info, collapse count, unit, round, sort (primary + secondary), tap action |
| **🎨 Colors** | Color steps with color picker + hex input, thresholds, gradient mode toggle |
| **📋 Entities** | Add/edit/remove entities with full per-entity options (name, icon, attribute, multiplier, tap action, charging state, state map) |
| **🔍 Filters** | Auto-include/exclude filters with all operators, bulk rename rules with capitalize toggle |
| **🔧 Advanced** | Card-level charging state, state map, value override (KString), debug mode |

---

## Screenshots

> Add the card from the UI picker → click the ✏️ pencil → visual editor appears immediately.

---

## Installation

### Option 1 — HACS (Recommended)

1. Open HACS → **Frontend**
2. Click ⋮ → **Custom Repositories**
3. Add URL: `https://github.com/sjfehlen/battery-state-card`
4. Category: **Lovelace**
5. Install **"Battery State Card (Visual Editor)"**
6. Reload your browser

### Option 2 — Manual

1. Download `battery-state-card.js` from the [latest release](https://github.com/sjfehlen/battery-state-card/releases/latest)
2. Copy to `config/www/battery-state-card.js` in Home Assistant
3. Add to Lovelace resources (Settings → Dashboards → Resources):

```yaml
resources:
  - url: /local/battery-state-card.js
    type: module
```

4. Reload your browser — the card will show a visual editor when you add it.

---

## Usage

When the card is installed, open any dashboard → **Edit** → **Add Card** → search for **"Battery State"** → the full visual editor opens automatically.

### Default Config

When you add the card fresh from the picker, this stub config is applied:

```yaml
type: custom:battery-state-card
secondary_info: "{last_changed}"
filter:
  include:
    - name: "attributes.device_class"
      value: "battery"
  exclude:
    - name: "entity_id"
      value: "binary_sensor.*"
      operator: "matches"
sort:
  by: "state"
collapse: 8
bulk_rename:
  rules:
    - from: " Battery"
    - from: " level"
  capitalize_first: true
colors:
  steps:
    - "#ff0000"
    - "#ffff00"
    - "#00ff00"
  gradient: true
```

---

## Building from Source

You only need Node.js (≥ 16). No global packages required.

```bash
# Clone
git clone https://github.com/sjfehlen/battery-state-card.git
cd battery-state-card

# Install (only needed for npm scripts)
npm install

# Full build — downloads official v3.2.1 JS and appends our editor
npm run build
# or: node scripts/build.js

# Re-append editor only (skip re-download)
npm run build:editor
# or: node scripts/build.js --editor-only

# Watch mode — auto-rebuild when you edit the editor
npm run watch
# or: node scripts/build.js --watch

# Build against a specific upstream version
node scripts/build.js --version 3.2.1

# Output: dist/battery-state-card.js
```

The build script:
1. Downloads the official compiled `battery-state-card.js` from [maxwroc's release](https://github.com/maxwroc/battery-state-card/releases)
2. Caches it locally as `dist/battery-state-card-base-v3.2.1.js` (re-used on subsequent builds)
3. Appends our editor patch (`src/editor/battery-state-card-editor.js`)
4. Outputs the combined file to `dist/battery-state-card.js`

---

## How the Editor Patch Works

Home Assistant looks for a static `getConfigElement()` method on a card's custom element class to enable the visual editor. The official card doesn't implement this, so HA shows "Visual editor not supported."

Our editor patch:

1. Defines `battery-state-card-editor` as a Shadow DOM Web Component (vanilla JS, zero dependencies)
2. Uses `customElements.whenDefined()` to safely wait for the card classes to register
3. Patches `battery-state-card` and `battery-state-entity` to add `getConfigElement()` and `getStubConfig()`
4. HA then uses our editor element for visual configuration
5. Registers the card in `window.customCards` so it appears in the card picker with a description

---

## All Supported Config Options

Everything from the original card is supported in the editor. Refer to the [upstream README](https://github.com/maxwroc/battery-state-card#readme) for complete YAML documentation.

| Option | Tab |
|---|---|
| `title` | General |
| `secondary_info` | General |
| `collapse` | General |
| `unit` | General |
| `round` | General |
| `sort` (single or array, `by`, `desc`) | General |
| `tap_action` (more-info, navigate, url, call-service, none) | General |
| `colors.steps` (hex strings or objects with `value`) | Colors |
| `colors.gradient` | Colors |
| `entities[]` (all per-entity options) | Entities |
| `filter.include[]` / `filter.exclude[]` | Filters |
| `bulk_rename` (`rules[]`, `capitalize_first`) | Filters |
| `charging_state` (entity_id, state[], attribute[], icon, color, secondary_info_text) | Advanced |
| `state_map[]` (from, to, display) | Advanced |
| `value_override` (KString) | Advanced |
| `debug` | Advanced |
| `default_state_formatting` | Advanced |

---

## Frequently Asked Questions

**Q: Does this break existing YAML configs?**
No. This is purely additive — no behavior is changed, only `getConfigElement()` is added.

**Q: Will it work with future upstream versions?**
The build script accepts `--version X.Y.Z`. As long as the upstream card registers the same custom element names, the editor will continue to work.

**Q: Can I use this with battery-state-entity (row mode)?**
Yes. The same editor patch applies to `battery-state-entity` as well.

**Q: Why not submit this as a PR to the original?**
The original uses TypeScript + a custom build pipeline. This fork deliberately uses vanilla JS to keep it dependency-free and easy to build. A PR would require a full TypeScript rewrite of the editor.

---

## Contributing

Pull requests welcome! The editor lives entirely in `src/editor/battery-state-card-editor.js` — a single self-contained file. Edit it, run `npm run build`, and test in Home Assistant.

---

## Credits

- Original card: **[maxwroc/battery-state-card](https://github.com/maxwroc/battery-state-card)** — MIT License — all the actual card logic
- Visual editor: this fork (sjfehlen)

---

## License

MIT — same as the original card.
