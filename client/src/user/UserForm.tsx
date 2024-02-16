import { FC, useEffect, useState } from "react";
import { Button, Grid, Typography } from "@mui/material"
import { useForm } from "react-hook-form";
import { AxiosError } from "axios";

import { EMAIL_REGEX } from "@mail/common";

import FormTextField from "../common/form/FormTextField";
import SubmitButton from "../common/form/SubmitButton";
import Form from "../common/form/Form";
import { useAuth } from "../contexts/auth";
import { useAlerts } from "../contexts/alerts";
import { hashString } from "../utils/hash";

const styles = {
  formTitle: {
    fontSize: '32px',
    marginTop: 4
  }
};

export interface UserFormData {
  password: string,
  email: string,
  confirmPassword?: string
}

const UserForm: FC = () => {
  const formMethods = useForm();
  const { setError, formState: { errors }, clearErrors, watch } = formMethods;
  const [isRegisterForm, setIsRegisterForm] = useState(false);
  const { login, register } = useAuth();
  const alerts = useAlerts()

  const password = watch('password');
  const confirmPassword = watch('confirmPassword');

  const handleFieldErrors = (error: AxiosError<{field: string, message: string}>) => {
      const {response: {data: {field = '', message = ''} = {}}} = error

      field ? setError(`${field}`,{ message: `${message}`}) : alerts.error(message)
  }

  const setBeforeSubmit = (data: UserFormData) => {
    delete data.confirmPassword

    data.password = hashString(data.password)
  }

  const submit = (data: UserFormData) => {
    if (isRegisterForm && password !== confirmPassword) {
      setError("invalidConfirm", { message: "Passwords do not match"})

      return;
    }

    setBeforeSubmit(data);

    if (isRegisterForm) {
      register(data).catch(handleFieldErrors)
    } else {
      login(data).catch(handleFieldErrors)
    }
  }

  useEffect(() => {
    if (password === confirmPassword) {
      clearErrors("invalidConfirm")
    }
  }, [password, confirmPassword])

  return (
    <Form onSubmit={submit} formMethods={formMethods}>
        <Grid container width='100%' direction='column' alignItems='center' spacing={3}>
          <Grid item> 
            <Typography sx={styles.formTitle}> {isRegisterForm ? "Register" : "Login"} </Typography>
          </Grid> 
          <Grid width="80%" item> 
            <FormTextField required fullWidth autoFocus error={!!errors?.email} helperText={<>{errors?.email?.message}</>}
              label="Email" name="email" validationRegEx={EMAIL_REGEX}/>
          </Grid>
          <Grid width="80%" item> 
            <FormTextField required minLength={8} fullWidth label="Password" name="password" error={!!errors?.password} 
              helperText={<>{errors?.password?.message}</>}/>
          </Grid>
          {
            isRegisterForm && 
              <Grid width="80%" item>
                <FormTextField required minLength={8} error={!!errors?.invalidConfirm} helperText={<>{errors?.invalidConfirm?.message}</>} 
                  fullWidth label="Confirm Password" name="confirmPassword"/>
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
