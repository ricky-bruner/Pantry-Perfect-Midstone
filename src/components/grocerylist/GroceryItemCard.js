import React, { Component } from "react"
import { Checkbox } from "semantic-ui-react"
import QtyConverter from "../../modules/QtyConverter"

export default class GroceryItemCard extends Component {
    
    queGroceryItem = () => {
        let qtyNeeded = QtyConverter.convertToTSP(this.props.rItem.quantity, this.props.quantityTypes.find(type => type.id === this.props.rItem.quantityTypeId).name) - this.props.pItem.quantity
        let groceryItem = {
            userId: this.props.user.id,
            pantryItemId: this.props.pItem.id,
            recipeId: this.props.recipe.id,
            qtyCalledFor: this.props.rItemQuantity,
            qtyTypeCalledFor: this.props.quantityTypes.find(type => type.name === this.props.quantityType).id,
            qtyNeeded: qtyNeeded
        }
        let similarNeed = this.props.groceryItems.find(g => g.pantryItemId === groceryItem.pantryItemId)
        if(similarNeed){
            groceryItem.qtyNeeded = groceryItem.qtyCalledFor
        }
        this.props.loadGroceryItems(groceryItem)
    }

    render(){
        let quantity = ""
        if(this.props.quantity.toString().includes(".")){
            quantity = this.props.quantity.toString().split(".")[1].length
        }
        return (
            <div className="onHand-flex">
                {
                    this.props.pItem.quantity < this.props.rItemQuantity &&
                    quantity >= 3 &&
                    <p className="sold-out">{this.props.quantity.toFixed(2)} {this.props.quantityType.toLowerCase()}</p>
                }
                {
                    this.props.pItem.quantity > this.props.rItemQuantity &&
                    quantity >= 3 &&
                    <p className="in-stock">{this.props.quantity.toFixed(2)} {this.props.quantityType.toLowerCase()}</p>
                }
                {
                    this.props.pItem.quantity === this.props.rItemQuantity &&
                    quantity >= 3 &&
                    <p className="low-stock">{this.props.quantity.toFixed(2)} {this.props.quantityType.toLowerCase()}</p>
                }
                {
                    this.props.pItem.quantity < this.props.rItemQuantity &&
                    quantity < 3 &&
                    <p className="sold-out">{this.props.quantity} {this.props.quantityType.toLowerCase()}</p>
                }
                {
                    this.props.pItem.quantity > this.props.rItemQuantity &&
                    quantity < 3 &&
                    <p className="in-stock">{this.props.quantity} {this.props.quantityType.toLowerCase()}</p>
                }
                {
                    this.props.pItem.quantity === this.props.rItemQuantity &&
                    quantity < 3 &&
                    <p className="low-stock">{this.props.quantity} {this.props.quantityType.toLowerCase()}</p>
                }
                {
                    this.props.groceryItems.length === 0 && 
                    <Checkbox slider onChange={this.queGroceryItem}/>
                }
                {
                    this.props.groceryItems.length > 0 &&
                    this.props.groceryItems.find(gI => gI.pantryItemId === this.props.pItem.id && gI.recipeId === this.props.recipe.id) &&
                    <Checkbox slider disabled checked onChange={this.queGroceryItem}/>
                }
                {
                    this.props.groceryItems.length > 0 &&
                    !this.props.groceryItems.find(gI => gI.pantryItemId === this.props.pItem.id && gI.recipeId === this.props.recipe.id) &&
                    <Checkbox slider onChange={this.queGroceryItem}/>
                }
            </div>
        )
    }
}