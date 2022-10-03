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
      <div>
        <h1>Trybe Wallet</h1>
        <form>
          <div>
            <label htmlFor="email">
              <input
                data-testid="email-input"
                type="text"
                name="email"
                onChange={ this.handleInput }
                required
              />
              Email:

            </label>
          </div>
          <div className="input-container">
            <label htmlFor="password">
              <input
                data-testid="password-input"
                type="password"
                name="password"
                onChange={ this.handleInput }
                required
              />
              Password:
            </label>
          </div>
          <button
            type="submit"
            onClick={ this.handleBtn }
            disabled={ isBtnDisabled }
          >
            Entrar

          </button>
        </form>
      </div>
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
