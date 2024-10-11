import * as React from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  labelText?: string;
  unitText?: string;
  helperText?: string;
}

const TextField = React.forwardRef<HTMLInputElement, InputProps>(
  ({ labelText, unitText, helperText, className, type, ...props }, ref) => {
    return (
      <>
        {labelText && <p className="mb-3">{labelText}</p>}
        <div className="flex items-center w-full">
          <input
            type={type}
            className={`font-bold text-lg py-3 pr-1 mr-2 flex-1 placeholder:text-lg w-fill-available ${className}`}
            ref={ref}
            {...props}
          />
          {unitText && <span className="font-bold text-lg">{unitText}</span>}
        </div>
        {helperText && (
          <span className="text-gray02 text-sm">{helperText}</span>
        )}
      </>
    );
  }
);
TextField.displayName = "TextField";

export { TextField };
