
document.addEventListener("DOMContentLoaded", () => {
  const inputBudget = document.getElementById('budgetAmount');
  const inputExpense = document.getElementById('inputExpense');
  const inputAmount = document.getElementById('amount');
  const tbodyRef = document.querySelector('.table tbody');
  const incomeRef = document.getElementById('income');
  const expensesRef = document.getElementById('expenses');
  const balanceRef = document.getElementById('balance');

  function summaryInformation() {
    if (inputBudget.value) {
      incomeRef.textContent = `$${inputBudget.value}`;
      incomeRef.setAttribute('data-value', inputBudget.value);
      inputBudget.value = '';
    }
    
    let expenses = 0;

    tbodyRef.querySelectorAll('td[data-value]').forEach(value => {
      expenses += Number(value.dataset.value);
    });

    const balance = (Number(incomeRef.dataset.value) || 0) - expenses;

    expensesRef.textContent = `$${expenses.toFixed('2')}`;
    balanceRef.textContent = `$${balance.toFixed('2')}`;

    if (balance >= 0) {
      balanceRef.classList.add('footer__item-value--success');
      balanceRef.classList.remove('footer__item-value--danger');
    } else {
      balanceRef.classList.remove('footer__item-value--success');
      balanceRef.classList.add('footer__item-value--danger');
    }
  }

  function removeItem(trRef) {
    trRef.remove();
    summaryInformation();
  }

  inputBudget.addEventListener('blur', () => {
    summaryInformation();
  });

  document.querySelector('.section__add').addEventListener('click', () => {
    if (inputExpense.value && inputAmount.value) {
      const tr = document.createElement('tr');
      const button = document.createElement('button');
      
      button.classList.add('table__remove');
      button.innerHTML = '<img src="./images/trash.svg" alt="Trash">';
      button.addEventListener('click', () => {
        removeItem(tr);
      });

      tr.innerHTML = `
        <td>${inputExpense.value}</td>
        <td data-value="${inputAmount.value}">$${inputAmount.value}</td>
      `;
      tr.append(button);
      tbodyRef.append(tr);
      inputExpense.value = '';
      inputAmount.value = '';

      summaryInformation();
    }
  });
})
