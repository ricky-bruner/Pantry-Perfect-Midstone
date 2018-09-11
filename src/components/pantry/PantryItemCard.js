import React, { Component } from "react"
import "./pantryItemCard.css"

export default class PantryItemCard extends Component {
    render(){
        return (
            <div className="pantry-item-card">
                <p>{this.props.pantryItem.name}</p>
                <p>{this.props.pantryItem.quantity} {this.props.quantityTypes.find(type => type.id === this.props.pantryItem.quantityTypeId).name.toLowerCase()}</p>
            </div>
        )
    }
}