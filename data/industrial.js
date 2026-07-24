// Industrial Scale Data - Electrical Installation Analysis
// Covers: Manufacturing, heavy industrial, utility substations, large campus (>100k sq ft)
// NEC 2023 + IEEE Standards: 141, 242, 399, 446, 519, 1584, 3007, NFPA 70E, 70B, 110

const industrialData = {
    scale: 'industrial',
    label: 'Industrial',
    icon: '🏭',
    description: 'Manufacturing, heavy industrial, utility substations, large campus (>100k sq ft)',
    serviceTypical: '4.16kV-13.8kV primary, 480V secondary, 2000-10000A+, 3Ø3W/4W',
    phases: [
        {
            id: 'preSite',
            number: 1,
            title: 'Pre-Site: Engineering & Studies',
            icon: '📐',
            color: 'blue',
            description: 'Utility interconnection, protection coordination, arc flash, harmonic studies',
            cards: [
                {
                    id: 'utilityInterconnect',
                    title: 'Utility Interconnection Agreement',
                    icon: '🤝',
                    iconColor: 'blue',
                    checklist: [
                        { text: 'Execute interconnection agreement with utility', ref: 'IEEE 1547, Utility req' },
                        { text: 'Confirm POI (Point of Interconnection) voltage & fault current', ref: '' },
                        { text: 'Define protection requirements: transfer trip, DTT, UPF', ref: 'IEEE C37.112' },
                        { text: 'Coordinate grounding: utility vs facility (separate/joined)', ref: 'IEEE 142, 80' },
                        { text: 'Define metering: primary/secondary, CT/PT ratios, accuracy class', ref: 'IEEE C57.13' },
                        { text: 'Establish outage coordination procedures', ref: '' }
                    ]
                },
                {
                    id: 'systemStudies',
                    title: 'Power System Studies (Pre-Construction)',
                    icon: '📊',
                    iconColor: 'purple',
                    checklist: [
                        { text: 'Load flow study: voltage regulation, losses, PF correction', ref: 'IEEE 141, 242' },
                        { text: 'Short circuit study: ANSI/IEEE methods, duties at all buses', ref: 'ANSI C37.010, IEEE 399' },
                        { text: 'Protection coordination: TCC curves, selective coordination', ref: 'IEEE 242, 399, NEC 240.12, 700.32' },
                        { text: 'Arc flash hazard analysis: IEEE 1584, NFPA 70E labels', ref: 'IEEE 1584, NFPA 70E' },
                        { text: 'Harmonic analysis: IEEE 519 limits, filter design if needed', ref: 'IEEE 519' },
                        { text: 'Motor starting study: voltage dip, torque, acceleration time', ref: 'IEEE 399' },
                        { text: 'Transient stability: large motors, gensets, utility switching', ref: 'IEEE 1159' },
                        { text: 'Grounding study: IEEE 80 (substation), touch/step potentials', ref: 'IEEE 80, 142' }
                    ]
                },
                {
                    id: 'equipmentSpecs',
                    title: 'Major Equipment Specifications',
                    icon: '📋',
                    iconColor: 'yellow',
                    checklist: [
                        { text: 'Primary switchgear: metal-clad, drawout, ratings, AIC', ref: 'IEEE C37.20.2' },
                        { text: 'Power transformers: impedance, taps, cooling, loading', ref: 'IEEE C57.12' },
                        { text: 'Secondary switchgear/switchboards: construction, bus rating', ref: 'IEEE C37.20.1' },
                        { text: 'MCCs: NEMA Class, type, starter types, VFD integration', ref: 'NEMA ICS 3, NEC 430' },
                        { text: 'Generators: kW, PF, subtransient reactance, governor/AVR', ref: 'NFPA 110, NEC 445' },
                        { text: 'UPS: topology, battery runtime, bypass, harmonic profile', ref: 'NEC 645, 700' },
                        { text: 'Capacitor banks: fixed/switched, detuning reactors', ref: 'IEEE 18, NEC 460' },
                        { text: 'Harmonic filters: passive/active, tuning, ratings', ref: 'IEEE 519' }
                    ]
                }
            ]
        },
        {
            id: 'siteSurvey',
            number: 2,
            title: 'Site Survey: Substation & Distribution',
            icon: '🏗️',
            color: 'yellow',
            description: 'Substations, MV switchgear, transformers, LV switchgear, MCCs',
            cards: [
                {
                    id: 'primarySub',
                    title: 'Primary Substation (MV)',
                    icon: '⚡',
                    iconColor: 'yellow',
                    checklist: [
                        { text: 'Incoming line: overhead/underground, terminations, arresters', ref: 'IEEE C62.11' },
                        { text: 'Primary switchgear: construction, interlocks, SCADA integration', ref: 'IEEE C37.20.2' },
                        { text: 'Protective relays: 50/51, 51N, 27/59, 81, 87T, 87B', ref: 'IEEE C37.90' },
                        { text: 'Verify relay settings match coordination study', ref: '' },
                        { text: 'Check CT/PT accuracy class, ratio, burden', ref: 'IEEE C57.13' },
                        { text: 'Transformer: DGA history, tap position, cooling, neutral grounding', ref: 'IEEE C57.12' },
                        { text: 'Grounding: station grid, main ground bus, equipment bonds', ref: 'IEEE 80' },
                        { text: 'DC system: battery, charger, distribution, monitoring', ref: 'IEEE 450, 1188' },
                        { text: 'Fire protection: deluge, CO2, detection', ref: 'NFPA 15, 850' },
                        { text: 'Security: fencing, cameras, access control', ref: 'NERC CIP' }
                    ]
                },
                {
                    id: 'mvSwitchgear',
                    title: 'MV Switchgear (4.16kV - 13.8kV)',
                    icon: '🔌',
                    iconColor: 'red',
                    checklist: [
                        { text: 'Breaker type: vacuum, SF6, air-magnetic', ref: 'IEEE C37.04' },
                        { text: 'Continuous current, interrupting rating, short-time rating', ref: 'IEEE C37.010' },
                        { text: 'Protective relay scheme: differential, overcurrent, bus', ref: '' },
                        { text: 'Breaker testing: timing, contact resistance, insulation', ref: 'IEEE C37.09' },
                        { text: 'Interlocks: mechanical, electrical, key exchange', ref: '' },
                        { text: 'Bus insulation: Hi-pot, IR, partial discharge', ref: 'IEEE C37.20.2' },
                        { text: 'Arc-resistant construction (Type 1/2/2B/2C)', ref: 'IEEE C37.20.7' }
                    ]
                },
                {
                    id: 'transformers',
                    title: 'Power Transformers',
                    icon: '🔄',
                    iconColor: 'green',
                    checklist: [
                        { text: 'Nameplate: MVA, impedance, taps, cooling class (ONAN/ONAF/OFAF)', ref: 'IEEE C57.12' },
                        { text: 'DGA (Dissolved Gas Analysis) - trend review', ref: 'IEEE C57.104' },
                        { text: 'Oil quality: dielectric, moisture, acids, furans', ref: 'ASTM D1816' },
                        { text: 'Bushing condition: C1/C2, power factor, hot collar', ref: 'IEEE C57.19' },
                        { text: 'OLTC (On-Load Tap Changer): operation count, oil analysis', ref: 'IEEE C57.131' },
                        { text: 'Neutral grounding: solid, resistance, reactor, Petersen coil', ref: 'IEEE 142, 399' },
                        { text: 'Sudden pressure relay, Buchholz, temperature monitors', ref: '' },
                        { text: 'Fire protection: spray, containment, separation', ref: 'NFPA 850' }
                    ]
                },
                {
                    id: 'lvDistribution',
                    title: 'LV Distribution (480V/600V)',
                    icon: '📦',
                    iconColor: 'blue',
                    checklist: [
                        { text: 'Switchgear/switchboard: construction, arc-resistant, bus rating', ref: 'IEEE C37.20.1' },
                        { text: 'Breakers: drawout, electronic trips (LSIG), maintenance', ref: 'IEEE C37.13' },
                        { text: 'Protective relays: 50/51, 50N/51N, 46, 49, 86, 87', ref: '' },
                        { text: 'Verify trip settings vs coordination study', ref: '' },
                        { text: 'Check bus insulation, torque marks, IR scan history', ref: '' },
                        { text: 'Ground fault protection: per NEC 230.95 (if >1000A)', ref: 'NEC 230.95' },
                        { text: 'Arc flash labels: incident energy, boundary, PPE category', ref: 'NFPA 70E, NEC 110.16' }
                    ]
                },
                {
                    id: 'mccs',
                    title: 'Motor Control Centers (MCCs)',
                    icon: '🔧',
                    iconColor: 'purple',
                    checklist: [
                        { text: 'NEMA Class I/II, Type A/B/C wiring', ref: 'NEMA ICS 3' },
                        { text: 'Bucket inventory: FVNR, FVR, RVAT, VFD, soft start', ref: 'NEC 430' },
                        { text: 'Overload protection: thermal, electronic, VFD-based', ref: 'NEC 430.32' },
                        { text: 'VFD installations: line reactor, dv/dt filter, sine filter', ref: 'IEEE 519' },
                        { text: 'Motor data: HP, FLA, SF, code letter, insulation class', ref: 'NEC 430.6' },
                        { text: 'Verify disconnecting means at motor', ref: 'NEC 430.102' },
                        { text: 'Grounding: bus, buckets, cable shields', ref: 'NEC 250.86, 250.96' },
                        { text: 'Smart MCC: EtherNet/IP, DeviceNet, diagnostics', ref: '' }
                    ]
                }
            ]
        },
        {
            id: 'processLoads',
            number: 3,
            title: 'Process Loads & Special Systems',
            icon: '🏭',
            color: 'purple',
            description: 'Large motors, arc furnaces, VFDs, process heat, specialized equipment',
            cards: [
                {
                    id: 'largeMotors',
                    title: 'Large Motors (>250 HP) & MV Motors',
                    icon: '⚙️',
                    iconColor: 'red',
                    checklist: [
                        { text: 'Starting method: DOL, RVAT, VFD, soft start, pony motor', ref: '' },
                        { text: 'Motor starting study: voltage dip ≤15%, torque vs load', ref: 'IEEE 399' },
                        { text: 'Protection: 87M, 46, 49, 50/51, 50N/51N, 27/59', ref: 'IEEE C37.96' },
                        { text: 'RTD monitoring: stator, bearing, ambient', ref: '' },
                        { text: 'Vibration monitoring: proximity probes, accelerometers', ref: 'API 670' },
                        { text: 'Excitation system: brushless, static, brush-type', ref: '' },
                        { text: 'Synchronizing: auto, manual, check sync (25)', ref: '' }
                    ]
                },
                {
                    id: 'arcFurnace',
                    title: 'Arc Furnaces & Heavy Cyclic Loads',
                    icon: '🔥',
                    iconColor: 'red',
                    checklist: [
                        { text: 'Flicker analysis: Pst, Plt per IEEE 1453', ref: 'IEEE 1453, IEC 61000-4-15' },
                        { text: 'Harmonic spectrum: odd/even, interharmonics', ref: 'IEEE 519' },
                        { text: 'SVC/STATCOM: sizing, response time, control', ref: 'IEEE 1531' },
                        { text: 'Transformer: special design (K-factor, impedance)', ref: 'IEEE C57.110' },
                        { text: 'Electrode regulation: hydraulic, mechanical', ref: '' }
                    ]
                },
                {
                    id: 'vfdHarmonics',
                    title: 'VFD Systems & Harmonic Mitigation',
                    icon: '📈',
                    iconColor: 'yellow',
                    checklist: [
                        { text: 'VFD type: 6-pulse, 12-pulse, 18-pulse, AFE', ref: '' },
                        { text: 'Input harmonic filter: passive, active, hybrid', ref: 'IEEE 519' },
                        { text: 'Output filter: dv/dt, sine wave, common mode choke', ref: '' },
                        { text: 'Motor cable: shielded, length limits, termination', ref: '' },
                        { text: 'Grounding: VFD, motor, cable shield, building steel', ref: '' },
                        { text: 'IEEE 519 compliance: TDD at PCC, individual harmonics', ref: 'IEEE 519' }
                    ]
                },
                {
                    id: 'processHeat',
                    title: 'Process Heating & Special Loads',
                    icon: '🌡️',
                    iconColor: 'red',
                    checklist: [
                        { text: 'Resistance heating: SCR control, power factor', ref: '' },
                        { text: 'Induction heating: frequency, matching network', ref: '' },
                        { text: 'Infrared/UV curing: lamp ratings, ballasts', ref: '' },
                        { text: 'Electrolysis/galvanizing: DC rectifiers, ripple', ref: '' },
                        { text: 'Welding machines: duty cycle, demand factors', ref: 'NEC 630' }
                    ]
                }
            ]
        },
        {
            id: 'protectionControl',
            number: 4,
            title: 'Protection, Control & SCADA',
            icon: '🛡️',
            color: 'blue',
            description: 'Relay settings, SCADA integration, communication, cybersecurity',
            cards: [
                {
                    id: 'relaySettings',
                    title: 'Protective Relay Settings Verification',
                    icon: '⚙️',
                    iconColor: 'blue',
                    checklist: [
                        { text: 'Verify all relay settings against coordination study', ref: '' },
                        { text: 'Document settings: pickup, time dial, curves, logic', ref: '' },
                        { text: 'Test relays: primary injection, secondary injection', ref: 'IEEE C37.90' },
                        { text: 'Verify scheme logic: DCUB, POTT, DTT, DUTT, 87', ref: '' },
                        { text: 'Check time sync: IRIG-B, SNTP, IEEE 1588 (PTP)', ref: 'IEEE 1588' },
                        { text: 'Event records: COMTRADE, sequential events recorder', ref: 'IEEE C37.111' },
                        { text: 'Breaker failure: 50BF settings, initiate/trip logic', ref: '' }
                    ]
                },
                {
                    id: 'scada',
                    title: 'SCADA & Communication Systems',
                    icon: '🖥️',
                    iconColor: 'green',
                    checklist: [
                        { text: 'Protocol: DNP3, IEC 61850, Modbus, EtherNet/IP', ref: '' },
                        { text: 'RTU/IED integration: points list, scaling, alarms', ref: '' },
                        { text: 'Communication media: fiber, radio, leased line, cellular', ref: '' },
                        { text: 'Redundancy: dual paths, PRP/HSR, ring topology', ref: 'IEC 62439' },
                        { text: 'Time synchronization: GPS, IRIG-B, NTP/PTP', ref: 'IEEE 1588' },
                        { text: 'Cybersecurity: NERC CIP, firewalls, DMZ, patching', ref: 'NERC CIP' },
                        { text: 'HMI/SCADA: displays, trends, reports, alarm management', ref: 'ISA 18.2' }
                    ]
                },
                {
                    id: 'automation',
                    title: 'Process Automation Integration',
                    icon: '🤖',
                    iconColor: 'purple',
                    checklist: [
                        { text: 'PLC/DCS: power supply, UPS, grounding', ref: '' },
                        { text: 'Safety systems: SIS, BMS, ESD - power separation', ref: 'IEC 61511' },
                        { text: 'Network: OT/IT separation, VLANs, conduits', ref: 'ISA 99/IEC 62443' },
                        { text: 'Historian: data retention, compression, redundancy', ref: '' },
                        { text: 'MES/ERP integration: energy, production, maintenance', ref: '' }
                    ]
                }
            ]
        },
        {
            id: 'testing',
            number: 5,
            title: 'Testing, Commissioning & Acceptance',
            icon: '🔬',
            color: 'green',
            description: 'Factory/field testing, commissioning, performance validation',
            cards: [
                {
                    id: 'factoryTest',
                    title: 'Factory Acceptance Testing (FAT)',
                    icon: '🏭',
                    iconColor: 'blue',
                    checklist: [
                        { text: 'Switchgear: mechanical, electrical, Hi-pot, control', ref: 'IEEE C37.20.1/2' },
                        { text: 'Transformers: ratio, polarity, excitation, impedance', ref: 'IEEE C57.12' },
                        { text: 'Relay panels: wiring, logic, communication', ref: '' },
                        { text: 'MCCs: bucket tests, VFD tests, communication', ref: '' },
                        { text: 'Generator: load bank, governor, AVR, protection', ref: 'NFPA 110' },
                        { text: 'UPS: load test, battery, bypass, harmonics', ref: '' }
                    ]
                },
                {
                    id: 'fieldTest',
                    title: 'Field Acceptance & Commissioning',
                    icon: '📍',
                    iconColor: 'green',
                    checklist: [
                        { text: 'Insulation resistance: all cables, bus, equipment (5kV+ megger)', ref: 'NETA ATS' },
                        { text: 'Hi-pot testing: cables, bus, switchgear (per NETA)', ref: 'NETA ATS' },
                        { text: 'Contact resistance: breakers, switches, bus joints', ref: 'NETA ATS' },
                        { text: 'Breaker timing: open/close, travel, velocity', ref: 'IEEE C37.09' },
                        { text: 'Relay testing: primary injection, end-to-end', ref: 'IEEE C37.90' },
                        { text: 'Transformer turns ratio (TTR), excitation, winding resistance', ref: 'IEEE C57.12' },
                        { text: 'Ground resistance: fall-of-potential, clamp-on', ref: 'IEEE 81' },
                        { text: 'Thermographic survey: all connections, bus, cables', ref: 'NETA ATS, NFPA 70B' },
                        { text: 'Phase rotation verification: A-B-C at all voltage levels', ref: '' },
                        { text: 'Load bank test: generator, UPS at 100% rated load', ref: 'NFPA 110' }
                    ]
                },
                {
                    id: 'integratedCommissioning',
                    title: 'Integrated Systems Commissioning',
                    icon: '🔗',
                    iconColor: 'purple',
                    checklist: [
                        { text: 'Protection scheme testing: trip, close, reclose, sync', ref: '' },
                        { text: 'Generator: start, sync, load, reject, parallel', ref: 'NFPA 110' },
                        { text: 'ATS/STS: transfer, retransfer, bypass isolation', ref: '' },
                        { text: 'Load shedding: schemes, priorities, restoration', ref: '' },
                        { text: 'Power management: demand control, peak shaving', ref: '' },
                        { text: 'Arc flash mitigation: maintenance mode, RELT testing', ref: 'NFPA 70E' },
                        { text: 'Black start: capability, sequence, testing', ref: '' },
                        { text: 'Document all test results, deviations, resolutions', ref: '' }
                    ]
                }
            ]
        },
        {
            id: 'maintenance',
            number: 6,
            title: 'Maintenance Programs & NFPA 70B',
            icon: '🔧',
            color: 'yellow',
            description: 'Condition-based maintenance, reliability, compliance',
            cards: [
                {
                    id: 'nfpa70b',
                    title: 'NFPA 70B Electrical Maintenance Program',
                    icon: '📋',
                    iconColor: 'blue',
                    checklist: [
                        { text: 'Develop EMP (Electrical Maintenance Program) per Chapter 4', ref: 'NFPA 70B Ch 4' },
                        { text: 'Condition assessment: Chapter 9 (equipment condition)', ref: 'NFPA 70B Ch 9' },
                        { text: 'Maintenance intervals: Table 9.2.2 (condition-based)', ref: 'NFPA 70B Table 9.2.2' },
                        { text: 'Prioritize: Condition 1 (immediate), 2 (soon), 3 (normal)', ref: 'NFPA 70B 9.2' },
                        { text: 'Document: single-line, equipment list, maintenance records', ref: 'NFPA 70B Ch 6' },
                        { text: 'Training: qualified persons, safety, procedures', ref: 'NFPA 70B Ch 5, NFPA 70E' },
                        { text: 'Spare parts: criticality analysis, lead times, stocking', ref: '' },
                        { text: 'Predictive: IR, PD, DGA, oil, vibration, motor current signature', ref: '' }
                    ]
                },
                {
                    id: 'reliability',
                    title: 'Reliability & Asset Management',
                    icon: '📊',
                    iconColor: 'green',
                    checklist: [
                        { text: 'RCM (Reliability Centered Maintenance) analysis', ref: 'SAE JA1011' },
                        { text: 'Criticality ranking: safety, production, environmental', ref: '' },
                        { text: 'MTBF/MTTR tracking, Weibull analysis', ref: '' },
                        { text: 'Root cause analysis (RCA) for failures', ref: '' },
                        { text: 'Spare transformer strategy: mobile, spare, sharing', ref: '' },
                        { text: 'Aging asset management: transformers, breakers, cable', ref: 'IEEE C57.150' }
                    ]
                },
                {
                    id: 'safety',
                    title: 'Electrical Safety Program (NFPA 70E)',
                    icon: '🛡️',
                    iconColor: 'red',
                    checklist: [
                        { text: 'ESP (Electrical Safety Program) documented', ref: 'NFPA 70E 110' },
                        { text: 'Arc flash risk assessment: labels, boundaries, PPE', ref: 'NFPA 70E 130' },
                        { text: 'Shock risk assessment: limited/restricted approach', ref: 'NFPA 70E 130' },
                        { text: 'Energized work permits: justification, approval', ref: 'NFPA 70E 130' },
                        { text: 'LOTO (Lockout/Tagout): procedures, training, audit', ref: 'NFPA 70E 120, OSHA 1910.147' },
                        { text: 'PPE program: selection, inspection, storage, rating', ref: 'NFPA 70E 130' },
                        { text: 'Annual audit of ESP, incident investigation', ref: 'NFPA 70E 110' }
                    ]
                }
            ]
        },
        {
            id: 'deliverables',
            number: 7,
            title: 'Final Documentation Package',
            icon: '📦',
            color: 'blue',
            description: 'Complete turnover package for owner, operations, maintenance',
            cards: [
                {
                    id: 'package',
                    title: 'Owner Turnover Package',
                    icon: '📁',
                    iconColor: 'blue',
                    checklist: [
                        { text: 'Complete power system study reports (load flow, SC, coord, AF, harmonic)', ref: '' },
                        { text: 'As-built single-line diagrams (all voltage levels)', ref: '' },
                        { text: 'Protective relay settings sheets (all devices, all schemes)', ref: '' },
                        { text: 'Arc flash labels installed + label schedule', ref: 'NFPA 70E, NEC 110.16' },
                        { text: 'Equipment nameplate data sheets (all major equipment)', ref: '' },
                        { text: 'Factory & field test reports (FAT, SAT, commissioning)', ref: '' },
                        { text: 'Insulation resistance, Hi-pot, contact resistance, TTR reports', ref: '' },
                        { text: 'Ground resistance test reports (substation, building)', ref: 'IEEE 81' },
                        { text: 'Thermographic survey report (baseline)', ref: 'NFPA 70B' },
                        { text: 'O&M manuals: all equipment (switchgear, xfmr, MCC, gen, UPS)', ref: '' },
                        { text: 'Spare parts list: recommended, critical, long-lead', ref: '' },
                        { text: 'Maintenance procedures: PM tasks, intervals, checklists', ref: 'NFPA 70B' },
                        { text: 'EMP (Electrical Maintenance Program) per NFPA 70B', ref: 'NFPA 70B Ch 4' },
                        { text: 'Electrical Safety Program (ESP) per NFPA 70E', ref: 'NFPA 70E 110' },
                        { text: 'SCADA/RTU point database, displays, alarm setpoints', ref: '' },
                        { text: 'Relay setting files (.rsd, .cid, .icd for IEC 61850)', ref: '' },
                        { text: 'Protection coordination study: TCC curves, logic diagrams', ref: '' },
                        { text: 'Short circuit study: duties, duties vs ratings', ref: '' },
                        { text: 'Harmonic study: IEEE 519 compliance, filter settings', ref: 'IEEE 519' },
                        { text: 'Generator/ATS test reports (NFPA 110 Level 1/2)', ref: 'NFPA 110' },
                        { text: 'UPS/battery test reports (capacity, impedance)', ref: '' },
                        { text: 'Cable pull records: tension, footage, megger per reel', ref: '' },
                        { text: 'Cable schedule: from/to, size, type, length, conduit', ref: '' },
                        { text: 'Conduit/cable tray schedule: routing, fill %, supports', ref: '' },
                        { text: 'Lightning protection: UL 96A, NFPA 780 certification', ref: 'NFPA 780' },
                        { text: 'Permits: electrical, building, environmental, utility', ref: '' },
                        { text: 'Certificate of occupancy / final inspection sign-off', ref: '' },
                        { text: 'Training records: operations, maintenance, safety', ref: '' },
                        { text: 'Warranty documents: equipment, labor, performance', ref: '' },
                        { text: 'Digital deliverables: PDF, CAD, ETAP/SKM/ETAP files, photos', ref: '' }
                    ]
                }
            ]
        }
    ]
};

// Export for browser
window.industrialData = industrialData;
