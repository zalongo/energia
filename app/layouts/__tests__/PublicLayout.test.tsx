import React from 'react';
import { render, screen } from '@testing-library/react';

import PublicLayout from '../PublicLayout';

describe('PublicLayout', () => {
  test('renderiza children correctamente', () => {
    render(
      <PublicLayout>
        <div>Bienvenido público</div>
      </PublicLayout>
    );

    expect(screen.getByText('Bienvenido público')).toBeInTheDocument();
  });
});
