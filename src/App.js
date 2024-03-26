// App.js
import React, { useState } from 'react';
import './App.css';
import BudgetInput from './components/BudgetInput';
import AddExpense from './components/AddExpense.jsx';
import ExpenseList from './components/ExpenseList.jsx';
import { ExpensesProvider } from './components/ExpensesContext.jsx';
import Login from './components/Login.jsx'; 

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    // For simplicity, just set loggedIn state to true
    setLoggedIn(true);
  };

  return (
    <div className="App">
      <header className="App-header">
        {!loggedIn ? (
          <Login onLogin={handleLogin} />
        ) : (
          <>
            <BudgetInput />
            <ExpensesProvider>
              <h1>Enter Expenses</h1>
              <AddExpense />
              <ExpenseList />
            </ExpensesProvider>
          </>
        )}
      </header>
    </div>
  );
}

export default App;
