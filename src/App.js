import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import BudgetInput from './components/BudgetInput';
import AddExpense from './components/AddExpense.jsx';
import ExpenseList from './components/ExpenseList.jsx';
import { ExpensesProvider } from './components/ExpensesContext.jsx';
import Login from './components/Login.jsx';
import FinancialTipPage from './components/FinancialTipPage.jsx';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    setLoggedIn(true);
  };

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          {!loggedIn ? (
            <Login onLogin={handleLogin} />
          ) : (
            <>
              <h1>BudgetPilot</h1>
              <div className="button-container">
                <Link to="/budget-input">
                  <button>Budget Input</button>
                </Link>
                <Link to="/add-expense">
                  <button>Add Expense</button>
                </Link>
                <Link to="/financial-tip">
                  <button>Financial Tips</button>
                </Link>
              </div>
              <Routes>
                <Route path="/budget-input" element={<BudgetInput />} />
                <Route path="/financial-tip" element={<FinancialTipPage />} />
                <Route path="/add-expense" element={<AddExpenseWithProvider />} />
              </Routes>
              {loggedIn && (
                <ExpensesProvider>
                  <ExpenseList />
                </ExpensesProvider>
              )}
            </>
          )}
        </header>
      </div>
    </Router>
  );
}

// Create a separate component to wrap AddExpense with ExpensesProvider
function AddExpenseWithProvider() {
  return (
    <ExpensesProvider>
      <AddExpense />
      <ExpenseList />
    </ExpensesProvider>
  );
}

export default App;
