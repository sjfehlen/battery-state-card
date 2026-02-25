# Battery State Card — Visual Editor Fork

[![GitHub Release](https://img.shields.io/github/release/YOUR_USERNAME/battery-state-card.svg?style=popout)](https://github.com/YOUR_USERNAME/battery-state-card/releases)
[![hacs_badge](https://img.shields.io/badge/HACS-Custom-orange.svg)](https://hacs.xyz)

A fork of [maxwroc/battery-state-card](https://github.com/maxwroc/battery-state-card) that adds a **complete visual (UI) editor** so you can configure every feature of the card without writing YAML.

---

## What's New in This Fork

The original card shows **"Visual editor not supported"** when you try to edit it through the HA dashboard UI. This fork fixes that by adding a full GUI editor with 5 tabs:

| Tab | What you can configure |
|-----|----------------------|
| **General** | Title, secondary info, collapse, unit, round, sort order |
| **Colors** | Color steps with color picker, thresholds, gradient toggle |
| **Entities** | Add/edit/remove entities with all per-entity options |
| **Filters** | Auto-include/exclude by device_class, entity_id, etc. Bulk rename rules |
| **Advanced** | Card-level charging state, state map, value override, debug |

All original card functionality is 100% preserved — this fork only adds the editor.

---

## Quick Install

### Option 1: Manual (simplest)

1. Download `battery-state-card.js` from the [latest release](https://github.com/YOUR_USERNAME/battery-state-card/releases/latest)
2. Copy it to `config/www/battery-state-card.js` in your Home Assistant
3. Add to your Lovelace resources:
   ```yaml
   resources:
     - url: /local/battery-state-card.js
       type: module
   ```
4. Done! When you add a Battery State Card, the visual editor will be available.

### Option 2: HACS (Custom Repository)

1. In HACS → Frontend → ⋮ → Custom Repositories
2. Add: `https://github.com/YOUR_USERNAME/battery-state-card`
3. Category: Lovelace
4. Install "Battery State Card (with Visual Editor)"

---

## Building from Source

If you want to build the JS yourself (e.g. to customize the editor):

```bash
# Clone this repo
git clone https://github.com/YOUR_USERNAME/battery-state-card.git
cd battery-state-card

# Install dependencies (just Node.js required, no npm packages needed)
npm install

# Build — downloads official v3.2.1 JS and appends our editor
node scripts/build.js

# Output: dist/battery-state-card.js
```

The build script:
1. Downloads the official `battery-state-card.js` from the [maxwroc release](https://github.com/maxwroc/battery-state-card/releases)
2. Caches it locally (`dist/battery-state-card-base-v3.2.1.js`)
3. Appends our editor code (`src/editor/battery-state-card-editor.js`)
4. Outputs the combined file to `dist/battery-state-card.js`

On subsequent builds, the cached base JS is reused (no re-download). To edit just the editor:
```bash
node scripts/build.js --editor-only
```

To auto-rebuild when you edit the editor:
```bash
node scripts/build.js --watch
```

---

## How It Works

Home Assistant looks for a static `getConfigElement()` method on card custom elements to enable the visual editor. The official card doesn't implement this, so HA shows "Visual editor not supported."

Our editor patch:
1. Defines `battery-state-card-editor` as a Web Component (vanilla JS, no dependencies)
2. Patches the already-registered `battery-state-card` and `battery-state-entity` classes to add `getConfigElement()` and `getStubConfig()`
3. HA then uses our editor element for all visual editing

The patch uses `customElements.whenDefined()` to handle timing — it safely runs whether the card registers before or after the patch.

---

## Full Card Documentation

All original configuration options are still fully supported. See the [original README](https://github.com/maxwroc/battery-state-card#readme) for complete documentation.

### Default config (applied when you add the card from picker)

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

## Credits

- Original card: [maxwroc/battery-state-card](https://github.com/maxwroc/battery-state-card) — MIT License
- Visual editor: this fork

---

## License

MIT — same as the original card.
