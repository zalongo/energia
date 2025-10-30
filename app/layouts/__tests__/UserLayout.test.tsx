import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';

const mockNavigate = jest.fn();
let mockApiReturn: any = { user: null, loading: false, hasRole: jest.fn() };

jest.mock('react-router', () => ({
  useNavigate: () => mockNavigate,
}));

jest.mock('~/context/ApiContext', () => ({
  useApi: () => mockApiReturn,
}));

import UserLayout from '../UserLayout';

describe('UserLayout', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
    mockApiReturn = { user: null, loading: false, hasRole: jest.fn() };
  });

  test('muestra estado de carga cuando loading es true', () => {
    mockApiReturn.loading = true;
    render(
      <UserLayout>
        <div>Contenido</div>
      </UserLayout>
    );

    expect(screen.getByText('Cargando...')).toBeInTheDocument();
  });

  test('redirige a /login si no hay usuario', async () => {
    mockApiReturn = { user: null, loading: false, hasRole: jest.fn(() => false) };
    render(
      <UserLayout>
        <div>Contenido</div>
      </UserLayout>
    );

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/login', { replace: true });
    });
  });

  test('redirige a not-authorized si no tiene rol válido', async () => {
    mockApiReturn = { user: { userName: 'u', roles: ['Invitado'] }, loading: false, hasRole: jest.fn(() => false) };
    render(
      <UserLayout>
        <div>Contenido</div>
      </UserLayout>
    );

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/not-authorized', { replace: true });
    });
  });

  test('renderiza children cuando el usuario tiene rol válido', () => {
    mockApiReturn = { user: { userName: 'usr', roles: ['Usuario'] }, loading: false, hasRole: jest.fn(() => true) };
    render(
      <UserLayout>
        <div>Área usuario</div>
      </UserLayout>
    );

    expect(screen.getByText('Área usuario')).toBeInTheDocument();
  });
});
