// Residential Scale Data - Electrical Installation Analysis
// Covers: Single-family, duplex, small multi-family (up to 4 units)
// NEC 2023 Primary Articles: 210, 220, 230, 240, 250, 310, 314, 406, 408, 410

const residentialData = {
    scale: 'residential',
    label: 'Residential',
    icon: '🏠',
    description: 'Single-family, duplex, small multi-family (up to 4 units)',
    serviceTypical: '120/240V, 100-200A, 1Ø3W',
    phases: [
        {
            id: 'preSite',
            number: 1,
            title: 'Pre-Site Preparation',
            icon: '📋',
            color: 'blue',
            description: 'Permits, utility coordination, job planning',
            cards: [
                {
                    id: 'permits',
                    title: 'Permit Acquisition',
                    icon: '📄',
                    iconColor: 'blue',
                    checklist: [
                        { text: 'Obtain electrical permit from AHJ (Authority Having Jurisdiction)', ref: 'NEC 90.4, Local ordinance' },
                        { text: 'Verify permit covers all work scope (service, panels, circuits, EV)', ref: '' },
                        { text: 'Schedule rough-in inspection with building department', ref: '' },
                        { text: 'Post permit visibly at job site', ref: 'NEC 90.4' },
                        { text: 'Confirm permit expiration date and renewal process', ref: '' }
                    ]
                },
                {
                    id: 'utility',
                    title: 'Utility Coordination',
                    icon: '🔌',
                    iconColor: 'yellow',
                    checklist: [
                        { text: 'Contact utility for service drop/lateral requirements', ref: 'NEC 230.2, Utility standards' },
                        { text: 'Confirm service voltage (120/240V 1Ø3W standard)', ref: 'NEC 230.2' },
                        { text: 'Verify meter socket type and location requirements', ref: 'NEC 230.21, Utility specs' },
                        { text: 'Coordinate service disconnect location (readily accessible)', ref: 'NEC 230.70' },
                        { text: 'Request temporary power if needed for construction', ref: '' }
                    ]
                },
                {
                    id: 'planning',
                    title: 'Job Planning & Documentation Prep',
                    icon: '📐',
                    iconColor: 'green',
                    checklist: [
                        { text: 'Review architectural/structural plans for panel locations', ref: '' },
                        { text: 'Identify all load types: HVAC, WH, range, dryer, EV, lighting', ref: 'NEC 220.82' },
                        { text: 'Prepare preliminary load calculation worksheet', ref: 'NEC 220.82/220.83' },
                        { text: 'Gather equipment cut sheets for major appliances', ref: '' },
                        { text: 'Verify AFCI/GFCI requirements for all applicable areas', ref: 'NEC 210.12, 210.8' }
                    ]
                }
            ]
        },
        {
            id: 'siteSurvey',
            number: 2,
            title: 'Site Survey & Inspection',
            icon: '🔍',
            color: 'yellow',
            description: 'Physical inspection of service entrance, panels, grounding, circuits',
            cards: [
                {
                    id: 'serviceEntrance',
                    title: 'Service Entrance Inspection',
                    icon: '⚡',
                    iconColor: 'yellow',
                    checklist: [
                        { text: 'Verify service drop clearance (10ft above grade, 3ft from windows)', ref: 'NEC 230.24' },
                        { text: 'Check service mast/weatherhead condition and attachment', ref: 'NEC 230.28, 230.54' },
                        { text: 'Confirm service entrance conductor size and type (SE/USE)', ref: 'NEC 230.41, 310.12' },
                        { text: 'Verify drip loops on overhead conductors', ref: 'NEC 230.54' },
                        { text: 'Check point of attachment height (min 10ft above grade)', ref: 'NEC 230.24' }
                    ]
                },
                {
                    id: 'meterSocket',
                    title: 'Meter Socket & Service Equipment',
                    icon: '📊',
                    iconColor: 'blue',
                    checklist: [
                        { text: 'Verify meter socket rating matches service (100A/200A/320A)', ref: 'NEC 230.21' },
                        { text: 'Check meter socket mounting (secure, level, accessible)', ref: 'NEC 230.21' },
                        { text: 'Verify service disconnect rating ≥ calculated load', ref: 'NEC 230.79' },
                        { text: 'Confirm disconnect is readily accessible (not in closet/bathroom)', ref: 'NEC 230.70' },
                        { text: 'Check for proper labeling: "Main Disconnect", "Service Disconnect"', ref: 'NEC 110.22' }
                    ]
                },
                {
                    id: 'grounding',
                    title: 'Grounding Electrode System',
                    icon: '🔗',
                    iconColor: 'green',
                    checklist: [
                        { text: 'Verify ground rod(s): 8ft min, 5/8in copper-clad or 1/2in steel', ref: 'NEC 250.52, 250.53' },
                        { text: 'Check rod spacing (min 6ft apart if multiple)', ref: 'NEC 250.53' },
                        { text: 'Verify GEC (Grounding Electrode Conductor) size per Table 250.66', ref: 'NEC 250.66' },
                        { text: 'Check GEC connection to rod (acorn clamp, listed)', ref: 'NEC 250.70' },
                        { text: 'Verify bonding: metal water pipe, gas pipe, structural steel', ref: 'NEC 250.50, 250.104' },
                        { text: 'Check main bonding jumper in service equipment', ref: 'NEC 250.28' },
                        { text: 'Verify grounded conductor (neutral) to ground bond at service only', ref: 'NEC 250.24' }
                    ]
                },
                {
                    id: 'panels',
                    title: 'Panelboard Inspection',
                    icon: '📦',
                    iconColor: 'purple',
                    checklist: [
                        { text: 'Verify panel rating ≥ calculated load (100A/150A/200A typical)', ref: 'NEC 230.79, 220.82' },
                        { text: 'Check panel location: accessible, 30in×36in working space', ref: 'NEC 110.26' },
                        { text: 'Confirm panel not in bathroom, closet, or over stairs', ref: 'NEC 110.26, 240.24' },
                        { text: 'Verify circuit directory completed and accurate', ref: 'NEC 408.4' },
                        { text: 'Check all breaker slots filled (breakers or blanks)', ref: 'NEC 408.7' },
                        { text: 'Verify AFCI protection: bedrooms, living areas, etc.', ref: 'NEC 210.12' },
                        { text: 'Verify GFCI protection: kitchen, bath, garage, outdoor, basement', ref: 'NEC 210.8' },
                        { text: 'Check for proper breaker sizing per conductor (15A #14, 20A #12)', ref: 'NEC 240.4' },
                        { text: 'Verify neutral/ground bars separated (sub-panels only)', ref: 'NEC 250.24' }
                    ]
                },
                {
                    id: 'circuits',
                    title: 'Branch Circuit Verification',
                    icon: '🔀',
                    iconColor: 'red',
                    checklist: [
                        { text: 'Verify conductor type: NM-B (Romex) in dry locations', ref: 'NEC 334' },
                        { text: 'Check cable support: 4.5ft intervals, 12in from boxes', ref: 'NEC 334.30' },
                        { text: 'Verify cable protection: bored holes 1.25in from edge', ref: 'NEC 300.4' },
                        { text: 'Check receptacle spacing: 6ft/12ft rule (wall space)', ref: 'NEC 210.52' },
                        { text: 'Verify kitchen countertop: 2x20A small appliance circuits', ref: 'NEC 210.11, 210.52' },
                        { text: 'Check bathroom: 20A circuit, GFCI, no other outlets', ref: 'NEC 210.11, 210.8' },
                        { text: 'Verify laundry: 20A dedicated circuit', ref: 'NEC 210.11' },
                        { text: 'Check HVAC: dedicated circuit per nameplate', ref: 'NEC 440' },
                        { text: 'Verify water heater: dedicated 240V circuit', ref: 'NEC 422' },
                        { text: 'Check range/oven: dedicated 40-50A 240V circuit', ref: 'NEC 220.55' },
                        { text: 'Verify dryer: dedicated 30A 240V circuit (4-wire)', ref: 'NEC 220.54' },
                        { text: 'Check EV charging: dedicated circuit per EVSE specs', ref: 'NEC 625' }
                    ]
                }
            ]
        },
        {
            id: 'loadCalc',
            number: 3,
            title: 'Load Calculations',
            icon: '🧮',
            color: 'green',
            description: 'NEC 220.82 (standard) or 220.83 (optional) load calculation',
            cards: [
                {
                    id: 'standardCalc',
                    title: 'Standard Calculation (NEC 220.82)',
                    icon: '📊',
                    iconColor: 'blue',
                    checklist: [
                        { text: 'Lighting load: 3 VA/sq ft × total finished floor area', ref: 'NEC 220.82(A)' },
                        { text: 'Small appliance: 2 × 1500 VA = 3000 VA (kitchen)', ref: 'NEC 220.82(B)' },
                        { text: 'Laundry: 1 × 1500 VA = 1500 VA', ref: 'NEC 220.82(C)' },
                        { text: 'Fixed appliances: nameplate VA (WH, DW, disposal, etc.)', ref: 'NEC 220.82(D)' },
                        { text: 'HVAC: largest of cooling or heating (nameplate)', ref: 'NEC 220.82(C)' },
                        { text: 'Apply demand factors: first 10kVA at 100%, remainder at 40%', ref: 'NEC 220.82' },
                        { text: 'Add 25% of largest motor (if applicable)', ref: 'NEC 220.82' }
                    ]
                },
                {
                    id: 'optionalCalc',
                    title: 'Optional Calculation (NEC 220.83) - Existing Dwelling',
                    icon: '📐',
                    iconColor: 'green',
                    checklist: [
                        { text: 'Lighting + receptacles: 3 VA/sq ft × floor area', ref: 'NEC 220.83(A)' },
                        { text: 'Small appliance + laundry: 1500 VA each circuit', ref: 'NEC 220.83(B)' },
                        { text: 'Fixed appliances: nameplate ratings', ref: 'NEC 220.83(C)' },
                        { text: 'HVAC: 100% of largest heating/cooling', ref: 'NEC 220.83(D)' },
                        { text: 'Apply demand: first 8kVA at 100%, remainder at 40%', ref: 'NEC 220.83' }
                    ]
                },
                {
                    id: 'evLoad',
                    title: 'EV Charging Load',
                    icon: '🚗',
                    iconColor: 'purple',
                    checklist: [
                        { text: 'Level 1 (120V): 12-16A continuous = 1440-1920 VA', ref: 'NEC 625.41' },
                        { text: 'Level 2 (240V): 32-80A continuous = 7.7-19.2 kVA', ref: 'NEC 625.41' },
                        { text: 'Apply 125% for continuous load (NEC 210.19)', ref: 'NEC 210.19' },
                        { text: 'Verify panel has space for 2-pole breaker', ref: '' },
                        { text: 'Consider load management (NEC 625.42, 750.30)', ref: 'NEC 625.42' }
                    ]
                }
            ]
        },
        {
            id: 'panelSchedule',
            number: 4,
            title: 'Panel Schedule & Documentation',
            icon: '📋',
            color: 'purple',
            description: 'Create complete panel schedule, circuit directory, and labeling',
            cards: [
                {
                    id: 'schedule',
                    title: 'Panel Schedule Creation',
                    icon: '📝',
                    iconColor: 'blue',
                    checklist: [
                        { text: 'List all circuits: number, description, breaker size, wire size', ref: 'NEC 408.4' },
                        { text: 'Calculate phase balance (L1 vs L2 loading)', ref: '' },
                        { text: 'Verify total connected load ≤ panel rating', ref: 'NEC 230.79' },
                        { text: 'Document spare spaces for future use', ref: '' },
                        { text: 'Note AFCI/GFCI/CAFCI breaker types per circuit', ref: 'NEC 210.12, 210.8' }
                    ]
                },
                {
                    id: 'labeling',
                    title: 'Circuit Directory & Labeling',
                    icon: '🏷️',
                    iconColor: 'yellow',
                    checklist: [
                        { text: 'Complete circuit directory on panel door (typed/printed)', ref: 'NEC 408.4' },
                        { text: 'Label each breaker: "Bedroom 1", "Kitchen Counter", etc.', ref: 'NEC 408.4' },
                        { text: 'Label service disconnect: "Main Disconnect - 200A"', ref: 'NEC 110.22' },
                        { text: 'Label sub-panel feed: "Sub-Panel Garage - 60A"', ref: 'NEC 110.22' },
                        { text: 'Verify all labels legible and permanent', ref: 'NEC 110.21' }
                    ]
                },
                {
                    id: 'photos',
                    title: 'Photo Documentation',
                    icon: '📸',
                    iconColor: 'green',
                    checklist: [
                        { text: 'Service entrance: weatherhead, mast, drip loops', ref: '' },
                        { text: 'Meter socket: front, label, mounting', ref: '' },
                        { text: 'Main panel: interior (breakers, wiring, labels)', ref: '' },
                        { text: 'Panel directory: completed and legible', ref: '' },
                        { text: 'Grounding: rod(s), clamps, GEC, bonding', ref: '' },
                        { text: 'Sub-panels: interior, feed, grounding separation', ref: '' },
                        { text: 'GFCI/AFCI test results: tester showing pass', ref: '' },
                        { text: 'Working space: 30in×36in clear in front of panel', ref: 'NEC 110.26' }
                    ]
                }
            ]
        },
        {
            id: 'testing',
            number: 5,
            title: 'Testing & Verification',
            icon: '✅',
            color: 'red',
            description: 'Final testing, GFCI/AFCI verification, voltage checks',
            cards: [
                {
                    id: 'voltage',
                    title: 'Voltage & Polarity Testing',
                    icon: '🔬',
                    iconColor: 'blue',
                    checklist: [
                        { text: 'Verify 120V L1-N and L2-N at panel and receptacles', ref: '' },
                        { text: 'Verify 240V L1-L2 at 240V receptacles/equipment', ref: '' },
                        { text: 'Check polarity at all receptacles (hot/neutral/ground)', ref: 'NEC 406.5' },
                        { text: 'Verify ground continuity: receptacle ground to panel', ref: 'NEC 250.118' },
                        { text: 'Measure voltage drop on long runs (<3% branch, <5% total)', ref: 'NEC 210.19' }
                    ]
                },
                {
                    id: 'gfciAfci',
                    title: 'GFCI/AFCI Functional Testing',
                    icon: '🛡️',
                    iconColor: 'green',
                    checklist: [
                        { text: 'Test every GFCI receptacle: press TEST, verify TRIP, press RESET', ref: 'NEC 210.8' },
                        { text: 'Test every GFCI breaker: same procedure', ref: 'NEC 210.8' },
                        { text: 'Test every AFCI breaker: press TEST, verify TRIP', ref: 'NEC 210.12' },
                        { text: 'Test dual-function (CAFCI/GFCI) breakers both functions', ref: 'NEC 210.8, 210.12' },
                        { text: 'Document test results: location, date, pass/fail', ref: '' }
                    ]
                },
                {
                    id: 'final',
                    title: 'Final Inspection Prep',
                    icon: '📋',
                    iconColor: 'purple',
                    checklist: [
                        { text: 'All covers installed: panel, junction boxes, receptacles', ref: 'NEC 110.12' },
                        { text: 'All unused openings closed (panel knockouts, box holes)', ref: 'NEC 110.12' },
                        { text: 'Working space clear: 30in wide × 36in deep × 78in high', ref: 'NEC 110.26' },
                        { text: 'Panel directory complete and accurate', ref: 'NEC 408.4' },
                        { text: 'All labeling in place (disconnects, panels, circuits)', ref: 'NEC 110.22' },
                        { text: 'GFCI/AFCI protection verified and documented', ref: 'NEC 210.8, 210.12' },
                        { text: 'Grounding electrode system complete and accessible', ref: 'NEC 250.53' },
                        { text: 'Schedule final electrical inspection with AHJ', ref: '' }
                    ]
                }
            ]
        },
        {
            id: 'deliverables',
            number: 6,
            title: 'Final Deliverables',
            icon: '📦',
            color: 'blue',
            description: 'Complete documentation package for owner and AHJ',
            cards: [
                {
                    id: 'package',
                    title: 'Owner/AHJ Documentation Package',
                    icon: '📁',
                    iconColor: 'blue',
                    checklist: [
                        { text: 'Completed load calculation worksheets (standard & optional)', ref: 'NEC 220' },
                        { text: 'Panel schedule(s) - main and all sub-panels', ref: 'NEC 408.4' },
                        { text: 'Circuit directory (on panel door + copy for owner)', ref: 'NEC 408.4' },
                        { text: 'GFCI/AFCI test log with dates and results', ref: 'NEC 210.8, 210.12' },
                        { text: 'Grounding electrode test results (if measured)', ref: 'NEC 250.53' },
                        { text: 'Photo documentation (USB drive or printed)', ref: '' },
                        { text: 'Equipment list with model numbers (panel, breakers, GFCIs, AFCIs)', ref: '' },
                        { text: 'Permit copy with final inspection sign-off', ref: '' },
                        { text: 'As-built drawings (if required by AHJ)', ref: '' },
                        { text: 'Owner orientation: main disconnect, GFCI reset, panel tour', ref: '' }
                    ]
                }
            ]
        }
    ]
};

// Export for use in app

// Export for browser
window.residentialData = residentialData;
