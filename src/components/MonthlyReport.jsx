import React from 'react';

const MonthlyReport = () => {
    const salary = parseFloat(sessionStorage.getItem("salary") || 0);
    const budget = parseFloat(sessionStorage.getItem("budget") || 0);
    const expenses = ["Food", "Transportation", "Entertainment", "Utilities", "Others"]
        .reduce((total, category) => total + parseFloat(sessionStorage.getItem(category) || 0), 0);
    const savings = salary - expenses;
    const withinBudget = savings >= budget;

    return (
        <div>
            <h2>Monthly Financial Report</h2>
            <p>Salary: ${salary.toFixed(2)}</p>
            <p>Total Expenses: ${expenses.toFixed(2)}</p>
            <p>Savings: ${savings.toFixed(2)}</p>
            <p>Budget: ${budget.toFixed(2)}</p>
            <p>Status: {withinBudget ? "Within budget" : "Over budget"}</p>
        </div>
    );
};

export default MonthlyReport;
