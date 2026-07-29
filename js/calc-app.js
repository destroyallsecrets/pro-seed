// Calculator Application Logic
// Handles cable sizing, voltage drop, conduit fill, and other electrical calculations

// Initialize calculators when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize each calculator
    initCableCalculator();
    initConduitFillCalculator();
    initVoltageDropCalculator();
});

// Cable Sizing Calculator
function initCableCalculator() {
    const form = document.getElementById('cableCalcForm');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        calculateCableSize();
    });
    
    // Add reset button handler
    const resetBtn = document.getElementById('cableCalcReset');
    if (resetBtn) {
        resetBtn.addEventListener('click', function() {
            form.reset();
            document.getElementById('cableCalcResults').innerHTML = '';
        });
    }
}

function calculateCableSize() {
    // Get form values
    const loadKW = parseFloat(document.getElementById('loadKW').value) || 0;
    const voltage = parseFloat(document.getElementById('voltage').value) || 0;
    const phase = document.getElementById('phase').value;
    const pf = parseFloat(document.getElementById('pf').value) || 0.8;
    const continuous = document.getElementById('continuous').checked;
    const ambientC = parseFloat(document.getElementById('ambientC').value) || 30;
    const conduitType = document.getElementById('conduitType').value;
    const conductorCount = parseInt(document.getElementById('conductorCount').value) || 3;
    const rooftop = document.getElementById('rooftop').checked;
    const lengthFt = parseFloat(document.getElementById('lengthFt').value) || 0;
    const material = document.getElementById('material').value;
    const insulation = document.getElementById('insulation').value;
    const terminalsC = parseInt(document.getElementById('terminalsC').value) || 75;
    
    // Validate inputs
    if (loadKW <= 0 || voltage <= 0) {
        showError('cableCalcResults', 'Please enter valid load and voltage values');
        return;
    }
    
    // Calculate amperage
    let amps;
    if (phase === '1P') {
        amps = (loadKW * 1000) / (voltage * pf);
    } else { // 3P
        amps = (loadKW * 1000) / (voltage * pf * Math.sqrt(3));
    }
    
    // Apply 125% for continuous load
    if (continuous) {
        amps *= 1.25;
    }
    
    // Get base ampacity from tables
    let baseAmpacity = getBaseAmpacity(material, insulation, terminalsC);
    
    // Apply temperature correction
    const tempFactor = getTemperatureCorrectionFactor(insulation, ambientC);
    let adjustedAmpacity = baseAmpacity * tempFactor;
    
    // Apply conduit fill adjustment
    const fillFactor = getConduitFillFactor(conductorCount);
    adjustedAmpacity *= fillFactor;
    
    // Apply rooftop adder (NEC 310.15(B)(3)(c))
    let rooftopAdder = 0;
    if (rooftop) {
        if (lengthFt > 0) {
            // This is simplified - actual calculation depends on conduit height above roof
            rooftopAdder = 0.8; // Assume 80% adder for typical installation
        }
        adjustedAmpacity *= (1 - rooftopAdder); // Reduce ampacity for heat
    }
    
    // Find minimum wire size that meets requirements
    const wireSize = findMinWireSize(amps, adjustedAmpacity, material, insulation);
    
    // Calculate voltage drop
    const vdResult = calculateVoltageDrop(wireSize, lengthFt, amps, voltage, phase, material);
    
    // Check conduit fill
    const conduitSize = getMinConduitSize(wireSize, conductorCount, conduitType);
    
    // Display results
    displayCableResults({
        amps: amps,
        wireSize: wireSize,
        baseAmpacity: baseAmpacity,
        tempFactor: tempFactor,
        fillFactor: fillFactor,
        rooftopAdder: rooftopAdder,
        adjustedAmpacity: adjustedAmpacity,
        voltageDrop: vdResult,
        conduitSize: conduitSize,
        conduitFillSize: fillSize
    });
}

function getBaseAmpacity(material, insulation, terminalsC) {
    // Simplified - in reality would lookup from NEC Table 310.16
    // This is a placeholder implementation
    const baseTable = {
        CU: {
            THHN: { 60: 65, 75: 75, 90: 85 },
            THWN: { 60: 65, 75: 75, 90: 85 },
            XHHW: { 60: 65, 75: 75, 90: 85 }
        },
        AL: {
            THHN: { 60: 50, 75: 65, 90: 70 },
            THWN: { 60: 50, 75: 65, 90: 70 },
            XHHW: { 60: 50, 75: 65, 90: 70 }
        }
    };
    
    const tempRating = Object.keys(baseTable[material][insulation]).find(t => parseInt(t) >= terminalsC) || 90;
    return baseTable[material][insulation][tempRating];
}

function getTemperatureCorrectionFactor(insulation, ambientC) {
    // Simplified temperature correction factors
    // Based on NEC Table 310.15(B)(2)(a)
    const factors = {
        THHN: { 10: 1.29, 15: 1.22, 20: 1.15, 25: 1.08, 30: 1.0, 35: 0.91, 40: 0.82, 45: 0.71, 50: 0.58, 55: 0.41, 60: 0 },
        THWN: { 10: 1.29, 15: 1.22, 20: 1.15, 25: 1.08, 30: 1.0, 35: 0.91, 40: 0.82, 45: 0.71, 50: 0.58, 55: 0.41, 60: 0 },
        XHHW: { 10: 1.29, 15: 1.22, 20: 1.15, 25: 1.08, 30: 1.0, 35: 0.91, 40: 0.82, 45: 0.71, 50: 0.58, 55: 0.41, 60: 0 }
    };
    
    // Find closest temperature
    const temps = Object.keys(factors[insulation]).map(Number);
    let closestTemp = temps[0];
    let minDiff = Math.abs(temps[0] - ambientC);
    
    for (let i = 1; i < temps.length; i++) {
        const diff = Math.abs(temps[i] - ambientC);
        if (diff < minDiff) {
            minDiff = diff;
            closestTemp = temps[i];
        }
    }
    
    return factors[insulation][closestTemp];
}

function getConduitFillFactor(conductorCount) {
    // Based on NEC Table 1, Chapter 9
    // More than 2 conductors: 40% fill
    // 2 conductors: 31% fill
    // 1 conductor: 53% fill
    if (conductorCount > 2) return 0.40;
    if (conductorCount === 2) return 0.31;
    return 0.53;
}

function findMinWireSize(requiredAmps, availableAmps, material, insulation) {
    // Simplified wire sizes - in reality would use AWG/kcmil table
    const wireSizes = [
        { size: '14 AWG', ampacity: 20 },
        { size: '12 AWG', ampacity: 25 },
        { size: '10 AWG', ampacity: 35 },
        { size: '8 AWG', ampacity: 50 },
        { size: '6 AWG', ampacity: 65 },
        { size: '4 AWG', ampacity: 85 },
        { size: '2 AWG', ampacity: 115 },
        { size: '1 AWG', ampacity: 130 },
        { size: '1/0 AWG', ampacity: 150 },
        { size: '2/0 AWG', ampacity: 175 },
        { size: '3/0 AWG', ampacity: 200 },
        { size: '4/0 AWG', ampacity: 230 },
        { size: '250 kcmil', ampacity: 255 },
        { size: '300 kcmil', ampacity: 285 },
        { size: '350 kcmil', ampacity: 310 },
        { size: '400 kcmil', ampacity: 335 },
        { size: '500 kcmil', ampacity: 380 },
        { size: '600 kcmil', ampacity: 420 },
        { size: '700 kcmil', ampacity: 460 },
        { size: '750 kcmil', ampacity: 475 },
        { size: '800 kcmil', ampacity: 490 },
        { size: '900 kcmil', ampacity: 505 },
        { size: '1000 kcmil', ampacity: 545 }
    ];
    
    // Adjust ampacity for temperature (this would be done in the main calc)
    // For now, just find first wire that meets requirement
    for (const wire of wireSizes) {
        if (wire.ampacity >= requiredAmps) {
            return wire.size;
        }
    }
    
    return '1000 kcmil+ (multiple parallel runs)';
}

function calculateVoltageDrop(wireSize, lengthFt, amps, voltage, phase, material) {
    // Simplified voltage drop calculation
    // Using approximate resistance values (ohms/1000ft)
    const resistancePer1000Ft = {
        '14 AWG': { CU: 2.525, AL: 4.12 },
        '12 AWG': { CU: 1.588, AL: 2.59 },
        '10 AWG': { CU: 0.999, AL: 1.63 },
        '8 AWG': { CU: 0.628, AL: 1.02 },
        '6 AWG': { CU: 0.395, AL: 0.645 },
        '4 AWG': { CU: 0.249, AL: 0.405 },
        '2 AWG': { CU: 0.156, AL: 0.255 },
        '1 AWG': { CU: 0.124, AL: 0.202 },
        '1/0 AWG': { CU: 0.0982, AL: 0.160 },
        '2/0 AWG': { CU: 0.0779, AL: 0.127 },
        '3/0 AWG': { CU: 0.0618, AL: 0.101 },
        '4/0 AWG': { CU: 0.0490, AL: 0.080 }
    };
    
    // Get resistance for wire size (simplified - would need to handle kcmil sizes)
    let resistance = 0.02; // Default for larger sizes
    for (const [size, vals] of Object.entries(resistancePer1000Ft)) {
        if (wireSize.includes(size)) {
            resistance = vals[material];
            break;
        }
    }
    
    // Calculate voltage drop
    const resistancePerFt = resistance / 1000;
    let vd;
    if (phase === '1P') {
        vd = 2 * lengthFt * resistancePerFt * amps; // L-N-L
    } else { // 3P
        vd = Math.sqrt(3) * lengthFt * resistancePerFt * amps;
    }
    
    const vdPercent = (vd / voltage) * 100;
    const vdVolts = vd;
    
    return {
        volts: vdVolts,
        percent: vdPercent,
        within3Percent: vdPercent <= 3,
        within5Percent: vdPercent <= 5
    };
}

function getMinConduitSize(wireSize, conductorCount, conduitType) {
    // Simplified conduit sizing - would use actual cross-sectional areas
    // This is a placeholder implementation
    const areaPerWire = {
        '14 AWG': 0.0139,
        '12 AWG': 0.0181,
        '10 AWG': 0.0243,
        '8 AWG': 0.0366,
        '6 AWG': 0.0503,
        '4 AWG': 0.0824,
        '2 AWG': 0.1309,
        '1 AWG': 0.1563,
        '1/0 AWG': 0.1855,
        '2/0 AWG': 0.2336,
        '3/0 AWG': 0.2942,
        '4/0 AWG': 0.3707
    };
    
    let totalArea = 0;
    for (const [size, area] of Object.entries(areaPerWire)) {
        if (wireSize.includes(size)) {
            totalArea = area * conductorCount;
            break;
        }
    }
    
    // Default area for larger wires
    if (totalArea === 0) {
        totalArea = 0.5 * conductorCount; // Approximation for large wires
    }
    
    // Conduit internal areas (simplified)
    const conduitAreas = {
        EMT: { '1/2"': 0.304, '3/4"': 0.533, '1"': 0.864, '1-1/4"': 1.496, '1-1/2"': 2.036, '2"': 3.356 },
        PVC: { '1/2"': 0.122, '3/4"': 0.213, '1"': 0.346, '1-1/4"': 0.598, '1-1/2"': 0.814, '2"': 1.342 },
        RMC: { '1/2"': 0.304, '3/4"': 0.533, '1"': 0.864, '1-1/4"': 1.496, '1-1/2"': 2.036, '2"': 3.356 }
    };
    
    const areas = conduitAreas[conduitType] || conduitAreas.EMT;
    for (const [size, area] of Object.entries(entries).sort((a, b) => parseFloat(a[0]) - parseFloat(b[0]))) {
        if (area >= totalArea * 0.4) { // 40% fill limit
            return size;
        }
    }
    
    return '2" or larger';
}

function displayCableResults(results) {
    const resultsDiv = document.getElementById('cableCalcResults');
    if (!resultsDiv) return;
    
    let html = `
        <h3>Calculation Results</h3>
        <div class="results-grid">
            <div class="result-item">
                <label>Load Current:</label>
                <span>${results.amps.toFixed(2)} A</span>
            </div>
            <div class="result-item">
                <label>Base Ampacity (Table 310.16):</label>
                <span>${results.baseAmpacity} A</span>
            </div>
            <div class="result-item">
                <label>Temperature Correction Factor:</label>
                <span>${results.tempFactor.toFixed(2)}</span>
            </div>
            <div class="result-item">
                <label>Conduit Fill Adjustment:</label>
                <span>${(results.fillFactor * 100).toFixed(0)}%</span>
            </div>
    `;
    
    if (results.rooftopAdder > 0) {
        html += `
            <div class="result-item">
                <label>Rooftop Adder:</label>
                <span>${(results.rooftopAdder * 100).toFixed(0)}%</span>
            </div>
        `;
    }
    
    html += `
            <div class="result-item">
                <label>Adjusted Ampacity:</label>
                <span>${results.adjustedAmpacity.toFixed(2)} A</span>
            </div>
            <div class="result-item">
                <label>Minimum Wire Size:</label>
                <span class="result-value">${results.wireSize}</span>
            </div>
            <div class="result-item">
                <label>Voltage Drop:</label>
                <span>${results.voltageDrop.volts.toFixed(2)} V (${results.voltageDrop.percent.toFixed(2)}%)</span>
            </div>
            <div class="result-item">
                <label>Within 3% (Branch):</label>
                <span class="${results.voltageDrop.within3Percent ? 'pass' : 'fail'}">
                    ${results.voltageDrop.within3Percent ? 'Yes' : 'No'}
                </span>
            </div>
            <div class="result-item">
                <label>Within 5% (Feeder):</label>
                <span class="${results.voltageDrop.within5Percent ? 'pass' : 'fail'}">
                    ${results.voltageDrop.within5Percent ? 'Yes' : 'No'}
                </span>
            </div>
            <div class="result-item">
                <label>Minimum Conduit Size:</label>
                <span>${results.conduitSize}</span>
            </div>
        </div>
    `;
    
    resultsDiv.innerHTML = html;
}

function showError(elementId, message) {
    const el = document.getElementById(elementId);
    if (el) {
        el.innerHTML = `<div class="error-message">${message}</div>`;
    }
}

// Conduit Fill Calculator
function initConduitFillCalculator() {
    const form = document.getElementById('conduitFillForm');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        calculateConduitFill();
    });
    
    const resetBtn = document.getElementById('conduitFillReset');
    if (resetBtn) {
        resetBtn.addEventListener('click', function() {
            form.reset();
            document.getElementById('conduitFillResults').innerHTML = '';
            const conductorsDiv = document.getElementById('conductorEntries');
            if (conductorsDiv) conductorsDiv.innerHTML = '';
            addConductorRow(); // Add one empty row
        });
    }
    
    // Add conductor row handler
    const addBtn = document.getElementById('addConductor');
    if (addBtn) {
        addBtn.addEventListener('click', addConductorRow);
    }
    
    // Initialize with one row
    addConductorRow();
}

function addConductorRow() {
    const container = document.getElementById('conductorEntries');
    if (!container) return;
    
    const rowIndex = container.children.length;
    const row = document.createElement('div');
    row.className = 'conductor-row';
    row.innerHTML = `
        <div class="form-group">
            <label>Conductor Size:</label>
            <select class="form-control" name="conductorSize_${rowIndex}">
                <option value="14 AWG">14 AWG</option>
                <option value="12 AWG">12 AWG</option>
                <option value="10 AWG">10 AWG</option>
                <option value="8 AWG">8 AWG</option>
                <option value="6 AWG">6 AWG</option>
                <option value="4 AWG">4 AWG</option>
                <option value="2 AWG">2 AWG</option>
                <option value="1 AWG">1 AWG</option>
                <option value="1/0 AWG">1/0 AWG</option>
                <option value="2/0 AWG">2/0 AWG</option>
                <option value="3/0 AWG">3/0 AWG</option>
                <option value="4/0 AWG">4/0 AWG</option>
                <option value="250 kcmil">250 kcmil</option>
                <option value="300 kcmil">300 kcmil</option>
                <option value="350 kcmil">350 kcmil</option>
                <option value="400 kcmil">400 kcmil</option>
                <option value="500 kcmil">500 kcmil</option>
                <option value="600 kcmil">600 kcmil</option>
            </select>
        </div>
        <div class="form-group">
            <label>Insulation:</label>
            <select class="form-control" name="insulation_${rowIndex}">
                <option value="THHN">THHN/THWN</option>
                <option value="XHHW">XHHW/XHHW-2</option>
                <option value="RHH">RHH/RHW-2</option>
                <option value="USE">USE-2</option>
            </select>
        </div>
        <div class="form-group">
            <label>Quantity:</label>
            <input type="number" class="form-control" name="count_${rowIndex}" value="1" min="1">
        </div>
        <button type="button" class="btn btn-danger remove-conductor" onclick="this.parentElement.remove()">Remove</button>
    `;
    
    container.appendChild(row);
}

function calculateConduitFill() {
    const form = document.getElementById('conduitFillForm');
    const conduitType = document.getElementById('conduitFillType').value;
    
    // Gather conductor data
    const rows = document.querySelectorAll('.conductor-row');
    let totalArea = 0;
    let conductorDetails = [];
    
    const areaPerWire = {
        '14 AWG': { THHN: 0.0139, XHHW: 0.0156, RHH: 0.0187, USE: 0.0211 },
        '12 AWG': { THHN: 0.0181, XHHW: 0.0205, RHH: 0.0240, USE: 0.0274 },
        '10 AWG': { THHN: 0.0243, XHHW: 0.0274, RHH: 0.0320, USE: 0.0365 },
        '8 AWG': { THHN: 0.0366, XHHW: 0.0410, RHH: 0.0484, USE: 0.0550 },
        '6 AWG': { THHN: 0.0503, XHHW: 0.0563, RHH: 0.0662, USE: 0.0752 },
        '4 AWG': { THHN: 0.0824, XHHW: 0.0908, RHH: 0.1058, USE: 0.1194 },
        '2 AWG': { THHN: 0.1309, XHHW: 0.1415, RHH: 0.1633, USE: 0.1828 },
        '1 AWG': { THHN: 0.1563, XHHW: 0.1680, RHH: 0.1922, USE: 0.2136 },
        '1/0 AWG': { THHN: 0.1855, XHHW: 0.1985, RHH: 0.2253, USE: 0.2493 },
        '2/0 AWG': { THHN: 0.2336, XHHW: 0.2482, RHH: 0.2790, USE: 0.3080 },
        '3/0 AWG': { THHN: 0.2942, XHHW: 0.3122, RHH: 0.3501, USE: 0.3859 },
        '4/0 AWG': { THHN: 0.3707, XHHW: 0.3920, RHH: 0.4383, USE: 0.4818 }
    };
    
    rows.forEach((row, index) => {
        const sizeSelect = row.querySelector(`select[name="conductorSize_${index}"]`);
        const insulationSelect = row.querySelector(`select[name="insulation_${index}"]`);
        const countInput = row.querySelector(`input[name="count_${index}"]`);
        
        if (sizeSelect && insulationSelect && countInput) {
            const size = sizeSelect.value;
            const insulation = insulationSelect.value;
            const count = parseInt(countInput.value) || 1;
            
            const areaKey = `${size.replace(' ', '')}_${insulation}`;
            let areaPerWire = 0.02; // Default
            
            // Find matching area
            for (const [key, value] of Object.entries(areaPerWire)) {
                if (key.startsWith(size.replace(' ', '')) && 
                    Object.keys(value).includes(insulation)) {
                    areaPerWire = value[insulation];
                    break;
                }
            }
            
            totalArea += areaPerWire * count;
            conductorDetails.push({ size, insulation, count, area: areaPerWire * count });
        }
    });
    
    // Get conduit area
    const conduitAreas = {
        EMT: { '1/2"': 0.304, '3/4"': 0.533, '1"': 0.864, '1-1/4"': 1.496, '1-1/2"': 2.036, '2"': 3.356, '2-1/2"': 4.788, '3"': 6.552, '3-1/2"': 8.278, '4"': 10.277 },
        PVC: { '1/2"': 0.122, '3/4"': 0.213, '1"': 0.346, '1-1/4"': 0.598, '1-1/2"': 0.814, '2"': 1.342, '2-1/2"': 1.924, '3"': 2.748, '3-1/2"': 3.659, '4"': 4.771 },
        RMC: { '1/2"': 0.304, '3/4"': 0.533, '1"': 0.864, '1-1/4"': 1.496, '1-1/2"': 2.036, '2"': 3.356, '2-1/2"': 4.788, '3"': 6.552, '3-1/2"': 8.278, '4"': 10.277 }
    };
    
    const areas = conduitAreas[conduitType] || conduitAreas.EMT;
    let conduitSize = '1/2"';
    let fillPercent = 0;
    
    // Find smallest conduit that can accommodate the wires (max 40% fill for >2 wires)
    const maxFillPercent = 0.40; // More than 2 conductors
    const sortedSizes = Object.keys(areas).sort((a, b) => {
        const numA = parseFloat(a.replace('"', ''));
        const numB = parseFloat(b.replace('"', ''));
        return numA - numB;
    });
    
    for (const size of sortedSizes) {
        if (areas[size] >= totalArea / maxFillPercent) {
            conduitSize = size;
            fillPercent = (totalArea / areas[size]) * 100;
            break;
        }
    }
    
    // If no size found, use largest
    if (fillPercent === 0) {
        conduitSize = sortedSizes[sortedSizes.length - 1];
        fillPercent = (totalArea / areas[conduitSize]) * 100;
    }
    
    // Display results
    const resultsDiv = document.getElementById('conduitFillResults');
    if (!resultsDiv) return;
    
    let html = `
        <h3>Conduit Fill Results</h3>
        <div class="results-grid">
            <div class="result-item">
                <label>Total Conductor Area:</label>
                <span>${totalArea.toLocaleString(undefined, { minimumFractionDigits: 4, maximumFractionDigits: 4 })} in²</span>
            </div>
            <div class="result-item">
                <label>Conduit Type:</label>
                <span>${conduitType}</span>
            </div>
            <div class="result-item">
                <label>Recommended Conduit Size:</label>
                <span class="result-value">${conduitSize}</span>
            </div>
            <div class="result-item">
                <label>Conduit Fill Percentage:</label>
                <span class="${fillPercent <= 40 ? 'pass' : 'fail'}">
                    ${fillPercent.toFixed(2)}%
                </span>
            </div>
            <div class="result-item">
                <label>Within 40% Limit:</label>
                <span class="${fillPercent <= 40 ? 'pass' : 'fail'}">
                    ${fillPercent <= 40 ? 'Yes' : 'No'}
                </span>
            </div>
        </div>
        <h4>Conductor Details:</h4>
        <ul>
    `;
    
    conductorDetails.forEach((cond, index) => {
        html += `<li>${cond.count} × ${cond.size} ${cond.insulation} = ${cond.area.toFixed(4)} in²</li>`;
    });
    
    html += `</ul>`;
    
    if (fillPercent > 40) {
        html += `<div class="warning">Warning: Conduit fill exceeds 40% maximum for more than 2 conductors. Consider larger conduit may be needed.</div>`;
    }
    
    resultsDiv.innerHTML = html;
}

// Voltage Drop Calculator
function initVoltageDropCalculator() {
    const form = document.getElementById('voltageDropForm');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        calculateVoltageDrop();
    });
    
    const resetBtn = document.getElementById('voltageDropReset');
    if (resetBtn) {
        resetBtn.addEventListener('click', function() {
            form.reset();
            document.getElementById('voltageDropResults').innerHTML = '';
        });
    }
}

function calculateVoltageDrop() {
    // Get form values
    const voltage = parseFloat(document.getElementById('vdVoltage').value) || 0;
    const lengthFt = parseFloat(document.getElementById('vdLength').value) || 0;
    const amps = parseFloat(document.getElementById('vdAmps').value) || 0;
    const phase = document.getElementById('vdPhase').value;
    const material = document.getElementById('vdMaterial').value;
    const wireSize = document.getElementById('vdWireSize').value;
    const conduit = document.getElementById('vdConduit').value;
    
    // Validate inputs
    if (voltage <= 0 || lengthFt <= 0 || amps <= 0) {
        showError('voltageDropResults', 'Please enter valid voltage, length, and current values');
        return;
    }
    
    // Calculate voltage drop (reuse from cable calculator)
    const vdResult = calculateVoltageDropFromSize(wireSize, lengthFt, amps, voltage, phase, material, conduit);
    
    // Display results
    displayVoltageDropResults(vdResult, voltage);
}

function calculateVoltageDropFromSize(wireSize, lengthFt, amps, voltage, phase, material, conduit) {
    // Resistance per 1000 ft (ohms) - simplified table
    const resistancePer1000Ft = {
        '14 AWG': { CU: 2.525, AL: 4.12 },
        '12 AWG': { CU: 1.588, AL: 2.59 },
        '10 AWG': { CU: 0.999, AL: 1.63 },
        '8 AWG': { CU: 0.628, AL: 1.02 },
        '6 AWG': { CU: 0.395, AL: 0.645 },
        '4 AWG': { CU: 0.249, AL: 0.405 },
        '2 AWG': { CU: 0.156, AL: 0.255 },
        '1 AWG': { CU: 0.124, AL: 0.202 },
        '1/0 AWG': { CU: 0.0982, AL: 0.160 },
        '2/0 AWG': { CU: 0.0779, AL: 0.127 },
        '3/0 AWG': { CU: 0.0618, AL: 0.101 },
        '4/0 AWG': { CU: 0.0490, AL: 0.080 },
        '250 kcmil': { CU: 0.0423, AL: 0.069 },
        '300 kcmil': { CU: 0.0353, AL: 0.058 },
        '350 kcmil': { CU: 0.0302, AL: 0.049 },
        '400 kcmil': { CU: 0.0264, AL: 0.043 },
        '500 kcmil': { CU: 0.0211, AL: 0.035 },
        '600 kcmil': { CU: 0.0176, AL: 0.029 },
        '700 kcmil': { CU: 0.0151, AL: 0.025 },
        '750 kcmil': { CU: 0.0141, AL: 0.023 },
        '800 kcmil': { CU: 0.0132, AL: 0.022 },
        '900 kcmil': { CU: 0.0117, AL: 0.020 },
        '1000 kcmil': { CU: 0.0105, AL: 0.017 }
    };
    
    // Find resistance for wire size
    let resistance = 0.0105; // Default for 1000 kcmil CU
    for (const [size, vals] of Object.entries(resistancePer1000Ft)) {
        if (wireSize.startsWith(size)) {
            resistance = vals[material];
            break;
        }
    }
    
    // Adjust for temperature if needed (simplified - assume 75°C)
    // In reality would need to adjust based on actual temperature
    
    // Adjust for conduit (if PVC, increase resistance slightly due to temperature)
    let conduitFactor = 1.0;
    if (conduit === 'PVC') {
        conduitFactor = 1.1; // Approximate adjustment for PVC conduit heating
    }
    
    resistance *= conduitFactor;
    
    // Calculate voltage drop
    const resistancePerFt = resistance / 1000;
    let vd;
    if (phase === '1P') {
        vd = 2 * lengthFt * resistancePerFt * amps; // L-N-L
    } else { // 3P
        vd = Math.sqrt(3) * lengthFt * resistancePerFt * amps;
    }
    
    const vdPercent = (vd / voltage) * 100;
    const vdVolts = vd;
    
    return {
        volts: vdVolts,
        percent: vdPercent,
        within3Percent: vdPercent <= 3,
        within5Percent: vdPercent <= 5
    };
}

function displayVoltageDropResults(result, voltage) {
    const resultsDiv = document.getElementById('voltageDropResults');
    if (!resultsDiv) return;
    
    let html = `
        <h3>Voltage Drop Results</h3>
        <div class="results-grid">
            <div class="result-item">
                <label>Voltage Drop:</label>
                <span>${result.volts.toFixed(2)} V</span>
            </div>
            <div class="result-item">
                <label>Voltage Drop Percentage:</label>
                <span class="${result.within3Percent ? 'success' : result.within5Percent ? 'warning' : 'error'}">
                    ${result.percent.toFixed(2)}%
                </span>
            </div>
            <div class="result-item">
                <label>Source Voltage:</label>
                <span>${voltage} V</span>
            </div>
            <div class="result-item">
                <label>Voltage at Load:</label>
                <span>${(voltage - result.volts).toFixed(2)} V</span>
            </div>
            <div class="result-item">
                <label>Within 3% (Branch Circuit Limit):</label>
                <span class="${result.within3Percent ? 'pass' : 'fail'}">
                    ${result.within3Percent ? 'Yes' : 'No'}
                </span>
            </div>
            <div class="result-item">
                <label>Within 5% (Feeder/Branch Circuit Limit):</label>
                <span class="${result.within5Percent ? 'pass' : 'fail'}">
                    ${result.within5Percent ? 'Yes' : 'No'}
                </span>
            </div>
        </div>
    `;
    
    if (!result.within3Percent) {
        html += `<div class="warning">Warning: Voltage drop exceeds 3% recommended for branch circuits.</div>`;
    }
    
    if (!result.within5Percent) {
        html += `<div class="error">Error: Voltage drop exceeds 5% maximum for feeders and branch circuits.</div>`;
    }
    
    resultsDiv.innerHTML = html;
}