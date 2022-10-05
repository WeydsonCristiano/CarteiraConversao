import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getCurrent, salvarDispesas, objetoEditado } from '../redux/actions';

const PAGAMENTO_LIST = [
  'Dinheiro',
  'Cartão de crédito',
  'Cartão de débito',
];
const CATEGORIA_LIST = [
  'Alimentação',
  'Lazer',
  'Trabalho',
  'Transporte',
  'Saúde',
];

const INITIAL_STATE = {
  value: '',
  description: '',
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'Alimentação',
};

class WalletForm extends Component {
  state = {
    ...INITIAL_STATE,
  };

  componentDidMount() {
    const { moedas } = this.props;
    moedas();
  }

  handleChangerEdit = () => {
    const { id, expenses, editar } = this.props;
    const findExpense = expenses.find((e) => e.id === id);
    const { exchangeRates } = findExpense;
    const filterExpense = expenses.filter((e) => e.id !== id);
    const {
      value,
      description,
      currency,
      method,
      tag } = this.state;
    const objEditado = {
      id,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates };
    const newObj = [...filterExpense, objEditado].sort((a, b) => a.id - b.id);
    editar(newObj);

    this.setState({
      ...INITIAL_STATE,
    });
  };

  handlechanger = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  onClickButton = async (e) => {
    e.preventDefault();
    const { expenses, salvar } = this.props;
    const endPont = 'https://economia.awesomeapi.com.br/json/all';
    const data = await fetch(endPont);
    const requisicaoMoedas = await data.json();
    salvar({
      id: expenses.length,
      ...this.state,
      exchangeRates: requisicaoMoedas,
    });
    this.setState({
      ...INITIAL_STATE,
    });
  };

  render() {
    const { value, description, currency, method, tag } = this.state;
    const { currencies, editor } = this.props;
    return (
      <>
        <div>WalletForm</div>
        <form>
          Valor:
          <input
            data-testid="value-input"
            name="value"
            value={ value }
            onChange={ this.handlechanger }
            type="number"
            required
          />
          Descrição:
          <input
            data-testid="description-input"
            name="description"
            value={ description }
            onChange={ this.handlechanger }
            type="text"
            required
          />
          <label htmlFor="currency">
            Moeda:
            <select
              id="currency"
              onChange={ this.handlechanger }
              data-testid="currency-input"
              value={ currency }
              name="currency"
            >
              { currencies.map((e) => (
                <option key={ e } value={ e }>{e}</option>
              ))}

            </select>
          </label>
          <label htmlFor="method">
            Metodo Pagamento:
            <select
              id="method"
              value={ method }
              onChange={ this.handlechanger }
              data-testid="method-input"
              name="method"
            >
              {PAGAMENTO_LIST.map((e) => (
                <option key={ e } value={ e }>{e}</option>
              ))}
            </select>
          </label>
          <label htmlFor="tag">
            Categoria:
            <select
              id="tag"
              value={ tag }
              onChange={ this.handlechanger }
              data-testid="tag-input"
              name="tag"
            >
              {CATEGORIA_LIST.map((e) => (
                <option key={ e } value={ e }>{e}</option>
              ))}
            </select>
          </label>
          {
            editor
              ? (
                <button
                  onClick={ this.handleChangerEdit }
                  type="button"
                >
                  Editar despesas
                </button>)
              : (
                <button
                  type="button"
                  onClick={ this.onClickButton }
                >
                  Adicionar despesas
                </button>
              )
          }
        </form>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
  editor: state.wallet.editor,
  id: state.wallet.idToEdit,
});

const mapDispatchToProps = (dispatch) => ({
  moedas: (obj) => dispatch(getCurrent(obj)),
  salvar: (obj) => dispatch(salvarDispesas(obj)),
  editar: (obj) => dispatch(objetoEditado(obj)),
});

WalletForm.propTypes = {
  currencies: PropTypes.array.strings,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
