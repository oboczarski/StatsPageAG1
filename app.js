/* ============================================================
   DH DATA HUB – app.js
   AG Grid Community 35.1.0 (CDN, vanilla JS, legacy theme)
   ============================================================ */

(function () {
    'use strict';

    /* ----------------------------------------------------------
       0.  CONSTANTS & STATE
       ---------------------------------------------------------- */
    let gridApi = null;
    let allRowData = [];
    let currentCategory = 'overview';
    let currentTab = '1qb';
    let wrActive = true;
    let teActive = true;

    /* CSV column header → internal key mapping (uses CSV header row verbatim) */
    /* We will parse the CSV header row dynamically */

    /* ----------------------------------------------------------
       1.  COLUMN DEFINITIONS PER CATEGORY
       ---------------------------------------------------------- */

    // Column display configs per category
    // Each entry: { field, headerName, pinned?, width?, cellRenderer? }
    // "field" matches the CSV header. For columns NOT in CSV, we still define them.

    const OVERVIEW_COLS = [
        'PRK_PPR', 'NM', 'POS', 'TM', 'AGE',
        'FPT_PPR', 'PPG', 'VALUE', 'ADP', 'POS_ADP',
        'GM', 'SNP%', 'YDS(t)', 'YPG(t)',
        'OPP', 'IMP', 'IMP/OPP', 'CSTY%', 'CL'
    ];

    const PASSING_COLS = [
        'PRK_PPR', 'NM', 'POS', 'TM', 'AGE', 'GM',
        'FPT_PPR', 'PPG', 'VALUE', 'ADP', 'POS_ADP',
        'paYDS', 'paTD', 'CMP%', 'paATT', 'paRTG',
        'EPA/DB', 'CPOE', 'CMP', 'YDS(t)', 'paYPG',
        'ruYDS', 'ruTD', 'pa1D', 'IMP/G', 'pIMP', 'pIMP/A',
        'CAR', 'YPC', 'TTT', 'PRS%', 'SAC', 'INT', 'FUM',
        'FPOE', 'CSTY%', 'CL'
    ];

    const RUSHING_COLS = [
        'PRK_PPR', 'NM', 'POS', 'TM', 'AGE', 'GM',
        'FPT_PPR', 'PPG', 'VALUE', 'ADP', 'POS_ADP',
        'SNP%', 'CAR', 'ruYDS', 'YPC', 'ruTD',
        'REC', 'recYDS', 'TGT', 'YDS(t)', 'ruYPG',
        'ELU', 'MTF/A', 'YCO/A', 'MTF', 'YCO',
        'EXPLSV%', 'ru1D', 'RYOE', 'recTD', 'rec1D',
        'YAC', 'IMP/G', 'FUM', 'FPOE', 'CSTY%', 'CL'
    ];

    const RECEIVING_COLS = [
        'PRK_PPR', 'NM', 'POS', 'TM', 'AGE', 'GM',
        'FPT_PPR', 'PPG', 'VALUE', 'ADP', 'POS_ADP',
        'SNP%', 'TGT', 'REC', 'TS%', 'recYDS', 'recTD',
        'YPRR', 'rec1D', '1DRR', 'recYPG', 'AY%',
        'YAC', 'YPR', 'IMP/G', 'RR', 'FPOE', 'YDS(t)',
        'RZ Tgt', 'CAR', 'ruYDS', 'ruTD', 'YPC', 'FUM',
        'CSTY%', 'CL'
    ];

    // Display header overrides (field → display name)
    const HEADER_MAP = {
        'PRK_PPR': 'RK',
        'NM': 'PLAYER',
        'POS': 'POS',
        'TM': 'TM',
        'AGE': 'AGE',
        'FPT_PPR': 'FPTS',
        'PPG': 'PPG',
        'VALUE': 'VALUE',
        'ADP': 'ADP',
        'POS_ADP': 'POS·ADP',
        'GM': 'G',
        'SNP%': 'SNP%',
        'YDS(t)': 'YDS(t)',
        'YPG(t)': 'YPG(t)',
        'OPP': 'OPP',
        'IMP': 'IMP',
        'IMP/OPP': 'IMP/OPP',
        'CSTY%': 'CSTY%',
        'CL': 'CL',
        'paYDS': 'paYDS',
        'paTD': 'paTD',
        'CMP%': 'CMP%',
        'paATT': 'paATT',
        'paRTG': 'paRTG',
        'EPA/DB': 'EPA/DB',
        'CPOE': 'CPOE',
        'CMP': 'CMP',
        'paYPG': 'paYPG',
        'ruYDS': 'ruYDS',
        'ruTD': 'ruTD',
        'pa1D': 'pa1D',
        'IMP/G': 'IMP/G',
        'pIMP': 'pIMP',
        'pIMP/A': 'pIMP/A',
        'CAR': 'CAR',
        'YPC': 'YPC',
        'TTT': 'TTT',
        'PRS%': 'PRS%',
        'SAC': 'SAC',
        'INT': 'INT',
        'FUM': 'FUM',
        'FPOE': 'FPOE',
        'REC': 'REC',
        'recYDS': 'recYDS',
        'TGT': 'TGT',
        'recTD': 'recTD',
        'ELU': 'ELU',
        'MTF/A': 'MTF/A',
        'YCO/A': 'YCO/A',
        'MTF': 'MTF',
        'YCO': 'YCO',
        'EXPLSV%': 'EXPLSV%',
        'ru1D': 'ru1D',
        'RYOE': 'RYOE',
        'rec1D': 'rec1D',
        'YAC': 'YAC',
        'ruYPG': 'ruYPG',
        'TS%': 'TS%',
        'YPRR': 'YPRR',
        '1DRR': '1DRR',
        'recYPG': 'recYPG',
        'AY%': 'AY%',
        'YPR': 'YPR',
        'RR': 'RR',
        'RZ Tgt': 'RZ Tgt'
    };

    // CSV header → internal field name mapping (handle CSV quirks)
    const CSV_FIELD_MAP = {
        'SZN': 'SZN',
        'SLPR_ID': 'SLPR_ID',
        'NM': 'NM',
        'POS': 'POS',
        'AGE': 'AGE',
        'TM': 'TM',
        'PRK_PPR': 'PRK_PPR',
        'PRK_0.5P': 'PRK_0.5P',
        'PRK_STD': 'PRK_STD',
        'FPT_PPR': 'FPT_PPR',
        'FPTS_0.5': 'FPTS_0.5',
        'FPTS_STD': 'FPTS_STD',
        'GM_ACTV': 'GM_ACTV',
        'GM_P': 'GM_P',
        'GM': 'GM',
        'TM_SNP': 'TM_SNP',
        'SNP': 'SNP',
        'FUM': 'FUM',
        'CMP%': 'CMP%',
        'paAY': 'paAY',
        'paATT': 'paATT',
        'CMP': 'CMP',
        'pa1D': 'pa1D',
        'INC': 'INC',
        'INT': 'INT',
        'paRTG': 'paRTG',
        'pa.ruYDS': 'pa.ruYDS',
        'SAC': 'SAC',
        'paTD': 'paTD',
        'paYDS': 'paYDS',
        'paYPA': 'paYPA',
        'paYPC': 'paYPC',
        'REC': 'REC',
        'recAY': 'recAY',
        'DRP': 'DRP',
        'rec1D': 'rec1D',
        'recTD': 'recTD',
        'TGT': 'TGT',
        'YAC': 'YAC',
        'recYDS': 'recYDS',
        'YPR': 'YPR',
        'YPT': 'YPT',
        'CAR': 'CAR',
        'BTKL': 'BTKL',
        'ru1D': 'ru1D',
        'ru.recYDS': 'ru.recYDS',
        'ruTD': 'ruTD',
        'YCO': 'YCO',
        'ruYDS': 'ruYDS',
        'YPC': 'YPC',
        'SNP%': 'SNP%',
        'MTF': 'MTF',
        'YCO/A': 'YCO/A',
        'MTF/A': 'MTF/A',
        'ruIMP': 'ruIMP',
        'ELU': 'ELU',
        'IMP': 'IMP',
        'OPP': 'OPP',
        'IMP/OPP': 'IMP/OPP',
        'IMP/G': 'IMP/G',
        'RR': 'RR',
        'TS%': 'TS%',
        'YPRR': 'YPRR',
        '1DRR': '1DRR',
        'pIMP': 'pIMP',
        'pIMP/A': 'pIMP/A',
        'TTT': 'TTT',
        'DP%': 'DP%',
        'PRS%': 'PRS%',
        'AYA': 'AYA',
        'DB': 'DB',
        'YDS(t)': 'YDS(t)',
        'CPOE': 'CPOE',
        'EPA/DB': 'EPA/DB',
        'YPG(t)': 'YPG(t)',
        'paYPG': 'paYPG',
        'ruYPG': 'ruYPG',
        'RYOE': 'RYOE',
        'EXPLSV%': 'EXPLSV%',
        'recYPG': 'recYPG',
        'AY/Tgt': 'AY/Tgt',
        'AY%': 'AY%',
        'RZ Tgt': 'RZ Tgt',
        '10+ Tgt': '10+ Tgt',
        'Quick Tgt': 'Quick Tgt',
        'EZ Tgt': 'EZ Tgt',
        'FPOE(t)': 'FPOE(t)',
        'FPOE': 'FPOE',
        'PROJ': 'PROJ',
        'CSTY%': 'CSTY%',
        'CL': 'CL'
    };

    // Columns that DON'T exist in CSV but are requested (fill with NA)
    const SYNTHETIC_FIELDS = ['VALUE', 'ADP', 'POS_ADP', 'PPG'];

    /* ----------------------------------------------------------
       2.  CSV PARSING
       ---------------------------------------------------------- */
    function parseCSV(text) {
        // Handle \r\n and \r
        const lines = text.replace(/\r\n/g, '\n').replace(/\r/g, '\n').split('\n');
        if (lines.length < 2) return [];

        const headers = lines[0].split(',');
        const rows = [];

        for (let i = 1; i < lines.length; i++) {
            const line = lines[i].trim();
            if (!line) continue;
            const values = line.split(',');
            const row = {};

            for (let j = 0; j < headers.length; j++) {
                const rawHeader = headers[j].trim();
                const fieldName = CSV_FIELD_MAP[rawHeader] || rawHeader;
                let val = (values[j] || '').trim();

                // Clean up values
                if (val === '' || val === 'NA' || val === '#N/A' || val === '#DIV/0!' || val === '#VALUE!' || val === '#REF!') {
                    val = 'NA';
                }
                row[fieldName] = val;
            }

            // Skip rows with empty name
            if (!row.NM || row.NM === '') continue;

            // Compute PPG (FPTS / Games)
            const fpts = parseFloat(row.FPT_PPR);
            const gm = parseFloat(row.GM);
            if (!isNaN(fpts) && !isNaN(gm) && gm > 0) {
                row.PPG = (fpts / gm).toFixed(1);
            } else {
                row.PPG = 'NA';
            }

            // Synthetic fields
            row.VALUE = 'NA';
            row.ADP = 'NA';
            row.POS_ADP = 'NA';

            // Abbreviate player name: first initial + last name
            if (row.NM) {
                row.NM_FULL = row.NM;
                const parts = row.NM.split(' ');
                if (parts.length >= 2) {
                    // Handle names like "J.K. Dobbins" or "T.J. Hockenson"
                    const firstName = parts[0];
                    const rest = parts.slice(1).join(' ');
                    if (firstName.includes('.')) {
                        row.NM_DISPLAY = row.NM; // Keep abbreviated names as-is
                    } else {
                        row.NM_DISPLAY = firstName.charAt(0) + '. ' + rest;
                    }
                } else {
                    row.NM_DISPLAY = row.NM;
                }
            }

            rows.push(row);
        }

        return rows;
    }

    /* ----------------------------------------------------------
       3.  BUILD COLUMN DEFS
       ---------------------------------------------------------- */
    function buildColumnDefs(categoryFields) {
        return categoryFields.map(function (field, idx) {
            const headerName = HEADER_MAP[field] || field;
            const colDef = {
                field: field,
                headerName: headerName,
                sortable: true,
                resizable: true,
                suppressMovable: true,
            };

            // Pin first 3 columns
            if (idx < 3) {
                colDef.pinned = 'left';
            }

            // Column-specific widths and renderers
            switch (field) {
                case 'PRK_PPR':
                    colDef.width = 42;
                    colDef.maxWidth = 50;
                    colDef.cellClass = 'rank-cell';
                    colDef.comparator = numericComparator;
                    break;
                case 'NM':
                    colDef.width = 110;
                    colDef.minWidth = 85;
                    colDef.cellClass = 'player-name';
                    colDef.valueGetter = function (params) {
                        return params.data ? params.data.NM_DISPLAY || params.data.NM : '';
                    };
                    // Sort by full name
                    colDef.comparator = function (a, b) {
                        return (a || '').localeCompare(b || '');
                    };
                    break;
                case 'POS':
                    colDef.width = 42;
                    colDef.maxWidth = 50;
                    colDef.cellRenderer = positionRenderer;
                    break;
                case 'TM':
                    colDef.width = 44;
                    colDef.maxWidth = 52;
                    break;
                case 'AGE':
                    colDef.width = 46;
                    colDef.maxWidth = 56;
                    colDef.comparator = numericComparator;
                    break;
                case 'GM':
                    colDef.width = 36;
                    colDef.maxWidth = 44;
                    colDef.comparator = numericComparator;
                    break;
                case 'FPT_PPR':
                    colDef.width = 55;
                    colDef.comparator = numericComparator;
                    break;
                case 'PPG':
                    colDef.width = 48;
                    colDef.comparator = numericComparator;
                    break;
                case 'VALUE':
                case 'ADP':
                case 'POS_ADP':
                    colDef.width = 50;
                    break;
                case 'SNP%':
                case 'CMP%':
                case 'TS%':
                case 'AY%':
                case 'EXPLSV%':
                case 'PRS%':
                case 'DP%':
                case 'CSTY%':
                    colDef.width = 52;
                    colDef.comparator = percentComparator;
                    break;
                default:
                    colDef.width = 56;
                    colDef.comparator = numericComparator;
                    break;
            }

            return colDef;
        });
    }

    function numericComparator(a, b) {
        const numA = parseFloat(a);
        const numB = parseFloat(b);
        if (isNaN(numA) && isNaN(numB)) return 0;
        if (isNaN(numA)) return 1;
        if (isNaN(numB)) return -1;
        return numA - numB;
    }

    function percentComparator(a, b) {
        const numA = parseFloat(String(a).replace('%', ''));
        const numB = parseFloat(String(b).replace('%', ''));
        if (isNaN(numA) && isNaN(numB)) return 0;
        if (isNaN(numA)) return 1;
        if (isNaN(numB)) return -1;
        return numA - numB;
    }

    function positionRenderer(params) {
        if (!params.value) return '';
        const pos = String(params.value).toUpperCase();
        const cls = 'pos-' + pos.toLowerCase();
        return '<span class="' + cls + '">' + pos + '</span>';
    }

    /* ----------------------------------------------------------
       4.  FILTER DATA BY CATEGORY
       ---------------------------------------------------------- */
    function getFilteredData() {
        let data = allRowData;

        switch (currentCategory) {
            case 'passing':
                data = data.filter(function (r) { return r.POS === 'QB'; });
                break;
            case 'rushing':
                data = data.filter(function (r) { return r.POS === 'RB'; });
                break;
            case 'receiving':
                data = data.filter(function (r) {
                    if (r.POS === 'WR' && wrActive) return true;
                    if (r.POS === 'TE' && teActive) return true;
                    return false;
                });
                break;
            default: // overview
                break;
        }

        return data;
    }

    function getCategoryFields() {
        switch (currentCategory) {
            case 'passing': return PASSING_COLS;
            case 'rushing': return RUSHING_COLS;
            case 'receiving': return RECEIVING_COLS;
            default: return OVERVIEW_COLS;
        }
    }

    /* ----------------------------------------------------------
       5.  GRID SETUP & UPDATE
       ---------------------------------------------------------- */
    function initGrid(rowData) {
        const gridDiv = document.getElementById('myGrid');
        const columnDefs = buildColumnDefs(getCategoryFields());

        const gridOptions = {
            theme: 'legacy',
            columnDefs: columnDefs,
            rowData: rowData,
            defaultColDef: {
                sortable: true,
                resizable: true,
                suppressHeaderMenuButton: true,
                wrapHeaderText: false,
                autoHeaderHeight: false,
            },
            animateRows: false,
            suppressCellFocus: true,
            domLayout: 'normal',
            suppressScrollOnNewData: true,
            enableCellTextSelection: true,
            ensureDomOrder: true,
        };

        gridApi = agGrid.createGrid(gridDiv, gridOptions);
    }

    function updateGrid() {
        if (!gridApi) return;

        const newColDefs = buildColumnDefs(getCategoryFields());
        const newData = getFilteredData();

        gridApi.setGridOption('columnDefs', newColDefs);
        gridApi.setGridOption('rowData', newData);
    }

    /* ----------------------------------------------------------
       6.  GRID HEIGHT CALCULATION
       ---------------------------------------------------------- */
    function setGridHeight() {
        const wrapper = document.getElementById('grid-wrapper');
        const gridDiv = document.getElementById('myGrid');
        const rect = wrapper.getBoundingClientRect();
        const availableHeight = window.innerHeight - rect.top - 12;
        const h = Math.max(300, availableHeight);
        wrapper.style.height = h + 'px';
        gridDiv.style.height = h + 'px';
    }

    /* ----------------------------------------------------------
       7.  UI EVENT HANDLERS
       ---------------------------------------------------------- */
    function setupEventListeners() {
        // Primary tabs
        document.querySelectorAll('.primary-tab').forEach(function (btn) {
            btn.addEventListener('click', function () {
                document.querySelectorAll('.primary-tab').forEach(function (b) { b.classList.remove('active'); });
                btn.classList.add('active');
                currentTab = btn.dataset.tab;
                updateTitle();
            });
        });

        // Category buttons
        document.querySelectorAll('.cat-btn').forEach(function (btn) {
            btn.addEventListener('click', function () {
                document.querySelectorAll('.cat-btn').forEach(function (b) { b.classList.remove('active'); });
                btn.classList.add('active');
                currentCategory = btn.dataset.category;

                // Show/hide sub-filter row for receiving
                const subRow = document.getElementById('sub-filter-row');
                if (currentCategory === 'receiving') {
                    subRow.classList.remove('hidden');
                } else {
                    subRow.classList.add('hidden');
                }

                updateGrid();
            });
        });

        // Sub-filter toggles (WR/TE)
        document.querySelectorAll('.sub-toggle').forEach(function (btn) {
            btn.addEventListener('click', function () {
                btn.classList.toggle('active');
                if (btn.dataset.pos === 'WR') wrActive = btn.classList.contains('active');
                if (btn.dataset.pos === 'TE') teActive = btn.classList.contains('active');
                updateGrid();
            });
        });

        // Search
        var searchTimeout;
        document.getElementById('search-input').addEventListener('input', function (e) {
            clearTimeout(searchTimeout);
            var val = e.target.value;
            searchTimeout = setTimeout(function () {
                if (gridApi) {
                    gridApi.setGridOption('quickFilterText', val);
                }
            }, 150);
        });

        // Window resize
        window.addEventListener('resize', function () {
            setGridHeight();
        });
    }

    function updateTitle() {
        var titleEl = document.getElementById('main-title');
        if (currentTab === '1qb') {
            titleEl.textContent = '1QB ADP, TRADE VALUES & 2025 STATS';
        } else {
            titleEl.textContent = 'SFLX ADP, TRADE VALUES & 2025 STATS';
        }
    }

    /* ----------------------------------------------------------
       8.  BOOTSTRAP
       ---------------------------------------------------------- */
    async function init() {
        try {
            const response = await fetch('SZN.csv');
            const text = await response.text();
            allRowData = parseCSV(text);

            // Sort by rank initially
            allRowData.sort(function (a, b) {
                return numericComparator(a.PRK_PPR, b.PRK_PPR);
            });

            setupEventListeners();
            setGridHeight();
            initGrid(getFilteredData());
        } catch (err) {
            console.error('Failed to load SZN.csv:', err);
            // Still init grid with empty data
            setupEventListeners();
            setGridHeight();
            initGrid([]);
        }
    }

    // Start when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
