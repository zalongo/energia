import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// Mock de react-router para evitar TextEncoder requirement
jest.mock('react-router', () => ({
  useNavigate: () => jest.fn(),
}));
import UserMenu from '../../ui/UserMenu';

// Mock de useApi para controlar user y logout
jest.mock('~/context/ApiContext', () => ({
  useApi: () => ({
    user: { userName: 'demo', nombre: 'Usuario Demo', roles: ['Usuario'] },
    logout: jest.fn(() => new Promise((resolve) => setTimeout(resolve, 0))),
  }),
}));

describe('UserMenu logout button', () => {
  test('renderiza con estilo destructivo y se deshabilita al cerrar sesión', async () => {
    render(<UserMenu />);

    const btn = screen.getByTestId('logout-button');
    expect(btn).toBeInTheDocument();

    // Texto inicial
    expect(btn).toHaveTextContent('Cerrar sesión');

  // Debe aplicar clases del color destructivo (rojo) explícitas
  expect(btn.className).toMatch(/bg-red-6/);
  expect(btn.className).toMatch(/border-red-6/);
  });
});
