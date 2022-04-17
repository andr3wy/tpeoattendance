import React from 'react'
// import { BrowserRouter as Router, Routes ,Route } from 'react-router-dom'
import {
    BrowserRouter,
    Routes,
    Route,
    Link,
} from "react-router-dom";


import Home from './components/pages/Home.js';
import Success from './components/pages/LandingPage.js';
import AdminSignin from './components/pages/AdminSignin.js'


export default function App() {
    return (
        <BrowserRouter>
            <div>
                <Routes>
                    <Route path={"/"} element={<Home />} />
                    <Route path={"/success"} element={<Success />} />
                    <Route path={"/admin"} element={<AdminSignin />} />
                </Routes>

            </div>
        </BrowserRouter>
    )
}

