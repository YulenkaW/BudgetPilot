import React from 'react';
import BudgetInput from './components/BudgetInput';
import AddExpense from './components/AddExpense.jsx';
import ExpenseList from './components/ExpenseList.jsx';
import { ExpensesProvider } from './components/ExpensesContext.jsx';

function App() {
    return (
        <div className="App">
            <div style={{margin: '10px 0px 0px 30px'}} >
                <header className="App-header">
                    {/* Render the BudgetInput */}
                    <BudgetInput />
                    <ExpensesProvider>
                        <AddExpense /> 
                        <ExpenseList />
                    </ExpensesProvider>
                </header>
            </div>
        </div>

    );
}

export default App;
