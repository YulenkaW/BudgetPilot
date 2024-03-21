import { useState, useContext } from 'react';
import { useExpenses, useExpensesDispatch } from './ExpensesContext.jsx';

export default function ExpenseList() {
  const expenses = useExpenses();
  return (
    <ul>
      {expenses.map(expense => (
        <li key={expense.id}>
          <Expense expense={expense} />
        </li>
      ))}
    </ul>
  );
}

function Expense({ expense }) {
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useExpensesDispatch();
  let expenseContent;
  if (isEditing) {
    expenseContent = (
      <>
        <input
          value={expense.text}
          onChange={e => {
            dispatch({
              type: 'changed',
              expense: {
                ...expense,
                text: e.target.value
              }
            });
          }} />
        <button onClick={() => setIsEditing(false)}>
          Save
        </button>
      </>
    );
  } else {
    expenseContent = (
      <>
        {expense.text}
        <button onClick={() => setIsEditing(true)}>
          Edit
        </button>
      </>
    );
  }
  return (
    <label>
      <input
        type="checkbox"
        checked={expense.done}
        onChange={e => {
          dispatch({
            type: 'changed',
            expense: {
              ...expense,
              done: e.target.checked
            }
          });
        }}
      />
      {expenseContent}
      <button onClick={() => {
        dispatch({
          type: 'deleted',
          id: expense.id
        });
      }}>
        Delete
      </button>
    </label>
  );
}
