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
import { useForm, useFormContext } from "react-hook-form";

export interface UserFormData {
  password: string,
  email: string,
  confirmPassword?: string
}

const RegisterPage: FC = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const formMethods = useForm();
  const { formState: { errors } } = formMethods

  const submit = (data: UserFormData) => register(data)
    .then(() => navigate(Route.EmailBox))

  return (
    <BaseAuthPage>
      <BaseAuthForm formMethods={formMethods} onSubmit={submit} formTitle='Register'>
          <Grid width="100%" item>
            <FormTextField required minLength={8} error={!!errors?.invalidConfirm} helperText={<>{errors?.invalidConfirm?.message}</>} 
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