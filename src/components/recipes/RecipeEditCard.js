import React, { Component } from "react";
import "./recipeEditCard.css";
import DataManager from "../../modules/DataManager";
import IngredientCard from "./IngredientCard";
import IngredientEditCard from "./IngredientEditCard";
import AddIngredient from "./AddIngredient";
import { Button, Icon, Divider, Message, Input, TextArea, Form, Label } from "semantic-ui-react";

export default class RecipeEditCard extends Component {
    state = {
        recipeName: "",
        recipeDescription: "",
        recipeInstructions: "",
        similarRecipe: {},
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

    retireRecipe = () => {
        DataManager.edit("recipes", this.props.recipe.id, {retired: true})
        .then(() => this.props.updateRecipeState())
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
                <div className="recipe-edit-header">
                    <h3 onClick={this.showDetails}>{this.props.recipe.name}</h3>
                    <div>
                        {
                            !this.state.editMode &&
                            <Button basic animated size="mini" color="orange" onClick={this.renderEditMode}>
                                <Button.Content visible>Edit</Button.Content>
                                <Button.Content hidden><Icon name="exchange" /></Button.Content>
                            </Button>
                        }
                        {
                            this.state.editMode &&
                            <Button basic animated size="mini" color="orange" onClick={this.hideEditMode}>
                                <Button.Content visible>Cancel</Button.Content>
                                <Button.Content hidden><Icon name="ban" /></Button.Content>
                            </Button>
                        }
                        <Button basic animated size="mini" color="red" onClick={this.retireRecipe}>
                            <Button.Content visible>Remove</Button.Content>
                            <Button.Content hidden><Icon name="remove circle" /></Button.Content>
                        </Button>
                    </div>
                </div>
                {
                    this.state.editMode &&
                    <div>
                        <Divider horizontal>Edit Details</Divider>
                        {
                            !this.state.editDetails &&
                            <div>
                                <div className="button-center">
                                    <Button size="mini" color="orange" onClick={this.editDetails}>Edit Details</Button>
                                </div>
                                <p>{this.props.recipe.description}</p>
                                <p>{this.props.recipe.instructions}</p>
                            </div>
                        }
                        {
                            this.state.editDetails &&
                            <div>
                                <div className="button-right">
                                    <Button size="mini" basic animated color="red" onClick={this.hideEditDetails}>
                                        <Button.Content visible>Cancel</Button.Content>
                                        <Button.Content hidden><Icon name="ban" /></Button.Content>
                                    </Button>
                                </div>
                                <div className="edit-recipe-details">
                                    {
                                        this.state.noDetailChange &&
                                        <Message error size="mini">You didn't make any changes!</Message>
                                    }
                                    {
                                        this.state.nameTaken &&
                                        <Message error size="mini">This recipe name is already taken!</Message>
                                    }
                                    {
                                        this.state.similarName &&
                                        <div>
                                            <Message error size="mini">You have a similarly titled recipe.</Message>
                                            <p>{this.state.similarRecipe.name}</p>
                                            <Button size="mini" onClick={this.saveSimilar}>I dont care, run it</Button>
                                        </div>
                                    }
                                    <Form>
                                        <Form.Field>
                                            <Input label={{content: "Edit Name", color: "orange"}} labelPosition="left" fluid size="mini" type="text" id="recipeName" className="input-margin" defaultValue={this.state.recipeName} onChange={this.handleFieldChange}/>
                                        </Form.Field>
                                    </Form>
                                    <Form className="input-margin">
                                        <Form.Field>
                                            <Label pointing='below' attached="top" color="orange" className="centered">Edit Description</Label>
                                            <TextArea id="recipeDescription" defaultValue={this.state.recipeDescription} onChange={this.handleFieldChange}></TextArea>
                                        </Form.Field>
                                    </Form>
                                    <Form className="input-margin">
                                        <Form.Field>
                                            <Label pointing="below" attached="top" color="orange" className="centered">Edit Instructions</Label>
                                            <TextArea id="recipeInstructions" defaultValue={this.state.recipeInstructions} onChange={this.handleFieldChange}></TextArea>
                                        </Form.Field>
                                    </Form>
                                    <Button size="mini" color="orange" onClick={this.updateDetails}>Submit Changes</Button>
                                </div>
                            </div>
                        }
                        <Divider horizontal>Add Ingredients</Divider>
                        {
                            !this.state.addIngredients &&
                            <div className="button-center">
                                <Button size="mini" color="orange" onClick={this.renderAddForm}>Add Ingredients!</Button>
                            </div>
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
                        <Divider horizontal>Edit Ingredients</Divider>
                        {
                            this.state.editMode &&
                            !this.state.editIngredients &&
                            <div className="button-center">
                                <Button size="mini" color="orange" onClick={this.editIngredients}>Edit Ingredients</Button>
                            </div>
                        }
                        {
                            this.state.editMode &&
                            this.state.editIngredients &&
                            <div className="button-right">
                                <Button size="mini" basic animated color="red" onClick={() => this.setState({editIngredients: false})}>
                                    <Button.Content visible>Cancel</Button.Content>
                                    <Button.Content hidden><Icon name="ban" /></Button.Content>
                                </Button>
                            </div>
                        }
                        <h4 className="centered">Ingredients from Pantry</h4>
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
                    </div>  
                }
                <Divider />
            </div>
        )
    }
}