
import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function BudgetInput() {
    const [budget, setBudget] = useState(() => {
        const savedBudget = sessionStorage.getItem("budget");
        return savedBudget ? Number(savedBudget) : 0;
    });

    useEffect(() => {
        sessionStorage.setItem("budget", budget);
    }, [budget]);

    const handleBudgetChange = (e) => {
        setBudget(Number(e.target.value));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        toast.success(`Your budget is set to: $${budget}. You should try to spend $${budget*0.8} or less.`, 
    );
    };

    return (
        <div>
            <h2>Enter Your Monthly Budget</h2>
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label htmlFor="budgetInput">Monthly Budget:</label>
                    <input
                        type="number"
                        id="budgetInput"
                        value={budget}
                        onChange={handleBudgetChange}
                        placeholder="Enter your budget"
                    />
                </div>
                <button type="submit" className="blue-button">Set Budget</button>

            </form>
            <p>Your current budget: ${budget}</p>
            <ToastContainer />
        </div>
    );
}

export default BudgetInput;
