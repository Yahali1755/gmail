import { createBrowserRouter } from "react-router-dom"

import Mail from "../mail";
import { Auth } from "../auth";

export const router = createBrowserRouter([ 
  {
    path: "/mail",
    element: <Mail/>
  },
  {
    path: "/",
    element: <Auth/>
  }, 
]);