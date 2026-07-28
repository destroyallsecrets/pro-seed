// Cable Sizing + Derating + Voltage Drop Calculator
// NEC 2023: 310.15, 310.16, 310.60, 210.19, 215.2, 220.87, 230.42, Ch.9 Tables 1,4,5,8

const cableCalcData = {
    // NEC Table 310.16 - Copper, 75°C, 3 CCC in raceway/cable/earth
    copper75: [
        { awg: '14', mm2: 2.08, amp: 15 },
        { awg: '12', mm2: 3.31, amp: 20 },
        { awg: '10', mm2: 5.26, amp: 30 },
        { awg: '8',  mm2: 8.37, amp: 50 },
        { awg: '6',  mm2: 13.3, amp: 65 },
        { awg: '4',  mm2: 21.2, amp: 85 },
        { awg: '3',  mm2: 26.7, amp: 100 },
        { awg: '2',  mm2: 33.6, amp: 115 },
        { awg: '1',  mm2: 42.4, amp: 130 },
        { awg: '1/0', mm2: 53.5, amp: 150 },
        { awg: '2/0', mm2: 67.4, amp: 175 },
        { awg: '3/0', mm2: 85.0, amp: 200 },
        { awg: '4/0', mm2: 107, amp: 230 },
        { awg: '250', mm2: 127, amp: 255 },
        { awg: '300', mm2: 152, amp: 285 },
        { awg: '350', mm2: 177, amp: 310 },
        { awg: '400', mm2: 203, amp: 335 },
        { awg: '500', mm2: 253, amp: 380 },
        { awg: '600', mm2: 304, amp: 420 },
        { awg: '700', mm2: 355, amp: 460 },
        { awg: '750', mm2: 380, amp: 475 },
        { awg: '800', mm2: 405, amp: 490 },
        { awg: '900', mm2: 456, amp: 520 },
        { awg: '1000', mm2: 507, amp: 545 },
        { awg: '1250', mm2: 633, amp: 590 },
        { awg: '1500', mm2: 760, amp: 625 },
        { awg: '1750', mm2: 887, amp: 650 },
        { awg: '2000', mm2: 1010, amp: 665 }
    ],

    // NEC Table 310.16 - Aluminum, 75°C
    aluminum75: [
        { awg: '12', mm2: 3.31, amp: 15 },
        { awg: '10', mm2: 5.26, amp: 25 },
        { awg: '8',  mm2: 8.37, amp: 40 },
        { awg: '6',  mm2: 13.3, amp: 50 },
        { awg: '4',  mm2: 21.2, amp: 65 },
        { awg: '3',  mm2: 26.7, amp: 75 },
        { awg: '2',  mm2: 33.6, amp: 90 },
        { awg: '1',  mm2: 42.4, amp: 100 },
        { awg: '1/0', mm2: 53.5, amp: 120 },
        { awg: '2/0', mm2: 67.4, amp: 135 },
        { awg: '3/0', mm2: 85.0, amp: 155 },
        { awg: '4/0', mm2: 107, amp: 180 },
        { awg: '250', mm2: 127, amp: 205 },
        { awg: '300', mm2: 152, amp: 230 },
        { awg: '350', mm2: 177, amp: 250 },
        { awg: '400', mm2: 203, amp: 270 },
        { awg: '500', mm2: 253, amp: 310 },
        { awg: '600', mm2: 304, amp: 340 },
        { awg: '700', mm2: 355, amp: 375 },
        { awg: '750', mm2: 380, amp: 385 },
        { awg: '800', mm2: 405, amp: 395 },
        { awg: '900', mm2: 456, amp: 425 },
        { awg: '1000', mm2: 507, amp: 445 },
        { awg: '1250', mm2: 633, amp: 485 },
        { awg: '1500', mm2: 760, amp: 520 },
        { awg: '1750', mm2: 887, amp: 545 },
        { awg: '2000', mm2: 1010, amp: 560 }
    ],

    // NEC Table 310.15(B)(1) - Ambient Temperature Correction Factors (75°C)
    tempCorrection75: [
        { tempC: 10, tempF: 50, factor: 1.29 },
        { tempC: 15, tempF: 59, factor: 1.22 },
        { tempC: 20, tempF: 68, factor: 1.15 },
        { tempC: 25, tempF: 77, factor: 1.08 },
        { tempC: 30, tempF: 86, factor: 1.00 },
        { tempC: 35, tempF: 95, factor: 0.91 },
        { tempC: 40, tempF: 104, factor: 0.82 },
        { tempC: 45, tempF: 113, factor: 0.71 },
        { tempC: 50, tempF: 122, factor: 0.58 },
        { tempC: 55, tempF: 131, factor: 0.41 },
        { tempC: 60, tempF: 140, factor: 0.00 }
    ],

    // NEC Table 310.15(C)(1) - Raceway Fill Adjustment (>3 CCC)
    racewayFill: [
        { ccc: 4, factor: 0.80 },
        { ccc: 5, factor: 0.80 },
        { ccc: 6, factor: 0.80 },
        { ccc: 7, factor: 0.70 },
        { ccc: 8, factor: 0.70 },
        { ccc: 9, factor: 0.70 },
        { ccc: 10, factor: 0.70 },
        { ccc: 11, factor: 0.70 },
        { ccc: 12, factor: 0.70 },
        { ccc: 13, factor: 0.70 },
        { ccc: 14, factor: 0.70 },
        { ccc: 15, factor: 0.70 },
        { ccc: 16, factor: 0.70 },
        { ccc: 17, factor: 0.70 },
        { ccc: 18, factor: 0.70 },
        { ccc: 19, factor: 0.70 },
        { ccc: 20, factor: 0.70 },
        { ccc: 21, factor: 0.70 },
        { ccc: 22, factor: 0.70 },
        { ccc: 23, factor: 0.70 },
        { ccc: 24, factor: 0.70 },
        { ccc: 25, factor: 0.70 },
        { ccc: 25, factor: 0.60 },
        { ccc: 26, factor: 0.60 },
        { ccc: 27, factor: 0.60 },
        { ccc: 28, factor: 0.60 },
        { ccc: 29, factor: 0.60 },
        { ccc: 30, factor: 0.60 },
        { ccc: 40, factor: 0.60 },
        { ccc: 50, factor: 0.60 },
        { ccc: 60, factor: 0.60 }
    ],

    // NEC 310.15(B)(3)(c) - Rooftop Conduit Temperature Adder
    rooftopAdder: [
        { heightIn: 0.5, adderF: 30, adderC: 17 },
        { heightIn: 1.5, adderF: 26, adderC: 14 },
        { heightIn: 3.5, adderF: 22, adderC: 12 },
        { heightIn: 12,  adderF: 14, adderC: 8 },
        { heightIn: 36,  adderF: 0,  adderC: 0 }
    ],

    // Chapter 9 Table 8 - Conductor DC Resistance (ohms/kft at 75°C)
    dcResistance: {
        copper: {
            '14': 3.07, '12': 1.93, '10': 1.21, '8': 0.778,
            '6': 0.491, '4': 0.308, '3': 0.245, '2': 0.194,
            '1': 0.154, '1/0': 0.122, '2/0': 0.0967, '3/0': 0.0766,
            '4/0': 0.0608, '250': 0.0515, '300': 0.0429, '350': 0.0368,
            '400': 0.0321, '500': 0.0258, '600': 0.0214, '700': 0.0184,
            '750': 0.0171, '800': 0.0161, '900': 0.0143, '1000': 0.0129,
            '1250': 0.0104, '1500': 0.0086, '1750': 0.0074, '2000': 0.0065
        },
        aluminum: {
            '12': 3.08, '10': 1.94, '8': 1.23, '6': 0.774,
            '4': 0.482, '3': 0.383, '2': 0.304, '1': 0.241,
            '1/0': 0.191, '2/0': 0.152, '3/0': 0.120, '4/0': 0.095,
            '250': 0.080, '300': 0.067, '350': 0.057, '400': 0.050,
            '500': 0.040, '600': 0.033, '700': 0.028, '750': 0.026,
            '800': 0.025, '900': 0.022, '1000': 0.020, '1250': 0.016,
            '1500': 0.013, '1750': 0.011, '2000': 0.010
        }
    },

    // Chapter 9 Table 5 - Conductor Area (sq in) for THHN/THWN
    conductorArea: {
        '14': 0.0097, '12': 0.0133, '10': 0.0211, '8': 0.0366,
        '6': 0.0507, '4': 0.0824, '3': 0.0973, '2': 0.1158,
        '1': 0.1562, '1/0': 0.1855, '2/0': 0.2223, '3/0': 0.2679,
        '4/0': 0.3237, '250': 0.3970, '300': 0.4468, '350': 0.5020,
        '400': 0.5563, '500': 0.6817, '600': 0.8241, '700': 0.9347,
        '750': 0.9903, '800': 1.0357, '900': 1.1450, '1000': 1.2450
    },

    // Chapter 9 Table 4 - Conduit Internal Area (sq in) - 40% fill
    conduitArea40: {
        '1/2': { EMT: 0.122, PVC40: 0.122, RMC: 0.122 },
        '3/4': { EMT: 0.213, PVC40: 0.213, RMC: 0.213 },
        '1':   { EMT: 0.346, PVC40: 0.346, RMC: 0.346 },
        '1-1/4': { EMT: 0.598, PVC40: 0.598, RMC: 0.598 },
        '1-1/2': { EMT: 0.814, PVC40: 0.814, RMC: 0.814 },
        '2':   { EMT: 1.363, PVC40: 1.363, RMC: 1.363 },
        '2-1/2': { EMT: 1.922, PVC40: 1.922, RMC: 1.922 },
        '3':   { EMT: 3.043, PVC40: 3.043, RMC: 3.043 },
        '3-1/2': { EMT: 4.090, PVC40: 4.090, RMC: 4.090 },
        '4':   { EMT: 5.239, PVC40: 5.239, RMC: 5.239 },
        '5':   { PVC40: 8.022, RMC: 8.022 },
        '6':   { PVC40: 11.48, RMC: 11.48 }
    },

    // Voltage drop formula constants
    // Vd = (2 * L * I * R) / 1000 for single phase
    // Vd = (1.732 * L * I * R) / 1000 for three phase
    // R = DC resistance from Ch9 Table 8 (ohms/kft at 75°C)

    // Helper functions
    findConductor(data, awg) {
        return data.find(c => c.awg === awg);
    },

    getTempFactor(tempC) {
        if (tempC <= 10) return 1.29;
        if (tempC >= 60) return 0;
        for (let i = 0; i < this.tempCorrection75.length - 1; i++) {
            if (tempC >= this.tempCorrection75[i].tempC && tempC < this.tempCorrection75[i + 1].tempC) {
                const t1 = this.tempCorrection75[i];
                const t2 = this.tempCorrection75[i + 1];
                const ratio = (tempC - t1.tempC) / (t2.tempC - t1.tempC);
                return t1.factor + ratio * (t2.factor - t1.factor);
            }
        }
        return 1.0;
    },

    getRooftopAdder(heightIn) {
        if (heightIn <= 0.5) return { adderF: 30, adderC: 17 };
        if (heightIn >= 36) return { adderF: 0, adderC: 0 };
        for (let i = 0; i < this.rooftopAdder.length - 1; i++) {
            if (heightIn >= this.rooftopAdder[i].heightIn && heightIn < this.rooftopAdder[i + 1].heightIn) {
                const h1 = this.rooftopAdder[i];
                const h2 = this.rooftopAdder[i + 1];
                const ratio = (heightIn - h1.heightIn) / (h2.heightIn - h1.heightIn);
                return {
                    adderF: h1.adderF + ratio * (h2.adderF - h1.adderF),
                    adderC: h1.adderC + ratio * (h2.adderC - h1.adderC)
                };
            }
        }
        return { adderF: 0, adderC: 0 };
    },

    getRacewayFillFactor(ccc) {
        if (ccc <= 3) return 1.0;
        if (ccc > 60) return 0.60;
        const entry = this.racewayFill.find(r => r.ccc >= ccc);
        return entry ? entry.factor : 0.60;
    },

    getConduitArea(conduitSize, type = 'EMT') {
        const sizes = this.conduitArea40[conduitSize];
        if (!sizes) return 0;
        return sizes[type] || sizes.EMT || 0;
    },

    getConductorArea(awg) {
        return this.conductorArea[awg] || 0;
    },

    getDCResistance(material, awg) {
        const table = this.dcResistance[material];
        if (!table) return 0;
        return table[awg] || 0;
    },

    // Main calculation: returns recommended conductor
    calculate(params) {
        const {
            material = 'copper',
            loadAmps,
            continuous = false,
            ambientTempC = 30,
            ccc = 3,
            conduitHeightIn = 0,
            conduitSize = '1',
            conduitType = 'EMT',
            voltage = 240,
            phase = 'single',
            lengthFt = 100,
            maxVDropPct = 3
        } = params;

        // 1. Calculate required ampacity per NEC 210.19/215.2
        let requiredAmps = loadAmps;
        if (continuous) requiredAmps *= 1.25;

        // 2. Get base ampacity from table
        const table = material === 'copper' ? this.copper75 : this.aluminum75;

        // 3. Apply correction factors
        const tempFactor = this.getTempFactor(ambientTempC);
        const rooftopAdder = this.getRooftopAdder(conduitHeightIn);
        const effectiveTempC = ambientTempC + rooftopAdder.adderC;
        const effectiveTempFactor = this.getTempFactor(effectiveTempC);
        const fillFactor = this.getRacewayFillFactor(ccc);

        const totalFactor = effectiveTempFactor * fillFactor;

        // 4. Find minimum conductor
        for (const cond of table) {
            const deratedAmp = cond.amp * totalFactor;
            if (deratedAmp >= requiredAmps) {
                // Check voltage drop
                const vd = this.calcVoltageDrop(material, cond.awg, loadAmps, lengthFt, voltage, phase);
                const vdPct = (vd / voltage) * 100;

                // Check conduit fill
                const condArea = this.getConductorArea(cond.awg);
                const totalCondArea = condArea * ccc;
                const conduitArea = this.getConduitArea(conduitSize, conduitType);
                const fillPct = (totalCondArea / conduitArea) * 100;

                return {
                    recommended: cond.awg,
                    material,
                    mm2: cond.mm2,
                    baseAmp: cond.amp,
                    deratedAmp: Math.round(deratedAmp),
                    requiredAmps: Math.round(requiredAmps),
                    tempFactor: effectiveTempFactor,
                    fillFactor,
                    totalFactor,
                    voltageDrop: vd.toFixed(2),
                    voltageDropPct: vdPct.toFixed(2),
                    maxVDropPct,
                    vdOk: vdPct <= maxVDropPct,
                    conduitFillPct: fillPct.toFixed(1),
                    fillOk: fillPct <= 40,
                    conduitSize,
                    conduitType,
                    ccc,
                    notes: this.generateNotes(material, cond.awg, continuous, ambientTempC, conduitHeightIn, ccc, vdPct, fillPct)
                };
            }
        }

        return { error: 'No conductor found - increase conduit size, reduce load, or use parallel runs' };
    },

    calcVoltageDrop(material, awg, current, lengthFt, voltage, phase) {
        const R = this.getDCResistance(material, awg); // ohms/kft at 75°C
        if (!R) return 999;

        if (phase === 'three') {
            return (1.732 * lengthFt * current * R) / 1000;
        }
        return (2 * lengthFt * current * R) / 1000;
    },

    generateNotes(material, awg, continuous, ambientTempC, conduitHeightIn, ccc, vdPct, fillPct) {
        const notes = [];
        if (continuous) notes.push('Continuous load: 125% factor applied per NEC 210.19/215.2');
        if (ambientTempC !== 30) notes.push(`Ambient temp ${ambientTempC}°C: correction factor applied`);
        if (conduitHeightIn > 0) {
            const adder = this.getRooftopAdder(conduitHeightIn);
            notes.push(`Rooftop conduit (${conduitHeightIn} in): +${adder.adderF}°F (${adder.adderC}°C) adder per NEC 310.15(B)(3)(c)`);
        }
        if (ccc > 3) notes.push(`${ccc} CCC in raceway: ${(this.getRacewayFillFactor(ccc) * 100).toFixed(0)}% fill factor per NEC 310.15(C)(1)`);
        if (vdPct > 3) notes.push(`⚠ Voltage drop ${vdPct.toFixed(1)}% exceeds 3% recommendation`);
        if (fillPct > 40) notes.push(`⚠ Conduit fill ${fillPct.toFixed(1)}% exceeds 40% limit`);
        return notes;
    }
};

// Export for browser
window.cableCalcData = cableCalcData;

if (typeof module !== 'undefined' && module.exports) {
    module.exports = cableCalcData;
}