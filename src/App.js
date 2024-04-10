import React, { useState } from 'react';
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import BudgetInput from './components/BudgetInput';
// Removed direct import of AddExpense and ExpenseList from here
import ExpensePage from './components/ExpensePage'; // Import the newly created ExpensePage component
import FinancialTipPage from './components/FinancialTipPage.jsx';
import Login from './components/Login.jsx';

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
                <Link to="/budget-input"><button>Budget Input</button></Link>
                <Link to="/add-expense"><button>Add Expense</button></Link>
                <Link to="/financial-tip"><button>Financial Tips</button></Link>
              </div>
              <Routes>
                <Route path="/budget-input" element={<BudgetInput />} />
                <Route path="/add-expense" element={<ExpensePage />} /> {/* Updated this line */}
                <Route path="/financial-tip" element={<FinancialTipPage />} />
              </Routes>
            </>
          )}
        </header>
      </div>
    </Router>
  );
}

export default App;
