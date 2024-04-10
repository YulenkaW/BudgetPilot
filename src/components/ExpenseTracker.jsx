import { useEffect, useState } from 'react';

const ExpenseTracker = () => {
    
    const initialExpenses = [
        { id: 1, description: 'Groceries', amount: 50 },
        { id: 2, description: 'Utilities', amount: 75 },
        { id: 3, description: 'Entertainment', amount: 30 },
    ];

    const [expenses, setExpenses] = useState(initialExpenses);

    //added
    useEffect(() => {
        // put into array
        console.log('Expenses have been set:', expenses);
    }, [expenses]); //  dependency array 

    return (
        <div>
            <h2>Expense Tracker</h2>
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
