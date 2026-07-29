# Electrical Installation Analysis Webapp - Procedure for Three Building Types

This document outlines the procedure for using the Electrical Installation Analysis webapp to analyze electrical installations for three different building types at various scales: Residential, Commercial, and Industrial.

## Overview

The webapp provides a comprehensive step-by-step guide for electrical installation analysis, based on NEC 2023 and industry best practices. Each building type (scale) is analyzed through distinct phases, with checklists, notes, and progress tracking.

## Procedure

### 1. Residential Building (Single-family, duplex, triplex, fourplex)

**Scale**: Residential  
**Typical Scope**: 120/240V single-phase service, up to 400A

#### Steps:
1. Navigate to the **Residential** tab (🏠) in the webapp.
2. Proceed through each phase in order:
   - **Phase 1: Planning & Design**
     - Review load calculations and service sizing
     - Verify compliance with NEC Article 220 (Branch-Circuit, Feeder, and Service Calculations)
     - Check grounding and bonding requirements (NEC 250)
   - **Phase 2: Rough-In**
     - Install conduits, boxes, and cable assemblies
     - Verify box fill calculations (NEC 314.16)
     - Check cable protection and support (NEC 300.11, 300.17)
   - **Phase 3: Trim-Out**
     - Install devices, fixtures, and equipment
     - Verify GFCI and AFCI protection (NEC 210.8, 210.12)
     - Check receptacle spacing (NEC 210.52)
   - **Phase 4: Inspection & Testing**
     - Perform continuity, insulation resistance, and polarity tests
     - Verify operation of GFCI/AFCI devices
     - Prepare as-built documentation and panel schedule

3. Use the checklist for each phase to track completion.
4. Add notes as needed for specific observations or deviations.
5. Monitor progress via the progress bar at the bottom.
6. Export the report using the "Print Report" button for documentation.

### 2. Commercial Building (Office, retail, restaurant, warehouse <50k sq ft)

**Scale**: Commercial  
**Typical Scope**: 120/208V or 277/480V three-phase service, 400A-1000A

#### Steps:
1. Navigate to the **Commercial** tab (🏢) in the webapp.
2. Proceed through each phase:
   - **Phase 1: Planning & Design**
     - Perform detailed load calculations including HVAC, lighting, and receptacle loads
     - Coordinate with architectural and mechanical drawings
     - Verify short-circuit current ratings (SCCR) for equipment
   - **Phase 2: Rough-In**
     - Install raceways, cable trays, and conduit systems
     - Verify derating factors for conduits (NEC 310.15(C)(1))
     - Check separation of power and communication cables (NEC 800.133)
   - **Phase 3: Trim-Out**
     - Install lighting fixtures, receptacles, and equipment
     - Verify emergency lighting and exit signage (NEC 700.12)
     - Check demand controls for lighting (NEC 220.42, 220.43)
   - **Phase 4: Inspection & Testing**
     - Perform ground-fault testing on equipment
     - Verify phase rotation and motor connections
     - Conduct infrared thermographic scan of connections
     - Prepare commissioning documentation

3. Utilize the checklist items to ensure all critical steps are completed.
4. Use the notes section to record specific equipment models, settings, or field observations.
5. Track progress and generate a final report for submission to the authority having jurisdiction (AHJ).

### 3. Industrial Building (Manufacturing, utility, campus >100k sq ft)

**Scale**: Industrial  
**Typical Scope**: 480V or higher three-phase service, 1000A-4000A+, motors, VFDs, hazardous locations

#### Steps:
1. Navigate to the **Industrial** tab (🏭) in the webapp.
2. Proceed through each phase:
   - **Phase 1: Planning & Design**
     - Perform motor load calculations and starting analysis
     - Coordinate with process engineers for equipment layout
     - Verify compliance with NEC Articles 430 (Motors), 500-516 (Hazardous Locations), and 700 (Emergency Systems)
   - **Phase 2: Rough-In**
     - Install heavy-wall conduit, busways, and cable trays
     - Verify voltage drop calculations for feeders (NEC 210.19(A), 215.2(A)(1))
     - Check grounding electrode system for lightning protection (NEC 250.106)
   - **Phase 3: Trim-Out**
     - Install motor starters, VFDs, and control panels
     - Verify arc-flash hazard analysis and labeling (NEC 110.16)
     - Check motor connections and alignment per manufacturer
   - **Phase 4: Inspection & Testing**
     - Perform insulation resistance testing on motors and cables
     - Verify protective device coordination and settings
     - Conduct power quality analysis (harmonics, voltage fluctuations)
     - Prepare detailed as-built and maintenance documentation

3. Follow the checklist for each phase, paying special attention to hazardous location requirements if applicable.
4. Use the notes section to document specific equipment settings, torque values, and test results.
5. Monitor progress and export the report for use in commissioning and maintenance planning.

## Common Steps Across All Scales

1. **Initialization**: Upon loading the webapp, your progress is automatically loaded from localStorage (if available).
2. **Navigation**: Use the scale buttons at the top to switch between building types.
3. **Phase Tracking**: Each scale is divided into phases. Click on phase tabs to view detailed checklists.
4. **Checklist Interaction**:
   - Click the checkbox (✓) to mark an item as complete.
   - Use the notes textarea to add observations.
   - Cards can be expanded/collapsed by clicking the card header.
5. **Progress Monitoring**: The progress bar at the bottom shows overall completion percentage.
6. **Data Persistence**: All checklists and notes are saved automatically to localStorage.
7. **Export**: Use the "Print Report" button to generate a printable HTML report of your analysis.
8. **Templates**: Download starter templates (cable schedule, conduit schedule, panel schedule, commissioning plan) from the buttons below the navigation.

## Tips for Effective Use

- Always start with Phase 1 and proceed sequentially to ensure nothing is missed.
- Use the notes section to reference specific drawings, specifications, or code sections.
- For complex installations, consider using the Calculators tab (🔧) for voltage drop, conduit fill, and cable sizing calculations.
- Regularly save your progress by navigating away and back or using the save function (if implemented).
- Export reports at key milestones (e.g., after rough-in, before power-up) for quality assurance.

## Example Workflow for a Residential Project

1. Click the **Residential** (🏠) tab.
2. Start with **Phase 1: Planning & Design**.
   - Complete each checklist item, marking them as done.
   - Add notes about the service entrance location and meter socket height.
3. Move to **Phase 2: Rough-In** when all Phase 1 items are complete.
   - Verify conduit burial depth and note any rock encounters.
4. Proceed through **Phase 3: Trim-Out** and **Phase 4: Inspection & Testing**.
5. Once all phases are complete, click **Print Report** to generate a comprehensive document for the homeowner and inspector.

This procedure ensures a systematic, code-compliant approach to electrical installation analysis across different building scales, reducing errors and improving documentation quality.