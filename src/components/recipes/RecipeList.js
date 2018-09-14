import React, { Component } from "react";
import RecipeCard from "./RecipeCard";
import AddRecipeForm from "./AddRecipeForm";
import RecipeEditCard from "./RecipeEditCard";

export default class RecipeList extends Component {
    state = {
        addForm: false,
        edit: false
    }

    renderAddForm = () => {
        this.setState({
            addForm: true
        })
    }

    renderEditCards = () => {
        this.setState({edit: true})
    }

    hideEditCards = () => {
        this.setState({edit: false})
    }

    hideAddForm = () => {
        this.setState({addForm: false})
    }
    
    render(){
        return (
            <div className="recipe-list-container">
                <div>
                    {
                        !this.state.addForm &&
                        <button onClick={this.renderAddForm}>Add a new Recipe!</button>
                    }
                    {
                        this.state.addForm &&
                        <button onClick={this.hideAddForm}>Nevermind</button>
                    }
                    {
                        !this.state.addForm &&
                        !this.state.edit &&
                        <button onClick={this.renderEditCards}>Edit Your Recipes?</button>
                    }
                    {
                        this.state.edit &&
                        <button onClick={this.hideEditCards}>Finish Edits</button>
                    }
                </div>
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
                    !this.state.edit &&
                    this.props.recipes.map(recipe => <RecipeCard key={recipe.id} 
                        recipe={recipe} 
                        recipeItems={this.props.recipeItems}
                        pantryItems={this.props.pantryItems} 
                        quantityTypes={this.props.quantityTypes} />)
                }
                {
                    this.state.edit &&
                    this.props.recipes.map(recipe => <RecipeEditCard key={recipe.id} 
                        recipe={recipe} 
                        recipeItems={this.props.recipeItems}
                        pantryItems={this.props.pantryItems} 
                        quantityTypes={this.props.quantityTypes} />)
                }
            </div>
        )
    }
}