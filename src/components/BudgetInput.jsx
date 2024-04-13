// Assuming the file is located at src/components/BudgetInput.jsx
import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function BudgetInput() {
    const [budget, setBudget] = useState(() => {
        const savedBudget = sessionStorage.getItem("budget");
        return savedBudget ? Number(savedBudget) : 0;
    });

    const [salary, setSalary] = useState(() => {
        const savedSalary = sessionStorage.getItem("salary");
        return savedSalary ? Number(savedSalary) : 0;
    });

    useEffect(() => {
        sessionStorage.setItem("budget", budget);
        sessionStorage.setItem("salary", salary);
    }, [budget, salary]);

    const handleBudgetChange = (e) => {
        setBudget(Number(e.target.value));
    };

    const handleSalaryChange = (e) => {
        setSalary(Number(e.target.value));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        toast.success(`Your budget is set to: $${budget} and salary is set to: $${salary}`, //{ position: toast.POSITION.TOP_CENTER }
    );
    };

    return (
        <div>
            <h2>Enter Your Monthly Budget and Salary</h2>
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
                <div className="input-group">
                    <label htmlFor="salaryInput">Monthly Salary:</label>
                    <input
                        type="number"
                        id="salaryInput"
                        value={salary}
                        onChange={handleSalaryChange}
                        placeholder="Enter your salary"
                    />
                </div>
                <button type="submit">Set Budget and Salary</button>
            </form>
            <p>Your current budget is: ${budget}</p>
            <p>Your current salary is: ${salary}</p>
            <ToastContainer />
        </div>
    );
}

export default BudgetInput;
