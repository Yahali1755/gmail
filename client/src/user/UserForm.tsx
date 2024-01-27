import { FC, useEffect, useState } from "react";
import { Button, Grid, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { UserViewModel } from "@mail/common";

import FormTextField from "../common/form/FormTextField";
import SubmitButton from "../common/form/SubmitButton";
import Form from "../common/form/Form";
import { useAuth } from "../contexts/auth";
import { Route } from "../constants/route";

const styles = {
  formTitle: {
    fontSize: '32px',
    marginTop: 4
  }
};

const UserForm: FC = () => {
  const formMethods = useForm();
  const { setError, clearErrors, formState: { errors }, getValues } = formMethods;
  const { watch } = formMethods;
  const navigate = useNavigate();
  const [isRegisterForm, setIsRegisterForm] = useState(false);
  const { login, register } = useAuth();
  
  const password = watch('password');
  const confirmPassword = watch('confirm');

  const handleAuthResponse = (promise: Promise<void>) => {
    promise.then(() => navigate(Route.Mail))
      .catch(error => {
        const {response: {data: {field, message}}} = error

        setError(`${field}`,{ message: `${message}`})
    })
  }

  const submit = (data: UserViewModel) => {
    clearErrors();

    if (isRegisterForm && password !== confirmPassword) {
      setError("InvalidConfirm", { message: "Passwords do not match"})

      return;
    }

    if (isRegisterForm) {
      handleAuthResponse(register(data))
    } else {
      handleAuthResponse(login(data))
    }
  }

  useEffect(() => {
    if (password === confirmPassword) {
      clearErrors("InvalidConfirm")
    }
  }, [password, confirmPassword])

  return (
    <Form onSubmit={submit} formMethods={formMethods}>
        <Grid container width='100%' flexDirection='column' alignItems='center' spacing={3}>
          <Grid item> 
            <Typography sx={styles.formTitle}> {isRegisterForm ? "Create Account" : "Sign Up"} </Typography>
          </Grid> 
          <Grid width="80%" item> 
            <FormTextField required fullWidth autoFocus  error={!!errors?.email} helperText={errors?.email?.message as string}
              label="Email" name="email" validationRegEx={/\S+@\S+\.\S+/}/>
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
