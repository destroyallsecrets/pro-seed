// Power Scaling / Derating Analysis - Electrical Installation Analysis
// Covers: Load tiering, derating calculations, capacity optimization, critical load preservation
// Standards: NEC 220, 230, 408, 700, 701, 702, 708; IEEE 141, 242, 399, 519; NFPA 70E, 70B, 110

const powerScalingData = {
    scale: 'powerscaling',
    label: 'Power Scaling',
    icon: '⚖️',
    description: 'Load tiering, derating calculations, capacity optimization, critical load preservation',
    serviceTypical: 'Any voltage — systematic capacity reduction without critical capability loss',
    phases: [
        {
            id: 'assessment',
            number: 1,
            title: 'Current State Assessment',
            icon: '📊',
            color: 'blue',
            description: 'Baseline measurement, load profiling, criticality classification',
            cards: [
                {
                    id: 'loadInventory',
                    title: 'Complete Load Inventory',
                    icon: '📋',
                    iconColor: 'blue',
                    checklist: [
                        { text: 'Document every connected load: location, nameplate, actual draw, duty cycle', ref: 'NEC 220, IEEE 242' },
                        { text: 'Measure 30-day demand intervals (15-min) at service entrance', ref: 'NEC 220.87' },
                        { text: 'Record power factor, THD, harmonic spectrum at PCC', ref: 'IEEE 519' },
                        { text: 'Identify all motor loads: HP, FLA, starting method, VFD status', ref: 'NEC 430, IEEE 399' },
                        { text: 'Catalog all UPS, battery, generator-backed loads', ref: 'NEC 700, 701, 702' },
                        { text: 'Note seasonal variations (HVAC, process heating/cooling)', ref: '' }
                    ]
                },
                {
                    id: 'criticalityTier',
                    title: 'Criticality Tiering (4-Tier Model)',
                    icon: '🏷️',
                    iconColor: 'red',
                    checklist: [
                        { text: 'TIER 0 — LIFE SAFETY: Never shed (fire pump, egress lighting, fire alarm, medical life support)', ref: 'NEC 700, NFPA 101, 99' },
                        { text: 'TIER 1 — CRITICAL OPERATIONS: Shed last, restore first (data centers, process control, security, comms)', ref: 'NEC 701, 708, Tier 1 SLA' },
                        { text: 'TIER 2 — ESSENTIAL PRODUCTION: Staggered shed allowed (primary manufacturing, refrigeration, HVAC for process)', ref: 'Business continuity plan' },
                        { text: 'TIER 3 — DISCRETIONARY: Shed first (comfort HVAC, general lighting, non-critical outlets, EV charging, water heating)', ref: 'Demand response programs' },
                        { text: 'Assign every load to exactly one tier; document rationale', ref: '' },
                        { text: 'Create load-shed sequence matrix with time delays', ref: '' }
                    ]
                },
                {
                    id: 'baselineProfile',
                    title: 'Baseline Load Profile & Coincident Peak',
                    icon: '📈',
                    iconColor: 'green',
                    checklist: [
                        { text: 'Calculate coincident demand factor per panel/feeder/service', ref: 'NEC 220.42-220.56' },
                        { text: 'Determine current diversity factor (sum of peaks vs coincident peak)', ref: 'IEEE 141' },
                        { text: 'Identify peak hour(s) and contributing loads', ref: '' },
                        { text: 'Calculate load factor (average demand / peak demand)', ref: '' },
                        { text: 'Document existing demand charges ($/kW) and energy rates ($/kWh)', ref: 'Utility tariff' }
                    ]
                }
            ]
        },
        {
            id: 'deratingCalc',
            number: 2,
            title: 'Derating Calculations & Capacity Analysis',
            icon: '🧮',
            color: 'yellow',
            description: 'Systematic capacity reduction calculations with safety margins',
            cards: [
                {
                    id: 'serviceDerating',
                    title: 'Service Entrance Derating',
                    icon: '⚡',
                    iconColor: 'yellow',
                    checklist: [
                        { text: 'Calculate NEC 220.87 maximum demand: max 15-min avg × 1.25 for continuous', ref: 'NEC 220.87, 210.19' },
                        { text: 'Apply NEC 230.42: service conductors ≥ 125% continuous + 100% non-continuous', ref: 'NEC 230.42' },
                        { text: 'Verify service disconnect rating per NEC 230.79 (min 100A residential, per calc commercial/industrial)', ref: 'NEC 230.79' },
                        { text: 'Check transformer loading: ≤80% nameplate for continuous, ≤100% for 2hr peak', ref: 'IEEE C57.91, C57.12' },
                        { text: 'Verify panelboard bus rating vs calculated load (NEC 408.4)', ref: 'NEC 408.4' },
                        { text: 'Calculate available capacity margin: (Rating - Calculated Load) / Rating', ref: '' }
                    ]
                },
                {
                    id: 'conductorDerating',
                    title: 'Conductor & Raceway Derating',
                    icon: '🔌',
                    iconColor: 'blue',
                    checklist: [
                        { text: 'Apply NEC 310.15(C)(1) ambient temp correction (Table 310.15(B)(1))', ref: 'NEC 310.15' },
                        { text: 'Apply NEC 310.15(C)(1) raceway fill adjustment (>3 current-carrying conductors)', ref: 'NEC 310.15(C)(1)' },
                        { text: 'Apply NEC 310.15(B)(3) rooftop conduit temp adder (0.5 in. above roof = +30°F)', ref: 'NEC 310.15(B)(3)' },
                        { text: 'Calculate voltage drop: ≤3% branch, ≤5% feeder+branch (NEC 210.19, 215.2)', ref: 'NEC 210.19, 215.2' },
                        { text: 'Verify conductor ampacity ≥ calculated load after all deratings', ref: 'NEC 310.16, 310.60' }
                    ]
                },
                {
                    id: 'protectionCoord',
                    title: 'Protection Coordination at Reduced Current',
                    icon: '🛡️',
                    iconColor: 'purple',
                    checklist: [
                        { text: 'Recalculate short-circuit current at reduced transformer tap/impedance', ref: 'IEEE 242, ANSI C37.010' },
                        { text: 'Verify breaker/fuse interrupting rating ≥ new available fault current', ref: 'NEC 110.24, 240.86' },
                        { text: 'Update TCC curves: adjust pickup settings for reduced load current', ref: 'IEEE 242, NEC 240.12' },
                        { text: 'Maintain selective coordination for NEC 700/701/708 critical branches', ref: 'NEC 700.32, 701.27, 708.54' },
                        { text: 'Recalculate arc flash incident energy at reduced fault current (IEEE 1584)', ref: 'NFPA 70E, IEEE 1584' },
                        { text: 'Update arc flash labels with new incident energy / PPE category', ref: 'NEC 110.16, NFPA 70E 130.5' }
                    ]
                },
                {
                    id: 'capacityCalc',
                    title: 'Target Capacity Calculator',
                    icon: '🎯',
                    iconColor: 'green',
                    checklist: [
                        { text: 'Define target capacity reduction % (e.g., 20%, 30%, 50%)', ref: '' },
                        { text: 'Calculate Tier 3 shed required: Target kW × (1 - diversity)', ref: '' },
                        { text: 'Verify Tier 3 loads ≥ required shed with 20% margin', ref: '' },
                        { text: 'If Tier 3 insufficient, calculate Tier 2 staggered shed schedule', ref: '' },
                        { text: 'Ensure Tier 0+1 loads never exceed 80% of reduced service rating', ref: 'NEC 220, 230' },
                        { text: 'Calculate new demand charge savings: (Old Peak - New Peak) × $/kW', ref: 'Utility tariff' }
                    ]
                }
            ]
        },
        {
            id: 'loadTiering',
            number: 3,
            title: 'Load Tiering & Shed Implementation',
            icon: '🎚️',
            color: 'red',
            description: 'Practical load-shed sequencing, controls, and verification',
            cards: [
                {
                    id: 'shedSequencing',
                    title: 'Shed Sequence Design',
                    icon: '🔄',
                    iconColor: 'red',
                    checklist: [
                        { text: 'Define trigger: utility signal (OpenADR), peak threshold, manual, generator start', ref: 'OpenADR 2.0, NEC 700, 701' },
                        { text: 'Sequence: Tier 3 immediate → Tier 2 staged (30-60s delays) → Tier 1 never', ref: '' },
                        { text: 'Restore sequence: Tier 1 verify → Tier 2 staggered (5-10min) → Tier 3 last', ref: '' },
                        { text: 'Set minimum off-time (15-30min) to prevent cycling', ref: '' },
                        { text: 'Define maximum shed duration per tier (Tier 3: 4hr, Tier 2: 2hr)', ref: '' },
                        { text: 'Create shed/restore logic ladder diagram for PLC/BAS', ref: '' }
                    ]
                },
                {
                    id: 'controlsIntegration',
                    title: 'Controls & BAS Integration',
                    icon: '🤖',
                    iconColor: 'blue',
                    checklist: [
                        { text: 'Map each shed load to controllable device: contactor, VFD, smart breaker, relay', ref: '' },
                        { text: 'VFD loads: ramp down to minimum speed (not hard off) to avoid restart transients', ref: 'IEEE 519, VFD mfr' },
                        { text: 'Lighting: dim to 50% before off; use 0-10V/DALI/EnOcean', ref: 'IECC C405, NEC 410' },
                        { text: 'HVAC: global temp offset +4°F cool / -4°F heat; disable reheat', ref: 'ASHRAE 90.1, IECC' },
                        { text: 'EV chargers: OpenADR V2G/V1G; reduce to 6A minimum or pause', ref: 'NEC 625, SAE J2931' },
                        { text: 'Water heaters: top-element only; thermal storage tanks hold 2-4hr', ref: '' },
                        { text: 'Verify all controls fail-safe: loss of comms = normal operation (not shed)', ref: 'NFPA 70E, ISA 84' }
                    ]
                },
                {
                    id: 'verification',
                    title: 'Shed Verification & Testing',
                    icon: '✅',
                    iconColor: 'green',
                    checklist: [
                        { text: 'Functional test: trigger each shed stage, measure actual kW reduction', ref: '' },
                        { text: 'Verify Tier 0/1 loads unchanged during full shed (power quality monitor)', ref: 'IEEE 1159' },
                        { text: 'Measure restoration inrush: stagger delays adequate?', ref: '' },
                        { text: 'Test fail-safe: disconnect BAS comms, verify loads return to normal', ref: '' },
                        { text: 'Document actual vs calculated shed per tier', ref: '' },
                        { text: 'Quarterly re-test per NFPA 70B Chapter 9', ref: 'NFPA 70B' }
                    ]
                }
            ]
        },
        {
            id: 'criticalPreservation',
            number: 4,
            title: 'Critical Load Preservation & Quality',
            icon: '🛡️',
            color: 'purple',
            description: 'Ensuring Tier 0/1 power quality, ride-through, and resilience during scaling',
            cards: [
                {
                    id: 'powerQuality',
                    title: 'Power Quality During Scaling Events',
                    icon: '📐',
                    iconColor: 'blue',
                    checklist: [
                        { text: 'Voltage sag ride-through: Tier 0/1 equipment ≥ 0.5s at 70% voltage (SEMI F47)', ref: 'SEMI F47, IEEE 1159' },
                        { text: 'Harmonic limits during VFD ramp: THDv ≤5%, individual ≤3% (IEEE 519)', ref: 'IEEE 519' },
                        { text: 'Frequency stability: generator ±0.5Hz, UPS ±0.1Hz during transfer', ref: 'NFPA 110, IEC 62040' },
                        { text: 'Transient protection: Tier 0/1 panels have SPD Type 1+2 (IEEE C62.41)', ref: 'NEC 242, IEEE C62.41' },
                        { text: 'Grounding integrity: verify equipotential plane for Tier 0/1 during shed', ref: 'NEC 250, IEEE 142' }
                    ]
                },
                {
                    id: 'redundancy',
                    title: 'Redundancy & Backup Coordination',
                    icon: '🔁',
                    iconColor: 'yellow',
                    checklist: [
                        { text: 'UPS sizing: Tier 0/1 runtime ≥ generator start + transfer (typically 30-60s)', ref: 'NFPA 110, NEC 700' },
                        { text: 'Generator capacity: ≥ Tier 0+1 load × 1.1 (10% margin for transients)', ref: 'NFPA 110, NEC 700.4' },
                        { text: 'ATS settings: 3-10s engine start delay, 0.5-3s transfer delay, in-phase monitor', ref: 'NFPA 110, NEC 700.12' },
                        { text: 'Dual-utility feed: automatic throwover, sync check, Tier 0 on preferred source', ref: 'NEC 700, 701' },
                        { text: 'Fuel supply: 96hr minimum for Tier 0/1 (NFPA 110 Level 1)', ref: 'NFPA 110' },
                        { text: 'Battery monitoring: string voltage, cell impedance, temp per NFPA 70B', ref: 'NFPA 70B, IEEE 1188' }
                    ]
                },
                {
                    id: 'dataComms',
                    title: 'Data & Communications Resilience',
                    icon: '📡',
                    iconColor: 'green',
                    checklist: [
                        { text: 'Network core (switches, routers, firewalls) on Tier 0 UPS + generator', ref: '' },
                        { text: 'Wireless AP / DAS: Tier 1 (emergency comms), Tier 0 (fire/life safety)', ref: 'NFPA 72, 1221' },
                        { text: 'BAS/EMS server: Tier 1 with 4hr battery + generator', ref: '' },
                        { text: 'Historian/SCADA: Tier 1, redundant historian, store-forward on comms loss', ref: '' },
                        { text: 'Cybersecurity: isolate shed control network (VLAN, firewall, no internet)', ref: 'ISA 62443, NERC CIP' }
                    ]
                }
            ]
        },
        {
            id: 'optimization',
            number: 5,
            title: 'Optimization & Continuous Improvement',
            icon: '📈',
            color: 'green',
            description: 'Measurement, verification, and iterative refinement',
            cards: [
                {
                    id: 'mAndV',
                    title: 'Measurement & Verification (IPMVP)',
                    icon: '📊',
                    iconColor: 'blue',
                    checklist: [
                        { text: 'Option A: Retrofit isolation (key equipment sub-metered pre/post)', ref: 'IPMVP, ASHRAE 14' },
                        { text: 'Option B: All-load utility bill analysis (normalized for weather/production)', ref: 'IPMVP' },
                        { text: 'Option C: Whole-facility regression model (baseline vs reporting period)', ref: 'IPMVP' },
                        { text: 'Track: peak kW, load factor, demand charges, energy cost, Tier 0/1 uptime', ref: '' },
                        { text: 'Report monthly; annual reconciliation with utility interval data', ref: '' }
                    ]
                },
                {
                    id: 'iterativeRefinement',
                    title: 'Iterative Refinement',
                    icon: '🔧',
                    iconColor: 'purple',
                    checklist: [
                        { text: 'Quarterly: compare actual shed vs design; adjust sequences', ref: 'NFPA 70B' },
                        { text: 'Annual: re-run load study (NEC 220.87), update derating calcs', ref: 'NEC 220.87' },
                        { text: 'Add new Tier 3 candidates: identify newly controllable loads', ref: '' },
                        { text: 'Optimize staging delays: minimize total shed time while preventing inrush', ref: '' },
                        { text: 'Evaluate new tech: battery storage for peak shave, thermal storage for HVAC', ref: 'NEC 706, IEEE 1547' }
                    ]
                },
                {
                    id: 'financial',
                    title: 'Financial Optimization',
                    icon: '💰',
                    iconColor: 'yellow',
                    checklist: [
                        { text: 'Demand charge reduction: (Old Peak - New Peak) × $/kW × 12 months', ref: 'Utility tariff' },
                        { text: 'Energy arbitrage: shift Tier 3 to off-peak (TOU rates)', ref: '' },
                        { text: 'Demand response revenue: kW enrolled × $/kW-year (if program available)', ref: 'ISO/RTO, utility DR' },
                        { text: 'Avoided capacity upgrade: deferred service/transformer upgrade CAPEX', ref: '' },
                        { text: 'Calculate NPV/IRR of controls investment vs savings', ref: '' }
                    ]
                }
            ]
        },
        {
            id: 'documentation',
            number: 6,
            title: 'Documentation & Turnover Package',
            icon: '📦',
            color: 'blue',
            description: 'Complete deliverables for operations, maintenance, and compliance',
            cards: [
                {
                    id: 'deliverables',
                    title: 'Required Deliverables',
                    icon: '📁',
                    iconColor: 'blue',
                    checklist: [
                        { text: 'Revised one-line diagram: new ratings, derating factors, protection settings', ref: '' },
                        { text: 'Load schedule with tier assignments, nameplate vs actual, diversity factors', ref: 'NEC 220, 408.4' },
                        { text: 'Derating calculation sheets: ambient, fill, voltage drop, transformer, panel', ref: 'NEC 310, 210, 215, 230' },
                        { text: 'Protection coordination study: TCC curves, arc flash labels, settings sheets', ref: 'NEC 110.16, 110.24, 240.12, 700.32' },
                        { text: 'Shed/restore sequence ladder logic (PDF + native PLC file)', ref: '' },
                        { text: 'BAS/EMS points list: every controllable point, register, scale, fallback', ref: '' },
                        { text: 'OpenADR / DR registration documents (if applicable)', ref: 'OpenADR 2.0' },
                        { text: 'M&V plan per IPMVP Option A/B/C with baseline model', ref: 'IPMVP' },
                        { text: 'Commissioning test reports: functional, integrated, regression', ref: 'NFPA 70B, ASHRAE 111' },
                        { text: 'O&M manual: operating procedures, emergency override, troubleshooting', ref: '' },
                        { text: 'Training records: operators, maintenance, IT/cyber', ref: 'NFPA 70E, ISA 62443' },
                        { text: 'Quarterly test schedule & NFPA 70B maintenance intervals', ref: 'NFPA 70B Ch 9' }
                    ]
                },
                {
                    id: 'compliance',
                    title: 'Compliance Matrix',
                    icon: '✅',
                    iconColor: 'green',
                    checklist: [
                        { text: 'NEC 220 Load calculations updated and signed', ref: 'NEC 220' },
                        { text: 'NEC 230 Service entrance adequate for reduced load', ref: 'NEC 230' },
                        { text: 'NEC 240 Protection coordination maintained', ref: 'NEC 240' },
                        { text: 'NEC 250 Grounding/bonding verified at new loading', ref: 'NEC 250' },
                        { text: 'NEC 700/701/708 Emergency/standby/Critical ops power systems', ref: 'NEC 700, 701, 708' },
                        { text: 'NEC 110.16 Arc flash labels updated', ref: 'NEC 110.16' },
                        { text: 'NEC 110.24 Fault current marking updated', ref: 'NEC 110.24' },
                        { text: 'NFPA 70B Electrical Maintenance Program updated', ref: 'NFPA 70B' },
                        { text: 'NFPA 70E Electrical Safety Program updated', ref: 'NFPA 70E' },
                        { text: 'NFPA 110 Generator runtime/load bank test', ref: 'NFPA 110' },
                        { text: 'IEEE 519 Harmonic compliance at new operating point', ref: 'IEEE 519' },
                        { text: 'IECC/ASHRAE 90.1 Energy code (lighting/HVAC controls)', ref: 'IECC, ASHRAE 90.1' }
                    ]
                }
            ]
        }
    ]
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = powerScalingData;
}