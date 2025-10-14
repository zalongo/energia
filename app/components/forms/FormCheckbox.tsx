import { useFormContext } from 'react-hook-form';
import type { FieldErrors, FieldValues } from 'react-hook-form';
import { Checkbox, Label } from 'flowbite-react';

// Tipos para las propiedades del componente
interface FormCheckboxProps {
  label: string;
  name: string;
  disabled?: boolean;
  className?: string;
  labelClassName?: string;
  checkboxClassName?: string;
  errorClassName?: string;
  required?: boolean;
  onChangeCustom?: (e: React.ChangeEvent<any>) => void;
}

/**
 * Componente reutilizable para campos de checkbox con integración Formik
 */
const FormCheckbox = ({
  label,
  name,
  disabled = false,
  className = '',
  labelClassName = '',
  checkboxClassName = '',
  errorClassName = '',
  required = false,
  onChangeCustom,
}: FormCheckboxProps) => {
  const { register, formState, watch } = useFormContext();
  const errors = formState.errors as FieldErrors<FieldValues>;
  // Clases por defecto
  const defaultContainerClass = 'mb-4 flex items-center';
  const defaultLabelClass = 'ml-2 block text-sm text-app';
  const defaultCheckboxClass = 'text-[rgb(var(--primary))] focus:ring-[rgb(var(--primary))] border-app bg-card';
  const defaultErrorClass = 'ml-6 mt-1 text-sm text-red-600';

  // Combinar clases personalizadas con las predeterminadas
  const containerClasses = className ? `${defaultContainerClass} ${className}` : defaultContainerClass;
  const labelClasses = labelClassName ? `${defaultLabelClass} ${labelClassName}` : defaultLabelClass;
  const checkboxClasses = checkboxClassName ? `${defaultCheckboxClass} ${checkboxClassName}` : defaultCheckboxClass;
  const errorClasses = errorClassName ? `${defaultErrorClass} ${errorClassName}` : defaultErrorClass;

  // Verificar si hay error para este campo
  const hasError = Boolean(errors && (errors as any)[name]);
  const checked = !!watch(name);

  return (
    <div className={containerClasses}>
      <Checkbox
        id={name}
        disabled={disabled}
        className={checkboxClasses}
        required={required}
        checked={checked}
        {...register(name)}
        onChange={onChangeCustom}
      />

      <Label htmlFor={name} className={labelClasses}>
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>

      {hasError && (
        <div className={errorClasses}>{(errors as any)[name]?.message as string}</div>
      )}
    </div>
  );
};

export default FormCheckbox;