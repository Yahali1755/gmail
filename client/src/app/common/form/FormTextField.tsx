import { TextField, BaseTextFieldProps } from "@mui/material"
import { FC } from "react";
import {  useController, useFormContext } from "react-hook-form";

interface FormTextFieldProps extends BaseTextFieldProps {
    minLength?: number
    validationRegEx?: RegExp
    customValidation?: (value: string) => string | boolean
}

const FormTextField: FC<FormTextFieldProps> = ({ name, label, minLength, validationRegEx, onBlur, customValidation, helperText, error, ...props }) => {
    const { control } = useFormContext()

    const {field: { onChange, value, onBlur: defaultOnBlur }, fieldState: {invalid, error: rulesError}} = useController({
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
            },
            validate: customValidation
        },
        defaultValue: ""
    });

    const handleBlur = (event) => {
        defaultOnBlur();
        onBlur && onBlur(event)
    }

    return (
        <TextField value={value} onChange={onChange} error={invalid || error} helperText={rulesError ? rulesError.message : (helperText && helperText)} 
            {...props} onBlur={handleBlur} label={label ?? name}/>
    );
}

  export default FormTextField;