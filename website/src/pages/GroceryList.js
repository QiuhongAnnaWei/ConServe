import React, { Component } from "react";
import './GroceryList.css';
import { InputGroup, FormControl, Button, Table } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { ThemeConsumer } from "react-bootstrap/esm/ThemeProvider";

class Input extends React.Component {
    constructor(props) {
        super(props);
        this.textInput = React.createRef();
    }
    render() {
        return (
            <InputGroup className="mb-3">
                <InputGroup.Prepend>
                    <InputGroup.Text id="basic-addon1">Enter Ingredient</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                    ref={this.textInput}
                    placeholder="Ingredient"
                    aria-label="Ingredient"
                    aria-describedby="Ingredient-field"
                />
                <InputGroup.Append>
                    <Button
                        variant="outline-secondary"
                        type="Submit"
                        onClick={() => { this.props.addIngredient(this.textInput.current.value) }}
                    >+ Add</Button>
                </InputGroup.Append>
            </InputGroup>
        )
    }
}

class List extends React.Component {

    formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [year, month, day].join('-');
    }

    render() {
        return (
            <div className="groceryListList">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Ingredient</th>
                            <th>Expiry Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.ingredients.map((ingredient) => (
                            <tr key={ingredient.id}>
                                <td>{ingredient.name}</td>
                                <td className="ingredientExpiry">
                                    {this.formatDate(ingredient.expiryDate)}
                                    <Button
                                        variant="outline-secondary"
                                        onClick={() => this.props.deleteIngredient(ingredient.id)}
                                    >Delete</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        )
    }
}

export class Page extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nextid: 2,
            ingredients: [
                {
                    id: 0,
                    name: "Apple",
                    expiryDate: Date.now()
                },
                {
                    id: 1,
                    name: "Milk",
                    expiryDate: Date.now()
                }
            ],
            expiryDB: [
                {
                    name: "Apple",
                    expiryTimeFrame: 10 // days
                },
                {
                    name: "Bread",
                    expiryTimeFrame: 10 // days
                },
                {
                    name: "Milk",
                    expiryTimeFrame: 10 // days
                },
            ]
        }
    }

    addIngredient(ingredientName) {
        var expire = new Date();

        for (const item of this.state.expiryDB) {
            if (item.name == ingredientName) {
                expire.setDate(expire.getDate() + item.expiryTimeFrame);
                break;
            }
        }

        let ingredient = {
            id: this.state.nextid,
            name: ingredientName,
            expiryDate: expire
        }
        this.setState({ nextid: this.state.nextid + 1, ingredients: [...this.state.ingredients, ingredient] })
    }

    deleteIngredient(id) {
        var array = [...this.state.ingredients]; // make a separate copy of the array
        var index = array.findIndex((i) => { return i.id === id });
        if (index !== -1) {
            array.splice(index, 1);
            this.setState({ ingredients: array });
        }
    }

    render() {
        return (
            <div className="groceryListBody">
                <div className="groceryListInner">
                    <Input
                        addIngredient={(i) => this.addIngredient(i)}
                    ></Input>
                    <List
                        ingredients={this.state.ingredients}
                        deleteIngredient={(i) => this.deleteIngredient(i)}
                    ></List>
                    <Button variant="primary">Generate Recipes!</Button>
                </div>
            </div>
        )
    }
}