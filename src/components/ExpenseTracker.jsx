import { useEffect, useState } from 'react';

const ExpenseTracker = () => {
    
    const initialExpenses = [
        { id: 1, description: 'Groceries', amount: 50 },
        { id: 2, description: 'Utilities', amount: 75 },
        { id: 3, description: 'Entertainment', amount: 30 },
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
                data: [parseFloat(sessionStorage.getItem("Food")), parseFloat(sessionStorage.getItem("Transportation")), parseFloat(sessionStorage.getItem("Entertainment")), parseFloat(sessionStorage.getItem("Utilities")), parseFloat(sessionStorage.getItem("Others")), parseFloat(sessionStorage.getItem("balance"))],
                backgroundColor: [
                    'rgba(0, 102, 204, 0.6)',
                    'rgba(204, 51, 255, 0.6)',
                    'rgba(255, 0, 0, 0.6)',
                    'rgba(255, 153, 51, 0.6)',
                    'rgba(255, 255, 102, 0.6)',
                    'rgba(0, 255, 0, 0.6)',
                ],
                borderColor: [
                    'rgba(0, 102, 204, 1)',
                    'rgba(204, 51, 255, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(255, 153, 51, 1)',
                    'rgba(255, 255, 102, 1)',
                    'rgba(0, 255, 0, 1)',
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
