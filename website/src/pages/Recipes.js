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
                                <Button className="xButton" variant="danger" onClick={() => this.props.onDelete(ingredient)}>x</Button>
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
                            <th colSpan="2"><a target="_blank" href={this.props.recipe.href}>{this.props.recipe.title}</a></th>
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

    fetchRecipes(selectedIngred, pageInd) {
        let url = "https://recipepuppyproxy.herokuapp.com/api/?i=" + selectedIngred.join() + "&p=" + pageInd;
        console.log(url)
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
        //invoked immediately after a component is mounted (inserted into the tree).
        setTimeout(() =>{
            this.fetchRecipes(this.props.selectedIngred, 1);
        },100);
    }

    componentDidUpdate(prevProps) { //invoked immediately after updating occurs
        if (JSON.stringify(this.props.selectedIngred) !== JSON.stringify(prevProps.selectedIngred)) {
            console.log("componentDidUpdate's selectedIngred: ", this.props.selectedIngred);
            this.fetchRecipes(this.props.selectedIngred, 1);
        }
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
        this.state = {
            ingredients: [], //names
            initial: true
        }

    };

    processPassedInSI(){
        this.setState({initial: false});
        let proccsedPassedInSI = []; // from url
        if (typeof this.props.location.selectedIngred === "object") {  //from Groceries (may or may not be eI) or Header (eI)
            // make sure there is no duplicate
            let PassedInSI = this.props.location.selectedIngred;
            for (const ingred of PassedInSI){
                if (!proccsedPassedInSI.includes(ingred)){ // has not been added before
                    proccsedPassedInSI.push(ingred);
                }  
            }
        }
        let currState = this.state.ingredients;
        if (JSON.stringify(currState) !== JSON.stringify(proccsedPassedInSI)){ // to prevent infinite loop
            this.setState({ingredients: proccsedPassedInSI});
        }
    }

    deleteSI(ingredName){
        let array = [...this.state.ingredients]; // make a separate copy
        var index = array.findIndex((ingred) => { return ingred === ingredName });
        if (index !== -1) {
            array.splice(index, 1);
            console.log("array: ", array)
            this.setState({ ingredients: array });
            setTimeout(() =>{
                console.log("this.state.ingredients", this.state.ingredients)
            },100);
        }
    }
    
    render() {
        //const { selectedIngred } = this.props.location
        if (this.state.initial){
            this.processPassedInSI();
        }
        return (
            <div className="RecipesOuter">
                <div className="RecipesInner">
                    <SelectedIngredients selectedIngred={this.state.ingredients} onDelete={(ingredName) => this.deleteSI(ingredName)}/>
                    <Recipes selectedIngred={this.state.ingredients} />
                </div>
            </div>
        );
    }

}