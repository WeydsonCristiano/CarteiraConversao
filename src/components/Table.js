import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { removerItens, editarDispesa } from '../redux/actions';

class Table extends Component {
  botaoRemover = (e) => {
    e.preventDefault();
    const { dispatch } = this.props;
    const { target: { id } } = e;
    dispatch(removerItens(id));
  };

  editarBotao = (id) => {
    const { dispatch } = this.props;
    dispatch(editarDispesa(id));
  };

  render() {
    const { expenses } = this.props;
    return (
      <table>
        <thead>
          <tr>
            <th>
              Descrição
            </th>
            <th>
              Tag
            </th>
            <th>
              Método de pagamento
            </th>
            <th>
              Valor
            </th>
            <th>
              Moeda
            </th>
            <th>
              Câmbio utilizado
            </th>
            <th>
              Valor convertido
            </th>
            <th>
              Moeda de conversão
            </th>
            <th>
              Editar/Excluir
            </th>
          </tr>
        </thead>
        <tbody>
          {
            expenses.map((e) => (
              <tr key={ e.id }>
                <td>{e.description}</td>
                <td>{e.tag}</td>
                <td>{e.method}</td>
                <td>{Number(e.value).toFixed(2)}</td>
                <td>{e.exchangeRates[e.currency].name}</td>
                <td>{Number(e.exchangeRates[e.currency].ask).toFixed(2)}</td>
                <td>{Number(e.value * e.exchangeRates[e.currency].ask).toFixed(2)}</td>
                <td>Real</td>
                <td>
                  <button
                    data-testid="edit-btn"
                    type="button"
                    id={ e.id }
                    onClick={ () => this.editarBotao(e.id) }
                  >
                    Editar
                  </button>
                  <button
                    data-testid="delete-btn"
                    id={ e.id }
                    type="button"
                    onClick={ this.botaoRemover }
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  dispatch: PropTypes.shape().isRequired,
};

export default connect(mapStateToProps)(Table);
