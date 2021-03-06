import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCurrencies, fetchCurrenciesData, addExpense, editExpense } from '../../actions';
import './WalletForm.css';

class WalletForm extends React.Component {
  constructor() {
    super();

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getWhatToRender = this.getWhatToRender.bind(this);

    this.state = {     
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      exchangeRates: {},
    };
  }

  componentDidMount() {
    const { fetchCurrenciesProps } = this.props;   
    fetchCurrenciesProps();  
  }   

  getWhatToRender() {
    const { expenseToEditProps } = this.props;
      this.setState(expenseToEditProps);
  }

  handleInputChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  async handleSubmit(event) {
    event.preventDefault();
    const { addExpenseProps, fetchCurrenciesDataProps } = this.props;
    await fetchCurrenciesDataProps();
    addExpenseProps({...this.state});
    this.setState({
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      exchangeRates: {},
    });
  }

  
  render() {

    const { currenciesProps, isToEditProps, editExpenseProps } = this.props;
    const { value, description, method, tag, currency } = this.state;

   if(isToEditProps && this.state.id === undefined) this.getWhatToRender();

      return (
      <form className="wallet-form">
         <label htmlFor="description">
          Descrição:
          <input
            data-testid="description-input"
            type="text"
            id="description"
            name="description"
            value={ description }
            onChange={ this.handleInputChange }
            className="wallet-input-box"
          />
        </label>
        <label htmlFor="value">
          Valor:
          <input
            data-testid="value-input"
            type="number"
            id="value"
            name="value"
            value={ value }
            onChange={ this.handleInputChange }
            className="wallet-input-box"
          />
        </label>       
        <label htmlFor="currency">
          Moeda:
          <select
            data-testid="currency-input"
            id="currency"
            name="currency"
            value={ currency }
            onChange={ this.handleInputChange }
            className="wallet-input-box"
          >
            {currenciesProps
              .map((exchange) => (
                <option data-testid={ exchange } value={ exchange } key={ exchange }>
                  { exchange }
                </option>
              ))}
          </select>
        </label>
        <label htmlFor="method">
          Pagamento:
          <select
            data-testid="method-input"
            name="method"
            id="method"
            value={ method }
            onChange={ this.handleInputChange }
            className="wallet-input-box"
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>

          </select>
        </label>
        <label htmlFor="tag">
          Tipo:
          <select
            data-testid="tag-input"
            name="tag"
            id="tag"
            value={ tag }
            onChange={ this.handleInputChange }
            className="wallet-input-box"
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
        <button
          type="button"
          onClick={ isToEditProps ? () => editExpenseProps({...this.state}) : this.handleSubmit }
          className="wallet-form-button"
        >
          { isToEditProps ? 'Editar' : 'Adicionar despesa' }
        </button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currenciesProps: state.wallet.currencies,
  isToEditProps: state.wallet.isToEdit,
  expenseToEditProps: state.wallet.expenseToEdit,
 });

const mapDispatchToProps = (dispatch) => ({
  fetchCurrenciesProps: () => dispatch(fetchCurrencies()),
  fetchCurrenciesDataProps: () => dispatch(fetchCurrenciesData()),
  addExpenseProps: (expense) => dispatch(addExpense(expense)),
  editExpenseProps: (expense) => dispatch(editExpense(expense)),
});

WalletForm.propTypes = {
  fetchCurrenciesProps: PropTypes.func.isRequired,
  addExpenseProps: PropTypes.func.isRequired,
  currenciesProps: PropTypes.arrayOf(PropTypes.string).isRequired,
  fetchCurrenciesDataProps: PropTypes.func.isRequired,
};
export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
