import { useFormContext } from 'react-hook-form';
import type { FieldErrors, FieldValues, Path } from 'react-hook-form';
import { Label, TextInput } from 'flowbite-react';

// Tipos para las propiedades del componente
interface FormInputProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  labelClassName?: string;
  inputClassName?: string;
  errorClassName?: string;
  required?: boolean;
  min?: number | string;
  max?: number | string;
  step?: number | string;
  autoComplete?: string;
  onChangeCustom?: (e: React.ChangeEvent<any>) => void;
  color?: 'gray' | 'info' | 'failure' | 'warning' | 'success';
}

/**
 * Componente reutilizable para campos de formulario con integración Formik
 * Soporta diferentes tipos de input (text, number, date, email, password, etc.)
 */
const FormInput = ({
  label,
  name,
  type = 'text',
  placeholder = '',
  disabled = false,
  className = '',
  labelClassName = '',
  inputClassName = '',
  errorClassName = '',
  required = false,
  min,
  max,
  step,
  autoComplete,
  onChangeCustom,
  color,
}: FormInputProps) => {
  const { register, formState } = useFormContext();
  const errors = formState.errors as FieldErrors<FieldValues>;
  const isTouched = !!formState.touchedFields?.[name as Path<FieldValues>];
  // Clases por defecto
  const defaultContainerClass = "mb-4 block";
  const defaultLabelClass = 'mb-1 block text-app';
  const defaultInputClass = 'bg-card text-app placeholder:text-muted border-app';
  const defaultErrorClass = 'mt-1 text-sm text-red-600';

  // Combinar clases personalizadas con las predeterminadas
  const containerClasses = className ? `${defaultContainerClass} ${className}` : defaultContainerClass;
  const labelClasses = labelClassName ? `${defaultLabelClass} ${labelClassName}` : defaultLabelClass;
  const inputClasses = inputClassName ? `${defaultInputClass} ${inputClassName}` : defaultInputClass;
  const errorClasses = errorClassName ? `${defaultErrorClass} ${errorClassName}` : defaultErrorClass;

  // Estado de validación basado en Formik
  const hasError = Boolean(errors && (errors as any)[name]);
  // Color por defecto alineado al esquema (info ~ primario). Evitamos gris.
  const computedColor: 'gray' | 'info' | 'failure' | 'warning' | 'success' =
    color ?? (disabled ? 'gray' : hasError ? 'failure' : 'info');
  const focusClasses = hasError
    ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
    : 'focus:ring-[rgb(var(--primary))] focus:border-[rgb(var(--primary))]';

  return (
    <div className={containerClasses}>
      <Label htmlFor={name} className={labelClasses}>
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>

      <TextInput
        id={name}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        className="block"
        theme={{
          field: {
            input: {
              base: `block w-full rounded-lg border ${inputClasses} text-base ${focusClasses} disabled:cursor-not-allowed disabled:opacity-50`,
            },
          },
        }}
        // sizing="lg"
        min={min as any}
        max={max as any}
        step={step as any}
        autoComplete={autoComplete}
        required={required}
        color={computedColor}
        aria-invalid={hasError || undefined}
        {...register(name)}
        onChange={onChangeCustom}
      />

      {hasError && (
        <div className={errorClasses}>{(errors as any)[name]?.message as string}</div>
      )}
    </div>
  );
};

export default FormInput;