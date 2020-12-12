
import React, { Component } from "react";
import logo from './logo.svg';
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
import { SignUpPage } from './pages/SignUp';
import Header from './components/Header';

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
            {/* <Route
              exact path="/"
              render={
                props => <GroceryPage {...props} callbackFromParents={this.getSelectedIngred}></GroceryPage>
              }></Route> */}

            <Route
              exact path="/groceries"
              render={
                props => <GroceryPage {...props} callbackFromParents={this.getSelectedIngred}></GroceryPage>
              }></Route>
            <Route exact path="/recipes" component={RecipesPage}></Route>
            <Route exact path="/" component={SignInPage}></Route>
            <Route exact path="/signin" component={SignInPage}></Route>
            <Route exact path="/signup" component={SignUpPage}></Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
