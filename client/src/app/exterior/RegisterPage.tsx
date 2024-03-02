import { FC } from "react";
import { Grid } from "@mui/material"

import SubmitButton from "../common/form/SubmitButton";
import { useAuth } from "../contexts/auth";
import { useNavigate } from "react-router-dom";
import { Route } from "../constants/Route";
import BaseAuthForm from "./BaseAuthForm";
import BaseAuthPage from "./BaseAuthPage";
import { RouteType } from "../shell/Routes";
import FormTextField from "../common/form/FormTextField";
import { useForm } from "react-hook-form";
import { ensureEmailUniquenessRequest } from "../services/auth";
import { useAlerts } from "../contexts/alerts";

export interface UserFormData {
  password: string,
  email: string,
  confirmPassword?: string
}

const RegisterPage: FC = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const formMethods = useForm({ mode: "onBlur"});
  const { formState: { errors }, watch, clearErrors, setError, getValues } = formMethods
  const alerts = useAlerts();

  const email = watch("email");

  const doPasswordsMatch = (value: string) => value === getValues("password") || "Passwords do not match"

  const setBeforeSubmit = (data: UserFormData) => {
    delete data.confirmPassword
  }

  const submit = (data: UserFormData) => {
    setBeforeSubmit(data);

    register(data)
      .then(() => navigate(Route.Inbox))
      .catch(({ response: {data: message} }) => alerts.error(message))
  }

  const ensureEmailUniqueness = (email: string) => ensureEmailUniquenessRequest(email)
    .then(() => clearErrors("email"))
    .catch(({response: { data: message }}) => setError("email", {message}))

  return (
    <BaseAuthPage>
      <BaseAuthForm emailTextFieldProps={{onBlur: () => ensureEmailUniqueness(email)}} formMethods={formMethods} onSubmit={submit} title='Register'>
          <Grid width="100%" item>
            <FormTextField customValidation={doPasswordsMatch} required minLength={8} error={!!errors?.invalidConfirm} helperText={<>{errors?.invalidConfirm?.message}</>} 
              fullWidth label="Confirm Password" name="confirmPassword"/>
          </Grid>
          <Grid width="100%" item>
            <Grid container justifyContent='flex-end'>
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
  path: Route.Register,
  component: RegisterPage
} as RouteType