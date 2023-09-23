import { createBrowserRouter } from "react-router-dom"

import { Auth } from "../auth";
import { Inbox } from "../inbox";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Auth/>
  }, 
  {
    path: "/inbox",
    element: <Inbox/>
  }, 
]);