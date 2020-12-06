
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
import { Page as RecipesPage } from './pages/Recipes';
import Header from './components/Header';

function App() {
  return (
    <div>
      <Router>

        <Header></Header>

        <Switch>
          <Route exact path="/" component={GroceryPage}></Route>
          <Route exact path="/groceries" component={GroceryPage}></Route>
          <Route exact path="/recipes" component={RecipesPage}></Route>
        </Switch>

      </Router>
    </div>
  );
}

export default App;
