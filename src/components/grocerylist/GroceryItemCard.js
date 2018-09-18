import React, { Component } from "react"
import { Checkbox } from "semantic-ui-react"

export default class GroceryItemCard extends Component {
    
    queGroceryItem = () => {
        let groceryItem = {
            userId: this.props.user.id,
            pantryItemId: this.props.pItem.id,
            recipeId: this.props.recipe.id
        }
        this.props.loadGroceryItems(groceryItem)
    }

    render(){
        return (
            <div className="onHand-flex">
                {
                    this.props.pItem.quantity < this.props.rItemQuantity &&
                    <p className="sold-out">{this.props.quantity} {this.props.quantityType.toLowerCase()}</p>
                }
                {
                    this.props.pItem.quantity > this.props.rItemQuantity &&
                    <p className="in-stock">{this.props.quantity} {this.props.quantityType.toLowerCase()}</p>
                }
                {
                    this.props.pItem.quantity === this.props.rItemQuantity &&
                    <p className="low-stock">{this.props.quantity} {this.props.quantityType.toLowerCase()}</p>
                }
                <Checkbox slider onChange={this.queGroceryItem}/>
            </div>
        )
    }
}