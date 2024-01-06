import { FC, useState } from "react";
import { Button, Grid, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import FormTextField from "../common/form/FormTextField";
import SubmitButton from "../common/form/SubmitButton";
import Form from "../common/form/Form";

const styles = {
  formTitle: {
    fontSize: '32px',
    marginTop: 4
  }
};

const LoginForm: FC = () => {
  const formMethods = useForm();
  const { watch } = formMethods;
  const navigate = useNavigate();
  const [isRegisterForm, setIsRegisterForm] = useState(false);
  const [isInvalidConfirm, setIsInvalidConfirm] = useState(false);

  const passwordsDoNotMatchErrorMessage = "Passwords do not match"
  const emailRegEx = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;

  const password = watch('Password');
  const confirmPassword = watch('ConfirmPassword');

  const submit = () => {
    if (isRegisterForm && password !== confirmPassword) {
      setIsInvalidConfirm(true);

      return;
    }

    navigate("/mail");
  }

  return (
    <Form onSubmit={submit} formMethods={formMethods}>
        <Grid container width='100%' flexDirection='column' alignItems='center' spacing={3}>
          <Grid item> 
            <Typography sx={styles.formTitle}> {isRegisterForm ? "Create Account" : "Sign Up"} </Typography>
          </Grid> 
          <Grid width="80%" item> 
            <FormTextField validationRegEx={emailRegEx} fullWidth autoFocus name="Email"/>
          </Grid>
          <Grid width="80%" item> 
            <FormTextField minLength={8} fullWidth name="Password"/>
          </Grid>
          {
            isRegisterForm && 
              <Grid width="80%" item>
                <FormTextField customErrorMessage={isInvalidConfirm && passwordsDoNotMatchErrorMessage} minLength={8} fullWidth name="ConfirmPassword"/>
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

export default LoginForm;