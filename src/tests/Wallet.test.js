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

describe('Logica editar dispesa', () => {
  test('logica editar', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(async () => ({ json: async () => mockData }));
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });
    const valueInput = screen.getByTestId('value-input');
    const describeInput = screen.getByTestId('description-input');
    const btnAdc = screen.getByRole('button', {
      name: /adicionar despesas/i,
    });
    userEvent.click(btnAdc);
    const buttonEdt = await screen.findByTestId('edit-btn');
    userEvent.type(describeInput, 'leite');
    userEvent.click(btnAdc);
    await screen.findByRole('cell', {
      name: /leite/i,
    });
    userEvent.click(buttonEdt);
    userEvent.type(valueInput, '100');
    userEvent.type(describeInput, 'arroz');
    const btnEdt = screen.getByRole('button', {
      name: /editar despesas/i,
    });
    userEvent.click(btnEdt);
    await screen.findByRole('cell', {
      name: /arroz/i,
    });
  });
});

describe('Componente Botao Excluir', () => {
  test('testar Botão Excluir', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(async () => ({ json: async () => mockData }));
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });

    const btnAdc = screen.getByRole('button', {
      name: /adicionar despesas/i,
    });
    expect(btnAdc).toBeInTheDocument();
    userEvent.click(btnAdc);
    const btnExc = await screen.findByTestId('delete-btn');
    expect(btnExc).toBeInTheDocument();
    userEvent.click(btnExc);
  });
});
