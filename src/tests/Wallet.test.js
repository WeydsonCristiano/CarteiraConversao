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
    expect(screen.getByRole('heading', {
      name: /brl/i,
    })).toBeInTheDocument();
    expect(screen.getByText(/walletform/i)).toBeInTheDocument();
    expect(screen.getByRole('spinbutton')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByText(/moeda:/i)).toBeInTheDocument();
    expect(screen.getByRole('combobox', {
      name: /moeda:/i,
    })).toBeInTheDocument();
    expect(screen.getByRole('combobox', {
      name: /metodo pagamento:/i,
    })).toBeInTheDocument();
    expect(screen.getByRole('combobox', {
      name: /categoria:/i,
    })).toBeInTheDocument();

    const moedaLocal = screen.getByRole('heading', {
      name: /brl/i,
    });
    expect(moedaLocal).toBeInTheDocument();
  });
});

describe('Componente Botao Adicionar Dispesas', () => {
  test('testar botao adicionar', () => {
    jest.spyOn(global, 'fetch').mockImplementation(async () => ({ json: async () => mockData }));
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });

    const btnAdc = screen.getByRole('button', {
      name: /adicionar despesas/i,
    });
    expect(btnAdc).toBeInTheDocument();
    userEvent.click(btnAdc);
  });
});

describe('Componente Botao editar', () => {
  test('testar botão editar', () => {
    jest.spyOn(global, 'fetch').mockImplementation(async () => ({ json: async () => mockData }));
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });

    const btnEdt = screen.getByRole('button', {
      name: /editar despesas/i,
    });
    expect(btnEdt).toBeInTheDocument();

    const buttonEdt = screen.getByTestId('edit-btn');
    expect(buttonEdt).toBeInTheDocument();
  });
});

describe('Componente Botao Excluir', () => {
  test('testar Botão Excluir', () => {
    jest.spyOn(global, 'fetch').mockImplementation(async () => ({ json: async () => mockData }));
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });

    const btnExc = screen.getByRole('button', {
      name: /excluir/i,
    });
    expect(btnExc).toBeInTheDocument();
    const buttonExc = screen.getByTestId('delete-btn');
    expect(buttonExc).toBeInTheDocument();
    userEvent.click(buttonExc);
  });
});
