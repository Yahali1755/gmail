import { createBrowserRouter } from "react-router-dom"

import Mail from "../mail";
import { AuthPage } from "../auth";

export const router = createBrowserRouter([ 
  {
    path: "/mail",
    element: <Mail/>
  },
  {
    path: "/",
    element: <AuthPage/>
  }, 
]);