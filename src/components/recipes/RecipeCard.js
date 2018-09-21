import React, { Component } from "react";
import "./recipeCard.css";
import { Button } from "semantic-ui-react";
import BuildGroceryList from "../grocerylist/BuildGroceryList";

export default class RecipeCard extends Component {
    state = {
        showDetails: false,
    }

    showDetails = () => {
        this.setState({showDetails: true})
    }

    hideDetails = () => {
        this.setState({showDetails: false})
    }

    render(){
        return (
            <div className="recipe-card">
                <div className="recipe-card-title">
                    <h3 className="recipe-title" onClick={this.showDetails}>{this.props.recipe.name}</h3>
                    <BuildGroceryList user={this.props.user} 
                            recipe={this.props.recipe} 
                            recipeItems={this.props.recipeItems} 
                            pantryItems={this.props.pantryItems} 
                            quantityTypes={this.props.quantityTypes} 
                            updateRecipeState={this.props.updateRecipeState}
                            updateGroceryItemState={this.props.updateGroceryItemState} 
                            updatePantryItemState={this.props.updatePantryItemState} />
                </div>
                {
                    this.state.showDetails &&
                    <div className="recipe-details">
                        <Button basic compact color="black" onClick={this.hideDetails}>Hide</Button>
                        <p>{this.props.recipe.description}</p>
                        <p>{this.props.recipe.instructions}</p>
                        <h4>Ingredients from Pantry</h4>
                        {
                            this.props.recipeItems.filter(recipeItem => recipeItem.recipeId === this.props.recipe.id).map(recipeItem => {
                                let ingredient = {
                                    name: this.props.pantryItems.find(pantryItem => pantryItem.id === recipeItem.pantryItemId).name,
                                    quantity: recipeItem.quantity,
                                    type: this.props.quantityTypes.find(type => type.id === recipeItem.quantityTypeId).name
                                }
                                return (
                                    <div key={recipeItem.id} className="ingredient-card">
                                        <div>
                                            <p>{ingredient.name}</p>
                                        </div>
                                        <div>
                                            <p>{ingredient.quantity} {ingredient.type.toLowerCase()}</p>
                                            
                                        </div>
                                    </div>
                                )
                            })
                        }
                        <h5 onClick={this.hideDetails}>Hide</h5>
                    </div>  
                }
            </div>
        )
    }
}