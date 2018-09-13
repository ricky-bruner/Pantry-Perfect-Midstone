import React, { Component } from "react";
import "./addRecipeForm.css";

export default class AddRecipeForm extends Component {
    state = {
        recipeName: "",
        recipeDescription: "",
        recipeInstructions: "",
        pantryItems: [],
        retiredItems: []
    }

    componentDidMount(){
        console.log("props add form", this.props)
        let currentItems = this.props.pantryItems.filter(item => item.visible);
        let retiredItems = this.props.pantryItems.filter(item => !item.visible);
        this.setState({pantryItems: currentItems, retiredItems: retiredItems})
    }   

    render(){
        return (
            <div className="add-recipe-form">
                <h3>Build a New Recipe!</h3>
                <input type="text" id="recipeName" defaultValue={this.state.recipeName} placeholder="What is the meal called?" />
                <textarea id="recipeDescription" defaultValue={this.state.recipeDescription} placeholder="Describe the dish!"></textarea>
                <textarea id="recipeInstructions" defaultValue={this.state.recipeInstructions} placeholder='Add some tip and tidbits about your dish! Ex. "juice the limes or add extra salt"!'></textarea>
                <h4>Now, add the ingredients based on what you have in your pantry!</h4>
            </div>
        )
    }
}