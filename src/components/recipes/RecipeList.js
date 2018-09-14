import React, { Component } from "react";
import RecipeCard from "./RecipeCard";
import AddRecipeForm from "./AddRecipeForm";

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
                {
                    !this.state.addForm &&
                    !this.state.edit &&
                    <div>
                        <button onClick={this.renderAddForm}>Add a new Recipe!</button>
                        <button onClick={this.renderEditCards}>Edit Your Recipes?</button>
                    </div>
                }
                {
                    this.state.edit &&
                    <div>
                        <button onClick={this.renderAddForm}>Add a new Recipe!</button>
                        <button onClick={this.hideEditCards}>Finish Edits</button>
                    </div>
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
                        edit={this.state.edit}
                        hideEditCards={this.hideEditCards}
                        recipe={recipe} 
                        recipeItems={this.props.recipeItems}
                        pantryItems={this.props.pantryItems} 
                        quantityTypes={this.props.quantityTypes} />)
                }
            </div>
        )
    }
}