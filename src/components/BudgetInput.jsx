import React, { useEffect, useState } from 'react';
import { getBudget, postBudget } from './helpers/apiHelpers';

function BudgetInput() {
    // store the budget amount
    const [budget, setBudget] = useState(0);

    
    useEffect(() => {
        handleGetBudget();
      
    }, [budget]);
    

    const handleGetBudget = () => {
        const data = getBudget;
        setBudget(data)
    }
    const handleBudgetChange = (e) => {
        setBudget(e.target.value);
    };

    //Form submission
    const handleSubmit = (e) => {
        e.preventDefault(); 
        alert(`Budget set to: $${budget}`); // simple alert for now
        
        postBudget('http://localhost:3000/api/budget', budget)
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
