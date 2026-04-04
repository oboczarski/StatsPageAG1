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
const STICKY_COLUMN_COUNT = 3;
const ALL_COLUMNS = [...new Set(Object.values(COLUMN_SETS).flat())];

const CATEGORY_FILTERS = {
  overview: (row) => Boolean(row.POS && row.POS !== "NA"),
  passing: (row) => row.POS === "QB",
  rushing: (row) => row.POS === "RB",
  receiving: (row, state) =>
    (row.POS === "WR" && state.receivingFilters.WR) ||
    (row.POS === "TE" && state.receivingFilters.TE),
};

const MOBILE_BREAKPOINT = 719;

const COLUMN_WIDTHS = {
  RK: 78,
  PLAYER: 196,
  POS: 74,
  TM: 82,
  AGE: 78,
  FPTS: 110,
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
  FPTS: 70,
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
  displayedRows: [],
  sort: {
    column: "RK",
    direction: "asc",
  },
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
const gridContainer = document.querySelector("#player-grid");
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
const splitGridState = {
  root: null,
  frozenPane: null,
  scrollPane: null,
  frozenViewport: null,
  scrollViewport: null,
  frozenTable: null,
  scrollTable: null,
};
let resizeFrame = 0;
let rowHeightSyncFrame = 0;
let syncingViewport = null;
let isApplyingRowHeights = false;
let resizeObserver = null;
let hoveredRowIndex = null;

attachEventListeners();
syncUiState();
renderTable();
showOverlay({
  title: "Preparing SZN.csv",
  description:
    "Building the Data Hub table and mapping the requested stat views.",
});
loadInitialData();

if (document.fonts?.ready) {
  document.fonts.ready
    .then(() => {
      scheduleRowHeightSync();
    })
    .catch(() => {});
}

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
    refreshGrid();
  });

  filePickerButton.addEventListener("click", () => filePickerInput.click());
  filePickerInput.addEventListener("change", handlePickedFile);

  window.addEventListener("resize", handleViewportResize, { passive: true });
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
  const searchedRows = visibleRows.filter(matchesSearch);
  state.displayedRows = sortRows(searchedRows);
  renderTable();
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
  const displayedRows = state.displayedRows.length;
  rowCount.textContent = `${displayedRows} row${displayedRows === 1 ? "" : "s"}`;
}

function renderTable() {
  const {
    frozenColumns,
    scrollColumns,
    frozenWidth,
    scrollWidth,
  } = buildColumnLayout(
    COLUMN_SETS[state.activeCategory],
  );
  const splitGrid = ensureSplitGrid();
  const frozenTable = createTable({
    columns: frozenColumns,
    pane: "frozen",
    tableWidth: frozenWidth,
    ariaLabel: "Frozen player stats columns",
    emptyStateMessage: "\u00A0",
    isEmptyStatePlaceholder: true,
  });
  const scrollTable = createTable({
    columns: scrollColumns,
    pane: "scroll",
    tableWidth: scrollWidth,
    ariaLabel: "Player stats table",
    emptyStateMessage: "No players match the current view.",
  });

  clearHoveredRow();
  splitGrid.root.style.setProperty("--frozen-width", `${frozenWidth}px`);
  splitGrid.frozenViewport.replaceChildren(frozenTable);
  splitGrid.scrollViewport.replaceChildren(scrollTable);

  splitGridState.frozenTable = frozenTable;
  splitGridState.scrollTable = scrollTable;

  observeSplitGrid();
  scheduleRowHeightSync();
}

function buildColumnLayout(columnNames) {
  let totalWidth = 0;

  const columns = columnNames.map((name, index) => {
    const width = getColumnWidth(name);
    const column = {
      name,
      index,
      width,
      isFrozen: index < STICKY_COLUMN_COUNT,
    };

    totalWidth += width;

    return column;
  });

  const frozenColumns = columns.filter((column) => column.isFrozen);
  const scrollColumns = columns.filter((column) => !column.isFrozen);

  return {
    columns,
    frozenColumns,
    scrollColumns,
    frozenWidth: getTotalColumnWidth(frozenColumns),
    scrollWidth: getTotalColumnWidth(scrollColumns),
    totalWidth,
  };
}

function getTotalColumnWidth(columns) {
  return columns.reduce((width, column) => width + column.width, 0);
}

function ensureSplitGrid() {
  if (splitGridState.root) {
    return splitGridState;
  }

  const root = document.createElement("div");
  root.className = "split-grid";

  const frozenPane = document.createElement("div");
  frozenPane.className = "split-grid__pane split-grid__pane--frozen";

  const frozenViewport = document.createElement("div");
  frozenViewport.className = "split-grid__viewport split-grid__viewport--frozen";

  const scrollPane = document.createElement("div");
  scrollPane.className = "split-grid__pane split-grid__pane--scroll";

  const scrollViewport = document.createElement("div");
  scrollViewport.className = "split-grid__viewport split-grid__viewport--scroll";

  frozenPane.append(frozenViewport);
  scrollPane.append(scrollViewport);
  root.append(frozenPane, scrollPane);

  root.addEventListener("mouseover", handleGridMouseOver);
  root.addEventListener("mouseout", handleGridMouseOut);
  root.addEventListener("mouseleave", clearHoveredRow);

  frozenViewport.addEventListener("scroll", () => {
    syncViewportScroll(frozenViewport, scrollViewport);
  });
  scrollViewport.addEventListener("scroll", () => {
    syncViewportScroll(scrollViewport, frozenViewport);
  });

  gridContainer.classList.add("data-grid--split");
  gridContainer.replaceChildren(root);

  Object.assign(splitGridState, {
    root,
    frozenPane,
    scrollPane,
    frozenViewport,
    scrollViewport,
  });

  return splitGridState;
}

function createTable({
  columns,
  pane,
  tableWidth,
  ariaLabel,
  emptyStateMessage,
  isEmptyStatePlaceholder = false,
}) {
  const table = document.createElement("table");
  table.className = `stats-table stats-table--${pane}`;
  table.setAttribute("aria-label", ariaLabel);
  table.style.setProperty("--table-width", `${tableWidth}px`);

  table.append(createColGroup(columns));

  const thead = document.createElement("thead");
  const headerRow = document.createElement("tr");
  headerRow.className = "stats-table__header-row";
  columns.forEach((column) => {
    headerRow.append(createHeaderCell(column));
  });
  thead.append(headerRow);
  table.append(thead);

  const tbody = document.createElement("tbody");
  if (!state.displayedRows.length) {
    tbody.append(
      createEmptyStateRow(columns.length, emptyStateMessage, {
        isPlaceholder: isEmptyStatePlaceholder,
      }),
    );
  } else {
    state.displayedRows.forEach((row, rowIndex) => {
      tbody.append(createBodyRow(row, columns, rowIndex));
    });
  }
  table.append(tbody);

  return table;
}

function createColGroup(columns) {
  const colgroup = document.createElement("colgroup");
  columns.forEach((column) => {
    const col = document.createElement("col");
    col.style.width = `${column.width}px`;
    col.style.minWidth = `${column.width}px`;
    col.style.maxWidth = `${column.width}px`;
    colgroup.append(col);
  });
  return colgroup;
}

function createHeaderCell(column) {
  const th = document.createElement("th");
  th.className = "stats-table__header-cell";
  th.scope = "col";
  applyColumnStyle(th, column);
  th.setAttribute("aria-sort", getAriaSort(column.name));

  const button = document.createElement("button");
  button.type = "button";
  button.className = "stats-table__head-button";
  button.setAttribute("aria-label", `Sort by ${column.name}`);
  button.addEventListener("click", () => handleHeaderSort(column.name));

  const label = document.createElement("span");
  label.className = "stats-table__head-label";
  label.textContent = column.name;

  const indicator = document.createElement("span");
  indicator.className = "stats-table__sort-indicator";
  indicator.textContent = getSortIndicator(column.name);
  indicator.setAttribute("aria-hidden", "true");

  if (getActiveSortColumn() === column.name) {
    indicator.classList.add("is-active");
  }

  button.append(label, indicator);
  th.append(button);
  return th;
}

function createBodyRow(row, columns, rowIndex) {
  const tr = document.createElement("tr");
  tr.className = "stats-table__body-row";
  tr.dataset.rowIndex = String(rowIndex);
  columns.forEach((column) => {
    tr.append(createBodyCell(row, column));
  });
  return tr;
}

function createBodyCell(row, column) {
  const value = row[column.name];
  const td = document.createElement("td");
  td.classList.add("stats-table__body-cell");
  applyColumnStyle(td, column);

  const cellClasses = getCellClass({
    colDef: { field: column.name },
    value,
  })
    .split(/\s+/)
    .filter(Boolean);

  td.classList.add(...cellClasses);
  td.title = formatCellValue(value);

  const content = document.createElement("div");
  content.className = "stats-table__cell-content";

  if (column.name === FPTS_COLUMN && !isMissingValue(value)) {
    content.append(createFptsChip(value));
  } else {
    content.textContent = formatDisplayValue(column.name, value);
  }

  td.append(content);
  return td;
}

function createFptsChip(value) {
  const chip = document.createElement("span");
  const tier = getFormattingTier(FPTS_COLUMN, value);
  chip.className = `stats-table__fpts-chip stats-table__fpts-chip--tier-${tier}`;
  chip.textContent = formatDisplayValue(FPTS_COLUMN, value);
  return chip;
}

function createEmptyStateRow(columnCount, message, { isPlaceholder = false } = {}) {
  const tr = document.createElement("tr");
  tr.className = "stats-table__empty-row";

  const td = document.createElement("td");
  td.className = "stats-table__empty-cell";
  td.colSpan = Math.max(columnCount, 1);
  td.textContent = message;

  if (isPlaceholder) {
    td.classList.add("stats-table__empty-cell--placeholder");
  }

  tr.append(td);
  return tr;
}

function applyColumnStyle(cell, column) {
  cell.style.setProperty("--column-width", `${column.width}px`);
}

function getAriaSort(columnName) {
  if (getActiveSortColumn() !== columnName) {
    return "none";
  }

  return state.sort.direction === "asc" ? "ascending" : "descending";
}

function getSortIndicator(columnName) {
  if (getActiveSortColumn() !== columnName) {
    return "↕";
  }

  return state.sort.direction === "asc" ? "▲" : "▼";
}

function handleHeaderSort(columnName) {
  if (state.sort.column === columnName) {
    state.sort.direction = state.sort.direction === "asc" ? "desc" : "asc";
  } else {
    state.sort = {
      column: columnName,
      direction: "asc",
    };
  }

  refreshGrid();
}

function getVisibleRows() {
  const predicate = CATEGORY_FILTERS[state.activeCategory];
  return state.rows.filter((row) => predicate(row, state));
}

function matchesSearch(row) {
  const query = state.searchText.trim().toLowerCase();
  if (!query) {
    return true;
  }

  return COLUMN_SETS[state.activeCategory].some((columnName) => {
    const value = row[columnName];
    return !isMissingValue(value) && String(value).toLowerCase().includes(query);
  });
}

function sortRows(rows) {
  const sortColumn = getActiveSortColumn();
  const directionMultiplier = state.sort.direction === "desc" ? -1 : 1;

  return [...rows].sort((left, right) => {
    const primaryResult = compareGridValues(left[sortColumn], right[sortColumn]);
    if (primaryResult !== 0) {
      return primaryResult * directionMultiplier;
    }

    if (sortColumn !== "RK") {
      const rankFallback = compareGridValues(left.RK, right.RK);
      if (rankFallback !== 0) {
        return rankFallback;
      }
    }

    const playerFallback = compareGridValues(left.PLAYER, right.PLAYER);
    if (playerFallback !== 0) {
      return playerFallback;
    }

    return compareGridValues(left.POS, right.POS);
  });
}

function getActiveSortColumn() {
  const columns = COLUMN_SETS[state.activeCategory];
  return columns.includes(state.sort.column) ? state.sort.column : "RK";
}

function getColumnWidth(columnName) {
  const widths = state.isCompactViewport ? MOBILE_COLUMN_WIDTHS : COLUMN_WIDTHS;
  return widths[columnName] ?? (state.isCompactViewport ? 58 : 94);
}

function isCompactViewport() {
  return window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`).matches;
}

function handleViewportResize() {
  cancelAnimationFrame(resizeFrame);
  resizeFrame = requestAnimationFrame(() => {
    const nextCompact = isCompactViewport();
    if (nextCompact === state.isCompactViewport) {
      scheduleRowHeightSync();
      return;
    }

    state.isCompactViewport = nextCompact;
    refreshGrid();
  });
}

function syncViewportScroll(source, target) {
  if (!target || syncingViewport === source || source.scrollTop === target.scrollTop) {
    return;
  }

  syncingViewport = target;
  target.scrollTop = source.scrollTop;

  requestAnimationFrame(() => {
    if (syncingViewport === target) {
      syncingViewport = null;
    }
  });
}

function observeSplitGrid() {
  if (!window.ResizeObserver) {
    return;
  }

  if (!resizeObserver) {
    resizeObserver = new ResizeObserver(() => {
      if (isApplyingRowHeights) {
        return;
      }

      scheduleRowHeightSync();
    });
  }

  resizeObserver.disconnect();

  [
    splitGridState.root,
    splitGridState.frozenViewport,
    splitGridState.scrollViewport,
    splitGridState.frozenTable,
    splitGridState.scrollTable,
  ]
    .filter(Boolean)
    .forEach((element) => {
      resizeObserver.observe(element);
    });
}

function scheduleRowHeightSync() {
  cancelAnimationFrame(rowHeightSyncFrame);
  rowHeightSyncFrame = requestAnimationFrame(syncRowHeights);
}

function syncRowHeights() {
  const { frozenTable, scrollTable } = splitGridState;
  if (!frozenTable || !scrollTable) {
    return;
  }

  isApplyingRowHeights = true;
  clearRowHeights(frozenTable);
  clearRowHeights(scrollTable);

  const frozenHeaderRow = frozenTable.tHead?.rows[0];
  const scrollHeaderRow = scrollTable.tHead?.rows[0];
  syncPairedRowHeight(frozenHeaderRow, scrollHeaderRow);

  const frozenRows = Array.from(frozenTable.tBodies[0]?.rows || []);
  const scrollRows = Array.from(scrollTable.tBodies[0]?.rows || []);
  const rowCount = Math.max(frozenRows.length, scrollRows.length);

  for (let index = 0; index < rowCount; index += 1) {
    syncPairedRowHeight(frozenRows[index], scrollRows[index]);
  }

  requestAnimationFrame(() => {
    isApplyingRowHeights = false;
  });
}

function clearRowHeights(table) {
  table.querySelectorAll("tr").forEach((row) => {
    row.style.height = "";
  });
}

function syncPairedRowHeight(leftRow, rightRow) {
  const height = Math.max(
    measureRowHeight(leftRow),
    measureRowHeight(rightRow),
  );

  if (!height) {
    return;
  }

  [leftRow, rightRow].forEach((row) => {
    if (row) {
      row.style.height = `${height}px`;
    }
  });
}

function measureRowHeight(row) {
  return row ? Math.ceil(row.getBoundingClientRect().height) : 0;
}

function handleGridMouseOver(event) {
  const row = getRowFromEventTarget(event.target);
  if (!row) {
    return;
  }

  const relatedRow = getRowFromEventTarget(event.relatedTarget);
  if (relatedRow?.dataset.rowIndex === row.dataset.rowIndex) {
    return;
  }

  setHoveredRow(row.dataset.rowIndex);
}

function handleGridMouseOut(event) {
  const row = getRowFromEventTarget(event.target);
  if (!row) {
    return;
  }

  const relatedRow = getRowFromEventTarget(event.relatedTarget);
  if (relatedRow?.dataset.rowIndex === row.dataset.rowIndex) {
    return;
  }

  clearHoveredRow();
}

function getRowFromEventTarget(target) {
  if (!(target instanceof Element)) {
    return null;
  }

  const row = target.closest("tbody tr[data-row-index]");
  if (!row || !splitGridState.root?.contains(row)) {
    return null;
  }

  return row;
}

function setHoveredRow(rowIndex) {
  if (hoveredRowIndex === rowIndex) {
    return;
  }

  clearHoveredRow();
  hoveredRowIndex = rowIndex;
  getLinkedRows(rowIndex).forEach((row) => {
    row.classList.add("is-row-hover");
  });
}

function clearHoveredRow() {
  if (hoveredRowIndex == null) {
    return;
  }

  getLinkedRows(hoveredRowIndex).forEach((row) => {
    row.classList.remove("is-row-hover");
  });
  hoveredRowIndex = null;
}

function getLinkedRows(rowIndex) {
  if (!splitGridState.root) {
    return [];
  }

  return Array.from(
    splitGridState.root.querySelectorAll(
      `tbody tr[data-row-index="${rowIndex}"]`,
    ),
  );
}

function normalizeRow(sourceRow) {
  const normalized = {};

  for (const columnName of ALL_COLUMNS) {
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

function getCellClass(params) {
  const classes = ["dh-grid-cell"];
  const columnName = params.colDef.field;
  const missingValue = isMissingValue(params.value);

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

  if (missingValue) {
    classes.push("na-cell");
    return classes.join(" ");
  }

  if (columnName === FPTS_COLUMN) {
    classes.push("fpts-cell", `fpts-cell--tier-${getFormattingTier(columnName, params.value)}`);
    return classes.join(" ");
  }

  if (!NON_FORMATTED_COLUMNS.has(columnName)) {
    const family = NEUTRAL_COLUMNS.has(columnName) ? "neutral" : "heat";
    const tier = getFormattingTier(columnName, params.value);
    classes.push("heat-cell", `heat-cell--${family}`, `heat-cell--tier-${tier}`);
  }

  return classes.join(" ");
}

function formatCellValue(value) {
  return isMissingValue(value) ? "NA" : value;
}

function formatDisplayValue(columnName, value) {
  const formattedValue = formatCellValue(value);

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

function showOverlay({ title, description, showActions = false }) {
  overlayTitle.textContent = title;
  overlayDescription.textContent = description;
  overlayActions.hidden = !showActions;
  overlay.classList.remove("is-hidden");
}

function hideOverlay() {
  overlay.classList.add("is-hidden");
}
