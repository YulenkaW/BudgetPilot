import React, { useState, useContext } from 'react';
import { useExpensesDispatch } from './ExpensesContext.jsx';
import { useNavigate } from 'react-router'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AddExpense({ onAddExpense }) {
  const [text, setText] = useState('');
  const [text1, setText1] = useState('');
  const dispatch = useExpensesDispatch();
  const [category, setCategory] = useState("");
  const navigate = useNavigate()
  const softRefreshPage = () =>{
      navigate("/refresh");
      navigate(-1);
  }

  const handleChange = (e) => {
    setCategory(e.target.value)  
  }
  return (
    <>
      <form>
        <select value={category} onChange={handleChange}>
          <option value="">Choose a category</option>
          <option value="Food">Food</option>
          <option value="Transportation">Transportation</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Utilities">Utilities</option>
          <option value="Others">Others</option>
        </select>
      </form>
      <input
        placeholder="Expense Name"
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <input
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
          toast.error("Expense amount must be filled out with a number", { position: toast.POSITION.TOP_CENTER });
        }
        //if expense amount is invalid
        else if (text1 <= 0) {
          toast.error("Expense amount must above 0", { position: toast.POSITION.TOP_CENTER });
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
          //Add expense to list
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