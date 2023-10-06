import { FC, useState } from "react";
import { Button, Grid, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom";
import { useForm, FormProvider, useWatch } from "react-hook-form";

import FormTextField from "../common/form/FormTextField";

const styles = {
  nextButton: {
    textTransform: 'none'
  },
  formTitle: {
    fontSize: '32px',
    marginTop: 4
  }
};

export const AuthForm: FC = () => {
  const formMethods = useForm();
  const navigate = useNavigate();
  const [isRegisterForm, setIsRegisterForm] = useState(false);
  const [isInvalidConfirm, setIsInvalidConfirm] = useState(false);

  const passwordsDoNotMatchErrorMessage = "Passwords do not match"
  const emailRegEx = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;

  const password = useWatch({control: formMethods.control, name: 'Password'});
  const confirmPassword = useWatch({control: formMethods.control, name: 'Confirm'});

  return (
    <FormProvider {...formMethods}>
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
                  <FormTextField customError={isInvalidConfirm && passwordsDoNotMatchErrorMessage} minLength={8} fullWidth name="Confirm"/>
                </Grid>
            }
            <Grid position="relative" container item>
              {
                !isRegisterForm && 
                  <Grid position="absolute" left="10%" xs={3} item>
                    <Button onClick={() => setIsRegisterForm(true)} > New Account </Button>
                  </Grid>
              }
              <Grid position="absolute" left="75%" xs={3} item>
                <Button sx={styles.nextButton} variant="contained" onClick={formMethods.handleSubmit(() => {
                  if (!password === confirmPassword) {
                    setIsInvalidConfirm(true);

                    return;
                  }
                  
                  navigate('/mail')
                })}> 
                  Save
                </Button>
              </Grid>
            </Grid>
          </Grid>
    </FormProvider>
  )
}

