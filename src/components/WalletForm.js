import React, { Component } from 'react';
import { connect } from 'react-redux';

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

  handlechanger = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  render() {
    const { value, description } = this.state;
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
              0

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

export default connect()(WalletForm);
