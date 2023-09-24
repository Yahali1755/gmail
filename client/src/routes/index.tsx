import { createBrowserRouter } from "react-router-dom"

import { Inbox } from "../inbox";
import { AuthPage } from "../auth/authPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthPage/>
  }, 
  {
    path: "/inbox",
    element: <Inbox/>
  }, 
]);