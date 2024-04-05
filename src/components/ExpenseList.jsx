// ExpenseList.jsx

import { useState, useContext } from 'react';
import { useExpenses, useExpensesDispatch } from './ExpensesContext.jsx';

export default function ExpenseList() {
  const expenses = useExpenses();

  // Check if expenses data is null or undefined
  if (!expenses) {
    return <p>No expenses found.</p>;
  }

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
  const [isEditingText, setIsEditingText] = useState(false);
  const [isEditingCost, setIsEditingCost] = useState(false);
  const dispatch = useExpensesDispatch();
  let expenseContent;
  if (isEditingText) {
    expenseContent = (
      <>
        <input
          value={expense.text}
          onChange={e => {
            dispatch({
              type: 'changed',
              expense: {
                ...expense,
                text: e.target.value,
              }
            });
          }} />
        <button onClick={() => setIsEditingText(false)}>
          Save
        </button>
      </>
    );
  } else if (isEditingCost) {
    let originalCost = parseFloat(sessionStorage.getItem(expense.text))
    expenseContent = (
      <>
        <input
          value={expense.cost}
          onChange={e => {
            dispatch({
              type: 'changed',
              expense: {
                ...expense,
                cost: e.target.value,
              }
            });
          }} />
        {expenseContent}
        <button onClick={() => {
          sessionStorage.setItem("budget", parseFloat(sessionStorage.getItem("budget")) + (originalCost) - (parseFloat(expense.cost)));
          let expenseList = JSON.parse(sessionStorage.getItem("initialExpenses"))
          for (let x in expenseList) {
              if (expenseList[x]["id"] == expense.id) {
                expenseList[x]["cost"] = expense.cost;
                break;
              }
          }
          sessionStorage.setItem("initialExpenses", JSON.stringify(expenseList));
          setIsEditingCost(false)
        }}>
          Save
        </button>
      </>
    );
  } else {
    expenseContent = (
      <>
        {expense.text}
        <button onClick={() => setIsEditingText(true)}>
          Edit
        </button>
        {expense.cost}
        <button onClick={() => setIsEditingCost(true)}>
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
        sessionStorage.setItem("budget", parseFloat(sessionStorage.getItem("budget")) + parseFloat(expense.cost));
        let expenseList = JSON.parse(sessionStorage.getItem("initialExpenses"))
        for (let x in expenseList) {
            if (expenseList[x]["id"] == expense.id) {
              expenseList.splice(x,1);
              break;
            }
        }
        sessionStorage.setItem("initialExpenses", JSON.stringify(expenseList));
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
