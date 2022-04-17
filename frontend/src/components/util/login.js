import React from "react";
import { useNavigate } from "react-router-dom";
import { auth, firebase } from "../util/firebase";


export default function LoginLink() {
    const navigate = useNavigate();
    async function googleLogin() {
        //1 - init Google Auth Provider
        const provider = new firebase.auth.GoogleAuthProvider();
        //2 - create the popup signIn
        await auth.signInWithPopup(provider).then(
            async (result) => {
                //3 - pick the result and store the token
                const token = await auth?.currentUser?.getIdToken(true);
                //4 - check if have token in the current user
                if (token) {
                    //5 - put the token at localStorage (We'll use this to make requests)
                    localStorage.setItem("@token", token);
                    console.log("testestes")
                    //6 - navigate user to the book list
                    navigate("/AdminCheckIn");
                    // window.location.href = "/";
                }
            },
            function (error) {
                console.log(error);
            }
        );
    }
    return (
        <div>
            <button onClick={googleLogin} className="button">
                GOOGLE
            </button>
        </div>
    );
}

const style = {
    padding: "15px 80px",
    borderRadius: "40px",
    margin: "24px",
    backgrounColor: "#ed7a11",
    color: "white"
}
