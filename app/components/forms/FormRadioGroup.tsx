import { useFormContext } from 'react-hook-form';
import type { FieldErrors, FieldValues } from 'react-hook-form';
import { Label, Radio } from 'flowbite-react';

// Tipos para las propiedades del componente
interface RadioOption {
  value: string | number;
  label: string;
}

interface FormRadioGroupProps {
  label: string;
  name: string;
  options: RadioOption[];
  disabled?: boolean;
  className?: string;
  labelClassName?: string;
  radioClassName?: string;
  radioLabelClassName?: string;
  errorClassName?: string;
  required?: boolean;
  onChangeCustom?: (e: React.ChangeEvent<any>) => void;
  inline?: boolean;
}

/**
 * Componente reutilizable para grupos de radio buttons con integración Formik
 */
const FormRadioGroup = ({
  label,
  name,
  options,
  disabled = false,
  className = '',
  labelClassName = '',
  radioClassName = '',
  radioLabelClassName = '',
  errorClassName = '',
  required = false,
  onChangeCustom,
  inline = false,
}: FormRadioGroupProps) => {
  const { register, formState, watch } = useFormContext();
  const errors = formState.errors as FieldErrors<FieldValues>;
  // Clases por defecto
  const defaultContainerClass = 'mb-4';
  const defaultLabelClass = 'mb-2 block text-app';
  const defaultOptionsContainerClass = inline ? 'flex space-x-4' : 'space-y-2';
  const defaultRadioClass = 'text-[rgb(var(--primary))] focus:ring-[rgb(var(--primary))] border-app bg-card';
  const defaultRadioLabelClass = 'ml-2 text-sm text-app';
  const defaultErrorClass = 'mt-1 text-sm text-red-600';

  // Combinar clases personalizadas con las predeterminadas
  const containerClasses = className ? `${defaultContainerClass} ${className}` : defaultContainerClass;
  const labelClasses = labelClassName ? `${defaultLabelClass} ${labelClassName}` : defaultLabelClass;
  const radioClasses = radioClassName ? `${defaultRadioClass} ${radioClassName}` : defaultRadioClass;
  const radioLabelClasses = radioLabelClassName ? `${defaultRadioLabelClass} ${radioLabelClassName}` : defaultRadioLabelClass;
  const errorClasses = errorClassName ? `${defaultErrorClass} ${errorClassName}` : defaultErrorClass;

  // Verificar si hay error para este campo
  const hasError = Boolean(errors && (errors as any)[name]);
  const currentValue = watch(name);

  return (
    <div className={containerClasses}>
      <Label className={labelClasses}>
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>

      <div className={defaultOptionsContainerClass}>
        {options.map((option) => (
          <div key={`${name}-${option.value}`} className="flex items-center">
            <Radio
              id={`${name}-${option.value}`}
              disabled={disabled}
              className={radioClasses}
              required={required}
              value={option.value}
              checked={String(currentValue) === String(option.value)}
              {...register(name)}
              onChange={onChangeCustom}
            />

            <Label htmlFor={`${name}-${option.value}`} className={radioLabelClasses}>
              {option.label}
            </Label>
          </div>
        ))}
      </div>
      {hasError && (
        <div className={errorClasses}>{(errors as any)[name]?.message as string}</div>
      )}
    </div>
  );
};

export default FormRadioGroup;