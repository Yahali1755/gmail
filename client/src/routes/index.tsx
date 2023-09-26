import { createBrowserRouter } from "react-router-dom"

import { MailPage } from "../mail/mailPage";
import { AuthPage } from "../auth/authPage";

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