import React from 'react';
import { render, screen } from '@testing-library/react';
import LoginPage from '../login';

jest.mock('~/context/ApiContext', () => ({
  useApi: () => ({
    error: undefined,
    login: jest.fn(),
    user: null,
    hasRole: () => false,
    loading: false,
  }),
}));

jest.mock('react-router', () => ({
  useNavigate: () => jest.fn(),
}));

describe('LoginPage Clave Única text color', () => {
  it('usa text-primary en tema claro para el texto de Clave Única', () => {
    render(<LoginPage />);

    const p = screen.getByText('También Puedes Ingresar Con Tu Clave Unica');
    expect(p).toBeInTheDocument();
    expect(p.className).toContain('text-primary');
  });
});
