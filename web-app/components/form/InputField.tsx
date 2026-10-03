import { cn } from "@/lib/utils";
import React from "react";
import { Label } from "@/components/ui/label";

function InputField({
  name,
  label,
  placeholder,
  disabled,
  type = "text",
  value,
  register,
  error,
  validation,
  className,
  icon: Icon,
}: any) {
  return (
    <div className="space-y-2">
      <Label htmlFor={name} className="form-label block">
        {label}
      </Label>

      <div className="relative group">
        {Icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-500 transition-colors pointer-events-none">
            <Icon size={18} />
          </div>
        )}
        <input
          type={type}
          id={name}
          placeholder={placeholder}
          disabled={disabled}
          value={value}
          className={cn(
            "form-input w-full transition-all", 
            Icon && "pl-11",
            className, 
            {
              "opacity-50 cursor-not-allowed": disabled,
            }
          )}
          {...register(name, validation)}
        />
      </div>

      {error && <p className="text-sm text-red-500">{error.message}</p>}
    </div>
  );
}

export default InputField;
