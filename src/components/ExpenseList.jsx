import React, { useState } from 'react';
import { useExpenses, useExpensesDispatch } from './ExpensesContext.jsx';
import { useNavigate } from 'react-router'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
  const navigate = useNavigate()
  const softRefreshPage = () =>{
      navigate("/refresh");
      navigate(-1);
  }

  const handleDelete = () => {
    //Update the expense list
    let expenseList = JSON.parse(sessionStorage.getItem("initialExpenses"));
    for (let x in expenseList) {
      if (expenseList[x]["id"] == expense.id) {
        //Add the cost back to the balance
        sessionStorage.setItem("balance", parseFloat(sessionStorage.getItem("balance")) + parseFloat(expenseList[x]["cost"]));
        //Subtract the cost from the category total
        sessionStorage.setItem(expense.category, parseFloat(sessionStorage.getItem(expense.category)) - parseFloat(expenseList[x]["cost"]));
        break;
      }
    }
    const updatedExpenses = expenseList.filter(item => item.id !== expense.id);
    sessionStorage.setItem("initialExpenses", JSON.stringify(updatedExpenses));
    dispatch({ type: 'deleted', id: expense.id });
    //Refresh page to show changes
    softRefreshPage();
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
        <button onClick={() => {
          //If expense is not named
          if (expense.text == "") {
            toast.error("Expense name must be filled out", { position: toast.POSITION.TOP_CENTER });
          }
          else {
            setIsEditingText(false);
            let expenseList = JSON.parse(sessionStorage.getItem("initialExpenses"))
            for (let x in expenseList) {
                if (expenseList[x]["id"] == expense.id) {
                  //Get the stored cost with the new name
                  sessionStorage.removeItem(expenseList[x]["text"]);
                  sessionStorage.setItem(expense.text, expense.cost);
                  //Assign the new name
                  expenseList[x]["text"] = expense.text;
                  break;
                }
            }
            sessionStorage.setItem("initialExpenses", JSON.stringify(expenseList));
            //Refresh page to show changes
            softRefreshPage();
          }
          }}>
          Save
        </button>
        ) : (
          <button onClick={() => setIsEditingText(true)}>
            Edit
          </button>
        )}
      </td>
      <td style={tableCellStyle}>
        ${isEditingCost ? (
          <input
            value={expense.cost}
            type="number"
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
        <button onClick={() => {
        //if expense amount is not specified
        if (expense.cost == "") {
          toast.error("Expense amount must be filled out with a number", { position: toast.POSITION.TOP_CENTER });
        }
        //if expense amount is invalid
        else if (parseFloat(expense.cost) <= 0) {
          toast.error("Expense amount must above 0", { position: toast.POSITION.TOP_CENTER });
        }
        else {
          setIsEditingCost(false);
          let expenseList = JSON.parse(sessionStorage.getItem("initialExpenses"))
          for (let x in expenseList) {
              if (expenseList[x]["id"] == expense.id) {
                //Add the original cost back to the balance and subtract the new cost
                sessionStorage.setItem("balance", parseFloat(sessionStorage.getItem("balance")) + parseFloat(expenseList[x]["cost"]) - (parseFloat(expense.cost)));
                //Subtract the original cost from the category total and add the new one
                sessionStorage.setItem(expense.category, parseFloat(sessionStorage.getItem(expense.category)) - parseFloat(expenseList[x]["cost"]) + (parseFloat(expense.cost)));
                expenseList[x]["cost"] = expense.cost;
                break;
              }
          }
          sessionStorage.setItem("initialExpenses", JSON.stringify(expenseList));
          //Refresh page to show changes
          softRefreshPage();
        }
        }}>
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
        <button onClick={handleDelete} style={{ backgroundColor: 'rgb(175, 0, 0)'}}>
          Delete
        </button >
      </td>
    </tr>
  );
}
