import React from 'react'
import { BrowserRouter } from "react-router-dom";

import Routes from "./Routes"
import AppContainer from '../AppContainer';
 
const Shell = () => 
    <BrowserRouter>
        <AppContainer>
            <Routes/>
        </AppContainer>
    </BrowserRouter>

export default Shell