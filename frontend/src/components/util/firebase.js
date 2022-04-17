// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import getFirebase from "./firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// var firebaseConfig = {
//     apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//     authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
//     projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//     storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//     messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//     appId: process.env.REACT_APP_FIREBASE_APP_ID,
//     measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
// };
const firebaseConfig = {
    apiKey: "AIzaSyAcUKveG0nv2DJ4g9TWp6QdrBZl_1TMGic",
    authDomain: "attendance-557e7.firebaseapp.com",
    projectId: "attendance-557e7",
    storageBucket: "attendance-557e7.appspot.com",
    messagingSenderId: "73257111569",
    appId: "1:73257111569:web:ddfea333f35502f70261b0",
    measurementId: "G-354HV2QYCR"
};

//
// let instance;
//
// export default function getFirebase() {
//     if (typeof window !== "undefined") {
//         if (instance) return instance
//         instance = firebase.initializeApp(firebaseConfig);
//         return instance
//     }
//
//     return null
// }
//



firebase.initializeApp(firebaseConfig);

const auth = firebase.auth;

export { auth, firebase };