// Residential Scale Data - Complete Step-by-Step Installation Guide
// Covers: Single-family, duplex, small multi-family (up to 4 units)
// NEC 2023 Primary Articles: 210, 220, 230, 240, 250, 310, 314, 406, 408, 410, 334, 320, 338, 410, 422, 334, 320, 338, 410, 422
console.log('residential.js loading');
const residentialData = {
    scale: 'residential',
    label: 'Residential',
    icon: '🏠',
    description: 'Single-family, duplex, small multi-family (up to 4 units)',
    serviceTypical: '120/240V, 100-200A, 1Ø3W',
    // Equipment Specifications with Sizes
    equipmentSpecs: {
        serviceEntrance: {
            meterSocket: { type: '200A ringless, 4-jaw, NEMA 3R', standard: 'UL 414', size: '6"W x 14"H x 4"D' },
            serviceDisconnect: { type: '200A 2-pole main breaker', rating: '10kAIC min', size: '2-pole, 200A' },
            panelboard: { type: '200A 40-circuit, 120/240V, 1Ø', standard: 'UL 67', size: '14.5"W x 32"H x 3.75"D' },
            groundingKit: { type: 'Ground bar, bonding screw, 2/0 Cu GEC lug', standard: 'UL 467' }
        },
        branchCircuits: {
            lighting: { awg: '14', insulation: 'NM-B 14/2 w/gnd', breaker: '15A 1P AFCI', conduit: 'NM-B cable', load: '15A max' },
            receptacles: { awg: '12', insulation: 'NM-B 12/2 w/gnd', breaker: '20A 1P AFCI/GFCI', conduit: 'NM-B cable', load: '20A max' },
            kitchenSABC: { awg: '12', insulation: 'NM-B 12/2 w/gnd', breaker: '20A 1P GFCI', conduit: 'NM-B cable', load: '20A max' },
            laundry: { awg: '12', insulation: 'NM-B 12/2 w/gnd', breaker: '20A 1P GFCI', conduit: 'NM-B cable', load: '20A max' },
            bathroom: { awg: '12', insulation: 'NM-B 12/2 w/gnd', breaker: '20A 1P GFCI', conduit: 'NM-B cable', load: '20A max' },
            hvac: { awg: '10', insulation: 'NM-B 10/2 w/gnd', breaker: '30A 2P', conduit: 'NM-B cable', load: '30A max' },
            waterHeater: { awg: '10', insulation: 'NM-B 10/2 w/gnd', breaker: '30A 2P', conduit: 'NM-B cable', load: '30A max' },
            dryer: { awg: '10', insulation: 'NM-B 10/3 w/gnd', breaker: '30A 2P', conduit: 'NM-B cable', load: '30A max' },
            range: { awg: '8', insulation: 'NM-B 8/3 w/gnd', breaker: '50A 2P', conduit: 'NM-B cable', load: '50A max' },
            evCharger: { awg: '6', insulation: 'THHN in 3/4" EMT', breaker: '60A 2P', conduit: '3/4" EMT', load: '60A max' },
            subPanel: { awg: '4', insulation: 'SER 4-4-4-6 Al', breaker: '100A 2P', conduit: '1-1/4" PVC', load: '100A max' }
        },
        grounding: {
            groundRod: { type: '5/8" x 8ft copper-clad steel', standard: 'UL 467', qty: 2 },
            gec: { awg: '4 AWG Cu bare', standard: 'Table 250.66', length: 'as required' },
            bondingJumper: { awg: '4 AWG Cu', type: 'Main bonding jumper', location: 'Service panel' },
            waterPipeBond: { awg: '4 AWG Cu', location: 'Within 5ft of entrance' },
            gasPipeBond: { awg: '6 AWG Cu', location: 'At equipment' }
        },
        conduitFill: {
            '1/2"': { emt: 0.304, pvc40: 0.122, rmc: 0.304, pvc80: 0.094 },
            '3/4"': { emt: 0.533, pvc40: 0.213, rmc: 0.533, pvc80: 0.173 },
            '1"': { emt: 0.864, pvc40: 0.346, rmc: 0.864, pvc80: 0.288 },
            '1-1/4"': { emt: 1.496, pvc40: 0.598, rmc: 1.496, pvc80: 0.512 },
            '1-1/2"': { emt: 2.036, pvc40: 0.814, rmc: 2.036, pvc80: 0.707 },
            '2"': { emt: 3.356, pvc40: 1.342, rmc: 3.356, pvc80: 1.181 },
            '2-1/2"': { emt: 5.858, pvc40: 1.915, rmc: 5.858, pvc80: 1.915 },
            '3"': { emt: 8.846, pvc40: 3.538, rmc: 8.846, pvc80: 2.957 },
            '3-1/2"': { emt: 11.54, pvc40: 4.616, rmc: 11.54, pvc80: 3.959 },
            '4"': { emt: 14.75, pvc40: 5.900, rmc: 14.75, pvc80: 5.239 }
        }
    },
    // Manpower Estimates (hours per task)
    manpowerEstimates: {
        permitAcquisition: { jm: 2, ap: 1 },
        utilityCoordination: { jm: 1, ap: 0.5 },
        roughIn: { jm: 16, ap: 16, helper: 8 }, // per 2000 sq ft
        wirePull: { jm: 8, ap: 8, helper: 4 },
        deviceInstall: { jm: 12, ap: 12 },
        panelBuild: { jm: 8, ap: 4 },
        testing: { jm: 4, ap: 2 },
        inspectionCoord: { jm: 2, ap: 1 },
        documentation: { jm: 3, ap: 2 }
    },
    phases: [
        {
            id: 'preSite',
            number: 1,
            title: 'Phase 1: Pre-Site Preparation & Planning',
            icon: '📋',
            color: 'blue',
            description: 'Permits, utility coordination, load calculations, job planning',
            estimatedHours: { jm: 15, ap: 8, helper: 2 },
            steps: [
                {
                    order: 1,
                    title: '1.1 Obtain Electrical Permit',
                    type: 'administrative',
                    duration: { jm: 2, ap: 1 },
                    crew: { jm: 1, ap: 1 },
                    materials: [],
                    tools: ['Permit application', 'Site plan', 'Load calculation sheets'],
                    instructions: [
                        'Complete electrical permit application with AHJ (Authority Having Jurisdiction)',
                        'Submit site plan showing service entrance, panel locations, grounding electrode',
                        'Submit load calculation worksheet (NEC 220.82 standard or 220.83 optional)',
                        'Pay permit fees and obtain permit number',
                        'Post permit visibly at job site per NEC 90.4',
                        'Schedule rough-in inspection with building department',
                        'Confirm permit expiration date (typically 180 days) and renewal process'
                    ],
                    verification: 'Permit posted, rough-in inspection scheduled',
                    codeRefs: ['NEC 90.4', 'Local ordinance']
                },
                {
                    order: 2,
                    title: '1.2 Utility Coordination',
                    type: 'coordination',
                    duration: { jm: 1, ap: 0.5 },
                    crew: { jm: 1, ap: 1 },
                    materials: [],
                    tools: ['Utility contact info', 'Site plan', 'Load letter'],
                    instructions: [
                        'Contact utility for service drop/lateral requirements (overhead vs underground)',
                        'Confirm service voltage: 120/240V 1Ø3W standard',
                        'Verify meter socket requirements: 200A ringless 4-jaw NEMA 3R',
                        'Coordinate service disconnect location (readily accessible, NEC 230.70)',
                        'Request temporary construction power if needed (NEC 590)',
                        'Obtain utility fault current data for AIC rating (NEC 110.24)'
                    ],
                    verification: 'Utility commitment letter received, meter socket approved',
                    codeRefs: ['NEC 230.2', '230.21', '230.24', '230.70']
                },
                {
                    order: 3,
                    title: '1.3 Load Calculation & Equipment Selection',
                    type: 'engineering',
                    duration: { jm: 4, ap: 2 },
                    crew: { jm: 1, ap: 1 },
                    materials: ['Load calculation worksheets', 'Appliance cut sheets', 'NEC 2023'],
                    tools: ['Calculator', 'NEC 2023', 'Manufacturer catalogs'],
                    instructions: [
                        'Measure total finished floor area for lighting load (3 VA/sq ft per NEC 220.82)',
                        'Calculate small appliance circuits: 2 × 1500 VA = 3000 VA (NEC 220.82(B))',
                        'Add laundry circuit: 1500 VA (NEC 220.82(C))',
                        'List all fixed appliances with nameplate VA: HVAC, WH, range, dryer, DW, disposal',
                        'Determine largest motor load (usually HVAC compressor) for 125% factor',
                        'Apply demand factors: First 10 kVA at 100%, remainder at 40% (NEC 220.82)',
                        'Add 25% of largest motor for continuous duty',
                        'Select service rating: 100A (≤10kVA), 150A (10-15kVA), 200A (>15kVA typical)',
                        'Select panelboard: 200A 40-circuit minimum for 200A service',
                        'Verify AFCI/GFCI requirements per NEC 210.12/210.8 for all applicable areas'
                    ],
                    verification: 'Load calculation worksheet complete, service size selected',
                    codeRefs: ['NEC 220.82', '220.83', '220.12', '220.14', '220.42', '220.44', '220.54', '220.55', '220.60', '210.12', '210.8']
                }
            ],
            deliverables: [
                'Posted electrical permit',
                'Utility coordination confirmation',
                'Signed load calculation worksheet',
                'Equipment submittal sheets (panel, breakers, meter socket)',
                'Rough-in inspection scheduled'
            ]
        },
        {
            id: 'roughIn',
            number: 2,
            title: 'Phase 2: Rough-In Installation',
            icon: '🔧',
            color: 'yellow',
            description: 'Conduit, cable, boxes, and raceway installation before drywall',
            estimatedHours: { jm: 40, ap: 40, helper: 20 },
            steps: [
                {
                    order: 1,
                    title: '2.1 Service Entrance & Metering',
                    type: 'installation',
                    duration: { jm: 4, ap: 2, helper: 1 },
                    crew: { jm: 1, ap: 1, helper: 1 },
                    materials: [
                        '200A meter socket (ringless, 4-jaw, NEMA 3R)',
                        '2" PVC or RMC for service lateral',
                        '2/0 Cu or 4/0 Al service entrance conductors',
                        'Weatherhead, conduit straps, LB fittings',
                        'Meter socket mounting hardware'
                    ],
                    tools: ['Conduit bender', 'Fish tape', 'Torque wrench', 'Level', 'Drill'],
                    instructions: [
                        'Install meter socket at utility-approved height (5-6 ft center)',
                        'Install service entrance conduit from meter to main panel',
                        'Pull service entrance conductors (2/0 Cu or 4/0 Al for 200A)',
                        'Install weatherhead with drip loops per NEC 230.54',
                        'Secure conduit with straps within 3ft of terminations, every 10ft',
                        'Maintain 10ft clearance above grade, 3ft from windows (NEC 230.24)',
                        'Install drip loops on all overhead conductors',
                        'Label service conductors: Phase A, Phase B, Neutral'
                    ],
                    verification: 'Conduit secure, conductors labeled, clearances met',
                    codeRefs: ['NEC 230.24', '230.28', '230.41', '230.54', '300.4']
                },
                {
                    order: 2,
                    title: '2.2 Main Panel Installation',
                    type: 'installation',
                    duration: { jm: 4, ap: 2 },
                    crew: { jm: 1, ap: 1 },
                    materials: [
                        '200A 40-circuit panelboard (120/240V, 1Ø)',
                        '200A main breaker (10kAIC min)',
                        'Ground bar kit, bonding screw',
                        'Panel mounting hardware',
                        'Circuit directory labels'
                    ],
                    tools: ['Level', 'Drill', 'Torque wrench', 'Label maker'],
                    instructions: [
                        'Mount panel at accessible height (center 4-5ft above floor, NEC 110.26)',
                        'Ensure 30" wide × 36" deep × 78" high working space (NEC 110.26)',
                        'Install main bonding jumper (service panel only)',
                        'Install ground bar, bond to panel enclosure',
                        'Install main breaker (200A 2-pole)',
                        'Leave space for future circuits (20-25% spare per NEC 408.4)',
                        'Ensure panel not in bathroom, closet, or over stairs (NEC 240.24)'
                    ],
                    verification: 'Panel level, working space clear, bonding jumper installed',
                    codeRefs: ['NEC 110.26', '240.24', '408.4', '250.28']
                },
                {
                    order: 3,
                    title: '2.3 Grounding Electrode System',
                    type: 'installation',
                    duration: { jm: 2, ap: 1, helper: 1 },
                    crew: { jm: 1, ap: 1, helper: 1 },
                    materials: [
                        'Two 5/8" x 8ft copper-clad ground rods',
                        'Acorn ground clamps (listed)',
                        '4 AWG bare Cu GEC',
                        'Intersystem bonding termination (ITB)',
                        'Water pipe bonding clamp (if metal pipe)'
                    ],
                    tools: ['Sledgehammer', 'Wire brush', 'Torque wrench', 'Clamp meter'],
                    instructions: [
                        'Drive first ground rod 8ft minimum, 6ft from second rod (NEC 250.53)',
                        'Drive second rod minimum 6ft from first (NEC 250.53)',
                        'Connect 4 AWG Cu GEC to rods with listed acorn clamps (NEC 250.70)',
                        'Run GEC to main panel, connect to ground bar (NEC 250.66)',
                        'Bond metal water pipe within 5ft of entrance (NEC 250.50, 250.104)',
                        'Bond gas piping at equipment (NEC 250.104)',
                        'Install intersystem bonding termination at service (NEC 250.94)',
                        'Verify ground rod resistance <25Ω (supplementary if >25Ω)'
                    ],
                    verification: 'Rods driven, clamps tight, GEC continuous to ground bar',
                    codeRefs: ['NEC 250.50', '250.52', '250.53', '250.66', '250.70', '250.94']
                },
                {
                    order: 4,
                    title: '2.4 Branch Circuit Rough-In',
                    type: 'installation',
                    duration: { jm: 20, ap: 20, helper: 10 },
                    crew: { jm: 2, ap: 2, helper: 2 },
                    materials: [
                        'NM-B cable: 14/2, 12/2, 10/2, 10/3, 8/3, 6/3 w/gnd',
                        '4" square boxes w/ mud rings',
                        'Single-gang, double-gang, 4" octagon boxes',
                        'NM cable connectors, staples, cable stackers',
                        'NAIL plates for cable protection'
                    ],
                    tools: ['Drill w/ auger bits', 'Fish tape', 'Cable stripper', 'Staple gun', 'Level'],
                    instructions: [
                        'Layout circuits per panel schedule: label each cable at both ends',
                        'Drill 7/8" holes in studs (1-1/4" from edge, NEC 300.4)',
                        'Install boxes: receptacles 12-18" AFF, switches 48" AFF',
                        'Run NM-B cable: support every 4.5ft, within 12" of boxes (NEC 334.30)',
                        'Protect cables in bored holes: 1-1/4" from edge, nail plates (NEC 300.4)',
                        'Separate neutrals per circuit in multi-wire branch circuits',
                        'Install smoke detector boxes: 1 per bedroom, hallway, each level',
                        'Install CO detector locations per local code',
                        'Leave 6-8" conductor tails in all boxes (NEC 300.14)'
                    ],
                    verification: 'Cables supported, protected, labeled, 6" tails in boxes',
                    codeRefs: ['NEC 334.30', '300.4', '300.14', '210.52', '210.12', '210.8']
                },
                {
                    order: 5,
                    title: '2.5 Special Circuit Rough-In',
                    type: 'installation',
                    duration: { jm: 8, ap: 8, helper: 4 },
                    crew: { jm: 1, ap: 1, helper: 1 },
                    materials: [
                        '10/3 NM-B (dryer), 8/3 NM-B (range), 6/3 THHN in EMT (EV)',
                        '30A/2P, 50A/2P, 60A/2P breakers',
                        'EVSE mounting hardware, EMT conduit'
                    ],
                    tools: ['Conduit bender', 'Fish tape', 'Torque wrench'],
                    instructions: [
                        'Install dryer circuit: 10/3 NM-B, 30A 2P breaker, 4-wire receptacle',
                        'Install range circuit: 8/3 NM-B, 50A 2P breaker, 4-wire receptacle',
                        'Install EV charger circuit: 6/3 THHN in 3/4" EMT, 60A 2P breaker',
                        'Install HVAC disconnect at unit (within sight, NEC 440.14)',
                        'Install water heater disconnect (within sight or lockable)',
                        'Verify all equipment grounding conductors pulled with circuits'
                    ],
                    verification: 'Correct wire sizes, breaker sizes, disconnects installed',
                    codeRefs: ['NEC 220.54', '220.55', '440.14', '422.31', '625.41']
                }
            ],
            deliverables: [
                'Rough-in inspection passed',
                'All cables labeled at panel and boxes',
                'Photos of rough-in before insulation'
            ]
        },
        {
            id: 'meterPanel',
            number: 3,
            title: 'Phase 3: Metering, Panel Build & Grounding Finalization',
            icon: '📊',
            color: 'blue',
            description: 'Meter socket, panel build, breaker installation, grounding finalization',
            estimatedHours: { jm: 12, ap: 8 },
            steps: [
                {
                    order: 1,
                    title: '3.1 Meter Socket & Service Connection',
                    type: 'installation',
                    duration: { jm: 2, ap: 1 },
                    crew: { jm: 1, ap: 1 },
                    materials: ['Utility meter', 'Meter socket sealing ring'],
                    tools: ['Utility seal tool'],
                    instructions: [
                        'Utility installs meter after rough-in passes inspection',
                        'Verify meter socket wiring: Line side from service drop, load side to panel',
                        'Verify meter socket bonding to ground (factory or field)',
                        'Utility installs meter, applies seal',
                        'Verify meter reads correctly under load'
                    ],
                    verification: 'Meter sealed, reading correctly, service energized',
                    codeRefs: ['NEC 230.21', '230.95', 'Utility standards']
                },
                {
                    order: 2,
                    title: '3.2 Panel Build & Breaker Installation',
                    type: 'assembly',
                    duration: { jm: 6, ap: 4 },
                    crew: { jm: 1, ap: 1 },
                    materials: [
                        'Branch breakers per panel schedule (15A, 20A, 30A, 50A, 60A)',
                        'AFCI breakers (bedrooms, living areas)',
                        'GFCI breakers (kitchen, bath, laundry, garage, outdoor)',
                        'CAFCI breakers (where required by local code)',
                        'Circuit directory labels'
                    ],
                    tools: ['Torque wrench (IN-LB)', 'Label maker', 'Phase rotation meter'],
                    instructions: [
                        'Install breakers per panel schedule: phase balance L1/L2',
                        'Torque all breaker terminals to manufacturer spec (typically 25-35 in-lb)',
                        'Install AFCI breakers for bedrooms, living areas, halls (NEC 210.12)',
                        'Install GFCI breakers for kitchen, bath, laundry, garage, outdoor (210.8)',
                        'Install dual-function (CAFCI/GFCI) where both required',
                        'Verify phase balance: L1 and L2 within 10% of each other',
                        'Install typed circuit directory on panel door (NEC 408.4)',
                        'Label each breaker with circuit description'
                    ],
                    verification: 'All breakers torqued, directory complete, phase balanced',
                    codeRefs: ['NEC 210.12', '210.8', '408.4', '110.22', '110.14']
                },
                {
                    order: 3,
                    title: '3.3 Grounding & Bonding Finalization',
                    type: 'verification',
                    duration: { jm: 2, ap: 1 },
                    crew: { jm: 1, ap: 1 },
                    tools: ['Ground resistance tester', 'Clamp meter', 'Torque wrench'],
                    instructions: [
                        'Verify ground rods driven 8ft, 6ft apart, acorn clamps tight',
                        'Verify GEC (4 AWG Cu) continuous from rods to ground bar',
                        'Verify main bonding jumper installed in main panel only',
                        'Verify sub-panel neutral isolated, ground bar separate',
                        'Verify water/gas bonding within 5ft of entrance',
                        'Test ground resistance: target <25Ω (supplementary rod if >25Ω)',
                        'Verify intersystem bonding termination accessible'
                    ],
                    verification: 'Ground resistance <25Ω, all bonds tight, no parallel paths',
                    codeRefs: ['NEC 250.50', '250.53', '250.66', '250.94']
                }
            ],
            deliverables: [
                'Service energized by utility',
                'Panel directory complete and accurate',
                'Ground resistance test results documented',
                'All breakers torqued to spec'
            ]
        },
        {
            id: 'trimOut',
            number: 4,
            title: 'Phase 4: Trim-Out & Device Installation',
            icon: '🔌',
            color: 'green',
            description: 'Device installation, cover plates, final connections',
            estimatedHours: { jm: 16, ap: 16 },
            steps: [
                {
                    order: 1,
                    title: '4.1 Device Installation',
                    type: 'installation',
                    duration: { jm: 8, ap: 8 },
                    crew: { jm: 1, ap: 1 },
                    materials: [
                        '15A/20A TR receptacles (GFCI where required)',
                        'TR/AFCI receptacles for bedrooms',
                        'Switches: single-pole, 3-way, dimmer',
                        'Decorative cover plates (screwless preferred)',
                        'Wire nuts, push-in connectors, electrical tape'
                    ],
                    tools: ['Wire strippers', 'Screwdriver set', 'Voltage tester', 'GFCI tester'],
                    instructions: [
                        'Strip conductors to proper length (5/8" for devices)',
                        'Install GFCI receptacles: kitchen, bath, garage, outdoor, laundry (NEC 210.8)',
                        'Install AFCI receptacles in bedrooms if AFCI breakers not used',
                        'Install TR receptacles throughout (NEC 406.12)',
                        'Install switches: verify 3-way/4-way travelers correct',
                        'Install dimmers compatible with LED loads',
                        'Verify polarity at every receptacle (hot-neutral-ground)',
                        'Install cover plates: screwless preferred, aligned'
                    ],
                    verification: 'All devices tested, polarity correct, GFCI trips/resets',
                    codeRefs: ['NEC 210.8', '210.12', '406.12', '406.5', '406.9']
                },
                {
                    order: 2,
                    title: '4.2 Luminaire & Appliance Connections',
                    type: 'installation',
                    duration: { jm: 4, ap: 4 },
                    crew: { jm: 1, ap: 1 },
                    materials: [
                        'Luminaires (LED preferred)',
                        'Appliance cords (range, dryer, disposal)',
                        'Wire nuts, connectors, tape'
                    ],
                    tools: ['Ladder', 'Wire strippers', 'Nut driver', 'Voltage tester'],
                    instructions: [
                        'Install all luminaires: verify weight support for ceiling fans',
                        'Connect range: 4-wire cord, 50A receptacle',
                        'Connect dryer: 4-wire cord, 30A receptacle',
                        'Hardwire dishwasher, disposal, hood per manufacturer',
                        'Connect HVAC: verify nameplate MCA/MOP vs breaker',
                        'Connect water heater: verify 240V, 30A breaker',
                        'Install smoke/CO detectors: interconnect, battery backup'
                    ],
                    verification: 'All appliances operational, detectors test pass',
                    codeRefs: ['NEC 422.31', '422.32', '440.14', '410.36', '210.12']
                },
                {
                    order: 3,
                    title: '4.3 Final Covers & Labels',
                    type: 'finishing',
                    duration: { jm: 2, ap: 2 },
                    crew: { jm: 1, ap: 1 },
                    materials: [
                        'Screwless cover plates',
                        'Panel directory labels',
                        'Circuit breaker labels',
                        'Equipment labels'
                    ],
                    tools: ['Label maker', 'Screwdriver'],
                    instructions: [
                        'Install all cover plates: screwless, aligned',
                        'Verify panel directory complete and accurate',
                        'Label all disconnects: "Main Disconnect", "Service Disconnect"',
                        'Label sub-panels: "Sub-Panel Garage - 60A"',
                        'Label special circuits: "EV Charger - 60A"',
                        'Remove all debris, wire scraps, packaging'
                    ],
                    verification: 'All covers installed, labels legible, site clean',
                    codeRefs: ['NEC 110.22', '408.4', '110.12']
                }
            ],
            deliverables: [
                'All devices installed and tested',
                'All cover plates installed',
                'Panel directory complete',
                'Site clean'
            ]
        },
        {
            id: 'testing',
            number: 5,
            title: 'Phase 5: Testing, Verification & Final Inspection',
            icon: '✅',
            color: 'red',
            description: 'Comprehensive testing, final inspection, documentation handover',
            estimatedHours: { jm: 8, ap: 4 },
            steps: [
                {
                    order: 1,
                    title: '5.1 Voltage & Polarity Testing',
                    type: 'testing',
                    duration: { jm: 2, ap: 1 },
                    crew: { jm: 1, ap: 1 },
                    tools: ['Digital multimeter', '3-wire circuit tester', 'GFCI tester'],
                    instructions: [
                        'Verify 120V L1-N, L2-N and 240V L1-L2 at panel',
                        'Test every receptacle: correct polarity, open ground, open neutral',
                        'Test every GFCI: press TEST, verify TRIP, press RESET',
                        'Test every AFCI breaker: press TEST, verify TRIP, RESET',
                        'Measure voltage drop on long runs <3% branch, <5% total'
                    ],
                    verification: 'All receptacles correct polarity, all GFCI/AFCI functional',
                    codeRefs: ['NEC 210.8', '210.12', '210.19', '406.5']
                },
                {
                    order: 2,
                    title: '5.2 Grounding & Continuity Testing',
                    type: 'testing',
                    duration: { jm: 2, ap: 1 },
                    crew: { jm: 1, ap: 1 },
                    tools: ['Clamp meter', 'Ground resistance tester', 'Continuity tester'],
                    instructions: [
                        'Verify ground continuity: receptacle ground to panel ground bus',
                        'Measure ground rod resistance: target <25Ω (supplementary if >25Ω)',
                        'Verify GEC continuity from rods to panel ground bus',
                        'Verify bonding: water pipe, gas pipe, structural steel',
                        'Check for neutral-ground bonds only at main panel'
                    ],
                    verification: 'Ground resistance <25Ω, continuity confirmed, no neutral-ground bonds downstream',
                    codeRefs: ['NEC 250.53', '250.66', '250.94', '250.104']
                },
                {
                    order: 3,
                    title: '5.3 Load Verification & Phase Balance',
                    type: 'testing',
                    duration: { jm: 2, ap: 1 },
                    crew: { jm: 1, ap: 1 },
                    tools: ['Clamp meter (True RMS)', 'Power quality analyzer'],
                    instructions: [
                        'Measure current on each phase under normal load',
                        'Verify phase balance within 10% (L1 vs L2)',
                        'Check for neutral current (indicates imbalance)',
                        'Verify no overheating at panel terminals (IR camera)',
                        'Document peak demand for future reference'
                    ],
                    verification: 'Phase imbalance <10%, no overheating',
                    codeRefs: ['NEC 110.14', '220.82', '220.83']
                },
                {
                    order: 4,
                    title: '5.4 Final Inspection & Documentation Handover',
                    type: 'administrative',
                    duration: { jm: 2, ap: 2 },
                    crew: { jm: 1, ap: 1 },
                    materials: [
                        'Completed permit',
                        'Load calculation worksheets',
                        'Panel schedules',
                        'Photos (USB or printed)',
                        'Equipment cut sheets',
                        'Test reports'
                    ],
                    instructions: [
                        'Schedule final electrical inspection with AHJ',
                        'Walk site with inspector: panel, grounding, devices, labels',
                        'Obtain final inspection sign-off (green tag)',
                        'Compile owner package: load calcs, panel schedules, photos',
                        'Provide equipment manuals, warranty cards, contact list',
                        'Conduct owner orientation: main disconnect, GFCI reset, panel tour',
                        'File as-built drawings with AHJ if required'
                    ],
                    verification: 'Green tag obtained, owner package delivered, orientation complete',
                    codeRefs: ['NEC 90.4', '110.12', '408.4']
                }
            ],
            deliverables: [
                'Final inspection green tag',
                'Complete owner documentation package',
                'As-built drawings (if required)',
                'Owner orientation complete'
            ]
        }
    ]
};
console.log('residential.js loaded, residentialData set:', !!window.residentialData);
// Export for browser
window.residentialData = residentialData;
// Export for Node/CommonJS
if (typeof module !== 'undefined' && module.exports) {
    module.exports = residentialData;
}