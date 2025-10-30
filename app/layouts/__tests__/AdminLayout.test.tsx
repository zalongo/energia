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

import AdminLayout from '../AdminLayout';

describe('AdminLayout', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
    mockApiReturn = { user: null, loading: false, hasRole: jest.fn() };
  });

  test('muestra estado de carga cuando loading es true', () => {
    mockApiReturn.loading = true;
    render(
      <AdminLayout>
        <div>Contenido</div>
      </AdminLayout>
    );

    expect(screen.getByText('Cargando...')).toBeInTheDocument();
  });

  test('redirige a /login si no hay usuario', async () => {
    mockApiReturn = { user: null, loading: false, hasRole: jest.fn(() => false) };
    render(
      <AdminLayout>
        <div>Contenido</div>
      </AdminLayout>
    );

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/login', { replace: true });
    });
  });

  test('redirige a not-authorized si no tiene rol', async () => {
    mockApiReturn = { user: { userName: 'u', roles: ['Usuario'] }, loading: false, hasRole: jest.fn(() => false) };
    render(
      <AdminLayout>
        <div>Contenido</div>
      </AdminLayout>
    );

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/not-authorized', { replace: true });
    });
  });

  test('renderiza children cuando el usuario tiene rol Administrador', () => {
    mockApiReturn = { user: { userName: 'admin', roles: ['Administrador'] }, loading: false, hasRole: jest.fn(() => true) };
    render(
      <AdminLayout>
        <div>Área admin</div>
      </AdminLayout>
    );

    expect(screen.getByText('Área admin')).toBeInTheDocument();
  });
});
