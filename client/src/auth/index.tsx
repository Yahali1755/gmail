import { FC } from "react";
import { Button, Grid, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";

import TextField from "../form/textField";
import DarkModeToggle from "../theme/toggleTheme";

const styles = {
  container: {
    height: '100vh',
  },
  button: {
    textTransform: 'none'
  },
  textField: {
    fontSize: '30px'
  }
};

export const Auth: FC = () => {
  const methods = useForm();
  const navigate = useNavigate();

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit((() => navigate('/inbox')))}>
        <DarkModeToggle/>
        <Grid sx={styles.container} flexDirection='column' spacing={4} container justifyContent='center' alignItems='center'>
          <Grid item> 
            <Typography> Sign In </Typography>
          </Grid> 
          <Grid item> 
            <TextField sx={styles.textField} name="email"/>
          </Grid>
          <Grid item> 
            <TextField sx={styles.textField} name="password"/>
          </Grid>
          <Grid item> 
            <Button sx={styles.button} variant="contained" type="submit"> Next </Button>
          </Grid>
        </Grid>
      </form>
    </FormProvider>
  )
}

