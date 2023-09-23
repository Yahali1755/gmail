import { TextField as MuiTextField } from "@mui/material"
import { FC } from "react";
import { useController, useFormContext } from "react-hook-form";

interface TextFieldProps {
    name: string,
    sx?: object
}

const TextField: FC<TextFieldProps> = ({ name }) => {
    const { control } = useFormContext()

    const {field: { onChange, value }} = useController({
        name,
        control,
        rules: { required: true },
        defaultValue: "",
    });

    return (
        <MuiTextField label={name} onChange={onChange} value={value} name={name} />
    );
}

  export default TextField;