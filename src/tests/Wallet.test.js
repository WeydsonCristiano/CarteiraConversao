import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';
import mockData from './helpers/mockData';

describe('Testar funcionalidades no meu Wallet', () => {
  test('testar campos do walletForm', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(async () => ({ json: async () => mockData }));
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });
    expect(screen.getByText(/0\.00/i)).toBeInTheDocument();
    const moedaLocal = screen.getByRole('heading', {
      name: /brl/i,
    });
    expect(moedaLocal).toBeInTheDocument();
  });
});

describe('Componente Botao Adicionar Dispesas', () => {
  test('O editar deve aparecer quando clicar no botão', () => {
    jest.spyOn(global, 'fetch').mockImplementation(async () => ({ json: async () => mockData }));
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });

    const button = screen.getByRole('button', {
      name: /adicionar despesas/i,
    });
    expect(button).toBeInTheDocument();
    userEvent.click(button);
  });
});
