const PRIMARY_TITLES = {
  "1-QB": "1QB ADP, TRADE VALUES & 2025 STATS",
  SFLX: "SFLX ADP, TRADE VALUES & 2025 STATS",
};

const MOBILE_BREAKPOINT = 719;
const ROW_ID_KEY = "__rowId";
const PLAYER_COLUMN = "PLAYER";
const FPTS_COLUMN = "FPTS";
const FROZEN_COLUMNS = new Set(["RK", "PLAYER", "POS"]);

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

// Lucide path data vendored as inline snippets so headers can render only the
// icons used here without shipping a runtime icon parser.
const LUCIDE_PATHS = {
  award: `<path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526" /> <circle cx="12" cy="8" r="6" />`,
  user: `<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /> <circle cx="12" cy="7" r="4" />`,
  "badge-check": `<path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" /> <path d="m9 12 2 2 4-4" />`,
  flag: `<path d="M4 22V4a1 1 0 0 1 .4-.8A6 6 0 0 1 8 2c3 0 5 2 7.333 2q2 0 3.067-.8A1 1 0 0 1 20 4v10a1 1 0 0 1-.4.8A6 6 0 0 1 16 16c-3 0-5-2-8-2a6 6 0 0 0-4 1.528" />`,
  "clock-3": `<circle cx="12" cy="12" r="10" /> <path d="M12 6v6h4" />`,
  trophy: `<path d="M10 14.66v1.626a2 2 0 0 1-.976 1.696A5 5 0 0 0 7 21.978" /> <path d="M14 14.66v1.626a2 2 0 0 0 .976 1.696A5 5 0 0 1 17 21.978" /> <path d="M18 9h1.5a1 1 0 0 0 0-5H18" /> <path d="M4 22h16" /> <path d="M6 9a6 6 0 0 0 12 0V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1z" /> <path d="M6 9H4.5a1 1 0 0 1 0-5H6" />`,
  "circle-gauge": `<path d="M15.6 2.7a10 10 0 1 0 5.7 5.7" /> <circle cx="12" cy="12" r="2" /> <path d="M13.4 10.6 19 5" />`,
  gem: `<path d="M10.5 3 8 9l4 13 4-13-2.5-6" /> <path d="M17 3a2 2 0 0 1 1.6.8l3 4a2 2 0 0 1 .013 2.382l-7.99 10.986a2 2 0 0 1-3.247 0l-7.99-10.986A2 2 0 0 1 2.4 7.8l2.998-3.997A2 2 0 0 1 7 3z" /> <path d="M2 9h20" />`,
  target: `<circle cx="12" cy="12" r="10" /> <circle cx="12" cy="12" r="6" /> <circle cx="12" cy="12" r="2" />`,
  layers: `<path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z" /> <path d="M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12" /> <path d="M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17" />`,
  calendar: `<path d="M8 2v4" /> <path d="M16 2v4" /> <rect width="18" height="18" x="3" y="4" rx="2" /> <path d="M3 10h18" />`,
  signal: `<path d="M2 20h.01" /> <path d="M7 20v-4" /> <path d="M12 20v-8" /> <path d="M17 20V8" /> <path d="M22 4v16" />`,
  route: `<circle cx="6" cy="19" r="3" /> <path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15" /> <circle cx="18" cy="5" r="3" />`,
  "chart-line": `<path d="M3 3v16a2 2 0 0 0 2 2h16" /> <path d="m19 9-5 5-4-4-3 3" />`,
  crosshair: `<circle cx="12" cy="12" r="10" /> <line x1="22" x2="18" y1="12" y2="12" /> <line x1="6" x2="2" y1="12" y2="12" /> <line x1="12" x2="12" y1="6" y2="2" /> <line x1="12" x2="12" y1="22" y2="18" />`,
  sparkles: `<path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z" /> <path d="M20 2v4" /> <path d="M22 4h-4" /> <circle cx="4" cy="20" r="2" />`,
  ratio: `<rect width="12" height="20" x="6" y="2" rx="2" /> <rect width="20" height="12" x="2" y="6" rx="2" />`,
  "shield-check": `<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" /> <path d="m9 12 2 2 4-4" />`,
  crown: `<path d="M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z" /> <path d="M5 21h14" />`,
  router: `<rect width="20" height="8" x="2" y="14" rx="2" /> <path d="M6.01 18H6" /> <path d="M10.01 18H10" /> <path d="M15 10v4" /> <path d="M17.84 7.17a4 4 0 0 0-5.66 0" /> <path d="M20.66 4.34a8 8 0 0 0-11.31 0" />`,
  zap: `<path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />`,
  percent: `<line x1="19" x2="5" y1="5" y2="19" /> <circle cx="6.5" cy="6.5" r="2.5" /> <circle cx="17.5" cy="17.5" r="2.5" />`,
  list: `<path d="M3 5h.01" /> <path d="M3 12h.01" /> <path d="M3 19h.01" /> <path d="M8 5h13" /> <path d="M8 12h13" /> <path d="M8 19h13" />`,
  "chart-no-axes-combined": `<path d="M12 16v5" /> <path d="M16 14v7" /> <path d="M20 10v11" /> <path d="m22 3-8.646 8.646a.5.5 0 0 1-.708 0L9.354 8.354a.5.5 0 0 0-.707 0L2 15" /> <path d="M4 18v3" /> <path d="M8 14v7" />`,
  "check-check": `<path d="M18 6 7 17l-5-5" /> <path d="m22 10-7.5 7.5L13 16" />`,
  "arrow-up": `<path d="m5 12 7-7 7 7" /> <path d="M12 19V5" />`,
  timer: `<line x1="10" x2="14" y1="2" y2="2" /> <line x1="12" x2="15" y1="14" y2="11" /> <circle cx="12" cy="14" r="8" />`,
  hand: `<path d="M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2" /> <path d="M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2" /> <path d="M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8" /> <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" />`,
  wind: `<path d="M12.8 19.6A2 2 0 1 0 14 16H2" /> <path d="M17.5 8a2.5 2.5 0 1 1 2 4H2" /> <path d="M9.8 4.4A2 2 0 1 1 11 8H2" />`,
  waves: `<path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" /> <path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" /> <path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />`,
  "shield-alert": `<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" /> <path d="M12 8v4" /> <path d="M12 16h.01" />`,
  split: `<path d="M16 3h5v5" /> <path d="M8 3H3v5" /> <path d="M12 22v-8.3a4 4 0 0 0-1.172-2.872L3 3" /> <path d="m15 9 6-6" />`,
  "person-standing": `<circle cx="12" cy="5" r="1" /> <path d="m9 20 3-6 3 6" /> <path d="m6 8 6 2 6-2" /> <path d="M12 10v4" />`,
  goal: `<path d="M12 13V2l8 4-8 4" /> <path d="M20.561 10.222a9 9 0 1 1-12.55-5.29" /> <path d="M8.002 9.997a5 5 0 1 0 8.9 2.02" />`,
  ruler: `<path d="M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.41 2.41 0 0 1 0-3.4l2.6-2.6a2.41 2.41 0 0 1 3.4 0Z" /> <path d="m14.5 12.5 2-2" /> <path d="m11.5 9.5 2-2" /> <path d="m8.5 6.5 2-2" /> <path d="m17.5 15.5 2-2" />`,
  "badge-alert": `<path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" /> <line x1="12" x2="12" y1="8" y2="12" /> <line x1="12" x2="12.01" y1="16" y2="16" />`,
  "chart-column-increasing": `<path d="M13 17V9" /> <path d="M18 17V5" /> <path d="M3 3v16a2 2 0 0 0 2 2h16" /> <path d="M8 17v-3" />`,
  "chart-spline": `<path d="M3 3v16a2 2 0 0 0 2 2h16" /> <path d="M7 16c.5-2 1.5-7 4-7 2 0 2 3 4 3 2.5 0 4.5-5 5-7" />`,
  radar: `<path d="M19.07 4.93A10 10 0 0 0 6.99 3.34" /> <path d="M4 6h.01" /> <path d="M2.29 9.62A10 10 0 1 0 21.31 8.35" /> <path d="M16.24 7.76A6 6 0 1 0 8.23 16.67" /> <path d="M12 18h.01" /> <path d="M17.99 11.66A6 6 0 0 1 15.77 16.67" /> <circle cx="12" cy="12" r="2" /> <path d="m13.41 10.59 5.66-5.66" />`,
  hourglass: `<path d="M5 22h14" /> <path d="M5 2h14" /> <path d="M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22" /> <path d="M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2" />`,
  gauge: `<path d="m12 14 4-4" /> <path d="M3.34 19a10 10 0 1 1 17.32 0" />`,
};

const HEADER_ICON_NAMES = {
  RK: "award",
  PLAYER: "user",
  POS: "badge-check",
  TM: "flag",
  AGE: "clock-3",
  FPTS: "trophy",
  PPG: "circle-gauge",
  VALUE: "gem",
  ADP: "target",
  "POS·ADP": "layers",
  G: "calendar",
  "SNP%": "signal",
  "YDS(t)": "route",
  "YPG(t)": "chart-line",
  OPP: "crosshair",
  IMP: "sparkles",
  "IMP/OPP": "ratio",
  "CSTY%": "shield-check",
  CL: "crown",
  paYDS: "router",
  paTD: "zap",
  "CMP%": "percent",
  paATT: "list",
  paRTG: "gauge",
  "EPA/DB": "chart-no-axes-combined",
  CPOE: "radar",
  CMP: "check-check",
  paYPG: "chart-line",
  pa1D: "arrow-up",
  "IMP/G": "timer",
  pIMP: "sparkles",
  "pIMP/A": "ratio",
  TTT: "hourglass",
  "PRS%": "shield-alert",
  SAC: "split",
  INT: "badge-alert",
  ruYDS: "person-standing",
  ruTD: "goal",
  CAR: "hand",
  YPC: "ruler",
  FUM: "badge-alert",
  FPOE: "chart-column-increasing",
  REC: "hand",
  recYDS: "route",
  TGT: "target",
  ELU: "wind",
  "MTF/A": "shield-alert",
  "YCO/A": "waves",
  MTF: "split",
  YCO: "waves",
  "EXPLSV%": "zap",
  ru1D: "arrow-up",
  RYOE: "chart-spline",
  recTD: "goal",
  rec1D: "arrow-up",
  YAC: "hand",
  "TS%": "percent",
  YPRR: "chart-spline",
  "1DRR": "ratio",
  recYPG: "chart-line",
  "AY%": "arrow-up",
  YPR: "ruler",
  RR: "person-standing",
  "RZ Tgt": "crosshair",
};

const VIEW_DEFS = {
  overview: {
    label: "OVERVIEW (ALL)",
    filter: (row) => Boolean(row.POS && row.POS !== "NA"),
    groups: [
      createColumnGroup("GENERAL", ["RK", "PLAYER", "POS"]),
      createColumnGroup("INFO", ["TM", "AGE"]),
      createColumnGroup("FANTASY", ["FPTS", "PPG", "VALUE", "ADP", "POS·ADP"]),
      createColumnGroup("OVERVIEW STATS", [
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
  },
  passing: {
    label: "PASSING (QB)",
    filter: (row) => row.POS === "QB",
    groups: [
      createColumnGroup("GENERAL", ["RK", "PLAYER", "POS"]),
      createColumnGroup("INFO", ["TM", "AGE", "G"]),
      createColumnGroup("FANTASY", ["FPTS", "PPG", "VALUE", "ADP", "POS·ADP"]),
      createColumnGroup("PASSING", [
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
      createColumnGroup("RUSHING", ["ruYDS", "ruTD", "CAR", "YPC", "FUM"]),
      createColumnGroup("CEILING & CONSISTENCY", ["FPOE", "CSTY%", "CL"]),
    ],
  },
  rushing: {
    label: "RUSHING (RB)",
    filter: (row) => row.POS === "RB",
    groups: [
      createColumnGroup("GENERAL", ["RK", "PLAYER", "POS"]),
      createColumnGroup("INFO", ["TM", "AGE", "G"]),
      createColumnGroup("FANTASY", ["FPTS", "PPG", "VALUE", "ADP", "POS·ADP"]),
      createColumnGroup("RUSHING EFFICIENCY", ["SNP%", "YPC", "ruYPG", "IMP/G"]),
      createColumnGroup("RUSHING PRODUCTION", [
        "CAR",
        "ruYDS",
        "ruTD",
        "ru1D",
        "YDS(t)",
        "FUM",
      ]),
      createColumnGroup("RECEIVING", [
        "REC",
        "recYDS",
        "recTD",
        "rec1D",
        "YAC",
        "TGT",
      ]),
      createColumnGroup("ADVANCED RUSHING", [
        "ELU",
        "MTF/A",
        "YCO/A",
        "MTF",
        "YCO",
        "RYOE",
        "EXPLSV%",
      ]),
      createColumnGroup("CEILING & CONSISTENCY", ["FPOE", "CSTY%", "CL"]),
    ],
  },
  receiving: {
    label: "RECEIVING (W/T)",
    filter: (row, state) =>
      (row.POS === "WR" && state.receivingFilters.WR) ||
      (row.POS === "TE" && state.receivingFilters.TE),
    groups: [
      createColumnGroup("GENERAL", ["RK", "PLAYER", "POS"]),
      createColumnGroup("INFO", ["TM", "AGE", "G"]),
      createColumnGroup("FANTASY", ["FPTS", "PPG", "VALUE", "ADP", "POS·ADP"]),
      createColumnGroup("RECEIVING", [
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
      createColumnGroup("RUSHING", ["CAR", "ruYDS", "ruTD", "YPC", "FUM"]),
      createColumnGroup("CEILING & CONSISTENCY", ["FPOE", "CSTY%", "CL"]),
    ],
  },
};

const ALL_COLUMN_IDS = [
  ...new Set(
    Object.values(VIEW_DEFS).flatMap((viewDef) => flattenGroupColumns(viewDef.groups)),
  ),
];

const COLUMN_DEFS = Object.fromEntries(
  ALL_COLUMN_IDS.map((columnId) => [columnId, createColumnDef(columnId)]),
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
  displayedRows: [],
  activeColumnIds: flattenGroupColumns(VIEW_DEFS.overview.groups),
  sort: {
    column: "RK",
    direction: "asc",
  },
  scroll: {
    top: 0,
    left: 0,
  },
  hoveredRowId: null,
  isCompactViewport: isCompactViewport(),
  columnFormatting: Object.create(null),
};

const gridRuntime = {
  shell: null,
  bodyViewport: null,
  scrollPane: null,
  horizontalController: null,
  frozenTable: null,
  scrollTable: null,
  resizeObserver: null,
  rowPairs: new Map(),
  measurementFrame: 0,
  scrollFrame: 0,
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

attachEventListeners();
attachMeasurementListeners();
syncUiState();
renderTable();
showOverlay({
  title: "Preparing SZN.csv",
  description:
    "Building the Data Hub table and mapping the requested stat views.",
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
      state.scroll.top = 0;
      state.scroll.left = 0;
      syncUiState();
      refreshGrid();
    });
  });

  receivingButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const key = button.dataset.receivingFilter;
      state.receivingFilters[key] = !state.receivingFilters[key];
      state.scroll.top = 0;
      syncUiState();
      refreshGrid();
    });
  });

  playerSearch.addEventListener("input", (event) => {
    state.searchText = event.target.value;
    state.scroll.top = 0;
    refreshGrid();
  });

  filePickerButton.addEventListener("click", () => filePickerInput.click());
  filePickerInput.addEventListener("change", handlePickedFile);

  window.addEventListener("resize", handleViewportResize, { passive: true });
}

function attachMeasurementListeners() {
  if (document.fonts?.ready) {
    document.fonts.ready
      .then(() => {
        scheduleGridMeasurement();
      })
      .catch(() => {});
  }

  if (document.fonts?.addEventListener) {
    document.fonts.addEventListener("loadingdone", scheduleGridMeasurement);
    document.fonts.addEventListener("loadingerror", scheduleGridMeasurement);
  }
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
    .map((row, rowIndex) => normalizeRow(row, rowIndex));

  refreshGrid();
}

function refreshGrid() {
  const viewDef = getActiveViewDef();
  const activeColumnIds = flattenGroupColumns(viewDef.groups);
  const visibleRows = state.rows.filter((row) => viewDef.filter(row, state));

  state.activeColumnIds = activeColumnIds;
  state.columnFormatting = buildColumnFormatting(visibleRows, activeColumnIds);
  state.displayedRows = sortRows(
    visibleRows.filter((row) => matchesSearch(row, activeColumnIds)),
  );

  renderTable();
  updateRowCount();
}

function syncUiState() {
  const viewDef = getActiveViewDef();
  mainTitle.textContent = PRIMARY_TITLES[state.primaryTab] ?? PRIMARY_TITLES["1-QB"];
  activeViewLabel.textContent = viewDef.label;

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

  receivingSubfilters.hidden = state.activeCategory !== "receiving";

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
  cleanupGridRuntime();

  const layout = buildActiveLayout();
  const shell = renderGridShell(layout);
  gridContainer.replaceChildren(shell);

  initializeGridRuntime(shell);
  scheduleGridMeasurement();
}

function buildActiveLayout() {
  const viewDef = getActiveViewDef();
  const columns = state.activeColumnIds.map((columnId, index) =>
    createColumnLayoutEntry(columnId, index),
  );
  const frozenColumns = columns.filter((column) => column.frozen);
  const scrollableColumns = columns.filter((column) => !column.frozen);
  const frozenColumnIds = new Set(frozenColumns.map((column) => column.id));
  const scrollableColumnIds = new Set(scrollableColumns.map((column) => column.id));

  return {
    viewDef,
    columns,
    frozenColumns,
    scrollableColumns,
    frozenWidth: getColumnsWidth(frozenColumns),
    scrollableWidth: getColumnsWidth(scrollableColumns),
    totalWidth: getColumnsWidth(columns),
    frozenGroups: filterGroupsForColumns(viewDef.groups, frozenColumnIds),
    scrollableGroups: filterGroupsForColumns(viewDef.groups, scrollableColumnIds),
  };
}

function renderGridShell(layout) {
  const shell = document.createElement("section");
  shell.className = "split-grid";
  shell.style.setProperty("--frozen-width", `${layout.frozenWidth}px`);
  shell.style.setProperty("--scrollable-width", `${layout.scrollableWidth}px`);
  shell.style.setProperty("--scroll-offset", `${state.scroll.left}px`);

  shell.append(renderViewport(layout));
  shell.append(renderHorizontalController());

  return shell;
}

function renderViewport(layout) {
  const bodyViewport = document.createElement("div");
  bodyViewport.className = "split-grid__body-viewport";
  bodyViewport.dataset.bodyViewport = "true";

  const frozenPane = document.createElement("div");
  frozenPane.className = "split-grid__pane split-grid__pane--frozen";
  frozenPane.append(createTable(layout.frozenColumns, layout.frozenGroups, "frozen"));

  const scrollPane = document.createElement("div");
  scrollPane.className = "split-grid__pane split-grid__pane--scroll";
  scrollPane.dataset.scrollPane = "true";
  scrollPane.append(
    createTable(layout.scrollableColumns, layout.scrollableGroups, "scroll"),
  );

  const tables = document.createElement("div");
  tables.className = "split-grid__tables";
  tables.append(frozenPane, scrollPane);

  bodyViewport.append(tables);

  if (!state.displayedRows.length) {
    bodyViewport.append(createEmptyStatePanel());
  }

  return bodyViewport;
}

function renderHorizontalController() {
  const horizontalRow = document.createElement("div");
  horizontalRow.className = "split-grid__horizontal-row";

  const spacer = document.createElement("div");
  spacer.className = "split-grid__horizontal-spacer";
  spacer.setAttribute("aria-hidden", "true");

  const controller = document.createElement("div");
  controller.className = "split-grid__horizontal-controller";
  controller.dataset.horizontalController = "true";
  controller.setAttribute("aria-hidden", "true");

  const size = document.createElement("div");
  size.className = "split-grid__horizontal-size";
  controller.append(size);

  horizontalRow.append(spacer, controller);
  return horizontalRow;
}

function createTable(columns, groups, pane) {
  const table = document.createElement("table");
  table.className = "stats-table";
  table.dataset.table = pane;
  table.style.setProperty("--table-width", `${getColumnsWidth(columns)}px`);

  if (pane === "scroll") {
    table.classList.add("stats-table--scroll");
  }

  appendColGroup(table, columns);
  table.append(createTableHead(groups, columns));
  table.append(createTableBody(columns));
  return table;
}

function createTableHead(groups, columns) {
  const headerRows = buildHeaderRows(groups, columns);
  const thead = document.createElement("thead");

  headerRows.forEach((rowCells) => {
    const tr = document.createElement("tr");
    tr.className = "stats-table__header-row";

    rowCells.forEach((cell, cellIndex) => {
      if (cell.type === "group") {
        tr.append(createGroupHeaderCell(cell, cellIndex, rowCells.length));
        return;
      }

      tr.append(createLeafHeaderCell(cell.column, cellIndex, rowCells.length));
    });

    thead.append(tr);
  });

  return thead;
}

function createGroupHeaderCell(cell, cellIndex, rowCellCount) {
  const th = document.createElement("th");
  th.className = "stats-table__group-cell";
  th.scope = "colgroup";
  th.colSpan = cell.colSpan;

  if (cell.rowSpan > 1) {
    th.rowSpan = cell.rowSpan;
  }

  if (cellIndex === rowCellCount - 1) {
    th.classList.add("stats-table__cell--terminal");
  }

  const label = document.createElement("span");
  label.className = "stats-table__group-label";
  label.textContent = cell.label;
  th.append(label);

  return th;
}

function createLeafHeaderCell(column, cellIndex, rowCellCount) {
  const th = document.createElement("th");
  th.className = "stats-table__leaf-cell";
  th.scope = "col";
  th.setAttribute("aria-sort", getAriaSort(column.id));

  if (cellIndex === rowCellCount - 1) {
    th.classList.add("stats-table__cell--terminal");
  }

  if (column.rowSpan > 1) {
    th.rowSpan = column.rowSpan;
  }

  const button = document.createElement("button");
  button.type = "button";
  button.className = "stats-table__head-button";
  button.setAttribute("aria-label", `Sort by ${column.label}`);
  button.addEventListener("click", () => handleHeaderSort(column.id));

  const icon = document.createElement("span");
  icon.className = "stats-table__head-icon";
  icon.setAttribute("aria-hidden", "true");
  icon.innerHTML = column.iconSvg;

  const label = document.createElement("span");
  label.className = "stats-table__head-label";
  label.textContent = column.label;

  const indicator = document.createElement("span");
  indicator.className = "stats-table__sort-indicator";
  indicator.textContent = getSortIndicator(column.id);
  indicator.setAttribute("aria-hidden", "true");

  if (getActiveSortColumn() === column.id) {
    indicator.classList.add("is-active");
  }

  button.append(icon, label, indicator);
  th.append(button);
  return th;
}

function createTableBody(columns) {
  const tbody = document.createElement("tbody");

  state.displayedRows.forEach((row) => {
    tbody.append(createBodyRow(row, columns));
  });

  return tbody;
}

function createBodyRow(row, columns) {
  const tr = document.createElement("tr");
  tr.className = "stats-table__body-row";
  tr.dataset.rowId = row[ROW_ID_KEY];

  columns.forEach((column, columnIndex) => {
    tr.append(createBodyCell(row, column, columnIndex, columns.length));
  });

  return tr;
}

function createBodyCell(row, column, columnIndex, columnCount) {
  const value = row[column.id];
  const td = document.createElement("td");
  td.className = "stats-table__body-cell";
  td.title = formatCellValue(value);

  if (columnIndex === columnCount - 1) {
    td.classList.add("stats-table__cell--terminal");
  }

  const cellClasses = getCellClass(column.id, value)
    .split(/\s+/)
    .filter(Boolean);
  td.classList.add(...cellClasses);

  const content = document.createElement("div");
  content.className = "stats-table__cell-content";

  if (column.id === FPTS_COLUMN && !isMissingValue(value)) {
    content.append(createFptsChip(value));
  } else {
    content.textContent = formatDisplayValue(column.id, value);
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

function createEmptyStatePanel() {
  const panel = document.createElement("div");
  panel.className = "split-grid__empty-state";

  const card = document.createElement("div");
  card.className = "split-grid__empty-card";

  const eyebrow = document.createElement("p");
  eyebrow.className = "split-grid__empty-eyebrow";
  eyebrow.textContent = "NO MATCHES";

  const title = document.createElement("h3");
  title.className = "split-grid__empty-title";
  title.textContent = "No players match the current view.";

  const body = document.createElement("p");
  body.className = "split-grid__empty-body";
  body.textContent =
    "Adjust the active filters, switch views, or clear the search to repopulate the table.";

  card.append(eyebrow, title, body);
  panel.append(card);
  return panel;
}

function appendColGroup(table, columns) {
  const colgroup = document.createElement("colgroup");

  columns.forEach((column) => {
    const col = document.createElement("col");
    col.style.width = `${column.width}px`;
    col.style.minWidth = `${column.width}px`;
    col.style.maxWidth = `${column.width}px`;
    colgroup.append(col);
  });

  table.append(colgroup);
}

function initializeGridRuntime(shell) {
  gridRuntime.shell = shell;
  gridRuntime.bodyViewport = shell.querySelector("[data-body-viewport]");
  gridRuntime.scrollPane = shell.querySelector("[data-scroll-pane]");
  gridRuntime.horizontalController = shell.querySelector(
    "[data-horizontal-controller]",
  );
  gridRuntime.frozenTable = shell.querySelector('[data-table="frozen"]');
  gridRuntime.scrollTable = shell.querySelector('[data-table="scroll"]');
  gridRuntime.rowPairs = buildRowPairRegistry(shell);

  if (gridRuntime.bodyViewport) {
    gridRuntime.bodyViewport.addEventListener("scroll", handleVerticalScroll, {
      passive: true,
    });
    gridRuntime.bodyViewport.addEventListener("pointerover", handlePointerOver);
    gridRuntime.bodyViewport.addEventListener("pointerout", handlePointerOut);
    gridRuntime.bodyViewport.addEventListener("pointerleave", clearHoveredRow);
    gridRuntime.bodyViewport.scrollTop = state.scroll.top;
    state.scroll.top = gridRuntime.bodyViewport.scrollTop;
  }

  if (gridRuntime.horizontalController) {
    gridRuntime.horizontalController.addEventListener(
      "scroll",
      handleHorizontalScroll,
      {
        passive: true,
      },
    );
    gridRuntime.horizontalController.scrollLeft = state.scroll.left;
    state.scroll.left = gridRuntime.horizontalController.scrollLeft;
  }

  if (gridRuntime.scrollPane) {
    gridRuntime.scrollPane.addEventListener("wheel", handleHorizontalWheel, {
      passive: false,
    });
  }

  syncHorizontalOffset();
  restoreHoveredRowState();
  observeGridMeasurements(shell);
}

function cleanupGridRuntime() {
  if (gridRuntime.resizeObserver) {
    gridRuntime.resizeObserver.disconnect();
    gridRuntime.resizeObserver = null;
  }

  cancelAnimationFrame(gridRuntime.measurementFrame);
  cancelAnimationFrame(gridRuntime.scrollFrame);

  gridRuntime.shell = null;
  gridRuntime.bodyViewport = null;
  gridRuntime.scrollPane = null;
  gridRuntime.horizontalController = null;
  gridRuntime.frozenTable = null;
  gridRuntime.scrollTable = null;
  gridRuntime.rowPairs = new Map();
}

function observeGridMeasurements(shell) {
  if (typeof ResizeObserver !== "function") {
    return;
  }

  const observer = new ResizeObserver(() => {
    scheduleGridMeasurement();
  });

  observer.observe(shell);

  shell
    .querySelectorAll(
      "[data-table], [data-body-viewport], [data-scroll-pane], [data-horizontal-controller]",
    )
    .forEach((element) => {
      observer.observe(element);
    });

  gridRuntime.resizeObserver = observer;
}

function scheduleGridMeasurement() {
  if (!gridRuntime.shell) {
    return;
  }

  cancelAnimationFrame(gridRuntime.measurementFrame);
  gridRuntime.measurementFrame = requestAnimationFrame(() => {
    syncGridMeasurements();
  });
}

function syncGridMeasurements() {
  if (!gridRuntime.shell) {
    return;
  }

  syncHeaderRowHeights();
  syncBodyRowHeights();
  syncStickyHeaderOffsets();
  syncHorizontalOffset();
}

function syncHeaderRowHeights() {
  const frozenRows = getElementArray(gridRuntime.frozenTable, "thead tr");
  const scrollRows = getElementArray(gridRuntime.scrollTable, "thead tr");

  syncElementHeights(frozenRows, scrollRows);
}

function syncBodyRowHeights() {
  const frozenRows = getElementArray(gridRuntime.frozenTable, "tbody tr");
  const scrollRows = getElementArray(gridRuntime.scrollTable, "tbody tr");

  syncElementHeights(frozenRows, scrollRows);
}

function syncStickyHeaderOffsets() {
  if (!gridRuntime.shell) {
    return;
  }

  const frozenRows = getElementArray(gridRuntime.frozenTable, "thead tr");
  const scrollRows = getElementArray(gridRuntime.scrollTable, "thead tr");
  const maxLength = Math.max(frozenRows.length, scrollRows.length);
  let offset = 0;

  for (let index = 0; index < maxLength; index += 1) {
    const leftRow = frozenRows[index] ?? null;
    const rightRow = scrollRows[index] ?? null;
    const referenceRow = leftRow ?? rightRow;
    const height = referenceRow
      ? Math.ceil(referenceRow.getBoundingClientRect().height)
      : 0;

    [leftRow, rightRow].forEach((row) => {
      if (!row) {
        return;
      }

      row.querySelectorAll("th").forEach((cell) => {
        cell.style.top = `${offset}px`;
        cell.style.zIndex = String(30 - index);
      });
    });

    offset += height;
  }

  gridRuntime.shell.style.setProperty("--header-stack-height", `${offset}px`);
}

function syncElementHeights(leftElements, rightElements) {
  const maxLength = Math.max(leftElements.length, rightElements.length);

  for (let index = 0; index < maxLength; index += 1) {
    const left = leftElements[index] ?? null;
    const right = rightElements[index] ?? null;

    if (left) {
      left.style.height = "";
    }
    if (right) {
      right.style.height = "";
    }

    if (!left || !right) {
      continue;
    }

    const maxHeight = Math.max(
      Math.ceil(left.getBoundingClientRect().height),
      Math.ceil(right.getBoundingClientRect().height),
    );

    left.style.height = `${maxHeight}px`;
    right.style.height = `${maxHeight}px`;
  }
}

function handleVerticalScroll(event) {
  state.scroll.top = event.currentTarget.scrollTop;
}

function handleHorizontalScroll(event) {
  state.scroll.left = event.currentTarget.scrollLeft;
  scheduleHorizontalOffset();
}

function handleHorizontalWheel(event) {
  if (!gridRuntime.horizontalController) {
    return;
  }

  const horizontalDelta =
    Math.abs(event.deltaX) > 0 ? event.deltaX : event.shiftKey ? event.deltaY : 0;

  if (!horizontalDelta) {
    return;
  }

  event.preventDefault();
  gridRuntime.horizontalController.scrollLeft += horizontalDelta;
}

function scheduleHorizontalOffset() {
  cancelAnimationFrame(gridRuntime.scrollFrame);
  gridRuntime.scrollFrame = requestAnimationFrame(() => {
    syncHorizontalOffset();
  });
}

function syncHorizontalOffset() {
  if (!gridRuntime.shell) {
    return;
  }

  if (gridRuntime.horizontalController) {
    const maxOffset = Math.max(
      gridRuntime.horizontalController.scrollWidth -
        gridRuntime.horizontalController.clientWidth,
      0,
    );
    const clampedOffset = Math.min(state.scroll.left, maxOffset);

    if (clampedOffset !== state.scroll.left) {
      state.scroll.left = clampedOffset;
    }

    if (gridRuntime.horizontalController.scrollLeft !== clampedOffset) {
      gridRuntime.horizontalController.scrollLeft = clampedOffset;
    }
  } else {
    state.scroll.left = 0;
  }

  gridRuntime.shell.style.setProperty("--scroll-offset", `${state.scroll.left}px`);
}

function handlePointerOver(event) {
  const row = getEventRow(event.target);
  if (!row) {
    return;
  }

  setHoveredRow(row.dataset.rowId);
}

function handlePointerOut(event) {
  const row = getEventRow(event.target);
  if (!row) {
    return;
  }

  const nextRow = getEventRow(event.relatedTarget);
  if (nextRow && nextRow.dataset.rowId === row.dataset.rowId) {
    return;
  }

  if (state.hoveredRowId === row.dataset.rowId) {
    setHoveredRow(null);
  }
}

function clearHoveredRow() {
  setHoveredRow(null);
}

function setHoveredRow(rowId) {
  if (state.hoveredRowId === rowId) {
    return;
  }

  if (state.hoveredRowId && gridRuntime.rowPairs.has(state.hoveredRowId)) {
    gridRuntime.rowPairs.get(state.hoveredRowId).forEach((row) => {
      row.classList.remove("is-hovered");
    });
  }

  state.hoveredRowId = rowId;

  if (rowId && gridRuntime.rowPairs.has(rowId)) {
    gridRuntime.rowPairs.get(rowId).forEach((row) => {
      row.classList.add("is-hovered");
    });
  }
}

function restoreHoveredRowState() {
  if (!state.hoveredRowId || !gridRuntime.rowPairs.has(state.hoveredRowId)) {
    state.hoveredRowId = null;
    return;
  }

  gridRuntime.rowPairs.get(state.hoveredRowId).forEach((row) => {
    row.classList.add("is-hovered");
  });
}

function buildRowPairRegistry(shell) {
  const registry = new Map();

  shell.querySelectorAll(".stats-table__body-row[data-row-id]").forEach((row) => {
    const rowId = row.dataset.rowId;
    if (!registry.has(rowId)) {
      registry.set(rowId, []);
    }
    registry.get(rowId).push(row);
  });

  return registry;
}

function getEventRow(target) {
  return target instanceof Element
    ? target.closest(".stats-table__body-row[data-row-id]")
    : null;
}

function getElementArray(root, selector) {
  return root ? Array.from(root.querySelectorAll(selector)) : [];
}

function getAriaSort(columnId) {
  if (getActiveSortColumn() !== columnId) {
    return "none";
  }

  return state.sort.direction === "asc" ? "ascending" : "descending";
}

function getSortIndicator(columnId) {
  if (getActiveSortColumn() !== columnId) {
    return "↕";
  }

  return state.sort.direction === "asc" ? "▲" : "▼";
}

function handleHeaderSort(columnId) {
  if (state.sort.column === columnId) {
    state.sort.direction = state.sort.direction === "asc" ? "desc" : "asc";
  } else {
    state.sort = {
      column: columnId,
      direction: "asc",
    };
  }

  refreshGrid();
}

function matchesSearch(row, activeColumnIds) {
  const query = state.searchText.trim().toLowerCase();
  if (!query) {
    return true;
  }

  return activeColumnIds.some((columnId) => {
    const value = row[columnId];
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
  return state.activeColumnIds.includes(state.sort.column)
    ? state.sort.column
    : "RK";
}

function createColumnDef(columnId) {
  return {
    id: columnId,
    label: columnId,
    source: Object.prototype.hasOwnProperty.call(SOURCE_ALIASES, columnId)
      ? SOURCE_ALIASES[columnId]
      : columnId,
    widthDesktop: COLUMN_WIDTHS[columnId] ?? 94,
    widthMobile: MOBILE_COLUMN_WIDTHS[columnId] ?? 58,
    frozen: FROZEN_COLUMNS.has(columnId),
    iconSvg: renderLucideIcon(HEADER_ICON_NAMES[columnId] ?? "list"),
  };
}

function createColumnLayoutEntry(columnId, index) {
  const definition = COLUMN_DEFS[columnId];
  const baseWidth = state.isCompactViewport
    ? definition.widthMobile
    : definition.widthDesktop;
  const widthBoost = definition.frozen ? 0 : state.isCompactViewport ? 10 : 16;

  return {
    ...definition,
    index,
    width: baseWidth + widthBoost,
  };
}

function getColumnsWidth(columns) {
  return columns.reduce((total, column) => total + column.width, 0);
}

function renderLucideIcon(iconName) {
  const paths = LUCIDE_PATHS[iconName] ?? LUCIDE_PATHS.list;
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" focusable="false" aria-hidden="true">${paths}</svg>`;
}

function buildHeaderRows(groups, columns) {
  if (!columns.length) {
    return [];
  }

  const totalDepth = getHeaderDepth(groups);
  const rows = Array.from({ length: totalDepth }, () => []);
  const columnsById = new Map(columns.map((column) => [column.id, column]));

  fillHeaderRows(groups, 0, totalDepth, rows, columnsById);
  return rows;
}

function fillHeaderRows(nodes, level, totalDepth, rows, columnsById) {
  nodes.forEach((node) => {
    if (typeof node === "string") {
      const column = columnsById.get(node);
      rows[level].push({
        type: "leaf",
        column: {
          ...column,
          rowSpan: totalDepth - level,
        },
        rowSpan: totalDepth - level,
        colSpan: 1,
      });
      return;
    }

    const childDepth = Math.max(...node.children.map(getNodeDepth));
    const rowSpan = Math.max(totalDepth - level - childDepth, 1);

    rows[level].push({
      type: "group",
      label: node.label,
      rowSpan,
      colSpan: countLeafColumns(node.children),
    });

    fillHeaderRows(node.children, level + rowSpan, totalDepth, rows, columnsById);
  });
}

function getHeaderDepth(nodes) {
  if (!nodes.length) {
    return 1;
  }

  return Math.max(...nodes.map(getNodeDepth));
}

function getNodeDepth(node) {
  if (typeof node === "string") {
    return 1;
  }

  return 1 + Math.max(...node.children.map(getNodeDepth));
}

function countLeafColumns(nodes) {
  return nodes.reduce((count, node) => {
    if (typeof node === "string") {
      return count + 1;
    }

    return count + countLeafColumns(node.children);
  }, 0);
}

function filterGroupsForColumns(nodes, allowedColumns) {
  return nodes
    .map((node) => {
      if (typeof node === "string") {
        return allowedColumns.has(node) ? node : null;
      }

      const nextChildren = filterGroupsForColumns(node.children, allowedColumns);
      return nextChildren.length
        ? createColumnGroup(node.label, nextChildren)
        : null;
    })
    .filter(Boolean);
}

function flattenGroupColumns(nodes) {
  return nodes.flatMap((node) =>
    typeof node === "string" ? node : flattenGroupColumns(node.children),
  );
}

function createColumnGroup(label, children) {
  return {
    label,
    children,
  };
}

function getActiveViewDef() {
  return VIEW_DEFS[state.activeCategory] ?? VIEW_DEFS.overview;
}

function isCompactViewport() {
  return window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`).matches;
}

let resizeFrame = 0;

function handleViewportResize() {
  cancelAnimationFrame(resizeFrame);
  resizeFrame = requestAnimationFrame(() => {
    const nextCompact = isCompactViewport();

    if (nextCompact !== state.isCompactViewport) {
      state.isCompactViewport = nextCompact;
      refreshGrid();
      return;
    }

    scheduleGridMeasurement();
  });
}

function normalizeRow(sourceRow, rowIndex) {
  const normalized = {
    [ROW_ID_KEY]: buildRowId(sourceRow, rowIndex),
  };

  ALL_COLUMN_IDS.forEach((columnId) => {
    const alias = COLUMN_DEFS[columnId].source;
    normalized[columnId] =
      alias === null ? "NA" : sanitizeValue(sourceRow[alias]);
  });

  return normalized;
}

function buildRowId(sourceRow, rowIndex) {
  const stableId = sanitizeValue(sourceRow.SLPR_ID);
  if (!isMissingValue(stableId)) {
    return stableId;
  }

  const fallbackParts = [
    sourceRow.NM,
    sourceRow.POS,
    sourceRow.TM,
    sourceRow.AGE,
    sourceRow.PRK_PPR,
    rowIndex,
  ].map(sanitizeValue);

  return fallbackParts.join("::");
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

function getCellClass(columnId, value) {
  const classes = ["dh-grid-cell"];

  if (columnId === PLAYER_COLUMN) {
    classes.push("player-cell");
  } else {
    classes.push("center-cell");
  }

  if (NON_FORMATTED_COLUMNS.has(columnId)) {
    classes.push("plain-cell");
  } else {
    classes.push("formatted-cell");
  }

  if (isMissingValue(value)) {
    classes.push("na-cell");
    return classes.join(" ");
  }

  if (columnId === FPTS_COLUMN) {
    classes.push(
      "fpts-cell",
      `fpts-cell--tier-${getFormattingTier(columnId, value)}`,
    );
    return classes.join(" ");
  }

  if (!NON_FORMATTED_COLUMNS.has(columnId)) {
    const family = NEUTRAL_COLUMNS.has(columnId) ? "neutral" : "heat";
    const tier = getFormattingTier(columnId, value);
    classes.push("heat-cell", `heat-cell--${family}`, `heat-cell--tier-${tier}`);
  }

  return classes.join(" ");
}

function formatCellValue(value) {
  return isMissingValue(value) ? "NA" : value;
}

function formatDisplayValue(columnId, value) {
  const formattedValue = formatCellValue(value);

  if (columnId !== PLAYER_COLUMN || !state.isCompactViewport) {
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

function buildColumnFormatting(rows, activeColumnIds) {
  const formatting = Object.create(null);

  activeColumnIds.forEach((columnId) => {
    if (NON_FORMATTED_COLUMNS.has(columnId)) {
      return;
    }

    const values = rows
      .map((row) => toComparableNumber(row[columnId]))
      .filter((numericValue) => numericValue != null);

    if (!values.length) {
      return;
    }

    formatting[columnId] = createColumnMetric(values);
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

function getFormattingTier(columnId, value) {
  const metric = state.columnFormatting[columnId];
  const numericValue = toComparableNumber(value);

  if (!metric || numericValue == null) {
    return 0;
  }

  if (metric.isFlat) {
    return 2;
  }

  const percentile = getPercentileRank(metric.sorted, numericValue);
  const normalized = INVERTED_COLUMNS.has(columnId)
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

  const normalized = String(value)
    .trim()
    .replace(/,/g, "")
    .replace(/%$/, "");
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
