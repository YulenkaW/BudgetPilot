import { createContext, useContext, useReducer } from 'react';

const ExpensesContext = createContext(null);
const ExpensesDispatchContext = createContext(null);

export function ExpensesProvider({ children }) {
  const [expenses, dispatch] = useReducer(
    expensesReducer,
    initialExpenses
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
      return [...expenses, {
        id: action.id,
        text: action.text,
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

const initialExpenses = [];
