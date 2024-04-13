import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const ExpenseTracker = () => {
    const [expenses, setExpenses] = useState([]);

    const salary = parseFloat(sessionStorage.getItem("salary") || 0);
    const budget = parseFloat(sessionStorage.getItem("budget") || 0);

    const totalExpenses = ["Food", "Transportation", "Entertainment", "Utilities", "Others"]
        .reduce((total, category) => total + parseFloat(sessionStorage.getItem(category) || 0), 0);

    // updated: Calculate savings based on budget and total expenses
    const savings = budget - totalExpenses;
    
    sessionStorage.setItem("balance", savings);

    useEffect(() => {
        console.log('Expenses have been set:', expenses);
    }, [expenses]);

    return (
        <div>
            <h2>Expense Tracker</h2>
            <p>Reminding you, your salary is: ${salary.toFixed(2)}</p>
            <p>And your budget is: ${budget.toFixed(2)}</p>
            <p>Was spent: ${totalExpenses.toFixed(2)}</p>
            <div id="CategoriesPieChart">
                <div style={{ height: "40vh", position: "relative", marginBottom: "1%", padding: "1%" }}>
                    <Pie data={{
                        labels: ['Food', 'Transportation', 'Entertainment', 'Utilities', 'Others', 'Savings'],
                        datasets: [{
                            data: [
                                parseFloat(sessionStorage.getItem("Food")),
                                parseFloat(sessionStorage.getItem("Transportation")),
                                parseFloat(sessionStorage.getItem("Entertainment")),
                                parseFloat(sessionStorage.getItem("Utilities")),
                                parseFloat(sessionStorage.getItem("Others")),
                                Math.max(0, savings)  // savings cannot be negative 
                            ],
                            backgroundColor: [
                                'rgba(40, 74, 110, 0.6)', // Deep Blue
                                'rgba(177, 143, 255, 0.6)', // Light Lavender
                                'rgba(159, 72, 72, 0.6)', // Muted Red
                                'rgba(217, 121, 61, 0.6)', // Burnt Orange
                                'rgba(165, 157, 77, 0.6)', // Dark Yellow
                                'rgba(46, 93, 67, 0.6)', // Forest Green
                            ],
                            borderColor: [
                                'rgba(28, 54, 96, 1)', // Dark Blue
                                'rgba(99, 47, 118, 1)', // Deep Purple
                                'rgba(194, 94, 119, 1)', // Dusky Pink
                                'rgba(196, 102, 63, 1)', // Rusty Orange
                                'rgba(79, 116, 63, 1)', // Olive Green
                                'rgba(31, 59, 41, 1)', // Dark Green
                            ],
                            borderWidth: 1,
                        }],
                    }}
                        options={{ maintainAspectRatio: false }}
                    />
                </div>
                <table>
                    <tr>
                        <th>Category</th>
                        <th>Amount</th>
                    </tr>
                    {["Food", "Transportation", "Entertainment", "Utilities", "Others"].map(category => (
                        <tr key={category}>
                            <td>{category}</td>
                            <td>${parseFloat(sessionStorage.getItem(category) || 0).toFixed(2)}</td>
                        </tr>
                    ))}
                    <tr>
                        <th>Savings</th>
                        <td>${savings.toFixed(2)}</td>
                    </tr>
                </table>
            </div>
            {(savings / budget) < 0.2 && budget > 0 && savings >= 0 &&
                <p style={{ color: "orangered" }}>You should try to save more money.</p>}
            {savings < 0 &&
                <p style={{ color: "firebrick", fontWeight: "bold" }}>You have exceeded your budget.</p>}
            <ul>
                {expenses.map(expense => (
                    <li key={expense.id}>{expense.description}: ${expense.amount}</li>
                ))}
            </ul>
        </div>
    );
};

export default ExpenseTracker;
