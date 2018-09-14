import React, { Component } from "react";

export default class RecipeEditCard extends Component {
    state = {
        showDetails: false,
        editMode: false,
        editDetails: false,
        editIngredients: false
    }

    showDetails = () => {
        this.setState({showDetails: true})
    }

    hideDetails = () => {
        this.setState({showDetails: false})
    }

    renderEditMode = () => {
        this.setState({editMode: true, showDetails: true})
    }

    hideEditMode = () => {
        this.setState({editMode: false})
    }

    editDetails = () => {
        this.setState({editDetails: true})
    }

    editIngredients = () => {
        this.setState({editIngredients: true})
    }

    render(){
        return (
            <div className="recipe-card">
                <h3 onClick={this.showDetails}>{this.props.recipe.name}</h3>
                <button onClick={this.renderEditMode}>Edit?</button>
                <button>Remove?</button>
                {
                    this.state.showDetails &&
                    <div>
                        <h5 onClick={this.hideDetails}>Hide</h5>
                        {
                            this.state.editMode &&
                            <button onClick={this.editDetails}>Edit Details</button>
                        }
                        <p>{this.props.recipe.description}</p>
                        <p>{this.props.recipe.instructions}</p>
                        <h4>Ingredients from Pantry</h4>
                        {
                            this.state.editMode &&
                            <button>Edit Ingredients</button>
                        }
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