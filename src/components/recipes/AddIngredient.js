import React, { Component } from "react";
import PantryItemAdd from "../pantry/PantryItemAdd";
import DataManager from "../../modules/DataManager";
import QueuedIngredientCard from "./QueuedIngredientCard";

export default class AddIngredient extends Component {
    state = {
        recipeIngredient: "",
        itemQuantity: "",
        quantityType: "",
        allIngredients: [],
        emptyForm: false,
        pantryAdd: false,
        duplicateIngredient: false,
        duplicateRecipeItem: false
    }

    handleFieldChange = (evt) => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    renderPantryAddForm = () => {
        this.setState({pantryAdd: true})
    }

    hidePantryAddForm = () => {
        this.setState({pantryAdd: false})
    }

    handleIngredientAdd = () => {
        if(!this.state.itemQuantity || !this.state.quantityType || !this.state.recipeIngredient){
            this.setState({emptyForm: true, duplicateRecipeItem: false, duplicateIngredient: false})
        } else {
            let allIngredients = this.state.allIngredients;
            let recipeItems = this.props.recipeItems.filter(r => r.recipeId === this.props.recipe.id)
            let currentIngredients = [];
            recipeItems.map(item => {
                let currentIng = {
                    name: this.props.pantryItems.find(p => p.id === item.pantryItemId).name
                }
                return currentIngredients.push(currentIng)
            })
            let newRecipeItem = {
                name: this.state.recipeIngredient,
                userId: this.props.user.id,
                pantryItemId: this.props.pantryItems.find(item => item.name === this.state.recipeIngredient).id,
                quantity: this.state.itemQuantity,
                quantityType: this.state.quantityType,
                quantityTypeId: this.props.quantityTypes.find(type => type.name === this.state.quantityType).id
            }
            if(this.state.allIngredients.find(ingredient => ingredient.name === newRecipeItem.name)){
                this.setState({duplicateIngredient: true, duplicateRecipeItem: false, emptyForm: false})
            } else if(currentIngredients.find(c => c.name === newRecipeItem.name)){
                this.setState({duplicateRecipeItem: true, duplicateIngredient: false, emptyForm: false})
            } else {
                allIngredients.push(newRecipeItem);
                document.querySelector("#recipeIngredient").value = "Select a Pantry Item"
                document.querySelector("#itemQuantity").value = ""
                document.querySelector("#quantityType").value = "Quantity Type"
                this.setState({
                    allIngredients: allIngredients,
                    recipeIngredient: "",
                    itemQuantity: "",
                    quantityType: "",
                    emptyForm: false,
                    duplicateIngredient: false,
                    duplicateRecipeItem: false
                })
            }
        }
    }

    resetIngredientAddState = () => {
        document.querySelector("#recipeIngredient").value = "Select a Pantry Item"
        document.querySelector("#itemQuantity").value = ""
        document.querySelector("#quantityType").value = "Quantity Type"
        this.setState({
            recipeIngredient: "",
            itemQuantity: "",
            quantityType: "",
            allIngredients: [],
            emptyForm: false,
            pantryAdd: false,
            duplicateIngredient: false,
            duplicateRecipeItem: false
        })
        
    }

    addNewIngredients = () => { 
        let allRecipeItems = [];
        this.state.allIngredients.map(ingredient => {
            let joinerIngredient = {
                recipeId: this.props.recipe.id,
                pantryItemId: ingredient.pantryItemId,
                quantity: parseInt(ingredient.quantity, 0),
                quantityTypeId: ingredient.quantityTypeId
            }
            return allRecipeItems.push(joinerIngredient)
        })
        Promise.all(allRecipeItems.map(item => DataManager.add("recipePantryItems", item)))
        .then(() => this.props.updateRecipeItemState())
        .then(() => {
            this.resetIngredientAddState();
            this.props.hideAddForm();
        });
    }

    removeQueuedIngredient = (ingredient) => {
        this.setState({allIngredients: this.state.allIngredients.filter(i => i.name !== ingredient.name)})
    }

    updateQueuedQuantity = (ingredient) => {
        let allIngredients = this.state.allIngredients;
        allIngredients.find(i => i.name === ingredient.name).quantity = ingredient.quantity;
        allIngredients.find(i => i.name === ingredient.name).quantityType = ingredient.quantityType;
        allIngredients.find(i => i.name === ingredient.name).quantityTypeId = ingredient.quantityTypeId;
        this.setState({allIngredients: allIngredients})
    }
        
    cancelIngredients = () => {
        this.props.hideAddForm()
    }


    render(){
        return (
            <div className="add-recipe-form">
                {
                    this.state.emptyForm &&
                    <span className="error-p">Please fill out all sections of the form :D</span>
                }
                {
                    this.state.duplicateIngredient &&
                    <span className="error-p">This Ingredient is already queued!</span>
                }
                {
                    this.state.duplicateRecipeItem &&
                    <span className="error-p">This ingredient is already attached to this recipe! Please edit the quantity below.</span>
                }
                <select id="recipeIngredient" onChange={this.handleFieldChange} defaultValue={this.state.recipeIngredient}>
                    <option>Select a Pantry Item</option>
                    {
                        this.props.pantryItems.filter(item => item.visible).map(item => <option key={`pantryItem-${item.id}`}>{item.name}</option>)
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
                    <h5>Is an ingredient you need for your recipe not in your pantry list yet?</h5>
                    {
                        !this.state.pantryAdd &&
                        <button onClick={this.renderPantryAddForm}>Add the Ingredient to your Pantry!</button>
                    }
                    {
                        this.state.pantryAdd &&
                        <div>
                            <PantryItemAdd user={this.props.user}  
                                        editPantryItem={this.props.editPantryItem} 
                                        addPantryItem={this.props.addPantryItem} 
                                        pantryItems={this.props.pantryItems} 
                                        quantityTypes={this.props.quantityTypes} />
                            <button onClick={this.hidePantryAddForm}>Finished adding items?</button>
                        </div>
                    }
                </div>
                <div>
                    <h5>Current Ingredients queued:</h5>
                    {
                        this.state.allIngredients.map(ingredient => {
                            return (
                                <QueuedIngredientCard key={`${ingredient.name}-${this.props.recipe.id}`} 
                                                        ingredient={ingredient} 
                                                        allIngredients={this.state.allIngredients} 
                                                        quantityTypes={this.props.quantityTypes}
                                                        updateQueuedQuantity={this.updateQueuedQuantity}
                                                        removeQueuedIngredient={this.removeQueuedIngredient}/>
                            )
                        })
                    }
                </div>
                {
                    this.state.allIngredients.length > 0 &&
                    <button onClick={this.addNewIngredients}>Submit New Ingredients</button>
                }
                {
                    this.state.allIngredients.length === 0 &&
                    <button onClick={this.cancelIngredients}>Cancel</button>
                }
            </div>
        )
    }
}