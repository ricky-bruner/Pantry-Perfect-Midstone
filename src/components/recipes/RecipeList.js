import React, { Component } from "react";
import RecipeCard from "./RecipeCard";

export default class RecipeList extends Component {
    render(){
        return (
            <div className="recipe-list-container">
                {
                    this.props.recipes.map(recipe => <RecipeCard recipe={recipe} quantityTypes={this.props.quantityTypes}/>)
                }
            </div>
        )
    }
}