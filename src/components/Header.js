import React from "react";
import Logo from '../img/logo-white.png'
import './Header.css';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams
} from "react-router-dom";

export default class Header extends React.Component {
    render() {
        // let ingred = ['onions', 'garlic', 'mushroom']
        return (
            <div className="headerOuter">
                <img src={Logo}></img>
                <div>
                    {/* <Link to="/groceries">My Groceries</Link> */}
                    <Link
                        to={{
                        pathname: "/groceries",
                        callbackFromParents: this.props.callbackFromParents
                    }}>My Groceries</Link>

                    <Link
                        to={{
                        pathname: "/recipes",
                        selectedIngred: this.props.expiringIngred
                    }}>Recipes</Link>

                    
                </div>
            </div>
        );
    }
}