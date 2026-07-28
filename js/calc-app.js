// Cable/Conduit/Voltage Drop Calculator - Unified UI
// Uses cableCalcData and conduitFillData from data files
// Initializes on demand when calculators scale is activated

(function() {
    'use strict';

    // ========================================
    // DOM ELEMENTS
    // ========================================
    const elements = {
        // Cable Calculator
        cableForm: null,
        cableResult: null,
        // Conduit Fill
        conduitForm: null,
        conduitResult: null,
        // Voltage Drop
        vdForm: null,
        vdResult: null,
        // Common
        progressFill: document.getElementById('progressFill'),
        progressText: document.getElementById('progressText')
    };

    // ========================================
    // PUBLIC API - called when calculators scale is activated
    // ========================================
    window.initCalculators = function() {
        if (window._calculatorsInitialized) return;
        window._calculatorsInitialized = true;

        cacheElements();
        initCableCalculator();
        initConduitCalculator();
        initVoltageDropCalculator();
        initTemplateDownloads();
        updateProgress();
    };

    // ========================================
    // CACHE ELEMENTS
    // ========================================
    function cacheElements() {
        // Cable Calculator
        elements.cableForm = document.getElementById('cableCalcForm');
        elements.cableResult = document.getElementById('cableCalcResult');
        // Conduit Fill
        elements.conduitForm = document.getElementById('conduitFillForm');
        elements.conduitResult = document.getElementById('conduitFillResult');
        // Voltage Drop
        elements.vdForm = document.getElementById('vDropForm');
        elements.vdResult = document.getElementById('vDropResult');
    }

    // ========================================
    // CABLE CALCULATOR
    // ========================================
    function initCableCalculator() {
        const form = elements.cableForm;
        if (!form) return;

        form.addEventListener('submit', function(e) {
            e.preventDefault();
            calculateCable();
        });

        // Populate select options
        populateSelect('cableMaterial', [
            { value: 'copper', label: 'Copper (THHN/THWN)' },
            { value: 'aluminum', label: 'Aluminum (THHN/THWN)' }
        ]);

        populateSelect('cableConduitType', [
            { value: 'EMT', label: 'EMT (Steel)' },
            { value: 'RMC', label: 'RMC (Rigid Metal)' },
            { value: 'PVC40', label: 'PVC Schedule 40' },
            { value: 'PVC80', label: 'PVC Schedule 80' }
        ]);

        // Populate conduit sizes
        populateSelect('cableConduitSize', [
            '1/2', '3/4', '1', '1-1/4', '1-1/2', '2', '2-1/2', '3', '3-1/2', '4', '5', '6'
        ]);

        populateSelect('cableVoltage', [
            { value: '120', label: '120V' },
            { value: '208', label: '208V' },
            { value: '240', label: '240V' },
            { value: '277', label: '277V' },
            { value: '480', label: '480V' },
            { value: '600', label: '600V' }
        ]);
    }

    function calculateCable() {
        const form = elements.cableForm;
        const data = cableCalcData;

        // Get form values
        const params = {
            material: form.cableMaterial.value,
            loadAmps: parseFloat(form.cableLoadAmps.value) || 0,
            continuous: form.cableContinuous.checked,
            ambientTempC: parseFloat(form.cableAmbientTemp.value) || 30,
            ccc: parseInt(form.cableCCC.value) || 3,
            conduitHeightIn: parseFloat(form.cableConduitHeight.value) || 0,
            conduitSize: form.cableConduitSize.value,
            conduitType: form.cableConduitType.value,
            voltage: parseFloat(form.cableVoltage.value) || 240,
            phase: form.cablePhase.value,
            lengthFt: parseFloat(form.cableLength.value) || 100,
            maxVDropPct: parseFloat(form.cableMaxVDrop.value) || 3
        };

        // Validate
        if (!params.loadAmps || params.loadAmps <= 0) {
            showError(elements.cableResult, 'Please enter a valid load current');
            return;
        }

        // Get the appropriate ampacity table
        const table = params.material === 'copper' ? window.cableCalcData.copper75 : window.cableCalcData.aluminum75;
        if (!table) {
            showError(elements.cableResult, 'Cable data not loaded');
            return;
        }

        // Calculate required ampacity (125% for continuous)
        let requiredAmps = params.loadAmps;
        if (params.continuous) requiredAmps *= 1.25;

        // Get correction factors
        const tempFactor = window.cableCalcData.getTempFactor(params.ambientTempC);
        const rooftopAdder = window.cableCalcData.getRooftopAdder(params.conduitHeightIn);
        const effectiveTempC = params.ambientTempC + rooftopAdder.adderC;
        const effectiveTempFactor = window.cableCalcData.getTempFactor(effectiveTempC);
        const fillFactor = window.cableCalcData.getRacewayFillFactor(params.ccc);
        const totalFactor = effectiveTempFactor * fillFactor;

        // Find suitable conductor
        let recommended = null;
        for (const cond of table) {
            const deratedAmp = cond.amp * totalFactor;
            if (deratedAmp >= requiredAmps) {
                // Check voltage drop
                const vd = calcVoltageDrop(params.material, cond.awg, params.loadAmps, params.lengthFt, params.voltage, params.phase);
                const vdPct = (vd / params.voltage) * 100;

                // Check conduit fill
                const condArea = window.cableCalcData.getConductorArea(cond.awg);
                const totalCondArea = condArea * params.ccc;
                const conduitArea = window.cableCalcData.getConduitArea(params.conduitSize, params.conduitType);
                const fillPct = conduitArea > 0 ? (totalCondArea / conduitArea) * 100 : 0;

                recommended = {
                    awg: cond.awg,
                    mm2: cond.mm2,
                    baseAmp: cond.amp,
                    deratedAmp: Math.round(deratedAmp),
                    requiredAmps: Math.round(requiredAmps),
                    tempFactor: effectiveTempFactor,
                    fillFactor,
                    totalFactor,
                    voltageDrop: vd.toFixed(2),
                    voltageDropPct: vdPct.toFixed(2),
                    vdOk: vdPct <= params.maxVDropPct,
                    conduitFillPct: fillPct.toFixed(1),
                    fillOk: fillPct <= 40,
                    conduitSize: params.conduitSize,
                    conduitType: params.conduitType,
                    ccc: params.ccc,
                    notes: generateNotes(params.material, cond.awg, params.continuous, params.ambientTempC, params.conduitHeightIn, params.ccc, vdPct, fillPct)
                };
                break;
            }
        }

        if (!recommended) {
            showError(elements.cableResult, 'No conductor found - increase conduit size, reduce load, or use parallel runs');
            return;
        }

        renderCableResult(recommended);
    }

    function calcVoltageDrop(material, awg, current, lengthFt, voltage, phase) {
        const R = cableCalcData.getDCResistance(material, awg);
        if (!R) return 999;

        if (phase === 'three') {
            return (1.732 * lengthFt * current * R) / 1000;
        }
        return (2 * lengthFt * current * R) / 1000;
    }

    function renderCableResult(r) {
        const html = `
            <div class="result-card success">
                <h3>✅ Recommended Conductor: ${r.material.toUpperCase()} ${r.awg} (${r.mm2} mm²)</h3>
                <div class="result-grid">
                    <div class="result-item">
                        <span class="label">Base Ampacity</span>
                        <span class="value">${r.baseAmp} A</span>
                    </div>
                    <div class="result-item">
                        <span class="label">Derated Ampacity</span>
                        <span class="value">${r.deratedAmp} A</span>
                    </div>
                    <div class="result-item">
                        <span class="label">Required Ampacity</span>
                        <span class="value">${r.requiredAmps} A</span>
                    </div>
                    <div class="result-item">
                        <span class="label">Total Derating Factor</span>
                        <span class="value">${(r.totalFactor * 100).toFixed(1)}%</span>
                    </div>
                    <div class="result-item">
                        <span class="label">Voltage Drop</span>
                        <span class="value ${r.vdOk ? 'ok' : 'warn'}">${r.voltageDrop} V (${r.voltageDropPct}%)</span>
                    </div>
                    <div class="result-item">
                        <span class="label">Conduit Fill</span>
                        <span class="value ${r.fillOk ? 'ok' : 'warn'}">${r.conduitFillPct}%</span>
                    </div>
                </div>
                <div class="notes-section">
                    <h4>Notes & Compliance</h4>
                    <ul>
                        ${r.notes.map(n => `<li>${n}</li>`).join('')}
                    </ul>
                </div>
            </div>
        `;
        elements.cableResult.innerHTML = html;
        elements.cableResult.className = 'result-container';
    }

    function generateNotes(material, awg, continuous, ambientTempC, conduitHeightIn, ccc, vdPct, fillPct) {
        const notes = [];
        if (continuous) notes.push('Continuous load: 125% factor applied per NEC 210.19/215.2');
        if (ambientTempC !== 30) notes.push(`Ambient temp ${ambientTempC}°C: correction factor applied`);
        if (conduitHeightIn > 0) {
            const adder = cableCalcData.getRooftopAdder(conduitHeightIn);
            notes.push(`Rooftop conduit (${conduitHeightIn} in): +${adder.adderF}°F (${adder.adderC}°C) adder per NEC 310.15(B)(3)(c)`);
        }
        if (ccc > 3) notes.push(`${ccc} CCC in raceway: ${(cableCalcData.getRacewayFillFactor(ccc) * 100).toFixed(0)}% fill factor per NEC 310.15(C)(1)`);
        if (vdPct > 3) notes.push(`⚠ Voltage drop ${vdPct.toFixed(1)}% exceeds 3% recommendation`);
        if (fillPct > 40) notes.push(`⚠ Conduit fill ${fillPct.toFixed(1)}% exceeds 40% limit`);
        return notes;
    }

    // ========================================
    // CONDUIT FILL CALCULATOR
    // ========================================
    function initConduitCalculator() {
        const form = elements.conduitForm;
        if (!form) return;

        form.addEventListener('submit', function(e) {
            e.preventDefault();
            calculateConduitFill();
        });

        populateSelect('conduitType', [
            { value: 'EMT', label: 'EMT (Steel)' },
            { value: 'RMC', label: 'RMC (Rigid Metal)' },
            { value: 'PVC40', label: 'PVC Schedule 40' },
            { value: 'PVC80', label: 'PVC Schedule 80' }
        ]);

        populateSelect('conduitSize', [
            '1/2', '3/4', '1', '1-1/4', '1-1/2', '2', '2-1/2', '3', '3-1/2', '4', '5', '6'
        ]);

        populateSelect('conduitInsulation', [
            { value: 'THHN', label: 'THHN/THWN' },
            { value: 'THWN', label: 'THWN' },
            { value: 'XHHW', label: 'XHHW' },
            { value: 'THW', label: 'THW' }
        ]);
    }

    function calculateConduitFill() {
        const form = elements.conduitForm;
        const data = conduitFillData;

        const params = {
            conduitType: form.conduitType.value,
            conduitSize: form.conduitSize.value,
            awg: form.conduitAWG.value,
            insulation: form.conduitInsulation.value,
            count: parseInt(form.conduitCount.value) || 1
        };

        const conduit = data.conduitData[params.conduitType]?.[params.conduitSize];
        if (!conduit) {
            showError(elements.conduitResult, 'Conduit size/type not found');
            return;
        }

        const area = data.getConductorArea(params.awg, params.insulation);
        if (!area) {
            showError(elements.conduitResult, 'Conductor size/insulation not found');
            return;
        }

        const totalArea = area * params.count;
        const allowedArea = conduit.area40; // 40% fill for >2 conductors
        const fillPct = (totalArea / conduit.internalArea) * 100;
        const compliant = fillPct <= 40;

        renderConduitResult({
            conduitType: params.conduitType,
            conduitSize: params.conduitSize,
            awg: params.awg,
            insulation: params.insulation,
            count: params.count,
            conductorArea: area,
            totalArea: totalArea.toFixed(3),
            internalArea: conduit.internalArea.toFixed(3),
            allowedArea: allowedArea.toFixed(3),
            fillPct: fillPct.toFixed(1),
            compliant,
            maxConductors: Math.floor(allowedArea / area)
        });
    }

    function renderConduitResult(r) {
        const html = `
            <div class="result-card ${r.compliant ? 'success' : 'error'}">
                <h3>${r.compliant ? '✅' : '❌'} ${r.compliant ? 'COMPLIANT' : 'EXCEEDS FILL LIMIT'}</h3>
                <div class="result-grid">
                    <div><strong>Conduit:</strong> ${r.conduitType} ${r.conduitSize} in</div>
                    <div><strong>Conductor:</strong> ${r.awg} ${r.insulation} (${r.count} conductors)</div>
                    <div><strong>Conductor Area:</strong> ${r.conductorArea} sq in each</div>
                    <div><strong>Total Conductor Area:</strong> ${r.totalArea} sq in</div>
                    <div><strong>Conduit Internal Area:</strong> ${r.internalArea} sq in</div>
                    <div><strong>Allowed Area (40%):</strong> ${r.allowedArea} sq in</div>
                    <div class="${r.compliant ? 'ok' : 'warn'}"><strong>Fill:</strong> ${r.fillPct}%</div>
                    <div><strong>Max Conductors This Size:</strong> ${r.maxConductors}</div>
                </div>
                ${!r.compliant ? `<p class="warn">Increase conduit size or reduce conductor count</p>` : ''}
            </div>
        `;
        elements.conduitResult.innerHTML = html;
        elements.conduitResult.className = 'result-container';
    }

    // ========================================
    // VOLTAGE DROP CALCULATOR
    // ========================================
    function initVoltageDropCalculator() {
        const form = elements.vdForm;
        if (!form) return;

        form.addEventListener('submit', function(e) {
            e.preventDefault();
            calculateVoltageDrop();
        });

        populateSelect('vdMaterial', [
            { value: 'copper', label: 'Copper' },
            { value: 'aluminum', label: 'Aluminum' }
        ]);

        populateSelect('vdAWG', [
            '14', '12', '10', '8', '6', '4', '3', '2', '1', '1/0', '2/0', '3/0', '4/0',
            '250', '300', '350', '400', '500', '600', '700', '750', '800', '900', '1000'
        ]);

        populateSelect('vdVoltage', [
            { value: '120', label: '120V' },
            { value: '208', label: '208V' },
            { value: '240', label: '240V' },
            { value: '277', label: '277V' },
            { value: '480', label: '480V' },
            { value: '600', label: '600V' }
        ]);
    }

    function calculateVoltageDrop() {
        const form = elements.vdForm;

        const params = {
            material: form.vdMaterial.value,
            awg: form.vdAWG.value,
            current: parseFloat(form.vdCurrent.value) || 0,
            length: parseFloat(form.vdLength.value) || 0,
            voltage: parseFloat(form.vdVoltage.value) || 240,
            phase: form.vdPhase.value
        };

        if (!params.current || !params.length) {
            showError(elements.vdResult, 'Enter current and length');
            return;
        }

        const R = cableCalcData.getDCResistance(params.material, params.awg);
        if (!R) {
            showError(elements.vdResult, 'Conductor resistance not found');
            return;
        }

        let vd;
        if (params.phase === 'three') {
            vd = (1.732 * params.length * params.current * R) / 1000;
        } else {
            vd = (2 * params.length * params.current * R) / 1000;
        }

        const vdPct = (vd / params.voltage) * 100;
        const ok = vdPct <= 3;

        renderVDResult({
            vd: vd.toFixed(2),
            vdPct: vdPct.toFixed(2),
            ok,
            voltage: params.voltage,
            phase: params.phase,
            material: params.material,
            awg: params.awg,
            current: params.current,
            length: params.length,
            R
        });
    }

    function renderVDResult(r) {
        const html = `
            <div class="result-card ${r.ok ? 'success' : 'warn'}">
                <h3>${r.ok ? '✅' : '⚠️'} Voltage Drop: ${r.vd} V (${r.vdPct}%)</h3>
                <div class="result-grid">
                    <div><strong>System:</strong> ${r.voltage}V ${r.phase === 'three' ? '3Ø' : '1Ø'}</div>
                    <div><strong>Conductor:</strong> ${r.material} ${r.awg}</div>
                    <div><strong>Current:</strong> ${r.current} A</div>
                    <div><strong>Length:</strong> ${r.length} ft</div>
                    <div><strong>DC Resistance:</strong> ${r.R} Ω/kft</div>
                    <div class="${r.ok ? 'ok' : 'warn'}"><strong>Drop:</strong> ${r.vd} V (${r.vdPct}%)</div>
                    <div class="${r.ok ? 'ok' : 'warn'}"><strong>Status:</strong> ${r.ok ? 'Within 3% limit' : 'EXCEEDS 3% - Increase conductor size or reduce length'}</div>
                </div>
                <details>
                    <summary>Formula</summary>
                    <code>Vd = ${r.phase === 'three' ? '1.732' : '2'} × L × I × R / 1000</code>
                </details>
            </div>
        `;
        elements.vdResult.innerHTML = html;
        elements.vdResult.className = 'result-container';
    }

    // ========================================
    // TEMPLATE DOWNLOADS
    // ========================================
    function initTemplateDownloads() {
        // Load template strings into memory
        window.templateStrings = {
            'cable-schedule': getCableScheduleTemplate(),
            'conduit-schedule': getConduitScheduleTemplate(),
            'panel-schedule': getPanelScheduleTemplate(),
            'conduit-schedule': getConduitScheduleTemplate(),
            'cable-pull-record': getCablePullTemplate()
        };
    }

    window.downloadTemplate = function(templateName) {
        const content = window.templateStrings[templateName];
        if (!content) return alert('Template not found');

        const blob = new Blob([content], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${templateName}.csv`;
        a.click();
        URL.revokeObjectURL(url);
    };

    // ========================================
    // UTILITY FUNCTIONS
    // ========================================
    function populateSelect(id, options) {
        const select = document.getElementById(id);
        if (!select) return;

        // Clear existing options except first
        while (select.options.length > 1) {
            select.remove(1);
        }

        options.forEach(opt => {
            const option = document.createElement('option');
            if (typeof opt === 'object') {
                option.value = opt.value;
                option.textContent = opt.label;
            } else {
                option.value = opt;
                option.textContent = opt;
            }
            select.appendChild(option);
        }
    }

    function showError(element, message) {
        element.innerHTML = `<div class="result-card error"><h3>❌ Error</h3><p>${message}</p></div>`;
        element.className = 'result-container';
    }

    function updateProgress() {
        // This will be called from the main app.js
    }

    // ========================================
    // TEMPLATE STRINGS
    // ========================================
    function getCableScheduleTemplate() {
        return `Project,Drawing,From,To,Circuit #,Load Description,Load (kW),Voltage,Phase,Load (A),PF,Continuous?,Diversity Factor,Design Current (A),Conductor Material,Conductor Size (AWG/kcmil),Insulation Type,Conduit Size,Conduit Type,Conduit Length (ft),# of CCC,Ambient Temp (°C),Rooftop?,Derated Ampacity,Voltage Drop (%),Notes
Project Alpha,E-101,MDP-1,Panel A,1,Lighting - Office,15,277,1,54,0.9,Yes,0.8,54,Copper,10,THHN,3/4,EMT,75,4,30,No,28,1.2,
Project Alpha,E-101,MDP-1,Panel A,2,Receptacles - Office,12,120,1,100,1.0,No,1.0,100,Copper,8,THHN,1,EMT,85,6,30,No,45,2.1,
Project Alpha,E-101,MDP-1,AHU-1,3,AHU-1 Motor,25,480,3,30,0.85,Yes,1.0,38,Copper,6,THHN,1-1/4,EMT,120,3,30,No,52,1.8,
Project Alpha,E-101,MDP-1,CHILLER,4,Chiller Compressor,150,480,3,180,0.88,Yes,1.0,225,Copper,4/0,THHN,3,RMC,200,3,40,Yes,245,2.5
`;
    }

    function getConduitScheduleTemplate() {
        return `Project,Drawing,Conduit Tag,From,To,Conduit Size,Conduit Type,Conduit Length (ft),# of Bends,Fill Type,Max Fill %,# of Conductors,Conductor Sizes,Insulation Type,Fill Area (sq in),Conduit Area 40% (sq in),Fill %,Compliant?,Pull Tension (lbs),Lubricant?,Notes
Project Alpha,E-101,C-001,MDP-1,Panel A,3,RMC,85,4,Power,40,4,4/0,THHN,0.3237,1.342,36.2%,Yes,450,Yes,Feeder to Panel A
Project Alpha,E-101,C-002,MDP-1,AHU-1,1-1/4,EMT,120,3,Power,40,3,6,THHN,0.1521,0.598,25.4%,Yes,280,Yes,AHU-1 Motor
Project Alpha,E-101,C-003,MDP-1,CHILLER,3,RMC,200,5,Power,40,3,4/0,THHN,0.3237,1.342,24.1%,Yes,850,Yes,Chiller Feeder
Project Alpha,E-101,C-004,Panel A,Lighting-1,3/4,EMT,75,2,Lighting,40,6,12,THHN,0.0798,0.213,37.5%,Yes,120,No,Lighting Circuit
Project Alpha,E-101,C-005,Panel A,REC-1,1,EMT,85,2,Receptacles,40,6,10,THHN,0.1266,0.346,36.6%,Yes,250,No,Receptacle Circuit
`;
    }

    function getPanelScheduleTemplate() {
        return `Panel Tag,Location,Voltage,Phase,Bus Rating (A),Main Breaker (A),Feed From,Circuit #,Description,Load (kW),Voltage,Phase,Load (A),Breaker (A),Poles,Wire Size,Conduit,Notes
MDP-1,Main Electrical Room,480/277,3Ø4W,800,600,Utility,1,Lighting - Floor 1,25,277,1,90,100,1,2,3/4 EMT,
MDP-1,Main Electrical Room,480/277,3Ø4W,800,600,Utility,2,Receptacles - Floor 1,20,120,1,167,200,1,2/0,1-1/4 EMT,
MDP-1,Main Electrical Room,480/277,3Ø4W,800,600,Utility,3,AHU-1,30,480,3,36,50,3,6,1-1/4 EMT,
MDP-1,Main Electrical Room,480/277,3Ø4W,800,600,Utility,4,Chiller,150,480,3,180,250,3,4/0,3 RMC,
Panel A,Electrical Room 1,208/120,3Ø4W,225,200,MDP-1,1,Lighting - Corridor,8,120,1,67,70,1,4,3/4 EMT,
Panel A,Electrical Room 1,208/120,3Ø4W,225,200,MDP-1,2,Receptacles - Office,12,120,1,100,125,1,3,1 EMT,
Panel A,Electrical Room 1,208/120,3Ø4W,225,200,MDP-1,3,Server Room UPS,15,208,3,42,50,3,8,3/4 EMT,
Panel B,Electrical Room 2,208/120,3Ø4W,225,200,MDP-1,1,Lighting - Floor 2,8,120,1,67,70,1,4,3/4 EMT,
Panel B,Electrical Room 2,208/120,3Ø4W,225,200,MDP-1,2,Receptacles - Lab,15,120,1,125,150,1,1/0,1-1/4 EMT,
Panel B,Electrical Room 2,208/120,3Ø4W,225,200,MDP-1,3,Fume Hoods,25,208,3,69,90,3,2,1 EMT
`;
    }

    function getCablePullRecordTemplate() {
        return `Project,Date,Conduit Tag,From,To,Conductor Type,Conductor Size,# Conductors,Pull Length (ft),Lubricant Used,Lubricant Qty (gal),Pulling Tension (lbs),Max Tension Rating (lbs),Sidewall Pressure (lbs/ft),Pull Time (min),Crew Size,Equipment Used,Measured Tension (lbs),Result,Notes
Project Alpha,2024-01-15,C-001,MDP-1,Panel A,THHN,8,6,85,Ideal ClearGlide,1,120,500,15,25,3,Power tug + rollers,95,Pass,
Project Alpha,2024-01-16,C-003,MDP-1,Chiller,THHN,4/0,3,200,Polywater,2,450,1200,45,60,4,Power tug + rollers + basket,410,Pass,
Project Alpha,2024-01-17,C-002,MDP-1,AHU-1,THHN,6,4,120,Ideal ClearGlide,1,280,800,20,40,3,Power tug,250,Pass
`;
    }
})();