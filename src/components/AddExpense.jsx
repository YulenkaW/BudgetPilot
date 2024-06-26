import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useExpensesDispatch } from './ExpensesContext.jsx';

export default function AddExpense({ onAddExpense }) {
  const [text, setText] = useState('');
  const [text1, setText1] = useState('');
  const dispatch = useExpensesDispatch();
  const [category, setCategory] = useState("");
  const navigate = useNavigate()
  // Retrieve the initial list of expenses or initialize if not present
  const initialExpenses = JSON.parse(sessionStorage.getItem("initialExpenses") || "[]");
  const [expenses, setExpenses] = useState(initialExpenses);
  let nextId = expenses.length > 0 ? Math.max(...expenses.map(exp => exp.id)) + 1 : 0;

  const addExpense = (newExpenseAmount) => {
    const currentTotalExpenses = parseFloat(sessionStorage.getItem("totalExpenses") || 0);
    const updatedTotalExpenses = currentTotalExpenses + parseFloat(newExpenseAmount);
    sessionStorage.setItem("totalExpenses", updatedTotalExpenses.toString());
  };

  addExpense(text1);

  const softRefreshPage = () => {
    navigate("/refresh");
    navigate(-1);
  }

  const handleChange = (e) => {
    setCategory(e.target.value)
  }
  

  const inputStyle = {
    width: '100%', 
    padding: '15px 10px', 
    fontSize: '16px', 
    margin: '5px 0',
    boxSizing: 'border-box', 
  };



  return (
    <>
      <form>
        <select value={category} onChange={handleChange} style={inputStyle}>
          <option value="">Choose a category</option>
          <option value="Food">Food</option>
          <option value="Transportation">Transportation</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Utilities">Utilities</option>
          <option value="Others">Others</option>
        </select>
      </form>
      <input className="large-input"
        placeholder="Expense Name"
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <input className="large-input"
        placeholder="Expense Amount"
        value={text1}
        type="number"
        onChange={f => setText1(f.target.value)}
      />

      
      <button onClick={() => {
        //if category is not selected
        if (category == "") {
          toast.error("Category must be selected")// , { position: toast.POSITION.TOP_CENTER });
          return false;
        }
        //if expense is not named
        else if (text == "") {
          toast.error("Expense name must be filled out")//, { position: toast.POSITION.TOP_CENTER });
        }
        //if expense amount is not specified
        else if (text1 == "") {
          toast.error("Expense amount must be filled out with a number")//, { position: toast.POSITION.TOP_CENTER });
        }
        //if expense amount is invalid
        else if (text1 <= 0) {
          toast.error("Expense amount must above 0")//, { position: toast.POSITION.TOP_CENTER });
        }
        else {
          setText('');
          setText1('');
          dispatch({
            type: 'added',
            id: nextId++,
            text: text,
            cost: parseFloat(text1),
            category: category,
          });
          sessionStorage.setItem(text, parseFloat(text1));
          expenseList = JSON.parse(sessionStorage.getItem("initialExpenses"))
          expenseList[expenseList.length] = { id: nextId++, text: text, cost: parseFloat(text1), category: category, done: false };
          sessionStorage.setItem("initialExpenses", JSON.stringify(expenseList));
          //Subtract expense amount from balance
          sessionStorage.setItem("balance", sessionStorage.getItem("balance") - parseFloat(text1));
          //Keep track of categories
          sessionStorage.setItem(category, parseFloat(sessionStorage.getItem(category)) + parseFloat(text1));
          //Refresh page to show changes
          softRefreshPage();
        }
      }}>Add</button>
      <ToastContainer />{/* Notification window */}
    </>
  );
}

let nextId = 0;
let expenseList = [];