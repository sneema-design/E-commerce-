import { Input } from "@/components/ui/input";
import { Field, FieldLabel, FieldDescription } from "@/components/ui/field";
import { cn } from "@/lib/utils";

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
  leftElement?: React.ReactNode;
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
  leftElement,
  rightElement,
  description,
}: FormInputProps) {
  return (
    <Field>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>

      <div className="relative">
        {leftElement && (
          <div className="absolute inset-y-0 left-3 flex items-center">
            {leftElement}
          </div>
        )}

        <Input
          id={id}
          name={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className={cn(leftElement && "pl-10", rightElement && "pr-10")}
        />

        {rightElement && (
          <div className="absolute inset-y-0 right-3 flex items-center">
            {rightElement}
          </div>
        )}
      </div>

      {touched && error && <p className="text-sm text-red-500">{error}</p>}

      {description && <FieldDescription>{description}</FieldDescription>}
    </Field>
  );
}
