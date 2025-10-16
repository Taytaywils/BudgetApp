
const addBtn = document.getElementById('add-btn');
const template = document.getElementById('item-template');
const contentArea = document.getElementById('budget-area');
const transTemplate = document.getElementById('transaction-template');

// Add Budget Item
addBtn.addEventListener('click', () => {
    const clone = template.content.cloneNode(true);
    const category = clone.querySelector('.budget-category');
    const amount = clone.querySelector('.amount')

    // Attach event listener to the dynamic item to make sure content is not empty
    category.addEventListener('blur', () => {
        if (category.textContent.trim() === '') {
            category.textContent = 'New budget item';
        } else {
            category.textContent = category.textContent.trim();
        }
    });

    amount.addEventListener('blur', () => {
        let value = parseFloat(amount.textContent.trim());

        // If empty, set to 0.00
        if (amount.textContent.trim() === '') {
            amount.textContent = '0.00';
        // If not a number, set to 0.00
        } else if (isNaN(value)) {
            amount.textContent = '0.00';
        // Format to two decimals
        } else {
            amount.textContent = value.toFixed(2);
        }
    });

    contentArea.appendChild(clone);
    category.focus();
    // select the category text
    const range = document.createRange();
    range.selectNodeContents(category);
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
});

// Delete Budget Item
contentArea.addEventListener('click', (event) => {
    if (event.target.classList.contains('delete-item')) {
        const parent = event.target.closest('.trans-div') || event.target.closest('.budget-item');
        if (!parent) return;

        const transArea = parent.closest('.trans-area') || parent.querySelector('.trans-area');
        if (!transArea) return;

        parent.remove();
        
        if (transArea && transArea.querySelectorAll('.trans-div').length === 0) {
            const arrow = transArea.querySelector('.chevron');
            if (arrow) arrow.remove();
        }

// Add transaction
    } else if (event.target.classList.contains('add-trans')) {
        const budgetItem = event.target.closest('.budget-item');
        if (!budgetItem) return;

        const transArea = budgetItem.querySelector('.trans-area');
        if (!transArea) return;

        const clone = transTemplate.content.cloneNode(true);
        const trans = clone.querySelector('.transaction');
        const amount = clone.querySelector('.amount');

        // Dont let transaction label be empty
        trans.addEventListener('blur', () => {
            if (trans.textContent.trim() === '') {
                trans.textContent = 'New transaction';
            } else {
                trans.textContent = trans.textContent.trim();
            }
        });

        // Set amount to proper format
        amount.addEventListener('blur', () => {
            let value = parseFloat(amount.textContent.trim());

            // If empty, set to 0.00
            if (amount.textContent.trim() === '') {
                amount.textContent = '0.00';
            // If not a number, set to 0.00
            } else if (isNaN(value)) {
                amount.textContent = '0.00';
            // Format to two decimals
            } else {
                amount.textContent = value.toFixed(2);
            }
        });

        transArea.appendChild(clone);
        if (transArea.children.length === 1) {
            const arrow = document.createElement('span');
            arrow.classList.add('chevron');
            arrow.innerHTML = '&#8964;';
            transArea.insertBefore(arrow, transArea.firstChild);
            console.log(arrow.parentElement);
        }

        // Auto select the transaction label when created
        trans.focus();
        const range = document.createRange();
        range.selectNodeContents(trans);
        const sel = window.getSelection(trans);
        sel.removeAllRanges();
        sel.addRange(range);
    
    } else if (event.target.classList.contains('chevron')) {
        const arrow = event.target;
        const trans = arrow.parentElement;
        const parentDiv = trans.parentElement;
        arrow.classList.toggle('dropdown');
        
        parentDiv.querySelectorAll('.trans-div').forEach(el => {
            el.classList.toggle('dropdown');
        });
    }

});

document.addEventListener('DOMContentLoaded', () => {
    contentArea.addEventListener('focus', (event) => {
        if (event.target.classList.contains('amount') || event.target.classList.contains('budget-category') || event.target.classList.contains('transaction')) {
            const DOMitem = event.target;
            const range = document.createRange();
            range.selectNodeContents(DOMitem);
            const sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(range)
        }
    }, true);
});

