import React, { Component } from "react";
import "./addRecipeForm.css";
import DataManager from "../../modules/DataManager";

export default class AddRecipeForm extends Component {
    state = {
        recipeName: "",
        recipeDescription: "",
        recipeInstructions: "",
        recipeIngredient: "",
        itemQuantity: "",
        quantityType: "",
        allIngredients: [],
        emptyForm: false,
        pantryItems: [],
        retiredItems: []
    }

    componentDidMount(){
        console.log("props add form", this.props)
        let currentItems = this.props.pantryItems.filter(item => item.visible);
        let retiredItems = this.props.pantryItems.filter(item => !item.visible);
        this.setState({pantryItems: currentItems, retiredItems: retiredItems})
    }

    handleFieldChange = (evt) => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    handleIngredientAdd = () => {
        let allIngredients = this.state.allIngredients;
        let newRecipeItem = {
            name: this.state.recipeIngredient,
            userId: this.props.user.id,
            pantryItemId: this.props.pantryItems.find(item => item.name === this.state.recipeIngredient).id,
            quantity: this.state.itemQuantity,
            quantityType: this.state.quantityType,
            quantityTypeId: this.props.quantityTypes.find(type => type.name === this.state.quantityType).id
        }
        allIngredients.push(newRecipeItem);
        document.querySelector("#recipeIngredient").value = "Select a Pantry Item"
        document.querySelector("#itemQuantity").value = ""
        document.querySelector("#quantityType").value = "Quantity Type"
        this.setState({
            allIngredients: allIngredients,
            recipeIngredient: "",
            itemQuantity: "",
            quantityType: ""
        })
    }

    handleRecipeAdd = () => {
        if(!this.state.recipeName || !this.state.recipeDescription || !this.state.recipeInstructions || this.state.allIngredients.length === 0){
            this.setState({emptyForm: true})
        } else {
            let newRecipe = {
                userId: this.props.user.id,
                name: this.state.recipeName,
                description: this.state.recipeDescription,
                image: "",
                instructions: this.state.recipeInstructions
            }
            if(this.props.recipes.find(recipe => recipe.name.toLowerCase() ===  newRecipe.name.toLowerCase())){
                this.setState({emptyForm: false, duplicateRecipe: true})
            } else {
                DataManager.add("recipes", newRecipe)
                .then(recipe => {
                    let allRecipeItems = [];
                    this.state.allIngredients.map(ingredient => {
                        let joinerIngredient = {
                            recipeId: recipe.id,
                            pantryItemId: ingredient.pantryItemId,
                            quantity: parseInt(ingredient.quantity),
                            quantityTypeId: ingredient.quantityTypeId
                        }
                        return allRecipeItems.push(joinerIngredient)
                    })
                    allRecipeItems.map(item => DataManager.add("recipePantryItems", item));
                })
                .then(() => this.props.updateRecipeState())
                .then(() => this.props.updateRecipeItemState())
            }
        }
    }

    render(){
        return (
            <div className="add-recipe-form">
                <h3>Build a New Recipe!</h3>
                {
                    this.state.emptyForm &&
                    <span className="error-p">Please Fill out all areas</span>

                }
                <input type="text" id="recipeName" defaultValue={this.state.recipeName} placeholder="What is the meal called?" onChange={this.handleFieldChange} />
                <textarea id="recipeDescription" defaultValue={this.state.recipeDescription} placeholder="Describe the dish!" onChange={this.handleFieldChange}></textarea>
                <textarea id="recipeInstructions" defaultValue={this.state.recipeInstructions} placeholder='Add some tip and tidbits about your dish! Ex. "juice the limes or add extra salt"!' onChange={this.handleFieldChange}></textarea>
                <h4>Now, add the ingredients based on what you have in your pantry!</h4>
                <select id="recipeIngredient" onChange={this.handleFieldChange} defaultValue={this.state.recipeIngredient}>
                    <option>Select a Pantry Item</option>
                    {
                        this.state.pantryItems.map(item => <option key={`pantryItem-${item.id}`}>{item.name}</option>)
                    }
                </select>
                <label htmlFor="itemQuantity">Add the amount!</label>
                <input type="number" id="itemQuantity" placeholder="literally a number goes here" defaultValue={this.state.itemQuantity} onChange={this.handleFieldChange} />
                <select id="quantityType" defaultValue={this.state.quantityType} onChange={this.handleFieldChange}>
                    <option>Quantity Type</option>
                    {
                        this.props.quantityTypes.map(type => <option key={`type-${type.id}`}>{type.name}</option>)
                    }
                </select>
                <div>
                    <button onClick={this.handleIngredientAdd}>Add ingredient to recipe!</button>
                </div>
                <div>
                    <h5>Current Ingredients queued:</h5>
                    {
                        this.state.allIngredients.map(ingredient => <p key={ingredient.pantryItemId}>{ingredient.name} {ingredient.quantity}{ingredient.quantityType}</p>)
                    }
                </div>
                <button onClick={this.handleRecipeAdd}>Complete and Add Recipe!</button>
            </div>
        )
    }
}