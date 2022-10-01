import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
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
          0
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
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
