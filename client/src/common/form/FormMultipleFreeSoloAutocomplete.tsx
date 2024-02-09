import { TextField, Autocomplete, AutocompleteProps, Chip, TextFieldProps } from "@mui/material"
import { capitalize } from "lodash";
import { FC } from "react";
import { useController, useFormContext } from "react-hook-form";

interface FormMultipleFreeSoloAutocompleteProps extends Omit<AutocompleteProps<string, true, false, true>, 'renderInput'> {
    name: string
    textFieldProps?: TextFieldProps
    minLength?: number,
    validationRegEx?: RegExp,
    required?: boolean
}

const FormMultipleFreeSoloAutocomplete: FC<FormMultipleFreeSoloAutocompleteProps> = ({ name, textFieldProps, validationRegEx, minLength, required, ...props }) => {
    const { control  } = useFormContext()

    const autocompleteRegexValidation = (values) => {
        if (validationRegEx && values?.some(value => !validationRegEx.test(value))) {
            return `At least one of the ${name} is invalid`
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
            validate: autocompleteRegexValidation,
            required: {
                value: required,
                message: `${capitalize(name)} are required`
            }
        }
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
            error={invalid}
            helperText={error?.message}
            {...textFieldProps}
            {...params}
            />
        )}
        />
    );
}

export default FormMultipleFreeSoloAutocomplete;