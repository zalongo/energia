import { DarkThemeToggle } from 'flowbite-react';

// Wrapper pequeño para usar el componente nativo de Flowbite React.
// Este componente se apoya en localStorage['color-theme'] y en la clase 'dark' del <html>,
// coherente con el script SSR definido en root.tsx.
export default function ThemeToggle() {
  return <DarkThemeToggle />;
}
