// Electrical Installation Analysis - Main Application Logic
// Handles navigation, checklist state, progress tracking, persistence, export

(function() {
    'use strict';

    // ========================================
    // APP STATE
    // ========================================
    const AppState = {
            currentScale: 'residential',
            scales: ['residential', 'commercial', 'industrial', 'powerscaling', 'calculators'],
            phaseTabs: {},
            checklists: {},
            notes: {},
            progress: {}
        };

        // Scale data references (loaded via script tags)
                const scaleData = {
                    residential: window.residentialData,
                    commercial: window.commercialData,
                    industrial: window.industrialData,
                    powerscaling: window.powerScalingData,
                    calculators: { phases: [], label: 'Calculators', icon: '🔧' }
                };
            };

        // DOM Elements for calculator scales (loaded from calc-app.js)
        const calculatorElements = {
            scaleContents: {
                calculators: document.getElementById('calculatorsContent')
            },
            phaseTabs: {
                calculators: document.getElementById('calculatorsTabs')
            },
            phasePanels: {
                calculators: document.getElementById('calculatorsPanels')
            }
        };

    // ========================================
    // DOM ELEMENTS
    // ========================================
    const elements = {
        scaleNav: document.getElementById('scaleNav'),
        scaleContents: {
            residential: document.getElementById('residentialContent'),
            commercial: document.getElementById('commercialContent'),
            industrial: document.getElementById('industrialContent'),
            powerscaling: document.getElementById('powerscalingContent'),
            calculators: document.getElementById('calculatorsContent')
        },
        phaseTabs: {
            residential: document.getElementById('residentialTabs'),
            commercial: document.getElementById('commercialTabs'),
            industrial: document.getElementById('industrialTabs'),
            powerscaling: document.getElementById('powerscalingTabs'),
            calculators: document.getElementById('calculatorsTabs')
        },
        phasePanels: {
            residential: document.getElementById('residentialPanels'),
            commercial: document.getElementById('commercialPanels'),
            industrial: document.getElementById('industrialPanels'),
            powerscaling: document.getElementById('powerscalingPanels'),
            calculators: document.getElementById('calculatorsPanels')
        },
        progressFill: document.getElementById('progressFill'),
        progressText: document.getElementById('progressText')
    };

    // ========================================
    // INITIALIZATION
    // ========================================
    document.addEventListener('DOMContentLoaded', function() {
        loadProgress();
        initializeAllScales();
        switchScale('residential');
        updateProgress();
    });

    // ========================================
    // SCALE NAVIGATION
    // ========================================
    window.switchScale = function(scale) {
        if (!scaleData[scale]) return;

        // Update nav buttons
        document.querySelectorAll('.scale-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.scale === scale);
        });

        // Update content visibility
        Object.values(elements.scaleContents).forEach(content => {
            content.classList.remove('active');
        });
        elements.scaleContents[scale].classList.add('active');

        AppState.currentScale = scale;
        updateProgress();

        // Focus first incomplete phase
        setTimeout(() => focusFirstIncomplete(scale), 100);
    };

    // ========================================
    // SCALE INITIALIZATION
    // ========================================
    function initializeAllScales() {
        AppState.scales.forEach(scale => {
            if (scaleData[scale]) {
                initializeScale(scale);
            }
        });
    }

    function initializeScale(scale) {
        const data = scaleData[scale];
        if (!data || !data.phases) return;

        const tabsContainer = elements.phaseTabs[scale];
        const panelsContainer = elements.phasePanels[scale];

        // Initialize state containers
        AppState.phaseTabs[scale] = {};
        AppState.checklists[scale] = {};
        AppState.notes[scale] = {};
        AppState.progress[scale] = {};

        data.phases.forEach((phase, phaseIndex) => {
            // Create tab
            const tab = createPhaseTab(phase, phaseIndex, scale);
            tabsContainer.appendChild(tab);
            AppState.phaseTabs[scale][phase.id] = tab;

            // Create panel
            const panel = createPhasePanel(phase, scale);
            panelsContainer.appendChild(panel);
            AppState.phaseTabs[scale][phase.id + '_panel'] = panel;

            // Initialize checklist state
            initializeChecklistState(phase, scale);
        });

        // Add click handlers to tabs
        tabsContainer.addEventListener('click', (e) => {
            const tab = e.target.closest('.phase-tab');
            if (tab) {
                switchPhase(scale, tab.dataset.phase);
            }
        });

        // Activate first tab
        if (data.phases.length > 0) {
            switchPhase(scale, data.phases[0].id);
        }
    }

    function createPhaseTab(phase, index, scale) {
        const tab = document.createElement('button');
        tab.className = 'phase-tab';
        tab.dataset.phase = phase.id;
        tab.dataset.scale = scale;
        tab.innerHTML = `
            <span class="phase-number">${phase.number}</span>
            <span class="phase-label">${phase.title}</span>
        `;
        tab.title = phase.description;
        return tab;
    }

    function createPhasePanel(phase, scale) {
        const panel = document.createElement('div');
        panel.className = 'phase-panel';
        panel.dataset.phase = phase.id;
        panel.dataset.scale = scale;

        // Build cards HTML
        let cardsHtml = '';
        if (phase.cards) {
            phase.cards.forEach((card, cardIndex) => {
                const checklistItems = card.checklist ? card.checklist.map((item, itemIndex) => 
                    createChecklistItemHTML(scale, phase.id, card.id, itemIndex, item)
                ).join('') : '';

                cardsHtml += `
                    <div class="card" id="card-${scale}-${phase.id}-${card.id}">
                        <div class="card-header" onclick="toggleCard('${scale}', '${phase.id}', '${card.id}')">
                            <div class="card-title">
                                <span class="card-icon ${card.iconColor}">${card.icon}</span>
                                <span>${card.title}</span>
                            </div>
                            <span class="card-toggle">▼</span>
                        </div>
                        <div class="card-body">
                            ${card.checklist ? `<div class="checklist" id="checklist-${scale}-${phase.id}-${card.id}">${checklistItems}</div>` : ''}
                        </div>
                    </div>
                `;
            });
        }

        panel.innerHTML = `
            <div class="phase-header">
                <h2>${phase.icon} Phase ${phase.number}: ${phase.title}</h2>
                <p class="phase-description">${phase.description}</p>
            </div>
            <div class="phase-cards">${cardsHtml}</div>
        `;

        return panel;
    }

    function createChecklistItemHTML(scale, phaseId, cardId, itemIndex, item) {
        const itemId = `${scale}-${phaseId}-${cardId}-${itemIndex}`;
        const isComplete = AppState.checklists[scale]?.[itemId] === true;
        const note = AppState.notes[scale]?.[itemId] || '';

        return `
            <div class="checklist-item ${isComplete ? 'complete' : ''}" data-item-id="${itemId}">
                <div class="checklist-checkbox ${isComplete ? 'checked' : ''}" 
                     data-item-id="${itemId}" 
                     onclick="toggleChecklistItem('${itemId}')" 
                     role="checkbox" 
                     aria-checked="${isComplete}">
                    ✓
                </div>
                <div class="checklist-content">
                    <div class="checklist-text">${item.text}${item.ref ? ` <code>${item.ref}</code>` : ''}</div>
                    ${item.ref ? `<div class="checklist-ref">${item.ref}</div>` : ''}
                    <textarea class="checklist-notes" 
                              data-item-id="${itemId}" 
                              placeholder="Add notes..."
                              onchange="saveNote('${itemId}', this.value)">${note}</textarea>
                </div>
            </div>
        `;
    }

    function initializeChecklistState(phase, scale) {
        if (!phase.cards) return;
        phase.cards.forEach((card, cardIndex) => {
            if (card.checklist) {
                card.checklist.forEach((item, itemIndex) => {
                    const itemId = `${scale}-${phase.id}-${card.id}-${itemIndex}`;
                    if (AppState.checklists[scale][itemId] === undefined) {
                        AppState.checklists[scale][itemId] = false;
                    }
                    if (AppState.notes[scale][itemId] === undefined) {
                        AppState.notes[scale][itemId] = '';
                    }
                });
            }
        });
    }

    // ========================================
    // PHASE SWITCHING
    // ========================================
    window.switchPhase = function(scale, phaseId) {
        const tabsContainer = elements.phaseTabs[scale];
        const panelsContainer = elements.phasePanels[scale];

        // Update tabs
        tabsContainer.querySelectorAll('.phase-tab').forEach(tab => {
            tab.classList.toggle('active', tab.dataset.phase === phaseId);
        });

        // Update panels
        panelsContainer.querySelectorAll('.phase-panel').forEach(panel => {
            panel.classList.toggle('active', panel.dataset.phase === phaseId);
        });

        // Update completion status on tabs
        updatePhaseTabStatus(scale);
    };

    function updatePhaseTabStatus(scale) {
        const data = scaleData[scale];
        if (!data) return;

        data.phases.forEach(phase => {
            const tab = AppState.phaseTabs[scale][phase.id];
            if (!tab) return;

            const isComplete = isPhaseComplete(scale, phase.id);
            tab.classList.toggle('complete', isComplete);
        });
    }

    function isPhaseComplete(scale, phaseId) {
        const data = scaleData[scale];
        if (!data) return false;

        const phase = data.phases.find(p => p.id === phaseId);
        if (!phase || !phase.cards) return false;

        let total = 0, completed = 0;
        phase.cards.forEach(card => {
            if (card.checklist) {
                card.checklist.forEach((item, itemIndex) => {
                    const itemId = `${scale}-${phase.id}-${card.id}-${itemIndex}`;
                    total++;
                    if (AppState.checklists[scale]?.[itemId]) completed++;
                });
            }
        });
        return total > 0 && completed === total;
    }

    // ========================================
    // CARD TOGGLE
    // ========================================
    window.toggleCard = function(scale, phaseId, cardId) {
        const card = document.getElementById(`card-${scale}-${phaseId}-${cardId}`);
        if (card) {
            card.classList.toggle('open');
        }
    };

    // ========================================
    // CHECKLIST ITEM TOGGLE
    // ========================================
    window.toggleChecklistItem = function(itemId) {
        const scale = AppState.currentScale;
        const newState = !AppState.checklists[scale][itemId];
        AppState.checklists[scale][itemId] = newState;

        // Update UI
        const item = document.querySelector(`.checklist-item[data-item-id="${itemId}"]`);
        const checkbox = document.querySelector(`.checklist-checkbox[data-item-id="${itemId}"]`);

        if (item) item.classList.toggle('complete', newState);
        if (checkbox) {
            checkbox.classList.toggle('checked', newState);
            checkbox.setAttribute('aria-checked', newState);
        }

        // Update progress
        updateProgress();
        updatePhaseTabStatus(scale);
        saveProgress();
    };

    // ========================================
    // NOTES SAVE
    // ========================================
    window.saveNote = function(itemId, value) {
        const scale = AppState.currentScale;
        AppState.notes[scale][itemId] = value;
        saveProgress();
    };

    // ========================================
    // PROGRESS TRACKING
    // ========================================
    function updateProgress() {
        const scale = AppState.currentScale;
        const data = scaleData[scale];
        if (!data) return;

        let total = 0, completed = 0;

        data.phases.forEach(phase => {
            if (phase.cards) {
                phase.cards.forEach(card => {
                    if (card.checklist) {
                        card.checklist.forEach((item, itemIndex) => {
                            const itemId = `${scale}-${phase.id}-${card.id}-${itemIndex}`;
                            total++;
                            if (AppState.checklists[scale]?.[itemId]) completed++;
                        });
                    }
                });
            }
        });

        const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

        elements.progressFill.style.width = `${percentage}%`;
        elements.progressText.textContent = `${percentage}% Complete (${completed}/${total})`;
    }

    function focusFirstIncomplete(scale) {
        const data = scaleData[scale];
        if (!data) return;

        for (const phase of data.phases) {
            if (!isPhaseComplete(scale, phase.id)) {
                switchPhase(scale, phase.id);
                break;
            }
        }
    }

    // ========================================
    // PERSISTENCE (LOCALSTORAGE)
    // ========================================
    function saveProgress() {
        const data = {
            checklists: AppState.checklists,
            notes: AppState.notes,
            currentScale: AppState.currentScale,
            timestamp: Date.now()
        };
        localStorage.setItem('electrical-analysis-progress', JSON.stringify(data));
    }

    function loadProgress() {
        try {
            const saved = localStorage.getItem('electrical-analysis-progress');
            if (saved) {
                const data = JSON.parse(saved);
                AppState.checklists = data.checklists || {};
                AppState.notes = data.notes || {};
                AppState.currentScale = data.currentScale || 'residential';
            }
        } catch (e) {
            console.warn('Failed to load progress:', e);
        }
    }

    window.saveProgress = function() {
        saveProgress();
        alert('Progress saved!');
    };

    window.loadProgress = function() {
        loadProgress();
        // Re-render all scales
        AppState.scales.forEach(scale => {
            updatePhaseTabStatus(scale);
            // Re-render checklists with loaded state
            rerenderChecklists(scale);
        });
        switchScale(AppState.currentScale);
        updateProgress();
        alert('Progress loaded!');
    };

    function rerenderChecklists(scale) {
        const data = scaleData[scale];
        if (!data) return;

        data.phases.forEach(phase => {
            if (phase.cards) {
                phase.cards.forEach(card => {
                    if (card.checklist) {
                        const container = document.getElementById(`checklist-${scale}-${phase.id}-${card.id}`);
                        if (container) {
                            container.innerHTML = card.checklist.map((item, itemIndex) => 
                                createChecklistItemHTML(scale, phase.id, card.id, itemIndex, item)
                            ).join('');
                        }
                    }
                });
            }
        });
    }

    // ========================================
    // EXPORT FUNCTIONS
    // ========================================
    window.exportToPDF = function() {
        const scale = AppState.currentScale;
        const data = scaleData[scale];
        if (!data) return;

        // Create print-friendly content
        const printWindow = window.open('', '_blank');
        const html = generateReportHTML(scale, data);
        printWindow.document.write(html);
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
    };

    window.printReport = function() {
        window.exportToPDF();
    };

    function generateReportHTML(scale, data) {
        const now = new Date().toLocaleDateString();
        let html = `
            <!DOCTYPE html>
            <html>
            <head>
                <title>Electrical Analysis Report - ${data.label}</title>
                <style>
                    body { font-family: Arial, sans-serif; margin: 20px; color: #333; }
                    h1 { color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 10px; }
                    h2 { color: #34495e; margin-top: 30px; border-left: 4px solid #3498db; padding-left: 10px; }
                    h3 { color: #2c3e50; }
                    .meta { color: #7f8c8d; margin-bottom: 20px; font-size: 0.9em; }
                    .checklist { margin: 15px 0; }
                    .checklist-item { display: flex; margin: 8px 0; padding: 8px; background: #f8f9fa; border-left: 3px solid #bdc3c7; }
                    .checklist-item.complete { border-left-color: #27ae60; background: #e8f8f5; }
                    .checklist-item.complete .text { text-decoration: line-through; color: #95a5a6; }
                    .checkbox { width: 20px; height: 20px; border: 2px solid #bdc3c7; margin-right: 10px; flex-shrink: 0; }
                    .checkbox.checked { background: #27ae60; border-color: #27ae60; color: white; display: flex; align-items: center; justify-content: center; }
                    .ref { font-size: 0.8em; color: #7f8c8d; font-family: monospace; margin-top: 4px; }
                    .notes { margin-top: 8px; padding: 8px; background: #fff; border: 1px solid #ddd; font-size: 0.85em; }
                    .phase { page-break-inside: avoid; margin-bottom: 30px; }
                    .card { border: 1px solid #ddd; border-radius: 4px; margin: 15px 0; }
                    .card-header { background: #ecf0f1; padding: 10px 15px; font-weight: bold; border-bottom: 1px solid #ddd; }
                    .progress { background: #ecf0f1; padding: 15px; border-radius: 4px; margin-bottom: 20px; }
                    .progress-bar { height: 20px; background: #bdc3c7; border-radius: 10px; overflow: hidden; }
                    .progress-fill { height: 100%; background: linear-gradient(90deg, #3498db, #27ae60); }
                </style>
            </head>
            <body>
                <h1>⚡ Electrical Installation Analysis Report</h1>
                <div class="meta">
                    <strong>Scale:</strong> ${data.icon} ${data.label} (${data.description})<br>
                    <strong>Service Typical:</strong> ${data.serviceTypical}<br>
                    <strong>Generated:</strong> ${now}<br>
                    <strong>Standard:</strong> NEC 2023
                </div>
        `;

        // Calculate overall progress
        let total = 0, completed = 0;
        data.phases.forEach(phase => {
            if (phase.cards) {
                phase.cards.forEach(card => {
                    if (card.checklist) {
                        card.checklist.forEach((item, itemIndex) => {
                            const itemId = `${scale}-${phase.id}-${card.id}-${itemIndex}`;
                            total++;
                            if (AppState.checklists[scale]?.[itemId]) completed++;
                        });
                    }
                });
            }
        });
        const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

        html += `
            <div class="progress">
                <strong>Overall Progress: ${percentage}% (${completed}/${total} items complete)</strong>
                <div class="progress-bar"><div class="progress-fill" style="width: ${percentage}%"></div></div>
            </div>
        `;

        data.phases.forEach(phase => {
            const phaseComplete = isPhaseComplete(scale, phase.id);
            html += `
                <div class="phase">
                    <h2>${phase.icon} Phase ${phase.number}: ${phase.title} ${phaseComplete ? '✅' : ''}</h2>
                    <p>${phase.description}</p>
            `;

            if (phase.cards) {
                phase.cards.forEach(card => {
                    html += `<div class="card"><div class="card-header">${card.icon} ${card.title}</div>`;
                    if (card.checklist) {
                        html += '<div class="checklist">';
                        card.checklist.forEach((item, itemIndex) => {
                            const itemId = `${scale}-${phase.id}-${card.id}-${itemIndex}`;
                            const isDone = AppState.checklists[scale]?.[itemId] || false;
                            const note = AppState.notes[scale]?.[itemId] || '';
                            html += `
                                <div class="checklist-item ${isDone ? 'complete' : ''}">
                                    <div class="checkbox ${isDone ? 'checked' : ''}">${isDone ? '✓' : ''}</div>
                                    <div>
                                        <div class="text">${item.text}${item.ref ? ` <span class="ref">[${item.ref}]</span>` : ''}</div>
                                        ${note ? `<div class="notes">Notes: ${note}</div>` : ''}
                                    </div>
                                </div>
                            `;
                        });
                        html += '</div>';
                    }
                    html += '</div>';
                });
            }
            html += '</div>';
        });

        html += `
                <hr style="margin-top: 40px;">
                <p style="color: #95a5a6; font-size: 0.85em; text-align: center;">
                    Generated by Electrical Installation Analysis 3-Scale System | NEC 2023 Compliant
                </p>
            </body>
            </html>
        `;

        return html;
    }

})();