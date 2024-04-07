import { useEffect, useState } from 'react';
//import { getExpense } from "./helpers/apiHelpers";

//mapping throught the mango with expenses
const ExpenseTracker = () => {
    const [expenses, setExpenses ] = useState([]);
    useEffect(() => {
        //handleGetExpense();
        //fetchBudget();
    }, [expenses]);

    const handleGetExpense = () => {
        //const data = getExpense;
        //setExpenses(data)
    }
    const fetchBudget = async () => {
    try {
        const response = await fetch('http://localhost:3000/api/expenses');
        const data = await response;
        console.log('budget', data, response)
        //setBudget(data);
    } catch (error) {
        console.error('Error fetching budgets:', error);
    }
};
    return (
        <ul>
            {expenses.map(expense => (
                <li key={expense.id}>
                    {expense}
                </li>
            ))}
        </ul>
    ); 
}
export default ExpenseTracker;