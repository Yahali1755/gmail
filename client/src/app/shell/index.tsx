import React from 'react'
import { BrowserRouter } from "react-router-dom";

import Routes from "./Routes"
 
const Shell = () => 
    <BrowserRouter>
        <Routes/>
    </BrowserRouter>

export default Shell