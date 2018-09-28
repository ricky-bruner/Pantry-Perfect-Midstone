import React, { Component } from "react";
import PantryItemAdd from "../pantry/PantryItemAdd";
import DataManager from "../../modules/DataManager";
import QueuedIngredientCard from "./QueuedIngredientCard";
import { Message, Input, Button, Icon, Label, Divider } from "semantic-ui-react";

export default class AddIngredient extends Component {
    state = {
        recipeIngredient: "",
        itemQuantity: "",
        quantityType: "",
        allIngredients: [],
        emptyForm: false,
        pantryAdd: false,
        duplicateIngredient: false,
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
            let newRecipeItem = {
                name: this.state.recipeIngredient,
                userId: this.props.user.id,
                pantryItemId: this.props.pantryItems.find(item => item.name === this.state.recipeIngredient).id,
                quantity: parseInt(this.state.itemQuantity, 0),
                quantityType: this.state.quantityType,
                quantityTypeId: this.props.quantityTypes.find(type => type.name === this.state.quantityType).id
            }
            if(this.state.allIngredients.find(ingredient => ingredient.name === newRecipeItem.name)){
                this.setState({duplicateIngredient: true, emptyForm: false})
            } else {
                allIngredients.push(newRecipeItem);
                document.querySelector("#recipeIngredient").value = ""
                document.querySelector("#itemQuantity").value = ""
                document.querySelector("#quantityType").value = ""
                this.setState({
                    allIngredients: allIngredients,
                    recipeIngredient: "",
                    itemQuantity: "",
                    quantityType: "",
                    emptyForm: false,
                    duplicateIngredient: false,
                })
            }
        }
    }

    resetIngredientAddState = () => {
        document.querySelector("#recipeIngredient").value = ""
        document.querySelector("#itemQuantity").value = ""
        document.querySelector("#quantityType").value = ""
        this.setState({
            recipeIngredient: "",
            itemQuantity: "",
            quantityType: "",
            allIngredients: [],
            emptyForm: false,
            pantryAdd: false,
            duplicateIngredient: false,
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
        allIngredients.find(i => i.name === ingredient.name).quantity = parseInt(ingredient.quantity, 0);
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
                <div className="button-right">
                    <Button animated size="mini" basic color="red" onClick={this.cancelIngredients}>
                        <Button.Content visible>Cancel</Button.Content>
                        <Button.Content hidden><Icon name="ban" /></Button.Content>
                    </Button>
                </div>
                <h4 className="centered">Add New Ingredients</h4>
                {
                    this.state.emptyForm &&
                    <Message error size="mini">Please fill out all sections of the form</Message>
                }
                {
                    this.state.duplicateIngredient &&
                    <Message error size="mini">This Ingredient is already queued below</Message>
                }
                <Input list="ingredients" id="recipeIngredient" className="input-margin" onChange={this.handleFieldChange} placeholder="Select a Pantry Item" defaultValue={this.state.recipeIngredient} />
                    <datalist id="ingredients">
                        {
                            this.props.pantryItems.filter(item => item.visible).map(item => {
                                let recipeItems = this.props.recipeItems.filter(r => r.recipeId === this.props.recipe.id)
                                let rItem = recipeItems.find(r => r.pantryItemId === item.id)
                                if(!rItem){
                                    return <option key={`pantryItem-${item.id}`} value={item.name} />
                                } else {
                                    return null
                                }
                            })
                        }
                    </datalist>
                <Input size="mini" label={{content: "Amount", color: "orange"}} labelPosition="left" type="number" className="input-margin" id="itemQuantity" placeholder="Number" defaultValue={this.state.itemQuantity} onChange={this.handleFieldChange} />
                <Input list="types" size="mini" label={{content: "Type", color: "orange"}} labelPosition="left" className="input-margin" id="quantityType" defaultValue={this.state.quantityType} onChange={this.handleFieldChange} />
                    <datalist id="types">
                    {
                        this.props.quantityTypes.map(type => <option key={`type-${type.id}`} value={type.name} />)
                    }
                    </datalist>

                <div className="button-center">
                    <Button size="mini" color="orange" onClick={this.handleIngredientAdd}>Add ingredient to recipe!</Button>
                </div>
                <div>
                    <Divider horizontal>Current Queued Ingredients</Divider>
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
                <Divider horizontal>Pantry Add</Divider>
                <div>
                    <h5 className="centered">Is an ingredient you need for your recipe not in your pantry list yet?</h5>
                    {
                        !this.state.pantryAdd &&
                        <div className="button-center">
                            <Button size="mini" color="orange" onClick={this.renderPantryAddForm}>Add to your Pantry!</Button>
                        </div>
                    }
                    {
                        this.state.pantryAdd &&
                        <div>
                            <div className="button-right">
                                <Button size="mini" basic color="blue" onClick={this.hidePantryAddForm}>Finish</Button>
                            </div>    
                            <PantryItemAdd user={this.props.user}  
                                        editPantryItem={this.props.editPantryItem} 
                                        addPantryItem={this.props.addPantryItem} 
                                        pantryItems={this.props.pantryItems} 
                                        quantityTypes={this.props.quantityTypes} />
                        </div>
                    }
                    <Divider horizontal>Finish</Divider>
                </div>
                {
                    this.state.allIngredients.length === 0 &&
                    <Button size="mini" color="orange" disabled onClick={this.addNewIngredients}>Submit New Ingredients</Button>
                }
                {
                    this.state.allIngredients.length > 0 &&
                    <Button size="mini" color="orange" onClick={this.addNewIngredients}>Submit New Ingredients</Button>
                }
                
            </div>
        )
    }
}