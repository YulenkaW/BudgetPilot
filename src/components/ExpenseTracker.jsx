import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';


ChartJS.register(ArcElement, Tooltip, Legend);

const ExpenseTracker = () => {
    
    const initialExpenses = [
        /*{ id: 1, description: 'Groceries', amount: 50 },
        { id: 2, description: 'Utilities', amount: 75 },
        { id: 3, description: 'Entertainment', amount: 30 },*/
    ];

    const [expenses, setExpenses] = useState(initialExpenses);

    
    useEffect(() => {
        
        console.log('Expenses have been set:', expenses);
    }, [expenses]); //  dependency array 

    return (
        <div>
            <h2>Expense Tracker</h2>
            <div id="CategoriesPieChart">
            <div style={{height:"40vh",position:"relative", marginBottom:"1%", padding:"1%"}}>
            <Pie data={{
            labels: ['Food', 'Transportation', 'Entertainment', 'Utilities', 'Others', 'Savings'],
            datasets: [
                {
                data: [parseFloat(sessionStorage.getItem("Food")), parseFloat(sessionStorage.getItem("Transportation")),
                parseFloat(sessionStorage.getItem("Entertainment")), parseFloat(sessionStorage.getItem("Utilities")),
                parseFloat(sessionStorage.getItem("Others")), Math.max(0,parseFloat(sessionStorage.getItem("balance")))],
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
                },
            ],
            }}
            options={{ maintainAspectRatio: false }} />
            </div>
            <table>
                <tr>
                <th>Category</th>
                <th>Amount</th>
                </tr>
                <tr>
                <td>Food</td>
                <td>${parseFloat(sessionStorage.getItem("Food"))}</td>
                </tr>
                <tr>
                <td>Transportation</td>
                <td>${parseFloat(sessionStorage.getItem("Transportation"))}</td>
                </tr>
                <tr>
                <td>Entertainment</td>
                <td>${parseFloat(sessionStorage.getItem("Entertainment"))}</td>
                </tr>
                <tr>
                <td>Utilities</td>
                <td>${parseFloat(sessionStorage.getItem("Utilities"))}</td>
                </tr>
                <tr>
                <td>Other</td>
                <td>${parseFloat(sessionStorage.getItem("Others"))}</td>
                </tr>
                <tr>
                <th>Savings</th>
                <td>${sessionStorage.getItem("balance")}</td>
                </tr>
            </table>
            </div>
            {(sessionStorage.getItem("balance") / sessionStorage.getItem("budget")) < 0.2 && 0 <= sessionStorage.getItem("balance") &&
              <p1 style={{color: "orangered"}}> You should try to save more money. </p1> }
            {sessionStorage.getItem("balance") < 0 &&
              <p1 style={{color: "firebrick", fontWeight: "bold"}}> You have exceeded your budget. </p1> }
            <ul>
                {expenses.map(expense => (
                    <li key={expense.id}>
                        {expense.description}: ${expense.amount}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ExpenseTracker;
