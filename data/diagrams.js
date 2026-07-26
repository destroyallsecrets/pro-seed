// Interactive Diagrams for Power Scaling Visual Learning
// SVG-based interactive diagrams with tooltips and click exploration

const diagramsData = {
    diagrams: [
        {
            id: "load-tiering",
            title: "4-Tier Load Criticality Model",
            category: "Conceptual",
            description: "Visual representation of the 4-tier load criticality classification used in power scaling. Hover each tier for details.",
            width: 800,
            height: 350,
            legend: [
                { label: "Tier 0 - Life Safety", color: "#f85149", desc: "Never shed: fire pumps, egress lighting, fire alarm, medical life support" },
                { label: "Tier 1 - Critical Operations", color: "#d29922", desc: "Shed last: data centers, process control, security, communications" },
                { label: "Tier 2 - Essential Production", color: "#58a6ff", desc: "Staggered shed allowed: primary manufacturing, refrigeration, process HVAC" },
                { label: "Tier 3 - Discretionary", color: "#3fb950", desc: "Shed first: comfort HVAC, general lighting, EV charging, water heating" }
            ],
            svg: `<svg viewBox="0 0 800 350" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
    <defs>
        <linearGradient id="tier0grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#ff6b6b;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#f85149;stop-opacity:1" />
        </linearGradient>
        <linearGradient id="tier1grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#e3b341;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#d29922;stop-opacity:1" />
        </linearGradient>
        <linearGradient id="tier2grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#79b8ff;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#58a6ff;stop-opacity:1" />
        </linearGradient>
        <linearGradient id="tier3grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#5ed969;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#3fb950;stop-opacity:1" />
        </linearGradient>
        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="4" stdDeviation="8" flood-color="#000000" flood-opacity="0.3"/>
        </filter>
    </defs>
    
    <rect width="800" height="350" fill="#0d1117"/>
    <g stroke="#21262d" stroke-width="0.5">
        <line x1="0" y1="50" x2="800" y2="50"/>
        <line x1="0" y1="150" x2="800" y2="150"/>
        <line x1="0" y1="250" x2="800" y2="250"/>
        <line x1="0" y1="300" x2="800" y2="300"/>
    </g>
    
    <text x="400" y="30" text-anchor="middle" fill="#e6edf3" font-size="18" font-weight="bold" font-family="system-ui">
        4-Tier Load Criticality Classification for Power Scaling
    </text>
    <text x="400" y="46" text-anchor="middle" fill="#8b949e" font-size="12" font-family="system-ui">
        Click any tier to explore - Hover for details
    </text>
    
    <g class="tier-0 interactive" data-tier="0" data-name="Tier 0 - Life Safety" filter="url(#shadow)">
        <rect x="50" y="60" width="170" height="220" rx="12" fill="url(#tier0grad)" stroke="#ff6b6b" stroke-width="2"/>
        <text x="135" y="95" text-anchor="middle" fill="white" font-size="16" font-weight="bold" font-family="system-ui">TIER 0</text>
        <text x="135" y="118" text-anchor="middle" fill="white" font-size="13" font-family="system-ui">LIFE SAFETY</text>
        <text x="135" y="140" text-anchor="middle" fill="rgba(255,255,255,0.9)" font-size="11" font-family="system-ui">NEVER SHED</text>
        <rect x="65" y="160" width="140" height="1" fill="rgba(255,255,255,0.3)"/>
        <text x="135" y="185" text-anchor="middle" fill="white" font-size="11" font-family="system-ui">Fire Pumps</text>
        <text x="135" y="202" text-anchor="middle" fill="white" font-size="11" font-family="system-ui">Egress Lighting</text>
        <text x="135" y="219" text-anchor="middle" fill="white" font-size="11" font-family="system-ui">Fire Alarm</text>
        <text x="135" y="236" text-anchor="middle" fill="white" font-size="11" font-family="system-ui">Medical Life Support</text>
        <text x="135" y="253" text-anchor="middle" fill="white" font-size="11" font-family="system-ui">Smoke Control</text>
        <rect x="65" y="270" width="140" height="1" fill="rgba(255,255,255,0.3)"/>
        <text x="135" y="290" text-anchor="middle" fill="#ffcccc" font-size="10" font-family="system-ui">NEC 700, NFPA 101, 99</text>
    </g>
    
    <g class="tier-1 interactive" data-tier="1" data-name="Tier 1 - Critical Operations" filter="url(#shadow)">
        <rect x="240" y="60" width="170" height="220" rx="12" fill="url(#tier1grad)" stroke="#e3b341" stroke-width="2"/>
        <text x="325" y="95" text-anchor="middle" fill="white" font-size="16" font-weight="bold" font-family="system-ui">TIER 1</text>
        <text x="325" y="118" text-anchor="middle" fill="white" font-size="13" font-family="system-ui">CRITICAL OPS</text>
        <text x="325" y="140" text-anchor="middle" fill="white" font-size="11" font-family="system-ui">SHED LAST</text>
        <rect x="255" y="160" width="140" height="1" fill="rgba(255,255,255,0.3)"/>
        <text x="325" y="185" text-anchor="middle" fill="white" font-size="11" font-family="system-ui">Data Centers</text>
        <text x="325" y="202" text-anchor="middle" fill="white" font-size="11" font-family="system-ui">Process Control</text>
        <text x="325" y="219" text-anchor="middle" fill="white" font-size="11" font-family="system-ui">Security/Access</text>
        <text x="325" y="236" text-anchor="middle" fill="white" font-size="11" font-family="system-ui">Communications</text>
        <text x="325" y="253" text-anchor="middle" fill="white" font-size="11" font-family="system-ui">Emergency Comms</text>
        <rect x="255" y="270" width="140" height="1" fill="rgba(255,255,255,0.3)"/>
        <text x="325" y="290" text-anchor="middle" fill="#ffe8b3" font-size="10" font-family="system-ui">NEC 701, 708, Tier 1 SLA</text>
    </g>
    
    <g class="tier-2 interactive" data-tier="2" data-name="Tier 2 - Essential Production" filter="url(#shadow)">
        <rect x="430" y="60" width="170" height="220" rx="12" fill="url(#tier2grad)" stroke="#58a6ff" stroke-width="2"/>
        <text x="515" y="95" text-anchor="middle" fill="white" font-size="16" font-weight="bold" font-family="system-ui">TIER 2</text>
        <text x="515" y="118" text-anchor="middle" fill="white" font-size="13" font-family="system-ui">ESSENTIAL</text>
        <text x="515" y="140" text-anchor="middle" fill="white" font-size="11" font-family="system-ui">STAGGERED SHED</text>
        <rect x="445" y="160" width="140" height="1" fill="rgba(255,255,255,0.3)"/>
        <text x="515" y="185" text-anchor="middle" fill="white" font-size="11" font-family="system-ui">Primary Mfg Lines</text>
        <text x="515" y="202" text-anchor="middle" fill="white" font-size="11" font-family="system-ui">Refrigeration</text>
        <text x="515" y="219" text-anchor="middle" fill="white" font-size="11" font-family="system-ui">Process HVAC</text>
        <text x="515" y="236" text-anchor="middle" fill="white" font-size="11" font-family="system-ui">Compressed Air</text>
        <text x="515" y="253" text-anchor="middle" fill="white" font-size="11" font-family="system-ui">Waste Treatment</text>
        <rect x="445" y="270" width="140" height="1" fill="rgba(255,255,255,0.3)"/>
        <text x="515" y="290" text-anchor="middle" fill="#cce8ff" font-size="10" font-family="system-ui">Business Continuity Plan</text>
    </g>
    
    <g class="tier-3 interactive" data-tier="3" data-name="Tier 3 - Discretionary" filter="url(#shadow)">
        <rect x="620" y="60" width="170" height="220" rx="12" fill="url(#tier3grad)" stroke="#3fb950" stroke-width="2"/>
        <text x="705" y="95" text-anchor="middle" fill="white" font-size="16" font-weight="bold" font-family="system-ui">TIER 3</text>
        <text x="705" y="118" text-anchor="middle" fill="white" font-size="13" font-family="system-ui">DISCRETIONARY</text>
        <text x="705" y="140" text-anchor="middle" fill="white" font-size="11" font-family="system-ui">SHED FIRST</text>
        <rect x="635" y="160" width="140" height="1" fill="rgba(255,255,255,0.3)"/>
        <text x="705" y="185" text-anchor="middle" fill="white" font-size="11" font-family="system-ui">Comfort HVAC</text>
        <text x="705" y="202" text-anchor="middle" fill="white" font-size="11" font-family="system-ui">General Lighting</text>
        <text x="705" y="219" text-anchor="middle" fill="white" font-size="11" font-family="system-ui">EV Charging</text>
        <text x="705" y="236" text-anchor="middle" fill="white" font-size="11" font-family="system-ui">Water Heating</text>
        <text x="705" y="253" text-anchor="middle" fill="white" font-size="11" font-family="system-ui">Pool/Spa Pumps</text>
        <rect x="635" y="270" width="140" height="1" fill="rgba(255,255,255,0.3)"/>
        <text x="705" y="290" text-anchor="middle" fill="#ccffcc" font-size="10" font-family="system-ui">Demand Response / TOU</text>
    </g>
    
    <g stroke="#8b949e" stroke-width="2" fill="none" stroke-dasharray="8,4" opacity="0.6">
        <path d="M 220 170 Q 230 150 240 170" marker-end="url(#arrowhead)"/>
        <path d="M 410 170 Q 420 150 430 170" marker-end="url(#arrowhead)"/>
        <path d="M 600 170 Q 610 150 620 170" marker-end="url(#arrowhead)"/>
    </g>
    <defs>
        <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#8b949e"/>
        </marker>
    </defs>
    
    <text x="400" y="310" text-anchor="middle" fill="#8b949e" font-size="12" font-family="system-ui" font-style="italic">
        Shed Order: Tier 3 u2192 Tier 2 (staggered) u2192 Tier 1 u2192 Tier 0 (NEVER)
    </text>
    <text x="400" y="328" text-anchor="middle" fill="#8b949e" font-size="12" font-family="system-ui" font-style="italic">
        Restore Order: Tier 0 verify u2192 Tier 1 u2192 Tier 2 (staggered) u2192 Tier 3
    </text>
</svg>`
        }
    ]
};

if (typeof module !== "undefined" && module.exports) {
    module.exports = diagramsData;
}

window.diagramsData = diagramsData;
