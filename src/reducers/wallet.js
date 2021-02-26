import {
  REQUEST_CURRENCIES,
  REQUEST_CURRENCIES_DATA,
  ADD_EXPENSE,
  DELETE_EXPENSE,
  GET_EDIT_EXPENSE,
  EDIT_EXPENSE,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  latestExchange: {},
  currentId: 0,
  totalExpense: 0,
  isToEdit: false,
  expenseToEdit: {
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      exchangeRates: {},},
};

function getTotalValue(expenses) {
  const totalValue = expenses.reduce((acc, expense) => acc
    + Number(expense.value)
      * Number(expense.exchangeRates[expense.currency].ask),
  0);
  return totalValue;
}

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
  case REQUEST_CURRENCIES:
    return { ...state, currencies: (action.currencies).sort() };
  case REQUEST_CURRENCIES_DATA:
    return { ...state, latestExchange: action.exchangeRates };
  case ADD_EXPENSE:
    action.expense.id = state.currentId;
    action.expense.exchangeRates = { ...state.latestExchange };
    return { ...state,
      expenses: [...state.expenses, action.expense],
      currentId: state.currentId + 1,
      totalExpense: getTotalValue([...state.expenses, action.expense]),
    };
  case DELETE_EXPENSE:
    return { ...state,
      expenses: [...state.expenses.filter(({ id }) => id !== action.id)],
      totalExpense: getTotalValue(
        [...state.expenses.filter(({ id }) => id !== action.id)],
      ),
    };
  case GET_EDIT_EXPENSE:
    return { ...state,
      expenseToEdit: action.expense,
      isToEdit: true,
    };
  case EDIT_EXPENSE: {
    const index = action.id;
    const expensesState = [...state.expenses];
    expensesState[index] = { ...action.expense };
    return {
      ...state,
      expenses: [
        ...expensesState,
      ],
      isToEdit: false,
    };
  }

  default:
    return state;
  }
}
