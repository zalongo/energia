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

import SupervisorLayout from '../SupervisorLayout';

describe('SupervisorLayout', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
    mockApiReturn = { user: null, loading: false, hasRole: jest.fn() };
  });

  test('muestra estado de carga cuando loading es true', () => {
    mockApiReturn.loading = true;
    render(
      <SupervisorLayout>
        <div>Contenido</div>
      </SupervisorLayout>
    );

    expect(screen.getByText('Cargando...')).toBeInTheDocument();
  });

  test('redirige a /login si no hay usuario', async () => {
    mockApiReturn = { user: null, loading: false, hasRole: jest.fn(() => false) };
    render(
      <SupervisorLayout>
        <div>Contenido</div>
      </SupervisorLayout>
    );

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/login', { replace: true });
    });
  });

  test('redirige a not-authorized si no tiene rol Supervisor', async () => {
    mockApiReturn = { user: { userName: 'u', roles: ['Usuario'] }, loading: false, hasRole: jest.fn(() => false) };
    render(
      <SupervisorLayout>
        <div>Contenido</div>
      </SupervisorLayout>
    );

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/not-authorized', { replace: true });
    });
  });

  test('renderiza children cuando el usuario tiene rol Supervisor', () => {
    mockApiReturn = { user: { userName: 'sup', roles: ['Supervisor'] }, loading: false, hasRole: jest.fn(() => true) };
    render(
      <SupervisorLayout>
        <div>Área supervisor</div>
      </SupervisorLayout>
    );

    expect(screen.getByText('Área supervisor')).toBeInTheDocument();
  });
});
