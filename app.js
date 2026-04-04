import {
  AllCommunityModule,
  ModuleRegistry,
  createGrid,
  themeBalham,
} from "https://cdn.jsdelivr.net/npm/ag-grid-community@35.2.0/+esm";

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
 */

/** @typedef {Record<string, GroupSpec[]>} ViewGroupSpec */

const VIEW_GROUPS = /** @type {ViewGroupSpec} */ ({
  overview: [
    createGroup("GENERAL", ["RK", "PLAYER", "POS"]),
    createGroup("INFO", ["TM", "AGE"]),
    createGroup("FANTASY", ["FPTS", "PPG", "VALUE", "ADP", "POS·ADP"]),
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
    ]),
  ],
  passing: [
    createGroup("GENERAL", ["RK", "PLAYER", "POS"]),
    createGroup("INFO", ["TM", "AGE", "G"]),
    createGroup("FANTASY", ["FPTS", "PPG", "VALUE", "ADP", "POS·ADP"]),
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
    ]),
    createGroup("RUSHING", ["ruYDS", "ruTD", "CAR", "YPC", "FUM"]),
    createGroup("CEILING & CONSISTENCY", ["FPOE", "CSTY%", "CL"]),
  ],
  rushing: [
    createGroup("GENERAL", ["RK", "PLAYER", "POS"]),
    createGroup("INFO", ["TM", "AGE", "G"]),
    createGroup("FANTASY", ["FPTS", "PPG", "VALUE", "ADP", "POS·ADP"]),
    createGroup("RUSHING EFFICIENCY", ["SNP%", "YPC", "ruYPG", "IMP/G"]),
    createGroup("RUSHING PRODUCTION", ["CAR", "ruYDS", "ruTD", "ru1D", "YDS(t)", "FUM"]),
    createGroup("RECEIVING", ["REC", "recYDS", "recTD", "rec1D", "YAC", "TGT"]),
    createGroup("ADVANCED RUSHING", [
      "ELU",
      "MTF/A",
      "YCO/A",
      "MTF",
      "YCO",
      "RYOE",
      "EXPLSV%",
    ]),
    createGroup("CEILING & CONSISTENCY", ["FPOE", "CSTY%", "CL"]),
  ],
  receiving: [
    createGroup("GENERAL", ["RK", "PLAYER", "POS"]),
    createGroup("INFO", ["TM", "AGE", "G"]),
    createGroup("FANTASY", ["FPTS", "PPG", "VALUE", "ADP", "POS·ADP"]),
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
    ]),
    createGroup("RUSHING", ["CAR", "ruYDS", "ruTD", "YPC", "FUM"]),
    createGroup("CEILING & CONSISTENCY", ["FPOE", "CSTY%", "CL"]),
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

const GROUP_HEADER_META = Object.freeze({
  GENERAL: { longLabel: "General Player Info", headerIcon: "player" },
  INFO: { longLabel: "Team, Age, and Games Played", headerIcon: "team" },
  FANTASY: {
    longLabel: "Fantasy Production and Market Value",
    headerIcon: "fantasy",
  },
  "OVERVIEW STATS": { longLabel: "Overview Stats", headerIcon: "stat" },
  PASSING: { longLabel: "Passing Stats", headerIcon: "passing" },
  RUSHING: { longLabel: "Rushing Stats", headerIcon: "rushing" },
  "RUSHING EFFICIENCY": {
    longLabel: "Rushing Efficiency",
    headerIcon: "efficiency",
  },
  "RUSHING PRODUCTION": {
    longLabel: "Rushing Production",
    headerIcon: "rushing",
  },
  RECEIVING: { longLabel: "Receiving Stats", headerIcon: "receiving" },
  "ADVANCED RUSHING": {
    longLabel: "Advanced Rushing",
    headerIcon: "advanced",
  },
  "CEILING & CONSISTENCY": {
    longLabel: "Ceiling and Consistency",
    headerIcon: "ceiling",
  },
});

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
  isTouchScrollViewport: isTouchScrollViewport(),
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

const HEADER_ICON_MARKUP = Object.freeze({
  rank: createSvgIcon(
    '<path d="M8 4h8v4a4 4 0 0 1-8 0Z"/><path d="M8 4H5a3 3 0 0 0 3 4"/><path d="M16 4h3a3 3 0 0 1-3 4"/><path d="M9 14h6"/><path d="M10 18h4"/>',
  ),
  player: createSvgIcon(
    '<circle cx="12" cy="8" r="3"/><path d="M5 19c1.9-3 4.3-4.5 7-4.5s5.1 1.5 7 4.5"/>',
  ),
  position: createSvgIcon(
    '<path d="m12 4 7 4-7 4-7-4 7-4Z"/><path d="m5 12 7 4 7-4"/><path d="m5 16 7 4 7-4"/>',
  ),
  team: createSvgIcon(
    '<path d="M6 20V4"/><path d="M7 5h10l-2 3 2 3H7"/>',
  ),
  age: createSvgIcon(
    '<circle cx="12" cy="12" r="7"/><path d="M12 8v4l3 2"/>',
  ),
  games: createSvgIcon(
    '<rect x="4" y="6" width="16" height="13" rx="2"/><path d="M8 3v6"/><path d="M16 3v6"/><path d="M4 10h16"/>',
  ),
  fantasy: createSvgIcon(
    '<path d="m12 3 2.3 5 5.4.5-4 3.6 1.2 5.4L12 15l-4.9 2.5 1.2-5.4-4-3.6 5.4-.5L12 3Z"/>',
  ),
  trade: createSvgIcon(
    '<path d="M7 7h10"/><path d="m13 3 4 4-4 4"/><path d="M17 17H7"/><path d="m11 13-4 4 4 4"/>',
  ),
  draft: createSvgIcon(
    '<circle cx="12" cy="12" r="7"/><circle cx="12" cy="12" r="3"/><path d="M12 5v2"/><path d="M12 17v2"/><path d="M5 12h2"/><path d="M17 12h2"/>',
  ),
  snap: createSvgIcon(
    '<path d="M5 18V9"/><path d="M10 18V6"/><path d="M15 18v-4"/><path d="M20 18V8"/>',
  ),
  yards: createSvgIcon(
    '<path d="M4 16h12"/><path d="m12 12 4 4-4 4"/><path d="M4 8h12"/><path d="m12 4 4 4-4 4"/>',
  ),
  opportunity: createSvgIcon(
    '<circle cx="12" cy="12" r="7"/><circle cx="12" cy="12" r="3"/><path d="M12 5v2"/><path d="M19 12h-2"/>',
  ),
  impact: createSvgIcon(
    '<path d="m13 3-7 10h5l-1 8 8-11h-5l0-7Z"/>',
  ),
  consistency: createSvgIcon(
    '<path d="M4 16c2-2 4-2 6 0s4 2 6 0 4-2 4 0"/>',
  ),
  ceiling: createSvgIcon(
    '<path d="M4 19 10 9l3 4 3-6 4 12"/><path d="M17 4h3v3"/>',
  ),
  passing: createSvgIcon(
    '<path d="M4 15c4-5 9-7 16-6"/><path d="m15 5 5 4-5 4"/><path d="M6 17c1.5 0 3 .5 4 1.5"/>',
  ),
  rushing: createSvgIcon(
    '<path d="M5 18c3-5 5-9 6-12"/><path d="M11 6c2 3 4 5 8 6"/><path d="M10 15c2 1 4 2.5 5 5"/>',
  ),
  receiving: createSvgIcon(
    '<path d="M4 9c3 0 5 1 7 3"/><path d="M20 9c-3 0-5 1-7 3"/><path d="M12 12v8"/><path d="M8 20h8"/>',
  ),
  target: createSvgIcon(
    '<circle cx="12" cy="12" r="7"/><circle cx="12" cy="12" r="3"/><path d="M12 3v3"/><path d="M21 12h-3"/><path d="M12 21v-3"/><path d="M3 12h3"/>',
  ),
  efficiency: createSvgIcon(
    '<path d="M5 16a7 7 0 1 1 14 0"/><path d="m12 12 4-3"/><path d="M12 16v1"/>',
  ),
  time: createSvgIcon(
    '<path d="M9 4h6"/><path d="M10 4v4l4 4"/><path d="M14 4v4l-4 4"/><path d="M9 20h6"/>',
  ),
  risk: createSvgIcon(
    '<path d="M12 3 4 7v5c0 5 3.5 8 8 9 4.5-1 8-4 8-9V7l-8-4Z"/><path d="M12 8v4"/><path d="M12 16h.01"/>',
  ),
  advanced: createSvgIcon(
    '<path d="M12 3v18"/><path d="M4.5 7.5 19.5 16.5"/><path d="M4.5 16.5 19.5 7.5"/><circle cx="12" cy="12" r="2"/>',
  ),
  brokenTackle: createSvgIcon(
    '<path d="m6 6 3 3"/><path d="m15 15 3 3"/><path d="M7 17c2-5 6-9 11-11"/><path d="m14 6 4 1-1 4"/>',
  ),
  created: createSvgIcon(
    '<path d="M5 19 19 5"/><path d="m12 5 7 7"/><path d="M8 16h6"/>',
  ),
  burst: createSvgIcon(
    '<path d="m12 4 1.6 4.4L18 10l-4.4 1.6L12 16l-1.6-4.4L6 10l4.4-1.6L12 4Z"/><path d="m18 4 1 2"/><path d="m5 18 1 2"/>',
  ),
  yac: createSvgIcon(
    '<path d="M5 18c3-4 7-6 13-6"/><path d="m14 8 4 4-4 4"/><path d="M5 10h4"/>',
  ),
  route: createSvgIcon(
    '<circle cx="6" cy="18" r="1.5"/><circle cx="12" cy="10" r="1.5"/><circle cx="18" cy="5" r="1.5"/><path d="M7.5 17 11 11.5"/><path d="M13.5 8.5 16.7 6"/>',
  ),
  air: createSvgIcon(
    '<path d="M5 16c2.5-5 6-8 11-9"/><path d="m13 5 3-1-1 3"/><path d="M8 20h8"/>',
  ),
  stat: createSvgIcon(
    '<path d="M5 18V9"/><path d="M10 18V6"/><path d="M15 18v-3"/><path d="M20 18V11"/>',
  ),
});

const GRID_ICON_OVERRIDES = Object.freeze({
  menu: createSvgIcon('<path d="M5 7h14"/><path d="M8 12h8"/><path d="M11 17h2"/>'),
  menuAlt: createSvgIcon('<path d="M5 7h14"/><path d="M8 12h8"/><path d="M11 17h2"/>'),
  filter: createSvgIcon('<path d="M4 6h16l-6 7v5l-4-2v-3L4 6Z"/>'),
  filterActive: createSvgIcon(
    '<path d="M4 6h16l-6 7v5l-4-2v-3L4 6Z"/><circle cx="18" cy="6" r="2.2" fill="currentColor" stroke="none"/>',
  ),
  sortAscending: createSvgIcon('<path d="m8 14 4-4 4 4"/><path d="M12 10v9"/>'),
  sortDescending: createSvgIcon('<path d="m8 10 4 4 4-4"/><path d="M12 5v9"/>'),
  sortUnSort: createSvgIcon('<path d="m8 9 4-4 4 4"/><path d="m8 15 4 4 4-4"/><path d="M12 5v14"/>'),
  columnGroupOpened: createSvgIcon('<path d="m7 10 5 5 5-5"/>'),
  columnGroupClosed: createSvgIcon('<path d="m10 7 5 5-5 5"/>'),
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

const mainTitle = document.querySelector("#main-title");
const activeViewLabel = document.querySelector("#active-view-label");
const rowCount = document.querySelector("#row-count");
const gridElement = document.querySelector("#player-grid");
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
  maintainColumnOrder: false,
  suppressMovableColumns: true,
  cacheQuickFilter: true,
  enableBrowserTooltips: true,
  rowBuffer: getRowBuffer(),
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

syncViewportModeClasses();

const gridApi = createGrid(gridElement, gridOptions);

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
  applyActiveColumnOrder();
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
  return VIEW_GROUPS[state.activeCategory].map((group) => {
    const groupMeta = getGroupHeaderMeta(group.headerName);

    return {
      headerName: group.headerName,
      headerTooltip: groupMeta.longLabel,
      groupId: `${state.activeCategory}-${toGroupId(group.headerName)}`,
      marryChildren: true,
      suppressStickyLabel: state.isTouchScrollViewport,
      headerClass: "dh-header-group-cell",
      headerGroupComponentParams: buildHeaderGroupComponentParams(group.headerName),
      children: group.columns.map((columnName) => buildLeafColumnDef(columnName)),
    };
  });
}

function buildLeafColumnDef(columnName) {
  const meta = getHeaderMeta(columnName);
  const isNumericColumn = meta.filter !== "agTextColumnFilter";

  return {
    colId: columnName,
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

function applyActiveColumnOrder() {
  gridApi.applyColumnState({
    state: getActiveLeafColumns().map((columnName) => ({ colId: columnName })),
    applyOrder: true,
  });
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

function buildHeaderGroupComponentParams(groupName) {
  const meta = getGroupHeaderMeta(groupName);

  return {
    innerHeaderGroupComponent: DataHubInnerHeader,
    innerHeaderGroupComponentParams: {
      iconKey: meta.headerIcon,
      longLabel: meta.longLabel,
    },
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

function getGroupHeaderMeta(headerName) {
  return GROUP_HEADER_META[headerName] ?? {
    longLabel: headerName,
    headerIcon: "stat",
  };
}

function getColumnMinWidth(columnName) {
  const meta = getHeaderMeta(columnName);
  return state.isCompactViewport ? meta.minWidths.mobile : meta.minWidths.desktop;
}

function getColumnWidth(columnName) {
  const meta = getHeaderMeta(columnName);
  if (state.isCompactViewport) {
    const compactWidth = PINNED_COLUMNS.has(columnName)
      ? meta.widths.mobile - 4
      : meta.widths.mobile + 4;

    return Math.max(compactWidth, getColumnMinWidth(columnName));
  }

  const shrinkBy = columnName === PLAYER_COLUMN ? 14 : 8;
  return Math.max(meta.widths.desktop - shrinkBy, getColumnMinWidth(columnName));
}

function isCompactViewport() {
  return window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`).matches;
}

function isTouchScrollViewport() {
  return (
    window.matchMedia("(pointer: coarse)").matches ||
    navigator.maxTouchPoints > 0
  );
}

function getRowHeight() {
  return state.isCompactViewport ? 34 : 40;
}

function getRowBuffer() {
  return state.isCompactViewport ? 4 : 10;
}

function getHeaderHeight() {
  return state.isCompactViewport ? 34 : 40;
}

function getGroupHeaderHeight() {
  return state.isCompactViewport ? 24 : 28;
}

function syncViewportModeClasses() {
  gridElement.classList.toggle("is-touch-scroll", state.isTouchScrollViewport);
}

let resizeFrame = 0;

function handleViewportResize() {
  cancelAnimationFrame(resizeFrame);
  resizeFrame = requestAnimationFrame(() => {
    const nextCompact = isCompactViewport();
    const nextTouchScroll = isTouchScrollViewport();

    if (
      nextCompact === state.isCompactViewport &&
      nextTouchScroll === state.isTouchScrollViewport
    ) {
      return;
    }

    state.isCompactViewport = nextCompact;
    state.isTouchScrollViewport = nextTouchScroll;
    syncViewportModeClasses();
    gridApi.setGridOption("rowBuffer", getRowBuffer());
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

function createGroup(headerName, columns) {
  return { headerName, columns };
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

function createSvgIcon(paths) {
  return `
    <svg class="dh-grid-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.85" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
      ${paths}
    </svg>
  `.trim();
}
