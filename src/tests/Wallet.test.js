import { screen } from '@testing-library/react';
import React from 'react';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('Testar funcionalidades no meu Wallet', () => {
  test('testar campos do walletForm', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });

    const walletForm = screen.getByText(/walletform/i);
    expect(walletForm).toBeInTheDocument();

    const descrição = screen.getByRole('columnheader', {
      name: /descrição/i,
    });
    expect(descrição).toBeInTheDocument();

    const method = screen.getByRole('columnheader', {
      name: /método de pagamento/i,
    });
    expect(method).toBeInTheDocument();

    const cambioUtilizado = screen.getByRole('columnheader', {
      name: /câmbio utilizado/i,
    });
    expect(cambioUtilizado).toBeInTheDocument();

    const moedaConvercao = screen.getByRole('columnheader', {
      name: /valor convertido/i,
    });
    expect(moedaConvercao).toBeInTheDocument();
  });
});
