// Commercial Scale Data - Electrical Installation Analysis
// Covers: Office, retail, restaurant, small warehouse, light industrial (up to ~50k sq ft)
// NEC 2023 Primary Articles: 210, 215, 220, 230, 240, 250, 300, 310, 314, 358, 362, 406, 408, 410, 430, 440, 445, 517, 518, 520, 590, 600, 620, 645, 647, 700, 701, 702, 708

const commercialData = {
    scale: 'commercial',
    label: 'Commercial',
    icon: '🏢',
    description: 'Office, retail, restaurant, small warehouse, light industrial (up to 50k sq ft)',
    serviceTypical: '208Y/120V or 480Y/277V, 200-800A, 3Ø4W',
    phases: [
        {
            id: 'preSite',
            number: 1,
            title: 'Pre-Site Preparation',
            icon: '📋',
            color: 'blue',
            description: 'Permits, utility coordination, tenant coordination, as-built review',
            cards: [
                {
                    id: 'permits',
                    title: 'Permit Acquisition & Code Compliance',
                    icon: '📄',
                    iconColor: 'blue',
                    checklist: [
                        { text: 'Obtain electrical permit from AHJ for commercial scope', ref: 'NEC 90.4, Local ordinance' },
                        { text: 'Verify permit covers: service, distribution, panels, branch circuits, special systems', ref: '' },
                        { text: 'Confirm applicable codes: NEC 2023, IECC/ASHRAE 90.1, local amendments', ref: '' },
                        { text: 'Schedule phased inspections: rough-in, service, final', ref: '' },
                        { text: 'Post permit at job site; verify contractor licensing', ref: 'NEC 90.4' }
                    ]
                },
                {
                    id: 'utility',
                    title: 'Utility Coordination',
                    icon: '🔌',
                    iconColor: 'yellow',
                    checklist: [
                        { text: 'Coordinate service voltage: 208Y/120V or 480Y/277V 3Ø4W', ref: 'NEC 220.87, Utility standards' },
                        { text: 'Verify available fault current (AIC rating) from utility', ref: 'NEC 110.24, 240.86' },
                        { text: 'Confirm CT/PT metering requirements (utility vs owner-owned)', ref: 'NEC 230.95' },
                        { text: 'Coordinate service entrance: conduit size, quantity, routing', ref: 'NEC 230.40, 230.41' },
                        { text: 'Request temporary construction power if needed', ref: 'NEC 590' }
                    ]
                },
                {
                    id: 'tenant',
                    title: 'Tenant & As-Built Coordination',
                    icon: '🤝',
                    iconColor: 'green',
                    checklist: [
                        { text: 'Obtain existing as-built drawings (panels, feeders, circuits)', ref: '' },
                        { text: 'Coordinate with tenants for access and shutdowns', ref: '' },
                        { text: 'Identify critical loads requiring uninterrupted power', ref: 'NEC 700, 701, 702' },
                        { text: 'Review lease requirements for electrical capacity', ref: '' },
                        { text: 'Document existing conditions with photos', ref: '' }
                    ]
                },
                {
                    id: 'specialOccupancy',
                    title: 'Special Occupancy Assessment',
                    icon: '⚠️',
                    iconColor: 'red',
                    checklist: [
                        { text: 'Healthcare areas: NEC 517 (essential electrical systems)', ref: 'NEC 517' },
                        { text: 'Assembly occupancies: NEC 518 (emergency/standby)', ref: 'NEC 518' },
                        { text: 'Hazardous locations: NEC 500-504 (Class/Division/Zone)', ref: 'NEC 500-504' },
                        { text: 'Commercial kitchens: NEC 210, 220, 430 (equipment loads)', ref: 'NEC 220.56' },
                        { text: 'Data centers: NEC 645 (critical operations power)', ref: 'NEC 645' },
                        { text: 'Theaters/studios: NEC 520, 530', ref: 'NEC 520, 530' }
                    ]
                }
            ]
        },
        {
            id: 'siteSurvey',
            number: 2,
            title: 'Site Survey & Equipment Inspection',
            icon: '🔍',
            color: 'yellow',
            description: 'Service entrance, switchgear, panelboards, MCCs, emergency systems',
            cards: [
                {
                    id: 'serviceEntrance',
                    title: 'Service Entrance & Metering',
                    icon: '⚡',
                    iconColor: 'yellow',
                    checklist: [
                        { text: 'Verify service voltage: 208Y/120V or 480Y/277V 3Ø4W', ref: 'NEC 220.87' },
                        { text: 'Check service conductors: size, type, phasing (A-B-C)', ref: 'NEC 230.41, 310.12' },
                        { text: 'Verify service disconnect rating ≥ calculated load', ref: 'NEC 230.79, 230.90' },
                        { text: 'Check metering: CT/PT cabinet, socket, or switchboard metering', ref: 'NEC 230.95' },
                        { text: 'Confirm service equipment AIC rating ≥ available fault current', ref: 'NEC 110.24' },
                        { text: 'Verify grounding electrode system per 250.50', ref: 'NEC 250.50-250.68' },
                        { text: 'Check main bonding jumper and system bonding jumper', ref: 'NEC 250.28, 250.30' }
                    ]
                },
                {
                    id: 'switchgear',
                    title: 'Switchgear & Switchboards',
                    icon: '📦',
                    iconColor: 'blue',
                    checklist: [
                        { text: 'Verify switchboard rating (amps, volts, AIC, withstand)', ref: 'NEC 110.24, 408' },
                        { text: 'Check main device: fixed/mounted, drawout, maintenance', ref: '' },
                        { text: 'Verify feeder breakers: size, type, trip settings', ref: 'NEC 240, 408' },
                        { text: 'Check busway/feeder tap rules (10ft/25ft rule)', ref: 'NEC 240.21' },
                        { text: 'Verify arc flash labels present (NEC 110.16)', ref: 'NEC 110.16' },
                        { text: 'Check working space: 30-48in wide × 36-48in deep', ref: 'NEC 110.26' },
                        { text: 'Verify compartment barriers and shutters operational', ref: '' }
                    ]
                },
                {
                    id: 'panels',
                    title: 'Panelboards & Distribution',
                    icon: '📊',
                    iconColor: 'purple',
                    checklist: [
                        { text: 'Inventory all panelboards: location, rating, voltage, phases', ref: 'NEC 408' },
                        { text: 'Verify panel schedules complete and accurate', ref: 'NEC 408.4' },
                        { text: 'Check branch breakers: size, type (HID, SWD, HACR)', ref: 'NEC 240, 408' },
                        { text: 'Verify spare capacity for future growth (20-25% typical)', ref: '' },
                        { text: 'Check sub-panel grounding: isolated neutral, ground bar', ref: 'NEC 250.24' },
                        { text: 'Verify panel locations: not in bathrooms, accessible', ref: 'NEC 110.26, 240.24' },
                        { text: 'Check for proper circuit identification (typed directory)', ref: 'NEC 408.4' }
                    ]
                },
                {
                    id: 'mcc',
                    title: 'Motor Control Centers (MCCs)',
                    icon: '🔧',
                    iconColor: 'red',
                    checklist: [
                        { text: 'Inventory MCCs: sections, buckets, starters, VFDs', ref: 'NEC 430' },
                        { text: 'Verify motor nameplate data matches starter/breaker sizing', ref: 'NEC 430.6, 430.32' },
                        { text: 'Check overload protection: thermal, electronic, VFD', ref: 'NEC 430.32' },
                        { text: 'Verify disconnecting means at each motor', ref: 'NEC 430.102' },
                        { text: 'Check VFD installation: line/load reactors, filters, grounding', ref: 'NEC 430.122' },
                        { text: 'Verify MCC grounding bus and equipment grounding', ref: 'NEC 250.86, 250.96' }
                    ]
                },
                {
                    id: 'emergency',
                    title: 'Emergency & Standby Systems',
                    icon: '🚨',
                    iconColor: 'red',
                    checklist: [
                        { text: 'Identify system type: NEC 700 (emergency), 701 (standby), 702 (optional)', ref: 'NEC 700, 701, 702' },
                        { text: 'Verify generator: size, fuel, transfer switch type (ATS/BTS)', ref: 'NEC 700.12, 701.11' },
                        { text: 'Check transfer switch: 3-pole vs 4-pole, neutral switching', ref: 'NEC 700.5, 701.5' },
                        { text: 'Verify emergency panel separation from normal', ref: 'NEC 700.10' },
                        { text: 'Check battery systems: UPS, emergency lighting, exit signs', ref: 'NEC 700.12, 410' },
                        { text: 'Verify COPS (Critical Operations Power) if applicable', ref: 'NEC 708' },
                        { text: 'Check generator exercise/test records', ref: 'NFPA 110' }
                    ]
                }
            ]
        },
        {
            id: 'loadCalc',
            number: 3,
            title: 'Load Calculations & Studies',
            icon: '🧮',
            color: 'green',
            description: 'NEC 220 Part III/IV, demand factors, diversity, motor loads',
            cards: [
                {
                    id: 'standardCalc',
                    title: 'Standard Calculation (NEC 220 Part III)',
                    icon: '📊',
                    iconColor: 'blue',
                    checklist: [
                        { text: 'General lighting: Table 220.12 VA/sq ft × area', ref: 'NEC 220.12' },
                        { text: 'Receptacle loads: 180 VA per strap (multi-outlet assemblies)', ref: 'NEC 220.14' },
                        { text: 'Fixed equipment: nameplate VA (HVAC, WH, elevators, kitchen)', ref: 'NEC 220.14' },
                        { text: 'Motor loads: 125% largest + 100% others (430.24)', ref: 'NEC 430.24' },
                        { text: 'Sign lighting: 1200 VA minimum per circuit', ref: 'NEC 220.14' },
                        { text: 'Apply demand factors: lighting, receptacles, kitchen, HVAC', ref: 'NEC 220.42, 220.44, 220.56, 220.60' }
                    ]
                },
                {
                    id: 'optionalCalc',
                    title: 'Optional Calculation (NEC 220 Part IV)',
                    icon: '📐',
                    iconColor: 'green',
                    checklist: [
                        { text: 'All electric building: 3 VA/sq ft + HVAC at 100%', ref: 'NEC 220.84' },
                        { text: 'Non-all-electric: 3 VA/sq ft + fixed equip + HVAC', ref: 'NEC 220.84' },
                        { text: 'Apply demand factors per Table 220.42/220.44', ref: 'NEC 220.42, 220.44' }
                    ]
                },
                {
                    id: 'studies',
                    title: 'Power System Studies',
                    icon: '📈',
                    iconColor: 'purple',
                    checklist: [
                        { text: 'Short circuit study: verify AIC ratings at all equipment', ref: 'NEC 110.24, 240.86' },
                        { text: 'Coordination study: selective coordination (700, 701, 708)', ref: 'NEC 700.32, 701.27, 708.54' },
                        { text: 'Arc flash study: labels per NEC 110.16, NFPA 70E', ref: 'NEC 110.16, NFPA 70E' },
                        { text: 'Voltage drop: ≤3% branch, ≤5% feeder+branch', ref: 'NEC 210.19, 215.2' },
                        { text: 'Harmonic analysis: if >15% non-linear load (VFDs, LED, UPS)', ref: 'NEC 220.61, IEEE 519' }
                    ]
                },
                {
                    id: 'energyCode',
                    title: 'Energy Code Compliance (IECC/ASHRAE 90.1)',
                    icon: '🌿',
                    iconColor: 'green',
                    checklist: [
                        { text: 'Lighting power density (LPD) per space type', ref: 'IECC C405, 90.1' },
                        { text: 'Lighting controls: occupancy, daylight, timeclock', ref: 'IECC C405, 90.1' },
                        { text: 'Receptacle controls: 50% controlled in offices', ref: 'IECC C405, 90.1' },
                        { text: 'HVAC efficiency and controls', ref: 'IECC C403, 90.1' },
                        { text: 'Commissioning requirements (CxA)', ref: 'IECC C408, 90.1' }
                    ]
                }
            ]
        },
        {
            id: 'branchCircuits',
            number: 4,
            title: 'Branch Circuits & Special Systems',
            icon: '🔀',
            color: 'purple',
            description: 'Lighting, receptacles, HVAC, special equipment, data, fire alarm',
            cards: [
                {
                    id: 'lighting',
                    title: 'Lighting Systems',
                    icon: '💡',
                    iconColor: 'yellow',
                    checklist: [
                        { text: 'Verify fixture ratings match voltage (277V vs 120V)', ref: 'NEC 410' },
                        { text: 'Check emergency lighting: battery units, generator panels', ref: 'NEC 700, 701, 410' },
                        { text: 'Verify exit signs: illuminated, on emergency circuit', ref: 'NEC 410, 700' },
                        { text: 'Check lighting control panels: DMX, 0-10V, DALI, relay', ref: '' },
                        { text: 'Verify occupancy/daylight sensors operational', ref: 'IECC C405' }
                    ]
                },
                {
                    id: 'receptacles',
                    title: 'Receptacle Circuits',
                    icon: '🔌',
                    iconColor: 'blue',
                    checklist: [
                        { text: 'GFCI: bathrooms, kitchens, rooftops, outdoors, garages', ref: 'NEC 210.8' },
                        { text: 'AFCI: not typically required commercial (check local)', ref: 'NEC 210.12' },
                        { text: 'GFCI protection for HVAC equipment (rooftop)', ref: 'NEC 210.8' },
                        { text: 'Dedicated circuits: copiers, servers, medical equipment', ref: '' },
                        { text: 'Floor receptacles: listed for floor use', ref: 'NEC 406.5' },
                        { text: 'USB/Power Delivery receptacles: verify rating', ref: '' }
                    ]
                },
                {
                    id: 'hvac',
                    title: 'HVAC & Mechanical Equipment',
                    icon: '❄️',
                    iconColor: 'red',
                    checklist: [
                        { text: 'RTU/AC units: verify MCA/MOP, breaker sizing', ref: 'NEC 440' },
                        { text: 'Check disconnect at equipment (within sight)', ref: 'NEC 440.14' },
                        { text: 'Verify crankcase heater circuit (if applicable)', ref: 'NEC 440' },
                        { text: 'Check VAV boxes, fan coils, unit heaters', ref: '' },
                        { text: 'Verify smoke damper/fire damper wiring', ref: 'NEC 760, IMC' }
                    ]
                },
                {
                    id: 'specialSystems',
                    title: 'Special Systems',
                    icon: '🔧',
                    iconColor: 'purple',
                    checklist: [
                        { text: 'Fire alarm: NAC circuits, SLC loops, power supply', ref: 'NEC 760, NFPA 72' },
                        { text: 'Data/Telecom: pathways, grounding, bonding', ref: 'NEC 800, TIA-569' },
                        { text: 'Security/Access control: power supplies, readers', ref: '' },
                        { text: 'AV Systems: isolated ground, surge protection', ref: '' },
                        { text: 'EV Charging: NEC 625, load management', ref: 'NEC 625' },
                        { text: 'Solar/PV: NEC 690, 705 interconnection', ref: 'NEC 690, 705' },
                        { text: 'Battery Storage: NEC 706', ref: 'NEC 706' }
                    ]
                }
            ]
        },
        {
            id: 'commissioning',
            number: 5,
            title: 'Commissioning & Testing',
            icon: '✅',
            color: 'red',
            description: 'Pre-functional, functional, integrated systems testing',
            cards: [
                {
                    id: 'preFunc',
                    title: 'Pre-Functional Checklists',
                    icon: '📋',
                    iconColor: 'blue',
                    checklist: [
                        { text: 'Verify all equipment installed per drawings/specs', ref: '' },
                        { text: 'Check torque on all power connections (calibrated wrench)', ref: 'NEC 110.14' },
                        { text: 'Verify phasing: A-B-C rotation at all panels', ref: '' },
                        { text: 'Insulation resistance testing (Megger): feeders, motors', ref: 'NEC 110.7, NETA' },
                        { text: 'Continuity testing: grounding, bonding, neutrals', ref: 'NEC 250' },
                        { text: 'Verify breaker trip settings match coordination study', ref: 'NEC 240, 700.32' }
                    ]
                },
                {
                    id: 'funcTest',
                    title: 'Functional Testing',
                    icon: '🔬',
                    iconColor: 'green',
                    checklist: [
                        { text: 'GFCI/GFPE trip testing at all devices', ref: 'NEC 210.8, 230.95' },
                        { text: 'Transfer switch: simulate normal failure, verify transfer', ref: 'NEC 700, 701, NFPA 110' },
                        { text: 'Generator start/test under load', ref: 'NFPA 110' },
                        { text: 'Fire alarm: full system test with AHJ', ref: 'NFPA 72' },
                        { text: 'Lighting controls: scenes, schedules, sensors', ref: '' },
                        { text: 'BAS/EMS: points check, graphics, alarms', ref: '' },
                        { text: 'Verify arc flash labels match study', ref: 'NEC 110.16' }
                    ]
                },
                {
                    id: 'integrated',
                    title: 'Integrated Systems Testing (IST)',
                    icon: '🔗',
                    iconColor: 'purple',
                    checklist: [
                        { text: 'Fire alarm → HVAC shutdown, damper control', ref: 'NFPA 72, IMC' },
                        { text: 'Power failure → generator start → ATS transfer → emergency loads', ref: 'NEC 700, 701' },
                        { text: 'BAS → lighting control → demand response', ref: '' },
                        { text: 'Document all test results with pass/fail', ref: '' }
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
            description: 'Complete documentation package for owner, AHJ, and O&M',
            cards: [
                {
                    id: 'package',
                    title: 'Owner/AHJ Documentation Package',
                    icon: '📁',
                    iconColor: 'blue',
                    checklist: [
                        { text: 'Load calculations (standard + optional) with demand factors', ref: 'NEC 220' },
                        { text: 'Complete panel schedules (all panels, MCCs, switchboards)', ref: 'NEC 408.4' },
                        { text: 'One-line diagram (as-built) with ratings, AIC, settings', ref: 'NEC 110.24' },
                        { text: 'Short circuit, coordination, arc flash study reports', ref: 'NEC 110.16, 110.24, 700.32' },
                        { text: 'Arc flash labels installed and documented', ref: 'NEC 110.16' },
                        { text: 'GFCI/GFPE test logs', ref: 'NEC 210.8, 230.95' },
                        { text: 'Ground resistance test results', ref: 'NEC 250.53' },
                        { text: 'Insulation resistance (Megger) test reports', ref: 'NETA' },
                        { text: 'As-built drawings (PDF + CAD)', ref: '' },
                        { text: 'Equipment submittals & O&M manuals', ref: '' },
                        { text: 'Commissioning report (CxA signed)', ref: 'IECC C408' },
                        { text: 'Energy code compliance documentation (COMcheck)', ref: 'IECC C408' },
                        { text: 'Fire alarm acceptance test (NFPA 72)', ref: 'NFPA 72' },
                        { text: 'Generator/ATS test reports (NFPA 110)', ref: 'NFPA 110' },
                        { text: 'Permit with final inspection sign-off', ref: '' },
                        { text: 'Owner training records and video', ref: '' },
                        { text: 'Warranty documents and contact list', ref: '' }
                    ]
                }
            ]
        }
    ]
};

// Export for browser
window.commercialData = commercialData;
