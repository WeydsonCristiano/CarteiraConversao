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
  getCurrent = async () => {
    const endPont = 'https://economia.awesomeapi.com.br/json/all';
    const data = await fetch(endPont);
    const current = await data.jason();
  };

  render() {
    return (
      <>
        <div>WalletForm</div>
        <form>
          <Input
            data-testid="value-input"
            name="valor"
            type="text"
            required
          />
          <Input
            data-testid="description-input"
            name="despesa"
            type="text"
            required
          />
          <Select
            data-testid="currency-input"
            defaultOption="Selecione"
            label="Moeda: "
            name="moeda"
            options={ this.getCurrent }
          />
          <Select
            data-testid="method-input"
            defaultOption="Selecione"
            label="Pagamento: "
            name="pagamento"
            options={ PAGAMENTO_LIST }
          />
          <Select
            data-testid="tag-input"
            defaultOption="Selecione"
            label="Categoria: "
            name="categoria"
            options={ CATEGORIA_LIST }
          />

        </form>
      </>
    );
  }
}

export default connect()(WalletForm);
