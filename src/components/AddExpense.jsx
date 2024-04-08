import React, { useState, useContext } from 'react';
import { useExpensesDispatch } from './ExpensesContext.jsx';
//import ExpenseCategory from './ExpenseCategory.jsx';


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
      <table>
        <tr>
          <th>Category</th>
          <th>Amount</th>
        </tr>
        <tr>
          <td>Food</td>
          <td>${parseFloat(sessionStorage.getItem("Food"))}</td>
        </tr>
        <tr>
          <td>Transportation</td>
          <td>${parseFloat(sessionStorage.getItem("Transportation"))}</td>
        </tr>
        <tr>
          <td>Entertainment</td>
          <td>${parseFloat(sessionStorage.getItem("Entertainment"))}</td>
        </tr>
        <tr>
          <td>Utilities</td>
          <td>${parseFloat(sessionStorage.getItem("Utilities"))}</td>
        </tr>
        <tr>
          <td>Other</td>
          <td>${parseFloat(sessionStorage.getItem("Others"))}</td>
        </tr>
        <tr>
          <th>Savings</th>
          <td>${sessionStorage.getItem("balance")}</td>
        </tr>
      </table>
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