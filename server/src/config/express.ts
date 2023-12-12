import express, { Router, json } from "express"
import userRouter from "../api/user/user-router"
import { errorMiddleware } from "../middlewares/error-middleware";

require('dotenv').config();

const app = express();

interface Route {
    path: string
    router: Router
}

const routes: Route[] = [{path: "/user", router: userRouter}]

app.use(json())

routes.forEach(route => {
    app.use(route.path, route.router)
})

app.use(errorMiddleware)

app.listen(process.env.PORT, () => console.log(`server running on port ${process.env.PORT}`))