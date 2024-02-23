import React, { FC } from 'react'
import { BrowserRouter } from "react-router-dom";

import Routes from "./Routes"
 
const Shell: FC = () =>
    <BrowserRouter>
        <Routes/>
    </BrowserRouter>


export default Shell