import React, { Component } from "react";
import './Recipes.css';
import { Table, Card, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';


class SelectedIngredients extends React.Component {
    render() {
        return (
            <Card className="selectedIngredientsOuter">
                <Card.Header>Ingredients</Card.Header>

                <Card.Body className="selectedIngredientsInner">
                    {this.props.selectedIngred.map((ingredient) =>
                        <Card className="ingredientCard">
                            <Card.Body className="ingredientCardBody">
                                {ingredient}
                                <Button className="xButton" variant="danger">x</Button>
                            </Card.Body>
                        </Card>)}
                </Card.Body>
            </Card>
        );
    }
}


class Recipe extends React.Component {
    parseIngredients(ingredientString) {
        return ingredientString.split(", ");
    }
    isSelected(ingredientName) {
        return this.props.selectedIngred.indexOf(ingredientName.toLowerCase()) !== -1;
    }
    render() {
        return (
            <div className="recipe">
                <Table bordered hover>
                    <thead>
                        <tr>
                            <th colSpan="2"><a href={this.props.recipe.href}>{this.props.recipe.title}</a></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="ingredientsCaption">Ingredients</td>
                            <td>
                                {this.parseIngredients(this.props.recipe.ingredients).map((ingredient) => (
                                    <div className={this.isSelected(ingredient) ? "selected" : ""}>
                                        {ingredient}
                                    </div>
                                ))}
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        );
    }
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
        let url = "https://recipepuppyproxy.herokuapp.com/api/?i=" + selectedIngred.join() + "&p=" + pageInd;
        fetch(url)
            .then(res => res.json())
            .then(
            (result) => {
                this.setState({ recipes: result.results });
            },
            (error) => { console.log(error); }
         );
    }

    componentDidMount(){
        this.fetchRecipes(this.props.selectedIngred, 1);
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
                        <Recipe
                            recipe={recipe}
                            index={i}
                            selectedIngred={this.props.selectedIngred} />
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
            <div className="RecipesOuter">
                <div className="RecipesInner">
                    <SelectedIngredients selectedIngred={passedInSI} />
                    <Recipes selectedIngred={passedInSI} />
                </div>
            </div>
        );
    }

}