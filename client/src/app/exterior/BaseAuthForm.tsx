import { FC, ReactNode } from "react";
import { Grid, Typography } from "@mui/material"
import { UseFormReturn, useForm } from "react-hook-form";

import { EMAIL_REGEX } from "@mail/common";

import FormTextField from "../common/form/FormTextField";
import Form from "../common/form/Form";

export interface AuthFormData {
  password: string,
  email: string,
  confirmPassword?: string
}

interface AuthFormProps {
    children: ReactNode,
    formTitle: string,
    onSubmit: (data: Record<string, any>) => void
    formMethods: UseFormReturn
}

const BaseAuthForm: FC<AuthFormProps> = ({ children, formTitle, onSubmit, formMethods }) => {
  const { formState: { errors } } = formMethods;

  return (
    <Form onSubmit={onSubmit} formMethods={formMethods}>      
        <Grid marginTop={2} container direction='column' alignItems='center'
           justifyContent='center' rowSpacing={3}>
          <Grid item> 
            <Typography fontSize="2em"> 
               { formTitle } 
            </Typography>
          </Grid> 
          <Grid width="100%" item> 
            <FormTextField required fullWidth autoFocus error={!!errors?.email} helperText={<>{errors?.email?.message}</>}
              label="Email" name="email" validationRegEx={EMAIL_REGEX}/>
          </Grid>
          <Grid width="100%" item> 
            <FormTextField required minLength={8} fullWidth label="Password" name="password" error={!!errors?.password} 
              helperText={<>{errors?.password?.message}</>}/>
          </Grid>
          { children }
        </Grid>
    </Form>
  )
}

export default BaseAuthForm;
