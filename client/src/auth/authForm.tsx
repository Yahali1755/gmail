import { FC, useState } from "react";
import { Button, Grid, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";

import TextField from "../form/textField";

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
  const methods = useForm();
  const navigate = useNavigate();
  const [isRegisterForm, setIsRegisterForm] = useState(false);

  return (
    <FormProvider {...methods}>
      <Grid width='100%'>
        <form onSubmit={methods.handleSubmit((() => navigate('/inbox')))}>
          <Grid container flexDirection='column' alignItems='center' spacing={3}>
            <Grid item> 
              <Typography sx={styles.formTitle}> {isRegisterForm ? "Create Account" : "Sign Up"} </Typography>
            </Grid> 
            <Grid width="80%" item> 
              <TextField fullWidth autoFocus name="Email"/>
            </Grid>
            <Grid width="80%" item> 
              <TextField fullWidth name="Password"/>
            </Grid>
            {
              isRegisterForm && 
                <Grid width="80%" item>
                  <TextField fullWidth name="Confirm"/>
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
                <Button sx={styles.nextButton} variant="contained" type="submit"> Next </Button>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </FormProvider>
  )
}

