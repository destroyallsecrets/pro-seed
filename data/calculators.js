// Calculators Data - Empty placeholder for calculator scales
const calculatorsData = {
    scale: 'calculators',
    label: 'Calculators',
    icon: '🔧',
    description: 'Electrical calculators for cable sizing, voltage drop, conduit fill, and other engineering calculations',
    phases: [] // Phases are handled dynamically by calc-app.js
};

// Export for browser
window.calculatorsData = calculatorsData;

// Export for Node/CommonJS
if (typeof module !== 'undefined' && module.exports) {
    module.exports = calculatorsData;
}