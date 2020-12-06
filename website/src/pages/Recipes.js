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
        // this.componentDidUpdate = this.componentDidUpdate.bind(this);
      }

    fetchRecipes(selectedIngred, pageInd){
        console.log("inside fetchRecipes")
        let url = "https://recipepuppyproxy.herokuapp.com/api/?i=" + selectedIngred.join() + "&p=" + pageInd;
        console.log("url:", url)
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
        this.fetchRecipes(this.props.selectedIngred, 1)
    }

    // componentDidUpdate(prevProps) { //invoked immediately after updating occurs
    //     if (this.props.selectedIngred !== prevProps.userID) {
    //         console.log("componentDidUpdate's selectedIngred: ", this.props.selectedIngred);
    //       this.fetchRecipes(this.props.selectedIngred, 1);
    //     }
    //   }

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
        this.state = {
            selectedIngred: []
        }
        
    };
    
    render() {
        //const { selectedIngred } = this.props.location
        let passedInSI = []; // from url
        if (typeof this.props.location.selectedIngred === "object") {  //from Groceries (may or may not be eI) or Header (eI)
            passedInSI = this.props.location.selectedIngred;
        }
        return (
            <div>
                <div className="SelectedIngredients">
                    <SelectedIngredients selectedIngred={ passedInSI } />
                </div>

                <div className="Recipes">
                    <Recipes selectedIngred={ passedInSI }/>
                </div>
            </div>
        );
    }
    
}