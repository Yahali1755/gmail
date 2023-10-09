import { TextField, BaseTextFieldProps } from "@mui/material"
import { FC } from "react";
import { useController, useFormContext } from "react-hook-form";

interface FormTextFieldProps extends BaseTextFieldProps {
    customErrorMessage?: string,
    minLength?: number,
    validationRegEx?: RegExp
}

const FormTextField: FC<FormTextFieldProps> = ({ name, label, customErrorMessage, required, minLength, validationRegEx, ...props }) => {
    const { control } = useFormContext()

    const {field: { onChange, value }, fieldState: {invalid, error}} = useController({
        name,
        control,
        rules: { 
            required: required ?? true,
            minLength: { 
                value: minLength, 
                message: `${name} has to be at least ${minLength} characters`
            },  
            pattern: {
                value: validationRegEx,
                message: `Invalid ${name.toLowerCase()}`
            }
        }
    });

    return (
        <TextField value={value} onChange={onChange} error={customErrorMessage ? true : invalid} helperText={customErrorMessage ? customErrorMessage : error && error.message} 
            required={required ?? true} {...props} label={label ?? name}/>
    );
}

  export default FormTextField;