/**
 * ─────────────────────────────────────────────────────────────────────────────
 * battery-state-card-editor.js
 * Visual Editor for battery-state-card (fork)
 *
 * This file is appended to the official battery-state-card.js to add full
 * UI editing for every documented config option. No build step required.
 * ─────────────────────────────────────────────────────────────────────────────
 */

(function () {
  "use strict";

  // ── CSS ─────────────────────────────────────────────────────────────────────

  const EDITOR_STYLES = `
    :host {
      display: block;
      font-family: var(--primary-font-family, Roboto, sans-serif);
      font-size: 14px;
      color: var(--primary-text-color);
    }
    /* Tabs */
    .tabs {
      display: flex;
      border-bottom: 2px solid var(--divider-color, #e0e0e0);
      margin-bottom: 14px;
      overflow-x: auto;
      gap: 2px;
    }
    .tab {
      display: flex;
      align-items: center;
      gap: 5px;
      padding: 8px 14px;
      border: none;
      background: none;
      cursor: pointer;
      color: var(--secondary-text-color);
      border-bottom: 3px solid transparent;
      margin-bottom: -2px;
      white-space: nowrap;
      font-size: 13px;
      font-weight: 500;
      transition: color .15s, border-color .15s;
      border-radius: 4px 4px 0 0;
    }
    .tab:hover { color: var(--primary-text-color); background: var(--secondary-background-color, #f5f5f5); }
    .tab.active { color: var(--primary-color); border-bottom-color: var(--primary-color); background: transparent; }

    /* Sections */
    .section {
      background: var(--card-background-color, #fff);
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 8px;
      padding: 14px 16px;
      margin-bottom: 12px;
    }
    .section-title {
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.07em;
      color: var(--secondary-text-color);
      margin-bottom: 12px;
    }
    .subsection-title {
      font-size: 11px;
      font-weight: 600;
      color: var(--secondary-text-color);
      margin: 14px 0 6px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      padding-top: 10px;
      border-top: 1px solid var(--divider-color, #e0e0e0);
    }

    /* Fields */
    .field { margin-bottom: 10px; }
    .field label {
      display: block;
      font-size: 12px;
      font-weight: 500;
      color: var(--secondary-text-color);
      margin-bottom: 4px;
    }
    .field input[type="text"],
    .field input[type="number"],
    .field select,
    .field textarea {
      width: 100%;
      box-sizing: border-box;
      padding: 8px 10px;
      border: 1px solid var(--divider-color, #ccc);
      border-radius: 6px;
      background: var(--secondary-background-color, #f5f5f5);
      color: var(--primary-text-color);
      font-size: 14px;
      font-family: inherit;
    }
    .field input:focus, .field select:focus, .field textarea:focus {
      outline: none;
      border-color: var(--primary-color);
      box-shadow: 0 0 0 2px rgba(3,169,244,.15);
    }
    .field textarea { resize: vertical; font-family: monospace; min-height: 60px; }
    .hint {
      font-size: 11px;
      color: var(--secondary-text-color);
      margin-top: 3px;
      display: block;
      line-height: 1.4;
    }
    .hint code {
      background: var(--divider-color, #e0e0e0);
      padding: 1px 4px;
      border-radius: 3px;
      font-family: monospace;
    }
    .hint-block {
      font-size: 12px;
      color: var(--secondary-text-color);
      margin: 0 0 12px;
      padding: 8px 10px;
      background: var(--secondary-background-color, #f5f5f5);
      border-radius: 5px;
      line-height: 1.5;
    }

    /* Toggle row */
    .toggle-row { display: flex; align-items: center; justify-content: space-between; }
    .toggle-row label:first-child { margin-bottom: 0; flex: 1; }

    /* Toggle switch */
    .switch { position: relative; display: inline-block; width: 40px; height: 22px; flex-shrink: 0; }
    .switch input { opacity: 0; width: 0; height: 0; }
    .slider { position: absolute; cursor: pointer; inset: 0; background: var(--disabled-text-color, #ccc); border-radius: 22px; transition: .3s; }
    .slider::before { content: ""; position: absolute; width: 16px; height: 16px; left: 3px; bottom: 3px; background: white; border-radius: 50%; transition: .3s; }
    input:checked + .slider { background: var(--primary-color, #03a9f4); }
    input:checked + .slider::before { transform: translateX(18px); }

    /* Buttons */
    .add-btn {
      display: inline-flex; align-items: center; gap: 4px;
      padding: 6px 14px;
      border: 1px dashed var(--primary-color);
      background: none; color: var(--primary-color);
      border-radius: 6px; cursor: pointer;
      font-size: 13px; font-weight: 500; margin-top: 6px;
      transition: background .15s, color .15s;
    }
    .add-btn:hover { background: var(--primary-color); color: white; }
    .add-btn.secondary { border-color: var(--secondary-text-color); color: var(--secondary-text-color); }
    .add-btn.secondary:hover { background: var(--secondary-text-color); color: white; }
    .add-btn + .add-btn { margin-left: 8px; }

    .del-btn {
      border: none; background: none; cursor: pointer; padding: 4px 6px;
      border-radius: 4px; color: var(--secondary-text-color);
      display: inline-flex; align-items: center; font-size: 16px;
      line-height: 1; transition: color .15s;
    }
    .del-btn:hover { color: var(--error-color, #f44336); }

    /* Entity rows */
    .entity-row { border: 1px solid var(--divider-color, #e0e0e0); border-radius: 6px; margin-bottom: 8px; overflow: hidden; }
    .entity-header {
      display: flex; align-items: center; gap: 8px; padding: 10px 12px;
      cursor: pointer; background: var(--secondary-background-color, #f5f5f5); user-select: none;
    }
    .entity-header:hover { background: var(--divider-color, #e8e8e8); }
    .entity-label { flex: 1; font-size: 13px; font-weight: 500; }
    .entity-body { padding: 12px; border-top: 1px solid var(--divider-color, #e0e0e0); }

    /* Color steps */
    .color-row { display: flex; align-items: center; gap: 8px; margin-bottom: 8px; }
    .color-swatch { width: 28px; height: 28px; border-radius: 4px; border: 1px solid var(--divider-color, #ccc); flex-shrink: 0; }
    .color-row input[type="color"] { width: 36px; height: 28px; padding: 2px; border: 1px solid var(--divider-color, #ccc); border-radius: 4px; cursor: pointer; background: none; flex-shrink: 0; }
    .color-row input[type="text"] { flex: 2; padding: 6px 8px; border: 1px solid var(--divider-color, #ccc); border-radius: 4px; background: var(--secondary-background-color, #f5f5f5); color: var(--primary-text-color); font-size: 13px; }
    .color-row input[type="number"] { width: 90px; flex-shrink: 0; padding: 6px 8px; border: 1px solid var(--divider-color, #ccc); border-radius: 4px; background: var(--secondary-background-color, #f5f5f5); color: var(--primary-text-color); font-size: 13px; }

    /* Inline rows */
    .inline-row { display: flex; align-items: flex-end; gap: 8px; margin-bottom: 8px; flex-wrap: wrap; }
    .inline-field { display: flex; flex-direction: column; flex: 1; min-width: 80px; }
    .inline-field label { font-size: 11px; color: var(--secondary-text-color); margin-bottom: 2px; }
    .inline-field input, .inline-field select {
      padding: 6px 8px; border: 1px solid var(--divider-color, #ccc); border-radius: 4px;
      background: var(--secondary-background-color, #f5f5f5); color: var(--primary-text-color);
      font-size: 13px; width: 100%; box-sizing: border-box;
    }

    .empty-note {
      text-align: center; color: var(--secondary-text-color); font-size: 13px;
      padding: 14px; border: 1px dashed var(--divider-color, #ccc);
      border-radius: 6px; margin-bottom: 8px;
    }
  `;

  // ── Helper: fire config-changed event ───────────────────────────────────────

  function fireConfigChanged(element, config) {
    element.dispatchEvent(new CustomEvent("config-changed", {
      detail: { config },
      bubbles: true,
      composed: true,
    }));
  }

  function deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  // ── Editor Element ──────────────────────────────────────────────────────────

  class BatteryStateCardEditor extends HTMLElement {
    constructor() {
      super();
      this._config = {};
      this._activeTab = "general";
      this._expandedEntity = null;
      this._shadow = this.attachShadow({ mode: "open" });
    }

    set hass(hass) {
      this._hass = hass;
    }

    setConfig(config) {
      this._config = deepClone(config);
      this._render();
    }

    connectedCallback() {
      this._render();
    }

    // ── Main render ──────────────────────────────────────────────────────────

    _render() {
      if (!this._shadow) return;

      const style = document.createElement("style");
      style.textContent = EDITOR_STYLES;

      const root = document.createElement("div");
      root.className = "editor-root";

      // Tabs
      const tabsEl = this._renderTabs();
      root.appendChild(tabsEl);

      // Tab content
      const content = document.createElement("div");
      content.className = "tab-content";

      switch (this._activeTab) {
        case "general":  content.appendChild(this._renderGeneral());  break;
        case "colors":   content.appendChild(this._renderColors());   break;
        case "entities": content.appendChild(this._renderEntities()); break;
        case "filters":  content.appendChild(this._renderFilters());  break;
        case "advanced": content.appendChild(this._renderAdvanced()); break;
      }

      root.appendChild(content);

      this._shadow.innerHTML = "";
      this._shadow.appendChild(style);
      this._shadow.appendChild(root);
    }

    _renderTabs() {
      const tabs = [
        { id: "general",  label: "General",  icon: "⚙" },
        { id: "colors",   label: "Colors",   icon: "🎨" },
        { id: "entities", label: "Entities", icon: "📋" },
        { id: "filters",  label: "Filters",  icon: "🔍" },
        { id: "advanced", label: "Advanced", icon: "🔧" },
      ];

      const el = document.createElement("div");
      el.className = "tabs";

      tabs.forEach(t => {
        const btn = document.createElement("button");
        btn.className = "tab" + (this._activeTab === t.id ? " active" : "");
        btn.innerHTML = `<span>${t.icon}</span><span>${t.label}</span>`;
        btn.addEventListener("click", () => {
          this._activeTab = t.id;
          this._render();
        });
        el.appendChild(btn);
      });

      return el;
    }

    // ── General Tab ──────────────────────────────────────────────────────────

    _renderGeneral() {
      const frag = document.createDocumentFragment();
      const cfg = this._config;

      // Card settings section
      const s1 = this._section("Card Settings");

      s1.appendChild(this._textField("Card Title", cfg.title || "", val => {
        this._update("title", val);
      }, "e.g. Battery levels"));

      s1.appendChild(this._textField("Secondary Info", cfg.secondary_info || "", val => {
        this._update("secondary_info", val);
      }, "{last_changed}", "Keywords: {last_changed}, {last_updated}, {charging}, {attributes.x}, etc."));

      s1.appendChild(this._numberField("Collapse (show N, rest expandable)", cfg.collapse || "", val => {
        this._update("collapse", val ? parseInt(val) : undefined);
      }, "e.g. 8"));

      s1.appendChild(this._textField("Unit Override", cfg.unit || "", val => {
        this._update("unit", val);
      }, "% (default)"));

      s1.appendChild(this._numberField("Round (decimal digits)", cfg.round !== undefined ? cfg.round : "", val => {
        this._update("round", val !== "" ? parseInt(val) : undefined);
      }, "e.g. 0"));

      frag.appendChild(s1);

      // Sorting section
      const s2 = this._section("Sorting");
      const sortArr = this._getSortArray();
      const primary = sortArr[0] || {};

      const sortByEl = this._selectField("Sort By", primary.by || "", [
        { value: "", label: "— None —" },
        { value: "state", label: "Battery Level (state)" },
        { value: "name", label: "Name" },
        { value: "entity.last_changed", label: "Last Changed" },
        { value: "entity.last_updated", label: "Last Updated" },
      ], val => {
        if (!val) {
          this._update("sort", undefined);
        } else {
          const arr = [...sortArr];
          arr[0] = { ...(arr[0] || {}), by: val };
          this._update("sort", arr.length === 1 ? arr[0] : arr);
        }
      });
      s2.appendChild(sortByEl);

      if (sortArr.length > 0) {
        s2.appendChild(this._toggleRow("Descending order", primary.desc || false, val => {
          const arr = [...sortArr];
          arr[0] = { ...arr[0], desc: val };
          this._update("sort", arr.length === 1 ? arr[0] : arr);
        }));

        const secSortEl = this._selectField("Secondary Sort By", sortArr[1]?.by || "", [
          { value: "", label: "— None —" },
          { value: "state", label: "Battery Level (state)" },
          { value: "name", label: "Name" },
          { value: "entity.last_changed", label: "Last Changed" },
          { value: "entity.last_updated", label: "Last Updated" },
        ], val => {
          const arr = [...sortArr];
          if (!val) {
            this._update("sort", arr.length === 1 ? arr[0] : arr.slice(0, 1)[0]);
          } else {
            arr[1] = { by: val, desc: arr[1]?.desc || false };
            this._update("sort", arr);
          }
        });
        s2.appendChild(secSortEl);

        if (sortArr.length > 1) {
          s2.appendChild(this._toggleRow("Secondary: Descending", sortArr[1]?.desc || false, val => {
            const arr = [...sortArr];
            arr[1] = { ...arr[1], desc: val };
            this._update("sort", arr);
          }));
        }
      }

      frag.appendChild(s2);

      // Tap action section
      const s3 = this._section("Tap Action (Card Default)");
      s3.appendChild(this._renderTapActionEditor(
        cfg.tap_action,
        val => this._update("tap_action", val)
      ));
      frag.appendChild(s3);

      return frag;
    }

    // ── Colors Tab ───────────────────────────────────────────────────────────

    _renderColors() {
      const frag = document.createDocumentFragment();
      const colors = this._config.colors || { steps: [], gradient: false };
      const isGradient = colors.gradient || false;
      const steps = this._getColorSteps();

      const s1 = this._section("Color Mode");

      s1.appendChild(this._toggleRow("Gradient (smooth color transition)", isGradient, val => {
        this._update("colors", { ...colors, gradient: val });
      }));

      if (isGradient) {
        const hint = document.createElement("p");
        hint.className = "hint-block";
        hint.textContent = "Gradient requires hex colors (#rrggbb). Colors are spread evenly from 0% to 100%.";
        s1.appendChild(hint);
      }

      frag.appendChild(s1);

      const s2 = this._section("Color Steps");

      const hint2 = document.createElement("p");
      hint2.className = "hint-block";
      hint2.textContent = isGradient
        ? "Add 2+ hex colors from lowest to highest. They'll blend smoothly."
        : "Each step applies its color to battery levels ≤ the threshold. Default: red≤20, yellow≤55, green≤100.";
      s2.appendChild(hint2);

      if (steps.length === 0) {
        const empty = document.createElement("div");
        empty.className = "empty-note";
        empty.textContent = "No color steps defined — using default colors";
        s2.appendChild(empty);
      }

      steps.forEach((step, i) => {
        const row = document.createElement("div");
        row.className = "color-row";

        const swatch = document.createElement("div");
        swatch.className = "color-swatch";
        swatch.style.background = step.color || "#888";

        const picker = document.createElement("input");
        picker.type = "color";
        picker.title = "Pick color";
        if (step.color && step.color.startsWith("#")) picker.value = step.color;
        picker.addEventListener("input", e => {
          this._updateColorStep(i, "color", e.target.value);
        });

        const hexInput = document.createElement("input");
        hexInput.type = "text";
        hexInput.value = step.color || "";
        hexInput.placeholder = "#rrggbb or red";
        hexInput.addEventListener("change", e => {
          this._updateColorStep(i, "color", e.target.value);
        });

        row.appendChild(swatch);
        row.appendChild(picker);
        row.appendChild(hexInput);

        if (!isGradient) {
          const threshInput = document.createElement("input");
          threshInput.type = "number";
          threshInput.min = "0"; threshInput.max = "100";
          threshInput.value = step.value !== undefined ? step.value : "";
          threshInput.placeholder = "Threshold %";
          threshInput.addEventListener("change", e => {
            const val = e.target.value;
            this._updateColorStep(i, "value", val ? parseInt(val) : undefined);
          });
          row.appendChild(threshInput);
        }

        const delBtn = document.createElement("button");
        delBtn.className = "del-btn";
        delBtn.innerHTML = "✕";
        delBtn.title = "Remove";
        delBtn.addEventListener("click", () => this._removeColorStep(i));
        row.appendChild(delBtn);

        s2.appendChild(row);
      });

      const addBtn = document.createElement("button");
      addBtn.className = "add-btn";
      addBtn.innerHTML = "+ Add Color Step";
      addBtn.addEventListener("click", () => this._addColorStep());
      s2.appendChild(addBtn);

      if (steps.length > 0) {
        const resetBtn = document.createElement("button");
        resetBtn.className = "add-btn secondary";
        resetBtn.innerHTML = "✕ Use Default Colors";
        resetBtn.addEventListener("click", () => this._update("colors", undefined));
        s2.appendChild(resetBtn);
      }

      frag.appendChild(s2);
      return frag;
    }

    // ── Entities Tab ─────────────────────────────────────────────────────────

    _renderEntities() {
      const frag = document.createDocumentFragment();
      const entities = this._getEntities();

      const s = this._section("Entity List");
      const hint = document.createElement("p");
      hint.className = "hint-block";
      hint.innerHTML = "Add specific entities here. Use the <strong>Filters</strong> tab to auto-include entities by device class.";
      s.appendChild(hint);

      if (entities.length === 0) {
        const empty = document.createElement("div");
        empty.className = "empty-note";
        empty.textContent = "No entities added. Use Filters to auto-populate or add one below.";
        s.appendChild(empty);
      }

      entities.forEach((entity, i) => {
        s.appendChild(this._renderEntityRow(entity, i));
      });

      const addBtn = document.createElement("button");
      addBtn.className = "add-btn";
      addBtn.innerHTML = "+ Add Entity";
      addBtn.addEventListener("click", () => {
        const ents = this._getEntities();
        ents.push({ entity: "" });
        this._update("entities", ents);
        this._expandedEntity = ents.length - 1;
        this._render();
      });
      s.appendChild(addBtn);

      frag.appendChild(s);
      return frag;
    }

    _renderEntityRow(entity, i) {
      const isExpanded = this._expandedEntity === i;
      const wrapper = document.createElement("div");
      wrapper.className = "entity-row";

      // Header
      const header = document.createElement("div");
      header.className = "entity-header";
      header.innerHTML = `
        <span style="font-size:18px">🔋</span>
        <span class="entity-label">${entity.name || entity.entity || "New Entity"}</span>
        <span style="font-size:18px; color:var(--secondary-text-color)">${isExpanded ? "▲" : "▼"}</span>
      `;

      const delBtn = document.createElement("button");
      delBtn.className = "del-btn";
      delBtn.innerHTML = "✕";
      delBtn.title = "Remove entity";
      delBtn.addEventListener("click", e => {
        e.stopPropagation();
        const ents = this._getEntities();
        ents.splice(i, 1);
        this._expandedEntity = null;
        this._update("entities", ents);
        this._render();
      });
      header.appendChild(delBtn);

      header.addEventListener("click", () => {
        this._expandedEntity = isExpanded ? null : i;
        this._render();
      });

      wrapper.appendChild(header);

      if (!isExpanded) return wrapper;

      // Body
      const body = document.createElement("div");
      body.className = "entity-body";

      const updateEnt = (field, val) => {
        const ents = this._getEntities();
        if (val === "" || val === undefined) delete ents[i][field];
        else ents[i][field] = val;
        this._update("entities", ents);
      };

      body.appendChild(this._textField("Entity ID *", entity.entity || "", val => updateEnt("entity", val), "sensor.my_device_battery"));
      body.appendChild(this._textField("Display Name", entity.name || "", val => updateEnt("name", val), "Override entity name"));
      body.appendChild(this._textField("Icon Override", entity.icon || "", val => updateEnt("icon", val), "mdi:battery or attributes.battery_icon"));
      body.appendChild(this._textField("Attribute (value source)", entity.attribute || "", val => updateEnt("attribute", val), "battery_level (auto-detect by default)", "Which attribute holds the battery value"));
      body.appendChild(this._numberField("Multiplier", entity.multiplier || "", val => updateEnt("multiplier", val ? parseFloat(val) : undefined), "1 (use 10 if sensor reports 0-10)"));
      body.appendChild(this._textField("Secondary Info Override", entity.secondary_info || "", val => updateEnt("secondary_info", val), "{last_changed}"));
      body.appendChild(this._textField("Value Override (KString)", entity.value_override || "", val => updateEnt("value_override", val), "{state|abs()}"));
      body.appendChild(this._textField("Unit", entity.unit || "", val => updateEnt("unit", val), "% (overrides card default)"));
      body.appendChild(this._numberField("Round", entity.round !== undefined ? entity.round : "", val => updateEnt("round", val !== "" ? parseInt(val) : undefined), "decimal digits"));

      body.appendChild(this._toggleRow("Non-battery entity (disables auto attribute detection)", entity.non_battery_entity || false, val => updateEnt("non_battery_entity", val || undefined)));

      // Tap action
      const tapTitle = document.createElement("div");
      tapTitle.className = "subsection-title";
      tapTitle.textContent = "Tap Action";
      body.appendChild(tapTitle);
      body.appendChild(this._renderTapActionEditor(entity.tap_action, val => updateEnt("tap_action", val)));

      // Charging state
      const chargeTitle = document.createElement("div");
      chargeTitle.className = "subsection-title";
      chargeTitle.textContent = "Charging State";
      body.appendChild(chargeTitle);
      body.appendChild(this._renderChargingStateEditor(entity.charging_state, val => updateEnt("charging_state", val)));

      // State map
      const mapTitle = document.createElement("div");
      mapTitle.className = "subsection-title";
      mapTitle.textContent = "State Map (non-numeric values)";
      body.appendChild(mapTitle);
      body.appendChild(this._renderStateMapEditor(entity.state_map || [], val => updateEnt("state_map", val)));

      wrapper.appendChild(body);
      return wrapper;
    }

    // ── Filters Tab ──────────────────────────────────────────────────────────

    _renderFilters() {
      const frag = document.createDocumentFragment();
      const filter = this._config.filter || {};
      const include = filter.include || [];
      const exclude = filter.exclude || [];
      const br = this._getBulkRename();

      // Include filters
      const s1 = this._section("Auto-Include Filters");
      const h1 = document.createElement("p");
      h1.className = "hint-block";
      h1.innerHTML = "Entities matching <strong>any</strong> of these filters are automatically added. Common: <code>attributes.device_class = battery</code>";
      s1.appendChild(h1);

      include.forEach((f, i) => {
        s1.appendChild(this._renderFilterRow(f, i, "include"));
      });

      const addIncBtn = document.createElement("button");
      addIncBtn.className = "add-btn";
      addIncBtn.innerHTML = "+ Add Include Filter";
      addIncBtn.addEventListener("click", () => {
        const arr = [...include, { name: "attributes.device_class", value: "battery" }];
        this._update("filter", { ...filter, include: arr });
      });
      s1.appendChild(addIncBtn);
      frag.appendChild(s1);

      // Exclude filters
      const s2 = this._section("Exclude Filters");
      const h2 = document.createElement("p");
      h2.className = "hint-block";
      h2.innerHTML = "Entities matching <strong>any</strong> of these filters are removed. Common: exclude <code>entity_id = binary_sensor.*</code>";
      s2.appendChild(h2);

      exclude.forEach((f, i) => {
        s2.appendChild(this._renderFilterRow(f, i, "exclude"));
      });

      const addExcBtn = document.createElement("button");
      addExcBtn.className = "add-btn";
      addExcBtn.innerHTML = "+ Add Exclude Filter";
      addExcBtn.addEventListener("click", () => {
        const arr = [...exclude, { name: "entity_id", value: "binary_sensor.*", operator: "matches" }];
        this._update("filter", { ...filter, exclude: arr });
      });
      s2.appendChild(addExcBtn);
      frag.appendChild(s2);

      // Bulk rename
      const s3 = this._section("Bulk Rename Rules");
      const h3 = document.createElement("p");
      h3.className = "hint-block";
      h3.textContent = "Strip or replace common suffixes from all entity names. E.g. remove \" Battery Level\" from all names.";
      s3.appendChild(h3);

      s3.appendChild(this._toggleRow("Capitalize first letter", br.capitalize_first !== false, val => {
        this._update("bulk_rename", { ...br, capitalize_first: val });
      }));

      (br.rules || []).forEach((rule, i) => {
        const row = document.createElement("div");
        row.className = "inline-row";

        const fromF = document.createElement("div");
        fromF.className = "inline-field";
        fromF.innerHTML = '<label>From (string or /regex/)</label>';
        const fromInput = document.createElement("input");
        fromInput.type = "text";
        fromInput.value = rule.from || "";
        fromInput.placeholder = '" Battery Level"';
        fromInput.addEventListener("change", e => {
          const rules = [...(br.rules || [])];
          rules[i] = { ...rules[i], from: e.target.value };
          this._update("bulk_rename", { ...br, rules });
        });
        fromF.appendChild(fromInput);
        row.appendChild(fromF);

        const toF = document.createElement("div");
        toF.className = "inline-field";
        toF.innerHTML = '<label>To (blank = remove)</label>';
        const toInput = document.createElement("input");
        toInput.type = "text";
        toInput.value = rule.to || "";
        toInput.placeholder = "(blank = remove)";
        toInput.addEventListener("change", e => {
          const rules = [...(br.rules || [])];
          rules[i] = { ...rules[i], to: e.target.value };
          this._update("bulk_rename", { ...br, rules });
        });
        toF.appendChild(toInput);
        row.appendChild(toF);

        const del = document.createElement("button");
        del.className = "del-btn";
        del.innerHTML = "✕";
        del.addEventListener("click", () => {
          const rules = [...(br.rules || [])];
          rules.splice(i, 1);
          this._update("bulk_rename", { ...br, rules });
        });
        row.appendChild(del);
        s3.appendChild(row);
      });

      const addRuleBtn = document.createElement("button");
      addRuleBtn.className = "add-btn";
      addRuleBtn.innerHTML = "+ Add Rename Rule";
      addRuleBtn.addEventListener("click", () => {
        const rules = [...(br.rules || []), { from: "" }];
        this._update("bulk_rename", { ...br, rules });
      });
      s3.appendChild(addRuleBtn);
      frag.appendChild(s3);

      return frag;
    }

    _renderFilterRow(filter, i, type) {
      const filterObj = this._config.filter || {};
      const arr = filterObj[type] || [];
      const hasValue = filter.operator !== "exists" && filter.operator !== "not_exists";

      const row = document.createElement("div");
      row.className = "inline-row";

      // Property
      const propF = document.createElement("div");
      propF.className = "inline-field";
      propF.innerHTML = '<label>Property</label>';
      const propInput = document.createElement("input");
      propInput.type = "text";
      propInput.value = filter.name || "";
      propInput.placeholder = "e.g. attributes.device_class";
      propInput.addEventListener("change", e => {
        const a = [...arr];
        a[i] = { ...a[i], name: e.target.value };
        this._update("filter", { ...filterObj, [type]: a });
      });
      propF.appendChild(propInput);
      row.appendChild(propF);

      // Operator
      const opF = document.createElement("div");
      opF.className = "inline-field";
      opF.innerHTML = '<label>Operator</label>';
      const opSel = document.createElement("select");
      const ops = ["", "=", ">", ">=", "<", "<=", "exists", "not_exists", "contains", "matches"];
      const opLabels = ["= (equals, default)", "= (equals)", ">", ">=", "<", "<=", "exists", "not_exists", "contains", "matches"];
      ops.forEach((op, oi) => {
        const opt = document.createElement("option");
        opt.value = op;
        opt.textContent = opLabels[oi];
        opt.selected = (filter.operator || "") === op;
        opSel.appendChild(opt);
      });
      opSel.addEventListener("change", e => {
        const a = [...arr];
        const newOp = e.target.value;
        a[i] = { ...a[i], operator: newOp || undefined };
        this._update("filter", { ...filterObj, [type]: a });
        this._render(); // re-render to show/hide value field
      });
      opF.appendChild(opSel);
      row.appendChild(opF);

      // Value (if applicable)
      if (hasValue) {
        const valF = document.createElement("div");
        valF.className = "inline-field";
        valF.innerHTML = '<label>Value</label>';
        const valInput = document.createElement("input");
        valInput.type = "text";
        valInput.value = filter.value !== undefined ? filter.value : "";
        valInput.placeholder = "e.g. battery or *_level";
        valInput.addEventListener("change", e => {
          const a = [...arr];
          a[i] = { ...a[i], value: e.target.value };
          this._update("filter", { ...filterObj, [type]: a });
        });
        valF.appendChild(valInput);
        row.appendChild(valF);
      }

      const del = document.createElement("button");
      del.className = "del-btn";
      del.innerHTML = "✕";
      del.addEventListener("click", () => {
        const a = [...arr];
        a.splice(i, 1);
        this._update("filter", { ...filterObj, [type]: a });
      });
      row.appendChild(del);

      return row;
    }

    // ── Advanced Tab ─────────────────────────────────────────────────────────

    _renderAdvanced() {
      const frag = document.createDocumentFragment();
      const cfg = this._config;

      // Card-level charging state
      const s1 = this._section("Charging State (Card Default)");
      const h1 = document.createElement("p");
      h1.className = "hint-block";
      h1.textContent = "Configure how charging is detected for all entities. Individual entities can override this.";
      s1.appendChild(h1);
      s1.appendChild(this._renderChargingStateEditor(cfg.charging_state, val => this._update("charging_state", val)));
      frag.appendChild(s1);

      // Card-level state map
      const s2 = this._section("State Map (Card Default)");
      const h2 = document.createElement("p");
      h2.className = "hint-block";
      h2.textContent = "Map non-numeric entity states to numeric battery levels for all entities.";
      s2.appendChild(h2);
      s2.appendChild(this._renderStateMapEditor(cfg.state_map || [], val => this._update("state_map", val)));
      frag.appendChild(s2);

      // Value override
      const s3 = this._section("Value Override (Card Default)");
      s3.appendChild(this._textField(
        "Value Override (KString)",
        cfg.value_override || "",
        val => this._update("value_override", val),
        "{state|abs()}",
        "Applied to all entities. Example: {state|abs()} for signal strength sensors."
      ));
      frag.appendChild(s3);

      // Debug
      const s4 = this._section("Debug");
      s4.appendChild(this._toggleRow("Enable debug for all entities", cfg.debug === true, val => {
        this._update("debug", val ? true : undefined);
      }));
      s4.appendChild(this._textField(
        "Debug specific entity ID",
        typeof cfg.debug === "string" ? cfg.debug : "",
        val => this._update("debug", val || undefined),
        "sensor.my_device_battery",
        "Overrides the toggle above"
      ));
      s4.appendChild(this._toggleRow("Disable default HA state formatting", cfg.default_state_formatting === false, val => {
        this._update("default_state_formatting", val ? false : undefined);
      }));
      frag.appendChild(s4);

      return frag;
    }

    // ── Shared sub-editors ───────────────────────────────────────────────────

    _renderTapActionEditor(tapAction, onChange) {
      const ta = typeof tapAction === "string"
        ? { action: tapAction }
        : (tapAction || { action: "more-info" });

      const action = ta.action || "more-info";

      const wrap = document.createElement("div");
      wrap.appendChild(this._selectField("Action", action, [
        { value: "more-info",    label: "More Info" },
        { value: "navigate",     label: "Navigate to path" },
        { value: "url",          label: "Open URL" },
        { value: "call-service", label: "Call Service" },
        { value: "none",         label: "None" },
      ], val => {
        onChange({ ...ta, action: val });
        this._render();
      }));

      if (action === "navigate") {
        wrap.appendChild(this._textField("Navigation Path", ta.navigation_path || "", val => {
          onChange({ ...ta, navigation_path: val });
        }, "/lovelace/0"));
      }
      if (action === "url") {
        wrap.appendChild(this._textField("URL", ta.url_path || "", val => {
          onChange({ ...ta, url_path: val });
        }, "https://example.com"));
      }
      if (action === "call-service") {
        wrap.appendChild(this._textField("Service", ta.service || "", val => {
          onChange({ ...ta, service: val });
        }, "notify.pushover"));
        const sdField = this._textareaField("Service Data (JSON)", ta.service_data ? JSON.stringify(ta.service_data, null, 2) : "", val => {
          try { onChange({ ...ta, service_data: JSON.parse(val) }); } catch(_) {}
        }, '{"message": "Low battery!"}');
        wrap.appendChild(sdField);
      }

      return wrap;
    }

    _renderChargingStateEditor(cs, onChange) {
      const current = cs || {};
      const wrap = document.createElement("div");

      wrap.appendChild(this._textField("Charging Entity ID", current.entity_id || "", val => {
        onChange({ ...current, entity_id: val || undefined });
      }, "binary_sensor.device_charging", "Alternate entity whose state indicates charging"));

      wrap.appendChild(this._textField("Charging States (comma-separated)", (current.state || []).join(", "), val => {
        onChange({ ...current, state: val ? val.split(",").map(s => s.trim()) : undefined });
      }, "charging, Charging, on"));

      wrap.appendChild(this._textField("Charging Icon", current.icon || "", val => {
        onChange({ ...current, icon: val || undefined });
      }, "mdi:flash"));

      wrap.appendChild(this._textField("Charging Icon Color", current.color || "", val => {
        onChange({ ...current, color: val || undefined });
      }, "yellow or #ffff00"));

      wrap.appendChild(this._textField("Charging Secondary Info Text", current.secondary_info_text || "", val => {
        onChange({ ...current, secondary_info_text: val || undefined });
      }, "Charging in progress", 'Shown when secondary_info: "{charging}" is set'));

      // Attribute checks
      const attrTitle = document.createElement("div");
      attrTitle.style.cssText = "font-size:11px;font-weight:600;color:var(--secondary-text-color);margin:10px 0 6px;text-transform:uppercase;letter-spacing:.04em;";
      attrTitle.textContent = "Charging Attribute Checks";
      wrap.appendChild(attrTitle);

      (current.attribute || []).forEach((attr, i) => {
        const row = document.createElement("div");
        row.className = "inline-row";

        const nameF = document.createElement("div");
        nameF.className = "inline-field";
        nameF.innerHTML = '<label>Attribute Name</label>';
        const nameInput = document.createElement("input");
        nameInput.type = "text";
        nameInput.value = attr.name || "";
        nameInput.placeholder = "is_charging";
        nameInput.addEventListener("change", e => {
          const attrs = [...(current.attribute || [])];
          attrs[i] = { ...attrs[i], name: e.target.value };
          onChange({ ...current, attribute: attrs });
        });
        nameF.appendChild(nameInput);
        row.appendChild(nameF);

        const valF = document.createElement("div");
        valF.className = "inline-field";
        valF.innerHTML = '<label>Attribute Value</label>';
        const valInput = document.createElement("input");
        valInput.type = "text";
        valInput.value = attr.value || "";
        valInput.placeholder = "true or yes";
        valInput.addEventListener("change", e => {
          const attrs = [...(current.attribute || [])];
          attrs[i] = { ...attrs[i], value: e.target.value };
          onChange({ ...current, attribute: attrs });
        });
        valF.appendChild(valInput);
        row.appendChild(valF);

        const del = document.createElement("button");
        del.className = "del-btn";
        del.innerHTML = "✕";
        del.addEventListener("click", () => {
          const attrs = [...(current.attribute || [])];
          attrs.splice(i, 1);
          onChange({ ...current, attribute: attrs.length ? attrs : undefined });
        });
        row.appendChild(del);
        wrap.appendChild(row);
      });

      const addAttrBtn = document.createElement("button");
      addAttrBtn.className = "add-btn";
      addAttrBtn.style.marginBottom = "4px";
      addAttrBtn.innerHTML = "+ Add Attribute Check";
      addAttrBtn.addEventListener("click", () => {
        const attrs = [...(current.attribute || []), { name: "", value: "" }];
        onChange({ ...current, attribute: attrs });
      });
      wrap.appendChild(addAttrBtn);

      if (cs) {
        const clearBtn = document.createElement("button");
        clearBtn.className = "add-btn secondary";
        clearBtn.innerHTML = "✕ Clear Charging Config";
        clearBtn.addEventListener("click", () => onChange(undefined));
        wrap.appendChild(clearBtn);
      }

      return wrap;
    }

    _renderStateMapEditor(stateMap, onChange) {
      const wrap = document.createElement("div");

      if (stateMap.length === 0) {
        const empty = document.createElement("div");
        empty.className = "empty-note";
        empty.style.marginBottom = "8px";
        empty.textContent = "No state mappings defined";
        wrap.appendChild(empty);
      }

      stateMap.forEach((rule, i) => {
        const row = document.createElement("div");
        row.className = "inline-row";

        const fromF = document.createElement("div");
        fromF.className = "inline-field";
        fromF.innerHTML = '<label>From (entity state)</label>';
        const fromInput = document.createElement("input");
        fromInput.type = "text";
        fromInput.value = rule.from !== undefined ? rule.from : "";
        fromInput.placeholder = "on";
        fromInput.addEventListener("change", e => {
          const sm = [...stateMap];
          sm[i] = { ...sm[i], from: e.target.value };
          onChange(sm);
        });
        fromF.appendChild(fromInput);
        row.appendChild(fromF);

        const toF = document.createElement("div");
        toF.className = "inline-field";
        toF.innerHTML = '<label>To (numeric %)</label>';
        const toInput = document.createElement("input");
        toInput.type = "number";
        toInput.min = "0"; toInput.max = "100";
        toInput.value = rule.to !== undefined ? rule.to : "";
        toInput.placeholder = "100";
        toInput.addEventListener("change", e => {
          const sm = [...stateMap];
          sm[i] = { ...sm[i], to: e.target.value ? parseFloat(e.target.value) : undefined };
          onChange(sm);
        });
        toF.appendChild(toInput);
        row.appendChild(toF);

        const dispF = document.createElement("div");
        dispF.className = "inline-field";
        dispF.innerHTML = '<label>Display text</label>';
        const dispInput = document.createElement("input");
        dispInput.type = "text";
        dispInput.value = rule.display || "";
        dispInput.placeholder = "Full";
        dispInput.addEventListener("change", e => {
          const sm = [...stateMap];
          sm[i] = { ...sm[i], display: e.target.value || undefined };
          onChange(sm);
        });
        dispF.appendChild(dispInput);
        row.appendChild(dispF);

        const del = document.createElement("button");
        del.className = "del-btn";
        del.innerHTML = "✕";
        del.addEventListener("click", () => {
          const sm = [...stateMap];
          sm.splice(i, 1);
          onChange(sm.length ? sm : undefined);
        });
        row.appendChild(del);
        wrap.appendChild(row);
      });

      const addBtn = document.createElement("button");
      addBtn.className = "add-btn";
      addBtn.innerHTML = "+ Add State Mapping";
      addBtn.addEventListener("click", () => {
        onChange([...stateMap, { from: "on", to: 100 }]);
      });
      wrap.appendChild(addBtn);

      return wrap;
    }

    // ── DOM helpers ──────────────────────────────────────────────────────────

    _section(title) {
      const el = document.createElement("div");
      el.className = "section";
      const t = document.createElement("div");
      t.className = "section-title";
      t.textContent = title;
      el.appendChild(t);
      return el;
    }

    _textField(label, value, onChange, placeholder, hint) {
      const wrap = document.createElement("div");
      wrap.className = "field";
      const lbl = document.createElement("label");
      lbl.textContent = label;
      wrap.appendChild(lbl);
      const input = document.createElement("input");
      input.type = "text";
      input.value = value;
      if (placeholder) input.placeholder = placeholder;
      input.addEventListener("change", e => onChange(e.target.value));
      wrap.appendChild(input);
      if (hint) {
        const h = document.createElement("span");
        h.className = "hint";
        h.textContent = hint;
        wrap.appendChild(h);
      }
      return wrap;
    }

    _numberField(label, value, onChange, placeholder, hint) {
      const wrap = document.createElement("div");
      wrap.className = "field";
      const lbl = document.createElement("label");
      lbl.textContent = label;
      wrap.appendChild(lbl);
      const input = document.createElement("input");
      input.type = "number";
      input.value = value;
      if (placeholder) input.placeholder = placeholder;
      input.addEventListener("change", e => onChange(e.target.value));
      wrap.appendChild(input);
      if (hint) {
        const h = document.createElement("span");
        h.className = "hint";
        h.textContent = hint;
        wrap.appendChild(h);
      }
      return wrap;
    }

    _textareaField(label, value, onChange, placeholder) {
      const wrap = document.createElement("div");
      wrap.className = "field";
      const lbl = document.createElement("label");
      lbl.textContent = label;
      wrap.appendChild(lbl);
      const input = document.createElement("textarea");
      input.value = value;
      if (placeholder) input.placeholder = placeholder;
      input.addEventListener("change", e => onChange(e.target.value));
      wrap.appendChild(input);
      return wrap;
    }

    _selectField(label, value, options, onChange) {
      const wrap = document.createElement("div");
      wrap.className = "field";
      const lbl = document.createElement("label");
      lbl.textContent = label;
      wrap.appendChild(lbl);
      const sel = document.createElement("select");
      options.forEach(opt => {
        const o = document.createElement("option");
        o.value = opt.value;
        o.textContent = opt.label;
        o.selected = value === opt.value;
        sel.appendChild(o);
      });
      sel.addEventListener("change", e => onChange(e.target.value));
      wrap.appendChild(sel);
      return wrap;
    }

    _toggleRow(label, checked, onChange) {
      const wrap = document.createElement("div");
      wrap.className = "field toggle-row";
      const lbl = document.createElement("label");
      lbl.textContent = label;
      wrap.appendChild(lbl);
      const switchEl = document.createElement("label");
      switchEl.className = "switch";
      const input = document.createElement("input");
      input.type = "checkbox";
      input.checked = checked;
      input.addEventListener("change", e => onChange(e.target.checked));
      const slider = document.createElement("span");
      slider.className = "slider";
      switchEl.appendChild(input);
      switchEl.appendChild(slider);
      wrap.appendChild(switchEl);
      return wrap;
    }

    // ── Config helpers ───────────────────────────────────────────────────────

    _update(path, value) {
      const config = deepClone(this._config);
      if (value === undefined || value === "" || value === null) {
        delete config[path];
      } else {
        config[path] = value;
      }
      this._config = config;
      this._render();
      fireConfigChanged(this, config);
    }

    _getEntities() {
      return (this._config.entities || []).map(e =>
        typeof e === "string" ? { entity: e } : deepClone(e)
      );
    }

    _getSortArray() {
      const s = this._config.sort;
      if (!s) return [];
      const arr = Array.isArray(s) ? s : [s];
      return arr.map(item => typeof item === "string" ? { by: item } : item);
    }

    _getColorSteps() {
      const colors = this._config.colors;
      if (!colors || !colors.steps) return [];
      return colors.steps.map(step =>
        typeof step === "string" ? { color: step } : step
      );
    }

    _addColorStep() {
      const colors = this._config.colors || { steps: [], gradient: false };
      const isGradient = colors.gradient;
      const steps = this._getColorSteps();
      if (isGradient) {
        const newSteps = [...steps.map(s => s.color), "#00ff00"];
        this._update("colors", { ...colors, steps: newSteps });
      } else {
        const newSteps = [...steps, { value: 100, color: "#00ff00" }];
        this._update("colors", { ...colors, steps: newSteps });
      }
    }

    _removeColorStep(index) {
      const colors = this._config.colors || { steps: [] };
      const steps = this._getColorSteps();
      steps.splice(index, 1);
      const newSteps = colors.gradient ? steps.map(s => s.color) : steps;
      this._update("colors", { ...colors, steps: newSteps });
    }

    _updateColorStep(index, field, value) {
      const colors = this._config.colors || { steps: [] };
      const steps = this._getColorSteps();
      steps[index] = { ...steps[index], [field]: value };
      const newSteps = colors.gradient ? steps.map(s => s.color) : steps;
      // update swatch
      const swatches = this._shadow.querySelectorAll(".color-swatch");
      if (swatches[index]) swatches[index].style.background = value;
      this._update("colors", { ...colors, steps: newSteps });
    }

    _getBulkRename() {
      const br = this._config.bulk_rename;
      if (!br) return { rules: [], capitalize_first: true };
      if (Array.isArray(br)) return { rules: br, capitalize_first: true };
      return { rules: [], capitalize_first: true, ...deepClone(br) };
    }
  }

  // ── Register the editor element ─────────────────────────────────────────────

  if (!customElements.get("battery-state-card-editor")) {
    customElements.define("battery-state-card-editor", BatteryStateCardEditor);
  }

  // ── Patch the card class to expose the editor ───────────────────────────────

  // HA looks for getConfigElement() on the card class to enable Visual Editor.
  // We patch both the card and entity variants.

  function patchCard(tagName, editorTag) {
    const CardClass = customElements.get(tagName);
    if (!CardClass) {
      // Card hasn't registered yet — wait for it
      customElements.whenDefined(tagName).then(() => patchCard(tagName, editorTag));
      return;
    }

    if (CardClass.getConfigElement) return; // already patched

    CardClass.getConfigElement = function () {
      return document.createElement(editorTag);
    };

    CardClass.getStubConfig = function () {
      return {
        type: "custom:" + tagName,
        secondary_info: "{last_changed}",
        filter: {
          include: [
            { name: "attributes.device_class", value: "battery" }
          ],
          exclude: [
            { name: "entity_id", value: "binary_sensor.*", operator: "matches" }
          ]
        },
        sort: { by: "state" },
        collapse: 8,
        bulk_rename: {
          rules: [
            { from: " Battery" },
            { from: " level" }
          ],
          capitalize_first: true
        },
        colors: {
          steps: ["#ff0000", "#ffff00", "#00ff00"],
          gradient: true
        }
      };
    };

    console.info(`[battery-state-card-editor] Patched ${tagName} with visual editor ✓`);
  }

  // Patch both card types
  patchCard("battery-state-card", "battery-state-card-editor");
  patchCard("battery-state-entity", "battery-state-card-editor");

  console.info(
    "%c BATTERY STATE CARD — VISUAL EDITOR %c v3.2.1 fork ",
    "background:#1d4ed8;color:white;font-weight:bold;padding:2px 6px;border-radius:3px 0 0 3px",
    "background:#3b82f6;color:white;padding:2px 6px;border-radius:0 3px 3px 0"
  );

})();
