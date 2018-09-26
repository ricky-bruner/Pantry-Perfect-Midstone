import React, { Component } from "react";
import "./addRecipeForm.css";
import DataManager from "../../modules/DataManager";
import PantryItemAdd from "../pantry/PantryItemAdd";
import { TextArea, Form, Message, Input, Icon, Button, Label, Divider } from "semantic-ui-react";

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
            document.querySelector("#recipeIngredient").value = ""
            document.querySelector("#itemQuantity").value = ""
            document.querySelector("#quantityType").value = ""
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
                instructions: this.state.recipeInstructions,
                timesCooked: 0
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
                <div className="add-recipe-form-top">
                    <h3 className="centered">Build a New Recipe!</h3>
                    <Divider horizontal>Recipe Details</Divider>
                    {
                        this.state.emptyForm &&
                        <Message error size="mini">Please Fill out all areas</Message>
                        
                    }
                    {
                        this.state.duplicateRecipe &&
                        <Message error size="mini">Oops! It seems that you already have a recipe called this! Consider changing the name or double check that you are adding a recipe that you already have!</Message>
                    }
                    <Input label={{content: "Name", icon: "food", color: "teal"}} labelPosition="left" size="mini" className="input-margin" type="text" id="recipeName" defaultValue={this.state.recipeName} placeholder="What is the meal called?" onChange={this.handleFieldChange} />
                    <Form className="input-margin">
                        <Form.Field>
                            <Label pointing='below' attached="top" color="teal" className="centered">Please enter a Description</Label>
                            <TextArea autoHeight  className="input-margin" id="recipeDescription" defaultValue={this.state.recipeDescription} placeholder="Describe the dish!" onChange={this.handleFieldChange} />
                        </Form.Field>
                    </Form>
                    <Form className="input-margin">
                        <Form.Field>
                            <Label pointing='below' attached="top" color="teal" className="centered">Enter any instructions you wish</Label>
                            <TextArea autoHeight id="recipeInstructions" defaultValue={this.state.recipeInstructions} placeholder='Add some tip and tidbits about your dish! Ex. "juice the limes or add extra salt"!' onChange={this.handleFieldChange} />
                        </Form.Field>
                    </Form>
                </div>
                <Divider horizontal>Ingredients</Divider>
                <h4 className="centered">Now, Add the Ingredients</h4>
                <Message floating  size="mini">Note: ingredients are based on what you have in your pantry!</Message>
                {
                    this.state.duplicateIngredient &&
                    <Message error size="mini">You've already added this Ingredient</Message>
                }
                <Input list="ingredients" fluid focus className="input-margin" id="recipeIngredient" onChange={this.handleFieldChange} placeholder="Search through the list or type what you seek!" defaultValue={this.state.recipeIngredient} />
                    <datalist id="ingredients">
                        {
                            this.props.pantryItems.filter(item => item.visible).map(item => <option key={item.id} value={item.name}/>)
                        }
                    </datalist>
                <div className="add-form-quantity-inputs">
                    <div className="quantity-input-left">
                        <Input label={{content: "Amount", color: "teal"}} labelPosition="left" size="mini" type="number" id="itemQuantity" placeholder="Number" defaultValue={this.state.itemQuantity} onChange={this.handleFieldChange} />
                    </div>
                    <div className="quantity-input-right">
                        <Input list="types" size="mini" label={{content: "Type", color: "teal"}} labelPosition="left" id="quantityType" placeholder="Select a Quantity Type" defaultValue={this.state.quantityType} onChange={this.handleFieldChange} />
                            <datalist id="types">
                                {
                                    this.props.quantityTypes.map(type => <option key={`type-${type.id}`} value={type.name}/>)
                                }
                            </datalist>
                    </div>
                </div>
                <div className="button-center">
                    <Button size="mini" basic animated color="teal" onClick={this.handleIngredientAdd}>
                        <Button.Content visible>Queue Ingredient</Button.Content>
                        <Button.Content hidden><Icon name="plus" size="large" /></Button.Content>
                    </Button>
                </div>
                <Divider horizontal>Queued Ingredients</Divider>
                <div>
                    {
                        this.state.allIngredients.map(ingredient => 
                            <div >
                                <Message size="tiny" className="queued-ingredient" floated key={ingredient.pantryItemId}>
                                    <Message.Content className="queued-details"><span>{ingredient.name}</span><span>{ingredient.quantity} {ingredient.quantityType}</span></Message.Content>
                                    <div>
                                        <Button basic color="red" size="mini" animated>
                                            <Button.Content visible><Icon name="remove circle"/></Button.Content>
                                            <Button.Content hidden>Remove</Button.Content>
                                        </Button>
                                    </div>
                                </Message>
                            </div>)
                    }
                </div>
                <Divider />
                <div>
                    <Message floating size="mini" className="centered">Is an ingredient you need for your recipe not in your pantry list yet?</Message>
                    <div className="button-center">
                        {
                            !this.state.pantryAdd &&
                            <Button basic color="teal" size="mini" onClick={this.renderPantryAddForm}>Add to your Pantry from here!</Button>
                        }
                    </div>
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
                <Divider horizontal>Finished?</Divider>
                <Button color="teal" onClick={this.handleRecipeAdd}>Complete and Add Recipe!</Button>
            </div>
        )
    }
}