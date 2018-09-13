import React, { Component } from "react";
import RecipeCard from "./RecipeCard";
import AddRecipeForm from "./AddRecipeForm";

export default class RecipeList extends Component {
    state = {
        addForm: false
    }

    renderAddForm = () => {
        this.setState({
            addForm: true
        })
    }

    hideAddForm = () => {
        this.setState({addForm: false})
    }
    
    render(){
        return (
            <div className="recipe-list-container">
                {
                    !this.state.addForm &&
                    <button onClick={this.renderAddForm}>Add a new Recipe!</button>
                }
                {
                    this.state.addForm &&
                    <AddRecipeForm user={this.props.user} 
                        updateRecipeState={this.props.updateRecipeState}    
                        updateRecipeItemState={this.props.updateRecipeItemState}
                        hideAddForm={this.hideAddForm}
                        editPantryItem={this.props.editPantryItem} 
                        addPantryItem={this.props.addPantryItem}    
                        recipes={this.props.recipes}
                        pantryItems={this.props.pantryItems} 
                        recipeItems={this.props.recipeItems} 
                        quantityTypes={this.props.quantityTypes}/>
                }
                {
                    this.props.recipes.map(recipe => <RecipeCard key={recipe.id} 
                        recipe={recipe} 
                        recipeItems={this.props.recipeItems} å
                        pantryItems={this.props.pantryItems} 
                        quantityTypes={this.props.quantityTypes} />)
                }
            </div>
        )
    }
}