import React, { Component } from "react";
import { Button, Header, Modal, Icon, Divider } from 'semantic-ui-react';
import "./buildGroceryList.css";
import QtyConverter from "../../modules/QtyConverter";
import GroceryItemCard from "./GroceryItemCard";
import DataManager from "../../modules/DataManager";

export default class BuildGroceryList extends Component {
    state = { 
        open: false,
        loadedItems: []
    }

    loadGroceryItems = groceryItem => {
        let loadedItems = this.state.loadedItems;
        if(loadedItems.find(item => item.pantryItemId === groceryItem.pantryItemId)){
            loadedItems = loadedItems.filter(item => item.pantryItemId !== groceryItem.pantryItemId)
            this.setState({loadedItems: loadedItems})
        } else {
            loadedItems.push(groceryItem);
            this.setState({loadedItems: loadedItems})
        }
    }

    buildGroceryList = () => {
        Promise.all(this.state.loadedItems.map(item => DataManager.add("groceryItems", item)))
        .then(() => this.props.updateGroceryItemState())
        .then(() => this.close())
    }

    subtractTotals = () => {
        let rItems = this.props.recipeItems.filter(rItem => rItem.recipeId === this.props.recipe.id);
        Promise.all(rItems.map(rItem => {
            let quantityType = this.props.quantityTypes.find(type => type.id === rItem.quantityTypeId).name
            let quantityInTSP = QtyConverter.convertToTSP(rItem.quantity, quantityType)
            let pItem = this.props.pantryItems.find(pItem => pItem.id === rItem.pantryItemId)
            pItem.quantity = (pItem.quantity - quantityInTSP)
            if(pItem.quantity < 0){
                pItem.quantity = 0
                return DataManager.edit("pantryItems", pItem.id, {quantity: pItem.quantity})
            } else {
                return DataManager.edit("pantryItems", pItem.id, {quantity: pItem.quantity})
            }
        }))
        .then(() => DataManager.edit("recipes", this.props.recipe.id, {timesCooked: (this.props.recipe.timesCooked + 1)}))
        .then(() => this.props.updateRecipeState())
        .then(() => this.props.updatePantryItemState())
        .then(() => this.close())
    }

    show = dimmer => () => this.setState({ dimmer, open: true })
    close = () => this.setState({ open: false, loadedItems: [] })
    
    render(){
        const { open, dimmer } = this.state
        return (
            <div>
                <Button basic color='teal' size="mini" animated onClick={this.show('blurring')}>
                    <Button.Content visible><Icon name="food" /></Button.Content>
                    <Button.Content hidden>Cook</Button.Content>
                </Button>
                <Modal dimmer={dimmer} size="tiny" open={open} onClose={this.close}>
                    <Modal.Actions className="button-right cancel-red-bg">
                        <div>
                            <Button color="red" animated size="mini" onClick={this.close}>
                                <Button.Content visible>Cancel</Button.Content>
                                <Button.Content hidden><Icon name="arrow left" /></Button.Content>
                            </Button>
                        </div>
                    </Modal.Actions>
                    <h3 className="centered">Build Your Grocery List</h3>
                    <Divider horizontal>{this.props.recipe.name}</Divider>
                    <Modal.Content>
                        <Modal.Description>
                            <div className="grocery-build-flex">
                                <div className="grocery-build-left">
                                    <Header>Recipe calls for:</Header>
                                    {
                                        this.props.recipeItems.filter(item => item.recipeId === this.props.recipe.id).map(item => {
                                            let ingredient = {
                                                name: this.props.pantryItems.find(pItem => pItem.id === item.pantryItemId).name,
                                                quantity: item.quantity,
                                                quantityType: this.props.quantityTypes.find(type => type.id === item.quantityTypeId).name
                                            }
                                            return (
                                                <div key={item.id} className="recipe-ingredient-flex">
                                                    <p>{ingredient.name}</p>
                                                    <p>{ingredient.quantity} {ingredient.quantityType.toLowerCase()}</p>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                <div className="grocery-build-right">
                                    <Header>On hand:</Header>
                                    {
                                        this.props.recipeItems.filter(item => item.recipeId === this.props.recipe.id).map(rItem => {
                                            let pItem = this.props.pantryItems.find(pItem => pItem.id === rItem.pantryItemId)
                                            let quantityType = this.props.quantityTypes.find(type => type.id === rItem.quantityTypeId).name
                                            let quantity = QtyConverter.convertFromTSP(pItem.quantity, quantityType)
                                            let rItemQuantity = QtyConverter.convertToTSP(rItem.quantity, quantityType)
                                            return (
                                                <GroceryItemCard key={rItem.id} user={this.props.user} 
                                                        rItem={rItem} 
                                                        recipe={this.props.recipe} 
                                                        pItem={pItem} 
                                                        quantityType={quantityType} 
                                                        quantity={quantity} 
                                                        rItemQuantity={rItemQuantity}
                                                        loadGroceryItems={this.loadGroceryItems} 
                                                        groceryItems={this.props.groceryItems}
                                                        quantityTypes={this.props.quantityTypes}/>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </Modal.Description>
                    </Modal.Content>
                    <Divider horizontal>Shop or Cook</Divider>
                    <div className="build-modal-footer button-center pantry-teal-bg">
                        <Button positive icon='shopping basket' labelPosition='right' content="Add to Grocery List!" onClick={this.buildGroceryList} />
                        <Button color="orange" icon="food" labelPosition="left" content="Mark as Cooked!" onClick={this.subtractTotals} />
                    </div>
                </Modal>
            </div>
        )
    }
}
