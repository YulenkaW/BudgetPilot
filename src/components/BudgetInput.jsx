import React, { useState } from 'react';

function BudgetInput() {
    // store the budget amount
    const [budget, setBudget] = useState(0);

    
    const handleBudgetChange = (e) => {
        setBudget(e.target.value);
    };

    //Form submission
    const handleSubmit = (e) => {
        e.preventDefault(); // protection
        alert(`Budget set to: $${budget}`); // simple alert for now
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
        </div>
    );
}

export default BudgetInput;
