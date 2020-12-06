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
    }

    fetchRecipes(selectedIngred, pageInd) {
        console.log("inside fetchRecipes")
        let url = "https://recipepuppyproxy.herokuapp.com/api/?i=" + selectedIngred.join() + "&p=" + pageInd;
        console.log(url)
        fetch(url)
            .then(res => res.json())
            .then((result) => {
                this.setState({
                    recipes: result.results,
                });
            },
                (error) => {
                    console.log(error);
                });
    }

    componentDidMount() {
        console.log("inside componentDidMount")
        console.log(this.props.selectedIngred)
        this.fetchRecipes(this.props.selectedIngred, 1)
    }

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
        // console.log("props.location.selectedIngred below")
        // console.log(props)
        this.state = {
            selectedIngred: []
        }

    };

    render() {
        const { selectedIngred } = this.props.location // or this.props.location.selectedIngred
        return (
            <div className="RecipesOuter">
                <div className="RecipesInner">
                    <SelectedIngredients selectedIngred={selectedIngred} />
                    <Recipes selectedIngred={selectedIngred} />
                </div>
            </div>
        );
    }

}