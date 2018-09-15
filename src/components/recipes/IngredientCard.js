import React, { Component } from "react";

export default class IngredientCard extends Component {
    render(){
        return (
            <div key={this.props.recipeItem.id} className="ingredient-card">
                <div>
                    <p>{this.props.ingredient.name}</p>
                </div>
                <div>
                    <p>{this.props.ingredient.quantity} {this.props.ingredient.type.toLowerCase()}</p>
                </div>
            </div>
        )
    }
}