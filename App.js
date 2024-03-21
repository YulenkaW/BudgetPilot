import React from 'react';
import BudgetInput from './components/BudgetInput';
import AddExpense from './components/AddExpense.jsx';
import ExpenseList from './components/ExpenseList.jsx';
import { ExpensesProvider } from './components/ExpensesContext.jsx';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                {/* Render the BudgetInput */}
                <BudgetInput />
                <ExpensesProvider>
                    <h1>Enter Expenses</h1>
                    <AddExpense /> 
                    <ExpenseList />
                </ExpensesProvider>
            </header>
        </div>
    );
}

export default App;
