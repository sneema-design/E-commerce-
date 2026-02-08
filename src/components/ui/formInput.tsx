import { Input } from "@/components/ui/input";
import {
  Field,
  FieldLabel,
  FieldDescription,
} from "@/components/ui/field";

type FormInputProps = {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  value: string;
  error?: string;
  touched?: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onBlur: React.FocusEventHandler<HTMLInputElement>;
  rightElement?: React.ReactNode;
  description?: string;
};

export function FormInput({
  id,
  label,
  type = "text",
  placeholder,
  value,
  error,
  touched,
  onChange,
  onBlur,
  rightElement,
  description,
}: FormInputProps) {
  return (
    <Field>
      <div className="flex items-center justify-between">
        <FieldLabel htmlFor={id}>{label}</FieldLabel>
        {rightElement}
      </div>

      <Input
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />

      {touched && error && (
        <p className="text-sm text-red-500">{error}</p>
      )}

      {description && (
        <FieldDescription>{description}</FieldDescription>
      )}
    </Field>
  );
}
