import React from 'react'

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Mail from './mail';
import { Login } from './user';

const Shell = () => 
    <BrowserRouter>
        <Routes>
            <Route Component={Mail} path="/mail" />
            <Route Component={Login} path="/" />
        </Routes>
    </BrowserRouter>


export default Shell