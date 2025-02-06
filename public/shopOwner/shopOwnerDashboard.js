document.addEventListener('DOMContentLoaded', () => {
    const salesForm = document.getElementById('log-sales-form');
    const attendantForm = document.getElementById('add-attendant-form');
    const transactionsBtn = document.getElementById('view-transactions');
    const expensesBtn = document.getElementById('view-expenses');

    // Handle sales logging
    salesForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const salesAmount = document.getElementById('sales-amount').value;
        const salesDescription = document.getElementById('sales-description').value;

        const newSale = {
            amount: salesAmount,
            description: salesDescription
        };

        try {
            const response = await fetch('http://localhost:5000/shopowner/log-sale', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newSale)
            });
            const result = await response.json();
            if (response.ok) {
                alert('Sale logged successfully');
            } else {
                alert(result.message);
            }
        } catch (error) {
            alert('Error logging sale');
            console.error(error);
        }
    });

    // Handle adding an attendant
    attendantForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const attendantName = document.getElementById('attendant-name').value;
        const attendantRole = document.getElementById('attendant-role').value;

        const newAttendant = {
            name: attendantName,
            role: attendantRole
        };

        try {
            const response = await fetch('http://localhost:5000/shopowner/add-attendant', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newAttendant)
            });
            const result = await response.json();
            if (response.ok) {
                alert('Attendant added successfully');
            } else {
                alert(result.message);
            }
        } catch (error) {
            alert('Error adding attendant');
            console.error(error);
        }
    });

    // Fetch and display transactions
    transactionsBtn.addEventListener('click', async () => {
        try {
            const response = await fetch('http://localhost:5000/shopowner/get-transactions');
            const transactions = await response.json();
            const transactionList = document.getElementById('transaction-list');
            transactionList.innerHTML = '';
            transactions.forEach(transaction => {
                transactionList.innerHTML += `
                    <div class="p-2 bg-gray-200 rounded mb-2">
                        <p><strong>Amount:</strong> ${transaction.amount}</p>
                        <p><strong>Description:</strong> ${transaction.description}</p>
                        <p><strong>Date:</strong> ${transaction.date}</p>
                    </div>
                `;
            });
        } catch (error) {
            alert('Error fetching transactions');
            console.error(error);
        }
    });

    // Fetch and display expenses
    expensesBtn.addEventListener('click', async () => {
        try {
            const response = await fetch('http://localhost:5000/shopowner/get-expenses');
            const expenses = await response.json();
            const expenseList = document.getElementById('expense-list');
            expenseList.innerHTML = '';
            expenses.forEach(expense => {
                expenseList.innerHTML += `
                    <div class="p-2 bg-gray-200 rounded mb-2">
                        <p><strong>Amount:</strong> ${expense.amount}</p>
                        <p><strong>Description:</strong> ${expense.description}</p>
                        <p><strong>Date:</strong> ${expense.date}</p>
                    </div>
                `;
            });
        } catch (error) {
            alert('Error fetching expenses');
            console.error(error);
        }
    });
});
