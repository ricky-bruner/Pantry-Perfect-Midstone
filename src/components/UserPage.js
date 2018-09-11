import React, { Component } from "react";
import NavBar from "./nav/NavBar";
import DataManager from "../modules/DataManager";
import "./applicationViews.css";
import PantryList from "./pantry/PantryList";
import RecipeList from "./recipes/RecipeList";

export default class UserPage extends Component {
    state = {
        user: {},
        pantryItems: [],
        recipes: [],
        recipeItems: [],
        quantityTypes: []

    }

    componentDidMount(){
        let newState = {};
        let user = JSON.parse(sessionStorage.getItem("user"))[0]
        newState.user = user;
        DataManager.getUserData("pantryItems", newState.user.id)
        .then(pantryItems => newState.pantryItems = pantryItems)
        .then(() => DataManager.getUserData("recipes", newState.user.id))
        .then(recipes => newState.recipes = recipes)
        .then(() => DataManager.getUserData("recipePantryItems"))
        .then(recipeItems => newState.recipeItems = recipeItems)
        .then(() => DataManager.get("quantityTypes"))
        .then(quantityTypes => newState.quantityTypes = quantityTypes)
        .then(() => this.setState(newState))
    }

    render(){
        return (
            <div>
                <NavBar props={this.props} user={this.state.user} />
                <RecipeList user={this.state.user} pantryItems={this.state.pantryItems} recipeItems={this.state.recipeItems} quantityTypes={this.state.quantityTypes} />
                <PantryList user={this.state.user} pantryItems={this.state.pantryItems} quantityTypes={this.state.quantityTypes} />
            </div>
        )
    }
}