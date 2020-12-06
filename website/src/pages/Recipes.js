import React, { Component } from "react";
import './Recipes.css';
import { Table } from "react-bootstrap";

class SelectedIngredients extends React.Component {
    render() {
      return (
        <div>
            <ul>
                {this.props.selectedIngred.map((ingredient) =>
        <li>{ingredient}</li>)}
            </ul>
        </div>
      );
    }
  }


function Recipe(props) {
    return (
        <div className="recipe">
                <Table bordered hover>
                    <tbody>
                        <tr> <td>{props.recipe.title}</td> </tr>
                        <tr> <td>Ingredients</td>
                            <td>{props.recipe.ingredients}</td>
                        </tr>
                        <tr> <td>{props.recipe.href}</td>  </tr>
                    </tbody>
                </Table>
        </div>
    );
  }


class Recipes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          recipes: [],
        };
      }

    fetchRecipes(selectedIngred, pageInd){
        console.log("inside fetchRecipes")
        let url = "https://recipepuppyproxy.herokuapp.com/api/?i=" + selectedIngred.join() + "&p=" + pageInd;
        console.log(url)
        fetch(url)
        .then(res => res.json())
        .then( (result) => {
            this.setState({
                recipes: result.results,
            });
        },
        (error) => {
            console.log(error);
        });  
    }

    componentDidMount(){
        console.log("inside componentDidMount")
        console.log(this.props.selectedIngred)
        this.fetchRecipes(this.props.selectedIngred, 1)
    }

    render() {
      return (
        <div className="folioWrapper">
            {
                this.state.recipes.map((recipe, i) => (
                    <Recipe recipe={recipe} index={i} />
                ))
            }
        </div>
    );

    }
  }

  
  export class RecipesPage extends React.Component {
    constructor(props) {
        super(props);
        // console.log("props.location.selectedIngred below")
        // console.log(props)
        this.state = {
            selectedIngred: []
        }
        
    };
    
    render() {
        const { selectedIngred } = this.props.location // or this.props.location.selectedIngred
        return (
            <div>
                <div className="SelectedIngredients">
                    <SelectedIngredients selectedIngred={ selectedIngred } />
                </div>

                <div className="Recipes">
                    <Recipes selectedIngred={ selectedIngred }/>
                </div>
            </div>
        );
    }
    
}