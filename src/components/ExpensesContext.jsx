import { createContext, useContext, useReducer } from 'react';





const ExpensesContext = createContext(null);
const ExpensesDispatchContext = createContext(null);

let expenseList = []
expenseList[expenseList.length] = { id: 0, text: "Sample expense", cost: 0, done: true };
sessionStorage.setItem("initialExpenses", JSON.stringify(expenseList));

export function ExpensesProvider({ children }) {
  const [expenses, dispatch] = useReducer(
    expensesReducer,
    JSON.parse(sessionStorage.getItem("initialExpenses"))
  );

  return (
    <ExpensesContext.Provider value={expenses}>
      <ExpensesDispatchContext.Provider
        value={dispatch}
      >
        {children}
      </ExpensesDispatchContext.Provider>
    </ExpensesContext.Provider>
  );
}

export function useExpenses() {
  return useContext(ExpensesContext);
}

export function useExpensesDispatch() {
  return useContext(ExpensesDispatchContext);
}

function expensesReducer(expenses, action) {
  switch (action.type) {
    case 'added': {
      sessionStorage.setItem("budget", sessionStorage.getItem("budget") - action.cost/2);
      return [...expenses, {
        id: action.id,
        text: action.text,
        cost: action.cost,
        done: false
      }];
    }
    case 'changed': {
      return expenses.map(t => {
        if (t.id === action.expense.id) {
          return action.expense;
        } else {
          return t;
        }
      });
    }
    case 'deleted': {
      return expenses.filter(t => t.id !== action.id);
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

//const initialExpenses = sessionStorage.getItem("initialExpenses")
//initialExpenses[initialExpenses.length] = {  };
