import { useState, useContext } from 'react';
import { useExpensesDispatch } from './ExpensesContext.jsx';

export default function AddExpense({ onAddExpense }) {
  const [text, setText] = useState('');
  const [text1, setText1] = useState('');
  const dispatch = useExpensesDispatch();
  return (
    <>
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
        });
        //
        sessionStorage.setItem(text, text1);
        expenseList = JSON.parse(sessionStorage.getItem("initialExpenses"))
        expenseList[expenseList.length] = { id: nextId++, text: text, cost: parseFloat(text1), done: false };
        sessionStorage.setItem("initialExpenses", JSON.stringify(expenseList));
      }}>Add</button>
    </>
  );
}

let nextId = 0;
let expenseList = [];