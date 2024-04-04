
import React, { useContext } from 'react';
import { useExpenses } from './ExpensesContext.jsx';

const ExpenseSummary = () => {
    // Custom hook to access expenses from our context
    const expenses = useExpenses();

    // Calculate the total expenses 
    const totalExpenses = expenses.reduce((acc, expense) => {
        // Assuming 'expense.text' contains the description and amount separated by "  :   "
        // and the amount is always at the end after the last "  :   " in the text
        const parts = expense.text.split("  :   ");
        const amount = parseFloat(parts[parts.length - 1]);
        return acc + amount;
    }, 0);

    // summary
    return (
        <div className="expense-summary">
            <h2>Expense Summary</h2>
            <p>Total Expenses: ${totalExpenses.toFixed(2)}</p>
        </div>
    );
};

export default ExpenseSummary;
