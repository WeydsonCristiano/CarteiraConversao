import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCurrent } from '../redux/actions';

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

class WalletForm extends Component {
  state = {
    value: 0,
    description: '',
  };

  componentDidMount() {
    const { moedas } = this.props;
    moedas();
  }

  handlechanger = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  render() {
    const { value, description } = this.state;
    const { currencies } = this.props;
    return (
      <>
        <div>WalletForm</div>
        <form>
          <input
            data-testid="value-input"
            name="value"
            value={ value }
            onChange={ this.handlechanger }
            type="text"
            required
          />
          <input
            data-testid="description-input"
            name="description"
            value={ description }
            type="text"
            required
          />
          <label htmlFor="currency">
            <select
              id="currency"
              data-testid="currency-input"
              defaultOption="Selecione"
              name="currency"
            >
              { currencies.map((e) => (
                <option key={ e } value={ e }>{e}</option>
              ))}

            </select>
          </label>
          <label htmlFor="method">
            <select
              id="method"
              data-testid="method-input"
              defaultOption="Selecione"
              name="method"
            >
              {PAGAMENTO_LIST.map((e) => (
                <option key={ e } value={ e }>{e}</option>
              ))}
            </select>
          </label>
          <label htmlFor="tag">
            <select
              id="tag"
              data-testid="tag-input"
              defaultOption="Selecione"
              name="tag"
            >
              {CATEGORIA_LIST.map((e) => (
                <option key={ e } value={ e }>{e}</option>
              ))}
            </select>
          </label>
        </form>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  moedas: () => dispatch(getCurrent()),
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
