import React, { Component } from "react";
// import QtyConverter from "../../modules/QtyConverter";
import { Checkbox } from "semantic-ui-react";
import "./groceryList.css";
import GroceryPurchasedForm from "./GroceryPurchaseForm";

export default class GroceryList extends Component {
    state = {
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

    clearGrocery = (item) => {
        let boughtGroceries = this.state.boughtGroceries;
        let remainingGroceries = boughtGroceries.filter(grocery => item.groceryItemId !== grocery.id)
        console.log(remainingGroceries)
        this.setState({boughtGroceries: remainingGroceries})
    }

    render(){
        return (
            <div className="grocery-list">
                <h2>Grocery List</h2>
                {
                    this.props.groceryItems.length === 0 &&
                    <p className="small-span">You don't have any items in your grocery list!</p>
                }
                {
                    this.props.groceryItems.length > 0 &&
                    this.props.groceryItems.map(gItem => {
                        let pItem = this.props.pantryItems.find(pItem => pItem.id === gItem.pantryItemId)
                        let recipe = this.props.recipes.find(recipe => recipe.id === gItem.recipeId)
                        return (
                            <div key={gItem.id} className="grocery-item-card">
                                <p className="grocery-item-name"><span className="small-span">for: {recipe.name}</span><span>{pItem.name}</span></p>
                                <Checkbox slider onClick={() => {this.buyGrocery(gItem)}}/>
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
            </div>
        )
    }
}