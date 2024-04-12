import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function BudgetInput() {
    const [budget, setBudget] = useState(() => {
        // Retrieve the stored budget from sessionStorage or set to 0 if not found
        const savedBudget = sessionStorage.getItem("budget");
        return savedBudget ? Number(savedBudget) : 0;
    });

    useEffect(() => {
        // Whenever the budget changes, update it in the sessionStorage
        sessionStorage.setItem("budget", budget);
    }, [budget]);

    const handleBudgetChange = (e) => {
        setBudget(e.target.value);
    };

    // Form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        //Set the balance equal to the new budget, then subtract all expenses from the new balance
        sessionStorage.setItem("balance", budget);
        sessionStorage.setItem("balance", parseFloat(sessionStorage.getItem("balance")) - sessionStorage.getItem("Food") - 
            sessionStorage.getItem("Transportation") - sessionStorage.getItem("Entertainment") - 
            sessionStorage.getItem("Utilities") - sessionStorage.getItem("Others"));
        // Show notification
        toast.success(`Your budget is set to: $${budget}`, { position: toast.POSITION.TOP_CENTER });
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
            <ToastContainer />{/* Notification window */}
        </div>
    );
}

export default BudgetInput;
