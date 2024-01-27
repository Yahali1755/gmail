import { TextField, Autocomplete, AutocompleteProps, Chip, TextFieldProps } from "@mui/material"
import { FC } from "react";
import { useController, useFormContext } from "react-hook-form";

interface FormMultipleFreeSoloAutocompleteProps extends Omit<AutocompleteProps<string, true, false, true>, 'renderInput'> {
    name: string
    textFieldProps?: TextFieldProps
}

const FormMultipleFreeSoloAutocomplete: FC<FormMultipleFreeSoloAutocompleteProps> = ({ name, textFieldProps, ...props }) => {
    const { control  } = useFormContext()

    const {field: { onChange, value }, fieldState: {invalid, error: rulesError}} = useController({
        name: name.toLowerCase(),
        control
    });

    return (
        <Autocomplete
        multiple
        options={[]}
        freeSolo
        value={value}
        {...props}
        renderTags={(values, getTagProps) =>
            values?.map((value, index) => (
                <Chip
                    variant="outlined"
                    label={value}
                    {...getTagProps({ index })}
                />
            ))
        }
        onChange={(event, values) => {
            onChange(values);
        }}
        renderInput={(params) => (
            <TextField
            {...textFieldProps}
            {...params}
            />
        )}
        />
    );
}

export default FormMultipleFreeSoloAutocomplete;