import express from "express"

require('dotenv').config();

const app = express();

app.listen(() => console.log(`server running on port ${process.env.PORT}`))