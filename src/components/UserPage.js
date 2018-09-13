import React, { Component } from "react";
import NavBar from "./nav/NavBar";
import DataManager from "../modules/DataManager";
import "./applicationViews.css";
import PantryList from "./pantry/PantryList";
import RecipeList from "./recipes/RecipeList";
import "./userPage.css";

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

    addPantryItem = (object) => {
        return DataManager.add("pantryItems", object)
        .then(() => DataManager.getUserData("pantryItems", this.state.user.id))
        .then(pantryItems => this.setState({pantryItems: pantryItems}))
    }

    editPantryItem = (id, object) => {
        return DataManager.edit("pantryItems", id, object)
        .then(() => DataManager.getUserData("pantryItems", this.state.user.id))
        .then(pantryItems => this.setState({pantryItems: pantryItems}))
    }

    updateRecipeState = () => {
        return DataManager.getUserData("recipes", this.state.user.id)
        .then(recipes => this.setState({recipes: recipes}))
    }

    updateRecipeItemState = () => {
        return DataManager.getUserData("recipePantryItems", this.state.user.id)
        .then(recipesItems => this.setState({recipeItems: recipesItems}))
    }

    render(){
        return (
            <div>
                <NavBar props={this.props} user={this.state.user} />
                <div className="user-view">
                    <div className="left-container">
                        <RecipeList user={this.state.user} 
                                    updateRecipeState={this.updateRecipeState}
                                    updateRecipeItemState={this.updateRecipeItemState}
                                    recipes={this.state.recipes}
                                    pantryItems={this.state.pantryItems} 
                                    recipeItems={this.state.recipeItems} 
                                    quantityTypes={this.state.quantityTypes} />
                    
                    </div>
                    <div className="right-container">
                        <PantryList user={this.state.user} 
                                    editPantryItem={this.editPantryItem}
                                    addPantryItem={this.addPantryItem}
                                    pantryItems={this.state.pantryItems} 
                                    quantityTypes={this.state.quantityTypes} />
                    </div>
                </div>
            </div>
        )
    }
}