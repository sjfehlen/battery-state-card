/**
 * battery-state-card v3.2.1 + Visual Editor
 * Upstream: https://github.com/maxwroc/battery-state-card
 * Editor:   https://github.com/sjfehlen/battery-state-card
 * Built:    2026-02-25T18:48:21.091Z
 */
// battery-state-card v3.2.1 — Official compiled output
// Source: https://github.com/maxwroc/battery-state-card
// License: MIT — maxwroc
//
// NOTE: This is a placeholder stub used during CI testing when the network is
// unavailable. The real compiled card JS is downloaded from GitHub Releases by
// running:  node scripts/build.js
// ─────────────────────────────────────────────────────────────────────────────
// The real file (~90 KB) is fetched automatically on first build and cached at
// dist/battery-state-card-base-v3.2.1.js so subsequent builds are instant.
// ─────────────────────────────────────────────────────────────────────────────

/* ─────────────────────────────────────────────────────────────────────────
 * Visual Editor Patch — sjfehlen/battery-state-card fork
 * ───────────────────────────────────────────────────────────────────────── */
/**
 * battery-state-card-editor.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Full visual (UI) editor for battery-state-card.
 * Appended to the official battery-state-card.js at build time.
 *
 * Implements a Shadow DOM Web Component that Home Assistant uses as the
 * Lovelace card editor when `getConfigElement()` is defined on the card class.
 *
 * Features:
 *   • General tab  — title, secondary_info, collapse, unit, round, sort, tap_action
 *   • Colors tab   — color steps (picker + hex), thresholds, gradient mode
 *   • Entities tab — add/edit/remove entities with all per-entity options
 *   • Filters tab  — include/exclude filters, bulk rename rules
 *   • Advanced tab — charging state, state map, value override, debug
 *
 * No external dependencies. Vanilla JS + Shadow DOM only.
 * ─────────────────────────────────────────────────────────────────────────────
 */

(function () {
  "use strict";

  /* ═══════════════════════════════════════════════════════════════════════════
   *  CONSTANTS & HELPERS
   * ═══════════════════════════════════════════════════════════════════════════ */

  const VERSION = "3.2.1";

  function deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  function fireConfigChanged(element, config) {
    element.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config },
        bubbles: true,
        composed: true,
      })
    );
  }

  /* ═══════════════════════════════════════════════════════════════════════════
   *  STYLES
   * ═══════════════════════════════════════════════════════════════════════════ */

  const STYLES = `
    :host {
      display: block;
      font-family: var(--primary-font-family, Roboto, sans-serif);
      font-size: 14px;
      color: var(--primary-text-color);
      --editor-radius: 8px;
      --editor-border: 1px solid var(--divider-color, #e0e0e0);
      --editor-bg-section: var(--card-background-color, #fff);
      --editor-bg-input: var(--secondary-background-color, #f5f5f5);
      --editor-primary: var(--primary-color, #03a9f4);
      --editor-secondary: var(--secondary-text-color, #727272);
      --editor-error: var(--error-color, #f44336);
    }

    /* ── Tabs ── */
    .tabs {
      display: flex;
      border-bottom: 2px solid var(--divider-color, #e0e0e0);
      margin-bottom: 16px;
      gap: 2px;
      overflow-x: auto;
      scrollbar-width: none;
    }
    .tabs::-webkit-scrollbar { display: none; }
    .tab {
      flex-shrink: 0;
      display: flex;
      align-items: center;
      gap: 5px;
      padding: 8px 14px;
      border: none;
      background: none;
      cursor: pointer;
      font-size: 13px;
      font-weight: 500;
      color: var(--editor-secondary);
      border-bottom: 3px solid transparent;
      margin-bottom: -2px;
      border-radius: 4px 4px 0 0;
      transition: color .15s, background .15s;
    }
    .tab:hover {
      color: var(--primary-text-color);
      background: var(--editor-bg-input);
    }
    .tab.active {
      color: var(--editor-primary);
      border-bottom-color: var(--editor-primary);
      background: transparent;
    }
    .tab .badge {
      background: var(--editor-primary);
      color: white;
      font-size: 10px;
      font-weight: 700;
      padding: 1px 5px;
      border-radius: 10px;
      min-width: 16px;
      text-align: center;
    }

    /* ── Sections ── */
    .section {
      background: var(--editor-bg-section);
      border: var(--editor-border);
      border-radius: var(--editor-radius);
      padding: 14px 16px;
      margin-bottom: 12px;
    }
    .section-title {
      font-size: 10px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: .1em;
      color: var(--editor-secondary);
      margin-bottom: 14px;
    }
    .sub-title {
      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: .06em;
      color: var(--editor-secondary);
      margin: 16px 0 8px;
      padding-top: 12px;
      border-top: var(--editor-border);
    }

    /* ── Field ── */
    .field { margin-bottom: 12px; }
    .field:last-child { margin-bottom: 0; }
    .field > label {
      display: block;
      font-size: 12px;
      font-weight: 500;
      color: var(--editor-secondary);
      margin-bottom: 5px;
    }
    .field input[type="text"],
    .field input[type="number"],
    .field select,
    .field textarea {
      width: 100%;
      box-sizing: border-box;
      padding: 8px 10px;
      border: var(--editor-border);
      border-radius: 6px;
      background: var(--editor-bg-input);
      color: var(--primary-text-color);
      font-size: 14px;
      font-family: inherit;
      transition: border-color .15s, box-shadow .15s;
    }
    .field input:focus,
    .field select:focus,
    .field textarea:focus {
      outline: none;
      border-color: var(--editor-primary);
      box-shadow: 0 0 0 3px color-mix(in srgb, var(--editor-primary) 15%, transparent);
    }
    .field textarea {
      resize: vertical;
      min-height: 64px;
      font-family: "Courier New", Courier, monospace;
      font-size: 12px;
    }
    .hint {
      display: block;
      font-size: 11px;
      color: var(--editor-secondary);
      margin-top: 4px;
      line-height: 1.4;
    }
    .hint code {
      background: var(--editor-bg-input);
      border: var(--editor-border);
      padding: 1px 4px;
      border-radius: 3px;
      font-family: monospace;
      font-size: 11px;
    }

    /* ── Info block ── */
    .info-block {
      font-size: 12px;
      color: var(--editor-secondary);
      background: var(--editor-bg-input);
      border: var(--editor-border);
      border-radius: 6px;
      padding: 8px 12px;
      margin-bottom: 12px;
      line-height: 1.5;
    }
    .info-block strong { color: var(--primary-text-color); }

    /* ── Toggle row ── */
    .toggle-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
    }
    .toggle-row .toggle-label {
      font-size: 13px;
      line-height: 1.4;
      flex: 1;
    }
    .toggle-row .toggle-hint {
      font-size: 11px;
      color: var(--editor-secondary);
    }
    .switch {
      position: relative;
      display: inline-block;
      width: 42px;
      height: 24px;
      flex-shrink: 0;
    }
    .switch input { opacity: 0; width: 0; height: 0; }
    .slider {
      position: absolute;
      cursor: pointer;
      inset: 0;
      background: var(--disabled-text-color, #bbb);
      border-radius: 24px;
      transition: background .25s;
    }
    .slider::before {
      content: "";
      position: absolute;
      width: 18px;
      height: 18px;
      left: 3px;
      bottom: 3px;
      background: #fff;
      border-radius: 50%;
      transition: transform .25s;
      box-shadow: 0 1px 3px rgba(0,0,0,.3);
    }
    input:checked + .slider { background: var(--editor-primary); }
    input:checked + .slider::before { transform: translateX(18px); }

    /* ── Buttons ── */
    .btn-add {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 6px 14px;
      border: 1px dashed var(--editor-primary);
      border-radius: 6px;
      background: transparent;
      color: var(--editor-primary);
      font-size: 13px;
      font-weight: 500;
      cursor: pointer;
      margin-top: 8px;
      transition: background .15s, color .15s;
    }
    .btn-add:hover { background: var(--editor-primary); color: #fff; }
    .btn-add.secondary {
      border-color: var(--editor-secondary);
      color: var(--editor-secondary);
    }
    .btn-add.secondary:hover { background: var(--editor-secondary); color: #fff; }
    .btn-add + .btn-add { margin-left: 8px; }

    .btn-icon {
      border: none;
      background: none;
      cursor: pointer;
      padding: 4px 6px;
      border-radius: 4px;
      color: var(--editor-secondary);
      display: inline-flex;
      align-items: center;
      font-size: 15px;
      line-height: 1;
      transition: color .15s, background .15s;
    }
    .btn-icon:hover { color: var(--editor-error); background: color-mix(in srgb, var(--editor-error) 10%, transparent); }

    /* ── Empty state ── */
    .empty {
      text-align: center;
      font-size: 13px;
      color: var(--editor-secondary);
      padding: 16px;
      border: 1px dashed var(--divider-color, #ccc);
      border-radius: 6px;
      margin-bottom: 8px;
    }

    /* ── Entity rows ── */
    .entity-card {
      border: var(--editor-border);
      border-radius: 6px;
      margin-bottom: 8px;
      overflow: hidden;
    }
    .entity-header {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 10px 12px;
      cursor: pointer;
      background: var(--editor-bg-input);
      user-select: none;
      transition: background .15s;
    }
    .entity-header:hover { background: var(--divider-color, #e8e8e8); }
    .entity-icon { font-size: 18px; flex-shrink: 0; }
    .entity-name { flex: 1; font-size: 13px; font-weight: 500; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .entity-id-small { font-size: 11px; color: var(--editor-secondary); margin-top: 1px; }
    .entity-chevron { font-size: 14px; color: var(--editor-secondary); flex-shrink: 0; }
    .entity-body {
      padding: 14px;
      border-top: var(--editor-border);
    }

    /* ── Color rows ── */
    .color-row {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 8px;
    }
    .color-swatch {
      width: 32px;
      height: 32px;
      border-radius: 5px;
      border: var(--editor-border);
      flex-shrink: 0;
    }
    .color-picker {
      width: 38px;
      height: 32px;
      padding: 2px;
      border: var(--editor-border);
      border-radius: 5px;
      cursor: pointer;
      background: none;
      flex-shrink: 0;
    }
    .color-text {
      flex: 2;
      padding: 6px 10px !important;
      border: var(--editor-border) !important;
      border-radius: 5px !important;
      background: var(--editor-bg-input) !important;
      color: var(--primary-text-color) !important;
      font-size: 13px !important;
      font-family: monospace !important;
    }
    .color-threshold {
      width: 90px;
      flex-shrink: 0;
      padding: 6px 8px;
      border: var(--editor-border);
      border-radius: 5px;
      background: var(--editor-bg-input);
      color: var(--primary-text-color);
      font-size: 13px;
      font-family: inherit;
    }

    /* ── Inline row (filter/rename/state-map) ── */
    .inline-row {
      display: flex;
      align-items: flex-end;
      gap: 8px;
      margin-bottom: 8px;
      flex-wrap: wrap;
    }
    .inline-col {
      display: flex;
      flex-direction: column;
      flex: 1;
      min-width: 80px;
    }
    .inline-col label {
      font-size: 11px;
      color: var(--editor-secondary);
      margin-bottom: 3px;
      font-weight: 500;
    }
    .inline-col input,
    .inline-col select {
      padding: 7px 9px;
      border: var(--editor-border);
      border-radius: 5px;
      background: var(--editor-bg-input);
      color: var(--primary-text-color);
      font-size: 13px;
      font-family: inherit;
      width: 100%;
      box-sizing: border-box;
    }

    /* ── Two-col grid ── */
    .grid-2 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
    }
    @media (max-width: 480px) {
      .grid-2 { grid-template-columns: 1fr; }
    }

    /* ── Tap action sub-section ── */
    .tap-section {
      border: var(--editor-border);
      border-radius: 6px;
      padding: 12px;
      margin-top: 6px;
      background: var(--editor-bg-input);
    }

    /* ── Charging sub-section ── */
    .charge-section {
      border: var(--editor-border);
      border-radius: 6px;
      padding: 12px;
      margin-top: 6px;
      background: var(--editor-bg-input);
    }
  `;

  /* ═══════════════════════════════════════════════════════════════════════════
   *  EDITOR CLASS
   * ═══════════════════════════════════════════════════════════════════════════ */

  class BatteryStateCardEditor extends HTMLElement {
    constructor() {
      super();
      this._cfg = {};
      this._tab = "general";
      this._expandedEntity = null;
      this._root = this.attachShadow({ mode: "open" });
    }

    /* ── HA lifecycle ── */

    set hass(hass) {
      this._hass = hass;
    }

    setConfig(config) {
      this._cfg = deepClone(config);
      this._render();
    }

    connectedCallback() {
      this._render();
    }

    /* ═══════════════════════════════════════════════════════════════════════
     *  STATE MANAGEMENT
     * ═══════════════════════════════════════════════════════════════════════ */

    _set(key, value) {
      const cfg = deepClone(this._cfg);
      if (value === undefined || value === null || value === "") {
        delete cfg[key];
      } else {
        cfg[key] = value;
      }
      this._cfg = cfg;
      this._render();
      fireConfigChanged(this, cfg);
    }

    _setDeep(cfg) {
      this._cfg = deepClone(cfg);
      this._render();
      fireConfigChanged(this, this._cfg);
    }

    /* ═══════════════════════════════════════════════════════════════════════
     *  DERIVED ACCESSORS
     * ═══════════════════════════════════════════════════════════════════════ */

    _entities() {
      return (this._cfg.entities || []).map((e) =>
        typeof e === "string" ? { entity: e } : deepClone(e)
      );
    }

    _sortArr() {
      const s = this._cfg.sort;
      if (!s) return [];
      const arr = Array.isArray(s) ? s : [s];
      return arr.map((i) => (typeof i === "string" ? { by: i } : i));
    }

    _colorSteps() {
      const c = this._cfg.colors;
      if (!c || !c.steps) return [];
      return c.steps.map((s) =>
        typeof s === "string" ? { color: s } : deepClone(s)
      );
    }

    _isGradient() {
      return this._cfg.colors?.gradient === true;
    }

    _bulkRename() {
      const br = this._cfg.bulk_rename;
      if (!br) return { rules: [], capitalize_first: true };
      if (Array.isArray(br)) return { rules: deepClone(br), capitalize_first: true };
      return { rules: [], capitalize_first: true, ...deepClone(br) };
    }

    _filter() {
      return deepClone(this._cfg.filter || {});
    }

    /* ═══════════════════════════════════════════════════════════════════════
     *  MAIN RENDER
     * ═══════════════════════════════════════════════════════════════════════ */

    _render() {
      const style = document.createElement("style");
      style.textContent = STYLES;

      const root = document.createElement("div");
      root.append(this._buildTabs(), this._buildTabContent());

      this._root.replaceChildren(style, root);
    }

    /* ── Tab bar ── */

    _buildTabs() {
      const defs = [
        { id: "general",  label: "General",  icon: "⚙️" },
        { id: "colors",   label: "Colors",   icon: "🎨", badge: this._colorSteps().length || null },
        { id: "entities", label: "Entities", icon: "📋", badge: this._entities().length || null },
        { id: "filters",  label: "Filters",  icon: "🔍" },
        { id: "advanced", label: "Advanced", icon: "🔧" },
      ];

      const bar = document.createElement("div");
      bar.className = "tabs";

      defs.forEach(({ id, label, icon, badge }) => {
        const btn = document.createElement("button");
        btn.className = "tab" + (this._tab === id ? " active" : "");
        btn.innerHTML = `<span>${icon}</span><span>${label}</span>` +
          (badge ? `<span class="badge">${badge}</span>` : "");
        btn.onclick = () => { this._tab = id; this._render(); };
        bar.append(btn);
      });

      return bar;
    }

    _buildTabContent() {
      const wrap = document.createElement("div");
      switch (this._tab) {
        case "general":  wrap.append(this._tabGeneral());  break;
        case "colors":   wrap.append(this._tabColors());   break;
        case "entities": wrap.append(this._tabEntities()); break;
        case "filters":  wrap.append(this._tabFilters());  break;
        case "advanced": wrap.append(this._tabAdvanced()); break;
      }
      return wrap;
    }

    /* ═══════════════════════════════════════════════════════════════════════
     *  TAB: GENERAL
     * ═══════════════════════════════════════════════════════════════════════ */

    _tabGeneral() {
      const frag = document.createDocumentFragment();
      const cfg = this._cfg;
      const sorts = this._sortArr();
      const pri = sorts[0] || {};
      const sec = sorts[1] || {};

      /* Card settings */
      const s1 = this._section("Card Settings");
      s1.append(
        this._text("Card Title", cfg.title || "", (v) => this._set("title", v), "e.g. Battery Levels"),
        this._text(
          "Secondary Info",
          cfg.secondary_info || "",
          (v) => this._set("secondary_info", v),
          "{last_changed}",
          "Keywords: {last_changed} · {last_updated} · {charging} · {attributes.x}"
        ),
        this._grid2(
          this._num("Collapse (show N)", cfg.collapse || "", (v) => this._set("collapse", v ? parseInt(v) : undefined), "e.g. 8", "Remaining in expand section"),
          this._num("Round (decimal places)", cfg.round !== undefined ? cfg.round : "", (v) => this._set("round", v !== "" ? parseInt(v) : undefined), "e.g. 0")
        ),
        this._text("Unit Override", cfg.unit || "", (v) => this._set("unit", v), "% (default)", "Shown after the battery value")
      );
      frag.append(s1);

      /* Sorting */
      const s2 = this._section("Sorting");
      s2.append(
        this._select("Sort By", pri.by || "", [
          { value: "",                    label: "— None —" },
          { value: "state",               label: "Battery Level" },
          { value: "name",                label: "Name" },
          { value: "entity.last_changed", label: "Last Changed" },
          { value: "entity.last_updated", label: "Last Updated" },
        ], (v) => {
          if (!v) return this._set("sort", undefined);
          const arr = sorts.length ? [...sorts] : [{}];
          arr[0] = { ...arr[0], by: v };
          this._set("sort", arr.length === 1 ? arr[0] : arr);
        })
      );

      if (sorts.length) {
        s2.append(
          this._toggle("Descending order (primary)", pri.desc || false, (v) => {
            const arr = [...sorts];
            arr[0] = { ...arr[0], desc: v };
            this._set("sort", arr.length === 1 ? arr[0] : arr);
          }),
          this._select("Secondary Sort By", sec.by || "", [
            { value: "",                    label: "— None —" },
            { value: "state",               label: "Battery Level" },
            { value: "name",                label: "Name" },
            { value: "entity.last_changed", label: "Last Changed" },
            { value: "entity.last_updated", label: "Last Updated" },
          ], (v) => {
            const arr = [...sorts];
            if (!v) {
              this._set("sort", arr.length === 1 ? arr[0] : arr[0]);
            } else {
              arr[1] = { by: v, desc: sec.desc || false };
              this._set("sort", arr);
            }
          })
        );

        if (sorts.length > 1) {
          s2.append(
            this._toggle("Descending order (secondary)", sec.desc || false, (v) => {
              const arr = [...sorts];
              arr[1] = { ...arr[1], desc: v };
              this._set("sort", arr);
            })
          );
        }
      }
      frag.append(s2);

      /* Tap action */
      const s3 = this._section("Tap Action (Card Default)");
      s3.append(
        this._info("Applied to all entities unless overridden per-entity."),
        this._tapActionEditor(cfg.tap_action, (v) => this._set("tap_action", v))
      );
      frag.append(s3);

      return frag;
    }

    /* ═══════════════════════════════════════════════════════════════════════
     *  TAB: COLORS
     * ═══════════════════════════════════════════════════════════════════════ */

    _tabColors() {
      const frag = document.createDocumentFragment();
      const colors = this._cfg.colors || { steps: [] };
      const isGrad = this._isGradient();
      const steps  = this._colorSteps();

      /* Mode */
      const s1 = this._section("Color Mode");
      s1.append(
        this._toggle(
          "Gradient — smooth color transition between steps",
          isGrad,
          (v) => this._set("colors", { ...colors, gradient: v })
        )
      );
      if (isGrad) {
        s1.append(this._info(
          "<strong>Gradient mode:</strong> Use hex colors only (#rrggbb). " +
          "Add 2+ colors ordered from lowest % to highest %. They blend smoothly."
        ));
      } else {
        s1.append(this._info(
          "<strong>Step mode:</strong> Each color applies to battery levels ≤ the threshold. " +
          "Default: red ≤ 20, yellow ≤ 55, green ≤ 100."
        ));
      }
      frag.append(s1);

      /* Color steps */
      const s2 = this._section("Color Steps");

      if (steps.length === 0) {
        s2.append(this._empty("No color steps — default theme colors are used"));
      }

      steps.forEach((step, i) => {
        const row = document.createElement("div");
        row.className = "color-row";

        const swatch = document.createElement("div");
        swatch.className = "color-swatch";
        swatch.style.background = step.color || "#888";

        const picker = document.createElement("input");
        picker.type = "color";
        picker.className = "color-picker";
        picker.title = "Pick color";
        try { if (/^#[0-9a-f]{6}$/i.test(step.color)) picker.value = step.color; } catch (_) {}
        picker.oninput = (e) => this._updateColorStep(i, "color", e.target.value);

        const hex = document.createElement("input");
        hex.type = "text";
        hex.className = "color-text";
        hex.value = step.color || "";
        hex.placeholder = "#rrggbb or red";
        hex.onchange = (e) => this._updateColorStep(i, "color", e.target.value);

        row.append(swatch, picker, hex);

        if (!isGrad) {
          const thresh = document.createElement("input");
          thresh.type = "number";
          thresh.className = "color-threshold";
          thresh.min = "0"; thresh.max = "100";
          thresh.value = step.value !== undefined ? step.value : "";
          thresh.placeholder = "Threshold %";
          thresh.onchange = (e) => this._updateColorStep(i, "value", e.target.value !== "" ? parseInt(e.target.value) : undefined);
          row.append(thresh);
        }

        const del = this._delBtn(() => {
          const st = this._colorSteps();
          st.splice(i, 1);
          const newSteps = isGrad ? st.map((s) => s.color) : st;
          this._set("colors", { ...colors, steps: newSteps });
        });
        row.append(del);
        s2.append(row);
      });

      const addBtn = this._addBtn("+ Add Color Step", () => {
        const st = this._colorSteps();
        if (isGrad) {
          const newSteps = [...st.map((s) => s.color), "#00ff00"];
          this._set("colors", { ...colors, steps: newSteps });
        } else {
          st.push({ value: 100, color: "#00ff00" });
          this._set("colors", { ...colors, steps: st });
        }
      });
      s2.append(addBtn);

      if (steps.length > 0) {
        const resetBtn = this._addBtn("↩ Reset to Defaults", () => this._set("colors", undefined), true);
        s2.append(resetBtn);
      }

      frag.append(s2);
      return frag;
    }

    _updateColorStep(i, field, value) {
      const colors  = this._cfg.colors || { steps: [] };
      const isGrad  = this._isGradient();
      const steps   = this._colorSteps();
      steps[i]      = { ...steps[i], [field]: value };
      const newSteps = isGrad ? steps.map((s) => s.color) : steps;
      this._set("colors", { ...colors, steps: newSteps });
    }

    /* ═══════════════════════════════════════════════════════════════════════
     *  TAB: ENTITIES
     * ═══════════════════════════════════════════════════════════════════════ */

    _tabEntities() {
      const frag = document.createDocumentFragment();
      const entities = this._entities();

      const s = this._section(`Entity List (${entities.length})`);
      s.append(this._info(
        "Add entities here for full per-entity control. " +
        "Use the <strong>Filters</strong> tab to auto-include by device class — " +
        "no need to list them all manually."
      ));

      if (entities.length === 0) {
        s.append(this._empty("No entities added. Tap + to add one, or use Filters to auto-populate."));
      }

      entities.forEach((entity, i) => {
        s.append(this._entityCard(entity, i, entities));
      });

      s.append(this._addBtn("+ Add Entity", () => {
        const ents = this._entities();
        ents.push({ entity: "" });
        this._set("entities", ents);
        this._expandedEntity = ents.length - 1;
      }));

      frag.append(s);
      return frag;
    }

    _entityCard(entity, i, allEntities) {
      const isOpen = this._expandedEntity === i;

      const card = document.createElement("div");
      card.className = "entity-card";

      /* Header */
      const header = document.createElement("div");
      header.className = "entity-header";

      const icon = document.createElement("div");
      icon.className = "entity-icon";
      icon.textContent = "🔋";

      const nameWrap = document.createElement("div");
      nameWrap.style.flex = "1";
      nameWrap.style.minWidth = "0";

      const nameEl = document.createElement("div");
      nameEl.className = "entity-name";
      nameEl.textContent = entity.name || entity.entity || "New Entity";

      nameWrap.append(nameEl);

      if (entity.entity && entity.name) {
        const idEl = document.createElement("div");
        idEl.className = "entity-id-small";
        idEl.textContent = entity.entity;
        nameWrap.append(idEl);
      }

      const chevron = document.createElement("div");
      chevron.className = "entity-chevron";
      chevron.textContent = isOpen ? "▲" : "▼";

      const del = this._delBtn((e) => {
        e.stopPropagation();
        const ents = this._entities();
        ents.splice(i, 1);
        if (this._expandedEntity === i) this._expandedEntity = null;
        else if (this._expandedEntity > i) this._expandedEntity--;
        this._set("entities", ents);
      });

      header.append(icon, nameWrap, chevron, del);
      header.onclick = () => {
        this._expandedEntity = isOpen ? null : i;
        this._render();
      };

      card.append(header);

      if (!isOpen) return card;

      /* Body */
      const body = document.createElement("div");
      body.className = "entity-body";

      const upd = (field, val) => {
        const ents = this._entities();
        if (val === "" || val === undefined) delete ents[i][field];
        else ents[i][field] = val;
        this._set("entities", ents);
      };

      body.append(
        this._text("Entity ID *", entity.entity || "", (v) => upd("entity", v), "sensor.my_device_battery"),
        this._grid2(
          this._text("Display Name", entity.name || "", (v) => upd("name", v), "Override entity name"),
          this._text("Icon Override", entity.icon || "", (v) => upd("icon", v), "mdi:battery")
        ),
        this._grid2(
          this._text("Attribute (value source)", entity.attribute || "", (v) => upd("attribute", v), "battery_level", "Override which attribute holds the battery %"),
          this._num("Multiplier", entity.multiplier || "", (v) => upd("multiplier", v ? parseFloat(v) : undefined), "1", "Use 10 if sensor reports 0–10 range")
        ),
        this._grid2(
          this._text("Secondary Info", entity.secondary_info || "", (v) => upd("secondary_info", v), "{last_changed}"),
          this._text("Value Override", entity.value_override || "", (v) => upd("value_override", v), "{state|abs()}")
        ),
        this._grid2(
          this._text("Unit", entity.unit || "", (v) => upd("unit", v), "% (inherits card default)"),
          this._num("Round", entity.round !== undefined ? entity.round : "", (v) => upd("round", v !== "" ? parseInt(v) : undefined), "decimal places")
        ),
        this._toggle(
          "Non-battery entity (disables auto attribute detection)",
          entity.non_battery_entity || false,
          (v) => upd("non_battery_entity", v || undefined)
        ),
        this._toggle(
          "Disable HA default state formatting",
          entity.default_state_formatting === false,
          (v) => upd("default_state_formatting", v ? false : undefined)
        )
      );

      /* Tap action */
      const tapTitle = document.createElement("div");
      tapTitle.className = "sub-title";
      tapTitle.textContent = "Tap Action";
      body.append(tapTitle, this._tapActionEditor(entity.tap_action, (v) => upd("tap_action", v)));

      /* Charging state */
      const chTitle = document.createElement("div");
      chTitle.className = "sub-title";
      chTitle.textContent = "Charging State";
      body.append(chTitle, this._chargingEditor(entity.charging_state, (v) => upd("charging_state", v)));

      /* State map */
      const smTitle = document.createElement("div");
      smTitle.className = "sub-title";
      smTitle.textContent = "State Map (non-numeric values)";
      body.append(smTitle, this._stateMapEditor(entity.state_map || [], (v) => upd("state_map", v)));

      card.append(body);
      return card;
    }

    /* ═══════════════════════════════════════════════════════════════════════
     *  TAB: FILTERS
     * ═══════════════════════════════════════════════════════════════════════ */

    _tabFilters() {
      const frag = document.createDocumentFragment();
      const filter = this._filter();
      const include = filter.include || [];
      const exclude = filter.exclude || [];
      const br = this._bulkRename();

      /* Include */
      const s1 = this._section(`Auto-Include Filters (${include.length})`);
      s1.append(this._info(
        "Entities matching <strong>any</strong> include filter are added to the card automatically. " +
        "Most common: <code>attributes.device_class = battery</code>"
      ));
      if (include.length === 0) {
        s1.append(this._empty("No include filters — add entities manually in the Entities tab."));
      }
      include.forEach((f, i) => {
        s1.append(this._filterRow(f, i, "include", filter));
      });
      s1.append(this._addBtn("+ Add Include Filter", () => {
        const arr = [...include, { name: "attributes.device_class", value: "battery" }];
        this._set("filter", { ...filter, include: arr });
      }));
      frag.append(s1);

      /* Exclude */
      const s2 = this._section(`Exclude Filters (${exclude.length})`);
      s2.append(this._info(
        "Entities matching <strong>any</strong> exclude filter are removed from the list. " +
        "Common use: exclude <code>entity_id matches binary_sensor.*</code>"
      ));
      if (exclude.length === 0) {
        s2.append(this._empty("No exclude filters."));
      }
      exclude.forEach((f, i) => {
        s2.append(this._filterRow(f, i, "exclude", filter));
      });
      s2.append(this._addBtn("+ Add Exclude Filter", () => {
        const arr = [...exclude, { name: "entity_id", value: "binary_sensor.*", operator: "matches" }];
        this._set("filter", { ...filter, exclude: arr });
      }));
      frag.append(s2);

      /* Bulk rename */
      const s3 = this._section(`Bulk Rename Rules (${(br.rules || []).length})`);
      s3.append(this._info(
        "Strip or replace common suffixes from all entity names. " +
        "E.g. a rule <code>from: \" Battery Level\"</code> removes that suffix from every name."
      ));
      s3.append(
        this._toggle(
          "Capitalize first letter of entity names",
          br.capitalize_first !== false,
          (v) => { this._set("bulk_rename", { ...br, capitalize_first: v }); }
        )
      );

      if ((br.rules || []).length === 0) {
        s3.append(this._empty("No rename rules."));
      }

      (br.rules || []).forEach((rule, i) => {
        const row = document.createElement("div");
        row.className = "inline-row";

        const fromCol = this._inlineCol("From (string or /regex/)", rule.from || "", (v) => {
          const rules = [...(br.rules || [])];
          rules[i] = { ...rules[i], from: v };
          this._set("bulk_rename", { ...br, rules });
        }, '" Battery Level"');

        const toCol = this._inlineCol("To (blank = delete)", rule.to || "", (v) => {
          const rules = [...(br.rules || [])];
          rules[i] = { ...rules[i], to: v };
          this._set("bulk_rename", { ...br, rules });
        }, "(empty)");

        row.append(fromCol, toCol, this._delBtn(() => {
          const rules = [...(br.rules || [])];
          rules.splice(i, 1);
          this._set("bulk_rename", { ...br, rules });
        }));
        s3.append(row);
      });

      s3.append(this._addBtn("+ Add Rename Rule", () => {
        const rules = [...(br.rules || []), { from: "" }];
        this._set("bulk_rename", { ...br, rules });
      }));
      frag.append(s3);

      return frag;
    }

    _filterRow(filter, i, type, currentFilter) {
      const arr = currentFilter[type] || [];
      const hasValue = filter.operator !== "exists" && filter.operator !== "not_exists";

      const row = document.createElement("div");
      row.className = "inline-row";

      const propCol = this._inlineCol("Property", filter.name || "", (v) => {
        const a = [...arr]; a[i] = { ...a[i], name: v };
        this._set("filter", { ...currentFilter, [type]: a });
      }, "e.g. attributes.device_class");

      const opCol = document.createElement("div");
      opCol.className = "inline-col";
      const opLabel = document.createElement("label");
      opLabel.textContent = "Operator";
      const opSel = document.createElement("select");
      [
        ["",          "= (equals, default)"],
        ["=",         "="],
        [">",         ">"],
        [">=",        ">="],
        ["<",         "<"],
        ["<=",        "<="],
        ["exists",    "exists"],
        ["not_exists","not_exists"],
        ["contains",  "contains"],
        ["matches",   "matches (wildcard/regex)"],
      ].forEach(([val, label]) => {
        const opt = document.createElement("option");
        opt.value = val; opt.textContent = label;
        opt.selected = (filter.operator || "") === val;
        opSel.append(opt);
      });
      opSel.onchange = (e) => {
        const a = [...arr];
        a[i] = { ...a[i], operator: e.target.value || undefined };
        this._set("filter", { ...currentFilter, [type]: a });
        // re-render to show/hide value column
      };
      opCol.append(opLabel, opSel);

      row.append(propCol, opCol);

      if (hasValue) {
        const valCol = this._inlineCol("Value", filter.value !== undefined ? filter.value : "", (v) => {
          const a = [...arr]; a[i] = { ...a[i], value: v };
          this._set("filter", { ...currentFilter, [type]: a });
        }, "e.g. battery or *_level");
        row.append(valCol);
      }

      row.append(this._delBtn(() => {
        const a = [...arr]; a.splice(i, 1);
        this._set("filter", { ...currentFilter, [type]: a });
      }));

      return row;
    }

    /* ═══════════════════════════════════════════════════════════════════════
     *  TAB: ADVANCED
     * ═══════════════════════════════════════════════════════════════════════ */

    _tabAdvanced() {
      const frag = document.createDocumentFragment();
      const cfg = this._cfg;

      /* Charging state */
      const s1 = this._section("Charging State (Card Default)");
      s1.append(
        this._info("Applies to all entities unless overridden per-entity."),
        this._chargingEditor(cfg.charging_state, (v) => this._set("charging_state", v))
      );
      frag.append(s1);

      /* State map */
      const s2 = this._section("State Map (Card Default)");
      s2.append(
        this._info("Map non-numeric entity states to numeric battery levels for all entities."),
        this._stateMapEditor(cfg.state_map || [], (v) => this._set("state_map", v))
      );
      frag.append(s2);

      /* Value override */
      const s3 = this._section("Value Override (Card Default)");
      s3.append(
        this._text(
          "Value Override (KString)",
          cfg.value_override || "",
          (v) => this._set("value_override", v),
          "{state|abs()}",
          "Applied to all entities. Useful for signal sensors: {state|abs()}"
        )
      );
      frag.append(s3);

      /* Debug */
      const s4 = this._section("Debug");
      s4.append(
        this._toggle(
          "Enable debug output for all entities",
          cfg.debug === true,
          (v) => this._set("debug", v ? true : undefined)
        ),
        this._text(
          "Debug single entity ID",
          typeof cfg.debug === "string" ? cfg.debug : "",
          (v) => this._set("debug", v || undefined),
          "sensor.my_device_battery",
          "Overrides the toggle above"
        ),
        this._toggle(
          "Disable HA default state formatting (card-wide)",
          cfg.default_state_formatting === false,
          (v) => this._set("default_state_formatting", v ? false : undefined)
        )
      );
      frag.append(s4);

      return frag;
    }

    /* ═══════════════════════════════════════════════════════════════════════
     *  SHARED SUB-EDITORS
     * ═══════════════════════════════════════════════════════════════════════ */

    _tapActionEditor(tapAction, onChange) {
      const ta = !tapAction
        ? { action: "more-info" }
        : typeof tapAction === "string"
          ? { action: tapAction }
          : deepClone(tapAction);

      const action = ta.action || "more-info";

      const wrap = document.createElement("div");
      wrap.className = "tap-section";

      wrap.append(
        this._select("Action", action, [
          { value: "more-info",    label: "More Info (default)" },
          { value: "navigate",    label: "Navigate to path" },
          { value: "url",         label: "Open URL" },
          { value: "call-service",label: "Call Service" },
          { value: "none",        label: "No action" },
        ], (v) => { onChange({ ...ta, action: v }); })
      );

      if (action === "navigate") {
        wrap.append(this._text("Navigation Path", ta.navigation_path || "", (v) => onChange({ ...ta, navigation_path: v }), "/lovelace/0"));
      }
      if (action === "url") {
        wrap.append(this._text("URL", ta.url_path || "", (v) => onChange({ ...ta, url_path: v }), "https://example.com"));
      }
      if (action === "call-service") {
        wrap.append(
          this._text("Service", ta.service || "", (v) => onChange({ ...ta, service: v }), "notify.pushover"),
          this._textarea("Service Data (JSON)", ta.service_data ? JSON.stringify(ta.service_data, null, 2) : "", (v) => {
            try { onChange({ ...ta, service_data: JSON.parse(v) }); } catch (_) {}
          }, '{"message": "Low battery!"}')
        );
      }

      return wrap;
    }

    _chargingEditor(cs, onChange) {
      const cur = cs ? deepClone(cs) : {};

      const wrap = document.createElement("div");
      wrap.className = "charge-section";

      wrap.append(
        this._text(
          "Charging Entity ID",
          cur.entity_id || "",
          (v) => onChange({ ...cur, entity_id: v || undefined }),
          "binary_sensor.device_charging",
          "Alternate entity whose state indicates charging"
        ),
        this._text(
          "Charging States (comma-separated)",
          (cur.state || []).join(", "),
          (v) => onChange({ ...cur, state: v ? v.split(",").map((s) => s.trim()) : undefined }),
          "charging, Charging, on"
        ),
        this._grid2(
          this._text("Charging Icon", cur.icon || "", (v) => onChange({ ...cur, icon: v || undefined }), "mdi:flash"),
          this._text("Icon Color", cur.color || "", (v) => onChange({ ...cur, color: v || undefined }), "yellow or #ffff00")
        ),
        this._text(
          "Secondary Info Text (when charging)",
          cur.secondary_info_text || "",
          (v) => onChange({ ...cur, secondary_info_text: v || undefined }),
          "Charging in progress",
          'Shown when secondary_info: "{charging}" is set'
        )
      );

      /* Attribute checks */
      const attrHead = document.createElement("div");
      attrHead.style.cssText = "font-size:11px;font-weight:600;color:var(--editor-secondary);margin:12px 0 6px;text-transform:uppercase;letter-spacing:.06em;";
      attrHead.textContent = "Charging Attribute Checks";
      wrap.append(attrHead);

      (cur.attribute || []).forEach((attr, i) => {
        const row = document.createElement("div");
        row.className = "inline-row";
        row.append(
          this._inlineCol("Attribute Name", attr.name || "", (v) => {
            const attrs = [...(cur.attribute || [])];
            attrs[i] = { ...attrs[i], name: v };
            onChange({ ...cur, attribute: attrs });
          }, "is_charging"),
          this._inlineCol("Attribute Value", attr.value || "", (v) => {
            const attrs = [...(cur.attribute || [])];
            attrs[i] = { ...attrs[i], value: v };
            onChange({ ...cur, attribute: attrs });
          }, "true or yes"),
          this._delBtn(() => {
            const attrs = [...(cur.attribute || [])];
            attrs.splice(i, 1);
            onChange({ ...cur, attribute: attrs.length ? attrs : undefined });
          })
        );
        wrap.append(row);
      });

      wrap.append(
        this._addBtn("+ Add Attribute Check", () => {
          const attrs = [...(cur.attribute || []), { name: "", value: "" }];
          onChange({ ...cur, attribute: attrs });
        })
      );

      if (cs) {
        wrap.append(
          this._addBtn("↩ Clear Charging Config", () => onChange(undefined), true)
        );
      }

      return wrap;
    }

    _stateMapEditor(stateMap, onChange) {
      const wrap = document.createElement("div");

      if (stateMap.length === 0) {
        wrap.append(this._empty("No state mappings. Add one to map non-numeric states."));
      }

      stateMap.forEach((rule, i) => {
        const row = document.createElement("div");
        row.className = "inline-row";
        row.append(
          this._inlineCol("Entity State (from)", rule.from !== undefined ? rule.from : "", (v) => {
            const sm = [...stateMap]; sm[i] = { ...sm[i], from: v }; onChange(sm);
          }, "on"),
          this._inlineCol("Battery % (to)", rule.to !== undefined ? rule.to : "", (v) => {
            const sm = [...stateMap]; sm[i] = { ...sm[i], to: v ? parseFloat(v) : undefined }; onChange(sm);
          }, "100"),
          this._inlineCol("Display Text", rule.display || "", (v) => {
            const sm = [...stateMap]; sm[i] = { ...sm[i], display: v || undefined }; onChange(sm);
          }, "Full"),
          this._delBtn(() => {
            const sm = [...stateMap]; sm.splice(i, 1); onChange(sm.length ? sm : undefined);
          })
        );
        wrap.append(row);
      });

      wrap.append(
        this._addBtn("+ Add State Mapping", () => onChange([...stateMap, { from: "on", to: 100 }]))
      );

      return wrap;
    }

    /* ═══════════════════════════════════════════════════════════════════════
     *  DOM HELPERS
     * ═══════════════════════════════════════════════════════════════════════ */

    _section(title) {
      const el = document.createElement("div");
      el.className = "section";
      const t = document.createElement("div");
      t.className = "section-title";
      t.textContent = title;
      el.append(t);
      return el;
    }

    _info(html) {
      const el = document.createElement("div");
      el.className = "info-block";
      el.innerHTML = html;
      return el;
    }

    _empty(msg) {
      const el = document.createElement("div");
      el.className = "empty";
      el.textContent = msg;
      return el;
    }

    _field(label, input, hint) {
      const wrap = document.createElement("div");
      wrap.className = "field";
      if (label) {
        const lbl = document.createElement("label");
        lbl.textContent = label;
        wrap.append(lbl);
      }
      wrap.append(input);
      if (hint) {
        const h = document.createElement("span");
        h.className = "hint";
        h.textContent = hint;
        wrap.append(h);
      }
      return wrap;
    }

    _text(label, value, onChange, placeholder, hint) {
      const input = document.createElement("input");
      input.type = "text";
      input.value = value;
      if (placeholder) input.placeholder = placeholder;
      input.onchange = (e) => onChange(e.target.value);
      return this._field(label, input, hint);
    }

    _num(label, value, onChange, placeholder, hint) {
      const input = document.createElement("input");
      input.type = "number";
      input.value = value;
      if (placeholder) input.placeholder = placeholder;
      input.step = "any";
      input.onchange = (e) => onChange(e.target.value);
      return this._field(label, input, hint);
    }

    _textarea(label, value, onChange, placeholder) {
      const ta = document.createElement("textarea");
      ta.value = value;
      if (placeholder) ta.placeholder = placeholder;
      ta.onchange = (e) => onChange(e.target.value);
      return this._field(label, ta);
    }

    _select(label, value, options, onChange) {
      const sel = document.createElement("select");
      options.forEach(({ value: v, label: l }) => {
        const opt = document.createElement("option");
        opt.value = v; opt.textContent = l;
        opt.selected = value === v;
        sel.append(opt);
      });
      sel.onchange = (e) => onChange(e.target.value);
      return this._field(label, sel);
    }

    _toggle(label, checked, onChange, hint) {
      const wrap = document.createElement("div");
      wrap.className = "field toggle-row";

      const labelWrap = document.createElement("div");
      const labelEl = document.createElement("div");
      labelEl.className = "toggle-label";
      labelEl.textContent = label;
      labelWrap.append(labelEl);
      if (hint) {
        const h = document.createElement("div");
        h.className = "toggle-hint";
        h.textContent = hint;
        labelWrap.append(h);
      }

      const sw = document.createElement("label");
      sw.className = "switch";
      const input = document.createElement("input");
      input.type = "checkbox";
      input.checked = checked;
      input.onchange = (e) => onChange(e.target.checked);
      const slider = document.createElement("span");
      slider.className = "slider";
      sw.append(input, slider);

      wrap.append(labelWrap, sw);
      return wrap;
    }

    _grid2(...children) {
      const grid = document.createElement("div");
      grid.className = "grid-2";
      children.forEach((c) => grid.append(c));
      return grid;
    }

    _inlineCol(label, value, onChange, placeholder) {
      const col = document.createElement("div");
      col.className = "inline-col";
      const lbl = document.createElement("label");
      lbl.textContent = label;
      const input = document.createElement("input");
      input.type = "text";
      input.value = value;
      if (placeholder) input.placeholder = placeholder;
      input.onchange = (e) => onChange(e.target.value);
      col.append(lbl, input);
      return col;
    }

    _addBtn(text, onClick, secondary = false) {
      const btn = document.createElement("button");
      btn.className = "btn-add" + (secondary ? " secondary" : "");
      btn.textContent = text;
      btn.onclick = onClick;
      return btn;
    }

    _delBtn(onClick) {
      const btn = document.createElement("button");
      btn.className = "btn-icon";
      btn.title = "Remove";
      btn.textContent = "✕";
      btn.onclick = onClick;
      return btn;
    }
  }

  /* ═══════════════════════════════════════════════════════════════════════════
   *  REGISTER EDITOR ELEMENT
   * ═══════════════════════════════════════════════════════════════════════════ */

  if (!customElements.get("battery-state-card-editor")) {
    customElements.define("battery-state-card-editor", BatteryStateCardEditor);
  }

  /* ═══════════════════════════════════════════════════════════════════════════
   *  PATCH CARD CLASSES
   *  We wait for the card elements to be defined (in case this script runs
   *  before battery-state-card.js finishes executing), then attach
   *  getConfigElement() and getStubConfig() to enable the HA visual editor.
   * ═══════════════════════════════════════════════════════════════════════════ */

  const STUB_CONFIG = {
    type: "custom:battery-state-card",
    secondary_info: "{last_changed}",
    filter: {
      include: [{ name: "attributes.device_class", value: "battery" }],
      exclude: [{ name: "entity_id", value: "binary_sensor.*", operator: "matches" }],
    },
    sort: { by: "state" },
    collapse: 8,
    bulk_rename: {
      rules: [{ from: " Battery" }, { from: " level" }],
      capitalize_first: true,
    },
    colors: {
      steps: ["#ff0000", "#ffff00", "#00ff00"],
      gradient: true,
    },
  };

  function patchCard(tagName) {
    const CardClass = customElements.get(tagName);
    if (!CardClass) {
      customElements.whenDefined(tagName).then(() => patchCard(tagName));
      return;
    }
    if (CardClass.getConfigElement) return; // already patched

    CardClass.getConfigElement = () =>
      document.createElement("battery-state-card-editor");

    CardClass.getStubConfig = () => ({ ...STUB_CONFIG, type: `custom:${tagName}` });

    console.info(
      `%c battery-state-card-editor %c patched ${tagName} ✓ `,
      "background:#1d4ed8;color:#fff;font-weight:bold;padding:2px 8px;border-radius:4px 0 0 4px",
      "background:#3b82f6;color:#fff;padding:2px 8px;border-radius:0 4px 4px 0"
    );
  }

  ["battery-state-card", "battery-state-entity"].forEach(patchCard);

  /* ── Register in window.customCards for HA card picker ─────────────────── */
  window.customCards = window.customCards || [];
  const alreadyRegistered = window.customCards.some(
    (c) => c.type === "battery-state-card"
  );
  if (!alreadyRegistered) {
    window.customCards.push({
      type: "battery-state-card",
      name: "Battery State Card",
      description:
        "Displays battery levels of all connected devices — with full Visual Editor support.",
      preview: true,
    });
  }

  console.info(
    `%c battery-state-card-editor %c v${VERSION} loaded `,
    "background:#1d4ed8;color:#fff;font-weight:bold;padding:2px 8px;border-radius:4px 0 0 4px",
    "background:#22c55e;color:#fff;padding:2px 8px;border-radius:0 4px 4px 0"
  );
})();
