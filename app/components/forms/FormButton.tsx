import React from 'react';
import { Button } from 'flowbite-react';

interface FormButtonProps {
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  isLoading?: boolean;
  loadingText?: string;
  className?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'warning';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  fullWidth?: boolean;
  children: React.ReactNode;
}

/**
 * Componente reutilizable para botones de formulario
 */
const FormButton: React.FC<FormButtonProps> = ({
  type = 'button',
  disabled = false,
  isLoading = false,
  loadingText = 'Cargando...',
  className = '',
  onClick,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  children,
}) => {
  // Mapear variantes a colores de Flowbite
  const colorMap: Record<NonNullable<FormButtonProps['variant']>, any> = {
    primary: 'blue',
    secondary: 'gray',
    danger: 'failure',
    success: 'success',
    warning: 'warning',
  };

  return (
    <Button
      type={type}
      disabled={disabled || isLoading}
      color={colorMap[variant]}
      size={size}
      onClick={onClick}
      className={`${fullWidth ? 'w-full' : ''} ${className || ''}`}
    >
      {isLoading ? loadingText : children}
    </Button>
  );
};

export default FormButton;