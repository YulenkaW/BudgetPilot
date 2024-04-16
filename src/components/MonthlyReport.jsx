import React from 'react';

const MonthlyReport = () => {
    const budget = parseFloat(sessionStorage.getItem("budget") || 0);
    const expenses = ["Food", "Transportation", "Entertainment", "Utilities", "Others"]
        .reduce((total, category) => total + parseFloat(sessionStorage.getItem(category) || 0), 0);
    const savings = budget - expenses;

    return (
        <div>
            <h2>Monthly Financial Report</h2>
            <table>
                <tr>
                    <th>Description</th>
                    <th>Amount</th>
                </tr>
                <tr>
                    <td>Budget:</td>
                    <td>${budget.toFixed(2)}</td>
                </tr>
                <tr>
                    <td>Total Expenses:</td>
                    <td>${expenses.toFixed(2)}</td>
                </tr>
                <tr>
                    <td>Savings:</td>
                    <td>${savings.toFixed(2)}</td>
                </tr>
                <tr>
                    <td>Status:</td>
                    <td style={{ color: expenses >= budget ? '#b22222' : (expenses >= budget * 0.8 ? '#ffd700' : '#28a745'), fontWeight: 'bold' }}>
                        {expenses > budget
                            ? "You are in financial struggle"
                            : (expenses >= budget * 0.8
                                ? "You are above the rational spending"
                                : "You are within the budget")}
                    </td>

                </tr>
            </table>
        </div>
    );
};

export default MonthlyReport;

