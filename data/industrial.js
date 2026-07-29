// Industrial Scale Data - Complete Step-by-Step Installation Guide
// Covers: Manufacturing, heavy industrial, utility substations, large campus (>100k sq ft)
// NEC 2023 + IEEE Standards: 141, 242, 399, 446, 519, 1584, 3007, NFPA 70E, 70B, 110

const industrialData = {
    scale: 'industrial',
    label: 'Industrial',
    icon: '🏭',
    description: 'Manufacturing, heavy industrial, utility substations, large campus (>100k sq ft)',
    serviceTypical: '4.16kV-13.8kV primary, 480V secondary, 2000-10000A+, 3Ø3W/4W',
    
    // Equipment Specifications with Sizes
    equipmentSpecs: {
        primaryService: {
            incomingLines: { 
                type: 'Overhead/underground', 
                voltage: '4.16kV-13.8kV', 
                conductor: 'ACSR/AAC per utility', 
                size: 'Per fault current & ampacity' 
            },
            primarySwitchgear: { 
                type: 'Metal-clad, drawout', 
                voltage: '4.16kV-13.8kV', 
                continuous: '1200-4000A', 
                interrupting: '25kA-63kA sym', 
                standard: 'IEEE C37.20.2' 
            },
            powerTransformers: { 
                type: 'OA/FA/FOA', 
                voltage: '4.16kV-13.8kV Δ / 480Y/277V', 
                kva: ['1000','1500','2000','2500','3000','4000','5000'], 
                impedance: '5.5%-7.5%', 
                standard: 'IEEE C57.12.00' 
            },
            secondarySwitchgear: { 
                type: 'Metal-enclosed, drawout', 
                voltage: '480V', 
                continuous: '2000-6000A', 
                interrupting: '65kA-100kA sym', 
                standard: 'IEEE C37.20.1' 
            },
            motorControlCenters: { 
                type: 'NEMA Class II, Type B', 
                voltage: '480V', 
                buckets: '0-54 per section', 
                standard: 'NEMA ICS 3' 
            }
        },
        
        distribution: {
            feeders: { 
                voltage: '480V', 
                conductor: 'CU/AL per ampacity (Table 310.16)', 
                conduit: 'RMC/IMC/PVC80', 
                grounding: 'EGC per 250.122' 
            },
            transformers: { 
                type: 'Dry-type, ventilated', 
                voltage: '480-208Y/120V', 
                kva: ['75','112.5','150','225','300','500','750'], 
                standard: 'UL 1561' 
            },
            panelboards: { 
                voltage: '208Y/120V', 
                type: '42-circuit, bolt-on', 
                standard: 'UL 67', 
                sizes: ['225A','400A','600A'] 
            }
        },
        
        branchCircuits: {
            motors: { 
                voltage: '480V 3Ø', 
                awg: 'per FLA (Table 430.250)', 
                breaker: 'per 430.52 (250% max for inverse time)', 
                conduit: 'EMT/RMC', 
                overload: 'per 430.32 (115%-125%)' 
            },
            vfd: { 
                voltage: '480V', 
                awg: 'per FLA', 
                conduit: 'EMT w/ shielded cable', 
                filter: 'line/load reactor (3%-5%)', 
                grounding: 'per 250.118' 
            },
            lighting: { 
                voltage: '277V or 120V', 
                awg: '12 THHN/THWN', 
                conduit: '3/4" EMT', 
                load: 'Per fixture' 
            },
            receptacles: { 
                awg: '12 THHN/THWN', 
                breaker: '20A 1P GFCI', 
                conduit: '3/4" EMT', 
                load: '180VA/strap' 
            }
        },
        
        grounding: {
            groundRod: { 
                type: '3/4" x 10ft copper-clad', 
                standard: 'UL 467', 
                qty: 'per 250.53 (2 rods min, 6ft apart)' 
            },
            gec: { 
                awg: 'per Table 250.66 (based on largest service conductor)', 
                material: 'Cu', 
                location: 'Service entrance' 
            },
            mainBondingJumper: { 
                awg: 'per Table 250.28 (based on largest service conductor)', 
                location: 'Service equipment' 
            },
            equipmentGrounding: { 
                awg: 'per 250.122 (based on overcurrent device rating)', 
                type: 'EGC with feeders', 
                continuity: 'Verified' 
            },
            groundingGrid: { 
                conductor: '4/0 AWG bare copper', 
                spacing: '20ft grid', 
                depth: '2.5ft bury', 
                standard: 'IEEE 80' 
            }
        }
    },
    
    manpowerEstimates: {
        engineeringStudy: { jm: 0, ap: 0, pe: 80, et: 120 }, // per 1MVA
        utilityCoordination: { jm: 8, ap: 4, pm: 2 },
        civilWork: { jm: 40, ap: 20, op: 20, cem: 10 }, // per 1000 sq ft substation
        switchgearInstall: { jm: 24, ap: 12, rigger: 8, crane: 16 },
        transformerInstall: { jm: 16, ap: 8, rigger: 8, crane: 24, oil: 8 },
        cablePull: { jm: 32, ap: 32, helper: 16 }, // per 1000 ft
        termination: { jm: 8, ap: 4 }, // per termination
        deviceInstall: { jm: 20, ap: 20 },
        panelBuild: { jm: 16, ap: 8 },
        mccInstall: { jm: 20, ap: 10 },
        testing: { jm: 16, ap: 8, net: 24 },
        commissioning: { jm: 24, ap: 12, cx: 16, net: 8 },
        documentation: { jm: 12, ap: 6, pm: 6 }
    },

    phases: [
        {
            id: 'engineering',
            number: 1,
            title: 'Phase 1: Engineering Studies & Design',
            icon: '📐',
            color: 'blue',
            description: 'Utility interconnection, load flow, short circuit, coordination, arc flash, harmonic studies',
            estimatedHours: { jm: 0, ap: 0, pe: 120, et: 180 }, // per 1MVA
            steps: [
                {
                    order: 1,
                    title: '1.1 Utility Interconnection Study',
                    type: 'engineering',
                    duration: { pe: 20, et: 30 },
                    crew: { pe: 1, et: 2 },
                    materials: ['Utility data request', 'Interconnection application'],
                    tools: ['ETAP/SKM', 'Utility fault current data', 'One-line diagram software'],
                    instructions: [
                        'Submit interconnection application to utility',
                        'Obtain Point of Interconnection (POI) voltage and available fault current',
                        'Determine required protective relaying (transfer trip, DTT, PUTT)',
                        'Establish metering requirements (primary vs secondary, CT/PT ratios)',
                        'Define grounding interface (separate grids, decoupling transformers)',
                        'Coordinate outage scheduling and switching procedures'
                    ],
                    verification: 'Interconnection agreement executed, POI characteristics documented',
                    codeRefs: ['IEEE 1547', 'IEEE 1547.1', 'NEC 110.24', 'Utility interconnection standards']
                },
                {
                    order: 2,
                    title: '1.2 Load Flow & Voltage Regulation Study',
                    type: 'engineering',
                    duration: { pe: 25, et: 40 },
                    crew: { pe: 1, et: 2 },
                    materials: ['Load schedules', 'Motor starting data', 'Transformer data'],
                    tools: ['ETAP/SKM/PowerWorld', 'Load flow software'],
                    instructions: [
                        'Build system model: all buses, lines, transformers, loads, generators',
                        'Input all load data: continuous, intermittent, motor starting',
                        'Run base case load flow: verify voltages within ±5% ANSI C84.1',
                        'Run contingency analysis (N-1): check for overloads/voltage violations',
                        'Determine capacitor bank sizing for power factor correction (>0.95 lag)',
                        'Calculate voltage regulation: ensure <3% variance at utilization equipment'
                    ],
                    verification: 'Load flow converged, voltages within limits, PF correction calculated',
                    codeRefs: ['IEEE 141', 'IEEE 242', 'ANSI C84.1', 'NEC 220', 'IEEE 18']
                },
                {
                    order: 3,
                    title: '1.3 Short Circuit Study',
                    type: 'engineering',
                    duration: { pe: 20, et: 30 },
                    crew: { pe: 1, et: 2 },
                    materials: ['Component impedance data', 'Cable/raceway schedules'],
                    tools: ['ETAP/SKM', 'Fault current calculator'],
                    instructions: [
                        'Model all impedance sources: utility, transformers, reactors, cables, motors',
                        'Apply ANSI/IEEE methods: Thevenin equivalent at each bus',
                        'Calculate symmetrical short circuit current (3Ø, LG, LL, LLG)',
                        'Include motor contribution: subtract transient contribution per ANSI C37.010',
                        'Compare to equipment ratings: check interrupting, closing, latching capabilities',
                        'Document X/R ratio at each bus for asymmetric duty calculation'
                    ],
                    verification: 'All equipment rated ≥ available fault current, X/R ratios documented',
                    codeRefs: ['IEEE 399', 'ANSI C37.010', 'NEC 110.24', 'NEC 110.9', 'NEC 110.10']
                },
                {
                    order: 4,
                    title: '1.4 Protection Coordination Study',
                    type: 'engineering',
                    duration: { pe: 25, et: 40 },
                    crew: { pe: 1, et: 2 },
                    materials: ['Relay curves', 'Breaker time-current data', 'Fuse curves'],
                    tools: ['ETAP/SKM', 'TCC plotter', 'Relay test set'],
                    instructions: [
                        'Collect time-current curves for all protective devices',
                        'Plot TCC on log-log scale: upstream must be below downstream',
                        'Verify selective coordination: no overlap between upstream/downstream curves',
                        'Check zone selectivity: ensure faults cleared by closest upstream device',
                        'Verify NEC 700/701/708 selective coordination for emergency systems',
                        'Document pickup, time delay, curve type for each device'
                    ],
                    verification: 'TCC curves show proper coordination, selective coordination verified',
                    codeRefs: ['IEEE 242', 'NEC 240.12', 'NEC 700.32', 'NEC 701.27', 'NEC 702', 'NEC 708.54']
                },
                {
                    order: 5,
                    title: '1.5 Arc Flash Hazard Analysis',
                    type: 'engineering',
                    duration: { pe: 20, et: 30 },
                    crew: { pe: 1, et: 2 },
                    materials: ['Short circuit results', 'Protection settings', 'Equipment data'],
                    tools: ['ETAP/SKM', 'Arc flash calculator (IEEE 1584-2018)'],
                    instructions: [
                        'Use short circuit study results: bolted fault current and X/R ratio',
                        'Determine arc duration: based on protective device clearing time',
                        'Select electrode configuration: VCB, VCBB, HCB, VOA per equipment type',
                        'Calculate incident energy: IEEE 1584-2018 equations (125V-15kV)',
                        'Determine arc flash boundary: where incident energy = 1.2 cal/cm²',
                        'Assign PPE category: per NFPA 70E Table 130.7(C)(15)(a) or (b)',
                        'Generate arc flash labels: incident energy, boundary, PPE, shock boundaries'
                    ],
                    verification: 'Incident energy calculated, labels generated, PPE specified',
                    codeRefs: ['IEEE 1584-2018', 'NFPA 70E', 'NEC 110.16', 'NFPA 70E 130.5(H)']
                },
                {
                    order: 6,
                    title: '1.6 Harmonic Analysis',
                    type: 'engineering',
                    duration: { pe: 15, et: 25 },
                    crew: { pe: 1, et: 2 },
                    materials: ['Non-linear load inventory', 'Capacitor bank data'],
                    tools: ['ETAP/SKM', 'Harmonic analysis software'],
                    instructions: [
                        'Identify all non-linear loads: VFDs, UPS, LED drives, rectifiers, arc furnaces',
                        'Calculate harmonic currents: fundamental magnitude × THD/% harmonics',
                        'Model system impedance: include source, transformers, cables, reactors',
                        'Perform frequency scan: identify parallel/series resonance frequencies',
                        'Calculate voltage/current THD at PCC: compare to IEEE 519 limits',
                        'Design filters if needed: passive (tuned) or active to meet THD<5%/TDD<8%'
                    ],
                    verification: 'THD/TDD within IEEE 519 limits, filtering solution designed if needed',
                    codeRefs: ['IEEE 519', 'IEEE 141', 'IEEE 242', 'NEC 110.24']
                },
                {
                    order: 7,
                    title: '1.7 Grounding Study',
                    type: 'engineering',
                    duration: { pe: 15, et: 20 },
                    crew: { pe: 1, et: 2 },
                    materials: ['Soil resistivity data', 'Grid layout', 'Fault current data'],
                    tools: ['SES/CDEGS', 'Ground grid design software'],
                    instructions: [
                        'Measure soil resistivity: Wenner 4-point method at multiple locations/depths',
                        'Design grounding grid: calculate mesh and step voltages per IEEE 80',
                        'Determine grid conductor size: based on fault current and duration',
                        'Calculate ground potential rise (GPR): I_fault × R_grid',
                        'Verify touch/step voltages < safety thresholds: 150V (50kg), 1000V (70kg) per IEEE 80',
                        'Design ground rods, wells, or chemical rods if native soil insufficient'
                    ],
                    verification: 'Grid design verified, touch/step voltages within limits, GPR calculated',
                    codeRefs: ['IEEE 80', 'IEEE 81', 'NEC 250', 'IEEE 142']
                }
            ],
            deliverables: [
                'Interconnection agreement with utility',
                'Load flow study report with voltage profiles',
                'Short circuit study report with equipment duties',
                'Protection coordination study with TCC curves',
                'Arc flash hazard analysis report with labels',
                'Harmonic analysis report with filter recommendations',
                'Grounding study report with grid design',
                'Complete electrical specifications package'
            ]
        },
        {
            id: 'siteWork',
            number: 2,
            title: 'Phase 2: Site Work & Civil Construction',
            icon: '🏗️',
            color: 'yellow',
            description: 'Foundations, conduits, grounding, cable trays, structural work',
            estimatedHours: { jm: 80, ap: 40, op: 60, cem: 30 }, // per 1000 sq ft
            steps: [
                {
                    order: 1,
                    title: '2.1 Soil Preparation & Foundation Work',
                    type: 'civil',
                    duration: { jm: 16, op: 24, cem: 8 },
                    crew: { jm: 2, op: 3, cem: 1 },
                    materials: ['Concrete', 'Rebar', 'Forms', 'Gravel base', 'Waterproofing'],
                    tools: ['Excavator', 'Concrete mixer', 'Vibrator', 'Laser level'],
                    instructions: [
                        'Excavate to required depth: below frost line, adequate bearing capacity',
                        'Place and compact gravel base: 6\" min, 95% compaction',
                        'Build forms for equipment pads, conduit trenches, ground rod wells',
                        'Place reinforcement: #4 rebar @ 12\" oc each way, hook at corners',
                        'Pour concrete: 3000 psi min, vibrate to eliminate voids',
                        'Cure concrete: keep moist 7 days, achieve design strength',
                        'Install anchor bolts: set to template, verify projection and alignment'
                    ],
                    verification: 'Dimensions correct, concrete cured, anchor bolts plumb and secure',
                    codeRefs: ['ACI 318', 'IEEE 80', 'NEC 110.26', 'Local building code']
                },
                {
                    order: 2,
                    title: '2.2 Grounding System Installation',
                    type: 'electrical',
                    duration: { jm: 24, ap: 12 },
                    crew: { jm: 3, ap: 2 },
                    materials: ['Bare copper cable (4/0 AWG)', 'Ground rods (3/4\"x10\")', 'Exothermic welds', 'Ground wells'],
                    tools: ['Post hole digger', 'Sledge hammer', 'Exothermic weld kit', 'Torque wrench'],
                    instructions: [
                        'Install ground rods: 8\' deep, spaced 2x rod length apart (minimum 6\")',
                        'Drive rods to full depth: use mechanical driver or hand sled',
                        'Lay ground grid: bury bare copper conductor at designed depth',
                        'Make exothermic welds: at all crossings and connections to rods/electrodes',
                        'Test weld integrity: visual inspection + mechanical pull test (min 500 lbs)',
                        'Connect to equipment: exothermic weld or listed lug to ground pad/bus',
                        'Measure ground resistance: fall-of-potential method per IEEE 81'
                    ],
                    verification: 'Ground resistance <25 ohms (or per spec), all connections exothermic welded',
                    codeRefs: ['IEEE 80', 'IEEE 81', 'NEC 250.52', 'NEC 250.53', 'NEC 250.68(A)']
                },
                {
                    order: 3,
                    title: '2.3 Conduit & Raceway Installation',
                    type: 'electrical',
                    duration: { jm: 40, ap: 20 },
                    crew: { jm: 4, ap: 2 },
                    materials: ['RMC/IMC conduit', 'PVC conduit', 'Cable tray', 'Supports/hangers', 'Pull boxes'],
                    tools: ['Conduit bender', 'Threader', 'Hacksaw', 'Level', 'Measuring tape'],
                    instructions: [
                        'Install conduit supports: per NEC 344.30(B) (10\' max for RMC, 3\' within box)',
                        'Maintain burial depth: 24\" min for direct burial, 18\" under concrete',
                        'Keep conduit fill ≤40% for >2 conductors, ≤31% for 2 conductors, ≤53% for 1',
                        'Provide expansion fittings: every 100ft max, or where crossing building expansion joints',
                        'Seal conduit penetrations: fire caulk for fire-rated walls, duct seal for moisture',
                        'Install pull boxes: every 100ft max or where bends exceed 360°, size diam. * 6',
                        'Ground metal conduit: at both ends and every 25ft with bonding jumper'
                    ],
                    verification: 'Conduit secure, burial depth correct, fill % within limits, grounding continuous',
                    codeRefs: ['NEC 300.5', '300.22', '344.30', '352.30', '358.30', '376.22', '300.15', '250.118']
                },
                {
                    order: 4,
                    title: '2.4 Cable Tray & Busway Installation',
                    type: 'electrical',
                    duration: { jm: 20, ap: 10 },
                    crew: { jm: 2, ap: 1 },
                    materials: ['Ladder/v-bottom tray', 'Busway sections', 'Hangars/supports', 'Barriers/dividers'],
                    tools: ['Level', 'Torque wrench', 'Fish tape', 'Cable grips'],
                    instructions: [
                        'Install tray supports: per NEMA VE 2 (3\' max for steel, 5\' for aluminum)',
                        'Maintain separation: power vs control (6\" min), power vs comm (12\" min)',
                        'Provide dividers: where required by NEC 392.22(B) for different voltage systems',
                        'Ensure grounding continuity: bond all sections with jumper per NEC 392.60(B)',
                        'Allow for expansion: leave gaps per manufacturer (typically 1/4\" per 20ft)',
                        'Secure cables: use straps/ties at intervals per NEC 392.30(B)(2)',
                        'Maintain minimum radius: per cable manufacturer, not less than 12x diameter'
                    ],
                    verification: 'Tray level/square, supports per spec, separation maintained, grounding continuous',
                    codeRefs: ['NEC 392', 'NEMA VE 1', 'NEMA VE 2', '300.3(C)(1)', '300.3(C)(2)']
                }
            ],
            deliverables: [
                'Completed foundations and equipment pads',
                'Installed and tested grounding system',
                'Rough-in conduit and raceway system',
                'Installed cable tray and busway systems',
                'As-built drawings of civil and underground work'
            ]
        },
        {
            id: 'equipmentInstall',
            number: 3,
            title: 'Phase 3: Equipment Installation',
            icon: '🔧',
            color: 'purple',
            description: 'Switchgear, transformers, motors, drives, MCCs, panels',
            estimatedHours: { jm: 120, ap: 60, rigger: 40, crane: 60 }, // per major equipment set
            steps: [
                {
                    order: 1,
                    title: '3.1 Switchgear Assembly & Installation',
                    type: 'electrical',
                    duration: { jm: 24, ap: 12, rigger: 8, crane: 16 },
                    crew: { jm: 3, ap: 2, rigger: 1, crane: 1 },
                    materials: ['Switchgear sections', 'Bus bars', 'Insulators', 'Gaskets', 'Bolts'],
                    tools: ['Torque wrench (calibrated)', 'Micrometer', 'Feeler gauges', 'Level', 'Crane'],
                    instructions: [
                        'Inspect for shipping damage: check exterior, interior, operate mechanisms',
                        'Verify anchoring: install per manufacturer, check grout if required',
                        'Assemble sections: align, bolt together per torque specifications',
                        'Install bus connections: clean surfaces, apply inhibitor, torque to spec',
                        'Check phase barriers: properly installed, no damage, correct spacing',
                        'Verify interlock operation: mechanical and electrical between sections',
                        'Anchoring to floor: per seismic zone, check gap under base frame'
                    ],
                    verification: 'Unit assembled, aligned, bolted to spec, interlocks functional, grounded',
                    codeRefs: ['IEEE C37.20.2', 'NEC 110.26', 'IEEE 693', 'ASCE 7']
                },
                {
                    order: 2,
                    title: '3.2 Power Transformer Installation',
                    type: 'electrical',
                    duration: { jm: 16, ap: 8, rigger: 8, crane: 24, oil: 8 },
                    crew: { jm: 2, ap: 1, rigger: 1, crane: 1, oil: 1 },
                    materials: ['Transformer', 'Insulating oil', 'Gaskets', 'Thermometers', 'Pressure relief'],
                    tools: ['Dial indicator', 'Megger (5kV+)', 'Oil test kit', 'Thermometer', 'Oil pump'],
                    instructions: [
                        'Inspect for damage: check tank, radiators, bushings, gauges, conservator',
                        'Check oil level and quality: visual, dielectric strength if possible',
                        'Position on pads: ensure level, check for soft spots, align with conduits',
                        'Install bushings: torque to specification, check for cracks/contamination',
                        'Fill with oil: degas if required, fill to correct level, bleed air',
                        'Perform tests: ratio, polarity, excitation current, insulation resistance',
                        'Check accessories: sudden pressure relay, Buchholz, temperature indicators'
                    ],
                    verification: 'Unit level, oil filled to correct level, all electrical tests passed',
                    codeRefs: ['IEEE C57.12.00', 'NEC 450', 'IEEE C57.12.90', 'NFPA 70E']
                },
                {
                    order: 3,
                    title: '3.3 Motor Control Center Installation',
                    type: 'electrical',
                    duration: { jm: 20, ap: 10 },
                    crew: { jm: 3, ap: 2 },
                    materials: ['MCC sections', 'Bucket units', 'Bus bars', 'Terminal blocks', 'Wiring'],
                    tools: ['Torque wrench', 'Wire strippers', 'Crimp tool', 'Label maker', 'Phase rotation meter'],
                    instructions: [
                        'Inspect for damage: check exterior, interior, operate disconnects',
                        'Verify anchoring: install per manufacturer, check if seismic restraints needed',
                        'Assemble sections: join together, install bus ties, torque to specification',
                        'Install bus connections: clean, inhibitor applied, torqued per spec',
                        'Check vertical bus: properly insulated, supported, rated for fault current',
                        'Install feed-through lugs: if required, torque to specification',
                        'Ground MCC: connect ground bus to building ground per NEC 250.104(C)'
                    ],
                    verification: 'Sections joined, bus connected, grounding verified, all parts installed',
                    codeRefs: ['NEMA ICS 3', 'NEC 430', 'NEC 110.26', 'NEC 250.104(C)']
                },
                {
                    order: 4,
                    title: '3.4 Motor and Drive Installation',
                    type: 'electrical',
                    duration: { jm: 16, ap: 8 },
                    crew: { jm: 2, ap: 2 },
                    materials: ['Motors', 'VFDs', 'Conduit', 'Cable', 'Disconnects', 'Motor starters'],
                    tools: ['Shaft alignment tools', 'Torque wrench', 'Megger', 'Clamp amp meter', 'Laser tach'],
                    instructions: [
                        'Check motor nameplate: verify voltage, phase, HP, RPM, frame, enclosure',
                        'Align motor to driven equipment: laser alignment, soft foot check',
                        'Mount motor: secure to base, check for resonance, isolate vibration if needed',
                        'Install conduit and conductors: from disconnect to motor, per ampacity tables',
                        'Connect leads: match motor terminals T1-T2-T3 to L1-L2-L3, maintain phase rotation',
                        'Ground motor frame: install grounding lug, connect to EGC per NEC 250.110',
                        'Install VFD: per manufacturer, maintain bending radius, shielded cable if required'
                    ],
                    verification: 'Motor aligned, mounted, connected, grounded, VFD installed per spec',
                    codeRefs: ['NEC 430', 'NEC 110.26', 'IEEE 519', 'NEMA MG 1', 'UL 508A']
                },
                {
                    order: 5,
                    title: '3.5 Panelboard and Distribution Installation',
                    type: 'electrical',
                    duration: { jm: 12, ap: 6 },
                    crew: { jm: 2, ap: 1 },
                    materials: ['Panelboards', 'Breakers', 'Bus bars', 'Terminals', 'Wiring', 'Directories'],
                    tools: ['Torque wrench', 'Wire strippers', 'Label maker', 'Circuit tracer', 'Voltage tester'],
                    instructions: [
                        'Mount securely: to wall or structure, level and plumb, per clearance requirements',
                        'Install main bonding jumper: if service equipment, per NEC 250.24(B)',
                        'Connect feeders: torque lugs to specification, maintain bending radius',
                        'Install branch breakers: fully seated, proper type (HID, SWD, HACR as needed)',
                        'Connect branch circuits: torque to specification, identify in directory',
                        'Install directory: typed, mounted inside door, match actual circuit connections',
                        'Ground panel: connect enclosure to ground bus per NEC 250.110'
                    ],
                    verification: 'Unit secure, fed and branched correctly, directory accurate, grounded',
                    codeRefs: ['NEC 408', '408.36', '408.41', '250.24', '250.110', '110.26']
                }
            ],
            deliverables: [
                'Switchgear assembled, anchored, and interconnected',
                'Transformers installed, oil-filled, and tested',
                'MCCs assembled and anchored',
                'Motors and drives installed and aligned',
                'Panelboards mounted, fed, branched, and grounded'
            ]
        },
        {
            id: 'roughIn',
            number: 4,
            title: 'Phase 4: Rough-In Wiring',
            icon: '🔌',
            color: 'green',
            description: 'Conductor pulling, termination, device installation',
            estimatedHours: { jm: 160, ap: 160, helper: 80 }, // per 1000 ft conduit
            steps: [
                {
                    order: 1,
                    title: '4.1 Cable Pulling Preparation',
                    type: 'electrical',
                    duration: { jm: 16, ap: 8 },
                    crew: { jm: 2, ap: 1 },
                    materials: ['Pulling lubricant', 'Pulling eyes/ grips', 'Swivels', 'Release tape'],
                    tools: ['Pulling winch', 'Tension meter', 'Dynamometer', 'Cable rollers'],
                    instructions: [
                        'Calculate pulling tension: use IEEE 141 formula, check sidewall pressure',
                        'Select pulling method: hand winch for <1000ft, power winch for >1000ft',
                        'Prepare cable ends: attach pulling eye or grip with approved knot/splice',
                        'Apply lubricant: to conduit entrance and periodically during pull',
                        'Use proper equipment: sheaves, rollers, brakes to control tension',
                        'Monitor tension: never exceed 60% of conductor nominal breaking strength',
                        'Use swivels: to prevent torque buildup in armored cable'
                    ],
                    verification: 'Pull plan approved, equipment ready, lubrication applied',
                    codeRefs: ['IEEE 141', 'NFPA 70E', 'NEC 300.17', 'Manufacturer pulling tensions']
                },
                {
                    order: 2,
                    title: '4.2 Conductor Installation',
                    type: 'electrical',
                    duration: { jm: 80, ap: 80, helper: 40 },
                    crew: { jm: 4, ap: 4, helper: 2 },
                    materials: ['THHN/THWN/XHHW-2 wire', 'MC cable', 'TS cable', 'Grounding wire'],
                    tools: ['Wire strippers', 'Crimp tool', 'Torque wrench', 'Cable cutters', 'Fish tape'],
                    instructions: [
                        'Verify conductor insulation: rating matches or exceeds temperature limits',
                        'Strip insulation: to correct length per lug size, avoid nicking conductor',
                        'Install lugs: crimp with proper die, inspect for proper compression',
                        'Apply antioxidant: to aluminum conductors before installing lugs',
                        'Terminate in equipment: torque lugs to manufacturer specification',
                        'Maintain phase identification: use tape, tags, or colored wire throughout',
                        'Keep neutral isolated: in subpanels and equipment per NEC 250.142(B)'
                    ],
                    verification: 'All conductors terminated, lugs torqued, phase ID maintained, neutral isolated',
                    codeRefs: ['NEC 310.15', '310.16', '110.14(B)', '300.17', '250.142(B)', '250.102(C)']
                },
                {
                    order: 3,
                    title: '4.3 Device and Equipment Connection',
                    type: 'electrical',
                    duration: { jm: 32, ap: 32, helper: 16 },
                    crew: { jm: 4, ap: 4, helper: 2 },
                    materials: ['Receptacles', 'Switches', 'Motor starters', 'Contactors', 'Relays', 'Terminal blocks'],
                    tools: ['Screwdrapper set', 'Wire strippers', 'Torque wrench', 'Circuit tester', 'Label maker'],
                    instructions: [
                        'Verify device rating: voltage, current, pole count, enclosure type',
                        'Connect line and load: correct terminals, observe polarity if DC',
                        'Torque terminals: to manufacturer specification using calibrated tool',
                        'Install grounding pigtail: if device has ground screw, connect to EGC',
                        'Mount securely: to box or device, ears flush with surface, no wobble',
                        'Apply thread locker: to mounting screws in vibration environments',
                        'Label clearly: durable labels indicating function, circuit number, voltage'
                    ],
                    verification: 'Devices properly wired, terminated, grounded, mounted, and labeled',
                    codeRefs: ['NEC 110.14(B)', '406.4(D)', '406.5', '406.9(B)', '250.146', '250.148']
                },
                {
                    order: 4,
                    title: '4.4 Motor and Equipment Connections',
                    type: 'electrical',
                    duration: { jm: 24, ap: 24, helper: 12 },
                    crew: { jm: 3, ap: 3, helper: 2 },
                    materials: ['Motor leads', 'Terminal lugs', 'Heat shrink', 'Electrical tape', 'Glands'],
                    tools: ['Crimp tool', 'Torque wrench', 'Heat gun', 'Wire strippers', 'Insulation tester'],
                    instructions: [
                        'Use proper termination: lugs, clamps, or pressure connectors as listed',
                        'Maintain strand integrity: do not cut strands when stripping',
                        'Provide strain relief: within 12\" of termination, use clamps if needed',
                        'Seal conduit entries: use listed hubs or connectors for wet/damp locations',
                        'Phase motors correctly: T1-T2-T3 to L1-L2-L3, verify rotation',
                        'Ground frames: via listed lug to equipment ground, not through conduit alone',
                        'Protect flexible cords: strain relief, protection from abrasion and sharp edges'
                    ],
                    verification: 'Connections secure, strain relief provided, phase correct, grounded',
                    codeRefs: ['NEC 110.14(B)', '300.15', '300.17', '430.12', '430.22', '430.24', '250.110']
                }
            ],
            deliverables: [
                'All conductors pulled and terminated',
                'All devices and equipment connected',
                'Continuity and polarity verified',
                'Grounding continuity established throughout'
            ]
        },
        {
            id: 'testing',
            number: 5,
            title: 'Phase 5: Testing, Commissioning & Acceptance',
            icon: '🔬',
            color: 'green',
            description: 'Factory/field testing, commissioning, performance validation',
            estimatedHours: { jm: 24, ap: 12, cx: 16, net: 8 },
            steps: [
                {
                    order: 1,
                    title: '5.1 Pre-Functional Checklists',
                    type: 'testing',
                    duration: { jm: 16, ap: 8 },
                    crew: { jm: 3, ap: 2 },
                    tools: ['Torque wrench', 'Megger', 'Phase rotation meter', 'Continuity tester'],
                    instructions: [
                        'Verify all equipment installed per drawings/specs',
                        'Check torque on all power connections (calibrated wrench)',
                        'Verify phasing: A-B-C rotation at all panels',
                        'Insulation resistance testing (Megger): feeders, motors, transformers',
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
                    duration: { jm: 16, ap: 8 },
                    crew: { jm: 3, ap: 2 },
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
                    duration: { jm: 16, ap: 8 },
                    crew: { jm: 3, ap: 2 },
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
            estimatedHours: { jm: 12, ap: 6, pm: 6 },
            steps: [
                {
                    order: 1,
                    title: '6.1 Owner/AHJ Documentation Package',
                    type: 'administrative',
                    duration: { jm: 8, ap: 4, pm: 4 },
                    crew: { jm: 2, ap: 2, pm: 2 },
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
window.industrialData = industrialData;

// Export for Node/CommonJS
if (typeof module !== 'undefined' && module.exports) {
    module.exports = industrialData;
}