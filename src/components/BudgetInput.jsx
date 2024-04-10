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
        setBudget(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        toast.success(`Your budget is set to: $${budget}`, { position: "top-center" }); // Fixed position property
    };

    return (
        <div>
            <h2>Enter Your Monthly Budget</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="budgetInput">Monthly Budget:</label>
                <input
                    type="number"
                    id="budgetInput"
                    value={budget}
                    onChange={handleBudgetChange}
                    placeholder="Enter your budget"
                />
                <button type="submit">Set Budget</button>
            </form>
            <p>Your current budget is: ${budget}</p>
            <ToastContainer position="top-center" />{/* Notification window */}
        </div>
    );
}

export default BudgetInput;
