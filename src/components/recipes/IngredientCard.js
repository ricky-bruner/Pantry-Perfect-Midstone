import React, { Component } from "react";
import { Message } from "semantic-ui-react";

export default class IngredientCard extends Component {
    render(){
        return (
            <Message floating size="tiny" key={this.props.recipeItem.id} className="ingredient-card input-margin">
                <div>
                    <p>{this.props.ingredient.name}</p>
                </div>
                <div>
                    <p>{this.props.ingredient.quantity} {this.props.ingredient.type.toLowerCase()}</p>
                </div>
            </Message>
        )
    }
}