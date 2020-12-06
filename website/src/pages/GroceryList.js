import React, { useState } from "react";
import './GroceryList.css';
import { InputGroup, FormControl, Button, Table } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams
} from "react-router-dom";

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
                        variant="secondary"
                        type="Submit"
                        onClick={() => { this.props.addIngredient(this.textInput.current.value) }}
                    >+ Add</Button>
                </InputGroup.Append>
            </InputGroup>
        )
    }
}

class List extends React.Component {

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
                            <ListRow
                                key={ingredient.id}
                                ingredient={ingredient}
                                select={(i) => this.props.select(i)}
                                isSelected={(i) => this.props.isSelected(i)}
                                deleteIngredient={(i) => this.props.deleteIngredient(i)}
                                editIngredient={(i, n, e) => this.props.editIngredient(i, n, e)}
                            ></ListRow>
                        ))}
                    </tbody>
                </Table>
            </div>
        )
    }
}

export class ListRow extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isEditing: false,
        }
        this.nameInput = React.createRef();
        this.dateInput = React.createRef();
        this.save = this.save.bind(this);
    }

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

    save() {
        this.setState({ isEditing: false });
        this.props.editIngredient(this.props.ingredient.id, this.nameInput.current.value, new Date(this.dateInput.current.value))
    }

    render() {
        return (
            <tr className={this.props.isSelected(this.props.ingredient.id) ? "trActive" : ""}
                onClick={() => this.props.select(this.props.ingredient.id)}>
                <td>{this.state.isEditing ? (
                    <div>
                        <FormControl
                            ref={this.nameInput}
                            defaultValue={this.props.ingredient.name}
                            aria-label="Ingredient"
                            aria-describedby="Ingredient-name"
                        />
                    </div>
                ) : (
                        <div>{this.props.ingredient.name}</div>)
                }</td>
                <td>
                    {this.state.isEditing ? (
                        <div className="ingredientExpiry">
                            <FormControl
                                className="ingredientExpiryForm"
                                ref={this.dateInput}
                                defaultValue={this.formatDate(this.props.ingredient.expiryDate)}
                                aria-label="Date"
                                aria-describedby="Date"
                            />
                            <div>
                                <Button
                                    variant="outline-secondary"
                                    onClick={this.save}
                                    className="editButton"
                                >Save</Button>
                                <Button
                                    variant="outline-danger"
                                    onClick={() => { this.setState({ isEditing: false }) }}
                                >Cancel</Button>
                            </div>
                        </div>
                    ) : (
                            <div className="ingredientExpiry">
                                {this.formatDate(this.props.ingredient.expiryDate)}
                                <div>
                                    <Button
                                        variant="outline-secondary"
                                        onClick={() => { this.setState({ isEditing: true }) }}
                                        className="editButton"
                                    >Edit</Button>
                                    <Button
                                        variant="outline-danger"
                                        onClick={() => this.props.deleteIngredient(this.props.ingredient.id)}
                                    >Delete</Button>
                                </div>
                            </div>)}
                </td>
            </tr>
        );
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
            ],
            selected: []
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

    editIngredient(id, name, expiryDate) {
        for (const item of this.state.ingredients) {
            if (item.id == id) {
                item.name = name;
                item.expiryDate = expiryDate;
                break;
            }
        }
    }

    deleteIngredient(id) {
        var array = [...this.state.ingredients]; // make a separate copy of the array
        var index = array.findIndex((i) => { return i.id === id });
        if (index !== -1) {
            array.splice(index, 1);
            this.setState({ ingredients: array });
        }
    }

    isSelected(id) {
        return this.state.selected.indexOf(id) !== -1;
    }

    select(id) {
        var array = [...this.state.selected]; // make a separate copy of the array
        var index = array.indexOf(id);
        console.log(index);
        if (index == -1) {
            console.log("adding");
            this.setState({ selected: [...this.state.selected, id] })
        } else {
            console.log("deleting");
            array.splice(index, 1);
            this.setState({ selected: array });
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
                        editIngredient={(i, n, e) => this.editIngredient(i, n, e)}
                        deleteIngredient={(i) => this.deleteIngredient(i)}
                        select={(i) => this.select(i)}
                        isSelected={(i) => this.isSelected(i)}
                    ></List>
                    <Link to="/recipes"><Button className="greenButton" variant="primary">Generate Recipes!</Button></Link>
                </div>
            </div>
        )
    }
}