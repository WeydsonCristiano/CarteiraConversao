import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('Teste o componente <App.js />', () => {
  test('Verificar se o heading do tiluto aparece na tela', () => {
    renderWithRouterAndRedux(<App />);
    const header = screen.getByRole('heading', {
      name: /hello, trybewallet!/i,
    });
    expect(header).toBeInTheDocument();
  });

  test('Verificar se o texto trybe Wallet', () => {
    renderWithRouterAndRedux(<App />);
    const heading = screen.getByRole('heading', {
      name: /trybe wallet/i,
    });
    expect(heading).toBeInTheDocument();
  });
  test('teste login', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const email = screen.getByTestId('email-input');
    expect(email).toBeInTheDocument();
    userEvent.type(email, 'sandraribeiro25@gmail.com');
    expect(email.value).toBe('sandraribeiro25@gmail.com');
    const passWord = screen.getByTestId('password-input');
    expect(passWord).toBeInTheDocument();
    userEvent.type(passWord, '123456');
    expect(passWord.value).toBe('123456');
    const botaoEntrar = screen.getByRole('button', {
      name: /entrar/i,
    });
    expect(botaoEntrar).toBeInTheDocument();
    expect(botaoEntrar).not.toBeDisabled();
    userEvent.click(botaoEntrar);
    const { pathname } = history.location;
    expect(pathname).toBe('/carteira');
  });

  test('teste se existe um Botao adicionar despesas', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });
    const botaoAdicionar = screen.getByRole('button', {
      name: /adicionar despesas/i,
    });
    expect(botaoAdicionar).toBeInTheDocument();
  });
});
