import { FC } from "react";
import { Button, Grid } from "@mui/material"

import SubmitButton from "../common/form/SubmitButton";
import { useAuth } from "../contexts/auth";
import { useNavigate } from "react-router-dom";
import { Route } from "../constants/Route";
import BaseAuthForm from "./BaseAuthForm";
import BaseAuthPage from "./BaseAuthPage";
import { RouteType } from "../shell/Routes";
import { useForm } from "react-hook-form";
import { useAlerts } from "../contexts/alerts";

export interface UserFormData {
  password: string,
  email: string,
  confirmPassword?: string
}

const LoginPage: FC = () => {
  const { login} = useAuth();
  const navigate = useNavigate()
  const formMethods = useForm({ mode: "onBlur"});
  const alerts = useAlerts();

  const submit = (data: UserFormData) => login(data)
    .then(() => navigate(Route.Inbox))
    .catch(({ message }) => alerts.error(message))

  return (
    <BaseAuthPage>
      <BaseAuthForm formMethods={formMethods} onSubmit={submit} title='Login'>      
        <Grid width="100%" item>
          <Grid container justifyContent='space-between'>
              <Grid item>
                <Button onClick={() => navigate(Route.Register)} > Create account </Button>
              </Grid>
            <Grid item>
              <SubmitButton label='Save'/> 
            </Grid>
          </Grid>
        </Grid>
      </BaseAuthForm>
    </BaseAuthPage>
  )
}

export default {
  path: Route.Login,
  component: LoginPage
} as RouteType