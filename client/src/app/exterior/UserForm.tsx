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
import { useNavigate } from "react-router-dom";
import { Route } from "../constants/Route";

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
  const { token } = useAuth()
  const navigate = useNavigate()

  const password = watch('password');
  const confirmPassword = watch('confirmPassword');

  const handleFieldErrors = (error: AxiosError<{field: string, message: string}>) => {
      const {response: {data: {field = '', message = ''} = {}}} = error

      field ? setError(`${field}`,{ message: `${message}`}) : alerts.error(message)
  }

  const setBeforeSubmit = (data: UserFormData) => {
    delete data.confirmPassword
  }

  const submit = (data: UserFormData) => {
    if (isRegisterForm && password !== confirmPassword) {
      setError("invalidConfirm", { message: "Passwords do not match"})

      return;
    }

    setBeforeSubmit(data);

    if (isRegisterForm) {
      register(data).catch(handleFieldErrors)
        .then(() => navigate(Route.EmailBox))
    } else {
      login(data).catch(handleFieldErrors)
        .then(() => navigate(Route.EmailBox))
    }
  }

  useEffect(() => {
    if (password === confirmPassword) {
      clearErrors("invalidConfirm")
    }
  }, [password, confirmPassword])

  return (
    <Form onSubmit={submit} formMethods={formMethods}>      
        <Grid marginTop={2} container direction='column' alignItems='center'
           justifyContent='center' rowSpacing={3}>
          <Grid item> 
            <Typography fontSize="2em"> 
              {isRegisterForm ? "Register" : "Login"} 
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
          {
            isRegisterForm && 
              <Grid width="100%" item>
                <FormTextField required minLength={8} error={!!errors?.invalidConfirm} helperText={<>{errors?.invalidConfirm?.message}</>} 
                  fullWidth label="Confirm Password" name="confirmPassword"/>
              </Grid>
          }
          <Grid width="100%" item>
            <Grid container justifyContent='space-between'>
              {
                !isRegisterForm && 
                  <Grid item>
                    <Button onClick={() => setIsRegisterForm(true)} > Create account </Button>
                  </Grid>
              }
              <Grid item>
                <SubmitButton label='Save'/> 
              </Grid>
            </Grid>
          </Grid>
        </Grid>
    </Form>
  )
}

export default UserForm;
