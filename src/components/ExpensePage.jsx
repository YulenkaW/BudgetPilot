import React, { useState } from 'react';
import '../App.css';
import AddExpense from './AddExpense';
import ExpenseSummary from './ExpenceSummary';
import ExpenseCategory from './ExpenseCategory';
import ExpenseList from './ExpenseList';
import ExpenseTracker from './ExpenseTracker';



const ExpensePage = () => {
    const [budgetAmount, setBudgetAmount] = useState(0);
    
    //ADDED to pass to summary, would use later
    const handleBudgetSet = (amount) => {
        setBudgetAmount(amount);
    };

 


    //added
    const onSelectCategory = (category) => {
        // added
        console.log('Selected category:', category);
    };


    return (
        <div>
            <h1>Manage Expenses</h1>
            <AddExpense onBudgetSet={handleBudgetSet} />
            <ExpenseList />
            {/*added*/}
            <ExpenseSummary />
            <ExpenseCategory onSelectCategory={onSelectCategory} />
            <ExpenseTracker />
            {/*added*/}
            {budgetAmount > 0 && <p>Remind you, your budget is: ${budgetAmount}</p>}
            {/* we can use function in creating lack of money */}
        </div>
    );
};

export default ExpensePage;
