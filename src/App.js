// App.js
import React, { useState } from 'react';
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Logo from './Logo.png';
import Name from './Logo_Name.png';
import AddExpense from './components/AddExpense.jsx';
import BudgetInput from './components/BudgetInput';
import ExpenseList from './components/ExpenseList.jsx';
import ExpenseTracker from "./components/ExpenseTracker.jsx";
import { ExpensesProvider } from './components/ExpensesContext.jsx';
import FinancialTipPage from './components/FinancialTipPage.jsx';
import Login from './components/Login.jsx';
import MonthlyReport from "./components/MonthlyReport.jsx";
import Rewards from "./components/Rewards.jsx"; // Import the Rewards component

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    setLoggedIn(true);
    // Set the category balances to 0; the Add Expense page won't work properly without this
    sessionStorage.setItem("Food", 0);
    sessionStorage.setItem("Transportation", 0);
    sessionStorage.setItem("Entertainment", 0);
    sessionStorage.setItem("Utilities", 0);
    sessionStorage.setItem("Others", 0);
    sessionStorage.setItem("balance", 0);
    sessionStorage.setItem("budget", 0);
  };

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          {!loggedIn ? (
            <Login onLogin={handleLogin} />
          ) : (
            <>
              <img src={Logo} alt="Logo" className="right-img"/>
              <h1 className="centered-img-container">
              <img src={Name} alt="Name" className="centered-img" />
              </h1>
                <div className="button-container">
                  <Link to="/budget-input">
                    <button >Budget Input</button>
                  </Link>
                  <Link to="/add-expense">
                    <button>Add Expense</button>
                  </Link>
                  <Link to="/financial-tip">
                    <button>Financial Tips</button>
                  </Link>
                  <Link to="/rewards">
                    <button>Rewards</button>
                  </Link>
                  <Link to="/monthly-report">
                    <button>Monthly Report</button>
                  </Link>
                </div>

                <Routes>
                  <Route path="/budget-input" element={<BudgetInput />} />
                  <Route path="/add-expense" element={<AddExpenseWithProvider />} />
                  <Route path="/financial-tip" element={<FinancialTipPage />} />
                  <Route path="/rewards" element={<Rewards />} />
                  <Route path="/monthly-report" element={<MonthlyReport />} />
                </Routes>
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
      <ExpenseTracker />
      <AddExpense />
      <ExpenseList />
    </ExpensesProvider>
  );
}

export default App;
