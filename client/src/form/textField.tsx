import { TextField as MuiTextField, Typography } from "@mui/material"
import { FC } from "react";
import { useController, useFormContext } from "react-hook-form";

interface TextFieldProps {
    name: string,
    sx?: object,
    required?: boolean
    fullWidth?: boolean
    autoFocus?: boolean
    minLength?: number
    regExValidationPattern?: RegExp
    customError?: string
}

const TextField: FC<TextFieldProps> = ({ name, customError, required, autoFocus, sx, fullWidth, minLength, regExValidationPattern }) => {
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
                value: regExValidationPattern,
                message: `Invalid ${name.toLowerCase()}`
            }
        }
    });

    return (
        <MuiTextField error={customError ? true : invalid} helperText={customError ? customError : error && error.message} required={required ?? true} sx={sx} fullWidth={fullWidth ?? false} autoFocus={autoFocus ?? false} 
            label={name} onChange={onChange} value={value} name={name} />
    );
}

  export default TextField;