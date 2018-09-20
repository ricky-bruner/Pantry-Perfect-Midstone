import React, { Component } from "react";
import "./addRecipeForm.css";
import DataManager from "../../modules/DataManager";
import PantryItemAdd from "../pantry/PantryItemAdd";
import { TextArea, Form } from "semantic-ui-react";

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
        pantryAdd: false,
        duplicateIngredient: false,
        pantryItems: [],
        retiredItems: []
    }

    componentDidMount(){
        let currentItems = this.props.pantryItems.filter(item => item.visible);
        let retiredItems = this.props.pantryItems.filter(item => !item.visible);
        this.setState({pantryItems: currentItems, retiredItems: retiredItems})
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
        let allIngredients = this.state.allIngredients;
        let newRecipeItem = {
            name: this.state.recipeIngredient,
            userId: this.props.user.id,
            pantryItemId: this.props.pantryItems.find(item => item.name === this.state.recipeIngredient).id,
            quantity: this.state.itemQuantity,
            quantityType: this.state.quantityType,
            quantityTypeId: this.props.quantityTypes.find(type => type.name === this.state.quantityType).id
        }
        if(this.state.allIngredients.find(ingredient => ingredient.name === newRecipeItem.name)){
            this.setState({duplicateIngredient: true})
        } else {
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
    }

    resetState = () => {
        document.querySelector("#recipeIngredient").value = "Select a Pantry Item"
        document.querySelector("#itemQuantity").value = ""
        document.querySelector("#quantityType").value = "Quantity Type"
        document.querySelector("#recipeName").value = ""
        document.querySelector("#recipeDescription").value = ""
        document.querySelector("#recipeInstructions").value = ""
        this.setState({
            recipeName: "",
            recipeDescription: "",
            recipeInstructions: "",
            recipeIngredient: "",
            itemQuantity: "",
            quantityType: "",
            allIngredients: [],
            emptyForm: false,
            pantryAdd: false,
            duplicateIngredient: false
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
                            quantity: parseInt(ingredient.quantity, 0),
                            quantityTypeId: ingredient.quantityTypeId
                        }
                        return allRecipeItems.push(joinerIngredient)
                    })
                    allRecipeItems.map(item => DataManager.add("recipePantryItems", item));
                })
                .then(() => this.props.updateRecipeState())
                .then(() => this.props.updateRecipeItemState())
                .then(() => {
                    this.resetState();
                    this.props.hideAddForm();
                });
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
                {
                    this.state.duplicateRecipe &&
                    <span className="error-p">Oops! It seems that you already have a recipe called this! Consider changing the name or double check that you are adding a recipe that you already have!</span>
                }
                <input type="text" id="recipeName" defaultValue={this.state.recipeName} placeholder="What is the meal called?" onChange={this.handleFieldChange} />
                {/* <textarea id="recipeDescription" defaultValue={this.state.recipeDescription} placeholder="Describe the dish!" onChange={this.handleFieldChange}></textarea> */}
                <Form>
                <TextArea autoHeight id="recipeDescription" defaultValue={this.state.recipeDescription} placeholder="Describe the dish!" onChange={this.handleFieldChange} />
                {/* <textarea id="recipeInstructions" defaultValue={this.state.recipeInstructions} placeholder='Add some tip and tidbits about your dish! Ex. "juice the limes or add extra salt"!' onChange={this.handleFieldChange}></textarea> */}
                <TextArea autoHeight id="recipeInstructions" defaultValue={this.state.recipeInstructions} placeholder='Add some tip and tidbits about your dish! Ex. "juice the limes or add extra salt"!' onChange={this.handleFieldChange} />
                </Form>
                <h4>Now, add the ingredients based on what you have in your pantry!</h4>
                {
                    this.state.duplicateIngredient &&
                    <span className="error-p">You've already added this Ingredient!</span>
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
                        this.state.allIngredients.map(ingredient => <p key={ingredient.pantryItemId}>{ingredient.name} {ingredient.quantity}{ingredient.quantityType}</p>)
                    }
                </div>
                <button onClick={this.handleRecipeAdd}>Complete and Add Recipe!</button>
            </div>
        )
    }
}