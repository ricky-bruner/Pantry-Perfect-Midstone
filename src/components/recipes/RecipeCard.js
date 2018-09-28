import React, { Component } from "react";
import "./recipeCard.css";
import { Button, Divider, Message, Icon } from "semantic-ui-react";
import BuildGroceryList from "../grocerylist/BuildGroceryList";
import DataManager from "../../modules/DataManager";

export default class RecipeCard extends Component {
    state = {
        showDetails: false,
    }

    handleFavorite = () => {
        if(this.props.recipe.favorite){
            DataManager.edit("recipes", this.props.recipe.id, {favorite: false})
            .then(() => this.props.updateRecipeState())
        } else {
            DataManager.edit("recipes", this.props.recipe.id, {favorite: true})
            .then(() => this.props.updateRecipeState())
        }
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
                    {
                        this.props.recipe.favorite &&
                        <div className="favorite-icon">
                            <Icon color="red" size="large" name="like" onClick={this.handleFavorite} />
                        </div>
                    }
                    {
                        !this.props.recipe.favorite &&
                        <div className="favorite-icon">
                            <Icon color="grey" size="large" name="like" onClick={this.handleFavorite} />
                        </div>
                    }
                    <h3 className="recipe-title" onClick={this.showDetails}>{this.props.recipe.name}</h3>
                    {
                        this.state.showDetails &&
                        <div>
                            <Button animated basic color="orange" size="mini" onClick={this.hideDetails}>
                                <Button.Content visible>Hide</Button.Content>
                                <Button.Content hidden><Icon name="hide"/></Button.Content>
                            </Button>
                        </div>
                    }
                    
                    
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
                        <Divider horizontal>{this.props.recipe.name} Details</Divider>
                        <p className="centered">{this.props.recipe.description}</p>
                        {
                            this.props.recipe.instructions &&
                            <div>
                                <Divider horizontal>Special Instructions</Divider>
                                <p>{this.props.recipe.instructions}</p>
                            </div>
                        }
                        <Divider horizontal>Ingredients from Pantry</Divider>
                        {
                            this.props.recipeItems.filter(recipeItem => recipeItem.recipeId === this.props.recipe.id).map(recipeItem => {
                                let ingredient = {
                                    name: this.props.pantryItems.find(pantryItem => pantryItem.id === recipeItem.pantryItemId).name,
                                    quantity: recipeItem.quantity,
                                    type: this.props.quantityTypes.find(type => type.id === recipeItem.quantityTypeId).name
                                }
                                return (
                                    <Message floating key={recipeItem.id} className="ingredient-card">
                                        <div>
                                            <p>{ingredient.name}</p>
                                        </div>
                                        <div>
                                            <p>{ingredient.quantity} {ingredient.type.toLowerCase()}</p>
                                            
                                        </div>
                                    </Message>
                                )
                            })
                        }
                        <div className="button-center">
                            <Button basic color="orange" size="mini" onClick={this.hideDetails}>Hide {this.props.recipe.name}</Button>
                        </div>
                        <Divider />
                    </div>  
                }
            </div>
        )
    }
}