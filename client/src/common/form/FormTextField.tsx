import { TextField, BaseTextFieldProps } from "@mui/material"
import { FC } from "react";
import { useController, useFormContext } from "react-hook-form";

interface FormTextFieldProps extends BaseTextFieldProps {
    minLength?: number
    validationRegEx?: RegExp
}

const FormTextField: FC<FormTextFieldProps> = ({ name, label, minLength, validationRegEx, helperText, error, ...props }) => {
    const { control } = useFormContext()

    const {field: { onChange, value }, fieldState: {invalid, error: rulesError}} = useController({
        name,
        control,
        rules: { 
            minLength: { 
                value: minLength, 
                message: `This field has have least ${minLength} characters`
            },  
            pattern: {
                value: validationRegEx,
                message: `Invalid ${name.toLowerCase()}`
            }
        },
        defaultValue: ""
    });

    return (
        <TextField value={value} onChange={onChange} error={invalid || error} helperText={rulesError ? rulesError.message : (helperText && helperText)} 
            {...props} label={label ?? name}/>
    );
}

  export default FormTextField;