import { TextField as MuiTextField, Typography } from "@mui/material"
import { FC } from "react";
import { useController, useFormContext } from "react-hook-form";

interface TextFieldProps {
    name: string,
    sx?: object,
    required?: boolean
    fullWidth?: boolean
    autoFocus?: boolean
}

const TextField: FC<TextFieldProps> = ({ name, required, autoFocus, sx, fullWidth }) => {
    const { control } = useFormContext()

    const {field: { onChange, value }} = useController({
        name,
        control,
        rules: { required: required ?? true },
        defaultValue: "",
    });

    return (
        <MuiTextField required={required ?? true} sx={sx} fullWidth={fullWidth ?? false} autoFocus={autoFocus ?? false} label={name} onChange={onChange} value={value} name={name} />
    );
}

  export default TextField;