import React from 'react';

const MonthlyReport = () => {
    // Fetching budget and calculated expenses
    const salary = parseFloat(sessionStorage.getItem("salary") || 0);
    const budget = parseFloat(sessionStorage.getItem("budget") || 0);
    const expenses = parseFloat(sessionStorage.getItem("totalExpenses") || 0); 
    const savings = salary - expenses;
    const withinBudget = savings >= 0;

    //table
    const tableStyle = {
        width: '100%',
        marginBottom: '20px',
        borderCollapse: 'collapse'
    };

    const thStyle = {
        backgroundColor: '#f4f4f4',
        color: '#333',
        fontWeight: 'bold',
        padding: '10px',
        border: '1px solid #ddd',
        textAlign: 'right'
    };

    const tdStyle = {
        textAlign: 'right',
        padding: '8px',
        border: '1px solid #ddd'
    };

    const statusStyle = {
        ...tdStyle,
        color: withinBudget ? '#28a745' : '#dc3545', // Green if within budget, red if over budget
        fontWeight: 'bold',
    };

    return (
        <div>
            <h2>Monthly Financial Report</h2>
            <table style={tableStyle}>
                <thead>
                    <tr>
                        <th style={thStyle}>Description</th>
                        <th style={thStyle}>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style={tdStyle}>Salary</td>
                        <td style={tdStyle}>${salary.toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td style={tdStyle}>Total Expenses</td>
                        <td style={tdStyle}>${expenses.toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td style={tdStyle}>Savings</td>
                        <td style={tdStyle}>${savings.toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td style={tdStyle}>Budget</td>
                        <td style={tdStyle}>${budget.toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td style={tdStyle}>Status</td>
                        <td style={statusStyle}>{withinBudget ? "Within budget" : "Over budget"}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default MonthlyReport;
