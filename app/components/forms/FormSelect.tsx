import { useFormContext } from 'react-hook-form';
import type { FieldErrors, FieldValues } from 'react-hook-form';
import { Label, Select } from 'flowbite-react';

// Tipos para las propiedades del componente
interface Option {
  value: string | number;
  label: string;
}

interface FormSelectProps {
  label: string;
  name: string;
  options: Option[];
  defaultOption?: string;
  disabled?: boolean;
  className?: string;
  labelClassName?: string;
  selectClassName?: string;
  errorClassName?: string;
  required?: boolean;
  onChangeCustom?: (e: React.ChangeEvent<any>) => void;
  color?: 'gray' | 'info' | 'failure' | 'warning' | 'success';
}

/**
 * Componente reutilizable para campos de selección con integración Formik
 */
const FormSelect = ({
  label,
  name,
  options,
  defaultOption = 'Seleccionar...',
  disabled = false,
  className = '',
  labelClassName = '',
  selectClassName = '',
  errorClassName = '',
  required = false,
  onChangeCustom,
  color,
}: FormSelectProps) => {
  const { register, formState } = useFormContext();
  const errors = formState.errors as FieldErrors<FieldValues>;
  // Clases por defecto
  const defaultContainerClass = 'mb-4';
  const defaultLabelClass = 'mb-1 block text-app';
  const defaultSelectClass = 'bg-card text-app border-app';
  const defaultErrorClass = 'mt-1 text-sm text-red-600';

  // Combinar clases personalizadas con las predeterminadas
  const containerClasses = className ? `${defaultContainerClass} ${className}` : defaultContainerClass;
  const labelClasses = labelClassName ? `${defaultLabelClass} ${labelClassName}` : defaultLabelClass;
  const selectClasses = selectClassName ? `${defaultSelectClass} ${selectClassName}` : defaultSelectClass;
  const errorClasses = errorClassName ? `${defaultErrorClass} ${errorClassName}` : defaultErrorClass;

  // Verificar si hay error para este campo
  const hasError = Boolean(errors && (errors as any)[name]);
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

      <Select
        id={name}
        disabled={disabled}
        className={`${selectClasses} ${focusClasses}`}
        required={required}
        color={computedColor}
        aria-invalid={hasError || undefined}
        {...register(name)}
        onChange={onChangeCustom}
      >
        {defaultOption && <option value="">{defaultOption}</option>}

        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>

      {hasError && (
        <div className={errorClasses}>{(errors as any)[name]?.message as string}</div>
      )}
    </div>
  );
};

export default FormSelect;