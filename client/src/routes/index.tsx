import { createBrowserRouter } from "react-router-dom"

import Mail from "../mail";
import { Login } from "../user";
import { Route } from "../constants/route";

export const router = createBrowserRouter([ 
  {
    path: Route.Mail,
    element: <Mail/>
  },
  {
    path: Route.Login,
    element: <Login/>
  }, 
]);