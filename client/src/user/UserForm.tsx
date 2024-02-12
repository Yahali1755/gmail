import { FC, useEffect, useState } from "react";
import { Button, Grid, Typography } from "@mui/material"
import { useForm } from "react-hook-form";
import { AxiosError } from "axios";

import { EMAIL_REGEX, UserViewModel } from "@mail/common";

import FormTextField from "../common/form/FormTextField";
import SubmitButton from "../common/form/SubmitButton";
import Form from "../common/form/Form";
import { useAuth } from "../contexts/auth";
import { useTheme } from "../contexts/theme";

const styles = {
  formTitle: {
    fontSize: '32px',
    marginTop: 4
  }
};

const UserForm: FC = () => {
  const formMethods = useForm();
  const { setError, clearErrors, formState: { errors } } = formMethods;
  const { watch } = formMethods;
  const [isRegisterForm, setIsRegisterForm] = useState(false);
  const { login, register } = useAuth();
  const { isDarkMode } = useTheme();
  
  const password = watch('password');
  const confirmPassword = watch('confirm');

  const handleErrors = (error: AxiosError<{field: string, message: string}>) => {
      const {response: {data: {field = '', message = ''} = {}}} = error

      field && setError(`${field}`,{ message: `${message}`})
  }

  const setUserPreferedTheme = (user: UserViewModel) => {
    user.theme = {isDarkTheme: isDarkMode}
  }

  const submit = (data: UserViewModel) => {
    if (isRegisterForm && password !== confirmPassword) {
      setError("InvalidConfirm", { message: "Passwords do not match"})

      return;
    }

    setUserPreferedTheme(data);

    if (isRegisterForm) {
      register(data).catch(handleErrors)
    } else {
      login(data).catch(handleErrors)
    }
  }

  useEffect(() => {
    if (password === confirmPassword) {
      clearErrors("InvalidConfirm")
    }
  }, [password, confirmPassword])

  return (
    <Form onSubmit={submit} formMethods={formMethods}>
        <Grid container width='100%' direction='column' alignItems='center' spacing={3}>
          <Grid item> 
            <Typography sx={styles.formTitle}> {isRegisterForm ? "Register" : "Login"} </Typography>
          </Grid> 
          <Grid width="80%" item> 
            <FormTextField required fullWidth autoFocus  error={!!errors?.email} helperText={errors?.email?.message as string}
              label="Email" name="email" validationRegEx={EMAIL_REGEX}/>
          </Grid>
          <Grid width="80%" item> 
            <FormTextField required minLength={8} fullWidth label="Password" name="password" error={!!errors?.password} 
              helperText={errors?.password?.message as string}/>
          </Grid>
          {
            isRegisterForm && 
              <Grid width="80%" item>
                <FormTextField required minLength={8} error={!!errors?.InvalidConfirm} helperText={errors?.InvalidConfirm?.message as string} 
                  fullWidth label="Confirm" name="confirm"/>
              </Grid>
          }
          <Grid position="relative" container item>
            {
              !isRegisterForm && 
                <Grid position="absolute" left="12%" xs={3} item>
                  <Button onClick={() => setIsRegisterForm(true)} > Create account </Button>
                </Grid>
            }
            <Grid position="absolute" left="73%" xs={3} item>
              <SubmitButton label='Save'/> 
            </Grid>
          </Grid>
        </Grid>
    </Form>
  )
}

export default UserForm;
