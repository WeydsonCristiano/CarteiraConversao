import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { userForm } from '../redux/actions';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    isBtnDisabled: true,
  };

  handleInput = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, () => this.verifyBtn());
  };

  // referencia de regex com daniellegazarini aula esquenta.
  verifyBtn = () => {
    const numeroMagico = 6;
    const { email, password } = this.state;
    const regex = /\S+@\S+\.\S+/;
    const verifyEmail = regex.test(email);
    const verifyPassword = password.length >= numeroMagico;
    const btnState = verifyEmail && verifyPassword;
    this.setState({ isBtnDisabled: !(btnState) });
  };

  handleBtn = (e) => {
    e.preventDefault();
    const { history, dispatch } = this.props;
    const { email } = this.state;
    dispatch(userForm(email));
    history.push('/carteira');
  };

  render() {
    const { isBtnDisabled } = this.state;
    return (
      <section className="login">
        <h1>Trybe Wallet</h1>
        <form>
          <label htmlFor="email">
            <input
              data-testid="email-input"
              placeholder="Digite seu Email"
              type="text"
              name="email"
              onChange={ this.handleInput }
              required
            />
          </label>
          <label htmlFor="password">
            <input
              data-testid="password-input"
              placeholder="Digite sua Senha"
              type="password"
              name="password"
              onChange={ this.handleInput }
              required
            />
          </label>
          <button
            className="css-button-gradient--1 "
            type="submit"
            onClick={ this.handleBtn }
            disabled={ isBtnDisabled }
          >
            Entrar
          </button>
        </form>
      </section>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.shape().isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect()(withRouter(Login));
