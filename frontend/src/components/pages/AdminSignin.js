import React, { useEffect, useState } from 'react'
// import { BrowserRouter as Router, Routes ,Route } from 'react-router-dom'
import {auth, firebase} from "../util/firebase";
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth';

import {
    Routes,
    Route,
    useNavigate, Link
} from "react-router-dom";

import LoginLink from "../util/login";
export default function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const loginUser = (email, password) => {
        return auth().signInWithEmailAndPassword(email, password);
    }
    async function handleSubmit(event) {
        event.preventDefault();
        // console.log("penis");
        // loginUser(username, password);
        // const token = await firebase.auth.currentUser.getIdToken();
        // localStorage.setItem("test", "test");
        // localStorage.setItem("@token", token);
        // console.log("success");
        // navigate('/');
        const authentication = getAuth();
        signInWithEmailAndPassword(authentication, username, password)
            .then((response) => {
                console.log(response);
                if(response.status >= 400) {

                } else {
                    navigate('/');
                    localStorage.setItem('Auth Token', response._tokenResponse.refreshToken)
                    console.log(response._tokenResponse.refreshToken);
                    console.log("success");
                }

            }).catch( (error) => {
                setErrorMessage('No such user found');
                console.log(errorMessage);
                console.log("penis");
            }

        )
    //
    //
    }


    return (
        <div className="hero is-primary is-fullheight">
            <div className="hero-body">
                <div className="container">
                    <div className="columns is-centered">
                        <div className="column is-4">
                            <form action="" className="box" onSubmit={handleSubmit}>
                                <div className="field">
                                    <label className="label">
                                        Email
                                    </label>
                                    <div className="control has-icons-left">
                                        <input type="email" className="input" value={username} placeholder="username" onChange={(event) => {
                                            setUsername(event.target.value)
                                        }}/>
                                    <span className="icon is-small is-left">
                                        <i className="fa fa-envelope"></i>
                                    </span>
                                    </div>
                                </div>
                                <div className="field">
                                    <label className="label">Password</label>
                                    <div className="control has-icons-left">
                                        <input type="password" className="input" value={password} placeholder="password" onChange={(event) => {
                                            setPassword(event.target.value);

                                        }}/>
                                    <span className="icon is-small is-left">
                                        <i className="fa fa-lock"></i>
                                    </span>
                                    </div>
                                </div>
                                <div className="field">
                                    <button className="button is-success">Login</button>
                                </div>
                                <div>
                                    {errorMessage && (
                                        <p className="error"> {errorMessage} </p>
                                    )}
                                </div>
                            </form>


                            {/*<LoginLink />*/}
                            <br />
                            <Link to="/">
                                <button className="button">Back</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );


}