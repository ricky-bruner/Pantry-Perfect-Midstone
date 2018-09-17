import React, { Component } from "react";
import "./recipeEditCard.css";
import DataManager from "../../modules/DataManager";
import IngredientCard from "./IngredientCard";
import IngredientEditCard from "./IngredientEditCard";
import AddIngredient from "./AddIngredient";

export default class RecipeEditCard extends Component {
    state = {
        recipeName: "",
        recipeDescription: "",
        recipeInstructions: "",
        similarRecipe: {},
        showDetails: false,
        editMode: false,
        editDetails: false,
        editIngredients: false,
        noDetailChange: false,
        nameTaken: false, 
        similarName: false,
        addIngredients: false
    }

    componentDidMount(){
        this.setState({
            recipeName: this.props.recipe.name,
            recipeDescription: this.props.recipe.description,
            recipeInstructions: this.props.recipe.instructions
        })
    }

    handleFieldChange = (evt) => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    updateDetails = () => {
        if(this.state.recipeName === this.props.recipe.name && this.state.recipeDescription === this.props.recipe.description && this.state.recipeInstructions === this.props.recipe.instructions){
            this.setState({noDetailChange: true})
        } else {
            let newDetails = {
                name: this.state.recipeName,
                description: this.state.recipeDescription,
                instructions: this.state.recipeInstructions
            }
            let otherRecipes = this.props.allRecipes.filter(r => r.id !== this.props.recipe.id)
            if(otherRecipes.find(r => r.name.toLowerCase() === newDetails.name.toLowerCase())){
                this.setState({nameTaken: true, noDetailChange: false})
            } else if(otherRecipes.find(r => r.name.toLowerCase().includes(newDetails.name.toLowerCase())) || otherRecipes.find(r => newDetails.name.toLowerCase().includes(r.name.toLowerCase()))){
                let similarRecipe = {}
                if(otherRecipes.find(r => r.name.toLowerCase().includes(newDetails.name.toLowerCase()))){
                    similarRecipe = otherRecipes.find(r => r.name.toLowerCase().includes(newDetails.name.toLowerCase()))
                } else {
                    similarRecipe = otherRecipes.find(r => newDetails.name.toLowerCase().includes(r.name.toLowerCase()))
                }
                this.setState({
                    similarName: true, 
                    nameTaken: false, 
                    noDetailChange: false,
                    similarRecipe: similarRecipe })
            } else {
                DataManager.edit("recipes", this.props.recipe.id, newDetails)
                .then(() => this.props.updateRecipeState())
                .then(() => this.setState({
                    editDetails: false, 
                    noDetailChange: false, 
                    similarRecipe: {}, 
                    nameTaken: false, 
                    similarName: false}))
            }
        }
    }

    saveSimilar = () => {
        let newDetails = {
            name: this.state.recipeName,
            description: this.state.recipeDescription,
            instructions: this.state.recipeInstructions
        }
        DataManager.edit("recipes", this.props.recipe.id, newDetails)
        .then(() => this.props.updateRecipeState())
        .then(() => this.setState({editDetails: false, noDetailChange: false, similarName: false}))

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

    hideEditDetails = () => {
        this.setState({editDetails: false})
    }

    editIngredients = () => {
        this.setState({editIngredients: true})
    }

    renderAddForm = () => {
        this.setState({addIngredients: true})
    }

    hideAddForm = () => {
        this.setState({addIngredients: false})
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
                            !this.state.editDetails &&
                            <div>
                                <button onClick={this.editDetails}>Edit Details</button>
                                <p>{this.props.recipe.description}</p>
                                <p>{this.props.recipe.instructions}</p>
                            </div>
                        }
                        {
                            this.state.editDetails &&
                            <div>
                                <button onClick={this.hideEditDetails}>Nevermind</button>
                                <div className="edit-recipe-details">
                                    {
                                        this.state.noDetailChange &&
                                        <span className="error-p">You didn't make any changes!</span>
                                    }
                                    {
                                        this.state.nameTaken &&
                                        <span className="error-p">This recipe name is already taken!</span>
                                    }
                                    {
                                        this.state.similarName &&
                                        <div>
                                            <span className="error-p">You have a similarly titled recipe.</span>
                                            <p>{this.state.similarRecipe.name}</p>
                                            <button onClick={this.saveSimilar}>I dont care, run it</button>
                                        </div>
                                    }
                                    <span>Name:</span>
                                    <input type="text" id="recipeName" defaultValue={this.state.recipeName} onChange={this.handleFieldChange}/>
                                    <span>Description:</span>
                                    <textarea id="recipeDescription" defaultValue={this.state.recipeDescription} onChange={this.handleFieldChange}></textarea>
                                    <span>Instructions:</span>
                                    <textarea id="recipeInstructions" defaultValue={this.state.recipeInstructions} onChange={this.handleFieldChange}></textarea>
                                    <button onClick={this.updateDetails}>Submit Changes</button>
                                </div>
                            </div>
                        }
                        <h4>Add New Ingredients!</h4>
                        {
                            !this.state.addIngredients &&
                            <button onClick={this.renderAddForm}>Add Ingredients!</button>
                        }
                        {
                            this.state.addIngredients &&
                            <AddIngredient user={this.props.user}  
                                            recipe={this.props.recipe}
                                            editPantryItem={this.props.editPantryItem} 
                                            addPantryItem={this.props.addPantryItem} 
                                            recipeItems={this.props.recipeItems}
                                            updateRecipeItemState={this.props.updateRecipeItemState}
                                            pantryItems={this.props.pantryItems} 
                                            quantityTypes={this.props.quantityTypes}
                                            hideAddForm={this.hideAddForm} />
                        }
                        <h4>Ingredients from Pantry</h4>
                        {
                            this.state.editMode &&
                            <button onClick={this.editIngredients}>Edit Ingredients</button>
                        }
                        {
                            this.props.recipeItems.filter(recipeItem => recipeItem.recipeId === this.props.recipe.id).map(recipeItem => {
                                let ingredient = {
                                    name: this.props.pantryItems.find(pantryItem => pantryItem.id === recipeItem.pantryItemId).name,
                                    quantity: recipeItem.quantity,
                                    type: this.props.quantityTypes.find(type => type.id === recipeItem.quantityTypeId).name
                                }
                                return (
                                    <div key={`ingredient-${recipeItem.id}`}>
                                        {
                                            !this.state.editIngredients &&
                                            <IngredientCard key={recipeItem.id} ingredient={ingredient} recipeItem={recipeItem} />
                                        }
                                        {
                                            this.state.editIngredients &&
                                            <IngredientEditCard key={recipeItem.id} ingredient={ingredient} quantityTypes={this.props.quantityTypes} recipeItem={recipeItem} updateRecipeItemState={this.props.updateRecipeItemState} />
                                        }
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