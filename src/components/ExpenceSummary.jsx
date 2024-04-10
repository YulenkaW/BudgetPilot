
import React from 'react';
import { useExpenses } from './ExpensesContext.jsx';

const ExpenseSummary = () => {
    const expenses = useExpenses() || []; // Ensures expenses is always an array
//modified
    // Now that expenses is guaranteed to be an array, there's no need for conditional checks
    const totalExpenses = expenses.reduce((acc, expense) => {
        const parts = expense.text.split("  :   ");
        const amount = parseFloat(parts[parts.length - 1]);
        return acc + amount;
    }, 0);

    return (
        <div className="expense-summary">
            <h2>Expense Summary</h2>
            <p>Total Expenses: ${totalExpenses.toFixed(2)}</p>
        </div>
    );
};

export default ExpenseSummary;
