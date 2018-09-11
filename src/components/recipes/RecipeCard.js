import React, { Component } from "react";

export default class RecipeCard extends Component {
    render(){
        return (
            <div className="recipe-card">
                <h3>{this.props.recipe.name}</h3>
                <p>{this.props.recipe.description}</p>
                <p>{this.props.recipe.instructions}</p>
                <h4>Ingredient from Pantry</h4>
                {/* {
                    this.props.recipeItems.
                } */}
            </div>
        )
    }
}