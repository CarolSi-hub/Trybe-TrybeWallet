import getCurrencies from '../services';

export const SIGNIN = 'SIGNIN';
export const signIn = (email) => ({ type: SIGNIN, email });

export const ADD_EXPENSE = 'ADD_EXPENSE';
export const addExpense = (expense) => (
  { type: ADD_EXPENSE, expense });

export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const deleteExpense = (id) => (
  { type: DELETE_EXPENSE, id });

export const GET_EDIT_EXPENSE = 'GET_EDIT_EXPENSE';
export const getEditExpense = (expense) => (
  { type: GET_EDIT_EXPENSE, expense });

export const EDIT_EXPENSE = 'EDIT_EXPENSE';
export const editExpense = (expense) => (
  { type: EDIT_EXPENSE, expense });

export const REQUEST_CURRENCIES = 'REQUEST_CURRENCIES';
export const requestCurrencies = (currencies) => (
  { type: REQUEST_CURRENCIES, currencies });

export const REQUEST_CURRENCIES_DATA = 'REQUEST_CURRENCIES_DATA';
export const requestCurrenciesData = (currencies) => (
  { type: REQUEST_CURRENCIES_DATA, exchangeRates: currencies });

export function fetchCurrencies() {
  return async (dispatch) => {
    const response = await getCurrencies();
    const currencies = Object.keys(response);
    const filteredCurrencies = currencies.filter((currency) => currency !== 'USDT');
    dispatch(requestCurrencies(filteredCurrencies));
  };
}

export function fetchCurrenciesData() {
  return async (dispatch) => {
    const response = await getCurrencies();
    dispatch(requestCurrenciesData(response));
  };
}
