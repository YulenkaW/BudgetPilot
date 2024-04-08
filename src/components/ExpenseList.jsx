import { useState } from 'react';
import { useExpenses, useExpensesDispatch } from './ExpensesContext.jsx';

const tableHeaderStyle = {
  marginBottom: '0',
};

const tableRowStyle = {
  lineHeight: '0.75rem', // Adjust the line height as needed
};

const tableCellStyle = {
  padding: '0.25rem 1rem', // Adjust the padding as needed
};

export default function ExpenseList() {
  const expenses = useExpenses();

  return (
    <div>
      {expenses && expenses.length > 0 ? (
        <table>
          <thead>
            <tr style={tableHeaderStyle}>
              <th style={tableCellStyle}>Expense</th>
              <th style={tableCellStyle}>Expense</th>
              <th style={tableCellStyle}>Expense</th>
              <th style={tableCellStyle}>Action</th>
            </tr>
            <tr style={tableRowStyle}>
              <th style={tableCellStyle}>Name</th>
              <th style={tableCellStyle}>Amount</th>
              <th style={tableCellStyle}>Category</th>
              <th style={tableCellStyle}></th>
            </tr>
          </thead>
          <tbody>
            {expenses.map(expense => (
              <Expense key={expense.id} expense={expense} />
            ))}
          </tbody>
        </table>
      ) : (
        <p></p>
      )}
    </div>
  );
}

function Expense({ expense }) {
  const [isEditingText, setIsEditingText] = useState(false);
  const [isEditingCost, setIsEditingCost] = useState(false);
  const dispatch = useExpensesDispatch();

  const handleDelete = () => {
    sessionStorage.setItem("budget", parseFloat(sessionStorage.getItem("budget")) + parseFloat(expense.cost));
    let expenseList = JSON.parse(sessionStorage.getItem("initialExpenses"));
    const updatedExpenses = expenseList.filter(item => item.id !== expense.id);
    sessionStorage.setItem("initialExpenses", JSON.stringify(updatedExpenses));
    dispatch({ type: 'deleted', id: expense.id });
  };

  return (
    <tr style={tableRowStyle}>
      <td style={tableCellStyle}>
        {isEditingText ? (
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
        ) : (
          expense.text
        )}
        {isEditingText ? (
          <button onClick={() => setIsEditingText(false)}>
            Save
          </button>
        ) : (
          <button onClick={() => setIsEditingText(true)}>
            Edit
          </button>
        )}
      </td>
      <td style={tableCellStyle}>
        {isEditingCost ? (
          <input
            value={expense.cost}
            onChange={e => {
              dispatch({
                type: 'changed',
                expense: {
                  ...expense,
                  cost:  e.target.value,
                }
              });
            }} />
        ) : (
          expense.cost
        )}
        {isEditingCost ? (
          <button onClick={() => setIsEditingCost(false)}>
            Save
          </button>
        ) : (
          <button onClick={() => setIsEditingCost(true)}>
            Edit
          </button>
        )}
      </td>
      <td style={tableCellStyle}>{expense.category}</td>
      <td style={tableCellStyle}>
        <button onClick={handleDelete}>
          Delete
        </button >
      </td>
    </tr>
  );
}
