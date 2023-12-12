import { createBrowserRouter } from "react-router-dom"

import { MailPage } from "../mail/Mail";
import { AuthPage } from "../auth/Auth";

export const router = createBrowserRouter([ 
  {
    path: "/mail",
    element: <MailPage/>
  },
  {
    path: "/",
    element: <AuthPage/>
  }, 
]);