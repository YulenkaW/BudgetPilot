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
    <div id="CategoriesPieChart">
    <div style={{height:"40vh",position:"relative", marginBottom:"1%", padding:"1%"}}>
      <Pie data={{
      labels: ['Food', 'Transportation', 'Entertainment', 'Utilities', 'Others', 'Savings'],
      datasets: [
        {
          data: [parseFloat(sessionStorage.getItem("Food")), parseFloat(sessionStorage.getItem("Transportation")), parseFloat(sessionStorage.getItem("Entertainment")), parseFloat(sessionStorage.getItem("Utilities")), parseFloat(sessionStorage.getItem("Others")), parseFloat(sessionStorage.getItem("balance"))],
          backgroundColor: [
            'rgba(0, 102, 204, 0.6)',
            'rgba(204, 51, 255, 0.6)',
            'rgba(255, 0, 0, 0.6)',
            'rgba(255, 153, 51, 0.6)',
            'rgba(255, 255, 102, 0.6)',
            'rgba(0, 255, 0, 0.6)',
          ],
          borderColor: [
            'rgba(0, 102, 204, 1)',
            'rgba(204, 51, 255, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(255, 153, 51, 1)',
            'rgba(255, 255, 102, 1)',
            'rgba(0, 255, 0, 1)',
          ],
          borderWidth: 1,
        },
      ],
      }}
      options={{ maintainAspectRatio: false }} />
    </div>
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
      </div>
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