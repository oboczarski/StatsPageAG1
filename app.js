import {
  AllCommunityModule,
  ModuleRegistry,
  createGrid,
  themeBalham,
} from "./node_modules/ag-grid-community/dist/package/main.esm.mjs";
import {
  IconActivity,
  IconAlertTriangle,
  IconArrowsLeftRight,
  IconArrowsMoveHorizontal,
  IconArrowsSort,
  IconBallAmericanFootball,
  IconBadge,
  IconBinaryTree2,
  IconBolt,
  IconCalendarStats,
  IconCalendarTime,
  IconChartBar,
  IconChartDonut,
  IconChartLine,
  IconChevronDown,
  IconChevronRight,
  IconCircleLetterG,
  IconClockHour4,
  IconFilter,
  IconFlag,
  IconFlame,
  IconGauge,
  IconHelmet,
  IconMedal,
  IconMenu2,
  IconRoute,
  IconRulerMeasure,
  IconRun,
  IconShieldX,
  IconSortAscending,
  IconSortDescending,
  IconSparkles,
  IconStars,
  IconTarget,
  IconTargetArrow,
  IconTrophy,
  IconUser,
  IconWaveSine,
  IconWind,
  renderTablerIcon,
} from "./tabler-icons.js";

ModuleRegistry.registerModules([AllCommunityModule]);

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

/**
 * @typedef {Object} HeaderMeta
 * @property {string} shortLabel
 * @property {string} longLabel
 * @property {string} headerIcon
 * @property {string} filter
 * @property {{ desktop: number, mobile: number }} widths
 * @property {{ desktop: number, mobile: number }} minWidths
 * @property {("fptsChip" | "posChip" | null)} renderer
 */

/**
 * @typedef {Object} GroupSpec
 * @property {string} headerName
 * @property {string[]} columns
 * @property {string} headerIcon
 */

/** @typedef {Record<string, GroupSpec[]>} ViewGroupSpec */

const VIEW_GROUPS = /** @type {ViewGroupSpec} */ ({
  overview: [
    createGroup("GENERAL", ["RK", "PLAYER", "POS"], "general"),
    createGroup("INFO", ["TM", "AGE"], "info"),
    createGroup("FANTASY", ["FPTS", "PPG", "VALUE", "ADP", "POS·ADP"], "fantasyGroup"),
    createGroup("OVERVIEW STATS", [
      "G",
      "SNP%",
      "YDS(t)",
      "YPG(t)",
      "OPP",
      "IMP",
      "IMP/OPP",
      "CSTY%",
      "CL",
    ], "overviewStats"),
  ],
  passing: [
    createGroup("GENERAL", ["RK", "PLAYER", "POS"], "general"),
    createGroup("INFO", ["TM", "AGE", "G"], "info"),
    createGroup("FANTASY", ["FPTS", "PPG", "VALUE", "ADP", "POS·ADP"], "fantasyGroup"),
    createGroup("PASSING", [
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
      "pa1D",
      "IMP/G",
      "pIMP",
      "pIMP/A",
      "TTT",
      "PRS%",
      "SAC",
      "INT",
    ], "passingGroup"),
    createGroup("RUSHING", ["ruYDS", "ruTD", "CAR", "YPC", "FUM"], "rushingGroup"),
    createGroup("CEILING & CONSISTENCY", ["FPOE", "CSTY%", "CL"], "ceilingConsistency"),
  ],
  rushing: [
    createGroup("GENERAL", ["RK", "PLAYER", "POS"], "general"),
    createGroup("INFO", ["TM", "AGE", "G"], "info"),
    createGroup("FANTASY", ["FPTS", "PPG", "VALUE", "ADP", "POS·ADP"], "fantasyGroup"),
    createGroup("RUSHING EFFICIENCY", ["SNP%", "YPC", "ruYPG", "IMP/G"], "rushingEfficiency"),
    createGroup("RUSHING PRODUCTION", ["CAR", "ruYDS", "ruTD", "ru1D", "YDS(t)", "FUM"], "rushingProduction"),
    createGroup("RECEIVING", ["REC", "recYDS", "recTD", "rec1D", "YAC", "TGT"], "receivingGroup"),
    createGroup("ADVANCED RUSHING", [
      "ELU",
      "MTF/A",
      "YCO/A",
      "MTF",
      "YCO",
      "RYOE",
      "EXPLSV%",
    ], "advancedRushing"),
    createGroup("CEILING & CONSISTENCY", ["FPOE", "CSTY%", "CL"], "ceilingConsistency"),
  ],
  receiving: [
    createGroup("GENERAL", ["RK", "PLAYER", "POS"], "general"),
    createGroup("INFO", ["TM", "AGE", "G"], "info"),
    createGroup("FANTASY", ["FPTS", "PPG", "VALUE", "ADP", "POS·ADP"], "fantasyGroup"),
    createGroup("RECEIVING", [
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
      "YDS(t)",
      "RZ Tgt",
    ], "receivingGroup"),
    createGroup("RUSHING", ["CAR", "ruYDS", "ruTD", "YPC", "FUM"], "rushingGroup"),
    createGroup("CEILING & CONSISTENCY", ["FPOE", "CSTY%", "CL"], "ceilingConsistency"),
  ],
});

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

const PINNED_COLUMNS = new Set(["RK", "PLAYER", "POS"]);
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

const CATEGORY_FILTERS = {
  overview: (row) => Boolean(row.POS && row.POS !== "NA"),
  passing: (row) => row.POS === "QB",
  rushing: (row) => row.POS === "RB",
  receiving: (row, state) =>
    (row.POS === "WR" && state.receivingFilters.WR) ||
    (row.POS === "TE" && state.receivingFilters.TE),
};

const MOBILE_BREAKPOINT = 719;
const PLAYER_COLUMN = "PLAYER";
const POS_COLUMN = "POS";
const FPTS_COLUMN = "FPTS";

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

const HEADER_META = /** @type {Record<string, HeaderMeta>} */ (
  createHeaderMeta({
    RK: { longLabel: "Rank", headerIcon: "rank" },
    PLAYER: {
      longLabel: "Player",
      headerIcon: "player",
    },
    POS: {
      longLabel: "Position",
      headerIcon: "position",
      renderer: "posChip",
    },
    TM: { longLabel: "Team", headerIcon: "team" },
    AGE: { longLabel: "Age", headerIcon: "age" },
    G: { longLabel: "Games Played", headerIcon: "games" },
    FPTS: {
      longLabel: "Fantasy Points",
      headerIcon: "fantasy",
      renderer: "fptsChip",
    },
    PPG: { longLabel: "Fantasy Points Per Game", headerIcon: "fantasy" },
    VALUE: { longLabel: "Trade Value", headerIcon: "trade" },
    ADP: { longLabel: "Average Draft Position", headerIcon: "draft" },
    "POS·ADP": { longLabel: "Positional ADP", headerIcon: "draft" },
    "SNP%": { longLabel: "Snap Percentage", headerIcon: "snap" },
    "YDS(t)": { longLabel: "Total Yards", headerIcon: "yards" },
    "YPG(t)": { longLabel: "Total Yards Per Game", headerIcon: "yards" },
    OPP: { longLabel: "Opportunity", headerIcon: "opportunity" },
    IMP: { longLabel: "Impact", headerIcon: "impact" },
    "IMP/OPP": { longLabel: "Impact Per Opportunity", headerIcon: "impact" },
    "CSTY%": { longLabel: "Consistency Percentage", headerIcon: "consistency" },
    CL: { longLabel: "Ceiling", headerIcon: "ceiling" },
    paYDS: { longLabel: "Passing Yards", headerIcon: "passing" },
    paTD: { longLabel: "Passing Touchdowns", headerIcon: "passing" },
    "CMP%": { longLabel: "Completion Percentage", headerIcon: "passing" },
    paATT: { longLabel: "Pass Attempts", headerIcon: "passing" },
    paRTG: { longLabel: "Passer Rating", headerIcon: "passing" },
    "EPA/DB": {
      longLabel: "Expected Points Added Per Dropback",
      headerIcon: "advanced",
    },
    CPOE: {
      longLabel: "Completion Percentage Over Expected",
      headerIcon: "advanced",
    },
    CMP: { longLabel: "Completions", headerIcon: "passing" },
    paYPG: { longLabel: "Passing Yards Per Game", headerIcon: "passing" },
    ruYDS: { longLabel: "Rushing Yards", headerIcon: "rushing" },
    ruTD: { longLabel: "Rushing Touchdowns", headerIcon: "rushing" },
    pa1D: { longLabel: "Passing First Downs", headerIcon: "passing" },
    "IMP/G": { longLabel: "Impact Per Game", headerIcon: "impact" },
    pIMP: { longLabel: "Passing Impact", headerIcon: "impact" },
    "pIMP/A": { longLabel: "Passing Impact Per Attempt", headerIcon: "impact" },
    CAR: { longLabel: "Carries", headerIcon: "rushing" },
    YPC: { longLabel: "Yards Per Carry", headerIcon: "efficiency" },
    TTT: { longLabel: "Time To Throw", headerIcon: "time" },
    "PRS%": { longLabel: "Pressure Percentage", headerIcon: "risk" },
    SAC: { longLabel: "Sacks", headerIcon: "risk" },
    INT: { longLabel: "Interceptions", headerIcon: "risk" },
    FUM: { longLabel: "Fumbles", headerIcon: "risk" },
    FPOE: { longLabel: "Fantasy Points Over Expected", headerIcon: "ceiling" },
    REC: { longLabel: "Receptions", headerIcon: "receiving" },
    recYDS: { longLabel: "Receiving Yards", headerIcon: "receiving" },
    TGT: { longLabel: "Targets", headerIcon: "target" },
    ELU: { longLabel: "Elusiveness Rating", headerIcon: "advanced" },
    "MTF/A": {
      longLabel: "Missed Tackles Forced Per Attempt",
      headerIcon: "brokenTackle",
    },
    "YCO/A": {
      longLabel: "Yards Created Per Attempt",
      headerIcon: "created",
    },
    MTF: { longLabel: "Missed Tackles Forced", headerIcon: "brokenTackle" },
    YCO: { longLabel: "Yards Created", headerIcon: "created" },
    "EXPLSV%": { longLabel: "Explosive Rush Rate", headerIcon: "burst" },
    ru1D: { longLabel: "Rushing First Downs", headerIcon: "rushing" },
    RYOE: { longLabel: "Rushing Yards Over Expected", headerIcon: "advanced" },
    recTD: { longLabel: "Receiving Touchdowns", headerIcon: "receiving" },
    rec1D: { longLabel: "Receiving First Downs", headerIcon: "receiving" },
    YAC: { longLabel: "Yards After Catch", headerIcon: "yac" },
    "TS%": { longLabel: "Target Share", headerIcon: "target" },
    YPRR: { longLabel: "Yards Per Route Run", headerIcon: "route" },
    "1DRR": { longLabel: "First Downs Per Route Run", headerIcon: "route" },
    recYPG: { longLabel: "Receiving Yards Per Game", headerIcon: "receiving" },
    "AY%": { longLabel: "Air Yards Share", headerIcon: "air" },
    YPR: { longLabel: "Yards Per Reception", headerIcon: "efficiency" },
    RR: { longLabel: "Routes Run", headerIcon: "route" },
    "RZ Tgt": { longLabel: "Red Zone Targets", headerIcon: "target" },
  })
);

const ALL_COLUMNS = Array.from(
  new Set(
    Object.values(VIEW_GROUPS).flatMap((groups) =>
      groups.flatMap((group) => group.columns),
    ),
  ),
);

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

const PROVIDED_HEADER_TEMPLATE = `
  <div class="ag-cell-label-container dh-header-template" role="presentation">
    <span data-ref="eMenu" class="ag-header-icon ag-header-cell-menu-button" aria-hidden="true"></span>
    <span data-ref="eFilterButton" class="ag-header-icon ag-header-cell-filter-button" aria-hidden="true"></span>
    <div data-ref="eLabel" class="ag-header-cell-label" role="presentation">
      <span data-ref="eText" class="ag-header-cell-text"></span>
      <span data-ref="eFilter" class="ag-header-icon ag-header-label-icon ag-filter-icon" aria-hidden="true"></span>
      <span data-ref="eSortOrder" class="ag-header-icon ag-header-label-icon ag-sort-order" aria-hidden="true"></span>
      <span data-ref="eSortAsc" class="ag-header-icon ag-header-label-icon ag-sort-ascending-icon" aria-hidden="true"></span>
      <span data-ref="eSortDesc" class="ag-header-icon ag-header-label-icon ag-sort-descending-icon" aria-hidden="true"></span>
      <span data-ref="eSortAbsoluteAsc" class="ag-header-icon ag-header-label-icon ag-sort-absolute-ascending-icon ag-hidden" aria-hidden="true"></span>
      <span data-ref="eSortAbsoluteDesc" class="ag-header-icon ag-header-label-icon ag-sort-absolute-descending-icon ag-hidden" aria-hidden="true"></span>
      <span data-ref="eSortMixed" class="ag-header-icon ag-header-label-icon ag-sort-mixed-icon ag-hidden" aria-hidden="true"></span>
      <span data-ref="eSortNone" class="ag-header-icon ag-header-label-icon ag-sort-none-icon" aria-hidden="true"></span>
    </div>
  </div>`;

const HEADER_ICON_MARKUP = createIconMarkupRegistry({
  rank: IconMedal,
  player: IconUser,
  position: IconBadge,
  team: IconFlag,
  age: IconCalendarTime,
  games: IconCircleLetterG,
  fantasy: IconSparkles,
  trade: IconArrowsLeftRight,
  draft: IconTargetArrow,
  snap: IconActivity,
  yards: IconRulerMeasure,
  opportunity: IconTarget,
  impact: IconBolt,
  consistency: IconWaveSine,
  ceiling: IconStars,
  passing: IconBallAmericanFootball,
  rushing: IconRun,
  receiving: IconRoute,
  target: IconTargetArrow,
  efficiency: IconGauge,
  time: IconClockHour4,
  risk: IconAlertTriangle,
  advanced: IconBinaryTree2,
  brokenTackle: IconShieldX,
  created: IconChartLine,
  burst: IconFlame,
  yac: IconArrowsMoveHorizontal,
  route: IconRoute,
  air: IconWind,
  stat: IconChartBar,
});

const GROUP_ICON_MARKUP = createIconMarkupRegistry({
  general: IconMedal,
  info: IconCalendarStats,
  fantasyGroup: IconTrophy,
  overviewStats: IconChartLine,
  passingGroup: IconBallAmericanFootball,
  rushingGroup: IconRun,
  rushingEfficiency: IconGauge,
  rushingProduction: IconHelmet,
  receivingGroup: IconRoute,
  advancedRushing: IconChartDonut,
  ceilingConsistency: IconStars,
});

const GRID_ICON_OVERRIDES = Object.freeze({
  menu: renderTablerIcon(IconMenu2),
  menuAlt: renderTablerIcon(IconMenu2),
  filter: renderTablerIcon(IconFilter),
  filterActive: renderTablerIcon(IconFilter),
  sortAscending: renderTablerIcon(IconSortAscending),
  sortDescending: renderTablerIcon(IconSortDescending),
  sortUnSort: renderTablerIcon(IconArrowsSort),
  columnGroupOpened: renderTablerIcon(IconChevronDown),
  columnGroupClosed: renderTablerIcon(IconChevronRight),
});

class DataHubInnerHeader {
  init(params) {
    this.eGui = document.createElement("span");
    this.eGui.className = "dh-inner-header";

    this.eIcon = document.createElement("span");
    this.eIcon.className = "dh-inner-header__icon";
    this.eLabel = document.createElement("span");
    this.eLabel.className = "dh-inner-header__label";

    this.eGui.append(this.eIcon, this.eLabel);
    this.refresh(params);
  }

  getGui() {
    return this.eGui;
  }

  refresh(params) {
    const iconMarkup = getHeaderIconMarkup(params.iconKey);
    this.eIcon.innerHTML = iconMarkup;
    this.eIcon.hidden = !iconMarkup;
    this.eLabel.textContent = params.displayName;
    this.eGui.title = params.longLabel ?? params.displayName;
    this.eGui.dataset.iconKey = params.iconKey || "";
    return true;
  }
}

class DataHubGroupHeader {
  init(params) {
    this.eGui = document.createElement("span");
    this.eGui.className = "dh-group-header";

    this.eIcon = document.createElement("span");
    this.eIcon.className = "dh-group-header__icon";
    this.eLabel = document.createElement("span");
    this.eLabel.className = "dh-group-header__label";

    this.eGui.append(this.eIcon, this.eLabel);
    this.refresh(params);
  }

  getGui() {
    return this.eGui;
  }

  refresh(params) {
    const displayName =
      params.displayName ??
      params.columnGroup?.getColGroupDef?.().headerName ??
      "";
    const iconMarkup = getGroupIconMarkup(params.iconKey);
    this.eIcon.innerHTML = iconMarkup;
    this.eIcon.hidden = !iconMarkup;
    this.eLabel.textContent = displayName;
    this.eGui.title = params.longLabel ?? displayName;
    this.eGui.dataset.iconKey = params.iconKey || "";
    return true;
  }
}

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

const gridTheme = themeBalham.withParams({
  spacing: 6,
  fontFamily: "var(--font-sans)",
  fontSize: 12,
  dataFontSize: 12,
  headerFontWeight: 600,
  borderRadius: 16,
  backgroundColor: "rgba(8, 15, 26, 0.01)",
  headerBackgroundColor: "transparent",
  chromeBackgroundColor: "rgba(10, 18, 30, 0.18)",
  foregroundColor: "rgba(236, 242, 252, 0.94)",
  textColor: "rgba(236, 242, 252, 0.94)",
  headerTextColor: "rgba(202, 222, 247, 0.88)",
  borderColor: "transparent",
  accentColor: "rgba(102, 215, 255, 0.92)",
  browserColorScheme: "dark",
  cardShadow: "0 18px 42px rgba(0, 0, 0, 0.28)",
  popupShadow: "0 22px 48px rgba(0, 0, 0, 0.44)",
  menuShadow: "0 22px 48px rgba(0, 0, 0, 0.44)",
  headerHeight: 44,
  iconSize: 12,
});

const gridOptions = {
  theme: gridTheme,
  columnDefs: buildColumnDefs(),
  icons: GRID_ICON_OVERRIDES,
  rowData: [],
  loading: true,
  animateRows: false,
  suppressCellFocus: false,
  suppressRowHoverHighlight: true,
  suppressMovableColumns: true,
  cacheQuickFilter: true,
  enableBrowserTooltips: true,
  rowHeight: getRowHeight(),
  headerHeight: getHeaderHeight(),
  groupHeaderHeight: getGroupHeaderHeight(),
  overlayLoadingTemplate:
    '<span class="ag-overlay-loading-center">Preparing Data Hub…</span>',
  overlayNoRowsTemplate:
    '<span class="ag-overlay-no-rows-center">No players match the current view.</span>',
  defaultColDef: {
    sortable: true,
    resizable: true,
    filter: true,
    minWidth: 84,
    cellClass: getCellClass,
    comparator: compareGridValues,
  },
};

const gridApi = createGrid(document.querySelector("#player-grid"), gridOptions);

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
    gridApi.setGridOption("quickFilterText", state.searchText);
    updateRowCount();
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
    gridApi.setGridOption("loading", false);
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
    gridApi.setGridOption("loading", true);
    const csvText = await file.text();
    applyCsvText(csvText);
    hideOverlay();
  } catch (error) {
    console.error(error);
    gridApi.setGridOption("loading", false);
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

  gridApi.setGridOption("loading", false);
  refreshGrid();
}

function refreshGrid() {
  const visibleRows = getVisibleRows();
  state.columnFormatting = buildColumnFormatting(visibleRows);
  gridApi.setGridOption("columnDefs", buildColumnDefs());
  syncActiveColumnOrder();
  gridApi.setGridOption("rowData", visibleRows);
  gridApi.setGridOption("quickFilterText", state.searchText);

  if (visibleRows.length === 0 && !gridApi.getGridOption("loading")) {
    gridApi.showNoRowsOverlay();
  } else if (!gridApi.getGridOption("loading")) {
    gridApi.hideOverlay();
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
  const displayedRows = gridApi.getDisplayedRowCount();
  rowCount.textContent = `${displayedRows} row${displayedRows === 1 ? "" : "s"}`;
}

function buildColumnDefs() {
  return VIEW_GROUPS[state.activeCategory].map((group) => ({
    headerName: group.headerName,
    headerTooltip: group.headerName,
    groupId: `${state.activeCategory}-${toGroupId(group.headerName)}`,
    marryChildren: true,
    suppressMovable: true,
    headerClass: "dh-header-group-cell",
    headerGroupComponent: DataHubGroupHeader,
    headerGroupComponentParams: buildGroupHeaderComponentParams(group),
    children: group.columns.map((columnName) => buildLeafColumnDef(columnName)),
  }));
}

function buildLeafColumnDef(columnName) {
  const meta = getHeaderMeta(columnName);
  const isNumericColumn = meta.filter !== "agTextColumnFilter";

  return {
    headerName: meta.shortLabel,
    headerTooltip: meta.longLabel,
    field: columnName,
    width: getColumnWidth(columnName),
    minWidth: getColumnMinWidth(columnName),
    pinned: PINNED_COLUMNS.has(columnName) ? "left" : null,
    lockPinned: PINNED_COLUMNS.has(columnName),
    suppressMovable: true,
    filter: meta.filter,
    type: isNumericColumn ? "numericColumn" : undefined,
    headerClass: "dh-header-cell",
    headerComponentParams: buildHeaderComponentParams(columnName),
    valueFormatter: formatGridValue,
    cellRenderer: getCellRenderer(columnName),
    cellClass: getCellClass,
    comparator: compareGridValues,
  };
}

function getVisibleRows() {
  const predicate = CATEGORY_FILTERS[state.activeCategory];
  return state.rows.filter((row) => predicate(row, state));
}

function buildHeaderComponentParams(columnName) {
  const meta = getHeaderMeta(columnName);

  return {
    template: PROVIDED_HEADER_TEMPLATE,
    innerHeaderComponent: DataHubInnerHeader,
    innerHeaderComponentParams: {
      iconKey: meta.headerIcon,
      longLabel: meta.longLabel,
    },
  };
}

function buildGroupHeaderComponentParams(group) {
  return {
    iconKey: group.headerIcon,
    longLabel: group.headerName,
  };
}

function getCellRenderer(columnName) {
  const renderer = getHeaderMeta(columnName).renderer;

  if (renderer === "fptsChip") {
    return renderFptsCell;
  }

  if (renderer === "posChip") {
    return renderPosChip;
  }

  return undefined;
}

function getHeaderMeta(columnName) {
  return HEADER_META[columnName] ?? createHeaderMetaEntry(columnName, {});
}

function getColumnMinWidth(columnName) {
  const meta = getHeaderMeta(columnName);
  return state.isCompactViewport ? meta.minWidths.mobile : meta.minWidths.desktop;
}

function getColumnWidth(columnName) {
  const meta = getHeaderMeta(columnName);
  const baseWidth = state.isCompactViewport ? meta.widths.mobile : meta.widths.desktop;
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
  return state.isCompactViewport ? 34 : 40;
}

function getGroupHeaderHeight() {
  return state.isCompactViewport ? 24 : 28;
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
    gridApi.setGridOption("rowHeight", getRowHeight());
    gridApi.setGridOption("headerHeight", getHeaderHeight());
    gridApi.setGridOption("groupHeaderHeight", getGroupHeaderHeight());
    refreshGrid();
  });
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

  if (columnName === POS_COLUMN) {
    classes.push("pos-cell");
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

function formatGridValue(params) {
  return formatDisplayValue(params.colDef.field, params.value);
}

function renderFptsCell(params) {
  const displayValue = params.valueFormatted ?? formatDisplayValue(FPTS_COLUMN, params.value);

  if (isMissingValue(params.value)) {
    return displayValue;
  }

  const safeValue = escapeHtml(displayValue);
  const tier = getFormattingTier(FPTS_COLUMN, params.value);
  return `<span class="dh-fpts-chip dh-fpts-chip--tier-${tier}">${safeValue}</span>`;
}

function renderPosChip(params) {
  const displayValue = params.valueFormatted ?? formatDisplayValue(POS_COLUMN, params.value);

  if (isMissingValue(params.value)) {
    return displayValue;
  }

  const chipTone = getPositionChipTone(params.value);
  const safeValue = escapeHtml(String(displayValue).toUpperCase());
  return `<span class="dh-pos-chip dh-pos-chip--${chipTone}">${safeValue}</span>`;
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
  const columns = getActiveLeafColumns();

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

function getActiveLeafColumns() {
  return VIEW_GROUPS[state.activeCategory].flatMap((group) => group.columns);
}

function syncActiveColumnOrder() {
  gridApi.applyColumnState({
    state: getActiveLeafColumns().map((columnName) => ({
      colId: columnName,
      pinned: PINNED_COLUMNS.has(columnName) ? "left" : null,
    })),
    applyOrder: true,
  });
}

function getPositionChipTone(value) {
  const normalized = String(value).trim().toUpperCase();

  if (normalized === "QB") {
    return "qb";
  }

  if (normalized === "RB") {
    return "rb";
  }

  if (normalized === "WR") {
    return "wr";
  }

  if (normalized === "TE") {
    return "te";
  }

  return "neutral";
}

function toGroupId(headerName) {
  return String(headerName).toLowerCase().replaceAll(/[^a-z0-9]+/g, "-");
}

function getHeaderIconMarkup(iconKey) {
  return HEADER_ICON_MARKUP[iconKey] ?? HEADER_ICON_MARKUP.stat;
}

function getGroupIconMarkup(iconKey) {
  return GROUP_ICON_MARKUP[iconKey] ?? "";
}

function createGroup(headerName, columns, headerIcon) {
  return { headerName, columns, headerIcon };
}

function createHeaderMeta(definitions) {
  return Object.fromEntries(
    Object.entries(definitions).map(([columnName, definition]) => [
      columnName,
      createHeaderMetaEntry(columnName, definition),
    ]),
  );
}

function createHeaderMetaEntry(columnName, definition) {
  const shortLabel = definition.shortLabel ?? columnName;

  return {
    shortLabel,
    longLabel: definition.longLabel ?? shortLabel,
    headerIcon: definition.headerIcon ?? "stat",
    filter:
      definition.filter ??
      (LABEL_COLUMNS.has(columnName) ? "agTextColumnFilter" : "agNumberColumnFilter"),
    widths: {
      desktop: definition.width ?? COLUMN_WIDTHS[columnName] ?? 94,
      mobile: definition.mobileWidth ?? MOBILE_COLUMN_WIDTHS[columnName] ?? 58,
    },
    minWidths: {
      desktop: definition.minWidth ?? computeHeaderMinWidth(shortLabel, false),
      mobile: definition.mobileMinWidth ?? computeHeaderMinWidth(shortLabel, true),
    },
    renderer: definition.renderer ?? null,
  };
}

function computeHeaderMinWidth(label, compact) {
  const charWidth = compact ? 6.1 : 6.9;
  const sideSpace = compact ? 30 : 42;
  return Math.ceil(String(label).length * charWidth + sideSpace);
}

function createIconMarkupRegistry(iconRegistry) {
  return Object.freeze(
    Object.fromEntries(
      Object.entries(iconRegistry).map(([iconKey, iconSvg]) => [
        iconKey,
        renderTablerIcon(iconSvg),
      ]),
    ),
  );
}
