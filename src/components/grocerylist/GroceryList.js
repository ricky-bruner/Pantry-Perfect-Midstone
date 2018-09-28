import React, { Component } from "react";
// import QtyConverter from "../../modules/QtyConverter";
import { Checkbox, Button, Divider, Container } from "semantic-ui-react";
import "./groceryList.css";
import GroceryPurchasedForm from "./GroceryPurchaseForm";
import DataManager from "../../modules/DataManager";

export default class GroceryList extends Component {
    state = {
        edit: false,
        boughtGroceries: []
    }
    
    buyGrocery = (gItem) => {
        let boughtGroceries = this.state.boughtGroceries
        if(boughtGroceries.find(g => g.id === gItem.id)){
            this.setState({boughtGroceries: boughtGroceries.filter(g => g.id !== gItem.id)})
        } else {
            boughtGroceries.push(gItem)
            this.setState({boughtGroceries: boughtGroceries})
        }
    }

    removeItem = (item) => {
        DataManager.delete("groceryItems", item.id)
        .then(() => {this.props.updateGroceryItemState()})
        .then(() => this.setState({boughtGroceries: this.state.boughtGroceries.filter(g => g.id !== item.id)}))
    }

    clearGrocery = (item) => {
        let boughtGroceries = this.state.boughtGroceries;
        let remainingGroceries = boughtGroceries.filter(grocery => item.groceryItemId !== grocery.id)
        this.setState({boughtGroceries: remainingGroceries})
    }

    render(){
        return (
            <div className="grocery-list">
            <Container>
                <div className="header-flex">
                    <h2 className="flex-title">Grocery List</h2>
                    <div>
                        {
                            this.state.edit &&
                            <Button basic fluid color="blue" size="mini" content="Finish" onClick={() => {this.setState({edit: false})}} />
                        }
                        {
                            !this.state.edit &&
                            <Button basic fluid color="green" size="mini" content="Edit" onClick={() => {this.setState({edit: true})}} />
                        }
                    </div>
                </div>
                {
                    this.props.groceryItems.length === 0 &&
                    <p className="small-span">You don't have any items in your grocery list!</p>
                }
                {
                    this.props.groceryItems.length > 0 &&
                    !this.state.edit &&
                    this.props.groceryItems.map(gItem => {
                        let pItem = this.props.pantryItems.find(pItem => pItem.id === gItem.pantryItemId)
                        let recipe = this.props.recipes.find(recipe => recipe.id === gItem.recipeId)
                        return (
                            <div key={gItem.id}>
                                <div className="grocery-item-card">
                                    <p className="grocery-item-name"><span className="small-span">for: {recipe.name}</span><span>{pItem.name}</span></p>
                                    <div>
                                        <Checkbox slider onClick={() => {this.buyGrocery(gItem)}}/>
                                    </div>
                                </div>
                                <Divider fitted />
                            </div>
                        )
                    })
                }
                {
                    this.state.edit &&
                    this.props.groceryItems.map(gItem => {
                        let pItem = this.props.pantryItems.find(pItem => pItem.id === gItem.pantryItemId)
                        let recipe = this.props.recipes.find(recipe => recipe.id === gItem.recipeId)
                        return (
                            <div>
                                <div key={gItem.id} className="grocery-item-card">
                                    <p className="grocery-item-name"><span className="small-span">for: {recipe.name}</span><span>{pItem.name}</span></p>
                                    <div>
                                        <Button basic compact size="mini" color="red" onClick={() => {this.removeItem(gItem)}}>Delete</Button>
                                    </div>
                                </div>
                                <Divider fitted />
                            </div>
                        )
                    })

                }
                <GroceryPurchasedForm boughtGroceries={this.state.boughtGroceries} 
                                        quantityTypes={this.props.quantityTypes} 
                                        pantryItems={this.props.pantryItems} 
                                        updatePantryItemState={this.props.updatePantryItemState}
                                        updateGroceryItemState={this.props.updateGroceryItemState}
                                        clearGrocery={this.clearGrocery} />
            </Container>
            </div>
        )
    }
}