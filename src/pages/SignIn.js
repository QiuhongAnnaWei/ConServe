import React, { Component } from "react";
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';

// Configure Firebase.
const config = {
    apiKey: "AIzaSyBz4lkr1C5TCQlunN9mSmc9alXaRNQS7sI",
    authDomain: "con--serve.firebaseapp.com",
    projectId: "con--serve",
    storageBucket: "con--serve.appspot.com",
    messagingSenderId: "381328228352",
    appId: "1:381328228352:web:d8c19175d6b95f255858e5",
    measurementId: "G-RX1RB8F4YX"
};
firebase.initializeApp(config);

// Configure FirebaseUI.
const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
    signInSuccessUrl: '/groceries',
    // We will display Google and Facebook as auth providers.
    signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
};

export class SignInPage extends React.Component {
    render() {
        return (
            <div>
                <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
            </div>
        )
    }
}