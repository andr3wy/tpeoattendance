import React from 'react'
// import { BrowserRouter as Router, Routes ,Route } from 'react-router-dom'
// import {
//     BrowserRouter,
//     Routes,
//     Route,
//     Link,
// } from "react-router-dom";

import { Switch, Route, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home/Home.js";
import AdminCheckIn from "./pages/AdminCheckIn/AdminCheckIn.js";
import NewEvent from "./pages/NewEvent/NewEvent.js";
import EditMembers from "./pages/EditMembers/EditMembers.js";
import IndividAttendance from "./pages/IndividAttendance/IndividAttendance.js";
import "@fontsource/almarai";//



import SignIn from './pages/Home.js';
import Success from './pages/LandingPage.js';
import AdminSignin from './pages/AdminSignin.js'


export default function App() {
    return (
        // <BrowserRouter>
        //     <div>
        //         <Routes>
        //             <Route path={"/"} element={<Home />} />
        //             <Route path={"/success"} element={<Success />} />
        //             <Route path={"/admin"} element={<AdminSignin />} />
        //         </Routes>
        //
        //     </div>
        // </BrowserRouter>
        <BrowserRouter>
            <Switch>
                {/* The Switch decides which component to show based on the current URL.*/}
                <Route exact path="/app">
                    <SignIn />
                </Route>
                <Route exact path={"/app/Home"}>
                    <Home />
                </Route>
                <Route exact path={"/app/Success"}>
                    <Success />
                </Route>
                <Route exact path={"/app/AdminSignIn"}>
                    <AdminSignin/>
                </Route>
                <Route exact path='/app/AdminCheckIn'>
                    <AdminCheckIn />
                </Route>
                <Route exact path='/app/NewEvent'>
                    <NewEvent/>
                </Route>
                <Route exact path='/app/EditMembers'>
                    <EditMembers/>
                </Route>
                <Route exact path='/app/IndividAttendance'>
                    <IndividAttendance/>
                </Route>
            </Switch>
        </BrowserRouter>

    )
}

