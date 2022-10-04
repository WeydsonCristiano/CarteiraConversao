import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';
import mockData from './helpers/mockData';

describe('Testar funcionalidades no meu Wallet', () => {
  test('testar campos do walletForm', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(async () => ({ json: async () => mockData }));
    // ajuda do sakae ^^^
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });

    const walletForm = screen.getByText(/walletform/i);
    expect(walletForm).toBeInTheDocument();

    expect(screen.getByText(/0\.00/i)).toBeInTheDocument();

    const adicionarDispesa = screen.getByRole('button', {
      name: /adicionar despesas/i,
    });
    expect(adicionarDispesa).toBeInTheDocument();
    userEvent.click(adicionarDispesa);

    const descricao = screen.getByRole('columnheader', {
      name: /descrição/i,
    });
    expect(descricao).toBeInTheDocument();

    const descricao2 = screen.getByTestId('description-input');
    expect(descricao2).toBeInTheDocument();

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

    const moeda = screen.getByTestId('currency-input');
    expect(moeda).toBeInTheDocument();
    await waitFor(() => expect(moeda).toHaveValue('USD'));
    userEvent.selectOptions(moeda, 'CAD');

    const formaPagamento = screen.getByTestId('method-input');
    expect(formaPagamento).toBeInTheDocument();
    userEvent.selectOptions(formaPagamento, 'Cartão de crédito');

    const btnExcluir = screen.getByRole('button', {
      name: /excluir/i,
    });
    expect(btnExcluir).toBeInTheDocument();
    userEvent.click(btnExcluir);
  });
});
