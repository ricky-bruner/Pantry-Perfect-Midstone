import React, { Component } from "react";
import "./addRecipeForm.css";

export default class AddRecipeForm extends Component {
    state = {
        recipeName: "",
        recipeDescription: "",
        recipeInstructions: "",
        recipeIngredient: "",
        itemQuantity: "",
        quantityType: "",
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

    render(){
        return (
            <div className="add-recipe-form">
                <h3>Build a New Recipe!</h3>
                <input type="text" id="recipeName" defaultValue={this.state.recipeName} placeholder="What is the meal called?" onChange={this.handleFieldChange} />
                <textarea id="recipeDescription" defaultValue={this.state.recipeDescription} placeholder="Describe the dish!" onChange={this.handleFieldChange}></textarea>
                <textarea id="recipeInstructions" defaultValue={this.state.recipeInstructions} placeholder='Add some tip and tidbits about your dish! Ex. "juice the limes or add extra salt"!' onChange={this.handleFieldChange}></textarea>
                <h4>Now, add the ingredients based on what you have in your pantry!</h4>
                <select id="recipeIngredient" onChange={this.handleFieldChange}>
                    <option>Select a Pantry Item</option>
                    {
                        this.state.pantryItems.map(item => <option key={`pantryItem-${item.id}`}>{item.name}</option>)
                    }
                </select>
                <label htmlFor="itemQuantity">Add the amount!</label>
                <input type="number" id="itemQuantity" placeholder="literally a number goes here" onChange={this.handleFieldChange} />
                <select id="quantityType" onChange={this.handleFieldChange}>
                    <option>Quantity Type</option>
                    {
                        this.props.quantityTypes.map(type => <option key={`type-${type.id}`}>{type.name}</option>)
                    }
                </select>
                <div>
                    <button>Add ingredient to recipe!</button>
                </div>
                <div>
                    <h5>Current Ingredients queued:</h5>
                </div>
            </div>
        )
    }
}