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
        onChange={f => setText1(f.target.value)}
      />
      <button onClick={() => {
        setText('');
        setText1('');
        dispatch({
          type: 'added',
          id: nextId++,
          text: text + "  :   " + text1,
        });
      }}>Add</button>
    </>
  );
}

let nextId = 3;
