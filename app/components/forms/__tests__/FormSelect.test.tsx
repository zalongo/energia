import React from 'react';
import { render, screen } from '@testing-library/react';
import { useForm, FormProvider } from 'react-hook-form';
import userEvent from '@testing-library/user-event';
import FormSelect from '../FormSelect';

function Wrapper({ children }: { children: React.ReactNode }) {
  const methods = useForm({ defaultValues: { country: '' } });
  return <FormProvider {...methods}>{children}</FormProvider>;
}

describe('FormSelect theme and error handling', () => {
  test('aplica clases base de tema y aria-invalid ausente sin error', async () => {
    render(
      <Wrapper>
        <FormSelect
          label="País"
          name="country"
          options={[{ value: 'cl', label: 'Chile' }]}
          required
        />
      </Wrapper>
    );

    // Label visible
    expect(screen.getByText('País')).toBeInTheDocument();

  const select = screen.getByRole('combobox', { name: /país/i }) as HTMLSelectElement;
    expect(select).toBeInTheDocument();

  // Clases base de tema (tokens CSS para claro/oscuro) aplicadas en el contenedor de Flowbite
  const wrapper = select.closest('div.flex');
  expect(wrapper).not.toBeNull();
  expect(wrapper!.className).toContain('bg-card');
  expect(wrapper!.className).toContain('text-app');
  expect(wrapper!.className).toContain('border-app');

    // Sin error inicial, no debe marcar aria-invalid
    expect(select.hasAttribute('aria-invalid')).toBe(false);
  });
});
