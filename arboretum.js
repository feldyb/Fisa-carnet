// Arboretum Sheet JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the application
    initializeArboretumSheet();
});

function initializeArboretumSheet() {
    // Add event listeners for buttons
    setupButtonListeners();
    
    // Add form validation
    setupFormValidation();
    
    // Add table row functionality
    setupTableFunctionality();
    
    // Add auto-save functionality
    setupAutoSave();
}

function setupButtonListeners() {
    // Add species button for Species and Mixture table
    const addSpeciesBtn = document.querySelector('.table-container:first-child .btn-primary');
    if (addSpeciesBtn) {
        addSpeciesBtn.addEventListener('click', function() {
            addSpeciesRow('species-mixture');
        });
    }
    
    // Add species button for Component Species table
    const addComponentSpeciesBtn = document.querySelector('.table-container:last-child .btn-secondary:first-child');
    if (addComponentSpeciesBtn) {
        addComponentSpeciesBtn.addEventListener('click', function() {
            addSpeciesRow('component-species');
        });
    }
    
    // Cancel button
    const cancelBtn = document.querySelector('.btn-secondary:last-child');
    if (cancelBtn) {
        cancelBtn.addEventListener('click', function() {
            if (confirm('Sigur doriți să renunțați la modificări?')) {
                resetForm();
            }
        });
    }
}

function addSpeciesRow(tableType) {
    let table, tbody;
    
    if (tableType === 'species-mixture') {
        table = document.querySelector('.table-container:first-child .data-table');
        tbody = table.querySelector('tbody');
        
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td><input type="text" class="table-input" placeholder="Specia"></td>
            <td><input type="text" class="table-input" placeholder="Cod"></td>
            <td><input type="number" class="table-input" placeholder="P"></td>
            <td><input type="text" class="table-input" placeholder="R"></td>
            <td><input type="text" class="table-input" placeholder="DM"></td>
        `;
        
        // Add delete button
        const deleteCell = document.createElement('td');
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Șterge';
        deleteBtn.className = 'btn-delete';
        deleteBtn.onclick = function() {
            tbody.removeChild(newRow);
        };
        deleteCell.appendChild(deleteBtn);
        newRow.appendChild(deleteCell);
        
    } else if (tableType === 'component-species') {
        table = document.querySelector('.table-container:last-child .data-table');
        tbody = table.querySelector('tbody');
        
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td><input type="text" class="table-input" placeholder="Specia"></td>
            <td><input type="text" class="table-input" placeholder="Cod"></td>
            <td><input type="number" class="table-input" placeholder="P"></td>
            <td><input type="text" class="table-input" placeholder="DM"></td>
            <td><input type="text" class="table-input" placeholder="HM"></td>
            <td><input type="number" step="0.01" class="table-input" placeholder="VOLU"></td>
        `;
        
        // Add delete button
        const deleteCell = document.createElement('td');
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Șterge';
        deleteBtn.className = 'btn-delete';
        deleteBtn.onclick = function() {
            tbody.removeChild(newRow);
        };
        deleteCell.appendChild(deleteBtn);
        newRow.appendChild(deleteCell);
    }
    
    tbody.appendChild(newRow);
    
    // Add styles for table inputs
    addTableInputStyles();
}

function addTableInputStyles() {
    if (!document.getElementById('table-input-styles')) {
        const style = document.createElement('style');
        style.id = 'table-input-styles';
        style.textContent = `
            .table-input {
                width: 100%;
                padding: 4px 6px;
                border: 1px solid #c8e6c9;
                border-radius: 3px;
                font-size: 0.9rem;
                background-color: white;
            }
            .table-input:focus {
                outline: none;
                border-color: #4a7c59;
                box-shadow: 0 0 0 2px rgba(74, 124, 89, 0.1);
            }
            .btn-delete {
                background-color: #f44336;
                color: white;
                border: none;
                padding: 4px 8px;
                border-radius: 3px;
                font-size: 0.8rem;
                cursor: pointer;
            }
            .btn-delete:hover {
                background-color: #d32f2f;
            }
        `;
        document.head.appendChild(style);
    }
}

function setupFormValidation() {
    const formControls = document.querySelectorAll('.form-control');
    
    formControls.forEach(control => {
        control.addEventListener('blur', function() {
            validateField(this);
        });
        
        control.addEventListener('input', function() {
            clearFieldError(this);
        });
    });
}

function validateField(field) {
    const value = field.value.trim();
    
    // Remove existing error styling
    clearFieldError(field);
    
    // Basic validation rules
    if (field.hasAttribute('required') && !value) {
        showFieldError(field, 'Acest câmp este obligatoriu');
        return false;
    }
    
    // Validate numeric fields
    if (field.type === 'number' && value && isNaN(value)) {
        showFieldError(field, 'Introduceți un număr valid');
        return false;
    }
    
    return true;
}

function showFieldError(field, message) {
    field.style.borderColor = '#f44336';
    field.style.boxShadow = '0 0 0 3px rgba(244, 67, 54, 0.1)';
    
    // Add error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.textContent = message;
    errorDiv.style.color = '#f44336';
    errorDiv.style.fontSize = '0.8rem';
    errorDiv.style.marginTop = '4px';
    
    field.parentNode.appendChild(errorDiv);
}

function clearFieldError(field) {
    field.style.borderColor = '#c8e6c9';
    field.style.boxShadow = '';
    
    const errorDiv = field.parentNode.querySelector('.field-error');
    if (errorDiv) {
        errorDiv.remove();
    }
}

function setupTableFunctionality() {
    // Make existing table rows editable on click
    const tableRows = document.querySelectorAll('.data-table tbody tr');
    
    tableRows.forEach(row => {
        row.addEventListener('click', function() {
            makeRowEditable(this);
        });
    });
}

function makeRowEditable(row) {
    const cells = row.querySelectorAll('td');
    
    cells.forEach((cell, index) => {
        const currentText = cell.textContent;
        const input = document.createElement('input');
        input.type = 'text';
        input.value = currentText;
        input.className = 'table-input';
        
        // Replace cell content with input
        cell.textContent = '';
        cell.appendChild(input);
        
        // Focus on first input
        if (index === 0) {
            input.focus();
        }
        
        // Save on blur
        input.addEventListener('blur', function() {
            cell.textContent = this.value;
        });
        
        // Save on Enter key
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                this.blur();
            }
        });
    });
}

function setupAutoSave() {
    let saveTimeout;
    
    // Auto-save form data
    const formControls = document.querySelectorAll('.form-control');
    formControls.forEach(control => {
        control.addEventListener('input', function() {
            clearTimeout(saveTimeout);
            saveTimeout = setTimeout(() => {
                saveFormData();
            }, 1000); // Save after 1 second of inactivity
        });
    });
}

function saveFormData() {
    const formData = {};
    
    // Collect form data
    const formControls = document.querySelectorAll('.form-control');
    formControls.forEach(control => {
        const label = control.previousElementSibling?.textContent || control.placeholder;
        formData[label] = control.value;
    });
    
    // Save to localStorage
    localStorage.setItem('arboretumFormData', JSON.stringify(formData));
    
    // Show save indicator
    showSaveIndicator();
}

function showSaveIndicator() {
    // Remove existing indicator
    const existingIndicator = document.querySelector('.save-indicator');
    if (existingIndicator) {
        existingIndicator.remove();
    }
    
    // Create new indicator
    const indicator = document.createElement('div');
    indicator.className = 'save-indicator';
    indicator.textContent = 'Salvat automat';
    indicator.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: #4caf50;
        color: white;
        padding: 10px 15px;
        border-radius: 4px;
        font-size: 0.9rem;
        z-index: 1000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    document.body.appendChild(indicator);
    
    // Show indicator
    setTimeout(() => {
        indicator.style.opacity = '1';
    }, 100);
    
    // Hide indicator after 2 seconds
    setTimeout(() => {
        indicator.style.opacity = '0';
        setTimeout(() => {
            if (indicator.parentNode) {
                indicator.parentNode.removeChild(indicator);
            }
        }, 300);
    }, 2000);
}

function resetForm() {
    // Clear all form inputs
    const formControls = document.querySelectorAll('.form-control');
    formControls.forEach(control => {
        control.value = '';
        clearFieldError(control);
    });
    
    // Clear localStorage
    localStorage.removeItem('arboretumFormData');
    
    // Reset tables to original state
    resetTables();
}

function resetTables() {
    // Reset Species and Mixture table
    const speciesTable = document.querySelector('.table-container:first-child .data-table tbody');
    speciesTable.innerHTML = `
        <tr>
            <td>Moliță</td>
            <td>MO</td>
            <td>4</td>
            <td>-</td>
            <td>-</td>
        </tr>
        <tr>
            <td>Fag</td>
            <td>FA</td>
            <td>2</td>
            <td>-</td>
            <td>-</td>
        </tr>
    `;
    
    // Reset Component Species table
    const componentTable = document.querySelector('.table-container:last-child .data-table tbody');
    componentTable.innerHTML = `
        <tr>
            <td>Moliță</td>
            <td>MO</td>
            <td>3</td>
            <td>40 cm</td>
            <td>12 m</td>
            <td>0.21</td>
        </tr>
        <tr>
            <td>Fag</td>
            <td>FA</td>
            <td>2</td>
            <td>40 cm</td>
            <td>18 m</td>
            <td>0.81</td>
        </tr>
    `;
    
    // Re-setup table functionality
    setupTableFunctionality();
}

// Load saved data on page load
function loadSavedData() {
    const savedData = localStorage.getItem('arboretumFormData');
    if (savedData) {
        const formData = JSON.parse(savedData);
        
        const formControls = document.querySelectorAll('.form-control');
        formControls.forEach(control => {
            const label = control.previousElementSibling?.textContent || control.placeholder;
            if (formData[label]) {
                control.value = formData[label];
            }
        });
    }
}

// Call load function after DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    loadSavedData();
});