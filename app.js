import { TabulatorFull as Tabulator } from "https://unpkg.com/tabulator-tables@6.4.0/dist/js/tabulator_esm.min.mjs";

const PRIMARY_TITLES = {
  "1-QB": "1QB ADP, TRADE VALUES & 2025 STATS",
  SFLX: "SFLX ADP, TRADE VALUES & 2025 STATS",
};

const CATEGORY_LABELS = {
  overview: "OVERVIEW (ALL)",
  passing: "PASSING (QB)",
  rushing: "RUSHING (RB)",
  receiving: "RECEIVING (W/T)",
};

const COLUMN_SETS = {
  overview: [
    "RK",
    "PLAYER",
    "POS",
    "TM",
    "AGE",
    "FPTS",
    "PPG",
    "VALUE",
    "ADP",
    "POS·ADP",
    "G",
    "SNP%",
    "YDS(t)",
    "YPG(t)",
    "OPP",
    "IMP",
    "IMP/OPP",
    "CSTY%",
    "CL",
  ],
  passing: [
    "RK",
    "PLAYER",
    "POS",
    "TM",
    "AGE",
    "G",
    "FPTS",
    "PPG",
    "VALUE",
    "ADP",
    "POS·ADP",
    "paYDS",
    "paTD",
    "CMP%",
    "paATT",
    "paRTG",
    "EPA/DB",
    "CPOE",
    "CMP",
    "YDS(t)",
    "paYPG",
    "ruYDS",
    "ruTD",
    "pa1D",
    "IMP/G",
    "pIMP",
    "pIMP/A",
    "CAR",
    "YPC",
    "TTT",
    "PRS%",
    "SAC",
    "INT",
    "FUM",
    "FPOE",
    "CSTY%",
    "CL",
  ],
  rushing: [
    "RK",
    "PLAYER",
    "POS",
    "TM",
    "AGE",
    "G",
    "FPTS",
    "PPG",
    "VALUE",
    "ADP",
    "POS·ADP",
    "SNP%",
    "CAR",
    "ruYDS",
    "YPC",
    "ruTD",
    "REC",
    "recYDS",
    "TGT",
    "YDS(t)",
    "ruYPG",
    "ELU",
    "MTF/A",
    "YCO/A",
    "MTF",
    "YCO",
    "EXPLSV%",
    "ru1D",
    "RYOE",
    "recTD",
    "rec1D",
    "YAC",
    "IMP/G",
    "FUM",
    "FPOE",
    "CSTY%",
    "CL",
  ],
  receiving: [
    "RK",
    "PLAYER",
    "POS",
    "TM",
    "AGE",
    "G",
    "FPTS",
    "PPG",
    "VALUE",
    "ADP",
    "POS·ADP",
    "SNP%",
    "TGT",
    "REC",
    "TS%",
    "recYDS",
    "recTD",
    "YPRR",
    "rec1D",
    "1DRR",
    "recYPG",
    "AY%",
    "YAC",
    "YPR",
    "IMP/G",
    "RR",
    "FPOE",
    "YDS(t)",
    "RZ Tgt",
    "CAR",
    "ruYDS",
    "ruTD",
    "YPC",
    "FUM",
    "CSTY%",
    "CL",
  ],
};

const SOURCE_ALIASES = {
  PLAYER: "NM",
  RK: "PRK_PPR",
  FPTS: "FPT_PPR",
  G: "GM",
  VALUE: null,
  ADP: null,
  "POS·ADP": null,
  PPG: null,
};

const LABEL_COLUMNS = new Set(["PLAYER", "POS", "TM"]);
const NON_FORMATTED_COLUMNS = new Set(["PLAYER", "POS", "TM", "AGE", "G"]);
const INVERTED_COLUMNS = new Set([
  "RK",
  "ADP",
  "POS·ADP",
  "INT",
  "FUM",
  "PRS%",
  "CSTY%",
]);
const NEUTRAL_COLUMNS = new Set(["TTT", "CL"]);
const PLAYER_COLUMN = "PLAYER";
const FPTS_COLUMN = "FPTS";

const CATEGORY_FILTERS = {
  overview: (row) => Boolean(row.POS && row.POS !== "NA"),
  passing: (row) => row.POS === "QB",
  rushing: (row) => row.POS === "RB",
  receiving: (row, state) =>
    (row.POS === "WR" && state.receivingFilters.WR) ||
    (row.POS === "TE" && state.receivingFilters.TE),
};

const MOBILE_BREAKPOINT = 719;
const FROZEN_COL_COUNT = 3;

const COLUMN_WIDTHS = {
  RK: 78,
  PLAYER: 196,
  POS: 74,
  TM: 82,
  AGE: 78,
  FPTS: 88,
  PPG: 92,
  VALUE: 100,
  ADP: 92,
  "POS·ADP": 116,
  G: 72,
  "SNP%": 94,
  "YDS(t)": 108,
  "YPG(t)": 102,
  OPP: 90,
  IMP: 88,
  "IMP/OPP": 102,
  "CSTY%": 94,
  CL: 86,
  paYDS: 104,
  paTD: 90,
  "CMP%": 92,
  paATT: 96,
  paRTG: 98,
  "EPA/DB": 96,
  CPOE: 94,
  CMP: 90,
  paYPG: 96,
  ruYDS: 100,
  ruTD: 88,
  pa1D: 88,
  "IMP/G": 96,
  pIMP: 90,
  "pIMP/A": 96,
  CAR: 88,
  YPC: 88,
  TTT: 88,
  "PRS%": 90,
  SAC: 82,
  INT: 82,
  FUM: 84,
  FPOE: 92,
  REC: 88,
  recYDS: 104,
  TGT: 88,
  ELU: 88,
  "MTF/A": 92,
  "YCO/A": 92,
  MTF: 86,
  YCO: 86,
  "EXPLSV%": 96,
  ru1D: 86,
  RYOE: 92,
  recTD: 88,
  rec1D: 88,
  YAC: 88,
  "TS%": 86,
  YPRR: 88,
  "1DRR": 88,
  recYPG: 96,
  "AY%": 84,
  YPR: 84,
  RR: 84,
  "RZ Tgt": 98,
};

const MOBILE_COLUMN_WIDTHS = {
  RK: 44,
  PLAYER: 92,
  POS: 48,
  TM: 52,
  AGE: 54,
  FPTS: 58,
  PPG: 62,
  VALUE: 62,
  ADP: 62,
  "POS·ADP": 74,
  G: 46,
  "SNP%": 62,
  "YDS(t)": 68,
  "YPG(t)": 62,
  OPP: 58,
  IMP: 56,
  "IMP/OPP": 68,
  "CSTY%": 60,
  CL: 52,
  paYDS: 68,
  paTD: 56,
  "CMP%": 62,
  paATT: 60,
  paRTG: 60,
  "EPA/DB": 62,
  CPOE: 58,
  CMP: 56,
  paYPG: 62,
  ruYDS: 62,
  ruTD: 54,
  pa1D: 54,
  "IMP/G": 62,
  pIMP: 56,
  "pIMP/A": 66,
  CAR: 52,
  YPC: 52,
  TTT: 52,
  "PRS%": 58,
  SAC: 50,
  INT: 50,
  FUM: 50,
  FPOE: 60,
  REC: 52,
  recYDS: 64,
  TGT: 52,
  ELU: 52,
  "MTF/A": 60,
  "YCO/A": 60,
  MTF: 52,
  YCO: 52,
  "EXPLSV%": 68,
  ru1D: 52,
  RYOE: 60,
  recTD: 54,
  rec1D: 54,
  YAC: 56,
  "TS%": 56,
  YPRR: 56,
  "1DRR": 56,
  recYPG: 62,
  "AY%": 54,
  YPR: 52,
  RR: 52,
  "RZ Tgt": 64,
};

const state = {
  primaryTab: "1-QB",
  activeCategory: "overview",
  receivingFilters: {
    WR: true,
    TE: true,
  },
  searchText: "",
  rows: [],
  isCompactViewport: isCompactViewport(),
  columnFormatting: Object.create(null),
};

const mainTitle = document.querySelector("#main-title");
const activeViewLabel = document.querySelector("#active-view-label");
const rowCount = document.querySelector("#row-count");
const overlay = document.querySelector("#grid-overlay");
const overlayTitle = document.querySelector("#overlay-title");
const overlayDescription = document.querySelector("#overlay-description");
const overlayActions = document.querySelector("#overlay-actions");
const filePickerButton = document.querySelector("#file-picker-button");
const filePickerInput = document.querySelector("#file-picker-input");
const playerSearch = document.querySelector("#player-search");
const primaryTabButtons = Array.from(
  document.querySelectorAll("[data-primary-tab]"),
);
const categoryButtons = Array.from(
  document.querySelectorAll("[data-category]"),
);
const receivingSubfilters = document.querySelector("#receiving-subfilters");
const receivingButtons = Array.from(
  document.querySelectorAll("[data-receiving-filter]"),
);

let frozenTable = null;
let mainTable = null;
let sortsSyncing = false;

function createTable() {
  if (frozenTable) frozenTable.destroy();
  if (mainTable) mainTable.destroy();

  const sharedConfig = {
    nestedFieldSeparator: false,
    data: [],
    reactiveData: false,
    headerSortClickElement: "header",
    columnDefaults: {
      headerSort: true,
      resizable: true,
      headerHozAlign: "center",
      sorter: tabulatorSorter,
    },
    rowHeight: getRowHeight(),
    headerHeight: getHeaderHeight(),
  };

  frozenTable = new Tabulator("#frozen-grid", {
    ...sharedConfig,
    columns: buildFrozenColDefs(),
    layout: "fitData",
    height: "100%",
    placeholder: "",
  });

  mainTable = new Tabulator("#main-grid", {
    ...sharedConfig,
    columns: buildMainColDefs(),
    layout: "fitDataStretch",
    height: "100%",
    placeholder: "No players match the current view.",
  });

  mainTable.on("tableBuilt", () => {
    attachScrollSync();
    attachSortSync();
  });
}

function attachScrollSync() {
  const mainHolder = mainTable.element.querySelector(".tabulator-tableholder");
  const frozenHolder = frozenTable.element.querySelector(".tabulator-tableholder");
  if (!mainHolder || !frozenHolder) return;

  let syncingScroll = false;
  mainHolder.addEventListener("scroll", () => {
    if (syncingScroll) return;
    syncingScroll = true;
    frozenHolder.scrollTop = mainHolder.scrollTop;
    syncingScroll = false;
  });
}

function attachSortSync() {
  mainTable.on("dataSorting", (sorters) => {
    if (sortsSyncing) return;
    sortsSyncing = true;
    frozenTable.setSort(sorters.map((s) => ({ column: s.field, dir: s.dir })));
    sortsSyncing = false;
  });

  frozenTable.on("dataSorting", (sorters) => {
    if (sortsSyncing) return;
    sortsSyncing = true;
    mainTable.setSort(sorters.map((s) => ({ column: s.field, dir: s.dir })));
    sortsSyncing = false;
  });
}

createTable();
attachEventListeners();
syncUiState();
showOverlay({
  title: "Preparing SZN.csv",
  description:
    "Building the Data Hub grid and mapping the requested stat views.",
});
loadInitialData();

function attachEventListeners() {
  primaryTabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      state.primaryTab = button.dataset.primaryTab;
      syncUiState();
    });
  });

  categoryButtons.forEach((button) => {
    button.addEventListener("click", () => {
      state.activeCategory = button.dataset.category;
      syncUiState();
      refreshGrid();
    });
  });

  receivingButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const key = button.dataset.receivingFilter;
      state.receivingFilters[key] = !state.receivingFilters[key];
      syncUiState();
      refreshGrid();
    });
  });

  playerSearch.addEventListener("input", (event) => {
    state.searchText = event.target.value;
    applySearch();
  });

  filePickerButton.addEventListener("click", () => filePickerInput.click());
  filePickerInput.addEventListener("change", handlePickedFile);

  window.addEventListener("resize", handleViewportResize, { passive: true });
}

function applySearch() {
  if (!mainTable) return;

  if (!state.searchText.trim()) {
    frozenTable.clearFilter();
    mainTable.clearFilter();
  } else {
    frozenTable.setFilter(quickTextFilter, { searchText: state.searchText });
    mainTable.setFilter(quickTextFilter, { searchText: state.searchText });
  }
  updateRowCount();
}

function quickTextFilter(data, filterParams) {
  const needle = filterParams.searchText.toLowerCase();
  return Object.values(data).some((value) =>
    String(value).toLowerCase().includes(needle),
  );
}

async function loadInitialData() {
  try {
    const csvText = await fetchCsvText();
    applyCsvText(csvText);
    hideOverlay();
  } catch (error) {
    console.error(error);
    showOverlay({
      title: "Local browser access blocked",
      description:
        "This browser blocked direct access to SZN.csv from file://. Select the same local SZN.csv file to finish loading the Data Hub.",
      showActions: true,
    });
  }
}

async function fetchCsvText() {
  const response = await fetch("./SZN.csv", { cache: "no-store" });
  if (!response.ok) {
    throw new Error(`Unable to load SZN.csv (${response.status})`);
  }
  return response.text();
}

async function handlePickedFile(event) {
  const [file] = event.target.files || [];
  if (!file) {
    return;
  }

  try {
    showOverlay({
      title: "Importing SZN.csv",
      description:
        "Parsing the selected local file and rebuilding the category views.",
    });
    const csvText = await file.text();
    applyCsvText(csvText);
    hideOverlay();
  } catch (error) {
    console.error(error);
    showOverlay({
      title: "Could not read the selected file",
      description:
        "Select the local SZN.csv file from this folder and try again.",
      showActions: true,
    });
  } finally {
    filePickerInput.value = "";
  }
}

function applyCsvText(csvText) {
  const parsedRows = parseCsv(csvText);
  state.rows = parsedRows
    .filter((row) => (row.NM || "").trim() || (row.POS || "").trim())
    .map(normalizeRow);

  refreshGrid();
}

function refreshGrid() {
  const visibleRows = getVisibleRows();
  state.columnFormatting = buildColumnFormatting(visibleRows);

  if (frozenTable && mainTable) {
    frozenTable.setColumns(buildFrozenColDefs());
    mainTable.setColumns(buildMainColDefs());
    frozenTable.setData(visibleRows);
    mainTable.setData(visibleRows);
    applySearch();
  }

  updateRowCount();
}

function syncUiState() {
  mainTitle.textContent = PRIMARY_TITLES[state.primaryTab];
  activeViewLabel.textContent = CATEGORY_LABELS[state.activeCategory];

  primaryTabButtons.forEach((button) => {
    const isActive = button.dataset.primaryTab === state.primaryTab;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-selected", String(isActive));
  });

  categoryButtons.forEach((button) => {
    const isActive = button.dataset.category === state.activeCategory;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-selected", String(isActive));
  });

  const showReceivingFilters = state.activeCategory === "receiving";
  receivingSubfilters.hidden = !showReceivingFilters;

  receivingButtons.forEach((button) => {
    const key = button.dataset.receivingFilter;
    const isActive = Boolean(state.receivingFilters[key]);
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
}

function updateRowCount() {
  if (!mainTable) {
    rowCount.textContent = "0 rows";
    return;
  }
  const displayedRows = mainTable.getDataCount("active");
  rowCount.textContent = `${displayedRows} row${displayedRows === 1 ? "" : "s"}`;
}

function buildSingleColDef(columnName) {
  const isLabelColumn = LABEL_COLUMNS.has(columnName);
  const colDef = {
    title: columnName,
    field: columnName,
    width: getColumnWidth(columnName),
    minWidth: getColumnMinWidth(columnName),
    headerHozAlign: "center",
    hozAlign: isLabelColumn && columnName === PLAYER_COLUMN ? "left" : "center",
    cssClass: buildCellCssClass(columnName),
    headerSort: true,
    sorter: tabulatorSorter,
    resizable: true,
  };
  colDef.formatter = columnName === FPTS_COLUMN ? fptsCellFormatter : standardCellFormatter;
  return colDef;
}

function buildFrozenColDefs() {
  return COLUMN_SETS[state.activeCategory].slice(0, FROZEN_COL_COUNT).map(buildSingleColDef);
}

function buildMainColDefs() {
  return COLUMN_SETS[state.activeCategory].slice(FROZEN_COL_COUNT).map(buildSingleColDef);
}

function buildCellCssClass(columnName) {
  const classes = ["dh-grid-cell"];

  if (columnName === PLAYER_COLUMN) {
    classes.push("player-cell");
  } else {
    classes.push("center-cell");
  }

  if (NON_FORMATTED_COLUMNS.has(columnName)) {
    classes.push("plain-cell");
  } else {
    classes.push("formatted-cell");
  }

  if (columnName === FPTS_COLUMN) {
    classes.push("fpts-cell");
  }

  return classes.join(" ");
}

function standardCellFormatter(cell) {
  const columnName = cell.getColumn().getField();
  const value = cell.getValue();
  const displayValue = formatDisplayValue(columnName, value);
  const element = cell.getElement();

  element.classList.remove(
    "na-cell",
    "heat-cell", "heat-cell--heat", "heat-cell--neutral",
    "heat-cell--tier-0", "heat-cell--tier-1", "heat-cell--tier-2",
    "heat-cell--tier-3", "heat-cell--tier-4",
  );

  if (isMissingValue(value)) {
    element.classList.add("na-cell");
    return escapeHtml(displayValue);
  }

  if (!NON_FORMATTED_COLUMNS.has(columnName)) {
    const family = NEUTRAL_COLUMNS.has(columnName) ? "neutral" : "heat";
    const tier = getFormattingTier(columnName, value);
    element.classList.add("heat-cell", `heat-cell--${family}`, `heat-cell--tier-${tier}`);
  }

  return escapeHtml(displayValue);
}

function fptsCellFormatter(cell) {
  const value = cell.getValue();
  const rawDisplay = formatDisplayValue(FPTS_COLUMN, value);
  const displayValue = (!isMissingValue(value) && rawDisplay !== "NA")
    ? parseFloat(rawDisplay).toFixed(1)
    : rawDisplay;
  const element = cell.getElement();

  element.classList.remove(
    "na-cell",
    "fpts-cell--tier-0", "fpts-cell--tier-1", "fpts-cell--tier-2",
    "fpts-cell--tier-3", "fpts-cell--tier-4",
  );

  if (isMissingValue(value)) {
    element.classList.add("na-cell");
    return escapeHtml(displayValue);
  }

  const tier = getFormattingTier(FPTS_COLUMN, value);
  element.classList.add(`fpts-cell--tier-${tier}`);
  const safeValue = escapeHtml(displayValue);
  return `<span class="dh-fpts-chip dh-fpts-chip--tier-${tier}">${safeValue}</span>`;
}

function tabulatorSorter(a, b) {
  return compareGridValues(a, b);
}

function getVisibleRows() {
  const predicate = CATEGORY_FILTERS[state.activeCategory];
  return state.rows.filter((row) => predicate(row, state));
}

function getColumnMinWidth(columnName) {
  const charWidth = state.isCompactViewport ? 6.3 : 7.2;
  const sideSpace = state.isCompactViewport ? 26 : 34;
  return Math.ceil(String(columnName).length * charWidth + sideSpace);
}

function getColumnWidth(columnName) {
  const widths = state.isCompactViewport ? MOBILE_COLUMN_WIDTHS : COLUMN_WIDTHS;
  const fallback = state.isCompactViewport ? 58 : 94;
  const baseWidth = widths[columnName] ?? fallback;
  const shrinkBy = state.isCompactViewport
    ? 4
    : columnName === PLAYER_COLUMN
      ? 14
      : 8;

  return Math.max(baseWidth - shrinkBy, getColumnMinWidth(columnName));
}

function isCompactViewport() {
  return window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`).matches;
}

function getRowHeight() {
  return state.isCompactViewport ? 34 : 40;
}

function getHeaderHeight() {
  return state.isCompactViewport ? 36 : 44;
}

let resizeFrame = 0;

function handleViewportResize() {
  cancelAnimationFrame(resizeFrame);
  resizeFrame = requestAnimationFrame(() => {
    const nextCompact = isCompactViewport();
    if (nextCompact === state.isCompactViewport) {
      return;
    }

    state.isCompactViewport = nextCompact;
    createTable();
    refreshGrid();
  });
}

function normalizeRow(sourceRow) {
  const allColumns = new Set(Object.values(COLUMN_SETS).flat());
  const normalized = {};

  for (const columnName of allColumns) {
    const alias = Object.prototype.hasOwnProperty.call(SOURCE_ALIASES, columnName)
      ? SOURCE_ALIASES[columnName]
      : columnName;

    if (alias === null) {
      normalized[columnName] = "NA";
      continue;
    }

    const rawValue = sourceRow[alias];
    normalized[columnName] = sanitizeValue(rawValue);
  }

  return normalized;
}

function sanitizeValue(value) {
  const text = typeof value === "string" ? value.trim() : value;
  if (text === "" || text == null || text === "#N/A") {
    return "NA";
  }
  return String(text);
}

function parseCsv(csvText) {
  const rows = [];
  let current = "";
  let row = [];
  let insideQuotes = false;

  for (let index = 0; index < csvText.length; index += 1) {
    const char = csvText[index];
    const nextChar = csvText[index + 1];

    if (char === '"') {
      if (insideQuotes && nextChar === '"') {
        current += '"';
        index += 1;
      } else {
        insideQuotes = !insideQuotes;
      }
      continue;
    }

    if (char === "," && !insideQuotes) {
      row.push(current);
      current = "";
      continue;
    }

    if ((char === "\n" || char === "\r") && !insideQuotes) {
      if (char === "\r" && nextChar === "\n") {
        index += 1;
      }
      row.push(current);
      current = "";
      rows.push(row);
      row = [];
      continue;
    }

    current += char;
  }

  if (current.length > 0 || row.length > 0) {
    row.push(current);
    rows.push(row);
  }

  const [headerRow = [], ...dataRows] = rows;
  const headers = headerRow.map((header) => header.replace(/^\uFEFF/, "").trim());

  return dataRows
    .filter((values) => values.some((value) => value !== ""))
    .map((values) =>
      headers.reduce((record, header, index) => {
        record[header] = values[index] ?? "";
        return record;
      }, {}),
    );
}

function getCellClass(columnName, value) {
  const classes = ["dh-grid-cell"];

  if (columnName === PLAYER_COLUMN) {
    classes.push("player-cell");
  } else {
    classes.push("center-cell");
  }

  if (NON_FORMATTED_COLUMNS.has(columnName)) {
    classes.push("plain-cell");
  } else {
    classes.push("formatted-cell");
  }

  if (isMissingValue(value)) {
    classes.push("na-cell");
    return classes.join(" ");
  }

  if (columnName === FPTS_COLUMN) {
    classes.push("fpts-cell", `fpts-cell--tier-${getFormattingTier(columnName, value)}`);
    return classes.join(" ");
  }

  if (!NON_FORMATTED_COLUMNS.has(columnName)) {
    const family = NEUTRAL_COLUMNS.has(columnName) ? "neutral" : "heat";
    const tier = getFormattingTier(columnName, value);
    classes.push("heat-cell", `heat-cell--${family}`, `heat-cell--tier-${tier}`);
  }

  return classes.join(" ");
}

function formatDisplayValue(columnName, value) {
  const formattedValue = isMissingValue(value) ? "NA" : value;

  if (columnName !== PLAYER_COLUMN || !state.isCompactViewport) {
    return formattedValue;
  }

  return abbreviatePlayerName(formattedValue);
}

function abbreviatePlayerName(name) {
  if (isMissingValue(name)) {
    return "NA";
  }

  const parts = String(name).trim().split(/\s+/);
  if (parts.length < 2) {
    return String(name);
  }

  const [first, ...rest] = parts;
  return `${first.charAt(0)}. ${rest.join(" ")}`;
}

function buildColumnFormatting(rows) {
  const formatting = Object.create(null);
  const columns = COLUMN_SETS[state.activeCategory];

  columns.forEach((columnName) => {
    if (NON_FORMATTED_COLUMNS.has(columnName)) {
      return;
    }

    const values = rows
      .map((row) => toComparableNumber(row[columnName]))
      .filter((numericValue) => numericValue != null);

    if (!values.length) {
      return;
    }

    formatting[columnName] = createColumnMetric(values);
  });

  return formatting;
}

function createColumnMetric(values) {
  const sorted = [...values].sort((left, right) => left - right);

  return {
    sorted,
    isFlat: sorted[0] === sorted[sorted.length - 1],
  };
}

function getFormattingTier(columnName, value) {
  const metric = state.columnFormatting[columnName];
  const numericValue = toComparableNumber(value);

  if (!metric || numericValue == null) {
    return 0;
  }

  if (metric.isFlat) {
    return 2;
  }

  const percentile = getPercentileRank(metric.sorted, numericValue);
  const normalized = INVERTED_COLUMNS.has(columnName)
    ? 1 - percentile
    : percentile;

  return clamp(Math.round(normalized * 4), 0, 4);
}

function getPercentileRank(sortedValues, value) {
  if (sortedValues.length <= 1) {
    return 0.5;
  }

  const upperIndex = upperBound(sortedValues, value) - 1;
  return clamp(upperIndex / (sortedValues.length - 1), 0, 1);
}

function upperBound(values, target) {
  let low = 0;
  let high = values.length;

  while (low < high) {
    const middle = Math.floor((low + high) / 2);
    if (values[middle] <= target) {
      low = middle + 1;
    } else {
      high = middle;
    }
  }

  return low;
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function compareGridValues(valueA, valueB) {
  const parsedA = toComparableValue(valueA);
  const parsedB = toComparableValue(valueB);

  const aMissing = parsedA == null;
  const bMissing = parsedB == null;

  if (aMissing && bMissing) {
    return 0;
  }

  if (aMissing) {
    return 1;
  }

  if (bMissing) {
    return -1;
  }

  if (typeof parsedA === "number" && typeof parsedB === "number") {
    return parsedA - parsedB;
  }

  return String(parsedA).localeCompare(String(parsedB), undefined, {
    numeric: true,
    sensitivity: "base",
  });
}

function toComparableValue(value) {
  if (isMissingValue(value)) {
    return null;
  }

  const raw = String(value).trim();
  const parsedNumber = toComparableNumber(raw);

  if (parsedNumber != null) {
    return parsedNumber;
  }

  return raw.toUpperCase();
}

function toComparableNumber(value) {
  if (isMissingValue(value)) {
    return null;
  }

  const normalized = String(value).trim().replace(/,/g, "").replace(/%$/g, "");
  const parsedNumber = Number(normalized);

  if (Number.isNaN(parsedNumber)) {
    return null;
  }

  return parsedNumber;
}

function isMissingValue(value) {
  return value == null || value === "" || value === "NA" || value === "#N/A";
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function showOverlay({ title, description, showActions = false }) {
  overlayTitle.textContent = title;
  overlayDescription.textContent = description;
  overlayActions.hidden = !showActions;
  overlay.classList.remove("is-hidden");
}

function hideOverlay() {
  overlay.classList.add("is-hidden");
}
