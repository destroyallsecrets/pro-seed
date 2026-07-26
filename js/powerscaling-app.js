// Power Scaling Standalone App Logic
// Handles phase navigation, checklists, progress tracking, diagrams, persistence, export

(function() {
    'use strict';

    // ========================================
    // APP STATE
    // ========================================
    const AppState = {
        currentPhase: 'assessment',
        phases: ['assessment', 'derating', 'tiering', 'preservation', 'optimization', 'documentation', 'diagrams'],
        phaseTabs: {},
        checklists: {},
        notes: {},
        progress: {}
    };

    // Phase data references (loaded via script tags)
    const phaseData = {
        assessment: window.powerScalingData?.phases?.find(p => p.id === 'assessment'),
        derating: window.powerScalingData?.phases?.find(p => p.id === 'deratingCalc'),
        tiering: window.powerScalingData?.phases?.find(p => p.id === 'loadTiering'),
        preservation: window.powerScalingData?.phases?.find(p => p.id === 'criticalPreservation'),
        optimization: window.powerScalingData?.phases?.find(p => p.id === 'optimization'),
        documentation: window.powerScalingData?.phases?.find(p => p.id === 'documentation'),
        diagrams: { id: 'diagrams', number: 7, title: 'Interactive Diagrams', icon: '📊', color: 'purple', description: 'Visual learning tools for power scaling concepts', cards: [] }
    };

    // Diagram data reference
    const diagrams = window.diagramsData?.diagrams || [];

    // ========================================
    // DOM ELEMENTS
    // ========================================
    const elements = {
        phaseNav: document.getElementById('phaseNav'),
        phaseContents: {
            assessment: document.getElementById('phase-assessment'),
            derating: document.getElementById('phase-derating'),
            tiering: document.getElementById('phase-tiering'),
            preservation: document.getElementById('phase-preservation'),
            optimization: document.getElementById('phase-optimization'),
            documentation: document.getElementById('phase-documentation'),
            diagrams: document.getElementById('phase-diagrams')
        },
        phaseTabs: {
            assessment: document.getElementById('assessmentTabs'),
            derating: document.getElementById('deratingTabs'),
            tiering: document.getElementById('tieringTabs'),
            preservation: document.getElementById('preservationTabs'),
            optimization: document.getElementById('optimizationTabs'),
            documentation: document.getElementById('documentationTabs')
        },
        phasePanels: {
            assessment: document.getElementById('assessmentPanels'),
            derating: document.getElementById('deratingPanels'),
            tiering: document.getElementById('tieringPanels'),
            preservation: document.getElementById('preservationPanels'),
            optimization: document.getElementById('optimizationPanels'),
            documentation: document.getElementById('documentationPanels')
        },
        diagramGallery: document.getElementById('diagramGallery'),
        progressFill: document.getElementById('progressFill'),
        progressText: document.getElementById('progressText')
    };

    // ========================================
    // INITIALIZATION
    // ========================================
    document.addEventListener('DOMContentLoaded', function() {
        loadProgress();
        initializeAllPhases();
        renderDiagrams();
        switchPhase('assessment');
        updateProgress();
    });

    // ========================================
    // PHASE NAVIGATION
    // ========================================
    window.switchPhase = function(phase) {
        if (!phaseData[phase] && phase !== 'diagrams') return;

        // Update nav buttons
        document.querySelectorAll('.phase-nav-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.phase === phase);
        });

        // Update content visibility
        Object.values(elements.phaseContents).forEach(content => {
            content.classList.remove('active');
        });
        elements.phaseContents[phase].classList.add('active');

        AppState.currentPhase = phase;
        updateProgress();

        // Focus first incomplete sub-phase
        setTimeout(() => focusFirstIncomplete(phase), 100);
    };

    // ========================================
    // PHASE INITIALIZATION
    // ========================================
    function initializeAllPhases() {
        AppState.phases.forEach(phase => {
            if (phaseData[phase] || phase === 'diagrams') {
                initializePhase(phase);
            }
        });
    }

    function initializePhase(phase) {
        const data = phaseData[phase];
        if (!data && phase !== 'diagrams') return;

        const tabsContainer = elements.phaseTabs[phase];
        const panelsContainer = elements.phasePanels[phase];

        // Initialize state containers
        AppState.phaseTabs[phase] = {};
        AppState.checklists[phase] = {};
        AppState.notes[phase] = {};
        AppState.progress[phase] = {};

        if (data && data.cards) {
            data.cards.forEach((card, cardIndex) => {
                // Create tab
                const tab = createPhaseTab(card, cardIndex, phase);
                tabsContainer.appendChild(tab);
                AppState.phaseTabs[phase][card.id] = tab;

                // Create panel
                const panel = createPhasePanel(card, phase);
                panelsContainer.appendChild(panel);
                AppState.phaseTabs[phase][card.id + '_panel'] = panel;

                // Initialize checklist state
                initializeChecklistState(card, phase);
            });
        }

        // Add click handlers to tabs
        tabsContainer.addEventListener('click', (e) => {
            const tab = e.target.closest('.phase-tab');
            if (tab) {
                switchSubPhase(phase, tab.dataset.subphase);
            }
        });

        // Activate first tab
        if (data && data.cards && data.cards.length > 0) {
            switchSubPhase(phase, data.cards[0].id);
        }
    }

    function createPhaseTab(card, index, phase) {
        const tab = document.createElement('button');
        tab.className = 'phase-tab';
        tab.dataset.subphase = card.id;
        tab.dataset.phase = phase;
        tab.innerHTML = `
            <span class="phase-number">${card.icon || (index + 1)}</span>
            <span class="phase-label">${card.title}</span>
        `;
        tab.title = card.description || '';
        return tab;
    }

    function createPhasePanel(card, phase) {
        const panel = document.createElement('div');
        panel.className = 'phase-panel';
        panel.dataset.subphase = card.id;
        panel.dataset.phase = phase;

        // Build cards HTML
        let cardsHtml = '';
        if (card.checklist) {
            const checklistItems = card.checklist.map((item, itemIndex) => 
                createChecklistItemHTML(phase, card.id, itemIndex, item)
            ).join('');

            cardsHtml = `
                <div class="card" id="card-${phase}-${card.id}">
                    <div class="card-header" onclick="toggleCard('${phase}', '${card.id}')">
                        <div class="card-title">
                            <span class="card-icon ${card.iconColor || 'blue'}">${card.icon || '📋'}</span>
                            <span>${card.title}</span>
                        </div>
                        <span class="card-toggle">▼</span>
                    </div>
                    <div class="card-body">
                        <div class="checklist" id="checklist-${phase}-${card.id}">${checklistItems}</div>
                    </div>
                </div>
            `;
        } else {
            cardsHtml = `
                <div class="card">
                    <div class="card-header">
                        <div class="card-title">
                            <span class="card-icon ${card.iconColor || 'blue'}">${card.icon || '📋'}</span>
                            <span>${card.title}</span>
                        </div>
                    </div>
                    <div class="card-body">
                        <p class="phase-description">${card.description || 'No content available'}</p>
                    </div>
                </div>
            `;
        }

        panel.innerHTML = `
            <div class="phase-header">
                <h2>${card.icon || '📋'} ${card.title}</h2>
                <p class="phase-description">${card.description || ''}</p>
            </div>
            <div class="phase-cards">${cardsHtml}</div>
        `;

        return panel;
    }

    function createChecklistItemHTML(phase, cardId, itemIndex, item) {
        const itemId = `${phase}-${cardId}-${itemIndex}`;
        const isComplete = AppState.checklists[phase]?.[itemId] === true;
        const note = AppState.notes[phase]?.[itemId] || '';

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

    function initializeChecklistState(card, phase) {
        if (!card.checklist) return;
        card.checklist.forEach((item, itemIndex) => {
            const itemId = `${phase}-${card.id}-${itemIndex}`;
            if (AppState.checklists[phase][itemId] === undefined) {
                AppState.checklists[phase][itemId] = false;
            }
            if (AppState.notes[phase][itemId] === undefined) {
                AppState.notes[phase][itemId] = '';
            }
        });
    }

    // ========================================
    // SUB-PHASE SWITCHING (within a phase)
    // ========================================
    window.switchSubPhase = function(phase, subPhaseId) {
        const tabsContainer = elements.phaseTabs[phase];
        const panelsContainer = elements.phasePanels[phase];

        // Update tabs
        tabsContainer.querySelectorAll('.phase-tab').forEach(tab => {
            tab.classList.toggle('active', tab.dataset.subphase === subPhaseId);
        });

        // Update panels
        panelsContainer.querySelectorAll('.phase-panel').forEach(panel => {
            panel.classList.toggle('active', panel.dataset.subphase === subPhaseId);
        });

        // Update completion status on tabs
        updateSubPhaseTabStatus(phase);
    };

    function updateSubPhaseTabStatus(phase) {
        const data = phaseData[phase];
        if (!data) return;

        data.cards.forEach(card => {
            const tab = AppState.phaseTabs[phase][card.id];
            if (!tab) return;

            const isComplete = isSubPhaseComplete(phase, card.id);
            tab.classList.toggle('complete', isComplete);
        });
    }

    function isSubPhaseComplete(phase, subPhaseId) {
        const data = phaseData[phase];
        if (!data) return false;

        const card = data.cards.find(c => c.id === subPhaseId);
        if (!card || !card.checklist) return false;

        let total = 0, completed = 0;
        card.checklist.forEach((item, itemIndex) => {
            const itemId = `${phase}-${subPhaseId}-${itemIndex}`;
            total++;
            if (AppState.checklists[phase]?.[itemId]) completed++;
        });
        return total > 0 && completed === total;
    }

    // ========================================
    // CARD TOGGLE
    // ========================================
    window.toggleCard = function(phase, cardId) {
        const card = document.getElementById(`card-${phase}-${cardId}`);
        if (card) {
            card.classList.toggle('open');
        }
    };

    // ========================================
    // CHECKLIST ITEM TOGGLE
    // ========================================
    window.toggleChecklistItem = function(itemId) {
        const parts = itemId.split('-');
        const phase = parts[0];
        const newState = !AppState.checklists[phase][itemId];
        AppState.checklists[phase][itemId] = newState;

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
        updateSubPhaseTabStatus(phase);
        saveProgress();
    };

    // ========================================
    // NOTES SAVE
    // ========================================
    window.saveNote = function(itemId, value) {
        const parts = itemId.split('-');
        const phase = parts[0];
        AppState.notes[phase][itemId] = value;
        saveProgress();
    };

    // ========================================
    // PROGRESS TRACKING
    // ========================================
    function updateProgress() {
        const phase = AppState.currentPhase;
        const data = phaseData[phase];
        if (!data) return;

        let total = 0, completed = 0;

        if (data.cards) {
            data.cards.forEach(card => {
                if (card.checklist) {
                    card.checklist.forEach((item, itemIndex) => {
                        const itemId = `${phase}-${card.id}-${itemIndex}`;
                        total++;
                        if (AppState.checklists[phase]?.[itemId]) completed++;
                    });
                }
            });
        }

        const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

        elements.progressFill.style.width = `${percentage}%`;
        elements.progressText.textContent = `${percentage}% Complete (${completed}/${total})`;
    }

    function focusFirstIncomplete(phase) {
        const data = phaseData[phase];
        if (!data || !data.cards) return;

        for (const card of data.cards) {
            if (!isSubPhaseComplete(phase, card.id)) {
                switchSubPhase(phase, card.id);
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
            currentPhase: AppState.currentPhase,
            timestamp: Date.now()
        };
        localStorage.setItem('powerscaling-analysis-progress', JSON.stringify(data));
    }

    function loadProgress() {
        try {
            const saved = localStorage.getItem('powerscaling-analysis-progress');
            if (saved) {
                const data = JSON.parse(saved);
                AppState.checklists = data.checklists || {};
                AppState.notes = data.notes || {};
                AppState.currentPhase = data.currentPhase || 'assessment';
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
        // Re-render all phases
        AppState.phases.forEach(phase => {
            updateSubPhaseTabStatus(phase);
            // Re-render checklists with loaded state
            rerenderChecklists(phase);
        });
        switchPhase(AppState.currentPhase);
        updateProgress();
        alert('Progress loaded!');
    };

    function rerenderChecklists(phase) {
        const data = phaseData[phase];
        if (!data || !data.cards) return;

        data.cards.forEach(card => {
            if (card.checklist) {
                const container = document.getElementById(`checklist-${phase}-${card.id}`);
                if (container) {
                    container.innerHTML = card.checklist.map((item, itemIndex) => 
                        createChecklistItemHTML(phase, card.id, itemIndex, item)
                    ).join('');
                }
            }
        });
    }

    // ========================================
    // DIAGRAMS RENDERING
    // ========================================
    function renderDiagrams() {
        const container = elements.diagramGallery;
        if (!container) return;

        container.innerHTML = diagrams.map(diagram => `
            <div class="diagram-card" data-diagram-id="${diagram.id}">
                <div class="diagram-header">
                    <div class="diagram-title">
                        <span>${diagram.icon || '📊'}</span>
                        <span>${diagram.title}</span>
                        <span class="diagram-category">${diagram.category}</span>
                    </div>
                </div>
                <div class="diagram-body">
                    <div class="diagram-wrapper">
                        ${diagram.svg}
                    </div>
                    <div class="diagram-info">
                        <h4>${diagram.title}</h4>
                        <p>${diagram.description}</p>
                        <div class="diagram-legend">
                            ${diagram.legend.map(l => `
                                <div class="legend-item">
                                    <div class="legend-color" style="background: ${l.color};"></div>
                                    <span>${l.label}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
                <div class="diagram-controls">
                    <button class="diagram-btn primary" onclick="expandDiagram('${diagram.id}')">🔍 Expand</button>
                    <button class="diagram-btn" onclick="copyDiagramSvg('${diagram.id}')">📋 Copy SVG</button>
                </div>
            </div>
        `).join('');

        // Initialize tooltips for interactive diagrams
        initDiagramTooltips();
    }

    // ========================================
    // DIAGRAM INTERACTIONS
    // ========================================
    function initDiagramTooltips() {
        const tooltip = document.createElement('div');
        tooltip.className = 'diagram-tooltip';
        document.body.appendChild(tooltip);

        document.querySelectorAll('.interactive').forEach(el => {
            el.addEventListener('mouseenter', (e) => showTooltip(e, el, tooltip));
            el.addEventListener('mousemove', (e) => positionTooltip(e, tooltip));
            el.addEventListener('mouseleave', () => hideTooltip(tooltip));
        });
    }

    function showTooltip(e, el, tooltip) {
        const name = el.dataset.name || el.dataset.tier || el.dataset.step || el.dataset.node || el.dataset.step || 'Element';
        const details = el.dataset.details || el.dataset.tier || '';
        
        tooltip.innerHTML = `
            <h5>${name}</h5>
            ${details ? `<p>${details}</p>` : ''}
        `;
        tooltip.classList.add('visible');
        positionTooltip(e, tooltip);
    }

    function positionTooltip(e, tooltip) {
        tooltip.style.left = (e.clientX + 15) + 'px';
        tooltip.style.top = (e.clientY + 15) + 'px';
    }

    function hideTooltip(tooltip) {
        tooltip.classList.remove('visible');
    }

    window.expandDiagram = function(diagramId) {
        const diagram = diagrams.find(d => d.id === diagramId);
        if (!diagram) return;

        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>${diagram.title}</title>
                <style>
                    body { margin: 0; padding: 20px; background: #0d1117; color: #e6edf3; font-family: system-ui; }
                    .diagram-container { max-width: 100%; margin: 0 auto; }
                    svg { width: 100%; height: auto; }
                    h1 { text-align: center; color: #58a6ff; }
                    .legend { display: flex; flex-wrap: wrap; gap: 1rem; margin-top: 20px; justify-content: center; }
                    .legend-item { display: flex; align-items: center; gap: 0.5rem; }
                    .legend-color { width: 20px; height: 20px; border-radius: 4px; }
                    @media print { body { background: white; color: black; } }
                </style>
            </head>
            <body>
                <h1>${diagram.title}</h1>
                <div class="diagram-container">${diagram.svg}</div>
                <div class="legend">
                    ${diagram.legend.map(l => `<div class="legend-item"><div class="legend-color" style="background: ${l.color}"></div><span>${l.label}</span></div>`).join('')}
                </div>
            </body>
            </html>
        `);
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
    };

    window.copyDiagramSvg = function(diagramId) {
        const diagram = diagrams.find(d => d.id === diagramId);
        if (!diagram) return;

        navigator.clipboard.writeText(diagram.svg).then(() => {
            alert('SVG copied to clipboard!');
        }).catch(() => {
            alert('Failed to copy SVG');
        });
    };

    // ========================================
    // EXPORT FUNCTIONS
    // ========================================
    window.exportToPDF = function() {
        const phase = AppState.currentPhase;
        const data = phaseData[phase];
        if (!data) return;

        const printWindow = window.open('', '_blank');
        const html = generateReportHTML(phase, data);
        printWindow.document.write(html);
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
    };

    window.printReport = function() {
        window.exportToPDF();
    };

    function generateReportHTML(phase, data) {
        const now = new Date().toLocaleDateString();
        let html = `
            <!DOCTYPE html>
            <html>
            <head>
                <title>Power Scaling Analysis Report - ${data.title || data.label}</title>
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
                <h1>⚡ Power Scaling Analysis Report</h1>
                <div class="meta">
                    <strong>Phase:</strong> ${data.icon || '📋'} ${data.title} (${data.description})<br>
                    <strong>Generated:</strong> ${now}<br>
                    <strong>Standards:</strong> NEC 2023 / IEEE 141,242,399,519,1584 / NFPA 70E,70B,110
                </div>
        `;

        // Calculate overall progress
        let total = 0, completed = 0;
        if (data.cards) {
            data.cards.forEach(card => {
                if (card.checklist) {
                    card.checklist.forEach((item, itemIndex) => {
                        const itemId = `${phase}-${card.id}-${itemIndex}`;
                        total++;
                        if (AppState.checklists[phase]?.[itemId]) completed++;
                    });
                }
            });
        }
        const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

        html += `
            <div class="progress">
                <strong>Overall Progress: ${percentage}% (${completed}/${total} items complete)</strong>
                <div class="progress-bar"><div class="progress-fill" style="width: ${percentage}%"></div></div>
            </div>
        `;

        if (data.cards) {
            data.cards.forEach(card => {
                const subPhaseComplete = isSubPhaseComplete(phase, card.id);
                html += `
                    <div class="phase">
                        <h2>${card.icon || '📋'} ${card.title} ${subPhaseComplete ? '✅' : ''}</h2>
                        <p>${card.description}</p>
                `;

                if (card.checklist) {
                    html += '<div class="checklist">';
                    card.checklist.forEach((item, itemIndex) => {
                        const itemId = `${phase}-${card.id}-${itemIndex}`;
                        const isDone = AppState.checklists[phase]?.[itemId] || false;
                        const note = AppState.notes[phase]?.[itemId] || '';
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

        html += `
                <hr style="margin-top: 40px;">
                <p style="color: #95a5a6; font-size: 0.85em; text-align: center;">
                    Generated by Electrical Installation Analysis - Power Scaling Module | NEC 2023 Compliant
                </p>
            </body>
            </html>
        `;

        return html;
    }

})();