// Electrical Installation Analysis - Simplified Application Logic
// This version focuses on reliability and clear UI

(() => {
  'use strict';

  // Check if data is loaded
  const checkDataLoaded = () => {
    const required = ['residentialData', 'commercialData', 'industrialData', 'powerScalingData'];
    const missing = required.filter(key => !(window[key] && typeof window[key] === 'object'));
    if (missing.length > 0) {
      console.error('Missing data:', missing);
      return false;
    }
    return true;
  };

  // State
  const state = {
    currentScale: localStorage.getItem('currentScale') || 'residential',
    checklists: JSON.parse(localStorage.getItem('checklists')) || {},
    notes: JSON.parse(localStorage.getItem('notes')) || {},
  };

  // DOM elements
  const elements = {
    scaleNav: document.querySelector('.scale-nav'),
    scaleContents: {
      residential: document.getElementById('residentialContent'),
      commercial: document.getElementById('commercialContent'),
      industrial: document.getElementById('industrialContent'),
      powerscaling: document.getElementById('powerscalingContent'),
      calculators: document.getElementById('calculatorsContent')
    },
    progressFill: document.getElementById('progressFill'),
    progressText: document.getElementById('progressText'),
    templateButtons: document.querySelector('.template-downloads')
  };

  // Scale data map
  const scaleData = {
    residential: window.residentialData,
    commercial: window.commercialData,
    industrial: window.industrialData,
    powerscaling: window.powerScalingData,
    calculators: null // handled separately
  };

  // Initialize the app
  const init = () => {
    if (!checkDataLoaded()) {
      // Show error message
      document.body.innerHTML = '<div style="padding: 20px; text-align: center; color: red;">Failed to load data. Please check the console for details.</div>';
      return;
    }

    // Set up event listeners for scale navigation
    elements.scaleNav.addEventListener('click', e => {
      const btn = e.target.closest('.scale-btn');
      if (btn) {
        const scale = btn.dataset.scale;
        if (scale && scale !== state.currentState) {
          switchScale(scale);
        }
      }
    });

    // Initial load
    switchState(state.currentScale);
  };

  // Switch to a scale
  const switchScale = (scale) => {
    // Update active button
    document.querySelectorAll('.scale-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.scale === scale);
    });

    // Hide all contents, show selected
    Object.values(elements.scaleContents).forEach(content => {
      if (content) content.classList.remove('active');
    });
    if (elements.scaleContents[scale]) {
      elements.scaleContents[scale].classList.add('active');
    }

    state.currentScale = scale;
    localStorage.setItem('currentScale', scale);

    // Render the scale content
    renderScale(scale);

    // Update progress
    updateProgress();
  };

  // Render the scale content (phases and steps)
  const renderScale = (scale) => {
    const container = elements.scaleContents[scale];
    if (!container) return;

    // Clear container
    container.innerHTML = '';

    // Special case for calculators
    if (scale === 'calculators') {
      // The calculators are already in the HTML, just show them
      container.innerHTML = document.getElementById('calculatorsContent').innerHTML;
      return;
    }

    const data = scaleData[scale];
    if (!data || !data.phases) {
      container.innerHTML = '<p>No data available for this scale.</p>';
      return;
    }

    // Create a container for the accordion
    const accordion = document.createElement('div');
    accordion.className = 'accordion';

    data.phases.forEach(phase => {
      const phaseEl = createPhaseElement(phase, scale);
      accordion.appendChild(phaseEl);
    });

    container.appendChild(accordion);
  };

  // Create a single phase element (accordion item)
  const createPhaseElement = (phase, scale) => {
    const phaseId = `${scale}-${phase.id}`;
    const isComplete = isPhaseComplete(scale, phase.id);

    const container = document.createElement('div');
    container.className = `accordion-item ${isComplete ? 'completed' : ''}`;

    const header = document.createElement('div');
    header.className = 'accordion-header';
    header.innerHTML = `
      <span class="phase-icon">${phase.icon}</span>
      <span class="phase-title">${phase.number}. ${phase.title}</span>
      <span class="phase-description">${phase.description}</span>
    `;
    header.onclick = () => togglePanel(container);

    const panel = document.createElement('div');
    panel.className = 'accordion-panel';
    panel.style.display = isComplete ? 'none' : 'block'; // Start collapsed if completed? Actually, we want to show completed? Let's show all by default, but maybe we want to hide completed? Let's show all, but mark completed.

    // Build steps
    if (phase.steps && phase.steps.length > 0) {
      const stepsList = document.createElement('div');
      stepsList.className = 'steps-list';

      phase.steps.forEach((step, stepIndex) => {
        const stepEl = createStepElement(step, scale, phase.id, stepIndex + 1);
        stepsList.appendChild(stepEl);
      });

      panel.appendChild(stepsList);
    }

    // Add verification and code refs if any
    if (phase.verification) {
      const verif = document.createElement('div');
      verif.className = 'verification';
      verif.innerHTML = `<strong>Verification:</strong> ${phase.verification}`;
      panel.appendChild(verif);
    }

    if (phase.codeRefs && phase.codeRefs.length > 0) {
      const refs = document.createElement('div');
      refs.className = 'code-refs';
      refs.innerHTML = `<strong>Code Refs:</strong> ${phase.codeRefs.join(', ')}`;
      panel.appendChild(refs);
    }

    container.appendChild(header);
    container.appendChild(panel);

    return container;
  };

  // Create a step element
  const createStepElement = (step, scale, phaseId, stepOrder) => {
    const stepId = `${scale}-${phaseId}-step${stepOrder}`;
    const stepDiv = document.createElement('div');
    stepDiv.className = 'step';

    const header = document.createElement('div');
    header.className = 'step-header';
    header.innerHTML = `
      <span class="step-icon">${getStepIcon(step.type)}</span>
      <span class="step-title">${step.title}</span>
    `;
    // Toggle step details
    header.onclick = () => {
      const body = stepDiv.querySelector('.step-body');
      if (body) {
        body.style.display = body.style.display === 'none' ? 'block' : 'none';
      }
    };

    const body = document.createElement('div');
    body.className = 'step-body';
    body.style.display = 'block'; // Start open

    if (step.instructions && step.instructions.length > 0) {
      const checklist = document.createElement('div');
      checklist.className = 'checklist';

      step.instructions.forEach((instr, instrIndex) => {
        const itemId = `${scale}-${phaseId}-step${stepOrder}-instr${instrIndex}`;
        const isDone = state.checklists[scale] && state.checklists[scale][itemId];
        const note = state.notes[scale] && state.notes[scale][itemId] || '';

        const item = document.createElement('div');
        item.className = `checklist-item ${isDone ? 'done' : ''}`;
        item.innerHTML = `
          <div class="checkbox" data-id="${itemId}" onclick="toggleChecklistItem('${itemId}')">
            ${isDone ? '✓' : ''}
          </div>
          <div class="content">
            <div class="text">${instr}</div>
            ${note ? `<div class="note">${note}</div>` : ''}
          </div>
        `;
        checklist.appendChild(item);
      });

      // Add a note textarea for each step? We already have per item.
      // But we can also add a general note for the step? Let's keep per item for now.

      body.appendChild(checklist);
    }

    stepDiv.appendChild(header);
    stepDiv.appendChild(body);

    return stepDiv;
  };

  // Toggle a checklist item
  window.toggleChecklistItem = (itemId) => {
    const [scale, phaseId, stepOrder, instrIndex] = itemId.split('-');
    // Actually, our itemId is like: residential-preSite-step1-instr0
    // We'll parse it differently: we stored the full id in the data-id attribute
    // But in the function above we set the onclick to pass the itemId directly.
    // So we can use the itemId as is.

    if (!state.checklists[state.currentScale]) {
      state.checklists[state.currentScale] = {};
    }
    state.checklists[state.currentScale][itemId] = !state.checklists[state.currentScale][itemId];
    if (!state.notes[state.currentScale]) {
      state.notes[state.currentScale] = {};
    }
    // Note: we don't change the note here, only the checkbox

    saveState();
    updateProgress();
    // Update UI: we need to re-render the checklist item? For simplicity, we'll reload the scale.
    // Alternatively, we can just toggle the class on the item.
    const checkbox = document.querySelector(`.checkbox[data-id="${itemId}"]`);
    if (checkbox) {
      checkbox.textContent = state.checklists[state.currentScale][itemId] ? '✓' : '';
      checkbox.parentElement.parentElement.classList.toggle('done', state.checklists[state.currentScale][itemId]);
    }
  };

  // Save note for an item (called from textarea onchange)
  window.saveNote = (itemId, value) => {
    if (!state.notes[state.currentScale]) {
      state.notes[state.currentScale] = {};
    }
    state.notes[state.currentScale][itemId] = value;
    saveState();
  };

  // Save state to localStorage
  const saveState = () => {
    localStorage.setItem('checklists', JSON.stringify(state.checklists));
    localStorage.setItem('notes', JSON.stringify(state.notes));
  };

  // Update progress bar
  const updateProgress = () => {
    const scale = state.currentScale;
    const data = scaleData[scale];
    if (!data || !data.phases) {
      elements.progressFill.style.width = '0%';
      elements.progressText.textContent = '0% Complete';
      return;
    }

    let totalItems = 0;
    let completedItems = 0;

    data.phases.forEach(phase => {
      if (phase.steps) {
        phase.steps.forEach((step, stepIndex) => {
          if (step.instructions) {
            step.instructions.forEach((_, instrIndex) => {
              const itemId = `${scale}-${phase.id}-step${stepIndex+1}-instr${instrIndex}`;
              totalItems++;
              if (state.checklists[scale] && state.checklists[scale][itemId]) {
                completedItems++;
              }
            });
          }
        });
      }
    });

    const percent = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;
    elements.progressFill.style.width = `${percent}%`;
    elements.progressText.textContent = `${percent}% Complete (${completedItems}/${totalItems})`;
  };

  // Check if a phase is complete (all its checklist items are done)
  const isPhaseComplete = (scale, phaseId) => {
    const data = scaleData[scale];
    if (!data) return false;
    const phase = data.phases.find(p => p.id === phaseId);
    if (!phase || !phase.steps) return false;

    let total = 0;
    let completed = 0;

    phase.steps.forEach((step, stepIndex) => {
      if (step.instructions) {
        step.instructions.forEach((_, instrIndex) => {
          const itemId = `${scale}-${phase.id}-step${stepIndex+1}-instr${instrIndex}`;
          total++;
          if (state.checklists[scale] && state.checklists[scale][itemId]) {
            completed++;
          }
        });
      }
    });

    return total > 0 && completed === total;
  };

  // Get icon for step type
  const getStepIcon = (type) => {
    const map = {
      'administrative': '📋',
      'coordination': '🤝',
      'engineering': '⚙️',
      'installation': '🔧',
      'assembly': '🔨',
      'verification': '✅',
      'finishing': '✨',
      'testing': '🧪',
      'assessment': '🔍',
      'inspection': '🔍'
    };
    return map[type] || '📄';
  };

  // Toggle accordion panel
  const togglePanel = (item) => {
    const panel = item.querySelector('.accordion-panel');
    if (panel) {
      const isHidden = panel.style.display === 'none';
      panel.style.display = isHidden ? 'block' : 'none';
      // Optionally, rotate an arrow indicator
    }
  };

  // Initialize when DOM is loaded
  document.addEventListener('DOMContentLoaded', init);

})();