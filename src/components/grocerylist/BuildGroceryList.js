import React, { Component } from "react";
import { Button, Header, Modal } from 'semantic-ui-react';
import "./buildGroceryList.css";
import QtyConverter from "../../modules/QtyConverter";
import GroceryItemCard from "./GroceryItemCard";

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

    show = dimmer => () => this.setState({ dimmer, open: true })
    close = () => this.setState({ open: false, loadedItems: [] })
    
    render(){
        const { open, dimmer } = this.state
        return (
            <div>
                <Button basic color='teal' size="mini" content='Cook?' onClick={this.show('blurring')} />
                <Modal dimmer={dimmer} open={open} onClose={this.close}>
                    <Modal.Header>Build Your Grocery List!</Modal.Header>
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
                                                <GroceryItemCard key={rItem.id} user={this.props.user} recipe={this.props.recipe} pItem={pItem} quantityType={quantityType} quantity={quantity} rItemQuantity={rItemQuantity} loadGroceryItems={this.loadGroceryItems}/>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </Modal.Description>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button color='red' onClick={this.close}>Cancel</Button>
                        <Button positive icon='checkmark' labelPosition='right' content="Add to You Grocery List!" onClick={this.buildGroceryList} />
                    </Modal.Actions>
                </Modal>
            </div>
        )
    }
}
