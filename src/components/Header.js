import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  somaCompras = () => {
    const { expenses } = this.props;
    return expenses.reduce((acum, dispesa) => {
      const { ask } = dispesa.exchangeRates[dispesa.currency];
      const valorTotal = acum + (dispesa.value * ask);
      return Number(valorTotal);
    }, 0).toFixed(2);
  };

  render() {
    const { email } = this.props;
    return (
      <>
        <div>Header</div>
        <p
          data-testid="email-field"
        >
          { email}
        </p>
        <h3
          data-testid="total-field"
        >
          { this.somaCompras() }
        </h3>
        <h3
          data-testid="header-currency-field"
        >
          BRL
        </h3>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default connect(mapStateToProps)(Header);
