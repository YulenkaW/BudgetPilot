import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

function BudgetInput() {
    // store the budget amount
    const [budget, setBudget] = useState(0);
    const [, updateState] = React.useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);
    const handleBudgetChange = (e) => {
        setBudget(e.target.value);
    };

    //Form submission
    const handleSubmit = (e) => {
        e.preventDefault(); // protection
        alert(`Budget set to: $${budget}`); // simple alert for now\
        sessionStorage.setItem("budget", budget);
        forceUpdate();
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
            <p>Your current budget is: ${sessionStorage.getItem("budget")}</p>
        </div>
    );
}

export default BudgetInput;
