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
            <table>
                <tr>
                    <th>Description</th>
                    <th>Amount</th>
                </tr>
                <tr>
                    <td>Salary</td>
                    <td>${salary.toFixed(2)}</td>
                </tr>
                <tr>
                    <td>Total Expenses</td>
                    <td>${expenses.toFixed(2)}</td>
                </tr>
                <tr>
                    <td>Savings</td>
                    <td>${savings.toFixed(2)}</td>
                </tr>
                <tr>
                    <td>Budget</td>
                    <td>${budget.toFixed(2)}</td>
                </tr>
                <tr>
                    <td>Status</td>
                    <td style={{ color: (expenses > budget || expenses > salary) ? '#dc3545' : '#28a745', fontWeight: 'bold' }}>
                        {expenses > budget ? "Over budget" : expenses > salary ? "You spent more than your salary" : "Within budget"}
                    </td>
                </tr>
            </table>
        </div>
    );
};

export default MonthlyReport;

