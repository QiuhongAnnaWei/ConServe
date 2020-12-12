import React, { useEffect, useState } from 'react';
import Logo from '../img/logo-white.png'
import './Header.css';
import firebase from 'firebase';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams
} from "react-router-dom";

function Header(props) {
    const [isSignedIn, setIsSignedIn] = useState(false); // Local signed-in state.

    // Listen to the Firebase Auth state and set the local state.
    useEffect(() => {
        const unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
            setIsSignedIn(!!user);
        });
        return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
    }, []);

    const signOut = () => {
        firebase.auth().signOut().then(function () {
            alert("Signout Successful!")
            setIsSignedIn(false);
        }).catch(function (error) {
            alert("error" + error);
        });
    }

    console.log("isSignedIn", isSignedIn);

    if (isSignedIn) {
        return (
            <div className="headerOuter">
                <img src={Logo}></img>
                <div>
                    <Link
                        to={{
                            pathname: "/groceries",
                            callbackFromParents: props.callbackFromParents
                        }}>My Groceries</Link>

                    <Link
                        to={{
                            pathname: "/recipes",
                            selectedIngred: props.expiringIngred
                        }}>Recipes</Link>
                    <Link
                        to={{
                            pathname: "/signin",
                        }}
                        onClick={signOut}
                    >Sign Out</Link>
                </div>
            </div>
        );
    } else {
        return (
            <div className="headerOuter">
                <img src={Logo}></img>
                <div>
                    <Link
                        to={{
                            pathname: "/signin",
                        }}>Sign In</Link>
                </div>
            </div>
        );
    }

}

export default Header;

// export default class Header extends React.Component {
//     render() {
//         // let ingred = ['onions', 'garlic', 'mushroom']
//         // console.log("currentUser", firebase.auth().currentUser);
//         firebase.auth().onAuthStateChanged(function (user) {
//             if (user) {    // User is signed in.
//                 return (
//                     <div className="headerOuter">
//                         <img src={Logo}></img>
//                         <div>
//                             {/* <Link to="/groceries">My Groceries</Link> */}
//                             <Link
//                                 to={{
//                                     pathname: "/groceries",
//                                     callbackFromParents: this.props.callbackFromParents
//                                 }}>My Groceries</Link>

//                             <Link
//                                 to={{
//                                     pathname: "/recipes",
//                                     selectedIngred: this.props.expiringIngred
//                                 }}>Recipes</Link>


//                         </div>
//                     </div>
//                 );
//             } else {    // No user is signed in.
//                 return (
//                     <div className="headerOuter">
//                         <img src={Logo}></img>
//                         <div>
//                             <Link
//                                 to={{
//                                     pathname: "/signin",
//                                     callbackFromParents: this.props.callbackFromParents
//                                 }}>Sign In</Link>

//                         </div>
//                     </div>
//                 )
//             }
//         });
//     }
// }