import { createBrowserRouter } from "react-router-dom"

import Mail from "../mail";
import { Auth } from "../user";
import { Route } from "../constants/route";

export const router = createBrowserRouter([ 
  {
    path: Route.Mail,
    element: <Mail/>
  },
  {
    path: Route.Login,
    element: <Auth/>
  }, 
]);