import React, { Component } from "react";
import RecipeCard from "./RecipeCard";

export default class RecipeList extends Component {
    render(){
        return (
            <div className="recipe-list-container">
                {
                    this.props.recipes.map(recipe => <RecipeCard key={recipe.id} recipe={recipe} recipeItems={this.props.recipeItems} pantryItems={this.props.pantryItems} quantityTypes={this.props.quantityTypes}/>)
                }
            </div>
        )
    }
}