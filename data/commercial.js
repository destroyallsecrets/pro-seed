// Commercial Scale Data - Complete Step-by-Step Installation Guide
// Covers: Office, retail, restaurant, small warehouse, light industrial (up to ~50k sq ft)
// NEC 2023 Primary Articles: 210, 215, 220, 230, 240, 250, 300, 310, 314, 358, 362, 406, 408, 410, 430, 440, 445, 517, 518, 520, 590, 600, 620, 645, 647, 700, 701, 702, 708

const commercialData = {
    scale: 'commercial',
    label: 'Commercial',
    icon: '🏢',
    description: 'Office, retail, restaurant, small warehouse, light industrial (up to 50k sq ft)',
    serviceTypical: '208Y/120V or 480Y/277V, 200-800A, 3Ø4W',
    
    // Equipment Specifications with Sizes
    equipmentSpecs: {
        serviceEntrance: {
            meterSocket: { type: 'CT/PT metering or switchboard metering', standard: 'NEC 230.95', size: 'Per utility specs' },
            serviceDisconnect: { type: '400-800A 3-pole main breaker', rating: 'AIC per utility fault current', size: '3-pole, 400-800A' },
            switchboard: { type: '208Y/120V or 480Y/277V 3Ø4W', standard: 'UL 891', size: 'Per fault current rating' },
            metering: { type: 'CT/PT cabinet or socket metering', standard: 'ANSI C12.1', size: 'Per utility' }
        },
        distribution: {
            panelboards: { voltage: '208Y/120V or 480Y/277V', type: '42-circuit, bolt-on', standard: 'UL 67', sizes: ['100A', '225A', '400A'] },
            feeders: { voltage: '208V or 480V', conductor: 'CU/AL per ampacity', conduit: 'EMT/RMC/PVC', grounding: 'EGC per 250.118' },
            mccs: { type: 'NEMA Class I/II, Type A/B/C', voltage: '480V', buckets: 'FVNR/FVR/VFD', standard: 'NEMA ICS 3' },
            transformers: { type: 'Dry-type, ventilated', voltage: '480-208Y/120V', kva: ['45','75','112.5','150','225','300','500'], standard: 'UL 1561' }
        },
        branchCircuits: {
            lighting: { voltage: '277V or 120V', awg: '12', insulation: 'THHN/THWN', conduit: '3/4" EMT', load: 'Per fixture' },
            receptacles: { awg: '12', insulation: 'THHN/THWN', breaker: '20A 1P GFCI', conduit: '3/4" EMT', load: '180VA/strap' },
            hvac: { voltage: '480V/208V', awg: 'per MCA', breaker: 'per MOP', conduit: 'EMT/RMC', load: 'Per nameplate' },
            motors: { voltage: '480V 3Ø', awg: 'per FLA', breaker: 'per 430.52', conduit: 'EMT', overload: 'per 430.32' },
            vfd: { voltage: '480V', awg: 'per FLA', conduit: 'EMT w/ shielded cable', filter: 'line/load reactor', grounding: 'per 250.118' },
            kitchen: { voltage: '208V/120V', awg: 'per nameplate', breaker: 'per 220.56', gfci: '210.8', load: 'per 220.56' },
            evCharger: { voltage: '208/480V', awg: '6-2/0', breaker: '60-200A 3P', conduit: 'EMT/RMC', load: 'Level 2/3' },
            pvSolar: { voltage: '480/208V', awg: 'per inverter', breaker: 'per 690.8', conduit: 'EMT', disconnect: '690.13' }
        },
        grounding: {
            groundRod: { type: '3/4" x 10ft copper-clad', standard: 'UL 467', qty: 'per 250.53' },
            gec: { awg: 'per Table 250.66', material: 'Cu', location: 'Service entrance' },
            mainBondingJumper: { awg: 'per Table 250.28', location: 'Service equipment' },
            systemBondingJumper: { awg: 'per Table 250.30', location: 'Separately derived' },
            equipmentGrounding: { awg: 'per 250.122', type: 'EGC with feeders', continuity: 'Verified' },
            buildingSteelBond: { awg: 'per 250.64', location: 'Building steel' }
        },
        conduitFill: {
            '1/2"': { emt: 0.304, pvc40: 0.122, rmc: 0.304, pvc80: 0.094 },
            '3/4"': { emt: 0.533, pvc40: 0.213, rmc: 0.533, pvc80: 0.173 },
            '1"': { emt: 0.864, pvc40: 0.346, rmc: 0.864, pvc80: 0.288 },
            '1-1/4"': { emt: 1.496, pvc40: 0.598, rmc: 1.496, pvc80: 0.512 },
            '1-1/2"': { emt: 2.036, pvc40: 0.814, rmc: 2.036, pvc80: 0.707 },
            '2"': { emt: 3.356, pvc40: 1.342, rmc: 3.356, pvc80: 1.181 },
            '2-1/2"': { emt: 2.343, pvc40: 1.915, rmc: 2.343, pvc80: 1.915 },
            '3"': { emt: 3.538, pvc40: 2.957, rmc: 3.538, pvc80: 2.957 },
            '3-1/2"': { pvc40: 3.958, rmc: 4.616, pvc80: 3.959 },
            '4"': { pvc40: 5.900, rmc: 5.900, pvc80: 5.239 }
        }
    },
    
    manpowerEstimates: {
        permitAcquisition: { jm: 4, ap: 2, pm: 1 },
        utilityCoordination: { jm: 2, ap: 1, pm: 1 },
        roughIn: { jm: 40, ap: 40, helper: 20 }, // per 10k sq ft
        wirePull: { jm: 24, ap: 24, helper: 12 },
        deviceInstall: { jm: 16, ap: 16 },
        panelBuild: { jm: 12, ap: 6 },
        mccInstall: { jm: 16, ap: 8 },
        transformerInstall: { jm: 8, ap: 4, helper: 4, crane: 4 },
        testing: { jm: 8, ap: 4 },
        commissioning: { jm: 16, ap: 8, cx: 8 },
        documentation: { jm: 8, ap: 4, pm: 4 }
    },
    
    phases: [
        {
            id: 'preSite',
            number: 1,
            title: 'Phase 1: Pre-Site Preparation & Planning',
            icon: '📋',
            color: 'blue',
            description: 'Permits, utility coordination, tenant coordination, as-built review, code analysis',
            estimatedHours: { jm: 20, ap: 10, pm: 4 },
            steps: [
                {
                    order: 1,
                    title: '1.1 Permit Acquisition & Code Compliance',
                    type: 'administrative',
                    duration: { jm: 4, ap: 2, pm: 2 },
                    crew: { jm: 1, ap: 1, pm: 1 },
                    materials: ['Permit application', 'Code analysis report'],
                    tools: ['NEC 2023', 'IECC/ASHRAE 90.1', 'Local amendments'],
                    instructions: [
                        'Obtain electrical permit from AHJ for commercial scope',
                        'Verify permit covers: service, distribution, panels, branch circuits, special systems',
                        'Confirm applicable codes: NEC 2023, IECC/ASHRAE 90.1, local amendments',
                        'Schedule phased inspections: rough-in, service, final',
                        'Post permit at job site; verify contractor licensing'
                    ],
                    verification: 'Permit posted, phased inspections scheduled, license verified',
                    codeRefs: ['NEC 90.4', 'Local ordinance', 'IECC', 'ASHRAE 90.1']
                },
                {
                    order: 2,
                    title: '1.2 Utility Coordination',
                    type: 'coordination',
                    duration: { jm: 4, ap: 2, pm: 1 },
                    crew: { jm: 1, ap: 1, pm: 1 },
                    materials: ['Utility service request', 'Load letter'],
                    tools: ['Utility standards', 'Fault current data'],
                    instructions: [
                        'Coordinate service voltage: 208Y/120V or 480Y/277V 3Ø4W',
                        'Verify available fault current (AIC rating) from utility',
                        'Confirm CT/PT metering requirements (utility vs owner-owned)',
                        'Coordinate service entrance: conduit size, quantity, routing',
                        'Request temporary construction power if needed'
                    ],
                    verification: 'Utility commitment letter, AIC rating confirmed, metering agreed',
                    codeRefs: ['NEC 220.87', '110.24', '230.40', '230.41', '230.95', '590']
                },
                {
                    order: 3,
                    title: '1.3 Tenant & As-Built Coordination',
                    type: 'coordination',
                    duration: { jm: 4, ap: 2, pm: 2 },
                    crew: { jm: 1, ap: 1, pm: 1 },
                    materials: ['As-built drawings', 'Tenant coordination log'],
                    tools: ['Existing drawings', 'Tenant contact list'],
                    instructions: [
                        'Obtain existing as-built drawings (panels, feeders, circuits)',
                        'Coordinate with tenants for access and shutdowns',
                        'Identify critical loads requiring uninterrupted power',
                        'Review lease requirements for electrical capacity',
                        'Document existing conditions with photos'
                    ],
                    verification: 'As-builts obtained, tenant coordination plan, critical loads identified',
                    codeRefs: ['NEC 700', '701', '702']
                },
                {
                    order: 4,
                    title: '1.4 Special Occupancy Assessment',
                    type: 'assessment',
                    duration: { jm: 4, ap: 2, pm: 1 },
                    crew: { jm: 1, ap: 1 },
                    materials: ['Occupancy classification docs'],
                    tools: ['NEC 500-518', 'NFPA 101', 'NFPA 99'],
                    instructions: [
                        'Identify healthcare areas: NEC 517 (essential electrical systems)',
                        'Identify assembly occupancies: NEC 518 (emergency/standby)',
                        'Identify hazardous locations: NEC 500-504 (Class/Division/Zone)',
                        'Commercial kitchens: NEC 210, 220, 430 (equipment loads)',
                        'Data centers: NEC 645 (critical operations power)',
                        'Theaters/studios: NEC 520, 530'
                    ],
                    verification: 'Occupancy classifications documented, special requirements identified',
                    codeRefs: ['NEC 500-518', '517', '518', '520', '530', '645', '647', 'NFPA 101', 'NFPA 99']
                }
            ],
            deliverables: [
                'Electrical permit package',
                'Utility coordination agreement',
                'Tenant coordination plan',
                'Special occupancy matrix',
                'Code compliance matrix',
                'Phased inspection schedule'
            ]
        },
        {
            id: 'siteSurvey',
            number: 2,
            title: 'Phase 2: Site Survey & Equipment Inspection',
            icon: '🔍',
            color: 'yellow',
            description: 'Service entrance, switchgear, panelboards, MCCs, emergency systems',
            estimatedHours: { jm: 24, ap: 12, helper: 8 },
            steps: [
                {
                    order: 1,
                    title: '2.1 Service Entrance & Metering',
                    type: 'inspection',
                    duration: { jm: 4, ap: 2 },
                    crew: { jm: 1, ap: 1 },
                    tools: ['Clamp meter', 'Phase rotation meter', 'Insulation tester'],
                    instructions: [
                        'Verify service voltage: 208Y/120V or 480Y/277V 3Ø4W',
                        'Check service conductors: size, type, phasing (A-B-C)',
                        'Verify service disconnect rating ≥ calculated load',
                        'Check metering: CT/PT cabinet, socket, or switchboard metering',
                        'Confirm service equipment AIC rating ≥ available fault current',
                        'Verify grounding electrode system per 250.50',
                        'Check main bonding jumper and system bonding jumper'
                    ],
                    verification: 'Service voltage/phasing confirmed, AIC rating adequate, grounding verified',
                    codeRefs: ['NEC 220.87', '230.41', '230.79', '230.90', '230.95', '110.24', '250.50']
                },
                {
                    order: 2,
                    title: '2.2 Switchgear & Switchboards',
                    type: 'inspection',
                    duration: { jm: 4, ap: 2 },
                    crew: { jm: 1, ap: 1 },
                    tools: ['Torque wrench', 'IR camera', 'Phase rotation meter'],
                    instructions: [
                        'Verify switchboard rating (amps, volts, AIC, withstand)',
                        'Check main device: fixed/mounted, drawout, maintenance',
                        'Verify feeder breakers: size, type, trip settings',
                        'Check busway/feeder tap rules (10ft/25ft rule)',
                        'Verify arc flash labels present (NEC 110.16)',
                        'Check working space: 30-48in wide × 36-48in deep',
                        'Verify compartment barriers and shutters operational'
                    ],
                    verification: 'Ratings match design, arc flash labels present, working space adequate',
                    codeRefs: ['NEC 110.24', '110.16', '110.26', '240.21', '408']
                },
                {
                    order: 3,
                    title: '2.3 Panelboards & Distribution',
                    type: 'inspection',
                    duration: { jm: 4, ap: 2 },
                    crew: { jm: 1, ap: 1 },
                    tools: ['Torque wrench', 'Phase rotation meter', 'Label maker'],
                    instructions: [
                        'Inventory all panelboards: location, rating, voltage, phases',
                        'Verify panel schedules complete and accurate',
                        'Check branch breakers: size, type (HID, SWD, HACR)',
                        'Verify spare capacity for future growth (20-25% typical)',
                        'Check sub-panel grounding: isolated neutral, ground bar',
                        'Verify panel locations: not in bathrooms, accessible',
                        'Check for proper circuit identification (typed directory)'
                    ],
                    verification: 'All panel schedules complete, spare capacity documented, grounding verified',
                    codeRefs: ['NEC 408', '408.4', '240', '250.24', '110.26']
                },
                {
                    order: 4,
                    title: '2.4 Motor Control Centers (MCCs)',
                    type: 'inspection',
                    duration: { jm: 4, ap: 2 },
                    crew: { jm: 1, ap: 1 },
                    tools: ['Torque wrench', 'Phase rotation meter', 'Vibration analyzer'],
                    instructions: [
                        'Inventory MCCs: sections, buckets, starters, VFDs',
                        'Verify motor nameplate data matches starter/breaker sizing',
                        'Check overload protection: thermal, electronic, VFD',
                        'Verify disconnecting means at each motor',
                        'Check VFD installation: line/load reactors, filters, grounding',
                        'Verify MCC grounding bus and equipment grounding'
                    ],
                    verification: 'MCC inventory complete, motor data verified, grounding confirmed',
                    codeRefs: ['NEC 430', '430.6', '430.32', '430.102', '430.122', '250.86', '250.96']
                },
                {
                    order: 5,
                    title: '2.5 Emergency & Standby Systems',
                    type: 'inspection',
                    duration: { jm: 4, ap: 2 },
                    crew: { jm: 1, ap: 1 },
                    tools: ['Load bank', 'Phase rotation meter', 'Transfer switch tester'],
                    instructions: [
                        'Identify system type: NEC 700 (emergency), 701 (standby), 702 (optional)',
                        'Verify generator: size, fuel, transfer switch type (ATS/BTS)',
                        'Check transfer switch: 3-pole vs 4-pole, neutral switching',
                        'Verify emergency panel separation from normal',
                        'Check battery systems: UPS, emergency lighting, exit signs',
                        'Verify COPS (Critical Operations Power) if applicable',
                        'Check generator exercise/test records'
                    ],
                    verification: 'Emergency systems compliant, generator tested, separation verified',
                    codeRefs: ['NEC 700', '701', '702', '708', 'NFPA 110']
                }
            ],
            deliverables: [
                'Site survey report with equipment inventory',
                'Photographic documentation of existing conditions',
                'Deficiency list with corrective actions',
                'Updated single-line diagram (as-found)'
            ]
        },
        {
            id: 'loadCalc',
            number: 3,
            title: 'Phase 3: Load Calculations & Power System Studies',
            icon: '🧮',
            color: 'green',
            description: 'NEC 220 Part III/IV, demand factors, diversity, motor loads, system studies',
            estimatedHours: { jm: 16, ap: 8, eng: 16 },
            steps: [
                {
                    order: 1,
                    title: '3.1 Standard Calculation (NEC 220 Part III)',
                    type: 'engineering',
                    duration: { jm: 4, ap: 2, eng: 4 },
                    crew: { eng: 1 },
                    tools: ['NEC 2023', 'Spreadsheet software', 'Manufacturer data'],
                    instructions: [
                        'General lighting: Table 220.12 VA/sq ft × area',
                        'Receptacle loads: 180 VA per strap (multi-outlet assemblies)',
                        'Fixed equipment: nameplate VA (HVAC, WH, elevators, kitchen)',
                        'Motor loads: 125% largest + 100% others (430.24)',
                        'Sign lighting: 1200 VA minimum per circuit',
                        'Apply demand factors: lighting, receptacles, kitchen, HVAC'
                    ],
                    verification: 'Load calculation complete, demand factors applied, service size confirmed',
                    codeRefs: ['NEC 220.12', '220.14', '220.42', '220.44', '220.56', '220.60', '430.24']
                },
                {
                    order: 2,
                    title: '3.2 Optional Calculation (NEC 220 Part IV)',
                    type: 'engineering',
                    duration: { jm: 2, ap: 1 },
                    crew: { eng: 1 },
                    tools: ['NEC 2023'],
                    instructions: [
                        'All electric building: 3 VA/sq ft + HVAC at 100%',
                        'Non-all-electric: 3 VA/sq ft + fixed equip + HVAC',
                        'Apply demand factors per Table 220.42/220.44'
                    ],
                    verification: 'Optional calculation verified against standard method',
                    codeRefs: ['NEC 220.84']
                },
                {
                    order: 3,
                    title: '3.3 Power System Studies',
                    type: 'engineering',
                    duration: { jm: 8, eng: 16 },
                    crew: { eng: 2 },
                    tools: ['ETAP/SKM/PowerWorld', 'Manufacturer data'],
                    instructions: [
                        'Short circuit study: verify AIC ratings at all equipment',
                        'Coordination study: selective coordination (700, 701, 708)',
                        'Arc flash study: labels per NEC 110.16, NFPA 70E',
                        'Voltage drop: ≤3% branch, ≤5% feeder+branch',
                        'Harmonic analysis: if >15% non-linear load (VFDs, LED, UPS)'
                    ],
                    verification: 'All studies complete, labels generated, equipment ratings verified',
                    codeRefs: ['NEC 110.24', '240.86', '700.32', '701.27', '708.54', '210.19', '215.2', '220.61', 'IEEE 519']
                },
                {
                    order: 4,
                    title: '3.4 Energy Code Compliance (IECC/ASHRAE 90.1)',
                    type: 'engineering',
                    duration: { jm: 4, ap: 2, eng: 4 },
                    crew: { eng: 1 },
                    tools: ['COMcheck', 'ASHRAE 90.1', 'IECC'],
                    instructions: [
                        'Lighting power density (LPD) per space type',
                        'Lighting controls: occupancy, daylight, timeclock',
                        'Receptacle controls: 50% controlled in offices',
                        'HVAC efficiency and controls',
                        'Commissioning requirements (CxA)'
                    ],
                    verification: 'COMcheck passed, energy code compliance documented',
                    codeRefs: ['IECC C405', 'ASHRAE 90.1', 'IECC C408']
                }
            ],
            deliverables: [
                'Complete load calculation package',
                'Short circuit study report',
                'Coordination study with TCC curves',
                'Arc flash study with labels',
                'Voltage drop calculations',
                'Harmonic analysis report',
                'Energy code compliance (COMcheck)',
                'Study summary with recommendations'
            ]
        },
        {
            id: 'branchCircuits',
            number: 4,
            title: 'Phase 4: Branch Circuits & Special Systems Installation',
            icon: '🔧',
            color: 'purple',
            description: 'Lighting, receptacles, HVAC, special equipment, data, fire alarm, commissioning',
            estimatedHours: { jm: 80, ap: 80, helper: 40 },
            steps: [
                {
                    order: 1,
                    title: '4.1 Lighting Systems',
                    type: 'installation',
                    duration: { jm: 16, ap: 16, helper: 8 },
                    crew: { jm: 2, ap: 2, helper: 2 },
                    materials: ['LED fixtures (277V/120V)', 'Emergency lighting units', 'Exit signs', 'Lighting control panels', 'Occupancy/daylight sensors'],
                    tools: ['Lift', 'Wire strippers', 'Voltage tester', 'Ladder'],
                    instructions: [
                        'Verify fixture ratings match voltage (277V vs 120V)',
                        'Check emergency lighting: battery units, generator panels',
                        'Verify exit signs: illuminated, on emergency circuit',
                        'Check lighting control panels: DMX, 0-10V, DALI, relay',
                        'Verify occupancy/daylight sensors operational'
                    ],
                    verification: 'All fixtures operational, controls functional, emergency lighting tested',
                    codeRefs: ['NEC 410', '700', '701', '702', 'IECC C405', 'ASHRAE 90.1']
                },
                {
                    order: 2,
                    title: '4.2 Receptacle Circuits',
                    type: 'installation',
                    duration: { jm: 16, ap: 16, helper: 8 },
                    crew: { jm: 2, ap: 2, helper: 2 },
                    materials: ['GFCI receptacles', 'Standard receptacles', 'Floor boxes', 'USB/PD receptacles'],
                    tools: ['Wire strippers', 'Voltage tester', 'GFCI tester'],
                    instructions: [
                        'GFCI: bathrooms, kitchens, rooftops, outdoors, garages',
                        'AFCI: not typically required commercial (check local)',
                        'GFCI protection for HVAC equipment (rooftop)',
                        'Dedicated circuits: copiers, servers, medical equipment',
                        'Floor receptacles: listed for floor use',
                        'USB/Power Delivery receptacles: verify rating'
                    ],
                    verification: 'All receptacles tested, GFCI functional, dedicated circuits verified',
                    codeRefs: ['NEC 210.8', '210.12', '406.5']
                },
                {
                    order: 3,
                    title: '4.3 HVAC & Mechanical Equipment',
                    type: 'installation',
                    duration: { jm: 16, ap: 16, helper: 8 },
                    crew: { jm: 2, ap: 2, helper: 2 },
                    materials: ['RTUs', 'VAV boxes', 'Fan coils', 'Disconnects', 'Smoke/fire damper actuators'],
                    tools: ['Clamp meter', 'Phase rotation meter', 'Voltage tester', 'Lift'],
                    instructions: [
                        'RTU/AC units: verify MCA/MOP, breaker sizing',
                        'Check disconnect at equipment (within sight)',
                        'Verify crankcase heater circuit (if applicable)',
                        'Check VAV boxes, fan coils, unit heaters',
                        'Verify smoke damper/fire damper wiring'
                    ],
                    verification: 'All HVAC equipment powered, disconnects accessible, dampers tested',
                    codeRefs: ['NEC 440', '440.14', '760', 'IMC']
                },
                {
                    order: 4,
                    title: '4.4 Special Systems',
                    type: 'installation',
                    duration: { jm: 24, ap: 24, helper: 12 },
                    crew: { jm: 3, ap: 3, helper: 2, lt: 2 },
                    materials: ['Fire alarm panels', 'Data cabling', 'Security panels', 'AV equipment', 'EVSE units', 'PV equipment'],
                    tools: ['Cable tester', 'Fusion splicer', 'OTDR', 'Network analyzer'],
                    instructions: [
                        'Fire alarm: NAC circuits, SLC loops, power supply',
                        'Data/Telecom: pathways, grounding, bonding',
                        'Security/Access control: power supplies, readers',
                        'AV Systems: isolated ground, surge protection',
                        'EV Charging: NEC 625, load management',
                        'Solar/PV: NEC 690, 705 interconnection',
                        'Battery Storage: NEC 706'
                    ],
                    verification: 'All systems operational, tested, documented',
                    codeRefs: ['NEC 760', '800', '625', '690', '705', '706', 'NFPA 72', 'TIA-569']
                }
            ],
            deliverables: [
                'As-built drawings for all branch circuits',
                'Lighting control programming records',
                'Fire alarm acceptance test (NFPA 72)',
                'Data/telecom test reports',
                'EV charger commissioning reports',
                'PV system commissioning report'
            ]
        },
        {
            id: 'commissioning',
            number: 5,
            title: 'Phase 5: Commissioning & Testing',
            icon: '✅',
            color: 'red',
            description: 'Pre-functional, functional, integrated systems testing',
            estimatedHours: { jm: 24, ap: 12, cx: 16 },
            steps: [
                {
                    order: 1,
                    title: '5.1 Pre-Functional Checklists',
                    type: 'testing',
                    duration: { jm: 8, ap: 4, cx: 4 },
                    crew: { jm: 2, ap: 1, cx: 1 },
                    tools: ['Torque wrench', 'Megger', 'Phase rotation meter', 'Continuity tester'],
                    instructions: [
                        'Verify all equipment installed per drawings/specs',
                        'Check torque on all power connections (calibrated wrench)',
                        'Verify phasing: A-B-C rotation at all panels',
                        'Insulation resistance testing (Megger): feeders, motors',
                        'Continuity testing: grounding, bonding, neutrals',
                        'Verify breaker trip settings match coordination study'
                    ],
                    verification: 'All pre-functional checks passed, torque marks applied',
                    codeRefs: ['NEC 110.14', '110.7', '250', '240', '700.32', 'NETA']
                },
                {
                    order: 2,
                    title: '5.2 Functional Testing',
                    type: 'testing',
                    duration: { jm: 8, ap: 4, cx: 8 },
                    crew: { jm: 2, ap: 2, cx: 2 },
                    tools: ['GFCI tester', 'Load bank', 'Phase rotation meter', 'Transfer switch tester'],
                    instructions: [
                        'GFCI/GFPE trip testing at all devices',
                        'Transfer switch: simulate normal failure, verify transfer',
                        'Generator start/test under load',
                        'Fire alarm: full system test with AHJ',
                        'Lighting controls: scenes, schedules, sensors',
                        'BAS/EMS: points check, graphics, alarms',
                        'Verify arc flash labels match study'
                    ],
                    verification: 'All functional tests passed, test reports generated',
                    codeRefs: ['NEC 210.8', '230.95', '700', '701', 'NFPA 110', 'NFPA 72', 'NFPA 70E']
                },
                {
                    order: 3,
                    title: '5.3 Integrated Systems Testing (IST)',
                    type: 'testing',
                    duration: { jm: 8, ap: 4, cx: 8 },
                    crew: { jm: 2, ap: 2, cx: 2 },
                    tools: ['BAS', 'Fire alarm panel', 'Generator controller', 'ATS controller'],
                    instructions: [
                        'Fire alarm → HVAC shutdown, damper control',
                        'Power failure → generator start → ATS transfer → emergency loads',
                        'BAS → lighting control → demand response',
                        'Document all test results with pass/fail'
                    ],
                    verification: 'All integrated sequences verified, test reports signed',
                    codeRefs: ['NFPA 72', 'IMC', 'NEC 700', '701', 'ASHRAE Guideline 0']
                }
            ],
            deliverables: [
                'Pre-functional checklists (signed)',
                'Functional test reports',
                'Integrated systems test report',
                'Commissioning report (CxA signed)',
                'Arc flash label verification',
                'Energy code compliance (COMcheck)'
            ]
        },
        {
            id: 'deliverables',
            number: 6,
            title: 'Phase 6: Final Documentation & Closeout',
            icon: '📦',
            color: 'blue',
            description: 'Complete documentation package for owner, AHJ, and O&M',
            estimatedHours: { jm: 8, ap: 4, pm: 4 },
            steps: [
                {
                    order: 1,
                    title: '6.1 Owner/AHJ Documentation Package',
                    type: 'administrative',
                    duration: { jm: 4, ap: 2, pm: 2 },
                    crew: { jm: 1, ap: 1, pm: 1 },
                    materials: ['Binders', 'USB drives', 'Project closeout checklist'],
                    instructions: [
                        'Load calculations (standard + optional) with demand factors',
                        'Complete panel schedules (all panels, MCCs, switchboards)',
                        'One-line diagram (as-built) with ratings, AIC, settings',
                        'Short circuit, coordination, arc flash study reports',
                        'Arc flash labels installed and documented',
                        'GFCI/GFPE test logs',
                        'Ground resistance test results',
                        'Insulation resistance (Megger) test reports',
                        'As-built drawings (PDF + CAD)',
                        'Equipment submittals & O&M manuals',
                        'Commissioning report (CxA signed)',
                        'Energy code compliance documentation (COMcheck)',
                        'Fire alarm acceptance test (NFPA 72)',
                        'Generator/ATS test reports (NFPA 110)',
                        'Permit with final inspection sign-off',
                        'Owner training records and video',
                        'Warranty documents and contact list'
                    ],
                    verification: 'Complete turnover package delivered to owner and AHJ',
                    codeRefs: ['NEC 220', '408.4', '110.24', '110.16', '110.24', '210.8', '230.95', '250.53', '240', '700.32', '701.27', '708.54', 'NFPA 110', 'NFPA 72', 'IECC C408']
                }
            ],
            deliverables: [
                'Complete turnover package (digital + physical)',
                'Owner training completion certificates',
                'Final lien waivers',
                'Warranty registration confirmations'
            ]
        }
    ]
};

// Export for browser
window.commercialData = commercialData;

// Export for Node/CommonJS
if (typeof module !== 'undefined' && module.exports) {
    module.exports = commercialData;
}