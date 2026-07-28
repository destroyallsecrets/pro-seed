// Conduit Fill Calculator
// NEC Chapter 9 Tables 1, 4, 5, 8 - Conduit fill calculations

const conduitFillData = {
    // Chapter 9 Table 4 - Conduit Dimensions (inches)
    // Values are in inches
    conduitData: {
        EMT: {
            '1/2':   { tradeSize: '1/2', internalDia: 0.622, internalArea: 0.304, area40: 0.122, area31: 0.094, area53: 0.161 },
            '3/4':   { tradeSize: '3/4', internalDia: 0.824, internalArea: 0.533, area40: 0.213, area31: 0.165, area53: 0.282 },
            '1':     { tradeSize: '1', internalDia: 1.049, internalArea: 0.864, area40: 0.346, area31: 0.268, area53: 0.458 },
            '1-1/4': { tradeSize: '1-1/4', internalDia: 1.380, internalArea: 1.496, area40: 0.598, area31: 0.464, area53: 0.793 },
            '1-1/2': { tradeSize: '1-1/2', internalDia: 1.610, internalArea: 2.036, area40: 0.814, area31: 0.631, area53: 1.079 },
            '2':     { tradeSize: '2', internalDia: 2.067, internalArea: 3.356, area40: 1.342, area31: 1.040, area53: 1.779 },
            '2-1/2': { tradeSize: '2-1/2', internalDia: 2.731, internalArea: 5.858, area40: 2.343, area31: 1.816, area53: 3.105 },
            '3':     { tradeSize: '3', internalDia: 3.356, internalArea: 8.846, area40: 3.538, area31: 2.742, area53: 4.689 },
            '3-1/2': { tradeSize: '3-1/2', internalDia: 3.834, internalArea: 11.54, area40: 4.616, area31: 3.579, area53: 6.115 },
            '4':     { tradeSize: '4', internalDia: 4.334, internalArea: 14.75, area40: 5.900, area31: 4.573, area53: 7.825 }
        },
        RMC: {
            '1/2':   { tradeSize: '1/2', internalDia: 0.632, internalArea: 0.314, area40: 0.126, area31: 0.097, area53: 0.167 },
            '3/4':   { tradeSize: '3/4', internalDia: 0.836, internalArea: 0.549, area40: 0.220, area31: 0.170, area53: 0.291 },
            '1':     { tradeSize: '1', internalDia: 1.063, internalArea: 0.887, area40: 0.355, area31: 0.275, area53: 0.470 },
            '1-1/4': { tradeSize: '1-1/4', internalDia: 1.394, internalArea: 1.527, area40: 0.611, area31: 0.473, area53: 0.807 },
            '1-1/2': { tradeSize: '1-1/2', internalDia: 1.624, internalArea: 2.072, area40: 0.829, area31: 0.642, area53: 1.098 },
            '2':     { tradeSize: '2', internalDia: 2.083, internalArea: 3.409, area40: 1.364, area31: 1.057, area53: 1.806 },
            '2-1/2': { tradeSize: '2-1/2', internalDia: 2.489, internalArea: 4.872, area40: 1.949, area31: 1.510, area53: 2.582 },
            '3':     { tradeSize: '3', internalDia: 3.090, internalArea: 7.507, area40: 3.003, area31: 2.327, area53: 3.979 },
            '3-1/2': { tradeSize: '3-1/2', internalDia: 3.570, internalArea: 10.01, area40: 4.004, area31: 3.103, area53: 5.305 },
            '4':     { tradeSize: '4', internalDia: 4.050, internalArea: 12.88, area40: 5.152, area31: 3.993, area53: 6.825 },
            '5':     { tradeSize: '5', internalDia: 5.073, internalArea: 20.22, area40: 8.088, area31: 6.268, area53: 10.72 },
            '6':     { tradeSize: '6', internalDia: 6.093, internalArea: 29.18, area40: 11.67, area31: 9.046, area53: 15.47 }
        },
        PVC40: {
            '1/2':   { tradeSize: '1/2', internalDia: 0.622, internalArea: 0.304, area40: 0.122, area31: 0.094, area53: 0.161 },
            '3/4':   { tradeSize: '3/4', internalDia: 0.824, internalArea: 0.533, area40: 0.213, area31: 0.165, area53: 0.282 },
            '1':     { tradeSize: '1', internalDia: 1.049, internalArea: 0.864, area40: 0.346, area31: 0.268, area53: 0.458 },
            '1-1/4': { tradeSize: '1-1/4', internalDia: 1.380, internalArea: 1.496, area40: 0.598, area31: 0.464, area53: 0.793 },
            '1-1/2': { tradeSize: '1-1/2', internalDia: 1.610, internalArea: 2.036, area40: 0.814, area31: 0.631, area53: 1.079 },
            '2':     { tradeSize: '2', internalDia: 2.067, internalArea: 3.356, area40: 1.342, area31: 1.040, area53: 1.779 },
            '2-1/2': { tradeSize: '2-1/2', internalDia: 2.469, internalArea: 4.788, area40: 1.915, area31: 1.483, area53: 2.537 },
            '3':     { tradeSize: '3', internalDia: 3.068, internalArea: 7.393, area40: 2.957, area31: 2.292, area53: 3.918 },
            '3-1/2': { tradeSize: '3-1/2', internalDia: 3.548, internalArea: 9.896, area40: 3.958, area31: 3.068, area53: 5.244 },
            '4':     { tradeSize: '4', internalDia: 4.026, internalArea: 12.73, area40: 5.092, area31: 3.947, area53: 6.747 },
            '5':     { tradeSize: '5', internalDia: 5.047, internalArea: 20.01, area40: 8.004, area31: 6.203, area53: 10.61 },
            '6':     { tradeSize: '6', internalDia: 6.065, internalArea: 28.89, area40: 11.56, area31: 8.936, area53: 15.31 }
        },
        PVC80: {
            '1/2':   { tradeSize: '1/2', internalDia: 0.546, internalArea: 0.234, area40: 0.094, area31: 0.073, area53: 0.124 },
            '3/4':   { tradeSize: '3/4', internalDia: 0.742, internalArea: 0.433, area40: 0.173, area31: 0.134, area53: 0.229 },
            '1':     { tradeSize: '1', internalDia: 0.957, internalArea: 0.719, area40: 0.288, area31: 0.223, area53: 0.380 },
            '1-1/4': { tradeSize: '1-1/4', internalDia: 1.278, internalArea: 1.282, area40: 0.513, area31: 0.398, area53: 0.680 },
            '1-1/2': { tradeSize: '1-1/2', internalDia: 1.500, internalArea: 1.767, area40: 0.707, area31: 0.428, area53: 0.937 },
            '2':     { tradeSize: '2', internalDia: 1.939, internalArea: 2.953, area40: 1.181, area31: 0.915, area53: 1.565 },
            '2-1/2': { tradeSize: '2-1/2', internalDia: 2.323, internalArea: 4.237, area40: 1.695, area31: 1.313, area53: 2.266 },
            '3':     { tradeSize: '3', internalDia: 2.900, internalArea: 6.605, area40: 2.642, area31: 2.048, area53: 3.498 },
            '3-1/2': { tradeSize: '3-1/2', internalDia: 3.364, internalArea: 8.897, area40: 3.559, area31: 2.758, area53: 4.715 },
            '4':     { tradeSize: '4', internalDia: 3.826, internalArea: 11.50, area40: 4.600, area31: 3.565, area53: 6.095 }
        },
        FMC: {
            '3/8':   { tradeSize: '3/8', internalDia: 0.493, internalArea: 0.191, area40: 0.076, area31: 0.059, area53: 0.101 },
            '1/2':   { tradeSize: '1/2', internalDia: 0.622, internalArea: 0.304, area40: 0.122, area31: 0.094, area53: 0.161 },
            '3/4':   { tradeSize: '3/4', internalDia: 0.820, internalArea: 0.528, area40: 0.211, area31: 0.164, area53: 0.276 },
            '1':     { tradeSize: '1', internalDia: 1.040, internalArea: 0.849, area40: 0.340, area31: 0.265, area53: 0.453 },
            '1-1/4': { tradeSize: '1-1/4', internalDia: 1.380, internalArea: 1.496, area40: 0.598, area31: 0.464, area53: 0.793 },
            '1-1/2': { tradeSize: '1-1/2', internalDia: 1.575, internalArea: 1.948, area40: 0.779, area31: 0.604, area53: 1.032 },
            '2':     { tradeSize: '2', internalDia: 2.020, internalArea: 3.205, area40: 1.282, area31: 0.994, area53: 1.699 },
            '2-1/2': { tradeSize: '2-1/2', internalDia: 2.480, internalArea: 4.830, area40: 1.932, area31: 1.497, area53: 2.560 },
            '3':     { tradeSize: '3', internalDia: 3.070, internalArea: 7.406, area40: 2.962, area31: 2.296, area53: 3.927 },
            '4':     { tradeSize: '4', internalDia: 4.000, internalArea: 12.57, area40: 5.028, area31: 3.897, area53: 6.662 }
        },
        LFMC: {
            '3/8':   { tradeSize: '3/8', internalDia: 0.493, internalArea: 0.191, area40: 0.076, area31: 0.059, area53: 0.101 },
            '1/2':   { tradeSize: '1/2', internalDia: 0.622, internalArea: 0.304, area40: 0.122, area31: 0.094, area53: 0.161 },
            '3/4':   { tradeSize: '3/4', internalDia: 0.820, internalArea: 0.528, area40: 0.211, area31: 0.164, area53: 0.276 },
            '1':     { tradeSize: '1', internalDia: 1.040, internalArea: 0.849, area40: 0.340, area31: 0.265, area53: 0.453 },
            '1-1/4': { tradeSize: '1-1/4', internalDia: 1.380, internalArea: 1.496, area40: 0.598, area31: 0.464, area53: 0.793 },
            '1-1/2': { tradeSize: '1-1/2', internalDia: 1.575, internalArea: 1.948, area40: 0.779, area31: 0.604, area53: 1.032 },
            '2':     { tradeSize: '2', internalDia: 2.020, internalArea: 3.205, area40: 1.282, area31: 0.994, area53: 1.699 },
            '2-1/2': { tradeSize: '2-1/2', internalDia: 2.480, internalArea: 4.830, area40: 1.932, area31: 1.497, area53: 2.560 },
            '3':     { tradeSize: '3', internalDia: 3.070, internalArea: 7.406, area40: 2.962, area31: 2.296, area53: 3.927 },
            '4':     { tradeSize: '4', internalDia: 4.000, internalArea: 12.57, area40: 5.028, area31: 3.897, area53: 6.662 }
        }
    },

    // Chapter 9 Table 5 - Conductor Area (sq in) for common insulation types
    conductorArea: {
        THHN: {
            '14': 0.0097, '12': 0.0133, '10': 0.0211, '8': 0.0366,
            '6': 0.0507, '4': 0.0824, '3': 0.0973, '2': 0.1158,
            '1': 0.1562, '1/0': 0.1855, '2/0': 0.2223, '3/0': 0.2679,
            '4/0': 0.3237, '250': 0.3970, '300': 0.4468, '350': 0.5020,
            '400': 0.5563, '500': 0.6817, '600': 0.8241, '700': 0.9347,
            '750': 0.9903, '800': 1.0357, '900': 1.1450, '1000': 1.2450
        },
        THWN: {
            '14': 0.0139, '12': 0.0181, '10': 0.0243, '8': 0.0437,
            '6': 0.0624, '4': 0.1019, '3': 0.1139, '2': 0.1324,
            '1': 0.1931, '1/0': 0.2238, '2/0': 0.2608, '3/0': 0.3072,
            '4/0': 0.3540, '250': 0.4430, '300': 0.5098, '350': 0.5685,
            '400': 0.6265, '500': 0.7640, '600': 0.8978, '700': 1.005,
            '750': 1.061, '800': 1.110, '900': 1.216, '1000': 1.320
        },
        XHHW: {
            '14': 0.0139, '12': 0.0181, '10': 0.0243, '8': 0.0437,
            '6': 0.0624, '4': 0.1019, '3': 0.1139, '2': 0.1324,
            '1': 0.1931, '1/0': 0.2238, '2/0': 0.2608, '3/0': 0.3072,
            '4/0': 0.3540, '250': 0.4430, '300': 0.5098, '350': 0.5685,
            '400': 0.6265, '500': 0.7640, '600': 0.8978, '700': 1.005,
            '750': 1.061, '800': 1.110, '900': 1.216, '1000': 1.320
        },
        XHHW2: {
            '14': 0.0139, '12': 0.0181, '10': 0.0243, '8': 0.0437,
            '6': 0.0624, '4': 0.1019, '3': 0.1139, '2': 0.1324,
            '1': 0.1931, '1/0': 0.2238, '2/0': 0.2608, '3/0': 0.3072,
            '4/0': 0.3540, '250': 0.4430, '300': 0.5098, '350': 0.5685,
            '400': 0.6265, '500': 0.7640, '600': 0.8978, '700': 1.005,
            '750': 1.061, '800': 1.110, '900': 1.216, '1000': 1.320
        }
    },

    // NEC Table 1 - Max Fill Percentages
    maxFillPercent: {
        '1': 53,    // 1 conductor
        '2': 31,    // 2 conductors
        'over2': 40 // 3 or more conductors
    },

    // Chapter 9 Table 5 - Compact conductor area (for compact stranded)
    compactArea: {
        copper: {
            '8': 0.0324, '6': 0.0437, '4': 0.0662, '2': 0.0981,
            '1': 0.1374, '1/0': 0.1709, '2/0': 0.2140, '3/0': 0.2439,
            '4/0': 0.3104, '250': 0.3960, '300': 0.4350, '350': 0.4802,
            '400': 0.5128, '500': 0.6108, '600': 0.7010, '750': 0.8470,
            '1000': 1.0500
        },
        aluminum: {
            '8': 0.0324, '6': 0.0437, '4': 0.0662, '2': 0.0981,
            '1': 0.1374, '1/0': 0.1709, '2/0': 0.2140, '3/0': 0.2439,
            '4/0': 0.3104, '250': 0.3960, '300': 0.4350, '350': 0.4802,
            '400': 0.5128, '500': 0.6108, '600': 0.7010, '750': 0.8470,
            '1000': 1.0500
        }
    },

    // Main calculation function
    calculateFill(params) {
        const {
            conduitType = 'EMT',
            conduitSize = '1',
            conductors = [], // [{ awg, insulation, count, compact }]
            customConduit = null // { internalArea, area40 }
        } = params;

        const conduit = customConduit || this.conduitData[conduitType]?.[conduitSize];
        if (!conduit) {
            return { error: `Conduit ${conduitType} ${conduitSize} not found` };
        }

        const maxFill40 = conduit.area40;
        const maxFill31 = conduit.area31;
        const maxFill53 = conduit.area53;

        let totalArea = 0;
        const results = [];

        for (const c of conductors) {
            const { awg, insulation = 'THHN', count = 1, compact = false } = c;

            // Get conductor area
            let area = 0;
            if (compact) {
                // Use compact area from Table 5A
                const mat = c.material || 'copper';
                area = this.compactArea?.[mat]?.[awg] || this.getConductorArea(awg, c.insulation);
            } else {
                area = this.getConductorArea(awg, c.insulation);
            }

            const conductorTotalArea = area * count;
            totalArea += conductorTotalArea;

            results.push({
                awg,
                insulation,
                count,
                areaPerConductor: area,
                totalArea: conductorTotalArea,
                compact
            });
        }

        const totalConductors = conductors.reduce((sum, c) => sum + c.count, 0);
        let maxFillPct = this.maxFillPercent.over2;
        if (totalConductors === 1) maxFillPct = this.maxFillPercent['1'];
        else if (totalConductors === 2) maxFillPct = this.maxFillPercent['2'];

        const allowedArea = conduit.internalArea * (maxFillPct / 100);
        const fillPct = (totalArea / conduit.internalArea) * 100;

        return {
            conduit: {
                type: conduitType,
                size: conduitSize,
                internalDia: conduit.internalDia,
                internalArea: conduit.internalArea,
                area40: conduit.area40,
                area31: conduit.area31,
                area53: conduit.area53
            },
            conductors: results,
            totalConductors,
            totalArea,
            maxFillPct,
            allowedArea,
            fillPct: fillPct.toFixed(2),
            compliant: totalArea <= allowedArea,
            fillStatus: totalArea <= allowedArea ? 'COMPLIANT' : 'EXCEEDS FILL LIMIT',
            recommendedSize: this.getRecommendedSize(conduitType, totalArea, maxFillPct)
        };
    },

    getConductorArea(awg, insulation) {
        return this.conductorArea[insulation]?.[awg] || 0;
    },

    getConductorAreaCompact(material, awg) {
        return this.compactArea?.[material]?.[awg] || 0;
    },

    getRecommendedSize(conduitType, totalArea, maxFillPct) {
        const data = this.conduitData[conduitType];
        if (!data) return null;

        for (const [size, c] of Object.entries(data)) {
            const allowed = c.internalArea * (maxFillPct / 100);
            if (c.internalArea * (maxFillPct / 100) >= totalArea) {
                return size;
            }
        }
        return 'Larger conduit required';
    },

    // Quick lookup: max conductors for given conduit
    maxConductors(params) {
        const { conduitType = 'EMT', conduitSize = '1', awg = '12', insulation = 'THHN' } = params;
        const conduit = this.conduitData[conduitType]?.[conduitSize];
        if (!conduit) return { error: 'Conduit not found' };

        const area = this.getConductorArea(awg, 'THHN');
        if (!area) return { error: 'Conductor not found' };

        const maxFill = conduit.area40; // 40% for >2 conductors
        const maxCount = Math.floor((conduit.area40) / this.getConductorArea(awg, 'THHN'));

        return {
            conduitType,
            conduitSize,
            awg,
            insulation,
            maxConductors: maxCount,
            conduitArea40: conduit.area40,
            conductorArea: area,
            fillAtMax: (maxCount * area / conduit.internalArea * 100).toFixed(1) + '%'
        };
    }
};

window.conduitFillData = conduitFillData;

if (typeof module !== 'undefined' && module.exports) {
    module.exports = conduitFillData;
}