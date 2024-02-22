import { TextField, Autocomplete, AutocompleteProps, Chip, TextFieldProps } from "@mui/material"
import { capitalize } from "lodash";
import { FC } from "react";
import { useController, useFormContext } from "react-hook-form";

interface FormMultipleFreeSoloAutocompleteProps extends Omit<AutocompleteProps<string, true, false, true>, 'renderInput' |'freeSolo' | 'multiline' | 'options'> {
    name: string
    textFieldProps?: TextFieldProps
    minLength?: number,
    validationRegEx?: RegExp,
    required?: boolean
}

const FormMultipleFreeSoloAutocomplete: FC<FormMultipleFreeSoloAutocompleteProps> = ({ name, textFieldProps, validationRegEx, minLength, required, ...props }) => {
    const { control  } = useFormContext()

    const autocompleteValidation = (values: string[]) => {
        if (!validationRegEx) {
            return true
        }

        const invalidValues = values?.filter(value => !validationRegEx.test(value))

        if (invalidValues.length) {
            return invalidValues.map(value => value + ' is invalid').join(', ')
        }

        return true;
    }

    const {field: { onChange, value }, fieldState: {invalid, error}} = useController({
        name: name.toLowerCase(),
        control,
        rules: { 
            minLength: { 
                value: minLength, 
                message: `${name} has to be at least ${minLength} characters`
            },  
            validate: autocompleteValidation,
            required: {
                value: required,
                message: `${capitalize(name)} are required`
            }
        },
        defaultValue: []
    });

    return (
        <Autocomplete
        multiple
        options={[]}  
        freeSolo
        {...props}
        renderTags={(values, getTagProps) => 
            values?.map((value, index) => (
                <Chip
                    variant="outlined"
                    label={value}
                    {...getTagProps({ index })}
                />
            ))}
        onChange={(_, values) => {
            onChange(values);
        }}
        value={value}
        renderInput={(params) => (
            <TextField
            {...params}
            required={required && !value.length}
            error={invalid}
            helperText={error?.message}
            {...textFieldProps}
            />
        )}
        />
    );
}

export default FormMultipleFreeSoloAutocomplete;