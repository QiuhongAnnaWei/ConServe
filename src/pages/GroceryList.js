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

import firebase from 'firebase';

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
        this.updateSI = this.updateSI.bind(this);
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
                    expiryTimeFrame: 6 // days
                },
                {
                    name: "Bread",
                    expiryTimeFrame: 7 // days
                },
                {
                    name: "Milk",
                    expiryTimeFrame: 7 // days
                },
                {
                    name: "Avocado",
                    expiryTimeFrame: 6 // days
                },
                {
                    name: "Peach",
                    expiryTimeFrame: 3 // days
                },
                {
                    name: "Salmon",
                    expiryTimeFrame: 1 // days
                },
                {
                    name: "Eggs",
                    expiryTimeFrame: 1 // days
                },
                {
                    name: "Honey",
                    expiryTimeFrame: 1825 // days
                },
            ],
            selected: [],
            selectedIngred: []
        }
        this.updateSI(); // setting sI and eI as Apple and Milk
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
            expiryDate: expire,
        }

        let newIngredients = [...this.state.ingredients, ingredient];
        newIngredients.sort(function (a, b) {
            // Turn your strings into dates, and then subtract them
            // to get a value that is either negative, positive, or zero.
            return new Date(a.expiryDate) - new Date(b.expiryDate);
        });
        this.setState({ nextid: this.state.nextid + 1, ingredients: newIngredients });
        this.updateSI();

        // var db = firebase.firestore(); // Initialize an instance of Cloud Firestore:
        // db.collection("users").add({
        // first: "Ada",
        // last: "Lovelace",
        // born: 1815
        // })
        // .then(function(docRef) {
        // console.log("Document written with ID: ", docRef.id);
        // })
        // .catch(function(error) {
        // console.error("Error adding document: ", error);
        // });
    }

    editIngredient(id, name, expiryDate) {
        for (const item of this.state.ingredients) {
            if (item.id == id) {
                item.name = name;
                item.expiryDate = expiryDate;
                break;
            }
        }
        let newIngredients = [...this.state.ingredients];
        newIngredients.sort(function (a, b) {
            // Turn your strings into dates, and then subtract them
            // to get a value that is either negative, positive, or zero.
            return new Date(a.expiryDate) - new Date(b.expiryDate);
        });
        this.setState({ ingredients: newIngredients });
        this.updateSI();
    }

    deleteIngredient(id) {
        var array = [...this.state.ingredients]; // make a separate copy of the array
        var index = array.findIndex((i) => { return i.id === id });
        if (index !== -1) {
            array.splice(index, 1);
            this.setState({ ingredients: array });
        }
        //this.select(id) //to remove it form selected
    }

    isSelected(id) {
        return this.state.selected.indexOf(id) !== -1;
    }

    select(id) {
        var array = [...this.state.selected]; // make a separate copy of the array
        var index = array.indexOf(id);
        if (index == -1) {
            this.setState({ selected: [...this.state.selected, id] })
        } else {
            array.splice(index, 1);
            this.setState({ selected: array });
        }
        this.updateSI();
    }

    updateSI() {
        setTimeout(() => {  // waiting for this.state.selected to update
            let sI = []
            let eI = []
            // find ingredients expiring in 7 days
            for (const ingred of this.state.ingredients) {
                let futureExpireDate = new Date(); //today
                futureExpireDate.setDate(futureExpireDate.getDate() + 7);
                if (ingred.expiryDate <= futureExpireDate) {
                    eI.push(ingred.name.toLowerCase());
                }
            }
            if (this.state.selected.length == 0) { //if no ingredient selected
                sI = eI.slice();
            }
            else { // has ingredient selected: pass back the selected
                for (const selectedI of this.state.selected) {
                    let ind = this.state.ingredients.findIndex((i) => { return i.id === selectedI });
                    if (ind !== -1) {
                        sI.push(this.state.ingredients[ind].name.toLowerCase()) // an array of names of selected ingredients
                        console.log("sI push: ", this.state.ingredients[ind].name.toLowerCase())
                    }
                }
                //none of the ones in selected is in ingredients -> all deleted
                if (sI.length === 0){
                    sI = eI.slice();
                }
            }
            console.log("eI", eI)
            console.log("sI", sI)
            if (typeof this.props.callbackFromParents === "function") {
                this.props.callbackFromParents(sI, eI);
            } else { // from Header
                this.props.location.callbackFromParents(sI, eI);
            }

            this.setState({ selectedIngred: sI })
            //console.log("updateSI called: ", this.state.selected, sI, this.state.selectedIngred)
        },
            100);
    }

    render() {
        if (this.props.isSignedIn){
            console.log("grocerylist.js: user.uid", firebase.auth().currentUser.uid)
        } else{
            console.log("grocerylist.js: not signed in!")
        }

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

                    <Link
                        to={{
                            pathname: "/recipes",
                            selectedIngred: this.state.selectedIngred
                        }}>
                        <Button className="greenButton" variant="primary">Generate Recipes!</Button>
                    </Link>
                </div>
            </div>
        )
    }
}