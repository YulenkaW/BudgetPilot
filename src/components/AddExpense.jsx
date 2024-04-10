import React, { useState, useContext } from 'react';
import { useExpensesDispatch } from './ExpensesContext.jsx';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
//import ExpenseCategory from './ExpenseCategory.jsx';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function AddExpense({ onAddExpense }) {
  const [text, setText] = useState('');
  const [text1, setText1] = useState('');
  const dispatch = useExpensesDispatch();
  const [category, setCategory] = useState("");
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);
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
        placeholder="Add expense"
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <input
        placeholder="Expense amount"
        value={text1}
        type="number"
        onChange={f => setText1(f.target.value)}
      />
      <button onClick={() => {
        setText('');
        setText1('');
        dispatch({
          type: 'added',
          id: nextId++,
          text: text,
          cost: text1,
          category: category,
        });
        //Add expense to list
        sessionStorage.setItem(text, text1);
        expenseList = JSON.parse(sessionStorage.getItem("initialExpenses"))
        expenseList[expenseList.length] = { id: nextId++, text: text, cost: parseFloat(text1), category: category, done: false };
        sessionStorage.setItem("initialExpenses", JSON.stringify(expenseList));
        //Keep track of categories
        sessionStorage.setItem(category, parseFloat(sessionStorage.getItem(category)) + parseFloat(text1));
        forceUpdate();
      }}>Add</button>
    </>
  );
}

let nextId = 0;
let expenseList = [];