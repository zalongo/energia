import { useFormContext } from 'react-hook-form';
import type { FieldErrors, FieldValues } from 'react-hook-form';
import { Label, Textarea } from 'flowbite-react';

// Tipos para las propiedades del componente
interface FormTextAreaProps {
  label: string;
  name: string;
  placeholder?: string;
  rows?: number;
  disabled?: boolean;
  className?: string;
  labelClassName?: string;
  textareaClassName?: string;
  errorClassName?: string;
  required?: boolean;
  maxLength?: number;
  onChangeCustom?: (e: React.ChangeEvent<any>) => void;
}

/**
 * Componente reutilizable para campos de texto de área con integración Formik
 */
const FormTextArea = ({
  label,
  name,
  placeholder = '',
  rows = 3,
  disabled = false,
  className = '',
  labelClassName = '',
  textareaClassName = '',
  errorClassName = '',
  required = false,
  maxLength,
  onChangeCustom,
}: FormTextAreaProps) => {
  const { register, formState } = useFormContext();
  const errors = formState.errors as FieldErrors<FieldValues>;
  // Clases por defecto
  const defaultContainerClass = 'mb-4';
  const defaultLabelClass = 'mb-1 block text-app';
  const defaultTextareaClass = 'bg-card text-app placeholder:text-muted border-app focus:ring-[rgb(var(--primary))] focus:border-[rgb(var(--primary))]';
  const defaultErrorClass = 'mt-1 text-sm text-red-600';

  // Combinar clases personalizadas con las predeterminadas
  const containerClasses = className ? `${defaultContainerClass} ${className}` : defaultContainerClass;
  const labelClasses = labelClassName ? `${defaultLabelClass} ${labelClassName}` : defaultLabelClass;
  const textareaClasses = textareaClassName ? `${defaultTextareaClass} ${textareaClassName}` : defaultTextareaClass;
  const errorClasses = errorClassName ? `${defaultErrorClass} ${errorClassName}` : defaultErrorClass;

  // Verificar si hay error para este campo
  const hasError = Boolean(errors && (errors as any)[name]);

  return (
    <div className={containerClasses}>
      <Label htmlFor={name} className={labelClasses}>
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>

      <Textarea
        id={name}
        placeholder={placeholder}
        rows={rows}
        disabled={disabled}
        className={`${textareaClasses} ${hasError ? 'border-red-500' : ''}`}
        maxLength={maxLength}
        required={required}
        {...register(name)}
        onChange={onChangeCustom}
      />

      {hasError && (
        <div className={errorClasses}>{(errors as any)[name]?.message as string}</div>
      )}
    </div>
  );
};

export default FormTextArea;