import '@testing-library/jest-dom';

// Silenciar warnings de React Router o fetch en tests si aparece ruido.
const originalError = console.error;
beforeAll(() => {
  console.error = (...args: any[]) => {
    const msg = args[0]?.toString?.() ?? '';
    if (msg.includes('Warning:')) return;
    originalError(...args);
  };
});

afterAll(() => {
  console.error = originalError;
});
