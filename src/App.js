
import React, { Component } from "react";
import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";

import { Page as GroceryPage } from './pages/GroceryList';
import { RecipesPage } from './pages/Recipes';
import { SignInPage } from './pages/SignIn';
import { ErrorPage } from './pages/Error';
import Header from './components/Header';

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

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIngred: [],
      expiringIngred: [] // for going to Recipe from Header
    }
    this.getSelectedIngred = this.getSelectedIngred.bind(this);
  };

  getSelectedIngred(groceryPageSI, groceryPageEI) {
    this.setState({ selectedIngred: groceryPageSI, expiringIngred: groceryPageEI })
  }

  render() {
    return (
      <div>
        <Router>
          <Header callbackFromParents={this.getSelectedIngred} expiringIngred={this.state.expiringIngred}></Header>
          <Switch>
            <Route
              exact path="/groceries"
              render={
                props => <GroceryPage {...props} callbackFromParents={this.getSelectedIngred}></GroceryPage>
              }></Route>
            <Route exact path="/recipes" component={RecipesPage}></Route>
            <Route exact path="/" component={SignInPage}></Route>
            <Route exact path="/signin" component={SignInPage}></Route>
            <Route component={ErrorPage}></Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
